from fastapi import FastAPI
from contextlib import asynccontextmanager
import os

from database_config import engine, Base


from routes.auth_route import router as auth_route

Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(auth_route, prefix="/auth")


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app.lifespan = lifespan