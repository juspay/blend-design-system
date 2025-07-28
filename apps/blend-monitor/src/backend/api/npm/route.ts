import { NextResponse } from 'next/server'
import { NPMClient } from '@/backend/external/npm-client'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

export async function GET() {
    try {
        // Initialize PostgreSQL database
        await initializeDatabase()

        const npmClient = new NPMClient('blend-v1')

        let successfulOperations = 0
        let errors: string[] = []

        // Fetch package stats with fallback
        let packageStats = null
        try {
            packageStats = await npmClient.getPackageStats()
            if (packageStats) {
                await databaseService.savePackageStats(packageStats)
                successfulOperations++
            } else {
                // Try to get from database as fallback
                packageStats = await databaseService.getPackageStats()
                errors.push(
                    'Failed to fetch package stats from NPM, using cached data'
                )
            }
        } catch (error) {
            console.error('Error fetching package stats:', error)
            packageStats = await databaseService.getPackageStats()
            errors.push(
                `Package stats error: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }

        // Fetch download trends with fallback
        let downloadTrends: any[] = []
        try {
            downloadTrends = await npmClient.getDownloadTrends(30)
            if (downloadTrends.length > 0) {
                for (const trend of downloadTrends) {
                    await databaseService.saveDownloadTrend(
                        trend.date,
                        trend.downloads
                    )
                }
                successfulOperations++
            } else {
                // Try to get from database as fallback
                downloadTrends = await databaseService.getDownloadTrends(30)
                errors.push(
                    'Failed to fetch download trends from NPM, using cached data'
                )
            }
        } catch (error) {
            console.error('Error fetching download trends:', error)
            downloadTrends = await databaseService.getDownloadTrends(30)
            errors.push(
                `Download trends error: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }

        // Fetch version history with fallback
        let versionHistory: any[] = []
        try {
            versionHistory = await npmClient.getVersionHistory()
            if (versionHistory.length > 0) {
                for (const version of versionHistory) {
                    await databaseService.saveVersionInfo(version)
                }
                successfulOperations++
            } else {
                // Try to get from database as fallback
                versionHistory = await databaseService.getVersionHistory()
                errors.push(
                    'Failed to fetch version history from NPM, using cached data'
                )
            }
        } catch (error) {
            console.error('Error fetching version history:', error)
            versionHistory = await databaseService.getVersionHistory()
            errors.push(
                `Version history error: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }

        // Fetch package size history with fallback
        let sizeHistory: any[] = []
        try {
            sizeHistory = await npmClient.getPackageSizeHistory()
            successfulOperations++
        } catch (error) {
            console.error('Error fetching package size history:', error)
            sizeHistory = []
            errors.push(
                `Size history error: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }

        // Log system activity
        try {
            await databaseService.logSystemActivity('npm_stats_updated', {
                version: packageStats?.version || 'unknown',
                downloads: packageStats?.downloads?.total || 0,
                successfulOperations,
                errors: errors.length,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error('Error logging system activity:', error)
        }

        // Return success even if some operations failed
        return NextResponse.json({
            success: true,
            data: {
                packageStats,
                downloadTrends,
                versionHistory,
                sizeHistory,
            },
            metadata: {
                successfulOperations,
                totalOperations: 4,
                errors: errors.length > 0 ? errors : undefined,
                lastUpdated: new Date().toISOString(),
                fallbackUsed: errors.length > 0,
            },
        })
    } catch (error) {
        console.error('Error in NPM API:', error)

        // Try to return cached data even on complete failure
        try {
            await initializeDatabase()
            const packageStats = await databaseService.getPackageStats()
            const downloadTrends = await databaseService.getDownloadTrends(30)
            const versionHistory = await databaseService.getVersionHistory()

            return NextResponse.json({
                success: true,
                data: {
                    packageStats,
                    downloadTrends,
                    versionHistory,
                    sizeHistory: [],
                },
                metadata: {
                    successfulOperations: 0,
                    totalOperations: 4,
                    errors: [
                        'Complete NPM API failure, using cached data only',
                    ],
                    lastUpdated: new Date().toISOString(),
                    fallbackUsed: true,
                },
            })
        } catch (fallbackError) {
            console.error('Error fetching fallback data:', fallbackError)
            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to fetch NPM data and no cached data available',
                    details:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                },
                { status: 500 }
            )
        }
    }
}

// POST endpoint to trigger NPM data refresh
export async function POST() {
    try {
        await initializeDatabase()

        // Trigger NPM data fetch and update
        const response = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3003'}/api/npm`,
            {
                method: 'GET',
            }
        )

        if (!response.ok) {
            throw new Error('Failed to refresh NPM data')
        }

        const data = await response.json()

        return NextResponse.json({
            success: true,
            message: 'NPM data refreshed successfully',
            lastUpdated: new Date().toISOString(),
            metadata: data.metadata,
        })
    } catch (error) {
        console.error('Error refreshing NPM data:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to refresh NPM data',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
