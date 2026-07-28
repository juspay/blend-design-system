-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "firebase_uid" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "display_name" VARCHAR(255),
    "photo_url" TEXT,
    "role" VARCHAR(50) NOT NULL DEFAULT 'viewer',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "logo_url" TEXT,
    "website_url" TEXT,
    "owner_id" UUID NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'viewer',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "invited_by" UUID NOT NULL,
    "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joined_at" TIMESTAMP(3),
    "last_active_at" TIMESTAMP(3),

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_invites" (
    "id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'viewer',
    "message" TEXT,
    "invited_by" UUID NOT NULL,
    "invited_by_name" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted_at" TIMESTAMP(3),
    "declined_at" TIMESTAMP(3),

    CONSTRAINT "team_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "permissions" JSONB NOT NULL,
    "is_custom" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "components" (
    "id" UUID NOT NULL,
    "component_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "path" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "has_storybook" BOOLEAN NOT NULL DEFAULT false,
    "has_figma_connect" BOOLEAN NOT NULL DEFAULT false,
    "has_tests" BOOLEAN NOT NULL DEFAULT false,
    "last_modified" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component_integrations" (
    "id" UUID NOT NULL,
    "component_id" UUID NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'not_integrated',
    "last_sync" TIMESTAMP(3),
    "validation_errors" JSONB,
    "figma_url" TEXT,
    "variants" JSONB,
    "props_mapping" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "component_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverage_metrics" (
    "id" UUID NOT NULL,
    "total_components" INTEGER NOT NULL,
    "integrated_components" INTEGER NOT NULL,
    "percentage" DECIMAL(5,2) NOT NULL,
    "category_breakdown" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coverage_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "npm_package_stats" (
    "id" UUID NOT NULL,
    "package_name" VARCHAR(255) NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "downloads_daily" INTEGER NOT NULL DEFAULT 0,
    "downloads_weekly" INTEGER NOT NULL DEFAULT 0,
    "downloads_monthly" INTEGER NOT NULL DEFAULT 0,
    "downloads_total" INTEGER NOT NULL DEFAULT 0,
    "size_unpacked" INTEGER NOT NULL DEFAULT 0,
    "size_gzipped" INTEGER NOT NULL DEFAULT 0,
    "dependencies_count" INTEGER NOT NULL DEFAULT 0,
    "last_publish" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "npm_package_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "npm_versions" (
    "id" UUID NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "publisher" VARCHAR(255),
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "changelog" TEXT,
    "size_unpacked" INTEGER,
    "size_gzipped" INTEGER,
    "is_breaking" BOOLEAN NOT NULL DEFAULT false,
    "is_prerelease" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "npm_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "download_trends" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "downloads" INTEGER NOT NULL,
    "package_name" VARCHAR(255) NOT NULL DEFAULT '@juspay/blend-design-system',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "download_trends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deployments" (
    "id" UUID NOT NULL,
    "environment" VARCHAR(100) NOT NULL,
    "version" VARCHAR(100) NOT NULL,
    "deployer_name" VARCHAR(255) NOT NULL,
    "deployer_email" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),
    "status" VARCHAR(50) NOT NULL,
    "duration_seconds" INTEGER,
    "commit_sha" VARCHAR(40),
    "build_logs_url" TEXT,
    "configuration" JSONB,
    "rollback_available" BOOLEAN NOT NULL DEFAULT false,
    "source" VARCHAR(50) NOT NULL DEFAULT 'database',
    "service" VARCHAR(255),
    "site_url" TEXT,
    "branch" VARCHAR(255),
    "build_logs" TEXT[],
    "deployment_logs" TEXT[],
    "build_cache_key" VARCHAR(255),
    "preview_url" TEXT,
    "scheduled_for" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deployments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deployment_approvals" (
    "id" UUID NOT NULL,
    "deployment_id" UUID NOT NULL,
    "requested_by" UUID NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL,
    "approved_by" UUID,
    "approved_at" TIMESTAMP(3),
    "rejected_by" UUID,
    "rejected_at" TIMESTAMP(3),
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "comments" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deployment_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "environments" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'unknown',
    "uptime_percentage" DECIMAL(5,2),
    "current_version" VARCHAR(100),
    "last_deployment" TIMESTAMP(3),
    "url" TEXT,
    "channel" VARCHAR(100),
    "response_time_p50" INTEGER,
    "response_time_p95" INTEGER,
    "response_time_p99" INTEGER,
    "request_rate" INTEGER,
    "error_rate" DECIMAL(5,2),
    "active_users" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "environments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "action" VARCHAR(255) NOT NULL,
    "details" JSONB,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_activity" (
    "id" UUID NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "details" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "user_id" UUID,
    "resource" VARCHAR(255),
    "resource_id" VARCHAR(255),
    "old_values" JSONB,
    "new_values" JSONB,
    "result" VARCHAR(50) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cloud_functions" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "version" VARCHAR(50),
    "status" VARCHAR(50) NOT NULL,
    "avg_response_time" INTEGER,
    "error_rate" DECIMAL(5,2),
    "invocations" INTEGER,
    "executions_per_hour" INTEGER,
    "executions_per_day" INTEGER,
    "schedule" VARCHAR(255),
    "last_execution" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cloud_functions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firebase_usage" (
    "id" UUID NOT NULL,
    "service" VARCHAR(100) NOT NULL,
    "metric" VARCHAR(100) NOT NULL,
    "used_amount" BIGINT NOT NULL,
    "limit_amount" BIGINT,
    "unit" VARCHAR(50) NOT NULL,
    "current_cost" DECIMAL(10,2),
    "projected_cost" DECIMAL(10,2),
    "billing_period_end" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "firebase_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uid_key" ON "users"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_firebase_uid_idx" ON "users"("firebase_uid");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_key" ON "teams"("slug");

-- CreateIndex
CREATE INDEX "teams_slug_idx" ON "teams"("slug");

-- CreateIndex
CREATE INDEX "teams_owner_id_idx" ON "teams"("owner_id");

-- CreateIndex
CREATE INDEX "team_members_team_id_idx" ON "team_members"("team_id");

-- CreateIndex
CREATE INDEX "team_members_user_id_idx" ON "team_members"("user_id");

-- CreateIndex
CREATE INDEX "team_members_role_idx" ON "team_members"("role");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_team_id_user_id_key" ON "team_members"("team_id", "user_id");

-- CreateIndex
CREATE INDEX "team_invites_team_id_idx" ON "team_invites"("team_id");

-- CreateIndex
CREATE INDEX "team_invites_email_idx" ON "team_invites"("email");

-- CreateIndex
CREATE INDEX "team_invites_status_idx" ON "team_invites"("status");

-- CreateIndex
CREATE UNIQUE INDEX "components_component_id_key" ON "components"("component_id");

-- CreateIndex
CREATE INDEX "components_component_id_idx" ON "components"("component_id");

-- CreateIndex
CREATE INDEX "components_category_idx" ON "components"("category");

-- CreateIndex
CREATE INDEX "components_name_idx" ON "components"("name");

-- CreateIndex
CREATE INDEX "component_integrations_component_id_idx" ON "component_integrations"("component_id");

-- CreateIndex
CREATE INDEX "component_integrations_status_idx" ON "component_integrations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "npm_versions_version_key" ON "npm_versions"("version");

-- CreateIndex
CREATE INDEX "npm_versions_published_at_idx" ON "npm_versions"("published_at");

-- CreateIndex
CREATE INDEX "npm_versions_version_idx" ON "npm_versions"("version");

-- CreateIndex
CREATE INDEX "download_trends_date_idx" ON "download_trends"("date");

-- CreateIndex
CREATE INDEX "download_trends_package_name_idx" ON "download_trends"("package_name");

-- CreateIndex
CREATE UNIQUE INDEX "download_trends_date_package_name_key" ON "download_trends"("date", "package_name");

-- CreateIndex
CREATE INDEX "deployments_environment_idx" ON "deployments"("environment");

-- CreateIndex
CREATE INDEX "deployments_status_idx" ON "deployments"("status");

-- CreateIndex
CREATE INDEX "deployments_start_time_idx" ON "deployments"("start_time");

-- CreateIndex
CREATE INDEX "deployment_approvals_deployment_id_idx" ON "deployment_approvals"("deployment_id");

-- CreateIndex
CREATE INDEX "deployment_approvals_status_idx" ON "deployment_approvals"("status");

-- CreateIndex
CREATE UNIQUE INDEX "environments_name_key" ON "environments"("name");

-- CreateIndex
CREATE INDEX "activity_logs_user_id_idx" ON "activity_logs"("user_id");

-- CreateIndex
CREATE INDEX "activity_logs_action_idx" ON "activity_logs"("action");

-- CreateIndex
CREATE INDEX "activity_logs_timestamp_idx" ON "activity_logs"("timestamp");

-- CreateIndex
CREATE INDEX "system_activity_action_idx" ON "system_activity"("action");

-- CreateIndex
CREATE INDEX "system_activity_timestamp_idx" ON "system_activity"("timestamp");

-- CreateIndex
CREATE INDEX "audit_logs_timestamp_idx" ON "audit_logs"("timestamp");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "firebase_usage_service_idx" ON "firebase_usage"("service");

-- CreateIndex
CREATE INDEX "firebase_usage_created_at_idx" ON "firebase_usage"("created_at");

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component_integrations" ADD CONSTRAINT "component_integrations_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployment_approvals" ADD CONSTRAINT "deployment_approvals_deployment_id_fkey" FOREIGN KEY ("deployment_id") REFERENCES "deployments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployment_approvals" ADD CONSTRAINT "deployment_approvals_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployment_approvals" ADD CONSTRAINT "deployment_approvals_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployment_approvals" ADD CONSTRAINT "deployment_approvals_rejected_by_fkey" FOREIGN KEY ("rejected_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
