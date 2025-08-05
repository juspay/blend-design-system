# Build stage
FROM node:20-alpine AS builder

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package file
COPY package.json ./

# Install dependencies (without lock file since it's in the monorepo root)
RUN npm install

# Copy source files
COPY . .

# Set build-time environment variables (actual values for build)
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyD2aRkOI4iCwiZOW5kEejrL9jv9JvytKpo"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="storybook-452807.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="storybook-452807"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="storybook-452807.firebasestorage.app"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="567047894553"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:567047894553:web:1cd999e1c9bf9b81ff5c88"
ENV NEXT_PUBLIC_FIREBASE_DATABASE_URL="https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app"

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 8080
ENV PORT 8080

# Start the application
CMD ["node", "server.js"]
