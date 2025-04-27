from sqlalchemy.orm import Session
from models import musician as models
from schemas import musician as schemas

def get_musician(db: Session, musician_id: int):
    return db.query(models.Musician).filter(models.Musician.id == musician_id).first()

def get_musicians(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Musician).offset(skip).limit(limit).all()

def create_musician(db: Session, musician: schemas.MusicianCreate):
    db_musician = models.Musician(**musician.dict())
    db.add(db_musician)
    db.commit()
    db.refresh(db_musician)
    return db_musician

def update_musician(db: Session, musician_id: int, musician: schemas.MusicianUpdate):
    db_musician = get_musician(db, musician_id)
    if not db_musician:
        return None
    for key, value in musician.dict(exclude_unset=True).items():
        setattr(db_musician, key, value)
    db.commit()
    db.refresh(db_musician)
    return db_musician

def delete_musician(db: Session, musician_id: int):
    db_musician = get_musician(db, musician_id)
    if not db_musician:
        return None
    db.delete(db_musician)
    db.commit()
    return db_musician