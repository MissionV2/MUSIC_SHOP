from sqlalchemy.orm import Session
from models import Record
from schemas import RecordCreate, RecordUpdate
from .base import CRUDBase

class CRUDRecord(CRUDBase[Record, RecordCreate, RecordUpdate]):
    def get_by_label(
        self, db: Session, *, label_id: int, skip: int = 0, limit: int = 100
    ) -> list[Record]:
        return (
            db.query(Record)
            .filter(Record.label_id == label_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def update_stock(
        self, db: Session, *, record_id: int, quantity: int
    ) -> Record:
        record = self.get(db, record_id)
        record.stock_quantity += quantity
        db.commit()
        return record

record = CRUDRecord(Record)