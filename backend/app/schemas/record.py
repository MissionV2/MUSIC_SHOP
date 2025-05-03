from datetime import date
from pydantic import BaseModel
from typing import List, Optional
from .label import Label
from .composition import Composition

class RecordBase(BaseModel):
    catalog_number: str
    title: str
    release_date: date
    wholesale_price: float
    retail_price: float

class RecordCreate(RecordBase):
    label_id: int
    composition_ids: list[int] = []
    performance_ids: list[int] = []

class RecordUpdate(BaseModel):
    wholesale_price: Optional[float] = None
    retail_price: Optional[float] = None
    stock_quantity: Optional[int] = None

class RecordSalesUpdate(BaseModel):
    sales_current_year: int
    sales_previous_year: int

class Record(BaseModel):
    id: int
    catalog_number: str
    title: str
    release_date: date
    wholesale_price: float
    retail_price: float
    stock_quantity: int
    sales_current_year: int
    sales_previous_year: int
    label: Label  # <-- полная информация о компании
    compositions: list[Composition] = []  # <-- полная информация о композициях

    class Config:
        orm_mode = True