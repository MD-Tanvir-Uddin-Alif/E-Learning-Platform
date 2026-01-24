from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from dotenv import load_dotenv
from datetime import datetime
import requests
import uuid
import json
import os

from models.payment_model import PaymentModel, RatingModel
from utils.course_completision import is_course_completed
from models.enrollment_model import EnrollmentModel
from schemas.rating_schema import RatingSchema
from models.course_model import CourseModel
from .auth_route import get_current_user
from models.user_models import UserModel
from database_config import get_db
from schemas.course_schema import PaymentReceipt

router = APIRouter(tags=["Payment"])

load_dotenv()

# Load Config from .env
SSLCOMMERZ_STORE_ID = os.getenv("SSLCOMMERZ_STORE_ID")
SSLCOMMERZ_STORE_PASSWORD = os.getenv("SSLCOMMERZ_STORE_PASSWORD")
SSLCOMMERZ_SESSION_API = os.getenv("SSLCOMMERZ_SESSION_API")
SSLCOMMERZ_VALIDATION_API = os.getenv("SSLCOMMERZ_VALIDATION_API")


# --- FRONTEND REDIRECT URL ---
FRONTEND_SUCCESS_URL = "http://localhost:5173/student/course" 
FRONTEND_FAIL_URL = "http://localhost:5173/courses"    
# -----------------------------



@router.post("/purchase/{course_id}")
def initiate_payment(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Handle enrollment for both Free and Paid courses"""
    
    if current_user.role.value == "admin":
        raise HTTPException(
            status_code=403, 
            detail="Admins cannot purchase courses. Please register as a student to buy courses."
        )
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing_enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="You are already enrolled in this course")

    # ======================================================
    # SCENARIO A: Free Course (Direct Enrollment)
    # ======================================================
    if not course.is_paid:
        new_enrollment = EnrollmentModel(
            user_id=current_user.id,
            course_id=course_id,
            enrolled_at=datetime.utcnow()
        )
        db.add(new_enrollment)
        db.commit()
        
        return {
            "status": "success", 
            "message": "Successfully enrolled in free course",
            "type": "free_enrollment"
        }

    # ======================================================
    # SCENARIO B: Paid Course (SSLCommerz Payment)
    # ======================================================
    
    # unique transaction ID
    transaction_id = str(uuid.uuid4())
    
    payment = PaymentModel(
        user_id=current_user.id,
        course_id=course_id,
        transaction_id=transaction_id,
        amount=course.price,
        status="pending"
    )
    db.add(payment)
    db.commit()
    
    payload = {
        'store_id': SSLCOMMERZ_STORE_ID,
        'store_passwd': SSLCOMMERZ_STORE_PASSWORD,
        'total_amount': course.price,
        'currency': 'BDT',
        'tran_id': transaction_id,
        'success_url': f"http://localhost:8000/payment/success/{transaction_id}",
        'fail_url': f"http://localhost:8000/payment/fail/{transaction_id}",
        'cancel_url': f"http://localhost:8000/payment/cancel/{transaction_id}",
        'ipn_url': f"http://localhost:8000/payment/ipn/{transaction_id}",
        'cus_name': f"{current_user.first_name} {current_user.last_name}",
        'cus_email': current_user.email,
        'cus_phone': "01700000000",
        'cus_add1': 'Dhaka', 
        'cus_city': 'Dhaka',
        'cus_country': 'Bangladesh',
        'shipping_method': 'NO',
        'product_name': course.title,
        'product_category': 'Education',
        'product_profile': 'general'
    }
    
    try:
        response = requests.post(SSLCOMMERZ_SESSION_API, data=payload)
        response_data = response.json()
        
        if response_data.get('status') == 'SUCCESS':
            return {
                "status": "success",
                "message": "Payment initiated successfully",
                "type": "payment_redirect",
                "GatewayPageURL": response_data.get('GatewayPageURL'),
                "transaction_id": transaction_id
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to initiate payment")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment gateway error: {str(e)}")


@router.post("/success/{transaction_id}")
async def payment_success(
    transaction_id: str,
    request: Request, 
    db: Session = Depends(get_db)
):
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    
    try:
        form_data = await request.form()
        val_id = form_data.get('val_id')
    except Exception:
        val_id = None
    
    
    if not val_id:
        
        payment.status = "failed"
        db.commit()
        raise HTTPException(status_code=400, detail="Validation ID missing from payment gateway response")

    validation_params = {
        'val_id': val_id, 
        'store_id': SSLCOMMERZ_STORE_ID,
        'store_passwd': SSLCOMMERZ_STORE_PASSWORD,
        'format': 'json'
    }
    
    try:
        response = requests.get(SSLCOMMERZ_VALIDATION_API, params=validation_params)
        validation_data = response.json()
        
        if validation_data.get('status') == 'VALID' or validation_data.get('status') == 'VALIDATED':
            payment.status = "completed"
            payment.sslcommerz_response = json.dumps(validation_data)
            
            existing_enrollment = db.query(EnrollmentModel).filter(
                EnrollmentModel.user_id == payment.user_id,
                EnrollmentModel.course_id == payment.course_id
            ).first()

            if not existing_enrollment:
                enrollment = EnrollmentModel(
                    user_id=payment.user_id,
                    course_id=payment.course_id,
                    enrolled_at=datetime.utcnow()
                )
                db.add(enrollment)
            
            db.commit()
            
            # return {"status": "success", "message": "Payment completed successfully"}
            return RedirectResponse(url=FRONTEND_SUCCESS_URL, status_code=303) 

        else:
            payment.status = "failed"
            db.commit()
            raise HTTPException(status_code=400, detail="Payment validation failed during verification")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment validation error: {str(e)}")


@router.post("/fail/{transaction_id}")
def payment_fail(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle failed payment"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if payment:
        payment.status = "failed"
        db.commit()
    
    # return {"status": "failed", "message": "Payment failed"}
    return RedirectResponse(url=FRONTEND_FAIL_URL, status_code=303)

@router.post("/cancel/{transaction_id}")
def payment_cancel(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle cancelled payment"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if payment:
        payment.status = "cancelled"
        db.commit()
    
    # return {"status": "cancelled", "message": "Payment cancelled"}
    return RedirectResponse(url=FRONTEND_FAIL_URL, status_code=303)

@router.post("/payment/ipn/{transaction_id}")
def payment_ipn(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle Instant Payment Notification"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    return {"status": "received"}



# ==========================================
# RATING ROUTES 
# ==========================================

@router.post("/courses/{course_id}/rate")
def add_rating(
    course_id: int,
    rating_data: RatingSchema, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    
    rating = rating_data.rating
    comment = rating_data.comment

    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=403, detail="You must be enrolled in this course to rate it")
    
    existing_rating = db.query(RatingModel).filter(
        RatingModel.user_id == current_user.id,
        RatingModel.course_id == course_id
    ).first()
    
    if existing_rating:
        raise HTTPException(status_code=400, detail="You have already rated this course")

    if not is_course_completed(db, current_user.id, course_id):
         raise HTTPException(
             status_code=403, 
             detail="You must complete 100% of the course videos before rating."
         )
    
    if not 1 <= rating <= 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    new_rating = RatingModel(
        user_id=current_user.id,
        course_id=course_id,
        rating=rating,
        comment=comment
    )
    db.add(new_rating)
    db.commit()
    
    return {"status": "success", "message": "Rating added successfully"}

@router.get("/courses/{course_id}/ratings")
def get_course_ratings(
    course_id: int,
    db: Session = Depends(get_db)
):
    """Get all ratings for a course"""
    ratings = db.query(RatingModel).filter(RatingModel.course_id == course_id).all()
    
    result = []
    for rating in ratings:
        result.append({
            "id": rating.id,
            "user_name": f"{rating.user.first_name} {rating.user.last_name}",
            "rating": rating.rating,
            "comment": rating.comment,
            "created_at": rating.created_at
        })
    return {"ratings": result}

@router.get("/courses/{course_id}/rating-summary")
def get_course_rating_summary(
    course_id: int,
    db: Session = Depends(get_db)
):

    from sqlalchemy import func
    
    ratings = db.query(RatingModel).filter(RatingModel.course_id == course_id).all()
    
    if not ratings:
        return {
            "average_rating": 0,
            "total_ratings": 0,
            "rating_distribution": {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
        }
    
    total_ratings = len(ratings)
    average_rating = sum(r.rating for r in ratings) / total_ratings
    
    rating_counts = db.query(
        RatingModel.rating,
        func.count(RatingModel.id)
    ).filter(RatingModel.course_id == course_id).group_by(RatingModel.rating).all()
    
    distribution = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
    for rating, count in rating_counts:
        distribution[str(rating)] = count
    
    return {
        "average_rating": round(average_rating, 2),
        "total_ratings": total_ratings,
        "rating_distribution": distribution
    }



# ==========================================
# Payment History
# ==========================================
@router.get("/payment-history", response_model=List[PaymentReceipt])
def get_my_payment_history(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    payments = db.query(PaymentModel).filter(
        PaymentModel.user_id == current_user.id,
        PaymentModel.status == "completed"
    ).order_by(PaymentModel.payment_date.desc()).all()

    receipts = []
    for payment in payments:
        
        course_title = payment.course.title if payment.course else "Unknown Course"
        
        receipts.append({
            "transaction_id": payment.transaction_id,
            "course_title": course_title,
            "amount": payment.amount,
            "currency": payment.currency,
            "date": payment.payment_date,
            "status": payment.status,
            "payment_method": payment.payment_method or "Online Payment"
        })
        
    return receipts