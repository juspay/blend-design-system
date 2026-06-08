-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'merge_request_merged_admin_bypass';
ALTER TYPE "AuditAction" ADD VALUE 'publish_request_created';
ALTER TYPE "AuditAction" ADD VALUE 'publish_request_approved';
ALTER TYPE "AuditAction" ADD VALUE 'publish_request_rejected';
ALTER TYPE "AuditAction" ADD VALUE 'publish_request_cancelled';
ALTER TYPE "AuditAction" ADD VALUE 'publish_request_published';
ALTER TYPE "AuditAction" ADD VALUE 'publish_request_published_admin_bypass';
ALTER TYPE "AuditAction" ADD VALUE 'organization_settings_updated';
ALTER TYPE "AuditAction" ADD VALUE 'branch_protection_enabled';
ALTER TYPE "AuditAction" ADD VALUE 'branch_protection_updated';
ALTER TYPE "AuditAction" ADD VALUE 'branch_protection_disabled';

-- AlterTable
ALTER TABLE "branches" ADD COLUMN     "is_protected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "protection_allowed_approvers" VARCHAR(500),
ADD COLUMN     "protection_min_approvals" INTEGER,
ADD COLUMN     "protection_require_approval" BOOLEAN;

-- AlterTable
ALTER TABLE "merge_requests" ALTER COLUMN "organization_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "allow_admin_bypass" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowed_approvers" VARCHAR(50) NOT NULL DEFAULT 'admins',
ADD COLUMN     "min_approvals" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "require_approval_for_merge" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "require_approval_for_publish" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "merge_request_approvals" (
    "id" UUID NOT NULL,
    "merge_request_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "user_role" VARCHAR(50) NOT NULL,
    "approved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merge_request_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publish_requests" (
    "id" UUID NOT NULL,
    "organization_id" UUID,
    "branch_id" UUID NOT NULL,
    "branch_name" VARCHAR(255) NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "changelog" TEXT,
    "is_breaking" BOOLEAN NOT NULL DEFAULT false,
    "is_prerelease" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "requested_by" UUID NOT NULL,
    "requested_by_name" VARCHAR(255) NOT NULL,
    "review_comment" TEXT,
    "published_version_id" UUID,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publish_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publish_request_approvals" (
    "id" UUID NOT NULL,
    "publish_request_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "user_role" VARCHAR(50) NOT NULL,
    "approved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publish_request_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "merge_request_approvals_merge_request_id_idx" ON "merge_request_approvals"("merge_request_id");

-- CreateIndex
CREATE INDEX "merge_request_approvals_user_id_idx" ON "merge_request_approvals"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "merge_request_approvals_merge_request_id_user_id_key" ON "merge_request_approvals"("merge_request_id", "user_id");

-- CreateIndex
CREATE INDEX "publish_requests_organization_id_idx" ON "publish_requests"("organization_id");

-- CreateIndex
CREATE INDEX "publish_requests_branch_id_idx" ON "publish_requests"("branch_id");

-- CreateIndex
CREATE INDEX "publish_requests_status_idx" ON "publish_requests"("status");

-- CreateIndex
CREATE INDEX "publish_requests_requested_by_idx" ON "publish_requests"("requested_by");

-- CreateIndex
CREATE INDEX "publish_request_approvals_publish_request_id_idx" ON "publish_request_approvals"("publish_request_id");

-- CreateIndex
CREATE INDEX "publish_request_approvals_user_id_idx" ON "publish_request_approvals"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "publish_request_approvals_publish_request_id_user_id_key" ON "publish_request_approvals"("publish_request_id", "user_id");

-- CreateIndex
CREATE INDEX "branches_is_protected_idx" ON "branches"("is_protected");

-- AddForeignKey
ALTER TABLE "merge_requests" ADD CONSTRAINT "merge_requests_source_branch_id_fkey" FOREIGN KEY ("source_branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merge_requests" ADD CONSTRAINT "merge_requests_target_branch_id_fkey" FOREIGN KEY ("target_branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merge_request_approvals" ADD CONSTRAINT "merge_request_approvals_merge_request_id_fkey" FOREIGN KEY ("merge_request_id") REFERENCES "merge_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publish_requests" ADD CONSTRAINT "publish_requests_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publish_requests" ADD CONSTRAINT "publish_requests_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publish_requests" ADD CONSTRAINT "publish_requests_published_version_id_fkey" FOREIGN KEY ("published_version_id") REFERENCES "branch_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publish_request_approvals" ADD CONSTRAINT "publish_request_approvals_publish_request_id_fkey" FOREIGN KEY ("publish_request_id") REFERENCES "publish_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
