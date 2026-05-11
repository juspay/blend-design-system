-- Rename actor_email to actor_email_hash and shrink column size
-- The field stores SHA-256 hashes (64 hex chars), not plaintext emails
ALTER TABLE "audit_logs" RENAME COLUMN "actor_email" TO "actor_email_hash";
ALTER TABLE "audit_logs" ALTER COLUMN "actor_email_hash" TYPE VARCHAR(64);
