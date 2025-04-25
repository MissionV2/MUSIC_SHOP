from fastapi import FastAPI
from routers import ensembles, records, analytics, compositions, labels, performances
from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(ensembles.router, prefix="/ensembles", tags=["Ансамбли"])
app.include_router(records.router, prefix="/records", tags=["Пластинки"])
app.include_router(analytics.router, prefix="/analytics", tags=["Аналитика"])
app.include_router(compositions.router, prefix="/compositions", tags=["Композиции"])
app.include_router(labels.router, prefix="/labels", tags=["Компании"])
app.include_router(performances.router, prefix="/performances", tags=["Исполнения произведений"])