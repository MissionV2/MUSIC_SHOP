from sqlalchemy import Column, Integer, String, Text, Boolean
from sqlalchemy.orm import relationship
from .base import Base

class Label(Base):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    address = Column(Text, nullable=False)
    is_wholesaler = Column(Boolean, default=False)
    
    records = relationship("Record", back_populates="label")