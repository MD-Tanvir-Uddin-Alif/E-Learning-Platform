# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, HTTPException, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session
from uuid import uuid4
import shutil
# -------------------------------
# Import From Files
# -------------------------------
from models.video_progress_model import VideoProgressModel
from models.category_model import CategoryModel
from models.course_model import CourseModel
from models.video_model import VideoModel

from schemas.course_schema import CourseCreate, CourseResponse, CourseOut

from utils.permission import instructor_required

from database_config import get_db


router = APIRouter(tags=["Instructor"])


COURSE_IMAGE_DIR = "uploads/course_images"

import os
os.makedirs(COURSE_IMAGE_DIR, exist_ok=True)


# -------------------------------
# Create Course
# -------------------------------
@router.post("/create-course", response_model=CourseResponse)
def create_course(
    title: str = Form(...),
    description: str = Form(""),
    is_paid: bool = Form(...),
    price: float = Form(None),
    category_id: int = Form(...),
    image: UploadFile = File(None),
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    category = db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
    if not category:
        raise HTTPException(404, "Category not found")

    if is_paid and (price is None or price <= 0):
        raise HTTPException(400, "Paid course must have a valid price")

    image_path = None
    if image:
        ext = image.filename.split(".")[-1]
        file_name = f"{uuid4()}.{ext}"
        file_location = os.path.join(COURSE_IMAGE_DIR, file_name)

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        image_path = file_location

    new_course = CourseModel(
        title=title,
        description=description,
        is_paid=is_paid,
        price=price,
        category_id=category_id,
        instructor_id=user.id,
        image_url=image_path
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


# -------------------------------
# View Own Courses
# -------------------------------
@router.get("/my-courses", response_model=list[CourseOut])
def get_my_courses(
    db: Session = Depends(get_db),
    user = Depends(instructor_required),
):
    courses = db.query(CourseModel).filter(
        CourseModel.instructor_id == user.id
    ).all()

    return courses
