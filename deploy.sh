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

# Load base .env first (contains shared secrets like GROQ_API_KEY, FIGMA_ACCESS_TOKEN)
if [ -f ".env" ]; then
    echo "📋 Loading base environment from .env"
    export $(cat ".env" | grep -v '^#' | xargs)
fi

# Load appropriate environment file (overrides base values if needed)
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
# Next.js can leave a corrupted .next manifest after interrupted builds; that
# surfaces as PageNotFoundError/ENOENT during "Collecting page data" (e.g. /changelog).
rm -rf apps/ascent/.next

# Install monorepo deps if needed (this repo is pnpm-first; workspace:* breaks under npm-only install)
if [ ! -d "node_modules" ]; then
    echo "📦 Installing workspace dependencies with pnpm..."
    pnpm install
fi

# Sync changelog before building
echo "📝 Syncing changelog..."
pnpm sync-changelog --latest || echo "⚠️ Changelog sync failed, continuing with existing files"

# Format newly generated changelog files
echo "✨ Formatting changelog files..."
pnpm prettier --write "apps/ascent/app/changelog/content/*.mdx" 2>/dev/null || true

# Commit any newly generated changelog files via PR
echo "📝 Committing new changelog files..."
git add apps/ascent/app/changelog/content/
if ! git diff --staged --quiet; then
    git config user.name "$(git config --global user.name)"
    git config user.email "$(git config --global user.email)"

    # Check if GitHub CLI is installed, if not install it
    if ! command -v gh &> /dev/null; then
        echo "⚙️ GitHub CLI not found, installing..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install gh
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
            sudo apt update && sudo apt install gh -y
        else
            echo "❌ Unsupported OS, please install GitHub CLI manually: https://cli.github.com"
            exit 1
        fi
        echo "✅ GitHub CLI installed!"
    else
        echo "✅ GitHub CLI found: $(gh --version | head -1)"
    fi

    # Check if authenticated, if not trigger login
    if ! gh auth status &> /dev/null; then
        echo "🔐 GitHub CLI is not authenticated. Launching login..."
        gh auth login
        # Verify auth succeeded
        if ! gh auth status &> /dev/null; then
            echo "❌ GitHub authentication failed. Aborting PR creation."
            exit 1
        fi
        echo "✅ GitHub CLI authenticated!"
    else
        echo "✅ GitHub CLI already authenticated"
    fi

    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    PR_BRANCH="chore/sync-changelog-$(date +'%Y%m%d-%H%M%S')"

    git checkout -b $PR_BRANCH
    git commit -m "chore: sync changelog"
    git push origin $PR_BRANCH

    gh pr create \
        --title "chore: sync changelog" \
        --body "Automated changelog sync from deploy script" \
        --base $CURRENT_BRANCH \
        --head $PR_BRANCH \
        || echo "⚠️ PR creation failed, check manually"

    git checkout $CURRENT_BRANCH
    git branch -D $PR_BRANCH
fi

# Build Ascent app
echo "📚 Building Ascent documentation..."
pnpm --filter ascent run build

# Build Storybook
echo "📖 Building Storybook..."
pnpm --filter storybook run build-storybook

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
