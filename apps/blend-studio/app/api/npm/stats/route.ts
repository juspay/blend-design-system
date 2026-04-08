import { NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import { NPMClient } from '@/backend/external/npm-client'

// GET /api/npm/stats - Get NPM package statistics
export async function GET() {
    let dbError: string | null = null
    let npmError: string | null = null

    // Try database first
    try {
        await initializeDatabase()
        const packageStats = await databaseService.getPackageStats()

        if (packageStats) {
            console.log('Returning package stats from database')
            return NextResponse.json(packageStats)
        }
        console.log('Database connected but no stats found')
    } catch (error) {
        dbError =
            error instanceof Error
                ? error.message
                : 'Database connection failed'
        console.error('Database error:', dbError)
    }

    // Try NPM API as fallback
    try {
        console.log('Trying NPM API for package stats...')
        const npmClient = new NPMClient('@juspay/blend-design-system')
        const stats = await npmClient.getPackageStats()

        if (stats) {
            // Try to save to database if it's available
            if (!dbError) {
                try {
                    await databaseService.savePackageStats(stats)
                    console.log('Fetched and saved package stats from NPM')
                } catch (saveError) {
                    console.warn('Could not save to database:', saveError)
                }
            }

            console.log('Returning package stats from NPM API')
            return NextResponse.json(stats)
        }
        npmError = 'No package stats available from NPM'
    } catch (error) {
        npmError = error instanceof Error ? error.message : 'NPM API failed'
        console.error('NPM API error:', npmError)
    }

    // Both sources failed - return error with details
    return NextResponse.json(
        {
            error: 'Unable to fetch package statistics',
            details: {
                database: dbError || 'Connected but no data found',
                npm: npmError || 'Unknown error',
                suggestion:
                    'Check database connection and NPM API availability',
            },
        },
        { status: 503 } // Service Unavailable
    )
}
