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
from utils.permission import admin_required
from database_config import get_db

router = APIRouter(tags=["Public"])




# -------------------------------
# Get all Categories
# -------------------------------
@router.get("/", response_model=list[CategoryResponse])
def get_all_categories(db: Session = Depends(get_db)):
    categories = db.query(CategoryModel).all()
    return categories