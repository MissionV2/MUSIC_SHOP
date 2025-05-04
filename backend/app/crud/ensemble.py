from sqlalchemy.orm import Session
from models.performance import Performance
from models.record import Record
from models import Ensemble as EnsembleModel, Musician as MusicianModel
from schemas.ensemble import Ensemble, EnsembleCreate, EnsembleUpdate
from models.ensemble import Ensemble  # Импортируйте ORM-модель
import models
from models.composition import Composition

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

    def get_ensembles(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Ensemble).offset(skip).limit(limit).all()

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

    def get_records_by_ensemble(db: Session, ensemble_id: int):
        return (
            db.query(Record.title)
            .join(Record.performances)
            .join(Performance.ensemble)
            .filter(Performance.ensemble_id == ensemble_id)
            .all()
        )

    def get_compositions_count_by_ensemble(db: Session, ensemble_id: int) -> int:
        return db.query(models.Composition).filter(models.Composition.ensemble_id == ensemble_id).count()

    @staticmethod
    def get_record_titles_by_ensemble(db: Session, ensemble_id: int):
        return (
            db.query(Record.title)
            .join(Record.compositions)
            .filter(Composition.ensemble_id == ensemble_id)
            .distinct()
            .all()
        )

ensemble = CRUDEnsemble()