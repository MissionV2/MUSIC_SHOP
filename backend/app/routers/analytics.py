from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import analytics as schemas
from crud import analytics as crud
from dependencies import get_db
from datetime import datetime

router = APIRouter()

@router.get("/top-selling", response_model=schemas.TopSellingRecords)
def get_top_selling_records(
    year: int = datetime.now().year, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    return {"records": crud.analytics["top_selling"](db, year=year, limit=limit)}

@router.get("/ensembles/{ensemble_id}/compositions-count")
def get_ensemble_compositions_count(
    ensemble_id: int, 
    db: Session = Depends(get_db)
):
    return {"count": crud.analytics["ensemble_compositions"](db, ensemble_id=ensemble_id)}