from sqlalchemy.orm import Session
from models import Musician
from schemas import MusicianCreate, MusicianUpdate
from .base import CRUDBase

class CRUDMusician(CRUDBase[Musician, MusicianCreate, MusicianUpdate]):
    def get_by_instrument(
        self, db: Session, *, instrument: str, skip: int = 0, limit: int = 100
    ) -> list[Musician]:
        return (
            db.query(Musician)
            .filter(Musician.instrument == instrument)
            .offset(skip)
            .limit(limit)
            .all()
        )

musician = CRUDMusician(Musician)