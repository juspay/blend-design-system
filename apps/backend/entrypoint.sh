#!/bin/sh
set -e

echo "🏃 Starting Blend Backend..."

# Register TypeScript path aliases at runtime
if [ -f "./node_modules/tsconfig-paths/register.js" ]; then
    echo "📝 Registering TypeScript path aliases..."
    node ./node_modules/tsconfig-paths/register.js
fi

# Run migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
    echo "🔄 Running database migrations..."
    npx prisma migrate deploy || {
        echo "⚠️ Migration warning (may be already applied or DB unavailable)"
    }
else
    echo "⚠️ DATABASE_URL not set, skipping migrations"
fi

echo "🚀 Starting server on port ${PORT:-8080}..."
exec node dist/server.js