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
@router.get("/courses")
def get_public_courses(
    db: Session = Depends(get_db)
):
    
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
        CourseModel.is_published == True 
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
            "rating": round(avg_rating, 1), 
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


# -------------------------------
# Get Course Details
# -------------------------------
@router.get("/courses/{course_id}")
def get_public_course_details(
    course_id: int,
    db: Session = Depends(get_db)
):
    
    course_data = db.query(
        CourseModel,
        CategoryModel.name.label("category_name"),
        UserModel.first_name,
        UserModel.last_name,
        UserModel.profile_image,
        UserModel.headline
    ).join(
        UserModel, CourseModel.instructor_id == UserModel.id
    ).join(
        CategoryModel, CourseModel.category_id == CategoryModel.id
    ).filter(
        CourseModel.id == course_id,
        CourseModel.is_published == True 
    ).first()

    if not course_data:
        raise HTTPException(status_code=404, detail="Course not found")

    course, cat_name, fname, lname, p_image, headline = course_data

    ratings = db.query(RatingModel).filter(RatingModel.course_id == course_id).all()
    
    total_ratings = len(ratings)
    average_rating = 0.0
    
    if total_ratings > 0:
        average_rating = round(sum(r.rating for r in ratings) / total_ratings, 1)

    reviews = []
    for r in ratings:
        reviews.append({
            "id": r.id,
            "user_name": f"{r.user.first_name} {r.user.last_name}",
            "user_image": r.user.profile_image,
            "rating": r.rating,
            "comment": r.comment,
            "created_at": r.created_at
        })

    videos_sorted = sorted(course.videos, key=lambda v: v.order if v.order else 0)

    return {
        "id": course.id,
        "title": course.title,
        "sub_title": course.sub_title,
        "description": course.description,
        "is_paid": course.is_paid,
        "price": course.price if course.is_paid else 0.0,
        "image_url": course.image_url,
        "category": cat_name,
        "rating": average_rating,       
        "total_ratings": total_ratings, 
        "instructor_id": course.instructor_id,
        "instructor_name": f"{fname} {lname}",
        "instructor_image": p_image,
        "instructor_headline": headline,
        "videos": [
            {
                "id": v.id,
                "title": v.title,
                "video_url": v.video_url
            }
            for v in videos_sorted
        ],
        "reviews": reviews 
    }