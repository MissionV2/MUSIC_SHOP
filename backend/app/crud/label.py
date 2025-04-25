from sqlalchemy.orm import Session
from models import Label as LabelModel
from schemas.label import LabelCreate

class CRUDLabel:
    def get(self, db: Session, id: int):
        return db.query(LabelModel).filter(LabelModel.id == id).first()

    def get_multi(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(LabelModel).offset(skip).limit(limit).all()

    def create(self, db: Session, obj_in: LabelCreate):
        db_obj = LabelModel(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, id: int):
        obj = db.query(LabelModel).get(id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj

label = CRUDLabel()