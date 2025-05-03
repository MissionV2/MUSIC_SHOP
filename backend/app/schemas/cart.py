from pydantic import BaseModel
from schemas.record import Record  # Импортируйте схему товара

class CartItemBase(BaseModel):
    record_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemOut(BaseModel):
    id: int
    record_id: int
    quantity: int
    record: Record  # <-- вложенная информация о товаре

    class Config:
        orm_mode = True

class CartAddRequest(BaseModel):
    user_id: int
    record_id: int
    quantity: int