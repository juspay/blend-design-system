-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'snapshot_restored';
ALTER TYPE "AuditAction" ADD VALUE 'user_deactivated';
ALTER TYPE "AuditAction" ADD VALUE 'member_invited';
ALTER TYPE "AuditAction" ADD VALUE 'member_removed';
ALTER TYPE "AuditAction" ADD VALUE 'token_locked';
ALTER TYPE "AuditAction" ADD VALUE 'token_unlocked';
ALTER TYPE "AuditAction" ADD VALUE 'merge_request_created';
ALTER TYPE "AuditAction" ADD VALUE 'merge_request_approved';
ALTER TYPE "AuditAction" ADD VALUE 'merge_request_rejected';
ALTER TYPE "AuditAction" ADD VALUE 'merge_request_merged';

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "blend_version" VARCHAR(50),
ADD COLUMN     "default_branch_id" VARCHAR(255),
ADD COLUMN     "wcag_enforcement" VARCHAR(20) NOT NULL DEFAULT 'warn';

-- CreateTable
CREATE TABLE "token_locks" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "token_path" VARCHAR(500) NOT NULL,
    "reason" TEXT,
    "locked_by" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_locks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merge_requests" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "source_branch_id" UUID NOT NULL,
    "source_branch_name" VARCHAR(255) NOT NULL,
    "target_branch_id" UUID NOT NULL,
    "target_branch_name" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "diff" JSONB NOT NULL,
    "lock_violations" JSONB,
    "requested_by" UUID NOT NULL,
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMP(3),
    "review_comment" TEXT,
    "merged_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merge_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "token_locks_organization_id_idx" ON "token_locks"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_locks_organization_id_token_path_key" ON "token_locks"("organization_id", "token_path");

-- CreateIndex
CREATE INDEX "merge_requests_organization_id_idx" ON "merge_requests"("organization_id");

-- CreateIndex
CREATE INDEX "merge_requests_status_idx" ON "merge_requests"("status");

-- CreateIndex
CREATE INDEX "merge_requests_source_branch_id_idx" ON "merge_requests"("source_branch_id");

-- CreateIndex
CREATE INDEX "merge_requests_target_branch_id_idx" ON "merge_requests"("target_branch_id");

-- CreateIndex
CREATE INDEX "merge_requests_requested_by_idx" ON "merge_requests"("requested_by");

-- AddForeignKey
ALTER TABLE "token_locks" ADD CONSTRAINT "token_locks_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merge_requests" ADD CONSTRAINT "merge_requests_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
