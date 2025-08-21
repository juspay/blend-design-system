-- Telemetry Tables Migration
-- Adds comprehensive telemetry tracking for Blend Design System component usage
-- Migration: 001_add_telemetry_tables.sql

-- =====================================================
-- TELEMETRY CORE TABLES
-- =====================================================

-- Component Usage Events (Main telemetry table)
-- Stores individual component usage events with duplicate prevention
CREATE TABLE component_usage_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Deduplication Fields (must match client-side logic)
    session_id VARCHAR(255) NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    props_signature TEXT NOT NULL,
    repository_name VARCHAR(255) NOT NULL,
    page_route TEXT NOT NULL,
    
    -- Event Details
    event_type VARCHAR(50) NOT NULL DEFAULT 'component_render',
    package_version VARCHAR(50),
    environment VARCHAR(50) NOT NULL DEFAULT 'unknown',
    instance_count INTEGER NOT NULL DEFAULT 1,
    component_props JSONB,
    
    -- Browser/Client Context
    user_agent TEXT,
    viewport_width INTEGER,
    viewport_height INTEGER,
    
    -- Timestamps
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    client_timestamp TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- UNIQUE constraint prevents exact duplicates using our deduplication strategy
    CONSTRAINT unique_component_usage UNIQUE (
        session_id, 
        component_name, 
        props_signature, 
        repository_name, 
        page_route
    )
);

-- Session Analytics (Aggregated session data)
-- Tracks user sessions and their component usage patterns
CREATE TABLE telemetry_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    
    -- Project Context
    repository_name VARCHAR(255),
    package_version VARCHAR(50),
    environment VARCHAR(50),
    
    -- Session Statistics
    components_used INTEGER NOT NULL DEFAULT 0,
    unique_components INTEGER NOT NULL DEFAULT 0,
    total_interactions INTEGER NOT NULL DEFAULT 0,
    session_duration_minutes INTEGER,
    page_routes TEXT[],
    
    -- Browser Context
    user_agent TEXT,
    initial_viewport_width INTEGER,
    initial_viewport_height INTEGER,
    
    -- Session Timing
    first_event TIMESTAMP WITH TIME ZONE,
    last_event TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Repository Analytics (Per-repo adoption metrics)
-- Aggregated metrics for each repository using the design system
CREATE TABLE repository_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repository_name VARCHAR(255) UNIQUE NOT NULL,
    
    -- Adoption Metrics
    total_components_used INTEGER NOT NULL DEFAULT 0,
    unique_sessions INTEGER NOT NULL DEFAULT 0,
    total_events INTEGER NOT NULL DEFAULT 0,
    unique_users_estimated INTEGER NOT NULL DEFAULT 0,
    current_package_version VARCHAR(50),
    
    -- Component Breakdown (JSON for flexibility)
    component_usage_breakdown JSONB, -- {componentName: {count, sessions, lastUsed}}
    most_used_components JSONB,     -- Top 10 components with usage counts
    component_coverage_percentage DECIMAL(5,2),
    
    -- Adoption Patterns
    peak_usage_hours INTEGER[], -- Hours of day when most active
    common_page_routes TEXT[],
    environments_used VARCHAR(50)[],
    
    -- Time Tracking
    first_usage TIMESTAMP WITH TIME ZONE,
    last_usage TIMESTAMP WITH TIME ZONE,
    last_calculated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Component Adoption Trends (Time-series data)
-- Daily/weekly/monthly aggregations for trend analysis
CREATE TABLE component_adoption_trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    
    -- Daily Metrics
    unique_sessions INTEGER NOT NULL DEFAULT 0,
    total_renders INTEGER NOT NULL DEFAULT 0,
    unique_repositories INTEGER NOT NULL DEFAULT 0,
    unique_props_variants INTEGER NOT NULL DEFAULT 0,
    avg_instances_per_session DECIMAL(5,2) DEFAULT 0,
    
    -- Environment Breakdown
    production_usage INTEGER NOT NULL DEFAULT 0,
    development_usage INTEGER NOT NULL DEFAULT 0,
    staging_usage INTEGER NOT NULL DEFAULT 0,
    
    -- Aggregation Level (daily, weekly, monthly)
    aggregation_level VARCHAR(20) NOT NULL DEFAULT 'daily',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(component_name, date, aggregation_level)
);

-- Component Props Analytics (Most common prop combinations)
-- Tracks which props are used most frequently for each component
CREATE TABLE component_props_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_name VARCHAR(255) NOT NULL,
    props_signature TEXT NOT NULL,
    props_json JSONB NOT NULL,
    
    -- Usage Statistics
    usage_count INTEGER NOT NULL DEFAULT 1,
    unique_sessions INTEGER NOT NULL DEFAULT 1,
    unique_repositories INTEGER NOT NULL DEFAULT 1,
    
    -- Timestamps
    first_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(component_name, props_signature)
);

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

-- Component Usage Events Indexes
CREATE INDEX idx_component_usage_events_component_name ON component_usage_events(component_name);
CREATE INDEX idx_component_usage_events_repository ON component_usage_events(repository_name);
CREATE INDEX idx_component_usage_events_timestamp ON component_usage_events(timestamp DESC);
CREATE INDEX idx_component_usage_events_session ON component_usage_events(session_id);
CREATE INDEX idx_component_usage_events_environment ON component_usage_events(environment);
CREATE INDEX idx_component_usage_events_created_at ON component_usage_events(created_at DESC);

-- Composite indexes for common query patterns
CREATE INDEX idx_component_usage_repo_component ON component_usage_events(repository_name, component_name);
CREATE INDEX idx_component_usage_date_component ON component_usage_events(DATE(timestamp), component_name);
CREATE INDEX idx_component_usage_env_timestamp ON component_usage_events(environment, timestamp DESC);

-- Session Analytics Indexes
CREATE INDEX idx_telemetry_sessions_repository ON telemetry_sessions(repository_name);
CREATE INDEX idx_telemetry_sessions_created_at ON telemetry_sessions(created_at DESC);
CREATE INDEX idx_telemetry_sessions_last_event ON telemetry_sessions(last_event DESC);
CREATE INDEX idx_telemetry_sessions_session_id ON telemetry_sessions(session_id);

-- Repository Analytics Indexes
CREATE INDEX idx_repository_analytics_last_usage ON repository_analytics(last_usage DESC);
CREATE INDEX idx_repository_analytics_total_events ON repository_analytics(total_events DESC);
CREATE INDEX idx_repository_analytics_unique_sessions ON repository_analytics(unique_sessions DESC);

-- Adoption Trends Indexes
CREATE INDEX idx_adoption_trends_component ON component_adoption_trends(component_name);
CREATE INDEX idx_adoption_trends_date ON component_adoption_trends(date DESC);
CREATE INDEX idx_adoption_trends_component_date ON component_adoption_trends(component_name, date DESC);
CREATE INDEX idx_adoption_trends_aggregation ON component_adoption_trends(aggregation_level, date DESC);

-- Props Analytics Indexes
CREATE INDEX idx_component_props_component ON component_props_analytics(component_name);
CREATE INDEX idx_component_props_usage_count ON component_props_analytics(usage_count DESC);
CREATE INDEX idx_component_props_last_seen ON component_props_analytics(last_seen DESC);

-- JSONB Indexes for efficient props querying
CREATE INDEX idx_component_usage_props_gin ON component_usage_events USING gin(component_props);
CREATE INDEX idx_component_props_json_gin ON component_props_analytics USING gin(props_json);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Trigger for component_usage_events updated_at
CREATE TRIGGER update_component_usage_events_updated_at 
    BEFORE UPDATE ON component_usage_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for telemetry_sessions updated_at
CREATE TRIGGER update_telemetry_sessions_updated_at 
    BEFORE UPDATE ON telemetry_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for repository_analytics updated_at
CREATE TRIGGER update_repository_analytics_updated_at 
    BEFORE UPDATE ON repository_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for component_props_analytics updated_at
CREATE TRIGGER update_component_props_analytics_updated_at 
    BEFORE UPDATE ON component_props_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MATERIALIZED VIEWS FOR PERFORMANCE
-- =====================================================

-- Component Usage Summary (Refreshed periodically)
CREATE MATERIALIZED VIEW component_usage_summary AS
SELECT 
    component_name,
    COUNT(*) as total_events,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(DISTINCT repository_name) as unique_repositories,
    SUM(instance_count) as total_instances,
    AVG(instance_count) as avg_instances_per_event,
    MIN(timestamp) as first_usage,
    MAX(timestamp) as last_usage,
    COUNT(DISTINCT DATE(timestamp)) as active_days
FROM component_usage_events
GROUP BY component_name;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_component_usage_summary_component ON component_usage_summary(component_name);

-- Repository Usage Summary (Refreshed periodically)
CREATE MATERIALIZED VIEW repository_usage_summary AS
SELECT 
    repository_name,
    COUNT(*) as total_events,
    COUNT(DISTINCT component_name) as unique_components,
    COUNT(DISTINCT session_id) as unique_sessions,
    SUM(instance_count) as total_instances,
    MIN(timestamp) as first_usage,
    MAX(timestamp) as last_usage,
    COUNT(DISTINCT DATE(timestamp)) as active_days,
    MODE() WITHIN GROUP (ORDER BY package_version) as most_common_version
FROM component_usage_events
WHERE repository_name IS NOT NULL
GROUP BY repository_name;

-- Create index on repository summary
CREATE UNIQUE INDEX idx_repository_usage_summary_repo ON repository_usage_summary(repository_name);

-- =====================================================
-- FUNCTIONS FOR DATA MANAGEMENT
-- =====================================================

-- Function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_telemetry_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY component_usage_summary;
    REFRESH MATERIALIZED VIEW CONCURRENTLY repository_usage_summary;
END;
$$ LANGUAGE plpgsql;

-- Function to clean old telemetry data (retention policy)
CREATE OR REPLACE FUNCTION cleanup_old_telemetry_data(retention_days INTEGER DEFAULT 365)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Delete old component usage events (keep last year by default)
    DELETE FROM component_usage_events 
    WHERE created_at < NOW() - INTERVAL '1 day' * retention_days;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Clean up orphaned sessions
    DELETE FROM telemetry_sessions 
    WHERE session_id NOT IN (SELECT DISTINCT session_id FROM component_usage_events);
    
    -- Refresh materialized views after cleanup
    PERFORM refresh_telemetry_views();
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE component_usage_events IS 'Individual component usage events with session-based deduplication';
COMMENT ON TABLE telemetry_sessions IS 'Aggregated session data for user interaction patterns';
COMMENT ON TABLE repository_analytics IS 'Per-repository adoption metrics and insights';
COMMENT ON TABLE component_adoption_trends IS 'Time-series data for component adoption trending';
COMMENT ON TABLE component_props_analytics IS 'Analysis of component prop usage patterns';

COMMENT ON CONSTRAINT unique_component_usage ON component_usage_events IS 'Prevents duplicate events using session_id + component + props + context';

COMMENT ON MATERIALIZED VIEW component_usage_summary IS 'Performance-optimized component usage overview, refresh periodically';
COMMENT ON MATERIALIZED VIEW repository_usage_summary IS 'Performance-optimized repository adoption overview, refresh periodically';

-- =====================================================
-- INITIAL DATA SETUP
-- =====================================================

-- No initial data needed - tables will be populated by telemetry events

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Telemetry tables migration completed successfully!';
    RAISE NOTICE 'Created tables: component_usage_events, telemetry_sessions, repository_analytics, component_adoption_trends, component_props_analytics';
    RAISE NOTICE 'Created materialized views: component_usage_summary, repository_usage_summary';
    RAISE NOTICE 'Created functions: refresh_telemetry_views(), cleanup_old_telemetry_data()';
END $$;