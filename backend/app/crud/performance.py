from sqlalchemy.orm import Session
from models import Performance
from schemas import PerformanceCreate, PerformanceUpdate
from .base import CRUDBase

class CRUDPerformance(CRUDBase[Performance, PerformanceCreate, PerformanceUpdate]):
    def get_by_ensemble(
        self, db: Session, *, ensemble_id: int, skip: int = 0, limit: int = 100
    ) -> list[Performance]:
        return (
            db.query(Performance)
            .filter(Performance.ensemble_id == ensemble_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

performance = CRUDPerformance(Performance)