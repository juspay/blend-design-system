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
    status: 'in_progress' | 'success' | 'failed' | 'rolled_back'
    duration?: number // in seconds
    commitSha: string
    buildLogsUrl?: string
    configuration?: Record<string, any>
    rollbackAvailable: boolean
    source?: 'database' | 'hosting' // Source of deployment
    service?: string // Service name (e.g., "Realtime Database", "Hosting: site-name")
    siteUrl?: string // URL for hosting sites
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
