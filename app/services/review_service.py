from sqlalchemy.orm import Session
from sqlalchemy import Date

from app.models.cards import Card
from app.models.reviews import Reviews
from app.schemas.review import ReviewCreate

from datetime import date, timedelta

def create_review(db: Session, review: ReviewCreate):
    db_review = Reviews(acertou = review.acertou, id_card = review.id_card)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def get_reviews_by_card(db: Session, id_card: int):
    return db.query(Reviews).filter(Reviews.id_card == id_card).all()

def get_accuracy_by_folder(db: Session, id_pasta: int):
    total = (db.query(Reviews).join(Card, Reviews.id_card == Card.id_card).
             filter(Card.id_pasta == id_pasta).count())

    acertos = (db.query(Reviews).join(Card, Reviews.id_card == Card.id_card)
               .filter(Card.id_pasta == id_pasta, Reviews.acertou == True).count())

    if total == 0:
        return 0
    return round((acertos / total) * 100, 2)

def get_accuracy_today(db: Session):
    hoje = date.today()
    total = db.query(Reviews).filter(Reviews.data_hora.cast(Date) == hoje).count()
    acertos = db.query(Reviews).filter(Reviews.data_hora.cast(Date) == hoje, Reviews.acertou == True).count()

    if total == 0:
        return {
            "percentage": 0,
            "total": 0,
            "correct": 0
        }
    return {
        "percentage": round((acertos / total) * 100, 2),
        "total": total,
        "correct": acertos
    }

def get_accuracy_by_week(db: Session):
    hoje = date.today()
    last_7_days = hoje - timedelta(days=7)
    total = db.query(Reviews).filter(Reviews.data_hora.cast(Date) >= last_7_days).count()
    acertos = db.query(Reviews).filter(Reviews.data_hora.cast(Date) >= last_7_days, Reviews.acertou == True).count()

    if total == 0:
        return {
            "percentage": 0,
            "total": 0,
            "correct": 0
        }
    return {
        "percentage": round((acertos / total) * 100, 2),
        "total": total,
        "correct": acertos
    }