from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, Integer, DateTime
from datetime import datetime

class StudySession(Base):
    __tablename__ = "studysession"

    id_session : Mapped[int] = mapped_column(
        Integer,
        primary_key=True)

    started_at : Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    finished_at : Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True
    )

    id_pasta : Mapped[int] = mapped_column(
        Integer,
        ForeignKey("folder.id_pasta"),
        nullable=False
    )

    


