#!/bin/bash

# Blend Monitor Deployment Script
# This script builds and deploys the Blend Monitor app to Firebase

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the deployment target (staging or production)
TARGET=${1:-staging}

echo -e "${YELLOW}🚀 Starting Blend Monitor deployment to ${TARGET}...${NC}"

# Navigate to project root
cd "$(dirname "$0")/../../.."

# Step 1: Build the Next.js app
echo -e "${YELLOW}📦 Building Next.js app...${NC}"
cd apps/blend-monitor
npm run build

# Step 2: Build Cloud Functions
echo -e "${YELLOW}🔧 Building Cloud Functions...${NC}"
cd functions
npm run build
cd ..

# Step 3: Deploy to Firebase
echo -e "${YELLOW}☁️  Deploying to Firebase...${NC}"
cd ../..

if [ "$TARGET" = "production" ]; then
    echo -e "${RED}⚠️  Production deployment requires confirmation${NC}"
    read -p "Are you sure you want to deploy to production? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Deployment cancelled${NC}"
        exit 1
    fi
    
    # Deploy database rules, functions, and hosting
    firebase deploy --only database,functions,hosting:blend-monitor --project storybook-452807
else
    # Deploy to staging (same project, but could use different hosting target if needed)
    firebase deploy --only database,functions,hosting:blend-monitor --project storybook-452807
fi

echo -e "${GREEN}✅ Deployment complete!${NC}"

# Display the URL
if [ "$TARGET" = "production" ]; then
    echo -e "${GREEN}🌐 App deployed to: https://blend-monitor.web.app${NC}"
else
    echo -e "${GREEN}🌐 App deployed to: https://blend-monitor.web.app${NC}"
fi

echo -e "${YELLOW}📊 View logs: firebase functions:log --project storybook-452807${NC}"
