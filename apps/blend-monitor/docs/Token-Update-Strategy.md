# Token Update Strategy Guide

## 🎯 Overview

This guide outlines the comprehensive strategy for updating tokens in the Blend Design System tokenizer when the design system evolves. Since we've completed the initial extraction and removed individual component scripts, we need efficient strategies for future updates.

## 📋 Update Scenarios

### 1. **New Component Added to Blend Design System**

When a new component with tokens is added to the design system.

### 2. **Existing Component Token Changes**

When existing components have their token structure modified.

### 3. **Foundation Token Changes**

When foundation tokens are updated or new ones are added.

### 4. **Bulk Updates**

When multiple components need updates simultaneously.

## 🔄 Update Strategies

### **Strategy 1: Single Component Update (Recommended for Individual Changes)**

#### **Step 1: Create Temporary Extraction Script**

```bash
# Create a temporary script for the specific component
cp apps/blend-monitor/scripts/seed-token-management.js apps/blend-monitor/scripts/temp-extract-[component].js
```

#### **Step 2: Modify Script for Specific Component**

- Analyze the component's token file in `packages/blend/lib/components/[Component]/[component].tokens.ts`
- Update the script to extract only that component's tokens
- Use the same pattern as our previous extraction scripts

#### **Step 3: Run Update**

```bash
cd apps/blend-monitor/scripts
node temp-extract-[component].js
```

#### **Step 4: Verify and Cleanup**

```bash
# Verify the update
node check-tokens.js

# Remove temporary script
rm temp-extract-[component].js
```

### **Strategy 2: API-Based Updates (Recommended for Production)**

#### **Create Update API Endpoint**

```typescript
// apps/blend-monitor/app/api/tokens/update/route.ts
export async function POST(request: Request) {
    const { componentName, tokens } = await request.json()

    // Update component tokens in database
    // Validate token structure
    // Return success/failure response
}
```

#### **Usage**

```bash
# Update via API call
curl -X POST http://localhost:3000/api/tokens/update \
  -H "Content-Type: application/json" \
  -d '{"componentName": "Button", "tokens": [...]}'
```

### **Strategy 3: Migration-Based Updates (Recommended for Major Changes)**

#### **Create Migration File**

```sql
-- database/migrations/004_update_button_tokens.sql
-- Update specific component tokens
UPDATE component_tokens
SET foundation_token_reference = 'colors.primary.600'
WHERE collection_id = (SELECT id FROM component_token_collections WHERE component_name = 'Button')
  AND token_path = 'backgroundColor.primary.default';
```

#### **Run Migration**

```bash
# Apply migration
psql -h localhost -p 5433 -U admin -d blend_monitor -f database/migrations/004_update_button_tokens.sql
```

### **Strategy 4: Automated Sync Script (Recommended for Regular Updates)**

#### **Create Sync Utility**

```javascript
// scripts/sync-tokens.js
const fs = require('fs')
const path = require('path')

async function syncComponentTokens(componentName) {
    // 1. Read token file from packages/blend
    // 2. Parse token structure
    // 3. Compare with database
    // 4. Update differences
    // 5. Report changes
}

// Usage: node sync-tokens.js Button
// Usage: node sync-tokens.js --all
```

## 🛠️ Detailed Implementation

### **Option A: Quick Single Component Update Script**

Let me create a reusable template for single component updates:

```javascript
// scripts/update-component-template.js
const { Pool } = require('pg')

// Usage: node update-component-template.js ComponentName
const componentName = process.argv[2]

if (!componentName) {
    console.error('Usage: node update-component-template.js ComponentName')
    process.exit(1)
}

async function updateComponentTokens() {
    console.log(`🔄 Updating ${componentName} tokens...`)

    // 1. Get collection ID
    // 2. Clear existing tokens (optional)
    // 3. Extract new tokens from source
    // 4. Insert updated tokens
    // 5. Verify results
}

updateComponentTokens()
```

### **Option B: Smart Diff-Based Updates**

```javascript
// scripts/smart-token-update.js
async function smartUpdate(componentName) {
    // 1. Read current tokens from database
    // 2. Read new tokens from source file
    // 3. Calculate differences
    // 4. Apply only the changes
    // 5. Log what was updated
}
```

## 📊 Update Workflows

### **Workflow 1: Development Updates**

```bash
# 1. Component tokens changed in packages/blend
# 2. Run quick update
cd apps/blend-monitor
node scripts/update-single-component.js Button

# 3. Verify
node scripts/check-tokens.js

# 4. Test in tokenizer dashboard
npm run dev
```

### **Workflow 2: Production Updates**

```bash
# 1. Create migration file
# 2. Test migration on staging
# 3. Apply to production
# 4. Verify with check-tokens.js
# 5. Monitor dashboard functionality
```

### **Workflow 3: Bulk Updates**

```bash
# 1. Backup database
pg_dump blend_monitor > backup_$(date +%Y%m%d).sql

# 2. Run bulk update script
node scripts/bulk-update-tokens.js

# 3. Verify all components
node scripts/check-tokens.js

# 4. Test critical components in dashboard
```

## 🔍 Monitoring & Validation

### **Pre-Update Checks**

- [ ] Backup current database
- [ ] Verify source token files exist
- [ ] Check for breaking changes in token structure
- [ ] Test update script on development database

### **Post-Update Validation**

- [ ] Run `check-tokens.js` to verify counts
- [ ] Test affected components in tokenizer dashboard
- [ ] Verify API endpoints still work
- [ ] Check for any broken token references

### **Rollback Strategy**

```bash
# If update fails, restore from backup
psql -h localhost -p 5433 -U admin -d blend_monitor < backup_$(date +%Y%m%d).sql
```

## 🚀 Recommended Approach

### **For Regular Development:**

1. **Use Strategy 1** (Temporary extraction script) for individual component updates
2. **Use Strategy 4** (Automated sync) for regular maintenance
3. **Always verify** with `check-tokens.js` after updates

### **For Production:**

1. **Use Strategy 3** (Migration-based) for major updates
2. **Use Strategy 2** (API-based) for programmatic updates
3. **Always backup** before major changes

### **For New Components:**

1. Create temporary extraction script based on existing patterns
2. Follow the same manual analysis approach we used
3. Add to component collections first, then extract tokens

## 📝 Best Practices

1. **Always backup** before major token updates
2. **Test updates** on development database first
3. **Verify token counts** match expectations
4. **Document changes** in migration files
5. **Monitor dashboard** functionality after updates
6. **Keep extraction patterns** consistent with our established approach

## 🔧 Tools to Create

Based on this strategy, we should create:

1. **update-single-component.js** - Quick single component updates
2. **sync-all-tokens.js** - Bulk synchronization utility
3. **backup-tokens.js** - Database backup utility
4. **validate-tokens.js** - Enhanced validation beyond check-tokens.js

This strategy ensures we can efficiently maintain the tokenizer system as the Blend Design System evolves while preserving the clean structure we've achieved.
