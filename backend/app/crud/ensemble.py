from sqlalchemy.orm import Session
from models import Ensemble as EnsembleModel, Musician as MusicianModel
from schemas.ensemble import EnsembleCreate, EnsembleUpdate

class CRUDEnsemble:
    def create(self, db: Session, obj_in: EnsembleCreate):
        # Извлекаем musician_ids отдельно
        data = obj_in.dict(exclude={"musician_ids"})
        db_obj = EnsembleModel(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        # Добавляем музыкантов, если есть
        if obj_in.musician_ids:
            musicians = db.query(MusicianModel).filter(MusicianModel.id.in_(obj_in.musician_ids)).all()
            db_obj.musicians.extend(musicians)
            db.commit()
            db.refresh(db_obj)
        return db_obj

    def get(self, db: Session, id: int):
        return db.query(EnsembleModel).filter(EnsembleModel.id == id).first()

    def update(self, db: Session, db_obj: EnsembleModel, obj_in: EnsembleUpdate):
        obj_data = obj_in.dict(exclude_unset=True)
        for field, value in obj_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, id: int):
        obj = db.query(EnsembleModel).get(id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj

    def add_musician(self, db: Session, ensemble_id: int, musician_id: int):
        ensemble = db.query(EnsembleModel).filter(EnsembleModel.id == ensemble_id).first()
        musician = db.query(MusicianModel).filter(MusicianModel.id == musician_id).first()
        if not ensemble or not musician:
            return None
        ensemble.musicians.append(musician)
        db.commit()
        db.refresh(ensemble)
        return ensemble

ensemble = CRUDEnsemble()