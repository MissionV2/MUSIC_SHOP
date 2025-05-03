from typing import Generator
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from database import SessionLocal
from config import settings
import crud, models
from models.user import User
from crud.user import get_user_by_username

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")  # путь к вашему login-роуту

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user

# class TokenData(BaseModel):
#     username: Optional[str] = None

# SECRET_KEY: str = "your_secret_key_here"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# def get_current_user(
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ) -> models.User:
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
    
#     user = crud.user.get_by_username(db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

# def get_current_active_admin(
#     current_user: models.User = Depends(get_current_user)
# ) -> models.User:
#     if not current_user.is_admin:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN, 
#             detail="Admin privileges required"
#         )
#     return current_user

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# def validate_ensemble_id(
#     ensemble_id: int, 
#     db: Session = Depends(get_db)
# ) -> models.Ensemble:
#     ensemble = crud.ensemble.get(db, id=ensemble_id)
#     if not ensemble:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Ensemble with ID {ensemble_id} not found"
#         )
#     return ensemble

# def validate_record_id(
#     record_id: int, 
#     db: Session = Depends(get_db)
# ) -> models.Record:
#     record = crud.record.get(db, id=record_id)
#     if not record:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Record with ID {record_id} not found"
#         )
#     return record