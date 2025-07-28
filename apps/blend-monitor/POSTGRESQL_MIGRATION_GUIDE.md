# 🔄 Firebase to PostgreSQL Migration Guide

This guide will help you migrate your Blend Monitor app from Firebase Realtime Database to Google Cloud PostgreSQL.

## 📋 **Prerequisites**

- [x] Access to Firebase project and admin credentials
- [x] Google Cloud Project with Cloud SQL enabled
- [x] Node.js 18+ installed
- [x] PostgreSQL client (psql) installed
- [x] Access to your existing `.env.local` file

## 🏗️ **Step 1: Set Up Google Cloud PostgreSQL**

### 1.1 Create Cloud SQL Instance

```bash
# Set your project ID
export PROJECT_ID="your-project-id"

# Create a PostgreSQL instance
gcloud sql instances create blend-monitor-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1 \
    --storage-type=SSD \
    --storage-size=10GB \
    --storage-auto-increase \
    --backup-start-time=03:00 \
    --maintenance-window-day=SUN \
    --maintenance-window-hour=04 \
    --maintenance-release-channel=production
```

### 1.2 Create Database User

```bash
# Create a database user
gcloud sql users create blend_monitor \
    --instance=blend-monitor-db \
    --password=your_secure_password
```

### 1.3 Create Database

```bash
# Create the database
gcloud sql databases create blend_monitor \
    --instance=blend-monitor-db
```

### 1.4 Configure Network Access

```bash
# Add your IP address (for development)
gcloud sql instances patch blend-monitor-db \
    --authorized-networks=YOUR_IP_ADDRESS/32

# For production, use private IP or Cloud SQL Proxy
```

## 🔧 **Step 2: Update Dependencies**

Add PostgreSQL dependencies to your `package.json`:

```bash
cd apps/blend-monitor
npm install pg @types/pg dotenv
```

## 🔐 **Step 3: Environment Configuration**

Update your `.env.local` file:

```bash
# Add these PostgreSQL variables
DATABASE_HOST=your-cloud-sql-ip
DATABASE_PORT=5432
DATABASE_NAME=blend_monitor
DATABASE_USER=blend_monitor
DATABASE_PASSWORD=your_secure_password

# For production, use connection string format:
# DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Keep existing Firebase variables for migration
FIREBASE_PROJECT_ID=your-firebase-project
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
```

## 🗄️ **Step 4: Initialize Database Schema**

Run the schema creation script:

```bash
# Connect to your PostgreSQL instance
psql -h YOUR_CLOUD_SQL_IP -U blend_monitor -d blend_monitor

# Run the schema file
\i database/schema.sql

# Verify tables were created
\dt
```

Or use the initialization function:

```bash
# Run database initialization
node -e "
const { initializeDatabase } = require('./lib/database');
initializeDatabase().then(() => {
    console.log('Database initialized successfully');
    process.exit(0);
}).catch(console.error);
"
```

## 📊 **Step 5: Migrate Existing Data**

Run the migration script to transfer data from Firebase to PostgreSQL:

```bash
# Make the script executable
chmod +x scripts/migrate-firebase-to-postgresql.js

# Run the migration
node scripts/migrate-firebase-to-postgresql.js
```

The migration will:

- ✅ Transfer all users and their roles
- ✅ Migrate component data and integration status
- ✅ Move NPM package statistics and trends
- ✅ Transfer activity logs and system events
- ✅ Migrate deployment history (if any)

## 🔄 **Step 6: Update Application Code**

### 6.1 Replace Firebase Hooks

**Before (Firebase):**

```typescript
import { useComponentCoverage, useComponents } from '@/hooks/useRealtimeData'
```

**After (PostgreSQL):**

```typescript
import { useComponentCoverage, useComponents } from '@/hooks/usePostgreSQLData'
```

### 6.2 Update API Routes

Replace Firebase Admin SDK calls with PostgreSQL service calls:

**Before:**

```typescript
// Firebase approach
const db = getAdminDatabase()
await db.ref('blend-monitor').set(updates)
```

**After:**

```typescript
// PostgreSQL approach
import { databaseService } from '@/lib/database-service'
await databaseService.batchUpsertComponents(components)
```

### 6.3 Update Authentication Context

The authentication will still use Firebase Auth, but user data will be stored in PostgreSQL:

```typescript
// In AuthContext.tsx
import { databaseService } from '@/lib/database-service'

// Replace Firebase user creation
const userData = await databaseService.createOrUpdateUser(user.uid, {
    email: user.email!,
    displayName: user.displayName,
    photoURL: user.photoURL,
})
```

## 🧪 **Step 7: Testing**

### 7.1 Test Database Connection

```bash
# Test connection
node -e "
const { checkDatabaseHealth } = require('./lib/database');
checkDatabaseHealth().then(result => {
    console.log('Database health:', result);
    process.exit(result.healthy ? 0 : 1);
});
"
```

### 7.2 Test Data Migration

```bash
# Verify data was migrated correctly
node -e "
const { databaseService } = require('./lib/database-service');
async function test() {
    const users = await databaseService.getAllUsers();
    const components = await databaseService.getComponents();
    console.log(\`Users: \${users.length}, Components: \${components.length}\`);
}
test();
"
```

### 7.3 Test Application

```bash
# Start the development server
npm run dev

# Verify all pages load correctly:
# - Dashboard (http://localhost:3000)
# - Components (http://localhost:3000/code-connect)
# - Users (http://localhost:3000/users)
# - NPM Stats (http://localhost:3000/npm)
```

## 🚀 **Step 8: Deployment**

### 8.1 Update Production Environment Variables

```bash
# In your production environment, set:
DATABASE_HOST=your-production-db-host
DATABASE_NAME=blend_monitor
DATABASE_USER=blend_monitor
DATABASE_PASSWORD=your-production-password

# For Cloud Run/App Engine, use Cloud SQL Proxy
DATABASE_HOST=/cloudsql/project:region:instance
```

### 8.2 Database Connection in Production

For Google Cloud deployments, use Cloud SQL Proxy:

```yaml
# In your Cloud Run service configuration
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
    annotations:
        run.googleapis.com/cloudsql-instances: PROJECT_ID:REGION:INSTANCE_ID
spec:
    template:
        metadata:
            annotations:
                run.googleapis.com/cloudsql-instances: PROJECT_ID:REGION:INSTANCE_ID
```

## 📊 **Step 9: Performance Optimization**

### 9.1 Connection Pooling

The database service uses connection pooling by default. Adjust pool settings:

```typescript
// In lib/database.ts
const dbConfig = {
    max: 20, // Maximum connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}
```

### 9.2 Query Optimization

- Indexes are already created for common queries
- Use EXPLAIN ANALYZE for slow queries
- Monitor query performance in production

### 9.3 Caching Strategy

Consider adding Redis for caching frequently accessed data:

```bash
# Optional: Add Redis for caching
npm install redis @types/redis
```

## 🔍 **Step 10: Monitoring & Maintenance**

### 10.1 Database Monitoring

Monitor your PostgreSQL instance:

- Query performance
- Connection usage
- Storage utilization
- Backup status

### 10.2 Application Monitoring

Monitor the polling hooks:

- API response times
- Error rates
- Data freshness

### 10.3 Regular Maintenance

```bash
# Weekly: Check database statistics
psql -c "SELECT * FROM pg_stat_user_tables;"

# Monthly: Analyze and vacuum tables
psql -c "VACUUM ANALYZE;"

# As needed: Update table statistics
psql -c "ANALYZE;"
```

## 🎯 **Benefits of Migration**

✅ **Performance**: Better query performance with indexed searches  
✅ **Scalability**: PostgreSQL can handle larger datasets  
✅ **Cost**: More predictable pricing model  
✅ **Features**: Rich SQL querying capabilities  
✅ **Backup**: Automated backups and point-in-time recovery  
✅ **Integration**: Better integration with other Google Cloud services

## 🔄 **Rollback Plan**

If you need to rollback to Firebase:

1. Keep Firebase configuration active during migration
2. Revert imports back to `useRealtimeData`
3. Update API routes to use Firebase Admin SDK
4. Your Firebase data remains unchanged during migration

## 🆘 **Troubleshooting**

### Common Issues:

**Connection Errors:**

```bash
# Check network connectivity
gcloud sql instances describe blend-monitor-db

# Verify credentials
psql -h HOST -U USER -d DATABASE -c "SELECT 1;"
```

**Migration Errors:**

```bash
# Check migration logs
node scripts/migrate-firebase-to-postgresql.js 2>&1 | tee migration.log

# Validate data integrity
node -e "require('./scripts/migrate-firebase-to-postgresql').validateMigration()"
```

**Performance Issues:**

```sql
-- Check slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## 📞 **Support**

If you encounter issues during migration:

1. Check the troubleshooting section above
2. Review PostgreSQL and Google Cloud SQL documentation
3. Check application logs for specific error messages
4. Verify all environment variables are correctly set

## 🎉 **Conclusion**

After completing this migration, your Blend Monitor app will:

- Use PostgreSQL for all data storage
- Maintain the same functionality with improved performance
- Have better scalability for future growth
- Provide more flexible querying capabilities

The migration preserves all your existing data while providing a more robust and scalable foundation for your monitoring system.
