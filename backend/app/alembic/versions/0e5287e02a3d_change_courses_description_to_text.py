"""Change courses.description to TEXT

Revision ID: 0e5287e02a3d
Revises: 142639e5ec99
Create Date: 2026-01-18 13:12:03.223146

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0e5287e02a3d'
down_revision: Union[str, Sequence[str], None] = '142639e5ec99'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
