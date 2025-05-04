from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from schemas.order import OrderOut, OrderCreate, Order
from crud.order import create_order_from_cart, get_orders_by_user, create_order

router = APIRouter()

@router.get("/orders", response_model=list[OrderOut])
def get_orders(db: Session = Depends(get_db), user_id: int = ...):
    return get_orders_by_user(db, user_id)

@router.post("/", response_model=OrderOut)
def create_new_order(
    user_id: int,
    db: Session = Depends(get_db)
):
    return create_order_from_cart(db, user_id)