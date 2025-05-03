from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from schemas.order import OrderOut
from crud.order import create_order_from_cart, get_orders_by_user

router = APIRouter()

@router.post("/orders/create", response_model=OrderOut)
def create_order(db: Session = Depends(get_db), user=Depends(get_current_user)):
    order = create_order_from_cart(db, user.id)
    if not order:
        raise HTTPException(status_code=400, detail="Cart is empty")
    return order

@router.get("/orders", response_model=list[OrderOut])
def get_orders(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return get_orders_by_user(db, user.id)