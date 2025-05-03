from sqlalchemy.orm import Session, joinedload
from models.cart import CartItem
from schemas.cart import CartAddRequest

def add_to_cart(db: Session, user_id: int, record_id: int, quantity: int):
    db_cart_item = CartItem(
        user_id=user_id,
        record_id=record_id,
        quantity=quantity
    )
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item

def remove_from_cart(db: Session, user_id: int, record_id: int):
    item = db.query(CartItem).filter_by(user_id=user_id, record_id=record_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def get_cart_by_user(db: Session, user_id: int):
    return (
        db.query(CartItem)
        .options(joinedload(CartItem.record))  # подгружаем товар
        .filter(CartItem.user_id == user_id)
        .all()
    )