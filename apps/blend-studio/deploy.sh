#!/bin/bash

# Blend Monitor - Google Cloud Run Deployment Script
# This script helps deploy the blend-monitor app to Google Cloud Run

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="storybook-452807"
REGION="us-central1"
SERVICE_NAME="blend-monitor"
INSTANCE_CONNECTION_NAME="storybook-452807:us-central1:blend-dashboard"

echo -e "${GREEN}🚀 Blend Monitor Deployment Script${NC}"
echo "=================================="

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Set the project
echo -e "\n${YELLOW}Setting project to ${PROJECT_ID}...${NC}"
gcloud config set project ${PROJECT_ID}

# Step 1: Enable required APIs
echo -e "\n${YELLOW}📋 Step 1: Enabling required GCP APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    secretmanager.googleapis.com \
    sqladmin.googleapis.com \
    compute.googleapis.com

echo -e "${GREEN}✅ APIs enabled successfully${NC}"

# Step 2: Create secrets
echo -e "\n${YELLOW}📋 Step 2: Creating secrets in Secret Manager...${NC}"

# Check if database password secret exists
if gcloud secrets describe blend-monitor-db-password &>/dev/null; then
    echo "Database password secret already exists"
else
    echo "Creating database password secret..."
    echo -n "Juspay@123" | gcloud secrets create blend-monitor-db-password --data-file=-
fi

# Check if Firebase private key secret exists
if gcloud secrets describe blend-monitor-firebase-key &>/dev/null; then
    echo "Firebase private key secret already exists"
else
    echo -e "${YELLOW}⚠️  Firebase private key secret needs to be created manually${NC}"
    echo "Please run:"
    echo 'echo -n "YOUR_FIREBASE_PRIVATE_KEY" | gcloud secrets create blend-monitor-firebase-key --data-file=-'
    echo -e "${YELLOW}Replace YOUR_FIREBASE_PRIVATE_KEY with your actual Firebase private key${NC}"
fi

# Step 3: Create service account
echo -e "\n${YELLOW}📋 Step 3: Setting up service account...${NC}"

# Check if service account exists
if gcloud iam service-accounts describe blend-monitor-sa@${PROJECT_ID}.iam.gserviceaccount.com &>/dev/null; then
    echo "Service account already exists"
else
    echo "Creating service account..."
    gcloud iam service-accounts create blend-monitor-sa \
        --display-name="Blend Monitor Service Account"
fi

# Grant permissions
echo "Granting permissions to service account..."
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:blend-monitor-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client" --quiet

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:blend-monitor-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor" --quiet

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:blend-monitor-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/run.invoker" --quiet

echo -e "${GREEN}✅ Service account configured${NC}"

# Step 4: Configure Docker
echo -e "\n${YELLOW}📋 Step 4: Configuring Docker for Google Container Registry...${NC}"
gcloud auth configure-docker --quiet

# Step 5: Build and deploy
echo -e "\n${YELLOW}📋 Step 5: Building and deploying to Cloud Run...${NC}"
echo "This may take 5-10 minutes..."

# Submit build
if gcloud builds submit --config=cloudbuild.yaml . ; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    
    # Get the service URL
    SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
        --region=${REGION} \
        --format='value(status.url)')
    
    echo -e "\n${GREEN}🎉 Your app is deployed!${NC}"
    echo "=================================="
    echo -e "URL: ${GREEN}${SERVICE_URL}${NC}"
    echo -e "\nNext steps:"
    echo "1. Visit your app at the URL above"
    echo "2. Sign in with your Google account"
    echo "3. Check the /api/health endpoint for system status"
    
    # Open in browser (macOS only)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "\n${YELLOW}Opening in browser...${NC}"
        open ${SERVICE_URL}
    fi
else
    echo -e "${RED}❌ Deployment failed. Check the logs above for errors.${NC}"
    exit 1
fi

# Additional info
echo -e "\n${YELLOW}📝 Useful commands:${NC}"
echo "View logs: gcloud run logs read --service=${SERVICE_NAME} --region=${REGION}"
echo "Check status: gcloud run services describe ${SERVICE_NAME} --region=${REGION}"
echo "Update service: gcloud builds submit --config=cloudbuild.yaml ."
