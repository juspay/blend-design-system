import { NextResponse } from 'next/server'
import { NPMClient } from '@/lib/data/npm-client'
import { ref, set } from 'firebase/database'
import { database } from '@/lib/firebase'

export async function GET() {
    try {
        const npmClient = new NPMClient('blend-v1')

        // Fetch package stats
        const packageStats = await npmClient.getPackageStats()

        if (!packageStats) {
            throw new Error('Failed to fetch package stats')
        }

        // Fetch download trends (last 30 days)
        const downloadTrends = await npmClient.getDownloadTrends(30)

        // Fetch version history
        const versionHistory = await npmClient.getVersionHistory()

        // Fetch package size history
        const sizeHistory = await npmClient.getPackageSizeHistory()

        // Update Firebase Realtime Database
        const updates = {
            publishing: {
                current: {
                    version: packageStats.version,
                    publishedAt: packageStats.lastPublish,
                    size: packageStats.size,
                    dependencies: packageStats.dependencies,
                },
                downloads: {
                    daily: packageStats.downloads.daily,
                    weekly: packageStats.downloads.weekly,
                    monthly: packageStats.downloads.monthly,
                    total: packageStats.downloads.total,
                    lastUpdated: new Date().toISOString(),
                },
                versions: versionHistory.reduce(
                    (acc, version) => {
                        // Replace dots with underscores for Firebase compatibility
                        const versionKey = version.version.replace(/\./g, '_')
                        acc[versionKey] = {
                            version: version.version,
                            publishedAt: version.publishedAt,
                            publisher: version.publisher,
                            downloads: version.downloads,
                            changelog: version.changelog,
                            size: version.size,
                            breaking: version.breaking,
                        }
                        return acc
                    },
                    {} as Record<string, any>
                ),
                trends: {
                    downloads: downloadTrends,
                    size: sizeHistory,
                },
            },
        }

        // Save to Firebase
        await set(ref(database, 'blend-monitor/publishing'), updates.publishing)

        // Update activity log
        const activityRef = ref(
            database,
            `blend-monitor/activity/recent/${Date.now()}`
        )
        await set(activityRef, {
            type: 'npm_stats_updated',
            timestamp: new Date().toISOString(),
            version: packageStats.version,
        })

        return NextResponse.json({
            success: true,
            data: {
                packageStats,
                downloadTrends,
                versionHistory: versionHistory.slice(0, 10), // Return only last 10 versions
                sizeHistory,
            },
        })
    } catch (error) {
        console.error('Error in NPM API:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch NPM data',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// POST endpoint to refresh NPM data
export async function POST() {
    try {
        const npmClient = new NPMClient('blend-v1')

        // Fetch fresh data
        const packageStats = await npmClient.getPackageStats()

        if (!packageStats) {
            throw new Error('Failed to fetch package stats')
        }

        // Update activity log
        const activityRef = ref(
            database,
            `blend-monitor/activity/recent/${Date.now()}`
        )
        await set(activityRef, {
            type: 'npm_data_refresh',
            timestamp: new Date().toISOString(),
            version: packageStats.version,
        })

        return NextResponse.json({
            success: true,
            message: 'NPM data refresh triggered',
            currentVersion: packageStats.version,
        })
    } catch (error) {
        console.error('Error refreshing NPM data:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to refresh NPM data',
            },
            { status: 500 }
        )
    }
}
