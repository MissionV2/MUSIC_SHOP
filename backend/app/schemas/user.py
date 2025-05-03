from pydantic import BaseModel
from typing import List
from schemas.order import OrderOut  # Импортируйте свою схему заказа
from schemas.cart import CartItemOut  # Импортируйте свою схему корзины

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserFullOut(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    orders: List[OrderOut] = []
    cart_items: List[CartItemOut] = []

    class Config:
        orm_mode = True