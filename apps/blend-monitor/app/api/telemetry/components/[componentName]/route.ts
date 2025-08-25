/**
 * Component Analytics API Endpoint
 * GET /api/telemetry/components/[componentName] - Get detailed component analytics
 *
 * Features:
 * - Comprehensive component usage analytics
 * - Cached responses for performance
 * - Configurable time ranges
 * - Props usage analysis
 */

import { NextRequest, NextResponse } from 'next/server'
import { telemetryService } from '@/src/backend/lib/telemetry-service'
import { cacheService } from '@/src/backend/lib/cache-service'

// =====================================================
// TYPES
// =====================================================

interface ComponentAnalyticsResponse {
    success: boolean
    data?: {
        componentName: string
        timeRange: {
            days: number
            startDate: string
            endDate: string
        }
        overview: {
            totalEvents: number
            uniqueSessions: number
            uniqueRepositories: number
            totalInstances: number
            avgInstancesPerEvent: number
            firstUsage: string
            lastUsage: string
            activeDays: number
        }
        topRepositories: Array<{
            repositoryName: string
            eventCount: number
            sessionCount: number
            percentage: number
        }>
        commonProps: Array<{
            propsSignature: string
            usageCount: number
            percentage: number
            propsJson: Record<string, unknown>
        }>
        dailyTrends: Array<{
            date: string
            events: number
            sessions: number
            trend: 'up' | 'down' | 'stable'
        }>
        insights: {
            adoptionRate: string
            usagePattern: string
            recommendations: string[]
        }
        cacheInfo: {
            cached: boolean
            generatedAt: string
            expiresAt: string
        }
    }
    error?: string
    message?: string
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function calculateTrend(
    current: number,
    previous: number
): 'up' | 'down' | 'stable' {
    const threshold = 0.1 // 10% change threshold
    const change = (current - previous) / (previous || 1)

    if (change > threshold) return 'up'
    if (change < -threshold) return 'down'
    return 'stable'
}

function generateInsights(analytics: {
    uniqueRepositories: number
    totalEvents: number
    activeDays: number
    avgInstancesPerEvent: number
    commonProps: Array<{ percentage: number }>
    timeRange?: { days: number }
}): {
    adoptionRate: string
    usagePattern: string
    recommendations: string[]
} {
    const recommendations: string[] = []

    // Adoption rate analysis
    let adoptionRate = 'Low'
    if (analytics.uniqueRepositories > 10) adoptionRate = 'High'
    else if (analytics.uniqueRepositories > 3) adoptionRate = 'Medium'

    // Usage pattern analysis
    let usagePattern = 'Occasional'
    const avgEventsPerDay = analytics.totalEvents / analytics.activeDays
    if (avgEventsPerDay > 50) usagePattern = 'Heavy'
    else if (avgEventsPerDay > 10) usagePattern = 'Regular'

    // Generate recommendations
    if (analytics.uniqueRepositories < 3) {
        recommendations.push(
            'Consider promoting this component to increase adoption'
        )
    }

    if (analytics.avgInstancesPerEvent > 5) {
        recommendations.push(
            'High instance count suggests this component is useful for lists/grids'
        )
    }

    if (analytics.commonProps.length === 1) {
        recommendations.push(
            'Limited prop variety - consider documenting more use cases'
        )
    }

    if (
        analytics.timeRange?.days &&
        analytics.activeDays < analytics.timeRange.days * 0.3
    ) {
        recommendations.push(
            'Inconsistent usage pattern - investigate potential issues'
        )
    }

    return { adoptionRate, usagePattern, recommendations }
}

async function generateComponentAnalytics(
    componentName: string,
    days: number
): Promise<{
    componentName: string
    timeRange: { days: number; startDate: string; endDate: string }
    overview: {
        totalEvents: number
        uniqueSessions: number
        uniqueRepositories: number
        totalInstances: number
        avgInstancesPerEvent: number
        firstUsage: string
        lastUsage: string
        activeDays: number
    }
    topRepositories: Array<{
        repositoryName: string
        eventCount: number
        sessionCount: number
        percentage: number
    }>
    commonProps: Array<{
        propsSignature: string
        usageCount: number
        percentage: number
        propsJson: Record<string, unknown>
    }>
    dailyTrends: Array<{
        date: string
        events: number
        sessions: number
        trend: 'up' | 'down' | 'stable'
    }>
    insights: {
        adoptionRate: string
        usagePattern: string
        recommendations: string[]
    }
}> {
    try {
        // Get component analytics from service
        const analytics = await telemetryService.getComponentAnalytics(
            componentName,
            days
        )

        // Calculate additional metrics
        const totalEvents = analytics.totalEvents
        const repositoriesWithPercentage = analytics.topRepositories.map(
            (repo) => ({
                ...repo,
                percentage: Math.round((repo.eventCount / totalEvents) * 100),
            })
        )

        const propsWithPercentage = analytics.commonProps.map((prop) => ({
            ...prop,
            percentage: Math.round((prop.usageCount / totalEvents) * 100),
        }))

        // Add trend analysis to daily data
        const dailyWithTrends = analytics.dailyTrends.map((day, index) => {
            const previousDay = analytics.dailyTrends[index + 1]
            const trend = previousDay
                ? calculateTrend(day.events, previousDay.events)
                : 'stable'

            return {
                ...day,
                trend,
            }
        })

        // Generate insights
        const insights = generateInsights({
            ...analytics,
            timeRange: { days },
            commonProps: propsWithPercentage,
        })

        // Format dates
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        return {
            componentName,
            timeRange: {
                days,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            },
            overview: {
                totalEvents: analytics.totalEvents,
                uniqueSessions: analytics.uniqueSessions,
                uniqueRepositories: analytics.uniqueRepositories,
                totalInstances: analytics.totalInstances,
                avgInstancesPerEvent: analytics.avgInstancesPerEvent,
                firstUsage: analytics.firstUsage?.toISOString() || '',
                lastUsage: analytics.lastUsage?.toISOString() || '',
                activeDays: analytics.activeDays,
            },
            topRepositories: repositoriesWithPercentage,
            commonProps: propsWithPercentage,
            dailyTrends: dailyWithTrends,
            insights,
        }
    } catch (error) {
        console.error('Error generating component analytics:', error)
        throw error
    }
}

// =====================================================
// API ENDPOINTS
// =====================================================

/**
 * GET /api/telemetry/components/[componentName]
 * Get detailed analytics for a specific component
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ componentName: string }> }
): Promise<NextResponse<ComponentAnalyticsResponse>> {
    try {
        const resolvedParams = await params
        const componentName = decodeURIComponent(resolvedParams.componentName)
        const { searchParams } = new URL(request.url)

        // Parse query parameters
        const days = Math.min(parseInt(searchParams.get('days') || '30'), 365)
        const forceRefresh = searchParams.get('refresh') === 'true'

        // Validate component name
        if (!componentName || componentName.length < 1) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid component name',
                },
                { status: 400 }
            )
        }

        let analyticsData
        let cached = false
        let generatedAt = new Date()

        // Try to get cached data first (unless force refresh)
        if (!forceRefresh) {
            const cacheKey = `${componentName}:${days}`
            const cachedData =
                await cacheService.getCachedComponentAnalytics(cacheKey)
            if (
                cachedData &&
                typeof cachedData === 'object' &&
                cachedData !== null
            ) {
                const typedCachedData = cachedData as {
                    data: unknown
                    generatedAt: string
                }
                if (typedCachedData.data && typedCachedData.generatedAt) {
                    analyticsData = typedCachedData.data
                    cached = true
                    generatedAt = new Date(typedCachedData.generatedAt)
                }
            }
        }

        // Generate fresh data if not cached or force refresh
        if (!analyticsData) {
            analyticsData = await generateComponentAnalytics(
                componentName,
                days
            )
            generatedAt = new Date()

            // Cache the data for 10 minutes
            const cacheKey = `${componentName}:${days}`
            await cacheService.cacheComponentAnalytics(
                cacheKey,
                {
                    data: analyticsData,
                    generatedAt: generatedAt.toISOString(),
                },
                600
            )
        }

        // Calculate cache expiration
        const expiresAt = new Date(generatedAt.getTime() + 10 * 60 * 1000) // 10 minutes

        const response: ComponentAnalyticsResponse = {
            success: true,
            data: {
                ...(analyticsData as {
                    componentName: string
                    timeRange: {
                        days: number
                        startDate: string
                        endDate: string
                    }
                    overview: {
                        totalEvents: number
                        uniqueSessions: number
                        uniqueRepositories: number
                        totalInstances: number
                        avgInstancesPerEvent: number
                        firstUsage: string
                        lastUsage: string
                        activeDays: number
                    }
                    topRepositories: Array<{
                        repositoryName: string
                        eventCount: number
                        sessionCount: number
                        percentage: number
                    }>
                    commonProps: Array<{
                        propsSignature: string
                        usageCount: number
                        percentage: number
                        propsJson: Record<string, unknown>
                    }>
                    dailyTrends: Array<{
                        date: string
                        events: number
                        sessions: number
                        trend: 'up' | 'down' | 'stable'
                    }>
                    insights: {
                        adoptionRate: string
                        usagePattern: string
                        recommendations: string[]
                    }
                }),
                cacheInfo: {
                    cached,
                    generatedAt: generatedAt.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                },
            },
        }

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'public, max-age=600', // 10 minutes
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Component analytics API error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch component analytics',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

/**
 * GET /api/telemetry/components/[componentName]/export
 * Export component analytics data as CSV or JSON
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ componentName: string }> }
): Promise<NextResponse> {
    try {
        const resolvedParams = await params
        const componentName = decodeURIComponent(resolvedParams.componentName)
        const { searchParams } = new URL(request.url)
        const format = searchParams.get('format') || 'json'
        const days = Math.min(parseInt(searchParams.get('days') || '30'), 365)

        // TODO: Add authentication check for admin users

        const analyticsData = await generateComponentAnalytics(
            componentName,
            days
        )

        if (format === 'csv') {
            // Convert to CSV format
            const csvData = [
                ['Date', 'Events', 'Sessions', 'Trend'],
                ...analyticsData.dailyTrends.map((day) => [
                    day.date,
                    day.events,
                    day.sessions,
                    day.trend,
                ]),
            ]
                .map((row) => row.join(','))
                .join('\n')

            return new NextResponse(csvData, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename="${componentName}-analytics.csv"`,
                },
            })
        }

        // Return JSON format
        return NextResponse.json(analyticsData, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="${componentName}-analytics.json"`,
            },
        })
    } catch (error) {
        console.error('Component analytics export error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to export component analytics',
            },
            { status: 500 }
        )
    }
}

/**
 * OPTIONS /api/telemetry/components/[componentName]
 * CORS preflight handling
 */
export async function OPTIONS(): Promise<NextResponse> {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
        },
    })
}
