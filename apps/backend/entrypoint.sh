#!/bin/sh
set -e

echo "Starting Blend Backend (NODE_ENV=${NODE_ENV:-production})..."

if [ -n "$DATABASE_URL" ]; then
    echo "Applying database migrations..."
    npx --yes prisma migrate deploy --schema=./prisma/schema.prisma
else
    echo "ERROR: DATABASE_URL is not set — refusing to start without database config."
    exit 1
fi

echo "Launching server on port ${PORT:-8080}..."
exec node dist/server.js
