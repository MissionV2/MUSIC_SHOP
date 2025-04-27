"""fix_index_issue

Revision ID: 6ba046b48fa4
Revises: 37de9b9c3cef
Create Date: 2025-04-26 15:36:56.094027

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6ba046b48fa4'
down_revision: Union[str, None] = '37de9b9c3cef'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
