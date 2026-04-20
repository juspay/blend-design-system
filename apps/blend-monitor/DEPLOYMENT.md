# Blend Monitor - Google Cloud Run Deployment Guide

## ⚠️ CRITICAL SECURITY WARNING

**NEVER commit real credentials to version control!**

This documentation contains placeholder values only. You MUST:

1. **Replace ALL placeholder values** with your actual credentials
2. **Store secrets in Google Secret Manager** or environment variables
3. **Use strong, unique passwords** for all services
4. **Rotate credentials regularly**
5. **Review access logs** for unauthorized usage

**Before proceeding, ensure you understand proper credential management practices.**

---

## Prerequisites

Before deploying, ensure you have:

1. **Google Cloud Project**: Your Google Cloud Project ID
2. **Cloud SQL Instance**: PostgreSQL database configured
3. **gcloud CLI**: Installed and authenticated
4. **GitHub Repository**: With deployment workflow

## 🚀 Deployment Steps

### Step 1: Enable Required GCP APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

### Step 2: Create Secrets in GCP Secret Manager

```bash
# Database Password (REPLACE WITH YOUR SECURE PASSWORD)
echo -n "YOUR_SECURE_DB_PASSWORD" | gcloud secrets create blend-monitor-db-password --data-file=-

# Firebase Private Key (save your key to a file first)
gcloud secrets create blend-monitor-firebase-key --data-file=firebase-private-key.txt
```

### Step 3: Create Service Account for Cloud Run

```bash
# Create service account
gcloud iam service-accounts create blend-monitor-sa \
  --display-name="Blend Monitor Service Account"

# Grant necessary permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:blend-monitor-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:blend-monitor-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### Step 4: Configure GitHub Secrets

⚠️ **IMPORTANT**: The values below are placeholders. Replace them with your actual credentials.

Add these secrets to your GitHub repository:

| Secret Name                    | Value                                                              |
| ------------------------------ | ------------------------------------------------------------------ |
| `GCP_SA_KEY`                   | Service account JSON key (from GCP Console)                        |
| `CLOUD_SQL_CONNECTION_NAME`    | `YOUR_PROJECT_ID:REGION:YOUR_INSTANCE_NAME`                        |
| `DATABASE_NAME`                | `your_database_name`                                               |
| `DATABASE_USER`                | `your_db_username`                                                 |
| `FIREBASE_API_KEY`             | `your_firebase_api_key_here`                                       |
| `FIREBASE_AUTH_DOMAIN`         | `your_project_id.firebaseapp.com`                                  |
| `FIREBASE_PROJECT_ID`          | `your_firebase_project_id`                                         |
| `FIREBASE_STORAGE_BUCKET`      | `your_project_id.firebasestorage.app`                              |
| `FIREBASE_MESSAGING_SENDER_ID` | `your_messaging_sender_id`                                         |
| `FIREBASE_APP_ID`              | `your_firebase_app_id`                                             |
| `FIREBASE_DATABASE_URL`        | `https://your_project_id-default-rtdb.REGION.firebasedatabase.app` |
| `FIREBASE_CLIENT_EMAIL`        | `firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com`  |

### Step 5: Manual Deployment (First Time)

```bash
# Navigate to project root
cd /path/to/blend-design-system

# Build and push Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/blend-monitor apps/blend-monitor/
docker push gcr.io/YOUR_PROJECT_ID/blend-monitor

# Deploy to Cloud Run
gcloud run deploy blend-monitor \
  --image gcr.io/YOUR_PROJECT_ID/blend-monitor \
  --region YOUR_REGION \
  --platform managed \
  --allow-unauthenticated \
  --add-cloudsql-instances=YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME \
  --service-account=blend-monitor-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --set-env-vars="NODE_ENV=production,INSTANCE_CONNECTION_NAME=YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME,DATABASE_NAME=your_database_name,DATABASE_USER=your_db_username" \
  --set-secrets="DATABASE_PASSWORD=blend-monitor-db-password:latest,FIREBASE_PRIVATE_KEY=blend-monitor-firebase-key:latest" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --min-instances 0 \
  --max-instances 10
```

### Step 6: Automated Deployment (CI/CD)

After the first manual deployment, GitHub Actions will handle future deployments automatically when you push to the `main` branch.

## 🔍 Verification

1. **Check deployment status**:

    ```bash
    gcloud run services describe blend-monitor --region us-central1
    ```

2. **View logs**:

    ```bash
    gcloud run logs read --service blend-monitor --region us-central1
    ```

3. **Access your app**:
    - URL will be in format: `https://blend-monitor-[hash]-uc.a.run.app`

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure Cloud SQL instance allows connections from Cloud Run
- Verify the instance connection name is correct
- Check that the service account has Cloud SQL Client role

### Authentication Issues

- Verify Firebase credentials are correctly set in secrets
- Ensure CORS is configured for your domain

### Build Failures

- Check Docker build logs in Cloud Build history
- Verify all dependencies are installed correctly

## 📊 Monitoring

1. **Cloud Run Metrics**:
    - Go to Cloud Console > Cloud Run > blend-monitor
    - View metrics for requests, latency, errors

2. **Database Monitoring**:
    - Cloud SQL instance overview shows connections, CPU, memory

3. **Logs**:
    - Cloud Logging for application logs
    - Cloud SQL logs for database queries

## 🔄 Updating the Application

1. Make changes to your code
2. Commit and push to `main` branch
3. GitHub Actions will automatically deploy

Or manually:

```bash
gcloud builds submit --config=apps/blend-monitor/cloudbuild.yaml
```

## 🛡️ Security Best Practices

1. **Never commit secrets** to the repository
2. **Use Secret Manager** for sensitive data
3. **Restrict Cloud SQL** connections to Cloud Run only
4. **Enable audit logging** for production
5. **Set up alerts** for errors and high latency
6. **Rotate credentials regularly** (every 90 days minimum)
7. **Use strong passwords** (minimum 16 characters, mixed case, numbers, symbols)
8. **Enable 2FA** on all administrative accounts
9. **Monitor access logs** for suspicious activity
10. **Implement IP restrictions** where possible
11. **Regular security audits** of deployed resources
12. **Keep dependencies updated** to patch vulnerabilities

### 🔐 Credential Management Checklist

Before deployment, verify:

- [ ] All placeholder values have been replaced
- [ ] Strong, unique passwords are used
- [ ] Secrets are stored in Secret Manager, not environment variables
- [ ] Service account has minimal required permissions
- [ ] Database access is restricted to Cloud Run instances
- [ ] Firewall rules are properly configured
- [ ] SSL/TLS is enforced for all connections

## 📝 Environment Variables Reference

| Variable                   | Description              | Source         |
| -------------------------- | ------------------------ | -------------- |
| `NODE_ENV`                 | Environment (production) | Direct         |
| `DATABASE_PASSWORD`        | PostgreSQL password      | Secret Manager |
| `FIREBASE_PRIVATE_KEY`     | Firebase admin key       | Secret Manager |
| `INSTANCE_CONNECTION_NAME` | Cloud SQL connection     | Environment    |
| All `NEXT_PUBLIC_*` vars   | Firebase client config   | Environment    |

## 🚦 Health Checks

The application provides health endpoints:

- `/api/health` - Overall health status
- Database connectivity is checked on startup

## 📞 Support

For issues:

1. Check Cloud Run logs
2. Verify all secrets are set correctly
3. Ensure database is accessible
4. Check GitHub Actions logs for deployment errors
