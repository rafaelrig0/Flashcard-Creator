from fastapi import FastAPI

from app.core.database import engine, Base

from app import models

app = FastAPI()

@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)