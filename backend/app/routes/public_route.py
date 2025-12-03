# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload


# -------------------------------
# Import From Files
# -------------------------------
from schemas.category_schema import CategoryCreate, CategoryResponse
from models.category_model import CategoryModel
from models.course_model import CourseModel
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
    return 



# -------------------------------
# Get all Courses
# -------------------------------
@router.get("/public/courses")
def get_public_courses(db: Session = Depends(get_db)):
    # Fetch all courses with at least one video
    courses = db.query(CourseModel).join(CourseModel.videos).options(
        joinedload(CourseModel.instructor),
        joinedload(CourseModel.videos)
    ).all()

    result = []

    for c in courses:
        if not c.videos:
            continue  # skip courses without videos

        # Sort videos by order
        videos_sorted = sorted(c.videos, key=lambda v: v.order if v.order else 0)

        result.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "is_paid": c.is_paid,
            "price": c.price,
            "image_url": c.image_url,
            "instructor_id": c.instructor_id,
            "instructor_name": f"{c.instructor.first_name} {c.instructor.last_name}" if c.instructor else None,
            "instructor_image": c.instructor.profile_image if c.instructor else None,
            "videos": [
                {
                    "id": v.id,
                    "title": v.title,
                    "order": v.order,
                    "video_url": v.video_url
                } for v in videos_sorted
            ]
        })

    return {
        "count": len(result),
        "courses": result
    }