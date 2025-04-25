from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.label import Label, LabelCreate
from crud.label import label
from dependencies import get_db

router = APIRouter()

@router.post("/labels", response_model=Label)
def create_label(label_in: LabelCreate, db: Session = Depends(get_db)):
    return label.create(db, obj_in=label_in)