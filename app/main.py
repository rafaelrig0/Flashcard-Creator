from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base

from app.models import cards, folders, reviews, studysessions

from app.routers import card_router, folder_router, review_router, study_session_router

app = FastAPI()

@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(card_router.router)
app.include_router(folder_router.router)
app.include_router(review_router.router)
app.include_router(study_session_router.router)