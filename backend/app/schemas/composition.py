from pydantic import BaseModel
from typing import List, Optional
from schemas.ensemble import Ensemble

class CompositionBase(BaseModel):
    title: str
    year: int

class CompositionCreate(CompositionBase):
    ensemble_id: int  # только id, не объект

class CompositionUpdate(BaseModel):
    title: Optional[str] = None
    ensemble_id: Optional[int] = None
    year: Optional[int] = None

class Composition(CompositionBase):
    id: int
    ensemble: Optional[Ensemble] = None  # для ответа
    performances: List["Performance"] = []
    
    class Config:
        orm_mode = True

class CompositionsCount(BaseModel):
    count: int

from .performance import Performance
Composition.update_forward_refs()