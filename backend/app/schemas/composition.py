from pydantic import BaseModel
from typing import List, Optional

class CompositionBase(BaseModel):
    title: str
    ensemble_id: int  # изменено
    year: int

class CompositionCreate(CompositionBase):
    pass

class CompositionUpdate(BaseModel):
    title: Optional[str] = None
    ensemble_id: Optional[int] = None  # изменено
    year: Optional[int] = None

class Composition(CompositionBase):
    id: int
    performances: List["Performance"] = []
    
    class Config:
        orm_mode = True

from .performance import Performance
Composition.update_forward_refs()