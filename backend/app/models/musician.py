from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from .base import Base

class Musician(Base):
    __tablename__ = "musicians"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    birth_date = Column(Date)
    death_date = Column(Date, nullable=True)
    nationality = Column(String(50))
    bio = Column(Text, nullable=True)

    ensembles = relationship(
        "Ensemble",
        secondary="ensemble_musician",
        back_populates="musicians",
        cascade="all, delete",
        passive_deletes=True
    )