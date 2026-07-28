-- Add google_id column to existing users table
ALTER TABLE users ALTER COLUMN firebase_uid DROP NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255);

-- Create unique index for google_id (only for non-null values)
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS users_google_id_key ON users(google_id) WHERE google_id IS NOT NULL;

-- Verify changes
\d users
