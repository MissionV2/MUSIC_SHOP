from pydantic import BaseModel
from typing import List, Optional
from .label import Label
from .performance import Performance
from datetime import date

class RecordBase(BaseModel):
    catalog_number: str
    title: str
    release_date: date
    wholesale_price: float
    retail_price: float
    stock_quantity: int

class RecordCreate(RecordBase):
    label_id: int
    performance_ids: List[int] = []

class RecordUpdate(BaseModel):
    retail_price: Optional[float] = None
    stock_quantity: Optional[int] = None

class Record(RecordBase):
    id: int
    label: Label
    performances: List[Performance] = []
    
    class Config:
        orm_mode = True

class RecordAnalytics(BaseModel):
    total_sold: int
    current_stock: int