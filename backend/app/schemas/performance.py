from pydantic import BaseModel
from typing import Optional, List

class PerformanceBase(BaseModel):
    date: str
    duration: int

class PerformanceCreate(PerformanceBase):
    ensemble_id: int
    composition_id: int

class PerformanceUpdate(BaseModel):
    date: Optional[str] = None
    duration: Optional[int] = None
    ensemble_id: Optional[int] = None
    composition_id: Optional[int] = None

class Performance(PerformanceBase):
    id: int
    ensemble: "Ensemble"
    composition: "Composition"
    records: List["Record"] = []
    
    class Config:
        orm_mode = True

from .ensemble import Ensemble
from .composition import Composition
from .record import Record
Performance.update_forward_refs()