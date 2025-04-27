from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Composition(Base):
    __tablename__ = "compositions"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    year = Column(Integer)
    genre = Column(String(50))
    duration = Column(Integer)  # в секундах
    ensemble_id = Column(Integer, ForeignKey("ensembles.id"))  # изменено

    ensemble = relationship("Ensemble", back_populates="compositions")  # изменено
    performances = relationship("Performance", back_populates="composition")