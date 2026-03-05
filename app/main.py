from fastapi import FastAPI

from app.core.database import engine, Base

from app.models import cards, folders, reviews

from app.routers import card_router, folder_router, review_router

app = FastAPI()

@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

app.include_router(card_router.router)
app.include_router(folder_router.router)
app.include_router(review_router.router)