from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user_schema import UserRegister
from models.user_models import UserModel, UserRole
from database_config import get_db
from uuid import uuid4
from datetime import datetime, timedelta
from utils.hash import hash_password
from utils.send_email import send_verification_email

router = APIRouter()

@router.post("/register")
async def register_account(request: UserRegister, db: Session = Depends(get_db)):

    existing = db.query(UserModel).filter(UserModel.email == request.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    token = str(uuid4())
    expiry = datetime.utcnow() + timedelta(hours=24)

    new_user = UserModel(
        first_name=request.first_name,
        last_name=request.last_name,
        email=request.email,
        password=hash_password(request.password),
        role=UserRole(request.role.value),
        is_verified=False,
        verification_token=token,
        token_expiry=expiry
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    await send_verification_email(new_user.email, token)

    return {"message": "Please check your email to verify your account."}



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
