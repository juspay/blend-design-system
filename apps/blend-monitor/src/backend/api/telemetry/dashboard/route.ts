/**
 * Telemetry Dashboard API Endpoint
 * GET /api/telemetry/dashboard - Get dashboard overview metrics
 *
 * Features:
 * - Cached responses for performance
 * - Comprehensive metrics overview
 * - Real-time and historical data
 */

import { NextRequest, NextResponse } from 'next/server'
import { telemetryService } from '@/backend/lib/telemetry-service'
import { cacheService } from '@/backend/lib/cache-service'

// =====================================================
// TYPES
// =====================================================

interface DashboardResponse {
    success: boolean
    data?: {
        overview: {
            totalEvents: number
            totalSessions: number
            totalRepositories: number
            totalComponents: number
            todayEvents: number
            last7DaysEvents: number
            last30DaysEvents: number
        }
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
            lastActive: string
        }>
        recentActivity: Array<{
            timestamp: string
            componentName: string
            repositoryName: string
            eventType: string
        }>
        trends: {
            dailyGrowth: number
            weeklyGrowth: number
            monthlyGrowth: number
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

function calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
}

async function generateDashboardData(): Promise<any> {
    try {
        // Get main dashboard overview
        const overview = await telemetryService.getDashboardOverview()

        // Calculate growth trends (simplified - would need historical comparison)
        const trends = {
            dailyGrowth: calculateGrowthRate(
                overview.todayEvents,
                Math.floor(overview.last7DaysEvents / 7)
            ),
            weeklyGrowth: calculateGrowthRate(
                overview.last7DaysEvents,
                Math.floor(overview.last30DaysEvents / 4)
            ),
            monthlyGrowth: calculateGrowthRate(
                overview.last30DaysEvents,
                overview.totalEvents
            ),
        }

        // Format dates for JSON response
        const formattedData = {
            overview: {
                totalEvents: overview.totalEvents,
                totalSessions: overview.totalSessions,
                totalRepositories: overview.totalRepositories,
                totalComponents: overview.totalComponents,
                todayEvents: overview.todayEvents,
                last7DaysEvents: overview.last7DaysEvents,
                last30DaysEvents: overview.last30DaysEvents,
            },
            mostUsedComponents: overview.mostUsedComponents,
            topRepositories: overview.topRepositories.map((repo) => ({
                ...repo,
                lastActive: repo.lastActive.toISOString(),
            })),
            recentActivity: overview.recentActivity.map((activity) => ({
                ...activity,
                timestamp: activity.timestamp.toISOString(),
            })),
            trends,
        }

        return formattedData
    } catch (error) {
        console.error('Error generating dashboard data:', error)
        throw error
    }
}

// =====================================================
// API ENDPOINTS
// =====================================================

/**
 * GET /api/telemetry/dashboard
 * Get comprehensive dashboard overview
 */
export async function GET(
    request: NextRequest
): Promise<NextResponse<DashboardResponse>> {
    try {
        const { searchParams } = new URL(request.url)
        const forceRefresh = searchParams.get('refresh') === 'true'

        let dashboardData
        let cached = false
        let generatedAt = new Date()

        // Try to get cached data first (unless force refresh)
        if (!forceRefresh) {
            const cachedData = await cacheService.getCachedDashboardData()
            if (cachedData) {
                dashboardData = cachedData.data
                cached = true
                generatedAt = new Date(cachedData.generatedAt)
            }
        }

        // Generate fresh data if not cached or force refresh
        if (!dashboardData) {
            dashboardData = await generateDashboardData()
            generatedAt = new Date()

            // Cache the data for 5 minutes
            await cacheService.cacheDashboardData(
                {
                    data: dashboardData,
                    generatedAt: generatedAt.toISOString(),
                },
                300
            )
        }

        // Calculate cache expiration
        const expiresAt = new Date(generatedAt.getTime() + 5 * 60 * 1000) // 5 minutes

        const response: DashboardResponse = {
            success: true,
            data: {
                ...dashboardData,
                cacheInfo: {
                    cached,
                    generatedAt: generatedAt.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                },
            },
        }

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'public, max-age=300', // 5 minutes
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Dashboard API error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch dashboard data',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

/**
 * POST /api/telemetry/dashboard
 * Refresh dashboard cache manually (admin only)
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<DashboardResponse>> {
    try {
        // TODO: Add authentication check for admin users
        // This endpoint should be restricted to admin users only

        // Generate fresh dashboard data
        const dashboardData = await generateDashboardData()
        const generatedAt = new Date()

        // Update cache
        await cacheService.cacheDashboardData(
            {
                data: dashboardData,
                generatedAt: generatedAt.toISOString(),
            },
            300
        )

        // Also refresh materialized views
        await telemetryService.refreshViews()

        const expiresAt = new Date(generatedAt.getTime() + 5 * 60 * 1000)

        return NextResponse.json({
            success: true,
            message: 'Dashboard cache refreshed successfully',
            data: {
                ...dashboardData,
                cacheInfo: {
                    cached: false,
                    generatedAt: generatedAt.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                },
            },
        })
    } catch (error) {
        console.error('Dashboard refresh error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to refresh dashboard',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

/**
 * OPTIONS /api/telemetry/dashboard
 * CORS preflight handling
 */
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
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
