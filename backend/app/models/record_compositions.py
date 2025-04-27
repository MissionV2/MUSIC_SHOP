from sqlalchemy import Table, Column, Integer, ForeignKey
from .base import Base

record_compositions = Table(
    "record_compositions",
    Base.metadata,
    Column("record_id", Integer, ForeignKey("records.id"), primary_key=True),
    Column("composition_id", Integer, ForeignKey("compositions.id"), primary_key=True)
)