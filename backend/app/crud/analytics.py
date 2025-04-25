from sqlalchemy import func
from sqlalchemy.orm import Session
from models import Record, Performance, Ensemble

def get_top_selling_records(
    db: Session, *, year: int, limit: int = 10
) -> list[Record]:
    return (
        db.query(Record)
        .filter(Record.release_date.like(f"{year}%"))
        .order_by(Record.stock_quantity.desc())
        .limit(limit)
        .all()
    )

def get_ensemble_compositions_count(
    db: Session, ensemble_id: int
) -> int:
    return (
        db.query(func.count(Performance.id))
        .filter(Performance.ensemble_id == ensemble_id)
        .scalar()
    )

analytics = {
    "top_selling": get_top_selling_records,
    "ensemble_compositions": get_ensemble_compositions_count
}