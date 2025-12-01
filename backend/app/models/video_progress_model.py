from sqlalchemy import Column, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database_config import Base
from datetime import datetime


class VideoProgressModel(Base):
    __tablename__ = "video_progress"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    video_id = Column(Integer, ForeignKey("videos.id"))
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
