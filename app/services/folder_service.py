from sqlalchemy.orm import Session
from sqlalchemy import func, case

from app.schemas.folder import FolderCreate, FolderUpdate
from app.models.folders import Folder
from app.models.reviews import Reviews
from app.models.cards import Card

def create_folder(db: Session, folder: FolderCreate):
    db_folder = Folder(nome=folder.nome)
    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)
    return db_folder

def delete_folder(db: Session, id_pasta: int):
    db_folder = db.query(Folder).filter(Folder.id_pasta == id_pasta).first()
    deleted_folder = db_folder
    if not db_folder:
        return None
    db.delete(db_folder)
    db.commit()
    return deleted_folder

def get_folder(db: Session, id_pasta: int):
    total_reviews = func.count(Reviews.id_review)
    correct_reviews = func.sum(case((Reviews.acertou == True, 1), else_=0))
    accuracy = (correct_reviews * 100.0) / func.nullif(total_reviews, 0)
    folder = (
        db.query(
            Folder.id_pasta,
            Folder.nome,
            func.count(func.distinct(Card.id_card)).label("cards_count"),
            correct_reviews.label("correct_answers"),
            total_reviews.label("total_reviews"),
            accuracy.label("accuracy")
    )
    .outerjoin(Card, Card.id_pasta == Folder.id_pasta)
    .outerjoin(Reviews, Reviews.id_card == Card.id_card)
    .filter(Folder.id_pasta == id_pasta)
    .group_by(Folder.id_pasta)
    .first()
    )

    return folder

def get_folders(db: Session, skip: int = 0, limit: int = 100):

    total_reviews = func.count(Reviews.id_review)
    correct_reviews = func.sum(case((Reviews.acertou == True, 1), else_=0))
    accuracy = func.coalesce(
        func.round((correct_reviews * 100.0) / func.nullif(total_reviews, 0), 2),
        0
    )

    folders = (
        db.query(
            Folder.id_pasta,
            Folder.nome,
            func.count(func.distinct(Card.id_card)).label("cards_count"),
            correct_reviews.label("correct_answers"),
            total_reviews.label("total_reviews"),
            accuracy.label("accuracy")
        )
        .outerjoin(Card, Card.id_pasta == Folder.id_pasta)
        .outerjoin(Reviews, Reviews.id_card == Card.id_card)
        .group_by(Folder.id_pasta)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return folders

def update_folder(db: Session, id_pasta: int, folder: FolderUpdate):
    db_folder = db.query(Folder).filter(Folder.id_pasta == id_pasta).first()
    if not db_folder:
        return None
    
    db_folder.nome = folder.nome
    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)
    return db_folder

