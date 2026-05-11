# Blend Design System — Complete Creator's Guide

**Author:** Creator of Blend Design System  
**Purpose:** Full infrastructure deployment + NPM publishing guide  
**Last Updated:** April 21, 2026

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Firebase Setup](#phase-1-firebase-setup)
4. [Phase 2: GCP Cloud SQL (PostgreSQL)](#phase-2-gcp-cloud-sql-postgresql)
5. [Phase 3: Backend Deployment (Cloud Run)](#phase-3-backend-deployment-cloud-run)
6. [Phase 4: Frontend Deployment (Firebase Hosting)](#phase-4-frontend-deployment-firebase-hosting)
7. [Phase 5: NPM Publishing](#phase-5-npm-publishing)
8. [Configuration Files](#configuration-files)
9. [Database Operations](#database-operations)
10. [Troubleshooting](#troubleshooting)
11. [Quick Reference](#quick-reference)

---

## Architecture Overview

```
Internet
    │
    ├────────────────────────────────────────┐
    │                                        │
    ▼                                        ▼
┌──────────────────┐                 ┌──────────────────────┐
│ Firebase Hosting │                 │ Cloud Run            │
│ (Studio Frontend)│                 │ (Backend API)        │
│                  │                 │                      │
│ /studio/* → SPA  │                 │ /api/* endpoints     │
│ /api/* → rewrite │◄────────────────│ Express + Prisma     │
│ to Cloud Run     │                 └──────────┬───────────┘
└──────────────────┘                            │
    │                                          │
    │    ┌─────────────────────────────────┐   │
    │    │ Secret Manager                  │   │
    │    │ • DB password                   │   │
    │    │ • JWT secrets                   │   │
    │    │ • Firebase private key          │   │
    │    └─────────────────────────────────┘   │
    │                                          ▼
    │                             ┌──────────────────────┐
    │                             │ Cloud SQL            │
    │                             │ (PostgreSQL 16)      │
    │                             │                      │
    │                             │ • Users, Teams       │
    │                             │ • Branches, Versions │
    │                             │ • Audit Logs         │
    │                             └──────────────────────┘
    │
    ▼
┌──────────────────┐
│ Firebase         │
│ • Auth (Google)  │
│ • Firestore      │
│   (brand JSON)   │
└──────────────────┘
```

**Data Split:**

- **PostgreSQL:** Users, teams, roles, relational data, audit logs
- **Firestore:** Brand configs (JSON blobs), snapshots, versions
- **Secret Manager:** All secrets (DB passwords, JWT, Firebase keys)

---

## Prerequisites

- Node.js 18+, pnpm 10+
- gcloud CLI installed and authenticated (`gcloud auth login`)
- Firebase CLI: `npm install -g firebase-tools`
- npm account with @juspay scope access
- A GCP project with billing enabled

---

## Phase 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Create a project**
3. Name: `blend-studio-prod` (or your choice)
4. Enable Google Analytics (optional)
5. Note the **Project ID** (e.g., `blend-studio-prod`)

### 1.2 Enable Authentication

1. Go to **Authentication** → **Sign-in method**
2. Click **Google**
3. Toggle **Enable**
4. Add authorized domains:
    - `localhost:3000` (dev)
    - `localhost:5173` (dev)
    - `studio.blend.juspay.design` (production)
    - `blend-studio-prod.web.app` (Firebase default)
5. Click **Save**

### 1.3 Configure Google OAuth (Cloud Console)

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID (auto-created by Firebase)
3. Add authorized origins:
    ```
    http://localhost:3000
    http://localhost:5173
    https://studio.blend.juspay.design
    https://blend-studio-prod.web.app
    ```
4. Add redirect URIs:
    ```
    http://localhost:3000/__/auth/handler
    https://studio.blend.juspay.design/__/auth/handler
    https://blend-studio-prod.web.app/__/auth/handler
    ```

### 1.4 Enable Firestore

1. Go to **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode**
4. Choose location: `us-central1`
5. Deploy rules:
    ```bash
    firebase deploy --only firestore:rules
    ```

### 1.5 Create Web App & Get Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps**
3. Click **Web** (`</>`)
4. Nickname: `blend-studio-web`
5. Click **Register**
6. **Copy the firebaseConfig** — you'll need this for environment variables

### 1.6 Create Service Account

1. Go to **Project Settings** → **Service accounts**
2. Click **Generate new private key**
3. Save JSON file securely (never commit!)
4. You'll need: `project_id`, `client_email`, `private_key`

---

## Phase 2: GCP Cloud SQL (PostgreSQL)

### 2.1 Enable APIs

```bash
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com
```

### 2.2 Create Cloud SQL Instance

```bash
# Create instance
gcloud sql instances create blend-db \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --storage-auto-increase

# Set admin password
gcloud sql users set-password admin \
  --instance=blend-db \
  --password="YOUR_STRONG_PASSWORD_HERE"

# Create database
gcloud sql databases create blend_studio \
  --instance=blend-db

# Get connection name
gcloud sql instances describe blend-db --format="value(connectionName)"
# Output: YOUR_PROJECT:us-central1:blend-db
```

### 2.3 Create Secrets in Secret Manager

```bash
# Database password
echo -n "YOUR_STRONG_PASSWORD_HERE" | \
  gcloud secrets create blend-backend-db-password --data-file=-

# JWT secret
openssl rand -base64 48 | \
  gcloud secrets create blend-backend-jwt-secret --data-file=-

# JWT refresh secret
openssl rand -base64 48 | \
  gcloud secrets create blend-backend-jwt-refresh-secret --data-file=-

# Firebase private key (paste the actual key content)
echo -n "-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQE...
-----END PRIVATE KEY-----" | \
  gcloud secrets create blend-backend-firebase-key --data-file=-
```

### 2.4 Create Service Account for Backend

```bash
# Create service account
gcloud iam service-accounts create blend-backend-sa \
  --display-name="Blend Backend Service Account"

# Grant Cloud SQL access
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:blend-backend-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Grant Secret Manager access
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:blend-backend-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## Phase 3: Backend Deployment (Cloud Run)

### 3.1 Create Environment File

Create `apps/backend/.env.production`:

```env
NODE_ENV=production
PORT=3001

# Cloud SQL
INSTANCE_CONNECTION_NAME=YOUR_PROJECT:us-central1:blend-db
DATABASE_NAME=blend_studio
DATABASE_USER=admin
# DATABASE_PASSWORD comes from Secret Manager

# JWT
# JWT_SECRET and JWT_REFRESH_SECRET come from Secret Manager

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_from_cloud_console
GOOGLE_CLIENT_SECRET=your_client_secret

# Frontend URL for CORS
FRONTEND_URL=https://studio.blend.juspay.design

# Firebase Admin
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@YOUR_PROJECT_ID.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY comes from Secret Manager
```

### 3.2 Build and Deploy Backend

```bash
# Build and push container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/blend-backend

# Deploy to Cloud Run
gcloud run deploy blend-backend \
  --image gcr.io/YOUR_PROJECT_ID/blend-backend:latest \
  --region us-central1 \
  --platform managed \
  --no-allow-unauthenticated \
  --add-cloudsql-instances YOUR_PROJECT:us-central1:blend-db \
  --set-env-vars "NODE_ENV=production,PORT=3001,INSTANCE_CONNECTION_NAME=YOUR_PROJECT:us-central1:blend-db,DATABASE_NAME=blend_studio,DATABASE_USER=admin,FRONTEND_URL=https://studio.blend.juspay.design,FIREBASE_PROJECT_ID=YOUR_PROJECT_ID,FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@YOUR_PROJECT_ID.iam.gserviceaccount.com,GOOGLE_CLIENT_ID=your_client_id,GOOGLE_CLIENT_SECRET=your_client_secret" \
  --set-secrets "DATABASE_PASSWORD=blend-backend-db-password:latest,JWT_SECRET=blend-backend-jwt-secret:latest,JWT_REFRESH_SECRET=blend-backend-jwt-refresh-secret:latest,FIREBASE_PRIVATE_KEY=blend-backend-firebase-key:latest" \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --service-account blend-backend-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Get the deployed URL
gcloud run services describe blend-backend \
  --region us-central1 \
  --format="value(status.url)"
# Output: https://blend-backend-xxxxx-uc.a.run.app
```

### 3.3 Run Database Migrations

**Option A: Via Cloud Run Job**

```bash
# Temporary: Run migration as startup command
gcloud run services update blend-backend \
  --region us-central1 \
  --command "sh" \
  --args "-c,npx prisma migrate deploy && node dist/server.js"
```

**Option B: Via Cloud SQL Proxy (Local)**

```bash
# Download proxy
curl -o cloud_sql_proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2/cloud-sql-proxy.linux.amd64
chmod +x cloud_sql_proxy

# Start proxy
./cloud_sql_proxy YOUR_PROJECT:us-central1:blend-db --port 5433 &

# Run migrations
cd apps/backend
DATABASE_URL="postgresql://admin:YOUR_PASSWORD@localhost:5433/blend_studio" \
  npx prisma migrate deploy
```

### 3.4 Verify Backend Health

```bash
# Test health endpoint
curl https://blend-backend-xxxxx-uc.a.run.app/health

# Expected: {"status":"ok","timestamp":"...","version":"0.1.0"}
```

---

## Phase 4: Frontend Deployment (Firebase Hosting)

### 4.1 Create Environment File

Create `apps/blend-studio/.env.production`:

```env
# Firebase Client Config
VITE_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=blend-studio-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=blend-studio-prod
VITE_FIREBASE_STORAGE_BUCKET=blend-studio-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxx

# API Base URL
# Leave empty when using Firebase Hosting rewrites (recommended)
VITE_API_BASE_URL=

# Disable mock data
VITE_USE_MOCK_DATA=false
```

### 4.2 Configure Firebase Hosting

Create/update `firebase.json` in project root:

```json
{
    "hosting": {
        "public": "apps/blend-studio/dist",
        "ignore": ["firebase.json", "**/node_modules/**"],
        "rewrites": [
            {
                "source": "/api/**",
                "run": {
                    "serviceId": "blend-backend",
                    "region": "us-central1"
                }
            },
            {
                "source": "/studio/**",
                "destination": "/studio/index.html"
            }
        ],
        "headers": [
            {
                "source": "/studio/**/*.{js,css,svg,png,jpg,woff2}",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public, max-age=31536000, immutable"
                    }
                ]
            },
            {
                "source": "/studio/**/*.html",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "no-cache"
                    }
                ]
            }
        ]
    }
}
```

Create `.firebaserc`:

```json
{
    "projects": {
        "production": "YOUR_PROJECT_ID",
        "staging": "YOUR_STAGING_PROJECT_ID"
    }
}
```

### 4.3 Build Frontend

```bash
cd apps/blend-studio

# Install dependencies
pnpm install

# Build for production
pnpm build

# Verify dist folder
ls -la dist/
```

### 4.4 Deploy to Firebase Hosting

```bash
# Deploy to production
firebase deploy --only hosting --project production

# Or deploy to staging
firebase deploy --only hosting --project staging

# Your app will be at:
# https://YOUR_PROJECT_ID.web.app
# https://YOUR_PROJECT_ID.firebaseapp.com
```

### 4.5 Configure Custom Domain

1. Go to [Firebase Console → Hosting](https://console.firebase.google.com/project/_/hosting)
2. Click **Add custom domain**
3. Enter: `studio.blend.juspay.design`
4. Follow DNS verification steps
5. Wait for SSL provisioning (< 1 hour)

---

## Phase 5: NPM Publishing

### 5.1 Prerequisites

```bash
# Login to npm
npm login

# Verify access
npm whoami
npm access list packages @juspay
```

### 5.2 Publish CLI

```bash
# Build CLI
cd packages/cli
pnpm build

# Verify binary
node dist/index.js --help

# Publish
npm publish --access public

# Verify
npm view blend-studio

# Test global install
npm install -g blend-studio
blend-studio --version
```

**Note**: The CLI depends on `@juspay/blend-design-system` which already includes the token engine at `@juspay/blend-design-system/tokens`.

### 5.5 Publish Blend Components

```bash
# Version bump (root)
pnpm version:blend patch  # or minor/major

# Build
pnpm -w run build:blend

# Dry run
pnpm -w run publish:blend:dry

# Publish
pnpm -w run publish:blend

# Or manually:
cd packages/blend
pnpm publish --access public
```

---

## Configuration Files

### apps/blend-studio/vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === 'production' ? '/studio/' : '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                },
            },
        },
    },
}))
```

### apps/blend-studio/database/SCHEMA.md

See `apps/blend-studio/database/SCHEMA.md` for complete database schema documentation.

### firestore.rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read branches
    match /branches/{branchId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        resource.data.owner == request.auth.uid;
    }

    // Versions are immutable
    match /branches/{branchId}/versions/{versionId} {
      allow read: if request.auth != null;
      allow write: if false; // Immutable after creation
    }
  }
}
```

---

## Database Operations

### Local Development Database

```bash
# Create local database
createdb blend_studio

# Set environment
export DATABASE_URL=postgresql://postgres:password@localhost:5432/blend_studio

# Run migrations
cd apps/blend-studio
pnpm db:generate
pnpm db:migrate

# Seed database
pnpm db:seed
```

### Production Migrations

```bash
# Via Cloud SQL Proxy
./cloud_sql_proxy YOUR_PROJECT:us-central1:blend-db --port 5433 &
cd apps/backend
DATABASE_URL="postgresql://admin:PASSWORD@localhost:5433/blend_studio" \
  npx prisma migrate deploy
```

### Backup Database

```bash
# Export
gcloud sql export sql blend-db gs://YOUR_BUCKET/backup-$(date +%Y%m%d).sql

# Import
gcloud sql import sql blend-db gs://YOUR_BUCKET/backup-20240421.sql
```

---

## Troubleshooting

### Firebase "Permission Denied"

```bash
# Cause: Firestore rules not deployed
firebase deploy --only firestore:rules
```

### Cloud Run CORS Error

```bash
# Cause: FRONTEND_URL mismatch
# Fix: Use Firebase Hosting rewrites instead of CORS
# Or update FRONTEND_URL
gcloud run services update blend-backend \
  --region us-central1 \
  --set-env-vars "FRONTEND_URL=https://studio.blend.juspay.design"
```

### Cloud SQL Connection Refused

```bash
# Verify instance exists
gcloud sql instances describe blend-db

# Check service account permissions
gcloud projects get-iam-policy YOUR_PROJECT_ID \
  --flatten="bindings[].members" \
  --format='table(bindings.role)' \
  --filter="bindings.members:blend-backend-sa"

# Verify Cloud SQL instance attached to Cloud Run
gcloud run services describe blend-backend --region us-central1
```

### Prisma Migration Fails

```bash
# Reset migrations (dev only)
npx prisma migrate reset

# Or mark as applied
npx prisma migrate resolve --applied 20240101_migration_name
```

### NPM Publishing 403 Error

```bash
# Check if logged in
npm whoami

# Check permissions
npm access list packages @juspay

# May need organization admin to add you
```

### Build Failures

```bash
# Clean and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

---

## Quick Reference

### Environment Variables Summary

#### Client-side (VITE\_\* prefix)

| Variable                            | Required | Description                               |
| ----------------------------------- | -------- | ----------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Yes      | Firebase public API key                   |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Yes      | e.g., `project.firebaseapp.com`           |
| `VITE_FIREBASE_PROJECT_ID`          | Yes      | Firebase project ID                       |
| `VITE_FIREBASE_STORAGE_BUCKET`      | No       | Cloud Storage bucket                      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | No       | Push notifications                        |
| `VITE_FIREBASE_APP_ID`              | Yes      | Firebase web app ID                       |
| `VITE_API_BASE_URL`                 | No       | Backend URL (empty for Firebase rewrites) |
| `VITE_USE_MOCK_DATA`                | No       | Set `true` to skip Firebase               |

#### Server-side

| Variable                   | Required | Description               |
| -------------------------- | -------- | ------------------------- |
| `INSTANCE_CONNECTION_NAME` | Yes      | Cloud SQL connection name |
| `DATABASE_NAME`            | Yes      | Database name             |
| `DATABASE_USER`            | Yes      | Database username         |
| `DATABASE_PASSWORD`        | Yes      | From Secret Manager       |
| `JWT_SECRET`               | Yes      | From Secret Manager       |
| `JWT_REFRESH_SECRET`       | Yes      | From Secret Manager       |
| `GOOGLE_CLIENT_ID`         | Yes      | OAuth client ID           |
| `GOOGLE_CLIENT_SECRET`     | Yes      | OAuth client secret       |
| `FRONTEND_URL`             | Yes      | Allowed CORS origin       |
| `FIREBASE_PROJECT_ID`      | Yes      | Firebase project ID       |
| `FIREBASE_CLIENT_EMAIL`    | Yes      | Service account email     |
| `FIREBASE_PRIVATE_KEY`     | Yes      | From Secret Manager       |

### Common Commands

```bash
# === NPM ===
cd packages/cli && npm publish --access public             # Publish CLI
pnpm -w run publish:blend                                  # Publish components
```

---

## Deployment Checklist

### Pre-deployment

- [ ] Firebase project created and configured
- [ ] Google OAuth credentials set up
- [ ] Firestore database enabled
- [ ] Cloud SQL instance created
- [ ] Secrets stored in Secret Manager
- [ ] Service account created with proper IAM roles
- [ ] Environment files created (.env.production)

### Deployment

- [ ] Backend built and deployed to Cloud Run
- [ ] Database migrations run successfully
- [ ] Backend health check passes
- [ ] Frontend built successfully
- [ ] Firebase hosting configured with rewrites
- [ ] Frontend deployed to Firebase Hosting
- [ ] Custom domain configured (if applicable)

### Post-deployment

- [ ] Authentication works (Google Sign-in)
- [ ] Brand creation works
- [ ] Token generation works
- [ ] Database connections stable
- [ ] Monitoring/alerting configured (optional)

### NPM Publishing (if releasing new version)

- [ ] CLI dependencies updated (depends on `@juspay/blend-design-system`)
- [ ] CLI built and tested
- [ ] CLI published to NPM
- [ ] Components version bumped
- [ ] Components built and published

---

## Next Steps

1. **Monitor:** Set up Cloud Monitoring alerts for:
    - High error rates in Cloud Run
    - Database connection limits
    - Firebase Auth anomalies

2. **Scale:** Adjust Cloud Run min/max instances based on traffic

3. **Backup:** Automate daily database backups via Cloud Scheduler

4. **Security:** Rotate secrets every 90 days

---

**Questions?** Check the troubleshooting section or refer to:

- `apps/blend-studio/database/SCHEMA.md` — Database schema
- `packages/cli/README.md` — CLI documentation
- `packages/blend/README.md` — Component library documentation
