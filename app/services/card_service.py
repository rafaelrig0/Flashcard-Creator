from sqlalchemy.orm import Session

from app.models.cards import Card
from app.schemas.card import CardCreate, CardUpdate


def create_card(db: Session, card: CardCreate):
    db_card = Card(pergunta=card.pergunta, resposta=card.resposta, id_pasta=card.id_pasta)
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

def update_card(db: Session, id_card: int, card: CardUpdate):
    db_card = db.query(Card).filter(Card.id_card == id_card).first()
    db_card.pergunta = card.pergunta
    db_card.resposta = card.resposta
    db.commit()
    db.refresh(db_card)
    return db_card

def delete_card(db: Session, id_card: int):
    db_card = db.query(Card).filter(Card.id_card == id_card).first()
    db.delete(db_card)
    db.commit()
    return db_card

def get_card(db: Session, id_card: int):
    db_card = db.query(Card).filter(Card.id_card == id_card).first()
    return db_card

def get_cards(db: Session, skip: int = 0, limit: int = 100):
    db_cards = db.query(Card).offset(skip).limit(limit).all()
    return db_cards

def get_card_by_folder(db: Session, folder_id: int, skip: int = 0, limit: int = 100):
    db_card_by_folder = db.query(Card).filter(Card.id_pasta == folder_id).offset(skip).limit(limit).all()
    return db_card_by_folder