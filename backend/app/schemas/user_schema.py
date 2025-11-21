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
