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
    echo "❌ Please specify an environment: dev or prod"
    echo "Usage: ./deploy.sh [dev|prod]"
    exit 1
fi

ENVIRONMENT=$1
ROOT_DIR=$(pwd)

# Load appropriate environment file
if [ "$ENVIRONMENT" = "dev" ]; then
    load_env ".env.dev"
elif [ "$ENVIRONMENT" = "prod" ]; then
    load_env ".env.prod"
else
    echo "❌ Invalid environment: $ENVIRONMENT"
    echo "Valid options: dev, prod"
    exit 1
fi

echo "🚀 Starting deployment for $ENVIRONMENT environment..."
echo "📍 Project: $FIREBASE_PROJECT_ID"
echo "🎯 Target: $FIREBASE_HOSTING_TARGET"
echo "🌐 URL: $DEPLOY_URL"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist

# Build Ascent app
echo "📚 Building Ascent documentation..."
cd apps/ascent
# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Ascent dependencies..."
    npm install
fi
npm run build
cd $ROOT_DIR

# Build Storybook
echo "📖 Building Storybook..."
cd apps/storybook
pnpm build-storybook
cd $ROOT_DIR

# Create dist directory
echo "📦 Preparing deployment package..."
mkdir -p dist

# Copy Ascent build to dist root
echo "📄 Copying Ascent files..."
cp -r apps/ascent/out/* dist/

# Copy Storybook build to dist/storybook
echo "📚 Copying Storybook files..."
mkdir -p dist/storybook
cp -r apps/storybook/storybook-static/* dist/storybook/

# Deploy to Firebase
echo "🌐 Deploying to $ENVIRONMENT ($FIREBASE_HOSTING_TARGET)..."
firebase deploy --only hosting:$FIREBASE_HOSTING_TARGET --project $FIREBASE_PROJECT_ID

echo "✅ Deployment complete!"
echo "🔗 View your deployment at: $DEPLOY_URL"
