from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from .record_compositions import record_compositions
from .base import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    catalog_number = Column(String(50), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    release_date = Column(Date, nullable=False)
    wholesale_price = Column(Float, nullable=False)
    retail_price = Column(Float, nullable=False)
    stock_quantity = Column(Integer, default=0)
    sales_current_year = Column(Integer, default=0)
    sales_previous_year = Column(Integer, default=0)
    label_id = Column(Integer, ForeignKey("labels.id"), nullable=False)
    
    label = relationship("Label", back_populates="records")
    performances = relationship("Performance", secondary="record_performances", back_populates="records")
    compositions = relationship("Composition", secondary=record_compositions, back_populates="records")