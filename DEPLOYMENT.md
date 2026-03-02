# 🚀 Deployment Guide

Comprehensive guide for deploying the Blend Design System documentation (Ascent) and Storybook to Firebase Hosting.

## 🎯 Quick Start

```bash
# Deploy to staging
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

**URLs:**

- 📚 Production Docs: https://blend.juspay.design
- 📖 Production Storybook: https://blend.juspay.design/storybook
- 📚 Staging Docs: https://blend-staging.web.app
- 📖 Staging Storybook: https://blend-staging.web.app/storybook

## 📋 Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Deployment](#deployment)
- [Content Management](#content-management)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)

## Overview

### Architecture

```
┌─────────────────┐     ┌──────────────────┐
│  Documentation  │     │    Storybook     │
│   (Ascent)      │     │  (Storybook 8)   │
│   Next.js       │     │                  │
└────────┬────────┘     └────────┬─────────┘
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────┐
              │   Firebase  │
              │   Hosting   │
              └─────────────┘
```

- **Single Firebase Project**: `storybook-452807`
- **Path-based Routing**:
    - `/` → Ascent documentation
    - `/storybook/*` → Storybook
- **Static Export**: Both apps are built as static sites
- **Client-side Search**: No server required

### Environments

| Environment | Target          | URL                           | Purpose          |
| ----------- | --------------- | ----------------------------- | ---------------- |
| Production  | `blend-prod`    | https://blend.juspay.design   | Live Site        |
| Staging     | `blend-staging` | https://blend-staging.web.app | Testing & Review |

## Setup

### Prerequisites

1. **Install Dependencies**

    ```bash
    # Install pnpm if not already installed
    npm install -g pnpm

    # Install project dependencies
    pnpm install

    # Install Firebase CLI
    npm install -g firebase-tools
    ```

2. **Firebase Login**
    ```bash
    firebase login
    ```

### Environment Configuration

The project uses two environment files:

- `.env.dev` - Staging environment configuration
- `.env.prod` - Production environment configuration

These files contain:

```env
# Example .env.dev
FIREBASE_PROJECT_ID=storybook-452807
FIREBASE_HOSTING_TARGET=blend-staging
DEPLOY_URL=https://blend-staging.web.app

# Example .env.prod
FIREBASE_PROJECT_ID=storybook-452807
FIREBASE_HOSTING_TARGET=blend-prod
DEPLOY_URL=https://blend.juspay.design
```

## Deployment

### 🏃 Local Development

```bash
# Ascent documentation development
npm run ascent:dev

# Storybook development
npm run storybook

# Build everything
npm run build:all

# Build specific apps
npm run build:ascent
npm run build:storybook
```

### 🚀 Manual Deployment

The deployment process uses a unified script (`deploy.sh`) that:

1. Loads environment variables from `.env.dev` or `.env.prod`
2. Builds Ascent documentation (with search index generation)
3. Builds Storybook
4. Combines both builds into a single `dist/` directory
5. Deploys to Firebase Hosting

#### Deploy Commands

```bash
# Deploy to staging
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

### 📦 What Gets Deployed

1. **Ascent Documentation** (`/`)
    - Next.js static export
    - MDX documentation pages
    - Client-side search with pre-built index
    - Component examples and previews

2. **Storybook** (`/storybook`)
    - Component stories
    - Interactive playground
    - Design tokens
    - Usage examples

3. **Static Assets**
    - Fonts
    - Images
    - Search index (`search-index.json`)

## Content Management

### 📝 Adding Documentation

1. **Create MDX File**

    ```bash
    # Create new component doc
    touch apps/ascent/app/docs/content/components/NewComponent.mdx
    ```

2. **MDX Format**

    ````mdx
    ---
    title: Component Name
    description: Brief description for search
    category: Components
    tags: [tag1, tag2]
    ---

    # Component Name

    Component description and usage.

    ## Usage

    ```jsx
    import { Component } from '@juspay/blend-design-system'
    ;<Component prop="value" />
    ```

    ## Props

    <DocsTypeTable>...props documentation...</DocsTypeTable>
    ````

3. **Update Navigation**

    Edit `apps/ascent/app/docs/content/config.json` to add your new component to the navigation.

### 🔍 Search System

The search system uses a build-time generated index:

- **What's Indexed**: All MDX content including titles, headings, content, and tags
- **When**: At build time via `prebuild` script
- **How**: Static JSON file loaded client-side
- **Script**: `apps/ascent/scripts/generate-search-index.mjs`

## Security

### 🔒 Security Headers

All deployments include comprehensive security headers configured in `firebase.json`:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains (production only)
Content-Security-Policy: [configured for your needs]
```

### 🔐 Environment Variables

- Never commit `.env.dev` or `.env.prod` files (they're gitignored)
- Store secrets in GitHub Secrets for CI/CD
- Rotate credentials regularly

### 📊 Cache Strategy

| Resource | Staging  | Production |
| -------- | -------- | ---------- |
| HTML     | No cache | No cache   |
| JS/CSS   | 1 hour   | 1 year     |
| Images   | 1 day    | 1 week     |
| Fonts    | 1 week   | 1 year     |

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clean everything and try again
npm run clean
pnpm install
npm run build:all
```

#### Search Not Working

The search index is generated at build time. If search isn't working:

1. Check if `apps/ascent/public/search-index.json` exists after build
2. Ensure the `prebuild` script runs: `node scripts/generate-search-index.mjs`
3. Verify MDX files have proper frontmatter

#### SSR/Window Not Defined Errors

If you encounter "window is not defined" errors during build:

1. Preview components use dynamic imports with `ssr: false` via `PreviewWrapper`
2. All preview components are wrapped to prevent SSR issues
3. The `PreviewWrapper` component handles client-side rendering

#### Firebase Authentication Failed

```bash
firebase login --reauth
firebase projects:list
```

#### Deployment Fails

- Check Firebase Console for quota limits
- Ensure `.env.dev` and `.env.prod` files exist
- Verify Firebase hosting targets are configured
- Make sure `deploy.sh` is executable: `chmod +x deploy.sh`

### Debug Commands

```bash
# Check Firebase project
firebase projects:list

# Check hosting targets
firebase target:list

# Test builds locally
npm run build:ascent
npm run build:storybook

# View Firebase hosting releases
firebase hosting:releases:list --site blend-staging
firebase hosting:releases:list --site blend-prod
```

## Architecture

### Deployment Structure

```
blend-design-system/
├── deploy.sh              # Unified deployment script
├── .env.dev              # Staging environment config
├── .env.prod             # Production environment config
├── dist/                 # Combined deployment directory
│   ├── index.html        # Ascent root
│   ├── search-index.json # Search index
│   ├── [ascent files]    # All Ascent static files
│   └── storybook/        # Storybook subdirectory
│       └── index.html    # Storybook root
└── apps/
    ├── ascent/           # Main documentation
    │   ├── out/          # Next.js build output
    │   └── scripts/      # Build scripts
    │       └── generate-search-index.mjs
    └── storybook/        # Component library
        └── storybook-static/  # Storybook build output
```

### Firebase Configuration

**`.firebaserc`**

```json
{
    "projects": {
        "default": "storybook-452807"
    },
    "targets": {
        "storybook-452807": {
            "hosting": {
                "blend-staging": ["blend-staging"],
                "blend-prod": ["blend-prod"]
            }
        }
    }
}
```

**`firebase.json`**

- Configures rewrites for path-based routing
- Sets security headers
- Defines cache policies
- Handles `/storybook` path routing

### NPM Scripts

```json
{
    "scripts": {
        // Development
        "ascent:dev": "cd apps/ascent && npm run dev",
        "storybook": "cd apps/storybook && pnpm dev",

        // Building
        "build:ascent": "cd apps/ascent && npm run build",
        "build:storybook": "cd apps/storybook && pnpm build-storybook",
        "build:all": "npm run build:ascent && npm run build:storybook",

        // Deployment
        "deploy:dev": "./deploy.sh dev",
        "deploy:prod": "./deploy.sh prod",

        // Utilities
        "clean": "turbo run clean && rm -rf node_modules dist apps/ascent/out apps/storybook/storybook-static"
    }
}
```

## 🌐 Custom Domain

The production deployment is configured with the custom domain `blend.juspay.design`. The DNS configuration and SSL certificates are managed through Firebase Hosting.

## 📚 Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Storybook Deployment](https://storybook.js.org/docs/react/sharing/publish-storybook)

---

Last updated: January 2025
