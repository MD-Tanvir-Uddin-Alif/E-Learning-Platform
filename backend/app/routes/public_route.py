# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


# -------------------------------
# Import From Files
# -------------------------------
from schemas.category_schema import CategoryCreate, CategoryResponse
from models.category_model import CategoryModel
from models.course_model import CourseModel
from schemas.course_schema import CourseOut
from utils.permission import admin_required
from database_config import get_db

router = APIRouter(tags=["Public"])




# -------------------------------
# Get all Categories
# -------------------------------
@router.get("/all-categories", response_model=list[CategoryResponse])
def get_all_categories(db: Session = Depends(get_db)):
    categories = db.query(CategoryModel).all()
    return 


@router.get("/get-courses", response_model=list[CourseOut])
def get_all_courses(db: Session = Depends(get_db)):
    return db.query(CourseModel).all()
