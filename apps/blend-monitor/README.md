# Blend Monitor Dashboard

A real-time monitoring dashboard for the Blend Design System that tracks component usage, Code Connect integration status, and NPM package statistics.

## Features

### 🎯 Code Connect Integration Status

- **Component Coverage Dashboard**: Visual overview of Code Connect integration progress
- **Integration Health Monitor**: Track the health and validity of existing integrations
- **Component Details View**: Detailed view of each component's integration status

### 📦 NPM Package Publishing Trail

- **Package Dashboard**: Monitor the blend-v1 package lifecycle
- **Publishing History Timeline**: Comprehensive publishing audit trail
- **Download Analytics**: Track package adoption and usage trends

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase account with Realtime Database enabled
- NPM registry access

### Setup

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Configure Firebase**
    - Copy `.env.local.example` to `.env.local`
    - Add your Firebase configuration values

    ```bash
    cp .env.local.example .env.local
    ```

3. **Initialize Firebase Realtime Database**
    - Create a new Firebase project
    - Enable Realtime Database
    - Set up security rules (see below)

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3001](http://localhost:3001) to view the dashboard.

## Firebase Security Rules

Add these rules to your Firebase Realtime Database:

```json
{
    "rules": {
        "blend-monitor": {
            ".read": true,
            "components": {
                ".write": "auth != null && auth.token.role === 'admin'"
            },
            "coverage": {
                ".write": "auth != null"
            },
            "publishing": {
                ".write": "auth != null"
            }
        }
    }
}
```

## Architecture

### Data Flow

1. **Component Scanner** - Scans the Blend components directory
2. **NPM Client** - Fetches package statistics from NPM registry
3. **Firebase Realtime Database** - Stores and syncs data in real-time
4. **React Hooks** - Subscribe to real-time updates

### Key Components

- `MetricCard` - Displays key metrics using Blend's StatCard
- `ComponentScanner` - Analyzes component integration status
- `NPMClient` - Fetches NPM package statistics
- `useRealtimeData` - Custom hooks for Firebase subscriptions

## API Endpoints

- `GET /api/components` - Scan and return component data
- `POST /api/components` - Trigger component rescan
- `GET /api/npm` - Fetch NPM package statistics
- `POST /api/npm` - Refresh NPM data

## Development

### Running locally with the monorepo

```bash
# From the root of the monorepo
pnpm monitor:dev
```

### Building for production

```bash
# From the root of the monorepo
pnpm monitor:build
```

## Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI

    ```bash
    npm install -g firebase-tools
    ```

2. Initialize Firebase in the project

    ```bash
    firebase init
    ```

3. Build and deploy
    ```bash
    npm run build
    firebase deploy
    ```

## Future Enhancements

- [ ] Component usage analytics
- [ ] Team adoption tracking
- [ ] Performance monitoring
- [ ] GitHub integration
- [ ] Automated alerts
- [ ] Custom reports

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a PR

## License

Part of the Blend Design System
