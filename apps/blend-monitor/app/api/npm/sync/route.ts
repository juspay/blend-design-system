import { NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

// POST /api/npm/sync - Manually trigger NPM data synchronization
export async function POST() {
    try {
        console.log('Starting NPM data synchronization...')
        await initializeDatabase()

        const startTime = Date.now()
        const syncResult = await databaseService.syncNPMData()
        const duration = Date.now() - startTime

        const summary = {
            success: true,
            duration: `${duration}ms`,
            results: {
                versions: {
                    total:
                        syncResult.versions.saved + syncResult.versions.updated,
                    new: syncResult.versions.saved,
                    updated: syncResult.versions.updated,
                },
                trends: {
                    saved: syncResult.trends.saved,
                },
                stats: {
                    updated: syncResult.stats.updated,
                },
            },
            errors: syncResult.errors,
            hasErrors: syncResult.errors.length > 0,
            timestamp: new Date().toISOString(),
        }

        console.log('NPM sync completed:', summary)

        return NextResponse.json(summary)
    } catch (error) {
        console.error('NPM sync failed:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to sync NPM data',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        )
    }
}

// GET /api/npm/sync - Get sync status/info
export async function GET() {
    try {
        await initializeDatabase()

        // Get latest version info from database
        const latestVersion =
            await databaseService.getLatestVersionFromDatabase()

        // Get database statistics
        const [versionsResult, trendsResult, statsResult] =
            await Promise.allSettled([
                databaseService.getVersionHistory(),
                databaseService.getDownloadTrends(30),
                databaseService.getPackageStats(),
            ])

        const status = {
            database: {
                versions: {
                    count:
                        versionsResult.status === 'fulfilled'
                            ? versionsResult.value.length
                            : 0,
                    latest: latestVersion,
                    lastUpdate: 'Unknown',
                },
                trends: {
                    count:
                        trendsResult.status === 'fulfilled'
                            ? trendsResult.value.length
                            : 0,
                    lastUpdate: 'Unknown',
                },
                stats: {
                    hasData:
                        statsResult.status === 'fulfilled' &&
                        statsResult.value !== null,
                    version:
                        statsResult.status === 'fulfilled' && statsResult.value
                            ? statsResult.value.version
                            : null,
                    lastUpdate: 'Unknown',
                },
            },
            lastSyncAttempt: 'Manual trigger only',
            nextScheduledSync: 'Not scheduled',
            recommendations: [],
        }

        // Add recommendations based on data status
        if (status.database.versions.count === 0) {
            status.recommendations.push('Run sync to populate version history')
        }
        if (status.database.trends.count < 30) {
            status.recommendations.push(
                'Run sync to get complete download trends'
            )
        }
        if (!status.database.stats.hasData) {
            status.recommendations.push('Run sync to get package statistics')
        }

        return NextResponse.json(status)
    } catch (error) {
        console.error('Error getting sync status:', error)
        return NextResponse.json(
            {
                error: 'Failed to get sync status',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
