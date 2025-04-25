from sqlalchemy.orm import Session
from models import Composition
from schemas import CompositionCreate, CompositionUpdate
from .base import CRUDBase

class CRUDComposition(CRUDBase[Composition, CompositionCreate, CompositionUpdate]):
    def get_by_composer(
        self, db: Session, *, composer: str, skip: int = 0, limit: int = 100
    ) -> list[Composition]:
        return (
            db.query(Composition)
            .filter(Composition.composer.ilike(f"%{composer}%"))
            .offset(skip)
            .limit(limit)
            .all()
        )

composition = CRUDComposition(Composition)