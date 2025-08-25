/**
 * Page Analytics API Endpoint
 * GET /api/telemetry/page-analytics - Get dashboard overview using page composition data
 *
 * Features:
 * - Route-level deduplication (no user session duplicates)
 * - Cached responses for performance
 * - Component adoption metrics
 * - Repository usage statistics
 */

import { NextRequest, NextResponse } from 'next/server'
import { pageAnalyticsService } from '@/src/backend/lib/page-analytics-service'
import { cacheService } from '@/src/backend/lib/cache-service'

// CORS headers for telemetry endpoint
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
}

// Handle preflight OPTIONS request
export async function OPTIONS(): Promise<NextResponse> {
    return new NextResponse(null, { status: 200, headers: corsHeaders })
}

// =====================================================
// TYPES
// =====================================================

interface PageAnalyticsResponse {
    success: boolean
    data?: {
        overview: {
            totalUniquePages: number
            totalRepositories: number
            totalComponents: number
            totalInstances: number
        }
        recentPages: Array<{
            repositoryName: string
            pageRoute: string
            componentCount: number
            lastUpdated: string
        }>
        topComponents: Array<{
            componentName: string
            uniquePages: number
            totalInstances: number
            adoptionPercentage: number
        }>
        topRepositories: Array<{
            repositoryName: string
            uniquePages: number
            componentCount: number
            lastActive: string
        }>
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
// API ENDPOINTS
// =====================================================

/**
 * GET /api/telemetry/page-analytics
 * Get dashboard overview with route-level deduplication
 */
export async function GET(
    request: NextRequest
): Promise<NextResponse<PageAnalyticsResponse>> {
    try {
        const { searchParams } = new URL(request.url)
        const forceRefresh = searchParams.get('refresh') === 'true'

        let dashboardData
        let cached = false
        let generatedAt = new Date()

        // Try to get cached data first (unless force refresh)
        if (!forceRefresh) {
            const cacheKey = 'page-analytics-dashboard'
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
                    dashboardData = typedCachedData.data
                    cached = true
                    generatedAt = new Date(typedCachedData.generatedAt)
                }
            }
        }

        // Generate fresh data if not cached or force refresh
        if (!dashboardData) {
            dashboardData = await pageAnalyticsService.getDashboardOverview()
            generatedAt = new Date()

            // Cache the data for 5 minutes
            const cacheKey = 'page-analytics-dashboard'
            await cacheService.cacheComponentAnalytics(
                cacheKey,
                {
                    data: dashboardData,
                    generatedAt: generatedAt.toISOString(),
                },
                300 // 5 minutes
            )
        }

        // Calculate cache expiration
        const expiresAt = new Date(generatedAt.getTime() + 5 * 60 * 1000) // 5 minutes

        // Type the dashboard data properly
        const typedDashboardData = dashboardData as {
            totalUniquePages: number
            totalRepositories: number
            totalComponents: number
            totalInstances: number
            recentPages: Array<{
                repositoryName: string
                pageRoute: string
                componentCount: number
                lastUpdated: Date
            }>
            topComponents: Array<{
                componentName: string
                uniquePages: number
                totalInstances: number
                adoptionPercentage: number
            }>
            topRepositories: Array<{
                repositoryName: string
                uniquePages: number
                componentCount: number
                lastActive: Date
            }>
        }

        const response: PageAnalyticsResponse = {
            success: true,
            data: {
                overview: {
                    totalUniquePages: typedDashboardData.totalUniquePages,
                    totalRepositories: typedDashboardData.totalRepositories,
                    totalComponents: typedDashboardData.totalComponents,
                    totalInstances: typedDashboardData.totalInstances,
                },
                recentPages: typedDashboardData.recentPages.map((page) => ({
                    repositoryName: page.repositoryName,
                    pageRoute: page.pageRoute,
                    componentCount: page.componentCount,
                    lastUpdated: page.lastUpdated.toISOString(),
                })),
                topComponents: typedDashboardData.topComponents,
                topRepositories: typedDashboardData.topRepositories.map(
                    (repo) => ({
                        repositoryName: repo.repositoryName,
                        uniquePages: repo.uniquePages,
                        componentCount: repo.componentCount,
                        lastActive: repo.lastActive.toISOString(),
                    })
                ),
                cacheInfo: {
                    cached,
                    generatedAt: generatedAt.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                },
            },
        }

        return NextResponse.json(response, {
            headers: {
                ...corsHeaders,
                'Cache-Control': 'public, max-age=300', // 5 minutes
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Page Analytics API error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch page analytics',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500, headers: corsHeaders }
        )
    }
}
