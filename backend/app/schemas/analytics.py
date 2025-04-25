from typing import List
from .base import BaseSchema
from .record import Record

class SalesReport(BaseSchema):
    year: int
    total_revenue: float
    best_selling_genre: str

class TopSellingRecords(BaseSchema):
    records: List[Record]
    total_units_sold: int