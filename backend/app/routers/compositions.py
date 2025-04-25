from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import composition as schemas
from crud import composition as crud
from dependencies import get_db

router = APIRouter()

@router.get("/by-composer/{composer}", response_model=list[schemas.Composition])
def get_compositions_by_composer(
    composer: str, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    return crud.composition.get_by_composer(db, composer=composer, skip=skip, limit=limit)