from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    sub_title: str | None = None 
    description: Optional[str] = None
    is_paid: bool
    price: Optional[float] = None
    category_id: int



class CourseCreate(BaseModel):
    title: str
    sub_title: str | None = None 
    description: str | None = None
    is_paid: bool
    price: float | None = None
    category_id: int


class CourseResponse(BaseModel):
    id: int
    title: str
    sub_title: str | None = None 
    description: str | None
    is_paid: bool
    price: float | None
    category_id: int
    instructor_id: int
    image_url: str | None

    class Config:
        orm_mode = True



class VideoOut(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None


class CourseOut(BaseModel):
    id: int
    title: str
    sub_title: str | None = None 
    videos: list[VideoOut] = []


class VideoResponse(BaseModel):
    id: int
    title: str
    order: int
    video_url: str

    class Config:
        orm_mode = True


class MultiVideoResponse(BaseModel):
    message: str
    uploaded_count: int
    videos: list[VideoResponse]