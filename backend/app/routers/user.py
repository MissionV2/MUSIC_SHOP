from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.user import UserOut
from dependencies import get_db, get_current_user

router = APIRouter()

@router.get("/users/me", response_model=UserOut)
def read_users_me(current_user=Depends(get_current_user)):
    return current_user