from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Float
from sqlalchemy.orm import relationship
from database_config import Base
from datetime import datetime

class CourseModel(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String(150), nullable=False)
    sub_title = Column(String(150), nullable=True)
    description = Column(String(500), nullable=True)
    is_paid = Column(Boolean, default=False)
    price = Column(Float, nullable=True)
    is_published = Column(Boolean, default=False) 
    image_url = Column(String(255), nullable=True) 
    instructor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    instructor = relationship("UserModel")
    videos = relationship("VideoModel", back_populates="course")
    category = relationship("CategoryModel", back_populates="courses")
