from pydantic import BaseModel

class CartItemBase(BaseModel):
    record_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemOut(CartItemBase):
    id: int

    class Config:
        orm_mode = True