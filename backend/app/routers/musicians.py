from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import musician as schemas
from crud import musician as crud
from dependencies import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Musician)
def create_musician(musician: schemas.MusicianCreate, db: Session = Depends(get_db)):
    return crud.musician.create(db, obj_in=musician)

@router.get("/by-instrument/{instrument}", response_model=list[schemas.Musician])
def read_musicians_by_instrument(
    instrument: str, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    return crud.musician.get_by_instrument(db, instrument=instrument, skip=skip, limit=limit)