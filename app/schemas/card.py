from pydantic import BaseModel, ConfigDict

class CardCreate(BaseModel):
    pergunta: str
    resposta: str
    color: str = "#EEA2AD"
    difficulty: str | None = None
    id_pasta: int


class CardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id_card: int
    pergunta: str
    resposta: str
    color: str
    id_pasta: int

class CardUpdate(BaseModel):
    pergunta: str
    resposta: str
    color: str