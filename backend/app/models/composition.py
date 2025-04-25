from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from .base import Base

class Composition(Base):
    __tablename__ = 'compositions'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    composer = Column(String(100))
    year = Column(Integer)
    
    performances = relationship("Performance", back_populates="composition", cascade="all, delete-orphan")