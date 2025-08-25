# 🚀 Telemetry Migration Guide: Session-Based to Page Composition Tracking

## 📋 Overview

This guide covers the migration from session-based individual component tracking to page-level component composition tracking. The new system eliminates duplicate counting when multiple users visit the same page.

## 🎯 Problem Solved

**Before:** Multiple users visiting the same page = multiple telemetry counts
**After:** Multiple users visiting the same page = single count (accurate adoption metrics)

## 🔄 What Changed

### ✅ New System Benefits

- **Zero duplicate counting** across users
- **Accurate adoption metrics** per repository/page
- **Change-only tracking** when components are added/removed/modified
- **Server-side deduplication** for global uniqueness
- **Page-level fingerprinting** for precise tracking

### ❌ Removed (Legacy System)

- Session-based deduplication (`deduplication.ts`)
- Individual component event tracking
- `sessionStorage` usage for tracking
- `shouldTrackUsage()`, `createPropsSignature()`, `generateUsageKey()` functions

## 📁 File Changes

### 🆕 New Files

- `pageComposition.ts` - Page composition manager
- `newHooks.ts` - New page composition hooks
- `test-page-composition.ts` - Test utilities

### 🔧 Modified Files

- `TelemetryContext.tsx` - Integrated page composition system
- `componentHooks.ts` - Updated to use new hooks
- `types.ts` - Added page composition types
- `utils.ts` - Removed session-based functions
- `constants.ts` - Removed unused storage constants
- `index.ts` - Exported new page composition API

### 🗑️ Deprecated Files

- `deduplication.ts` - Can be safely deleted after migration

## 🔧 Migration Steps

### Step 1: Update Component Usage (Automatic)

**No changes needed!** All existing component hooks automatically use the new system:

```typescript
// This still works exactly the same
import { useButtonTelemetry } from '@juspay/blend-design-system'

function MyButton(props) {
    useButtonTelemetry(props) // Now uses page composition tracking
    return <button {...props} />
}
```

### Step 2: Server-Side Changes (Required)

Update your telemetry API to handle page composition events:

```typescript
// New endpoint: POST /api/telemetry/page-composition
interface PageCompositionEvent {
    eventType: 'page_composition'
    pageComposition: {
        pageFingerprint: string
        repositoryName: string
        pageRoute: string
        components: Array<{
            name: string
            propsSignature: string
            instanceCount: number
        }>
        compositionHash: string
    }
    changeType:
        | 'new'
        | 'component_added'
        | 'component_removed'
        | 'props_changed'
}
```

### Step 3: Database Schema Updates

```sql
-- New table for page compositions
CREATE TABLE page_compositions (
    id SERIAL PRIMARY KEY,
    page_fingerprint VARCHAR(255) UNIQUE NOT NULL,
    repository_name VARCHAR(255) NOT NULL,
    page_route VARCHAR(500) NOT NULL,
    domain VARCHAR(255) NOT NULL,
    composition_hash VARCHAR(64) NOT NULL,
    component_summary JSONB NOT NULL,
    first_seen TIMESTAMP DEFAULT NOW(),
    last_updated TIMESTAMP DEFAULT NOW(),
    change_count INTEGER DEFAULT 1
);

-- Track composition changes over time
CREATE TABLE composition_changes (
    id SERIAL PRIMARY KEY,
    page_fingerprint VARCHAR(255) NOT NULL,
    change_type ENUM('new', 'component_added', 'component_removed', 'props_changed'),
    previous_hash VARCHAR(64),
    new_hash VARCHAR(64),
    changed_components JSONB,
    timestamp TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (page_fingerprint) REFERENCES page_compositions(page_fingerprint)
);
```

### Step 4: Analytics Query Updates

```sql
-- Get component adoption by repository
SELECT
    repository_name,
    JSON_EXTRACT(component_summary, '$[*].name') as components_used,
    COUNT(*) as unique_pages
FROM page_compositions
GROUP BY repository_name;

-- Get most popular component combinations
SELECT
    composition_hash,
    component_summary,
    COUNT(*) as pages_with_this_combo
FROM page_compositions
GROUP BY composition_hash
ORDER BY pages_with_this_combo DESC;
```

## 🧪 Testing the Migration

Use the built-in test utilities:

```typescript
import { runAllTests } from '@juspay/blend-design-system/lib/telemetry/test-page-composition'

// Run in browser console to test
runAllTests()
```

## 🔍 Debugging

Enable debug mode to see the new system in action:

```typescript
import { TelemetryProvider } from '@juspay/blend-design-system'

<TelemetryProvider config={{ debug: true }}>
    <App />
</TelemetryProvider>
```

Debug output will show:

- Page composition changes
- Component registration/unregistration
- Fingerprint generation
- Change detection

## 📊 Expected Results

### Before Migration

```
User A visits /dashboard → Event sent
User B visits /dashboard → Event sent (DUPLICATE!)
User C visits /dashboard → Event sent (DUPLICATE!)
Result: 3 events for same page
```

### After Migration

```
User A visits /dashboard → Page composition event sent
User B visits /dashboard → No event (same composition)
User C visits /dashboard → No event (same composition)
User D adds new component → Page composition change event sent
Result: 2 events (initial + change)
```

## ⚠️ Breaking Changes

### For Component Library Users

- **None!** All existing hooks work the same way

### For Telemetry API Consumers

- New event format: `PageCompositionEvent` instead of `ComponentUsageEvent`
- Server endpoints need to handle page composition events
- Database schema changes required

### For Analytics Dashboards

- Queries need to be updated to use new table structure
- Metrics will be more accurate (lower numbers due to deduplication)

## 🚨 Rollback Plan

If issues arise, you can temporarily revert:

1. **Client-side:** Use migration hook with old system:

```typescript
import { useMigrationTelemetry } from '@juspay/blend-design-system'

// Use old system temporarily
useMigrationTelemetry('Button', props, false) // false = use old system
```

2. **Server-side:** Keep old endpoints running alongside new ones

3. **Database:** Keep old tables until migration is confirmed successful

## 📈 Monitoring

Monitor these metrics during migration:

- **Event volume:** Should decrease (due to deduplication)
- **Unique page compositions:** New metric to track
- **Error rates:** Should remain stable
- **API response times:** Should improve (fewer events)

## 🎉 Success Criteria

Migration is successful when:

- ✅ No duplicate counting for same page/component combinations
- ✅ Accurate adoption metrics per repository/page
- ✅ Change detection working correctly
- ✅ Server-side deduplication functioning
- ✅ Analytics dashboards updated and working

## 🆘 Support

If you encounter issues:

1. Check debug logs in browser console
2. Verify server-side event handling
3. Test with the provided test utilities
4. Review this migration guide

## 📚 Additional Resources

- [Page Composition API Documentation](./pageComposition.ts)
- [New Hooks Documentation](./newHooks.ts)
- [Test Utilities](./test-page-composition.ts)
- [Type Definitions](./types.ts)
