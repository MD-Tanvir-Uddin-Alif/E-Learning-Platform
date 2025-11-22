from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from database_config import Base
import enum
from datetime import datetime

class UserRole(enum.Enum):
    user = "user"
    instructor = "instructor"
    admin = "admin"

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    profile_image: str = Column(String(255), nullable=True)
    password = Column(String(255), nullable=False)

    role = Column(Enum(UserRole), nullable=False)

    is_verified = Column(Boolean, default=False)
    verification_token = Column(String(255), nullable=True)
    token_expiry = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
