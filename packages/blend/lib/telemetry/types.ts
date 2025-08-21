/**
 * Telemetry types for Blend Design System
 */

export interface TelemetryConfig {
    /** Whether telemetry is enabled (default: true, opt-out) */
    enabled: boolean
    /** Environment where the component is being used */
    environment?: 'development' | 'production' | 'staging'
    /** Sampling rate for events (0.0 to 1.0, default: 1.0) */
    samplingRate?: number
    /** Whether to log telemetry events to console (development only) */
    debug?: boolean

    // API Client Configuration
    /** Telemetry API endpoint URL (auto-detected if not provided) */
    apiEndpoint?: string
    /** Number of events to batch before sending (default: 10) */
    batchSize?: number
    /** Maximum time to wait before sending a batch in milliseconds (default: 5000) */
    batchTimeout?: number
    /** Number of retry attempts for failed requests (default: 3) */
    retryAttempts?: number
    /** Delay between retry attempts in milliseconds (default: 1000) */
    retryDelay?: number
    /** Whether to store events offline when network is unavailable (default: true) */
    offlineStorage?: boolean
}

export interface ProjectContext {
    /** Current page URL where component is used */
    pageUrl: string
    /** Page route/path (without domain) */
    pageRoute: string
    /** Repository name (from package.json name field) */
    repositoryName?: string
    /** Project version (from package.json version) */
    projectVersion?: string
    /** Project description (from package.json) */
    projectDescription?: string
    /** Deployment domain (e.g., "app.juspay.in", "localhost:3000") */
    domain: string
}

export interface ComponentUsageEvent {
    /** Type of telemetry event */
    eventType:
        | 'component_render'
        | 'component_mount'
        | 'component_unmount'
        | 'component_interaction'
    /** Name of the component being tracked */
    componentName: string
    /** Sanitized props used with the component */
    componentProps: Record<string, unknown>
    /** Number of instances of this exact component+props combination on the page */
    instanceCount: number
    /** Unique signature/hash of the component props for deduplication */
    propsSignature: string
    /** Project and page context where component is used */
    projectContext: ProjectContext
    /** Version of the Blend package */
    packageVersion: string
    /** Anonymous session identifier */
    sessionId: string
    /** Timestamp when event occurred */
    timestamp: number
    /** Environment information */
    environment: string
}

export interface TelemetryContextValue {
    config: TelemetryConfig
    track: (
        event: Omit<
            ComponentUsageEvent,
            | 'sessionId'
            | 'timestamp'
            | 'packageVersion'
            | 'environment'
            | 'projectContext'
            | 'instanceCount'
            | 'propsSignature'
        >
    ) => void
    updateConfig: (config: Partial<TelemetryConfig>) => void
}
