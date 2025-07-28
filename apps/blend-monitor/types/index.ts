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

// User role types
export interface UserRole {
    id: string
    name: string
    permissions: string[]
    isCustom: boolean
}

export interface AuditLog {
    id: string
    action: 'config_change' | 'permission_change'
    user: string
    timestamp: string
    details: Record<string, any>
    result: 'success' | 'failed'
    resource?: string
}
