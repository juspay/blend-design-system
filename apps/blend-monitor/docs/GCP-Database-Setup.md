# GCP PostgreSQL Database Setup Guide

## Current Issue

Your GCP PostgreSQL database at `34.135.30.142` is not accessible due to network restrictions.

## Solution Options

### Option 1: Allow Your IP Address (Quick Fix)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **SQL** → **Instances**
3. Click on your `blend-monitor` database instance
4. Go to **Connections** → **Authorized networks**
5. Click **Add network**
6. Add your current IP address (you can find it at https://whatismyipaddress.com)
7. Save the changes

### Option 2: Use Cloud SQL Proxy (Secure)

```bash
# Install Cloud SQL Proxy
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64
chmod +x cloud_sql_proxy

# Run proxy (replace with your instance connection name)
./cloud_sql_proxy -instances=YOUR_PROJECT:REGION:INSTANCE_NAME=tcp:5432
```

### Option 3: Use Local Development Database (Fastest for Development)

```bash
# Install PostgreSQL locally
brew install postgresql  # macOS
# or
sudo apt-get install postgresql  # Ubuntu

# Create local database
createdb blend_monitor

# Update .env.local to use local database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=blend_monitor
DATABASE_USER=postgres
DATABASE_PASSWORD=  # leave empty for local
```

## Current Database Configuration

- **Host**: 34.135.30.142
- **Port**: 5432
- **Database**: blend_monitor
- **User**: admin
- **Status**: ❌ Connection timeout (network restricted)

## Next Steps

1. Choose one of the solutions above
2. Test connection with: `npm run test-db` (we'll create this script)
3. Run the tokenizer migration
4. Test the tokenizer dashboard

## Migration Status

- ✅ Migration script created
- ❌ Database connection failed
- ⏳ Waiting for database access
