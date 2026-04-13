import type { ColumnType } from 'kysely'
export type Generated<T> =
    T extends ColumnType<infer S, infer I, infer U>
        ? ColumnType<S, I | undefined, U>
        : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type ActivityLog = {
    id: string
    user_id: string | null
    action: string
    details: unknown | null
    metadata: unknown | null
    timestamp: Generated<Timestamp>
    created_at: Generated<Timestamp>
}
export type AuditLog = {
    id: string
    action: string
    user_id: string | null
    resource: string | null
    resource_id: string | null
    old_values: unknown | null
    new_values: unknown | null
    result: string
    timestamp: Generated<Timestamp>
    created_at: Generated<Timestamp>
}
export type CloudFunction = {
    id: string
    name: string
    version: string | null
    status: string
    avg_response_time: number | null
    error_rate: string | null
    invocations: number | null
    executions_per_hour: number | null
    executions_per_day: number | null
    schedule: string | null
    last_execution: Timestamp | null
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type Component = {
    id: string
    component_id: string
    name: string
    path: string
    category: string
    has_storybook: Generated<boolean>
    has_figma_connect: Generated<boolean>
    has_tests: Generated<boolean>
    last_modified: Timestamp | null
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type ComponentIntegration = {
    id: string
    component_id: string
    status: Generated<string>
    last_sync: Timestamp | null
    validation_errors: unknown | null
    figma_url: string | null
    variants: unknown | null
    props_mapping: unknown | null
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type CoverageMetric = {
    id: string
    total_components: number
    integrated_components: number
    percentage: string
    category_breakdown: unknown | null
    created_at: Generated<Timestamp>
}
export type Deployment = {
    id: string
    environment: string
    version: string
    deployer_name: string
    deployer_email: string
    start_time: Timestamp
    end_time: Timestamp | null
    status: string
    duration_seconds: number | null
    commit_sha: string | null
    build_logs_url: string | null
    configuration: unknown | null
    rollback_available: Generated<boolean>
    source: Generated<string>
    service: string | null
    site_url: string | null
    branch: string | null
    build_logs: string[]
    deployment_logs: string[]
    build_cache_key: string | null
    preview_url: string | null
    scheduled_for: Timestamp | null
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type DeploymentApproval = {
    id: string
    deployment_id: string
    requested_by: string
    requested_at: Timestamp
    approved_by: string | null
    approved_at: Timestamp | null
    rejected_by: string | null
    rejected_at: Timestamp | null
    status: Generated<string>
    comments: string | null
    expires_at: Timestamp
    created_at: Generated<Timestamp>
}
export type DownloadTrend = {
    id: string
    date: Timestamp
    downloads: number
    package_name: Generated<string>
    created_at: Generated<Timestamp>
}
export type Environment = {
    id: string
    name: string
    status: Generated<string>
    uptime_percentage: string | null
    current_version: string | null
    last_deployment: Timestamp | null
    url: string | null
    channel: string | null
    response_time_p50: number | null
    response_time_p95: number | null
    response_time_p99: number | null
    request_rate: number | null
    error_rate: string | null
    active_users: number | null
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type FirebaseUsage = {
    id: string
    service: string
    metric: string
    used_amount: string
    limit_amount: string | null
    unit: string
    current_cost: string | null
    projected_cost: string | null
    billing_period_end: Timestamp | null
    created_at: Generated<Timestamp>
}
export type NpmPackageStat = {
    id: string
    package_name: string
    version: string
    downloads_daily: Generated<number>
    downloads_weekly: Generated<number>
    downloads_monthly: Generated<number>
    downloads_total: Generated<number>
    size_unpacked: Generated<number>
    size_gzipped: Generated<number>
    dependencies_count: Generated<number>
    last_publish: Timestamp | null
    created_at: Generated<Timestamp>
}
export type NpmVersion = {
    id: string
    version: string
    published_at: Timestamp
    publisher: string | null
    downloads: Generated<number>
    changelog: string | null
    size_unpacked: number | null
    size_gzipped: number | null
    is_breaking: Generated<boolean>
    is_prerelease: Generated<boolean>
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type Role = {
    id: string
    name: string
    permissions: unknown
    is_custom: Generated<boolean>
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type SystemActivity = {
    id: string
    action: string
    details: unknown | null
    timestamp: Generated<Timestamp>
    created_at: Generated<Timestamp>
}
export type Team = {
    id: string
    name: string
    slug: string
    description: string | null
    logo_url: string | null
    website_url: string | null
    owner_id: string
    owner_name: string
    owner_email: string
    created_at: Generated<Timestamp>
    updated_at: Timestamp
}
export type TeamInvite = {
    id: string
    team_id: string
    email: string
    role: Generated<string>
    message: string | null
    invited_by: string
    invited_by_name: string
    status: Generated<string>
    expires_at: Timestamp
    created_at: Generated<Timestamp>
    accepted_at: Timestamp | null
    declined_at: Timestamp | null
}
export type TeamMember = {
    id: string
    team_id: string
    user_id: string
    role: Generated<string>
    is_active: Generated<boolean>
    invited_by: string
    invited_at: Generated<Timestamp>
    joined_at: Timestamp | null
    last_active_at: Timestamp | null
}
export type User = {
    id: string
    firebase_uid: string
    email: string
    display_name: string | null
    photo_url: string | null
    role: Generated<string>
    is_active: Generated<boolean>
    created_at: Generated<Timestamp>
    updated_at: Timestamp
    last_login: Timestamp | null
}
export type DB = {
    activity_logs: ActivityLog
    audit_logs: AuditLog
    cloud_functions: CloudFunction
    component_integrations: ComponentIntegration
    components: Component
    coverage_metrics: CoverageMetric
    deployment_approvals: DeploymentApproval
    deployments: Deployment
    download_trends: DownloadTrend
    environments: Environment
    firebase_usage: FirebaseUsage
    npm_package_stats: NpmPackageStat
    npm_versions: NpmVersion
    roles: Role
    system_activity: SystemActivity
    team_invites: TeamInvite
    team_members: TeamMember
    teams: Team
    users: User
}
