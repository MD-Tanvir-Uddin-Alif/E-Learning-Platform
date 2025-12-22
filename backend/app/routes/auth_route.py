# -------------------------------
# Import From Lybries
# -------------------------------
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from uuid import uuid4
import shutil
import os


# -------------------------------
# Import Frm Files
# -------------------------------
from utils.jwt import create_access_token, decode_access_token
from schemas.password_schema import ChangePasswordModel
from utils.hash import hash_password, verify_password
from utils.send_email import send_verification_email
from models.user_models import UserModel, UserRole
from schemas.user_schema import UserLogin
from database_config import get_db





router = APIRouter(tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

UPLOAD_DIR = "uploads/profile_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# -------------------------------
# User Registration Route
# -------------------------------
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
    existing_user = db.query(UserModel).filter(UserModel.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    image_path = None
    if profile_image:
        ext = profile_image.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        file_location = f"{UPLOAD_DIR}/{filename}"

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        image_path = file_location  

    token = str(uuid4())
    token_expiry = datetime.utcnow() + timedelta(hours=24)

    
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
# User Login Route
# -------------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": db_user.id, "role": db_user.role.value})
    return {"access_token": token, "token_type": "bearer"}

# from fastapi.security import OAuth2PasswordRequestForm

# @router.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     db_user = db.query(UserModel).filter(UserModel.email == form_data.username).first()
#     if not db_user or not verify_password(form_data.password, db_user.password):
#         raise HTTPException(status_code=400, detail="Invalid credentials")

#     token = create_access_token({"user_id": db_user.id, "role": db_user.role.value})
#     return {"access_token": token, "token_type": "bearer"}


# -------------------------------
# Protected Function
# -------------------------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        return user
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")






# -------------------------------
# NEW ROUTE 1: Change Password (Authenticated)
# -------------------------------
@router.post("/change-password")
def change_password(
    data: ChangePasswordModel,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    # 1. Verify old password
    if not verify_password(data.old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Incorrect old password")
    
    # 2. Hash new password and update
    current_user.password = hash_password(data.new_password)
    db.commit()
    
    return {"message": "Password changed successfully"}