from logging.config import fileConfig
from sqlalchemy import create_engine
from alembic import context
from app.models import Base  # Импорт базовой модели
import os

config = context.config
fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_online():
    connectable = create_engine(os.getenv("DATABASE_URL", "postgresql://musicUser:musicShop@localhost:5434/musicShop"))

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()

run_migrations_online()