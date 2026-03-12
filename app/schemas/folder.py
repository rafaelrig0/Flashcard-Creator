from pydantic import BaseModel, ConfigDict

class FolderCreate(BaseModel):
    nome: str

class FolderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id_pasta: int
    nome: str

class FolderStatsResponse(FolderResponse):
    cards_count: int
    accuracy: float | None = None
    correct_answers: int | None = None
    total_reviews: int | None = None


class FolderUpdate(BaseModel):
    nome: str
