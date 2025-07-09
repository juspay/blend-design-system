#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Store the current directory
DOCS_DIR=$(pwd)
ROOT_DIR=$(cd ../.. && pwd)

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

# Deploy based on the argument
if [ "$1" = "staging" ]; then
    echo "🌐 Deploying to staging..."
    firebase deploy --only hosting:blend-staging
elif [ "$1" = "production" ]; then
    echo "🌐 Deploying to production..."
    firebase deploy --only hosting:blend-prod
else
    echo "❌ Please specify 'staging' or 'production' as an argument"
    echo "Usage: ./deploy-with-storybook.sh [staging|production]"
    exit 1
fi

echo "✅ Deployment complete!"
