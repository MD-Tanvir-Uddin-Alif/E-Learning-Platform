"""Update courses description to text

Revision ID: ca129dfb9867
Revises: e3a026a3f822
Create Date: 2026-01-18 12:43:50.775933

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ca129dfb9867'
down_revision: Union[str, Sequence[str], None] = 'e3a026a3f822'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
