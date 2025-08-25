-- Migration: Remove old session-based telemetry system
-- This migration removes the conflicting session-based telemetry tables
-- that violate route-level deduplication requirements

-- =====================================================
-- DROP OLD SESSION-BASED TELEMETRY TABLES
-- =====================================================

-- Drop old telemetry tables that create duplicates per user session
-- These tables violate the requirement for route-level deduplication
DROP TABLE IF EXISTS component_usage_events CASCADE;
DROP TABLE IF EXISTS telemetry_sessions CASCADE;
DROP TABLE IF EXISTS repository_analytics CASCADE;
DROP TABLE IF EXISTS component_adoption_trends CASCADE;
DROP TABLE IF EXISTS component_props_analytics CASCADE;

-- Drop materialized views that depend on old tables
DROP MATERIALIZED VIEW IF EXISTS component_usage_summary CASCADE;
DROP MATERIALIZED VIEW IF EXISTS repository_usage_summary CASCADE;

-- Drop functions that operate on old tables
DROP FUNCTION IF EXISTS refresh_telemetry_views();
DROP FUNCTION IF EXISTS cleanup_old_telemetry_data(INTEGER);

-- =====================================================
-- KEEP PAGE COMPOSITION TABLES (CORRECT IMPLEMENTATION)
-- =====================================================

-- The following tables are kept as they implement correct route-level deduplication:
-- - page_compositions (stores unique page compositions per route)
-- - composition_changes (tracks changes to page compositions)

-- These tables correctly implement the requirement:
-- "If the same route is being opened by different users then same data will be pushed in db 
--  which is kind of duplicate. So we have to avoid these duplicate data storage at each route level."

-- =====================================================
-- CLEANUP COMMENTS
-- =====================================================

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Old telemetry system cleanup completed successfully!';
    RAISE NOTICE 'Removed tables: component_usage_events, telemetry_sessions, repository_analytics, component_adoption_trends, component_props_analytics';
    RAISE NOTICE 'Removed materialized views: component_usage_summary, repository_usage_summary';
    RAISE NOTICE 'Removed functions: refresh_telemetry_views(), cleanup_old_telemetry_data()';
    RAISE NOTICE 'Kept page composition tables for route-level deduplication';
END $$;

-- Insert migration record
INSERT INTO schema_migrations (version, applied_at) 
VALUES ('005_remove_old_telemetry_system', NOW())
ON CONFLICT (version) DO NOTHING;
