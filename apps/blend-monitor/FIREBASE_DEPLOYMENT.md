# Firebase Hosting + Cloud Functions Deployment Guide

This guide explains how to deploy the Blend Monitor app to Firebase Hosting with Cloud Functions.

## Architecture Overview

```
blend-monitor.web.app/
├── / (Static Next.js pages from Firebase Hosting)
├── /api/* → Cloud Functions (automatic rewrites)
└── /assets/* (Static assets from Firebase Hosting)
```

## Setup Complete ✅

### 1. Cloud Functions Structure Created

- `functions/` directory with TypeScript configuration
- API routes converted to Express-based Cloud Functions
- Authentication middleware implemented
- CORS handling configured

### 2. Firebase Configuration Updated

- Added `blend-monitor` hosting target
- Configured rewrites for `/api/*` to Cloud Functions
- Set up proper caching headers

### 3. Next.js Configuration

- Configured for static export (`output: 'export'`)
- Development proxy for local testing
- Images configured for static export

## Deployment Instructions

### Prerequisites

1. Firebase CLI installed (`npm install -g firebase-tools`)
2. Logged in to Firebase (`firebase login`)
3. Node.js 20.x installed

### Local Development

1. **Start Firebase Emulators:**

    ```bash
    cd apps/blend-monitor/functions
    npm run serve
    ```

2. **Start Next.js Development Server:**
    ```bash
    cd apps/blend-monitor
    npm run dev
    ```

### Deployment

#### Quick Deploy (Staging)

```bash
cd apps/blend-monitor
./scripts/deploy.sh
```

#### Production Deploy

```bash
cd apps/blend-monitor
./scripts/deploy.sh production
```

### Manual Deployment Steps

1. **Build Next.js App:**

    ```bash
    cd apps/blend-monitor
    npm run build
    ```

2. **Build Cloud Functions:**

    ```bash
    cd apps/blend-monitor/functions
    npm run build
    ```

3. **Deploy to Firebase:**
    ```bash
    # From project root
    firebase deploy --only database,functions,hosting:blend-monitor --project storybook-452807
    ```

## URLs

- **Production**: https://blend-monitor.web.app
- **Functions**: https://us-central1-storybook-452807.cloudfunctions.net/api

## API Migration Status

### ✅ Completed

- `/api/users/:userId/role` - User role management

### 🚧 TODO - Need to Migrate

1. **Deployment APIs**
    - `/api/deployments/create`
    - `/api/deployments/approve`
    - `/api/deployments/history`
    - `/api/deployments/[deploymentId]`

2. **Monitoring APIs**
    - `/api/deployments/usage`
    - `/api/deployments/performance`
    - `/api/deployments/hosting-status`

3. **NPM Registry API**
    - `/api/npm`

## Next Steps

1. **Migrate Remaining API Routes**
    - Copy logic from `app/api/*` to `functions/src/api/*`
    - Update imports and dependencies
    - Test each endpoint

2. **Update Frontend API Calls**
    - Update all fetch calls to use relative URLs (`/api/*`)
    - Remove any hardcoded localhost URLs

3. **Set Environment Variables**

    ```bash
    firebase functions:config:set \
      firebase.database_url="https://storybook-452807.firebaseio.com" \
      firebase.project_id="storybook-452807"
    ```

4. **Test Everything**
    - Test authentication flow
    - Test all API endpoints
    - Test deployment functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**
    - Check `corsHandler` configuration in `functions/src/lib/middleware.ts`
    - Ensure frontend is using correct API URLs

2. **Authentication Errors**
    - Verify Firebase Auth tokens are being sent in headers
    - Check Firebase Admin SDK initialization

3. **Build Errors**
    - Ensure Node.js 20.x is installed
    - Run `npm install` in both root and functions directory

### Viewing Logs

```bash
# View function logs
firebase functions:log --project storybook-452807

# View specific function logs
firebase functions:log --only api --project storybook-452807
```

## Security Considerations

1. **Environment Variables**
    - Never commit sensitive keys
    - Use Firebase Functions config for secrets

2. **CORS Configuration**
    - Update `origin` in production to specific domains
    - Remove `origin: true` for production

3. **Authentication**
    - All API routes require authentication
    - Role-based access control implemented

## Performance Optimization

1. **Cold Starts**
    - Keep functions warm with scheduled pings
    - Minimize dependencies

2. **Caching**
    - Static assets cached for 1 year
    - API responses can be cached with appropriate headers

3. **Bundle Size**
    - Tree-shake unused dependencies
    - Use dynamic imports where possible
