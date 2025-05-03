from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from schemas.cart import CartItemCreate, CartItemOut
from crud.cart import add_to_cart, remove_from_cart

router = APIRouter()

@router.post("/cart/add", response_model=CartItemOut)
def add_item(item: CartItemCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return add_to_cart(db, user.id, item.record_id, item.quantity)

@router.delete("/cart/remove/{record_id}")
def remove_item(record_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    removed = remove_from_cart(db, user.id, record_id)
    if not removed:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    return {"ok": True}