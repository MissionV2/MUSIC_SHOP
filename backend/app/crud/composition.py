from sqlalchemy.orm import Session
from models import composition as models
from schemas import composition as schemas

def get_composition(db: Session, composition_id: int):
    return db.query(models.Composition).filter(models.Composition.id == composition_id).first()

def get_compositions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Composition).offset(skip).limit(limit).all()

def create_composition(db: Session, composition: schemas.CompositionCreate):
    db_composition = models.Composition(**composition.dict())
    db.add(db_composition)
    db.commit()
    db.refresh(db_composition)
    return db_composition

def update_composition(db: Session, composition_id: int, composition: schemas.CompositionUpdate):
    db_composition = get_composition(db, composition_id)
    if not db_composition:
        return None
    for key, value in composition.dict(exclude_unset=True).items():
        setattr(db_composition, key, value)
    db.commit()
    db.refresh(db_composition)
    return db_composition

def delete_composition(db: Session, composition_id: int):
    db_composition = get_composition(db, composition_id)
    if not db_composition:
        return None
    db.delete(db_composition)
    db.commit()
    return db_composition