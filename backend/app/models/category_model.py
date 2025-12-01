from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from database_config import Base
from datetime import datetime

class CategoryModel(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    courses = relationship("CourseModel", back_populates="category")
