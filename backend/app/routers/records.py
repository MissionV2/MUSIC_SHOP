from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import record as schemas
from crud import record as crud
from dependencies import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Record)
def create_record(record: schemas.RecordCreate, db: Session = Depends(get_db)):
    return crud.record.create(db, obj_in=record)

@router.patch("/{record_id}/stock", response_model=schemas.Record)
def update_record_stock(
    record_id: int, 
    quantity: int, 
    db: Session = Depends(get_db)
):
    return crud.record.update_stock(db, record_id=record_id, quantity=quantity)

@router.get("/by-label/{label_id}", response_model=list[schemas.Record])
def get_records_by_label(
    label_id: int, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    return crud.record.get_by_label(db, label_id=label_id, skip=skip, limit=limit)