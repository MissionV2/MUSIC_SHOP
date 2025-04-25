from sqlalchemy import Table, Column, Integer, ForeignKey
from .base import Base

record_performance = Table(
    'record_performance', Base.metadata,
    Column('record_id', Integer, ForeignKey('records.id'), primary_key=True),
    Column('performance_id', Integer, ForeignKey('performances.id'), primary_key=True)
)