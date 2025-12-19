# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, HTTPException, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session
from typing import List
from uuid import uuid4
import shutil
import json
import os
# -------------------------------
# Import From Files
# -------------------------------
from models.video_progress_model import VideoProgressModel
from models.category_model import CategoryModel
from models.course_model import CourseModel
from models.video_model import VideoModel
from models.user_models import UserModel

from schemas.course_schema import CourseCreate, CourseResponse, CourseOut, MultiVideoResponse

from utils.permission import instructor_required

from database_config import get_db

router = APIRouter(tags=["Instructor"])


COURSE_IMAGE_DIR = "uploads/course_images"

os.makedirs(COURSE_IMAGE_DIR, exist_ok=True)

VIDEO_UPLOAD_DIR = "uploads/videos"
os.makedirs(VIDEO_UPLOAD_DIR, exist_ok=True)


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
    user: UserModel = Depends(instructor_required),
):
    courses = db.query(CourseModel).filter(
        CourseModel.instructor_id == user.id
    ).all()

    result = []
    for course in courses:
        videos = [
            {"url": video.video_url, "title": video.title} 
            for video in course.videos
        ]
        result.append({
            "id": course.id,
            "title": course.title,
            "videos": videos
        })

    return result




# -------------------------------
# Add video in Course
# -------------------------------
@router.post("/courses/{course_id}/add-video", response_model=MultiVideoResponse)
def add_video(
    course_id: int,
    titles: str = Form(...),   # JSON list: ["Intro", "Lesson 1"]
    orders: str = Form(...),   # JSON list: [1, 2]
    videos: List[UploadFile] = File(...),  # multiple video files
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    # Validate course ownership
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(404, "Course not found or unauthorized")

    try:
        titles = json.loads(titles)
        orders = json.loads(orders)
    except:
        raise HTTPException(400, "titles and orders must be JSON lists")

    if len(titles) != len(orders) or len(videos) != len(titles):
        raise HTTPException(
            400,
            "titles, orders, and videos count must match"
        )

    saved_videos = []

    for idx, video in enumerate(videos):
        ext = video.filename.split(".")[-1]
        file_name = f"{uuid4()}.{ext}"
        video_path = os.path.join(VIDEO_UPLOAD_DIR, file_name)

        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        new_video = VideoModel(
            title=titles[idx],
            order=orders[idx],
            video_url=video_path,
            course_id=course_id
        )

        db.add(new_video)
        saved_videos.append(new_video)

    db.commit()

    return {
        "message": "Videos uploaded successfully",
        "uploaded_count": len(saved_videos),
        "videos": saved_videos
    }



# -------------------------------
# Update video in Course
# -------------------------------
@router.patch("/courses/{course_id}/update-videos")
def update_videos(
    course_id: int,
    video_ids: str = Form(...),       # required
    titles: str = Form(None),         # optional
    orders: str = Form(None),         # optional
    videos: List[UploadFile] = File(None),  # optional
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    import json

    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()
    if not course:
        raise HTTPException(404, "Course not found or unauthorized")

    try:
        video_ids = json.loads(video_ids)
    except:
        raise HTTPException(400, "video_ids must be a JSON list")

    if titles:
        try:
            titles = json.loads(titles)
        except:
            raise HTTPException(400, "titles must be a JSON list")
        if len(titles) != len(video_ids):
            raise HTTPException(400, "titles length must match video_ids")

    if orders:
        try:
            orders = json.loads(orders)
        except:
            raise HTTPException(400, "orders must be a JSON list")
        if len(orders) != len(video_ids):
            raise HTTPException(400, "orders length must match video_ids")

    if videos and len(videos) != len(video_ids):
        raise HTTPException(400, "videos count must match video_ids")

    updated_list = []

    for idx, video_id in enumerate(video_ids):
        video_obj = db.query(VideoModel).filter(
            VideoModel.id == video_id,
            VideoModel.course_id == course_id
        ).first()

        if not video_obj:
            raise HTTPException(404, f"Video {video_id} not found")

        if titles:
            video_obj.title = titles[idx]

        if orders:
            video_obj.order = orders[idx]

        if videos:
            file = videos[idx]
            ext = file.filename.split(".")[-1]
            file_name = f"{uuid4()}.{ext}"
            new_path = os.path.join(VIDEO_UPLOAD_DIR, file_name)

            with open(new_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            try:
                if os.path.exists(video_obj.video_url):
                    os.remove(video_obj.video_url)
            except:
                pass

            video_obj.video_url = new_path

        updated_list.append(video_obj)

    db.commit()

    return {
        "message": "Videos updated successfully",
        "updated_count": len(updated_list),
        "videos": [
            {
                "id": v.id,
                "title": v.title,
                "order": v.order,
                "video_url": v.video_url
            }
            for v in updated_list
        ]
    }




# -------------------------------
# Delete video in Course
# -------------------------------
@router.delete("/courses/{course_id}/delete-videos")
def delete_videos(
    course_id: int,
    video_ids: str = Form(...),   # JSON list: [3, 5]
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    import json

    try:
        video_ids = json.loads(video_ids)
    except:
        raise HTTPException(400, "video_ids must be a JSON list")

    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(404, "Course not found or unauthorized")

    videos = db.query(VideoModel).filter(
        VideoModel.id.in_(video_ids),
        VideoModel.course_id == course_id
    ).all()

    if not videos:
        raise HTTPException(404, "No videos found")

    deleted = 0

    for video in videos:
        try:
            if os.path.exists(video.video_url):
                os.remove(video.video_url)
        except:
            pass

        db.delete(video)
        deleted += 1

    db.commit()

    return {
        "message": "Videos deleted successfully",
        "deleted_count": deleted
    }
