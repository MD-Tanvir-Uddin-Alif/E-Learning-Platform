from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from models.video_progress_model import VideoProgressModel
from models.video_model import VideoModel
from models.enrollment_model import EnrollmentModel
from models.course_model import CourseModel
from database_config import get_db
from routes.auth_route import get_current_user
from models.user_models import UserModel

router = APIRouter(tags=["Video Progress"])

@router.post("/videos/{video_id}/progress")
def update_video_progress(
    video_id: int,
    watched: bool,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Update video watch progress for current user"""
    
    # Get video and course info
    video = db.query(VideoModel).filter(VideoModel.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    course_id = video.course_id
    
    # Check if user is enrolled in the course
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=403, detail="You must be enrolled in this course")
    
    # Update or create progress record
    progress = db.query(VideoProgressModel).filter(
        VideoProgressModel.user_id == current_user.id,
        VideoProgressModel.video_id == video_id
    ).first()
    
    if progress:
        progress.watched = watched
        progress.watch_date = db.func.now()
    else:
        progress = VideoProgressModel(
            user_id=current_user.id,
            video_id=video_id,
            watched=watched
        )
        db.add(progress)
    
    db.commit()
    
    return {
        "status": "success",
        "message": "Video progress updated",
        "watched": watched
    }

@router.get("/courses/{course_id}/progress")
def get_course_progress(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Get video progress for a specific course"""
    
    # Check if user is enrolled
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=403, detail="You must be enrolled in this course")
    
    # Get all videos for the course
    videos = db.query(VideoModel).filter(VideoModel.course_id == course_id).all()
    
    # Get user's progress for these videos
    video_ids = [video.id for video in videos]
    progress_records = db.query(VideoProgressModel).filter(
        VideoProgressModel.user_id == current_user.id,
        VideoProgressModel.video_id.in_(video_ids)
    ).all()
    
    # Create progress map
    progress_map = {p.video_id: p.watched for p in progress_records}
    
    # Calculate completion percentage
    total_videos = len(videos)
    watched_videos = sum(1 for video in videos if progress_map.get(video.id, False))
    completion_percentage = (watched_videos / total_videos * 100) if total_videos > 0 else 0
    
    # Check if course is completed (all videos watched)
    course_completed = watched_videos == total_videos and total_videos > 0
    
    return {
        "course_id": course_id,
        "total_videos": total_videos,
        "watched_videos": watched_videos,
        "completion_percentage": round(completion_percentage, 2),
        "course_completed": course_completed,
        "videos": [
            {
                "id": video.id,
                "title": video.title,
                "watched": progress_map.get(video.id, False)
            }
            for video in videos
        ]
    }

@router.get("/courses/completed")
def get_completed_courses(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Get all courses completed by the user"""
    
    # Get all enrolled courses
    enrollments = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id
    ).all()
    
    completed_courses = []
    
    for enrollment in enrollments:
        course_id = enrollment.course_id
        
        # Get course progress
        course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
        if not course:
            continue
        
        # Get all videos for the course
        videos = db.query(VideoModel).filter(VideoModel.course_id == course_id).all()
        
        if not videos:
            continue
        
        # Check if all videos are watched
        video_ids = [video.id for video in videos]
        watched_count = db.query(VideoProgressModel).filter(
            VideoProgressModel.user_id == current_user.id,
            VideoProgressModel.video_id.in_(video_ids),
            VideoProgressModel.watched == True
        ).count()
        
        if watched_count == len(videos):
            completed_courses.append({
                "id": course.id,
                "title": course.title,
                "completed_date": enrollment.enrolled_at
            })
    
    return {"completed_courses": completed_courses}

@router.get("/courses/{course_id}/can-rate")
def can_rate_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Check if user can rate a course (must be enrolled and completed)"""
    
    # Check enrollment
    enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.user_id == current_user.id,
        EnrollmentModel.course_id == course_id
    ).first()
    
    if not enrollment:
        return {
            "can_rate": False,
            "reason": "You must be enrolled in this course to rate it"
        }
    
    # Get all videos for the course
    videos = db.query(VideoModel).filter(VideoModel.course_id == course_id).all()
    
    if not videos:
        return {
            "can_rate": False,
            "reason": "This course has no videos to complete"
        }
    
    # Check if all videos are watched
    video_ids = [video.id for video in videos]
    watched_count = db.query(VideoProgressModel).filter(
        VideoProgressModel.user_id == current_user.id,
        VideoProgressModel.video_id.in_(video_ids),
        VideoProgressModel.watched == True
    ).count()
    
    if watched_count < len(videos):
        return {
            "can_rate": False,
            "reason": f"You must complete all videos to rate this course ({watched_count}/{len(videos)} watched)"
        }
    
    # Check if already rated
    from models.payment_model import RatingModel
    existing_rating = db.query(RatingModel).filter(
        RatingModel.user_id == current_user.id,
        RatingModel.course_id == course_id
    ).first()
    
    if existing_rating:
        return {
            "can_rate": False,
            "reason": "You have already rated this course"
        }
    
    return {
        "can_rate": True,
        "reason": "You can rate this course"
    }