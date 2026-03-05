from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey, Integer

class Card(Base):
    __tablename__ = "card"

    id_card: Mapped[int] = mapped_column(Integer, primary_key=True)
    pergunta: Mapped[str] = mapped_column(String(250), nullable=False)
    resposta: Mapped[str] = mapped_column(String(250), nullable=False)

    id_pasta: Mapped[int] = mapped_column(
        ForeignKey("folder.id_pasta"),
        nullable=False
    )