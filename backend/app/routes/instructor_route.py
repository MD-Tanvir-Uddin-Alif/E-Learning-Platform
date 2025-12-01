# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

# -------------------------------
# Import From Files
# -------------------------------
from models.video_progress_model import VideoProgressModel
from models.category_model import CategoryModel
from models.course_model import CourseModel
from models.video_model import VideoModel

from schemas.course_schema import CourseCreate, CourseResponse

from utils.permission import instructor_required

from database_config import get_db


router = APIRouter(tags=["Instructor"])



@router.post("/create-course", response_model=CourseResponse)
def create_course(
    data: CourseCreate,
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    # 🟦 Check category exists
    category = db.query(CategoryModel).filter(CategoryModel.id == data.category_id).first()
    if not category:
        raise HTTPException(404, "Category not found")

    # 🟦 Validate price if paid
    if data.is_paid and (data.price is None or data.price <= 0):
        raise HTTPException(400, "Paid courses must have a valid price")

    # 🟦 Create Course
    new_course = CourseModel(
        title=data.title,
        description=data.description,
        is_paid=data.is_paid,
        price=data.price,
        category_id=data.category_id,
        instructor_id=user.id  
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course