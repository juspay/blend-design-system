import { NextResponse } from 'next/server'
import { databaseService } from '@/lib/database-service'
import { initializeDatabase } from '@/lib/database'
import { NPMClient } from '@/lib/data/npm-client'

export async function GET() {
    let dbError: string | null = null
    let npmError: string | null = null

    // Try database first
    try {
        await initializeDatabase()
        const versions = await databaseService.getVersionHistory()

        if (versions && versions.length > 0) {
            console.log(`Returning ${versions.length} versions from database`)
            return NextResponse.json(versions)
        }
        console.log('Database connected but no versions found')
    } catch (error) {
        dbError =
            error instanceof Error
                ? error.message
                : 'Database connection failed'
        console.error('Database error:', dbError)
    }

    // Try NPM API as fallback
    try {
        console.log('Trying NPM API for version history...')
        const npmClient = new NPMClient('blend-v1')
        const versionHistory = await npmClient.getVersionHistory()

        if (versionHistory && versionHistory.length > 0) {
            // Try to save to database if it's available
            if (!dbError) {
                try {
                    for (const version of versionHistory) {
                        await databaseService.saveVersionInfo(version)
                    }
                    console.log(
                        `Fetched and saved ${versionHistory.length} versions from NPM`
                    )
                } catch (saveError) {
                    console.warn('Could not save to database:', saveError)
                }
            }

            console.log(
                `Returning ${versionHistory.length} versions from NPM API`
            )
            return NextResponse.json(versionHistory)
        }
        npmError = 'No version data available from NPM'
    } catch (error) {
        npmError = error instanceof Error ? error.message : 'NPM API failed'
        console.error('NPM API error:', npmError)
    }

    // Both sources failed - return error with details
    return NextResponse.json(
        {
            error: 'Unable to fetch version history',
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
