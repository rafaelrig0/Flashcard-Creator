from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer
from datetime import datetime

from app.core.database import Base


class Reviews(Base):
    __tablename__ = "reviews"

    id_review: Mapped[int] = mapped_column(Integer, primary_key=True)
    acertou: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )
    data_hora: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    id_card: Mapped[int] = mapped_column(
        ForeignKey("card.id_card"),
        nullable=False
    )