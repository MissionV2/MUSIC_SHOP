from sqlalchemy.orm import Session
from models.order import Order, OrderItem
from models.cart import CartItem
from models.record import Record

def create_order_from_cart(db: Session, user_id: int):
    # Получаем корзину пользователя
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    if not cart_items:
        raise ValueError("Cart is empty")

    db_order = Order(user_id=user_id)
    db.add(db_order)
    db.flush()
    for cart_item in cart_items:
        db_item = OrderItem(
            order_id=db_order.id,
            record_id=cart_item.record_id,
            quantity=cart_item.quantity
        )
        db.add(db_item)
        # Увеличиваем продажи у пластинки
        record = db.query(Record).get(cart_item.record_id)
        if record:
            record.sales_current_year = (record.sales_current_year or 0) + cart_item.quantity

    # Очистить корзину
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders_by_user(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()

def create_order(db: Session, user_id: int, items: list):
    db_order = Order(user_id=user_id)
    db.add(db_order)
    db.flush()
    for item in items:
        db_item = OrderItem(order_id=db_order.id, record_id=item.record_id, quantity=item.quantity)
        db.add(db_item)
    db.commit()
    db.refresh(db_order)
    return db_order