from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.staticfiles import StaticFiles
import os

from database_config import engine, Base

from routes.video_progress_route import router as video_progress_route
from routes.instructor_route import router as instructor_route
from routes.payment_route import router as payment_route
from routes.public_route import router as public_route
from routes.admin_route import router as admin_route
from routes.auth_route import router as auth_route
from routes.user_route import router as user_route

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(video_progress_route, prefix="/progress")
app.include_router(instructor_route, prefix="/instructor")
app.include_router(payment_route, prefix="/payment")
app.include_router(public_route, prefix="/public")
app.include_router(admin_route, prefix="/admin")
app.include_router(auth_route, prefix="/auth")
app.include_router(user_route, prefix="/user")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app.lifespan = lifespan