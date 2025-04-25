from pydantic import BaseModel
from typing import List, Optional

class CompositionBase(BaseModel):
    title: str
    composer: str
    year: int

class CompositionCreate(CompositionBase):
    pass

class CompositionUpdate(BaseModel):
    title: Optional[str] = None
    composer: Optional[str] = None
    year: Optional[int] = None

class Composition(CompositionBase):
    id: int
    performances: List["Performance"] = []
    
    class Config:
        orm_mode = True

from .performance import Performance
Composition.update_forward_refs()