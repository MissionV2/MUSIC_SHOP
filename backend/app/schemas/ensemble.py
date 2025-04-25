from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class EnsembleBase(BaseModel):
    name: str
    formation_date: date
    description: Optional[str] = None

class EnsembleCreate(EnsembleBase):
    musician_ids: List[int] = []

class EnsembleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class Ensemble(EnsembleBase):
    id: int
    musicians: List["Musician"] = []
    
    class Config:
        orm_mode = True

from .musician import Musician
Ensemble.update_forward_refs()