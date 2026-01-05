# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func


# -------------------------------
# Import From Files
# -------------------------------
from schemas.category_schema import CategoryCreate, CategoryResponse
from models.category_model import CategoryModel
from models.course_model import CourseModel
from models.user_models import UserModel
from models.payment_model import RatingModel
from schemas.course_schema import CourseOut
from models.video_model import VideoModel
from utils.permission import admin_required
from database_config import get_db

router = APIRouter(tags=["Public"])




# -------------------------------
# Get all Categories
# -------------------------------
@router.get("/all-categories", response_model=list[CategoryResponse])
def get_all_categories(db: Session = Depends(get_db)):
    categories = db.query(CategoryModel).all()
    return categories



# -------------------------------
# Get all Courses
# -------------------------------
@router.get("/public/courses")
def get_public_courses(
    db: Session = Depends(get_db)
):
    """
    Fetch all published courses with:
    - Instructor Details
    - Category Name
    - Calculated Average Rating
    """
    
    # We use a specific query to join tables and aggregate ratings efficiently
    courses_query = db.query(
        CourseModel,
        CategoryModel.name.label("category_name"),
        UserModel.first_name,
        UserModel.last_name,
        UserModel.profile_image,
        func.coalesce(func.avg(RatingModel.rating), 0).label("average_rating"),
        func.count(RatingModel.id).label("total_ratings")
    ).join(
        UserModel, CourseModel.instructor_id == UserModel.id
    ).join(
        CategoryModel, CourseModel.category_id == CategoryModel.id
    ).outerjoin(
        RatingModel, CourseModel.id == RatingModel.course_id
    ).filter(
        CourseModel.is_published == True # Only show published courses
    ).group_by(
        CourseModel.id, CategoryModel.id, UserModel.id
    ).all()

    result = []
    
    for course, cat_name, fname, lname, p_image, avg_rating, count in courses_query:
        result.append({
            "id": course.id,
            "title": course.title,
            "sub_title": course.sub_title,
            "category": cat_name,
            "rating": round(avg_rating, 1), # Round to 1 decimal (e.g., 4.5)
            "total_ratings": count,
            "image_url": course.image_url,
            "instructor_id": course.instructor_id,
            "instructor_name": f"{fname} {lname}",
            "instructor_image": p_image,
            "price": course.price if course.is_paid else 0.0,
            "is_paid": course.is_paid
        })

    return {
        "count": len(result),
        "courses": result
    }