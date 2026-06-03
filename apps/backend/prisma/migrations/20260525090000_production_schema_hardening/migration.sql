-- Production schema hardening:
-- 1. Convert fixed organization policy strings to native enums.
-- 2. Make SET NULL relations nullable at the scalar column level.
-- 3. Enforce branch parent integrity with a self-referential FK.

CREATE TYPE "WcagEnforcement" AS ENUM ('none', 'warn', 'block');
CREATE TYPE "AllowedApprovers" AS ENUM ('admins', 'admins-and-editors', 'custom');

ALTER TABLE "organizations"
    ALTER COLUMN "wcag_enforcement" DROP DEFAULT,
    ALTER COLUMN "wcag_enforcement" TYPE "WcagEnforcement" USING (
        CASE
            WHEN "wcag_enforcement" IN ('none', 'warn', 'block') THEN "wcag_enforcement"
            ELSE 'warn'
        END::"WcagEnforcement"
    ),
    ALTER COLUMN "wcag_enforcement" SET DEFAULT 'warn';

ALTER TABLE "organizations"
    ALTER COLUMN "allowed_approvers" DROP DEFAULT,
    ALTER COLUMN "allowed_approvers" TYPE "AllowedApprovers" USING (
        CASE
            WHEN "allowed_approvers" IN ('admins', 'admins-and-editors', 'custom') THEN "allowed_approvers"
            ELSE 'admins'
        END::"AllowedApprovers"
    ),
    ALTER COLUMN "allowed_approvers" SET DEFAULT 'admins';

ALTER TABLE "token_uploads"
    ALTER COLUMN "uploaded_by" DROP NOT NULL;

ALTER TABLE "audit_logs"
    ALTER COLUMN "actor_id" DROP NOT NULL;

-- Existing data may contain orphaned parent IDs from before FK enforcement.
UPDATE "branches" AS child
SET "parent_branch_id" = NULL
WHERE child."parent_branch_id" IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM "branches" AS parent
      WHERE parent."id" = child."parent_branch_id"
  );

ALTER TABLE "branches"
    ADD CONSTRAINT "branches_parent_branch_id_fkey"
    FOREIGN KEY ("parent_branch_id")
    REFERENCES "branches"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;
