from sqlalchemy import Column, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database_config import Base
from datetime import datetime


class VideoProgressModel(Base):
    __tablename__ = "video_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)
    
    watched = Column(Boolean, default=False)
    watch_date = Column(DateTime, default=datetime.utcnow)

    user = relationship("UserModel")
    video = relationship("VideoModel")
    course = relationship("CourseModel")
