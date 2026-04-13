# Blend Token Studio - Complete Guide

Everything you need to run, test, deploy, and use Blend Token Studio.

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Firebase Setup](#firebase-setup)
4. [Environment Configuration](#environment-configuration)
5. [Testing Locally](#testing-locally)
6. [NPM Publishing](#npm-publishing)
7. [Production Deployment](#production-deployment)
8. [CLI Reference](#cli-reference)
9. [Token Engine API](#token-engine-api)
10. [Using in Your App](#using-in-your-app)
11. [CI/CD Integration](#cicd-integration)
12. [Troubleshooting](#troubleshooting)

---

## Overview

Blend Token Studio lets you customize Blend components visually and generate design tokens for your brand.

### Three Components

| Component        | Package                      | Purpose                                  | Publishes To              |
| ---------------- | ---------------------------- | ---------------------------------------- | ------------------------- |
| **Token Engine** | `@blend-design/token-engine` | Resolves brand config → component tokens | NPM                       |
| **CLI**          | `blend-token-studio`         | Developer commands for tokens            | NPM                       |
| **Studio**       | `blend-studio`               | Visual web editor                        | Firebase Hosting / Vercel |

### How They Work Together

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Studio Web    │────▶│  Token Engine   │────▶│  Your React App │
│  (Edit Colors)  │     │ (Resolve Tokens)│     │ (Use Tokens)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       ▲                       ▲
        │                       │                       │
        ▼                       │                       │
   brand.json ◀─────────────────┴───────────────────────┘
   (download/pull)                    CLI
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 10+ (`npm install -g pnpm`)

### Run in 4 Commands

```bash
# 1. Install
pnpm install

# 2. Build packages
cd packages/token-engine && pnpm build && cd ../cli && pnpm build && cd ../..

# 3. Start Studio
cd apps/blend-studio && pnpm dev

# 4. Open in browser
# http://localhost:3000/studio/test
```

> **Note**: The test page is always accessible without authentication for development.

---

## Firebase Setup

Required for production. Optional for local testing.

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Create a project**
3. Enter project name: `blend-studio` (or your choice)
4. Enable Google Analytics (optional)
5. Click **Create project**

### Step 2: Enable Authentication

1. Go to **Authentication** → **Sign-in method**
2. Click **Google**
3. Toggle **Enable**
4. Add your authorized domains
5. Click **Save**

### Step 3: Configure Google OAuth

In [Google Cloud Console](https://console.cloud.google.com):

1. Go to **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID (auto-created by Firebase)
3. Add these URLs:

#### Authorized JavaScript origins

```
# ── LOCAL DEVELOPMENT ──
http://localhost:3000
http://localhost:5173

# ── STAGING (if applicable) ──
https://blend-staging.web.app
https://blend-staging.firebaseapp.com
# Or your staging domain:
https://staging.blend.juspay.design

# ── PRODUCTION ──
https://blend.juspay.design
https://blend-design-system.web.app
https://blend-design-system.firebaseapp.com
```

#### Authorized redirect URIs

```
# ── LOCAL DEVELOPMENT ──
http://localhost:3000/__/auth/handler

# ── STAGING ──
https://blend-staging.web.app/__/auth/handler
https://blend-staging.firebaseapp.com/__/auth/handler
https://staging.blend.juspay.design/__/auth/handler

# ── PRODUCTION ──
https://blend.juspay.design/__/auth/handler
https://blend-design-system.web.app/__/auth/handler
https://blend-design-system.firebaseapp.com/__/auth/handler
```

> **Note**: Firebase uses `/__/auth/handler` for OAuth redirects. The popup method (which we use) doesn't require redirect URIs, but adding them is recommended for compatibility.

### URL Structure After Deployment

| Environment | Ascent (Docs)                          | Studio                                        |
| ----------- | -------------------------------------- | --------------------------------------------- |
| Local       | `http://localhost:3000/`               | `http://localhost:3000/studio/`               |
| Staging     | `https://staging.blend.juspay.design/` | `https://staging.blend.juspay.design/studio/` |
| Production  | `https://blend.juspay.design/`         | `https://blend.juspay.design/studio/`         |

### Step 4: Enable Firestore

1. Go to **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode**
4. Choose location (e.g., `us-central1`)
5. Click **Done**

### Step 5: Get Web App Credentials

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click **Web** (`</>`)
4. Enter app nickname: `blend-studio-web`
5. Click **Register app**
6. **Copy the firebaseConfig**:

```javascript
// You'll get something like this:
{
    apiKey: 'AIzaSyC...',
    authDomain: 'blend-studio.firebaseapp.com',
    projectId: 'blend-studio',
    storageBucket: 'blend-studio.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abc123...',
}
```

### Step 6: Create Service Account (Optional - for backend)

1. Go to **Project Settings** → **Service accounts**
2. Click **Generate new private key**
3. Save JSON file securely (never commit to git!)

---

## Environment Configuration

### Development (.env)

Create `apps/blend-studio/.env`:

```env
# ─────────────────────────────────────────────────────────────────────────────
# FIREBASE CLIENT (Vite - exposed to browser)
# ─────────────────────────────────────────────────────────────────────────────
# IMPORTANT: Must use VITE_ prefix for Vite to expose to browser

VITE_FIREBASE_API_KEY=AIzaSyC_your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=blend-studio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=blend-studio
VITE_FIREBASE_STORAGE_BUCKET=blend-studio.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456

# ─────────────────────────────────────────────────────────────────────────────
# FIREBASE ADMIN SDK (Server - never exposed to browser)
# ─────────────────────────────────────────────────────────────────────────────
# Get these from Firebase Console → Project Settings → Service accounts

FIREBASE_PROJECT_ID=blend-studio
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@blend-studio.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─────────────────────────────────────────────────────────────────────────────
# POSTGRESQL
# ─────────────────────────────────────────────────────────────────────────────
# Local development:
DATABASE_URL=postgresql://postgres:password@localhost:5432/blend_studio

# GCP Cloud SQL (production):
# DATABASE_URL=postgresql://user:password@/blend_studio?host=/cloudsql/project:region:instance

# ─────────────────────────────────────────────────────────────────────────────
# STUDIO API
# ─────────────────────────────────────────────────────────────────────────────
STUDIO_API_PORT=3001

# ─────────────────────────────────────────────────────────────────────────────
# OPTIONAL
# ─────────────────────────────────────────────────────────────────────────────
VITE_USE_MOCK_DATA=false
```

### Production (.env.production)

Create `apps/blend-studio/.env.production`:

```env
# Production Firebase project
VITE_FIREBASE_API_KEY=AIzaSyD_prod_api_key
VITE_FIREBASE_AUTH_DOMAIN=blend-studio-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=blend-studio-prod
VITE_FIREBASE_STORAGE_BUCKET=blend-studio-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:xyz789

VITE_USE_MOCK_DATA=false
```

### Environment Variables Reference

#### Client-side (VITE\_\* prefix - exposed to browser)

| Variable                            | Required | Description                     |
| ----------------------------------- | -------- | ------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Yes      | Firebase public API key         |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Yes      | e.g., `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID`          | Yes      | Firebase project ID             |
| `VITE_FIREBASE_STORAGE_BUCKET`      | No       | Cloud Storage bucket            |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | No       | For push notifications          |
| `VITE_FIREBASE_APP_ID`              | Yes      | Firebase web app ID             |
| `VITE_USE_MOCK_DATA`                | No       | Set `true` to skip Firebase     |

#### Server-side (never exposed to browser)

| Variable                | Required | Description                                      |
| ----------------------- | -------- | ------------------------------------------------ |
| `FIREBASE_PROJECT_ID`   | Yes      | Firebase project ID                              |
| `FIREBASE_CLIENT_EMAIL` | Yes      | Service account email                            |
| `FIREBASE_PRIVATE_KEY`  | Yes      | Service account private key (with `\n` newlines) |
| `DATABASE_URL`          | Yes      | PostgreSQL connection string                     |
| `STUDIO_API_PORT`       | No       | API server port (default: 3001)                  |

---

## Testing Locally

### Test Studio (Without Firebase)

```bash
cd apps/blend-studio
pnpm dev

# Open: http://localhost:3000/studio/test
```

You can:

- Edit primary color and border radius
- See live component preview
- Export brand.json
- Download brand config

### Test Studio (With Firebase)

1. Create `.env` with Firebase credentials
2. Restart: `pnpm dev`
3. Open: `http://localhost:3000/`
4. Login with Google
5. Access branches, versions, collaboration features

### Test CLI

```bash
# Build CLI
cd packages/cli
pnpm build

# Link globally
pnpm link --global

# Test in new directory
mkdir /tmp/test-blend && cd /tmp/test-blend

# Run commands
blend-token-studio init --defaults
blend-token-studio brand --preset hdfc

# Check output
cat src/blend/brand.json
```

### Test Token Engine

```bash
cd packages/token-engine
pnpm build

# Quick test
node -e "
const { resolveBrandTokens } = require('./dist/index.js');
const tokens = resolveBrandTokens({
  brandId: 'test',
  name: 'Test',
  version: '1.0.0',
  colors: { primary: { '500': '#E31837' } }
}, 'light');
console.log('Components:', Object.keys(tokens).length);
"
```

---

## NPM Publishing

### Prerequisites

- NPM account (`npm login`)
- Build succeeds (`pnpm build`)

### Step 1: Publish Token Engine

```bash
cd packages/token-engine

# Build
pnpm build

# Verify dist
ls -la dist/
# Should see: index.js, index.d.ts, server.js, server.d.ts

# Check package contents
npm pack --dry-run

# Login (one time)
npm login

# Publish
npm publish --access public

# Verify
npm view @blend-design/token-engine
```

### Step 2: Update CLI Dependencies

After publishing token-engine, update CLI to use NPM version:

Edit `packages/cli/package.json`:

```json
{
    "dependencies": {
        "@blend-design/token-engine": "^0.1.0"
    }
}
```

Then:

```bash
cd packages/cli
pnpm install
```

### Step 3: Publish CLI

```bash
cd packages/cli

# Build
pnpm build

# Verify binary works
node dist/index.js --help

# Publish
npm publish --access public

# Verify
npm view blend-token-studio

# Test global install
npm install -g blend-token-studio
blend-token-studio --version
```

### Version Updates

```bash
# Patch (0.1.0 → 0.1.1)
npm version patch
npm publish

# Minor (0.1.0 → 0.2.0)
npm version minor
npm publish

# Major (0.1.0 → 1.0.0)
npm version major
npm publish
```

---

## Production Deployment

### Step 1: Deploy Firestore Rules

```bash
# Make sure firestore.rules is at project root
# Then deploy:
firebase deploy --only firestore:rules
```

The rules allow:

- Authenticated users to read all branches
- Branch owners to update/delete their branches
- Versions are immutable after creation

### Step 2: Build Studio for Production

```bash
cd apps/blend-studio

# Ensure .env.production exists with production credentials
pnpm build

# Verify dist
ls -la dist/
```

### Step 3: Deploy to Firebase Hosting

```bash
# Install Firebase CLI (one time)
npm install -g firebase-tools

# Login
firebase login

# Initialize (first time only)
cd apps/blend-studio
firebase init hosting
# - Select your Firebase project
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# Deploy
firebase deploy --only hosting

# Your app will be at:
# https://your-project-id.web.app
# https://your-project-id.firebaseapp.com
```

### Alternative: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd apps/blend-studio
vercel --prod

# Set environment variables in Vercel Dashboard:
# Project → Settings → Environment Variables
# Add all VITE_FIREBASE_* variables
```

### Deployment Checklist

- [ ] `.env.production` created with production Firebase credentials
- [ ] `pnpm build` succeeds
- [ ] Firestore rules deployed
- [ ] Firebase Auth enabled (Google provider)
- [ ] Hosting deployed

---

## CLI Reference

### Installation

```bash
# Global install
npm install -g blend-token-studio

# Or use npx (no install needed)
npx blend-token-studio <command>
```

### Commands

#### `init` - Initialize Project

```bash
blend-token-studio init [options]

Options:
  --defaults    Skip prompts, use defaults
  --force       Overwrite existing files
  --template    Template: nextjs, vite, cra

Examples:
  blend-token-studio init
  blend-token-studio init --defaults --template nextjs
```

Creates:

- `blend.config.json` - Configuration
- `src/blend/provider.tsx` - React provider
- `src/blend/tokens.ts` - Token exports

#### `brand` - Apply Branding

```bash
blend-token-studio brand [options]

Options:
  --preset <name>      Preset: blend, hdfc, neobank, fintech
  --primary <hex>      Primary color (#E31837)
  --secondary <hex>    Secondary color
  --radius <type>      Border radius: sharp, soft, round, pill

Examples:
  blend-token-studio brand --preset hdfc
  blend-token-studio brand --primary "#E31837" --radius soft
```

#### `pull` - Pull from Studio

```bash
blend-token-studio pull <branch> [options]

Options:
  --version <v>    Pull specific version
  --theme <mode>   Theme: light, dark

Examples:
  blend-token-studio pull hdfc/retail
  blend-token-studio pull hdfc/retail --version 1.2.0
```

#### `push` - Push to Studio

```bash
blend-token-studio push [branch] [options]

Options:
  --new           Create branch if not exists
  --publish       Publish as version
  --minor         Bump minor version
  --major         Bump major version
  --patch         Bump patch version

Examples:
  blend-token-studio push hdfc/retail
  blend-token-studio push mycompany/brand --new
  blend-token-studio push hdfc/retail --publish --minor
```

#### `list` - List Branches

```bash
blend-token-studio list [options]

Options:
  --status <filter>    Filter: draft, published, archived
  --search <query>     Search query
  --json               JSON output
  --limit <n>          Max results
```

#### `login` / `logout` - Authentication

```bash
# Interactive login
blend-token-studio login

# With token (for CI/CD)
blend-token-studio login --token "your-firebase-token"

# Check current user
blend-token-studio whoami

# Logout
blend-token-studio logout
```

#### `validate` - Validate Config

```bash
blend-token-studio validate [file]

Examples:
  blend-token-studio validate
  blend-token-studio validate ./configs/brand.json
```

#### `generate` - Generate Tokens Offline

```bash
blend-token-studio generate <file> [options]

Options:
  --output <path>   Output directory
  --theme <mode>    Theme: light, dark, both
  --format <type>   Format: ts, js, json

Examples:
  blend-token-studio generate ./brand.json
  blend-token-studio generate ./brand.json --theme both
```

#### `preview` - Open Browser Preview

```bash
blend-token-studio preview [options]

Options:
  --port <port>    Dev server port (default: 3000)
```

---

## Token Engine API

### Import

```typescript
// Main import (includes React components)
import { resolveBrandTokens } from '@blend-design/token-engine'

// Server-safe import (no React components)
import { resolveBrandTokens } from '@blend-design/token-engine/server'
```

### Functions

#### `resolveBrandTokens(brandConfig, theme)`

Resolves a brand configuration into component tokens.

```typescript
import {
    resolveBrandTokens,
    type BrandConfig,
} from '@blend-design/token-engine'

const brand: BrandConfig = {
    brandId: 'my-brand',
    name: 'My Brand',
    version: '1.0.0',
    colors: {
        primary: { '500': '#E31837' },
        gray: { '100': '#F3F4F6' },
    },
    radius: {
        '8': '8px',
        '10': '10px',
    },
}

const lightTokens = resolveBrandTokens(brand, 'light')
const darkTokens = resolveBrandTokens(brand, 'dark')

// Returns tokens for 26+ components
console.log(Object.keys(lightTokens))
// ['BUTTONV2', 'ALERTV2', 'TEXTINPUTV2', ...]
```

#### `validateBrandConfig(brandConfig)`

Validates a brand configuration.

```typescript
import { validateBrandConfig } from '@blend-design/token-engine'

const result = validateBrandConfig(brand)

if (result.valid) {
    console.log('Valid!')
} else {
    result.errors.forEach((err) => {
        console.log(`${err.path}: ${err.message}`)
    })
    result.warnings.forEach((warn) => {
        console.log(`Warning: ${warn.path}: ${warn.message}`)
    })
}
```

#### `generateColorScale(hex)`

Generates a full color scale (50-950) from a single hex color.

```typescript
import { generateColorScale } from '@blend-design/token-engine'

const scale = generateColorScale('#E31837')
// Returns:
// {
//   '50': '#FFF1F3',
//   '100': '#FFE0E4',
//   ...
//   '500': '#E31837',
//   ...
//   '950': '#4C050D'
// }
```

#### `diffBrandConfigs(oldConfig, newConfig)`

Compares two brand configurations.

```typescript
import { diffBrandConfigs } from '@blend-design/token-engine'

const diff = diffBrandConfigs(oldBrand, newBrand)
// Returns array of changes:
// [
//   { path: 'colors.primary.500', oldValue: '#E31837', newValue: '#FF0000' },
//   ...
// ]
```

### Types

```typescript
// Brand configuration
interface BrandConfig {
    brandId: string
    name: string
    version: string
    colors?: BrandColors
    radius?: RadiusOverrides
    shadows?: ShadowOverrides
    font?: FontOverrides
}

// Color overrides
interface BrandColors {
    primary?: ColorOverrides
    gray?: ColorOverrides
    red?: ColorOverrides
    green?: ColorOverrides
    yellow?: ColorOverrides
    orange?: ColorOverrides
    purple?: ColorOverrides
}

type ColorOverrides = Partial<Record<string, string>>
type RadiusOverrides = Partial<Record<string, string>>

// Validation result
interface ValidationResult {
    valid: boolean
    errors: ValidationError[]
    warnings: ValidationWarning[]
}
```

---

## Using in Your App

### Step 1: Install Dependencies

```bash
npm install @juspay/blend-design-system styled-components
```

### Step 2: Initialize Blend

```bash
npx blend-token-studio init --defaults
npx blend-token-studio brand --primary "#E31837"
```

### Step 3: Wrap Your App

```tsx
// src/App.tsx
import { BlendProvider } from './blend/provider'

function App() {
    return (
        <BlendProvider theme="light">
            <YourApp />
        </BlendProvider>
    )
}
```

### Step 4: Use Components

```tsx
import {
    Button,
    ButtonType,
    ButtonSize,
    Alert,
    AlertVariant,
    TextInput,
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <div>
            <Button
                text="Click Me"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
            />
            <Alert
                heading="Success"
                description="It worked!"
                variant={AlertVariant.SUCCESS}
            />
            <TextInput
                label="Email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
            />
        </div>
    )
}
```

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    build:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v3

            - uses: pnpm/action-setup@v2
              with:
                  version: 8

            - uses: actions/setup-node@v3
              with:
                  node-version: 18
                  cache: 'pnpm'

            - run: pnpm install

            - name: Pull brand tokens
              if: ${{ secrets.BLEND_TOKEN }}
              run: |
                  npx blend-token-studio login --token ${{ secrets.BLEND_TOKEN }}
                  npx blend-token-studio pull ${{ vars.BLEND_BRANCH || 'default/brand' }}

            - run: pnpm build
```

### Required Secrets

Set these in GitHub repository settings:

| Secret        | Description                                       |
| ------------- | ------------------------------------------------- |
| `BLEND_TOKEN` | Firebase ID token from `blend-token-studio login` |

### Required Variables

| Variable       | Description    | Default         |
| -------------- | -------------- | --------------- |
| `BLEND_BRANCH` | Branch to pull | `default/brand` |

---

## Troubleshooting

### Common Issues

#### "Nothing found" at /test

**Cause**: Wrong route

**Fix**:

```
✅ http://localhost:3000/studio/test
❌ http://localhost:3000/test
```

#### Module not found @blend-design/token-engine

**Cause**: Package not built

**Fix**:

```bash
cd packages/token-engine
pnpm build
```

#### CLI command not found

**Cause**: CLI not linked

**Fix**:

```bash
cd packages/cli
pnpm build
pnpm link --global
```

#### Firebase "Permission Denied"

**Cause**: Firestore rules not deployed

**Fix**:

```bash
firebase deploy --only firestore:rules
```

#### NPM 404 Not Found

**Cause**: Package not published

**Fix**:

```bash
# Check if published
npm view @blend-design/token-engine

# If not, publish
cd packages/token-engine
npm publish --access public
```

#### Build TypeScript Errors

**Fix**:

```bash
# Clean and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

### Debug Mode

```bash
# CLI with debug output
DEBUG=* blend-token-studio init

# Firebase debug
firebase deploy --debug
```

---

## Data Architecture

### PostgreSQL vs Firestore Split

| Data Type                 | Storage                   | Why                             |
| ------------------------- | ------------------------- | ------------------------------- |
| Users, Teams, Memberships | **PostgreSQL**            | Relational data, fuzzy search   |
| Roles, Permissions        | **PostgreSQL**            | Complex queries, joins          |
| Authentication            | **PostgreSQL + Firebase** | Firebase Auth → PostgreSQL sync |
| Brand configs (JSON)      | **Firestore**             | Document storage, real-time     |
| Branches                  | **Firestore**             | JSON blobs, live preview        |
| Versions                  | **Firestore**             | Immutable snapshots             |
| Snapshots                 | **Firestore**             | Auto-saved drafts               |

### PostgreSQL Tables

```
/postgresql/
├── users                    # User profiles (linked to Firebase Auth)
├── teams                    # Team organizations
├── team_members             # User → Team memberships
├── team_invites             # Pending team invitations
├── roles                    # Role definitions
├── components               # Component inventory
├── deployments              # Deployment history
├── activity_logs            # User activity
└── audit_logs               # Compliance audit trail
```

### Firestore Collections

```
/firestore/
├── branches/{branchId}                  # Brand config + metadata
│   ├── versions/{versionId}             # Published versions (immutable)
│   └── snapshots/{snapshotId}           # Auto-saved drafts
└── blend-telemetry/{repoId}             # Usage analytics
```

---

## Database Setup

### Local Development

```bash
# 1. Create PostgreSQL database
createdb blend_studio

# 2. Set DATABASE_URL in .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/blend_studio

# 3. Run migrations
cd apps/blend-studio
pnpm db:generate
pnpm db:migrate

# 4. Seed database
pnpm db:seed
```

### GCP Cloud SQL (Production)

```bash
# 1. Create Cloud SQL instance
gcloud sql instances create blend-studio-db \
    --database-version=POSTGRES_16 \
    --tier=db-f1-micro \
    --region=us-central1

# 2. Create database
gcloud sql databases create blend_studio --instance=blend-studio-db

# 3. Set DATABASE_URL for Cloud Run
DATABASE_URL=postgresql://user:password@/blend_studio?host=/cloudsql/project:region:instance

# 4. Run migrations
pnpm db:migrate:prod
```

See `apps/blend-studio/database/SETUP.md` for complete GCP setup.

### Team Roles & Permissions

| Role       | Manage Team | Invite Members | Create Branches | Edit Branches | Publish | Delete Branches |
| ---------- | ----------- | -------------- | --------------- | ------------- | ------- | --------------- |
| **Owner**  | ✅          | ✅             | ✅              | ✅            | ✅      | ✅              |
| **Admin**  | ✅          | ✅             | ✅              | ✅            | ✅      | ✅              |
| **Editor** | ❌          | ❌             | ✅              | ✅            | ✅      | ❌              |
| **Viewer** | ❌          | ❌             | ❌              | ❌            | ❌      | ❌              |

### User Preferences (localStorage)

Preferences and onboarding are stored in localStorage, not the database:

```typescript
// Key: 'blend_studio_preferences'
interface UserPreferences {
    theme: 'light' | 'dark' | 'system'
    defaultTheme: 'light' | 'dark'
    emailNotifications: boolean
    branchCreatedNotifications: boolean
    branchPublishedNotifications: boolean
    teamInviteNotifications: boolean
}

// Key: 'blend_studio_onboarding'
interface OnboardingState {
    hasCompletedOnboarding: boolean
    completedAt: string | null
    skippedAt: string | null
}
```

### Firestore Security Rules

Deploy rules after Firebase setup:

```bash
firebase deploy --only firestore:rules
```

Rules enforce:

- Authenticated users can read all branches
- Only branch owner can write/update/delete
- Versions are immutable after creation

---

## File Structure

```
blend-design-system/
├── packages/
│   ├── token-engine/              # Core token resolution
│   │   ├── src/
│   │   │   ├── index.ts           # Main exports
│   │   │   ├── server.ts          # Server-safe exports
│   │   │   ├── types.ts           # Type definitions
│   │   │   ├── resolve-all-tokens.ts
│   │   │   └── ...
│   │   ├── dist/                  # Built files
│   │   └── package.json
│   │
│   └── cli/                       # Developer CLI
│       ├── src/
│       │   ├── index.ts           # Entry point
│       │   └── commands/          # Command implementations
│       │       ├── init.ts
│       │       ├── brand.ts
│       │       ├── pull.ts
│       │       ├── push.ts
│       │       └── ...
│       ├── dist/                  # Built files
│       └── package.json
│
├── apps/
│   └── blend-studio/              # Web dashboard
│       ├── src/
│       │   ├── routes/
│       │   │   ├── index.tsx              # Home
│       │   │   ├── login.tsx              # Login
│       │   │   └── studio/
│       │   │       ├── index.tsx          # Branch list
│       │   │       ├── test.tsx           # Dev test page
│       │   │       ├── editor.$branchId.tsx
│       │   │       └── preview.$branchId.tsx
│       │   ├── contexts/
│       │   │   └── AuthContext.tsx
│       │   └── lib/
│       │       └── firebase.ts
│       ├── .env                   # Development env
│       ├── .env.production        # Production env
│       ├── vite.config.ts
│       └── dist/                  # Production build
│
├── firestore.rules                # Firestore security rules
├── BLEND_TOKEN_STUDIO.md          # This file
└── package.json
```

---

## Quick Reference Card

```bash
# === LOCAL DEVELOPMENT ===
pnpm install                                    # Install everything
cd packages/token-engine && pnpm build          # Build token engine
cd packages/cli && pnpm build                   # Build CLI
cd apps/blend-studio && pnpm dev                # Start Studio

# === TESTING ===
http://localhost:3000/studio/test               # Open Studio
blend-token-studio init --defaults              # Test CLI

# === NPM PUBLISHING ===
cd packages/token-engine && npm publish --access public
cd packages/cli && npm publish --access public

# === PRODUCTION DEPLOYMENT ===
firebase deploy --only firestore:rules          # Deploy rules
cd apps/blend-studio && pnpm build              # Build
firebase deploy --only hosting                   # Deploy

# === TROUBLESHOOTING ===
pnpm build                                      # Fix most issues
rm -rf node_modules dist && pnpm install        # Clean reinstall
```

---

## Support

```bash
# CLI help
blend-token-studio --help
blend-token-studio <command> --help

# Check NPM packages
npm view @blend-design/token-engine
npm view blend-token-studio

# Firebase logs
firebase hosting:releases:list
```

---

## Complete Setup Checklist

### Local Development

- [ ] Install dependencies: `pnpm install`
- [ ] Build token-engine: `cd packages/token-engine && pnpm build`
- [ ] Build CLI: `cd packages/cli && pnpm build`
- [ ] Create PostgreSQL database: `createdb blend_studio`
- [ ] Set `DATABASE_URL` in `.env`
- [ ] Run migrations: `pnpm db:generate && pnpm db:migrate`
- [ ] Seed database: `pnpm db:seed`
- [ ] Start Studio: `cd apps/blend-studio && pnpm dev`
- [ ] Open: `http://localhost:3000/studio/test`

### Production Setup

#### Firebase

- [ ] Create Firebase project
- [ ] Enable Google Authentication
- [ ] Configure OAuth URLs (origins + redirects)
- [ ] Enable Firestore Database
- [ ] Create Web App and copy config
- [ ] Create Service Account (for Admin SDK)
- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`

#### PostgreSQL (GCP Cloud SQL)

- [ ] Create Cloud SQL instance
- [ ] Create database
- [ ] Create user
- [ ] Configure connection string
- [ ] Run migrations: `pnpm db:migrate:prod`
- [ ] Seed database: `pnpm db:seed`

#### Environment Variables

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `FIREBASE_PROJECT_ID`
- [ ] `FIREBASE_CLIENT_EMAIL`
- [ ] `FIREBASE_PRIVATE_KEY`
- [ ] `DATABASE_URL`

#### NPM Publishing

- [ ] Login to NPM: `npm login`
- [ ] Publish token-engine: `cd packages/token-engine && npm publish --access public`
- [ ] Update CLI dependencies
- [ ] Publish CLI: `cd packages/cli && npm publish --access public`

#### Deployment

- [ ] Build Studio: `pnpm build`
- [ ] Deploy to Firebase Hosting: `firebase deploy --only hosting`
- [ ] Verify: `https://blend.juspay.design/studio/`
