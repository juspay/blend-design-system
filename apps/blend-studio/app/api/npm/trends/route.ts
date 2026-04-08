import { NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import { NPMClient } from '@/backend/external/npm-client'

// GET /api/npm/trends - Get NPM download trends
export async function GET() {
    let dbError: string | null = null
    let npmError: string | null = null

    // Try database first
    try {
        await initializeDatabase()
        const trends = await databaseService.getDownloadTrends(30)

        if (trends && trends.length > 0) {
            console.log(`Returning ${trends.length} trends from database`)
            return NextResponse.json(trends)
        }
        console.log('Database connected but no trends found')
    } catch (error) {
        dbError =
            error instanceof Error
                ? error.message
                : 'Database connection failed'
        console.error('Database error:', dbError)
    }

    // Try NPM API as fallback
    try {
        console.log('Trying NPM API for download trends...')
        const npmClient = new NPMClient('@juspay/blend-design-system')
        const downloadTrends = await npmClient.getDownloadTrends(30)

        if (downloadTrends && downloadTrends.length > 0) {
            // Try to save to database if it's available
            if (!dbError) {
                try {
                    for (const trend of downloadTrends) {
                        await databaseService.saveDownloadTrend(
                            trend.date,
                            trend.downloads
                        )
                    }
                    console.log(
                        `Fetched and saved ${downloadTrends.length} trends from NPM`
                    )
                } catch (saveError) {
                    console.warn('Could not save to database:', saveError)
                }
            }

            console.log(
                `Returning ${downloadTrends.length} trends from NPM API`
            )
            return NextResponse.json(downloadTrends)
        }
        npmError = 'No trend data available from NPM'
    } catch (error) {
        npmError = error instanceof Error ? error.message : 'NPM API failed'
        console.error('NPM API error:', npmError)
    }

    // Both sources failed - return error with details
    return NextResponse.json(
        {
            error: 'Unable to fetch download trends',
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
