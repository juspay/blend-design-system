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

## Technology Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes, PostgreSQL
- **UI Components**: Blend Design System (@juspay/blend-design-system)
- **Authentication**: Firebase Auth
- **Database**: PostgreSQL with custom service layer
- **External APIs**: NPM Registry API, Figma API

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Firebase project (for authentication)
- Environment variables configured

### Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Set up environment variables:

    ```bash
    cp .env.example .env.local
    ```

3. Initialize the database:

    ```bash
    npm run db:init
    ```

4. Run development server:
    ```bash
    npm run dev
    ```

### Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/blend_monitor

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=

# External APIs
NPM_API_BASE_URL=https://registry.npmjs.org
FIGMA_API_TOKEN=
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

### System

- `GET /api/health`: Health check endpoint
- `GET /api/activity/recent`: Get recent system activity

## Contributing

1. Follow the modular architecture pattern
2. Keep frontend and backend concerns separated
3. Use TypeScript for type safety
4. Write tests for new features
5. Update documentation as needed

## License

Internal use only - Juspay Technologies
