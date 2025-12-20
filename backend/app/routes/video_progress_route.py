from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from models.video_progress_model import VideoProgressModel
from utils.course_completision import is_course_completed
from models.enrollment_model import EnrollmentModel
from routes.auth_route import get_current_user
from models.payment_model import RatingModel
from models.course_model import CourseModel
from models.video_model import VideoModel
from models.user_models import UserModel
from database_config import get_db


router = APIRouter(tags=["Video Progress"])


@router.post("/videos/{video_id}/progress")
def update_video_progress(
    video_id: int,
    watched: bool,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Update video watch progress for current user"""
    
    # Get video info
    video = db.query(VideoModel).filter(VideoModel.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Check enrollment
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == video.course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=403, detail="You must be enrolled in this course")
    
    # Update or Create Progress
    progress = db.query(VideoProgressModel).filter(
        VideoProgressModel.user_id == current_user.id,
        VideoProgressModel.video_id == video_id
    ).first()
    
    if progress:
        progress.watched = watched
        progress.watch_date = func.now()
    else:
        progress = VideoProgressModel(
            user_id=current_user.id,
            course_id=video.course_id, # Storing course_id helps with faster queries later
            video_id=video_id,
            watched=watched,
            watch_date=func.now()
        )
        db.add(progress)
    
    db.commit()
    
    return {"status": "success", "watched": watched}

@router.get("/courses/{course_id}/progress")
def get_course_progress(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Get detailed progress for a course"""
    
    # Check enrollment
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=403, detail="Not enrolled")
    
    videos = db.query(VideoModel).filter(VideoModel.course_id == course_id).order_by(VideoModel.order).all()
    
    # Get watched status efficiently
    progress_records = db.query(VideoProgressModel).filter(
        VideoProgressModel.user_id == current_user.id,
        VideoProgressModel.course_id == course_id
    ).all()
    
    # Convert to a set of watched video IDs for fast lookup
    watched_video_ids = {p.video_id for p in progress_records if p.watched}
    
    total = len(videos)
    watched = len(watched_video_ids)
    percentage = (watched / total * 100) if total > 0 else 0
    
    video_list = []
    for vid in videos:
        video_list.append({
            "id": vid.id,
            "title": vid.title,
            "order": vid.order,
            "watched": vid.id in watched_video_ids
        })
        
    return {
        "course_id": course_id,
        "total_videos": total,
        "watched_videos": watched,
        "completion_percentage": round(percentage, 2),
        "is_completed": watched == total and total > 0,
        "videos": video_list
    }

@router.get("/courses/{course_id}/can-rate")
def can_rate_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Check if user is allowed to rate"""
    
    # 1. Enrolled?
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    if not enrollment:
        return {"can_rate": False, "reason": "Not enrolled"}

    # 2. Already Rated?
    rating = db.query(RatingModel).filter(
        RatingModel.user_id == current_user.id,
        RatingModel.course_id == course_id
    ).first()
    if rating:
        return {"can_rate": False, "reason": "Already rated"}

    # 3. Completed?
    if is_course_completed(db, current_user.id, course_id):
        return {"can_rate": True, "reason": "Eligible"}
    else:
        return {"can_rate": False, "reason": "Course not completed"}