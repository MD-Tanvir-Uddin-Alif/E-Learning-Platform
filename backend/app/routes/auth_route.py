from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, FastAPI
from sqlalchemy.orm import Session
from models.user_models import UserModel, UserRole
from database_config import get_db
from utils.hash import hash_password
from utils.send_email import send_verification_email
from uuid import uuid4
from datetime import datetime, timedelta
import shutil
import os

router = APIRouter()

# Directory to save profile images
UPLOAD_DIR = "uploads/profile_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/register")
async def register_account(
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    profile_image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # 1️⃣ Check if email already exists
    existing_user = db.query(UserModel).filter(UserModel.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2️⃣ Save profile image if provided
    image_path = None
    if profile_image:
        ext = profile_image.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        file_location = f"{UPLOAD_DIR}/{filename}"

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        image_path = file_location  # path to save in DB

    # 3️⃣ Generate email verification token
    token = str(uuid4())
    token_expiry = datetime.utcnow() + timedelta(hours=24)

    # 4️⃣ Create new user
    new_user = UserModel(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hash_password(password),
        role=UserRole(role),
        profile_image=image_path,
        is_verified=False,
        verification_token=token,
        token_expiry=token_expiry
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 5️⃣ Send verification email
    await send_verification_email(email, token)

    return {"message": "Please check your email to verify your account."}


# -------------------------------
# Email Verification Route
# -------------------------------
@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.verification_token == token).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    if datetime.utcnow() > user.token_expiry:
        raise HTTPException(status_code=400, detail="Token expired")

    user.is_verified = True
    user.verification_token = None
    user.token_expiry = None
    db.commit()

    return {"message": "Email verified. You can now login."}


# -------------------------------
# Serve uploaded images via URL
# -------------------------------

