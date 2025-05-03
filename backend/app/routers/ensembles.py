from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas import ensemble as schemas
from crud import ensemble as crud
from dependencies import get_db
from crud.ensemble import CRUDEnsemble

router = APIRouter()

@router.post("/", response_model=schemas.Ensemble, status_code=status.HTTP_201_CREATED)
def create_ensemble(ensemble: schemas.EnsembleCreate, db: Session = Depends(get_db)):
    return crud.create(db, obj_in=ensemble)

@router.get("/")
def read_ensembles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return CRUDEnsemble.get_ensembles(db=db, skip=skip, limit=limit)

@router.get("/{ensemble_id}", response_model=schemas.Ensemble)
def read_ensemble(ensemble_id: int, db: Session = Depends(get_db)):
    db_ensemble = crud.get(db, id=ensemble_id)
    if not db_ensemble:
        raise HTTPException(status_code=404, detail="Ensemble not found")
    return db_ensemble

@router.put("/{ensemble_id}", response_model=schemas.Ensemble)
def update_ensemble(
    ensemble_id: int, 
    ensemble: schemas.EnsembleUpdate, 
    db: Session = Depends(get_db)
):
    db_ensemble = crud.get(db, id=ensemble_id)
    if not db_ensemble:
        raise HTTPException(status_code=404, detail="Ensemble not found")
    return crud.update(db, db_obj=db_ensemble, obj_in=ensemble)

@router.delete("/{ensemble_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ensemble(ensemble_id: int, db: Session = Depends(get_db)):
    crud.remove(db, id=ensemble_id)
    return None

@router.post("/{ensemble_id}/musicians/{musician_id}", response_model=schemas.Ensemble)
def add_musician_to_ensemble(
    ensemble_id: int, 
    musician_id: int, 
    db: Session = Depends(get_db)
):
    return crud.add_musician(db, ensemble_id=ensemble_id, musician_id=musician_id)
