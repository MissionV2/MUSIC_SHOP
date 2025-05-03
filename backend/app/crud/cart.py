from models.cart import CartItem

def add_to_cart(db, user_id: int, record_id: int, quantity: int = 1):
    item = db.query(CartItem).filter_by(user_id=user_id, record_id=record_id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(user_id=user_id, record_id=record_id, quantity=quantity)
        db.add(item)
    db.commit()
    db.refresh(item)
    return item

def remove_from_cart(db, user_id: int, record_id: int):
    item = db.query(CartItem).filter_by(user_id=user_id, record_id=record_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item