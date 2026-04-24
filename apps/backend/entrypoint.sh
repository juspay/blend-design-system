#!/bin/sh
set -e

echo "Starting Blend Backend (NODE_ENV=${NODE_ENV:-production})..."

if [ -n "$DATABASE_URL" ]; then
    echo "Applying database migrations..."
    npx --yes prisma migrate deploy \
        --schema=./prisma/schema.prisma || {
        echo "WARN: prisma migrate deploy failed (likely already applied or transient); continuing."
    }
else
    echo "WARN: DATABASE_URL is not set — skipping migrations."
fi

echo "Launching server on port ${PORT:-8080}..."
exec node dist/server.js
