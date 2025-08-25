/**
 * Page Composition API Endpoint
 * POST /api/telemetry/page-composition - Collect page-level component composition data
 *
 * Features:
 * - Global deduplication across users
 * - Page fingerprint-based uniqueness
 * - Change detection and tracking
 * - Zero duplicate counting
 */

import { NextRequest, NextResponse } from 'next/server'
import { pageCompositionService } from '@/src/backend/lib/page-composition-service'
import { cacheService } from '@/src/backend/lib/cache-service'

// CORS headers for telemetry endpoint
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
}

// Handle preflight OPTIONS request
export async function OPTIONS(): Promise<NextResponse> {
    return new NextResponse(null, { status: 200, headers: corsHeaders })
}

// =====================================================
// TYPES AND VALIDATION
// =====================================================

interface ComponentSummary {
    name: string
    propsSignature: string
    instanceCount: number
    sanitizedProps: Record<string, unknown>
}

interface PageCompositionPayload {
    eventType: 'page_composition'
    pageComposition: {
        pageFingerprint: string
        repositoryName: string
        pageRoute: string
        domain: string
        components: ComponentSummary[]
        compositionHash: string
        timestamp: number
        projectContext: {
            pageUrl: string
            pageRoute: string
            repositoryName?: string
            projectVersion?: string
            projectDescription?: string
            domain: string
        }
    }
    changeType:
        | 'new'
        | 'component_added'
        | 'component_removed'
        | 'props_changed'
    previousHash?: string
    packageVersion: string
    sessionId: string
    timestamp: number
    environment: string
}

interface ApiResponse {
    success: boolean
    message?: string
    data?: {
        pageFingerprint: string
        action: 'created' | 'updated' | 'no_change'
        changeType: string
        isFirstUsage: boolean
        componentCount: number
        totalInstances: number
    }
    error?: string
    rateLimit?: {
        remaining: number
        resetTime: number
    }
}

// =====================================================
// VALIDATION HELPERS
// =====================================================

function validatePageCompositionEvent(
    payload: unknown
): PageCompositionPayload | null {
    // Type guard to ensure payload is an object
    if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid payload - must be an object')
    }

    const data = payload as Record<string, unknown>

    // Required fields validation
    if (!data.eventType || data.eventType !== 'page_composition') {
        throw new Error('Invalid eventType - must be "page_composition"')
    }

    if (!data.pageComposition || typeof data.pageComposition !== 'object') {
        throw new Error('Missing required field: pageComposition')
    }

    const comp = data.pageComposition as Record<string, unknown>

    // Validate required pageComposition fields
    const requiredFields = [
        'pageFingerprint',
        'repositoryName',
        'pageRoute',
        'domain',
        'components',
        'compositionHash',
        'timestamp',
    ]

    for (const field of requiredFields) {
        if (!comp[field]) {
            throw new Error(`Missing required field: pageComposition.${field}`)
        }
    }

    // Validate components array
    if (!Array.isArray(comp.components)) {
        throw new Error('pageComposition.components must be an array')
    }

    // Validate each component
    for (let i = 0; i < comp.components.length; i++) {
        const component = comp.components[i] as Record<string, unknown>
        if (
            !component.name ||
            !component.propsSignature ||
            typeof component.instanceCount !== 'number'
        ) {
            throw new Error(`Invalid component at index ${i}`)
        }
    }

    // Validate other required fields
    if (
        !data.changeType ||
        ![
            'new',
            'component_added',
            'component_removed',
            'props_changed',
        ].includes(data.changeType as string)
    ) {
        throw new Error('Invalid changeType')
    }

    if (!data.packageVersion || !data.sessionId || !data.timestamp) {
        throw new Error(
            'Missing required fields: packageVersion, sessionId, or timestamp'
        )
    }

    // Validate timestamp (not too far in the future/past)
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000
    const oneHourFromNow = now + 60 * 60 * 1000

    if (
        (data.timestamp as number) < oneHourAgo ||
        (data.timestamp as number) > oneHourFromNow
    ) {
        throw new Error(
            'Invalid timestamp - must be within 1 hour of current time'
        )
    }

    return data as unknown as PageCompositionPayload
}

function sanitizeComponentProps(
    props: Record<string, unknown>
): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(props)) {
        // Skip potentially sensitive keys
        if (
            key.toLowerCase().includes('password') ||
            key.toLowerCase().includes('secret') ||
            key.toLowerCase().includes('token') ||
            key.toLowerCase().includes('key')
        ) {
            continue
        }

        // Limit string length
        if (typeof value === 'string') {
            sanitized[key] = value.slice(0, 100)
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            sanitized[key] = value
        } else if (value === null || value === undefined) {
            sanitized[key] = value
        } else {
            // For objects/arrays, convert to string representation
            sanitized[key] = String(value).slice(0, 100)
        }
    }

    return sanitized
}

// =====================================================
// API ENDPOINTS
// =====================================================

/**
 * POST /api/telemetry/page-composition
 * Accept page composition events with global deduplication
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    try {
        // Rate limiting check
        const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
        const rateLimit = await cacheService.checkRateLimit(
            `page-composition:${clientIp}`,
            100, // 100 requests
            3600 // per hour
        )

        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Rate limit exceeded',
                    rateLimit: {
                        remaining: rateLimit.remaining,
                        resetTime: rateLimit.resetTime,
                    },
                },
                { status: 429, headers: corsHeaders }
            )
        }

        // Parse request body
        const body = await request.json()

        // Validate page composition event
        const validatedEvent = validatePageCompositionEvent(body)
        if (!validatedEvent) {
            return NextResponse.json(
                { success: false, error: 'Invalid page composition event' },
                { status: 400, headers: corsHeaders }
            )
        }

        // Sanitize component props
        const sanitizedComponents =
            validatedEvent.pageComposition.components.map((comp) => ({
                ...comp,
                sanitizedProps: sanitizeComponentProps(
                    comp.sanitizedProps || {}
                ),
            }))

        const pageCompositionData = {
            ...validatedEvent.pageComposition,
            components: sanitizedComponents,
        }

        // Process through page composition service
        const result = await pageCompositionService.upsertPageComposition({
            pageFingerprint: pageCompositionData.pageFingerprint,
            repositoryName: pageCompositionData.repositoryName,
            pageRoute: pageCompositionData.pageRoute,
            domain: pageCompositionData.domain,
            compositionHash: pageCompositionData.compositionHash,
            components: sanitizedComponents,
            changeType: validatedEvent.changeType,
            previousHash: validatedEvent.previousHash,
            packageVersion: validatedEvent.packageVersion,
            sessionId: validatedEvent.sessionId,
            environment: validatedEvent.environment,
            timestamp: new Date(validatedEvent.timestamp),
            projectContext: pageCompositionData.projectContext,
        })

        // Calculate component statistics
        const componentCount = sanitizedComponents.length
        const totalInstances = sanitizedComponents.reduce(
            (sum, comp) => sum + comp.instanceCount,
            0
        )

        const responseData = {
            pageFingerprint: pageCompositionData.pageFingerprint,
            action: result.action,
            changeType: validatedEvent.changeType,
            isFirstUsage: result.isFirstUsage,
            componentCount,
            totalInstances,
        }

        return NextResponse.json(
            {
                success: true,
                message:
                    result.action === 'created'
                        ? 'New page composition recorded'
                        : result.action === 'updated'
                          ? 'Page composition updated'
                          : 'No changes detected',
                data: responseData,
                rateLimit: {
                    remaining: rateLimit.remaining,
                    resetTime: rateLimit.resetTime,
                },
            },
            { headers: corsHeaders }
        )
    } catch (error) {
        console.error('Page Composition API error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500, headers: corsHeaders }
        )
    }
}
