from pydantic import BaseModel
from typing import Optional, List

class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    is_paid: bool = False
    price: Optional[float] = None
    category_id: int


class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    is_paid: bool
    price: Optional[float]
    category_id: int
    instructor_id: int

    class Config:
        orm_mode = True

