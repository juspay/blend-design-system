/**
 * Telemetry Service
 * Handles all database operations for component usage telemetry
 * Implements UPSERT patterns with duplicate prevention
 */

import { query } from './database'

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface TelemetryEvent {
    sessionId: string
    componentName: string
    propsSignature: string
    repositoryName: string
    pageRoute: string
    eventType: string
    packageVersion?: string
    environment: string
    instanceCount: number
    componentProps: Record<string, unknown>
    userAgent?: string
    viewportWidth?: number
    viewportHeight?: number
    timestamp: Date
    clientTimestamp?: Date
}

export interface UpsertResult {
    id: string
    instanceCount: number
    action: 'created' | 'updated'
    isFirstUsage: boolean
}

export interface ComponentAnalytics {
    componentName: string
    totalEvents: number
    uniqueSessions: number
    uniqueRepositories: number
    totalInstances: number
    avgInstancesPerEvent: number
    firstUsage: Date
    lastUsage: Date
    activeDays: number
    topRepositories: Array<{
        repositoryName: string
        eventCount: number
        sessionCount: number
    }>
    commonProps: Array<{
        propsSignature: string
        usageCount: number
        propsJson: Record<string, unknown>
    }>
    dailyTrends: Array<{
        date: string
        events: number
        sessions: number
    }>
}

export interface RepositoryAnalytics {
    repositoryName: string
    totalEvents: number
    uniqueComponents: number
    uniqueSessions: number
    totalInstances: number
    firstUsage: Date
    lastUsage: Date
    activeDays: number
    mostCommonVersion: string
    componentBreakdown: Array<{
        componentName: string
        eventCount: number
        sessionCount: number
        lastUsed: Date
    }>
    adoptionTrend: Array<{
        date: string
        events: number
        uniqueComponents: number
    }>
}

export interface DashboardOverview {
    totalEvents: number
    totalSessions: number
    totalRepositories: number
    totalComponents: number
    todayEvents: number
    last7DaysEvents: number
    last30DaysEvents: number
    mostUsedComponents: Array<{
        componentName: string
        eventCount: number
        sessionCount: number
        repositoryCount: number
    }>
    topRepositories: Array<{
        repositoryName: string
        eventCount: number
        componentCount: number
        lastActive: Date
    }>
    recentActivity: Array<{
        timestamp: Date
        componentName: string
        repositoryName: string
        eventType: string
    }>
}

export interface TrendData {
    daily: Array<{
        date: string
        totalEvents: number
        uniqueSessions: number
        uniqueRepositories: number
        componentBreakdown: Record<string, number>
    }>
    weekly: Array<{
        week: string
        totalEvents: number
        uniqueSessions: number
        uniqueRepositories: number
    }>
    monthly: Array<{
        month: string
        totalEvents: number
        uniqueSessions: number
        uniqueRepositories: number
    }>
}

// =====================================================
// TELEMETRY SERVICE CLASS
// =====================================================

export class TelemetryService {
    constructor() {
        // No need for dependency injection - using shared database connection pool
    }

    // =====================================================
    // CORE DATA INGESTION
    // =====================================================

    /**
     * Insert or update telemetry event with duplicate prevention
     * Uses UPSERT pattern to handle duplicates gracefully
     */
    async upsertTelemetryEvent(event: TelemetryEvent): Promise<UpsertResult> {
        const queryText = `
            INSERT INTO component_usage_events (
                session_id, component_name, props_signature, repository_name, page_route,
                event_type, package_version, environment, instance_count, component_props,
                user_agent, viewport_width, viewport_height, timestamp, client_timestamp
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (session_id, component_name, props_signature, repository_name, page_route)
            DO UPDATE SET
                instance_count = component_usage_events.instance_count + EXCLUDED.instance_count,
                timestamp = GREATEST(component_usage_events.timestamp, EXCLUDED.timestamp),
                updated_at = NOW()
            RETURNING id, instance_count, 
                      CASE WHEN xmax = 0 THEN 'created' ELSE 'updated' END as action
        `

        const values = [
            event.sessionId,
            event.componentName,
            event.propsSignature,
            event.repositoryName,
            event.pageRoute,
            event.eventType,
            event.packageVersion,
            event.environment,
            event.instanceCount,
            JSON.stringify(event.componentProps),
            event.userAgent,
            event.viewportWidth,
            event.viewportHeight,
            event.timestamp,
            event.clientTimestamp || event.timestamp,
        ]

        try {
            const result = await query(queryText, values)
            const row = result.rows[0]

            // Check if this is the first usage of this component in this repository
            const isFirstUsage = await this.isFirstComponentUsageInRepository(
                event.componentName,
                event.repositoryName
            )

            // Update session and repository analytics asynchronously
            this.updateSessionAnalytics(event).catch(console.error)
            this.updateRepositoryAnalytics().catch(console.error)
            this.updatePropsAnalytics(event).catch(console.error)

            return {
                id: row.id,
                instanceCount: row.instance_count,
                action: row.action,
                isFirstUsage,
            }
        } catch (error) {
            console.error('Error upserting telemetry event:', error)
            throw new Error('Failed to store telemetry event')
        }
    }

    /**
     * Batch insert multiple telemetry events efficiently
     */
    async batchUpsertTelemetryEvents(
        events: TelemetryEvent[]
    ): Promise<UpsertResult[]> {
        if (events.length === 0) return []

        const results: UpsertResult[] = []

        // Process in chunks to avoid overwhelming the database
        const chunkSize = 100
        for (let i = 0; i < events.length; i += chunkSize) {
            const chunk = events.slice(i, i + chunkSize)
            const chunkResults = await Promise.all(
                chunk.map((event) => this.upsertTelemetryEvent(event))
            )
            results.push(...chunkResults)
        }

        return results
    }

    // =====================================================
    // ANALYTICS AND REPORTING
    // =====================================================

    /**
     * Get comprehensive analytics for a specific component
     */
    async getComponentAnalytics(
        componentName: string,
        days = 30
    ): Promise<ComponentAnalytics> {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - days)

        // Main component statistics
        const statsQuery = `
            SELECT 
                COUNT(*) as total_events,
                COUNT(DISTINCT session_id) as unique_sessions,
                COUNT(DISTINCT repository_name) as unique_repositories,
                SUM(instance_count) as total_instances,
                AVG(instance_count) as avg_instances_per_event,
                MIN(timestamp) as first_usage,
                MAX(timestamp) as last_usage,
                COUNT(DISTINCT DATE(timestamp)) as active_days
            FROM component_usage_events
            WHERE component_name = $1 AND timestamp >= $2
        `

        // Top repositories using this component
        const topReposQuery = `
            SELECT 
                repository_name,
                COUNT(*) as event_count,
                COUNT(DISTINCT session_id) as session_count
            FROM component_usage_events
            WHERE component_name = $1 AND timestamp >= $2
            GROUP BY repository_name
            ORDER BY event_count DESC
            LIMIT 10
        `

        // Common props combinations
        const commonPropsQuery = `
            SELECT 
                props_signature,
                props_json,
                usage_count
            FROM component_props_analytics
            WHERE component_name = $1
            ORDER BY usage_count DESC
            LIMIT 20
        `

        // Daily trends
        const trendsQuery = `
            SELECT 
                DATE(timestamp) as date,
                COUNT(*) as events,
                COUNT(DISTINCT session_id) as sessions
            FROM component_usage_events
            WHERE component_name = $1 AND timestamp >= $2
            GROUP BY DATE(timestamp)
            ORDER BY date DESC
        `

        try {
            const [statsResult, reposResult, propsResult, trendsResult] =
                await Promise.all([
                    query(statsQuery, [componentName, cutoffDate]),
                    query(topReposQuery, [componentName, cutoffDate]),
                    query(commonPropsQuery, [componentName]),
                    query(trendsQuery, [componentName, cutoffDate]),
                ])

            const stats = statsResult.rows[0]

            return {
                componentName,
                totalEvents: parseInt(stats.total_events),
                uniqueSessions: parseInt(stats.unique_sessions),
                uniqueRepositories: parseInt(stats.unique_repositories),
                totalInstances: parseInt(stats.total_instances),
                avgInstancesPerEvent: parseFloat(stats.avg_instances_per_event),
                firstUsage: stats.first_usage,
                lastUsage: stats.last_usage,
                activeDays: parseInt(stats.active_days),
                topRepositories: reposResult.rows.map((row) => ({
                    repositoryName: row.repository_name,
                    eventCount: parseInt(row.event_count),
                    sessionCount: parseInt(row.session_count),
                })),
                commonProps: propsResult.rows.map((row) => ({
                    propsSignature: row.props_signature,
                    usageCount: parseInt(row.usage_count),
                    propsJson: row.props_json,
                })),
                dailyTrends: trendsResult.rows.map((row) => ({
                    date: row.date.toISOString().split('T')[0],
                    events: parseInt(row.events),
                    sessions: parseInt(row.sessions),
                })),
            }
        } catch (error) {
            console.error('Error getting component analytics:', error)
            throw new Error('Failed to retrieve component analytics')
        }
    }

    /**
     * Get comprehensive analytics for a specific repository
     */
    async getRepositoryAnalytics(
        repositoryName: string,
        days = 30
    ): Promise<RepositoryAnalytics> {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - days)

        // Main repository statistics
        const statsQuery = `
            SELECT 
                COUNT(*) as total_events,
                COUNT(DISTINCT component_name) as unique_components,
                COUNT(DISTINCT session_id) as unique_sessions,
                SUM(instance_count) as total_instances,
                MIN(timestamp) as first_usage,
                MAX(timestamp) as last_usage,
                COUNT(DISTINCT DATE(timestamp)) as active_days,
                MODE() WITHIN GROUP (ORDER BY package_version) as most_common_version
            FROM component_usage_events
            WHERE repository_name = $1 AND timestamp >= $2
        `

        // Component breakdown
        const componentsQuery = `
            SELECT 
                component_name,
                COUNT(*) as event_count,
                COUNT(DISTINCT session_id) as session_count,
                MAX(timestamp) as last_used
            FROM component_usage_events
            WHERE repository_name = $1 AND timestamp >= $2
            GROUP BY component_name
            ORDER BY event_count DESC
        `

        // Adoption trend over time
        const trendQuery = `
            SELECT 
                DATE(timestamp) as date,
                COUNT(*) as events,
                COUNT(DISTINCT component_name) as unique_components
            FROM component_usage_events
            WHERE repository_name = $1 AND timestamp >= $2
            GROUP BY DATE(timestamp)
            ORDER BY date DESC
        `

        try {
            const [statsResult, componentsResult, trendResult] =
                await Promise.all([
                    query(statsQuery, [repositoryName, cutoffDate]),
                    query(componentsQuery, [repositoryName, cutoffDate]),
                    query(trendQuery, [repositoryName, cutoffDate]),
                ])

            const stats = statsResult.rows[0]

            return {
                repositoryName,
                totalEvents: parseInt(stats.total_events),
                uniqueComponents: parseInt(stats.unique_components),
                uniqueSessions: parseInt(stats.unique_sessions),
                totalInstances: parseInt(stats.total_instances),
                firstUsage: stats.first_usage,
                lastUsage: stats.last_usage,
                activeDays: parseInt(stats.active_days),
                mostCommonVersion: stats.most_common_version,
                componentBreakdown: componentsResult.rows.map((row) => ({
                    componentName: row.component_name,
                    eventCount: parseInt(row.event_count),
                    sessionCount: parseInt(row.session_count),
                    lastUsed: row.last_used,
                })),
                adoptionTrend: trendResult.rows.map((row) => ({
                    date: row.date.toISOString().split('T')[0],
                    events: parseInt(row.events),
                    uniqueComponents: parseInt(row.unique_components),
                })),
            }
        } catch (error) {
            console.error('Error getting repository analytics:', error)
            throw new Error('Failed to retrieve repository analytics')
        }
    }

    /**
     * Get dashboard overview with key metrics
     */
    async getDashboardOverview(): Promise<DashboardOverview> {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const last7Days = new Date()
        last7Days.setDate(last7Days.getDate() - 7)

        const last30Days = new Date()
        last30Days.setDate(last30Days.getDate() - 30)

        // Total statistics
        const totalStatsQuery = `
            SELECT 
                COUNT(*) as total_events,
                COUNT(DISTINCT session_id) as total_sessions,
                COUNT(DISTINCT repository_name) as total_repositories,
                COUNT(DISTINCT component_name) as total_components
            FROM component_usage_events
        `

        // Time-based statistics
        const timeStatsQuery = `
            SELECT 
                COUNT(CASE WHEN timestamp >= $1 THEN 1 END) as today_events,
                COUNT(CASE WHEN timestamp >= $2 THEN 1 END) as last_7_days_events,
                COUNT(CASE WHEN timestamp >= $3 THEN 1 END) as last_30_days_events
            FROM component_usage_events
        `

        // Most used components
        const topComponentsQuery = `
            SELECT 
                component_name,
                COUNT(*) as event_count,
                COUNT(DISTINCT session_id) as session_count,
                COUNT(DISTINCT repository_name) as repository_count
            FROM component_usage_events
            WHERE timestamp >= $1
            GROUP BY component_name
            ORDER BY event_count DESC
            LIMIT 10
        `

        // Top repositories
        const topRepositoriesQuery = `
            SELECT 
                repository_name,
                COUNT(*) as event_count,
                COUNT(DISTINCT component_name) as component_count,
                MAX(timestamp) as last_active
            FROM component_usage_events
            WHERE timestamp >= $1
            GROUP BY repository_name
            ORDER BY event_count DESC
            LIMIT 10
        `

        // Recent activity
        const recentActivityQuery = `
            SELECT 
                timestamp,
                component_name,
                repository_name,
                event_type
            FROM component_usage_events
            ORDER BY timestamp DESC
            LIMIT 20
        `

        try {
            const [
                totalStats,
                timeStats,
                topComponents,
                topRepositories,
                recentActivity,
            ] = await Promise.all([
                query(totalStatsQuery),
                query(timeStatsQuery, [today, last7Days, last30Days]),
                query(topComponentsQuery, [last30Days]),
                query(topRepositoriesQuery, [last30Days]),
                query(recentActivityQuery),
            ])

            const total = totalStats.rows[0]
            const time = timeStats.rows[0]

            return {
                totalEvents: parseInt(total.total_events),
                totalSessions: parseInt(total.total_sessions),
                totalRepositories: parseInt(total.total_repositories),
                totalComponents: parseInt(total.total_components),
                todayEvents: parseInt(time.today_events),
                last7DaysEvents: parseInt(time.last_7_days_events),
                last30DaysEvents: parseInt(time.last_30_days_events),
                mostUsedComponents: topComponents.rows.map((row) => ({
                    componentName: row.component_name,
                    eventCount: parseInt(row.event_count),
                    sessionCount: parseInt(row.session_count),
                    repositoryCount: parseInt(row.repository_count),
                })),
                topRepositories: topRepositories.rows.map((row) => ({
                    repositoryName: row.repository_name,
                    eventCount: parseInt(row.event_count),
                    componentCount: parseInt(row.component_count),
                    lastActive: row.last_active,
                })),
                recentActivity: recentActivity.rows.map((row) => ({
                    timestamp: row.timestamp,
                    componentName: row.component_name,
                    repositoryName: row.repository_name,
                    eventType: row.event_type,
                })),
            }
        } catch (error) {
            console.error('Error getting dashboard overview:', error)
            throw new Error('Failed to retrieve dashboard overview')
        }
    }

    /**
     * Get trend data for charts and graphs
     */
    async getTrendData(days = 30): Promise<TrendData> {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - days)

        // Daily trends
        const dailyQuery = `
            SELECT 
                DATE(timestamp) as date,
                COUNT(*) as total_events,
                COUNT(DISTINCT session_id) as unique_sessions,
                COUNT(DISTINCT repository_name) as unique_repositories,
                jsonb_object_agg(component_name, component_count) as component_breakdown
            FROM (
                SELECT 
                    timestamp,
                    session_id,
                    repository_name,
                    component_name,
                    COUNT(*) as component_count
                FROM component_usage_events
                WHERE timestamp >= $1
                GROUP BY DATE(timestamp), session_id, repository_name, component_name, timestamp
            ) daily_data
            GROUP BY DATE(timestamp)
            ORDER BY date DESC
        `

        try {
            const dailyResult = await query(dailyQuery, [cutoffDate])

            return {
                daily: dailyResult.rows.map((row) => ({
                    date: row.date.toISOString().split('T')[0],
                    totalEvents: parseInt(row.total_events),
                    uniqueSessions: parseInt(row.unique_sessions),
                    uniqueRepositories: parseInt(row.unique_repositories),
                    componentBreakdown: row.component_breakdown || {},
                })),
                weekly: [], // TODO: Implement weekly aggregation
                monthly: [], // TODO: Implement monthly aggregation
            }
        } catch (error) {
            console.error('Error getting trend data:', error)
            throw new Error('Failed to retrieve trend data')
        }
    }

    // =====================================================
    // HELPER METHODS
    // =====================================================

    /**
     * Update session analytics asynchronously
     */
    private async updateSessionAnalytics(event: TelemetryEvent): Promise<void> {
        const queryStr = `
            INSERT INTO telemetry_sessions (
                session_id, repository_name, package_version, environment,
                components_used, unique_components, total_interactions,
                first_event, last_event, user_agent,
                initial_viewport_width, initial_viewport_height
            ) VALUES ($1, $2, $3, $4, 1, 1, 1, $5, $5, $6, $7, $8)
            ON CONFLICT (session_id)
            DO UPDATE SET
                components_used = telemetry_sessions.components_used + 1,
                total_interactions = telemetry_sessions.total_interactions + 1,
                last_event = GREATEST(telemetry_sessions.last_event, EXCLUDED.last_event),
                updated_at = NOW()
        `

        const values = [
            event.sessionId,
            event.repositoryName,
            event.packageVersion,
            event.environment,
            event.timestamp,
            event.userAgent,
            event.viewportWidth,
            event.viewportHeight,
        ]

        await query(queryStr, values)
    }

    /**
     * Update repository analytics asynchronously
     */
    private async updateRepositoryAnalytics(): Promise<void> {
        // This would be a complex query to update repository analytics
        // For now, we'll rely on periodic batch updates
        // TODO: Implement real-time repository analytics updates
    }

    /**
     * Update props analytics asynchronously
     */
    private async updatePropsAnalytics(event: TelemetryEvent): Promise<void> {
        const queryStr = `
            INSERT INTO component_props_analytics (
                component_name, props_signature, props_json,
                usage_count, unique_sessions, unique_repositories
            ) VALUES ($1, $2, $3, 1, 1, 1)
            ON CONFLICT (component_name, props_signature)
            DO UPDATE SET
                usage_count = component_props_analytics.usage_count + 1,
                last_seen = NOW(),
                updated_at = NOW()
        `

        const values = [
            event.componentName,
            event.propsSignature,
            JSON.stringify(event.componentProps),
        ]

        await query(queryStr, values)
    }

    /**
     * Check if this is the first usage of a component in a repository
     */
    private async isFirstComponentUsageInRepository(
        componentName: string,
        repositoryName: string
    ): Promise<boolean> {
        const queryStr = `
            SELECT COUNT(*) as count
            FROM component_usage_events
            WHERE component_name = $1 AND repository_name = $2
        `

        const result = await query(queryStr, [componentName, repositoryName])
        return parseInt(result.rows[0].count) === 1
    }

    /**
     * Refresh materialized views for better performance
     */
    async refreshViews(): Promise<void> {
        await query('SELECT refresh_telemetry_views()', [])
    }

    /**
     * Clean up old telemetry data
     */
    async cleanupOldData(retentionDays = 365): Promise<number> {
        const result = await query('SELECT cleanup_old_telemetry_data($1)', [
            retentionDays,
        ])
        return result.rows[0].cleanup_old_telemetry_data
    }
}

// Export singleton instance
export const telemetryService = new TelemetryService()
