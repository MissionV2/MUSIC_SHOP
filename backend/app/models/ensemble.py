from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from .base import Base

class Ensemble(Base):
    __tablename__ = 'ensembles'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    formation_date = Column(Date)
    description = Column(Text)
    
    compositions = relationship("Composition", back_populates="ensemble") 
    musicians = relationship(
        "Musician",
        secondary="ensemble_musician",
        back_populates="ensembles",
        cascade="all, delete",
        passive_deletes=True
    )
    performances = relationship(
        "Performance",
        back_populates="ensemble",
        cascade="all, delete-orphan",
        passive_deletes=True
    )