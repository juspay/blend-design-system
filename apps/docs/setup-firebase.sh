#!/bin/bash

# Firebase Multi-Environment Setup Script
# This script sets up staging and production environments for Firebase Hosting

echo "🔥 Setting up Firebase Multi-Environment Hosting..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase first:"
    firebase login
fi

echo "📋 Current Firebase project: storybook-452807"

# Create hosting sites
echo "🏗️ Creating hosting sites..."
firebase hosting:sites:create blend-staging --project=storybook-452807
firebase hosting:sites:create blend-prod --project=storybook-452807

# Apply hosting targets
echo "🎯 Setting up hosting targets..."
firebase target:apply hosting blend-staging blend-staging
firebase target:apply hosting blend-prod blend-prod

echo "✅ Firebase hosting targets configured!"
echo ""
echo "🚀 You can now deploy using:"
echo "  npm run deploy:staging     - Deploy to staging"
echo "  npm run deploy:production  - Deploy to production"
echo "  npm run deploy:all         - Deploy to both environments"
echo ""
echo "📱 After deployment, your sites will be available at:"
echo "  Staging:    https://blend-staging.web.app"
echo "  Production: https://blend-prod.web.app"
echo ""
echo "🎉 Setup complete!"
