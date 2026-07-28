#!/bin/sh
set -e

echo "Starting Blend Backend (NODE_ENV=${NODE_ENV:-production})..."

if [ -z "${DATABASE_URL:-}" ]; then
    echo "ERROR: DATABASE_URL is not set — refusing to start without database config."
    exit 1
fi

if [ "${MIGRATE_ON_STARTUP:-false}" = "true" ]; then
    echo "MIGRATE_ON_STARTUP=true — applying database migrations..."
    ./node_modules/.bin/prisma migrate deploy --schema=./prisma/schema.prisma
else
    echo "Skipping startup migrations (MIGRATE_ON_STARTUP=${MIGRATE_ON_STARTUP:-false})."
    echo "Expected path: run migrations in CI/CD before deployment."
fi

echo "Launching server on port ${PORT:-8080}..."
exec node dist/server.js
