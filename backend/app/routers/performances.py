from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import performance as schemas
from crud import performance as crud
from dependencies import get_db

router = APIRouter()

@router.get("/by-ensemble/{ensemble_id}", response_model=list[schemas.Performance])
def get_performances_by_ensemble(
    ensemble_id: int, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    return crud.get_by_ensemble(db, ensemble_id=ensemble_id, skip=skip, limit=limit)