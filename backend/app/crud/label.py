from sqlalchemy.orm import Session
from models import label as models
from schemas import label as schemas

def get_label(db: Session, label_id: int):
    return db.query(models.Label).filter(models.Label.id == label_id).first()

def get_labels(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Label).offset(skip).limit(limit).all()

def create_label(db: Session, label: schemas.LabelCreate):
    db_label = models.Label(**label.dict())
    db.add(db_label)
    db.commit()
    db.refresh(db_label)
    return db_label

def update_label(db: Session, label_id: int, label: schemas.LabelUpdate):
    db_label = get_label(db, label_id)
    if not db_label:
        return None
    update_data = label.dict(exclude_unset=True)
    for field in update_data:
        setattr(db_label, field, update_data[field])
    db.commit()
    db.refresh(db_label)
    return db_label

def delete_label(db: Session, label_id: int):
    db_label = get_label(db, label_id)
    if not db_label:
        return None
    db.delete(db_label)
    db.commit()
    return db_label

class LabelCRUD:
    get_label = staticmethod(get_label)
    get_labels = staticmethod(get_labels)
    create_label = staticmethod(create_label)
    update_label = staticmethod(update_label)
    delete_label = staticmethod(delete_label)

label = LabelCRUD()