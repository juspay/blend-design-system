// Component related types
export interface ComponentInfo {
    id: string
    name: string
    path: string
    category: string
    hasStorybook: boolean
    hasFigmaConnect: boolean
    hasTests: boolean
    lastModified: string
    dependencies?: string[]
}

export interface IntegrationStatus {
    componentId: string
    status: 'active' | 'warning' | 'error' | 'not_integrated'
    lastSync: string | null
    validationErrors?: ValidationError[]
    figmaUrl: string | null
    variants?: VariantMapping[]
    propsMapping?: PropMapping[]
}

export interface ValidationError {
    type: 'prop_mismatch' | 'missing_variant' | 'sync_failed' | 'invalid_url'
    message: string
    severity: 'error' | 'warning'
}

export interface VariantMapping {
    figmaName: string
    codeName: string
    status: 'mapped' | 'unmapped'
}

export interface PropMapping {
    figmaProp: string
    codeProp: string
    type: string
    required: boolean
}

// Coverage related types
export interface CoverageMetrics {
    total: number
    integrated: number
    percentage: number
    lastUpdated: string
}

export interface CategoryStats {
    total: number
    integrated: number
    category: string
}

export interface CoverageTrend {
    date: string
    integrated: number
    total: number
}

// NPM related types
export interface PackageStats {
    name: string
    version: string
    downloads: {
        daily: number
        weekly: number
        monthly: number
        total: number
    }
    size: {
        unpacked: number
        gzipped: number
    }
    dependencies: number
    lastPublish: string
}

export interface VersionInfo {
    version: string
    publishedAt: string
    publisher: string
    downloads: number
    changelog?: string
    size?: {
        unpacked: number
        gzipped: number
    }
    breaking?: boolean
}

export interface DownloadTrend {
    date: string
    downloads: number
}

// Dashboard related types
export interface DashboardMetrics {
    components: CoverageMetrics
    npm: {
        version: string
        weeklyDownloads: number
        totalDownloads: number
        lastPublished: string
    }
    health: {
        overall: 'healthy' | 'warning' | 'critical'
        issues: {
            active: number
            resolved: number
        }
    }
}

export interface Activity {
    id: string
    type:
        | 'integration_added'
        | 'version_published'
        | 'sync_failed'
        | 'component_updated'
    component?: string
    version?: string
    timestamp: string
    user?: string
    details?: string
}

// Deployment related types
export interface Environment {
    id: string
    name: 'production' | 'staging' | 'development'
    status: 'healthy' | 'degraded' | 'down'
    uptime: number // percentage
    currentVersion: string
    lastDeployment: string
    url?: string
    channel?: string
    responseTime?: {
        p50: number
        p95: number
        p99: number
    }
    metrics?: {
        requestRate: number // requests per minute
        errorRate: number // percentage
        activeUsers: number
    }
}

export interface Deployment {
    id: string
    environment: string // Changed to string to support hosting site names
    version: string
    deployer: {
        name: string
        email: string
    }
    startTime: string
    endTime?: string
    status:
        | 'in_progress'
        | 'success'
        | 'failed'
        | 'rolled_back'
        | 'pending_approval'
        | 'approved'
        | 'rejected'
        | 'building'
        | 'deploying'
    duration?: number // in seconds
    commitSha: string
    buildLogsUrl?: string
    configuration?: Record<string, any>
    rollbackAvailable: boolean
    source?: 'database' | 'hosting' // Source of deployment
    service?: string // Service name (e.g., "Realtime Database", "Hosting: site-name")
    siteUrl?: string // URL for hosting sites
    branch?: string // Git branch
    buildLogs?: string[] // Build output logs
    deploymentLogs?: string[] // Deployment output logs
    approval?: DeploymentApproval
    buildCacheKey?: string // For build caching
    previewUrl?: string // For preview deployments
    scheduledFor?: string // For scheduled deployments
}

export interface DeploymentApproval {
    id: string
    deploymentId: string
    requestedBy: string
    requestedAt: string
    approvedBy?: string
    approvedAt?: string
    rejectedBy?: string
    rejectedAt?: string
    status: 'pending' | 'approved' | 'rejected' | 'expired'
    comments?: string
    expiresAt: string
}

export interface DeploymentRequest {
    target: 'blend-prod' | 'blend-staging' | string // Allow custom preview targets
    branch?: string
    commitSha?: string
    requireApproval?: boolean
    scheduledFor?: string
    isPreview?: boolean
    previewExpiry?: string
    buildOptions?: {
        clean?: boolean
        cache?: boolean
        parallel?: boolean
    }
}

export interface BuildCache {
    id: string
    commitSha: string
    target: string
    createdAt: string
    expiresAt: string
    size: number
    artifactPath: string
    buildLogs: string[]
}

export interface DeploymentNotification {
    id: string
    type:
        | 'deployment_started'
        | 'build_progress'
        | 'approval_required'
        | 'deployment_success'
        | 'deployment_failed'
        | 'rollback_available'
    deploymentId: string
    title: string
    message: string
    severity: 'info' | 'warning' | 'error' | 'success'
    timestamp: string
    read: boolean
    actionUrl?: string
    progress?: number // For build progress
}

export interface CloudFunction {
    name: string
    version: string
    status: 'healthy' | 'slow' | 'error' | 'active'
    avgResponseTime?: number
    errorRate?: number
    invocations?: number
    executionsPerHour?: number
    executionsPerDay?: number
    schedule?: string
    lastExecution?: string
}

export interface FirebaseUsage {
    hosting: {
        bandwidth: { used: number; limit: number; unit: string }
        storage: { used: number; limit: number; unit: string }
        requests: { used: number; limit: number; unit: string }
    }
    firestore: {
        reads: { used: number; limit: number; unit: string }
        writes: { used: number; limit: number; unit: string }
        storage: { used: number; limit: number; unit: string }
    }
    functions: {
        invocations: { used: number; limit: number; unit: string }
        gbSeconds: { used: number; limit: number; unit: string }
        outboundData: { used: number; limit: number; unit: string }
    }
    database?: {
        storage: { used: number; limit: number; unit: string }
        bandwidth: { used: number; limit: number; unit: string }
        connections: { used: number; limit: number; unit: string }
    }
    storage?: {
        storage: { used: number; limit: number; unit: string }
        bandwidth: { used: number; limit: number; unit: string }
        objects: { used: number; limit: number; unit: string }
    }
    auth?: {
        users: { used: number; limit: number; unit: string }
        activeUsers: { used: number; limit: number; unit: string }
    }
    billing: {
        currentCost: number
        projectedCost: number
        budget: number
        billingPeriodEnd: string
    }
}

export interface PerformanceMetrics {
    pageLoad: {
        fcp: number // First Contentful Paint
        lcp: number // Largest Contentful Paint
        fid: number // First Input Delay
        cls: number // Cumulative Layout Shift
    }
    network: {
        apiResponseTime: number
        imageLoadTime: number
        totalPageSize: number
    }
    customTraces: Array<{
        name: string
        duration: number
    }>
}

// User role types for deployment permissions
export interface UserRole {
    id: string
    name: 'admin' | 'developer' | 'viewer'
    permissions: {
        deployments: {
            view: boolean
            rollback: boolean
            deploy: boolean
        }
        components: {
            view: boolean
            edit: boolean
        }
    }
}

export interface AuditLog {
    id: string
    action: 'rollback' | 'deploy' | 'config_change' | 'permission_change'
    user: string
    timestamp: string
    details: Record<string, any>
    result: 'success' | 'failed'
    resource?: string
}
