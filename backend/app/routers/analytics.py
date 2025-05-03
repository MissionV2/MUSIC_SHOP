from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.record import Record
from schemas import record as record_schemas
from crud import record as record_crud
from dependencies import get_db
from datetime import datetime
import schemas
from crud.record import get_all_sorted_by_sales

router = APIRouter(
    prefix="/records",
    tags=["records"],
)

@router.get("/best-sellers", response_model=List[str])
def best_sellers_current_year(limit: int = 10, db: Session = Depends(get_db)):
    result = record_crud.get_best_sellers_current_year(db, limit)
    # result — список кортежей [(title,), ...], преобразуем в список строк
    return [title for (title,) in result]

@router.put("/{record_id}/sales", response_model=record_schemas.Record)
def update_sales(
    record_id: int,
    sales: record_schemas.RecordSalesUpdate,
    db: Session = Depends(get_db)
):
    db_record = record_crud.update_record_sales(
        db, record_id, sales.sales_current_year, sales.sales_previous_year
    )
    if not db_record:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@router.get("/top-selling", response_model=schemas.TopSellingRecords)
def get_top_selling_records(
    year: int = datetime.now().year, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    return {"records": get_top_selling_records(db, year=year, limit=limit)}

@router.get("/ensembles/{ensemble_id}/compositions-count")
def get_ensemble_compositions_count(
    ensemble_id: int, 
    db: Session = Depends(get_db)
):
    return {"count": get_ensemble_compositions_count["ensemble_compositions"](db, ensemble_id=ensemble_id)}

@router.get("/records/sorted-by-sales", response_model=List[record_schemas.Record])
def records_sorted_by_sales(limit: int = 100, db: Session = Depends(get_db)):
    return get_all_sorted_by_sales(db, limit)