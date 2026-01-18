"""Change courses.description to TEXT

Revision ID: 142639e5ec99
Revises: ca129dfb9867
Create Date: 2026-01-18 13:07:11.137782

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '142639e5ec99'
down_revision: Union[str, Sequence[str], None] = 'ca129dfb9867'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
