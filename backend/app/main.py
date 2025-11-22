from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.staticfiles import StaticFiles
import os

from database_config import engine, Base


from routes.auth_route import router as auth_route
from routes.user_route import router as user_route

Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(auth_route, prefix="/auth")
app.include_router(user_route, prefix="/user")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app.lifespan = lifespan