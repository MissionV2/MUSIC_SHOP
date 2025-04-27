from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud.composition import (
    get_composition,
    get_compositions,
    create_composition as crud_create_composition,
    update_composition as crud_update_composition,
    delete_composition as crud_delete_composition,
)
from schemas import Composition, CompositionCreate, CompositionUpdate
from dependencies import get_db

router = APIRouter()

@router.post("/", response_model=Composition)
def create_composition_endpoint(
    composition: CompositionCreate, 
    db: Session = Depends(get_db)
):
    return crud_create_composition(db=db, composition=composition)

@router.get("/", response_model=list[Composition])
def read_compositions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_compositions(db, skip=skip, limit=limit)

@router.get("/{composition_id}", response_model=Composition)
def read_composition(composition_id: int, db: Session = Depends(get_db)):
    db_composition = get_composition(db, composition_id=composition_id)
    if not db_composition:
        raise HTTPException(status_code=404, detail="Composition not found")
    return db_composition

@router.put("/{composition_id}", response_model=Composition)
def update_composition_endpoint(
    composition_id: int, 
    composition: CompositionUpdate, 
    db: Session = Depends(get_db)
):
    db_composition = crud_update_composition(db, composition_id=composition_id, composition=composition)
    if not db_composition:
        raise HTTPException(status_code=404, detail="Composition not found")
    return db_composition

@router.delete("/{composition_id}", status_code=204)
def delete_composition_endpoint(composition_id: int, db: Session = Depends(get_db)):
    if not crud_delete_composition(db, composition_id=composition_id):
        raise HTTPException(status_code=404, detail="Composition not found")
    return None