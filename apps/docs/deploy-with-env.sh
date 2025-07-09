#!/bin/bash

# Exit on error
set -e

# Function to load environment variables
load_env() {
    local env_file=$1
    if [ -f "$env_file" ]; then
        echo "📋 Loading environment from $env_file"
        export $(cat "$env_file" | grep -v '^#' | xargs)
    else
        echo "❌ Environment file $env_file not found!"
        exit 1
    fi
}

# Check for environment argument
if [ -z "$1" ]; then
    echo "❌ Please specify an environment: staging or production"
    echo "Usage: ./deploy-with-env.sh [staging|production]"
    exit 1
fi

ENVIRONMENT=$1

# Store the current directory
DOCS_DIR=$(pwd)
ROOT_DIR=$(cd ../.. && pwd)

# Load appropriate environment file
if [ "$ENVIRONMENT" = "staging" ]; then
    load_env "$ROOT_DIR/.env.staging"
    HOSTING_TARGET=$FIREBASE_HOSTING_TARGET_STAGING
    CACHE_MAX_AGE=$STAGING_CACHE_MAX_AGE
    DEPLOY_URL=$STAGING_URL
elif [ "$ENVIRONMENT" = "production" ]; then
    load_env "$ROOT_DIR/.env.production"
    HOSTING_TARGET=$FIREBASE_HOSTING_TARGET_PROD
    CACHE_MAX_AGE=$PRODUCTION_CACHE_MAX_AGE
    DEPLOY_URL=$PRODUCTION_URL
else
    echo "❌ Invalid environment: $ENVIRONMENT"
    echo "Valid options: staging, production"
    exit 1
fi

echo "🚀 Starting deployment process for $ENVIRONMENT environment..."
echo "📍 Project: $FIREBASE_PROJECT_ID"
echo "🎯 Target: $HOSTING_TARGET"
echo "🌐 URL: $DEPLOY_URL"
echo "⏱️  Cache: $CACHE_MAX_AGE seconds"

# Build the docs app
echo "📚 Building docs app..."
npm run build

# Build the storybook app
echo "📖 Building storybook app..."
cd $ROOT_DIR/apps/storybook
pnpm build-storybook

# Go back to docs directory
cd $DOCS_DIR

# Copy storybook build to docs output
echo "📦 Copying storybook to docs output..."
mkdir -p out/storybook
cp -r $ROOT_DIR/apps/storybook/storybook-static/* out/storybook/

# Deploy to Firebase
echo "🌐 Deploying to $ENVIRONMENT ($HOSTING_TARGET)..."
firebase deploy --only hosting:$HOSTING_TARGET --project $FIREBASE_PROJECT_ID

echo "✅ Deployment complete!"
echo "🔗 View your deployment at: $DEPLOY_URL"
