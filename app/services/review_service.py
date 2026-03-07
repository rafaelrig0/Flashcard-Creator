from sqlalchemy.orm import Session

from app.models.cards import Card
from app.models.reviews import Reviews
from app.schemas.review import ReviewCreate

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

