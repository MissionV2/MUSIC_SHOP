from pydantic import BaseModel
from typing import List
from datetime import datetime
from schemas.record import Record

class OrderItemCreate(BaseModel):
    record_id: int
    quantity: int

class OrderCreate(BaseModel):
    user_id: int
    items: List[OrderItemCreate]

class OrderItem(BaseModel):
    record_id: int
    quantity: int
    class Config:
        orm_mode = True

class Order(BaseModel):
    id: int
    user_id: int
    items: List[OrderItem]
    class Config:
        orm_mode = True

class OrderItemOut(BaseModel):
    record_id: int
    quantity: int
    record: Record  # Полная информация о товаре

    class Config:
        orm_mode = True

class OrderOut(BaseModel):
    id: int
    user_id: int
    items: List[OrderItemOut]

    class Config:
        orm_mode = True