# Data Flow in Blend Monitor Dashboard

## Overview

The dashboard collects data from two main sources:

1. **Local Component Scanner** - Analyzes your Blend Design System components
2. **NPM Registry API** - Fetches package statistics for blend-v1

## Data Collection Process

### 1. Initial Page Load

When you open the dashboard, it triggers API calls to collect data:

```
Dashboard → API Routes → Data Sources → Firebase
```

### 2. Component Data (`/api/components`)

The component scanner analyzes your local codebase:

**Source**: `packages/blend/lib/components/` directory

**Process**:

1. Scans all component directories
2. Checks for:
    - Figma Code Connect files (`*.figma.tsx`)
    - Storybook stories (`*.stories.tsx`)
    - Test files (`*.test.tsx`)
3. Categorizes components (inputs, buttons, etc.)
4. Calculates coverage metrics
5. Saves to Firebase under `blend-monitor/components`

**Trigger**:

- Automatic on page load
- Manual via "Refresh" button

### 3. NPM Data (`/api/npm`)

Fetches package data from NPM registry:

**Source**: https://registry.npmjs.org/blend-v1

**Process**:

1. Fetches package metadata
2. Gets download statistics
3. Retrieves version history
4. Calculates trends
5. Saves to Firebase under `blend-monitor/publishing`

**Trigger**:

- Automatic on page load
- Manual via "Refresh" button

## How to Populate Data

### Method 1: Using the Dashboard UI

1. **For Component Data**:
    - Go to http://localhost:3001/code-connect
    - Click the "Refresh" button
    - This triggers the component scanner

2. **For NPM Data**:
    - Go to http://localhost:3001/npm
    - Click the "Refresh" button
    - This fetches latest NPM statistics

### Method 2: Direct API Calls

You can trigger data collection via API:

```bash
# Scan components and update Firebase
curl -X POST http://localhost:3001/api/components

# Fetch NPM data and update Firebase
curl -X POST http://localhost:3001/api/npm
```

### Method 3: Check API Endpoints

To see what data will be collected:

```bash
# View component scan results
curl http://localhost:3001/api/components

# View NPM statistics
curl http://localhost:3001/api/npm
```

## Firebase Database Structure

After data collection, your Firebase should have:

```
blend-monitor/
├── components/
│   ├── button/
│   │   ├── info/
│   │   │   ├── name: "Button"
│   │   │   ├── category: "inputs"
│   │   │   └── path: "packages/blend/lib/components/Button"
│   │   └── integration/
│   │       ├── hasFigmaConnect: true/false
│   │       ├── hasStorybook: true/false
│   │       └── hasTests: true/false
│   └── [other components...]
├── coverage/
│   ├── summary/
│   │   ├── total: 25
│   │   ├── integrated: 10
│   │   └── percentage: 40
│   └── byCategory/
│       ├── inputs/
│       └── buttons/
├── publishing/
│   ├── current/
│   │   ├── version: "0.2.44"
│   │   └── publishedAt: "2024-..."
│   ├── downloads/
│   │   ├── daily: 150
│   │   ├── weekly: 1200
│   │   └── monthly: 5000
│   └── versions/
│       └── 0_2_44/
└── activity/
    └── recent/
        └── [timestamp]/
```

## Troubleshooting No Data

If you see no data in Firebase:

1. **Check API Routes are Working**:

    ```bash
    # Should return component data
    curl http://localhost:3001/api/components

    # Should return NPM data
    curl http://localhost:3001/api/npm
    ```

2. **Check Browser Console**:
    - Open DevTools (F12)
    - Look for Firebase errors
    - Check Network tab for failed API calls

3. **Verify Firebase Rules**:
    - Ensure rules allow write access
    - Check Firebase Console for permission errors

4. **Manual Data Trigger**:
    - Use the Refresh buttons in the UI
    - Or use the curl commands above

5. **Check Component Scanner Path**:
    - Verify `packages/blend/lib/components/` exists
    - Ensure components follow expected structure

## Real-time Updates

Once data is in Firebase:

- All connected clients see updates instantly
- Changes in Firebase Console reflect in dashboard
- Multiple users can view synchronized data

## Data Sources Summary

| Data Type  | Source                     | Update Method             |
| ---------- | -------------------------- | ------------------------- |
| Components | Local filesystem scan      | Refresh button or API     |
| Coverage   | Calculated from components | Automatic with components |
| NPM Stats  | NPM Registry API           | Refresh button or API     |
| Versions   | NPM Registry API           | Automatic with NPM stats  |
| Activity   | Generated on actions       | Automatic on updates      |
