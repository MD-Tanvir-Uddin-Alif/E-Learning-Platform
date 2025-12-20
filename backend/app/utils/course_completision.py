from sqlalchemy.orm import Session

from models.video_model import VideoModel
from models.video_progress_model import VideoProgressModel





def is_course_completed(db: Session, user_id: int, course_id: int) -> bool:
    """Returns True if the user has watched ALL videos in the course"""
    
    total_videos = db.query(VideoModel).filter(VideoModel.course_id == course_id).count()
    
    if total_videos == 0:
        return False
        

    watched_count = db.query(VideoProgressModel).join(VideoModel).filter(
        VideoProgressModel.user_id == user_id,
        VideoProgressModel.course_id == course_id,
        VideoProgressModel.watched == True
    ).count()
    
    return watched_count == total_videos
