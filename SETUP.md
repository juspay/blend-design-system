# Blend Design System — Setup Guide

Everything you need to install, configure, and use Blend components with custom brand tokens in your project.

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start (5 minutes)](#quick-start-5-minutes)
3. [Installing the Component Library](#installing-the-component-library)
4. [CLI Setup & Authentication](#cli-setup--authentication)
5. [Scaffolding Your Project](#scaffolding-your-project)
6. [Applying a Brand](#applying-a-brand)
7. [Using Blend Token Studio](#using-blend-token-studio)
8. [Pulling Tokens from Studio](#pulling-tokens-from-studio)
9. [ReScript Projects](#rescript-projects)
10. [CI/CD Integration](#cicd-integration)
11. [Token Inheritance & Locking](#token-inheritance--locking)
12. [GitHub Actions — Publishing the CLI](#github-actions--publishing-the-cli)
13. [Deploying Backend + DB on GCP](#deploying-backend--db-on-gcp)
14. [Deploying Frontend on Firebase Hosting](#deploying-frontend-on-firebase-hosting)
15. [Troubleshooting](#troubleshooting)

---

## Overview

Blend Design System has three pieces:

| Piece                 | Package                       | What it does                                            |
| --------------------- | ----------------------------- | ------------------------------------------------------- |
| **Component Library** | `@juspay/blend-design-system` | React components (Button, Input, Alert, etc.)           |
| **Token Engine**      | `@blend-design/token-engine`  | Resolves a brand config → full component token set      |
| **CLI**               | `blend-token-studio`          | Scaffolds projects, generates tokens, syncs with Studio |

The flow:

```
Studio (web editor)  →  brand.json  →  CLI pull  →  tokens.ts  →  <ThemeProvider>  →  Your App
```

You write ~20 lines of JSON (your brand colors, radius, font). The token engine expands it into ~10,000+ resolved token values that every Blend component consumes.

---

## Quick Start (5 minutes)

```bash
# 1. Install the component library
npm install @juspay/blend-design-system styled-components

# 2. Scaffold your project
npx blend-token-studio init

# 3. Apply a brand preset
npx blend-token-studio brand --preset juspay

# 4. Wrap your app
# In your root layout:
import { BlendProvider } from './src/blend/provider'
<BlendProvider><App /></BlendProvider>
```

That's it. All Blend components now use your brand colors and radius.

---

## Installing the Component Library

### Prerequisites

- React 18+
- styled-components 6+

### Install

```bash
# With pnpm (recommended)
pnpm add @juspay/blend-design-system styled-components

# With npm
npm install @juspay/blend-design-system styled-components

# With yarn
yarn add @juspay/blend-design-system styled-components
```

### Verify

```tsx
import { ButtonV2 } from '@juspay/blend-design-system'

function App() {
    return <ButtonV2>Click me</ButtonV2>
}
```

If this renders, the component library is installed correctly.

---

## CLI Setup & Authentication

### Install the CLI

The CLI is used via `npx` — no global install needed:

```bash
npx blend-token-studio --version
```

### Login

```bash
# Interactive login (opens prompt for JWT token)
npx blend-token-studio login

# Or with a token directly
npx blend-token-studio login --token <your-jwt>

# Or via environment variable (for CI)
export BLEND_STUDIO_API_TOKEN=<your-jwt>
```

### Get an API Token

1. Open [Blend Token Studio](https://studio.blend.juspay.design)
2. Sign in with Google
3. Open the user menu (top right) → **API Token (for CLI)**
4. Copy the token

### Verify Authentication

```bash
npx blend-token-studio whoami
# Output: Logged in as: you@company.com
```

### Logout

```bash
npx blend-token-studio logout
```

---

## Scaffolding Your Project

```bash
npx blend-token-studio init
```

This command:

1. **Detects** your project type (Next.js, Vite, CRA, or ReScript)
2. **Installs** missing dependencies (`@juspay/blend-design-system`, `styled-components`)
3. **Creates** `blend.config.json` with defaults
4. **Generates** `src/blend/provider.tsx` — the wrapper component
5. **Generates** `src/blend/tokens.ts` — default (Blend) tokens

### Options

| Flag         | Description                |
| ------------ | -------------------------- |
| `--defaults` | Skip prompts, use defaults |
| `--force`    | Overwrite existing files   |

### What gets created

```
your-project/
├── blend.config.json       # Project config (brand, output dir, studio URL)
└── src/blend/
    ├── provider.tsx         # <BlendProvider> wrapper — safe to edit
    └── tokens.ts            # Resolved tokens — auto-generated, don't edit
```

### Use the provider

```tsx
// app/layout.tsx (Next.js) or src/main.tsx (Vite)
import { BlendProvider } from './src/blend/provider'

export default function RootLayout({ children }) {
    return <BlendProvider theme="light">{children}</BlendProvider>
}
```

---

## Applying a Brand

### Interactive

```bash
npx blend-token-studio brand
```

Walks you through picking a primary color, radius style, etc.

### Using a preset

```bash
npx blend-token-studio brand --preset juspay
```

Available presets: `blend`, `juspay`, `purple`, `green`, `orange`

### With specific colors

```bash
npx blend-token-studio brand --primary "#E11D48" --radius rounded
```

### What this does

1. Updates `src/blend/tokens.ts` with your branded tokens
2. All Blend components immediately reflect your brand when the app reloads

---

## Using Blend Token Studio

Blend Token Studio is the web UI for visually editing brand tokens.

### Access

Open [studio.blend.juspay.design](https://studio.blend.juspay.design) and sign in with Google.

### Workflow

1. **Create a Workspace** — each workspace holds a brand config
2. **Edit tokens** — change colors, radius, shadows, typography, per-component overrides
3. **Preview** — see live component previews with your brand
4. **Publish** — version your brand config
5. **Pull** — CLI downloads the published config into your project

### Vocabulary

| Developer Concept | Studio UI Label |
| ----------------- | --------------- |
| Branch            | Workspace       |
| Default Branch    | Master Theme    |
| Fork              | Duplicate       |
| Merge Request     | Change Request  |
| Publish           | Release         |

---

## Pulling Tokens from Studio

```bash
# Pull the latest version of a workspace
npx blend-token-studio pull my-org/retail

# Pull a specific version
npx blend-token-studio pull my-org/retail --version 1.2.0

# Pull with ReScript output
npx blend-token-studio pull my-org/retail --language rescript

# Pull for CI (no prompts, JSON output)
npx blend-token-studio pull my-org/retail --ci --format json
```

### What gets generated

| File          | Contents                                      |
| ------------- | --------------------------------------------- |
| `tokens.ts`   | Resolved light + dark tokens as TypeScript    |
| `brand.json`  | The raw brand config (for version control)    |
| `studio.json` | Metadata (branch ID, version, pull timestamp) |

### Offline generation

If you have a `brand.json` but no Studio access:

```bash
npx blend-token-studio generate ./brand.json
npx blend-token-studio generate ./brand.json --language rescript
```

---

## ReScript Projects

### Detection

The CLI auto-detects ReScript projects via:

- `rescript.json` or `bsconfig.json` in project root
- `rescript` or `@rescript/core` in dependencies

### Setup

```bash
npx blend-token-studio init
# The CLI will detect ReScript and configure accordingly
```

### Generate ReScript tokens

```bash
# From Studio
npx blend-token-studio pull my-org/retail --language rescript

# From local brand.json
npx blend-token-studio generate ./brand.json --language rescript
```

### Output

Generates `src/blend/BlendTokens.res`:

```rescript
/** Light theme */
let componentTokens: JSON.t = %raw(`{ ... }`)

/** Dark theme */
let darkComponentTokens: JSON.t = %raw(`{ ... }`)
```

Use in your ReScript app by decoding the JSON values as needed.

---

## CI/CD Integration

### Environment Variables

| Variable                 | Description              | Required |
| ------------------------ | ------------------------ | -------- |
| `BLEND_STUDIO_API_TOKEN` | JWT token for Studio API | Yes      |
| `BLEND_STUDIO_API_URL`   | Override Studio API URL  | No       |

### Example GitHub Actions workflow

```yaml
name: Update Tokens

on:
    workflow_dispatch:

jobs:
    pull-tokens:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                  node-version: 22

            - name: Pull tokens
              env:
                  BLEND_STUDIO_API_TOKEN: ${{ secrets.BLEND_STUDIO_API_TOKEN }}
              run: npx blend-token-studio pull my-org/retail --ci --format json

            - name: Commit updated tokens
              run: |
                  git config user.name "github-actions[bot]"
                  git config user.email "github-actions[bot]@users.noreply.github.com"
                  git add src/blend/
                  git diff --cached --quiet || git commit -m "chore: update brand tokens"
                  git push
```

### CLI exit codes

| Code | Meaning                             |
| ---- | ----------------------------------- |
| 0    | Success                             |
| 1    | Failure (auth, network, validation) |

The `--ci` flag ensures:

- No interactive prompts
- Non-zero exit on failure
- `--format json` outputs machine-readable JSON

---

## Token Inheritance & Locking

Blend uses a 3-tier inheritance model:

```
Blend Foundation (default theme)
  └── Org Master Theme (org-level overrides, some tokens locked)
        └── Product Workspace (product overrides, respects locks)
```

### How it works

1. The org admin sets brand defaults and marks certain tokens as **locked** (e.g. primary color must stay blue)
2. Product teams create workspaces that inherit from the org master
3. Product teams can override any non-locked token
4. If a product tries to override a locked token, the system blocks it

### Lock management (Studio)

Org admins can lock tokens in Studio:

1. Go to Organization Settings → Token Locks
2. Add a token path (e.g. `colors.primary.500`) and a reason
3. All child workspaces must respect this lock

### Change Requests

When an editor wants to promote changes from a workspace to the master theme:

1. Create a **Change Request** (Merge Request)
2. Org admin reviews the diff
3. Approve or reject with comments

---

## GitHub Actions — Publishing the CLI

### Setup

1. **Create an NPM token** with publish permissions at [npmjs.com](https://www.npmjs.com) → Access Tokens → Generate New Token
2. **Add the secret** to your GitHub repository:
    - Go to Settings → Secrets and variables → Actions
    - Create an Environment called `npm`
    - Add `NPM_TOKEN` secret to that environment

### Publish workflow

The workflow is at `.github/workflows/publish-cli.yml`.

To trigger:

1. Go to Actions → **Publish CLI (blend-token-studio)**
2. Click **Run workflow**
3. Select:
    - **Version bump**: `patch`, `minor`, or `major`
    - **Tag**: `latest` (stable) or `beta` (pre-release)
    - **Confirm**: type `PUBLISH`

The workflow will:

1. Build token-engine (CLI dependency)
2. Bump the CLI version
3. Build the CLI
4. Publish to NPM under the selected tag
5. Commit the version bump back to the repo

### After publishing

Users can install the new version:

```bash
# Latest stable
npx blend-token-studio@latest --version

# Beta
npx blend-token-studio@beta --version
```

---

## Deploying Backend + DB on GCP

The backend (`apps/backend/`) is an Express + Prisma API server that connects to PostgreSQL. We deploy it on **Cloud Run** with **Cloud SQL (PostgreSQL)** as the database.

### Architecture

```
Internet → Cloud Run (blend-backend) → Cloud SQL (PostgreSQL 16)
                 ↓
           Secret Manager (DB password, JWT secrets, Firebase key)
```

### Prerequisites

- A GCP project with billing enabled
- `gcloud` CLI installed and authenticated (`gcloud auth login`)
- Firebase project created (same GCP project or linked)

### Step 1 — Enable GCP APIs

```bash
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com
```

### Step 2 — Create Cloud SQL PostgreSQL Instance

```bash
# Create the instance
gcloud sql instances create blend-db \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --storage-auto-increase

# Set the admin password
gcloud sql users set-password admin \
  --instance=blend-db \
  --password="YOUR_SECURE_PASSWORD"

# Create the database
gcloud sql databases create blend_studio \
  --instance=blend-db

# Note the connection name (you'll need it later)
gcloud sql instances describe blend-db --format="value(connectionName)"
# Output: YOUR_PROJECT:us-central1:blend-db
```

### Step 3 — Create GCP Secrets

```bash
# Database password
echo -n "YOUR_SECURE_PASSWORD" | \
  gcloud secrets create blend-backend-db-password --data-file=-

# JWT secrets
openssl rand -base64 48 | \
  gcloud secrets create blend-backend-jwt-secret --data-file=-

openssl rand -base64 48 | \
  gcloud secrets create blend-backend-jwt-refresh-secret --data-file=-

# Firebase private key (copy from Firebase Console → Project Settings → Service Accounts)
echo -n "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----" | \
  gcloud secrets create blend-backend-firebase-key --data-file=-
```

### Step 4 — Create Service Account

```bash
# Create the service account
gcloud iam service-accounts create blend-backend-sa \
  --display-name="Blend Backend SA"

# Grant roles
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:blend-backend-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:blend-backend-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### Step 5 — Create Google OAuth Credentials

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Authorized redirect URIs: `https://api.blend.juspay.design/auth/google/callback`
5. Copy the **Client ID** and **Client Secret**

### Step 6 — Configure Backend Environment Variables

Create `apps/backend/.env.production`:

```env
NODE_ENV=production
PORT=3001

# Database — uses Cloud SQL Unix socket via INSTANCE_CONNECTION_NAME
INSTANCE_CONNECTION_NAME=YOUR_PROJECT:us-central1:blend-db
DATABASE_NAME=blend_studio
DATABASE_USER=admin
# DATABASE_PASSWORD comes from Secret Manager

# JWT
# JWT_SECRET and JWT_REFRESH_SECRET come from Secret Manager

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Frontend URL (for CORS)
FRONTEND_URL=https://studio.blend.juspay.design

# Firebase Admin
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_CLIENT_EMAIL=blend-firebase@YOUR_PROJECT_ID.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY comes from Secret Manager
```

### Step 7 — Deploy with Cloud Build

The `cloudbuild.yaml` at `apps/blend-studio/cloudbuild.yaml` handles building and deploying both services.

Update the `substitutions` section with your actual values, then:

```bash
# Submit the build
gcloud builds submit --config=apps/blend-studio/cloudbuild.yaml \
  --substitutions=_INSTANCE_CONNECTION_NAME="YOUR_PROJECT:us-central1:blend-db",_DATABASE_NAME="blend_studio",_DATABASE_USER="admin"
```

### Step 8 — Deploy Backend Only (Manual)

If you only want to deploy the backend:

```bash
# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/blend-backend

# Deploy to Cloud Run
gcloud run deploy blend-backend \
  --image gcr.io/YOUR_PROJECT_ID/blend-backend:latest \
  --region us-central1 \
  --platform managed \
  --no-allow-unauthenticated \
  --add-cloudsql-instances YOUR_PROJECT:us-central1:blend-db \
  --set-env-vars "NODE_ENV=production,PORT=3001,FRONTEND_URL=https://studio.blend.juspay.design" \
  --set-secrets "DATABASE_PASSWORD=blend-backend-db-password:latest,JWT_SECRET=blend-backend-jwt-secret:latest,JWT_REFRESH_SECRET=blend-backend-jwt-refresh-secret:latest,FIREBASE_PRIVATE_KEY=blend-backend-firebase-key:latest" \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --service-account blend-backend-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### Step 9 — Run Database Migrations

After the first deploy, run migrations:

```bash
# Connect to the Cloud Run instance and run Prisma migrate
gcloud run services update blend-backend \
  --region us-central1 \
  --command "sh" \
  --args "-c,npx prisma migrate deploy && node dist/server.js"
```

Or use Cloud SQL Proxy locally:

```bash
# Download proxy
curl -o cloud_sql_proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2/cloud-sql-proxy.linux.amd64
chmod +x cloud_sql_proxy

# Start proxy
./cloud_sql_proxy YOUR_PROJECT:us-central1:blend-db --port 5433 &

# Run migrations
cd apps/backend
DATABASE_URL="postgresql://admin:PASSWORD@localhost:5433/blend_studio" npx prisma migrate deploy
```

### Step 10 — Verify

```bash
# Get the backend URL
gcloud run services describe blend-backend \
  --region us-central1 \
  --format="value(status.url)"

# Test health endpoint
curl https://blend-backend-XXXXX-uc.a.run.app/health
# Expected: {"status":"ok","timestamp":"...","version":"0.1.0"}
```

### Connecting Frontend to Backend

The Studio frontend proxies `/api` requests to the backend. In production, you have two options:

**Option A — Cloud Run backend URL as env var (recommended)**

Set `VITE_API_BASE_URL` during the Studio build:

```bash
--build-arg VITE_API_BASE_URL=https://blend-backend-XXXXX-uc.a.run.app
```

**Option B — Firebase Hosting rewrites**

Add a rewrite rule in `firebase.json` to proxy `/api` to Cloud Run (see Firebase Hosting section below).

---

## Deploying Frontend on Firebase Hosting

The Studio frontend (`apps/blend-studio/`) is a Vite + React SPA. We deploy the static build output to **Firebase Hosting**.

### Architecture

```
Internet → Firebase Hosting (CDN) → /studio/* → Static SPA
                                → /api/*  → Cloud Run (backend)
```

### Step 1 — Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Step 2 — Initialize Firebase (if not already done)

```bash
firebase init hosting
```

When prompted:

- Select your Firebase project
- Public directory: `apps/blend-studio/dist`
- Single-page app: **Yes**
- GitHub Actions deploys: **No** (we use Cloud Build)

### Step 3 — Create `firebase.json`

Create or update `firebase.json` in the project root:

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
                "target": "/studio/index.html"
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

The `/api/**` rewrite proxies API requests to the Cloud Run backend — no CORS issues since everything is on the same domain.

### Step 4 — Create `.firebaserc`

```json
{
    "projects": {
        "production": "YOUR_PROJECT_ID",
        "staging": "YOUR_STAGING_PROJECT_ID"
    }
}
```

### Step 5 — Build the Studio

```bash
cd apps/blend-studio

# Build with production Firebase config
VITE_FIREBASE_API_KEY=your_key \
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com \
VITE_FIREBASE_PROJECT_ID=your_project \
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app \
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id \
VITE_FIREBASE_APP_ID=your_app_id \
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com \
VITE_API_BASE_URL="" \
pnpm build
```

> **Note:** Set `VITE_API_BASE_URL` to empty string when using Firebase Hosting rewrites. The app will use relative `/api` paths which Firebase rewrites to Cloud Run.

### Step 6 — Deploy to Firebase Hosting

```bash
# Deploy to production
firebase deploy --only hosting --project production

# Deploy to staging
firebase deploy --only hosting --project staging
```

### Step 7 — Configure Custom Domain

1. Go to [Firebase Console → Hosting](https://console.firebase.google.com/project/_/hosting)
2. Click **Add custom domain**
3. Enter `studio.blend.juspay.design`
4. Add the DNS TXT/CNAME records to your DNS provider
5. Wait for SSL provisioning (usually < 1 hour)

### Automated Deployment with Cloud Build

The `cloudbuild.yaml` also deploys the frontend to Cloud Run. For Firebase Hosting, add this step:

```yaml
# Add after the deploy-studio step in cloudbuild.yaml
- name: 'gcr.io/$PROJECT_ID/firebase'
  id: 'deploy-firebase'
  args: ['deploy', '--only', 'hosting', '--project', '$PROJECT_ID']
  waitFor: ['-']
```

Or use a GitHub Actions workflow:

```yaml
name: Deploy Studio to Firebase

on:
    push:
        branches: [main]
        paths:
            - 'apps/blend-studio/**'

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                  node-version: 22

            - run: corepack enable && pnpm install --frozen-lockfile

            - name: Build Studio
              working-directory: apps/blend-studio
              env:
                  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
                  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
                  VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
                  VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
                  VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
                  VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
                  VITE_FIREBASE_DATABASE_URL: ${{ secrets.VITE_FIREBASE_DATABASE_URL }}
              run: pnpm build

            - uses: FirebaseExtended/action-hosting-deploy@v0
              with:
                  repoToken: ${{ secrets.GITHUB_TOKEN }}
                  firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
                  projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
```

### Required GitHub Secrets

For CI/CD, add these secrets to your GitHub repository:

| Secret                              | Description                                       |
| ----------------------------------- | ------------------------------------------------- |
| `NPM_TOKEN`                         | NPM publish token (for CLI workflow)              |
| `GCP_SA_KEY`                        | Service account key for Cloud Build               |
| `CLOUD_SQL_CONNECTION_NAME`         | `PROJECT:REGION:INSTANCE`                         |
| `DATABASE_NAME`                     | `blend_studio`                                    |
| `DATABASE_USER`                     | `admin`                                           |
| `VITE_FIREBASE_API_KEY`             | Firebase client API key                           |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain                              |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID                               |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket                           |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID                      |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID                                   |
| `VITE_FIREBASE_DATABASE_URL`        | Firebase Realtime DB URL                          |
| `FIREBASE_SERVICE_ACCOUNT`          | Firebase service account JSON (for GitHub Action) |

### Complete Deployment Summary

```
┌─────────────────────────────────────────────────────┐
│                    GCP Project                       │
│                                                     │
│  ┌──────────────┐     ┌──────────────────────────┐ │
│  │  Cloud Run    │────▶│  Cloud SQL (PostgreSQL)  │ │
│  │  blend-backend│     │  blend-db                │ │
│  │  (API server) │     │  • Users, Teams, Roles   │ │
│  └──────┬───────┘     │  • Branches, Versions    │ │
│         │              │  • MergeRequests, Locks   │ │
│         │              └──────────────────────────┘ │
│         │                                           │
│         │    ┌──────────────────────────────────┐   │
│         └───▶│  Secret Manager                   │   │
│              │  • DB password, JWT secrets        │   │
│              │  • Firebase private key            │   │
│              └──────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Firebase Hosting (CDN)                       │  │
│  │  studio.blend.juspay.design                   │  │
│  │  • /studio/* → Vite SPA (static)             │  │
│  │  • /api/*   → Cloud Run backend (rewrite)    │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Firestore (Firebase)                         │  │
│  │  • Brand configs (JSON blobs)                 │  │
│  │  • Snapshots                                  │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

### "Not authenticated" error

```bash
npx blend-token-studio login
# Or set the environment variable:
export BLEND_STUDIO_API_TOKEN=<your-token>
```

### "Token has expired"

Get a fresh token from Studio → User Menu → API Token.

### "blend.config.json not found"

```bash
npx blend-token-studio init
```

Or for CI, the `pull` command auto-creates a minimal config unless you pass `--skip-init`.

### Components don't reflect my brand

1. Make sure `<BlendProvider>` wraps your app
2. Make sure `tokens.ts` has actual values (not empty `{}`)
3. Run `npx blend-token-studio brand` to regenerate

### "Invalid hex color" validation error

Brand config colors must be in `#RGB` or `#RRGGBB` format. No `rgb()`, `hsl()`, or named colors.

### WCAG contrast warnings

The validator checks color scales against white and dark backgrounds. If you see warnings like "Contrast ratio 2.1:1 is below WCAG AA minimum of 4.5:1", your text may be hard to read. Pick a darker or lighter shade for that color.

### ReScript output not generated

Make sure you pass `--language rescript` explicitly:

```bash
npx blend-token-studio pull my-org/retail --language rescript
npx blend-token-studio generate ./brand.json --language rescript
```

### Cloud Run backend returns "Not allowed by CORS"

Ensure `FRONTEND_URL` matches exactly where the Studio is deployed:

```bash
gcloud run services update blend-backend \
  --region us-central1 \
  --set-env-vars "FRONTEND_URL=https://studio.blend.juspay.design"
```

Or use Firebase Hosting rewrites so `/api` requests come from the same domain (no CORS).

### Cloud SQL connection refused

1. Verify the instance connection name: `gcloud sql instances describe blend-db`
2. Ensure the service account has `roles/cloudsql.client`
3. Check that `--add-cloudsql-instances` is set on the Cloud Run service

### Firebase Hosting shows 404 on /studio

1. Make sure `firebase.json` has the rewrite rule for `/studio/**`
2. Verify the `dist/` directory contains the built output under `studio/` subdirectory
3. Check that `vite.config.ts` has `base: '/studio/'` for production

### Prisma migration fails on Cloud SQL

Run migrations via Cloud SQL Proxy from your local machine:

```bash
./cloud_sql_proxy YOUR_PROJECT:us-central1:blend-db --port 5433 &
cd apps/backend
DATABASE_URL="postgresql://admin:PASSWORD@localhost:5433/blend_studio" npx prisma migrate deploy
```
