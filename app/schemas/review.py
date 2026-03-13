from pydantic import BaseModel, ConfigDict

class ReviewCreate(BaseModel):
    acertou: bool
    id_card: int
    id_session: int | None = None


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id_review: int
    acertou: bool
    id_card: int
    id_session: int | None = None

class AccuracyResponse(BaseModel):
    percentage: float
    total: int
    correct: int