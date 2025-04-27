from datetime import date
from pydantic import BaseModel
from typing import Optional

class MusicianBase(BaseModel):
    full_name: str
    birth_date: date
    death_date: Optional[date] = None
    nationality: Optional[str] = None
    bio: Optional[str] = None

class MusicianCreate(MusicianBase):
    pass

class MusicianUpdate(BaseModel):
    full_name: Optional[str] = None
    birth_date: Optional[date] = None
    death_date: Optional[date] = None
    nationality: Optional[str] = None
    bio: Optional[str] = None

class Musician(MusicianBase):
    id: int
    
    class Config:
        orm_mode = True