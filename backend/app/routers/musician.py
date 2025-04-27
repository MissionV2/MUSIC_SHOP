from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud.musician import (
    get_musician, get_musicians, create_musician as crud_create_musician,
    update_musician, delete_musician
)
from schemas.musician import Musician, MusicianCreate, MusicianUpdate
from dependencies import get_db

router = APIRouter()

@router.post("/", response_model=Musician)
def create_musician_endpoint(
    musician: MusicianCreate, 
    db: Session = Depends(get_db)
):
    return crud_create_musician(db=db, musician=musician)

@router.get("/", response_model=list[Musician])
def read_musicians(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_musicians(db, skip=skip, limit=limit)

@router.get("/{musician_id}", response_model=Musician)
def read_musician(musician_id: int, db: Session = Depends(get_db)):
    db_musician = get_musician(db, musician_id=musician_id)
    if not db_musician:
        raise HTTPException(status_code=404, detail="Musician not found")
    return db_musician

@router.put("/{musician_id}", response_model=Musician)
def update_musician_endpoint(
    musician_id: int, 
    musician: MusicianUpdate, 
    db: Session = Depends(get_db)
):
    db_musician = update_musician(db, musician_id=musician_id, musician=musician)
    if not db_musician:
        raise HTTPException(status_code=404, detail="Musician not found")
    return db_musician

@router.delete("/{musician_id}", status_code=204)
def delete_musician_endpoint(musician_id: int, db: Session = Depends(get_db)):
    if not delete_musician(db, musician_id=musician_id):
        raise HTTPException(status_code=404, detail="Musician not found")
    return None