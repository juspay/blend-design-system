# NPM Package Update: blend-v1 → @juspay/blend-design-system

This document outlines the changes made to update the NPM package tracking from `blend-v1` to `@juspay/blend-design-system`.

## Changes Made

### 1. NPM Client Updates

- **File**: `src/backend/external/npm-client.ts`
- **Change**: Updated default package name from `'blend-v1'` to `'@juspay/blend-design-system'`

### 2. API Route Updates

- **File**: `src/backend/api/npm/route.ts`
- **Change**: Updated NPMClient initialization to use the new package name

### 3. Database Service Updates

- **File**: `src/backend/lib/database-service.ts`
- **Changes**:
    - Updated fallback package name in `getPackageStats()`
    - Updated default parameter in `saveDownloadTrend()`
    - Updated package name in `syncNPMData()`
    - Added `clearNPMCache()` method for cache management

### 4. Cache Management System

- **Migration**: `database/migrations/004_clear_npm_cache.sql`
- **API Endpoint**: `app/api/npm/clear-cache/route.ts`
- **Utility Script**: `scripts/clear-npm-cache.js`

### 5. Telemetry Analytics Fix

- **File**: `app/api/telemetry/analytics/route.ts`
- **Change**: Added table existence check to prevent 500 errors when `page_compositions` table doesn't exist

## How to Use

### For Development

1. Start the server: `npm run dev`
2. Clear cache (if needed): `node scripts/clear-npm-cache.js`
3. Visit `/npm` route to see updated package information

### For Production

1. Database migration will automatically clear old cache
2. System will fetch fresh data for `@juspay/blend-design-system`
3. Use API endpoint for manual cache clearing if needed

### Manual Cache Clearing

```bash
# Using the utility script
node scripts/clear-npm-cache.js

# Using curl directly
curl -X POST http://localhost:3003/api/npm/clear-cache
```

## Expected Results

After the update, the application will:

- Display information for `@juspay/blend-design-system` instead of `blend-v1`
- Show correct download statistics from https://www.npmjs.com/package/@juspay/blend-design-system
- Display accurate version history and package details
- Handle telemetry analytics gracefully even when database tables don't exist

## Troubleshooting

### If you still see old package data:

1. Clear the browser cache
2. Run the cache clearing script: `node scripts/clear-npm-cache.js`
3. Restart the server

### If telemetry page shows errors:

- The analytics API now handles missing database tables gracefully
- Empty data will be returned instead of 500 errors
- Database migrations will create required tables on deployment

## Files Modified

- `src/backend/external/npm-client.ts`
- `src/backend/api/npm/route.ts`
- `src/backend/lib/database-service.ts`
- `app/api/npm/clear-cache/route.ts` (new)
- `app/api/npm/stats/route.ts`
- `app/api/npm/trends/route.ts`
- `app/api/telemetry/analytics/route.ts`
- `src/frontend/components/dashboard/MetricCard.tsx`
- `src/frontend/app/npm/page.tsx`
- `database/migrations/004_clear_npm_cache.sql` (new)
- `scripts/clear-npm-cache.js` (new)
