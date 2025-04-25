from pydantic import BaseModel
from typing import List, Optional

class MusicianBase(BaseModel):
    name: str
    birth_date: str
    instrument: str

class MusicianCreate(MusicianBase):
    ensemble_ids: List[int] = []

class MusicianUpdate(BaseModel):
    instrument: Optional[str] = None

class Musician(MusicianBase):
    id: int
    ensembles: List["Ensemble"] = []
    
    class Config:
        orm_mode = True

from .ensemble import Ensemble
Musician.update_forward_refs()