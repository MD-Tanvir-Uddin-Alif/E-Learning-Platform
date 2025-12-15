from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship
from database_config import Base
from datetime import datetime

class PaymentModel(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    transaction_id = Column(String(100), unique=True, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="BDT")
    status = Column(String(50), default="pending")  
    payment_method = Column(String(50))
    payment_date = Column(DateTime, default=datetime.utcnow)
    sslcommerz_response = Column(String(1000), nullable=True)
    
    user = relationship("UserModel")
    course = relationship("CourseModel")

class RatingModel(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    rating = Column(Integer, nullable=False) 
    comment = Column(String(1000), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("UserModel")
    course = relationship("CourseModel")