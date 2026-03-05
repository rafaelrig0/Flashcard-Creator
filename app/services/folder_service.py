from sqlalchemy.orm import Session
from app.schemas.folder import FolderCreate, FolderUpdate
from app.models.folders import Folder

def create_folder(db: Session, folder: FolderCreate):
    db_folder = Folder(nome=folder.nome)
    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)
    return db_folder

def delete_folder(db: Session, id_pasta: int):
    db_folder = db.query(Folder).filter(Folder.id_pasta == id_pasta).first()
    db.delete(db_folder)
    db.commit()
    return db_folder

def get_folder(db: Session, id_pasta: int):
    db_folder = db.query(Folder).filter(Folder.id_pasta == id_pasta).first()
    return db_folder

def get_folders(db: Session, skip: int = 0, limit: int = 100):
    db_folders = db.query(Folder).offset(skip).limit(limit).all()
    return db_folders

def update_folder(db: Session, id_pasta: int, folder: FolderUpdate):
    db_folder = db.query(Folder).filter(Folder.id_pasta == id_pasta).first()
    db_folder.nome = folder.nome
    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)
    return db_folder

