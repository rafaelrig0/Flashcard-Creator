from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.folder_service import (create_folder as create_folder_service,
                                         delete_folder as delete_folder_service,
                                         update_folder as update_folder_service,
                                         get_folder as get_folder_service,
                                         get_folders as get_folders_service)

from app.schemas.folder import FolderCreate, FolderResponse, FolderUpdate
from app.core.database import get_db

router = APIRouter()

# Criação de pastas
@router.post("/folders/", response_model=FolderResponse)
def create_folder(folder: FolderCreate, db: Session = Depends(get_db)):
    return create_folder_service(db, folder)

# Busca todas as pastas
@router.get("/folders/", response_model=List[FolderResponse])
def get_folders(db: Session = Depends(get_db)):
    db_folder = get_folders_service(db)
    if not db_folder:
        raise HTTPException(status_code=404, detail="Folders not found")

    return db_folder

# Busca uma pasta em específico
@router.get("/folders/{id_pasta}", response_model=FolderResponse)
def get_folder(id_pasta: int, db: Session = Depends(get_db)):
    db_folder = get_folder_service(db, id_pasta)
    if not db_folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    return db_folder

# Atualiza uma pasta em específico
@router.put("/folders/{id_pasta}", response_model=FolderResponse)
def update_folder(id_pasta: int , folder: FolderUpdate, db: Session = Depends(get_db)):
    db_folder = get_folder_service(db, id_pasta)
    if not db_folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    return update_folder_service(db, id_pasta, folder)

# Deleta uma pasta em específico
@router.delete("/folders/{id_pasta}", response_model=FolderResponse)
def delete_folder(id_pasta: int, db: Session = Depends(get_db)):
    db_folder = get_folder_service(db, id_pasta)
    if not db_folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    return delete_folder_service(db, id_pasta)