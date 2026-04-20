# Blend Monitor - Local Setup Guide

Quick guide to run blend-monitor locally on your machine.

## Prerequisites

- Node.js 18+
- pnpm installed
- GCP CLI authenticated with `storybook-452807` project

## Setup Steps

### 1. Download Cloud SQL Proxy

```bash
cd apps/blend-monitor
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
chmod +x cloud_sql_proxy
```

### 2. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fetch secrets from GCP Secret Manager:

```bash
# Get database password
gcloud secrets versions access latest --secret="blend-monitor-db-password" --project=storybook-452807

# Get Firebase private key
gcloud secrets versions access latest --secret="blend-monitor-firebase-key" --project=storybook-452807
```

Add the secrets to `.env.local`:

- `DATABASE_PASSWORD=<paste the database password>`
- `FIREBASE_PRIVATE_KEY=<paste the private key>`

### 3. Start Cloud SQL Proxy

```bash
./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
```

### 4. Run Development Server

From the monorepo root:

```bash
pnpm --filter blend-monitor dev
```

Or from the blend-monitor directory:

```bash
pnpm dev
```

### 5. Access the App

Open http://localhost:3000 in your browser.

## Stopping the App

Kill the dev server (Ctrl+C) and stop the Cloud SQL proxy:

```bash
pkill -f cloud_sql_proxy
```

## Troubleshooting

**Port already in use?**

- Kill the process: `lsof -ti:3000 | xargs kill -9`

**Database connection failed?**

- Ensure Cloud SQL proxy is running: `ps aux | grep cloud_sql_proxy`
- Check proxy logs for connection errors

**Firebase authentication failed?**

- Verify `FIREBASE_PRIVATE_KEY` is properly formatted in `.env.local`
- Ensure the private key includes `\n` for newlines in the string
