# Firebase Configuration Guide for Blend Monitor

This guide will walk you through setting up Firebase for the Blend Monitor dashboard.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "blend-monitor")
4. Follow the setup wizard (you can disable Google Analytics if not needed)

## Step 2: Enable Realtime Database

1. In your Firebase project dashboard, click on "Build" in the left sidebar
2. Select "Realtime Database"
3. Click "Create Database"
4. Choose a location for your database (select the closest to your users)
5. Start in "test mode" for now (we'll add security rules later)
6. Click "Enable"

## Step 3: Get Your Firebase Configuration

1. In the Firebase Console, click on the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the "</>" (Web) icon to add a web app
5. Register your app with a nickname (e.g., "Blend Monitor Dashboard")
6. You'll see your Firebase configuration object:

```javascript
const firebaseConfig = {
    apiKey: 'AIzaSy...',
    authDomain: 'your-project.firebaseapp.com',
    databaseURL: 'https://your-project.firebaseio.com',
    projectId: 'your-project',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef',
}
```

## Step 4: Update Your Environment Variables

1. Open the file `apps/blend-monitor/.env.local`
2. Replace the placeholder values with your actual Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... # Your actual API key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# NPM Registry API (optional - keep as is)
NPM_REGISTRY_API_URL=https://registry.npmjs.org
```

## Step 5: Set Up Security Rules

1. In Firebase Console, go to "Realtime Database"
2. Click on the "Rules" tab
3. Replace the default rules with:

```json
{
    "rules": {
        "blend-monitor": {
            ".read": true,
            ".write": true,
            "components": {
                ".read": true,
                ".write": true
            },
            "coverage": {
                ".read": true,
                ".write": true
            },
            "publishing": {
                ".read": true,
                ".write": true
            },
            "activity": {
                ".read": true,
                ".write": true
            }
        }
    }
}
```

4. Click "Publish"

**Note**: These rules allow read/write access to everyone. For production, you should implement proper authentication:

```json
{
    "rules": {
        "blend-monitor": {
            ".read": true, // Anyone can read
            "components": {
                ".write": "auth != null" // Only authenticated users can write
            },
            "coverage": {
                ".write": "auth != null"
            },
            "publishing": {
                ".write": "auth != null"
            },
            "activity": {
                ".write": "auth != null"
            }
        }
    }
}
```

## Step 6: Initialize the Database Structure (Optional)

You can manually create the initial structure in Firebase Console:

1. Go to "Realtime Database" > "Data" tab
2. Click the "+" button next to your database URL
3. Add a key called `blend-monitor`
4. Inside `blend-monitor`, add these keys:
    - `components` (leave empty, will be populated by the scanner)
    - `coverage` (leave empty)
    - `publishing` (leave empty)
    - `activity` (leave empty)

## Step 7: Test Your Configuration

1. Make sure your development server is running:

    ```bash
    cd apps/blend-monitor
    npm run dev
    ```

2. Open http://localhost:3001 in your browser

3. Check the browser console for any Firebase errors

4. The dashboard should now connect to Firebase successfully!

## Troubleshooting

### Common Issues:

1. **"Firebase error. Please ensure that you have the URL of your Firebase Realtime Database instance configured correctly"**
    - Make sure your `NEXT_PUBLIC_FIREBASE_DATABASE_URL` is correct
    - The URL should be in format: `https://your-project-id.firebaseio.com`

2. **"Permission denied" errors**
    - Check your security rules in Firebase Console
    - Make sure they allow read/write access as shown above

3. **Environment variables not loading**
    - Restart your development server after changing `.env.local`
    - Make sure all variable names start with `NEXT_PUBLIC_`

4. **No data showing in dashboard**
    - The dashboard will be empty initially
    - Click "Refresh" buttons to trigger data collection
    - Check API routes are working: http://localhost:3001/api/components

### Verify Firebase Connection

You can verify the connection by checking the Firebase Console:

1. Go to "Realtime Database" > "Data" tab
2. After refreshing data in the dashboard, you should see:
    - Component data under `blend-monitor/components`
    - Coverage metrics under `blend-monitor/coverage`
    - NPM data under `blend-monitor/publishing`

## Next Steps

Once Firebase is configured:

1. Use the dashboard to monitor your design system
2. Set up authentication for production use
3. Configure Firebase hosting if you want to deploy the dashboard
4. Set up Firebase Functions for automated data collection

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Firebase Security Rules](https://firebase.google.com/docs/database/security)
