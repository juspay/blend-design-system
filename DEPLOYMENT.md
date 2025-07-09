# 🚀 Deployment Guide

Comprehensive guide for deploying the Blend Design System documentation and Storybook to Firebase Hosting.

## 🎯 Quick Start

```bash
# One-time setup
pnpm deploy:setup

# Deploy to staging
pnpm deploy:staging

# Deploy to production
pnpm deploy:production
```

**URLs:**

- 📚 Staging Docs: https://blend-staging.web.app
- 📖 Staging Storybook: https://blend-staging.web.app/storybook
- 📚 Production Docs: https://blend-prod.web.app
- 📖 Production Storybook: https://blend-prod.web.app/storybook

## 📋 Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Deployment](#deployment)
- [Content Management](#content-management)
- [Security](#security)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)

## Overview

### Architecture

```
┌─────────────────┐     ┌──────────────────┐
│  Documentation  │     │    Storybook     │
│   (Next.js)     │     │  (Storybook 8)   │
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
  - `/` → Documentation
  - `/storybook/*` → Storybook
- **Static Export**: Both apps are built as static sites
- **Client-side Search**: No server required

### Environments

| Environment | Branch      | Cache Duration | Purpose          |
| ----------- | ----------- | -------------- | ---------------- |
| Staging     | `staging`   | 1 hour         | Testing & Review |
| Production  | `main`      | 1 year         | Live Site        |
| Preview     | PR branches | 1 hour         | PR Reviews       |

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

1. **Copy Environment Template**

   ```bash
   cp .env.example .env.staging
   cp .env.example .env.production
   ```

2. **Configure Environment Variables**

   Edit `.env.staging`:

   ```env
   FIREBASE_PROJECT_ID=storybook-452807
   FIREBASE_HOSTING_TARGET_STAGING=blend-staging
   STAGING_URL=https://blend-staging.web.app
   STAGING_CACHE_MAX_AGE=3600
   ENVIRONMENT=staging
   ```

   Edit `.env.production`:

   ```env
   FIREBASE_PROJECT_ID=storybook-452807
   FIREBASE_HOSTING_TARGET_PROD=blend-prod
   PRODUCTION_URL=https://blend-prod.web.app
   PRODUCTION_CACHE_MAX_AGE=31536000
   ENVIRONMENT=production
   ```

3. **Setup Firebase Hosting Targets**
   ```bash
   pnpm deploy:setup
   ```

### GitHub Actions Setup

1. **Generate Firebase Service Account**
   - Go to [Firebase Console](https://console.firebase.google.com/project/storybook-452807) → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file

2. **Add GitHub Secrets**
   - Go to your GitHub repo → Settings → Secrets
   - Add these secrets:
     ```
     FIREBASE_SERVICE_ACCOUNT     # The JSON content from step 1
     FIREBASE_PROJECT_ID          # storybook-452807
     FIREBASE_HOSTING_TARGET_STAGING  # blend-staging
     FIREBASE_HOSTING_TARGET_PROD     # blend-prod
     ```

## Deployment

### 🏃 Local Development

```bash
# Documentation development
pnpm docs:dev

# Storybook development
pnpm storybook

# Build everything
pnpm build

# Build specific apps
pnpm docs:build
pnpm storybook:build
```

### 🚀 Manual Deployment

#### Deploy Everything (Docs + Storybook)

```bash
# Deploy to staging
pnpm deploy:staging

# Deploy to production
pnpm deploy:production
```

The deployment scripts automatically:

- Load environment variables from `.env.staging` or `.env.production`
- Build both documentation and Storybook
- Deploy everything to Firebase Hosting

### 🤖 Automated CI/CD

Deployments happen automatically via GitHub Actions:

| Event             | Target     | URL                           |
| ----------------- | ---------- | ----------------------------- |
| Push to `staging` | Staging    | https://blend-staging.web.app |
| Push to `main`    | Production | https://blend-prod.web.app    |
| Open PR           | Preview    | Dynamic URL (commented on PR) |

### 📦 What Gets Deployed

1. **Documentation Site** (`/`)
   - Next.js static export
   - MDX documentation pages
   - Client-side search index
   - Component examples

2. **Storybook** (`/storybook`)
   - Component stories
   - Interactive playground
   - Design tokens
   - Usage examples

3. **Static Assets**
   - Fonts
   - Images
   - Generated search index (`/static.json`)

## Content Management

### 📝 Adding Documentation

1. **Create MDX File**

   ```bash
   # Create new component doc
   touch apps/docs/content/docs/components/NewComponent.mdx
   ```

2. **MDX Format**

   ````mdx
   ---
   title: Component Name
   description: Brief description for search
   ---

   # Component Name

   Component description and usage.

   ## Usage

   ```jsx
   import { Component } from "blend-v1";

   <Component prop="value" />;
   ```
   ````

   ## Props

   | Prop | Type   | Default | Description |
   | ---- | ------ | ------- | ----------- |
   | prop | string | -       | Description |

   ```

   ```

3. **Update Navigation**

   Edit `apps/docs/content/docs/components/meta.json`:

   ```json
   {
     "title": "Components",
     "pages": ["Button", "Alert", "NewComponent"]
   }
   ```

### 🔍 Search System

The search system automatically indexes all MDX content:

- **What's Indexed**: Titles, headings, paragraphs, code blocks
- **When**: Build time (static generation)
- **How**: Client-side search using generated `/static.json`
- **No Manual Steps**: Just add content and deploy

## Security

### 🔒 Security Headers

All deployments include comprehensive security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: [configured for your needs]
```

### 🔐 Environment Variables

- Never commit `.env` files (they're gitignored)
- Use `.env.example` as a template
- Store secrets in GitHub Secrets for CI/CD
- Rotate credentials regularly

### 📊 Cache Strategy

| Resource | Staging  | Production |
| -------- | -------- | ---------- |
| HTML     | No cache | No cache   |
| JS/CSS   | 1 hour   | 1 year     |
| Images   | 1 hour   | 1 day      |
| Fonts    | 1 hour   | 1 year     |

## CI/CD

### Workflow Features

- ✅ Automated testing before deployment
- ✅ Preview deployments for PRs
- ✅ Build artifact caching
- ✅ Parallel builds
- ✅ Environment protection rules
- ✅ Deployment status tracking

### Branch Strategy

```
main        → Production deployment
staging     → Staging deployment
feature/*   → Preview deployment (via PR)
```

## Troubleshooting

### Common Issues

#### Permission Denied

```bash
chmod +x apps/docs/deploy-with-env.sh
chmod +x apps/docs/deploy-with-storybook.sh
```

#### Environment File Not Found

- Ensure `.env.staging` or `.env.production` exists
- Check you're in the correct directory

#### Firebase Authentication Failed

```bash
firebase login
firebase login:ci  # For CI/CD
```

#### Build Failures

```bash
# Clear all caches
pnpm clean

# Reinstall dependencies
pnpm install

# Try building again
pnpm build
```

#### Deployment Fails

- Check Firebase Console for quota limits
- Verify hosting targets are configured
- Ensure GitHub secrets are set correctly

### Debug Commands

```bash
# Check Firebase project
firebase projects:list

# Check hosting targets
firebase target:list

# Test build locally
pnpm docs:build
pnpm storybook:build
```

## Advanced Topics

### 🌐 Custom Domains

1. Go to [Firebase Console](https://console.firebase.google.com/project/storybook-452807) → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Suggested setup:
   - Production: `docs.yourdomain.com`
   - Staging: `docs-staging.yourdomain.com`

### 📈 Performance Optimization

1. **Enable Compression**
   - Already configured in `firebase.json`
   - Brotli compression for modern browsers

2. **Optimize Images**

   ```bash
   # Add image optimization to build
   pnpm add -D sharp
   ```

3. **Monitor Performance**
   - Use Lighthouse CI in GitHub Actions
   - Track Core Web Vitals

### 🏗️ Infrastructure as Code

Consider using Terraform for Firebase configuration:

```hcl
resource "google_firebase_hosting_site" "staging" {
  project = "storybook-452807"
  site_id = "blend-staging"
}
```

### 🔄 Rollback Procedure

```bash
# View deployment history
firebase hosting:releases:list --site blend-staging

# Rollback to previous version
firebase hosting:rollback --site blend-staging
```

## 📚 Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Storybook Deployment](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [Web Security Headers](https://securityheaders.com/)

## 🆘 Support

- **Firebase Console**: https://console.firebase.google.com/project/storybook-452807
- **GitHub Repository**: Check issues and discussions
- **Internal Team**: Reach out in #design-system channel

---

Last updated: July 2025
