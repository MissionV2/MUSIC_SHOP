from sqlalchemy import Boolean, Column, Integer, String, Text
from sqlalchemy.orm import relationship
from .base import Base

class Label(Base):
    __tablename__ = 'labels'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
    address = Column(Text)
    is_wholesaler = Column(Boolean, default=False)
    
    records = relationship("Record", back_populates="label", cascade="all, delete-orphan")