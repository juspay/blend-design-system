/**
 * Repository Analytics API Endpoint
 * GET /api/telemetry/repositories - Get repository adoption analytics
 *
 * Features:
 * - Repository-specific adoption metrics
 * - Component usage breakdown per repository
 * - Adoption trends and insights
 * - Cached responses for performance
 */

import { NextRequest, NextResponse } from 'next/server'
import { telemetryService } from '@/backend/lib/telemetry-service'
import { cacheService } from '@/backend/lib/cache-service'

// =====================================================
// TYPES
// =====================================================

interface RepositoryAnalyticsResponse {
    success: boolean
    data?: {
        repositories: Array<{
            repositoryName: string
            overview: {
                totalEvents: number
                uniqueComponents: number
                uniqueSessions: number
                totalInstances: number
                firstUsage: string
                lastUsage: string
                activeDays: number
                mostCommonVersion: string
            }
            componentBreakdown: Array<{
                componentName: string
                eventCount: number
                sessionCount: number
                lastUsed: string
                percentage: number
            }>
            adoptionTrend: Array<{
                date: string
                events: number
                uniqueComponents: number
            }>
            adoptionScore: number
            recommendations: string[]
        }>
        summary: {
            totalRepositories: number
            averageComponentsPerRepo: number
            mostActiveRepository: string
            leastActiveRepository: string
            totalAdoptionScore: number
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

interface SingleRepositoryResponse {
    success: boolean
    data?: {
        repositoryName: string
        timeRange: {
            days: number
            startDate: string
            endDate: string
        }
        overview: {
            totalEvents: number
            uniqueComponents: number
            uniqueSessions: number
            totalInstances: number
            firstUsage: string
            lastUsage: string
            activeDays: number
            mostCommonVersion: string
        }
        componentBreakdown: Array<{
            componentName: string
            eventCount: number
            sessionCount: number
            lastUsed: string
            percentage: number
        }>
        adoptionTrend: Array<{
            date: string
            events: number
            uniqueComponents: number
        }>
        insights: {
            adoptionScore: number
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

function calculateAdoptionScore(
    uniqueComponents: number,
    totalEvents: number,
    activeDays: number,
    timeRange: number
): number {
    // Adoption score based on component diversity, usage frequency, and consistency
    const componentDiversityScore = Math.min(uniqueComponents * 2, 40) // Max 40 points for 20+ components
    const usageFrequencyScore = Math.min(totalEvents / 10, 30) // Max 30 points for 300+ events
    const consistencyScore = Math.min((activeDays / timeRange) * 30, 30) // Max 30 points for daily usage

    return Math.round(
        componentDiversityScore + usageFrequencyScore + consistencyScore
    )
}

function generateRepositoryRecommendations(
    overview: {
        uniqueComponents: number
        totalEvents: number
        activeDays: number
    },
    componentBreakdown: Array<{
        componentName: string
        percentage: number
    }>,
    adoptionScore: number
): string[] {
    const recommendations: string[] = []

    if (adoptionScore < 30) {
        recommendations.push(
            'Low adoption score - consider providing documentation or training'
        )
    }

    if (overview.uniqueComponents < 5) {
        recommendations.push(
            'Using few components - explore more design system components'
        )
    }

    if (componentBreakdown.length > 0) {
        const topComponent = componentBreakdown[0]
        if (topComponent.percentage > 70) {
            recommendations.push(
                `Heavy reliance on ${topComponent.componentName} - consider diversifying component usage`
            )
        }
    }

    const avgEventsPerDay = overview.totalEvents / overview.activeDays
    if (avgEventsPerDay < 5) {
        recommendations.push(
            'Low daily usage - investigate potential integration issues'
        )
    }

    if (overview.activeDays < 7) {
        recommendations.push(
            'Recent adoption - monitor for consistent usage patterns'
        )
    }

    return recommendations
}

async function generateAllRepositoriesAnalytics(days: number): Promise<{
    repositories: Array<{
        repositoryName: string
        overview: {
            totalEvents: number
            uniqueComponents: number
            uniqueSessions: number
            totalInstances: number
            firstUsage: string
            lastUsage: string
            activeDays: number
            mostCommonVersion: string
        }
        componentBreakdown: Array<{
            componentName: string
            eventCount: number
            sessionCount: number
            lastUsed: string
            percentage: number
        }>
        adoptionTrend: Array<{
            date: string
            events: number
            uniqueComponents: number
        }>
        adoptionScore: number
        recommendations: string[]
    }>
    summary: {
        totalRepositories: number
        averageComponentsPerRepo: number
        mostActiveRepository: string
        leastActiveRepository: string
        totalAdoptionScore: number
    }
}> {
    try {
        // This would require a method to get all repositories
        // For now, we'll return a placeholder implementation
        const repositories = [
            'repo1',
            'repo2',
            'repo3', // This should come from database
        ]

        const repositoryData = await Promise.all(
            repositories.map(async (repoName) => {
                const analytics = await telemetryService.getRepositoryAnalytics(
                    repoName,
                    days
                )

                const totalEvents = analytics.totalEvents
                const componentBreakdownWithPercentage =
                    analytics.componentBreakdown.map((comp) => ({
                        ...comp,
                        lastUsed: comp.lastUsed.toISOString(),
                        percentage: Math.round(
                            (comp.eventCount / totalEvents) * 100
                        ),
                    }))

                const adoptionScore = calculateAdoptionScore(
                    analytics.uniqueComponents,
                    analytics.totalEvents,
                    analytics.activeDays,
                    days
                )

                const recommendations = generateRepositoryRecommendations(
                    analytics,
                    componentBreakdownWithPercentage,
                    adoptionScore
                )

                return {
                    repositoryName: repoName,
                    overview: {
                        totalEvents: analytics.totalEvents,
                        uniqueComponents: analytics.uniqueComponents,
                        uniqueSessions: analytics.uniqueSessions,
                        totalInstances: analytics.totalInstances,
                        firstUsage: analytics.firstUsage?.toISOString() || '',
                        lastUsage: analytics.lastUsage?.toISOString() || '',
                        activeDays: analytics.activeDays,
                        mostCommonVersion: analytics.mostCommonVersion,
                    },
                    componentBreakdown: componentBreakdownWithPercentage,
                    adoptionTrend: analytics.adoptionTrend,
                    adoptionScore,
                    recommendations,
                }
            })
        )

        // Calculate summary statistics
        const totalRepositories = repositoryData.length
        const averageComponentsPerRepo = Math.round(
            repositoryData.reduce(
                (sum, repo) => sum + repo.overview.uniqueComponents,
                0
            ) / totalRepositories
        )

        const mostActiveRepository = repositoryData.reduce((max, repo) =>
            repo.overview.totalEvents > max.overview.totalEvents ? repo : max
        ).repositoryName

        const leastActiveRepository = repositoryData.reduce((min, repo) =>
            repo.overview.totalEvents < min.overview.totalEvents ? repo : min
        ).repositoryName

        const totalAdoptionScore = Math.round(
            repositoryData.reduce((sum, repo) => sum + repo.adoptionScore, 0) /
                totalRepositories
        )

        return {
            repositories: repositoryData,
            summary: {
                totalRepositories,
                averageComponentsPerRepo,
                mostActiveRepository,
                leastActiveRepository,
                totalAdoptionScore,
            },
        }
    } catch (error) {
        console.error('Error generating repositories analytics:', error)
        throw error
    }
}

async function generateSingleRepositoryAnalytics(
    repositoryName: string,
    days: number
): Promise<{
    repositoryName: string
    timeRange: {
        days: number
        startDate: string
        endDate: string
    }
    overview: {
        totalEvents: number
        uniqueComponents: number
        uniqueSessions: number
        totalInstances: number
        firstUsage: string
        lastUsage: string
        activeDays: number
        mostCommonVersion: string
    }
    componentBreakdown: Array<{
        componentName: string
        eventCount: number
        sessionCount: number
        lastUsed: string
        percentage: number
    }>
    adoptionTrend: Array<{
        date: string
        events: number
        uniqueComponents: number
    }>
    insights: {
        adoptionScore: number
        usagePattern: string
        recommendations: string[]
    }
}> {
    try {
        const analytics = await telemetryService.getRepositoryAnalytics(
            repositoryName,
            days
        )

        const totalEvents = analytics.totalEvents
        const componentBreakdownWithPercentage =
            analytics.componentBreakdown.map((comp) => ({
                ...comp,
                lastUsed: comp.lastUsed.toISOString(),
                percentage: Math.round((comp.eventCount / totalEvents) * 100),
            }))

        const adoptionScore = calculateAdoptionScore(
            analytics.uniqueComponents,
            analytics.totalEvents,
            analytics.activeDays,
            days
        )

        const recommendations = generateRepositoryRecommendations(
            analytics,
            componentBreakdownWithPercentage,
            adoptionScore
        )

        // Determine usage pattern
        const avgEventsPerDay = analytics.totalEvents / analytics.activeDays
        let usagePattern = 'Light'
        if (avgEventsPerDay > 50) usagePattern = 'Heavy'
        else if (avgEventsPerDay > 20) usagePattern = 'Moderate'

        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        return {
            repositoryName,
            timeRange: {
                days,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            },
            overview: {
                totalEvents: analytics.totalEvents,
                uniqueComponents: analytics.uniqueComponents,
                uniqueSessions: analytics.uniqueSessions,
                totalInstances: analytics.totalInstances,
                firstUsage: analytics.firstUsage?.toISOString() || '',
                lastUsage: analytics.lastUsage?.toISOString() || '',
                activeDays: analytics.activeDays,
                mostCommonVersion: analytics.mostCommonVersion,
            },
            componentBreakdown: componentBreakdownWithPercentage,
            adoptionTrend: analytics.adoptionTrend,
            insights: {
                adoptionScore,
                usagePattern,
                recommendations,
            },
        }
    } catch (error) {
        console.error('Error generating single repository analytics:', error)
        throw error
    }
}

// =====================================================
// API ENDPOINTS
// =====================================================

/**
 * GET /api/telemetry/repositories
 * Get analytics for all repositories or a specific repository
 */
export async function GET(
    request: NextRequest
): Promise<
    NextResponse<RepositoryAnalyticsResponse | SingleRepositoryResponse>
> {
    try {
        const { searchParams } = new URL(request.url)

        // Parse query parameters
        const repositoryName = searchParams.get('repository')
        const days = Math.min(parseInt(searchParams.get('days') || '30'), 365)
        const forceRefresh = searchParams.get('refresh') === 'true'

        let analyticsData
        let cached = false
        let generatedAt = new Date()

        // Determine cache key
        const cacheKey = repositoryName
            ? `repo:${repositoryName}:${days}`
            : `all-repos:${days}`

        // Try to get cached data first (unless force refresh)
        if (!forceRefresh) {
            const cachedData =
                await cacheService.getCachedRepositoryAnalytics(cacheKey)
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
            if (repositoryName) {
                analyticsData = await generateSingleRepositoryAnalytics(
                    repositoryName,
                    days
                )
            } else {
                analyticsData = await generateAllRepositoriesAnalytics(days)
            }

            generatedAt = new Date()

            // Cache the data for 10 minutes
            await cacheService.cacheRepositoryAnalytics(
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

        const response = {
            success: true,
            data: {
                ...(analyticsData as Record<string, unknown>),
                cacheInfo: {
                    cached,
                    generatedAt: generatedAt.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                },
            },
        }

        return NextResponse.json(
            response as RepositoryAnalyticsResponse | SingleRepositoryResponse,
            {
                headers: {
                    'Cache-Control': 'public, max-age=600', // 10 minutes
                    'Content-Type': 'application/json',
                },
            }
        )
    } catch (error) {
        console.error('Repository analytics API error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch repository analytics',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

/**
 * OPTIONS /api/telemetry/repositories
 * CORS preflight handling
 */
export async function OPTIONS(): Promise<NextResponse> {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
        },
    })
}
