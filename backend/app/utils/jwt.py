from datetime import datetime, timedelta
from jose import jwt
from dotenv import load_dotenv
import os

load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY") 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 10

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
