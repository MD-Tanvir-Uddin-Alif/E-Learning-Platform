from alembic import op
import sqlalchemy as sa

# Revision identifiers
revision = 'c0e2a8fef77a'
down_revision = 'bed5184563a6'
branch_labels = None
depends_on = None

old_options = ('user', 'instructor')
new_options = ('user', 'instructor', 'admin')

old_enum = sa.Enum(*old_options, name='userrole')
new_enum = sa.Enum(*new_options, name='userrole')

def upgrade():
    # 1. Rename old enum
    op.execute("ALTER TYPE userrole RENAME TO userrole_old;")

    # 2. Create new enum type
    new_enum.create(op.get_bind(), checkfirst=True)

    # 3. Update the column to use the new enum
    op.execute("""
        ALTER TABLE users 
        ALTER COLUMN role 
        TYPE userrole USING role::text::userrole;
    """)

    # 4. Drop old enum
    op.execute("DROP TYPE userrole_old;")

def downgrade():
    pass
