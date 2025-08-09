-- Migration: Add responsive breakpoint support to component tokens
-- This migration adds breakpoint information to support responsive design tokens

-- Add breakpoint column to component_tokens table
ALTER TABLE component_tokens 
ADD COLUMN breakpoint VARCHAR(10) DEFAULT 'default';

-- Add index for better query performance
CREATE INDEX idx_component_tokens_breakpoint ON component_tokens(breakpoint);

-- Add index for combined queries
CREATE INDEX idx_component_tokens_collection_breakpoint ON component_tokens(collection_id, breakpoint);

-- Update existing tokens to have 'default' breakpoint
UPDATE component_tokens SET breakpoint = 'default' WHERE breakpoint IS NULL;

-- Add constraint to ensure valid breakpoint values
ALTER TABLE component_tokens 
ADD CONSTRAINT chk_component_tokens_breakpoint 
CHECK (breakpoint IN ('default', 'sm', 'lg'));

-- Add comment to document the breakpoint column
COMMENT ON COLUMN component_tokens.breakpoint IS 'Responsive breakpoint for the token (default, sm, lg)';
