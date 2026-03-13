from pydantic import BaseModel, ConfigDict
from datetime import datetime

class StudySessionCreate(BaseModel):
    id_pasta : int

class StudySessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes = True)
    started_at : datetime
    finished_at : datetime | None = None
    id_pasta : int

class StudySessionUpdate(BaseModel):
    finished_at : datetime
