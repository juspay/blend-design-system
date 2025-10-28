# Firebase Credential Rotation Guide

## 🚨 URGENT: Credential Rotation Required

**Status**: Credentials were exposed in git commit history
**Risk Level**: HIGH
**Action Required**: Immediate rotation of all Firebase credentials

---

## Prerequisites

Before starting, ensure you have:

- [ ] Access to Firebase Console (https://console.firebase.google.com)
- [ ] Access to Google Cloud Console (https://console.cloud.google.com)
- [ ] Admin access to GitHub repository
- [ ] `gcloud` CLI authenticated (`gcloud auth login`)

---

## Part 1: Rotate Firebase Web API Key

### Step 1.1: Generate New Web API Key

```bash
# Option A: Regenerate via Firebase Console
# 1. Go to https://console.firebase.google.com
# 2. Select your project: storybook-452807
# 3. Go to Project Settings (gear icon) > General tab
# 4. Scroll to "Your apps" section
# 5. Find your Web App
# 6. Click "Regenerate API Key" or create a new Web App

# Option B: Use Firebase CLI
firebase apps:sdkconfig WEB > new-firebase-config.json
```

### Step 1.2: Extract New API Key

After regeneration, you'll receive new configuration values:

- `apiKey` - New Web API Key
- `authDomain` - Should remain the same
- `projectId` - Should remain the same
- `storageBucket` - Should remain the same
- `messagingSenderId` - Should remain the same
- `appId` - New if you created a new app

---

## Part 2: Rotate Firebase Service Account

### Step 2.1: Create New Service Account

```bash
# Set your project ID
export PROJECT_ID="storybook-452807"

# Create new service account
gcloud iam service-accounts create blend-monitor-firebase-new \
  --display-name="Blend Monitor Firebase (Rotated)" \
  --project=$PROJECT_ID

# Grant Firebase Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:blend-monitor-firebase-new@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/firebase.admin"

# Generate and download new private key
gcloud iam service-accounts keys create firebase-new-key.json \
  --iam-account=blend-monitor-firebase-new@${PROJECT_ID}.iam.gserviceaccount.com
```

### Step 2.2: Extract Private Key

```bash
# Extract the private key from the JSON file
cat firebase-new-key.json | jq -r '.private_key' > firebase-new-private-key.txt

# Extract client email
export NEW_CLIENT_EMAIL=$(cat firebase-new-key.json | jq -r '.client_email')
echo "New Client Email: $NEW_CLIENT_EMAIL"
```

---

## Part 3: Update GCP Secret Manager

### Step 3.1: Create New Secret Versions (Zero Downtime)

```bash
# Update Firebase private key secret
gcloud secrets versions add blend-monitor-firebase-key \
  --data-file=firebase-new-private-key.txt \
  --project=$PROJECT_ID

# Verify new version was created
gcloud secrets versions list blend-monitor-firebase-key --project=$PROJECT_ID
```

**Note**: We're adding a NEW VERSION, not deleting the old one yet. This allows rollback if needed.

---

## Part 4: Update GitHub Secrets

### Step 4.1: Update Repository Secrets

Go to: https://github.com/juspay/blend-design-system/settings/secrets/actions

Update the following secrets with NEW values:

| Secret Name             | New Value                                         |
| ----------------------- | ------------------------------------------------- |
| `FIREBASE_API_KEY`      | `<new API key from Step 1>`                       |
| `FIREBASE_CLIENT_EMAIL` | `<new client email from Step 2>`                  |
| `FIREBASE_APP_ID`       | `<new app ID if created new app, else keep same>` |

**Keep the same** (unless they changed):

- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_DATABASE_URL`

### Step 4.2: Verify Secrets Are Updated

```bash
# Check if workflow can access the secrets (this won't show values, just test)
gh secret list --repo juspay/blend-design-system
```

---

## Part 5: Deploy with New Credentials

### Option A: Trigger Deployment via GitHub Actions

```bash
# Create an empty commit to trigger deployment
git commit --allow-empty -m "chore: trigger deployment for Firebase credential rotation"
git push origin main
```

### Option B: Manual Deployment

```bash
# Navigate to project root
cd /Users/deepanshu.kumar/Documents/blend-design-system

# Trigger Cloud Build manually with new secrets
gcloud builds submit \
  --config=apps/blend-monitor/cloudbuild.yaml \
  --substitutions="_INSTANCE_CONNECTION_NAME=$CLOUD_SQL_CONNECTION_NAME,_DATABASE_NAME=$DATABASE_NAME,_DATABASE_USER=$DATABASE_USER,_FIREBASE_API_KEY=<NEW_API_KEY>,_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN,_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID,_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET,_FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID,_FIREBASE_APP_ID=<NEW_APP_ID>,_FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL,_FIREBASE_CLIENT_EMAIL=<NEW_CLIENT_EMAIL>" \
  --project=$PROJECT_ID \
  .
```

---

## Part 6: Verification

### Step 6.1: Check Deployment Status

```bash
# Check if deployment succeeded
gcloud run services describe blend-monitor \
  --region=us-central1 \
  --project=$PROJECT_ID \
  --format='value(status.latestReadyRevisionName)'

# View deployment logs
gcloud run logs read --service=blend-monitor --region=us-central1 --limit=50
```

### Step 6.2: Test Application Endpoints

```bash
# Get the service URL
export SERVICE_URL=$(gcloud run services describe blend-monitor \
  --region=us-central1 \
  --project=$PROJECT_ID \
  --format='value(status.url)')

# Test health endpoint
curl -s "$SERVICE_URL/api/health" | jq

# Test authentication endpoint (should reject without token)
curl -s -o /dev/null -w "%{http_code}" "$SERVICE_URL/api/users"
```

### Step 6.3: Test Firebase Authentication

**Manual Test**:

1. Open the application in browser: `echo $SERVICE_URL`
2. Try to sign in with test credentials
3. Verify authentication works
4. Check browser console for errors

**Expected**: Authentication should work seamlessly with new credentials.

---

## Part 7: Clean Up Old Credentials

⚠️ **WAIT 24-48 HOURS** before this step to ensure the new credentials work in production.

### Step 7.1: Delete Old Firebase Service Account

```bash
# List all service accounts to identify the old one
gcloud iam service-accounts list --project=$PROJECT_ID

# Delete old service account (replace with actual email)
gcloud iam service-accounts delete blend-monitor-firebase@${PROJECT_ID}.iam.gserviceaccount.com \
  --project=$PROJECT_ID

# Or if you used a different naming convention:
# gcloud iam service-accounts delete <OLD_CLIENT_EMAIL> --project=$PROJECT_ID
```

### Step 7.2: Delete Old Secret Versions

```bash
# List all versions of the secret
gcloud secrets versions list blend-monitor-firebase-key --project=$PROJECT_ID

# Delete old version (replace VERSION_NUMBER with the old version)
gcloud secrets versions destroy <OLD_VERSION_NUMBER> \
  --secret=blend-monitor-firebase-key \
  --project=$PROJECT_ID
```

### Step 7.3: Delete Old Web App (if created new one)

```bash
# Go to Firebase Console
# Project Settings > General > Your apps
# Delete the old Web App if you created a new one
```

---

## Part 8: Git History Cleanup

⚠️ **DANGEROUS OPERATION** - Coordinate with team before proceeding.

### Step 8.1: Find Commits with Exposed Credentials

```bash
# Search for commits that modified DEPLOYMENT.md
git log --all --full-history -- apps/blend-monitor/DEPLOYMENT.md

# Check specific commit for exposed values
git show <COMMIT_HASH>:apps/blend-monitor/DEPLOYMENT.md
```

### Step 8.2: Rewrite Git History (Use with Caution)

**Option A: Using BFG Repo-Cleaner (Recommended)**

```bash
# Download BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
mv bfg-1.14.0.jar bfg.jar

# Create a file with strings to replace
cat > credentials-to-remove.txt << EOF
YOUR_ACTUAL_API_KEY_THAT_WAS_EXPOSED
YOUR_ACTUAL_CLIENT_EMAIL_THAT_WAS_EXPOSED
YOUR_ACTUAL_PRIVATE_KEY_THAT_WAS_EXPOSED
EOF

# Run BFG to replace all occurrences
java -jar bfg.jar --replace-text credentials-to-remove.txt

# Clean up repository
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Option B: Interactive Rebase (if recent commits)**

```bash
# Rebase last N commits
git rebase -i HEAD~N

# In the editor, mark commits to edit
# When stopped at each commit, amend the file
# git add apps/blend-monitor/DEPLOYMENT.md
# git commit --amend
# git rebase --continue
```

### Step 8.3: Force Push (Coordinate with Team)

```bash
# ⚠️ WARNING: This rewrites history and affects all contributors
# Notify team before running this!

git push origin main --force-with-lease
```

---

## Part 9: Monitor for Unauthorized Access

### Step 9.1: Check Firebase Usage

```bash
# Go to Firebase Console
# https://console.firebase.google.com/project/storybook-452807/usage

# Check for:
# - Unusual authentication attempts
# - Unexpected API calls
# - Traffic spikes from unknown IPs
```

### Step 9.2: Check GCP Audit Logs

```bash
# View authentication logs
gcloud logging read "resource.type=firebase_account" \
  --limit=50 \
  --format=json \
  --project=$PROJECT_ID

# View admin activity
gcloud logging read "protoPayload.serviceName=firebaseauth.googleapis.com" \
  --limit=50 \
  --project=$PROJECT_ID
```

### Step 9.3: Set Up Alerts (Recommended)

```bash
# Create alert for unusual Firebase usage
gcloud alpha monitoring policies create \
  --notification-channels=<CHANNEL_ID> \
  --display-name="Firebase Unusual Activity" \
  --condition-display-name="High Auth Rate" \
  --condition-threshold-value=1000 \
  --condition-threshold-duration=60s
```

---

## Part 10: Prevent Future Exposure

### Step 10.1: Install Pre-commit Hook

```bash
# Install gitleaks for secret scanning
brew install gitleaks

# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
gitleaks protect --staged --verbose
EOF

chmod +x .git/hooks/pre-commit
```

### Step 10.2: Enable GitHub Secret Scanning

Go to: https://github.com/juspay/blend-design-system/settings/security_analysis

Enable:

- [x] Dependency graph
- [x] Dependabot alerts
- [x] Dependabot security updates
- [x] Secret scanning

---

## Rollback Plan (If Things Go Wrong)

### If New Credentials Don't Work:

```bash
# 1. Revert to previous secret version
gcloud secrets versions enable <OLD_VERSION> \
  --secret=blend-monitor-firebase-key \
  --project=$PROJECT_ID

# 2. Trigger new deployment
git commit --allow-empty -m "chore: rollback to previous credentials"
git push origin main

# 3. Update GitHub secrets back to old values
# Go to GitHub > Settings > Secrets and update manually
```

---

## Verification Checklist

After completing rotation, verify:

- [ ] Application deploys successfully
- [ ] Users can authenticate with Firebase
- [ ] No errors in Cloud Run logs
- [ ] Health endpoint returns 200 OK
- [ ] Database connections work
- [ ] No 401/403 errors in browser console
- [ ] Old service account is deleted
- [ ] Old secret versions are disabled
- [ ] Git history is cleaned (if applicable)
- [ ] Team is notified of rotation
- [ ] Monitoring alerts are set up

---

## Emergency Contacts

If issues occur:

1. Check Cloud Run logs: `gcloud run logs read --service=blend-monitor`
2. Check GitHub Actions: https://github.com/juspay/blend-design-system/actions
3. Revert using rollback plan above

---

## Notes

- **Total Downtime Expected**: ~0-2 minutes during deployment
- **Best Time to Rotate**: During off-peak hours
- **Team Notification**: Required before git history cleanup
- **Documentation**: Update this file with actual rotation date

---

## Rotation History

| Date       | Rotated By      | Reason                                                    | Status    |
| ---------- | --------------- | --------------------------------------------------------- | --------- |
| 2025-10-28 | Deepanshu Kumar | Firebase credentials exposed in DEPLOYMENT.md git history | Completed |

**Details:**

- **Old Service Account:** firebase-adminsdk-fbsvc@storybook-452807.iam.gserviceaccount.com (DELETED ✅)
- **New Service Account:** blend-firebase-10281134@storybook-452807.iam.gserviceaccount.com (ACTIVE ✅)
- **Old Firebase Web App:** 1:567047894553:web:1cd999e1c9bf9b81ff5c88 (DELETED ✅)
- **New Firebase Web App:** 1:567047894553:web:f2e38d23fbc9bdbbff5c88 (ACTIVE ✅)
- **Deployment:** blend-monitor-00007-pml (Cloud Run)
- **Downtime:** 0 minutes
- **Old Secret Version:** Disabled (version 1) ✅
- **Active Secret Version:** Version 2 ✅
- **Cleanup Completed:** 2025-10-28
