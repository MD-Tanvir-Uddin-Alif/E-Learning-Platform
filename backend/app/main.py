from fastapi import FastAPI
from contextlib import asynccontextmanager
import os

from database_config import engine, Base


Base.metadata.create_all(bind=engine)
app = FastAPI()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app.lifespan = lifespan