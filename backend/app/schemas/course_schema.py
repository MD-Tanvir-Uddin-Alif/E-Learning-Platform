from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_paid: bool
    price: Optional[float] = None
    category_id: int



class CourseCreate(BaseModel):
    title: str
    description: str | None = None
    is_paid: bool
    price: float | None = None
    category_id: int


class CourseResponse(BaseModel):
    id: int
    title: str
    description: str | None
    is_paid: bool
    price: float | None
    category_id: int
    instructor_id: int
    image_url: str | None

    class Config:
        orm_mode = True



class VideoOut(BaseModel):
    id: int
    title: str
    url: str

    class Config:
        orm_mode = True



class CourseOut(CourseBase):
    id: int
    instructor_id: int
    created_at: datetime
    videos: List[VideoOut] = []

    class Config:
        orm_mode = True