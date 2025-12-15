from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import requests
import json
from datetime import datetime

from models.payment_model import PaymentModel, RatingModel
from models.course_model import CourseModel
from models.enrollment_model import EnrollmentModel
from models.user_models import UserModel
from database_config import get_db
from .auth_route import get_current_user

router = APIRouter(tags=["Payment"])

# SSLCommerz Configuration (You need to set these in your environment variables)
SSLCOMMERZ_STORE_ID = "your_store_id"
SSLCOMMERZ_STORE_PASSWORD = "your_store_password"
SSLCOMMERZ_SESSION_API = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
SSLCOMMERZ_VALIDATION_API = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"

@router.post("/purchase/{course_id}")
def initiate_payment(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Initiate SSLCommerz payment for a course"""
    
    # Check if course exists and is paid
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if not course.is_paid:
        raise HTTPException(status_code=400, detail="This course is free")
    
    # Check if user is already enrolled
    existing_enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="You are already enrolled in this course")
    
    # Generate unique transaction ID
    transaction_id = str(uuid.uuid4())
    
    # Create payment record
    payment = PaymentModel(
        user_id=current_user.id,
        course_id=course_id,
        transaction_id=transaction_id,
        amount=course.price,
        status="pending"
    )
    db.add(payment)
    db.commit()
    
    # Prepare SSLCommerz payload
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
                "GatewayPageURL": response_data.get('GatewayPageURL'),
                "transaction_id": transaction_id
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to initiate payment")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment gateway error: {str(e)}")

@router.post("/payment/success/{transaction_id}")
def payment_success(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle successful payment"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # Validate payment with SSLCommerz
    validation_params = {
        'val_id': transaction_id,
        'store_id': SSLCOMMERZ_STORE_ID,
        'store_passwd': SSLCOMMERZ_STORE_PASSWORD,
        'format': 'json'
    }
    
    try:
        response = requests.get(SSLCOMMERZ_VALIDATION_API, params=validation_params)
        validation_data = response.json()
        
        if validation_data.get('status') == 'VALID':
            # Update payment status
            payment.status = "completed"
            payment.sslcommerz_response = json.dumps(validation_data)
            
            # Create enrollment
            enrollment = EnrollmentModel(
                user_id=payment.user_id,
                course_id=payment.course_id,
                enrolled_at=datetime.utcnow()
            )
            db.add(enrollment)
            db.commit()
            
            return {"status": "success", "message": "Payment completed successfully"}
        else:
            payment.status = "failed"
            db.commit()
            raise HTTPException(status_code=400, detail="Payment validation failed")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment validation error: {str(e)}")

@router.post("/payment/fail/{transaction_id}")
def payment_fail(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle failed payment"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if payment:
        payment.status = "failed"
        db.commit()
    
    return {"status": "failed", "message": "Payment failed"}

@router.post("/payment/cancel/{transaction_id}")
def payment_cancel(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle cancelled payment"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if payment:
        payment.status = "cancelled"
        db.commit()
    
    return {"status": "cancelled", "message": "Payment cancelled"}

@router.post("/payment/ipn/{transaction_id}")
def payment_ipn(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    """Handle Instant Payment Notification"""
    
    payment = db.query(PaymentModel).filter(PaymentModel.transaction_id == transaction_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # Process IPN notification (implement based on SSLCommerz documentation)
    return {"status": "received"}

@router.post("/courses/{course_id}/rate")
def add_rating(
    course_id: int,
    rating: int,
    comment: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Add rating and comment for a course (only for enrolled students)"""
    
    # Check if user is enrolled in the course
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=403, detail="You must be enrolled in this course to rate it")
    
    # Check if user has already rated this course
    existing_rating = db.query(RatingModel).filter(
        RatingModel.user_id == current_user.id,
        RatingModel.course_id == course_id
    ).first()
    
    if existing_rating:
        raise HTTPException(status_code=400, detail="You have already rated this course")
    
    # Validate rating
    if not 1 <= rating <= 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    # Create rating
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
    """Get rating summary for a course"""
    
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