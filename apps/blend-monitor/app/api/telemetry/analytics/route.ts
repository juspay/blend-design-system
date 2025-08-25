/**
 * Telemetry Analytics API - Updated for Page Composition System
 * GET /api/telemetry/analytics - Get comprehensive telemetry analytics
 */

import { NextResponse } from 'next/server'
import { query } from '@/src/backend/lib/database'

interface ComponentAnalytics {
    componentName: string
    totalUsage: number
    uniquePages: number
    uniqueVariants: number
    firstSeen: string
    lastSeen: string
    avgInstancesPerPage: number
}

interface RepositoryAnalytics {
    repositoryName: string
    totalPages: number
    totalComponents: number
    uniqueComponents: number
    lastActivity: string
}

interface TrendData {
    date: string
    pageCount: number
    componentCount: number
    repositoryCount: number
}

interface AnalyticsResponse {
    overview: {
        totalComponents: number
        totalPages: number
        totalRepositories: number
        mostUsedComponent: string
        mostActiveRepository: string
        totalUniqueCompositions: number
    }
    componentAnalytics: ComponentAnalytics[]
    repositoryAnalytics: RepositoryAnalytics[]
    trends: TrendData[]
    topVariants: Array<{
        componentName: string
        propsSignature: string
        componentProps: Record<string, unknown>
        usageCount: number
        pageCount: number
    }>
}

export async function GET(): Promise<
    NextResponse<AnalyticsResponse | { error: string }>
> {
    try {
        console.log('Analytics API: Starting request')

        // Check if page_compositions table exists
        const tableExistsQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'page_compositions'
            );
        `
        const tableExistsResult = await query(tableExistsQuery)
        const tableExists = tableExistsResult.rows[0]?.exists

        if (!tableExists) {
            // Return empty analytics if table doesn't exist
            const emptyResponse: AnalyticsResponse = {
                overview: {
                    totalComponents: 0,
                    totalPages: 0,
                    totalRepositories: 0,
                    totalUniqueCompositions: 0,
                    mostUsedComponent: 'N/A',
                    mostActiveRepository: 'N/A',
                },
                componentAnalytics: [],
                repositoryAnalytics: [],
                trends: [],
                topVariants: [],
            }
            return NextResponse.json(emptyResponse)
        }

        // Overview metrics from page compositions
        const overviewQuery = `
            WITH component_stats AS (
                SELECT 
                    jsonb_array_elements(components) as component,
                    repository_name,
                    page_fingerprint
                FROM page_compositions
            ),
            expanded_components AS (
                SELECT 
                    component->>'name' as component_name,
                    (component->>'instanceCount')::int as instance_count,
                    repository_name,
                    page_fingerprint
                FROM component_stats
            )
            SELECT 
                COUNT(DISTINCT ec.component_name) as total_components,
                COUNT(DISTINCT pc.page_fingerprint) as total_pages,
                COUNT(DISTINCT pc.repository_name) as total_repositories,
                COUNT(DISTINCT pc.composition_hash) as total_unique_compositions
            FROM page_compositions pc
            LEFT JOIN expanded_components ec ON pc.page_fingerprint = ec.page_fingerprint
        `
        const overviewResult = await query(overviewQuery)
        const overview = overviewResult.rows[0] || {
            total_components: 0,
            total_pages: 0,
            total_repositories: 0,
            total_unique_compositions: 0,
        }

        // Most used component (by total instances across all pages)
        const mostUsedComponentQuery = `
            WITH component_stats AS (
                SELECT 
                    jsonb_array_elements(components) as component
                FROM page_compositions
            )
            SELECT 
                component->>'name' as component_name,
                SUM((component->>'instanceCount')::int) as total_instances
            FROM component_stats
            GROUP BY component->>'name'
            ORDER BY total_instances DESC
            LIMIT 1
        `
        const mostUsedResult = await query(mostUsedComponentQuery)
        const mostUsedComponent =
            mostUsedResult.rows[0]?.component_name || 'N/A'

        // Most active repository (by number of pages)
        const mostActiveRepoQuery = `
            SELECT 
                repository_name,
                COUNT(DISTINCT page_fingerprint) as page_count
            FROM page_compositions
            GROUP BY repository_name
            ORDER BY page_count DESC
            LIMIT 1
        `
        const mostActiveRepoResult = await query(mostActiveRepoQuery)
        const mostActiveRepository =
            mostActiveRepoResult.rows[0]?.repository_name || 'N/A'

        // Component analytics - aggregated from page compositions
        const componentAnalyticsQuery = `
            WITH component_stats AS (
                SELECT 
                    jsonb_array_elements(components) as component,
                    page_fingerprint,
                    created_at,
                    updated_at
                FROM page_compositions
            ),
            component_details AS (
                SELECT 
                    component->>'name' as component_name,
                    (component->>'instanceCount')::int as instance_count,
                    component->>'propsSignature' as props_signature,
                    page_fingerprint,
                    created_at,
                    updated_at
                FROM component_stats
            )
            SELECT 
                component_name,
                SUM(instance_count) as total_usage,
                COUNT(DISTINCT page_fingerprint) as unique_pages,
                COUNT(DISTINCT props_signature) as unique_variants,
                MIN(created_at) as first_seen,
                MAX(GREATEST(created_at, updated_at)) as last_seen,
                ROUND(AVG(instance_count), 2) as avg_instances_per_page
            FROM component_details
            WHERE component_name IS NOT NULL
            GROUP BY component_name
            ORDER BY total_usage DESC
        `
        const componentAnalyticsResult = await query(componentAnalyticsQuery)
        const componentAnalytics = componentAnalyticsResult.rows.map((row) => ({
            componentName: row.component_name,
            totalUsage: parseInt(row.total_usage),
            uniquePages: parseInt(row.unique_pages),
            uniqueVariants: parseInt(row.unique_variants),
            firstSeen: row.first_seen,
            lastSeen: row.last_seen,
            avgInstancesPerPage: parseFloat(row.avg_instances_per_page),
        }))

        // Repository analytics
        const repositoryAnalyticsQuery = `
            WITH component_stats AS (
                SELECT 
                    repository_name,
                    page_fingerprint,
                    jsonb_array_elements(components) as component,
                    GREATEST(created_at, updated_at) as last_activity
                FROM page_compositions
            )
            SELECT 
                repository_name,
                COUNT(DISTINCT page_fingerprint) as total_pages,
                SUM((component->>'instanceCount')::int) as total_components,
                COUNT(DISTINCT component->>'name') as unique_components,
                MAX(last_activity) as last_activity
            FROM component_stats
            GROUP BY repository_name
            ORDER BY total_components DESC
        `
        const repositoryAnalyticsResult = await query(repositoryAnalyticsQuery)
        const repositoryAnalytics = repositoryAnalyticsResult.rows.map(
            (row) => ({
                repositoryName: row.repository_name,
                totalPages: parseInt(row.total_pages),
                totalComponents: parseInt(row.total_components),
                uniqueComponents: parseInt(row.unique_components),
                lastActivity: row.last_activity,
            })
        )

        // Trends (daily data for last 30 days)
        const trendsQuery = `
            WITH daily_stats AS (
                SELECT 
                    DATE(GREATEST(created_at, updated_at)) as date,
                    page_fingerprint,
                    repository_name,
                    jsonb_array_elements(components) as component
                FROM page_compositions
                WHERE GREATEST(created_at, updated_at) >= CURRENT_DATE - INTERVAL '30 days'
            )
            SELECT 
                date,
                COUNT(DISTINCT page_fingerprint) as page_count,
                COUNT(DISTINCT component->>'name') as component_count,
                COUNT(DISTINCT repository_name) as repository_count
            FROM daily_stats
            GROUP BY date
            ORDER BY date DESC
        `
        const trendsResult = await query(trendsQuery)
        const trends = trendsResult.rows.map((row) => ({
            date: row.date,
            pageCount: parseInt(row.page_count),
            componentCount: parseInt(row.component_count),
            repositoryCount: parseInt(row.repository_count),
        }))

        // Top variants (most used component configurations)
        const topVariantsQuery = `
            WITH component_stats AS (
                SELECT 
                    jsonb_array_elements(components) as component,
                    page_fingerprint
                FROM page_compositions
            ),
            component_variants AS (
                SELECT 
                    component->>'name' as component_name,
                    component->>'propsSignature' as props_signature,
                    component->'props' as component_props,
                    (component->>'instanceCount')::int as instance_count,
                    page_fingerprint
                FROM component_stats
                WHERE component->>'name' IS NOT NULL
            )
            SELECT 
                component_name,
                props_signature,
                component_props,
                SUM(instance_count) as usage_count,
                COUNT(DISTINCT page_fingerprint) as page_count
            FROM component_variants
            GROUP BY component_name, props_signature, component_props
            ORDER BY usage_count DESC
            LIMIT 20
        `
        const topVariantsResult = await query(topVariantsQuery)
        const topVariants = topVariantsResult.rows.map((row) => ({
            componentName: row.component_name,
            propsSignature: row.props_signature || 'default',
            componentProps:
                typeof row.component_props === 'string'
                    ? JSON.parse(row.component_props)
                    : row.component_props || {},
            usageCount: parseInt(row.usage_count),
            pageCount: parseInt(row.page_count),
        }))

        const response: AnalyticsResponse = {
            overview: {
                totalComponents: parseInt(overview.total_components) || 0,
                totalPages: parseInt(overview.total_pages) || 0,
                totalRepositories: parseInt(overview.total_repositories) || 0,
                totalUniqueCompositions:
                    parseInt(overview.total_unique_compositions) || 0,
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
