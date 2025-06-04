from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Admin123"
ADMIN_EMAIL = "admin@musicshop.local"

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(
        username=user.username,
        email=user.email,
        password=pwd_context.hash(user.password),
        is_active=True,
        is_admin=False  # Обычные пользователи не админы
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    # Проверка на захардкоженного админа
    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        # Виртуальный админ, не из БД
        class AdminUser:
            id = 0
            username = ADMIN_USERNAME
            email = ADMIN_EMAIL
            is_active = True
            is_admin = True
        return AdminUser()
    user = get_user_by_username(db, username)
    if not user or not pwd_context.verify(password, user.password):
        return None
    return user