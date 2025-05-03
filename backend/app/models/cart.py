from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True, index=True)
    record_id = Column(Integer, ForeignKey("records.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, default=1)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="cart_items")
    record = relationship("Record", back_populates="cart_items")
    
from .user import User
from .record import Record