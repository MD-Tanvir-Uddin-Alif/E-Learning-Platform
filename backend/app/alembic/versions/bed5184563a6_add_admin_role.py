"""add admin role

Revision ID: bed5184563a6
Revises: 0cf18141f9e4
Create Date: 2025-11-27 20:43:47.727723

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bed5184563a6'
down_revision: Union[str, Sequence[str], None] = '0cf18141f9e4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
