from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str

    class Config:
        env_file = "/Users/vladdremenko/ПРОЕКТЫ/MUSIC_SHOP/backend/app/.env"

settings = Settings()