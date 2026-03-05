from pydantic import BaseModel, ConfigDict

class FolderCreate(BaseModel):
    nome: str

class FolderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id_pasta: int
    nome: str

class FolderUpdate(BaseModel):
    nome: str
