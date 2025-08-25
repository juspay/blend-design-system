/**
 * Component Adoption API Endpoint
 * GET /api/telemetry/component-adoption - Get component adoption statistics using page composition data
 *
 * Features:
 * - Route-level deduplication (no user session duplicates)
 * - Component usage across repositories
 * - Prop variant analysis
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

interface ComponentAdoptionResponse {
    success: boolean
    data?: {
        componentName?: string
        components: Array<{
            componentName: string
            uniquePages: number
            totalInstances: number
            uniqueRepositories: number
            firstUsed: string
            lastUsed: string
            repositories: Array<{
                repositoryName: string
                pageCount: number
                instanceCount: number
            }>
        }>
        variants?: Array<{
            componentName: string
            propsSignature: string
            sanitizedProps: Record<string, unknown>
            uniquePages: number
            totalInstances: number
            usagePercentage: number
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
 * GET /api/telemetry/component-adoption
 * Get component adoption statistics with route-level deduplication
 */
export async function GET(
    request: NextRequest
): Promise<NextResponse<ComponentAdoptionResponse>> {
    try {
        const { searchParams } = new URL(request.url)
        const componentName = searchParams.get('component')
        const forceRefresh = searchParams.get('refresh') === 'true'

        let adoptionData
        let variantsData
        let cached = false
        let generatedAt = new Date()

        // Create cache key based on component filter
        const cacheKey = componentName
            ? `component-adoption-${componentName}`
            : 'component-adoption-all'

        // Try to get cached data first (unless force refresh)
        if (!forceRefresh) {
            const cachedData =
                await cacheService.getCachedComponentAnalytics(cacheKey)
            if (
                cachedData &&
                typeof cachedData === 'object' &&
                cachedData !== null
            ) {
                const typedCachedData = cachedData as {
                    adoptionData: unknown
                    variantsData?: unknown
                    generatedAt: string
                }
                if (
                    typedCachedData.adoptionData &&
                    typedCachedData.generatedAt
                ) {
                    adoptionData = typedCachedData.adoptionData
                    variantsData = typedCachedData.variantsData
                    cached = true
                    generatedAt = new Date(typedCachedData.generatedAt)
                }
            }
        }

        // Generate fresh data if not cached or force refresh
        if (!adoptionData) {
            adoptionData = await pageAnalyticsService.getComponentAdoption(
                componentName || undefined
            )

            // If specific component requested, also get variants
            if (componentName) {
                variantsData =
                    await pageAnalyticsService.getComponentVariants(
                        componentName
                    )
            }

            generatedAt = new Date()

            // Cache the data for 10 minutes
            await cacheService.cacheComponentAnalytics(
                cacheKey,
                {
                    adoptionData,
                    variantsData,
                    generatedAt: generatedAt.toISOString(),
                },
                600 // 10 minutes
            )
        }

        // Calculate cache expiration
        const expiresAt = new Date(generatedAt.getTime() + 10 * 60 * 1000) // 10 minutes

        // Type the adoption data properly
        const typedAdoptionData = adoptionData as Array<{
            componentName: string
            uniquePages: number
            totalInstances: number
            uniqueRepositories: number
            firstUsed: Date
            lastUsed: Date
            repositories: Array<{
                repositoryName: string
                pageCount: number
                instanceCount: number
            }>
        }>

        const response: ComponentAdoptionResponse = {
            success: true,
            data: {
                ...(componentName && { componentName }),
                components: typedAdoptionData.map((comp) => ({
                    componentName: comp.componentName,
                    uniquePages: comp.uniquePages,
                    totalInstances: comp.totalInstances,
                    uniqueRepositories: comp.uniqueRepositories,
                    firstUsed: comp.firstUsed.toISOString(),
                    lastUsed: comp.lastUsed.toISOString(),
                    repositories: comp.repositories,
                })),
                variants: variantsData
                    ? (variantsData as Array<{
                          componentName: string
                          propsSignature: string
                          sanitizedProps: Record<string, unknown>
                          uniquePages: number
                          totalInstances: number
                          usagePercentage: number
                      }>)
                    : undefined,
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
                'Cache-Control': 'public, max-age=600', // 10 minutes
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Component Adoption API error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch component adoption data',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500, headers: corsHeaders }
        )
    }
}
