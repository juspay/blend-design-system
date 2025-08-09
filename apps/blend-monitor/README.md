# Blend Monitor

A monitoring dashboard for the Blend Design System, tracking component usage, NPM statistics, and integration health.

## Architecture

The application follows a modular architecture with clear separation between frontend and backend concerns:

```
apps/blend-monitor/
├── app/                    # Next.js App Router (re-exports from src/)
│   ├── api/               # API route re-exports
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage re-export
├── src/                    # Source code with modular separation
│   ├── backend/           # Backend logic and services
│   │   ├── api/          # API route implementations
│   │   ├── external/     # External service integrations
│   │   ├── lib/          # Backend utilities and services
│   │   └── scanners/     # Component scanning logic
│   ├── frontend/          # Frontend components and logic
│   │   ├── app/          # Page components
│   │   ├── components/   # Reusable UI components
│   │   ├── contexts/     # React contexts
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Frontend utilities
│   └── shared/            # Shared types and constants
│       └── types/        # TypeScript type definitions
├── database/              # Database schema and migrations
├── scripts/               # Utility scripts
└── public/                # Static assets
```

## Key Features

- **Component Monitoring**: Track Blend Design System component usage and coverage
- **NPM Statistics**: Monitor download trends and package versions
- **Code Connect Integration**: Track Figma Code Connect adoption
- **User Management**: Role-based access control for team members
- **Activity Tracking**: Real-time activity feed and audit logs
- **Tokenizer Module**: Comprehensive design token customization and theme management system

## Technology Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes, PostgreSQL
- **UI Components**: Blend Design System (blend-v1)
- **Authentication**: Firebase Auth
- **Database**: PostgreSQL with custom service layer
- **External APIs**: NPM Registry API, Figma API

## Development

> 📖 **For comprehensive step-by-step setup instructions, see the [Development Setup Guide](./docs/Development-Setup-Guide.md)**

### Prerequisites

- Node.js 18+
- Google Cloud SDK (gcloud CLI)
- Access to Google Cloud SQL instance
- Firebase project (for authentication)
- Environment variables configured

### One-Time Setup

1. **Install dependencies:**

    ```bash
    # From project root
    pnpm install
    ```

2. **Set up Google Cloud authentication:**

    ```bash
    # Login to Google Cloud
    gcloud auth login

    # Set project
    gcloud config set project storybook-452807
    ```

3. **Download Cloud SQL Proxy:**

    ```bash
    # From project root directory
    curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
    chmod +x cloud_sql_proxy
    ```

4. **Configure environment variables:**
    ```bash
    # Copy and configure environment file
    cp apps/blend-monitor/.env.example apps/blend-monitor/.env.local
    ```

### Daily Development Workflow

**Every time you start development, follow these steps:**

1. **Start Cloud SQL Proxy:**

    ```bash
    # From project root directory
    ./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
    ```

    ✅ **Success indicators:**
    - You'll see: `Ready for new connections`
    - Proxy listens on `localhost:5433`

2. **Start development server:**

    ```bash
    cd apps/blend-monitor
    npm run dev
    ```

    ✅ **Success indicators:**
    - Server starts on `http://localhost:3000`
    - Database connections show: `Database connected successfully`

3. **Access the application:**
    - **Main Dashboard:** http://localhost:3000
    - **Tokenizer:** http://localhost:3000/tokenizer
    - **API Test:** http://localhost:3000/api-test

### Environment Variables

Your `.env.local` should contain:

```env
# Firebase Client Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD2aRkOI4iCwiZOW5kEejrL9jv9JvytKpo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=storybook-452807.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=storybook-452807
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storybook-452807.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=567047894553
NEXT_PUBLIC_FIREBASE_APP_ID=1:567047894553:web:1cd999e1c9bf9b81ff5c88
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app

# Firebase Admin Configuration (Private)
FIREBASE_PROJECT_ID=storybook-452807
FIREBASE_DATABASE_URL=https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@storybook-452807.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n[YOUR_PRIVATE_KEY]\n-----END PRIVATE KEY-----

# PostgreSQL Configuration (Google Cloud SQL via Cloud SQL Proxy)
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_NAME=blend_monitor
DATABASE_USER=admin
DATABASE_PASSWORD=Juspay@123

# Database URL for migrations and seeding (via Cloud SQL Proxy)
DATABASE_URL=postgresql://admin:Juspay@123@localhost:5433/blend_monitor

# Application Settings
NODE_ENV=development
```

### Troubleshooting

**Common Issues:**

1. **Port 5433 already in use:**

    ```bash
    # Check what's using the port
    lsof -i :5433

    # Kill the process if needed
    pkill -f cloud_sql_proxy
    ```

2. **Database connection errors:**

    ```bash
    # Verify Cloud SQL Proxy is running
    lsof -i :5433

    # Check proxy logs for errors
    # Restart proxy if needed
    ```

3. **SSL connection errors:**
    - The app is configured to disable SSL (Cloud SQL Proxy handles encryption)
    - No action needed - this is expected behavior

4. **Authentication errors:**
    ```bash
    # Re-authenticate with Google Cloud
    gcloud auth login
    gcloud auth application-default login
    ```

### Database Management

**Check token data:**

```bash
cd apps/blend-monitor
node scripts/check-tokens.js
```

**Seed token data (if needed):**

```bash
cd apps/blend-monitor
node scripts/seed-token-management.js
```

### Quick Start Script

Create a startup script for convenience:

```bash
# Create apps/blend-monitor/start-local.sh
#!/bin/bash
echo "🚀 Starting Blend Monitor Development Environment..."

# Start Cloud SQL Proxy
echo "📡 Starting Cloud SQL Proxy..."
cd ../..
./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
PROXY_PID=$!

# Wait for proxy to start
sleep 3

# Start development server
echo "🖥️  Starting development server..."
cd apps/blend-monitor
npm run dev

# Cleanup on exit
trap "kill $PROXY_PID" EXIT
```

Then run:

```bash
chmod +x apps/blend-monitor/start-local.sh
./apps/blend-monitor/start-local.sh
```

## Project Structure Details

### Backend (`/src/backend`)

The backend follows a service-oriented architecture:

- **API Routes** (`/api`): RESTful endpoints for data operations
    - `/api/components`: Component management and coverage
    - `/api/npm`: NPM package statistics and trends
    - `/api/users`: User management and activity tracking
    - `/api/health`: System health checks

- **Services** (`/lib`):
    - `database-service.ts`: PostgreSQL data access layer
    - `auth-middleware.ts`: Authentication and authorization
    - `firebase-admin.ts`: Firebase Admin SDK integration

- **External Integrations** (`/external`):
    - `npm-client.ts`: NPM Registry API client

- **Scanners** (`/scanners`):
    - `component-scanner.ts`: Automated component discovery

### Frontend (`/src/frontend`)

The frontend uses modern React patterns:

- **Pages** (`/app`): Next.js page components
    - Dashboard home page
    - NPM statistics page
    - Code Connect management
    - User management
    - Login page

- **Components** (`/components`):
    - `auth/`: Authentication components and guards
    - `dashboard/`: Dashboard-specific components
    - `shared/`: Reusable UI components

- **Hooks** (`/hooks`):
    - `usePostgreSQLData.ts`: Data fetching hooks

- **Contexts** (`/contexts`):
    - `AuthContext.tsx`: Authentication state management

### Shared (`/src/shared`)

Common types and interfaces used across frontend and backend:

- **Types** (`/types`):
    - Component interfaces
    - User and role types
    - API response types

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:init`: Initialize database schema
- `npm run cleanup`: Remove empty directories

## API Endpoints

### Components

- `GET /api/components`: Get all components with coverage
- `POST /api/components`: Scan and update components
- `GET /api/components/coverage`: Get coverage metrics
- `GET /api/components/coverage/categories`: Get coverage by category

### NPM

- `GET /api/npm`: Get NPM package info
- `GET /api/npm/stats`: Get download statistics
- `GET /api/npm/trends`: Get download trends
- `GET /api/npm/versions`: Get version history
- `POST /api/npm/sync`: Sync NPM data

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:userId`: Get user details
- `PUT /api/users/:userId/role`: Update user role
- `GET /api/users/activity`: Get user activity logs

### Tokenizer

- `GET /api/themes`: Get all themes
- `POST /api/themes`: Create new theme
- `GET /api/themes/:id`: Get specific theme
- `PUT /api/themes/:id`: Update theme
- `DELETE /api/themes/:id`: Delete theme
- `POST /api/tokens/validate`: Validate token configuration
- `POST /api/export/typescript`: Export theme as TypeScript
- `POST /api/export/json`: Export theme as JSON
- `POST /api/export/css`: Export theme as CSS

### System

- `GET /api/health`: Health check endpoint
- `GET /api/activity/recent`: Get recent system activity

## Documentation

### Product Requirements

- **[Tokenizer Module PRD](./docs/PRD-Tokenizer-Module.md)**: Comprehensive product requirements document for the design token customization system

## Contributing

1. Follow the modular architecture pattern
2. Keep frontend and backend concerns separated
3. Use TypeScript for type safety
4. Write tests for new features
5. Update documentation as needed

## License

Internal use only - Juspay Technologies
