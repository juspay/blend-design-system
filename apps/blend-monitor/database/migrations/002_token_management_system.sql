-- Token Management System Migration
-- Replaces the old theme-based approach with granular token management

-- Drop existing tokenizer tables (clean slate)
DROP TABLE IF EXISTS themes CASCADE;
DROP TABLE IF EXISTS theme_versions CASCADE;
DROP TABLE IF EXISTS theme_usage_analytics CASCADE;

-- Foundation Token Collections
-- Stores collections of foundation tokens (e.g., "Blend Default", "Custom Brand")
CREATE TABLE foundation_token_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT false,
    is_default BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_active_default EXCLUDE (is_default WITH =) WHERE (is_default = true)
);

-- Foundation Tokens
-- Stores individual foundation tokens (colors, typography, spacing, etc.)
CREATE TABLE foundation_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID REFERENCES foundation_token_collections(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL, -- 'colors', 'fontSize', 'fontWeight', 'spacing', etc.
    subcategory VARCHAR(100), -- 'primary', 'gray', etc. (nullable for non-nested tokens)
    token_key VARCHAR(100) NOT NULL, -- '500', 'headingLG', '16', etc.
    token_value TEXT NOT NULL, -- '#2B7FFF', '24px', '600', etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(collection_id, category, subcategory, token_key)
);

-- Component Token Collections
-- Stores collections of component tokens per component (e.g., "Button Default", "Button Custom")
CREATE TABLE component_token_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    component_name VARCHAR(100) NOT NULL, -- 'Button', 'Alert', 'Checkbox', etc.
    description TEXT,
    foundation_collection_id UUID REFERENCES foundation_token_collections(id),
    is_active BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Component Tokens
-- Stores component token mappings to foundation tokens (no hardcoded values allowed)
CREATE TABLE component_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID REFERENCES component_token_collections(id) ON DELETE CASCADE,
    token_path TEXT NOT NULL, -- 'backgroundColor.primary.default.default', 'color.secondary.hover', etc.
    foundation_token_reference TEXT NOT NULL, -- 'colors.primary.500', 'colors.gray.600', etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(collection_id, token_path)
);

-- Token Export History
-- Track token exports for audit purposes
CREATE TABLE token_exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    export_type VARCHAR(50) NOT NULL, -- 'json', 'css', 'scss', 'js', 'dtcg'
    foundation_collection_id UUID REFERENCES foundation_token_collections(id),
    component_collection_ids UUID[], -- Array of component collection IDs
    exported_by UUID REFERENCES users(id),
    export_data JSONB, -- Store export metadata
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_foundation_tokens_collection ON foundation_tokens(collection_id);
CREATE INDEX idx_foundation_tokens_category ON foundation_tokens(category, subcategory);
CREATE INDEX idx_foundation_tokens_active ON foundation_tokens(is_active);
CREATE INDEX idx_component_tokens_collection ON component_tokens(collection_id);
CREATE INDEX idx_component_tokens_path ON component_tokens(token_path);
CREATE INDEX idx_component_tokens_reference ON component_tokens(foundation_token_reference);
CREATE INDEX idx_component_collections_component ON component_token_collections(component_name);
CREATE INDEX idx_component_collections_active ON component_token_collections(is_active);
CREATE INDEX idx_foundation_collections_active ON foundation_token_collections(is_active);

-- Comments for documentation
COMMENT ON TABLE foundation_token_collections IS 'Collections of foundation design tokens (colors, typography, spacing, etc.)';
COMMENT ON TABLE foundation_tokens IS 'Individual foundation tokens with granular storage';
COMMENT ON TABLE component_token_collections IS 'Collections of component-specific tokens per component';
COMMENT ON TABLE component_tokens IS 'Component token mappings that reference foundation tokens only';
COMMENT ON TABLE token_exports IS 'Audit trail for token exports';

COMMENT ON COLUMN foundation_tokens.category IS 'Token category: colors, fontSize, fontWeight, lineHeight, spacing, borderRadius, borderWidth, boxShadow, opacity';
COMMENT ON COLUMN foundation_tokens.subcategory IS 'Token subcategory: primary, gray, etc. (null for non-nested tokens)';
COMMENT ON COLUMN foundation_tokens.token_key IS 'Token key within subcategory: 500, headingLG, 16, etc.';
COMMENT ON COLUMN component_tokens.token_path IS 'Dot notation path to component token: backgroundColor.primary.default.default';
COMMENT ON COLUMN component_tokens.foundation_token_reference IS 'Dot notation reference to foundation token: colors.primary.500';
