from pydantic import BaseModel, EmailStr
from enum import Enum

class UserRoleEnum(str, Enum):
    user = "user"
    instructor = "instructor"

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    role: UserRoleEnum


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"