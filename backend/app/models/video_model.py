from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Float
from sqlalchemy.orm import relationship
from database_config import Base
from datetime import datetime



class VideoModel(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String(150), nullable=False)
    video_url = Column(String(255), nullable=False)
    order = Column(Integer, nullable=False)   

    course = relationship("CourseModel", back_populates="videos")
