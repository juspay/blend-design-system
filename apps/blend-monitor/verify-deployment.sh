#!/bin/bash

# ============================================
# Deployment Verification Script
# ============================================
# Verifies that the application is working after credential rotation
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
PROJECT_ID="storybook-452807"
REGION="us-central1"
SERVICE_NAME="blend-monitor"

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Deployment Verification${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

# Get service URL
echo -e "${YELLOW}[1/5] Retrieving service URL...${NC}"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format='value(status.url)')

echo -e "${GREEN}✓ Service URL: $SERVICE_URL${NC}"
echo ""

# Check deployment status
echo -e "${YELLOW}[2/5] Checking deployment status...${NC}"
LATEST_REVISION=$(gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format='value(status.latestReadyRevisionName)')

SERVING_STATUS=$(gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format='value(status.conditions[0].status)')

if [ "$SERVING_STATUS" == "True" ]; then
    echo -e "${GREEN}✓ Service is running${NC}"
    echo -e "  Latest revision: $LATEST_REVISION"
else
    echo -e "${RED}✗ Service is not ready${NC}"
    echo -e "  Status: $SERVING_STATUS"
    exit 1
fi
echo ""

# Test health endpoint
echo -e "${YELLOW}[3/5] Testing health endpoint...${NC}"
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SERVICE_URL/api/health")

if [ "$HEALTH_STATUS" == "200" ]; then
    echo -e "${GREEN}✓ Health endpoint responding (200 OK)${NC}"
else
    echo -e "${RED}✗ Health endpoint returned: $HEALTH_STATUS${NC}"
    exit 1
fi
echo ""

# Test Firebase authentication endpoint
echo -e "${YELLOW}[4/5] Testing authentication endpoint...${NC}"
AUTH_RESPONSE=$(curl -s "$SERVICE_URL/api/users" || echo "error")

if echo "$AUTH_RESPONSE" | grep -q "error\|Unauthorized\|401"; then
    echo -e "${GREEN}✓ Authentication endpoint is protected (expected)${NC}"
else
    echo -e "${YELLOW}⚠ Unexpected response from auth endpoint${NC}"
    echo "Response: $AUTH_RESPONSE"
fi
echo ""

# Check recent logs for errors
echo -e "${YELLOW}[5/5] Checking recent logs for errors...${NC}"
ERROR_COUNT=$(gcloud run logs read \
  --service=$SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --limit=100 \
  --format="value(textPayload)" 2>/dev/null | grep -i "error\|exception" | wc -l || echo "0")

if [ "$ERROR_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓ No errors found in recent logs${NC}"
else
    echo -e "${YELLOW}⚠ Found $ERROR_COUNT error entries in recent logs${NC}"
    echo "  Review logs with: gcloud run logs read --service=$SERVICE_NAME --region=$REGION --limit=50"
fi
echo ""

# Summary
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Verification Summary${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Service URL: $SERVICE_URL"
echo "Latest Revision: $LATEST_REVISION"
echo "Health Status: OK"
echo ""
echo -e "${GREEN}Manual verification steps:${NC}"
echo "1. Open in browser: $SERVICE_URL"
echo "2. Try to sign in with test credentials"
echo "3. Check browser console for Firebase errors"
echo "4. Verify data loads correctly"
echo ""
echo -e "${YELLOW}If everything works correctly for 24-48 hours, run cleanup:${NC}"
echo "  ./cleanup-old-credentials.sh"
echo ""
