from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import musician
from routers import ensembles, records, analytics, compositions, labels, performances, auth, order, cart, user
from database import engine
from models import Base
from routers import __init__
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или укажите список доменов, например: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/auth", tags=["Аутентификация"])
app.include_router(user.router, prefix="/users", tags=["Пользователи"])
app.include_router(order.router, prefix="/orders", tags=["Заказы"])
app.include_router(cart.router, prefix="/cart", tags=["Корзина"])
app.include_router(ensembles.router, prefix="/ensembles", tags=["Ансамбли"])
app.include_router(musician.router, prefix="/musicians", tags=["Музыканты"])
app.include_router(compositions.router, prefix="/compositions", tags=["Композиции"])
app.include_router(records.router, prefix="/records", tags=["Пластинки"])
app.include_router(labels.router, prefix="/labels", tags=["Компании"])
app.include_router(analytics.router, prefix="/analytics", tags=["Аналитика"])
app.include_router(performances.router, prefix="/performances", tags=["Исполнения произведений"])