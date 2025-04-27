from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, crud
from dependencies import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Record)
def create_record(record: schemas.RecordCreate, db: Session = Depends(get_db)):
    return crud.record.create_record(db=db, record_in=record)

@router.get("/", response_model=list[schemas.Record])
def read_records(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.record.get_records(db, skip=skip, limit=limit)

@router.get("/{record_id}", response_model=schemas.Record)
def read_record(record_id: int, db: Session = Depends(get_db)):
    db_record = crud.record.get_record(db, record_id=record_id)
    if not db_record:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@router.put("/{record_id}", response_model=schemas.Record)
def update_record(
    record_id: int, 
    record: schemas.RecordUpdate, 
    db: Session = Depends(get_db)
):
    db_record = crud.record.update_record(db, record_id=record_id, record=record)
    if not db_record:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@router.patch("/{record_id}/sales", response_model=schemas.Record)
def update_sales(
    record_id: int,
    current_year: int,
    previous_year: int,
    db: Session = Depends(get_db)
):
    db_record = crud.record.update_record_sales(
        db, record_id=record_id, 
        current_year=current_year, 
        previous_year=previous_year
    )
    if not db_record:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@router.delete("/{record_id}", status_code=204)
def delete_record(record_id: int, db: Session = Depends(get_db)):
    if not crud.record.delete_record(db, record_id=record_id):
        raise HTTPException(status_code=404, detail="Record not found")
    return None