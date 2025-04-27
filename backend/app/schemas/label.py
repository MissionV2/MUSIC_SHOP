from pydantic import BaseModel
from typing import Optional

class LabelBase(BaseModel):
    name: str
    address: str
    is_wholesaler: bool = False

class LabelCreate(LabelBase):
    pass

class LabelUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    is_wholesaler: Optional[bool] = None

class Label(LabelBase):
    id: int
    
    class Config:
        from_attributes = True