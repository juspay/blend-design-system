# Blend Monitor Development Setup Guide

This guide provides comprehensive step-by-step instructions for setting up and running the Blend Monitor application locally with Cloud SQL Proxy.

## Overview

The Blend Monitor application uses Google Cloud SQL for the database. To connect securely from your local development environment, we use Cloud SQL Proxy, which creates an encrypted tunnel to the database.

## Prerequisites

- Node.js 18+
- Google Cloud SDK (gcloud CLI)
- Access to Google Cloud project: `storybook-452807`
- Firebase project access for authentication

## One-Time Setup

### 1. Install Dependencies

```bash
# From project root
pnpm install
```

### 2. Google Cloud Authentication

```bash
# Login to Google Cloud
gcloud auth login

# Set the project
gcloud config set project storybook-452807

# Set up application default credentials
gcloud auth application-default login
```

### 3. Download Cloud SQL Proxy

```bash
# From project root directory
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
chmod +x cloud_sql_proxy
```

**For other operating systems:**

- **Linux**: `https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64`
- **Windows**: `https://dl.google.com/cloudsql/cloud_sql_proxy.windows.amd64.exe`

### 4. Configure Environment Variables

```bash
# Copy the environment template
cp apps/blend-monitor/.env.example apps/blend-monitor/.env.local
```

Update `apps/blend-monitor/.env.local` with the following configuration:

```env
# Firebase Client Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD2aRkOI4iCwiZOW5kEejrL9jv9JvytKpo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=storybook-452807.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=storybook-452807
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storybook-452807.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=567047894553
NEXT_PUBLIC_FIREBASE_APP_ID=1:567047894553:web:1cd999e1c9bf9b81ff5c88
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app

# Firebase Admin Configuration (Private)
FIREBASE_PROJECT_ID=storybook-452807
FIREBASE_DATABASE_URL=https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@storybook-452807.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n[YOUR_PRIVATE_KEY]\n-----END PRIVATE KEY-----

# PostgreSQL Configuration (Google Cloud SQL via Cloud SQL Proxy)
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_NAME=blend_monitor
DATABASE_USER=admin
DATABASE_PASSWORD=Juspay@123

# Database URL for migrations and seeding (via Cloud SQL Proxy)
DATABASE_URL=postgresql://admin:Juspay@123@localhost:5433/blend_monitor

# Application Settings
NODE_ENV=development
```

## Daily Development Workflow

**Follow these steps every time you start development:**

### Step 1: Start Cloud SQL Proxy

```bash
# From project root directory
./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
```

**Success indicators:**

- ✅ You'll see: `Ready for new connections`
- ✅ Proxy listens on `localhost:5433`
- ✅ No error messages about authentication or connection

**Example successful output:**

```
2025/08/09 00:13:40 current FDs rlimit set to 61440, wanted limit is 8500. Nothing to do here.
2025/08/09 00:13:44 Listening on 127.0.0.1:5433 for storybook-452807:us-central1:blend-dashboard
2025/08/09 00:13:44 Ready for new connections
```

### Step 2: Start Development Server

```bash
cd apps/blend-monitor
npm run dev
```

**Success indicators:**

- ✅ Server starts on `http://localhost:3000`
- ✅ Database connections show: `Database connected successfully`
- ✅ No SSL connection errors

**Example successful output:**

```
▲ Next.js 15.4.1
- Local:        http://localhost:3000
- Network:      http://172.20.10.12:3000

✓ Ready in 2.4s

Database client connected
Database connected successfully (latency: 2763ms)
```

### Step 3: Access the Application

- **Main Dashboard:** http://localhost:3000
- **Tokenizer:** http://localhost:3000/tokenizer
- **API Test Page:** http://localhost:3000/api-test

## Verification Steps

### 1. Check Database Connection

```bash
cd apps/blend-monitor
node scripts/check-tokens.js
```

**Expected output:**

```
🔍 Checking Token Management System Data...

📊 Foundation Token Collections:
┌─────────┬────────────────────────────────────────┬─────────────────┐
│ (index) │ id                                     │ name            │
├─────────┼────────────────────────────────────────┼─────────────────┤
│ 0       │ '2334c9e6-ff84-4fc9-a6da-2c9df6d2fd01' │ 'Blend Default' │
└─────────┴────────────────────────────────────────┴─────────────────┘

📊 Overall Summary:
┌─────────┬────────────────────────┬───────────────────┐
│ (index) │ foundation_collections │ foundation_tokens │
├─────────┼────────────────────────┼───────────────────┤
│ 0       │ '1'                    │ '177'             │
└─────────┴────────────────────────┴───────────────────┘
```

### 2. Test API Endpoints

Visit http://localhost:3000/api-test to verify all API endpoints are working:

- ✅ Foundation Collections API
- ✅ Foundation Tokens API
- ✅ Component Collections API
- ✅ Component Tokens API

### 3. Test Tokenizer Interface

Visit http://localhost:3000/tokenizer and verify:

- ✅ Shows "1 Foundation Collections"
- ✅ Shows "177 Foundation Tokens"
- ✅ Shows "25 Component Collections"
- ✅ Foundation token browsing works
- ✅ No API errors in browser console

## Troubleshooting

### Common Issues

#### 1. Port 5433 Already in Use

```bash
# Check what's using the port
lsof -i :5433

# Kill existing Cloud SQL Proxy processes
pkill -f cloud_sql_proxy

# Restart the proxy
./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
```

#### 2. Database Connection Errors

**Error:** `ECONNREFUSED` or `connection refused`

**Solution:**

```bash
# Verify Cloud SQL Proxy is running
lsof -i :5433

# Check proxy logs for errors
# Look for authentication or permission issues

# Restart proxy if needed
pkill -f cloud_sql_proxy
./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
```

#### 3. SSL Connection Errors

**Error:** `The server does not support SSL connections`

**Solution:** This is expected! The app is configured to disable SSL because Cloud SQL Proxy handles encryption. No action needed.

#### 4. Authentication Errors

**Error:** `permission denied` or `authentication failed`

**Solution:**

```bash
# Re-authenticate with Google Cloud
gcloud auth login
gcloud auth application-default login

# Verify project access
gcloud projects list
gcloud config set project storybook-452807
```

#### 5. Cloud SQL Proxy Not Found

**Error:** `command not found: cloud_sql_proxy`

**Solution:**

```bash
# Re-download the proxy
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
chmod +x cloud_sql_proxy

# Verify it's executable
./cloud_sql_proxy --version
```

### Performance Issues

If you experience slow database connections:

1. **Check proxy logs** for connection issues
2. **Verify network connectivity** to Google Cloud
3. **Restart the proxy** if connections are timing out
4. **Check Google Cloud Console** for database status

## Database Management

### Seed Token Data

If you need to populate the database with token data:

```bash
cd apps/blend-monitor
node scripts/seed-token-management.js
```

### Extract Component Tokens

To update component tokens from the Blend library:

```bash
cd apps/blend-monitor
node scripts/extract-component-tokens.js
node scripts/update-component-tokens.js
```

## Quick Start Script

For convenience, create a startup script:

```bash
# Create apps/blend-monitor/start-local.sh
#!/bin/bash
echo "🚀 Starting Blend Monitor Development Environment..."

# Check if Cloud SQL Proxy is already running
if lsof -i :5433 > /dev/null; then
    echo "📡 Cloud SQL Proxy already running on port 5433"
else
    echo "📡 Starting Cloud SQL Proxy..."
    cd ../..
    ./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
    PROXY_PID=$!

    # Wait for proxy to start
    echo "⏳ Waiting for proxy to initialize..."
    sleep 5
fi

# Start development server
echo "🖥️  Starting development server..."
cd apps/blend-monitor
npm run dev

# Cleanup on exit (if we started the proxy)
if [ ! -z "$PROXY_PID" ]; then
    trap "echo '🛑 Stopping Cloud SQL Proxy...'; kill $PROXY_PID" EXIT
fi
```

Make it executable and run:

```bash
chmod +x apps/blend-monitor/start-local.sh
./apps/blend-monitor/start-local.sh
```

## Production Deployment

### Environment Differences

**Local Development:**

- Uses Cloud SQL Proxy on `localhost:5433`
- SSL disabled (proxy handles encryption)
- Direct database connection via proxy

**Production:**

- Uses Unix socket connection: `/cloudsql/storybook-452807:us-central1:blend-dashboard`
- No Cloud SQL Proxy needed
- Built-in Cloud Run to Cloud SQL connectivity

### Deployment Checklist

- ✅ Environment variables configured for production
- ✅ Cloud SQL Proxy **not** included in production build
- ✅ Database connection uses Unix socket in production
- ✅ SSL configuration appropriate for environment

## Security Notes

1. **Never commit** `.env.local` files to version control
2. **Cloud SQL Proxy** provides encrypted connections - no additional SSL needed
3. **Firebase private keys** should be stored securely
4. **Database credentials** are environment-specific

## Support

If you encounter issues not covered in this guide:

1. Check the [GCP Database Setup Guide](./GCP-Database-Setup.md)
2. Review the [Token Management Implementation](./Token-Management-System-Implementation.md)
3. Contact the development team for assistance

---

**Last Updated:** August 2025  
**Maintained by:** Blend Monitor Development Team
