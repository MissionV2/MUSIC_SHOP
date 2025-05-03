from sqlalchemy.orm import Session
from models.order import Order, OrderItem
from models.cart import CartItem

def create_order_from_cart(db: Session, user_id: int):
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    if not cart_items:
        return None
    order = Order(user_id=user_id)
    db.add(order)
    db.commit()
    db.refresh(order)
    for cart_item in cart_items:
        order_item = OrderItem(order_id=order.id, record_id=cart_item.record_id, quantity=cart_item.quantity)
        db.add(order_item)
        db.delete(cart_item)  # Очищаем корзину
    db.commit()
    db.refresh(order)
    return order

def get_orders_by_user(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()