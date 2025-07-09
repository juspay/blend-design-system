# Firebase App

A Next.js application with Firebase authentication and Realtime Database integration.

## Features

- 🔐 Firebase Authentication (Email/Password)
- 🗄️ Firebase Realtime Database integration
- 🚀 Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 🔒 Protected API routes with Firebase Admin
- 📱 Responsive design

## Setup

### 1. Install Dependencies

```bash
cd apps/firebase-app
pnpm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Realtime Database
4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

### 3. Environment Variables

Copy `env.example` to `.env.local` and fill in your Firebase configuration:

```bash
cp env.example .env.local
```

Update the following variables in `.env.local`:

**Client Configuration (Public):**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`

**Admin Configuration (Private):**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_DATABASE_URL`

### 4. Run the Application

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

### `/api/ping`
- **Method:** GET
- **Authentication:** Required (Bearer token)
- **Description:** Test endpoint to verify backend connectivity

### `/api/users`
- **Method:** GET
- **Authentication:** Required (Bearer token)
- **Description:** Retrieve all users from Realtime Database

- **Method:** POST
- **Authentication:** Required (Bearer token)
- **Body:** `{ name: string, email: string, age?: number }`
- **Description:** Create a new user in Realtime Database

## Usage

1. **Sign Up/Sign In:** Use the authentication form to create an account or sign in
2. **Test Backend:** Once authenticated, click "Test Backend" to verify API connectivity
3. **Sign Out:** Use the sign out button to log out

## Project Structure

```
firebase-app/
├── app/
│   ├── api/
│   │   ├── ping/
│   │   │   └── route.ts          # Ping API endpoint
│   │   └── users/
│   │       └── route.ts          # Users API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page with auth UI
├── lib/
│   ├── firebase.ts               # Client-side Firebase config
│   └── firebase-admin.ts         # Server-side Firebase Admin config
├── public/                       # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Security

- All API routes are protected with Firebase token verification
- Client-side Firebase config uses public keys only
- Server-side operations use Firebase Admin SDK with service account
- Environment variables are properly separated for client/server

## Development

- **TypeScript:** Full type safety throughout the application
- **ESLint:** Code linting with Next.js configuration
- **Tailwind CSS:** Utility-first CSS framework
- **Firebase:** Real-time database and authentication 