# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session




# -------------------------------
# Import From Files
# -------------------------------
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
