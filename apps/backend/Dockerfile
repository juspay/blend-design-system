# =============================================================================
# Blend Backend — multi-stage production image
# -----------------------------------------------------------------------------
# Monorepo layout:  pnpm workspace at repo root, backend at apps/backend.
# Goals of this Dockerfile:
#   1. Deterministic installs (frozen lockfile, pinned pnpm).
#   2. Only install what the backend actually needs (filtered install).
#   3. Build with tsc + tsc-alias so compiled `@/*` imports resolve natively
#      in Node — no runtime path-alias tricks.
#   4. Ship a minimal, self-contained runtime image built by `pnpm deploy`:
#      no workspace symlinks, no dev deps, no source code, non-root user.
#   5. Proper PID 1 (tini) + Cloud Run healthcheck.
# =============================================================================

ARG NODE_VERSION=20-alpine
ARG PNPM_VERSION=10.21.0

# -----------------------------------------------------------------------------
# 1. base — shared toolchain layer
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat openssl
ENV CI=true \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
RUN corepack enable \
 && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /repo

# -----------------------------------------------------------------------------
# 2. builder — install + compile backend inside the monorepo
# -----------------------------------------------------------------------------
FROM base AS builder

# Workspace metadata first so the dep layer caches across source-only edits.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/cli/package.json ./packages/cli/package.json
COPY packages/blend/package.json ./packages/blend/package.json
COPY packages/token-engine/package.json ./packages/token-engine/package.json

# Allow native post-install scripts only for the packages that actually
# need them. Everything else stays locked down.
RUN pnpm config set onlyBuiltDependencies "@prisma/client,@prisma/engines,esbuild,prisma"

# Filtered install: only the backend and its transitive deps. We keep devDeps
# because tsc / tsc-alias / prisma CLI are needed to build.
RUN pnpm install \
      --frozen-lockfile \
      --filter "@blend-design/justbackend..."

# Backend source (after deps, so this layer busts on code changes only).
COPY apps/backend ./apps/backend

WORKDIR /repo/apps/backend
RUN pnpm exec prisma generate
RUN pnpm run build

# -----------------------------------------------------------------------------
# 3. deployer — `pnpm deploy` produces a self-contained prod tree in /deploy.
#    We re-run `prisma generate` against the pruned node_modules so the
#    generated client is present in the final image (pnpm deploy re-installs
#    @prisma/client fresh, so the builder-generated client is discarded).
# -----------------------------------------------------------------------------
FROM builder AS deployer
WORKDIR /repo
# `--legacy` is required in pnpm 10 because this workspace does not set
# `inject-workspace-packages=true`; legacy deploy is the fully-supported path
# for packages without injected workspace deps (the backend is standalone).
RUN pnpm --filter "@blend-design/justbackend" deploy --prod --legacy /deploy
WORKDIR /deploy
RUN pnpm exec prisma generate --schema=./prisma/schema.prisma

# -----------------------------------------------------------------------------
# 4. runner — minimal runtime image
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner

RUN apk add --no-cache libc6-compat openssl tini wget \
 && addgroup -S appgroup -g 1001 \
 && adduser  -S appuser  -u 1001 -G appgroup

WORKDIR /app

# Self-contained prod deps (no symlinks, no workspace leaks).
COPY --from=deployer --chown=appuser:appgroup /deploy/package.json  ./package.json
COPY --from=deployer --chown=appuser:appgroup /deploy/node_modules  ./node_modules

# Compiled output + prisma schema/migrations.
COPY --from=builder  --chown=appuser:appgroup /repo/apps/backend/dist    ./dist
COPY --from=builder  --chown=appuser:appgroup /repo/apps/backend/prisma  ./prisma

# Entrypoint script.
COPY --chown=appuser:appgroup apps/backend/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

USER appuser

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider "http://127.0.0.1:${PORT}/health" || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./entrypoint.sh"]
