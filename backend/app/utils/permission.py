# -------------------------------
# Import From Libries
# -------------------------------
from fastapi import Depends, HTTPException


# -------------------------------
# Import From Files
# -------------------------------
from routes.auth_route import get_current_user
from models.user_models import UserModel
from database_config import get_db



# -------------------------------------------
# Check is reqest coming from admin or not
# -------------------------------------------
def admin_required(current_user: UserModel = Depends(get_current_user)):
    if current_user.role.value != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can perform this action"
        )
    return current_user
