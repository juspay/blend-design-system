# Firebase Hosting Setup Guide for Blend Monitor

## 📋 Prerequisites

Before deploying, ensure you have:

1. Firebase CLI installed (`npm install -g firebase-tools`)
2. Access to the Firebase project (`storybook-452807`)
3. Proper authentication (`firebase login`)

## 🚀 Step-by-Step Deployment Guide

### Step 1: Create a New Hosting Site in Firebase Console

1. **Go to Firebase Console**
    - Visit: https://console.firebase.google.com/
    - Select your project: `storybook-452807`

2. **Navigate to Hosting**
    - In the left sidebar, click on "Hosting"
    - Click "Add another site" or "Get started" if it's your first site

3. **Create the Hosting Site**
    - Click "Add custom domain" or "Add site"
    - Enter site name: `blend-monitor`
    - This will create: `blend-monitor.web.app`

### Step 2: Configure Firebase Hosting Target

The hosting target is already configured in `firebase.json`:

```json
{
    "hosting": [
        {
            "target": "blend-monitor",
            "public": "apps/blend-monitor/out",
            "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
            "rewrites": [
                {
                    "source": "/api/**",
                    "function": "api"
                },
                {
                    "source": "**",
                    "destination": "/index.html"
                }
            ]
        }
    ]
}
```

### Step 3: Apply Hosting Target

Run this command to link the hosting target to your site:

```bash
firebase target:apply hosting blend-monitor blend-monitor
```

This tells Firebase CLI that the "blend-monitor" target should deploy to the "blend-monitor" site.

### Step 4: Set Environment Variables for Cloud Functions

Before deploying, set the required environment variables:

```bash
# Set Firebase configuration
firebase functions:config:set \
  firebase.database_url="https://blend-monitor.asia-southeast1.firebasedatabase.app" \
  firebase.project_id="storybook-452807" \
  --project storybook-452807

# Set any other required configs
firebase functions:config:set \
  npm.registry_url="https://registry.npmjs.org" \
  --project storybook-452807
```

### Step 5: Deploy the Application

Now you can deploy using the script:

```bash
cd apps/blend-monitor
chmod +x scripts/deploy.sh  # Make script executable if needed
./scripts/deploy.sh
```

Or deploy manually:

```bash
# 1. Build the Next.js app
cd apps/blend-monitor
npm run build

# 2. Deploy to Firebase
firebase deploy --only hosting:blend-monitor,functions --project storybook-452807
```

### Step 6: Deploy Database Rules

After the main deployment, deploy the database rules:

```bash
cd apps/blend-monitor
./scripts/deploy-database-rules.sh
```

## 🔍 What Happens During Deployment

1. **Build Phase**:
    - Next.js builds static files → `out/` directory
    - Cloud Functions compile TypeScript → `functions/lib/`

2. **Upload Phase**:
    - Static files upload to Firebase Hosting CDN
    - Cloud Functions deploy to Google Cloud

3. **Configuration**:
    - Hosting rewrites `/api/*` → Cloud Functions
    - Database rules are applied

## ✅ Post-Deployment Verification

After deployment, verify everything is working:

1. **Visit your site**: https://blend-monitor.web.app
2. **Check Cloud Functions logs**:
    ```bash
    firebase functions:log --project storybook-452807
    ```
3. **Test API endpoints**:
    - https://blend-monitor.web.app/api/deployments/history
    - https://blend-monitor.web.app/api/npm

## 🔧 Troubleshooting

### Common Issues:

1. **"Site not found" error**
    - Ensure you created the site in Firebase Console
    - Run `firebase target:apply hosting blend-monitor blend-monitor`

2. **Functions not deploying**
    - Check Node.js version (should be 18 or 20)
    - Ensure all dependencies are installed: `cd functions && npm install`

3. **Authentication errors**
    - Verify Firebase Auth is enabled in console
    - Check environment variables are set correctly

4. **Database errors**
    - Ensure Realtime Database is created in the correct region
    - Deploy database rules: `./scripts/deploy-database-rules.sh`

## 🎯 Custom Domain (Optional)

To add a custom domain:

1. In Firebase Console → Hosting → Add custom domain
2. Follow the DNS verification steps
3. Update any CORS settings in Cloud Functions if needed

## 📝 Important URLs

- **Production Site**: https://blend-monitor.web.app
- **Firebase Console**: https://console.firebase.google.com/project/storybook-452807/hosting
- **Cloud Functions**: https://console.cloud.google.com/functions/list?project=storybook-452807

## 🚨 Security Checklist

Before going live:

- [ ] Verify database rules are properly secured
- [ ] Check API authentication is working
- [ ] Test role-based access control
- [ ] Review Cloud Functions environment variables
- [ ] Enable budget alerts in Google Cloud Console

---

## Quick Deploy Commands Summary

```bash
# One-time setup
firebase target:apply hosting blend-monitor blend-monitor

# Set environment variables
firebase functions:config:set \
  firebase.database_url="https://blend-monitor.asia-southeast1.firebasedatabase.app" \
  firebase.project_id="storybook-452807"

# Deploy everything
cd apps/blend-monitor
./scripts/deploy.sh

# Deploy database rules
./scripts/deploy-database-rules.sh
```

Your Blend Monitor app will be live at: **https://blend-monitor.web.app** 🎉
