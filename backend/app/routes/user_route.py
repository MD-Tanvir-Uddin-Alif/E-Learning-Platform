# -------------------------------
# Import From Lybries
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from uuid import uuid4
import shutil
import os


# -------------------------------
# Import From Files
# -------------------------------
from models.user_models import UserModel
from .auth_route import get_current_user 
from database_config import get_db

router = APIRouter(tags=["User"])

UPLOAD_DIR = "uploads/profile_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# -------------------------------
# Protected Route: Get Current User Info
# -------------------------------
@router.get("/me")
def get_my_profile(current_user: UserModel = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "role": current_user.role.value,
        "profile_image": current_user.profile_image,
        "headline": current_user.headline,
        "bio": current_user.bio
    }


# -------------------------------
# Update Profile Route
# -------------------------------
@router.put("/profile")
async def update_profile(
    first_name: Optional[str] = Form(None),
    last_name: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    headline: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    # -----------------------
    profile_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    if email and email != current_user.email:
        existing_user = db.query(UserModel).filter(UserModel.email == email, UserModel.id != current_user.id).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use by another account")
        current_user.email = email

    if first_name:
        current_user.first_name = first_name
    if last_name:
        current_user.last_name = last_name
        
    if headline is not None: 
        current_user.headline = headline
    if bio is not None:
        current_user.bio = bio

    if profile_image:
        ext = profile_image.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        file_location = f"{UPLOAD_DIR}/{filename}"

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        current_user.profile_image = file_location

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": current_user.id,
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
            "email": current_user.email,
            "profile_image": current_user.profile_image,
            "headline": current_user.headline,
            "bio": current_user.bio
        }
    }