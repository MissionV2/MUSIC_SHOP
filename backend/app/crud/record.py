from sqlalchemy.orm import Session
from models import Record, Performance
from schemas import RecordCreate, RecordUpdate
from .base import CRUDBase

class CRUDRecord(CRUDBase[Record, RecordCreate, RecordUpdate]):
    def create(self, db: Session, obj_in: RecordCreate):
        data = obj_in.dict(exclude={"performance_ids"})
        db_obj = Record(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        if obj_in.performance_ids:
            performances = db.query(Performance).filter(Performance.id.in_(obj_in.performance_ids)).all()
            db_obj.performances.extend(performances)
            db.commit()
            db.refresh(db_obj)
        return db_obj
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