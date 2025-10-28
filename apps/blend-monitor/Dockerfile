# Build stage
FROM node:20-alpine AS builder

# Install dependencies for native modules and pnpm
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy monorepo files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY turbo.json ./

# Copy blend-monitor app
COPY apps/blend-monitor ./apps/blend-monitor

# Copy shared packages if needed
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build arguments for Firebase configuration
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_DATABASE_URL

# Set build-time environment variables from build arguments
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ENV NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
ENV NEXT_PUBLIC_FIREBASE_DATABASE_URL=${NEXT_PUBLIC_FIREBASE_DATABASE_URL}

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app/apps/blend-monitor
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/apps/blend-monitor/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/blend-monitor/.next/static ./apps/blend-monitor/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/blend-monitor/public ./apps/blend-monitor/public

USER nextjs

# Expose port
EXPOSE 8080
ENV PORT 8080
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "apps/blend-monitor/server.js"]
