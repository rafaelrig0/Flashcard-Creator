from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.card_service import (create_card as create_card_service,
                                         delete_card as delete_card_service,
                                         update_card as update_card_service,
                                         get_card as get_card_service,
                                         get_cards as get_cards_service,
                                         get_card_by_folder as get_card_by_folder_service)

from app.schemas.card import CardCreate, CardResponse, CardUpdate
from app.core.database import get_db

router = APIRouter()

# Criação de cards
@router.post("/cards/", response_model=CardResponse)
def create_card(card: CardCreate, db : Session = Depends(get_db)):
    return create_card_service(db, card)

# Busca todos os cards
@router.get("/cards/", response_model=List[CardResponse])
def get_cards(db : Session = Depends(get_db)):
    db_cards = get_cards_service(db)
    if not db_cards:
        raise HTTPException(status_code=404, detail="No cards found")

    return db_cards

# Busca um card específico
@router.get("/cards/{id_card}", response_model=CardResponse)
def get_card(id_card: int, db : Session = Depends(get_db)):
    db_card = get_card_service(db, id_card)
    if not db_card:
        raise HTTPException(status_code=404, detail="No card found")

    return db_card

# Busca um card específico em uma pasta
@router.get("/cards/folder/{id_pasta}", response_model=List[CardResponse])
def get_card_by_folder(id_pasta: int, db : Session = Depends(get_db)):
    db_card = get_card_by_folder_service(db, id_pasta)
    if not db_card:
        raise HTTPException(status_code=404, detail="No card found")

    return db_card

# Deleta um card específico
@router.delete("/cards/{id_card}", response_model=CardResponse)
def delete_card(id_card: int, db : Session = Depends(get_db)):
    db_card = delete_card_service(db, id_card)
    if not db_card:
        raise HTTPException(status_code=404, detail="No card found")

    return db_card

# Atualiza um card específico
@router.put("/cards/{id_card}", response_model=CardResponse)
def update_card(id_card: int, card: CardUpdate, db : Session = Depends(get_db)):
    db_card = update_card_service(db, id_card, card)
    if not db_card:
        raise HTTPException(status_code=404, detail="No card found")

    return db_card