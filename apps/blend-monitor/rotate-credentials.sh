#!/bin/bash

# ============================================
# Firebase Credential Rotation Script
# ============================================
# This script automates the Firebase credential rotation process
# Run with: ./rotate-credentials.sh
# ============================================

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
NEW_SA_NAME="blend-firebase-$(date +%m%d%H%M)"

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Firebase Credential Rotation Script${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

# Step 1: Verify prerequisites
echo -e "${YELLOW}[1/7] Verifying prerequisites...${NC}"

if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI not found. Please install it first.${NC}"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq not found. Please install it first (brew install jq).${NC}"
    exit 1
fi

# Check if authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo -e "${RED}Error: Not authenticated to gcloud. Run 'gcloud auth login' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""

# Step 2: Create new service account
echo -e "${YELLOW}[2/7] Creating new Firebase service account...${NC}"

if gcloud iam service-accounts describe ${NEW_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --project=$PROJECT_ID &> /dev/null; then
    echo -e "${YELLOW}Service account already exists, skipping creation${NC}"
else
    gcloud iam service-accounts create $NEW_SA_NAME \
      --display-name="Blend Monitor Firebase (Rotated $(date +%Y-%m-%d))" \
      --project=$PROJECT_ID

    echo -e "${GREEN}✓ Service account created${NC}"
fi

# Grant Firebase Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${NEW_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/firebase.admin" \
  --quiet

echo -e "${GREEN}✓ Firebase Admin role granted${NC}"
echo ""

# Step 3: Generate new private key
echo -e "${YELLOW}[3/7] Generating new service account key...${NC}"

KEY_FILE="firebase-new-key-$(date +%Y%m%d).json"
gcloud iam service-accounts keys create $KEY_FILE \
  --iam-account=${NEW_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

echo -e "${GREEN}✓ Private key saved to: $KEY_FILE${NC}"
echo ""

# Step 4: Extract key components
echo -e "${YELLOW}[4/7] Extracting key components...${NC}"

PRIVATE_KEY=$(cat $KEY_FILE | jq -r '.private_key')
CLIENT_EMAIL=$(cat $KEY_FILE | jq -r '.client_email')
PROJECT_ID_FROM_KEY=$(cat $KEY_FILE | jq -r '.project_id')

echo "$PRIVATE_KEY" > firebase-new-private-key.txt

echo -e "${GREEN}✓ Key components extracted${NC}"
echo -e "  Client Email: ${CLIENT_EMAIL}"
echo -e "  Project ID: ${PROJECT_ID_FROM_KEY}"
echo ""

# Step 5: Update GCP Secret Manager
echo -e "${YELLOW}[5/7] Updating GCP Secret Manager...${NC}"

# Check if secret exists, if not create it
if ! gcloud secrets describe blend-monitor-firebase-key --project=$PROJECT_ID &> /dev/null; then
    echo "Creating new secret..."
    gcloud secrets create blend-monitor-firebase-key \
      --data-file=firebase-new-private-key.txt \
      --project=$PROJECT_ID
else
    echo "Adding new version to existing secret..."
    gcloud secrets versions add blend-monitor-firebase-key \
      --data-file=firebase-new-private-key.txt \
      --project=$PROJECT_ID
fi

LATEST_VERSION=$(gcloud secrets versions list blend-monitor-firebase-key \
  --project=$PROJECT_ID \
  --limit=1 \
  --format="value(name)")

echo -e "${GREEN}✓ Secret updated (version: $LATEST_VERSION)${NC}"
echo ""

# Step 6: Display GitHub Secrets to update
echo -e "${YELLOW}[6/7] GitHub Secrets that need manual update...${NC}"
echo -e "${YELLOW}================================================${NC}"
echo ""
echo "Go to: https://github.com/juspay/blend-design-system/settings/secrets/actions"
echo ""
echo "Update the following secret:"
echo -e "  ${GREEN}FIREBASE_CLIENT_EMAIL${NC} = ${CLIENT_EMAIL}"
echo ""
echo "Note: If you regenerated the Web API key, also update:"
echo -e "  ${GREEN}FIREBASE_API_KEY${NC} = <new API key from Firebase Console>"
echo ""
echo -e "${YELLOW}Press Enter after updating GitHub secrets...${NC}"
read

# Step 7: Instructions for deployment
echo -e "${YELLOW}[7/7] Next Steps${NC}"
echo -e "${YELLOW}===============${NC}"
echo ""
echo "1. Trigger deployment with new credentials:"
echo -e "   ${GREEN}git commit --allow-empty -m 'chore: rotate Firebase credentials'${NC}"
echo -e "   ${GREEN}git push origin main${NC}"
echo ""
echo "2. Monitor deployment:"
echo -e "   ${GREEN}gcloud run logs read --service=$SERVICE_NAME --region=$REGION --follow${NC}"
echo ""
echo "3. Verify application works (wait for deployment to complete):"
echo -e "   ${GREEN}./verify-deployment.sh${NC}"
echo ""
echo "4. After 24-48 hours of successful operation, clean up old credentials:"
echo -e "   ${GREEN}./cleanup-old-credentials.sh${NC}"
echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Credential rotation preparation complete!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Files created:"
echo "  - $KEY_FILE (KEEP SECURE - delete after verification)"
echo "  - firebase-new-private-key.txt (KEEP SECURE - delete after verification)"
echo ""
echo -e "${RED}IMPORTANT: Keep these files secure and delete them after successful deployment!${NC}"
