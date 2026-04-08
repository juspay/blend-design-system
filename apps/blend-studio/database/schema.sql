-- Blend Monitor PostgreSQL Schema
-- Migration from Firebase Realtime Database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid VARCHAR(128) UNIQUE NOT NULL, -- Keep Firebase UID for auth compatibility
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    photo_url TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Roles and Permissions
CREATE TABLE roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL,
    is_custom BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Components
CREATE TABLE components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_id VARCHAR(255) UNIQUE NOT NULL, -- Original component identifier
    name VARCHAR(255) NOT NULL,
    path TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    has_storybook BOOLEAN NOT NULL DEFAULT false,
    has_figma_connect BOOLEAN NOT NULL DEFAULT false,
    has_tests BOOLEAN NOT NULL DEFAULT false,
    last_modified TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Integration Status
CREATE TABLE component_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_id UUID NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'not_integrated',
    last_sync TIMESTAMP WITH TIME ZONE,
    validation_errors JSONB,
    figma_url TEXT,
    variants JSONB,
    props_mapping JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Coverage Metrics
CREATE TABLE coverage_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_components INTEGER NOT NULL,
    integrated_components INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    category_breakdown JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- NPM Package Stats
CREATE TABLE npm_package_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    downloads_daily INTEGER NOT NULL DEFAULT 0,
    downloads_weekly INTEGER NOT NULL DEFAULT 0,
    downloads_monthly INTEGER NOT NULL DEFAULT 0,
    downloads_total INTEGER NOT NULL DEFAULT 0,
    size_unpacked INTEGER NOT NULL DEFAULT 0,
    size_gzipped INTEGER NOT NULL DEFAULT 0,
    dependencies_count INTEGER NOT NULL DEFAULT 0,
    last_publish TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- NPM Version History
CREATE TABLE npm_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version VARCHAR(50) UNIQUE NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    publisher VARCHAR(255),
    downloads INTEGER NOT NULL DEFAULT 0,
    changelog TEXT,
    size_unpacked INTEGER,
    size_gzipped INTEGER,
    is_breaking BOOLEAN NOT NULL DEFAULT false,
    is_prerelease BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Download Trends
CREATE TABLE download_trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    downloads INTEGER NOT NULL,
    package_name VARCHAR(255) NOT NULL DEFAULT '@juspay/blend-design-system',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(date, package_name)
);

-- Deployments
CREATE TABLE deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment VARCHAR(100) NOT NULL,
    version VARCHAR(100) NOT NULL,
    deployer_name VARCHAR(255) NOT NULL,
    deployer_email VARCHAR(255) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) NOT NULL,
    duration_seconds INTEGER,
    commit_sha VARCHAR(40),
    build_logs_url TEXT,
    configuration JSONB,
    rollback_available BOOLEAN NOT NULL DEFAULT false,
    source VARCHAR(50) DEFAULT 'database',
    service VARCHAR(255),
    site_url TEXT,
    branch VARCHAR(255),
    build_logs TEXT[],
    deployment_logs TEXT[],
    build_cache_key VARCHAR(255),
    preview_url TEXT,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Deployment Approvals
CREATE TABLE deployment_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deployment_id UUID NOT NULL REFERENCES deployments(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES users(id),
    requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_by UUID REFERENCES users(id),
    rejected_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    comments TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Environments
CREATE TABLE environments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unknown',
    uptime_percentage DECIMAL(5,2),
    current_version VARCHAR(100),
    last_deployment TIMESTAMP WITH TIME ZONE,
    url TEXT,
    channel VARCHAR(100),
    response_time_p50 INTEGER,
    response_time_p95 INTEGER,
    response_time_p99 INTEGER,
    request_rate INTEGER,
    error_rate DECIMAL(5,2),
    active_users INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Activity Logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    metadata JSONB,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- System Activity
CREATE TABLE system_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    details JSONB,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    resource VARCHAR(255),
    resource_id VARCHAR(255),
    old_values JSONB,
    new_values JSONB,
    result VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Cloud Functions
CREATE TABLE cloud_functions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    status VARCHAR(50) NOT NULL,
    avg_response_time INTEGER,
    error_rate DECIMAL(5,2),
    invocations INTEGER,
    executions_per_hour INTEGER,
    executions_per_day INTEGER,
    schedule VARCHAR(255),
    last_execution TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Firebase Usage Tracking
CREATE TABLE firebase_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service VARCHAR(100) NOT NULL,
    metric VARCHAR(100) NOT NULL,
    used_amount BIGINT NOT NULL,
    limit_amount BIGINT,
    unit VARCHAR(50) NOT NULL,
    current_cost DECIMAL(10,2),
    projected_cost DECIMAL(10,2),
    billing_period_end DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

CREATE INDEX idx_components_component_id ON components(component_id);
CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_name ON components USING gin(name gin_trgm_ops);

CREATE INDEX idx_component_integrations_component_id ON component_integrations(component_id);
CREATE INDEX idx_component_integrations_status ON component_integrations(status);

CREATE INDEX idx_deployments_environment ON deployments(environment);
CREATE INDEX idx_deployments_status ON deployments(status);
CREATE INDEX idx_deployments_start_time ON deployments(start_time DESC);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp DESC);

CREATE INDEX idx_system_activity_action ON system_activity(action);
CREATE INDEX idx_system_activity_timestamp ON system_activity(timestamp DESC);

CREATE INDEX idx_download_trends_date ON download_trends(date DESC);
CREATE INDEX idx_download_trends_package ON download_trends(package_name);

CREATE INDEX idx_npm_versions_published_at ON npm_versions(published_at DESC);
CREATE INDEX idx_npm_versions_version ON npm_versions(version);

CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);

CREATE INDEX idx_firebase_usage_service ON firebase_usage(service);
CREATE INDEX idx_firebase_usage_created_at ON firebase_usage(created_at DESC);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON components
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_component_integrations_updated_at BEFORE UPDATE ON component_integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployments_updated_at BEFORE UPDATE ON deployments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_environments_updated_at BEFORE UPDATE ON environments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cloud_functions_updated_at BEFORE UPDATE ON cloud_functions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default roles
INSERT INTO roles (id, name, permissions, is_custom) VALUES
('admin', 'Administrator', '{"deployments": ["read", "write", "deploy", "rollback"], "users": ["read", "write", "delete", "create", "assign_roles"], "components": ["read", "write"], "settings": ["read", "write"]}', false),
('developer', 'Developer', '{"deployments": ["read", "deploy", "rollback"], "components": ["read", "write"], "users": ["read"]}', false),
('viewer', 'Viewer', '{"deployments": ["read"], "components": ["read"], "users": ["read"]}', false);

-- Insert default environments
INSERT INTO environments (name, status) VALUES
('production', 'unknown'),
('staging', 'unknown'),
('development', 'unknown'); 