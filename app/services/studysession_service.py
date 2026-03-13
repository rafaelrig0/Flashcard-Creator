from sqlalchemy.orm import Session
from sqlalchemy import Date

from app.schemas.studysession import StudySessionCreate
from app.models.studysessions import StudySession
from app.models.folders import Folder

def create_studysession(db: Session, studysession: StudySessionCreate):
    db_studysession = StudySession(id_pasta = studysession.id_pasta)
    db.add(db_studysession)
    db.commit()
    db.refresh(db_studysession)
    return db_studysession

def get_studysessionbyfolder(db: Session, id_pasta: int):
    db_studysession = (db.query(StudySession)
                       .filter(StudySession.id_pasta == id_pasta)
                       .order_by(StudySession.started_at.desc())
                       .first())
    return db_studysession

def get_allstudysessions(db: Session, id_pasta: int):
    db_studysession = (db.query(StudySession)
                       .filter(StudySession.id_pasta == id_pasta).all())
    return db_studysession

def finish_studysession(db: Session, id_session: int):
    from datetime import datetime
    db_studysession = db.query(StudySession).filter(StudySession.id_session == id_session).first()
    if not db_studysession:
        return None
    db_studysession.finished_at = datetime.utcnow()
    db.commit()
    db.refresh(db_studysession)
    return db_studysession