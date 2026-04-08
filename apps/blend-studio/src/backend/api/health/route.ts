import { NextResponse } from 'next/server'
import { checkDatabaseHealth } from '@/backend/lib/database'

// GET /api/health - Check system health including database connectivity
export async function GET() {
    const health = {
        status: 'unknown',
        timestamp: new Date().toISOString(),
        services: {
            database: {
                status: 'unknown',
                latency: null as number | null,
                error: null as string | null,
            },
            npm: {
                status: 'unknown',
                error: null as string | null,
            },
        },
    }

    // Test database connection
    try {
        const dbHealth = await checkDatabaseHealth()
        if (dbHealth.healthy) {
            health.services.database.status = 'healthy'
            health.services.database.latency = dbHealth.latency || null
        } else {
            health.services.database.status = 'unhealthy'
            health.services.database.error =
                dbHealth.error || 'Unknown database error'
        }
    } catch (error) {
        health.services.database.status = 'error'
        health.services.database.error =
            error instanceof Error
                ? error.message
                : 'Database connection failed'
    }

    // Test NPM API
    try {
        const npmResponse = await fetch(
            'https://registry.npmjs.org/@juspay/blend-design-system',
            {
                method: 'HEAD',
                signal: AbortSignal.timeout(5000), // 5 second timeout
            }
        )
        if (npmResponse.ok) {
            health.services.npm.status = 'healthy'
        } else {
            health.services.npm.status = 'unhealthy'
            health.services.npm.error = `HTTP ${npmResponse.status}`
        }
    } catch (error) {
        health.services.npm.status = 'error'
        health.services.npm.error =
            error instanceof Error ? error.message : 'NPM registry unreachable'
    }

    // Overall health status
    const allHealthy = Object.values(health.services).every(
        (service) => service.status === 'healthy'
    )
    const anyError = Object.values(health.services).some(
        (service) => service.status === 'error'
    )

    health.status = allHealthy ? 'healthy' : anyError ? 'error' : 'degraded'

    const statusCode =
        health.status === 'healthy'
            ? 200
            : health.status === 'error'
              ? 503
              : 200

    return NextResponse.json(health, { status: statusCode })
}
