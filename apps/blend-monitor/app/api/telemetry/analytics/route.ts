/**
 * Telemetry Analytics API
 * GET /api/telemetry/analytics - Get comprehensive telemetry analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/src/backend/lib/database'

interface ComponentAnalytics {
    componentName: string
    totalUsage: number
    uniqueSessions: number
    uniqueVariants: number
    firstSeen: string
    lastSeen: string
    avgInstancesPerSession: number
}

interface RepositoryAnalytics {
    repositoryName: string
    totalComponents: number
    totalUsage: number
    uniqueComponents: number
    lastActivity: string
}

interface TrendData {
    date: string
    componentCount: number
    sessionCount: number
    eventCount: number
}

interface AnalyticsResponse {
    overview: {
        totalComponents: number
        totalSessions: number
        totalEvents: number
        totalRepositories: number
        mostUsedComponent: string
        mostActiveRepository: string
    }
    componentAnalytics: ComponentAnalytics[]
    repositoryAnalytics: RepositoryAnalytics[]
    trends: TrendData[]
    topVariants: Array<{
        componentName: string
        propsSignature: string
        componentProps: Record<string, unknown>
        usageCount: number
    }>
}

export async function GET(
    request: NextRequest
): Promise<NextResponse<AnalyticsResponse>> {
    try {
        // Overview metrics
        const overviewQuery = `
            SELECT 
                COUNT(DISTINCT component_name) as total_components,
                COUNT(DISTINCT session_id) as total_sessions,
                COUNT(*) as total_events,
                COUNT(DISTINCT repository_name) as total_repositories
            FROM component_usage_events
        `
        const overviewResult = await query(overviewQuery)
        const overview = overviewResult.rows[0]

        // Most used component
        const mostUsedComponentQuery = `
            SELECT component_name, COUNT(*) as usage_count
            FROM component_usage_events
            GROUP BY component_name
            ORDER BY usage_count DESC
            LIMIT 1
        `
        const mostUsedResult = await query(mostUsedComponentQuery)
        const mostUsedComponent =
            mostUsedResult.rows[0]?.component_name || 'N/A'

        // Most active repository
        const mostActiveRepoQuery = `
            SELECT repository_name, COUNT(*) as usage_count
            FROM component_usage_events
            GROUP BY repository_name
            ORDER BY usage_count DESC
            LIMIT 1
        `
        const mostActiveRepoResult = await query(mostActiveRepoQuery)
        const mostActiveRepository =
            mostActiveRepoResult.rows[0]?.repository_name || 'N/A'

        // Component analytics
        const componentAnalyticsQuery = `
            SELECT 
                component_name,
                COUNT(*) as total_usage,
                COUNT(DISTINCT session_id) as unique_sessions,
                COUNT(DISTINCT props_signature) as unique_variants,
                MIN(created_at) as first_seen,
                MAX(created_at) as last_seen,
                ROUND(COUNT(*)::numeric / COUNT(DISTINCT session_id), 2) as avg_instances_per_session
            FROM component_usage_events
            GROUP BY component_name
            ORDER BY total_usage DESC
        `
        const componentAnalyticsResult = await query(componentAnalyticsQuery)
        const componentAnalytics = componentAnalyticsResult.rows.map((row) => ({
            componentName: row.component_name,
            totalUsage: parseInt(row.total_usage),
            uniqueSessions: parseInt(row.unique_sessions),
            uniqueVariants: parseInt(row.unique_variants),
            firstSeen: row.first_seen,
            lastSeen: row.last_seen,
            avgInstancesPerSession: parseFloat(row.avg_instances_per_session),
        }))

        // Repository analytics
        const repositoryAnalyticsQuery = `
            SELECT 
                repository_name,
                COUNT(DISTINCT component_name) as total_components,
                COUNT(*) as total_usage,
                COUNT(DISTINCT component_name) as unique_components,
                MAX(created_at) as last_activity
            FROM component_usage_events
            GROUP BY repository_name
            ORDER BY total_usage DESC
        `
        const repositoryAnalyticsResult = await query(repositoryAnalyticsQuery)
        const repositoryAnalytics = repositoryAnalyticsResult.rows.map(
            (row) => ({
                repositoryName: row.repository_name,
                totalComponents: parseInt(row.total_components),
                totalUsage: parseInt(row.total_usage),
                uniqueComponents: parseInt(row.unique_components),
                lastActivity: row.last_activity,
            })
        )

        // Trends (daily data for last 30 days)
        const trendsQuery = `
            SELECT 
                DATE(created_at) as date,
                COUNT(DISTINCT component_name) as component_count,
                COUNT(DISTINCT session_id) as session_count,
                COUNT(*) as event_count
            FROM component_usage_events
            WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        `
        const trendsResult = await query(trendsQuery)
        const trends = trendsResult.rows.map((row) => ({
            date: row.date,
            componentCount: parseInt(row.component_count),
            sessionCount: parseInt(row.session_count),
            eventCount: parseInt(row.event_count),
        }))

        // Top variants (most used prop combinations)
        const topVariantsQuery = `
            SELECT 
                component_name,
                props_signature,
                component_props,
                COUNT(*) as usage_count
            FROM component_usage_events
            GROUP BY component_name, props_signature, component_props
            ORDER BY usage_count DESC
            LIMIT 20
        `
        const topVariantsResult = await query(topVariantsQuery)
        const topVariants = topVariantsResult.rows.map((row) => ({
            componentName: row.component_name,
            propsSignature: row.props_signature,
            componentProps:
                typeof row.component_props === 'string'
                    ? JSON.parse(row.component_props)
                    : row.component_props,
            usageCount: parseInt(row.usage_count),
        }))

        const response: AnalyticsResponse = {
            overview: {
                totalComponents: parseInt(overview.total_components),
                totalSessions: parseInt(overview.total_sessions),
                totalEvents: parseInt(overview.total_events),
                totalRepositories: parseInt(overview.total_repositories),
                mostUsedComponent,
                mostActiveRepository,
            },
            componentAnalytics,
            repositoryAnalytics,
            trends,
            topVariants,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Analytics API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch analytics data' },
            { status: 500 }
        )
    }
}
