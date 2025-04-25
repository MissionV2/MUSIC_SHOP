from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from .base import Base

class Musician(Base):
    __tablename__ = 'musicians'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    birth_date = Column(Date)
    instrument = Column(String(50))
    
    ensembles = relationship("Ensemble", secondary="ensemble_musician", back_populates="musicians")