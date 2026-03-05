from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer

class Folder(Base):
    __tablename__ = 'folder'

    id_pasta: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(50), nullable=False)