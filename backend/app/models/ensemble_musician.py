from sqlalchemy import Table, Column, Integer, ForeignKey
from .base import Base

ensemble_musician = Table(
    'ensemble_musician', Base.metadata,
    Column('ensemble_id', Integer, ForeignKey('ensembles.id'), primary_key=True),
    Column('musician_id', Integer, ForeignKey('musicians.id'), primary_key=True)
)