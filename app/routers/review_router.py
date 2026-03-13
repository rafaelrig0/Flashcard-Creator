from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.review_service import (
    create_review as create_review_service,
    get_reviews_by_card as get_reviews_by_card_service,
    get_accuracy_by_folder as get_accuracy_by_folder_service,
    get_accuracy_today as get_accuracy_today_service,
    get_accuracy_by_week as get_accuracy_by_week_service
    )

from app.schemas.review import AccuracyResponse, ReviewCreate, ReviewResponse
from app.core.database import get_db

router = APIRouter()

# Criação de uma review
@router.post("/reviews/", response_model=ReviewResponse)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    return create_review_service(db, review)

# Busca as review por cards
@router.get("/reviews/card/{id_card}", response_model=List[ReviewResponse])
def get_reviews_by_card(id_card : int, db: Session = Depends(get_db)):
    db_review_by_card = get_reviews_by_card_service(db, id_card)
    if not db_review_by_card:
        raise HTTPException(status_code=404, detail="No review found")

    return db_review_by_card

# Busca a porcentagem de acertos por pastas
@router.get("/reviews/accuracy/folder/{id_pasta}", response_model=float)
def get_accuracy(id_pasta : int, db: Session = Depends(get_db)):
    db_accuracy_by_folder = get_accuracy_by_folder_service(db, id_pasta)
    if not db_accuracy_by_folder:
        raise HTTPException(status_code=404, detail="No accuracy found")

    return db_accuracy_by_folder

# Busca a porcentagem de acertos no dia
@router.get("/reviews/accuracy/date/today", response_model=AccuracyResponse)
def get_accuracy_today(db: Session = Depends(get_db)):
    return get_accuracy_today_service(db)

# Busca a porcentagem de acertos na semana
@router.get("/reviews/accuracy/date/week", response_model=AccuracyResponse)
def get_accuracy_by_week(db: Session = Depends(get_db)):
    return get_accuracy_by_week_service(db)