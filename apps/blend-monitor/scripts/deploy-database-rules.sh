#!/bin/bash

# Deploy Firebase Realtime Database rules
echo "Deploying Firebase Realtime Database rules..."

# Navigate to the blend-monitor directory
cd "$(dirname "$0")/.."

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI is not installed. Please install it with: npm install -g firebase-tools"
    exit 1
fi

# Deploy only database rules
firebase deploy --only database

echo "Database rules deployment complete!"
