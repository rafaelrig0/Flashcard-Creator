from fastapi import APIRouter, Depends,  HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.studysession_service import (
    create_studysession as create_studysession_service,
    get_allstudysessions as get_allstudysessions_service,
    get_studysessionbyfolder as get_studysessionbyfolder_service,
    finish_studysession as finish_studysession_service
)
from app.schemas.studysession import StudySessionCreate, StudySessionResponse, StudySessionUpdate

router = APIRouter()

# Criar sessão de estudo
@router.post("/study/", response_model=StudySessionResponse)
def create_studysession(studySession: StudySessionCreate, db: Session = Depends(get_db)):
    return create_studysession_service(db, studySession)

# Busca todas as sessões de estudo
@router.get("/study/", response_model=List[StudySessionResponse])
def get_allstudysessions(id_pasta: int, db: Session = Depends(get_db)):
    db_studysession = get_allstudysessions_service(db, id_pasta)
    return db_studysession

# Busca uma sessão de estudo pela pasta
@router.get("/study/{id_pasta}", response_model=StudySessionResponse)
def get_studysessionbyfolder(id_pasta: int, db: Session = Depends(get_db)):
    db_studysession = get_studysessionbyfolder_service(db, id_pasta)
    if not db_studysession:
        raise HTTPException(status_code=404, detail="Folder not found")
    return db_studysession

# Atualiza o finished_at
@router.put("/study/{id_session}/finish", response_model=StudySessionResponse)
def update_finished(id_session: int, db: Session = Depends(get_db)):
    db_studysession = finish_studysession_service(db, id_session)
    if not db_studysession:
        raise HTTPException(status_code=404, detail="Folder not found")
    return db_studysession