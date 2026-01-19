# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session




# -------------------------------
# Import From Files
# -------------------------------
from utils.send_email import send_blocked_notification_email, send_unblocked_notification_email
from schemas.category_schema import CategoryCreate, CategoryResponse
from models.category_model import CategoryModel
from models.payment_model import PaymentModel
from models.course_model import CourseModel
from utils.permission import admin_required
from models.user_models import UserModel
from database_config import get_db




router = APIRouter(tags=["Admin"])



# -------------------------------
# Get All Users
# -------------------------------
@router.get("/users")
def get_all_users(
    db: Session = Depends(get_db),
    admin: UserModel = Depends(admin_required)
):
    users = db.query(UserModel).all()
    return users



# -------------------------------
# Create Category
# -------------------------------
@router.post("/create-category", response_model=CategoryResponse)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    
    existing = db.query(CategoryModel).filter(CategoryModel.name == category_data.name).first()
    if existing:
        raise HTTPException(400, "Category already exists")

    new_category = CategoryModel(
        name=category_data.name,
        description=category_data.description
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category



# -------------------------------
# Update Category
# -------------------------------
@router.put("/update-category/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    category = db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
    if not category:
        raise HTTPException(404, "Category not found")

    category.name = category_data.name
    category.description = category_data.description

    db.commit()
    db.refresh(category)

    return category





# -------------------------------
# Delete Category
# -------------------------------
@router.delete("/delete-category/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    category = db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
    if not category:
        raise HTTPException(404, "Category not found")

    db.delete(category)
    db.commit()

    return {"message": "Category deleted successfully"}




@router.put("/users/{user_id}/block")
async def block_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user: UserModel = Depends(admin_required)
):
    """
    Block a user. 
    1. Prevents login.
    2. Sends notification email.
    """
    
    # 1. Find the user to block
    user_to_block = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user_to_block:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 2. Prevent blocking yourself
    if user_to_block.id == admin_user.id:
        raise HTTPException(status_code=400, detail="You cannot block yourself")

    # 3. Check if already blocked
    if user_to_block.is_blocked:
        return {"message": "User is already blocked"}

    # 4. Block user
    user_to_block.is_blocked = True
    db.commit()
    
    # 5. Send Email
    try:
        await send_blocked_notification_email(user_to_block.email)
    except Exception as e:
        print(f"Failed to send block email: {str(e)}")

    return {"message": f"User {user_to_block.first_name} has been blocked successfully."}


@router.put("/users/{user_id}/unblock")
async def unblock_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user: UserModel = Depends(admin_required)
):
    """Unblock a user"""
    
    user_to_unblock = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user_to_unblock:
        raise HTTPException(status_code=404, detail="User not found")

    if not user_to_unblock.is_blocked:
        return {"message": "User is not blocked"}

    user_to_unblock.is_blocked = False
    db.commit()

    try:
        await send_unblocked_notification_email(user_to_unblock.email)
    except Exception as e:
        print(f"Failed to send unblock email: {str(e)}")

    return {"message": f"User {user_to_unblock.first_name} has been unblocked."}



@router.get("/analytics/earnings")
def get_admin_earnings(
    db: Session = Depends(get_db),
    admin_user: UserModel = Depends(admin_required)
):
    """
    Admin Dashboard:
    - Total Gross Revenue (100%)
    - Admin Net Revenue (25%)
    - Total Instructor Payouts (75%)
    - All Transaction History
    """
    
    # 1. Fetch all COMPLETED payments
    payments = db.query(PaymentModel).filter(
        PaymentModel.status == "completed"
    ).all()

    total_gross_revenue = 0.0
    transactions = []

    for p in payments:
        total_gross_revenue += p.amount
        
        # Get course title
        course = db.query(CourseModel).filter(CourseModel.id == p.course_id).first()
        course_title = course.title if course else "Unknown Course"
        
        # Get instructor info
        instructor_name = "Unknown"
        if course:
            inst = db.query(UserModel).filter(UserModel.id == course.instructor_id).first()
            if inst:
                instructor_name = f"{inst.first_name} {inst.last_name}"

        transactions.append({
            "transaction_id": p.transaction_id,
            "course_title": course_title,
            "instructor": instructor_name,
            "amount": p.amount,
            "date": p.payment_date,
            "admin_share": p.amount * 0.25,
            "instructor_share": p.amount * 0.75
        })

    # 2. Calculate Splits
    admin_net_revenue = total_gross_revenue * 0.25
    instructor_payouts = total_gross_revenue * 0.75

    return {
        "total_gross_revenue": total_gross_revenue,
        "admin_net_revenue": admin_net_revenue,
        "total_instructor_payouts": instructor_payouts,
        "total_transactions": len(transactions),
        "transactions": transactions
    }