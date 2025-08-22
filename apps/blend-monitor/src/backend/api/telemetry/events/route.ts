/**
 * Telemetry Events API Endpoint
 * POST /api/telemetry/events - Collect component usage telemetry data
 *
 * Features:
 * - Multi-layer duplicate prevention
 * - Rate limiting
 * - Batch processing support
 * - Validation and sanitization
 */

import { NextRequest, NextResponse } from 'next/server'
import {
    telemetryService,
    TelemetryEvent,
} from '@/backend/lib/telemetry-service'
import { cacheService } from '@/backend/lib/cache-service'

// CORS headers for telemetry endpoint
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
}

// Handle preflight OPTIONS request
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
    return new NextResponse(null, { status: 200, headers: corsHeaders })
}

// =====================================================
// TYPES AND VALIDATION
// =====================================================

interface TelemetryEventPayload {
    sessionId: string
    componentName: string
    propsSignature: string
    repositoryName: string
    pageRoute: string
    eventType?: string
    packageVersion?: string
    environment?: string
    instanceCount?: number
    componentProps: Record<string, unknown>
    userAgent?: string
    viewportWidth?: number
    viewportHeight?: number
    timestamp: number
    clientTimestamp?: number
}

interface BatchTelemetryPayload {
    events: TelemetryEventPayload[]
}

interface ApiResponse {
    success: boolean
    message?: string
    data?: any
    error?: string
    rateLimit?: {
        remaining: number
        resetTime: number
    }
}

// =====================================================
// VALIDATION HELPERS
// =====================================================

function validateTelemetryEvent(payload: any): TelemetryEventPayload | null {
    // Required fields validation
    const requiredFields = [
        'sessionId',
        'componentName',
        'propsSignature',
        'timestamp',
    ]
    for (const field of requiredFields) {
        if (!payload[field]) {
            throw new Error(`Missing required field: ${field}`)
        }
    }

    // Validate projectContext
    if (!payload.projectContext || typeof payload.projectContext !== 'object') {
        throw new Error('Missing required field: projectContext')
    }

    if (!payload.projectContext.repositoryName) {
        throw new Error('Missing required field: projectContext.repositoryName')
    }

    if (!payload.projectContext.pageRoute) {
        throw new Error('Missing required field: projectContext.pageRoute')
    }

    // Type validation and sanitization
    const event: TelemetryEventPayload = {
        sessionId: String(payload.sessionId).slice(0, 255),
        componentName: String(payload.componentName).slice(0, 255),
        propsSignature: String(payload.propsSignature),
        repositoryName: String(payload.projectContext.repositoryName).slice(
            0,
            255
        ),
        pageRoute: String(payload.projectContext.pageRoute),
        eventType: payload.eventType
            ? String(payload.eventType).slice(0, 50)
            : 'component_render',
        packageVersion: payload.packageVersion
            ? String(payload.packageVersion).slice(0, 50)
            : undefined,
        environment: payload.environment
            ? String(payload.environment).slice(0, 50)
            : 'unknown',
        instanceCount:
            typeof payload.instanceCount === 'number'
                ? Math.max(1, payload.instanceCount)
                : 1,
        componentProps:
            typeof payload.componentProps === 'object'
                ? payload.componentProps
                : {},
        userAgent: payload.userAgent
            ? String(payload.userAgent).slice(0, 500)
            : undefined,
        viewportWidth:
            typeof payload.viewportWidth === 'number'
                ? payload.viewportWidth
                : undefined,
        viewportHeight:
            typeof payload.viewportHeight === 'number'
                ? payload.viewportHeight
                : undefined,
        timestamp: payload.timestamp,
        clientTimestamp: payload.clientTimestamp,
    }

    // Validate timestamp (not too far in the future/past)
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000
    const oneHourFromNow = now + 60 * 60 * 1000

    if (event.timestamp < oneHourAgo || event.timestamp > oneHourFromNow) {
        throw new Error(
            'Invalid timestamp - must be within 1 hour of current time'
        )
    }

    return event
}

function sanitizeProps(
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
 * POST /api/telemetry/events
 * Accept single telemetry event or batch of events
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    try {
        // Rate limiting check
        const clientIp =
            request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        const rateLimit = await cacheService.checkRateLimit(
            `telemetry:${clientIp}`,
            1000, // 1000 requests
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
                { status: 429 }
            )
        }

        // Parse request body
        const body = await request.json()

        // Handle both single events and batch events
        const isBatch = Array.isArray(body.events)
        const events: TelemetryEventPayload[] = isBatch ? body.events : [body]

        // Validate events count
        if (events.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No events provided' },
                { status: 400, headers: corsHeaders }
            )
        }

        if (events.length > 100) {
            return NextResponse.json(
                { success: false, error: 'Too many events in batch (max 100)' },
                { status: 400, headers: corsHeaders }
            )
        }

        // Validate and sanitize each event
        const validatedEvents: TelemetryEvent[] = []
        const errors: string[] = []

        for (let i = 0; i < events.length; i++) {
            try {
                const validated = validateTelemetryEvent(events[i])
                if (validated) {
                    // Sanitize component props
                    validated.componentProps = sanitizeProps(
                        validated.componentProps
                    )

                    // Convert to TelemetryEvent format
                    const telemetryEvent: TelemetryEvent = {
                        ...validated,
                        timestamp: new Date(validated.timestamp),
                        clientTimestamp: validated.clientTimestamp
                            ? new Date(validated.clientTimestamp)
                            : undefined,
                    }

                    validatedEvents.push(telemetryEvent)
                }
            } catch (error) {
                errors.push(
                    `Event ${i}: ${error instanceof Error ? error.message : 'Invalid event'}`
                )
            }
        }

        // Return validation errors if any
        if (validatedEvents.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No valid events', details: errors },
                { status: 400, headers: corsHeaders }
            )
        }

        // Check for recent duplicates using cache
        const duplicateChecks =
            await cacheService.batchCheckRecentDuplicates(validatedEvents)
        const newEvents = validatedEvents.filter(
            (_, index) => !duplicateChecks[index]
        )

        // Track duplicate statistics
        const duplicateCount = validatedEvents.length - newEvents.length

        if (newEvents.length === 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'All events were recent duplicates',
                    data: {
                        totalEvents: validatedEvents.length,
                        newEvents: 0,
                        duplicates: duplicateCount,
                        errors: errors.length,
                    },
                    rateLimit: {
                        remaining: rateLimit.remaining,
                        resetTime: rateLimit.resetTime,
                    },
                },
                { headers: corsHeaders }
            )
        }

        // Process new events through telemetry service
        let results
        if (newEvents.length === 1) {
            results = [
                await telemetryService.upsertTelemetryEvent(newEvents[0]),
            ]
        } else {
            results =
                await telemetryService.batchUpsertTelemetryEvents(newEvents)
        }

        // Prepare response data
        const responseData = {
            totalEvents: validatedEvents.length,
            newEvents: newEvents.length,
            duplicates: duplicateCount,
            errors: errors.length,
            results: results.map((result) => ({
                id: result.id,
                action: result.action,
                instanceCount: result.instanceCount,
                isFirstUsage: result.isFirstUsage,
            })),
        }

        return NextResponse.json(
            {
                success: true,
                message: `Processed ${newEvents.length} new events (${duplicateCount} duplicates filtered)`,
                data: responseData,
                rateLimit: {
                    remaining: rateLimit.remaining,
                    resetTime: rateLimit.resetTime,
                },
            },
            { headers: corsHeaders }
        )
    } catch (error) {
        console.error('Telemetry API error:', error)

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

/**
 * GET /api/telemetry/events
 * Get recent telemetry events (for debugging/monitoring)
 */
export async function GET(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    try {
        // TODO: Add authentication check for admin users
        // This endpoint should be restricted to admin users only

        const { searchParams } = new URL(request.url)
        const limit = Math.min(
            parseInt(searchParams.get('limit') || '50'),
            1000
        )
        const componentName = searchParams.get('component')
        const repositoryName = searchParams.get('repository')

        // This would require adding a method to telemetry service
        // For now, return a simple response
        return NextResponse.json({
            success: true,
            message: 'Events endpoint - admin access required',
            data: {
                limit,
                componentName,
                repositoryName,
                note: 'Full implementation requires authentication middleware',
            },
        })
    } catch (error) {
        console.error('Telemetry events GET error:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
            },
            { status: 500 }
        )
    }
}
