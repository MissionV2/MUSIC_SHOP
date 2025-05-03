from fastapi import APIRouter, Depends
from schemas.user import UserOut  # или UserFullOut, если хотите больше информации
from dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserOut)
def get_profile(current_user=Depends(get_current_user)):
    return current_user