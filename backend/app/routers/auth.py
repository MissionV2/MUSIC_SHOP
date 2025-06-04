from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.user import UserCreate, UserLogin, UserOut
from crud.user import create_user, get_user_by_username, authenticate_user
from dependencies import get_db

router = APIRouter()

# Регистрация
@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db, user)

# Авторизация (логин)
@router.post("/login", response_model=UserOut)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, user_in.username, user_in.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    # Если это "виртуальный" админ, возвращаем словарь для Pydantic
    if hasattr(user, "username") and user.username == "admin":
        return {
            "id": 0,
            "username": "admin",
            "email": "admin@musicshop.local",
            "is_active": True,
            "is_admin": True
        }
    return user

# Получение профиля по username (НЕ защищено)
@router.get("/profile/{username}", response_model=UserOut)
def get_profile(username: str, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user