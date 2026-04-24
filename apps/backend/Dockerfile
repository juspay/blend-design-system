FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
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

RUN pnpm config set onlyBuiltDependencies "@prisma/client,@prisma/engines,esbuild,prisma" && \
    pnpm install --frozen-lockfile

WORKDIR /app/apps/backend
RUN npx prisma generate
RUN pnpm run build

FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/node_modules ./node_modules
COPY --from=builder /app/node_modules ../../node_modules
COPY --from=builder /app/apps/backend/package.json ./

USER appuser

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
