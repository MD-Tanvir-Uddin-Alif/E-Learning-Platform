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
from models.user_models import UserModel
from database_config import get_db




router = APIRouter(tags=["Admin"])



# -------------------------------
# Get All Users
# -------------------------------
@router.get("/users")
def get_all_users(
    db: Session = Depends(get_db),
    admin: UserModel = Depends(admin_required)
):
    users = db.query(UserModel).all()
    return users



# -------------------------------
# Create Category
# -------------------------------
@router.post("/create-category", response_model=CategoryResponse)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    # Check duplicate
    existing = db.query(CategoryModel).filter(CategoryModel.name == category_data.name).first()
    if existing:
        raise HTTPException(400, "Category already exists")

    new_category = CategoryModel(
        name=category_data.name,
        description=category_data.description
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category