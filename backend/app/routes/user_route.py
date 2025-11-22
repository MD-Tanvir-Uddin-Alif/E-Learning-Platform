# -------------------------------
# Import From Lybries
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session




# -------------------------------
# Import Frm Files
# -------------------------------
from models.user_models import UserModel
from .auth_route import get_current_user 

router = APIRouter()


# -------------------------------
# Protected Route: Get Current User Info
# -------------------------------
@router.get("/me")
def get_my_profile(current_user: UserModel = Depends(get_current_user)):
    return {
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "profile_image": current_user.profile_image
    }
