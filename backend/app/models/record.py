from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Record(Base):
    __tablename__ = 'records'

    id = Column(Integer, primary_key=True, index=True)
    catalog_number = Column(String(50), unique=True)
    title = Column(String(200))
    release_date = Column(Date)
    wholesale_price = Column(Float)
    retail_price = Column(Float)
    stock_quantity = Column(Integer, default=0)
    sales_current_year = Column(Integer, default=0)
    sales_previous_year = Column(Integer, default=0)
    label_id = Column(Integer, ForeignKey('labels.id'))
    
    label = relationship("Label", back_populates="records")
    performances = relationship("Performance", secondary="record_performance", back_populates="records")