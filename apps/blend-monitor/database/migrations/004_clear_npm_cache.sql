-- Migration to clear old npm cache data for package change
-- From blend-v1 to @juspay/blend-design-system

-- Clear old package stats
DELETE FROM npm_package_stats WHERE package_name = 'blend-v1' OR package_name IS NULL;

-- Clear old download trends
DELETE FROM download_trends WHERE package_name = 'blend-v1' OR package_name IS NULL;

-- Clear old version history (this will be repopulated with new package data)
DELETE FROM npm_versions;

-- Add comment for tracking
INSERT INTO activity_logs (action, details, timestamp) 
VALUES (
    'npm_cache_cleared', 
    '{"reason": "Package changed from blend-v1 to @juspay/blend-design-system", "timestamp": "' || NOW() || '"}',
    NOW()
);
