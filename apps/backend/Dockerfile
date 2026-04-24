FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY turbo.json ./

COPY apps/backend ./apps/backend
COPY packages/token-engine ./packages/token-engine
COPY packages/cli ./packages/cli
COPY packages/blend ./packages/blend

# Install with approval for native builds
RUN pnpm config set onlyBuiltDependencies "@prisma/client,@prisma/engines,esbuild,prisma" && \
    pnpm install --frozen-lockfile

WORKDIR /app/apps/backend
RUN npx prisma generate
RUN pnpm run build

FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 appuser

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/apps/backend/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/prisma ./prisma
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/node_modules ../../node_modules
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/package.json ./
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/tsconfig.json ./
COPY --chown=appuser:appgroup apps/backend/entrypoint.sh ./entrypoint.sh

COPY --from=builder --chown=appuser:appgroup /app/apps/backend/node_modules/tsconfig-paths ./node_modules/tsconfig-paths

RUN chmod +x ./entrypoint.sh

USER appuser

ENV NODE_ENV=production

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["./entrypoint.sh"]
