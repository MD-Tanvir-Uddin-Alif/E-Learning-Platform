from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    if not isinstance(password, str):
        password = password.decode("utf-8")

    return pwd_context.hash(password)

def verify_password(plain, hashed):
    if not isinstance(plain, str):
        plain = plain.decode("utf-8")

    return pwd_context.verify(plain, hashed)
