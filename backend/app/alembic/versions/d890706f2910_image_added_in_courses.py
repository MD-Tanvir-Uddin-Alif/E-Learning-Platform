"""image added in courses

Revision ID: d890706f2910
Revises: 5c9c4787db41
Create Date: 2025-12-01
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd890706f2910'
down_revision = '5c9c4787db41'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add image_url column to courses
    op.add_column('courses', sa.Column('image_url', sa.String(length=255), nullable=True))


def downgrade() -> None:
    # Remove image_url column
    op.drop_column('courses', 'image_url')
