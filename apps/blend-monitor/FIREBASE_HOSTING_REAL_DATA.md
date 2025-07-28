# Getting Real Firebase Hosting Data

This guide explains how to fetch real deployment data from Firebase Hosting instead of using hardcoded values.

## Current Status

Currently, the hosting status page shows hardcoded data for:

- **Version**: Hardcoded (e.g., "v1.0.5", "v1.0.6-beta")
- **Last Deploy**: Hardcoded timestamps
- **Uptime**: Hardcoded percentages (99.95%, 98.5%, etc.)
- **Status**: Hardcoded ("healthy", "degraded", "down")

## Real Data Integration

We've implemented a `FirebaseHostingClient` that can fetch real data from Firebase, but it requires additional setup:

### 1. Enable Real Firebase Hosting Data

In your `.env.local` file, set:

```env
USE_REAL_FIREBASE_HOSTING=true
```

### 2. Firebase Hosting API Requirements

To fetch real hosting data, you need:

1. **OAuth2 Authentication**: Firebase Hosting API requires OAuth2 tokens
2. **API Enablement**: Enable Firebase Hosting API in Google Cloud Console
3. **Proper Permissions**: Service account needs hosting viewer permissions

### 3. What Real Data Would Include

When properly configured, the system would fetch:

- **Version**: Actual release version from Firebase Hosting
- **Last Deploy**: Real deployment timestamps from release history
- **Uptime**: Calculated based on successful vs failed deployments
- **Status**: Determined by recent deployment success/failure rates

### 4. How Status is Calculated

The `calculateEnvironmentStatus` function determines status based on:

- **Healthy**: Latest deployment successful, few recent failures
- **Degraded**: Latest deployment failed OR 2+ failures in last 5 deployments
- **Down**: 4+ failures in last 5 deployments

### 5. Implementation Details

```typescript
// firebase-hosting-client.ts
async getRealEnvironmentStatus(environmentName: string): Promise<Environment | null> {
    // Maps environment names to Firebase hosting site IDs
    const siteMapping = {
        'production': 'blend-prod',
        'staging': 'blend-staging',
        'development': 'storybook-452807'
    }

    // Would fetch from Firebase Hosting API:
    // GET https://firebasehosting.googleapis.com/v1beta1/sites/{siteId}/releases
}
```

## Setting Up Firebase Hosting API

### Step 1: Enable the API

```bash
gcloud services enable firebasehosting.googleapis.com
```

### Step 2: Create OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services > Credentials
3. Create OAuth 2.0 Client ID
4. Download credentials JSON

### Step 3: Implement OAuth2 Flow

```typescript
// Example OAuth2 implementation
const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

// Get access token
const { tokens } = await auth.getToken(code)
auth.setCredentials(tokens)
```

### Step 4: Use Firebase Hosting API

```typescript
const hosting = google.firebasehosting({
    version: 'v1beta1',
    auth: auth,
})

const releases = await hosting.sites.releases.list({
    parent: `sites/${siteId}`,
    pageSize: 10,
})
```

## Alternative: Firebase CLI Integration

For simpler integration without OAuth2:

```bash
# Get hosting sites
firebase hosting:sites:list --json

# Get recent releases (requires additional parsing)
firebase hosting:channel:list --site=<site-id> --json
```

## Current Limitations

1. **OAuth2 Complexity**: Full API access requires OAuth2 setup
2. **Limited Admin SDK Support**: Firebase Admin SDK doesn't include Hosting API
3. **Manual Site Mapping**: Need to map environment names to Firebase site IDs

## Future Improvements

1. Implement full OAuth2 flow for production use
2. Add caching to reduce API calls
3. Create webhook integration for real-time updates
4. Add health check endpoints for actual uptime monitoring

## Summary

While the infrastructure is in place to fetch real Firebase hosting data, it requires additional OAuth2 setup. For now, the system uses hardcoded demo data but can be easily switched to real data by:

1. Setting `USE_REAL_FIREBASE_HOSTING=true`
2. Implementing OAuth2 authentication
3. Configuring proper API access

The hardcoded "degraded" status for staging is demo data that would be replaced with real deployment status when properly configured.

## Important Note on Deployment Dates

The "last deploy" dates you see (e.g., July 2025) are from sample data created by the populate script, not real Firebase deployments. To get accurate deployment dates:

1. **Real Deployments**: The system needs to track actual Firebase Hosting deployments
2. **Firebase Hosting API**: Full OAuth2 implementation would provide real release history
3. **Manual Tracking**: Create deployment records when you actually deploy to Firebase

Currently, the system shows:

- **Status**: Calculated from deployment history (sample data)
- **Version**: From deployment records (sample data)
- **Last Deploy**: From sample data timestamps (not real deployments)
- **Uptime**: Calculated from success rate (based on sample data)

To get real deployment dates, you need to either:

- Implement full Firebase Hosting API integration
- Manually track deployments when they occur
- Use webhooks or CI/CD integration to record actual deployments
