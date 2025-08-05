# Blend Monitor - Google Cloud Run Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. **Google Cloud Project**: Project ID `storybook-452807` (or your own)
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
# Database Password
echo -n "Juspay@123" | gcloud secrets create blend-monitor-db-password --data-file=-

# Firebase Private Key (save your key to a file first)
gcloud secrets create blend-monitor-firebase-key --data-file=firebase-private-key.txt
```

### Step 3: Create Service Account for Cloud Run

```bash
# Create service account
gcloud iam service-accounts create blend-monitor-sa \
  --display-name="Blend Monitor Service Account"

# Grant necessary permissions
gcloud projects add-iam-policy-binding storybook-452807 \
  --member="serviceAccount:blend-monitor-sa@storybook-452807.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding storybook-452807 \
  --member="serviceAccount:blend-monitor-sa@storybook-452807.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### Step 4: Configure GitHub Secrets

Add these secrets to your GitHub repository:

| Secret Name                    | Value                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `GCP_SA_KEY`                   | Service account JSON key                                                     |
| `CLOUD_SQL_CONNECTION_NAME`    | `storybook-452807:us-central1:your-instance`                                 |
| `DATABASE_NAME`                | `blend_monitor`                                                              |
| `DATABASE_USER`                | `admin`                                                                      |
| `FIREBASE_API_KEY`             | `AIzaSyD2aRkOI4iCwiZOW5kEejrL9jv9JvytKpo`                                    |
| `FIREBASE_AUTH_DOMAIN`         | `storybook-452807.firebaseapp.com`                                           |
| `FIREBASE_PROJECT_ID`          | `storybook-452807`                                                           |
| `FIREBASE_STORAGE_BUCKET`      | `storybook-452807.firebasestorage.app`                                       |
| `FIREBASE_MESSAGING_SENDER_ID` | `567047894553`                                                               |
| `FIREBASE_APP_ID`              | `1:567047894553:web:1cd999e1c9bf9b81ff5c88`                                  |
| `FIREBASE_DATABASE_URL`        | `https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app` |
| `FIREBASE_CLIENT_EMAIL`        | `firebase-adminsdk-fbsvc@storybook-452807.iam.gserviceaccount.com`           |

### Step 5: Manual Deployment (First Time)

```bash
# Navigate to project root
cd /path/to/blend-design-system

# Build and push Docker image
docker build -t gcr.io/storybook-452807/blend-monitor apps/blend-monitor/
docker push gcr.io/storybook-452807/blend-monitor

# Deploy to Cloud Run
gcloud run deploy blend-monitor \
  --image gcr.io/storybook-452807/blend-monitor \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --add-cloudsql-instances=storybook-452807:us-central1:your-instance \
  --service-account=blend-monitor-sa@storybook-452807.iam.gserviceaccount.com \
  --set-env-vars="NODE_ENV=production,INSTANCE_CONNECTION_NAME=storybook-452807:us-central1:your-instance,DATABASE_NAME=blend_monitor,DATABASE_USER=admin" \
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
