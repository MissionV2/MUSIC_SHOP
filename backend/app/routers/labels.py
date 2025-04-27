from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, crud
from dependencies import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Label)
def create_label(label: schemas.LabelCreate, db: Session = Depends(get_db)):
    return crud.label.create_label(db=db, label=label)

@router.get("/", response_model=list[schemas.Label])
def read_labels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.label.get_labels(db, skip=skip, limit=limit)

@router.get("/{label_id}", response_model=schemas.Label)
def read_label(label_id: int, db: Session = Depends(get_db)):
    db_label = crud.label.get_label(db, label_id=label_id)
    if not db_label:
        raise HTTPException(status_code=404, detail="Label not found")
    return db_label

@router.put("/{label_id}", response_model=schemas.Label)
def update_label(
    label_id: int, 
    label: schemas.label.LabelUpdate, 
    db: Session = Depends(get_db)
):
    db_label = crud.label.update_label(db, label_id=label_id, label=label)
    if not db_label:
        raise HTTPException(status_code=404, detail="Label not found")
    return db_label

@router.delete("/{label_id}", status_code=204)
def delete_label(label_id: int, db: Session = Depends(get_db)):
    if not crud.label.delete_label(db, label_id=label_id):
        raise HTTPException(status_code=404, detail="Label not found")
    return None