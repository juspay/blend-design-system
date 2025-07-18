# Blend Monitor Dashboard

A comprehensive monitoring dashboard for the Blend Design System, providing real-time insights into NPM package statistics, Figma Code Connect health, and Firebase deployment metrics.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Firebase project with Realtime Database enabled
- Firebase service account credentials
- Google OAuth credentials (for authentication)

### Installation

1. **Clone and install dependencies:**

    ```bash
    cd apps/blend-monitor
    npm install
    ```

2. **Set up environment variables:**

    Copy `.env.local.example` to `.env.local` and fill in your credentials:

    ```bash
    cp .env.local.example .env.local
    ```

    Required environment variables:

    ```env
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

    # Firebase Admin (for server-side)
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_CLIENT_EMAIL=your-service-account-email
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

    # Google OAuth
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret

    # NextAuth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

3. **Set up Firebase:**

    a. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)

    b. Enable Realtime Database and set rules:

    ```json
    {
        "rules": {
            ".read": "auth != null",
            ".write": "auth != null"
        }
    }
    ```

    c. Generate a service account key:
    - Go to Project Settings > Service Accounts
    - Click "Generate new private key"
    - Save the JSON file or copy values to `.env.local`

4. **Populate initial data:**

    ```bash
    npm run populate-data
    ```

5. **Start the development server:**

    ```bash
    npm run dev
    ```

6. **Access the dashboard:**
    - Open http://localhost:3000
    - Sign in with your Google account

## 📊 Features

### 1. **NPM Package Monitoring**

- Real-time download statistics
- Version tracking
- Dependency analysis
- Package size monitoring

### 2. **Figma Code Connect Health**

- Component coverage metrics
- Connection status monitoring
- Missing connections alerts
- Component usage analytics

### 3. **Deployment Monitoring**

- **Hosting Status**: Monitor Firebase Hosting deployments
- **Cloud Functions**: Track function health and metrics
- **Performance Metrics**: Real-time performance data
- **Usage & Billing**: Firebase usage and cost tracking
- **Deployment History**: Complete deployment timeline

### 4. **Authentication**

- Google OAuth integration
- Protected routes
- User session management

## 🛠️ Development

### Project Structure

```
apps/blend-monitor/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── deployments/       # Deployment pages
│   ├── npm/              # NPM monitoring
│   └── code-connect/     # Figma monitoring
├── components/            # React components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and Firebase config
├── scripts/              # Data population scripts
└── types/               # TypeScript definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run populate-data` - Populate Firebase with sample data

## 🔄 Data Integration

### Automatic Data Updates

The dashboard automatically fetches data from Firebase on load. To capture real deployment data:

1. **GitHub Actions Integration:**

    ```yaml
    - name: Deploy to Firebase
      run: firebase deploy

    - name: Record Deployment
      run: |
          curl -X POST https://your-app.vercel.app/api/deployments/history \
            -H "Content-Type: application/json" \
            -d '{"environment": "production", "version": "v1.0.0"}'
    ```

2. **Manual Data Update:**
    ```bash
    npm run populate-data
    ```

### API Endpoints

- `POST /api/deployments/history` - Record new deployment
- `GET /api/deployments/performance` - Get performance metrics
- `GET /api/npm` - Fetch NPM statistics
- `GET /api/components` - Get component metrics

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## 🔒 Security

- Authentication required for all routes
- Firebase security rules enforce access control
- Environment variables for sensitive data
- API routes protected by NextAuth

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase app not initialized"**
    - Check all Firebase environment variables are set
    - Ensure service account credentials are valid

2. **"Authentication failed"**
    - Verify Google OAuth credentials
    - Check NEXTAUTH_URL matches your domain

3. **"No data showing"**
    - Run `npm run populate-data` to add sample data
    - Check Firebase Realtime Database rules

### Debug Mode

Set `NODE_ENV=development` for detailed error messages.

## 📝 License

Part of the Blend Design System - Internal Use Only
