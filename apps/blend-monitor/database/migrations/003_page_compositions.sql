-- Migration: Add page composition tables for new telemetry system
-- This migration adds tables to support page-level component composition tracking
-- with global deduplication across users

-- Create page_compositions table
CREATE TABLE IF NOT EXISTS page_compositions (
    id SERIAL PRIMARY KEY,
    page_fingerprint VARCHAR(255) UNIQUE NOT NULL,
    repository_name VARCHAR(255) NOT NULL,
    page_route VARCHAR(500) NOT NULL,
    domain VARCHAR(255) NOT NULL,
    composition_hash VARCHAR(64) NOT NULL,
    component_summary JSONB NOT NULL,
    package_version VARCHAR(50),
    environment VARCHAR(50) DEFAULT 'unknown',
    project_context JSONB,
    first_seen TIMESTAMP DEFAULT NOW(),
    last_updated TIMESTAMP DEFAULT NOW(),
    change_count INTEGER DEFAULT 1,
    
    -- Indexes for performance
    CONSTRAINT page_compositions_pkey PRIMARY KEY (id),
    CONSTRAINT page_compositions_fingerprint_unique UNIQUE (page_fingerprint)
);

-- Create indexes for page_compositions
CREATE INDEX IF NOT EXISTS idx_page_compositions_repository ON page_compositions(repository_name);
CREATE INDEX IF NOT EXISTS idx_page_compositions_page_route ON page_compositions(page_route);
CREATE INDEX IF NOT EXISTS idx_page_compositions_domain ON page_compositions(domain);
CREATE INDEX IF NOT EXISTS idx_page_compositions_composition_hash ON page_compositions(composition_hash);
CREATE INDEX IF NOT EXISTS idx_page_compositions_first_seen ON page_compositions(first_seen);
CREATE INDEX IF NOT EXISTS idx_page_compositions_last_updated ON page_compositions(last_updated);
CREATE INDEX IF NOT EXISTS idx_page_compositions_package_version ON page_compositions(package_version);
CREATE INDEX IF NOT EXISTS idx_page_compositions_environment ON page_compositions(environment);

-- GIN index for JSONB component_summary for efficient component searches
CREATE INDEX IF NOT EXISTS idx_page_compositions_component_summary_gin ON page_compositions USING GIN (component_summary);

-- Create composition_changes table for historical tracking
CREATE TABLE IF NOT EXISTS composition_changes (
    id SERIAL PRIMARY KEY,
    page_fingerprint VARCHAR(255) NOT NULL,
    change_type VARCHAR(50) NOT NULL CHECK (change_type IN ('new', 'component_added', 'component_removed', 'props_changed')),
    previous_hash VARCHAR(64),
    new_hash VARCHAR(64) NOT NULL,
    changed_components JSONB,
    package_version VARCHAR(50),
    environment VARCHAR(50) DEFAULT 'unknown',
    session_id VARCHAR(255),
    timestamp TIMESTAMP DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_composition_changes_page_fingerprint 
        FOREIGN KEY (page_fingerprint) 
        REFERENCES page_compositions(page_fingerprint) 
        ON DELETE CASCADE
);

-- Create indexes for composition_changes
CREATE INDEX IF NOT EXISTS idx_composition_changes_page_fingerprint ON composition_changes(page_fingerprint);
CREATE INDEX IF NOT EXISTS idx_composition_changes_change_type ON composition_changes(change_type);
CREATE INDEX IF NOT EXISTS idx_composition_changes_timestamp ON composition_changes(timestamp);
CREATE INDEX IF NOT EXISTS idx_composition_changes_package_version ON composition_changes(package_version);
CREATE INDEX IF NOT EXISTS idx_composition_changes_environment ON composition_changes(environment);
CREATE INDEX IF NOT EXISTS idx_composition_changes_session_id ON composition_changes(session_id);

-- GIN index for JSONB changed_components
CREATE INDEX IF NOT EXISTS idx_composition_changes_changed_components_gin ON composition_changes USING GIN (changed_components);

-- Add comments for documentation
COMMENT ON TABLE page_compositions IS 'Stores unique page-component compositions with global deduplication';
COMMENT ON COLUMN page_compositions.page_fingerprint IS 'Unique identifier for repository + page route + component composition';
COMMENT ON COLUMN page_compositions.composition_hash IS 'Hash of the component composition for change detection';
COMMENT ON COLUMN page_compositions.component_summary IS 'JSONB array of components with their props and instance counts';
COMMENT ON COLUMN page_compositions.change_count IS 'Number of times this page composition has changed';

COMMENT ON TABLE composition_changes IS 'Historical log of all page composition changes';
COMMENT ON COLUMN composition_changes.change_type IS 'Type of change: new, component_added, component_removed, props_changed';
COMMENT ON COLUMN composition_changes.changed_components IS 'JSONB snapshot of components at time of change';

-- Create a view for easy analytics queries
CREATE OR REPLACE VIEW page_composition_analytics AS
SELECT 
    pc.repository_name,
    pc.page_route,
    pc.domain,
    pc.composition_hash,
    pc.change_count,
    pc.first_seen,
    pc.last_updated,
    pc.package_version,
    pc.environment,
    -- Extract component names and counts
    jsonb_array_length(pc.component_summary) as total_component_types,
    (
        SELECT SUM((comp->>'instanceCount')::int) 
        FROM jsonb_array_elements(pc.component_summary) comp
    ) as total_component_instances,
    -- Get unique component names
    (
        SELECT jsonb_agg(DISTINCT comp->>'name') 
        FROM jsonb_array_elements(pc.component_summary) comp
    ) as component_names
FROM page_compositions pc;

COMMENT ON VIEW page_composition_analytics IS 'Analytics view for page composition data with computed metrics';

-- Create a function to get component adoption statistics
CREATE OR REPLACE FUNCTION get_component_adoption_stats(
    p_repository_name VARCHAR DEFAULT NULL,
    p_start_date TIMESTAMP DEFAULT NULL,
    p_end_date TIMESTAMP DEFAULT NULL
)
RETURNS TABLE (
    repository_name VARCHAR,
    component_name TEXT,
    unique_pages BIGINT,
    total_instances BIGINT,
    first_used TIMESTAMP,
    last_used TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.repository_name,
        (comp->>'name')::TEXT as component_name,
        COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
        SUM((comp->>'instanceCount')::int) as total_instances,
        MIN(pc.first_seen) as first_used,
        MAX(pc.last_updated) as last_used
    FROM page_compositions pc,
         jsonb_array_elements(pc.component_summary) comp
    WHERE 
        (p_repository_name IS NULL OR pc.repository_name = p_repository_name)
        AND (p_start_date IS NULL OR pc.first_seen >= p_start_date)
        AND (p_end_date IS NULL OR pc.first_seen <= p_end_date)
    GROUP BY pc.repository_name, (comp->>'name')
    ORDER BY unique_pages DESC, total_instances DESC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_component_adoption_stats IS 'Get component adoption statistics with optional filtering';

-- Create a function to clean up old composition changes (for maintenance)
CREATE OR REPLACE FUNCTION cleanup_old_composition_changes(
    p_days_to_keep INTEGER DEFAULT 90
)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM composition_changes 
    WHERE timestamp < NOW() - INTERVAL '1 day' * p_days_to_keep;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cleanup_old_composition_changes IS 'Clean up composition changes older than specified days (default 90)';

-- Insert initial migration record
INSERT INTO schema_migrations (version, applied_at) 
VALUES ('003_page_compositions', NOW())
ON CONFLICT (version) DO NOTHING;
