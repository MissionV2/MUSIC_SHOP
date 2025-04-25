from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Performance(Base):
    __tablename__ = 'performances'

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)
    duration = Column(Integer)  # в секундах
    ensemble_id = Column(Integer, ForeignKey('ensembles.id'))
    composition_id = Column(Integer, ForeignKey('compositions.id'))
    
    ensemble = relationship("Ensemble", back_populates="performances")
    composition = relationship("Composition", back_populates="performances")
    records = relationship("Record", secondary="record_performance", back_populates="performances")