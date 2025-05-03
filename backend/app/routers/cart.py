from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from schemas.cart import CartItemCreate, CartItemOut, CartAddRequest
from crud.cart import add_to_cart, remove_from_cart, get_cart_by_user

router = APIRouter()

@router.delete("/remove")
def remove_item(user_id: int, record_id: int, db: Session = Depends(get_db)):
    removed = remove_from_cart(db, user_id, record_id)
    if not removed:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    return {"ok": True}

@router.post("/add", response_model=CartItemOut)
def add_item(item: CartAddRequest, db: Session = Depends(get_db)):
    return add_to_cart(db, item.user_id, item.record_id, item.quantity)

@router.get("/{user_id}", response_model=list[CartItemOut])
def get_user_cart(user_id: int, db: Session = Depends(get_db)):
    return get_cart_by_user(db, user_id)