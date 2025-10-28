#!/bin/bash

# ============================================
# Cleanup Old Credentials Script
# ============================================
# ONLY RUN THIS AFTER 24-48 HOURS OF SUCCESSFUL OPERATION
# This script deletes old Firebase credentials
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
PROJECT_ID="storybook-452807"

echo -e "${RED}=====================================${NC}"
echo -e "${RED}Old Credential Cleanup${NC}"
echo -e "${RED}=====================================${NC}"
echo ""
echo -e "${RED}WARNING: This will permanently delete old credentials!${NC}"
echo -e "${RED}Only proceed if the application has been working correctly${NC}"
echo -e "${RED}for at least 24-48 hours with the new credentials.${NC}"
echo ""
echo -e "${YELLOW}Have you verified that the application is working? (yes/no)${NC}"
read CONFIRMED

if [ "$CONFIRMED" != "yes" ]; then
    echo -e "${YELLOW}Cleanup cancelled. Run this script again when ready.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}[1/3] Listing service accounts...${NC}"
echo ""
gcloud iam service-accounts list --project=$PROJECT_ID --format="table(email,displayName)"
echo ""
echo -e "${YELLOW}Enter the email of the OLD service account to delete:${NC}"
read OLD_SA_EMAIL

if [ -z "$OLD_SA_EMAIL" ]; then
    echo -e "${RED}No service account email provided. Exiting.${NC}"
    exit 1
fi

echo ""
echo -e "${RED}You are about to delete: $OLD_SA_EMAIL${NC}"
echo -e "${YELLOW}Type 'DELETE' to confirm:${NC}"
read CONFIRM_DELETE

if [ "$CONFIRM_DELETE" != "DELETE" ]; then
    echo -e "${YELLOW}Deletion cancelled.${NC}"
    exit 0
fi

# Delete old service account
echo ""
echo -e "${YELLOW}[2/3] Deleting old service account...${NC}"
gcloud iam service-accounts delete $OLD_SA_EMAIL \
  --project=$PROJECT_ID \
  --quiet

echo -e "${GREEN}✓ Old service account deleted${NC}"
echo ""

# List and optionally delete old secret versions
echo -e "${YELLOW}[3/3] Managing old secret versions...${NC}"
echo ""
echo "Secret versions for 'blend-monitor-firebase-key':"
gcloud secrets versions list blend-monitor-firebase-key \
  --project=$PROJECT_ID \
  --format="table(name,state,createTime)"

echo ""
echo -e "${YELLOW}Do you want to disable old secret versions? (yes/no)${NC}"
read DISABLE_SECRETS

if [ "$DISABLE_SECRETS" == "yes" ]; then
    echo ""
    echo -e "${YELLOW}Enter the version number(s) to disable (space-separated):${NC}"
    read -a VERSIONS_TO_DISABLE

    for VERSION in "${VERSIONS_TO_DISABLE[@]}"; do
        echo "Disabling version $VERSION..."
        gcloud secrets versions disable $VERSION \
          --secret=blend-monitor-firebase-key \
          --project=$PROJECT_ID
        echo -e "${GREEN}✓ Version $VERSION disabled${NC}"
    done
else
    echo -e "${YELLOW}Keeping all secret versions (you can disable them later)${NC}"
fi

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Cleanup Complete!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Cleaned up:"
echo "  - Deleted service account: $OLD_SA_EMAIL"
if [ "$DISABLE_SECRETS" == "yes" ]; then
    echo "  - Disabled secret versions: ${VERSIONS_TO_DISABLE[*]}"
fi
echo ""
echo -e "${YELLOW}Remaining tasks:${NC}"
echo "1. Delete local key files if not already done:"
echo "   rm firebase-new-key-*.json firebase-new-private-key.txt"
echo ""
echo "2. If you have old Firebase Web Apps, delete them from:"
echo "   https://console.firebase.google.com/project/$PROJECT_ID/settings/general"
echo ""
echo "3. Document this rotation in FIREBASE_CREDENTIAL_ROTATION.md"
echo ""
