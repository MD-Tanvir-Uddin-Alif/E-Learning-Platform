# -------------------------------
# Import From Lybries
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import uuid4
import shutil
import os


# -------------------------------
# Import From Files
# -------------------------------
from models.user_models import UserModel
from models.course_model import CourseModel
from models.enrollment_model import EnrollmentModel
from models.category_model import CategoryModel
from models.video_model import VideoModel
from schemas.course_schema import EnrolledCourseResponse
from .auth_route import get_current_user 
from database_config import get_db

router = APIRouter(tags=["User"])

UPLOAD_DIR = "uploads/profile_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# -------------------------------
# Protected Route: Get Current User Info
# -------------------------------
@router.get("/me")
def get_my_profile(current_user: UserModel = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "role": current_user.role.value,
        "profile_image": current_user.profile_image,
        "headline": current_user.headline,
        "bio": current_user.bio
    }


# -------------------------------
# Update Profile Route
# -------------------------------
@router.put("/profile")
async def update_profile(
    first_name: Optional[str] = Form(None),
    last_name: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    headline: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    # -----------------------
    profile_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    if email and email != current_user.email:
        existing_user = db.query(UserModel).filter(UserModel.email == email, UserModel.id != current_user.id).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use by another account")
        current_user.email = email

    if first_name:
        current_user.first_name = first_name
    if last_name:
        current_user.last_name = last_name
        
    if headline is not None: 
        current_user.headline = headline
    if bio is not None:
        current_user.bio = bio

    if profile_image:
        ext = profile_image.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        file_location = f"{UPLOAD_DIR}/{filename}"

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        current_user.profile_image = file_location

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": current_user.id,
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
            "email": current_user.email,
            "profile_image": current_user.profile_image,
            "headline": current_user.headline,
            "bio": current_user.bio
        }
    }



# -------------------------------
# NEW: Get User's Enrolled Courses
# -------------------------------
@router.get("/my-enrollments", response_model=List[EnrolledCourseResponse])
def get_my_enrollments(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """
    Fetch all courses the user has enrolled in.
    """
    enrollments = db.query(
        EnrollmentModel,
        CourseModel,
        UserModel,
        CategoryModel
    ).join(
        CourseModel, EnrollmentModel.course_id == CourseModel.id
    ).join(
        UserModel, CourseModel.instructor_id == UserModel.id
    ).join(
        CategoryModel, CourseModel.category_id == CategoryModel.id
    ).filter(
        EnrollmentModel.user_id == current_user.id
    ).all()

    result = []
    for enrollment, course, instructor, category in enrollments:
        result.append({
            "id": course.id,
            "title": course.title,
            "sub_title": course.sub_title,
            "image_url": course.image_url,
            "instructor_name": f"{instructor.first_name} {instructor.last_name}",
            "category_name": category.name,
            "progress": 0.0 # You can link your progress logic here later
        })
    
    return result


# -------------------------------
# NEW: Get Enrolled Course Details (Watch Page)
# -------------------------------
@router.get("/my-courses/{course_id}")
def get_enrolled_course_details(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """
    Fetch full details + Videos for a course ONLY IF user is enrolled.
    """
    # 1. Verify Enrollment
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=403, detail="You are not enrolled in this course.")

    # 2. Fetch Course Details
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # 3. Fetch Videos (Sorted)
    videos = db.query(VideoModel).filter(
        VideoModel.course_id == course_id
    ).order_by(VideoModel.order).all()

    video_list = [
        {
            "id": v.id,
            "title": v.title,
            "video_url": v.video_url,
            "order": v.order
        }
        for v in videos
    ]

    return {
        "id": course.id,
        "title": course.title,
        "sub_title": course.sub_title,
        "description": course.description,
        "videos": video_list
    }