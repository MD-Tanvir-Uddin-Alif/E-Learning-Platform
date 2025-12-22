from pydantic import BaseModel, EmailStr



class ChangePasswordModel(BaseModel):
    old_password: str
    new_password: str

class ForgotPasswordModel(BaseModel):
    email: EmailStr

class ResetPasswordModel(BaseModel):
    token: str
    new_password: str
