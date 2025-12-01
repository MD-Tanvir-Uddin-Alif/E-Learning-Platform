from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database_config import Base
from datetime import datetime


class EnrollmentModel(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    enrolled_at = Column(DateTime, default=datetime.utcnow)
