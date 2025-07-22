# Blend Monitor Firebase Deployment - Detailed Plan

## Overview

Deploy the Blend Monitor application to Firebase Hosting with Cloud Functions for API endpoints. This will create a fully serverless deployment with static hosting for the Next.js app and Cloud Functions for backend APIs.

## Current Status ✅

### Completed Setup:

1. **Cloud Functions Structure**
    - Created `functions/` directory with TypeScript configuration
    - Set up Express-based API structure
    - Implemented authentication middleware
    - Configured CORS handling
    - Created initial user role API endpoint

2. **Firebase Configuration**
    - Updated `firebase.json` with blend-monitor hosting target
    - Configured API rewrites from `/api/*` to Cloud Functions
    - Set up proper caching headers for static assets
    - Applied hosting target for blend-monitor

3. **Next.js Configuration**
    - Configured for static export (`output: 'export'`)
    - Set up development proxy for local API testing
    - Configured image optimization for static export

4. **Deployment Scripts**
    - Created automated deployment script (`deploy.sh`)
    - Added staging and production deployment options

## Architecture

```
Firebase Project: storybook-452807
│
├── Hosting: blend-monitor.web.app
│   ├── Static Next.js pages (exported)
│   ├── Static assets (JS, CSS, images)
│   └── Rewrites: /api/* → Cloud Functions
│
├── Cloud Functions
│   └── api (Express app)
│       └── /api/users/:userId/role
│
└── Realtime Database
    └── User roles and activity data
```

## Deployment Steps

### Step 1: Install Dependencies

```bash
# Install Cloud Functions dependencies
cd apps/blend-monitor/functions
npm install

# Return to blend-monitor root
cd ..
```

### Step 2: Build the Application

```bash
# Build Next.js static export
npm run build

# Build Cloud Functions
cd functions
npm run build
cd ..
```

### Step 3: Deploy to Firebase

#### Option A: Using the deployment script (Recommended)

```bash
# Deploy to staging (default)
./scripts/deploy.sh

# Deploy to production
./scripts/deploy.sh production
```

#### Option B: Manual deployment

```bash
# From project root
cd ../..
firebase deploy --only database,functions,hosting:blend-monitor --project storybook-452807
```

### Step 4: Verify Deployment

1. Visit https://blend-monitor.web.app
2. Check Cloud Functions logs: `firebase functions:log --project storybook-452807`
3. Test API endpoints: `https://blend-monitor.web.app/api/users/{userId}/role`

## API Migration Requirements

### APIs to Migrate to Cloud Functions:

1. **Deployment Management**
    - `/api/deployments/create` - Create new deployments
    - `/api/deployments/approve` - Approve pending deployments
    - `/api/deployments/history` - Get deployment history
    - `/api/deployments/[deploymentId]` - Get specific deployment

2. **Monitoring & Analytics**
    - `/api/deployments/usage` - Firebase usage metrics
    - `/api/deployments/performance` - Performance metrics
    - `/api/deployments/hosting-status` - Hosting status

3. **NPM Registry**
    - `/api/npm` - NPM package information

### Migration Process:

1. Copy API logic from `app/api/*` to `functions/src/api/*`
2. Convert from Next.js API routes to Express routes
3. Update imports to use Cloud Functions libraries
4. Test each endpoint locally with Firebase emulator

## Local Development Setup

### 1. Start Firebase Emulators

```bash
cd apps/blend-monitor/functions
npm run serve
```

This starts the Functions emulator on http://localhost:5001

### 2. Start Next.js Development

```bash
cd apps/blend-monitor
npm run dev
```

The Next.js dev server will proxy `/api/*` requests to the Functions emulator

## Environment Variables

### Set Firebase Functions Config:

```bash
firebase functions:config:set \
  firebase.database_url="https://storybook-452807.firebaseio.com" \
  firebase.project_id="storybook-452807" \
  --project storybook-452807
```

### Local Development (.env.local):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=storybook-452807.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=storybook-452807
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://storybook-452807.firebaseio.com
```

## Post-Deployment Tasks

1. **Update DNS (if using custom domain)**

    ```bash
    firebase hosting:channel:deploy production --project storybook-452807
    ```

2. **Monitor Performance**
    - Check Cloud Functions cold start times
    - Monitor API response times
    - Review error logs

3. **Security Hardening**
    - Update CORS origins for production
    - Review and tighten database rules
    - Enable App Check for additional security

## Rollback Plan

If issues occur after deployment:

1. **Quick Rollback**

    ```bash
    firebase hosting:rollback --project storybook-452807
    ```

2. **Function Rollback**
    - Deploy previous function version
    - Or disable problematic functions in Firebase Console

## Cost Considerations

### Estimated Monthly Costs:

- **Hosting**: ~$0 (within free tier for static files)
- **Cloud Functions**: ~$0-5 (depends on invocations)
- **Realtime Database**: ~$0-25 (depends on data/bandwidth)

### Cost Optimization:

1. Enable Cloud CDN for better caching
2. Optimize function cold starts
3. Implement database query limits

## Success Metrics

1. **Deployment Success**
    - All pages load correctly
    - API endpoints respond with 200 status
    - Authentication works properly

2. **Performance Targets**
    - Page load time < 3 seconds
    - API response time < 500ms
    - 99.9% uptime

## Support & Troubleshooting

### Common Issues:

1. **Build Failures**
    - Check Node.js version (requires 20.x)
    - Clear cache: `rm -rf .next node_modules`
    - Reinstall dependencies

2. **Deployment Failures**
    - Check Firebase CLI is logged in
    - Verify project permissions
    - Check quota limits

3. **Runtime Errors**
    - Check Functions logs
    - Verify environment variables
    - Test with Firebase emulator first

### Getting Help:

- Firebase Console: https://console.firebase.google.com/project/storybook-452807
- Logs: `firebase functions:log --project storybook-452807`
- Documentation: https://firebase.google.com/docs

## Next Steps After Initial Deployment

1. **Complete API Migration**
    - Migrate remaining API endpoints
    - Update all frontend API calls
    - Remove Next.js API routes

2. **Performance Optimization**
    - Implement caching strategies
    - Optimize bundle sizes
    - Add monitoring

3. **Feature Enhancements**
    - Add real-time updates
    - Implement push notifications
    - Add offline support

This deployment plan provides a production-ready, scalable solution for the Blend Monitor application on Firebase infrastructure.
