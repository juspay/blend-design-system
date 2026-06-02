-- CreateEnum
CREATE TYPE "MergeRequestStatus" AS ENUM ('pending', 'approved', 'rejected', 'merged', 'cancelled');

-- CreateEnum
CREATE TYPE "PublishRequestStatus" AS ENUM ('pending', 'approved', 'rejected', 'published', 'cancelled');

-- CreateTable
CREATE TABLE "branch_protection_approvers" (
    "branch_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "branch_protection_approvers_pkey" PRIMARY KEY ("branch_id","user_id")
);

-- CreateIndex
CREATE INDEX "branch_protection_approvers_user_id_idx" ON "branch_protection_approvers"("user_id");

-- CreateIndex
CREATE INDEX "branches_parent_branch_id_idx" ON "branches"("parent_branch_id");

-- Rename columns for clarity and preserve data
ALTER TABLE "users" RENAME COLUMN "role" TO "system_role";
ALTER TABLE "members" RENAME COLUMN "role" TO "org_role";
ALTER TABLE "branches" RENAME COLUMN "brand_id" TO "branch_slug";
ALTER TABLE "branches" RENAME COLUMN "brand_config" TO "token_config";
ALTER TABLE "branch_versions" RENAME COLUMN "brand_config" TO "token_config";
ALTER TABLE "branch_snapshots" RENAME COLUMN "brand_config" TO "token_config";

-- Rename existing indexes to match new column naming
ALTER INDEX "branches_brand_id_idx" RENAME TO "branches_branch_slug_idx";
ALTER INDEX "branches_brand_id_key" RENAME TO "branches_branch_slug_key";

-- Convert organization default_branch_id to UUID with FK integrity
ALTER TABLE "organizations"
    ALTER COLUMN "default_branch_id" TYPE UUID USING (
        CASE
            WHEN "default_branch_id" IS NULL OR trim("default_branch_id") = '' THEN NULL
            WHEN trim("default_branch_id") ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN trim("default_branch_id")::uuid
            ELSE NULL
        END
    );

-- Backfill normalized protection approvers from old CSV column
INSERT INTO "branch_protection_approvers" ("branch_id", "user_id")
SELECT b."id",
       trim(approver_id)::uuid
FROM "branches" b,
     unnest(string_to_array(b."protection_allowed_approvers", ',')) AS approver_id
WHERE b."protection_allowed_approvers" IS NOT NULL
  AND trim(approver_id) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- Convert merge request status from VARCHAR to enum
ALTER TABLE "merge_requests"
    ALTER COLUMN "status" DROP DEFAULT,
    ALTER COLUMN "status" TYPE "MergeRequestStatus" USING (
        CASE
            WHEN "status" IN ('pending', 'approved', 'rejected', 'merged', 'cancelled') THEN "status"
            ELSE 'pending'
        END::"MergeRequestStatus"
    ),
    ALTER COLUMN "status" SET DEFAULT 'pending';

-- Convert publish request status from VARCHAR to enum
ALTER TABLE "publish_requests"
    ALTER COLUMN "status" DROP DEFAULT,
    ALTER COLUMN "status" TYPE "PublishRequestStatus" USING (
        CASE
            WHEN "status" IN ('pending', 'approved', 'rejected', 'published', 'cancelled') THEN "status"
            ELSE 'pending'
        END::"PublishRequestStatus"
    ),
    ALTER COLUMN "status" SET DEFAULT 'pending';

-- Strengthen token_locks.locked_by relation
ALTER TABLE "token_locks"
    ALTER COLUMN "locked_by" DROP NOT NULL;

-- Drop old denormalized approver column
ALTER TABLE "branches" DROP COLUMN "protection_allowed_approvers";

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_default_branch_id_fkey" FOREIGN KEY ("default_branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_locks" ADD CONSTRAINT "token_locks_locked_by_fkey" FOREIGN KEY ("locked_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch_protection_approvers" ADD CONSTRAINT "branch_protection_approvers_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch_protection_approvers" ADD CONSTRAINT "branch_protection_approvers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
