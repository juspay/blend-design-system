import { Router } from 'express'
import type { PackageStats, VersionInfo } from '@/shared/types'
import { NPMClient } from '@/backend/external/npm-client'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import {
    authenticateBearer,
    hasPermission,
} from '@/backend/lib/auth-middleware'
import { asyncHandler } from '../utils/async-handler'

export const npmRouter = Router()

async function runNpmDashboardGet(): Promise<{
    success: boolean
    data: {
        packageStats: unknown
        downloadTrends: { date: string; downloads: number }[]
        versionHistory: VersionInfo[]
        sizeHistory: { version: string; size: number; date: string }[]
    }
    metadata: {
        successfulOperations: number
        totalOperations: number
        errors?: string[]
        lastUpdated: string
        fallbackUsed: boolean
    }
}> {
    await initializeDatabase()

    const npmClient = new NPMClient('@juspay/blend-design-system')

    let successfulOperations = 0
    const errors: string[] = []

    let packageStats: unknown = null
    try {
        packageStats = await npmClient.getPackageStats()
        if (packageStats) {
            await databaseService.savePackageStats(packageStats as PackageStats)
            successfulOperations++
        } else {
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

    let downloadTrends: { date: string; downloads: number }[] = []
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

    let versionHistory: VersionInfo[] = []
    try {
        versionHistory = await npmClient.getVersionHistory()
        if (versionHistory.length > 0) {
            for (const version of versionHistory) {
                await databaseService.saveVersionInfo(version)
            }
            successfulOperations++
        } else {
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

    let sizeHistory: { version: string; size: number; date: string }[] = []
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

    try {
        const ps = packageStats as {
            version?: string
            downloads?: { total?: number }
        } | null
        await databaseService.logSystemActivity('npm_stats_updated', {
            version: ps?.version || 'unknown',
            downloads: ps?.downloads?.total || 0,
            successfulOperations,
            errors: errors.length,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error logging system activity:', error)
    }

    return {
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
    }
}

npmRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'npm', 'read')) {
            res.status(user ? 403 : 401).json({
                error: user
                    ? 'Insufficient permissions. Required: npm:read'
                    : 'Authentication required',
            })
            return
        }

        try {
            const payload = await runNpmDashboardGet()
            res.json(payload)
        } catch (error) {
            console.error('Error in NPM API:', error)
            try {
                await initializeDatabase()
                const packageStats = await databaseService.getPackageStats()
                const downloadTrends =
                    await databaseService.getDownloadTrends(30)
                const versionHistory = await databaseService.getVersionHistory()
                res.json({
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
            } catch {
                res.status(500).json({
                    success: false,
                    error: 'Failed to fetch NPM data and no cached data available',
                    details:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                })
            }
        }
    })
)

npmRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'npm', 'write')) {
            res.status(user ? 403 : 401).json({
                error: user
                    ? 'Insufficient permissions. Required: npm:write'
                    : 'Authentication required',
            })
            return
        }

        try {
            const data = await runNpmDashboardGet()
            res.json({
                success: true,
                message: 'NPM data refreshed successfully',
                lastUpdated: new Date().toISOString(),
                metadata: data.metadata,
            })
        } catch (error) {
            console.error('Error refreshing NPM data:', error)
            res.status(500).json({
                success: false,
                error: 'Failed to refresh NPM data',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    })
)

npmRouter.get(
    '/stats',
    asyncHandler(async (_req, res) => {
        let dbError: string | null = null
        let npmError: string | null = null

        try {
            await initializeDatabase()
            const packageStats = await databaseService.getPackageStats()
            if (packageStats) {
                res.json(packageStats)
                return
            }
        } catch (error) {
            dbError =
                error instanceof Error
                    ? error.message
                    : 'Database connection failed'
            console.error('Database error:', dbError)
        }

        try {
            const npmClient = new NPMClient('@juspay/blend-design-system')
            const stats = await npmClient.getPackageStats()
            if (stats) {
                if (!dbError) {
                    try {
                        await databaseService.savePackageStats(stats)
                    } catch (saveError) {
                        console.warn('Could not save to database:', saveError)
                    }
                }
                res.json(stats)
                return
            }
            npmError = 'No package stats available from NPM'
        } catch (error) {
            npmError = error instanceof Error ? error.message : 'NPM API failed'
            console.error('NPM API error:', npmError)
        }

        res.status(503).json({
            error: 'Unable to fetch package statistics',
            details: {
                database: dbError || 'Connected but no data found',
                npm: npmError || 'Unknown error',
                suggestion:
                    'Check database connection and NPM API availability',
            },
        })
    })
)

npmRouter.get(
    '/trends',
    asyncHandler(async (_req, res) => {
        let dbError: string | null = null
        let npmError: string | null = null

        try {
            await initializeDatabase()
            const trends = await databaseService.getDownloadTrends(30)
            if (trends && trends.length > 0) {
                res.json(trends)
                return
            }
        } catch (error) {
            dbError =
                error instanceof Error
                    ? error.message
                    : 'Database connection failed'
            console.error('Database error:', dbError)
        }

        try {
            const npmClient = new NPMClient('@juspay/blend-design-system')
            const downloadTrends = await npmClient.getDownloadTrends(30)
            if (downloadTrends && downloadTrends.length > 0) {
                if (!dbError) {
                    try {
                        for (const trend of downloadTrends) {
                            await databaseService.saveDownloadTrend(
                                trend.date,
                                trend.downloads
                            )
                        }
                    } catch (saveError) {
                        console.warn('Could not save to database:', saveError)
                    }
                }
                res.json(downloadTrends)
                return
            }
            npmError = 'No trend data available from NPM'
        } catch (error) {
            npmError = error instanceof Error ? error.message : 'NPM API failed'
            console.error('NPM API error:', npmError)
        }

        res.status(503).json({
            error: 'Unable to fetch download trends',
            details: {
                database: dbError || 'Connected but no data found',
                npm: npmError || 'Unknown error',
                suggestion:
                    'Check database connection and NPM API availability',
            },
        })
    })
)

npmRouter.get(
    '/versions',
    asyncHandler(async (_req, res) => {
        let dbError: string | null = null
        let npmError: string | null = null

        try {
            await initializeDatabase()
            const versions = await databaseService.getVersionHistory()
            if (versions && versions.length > 0) {
                res.json(versions)
                return
            }
        } catch (error) {
            dbError =
                error instanceof Error
                    ? error.message
                    : 'Database connection failed'
            console.error('Database error:', dbError)
        }

        try {
            const npmClient = new NPMClient('@juspay/blend-design-system')
            const versionHistory = await npmClient.getVersionHistory()
            if (versionHistory && versionHistory.length > 0) {
                if (!dbError) {
                    try {
                        for (const version of versionHistory) {
                            await databaseService.saveVersionInfo(version)
                        }
                    } catch (saveError) {
                        console.warn('Could not save to database:', saveError)
                    }
                }
                res.json(versionHistory)
                return
            }
            npmError = 'No version data available from NPM'
        } catch (error) {
            npmError = error instanceof Error ? error.message : 'NPM API failed'
            console.error('NPM API error:', npmError)
        }

        res.status(503).json({
            error: 'Unable to fetch version history',
            details: {
                database: dbError || 'Connected but no data found',
                npm: npmError || 'Unknown error',
                suggestion:
                    'Check database connection and NPM API availability',
            },
        })
    })
)

npmRouter.post(
    '/sync',
    asyncHandler(async (_req, res) => {
        try {
            await initializeDatabase()
            const startTime = Date.now()
            const syncResult = await databaseService.syncNPMData()
            const duration = Date.now() - startTime

            res.json({
                success: true,
                duration: `${duration}ms`,
                results: {
                    versions: {
                        total:
                            syncResult.versions.saved +
                            syncResult.versions.updated,
                        new: syncResult.versions.saved,
                        updated: syncResult.versions.updated,
                    },
                    trends: { saved: syncResult.trends.saved },
                    stats: { updated: syncResult.stats.updated },
                },
                errors: syncResult.errors,
                hasErrors: syncResult.errors.length > 0,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error('NPM sync failed:', error)
            res.status(500).json({
                success: false,
                error: 'Failed to sync NPM data',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            })
        }
    })
)

npmRouter.get(
    '/sync',
    asyncHandler(async (_req, res) => {
        try {
            await initializeDatabase()
            const latestVersion =
                await databaseService.getLatestVersionFromDatabase()

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
                            statsResult.status === 'fulfilled' &&
                            statsResult.value
                                ? statsResult.value.version
                                : null,
                        lastUpdate: 'Unknown',
                    },
                },
                lastSyncAttempt: 'Manual trigger only',
                nextScheduledSync: 'Not scheduled',
                recommendations: [] as string[],
            }

            if (status.database.versions.count === 0) {
                status.recommendations.push(
                    'Run sync to populate version history'
                )
            }
            if (status.database.trends.count < 30) {
                status.recommendations.push(
                    'Run sync to get complete download trends'
                )
            }
            if (!status.database.stats.hasData) {
                status.recommendations.push(
                    'Run sync to get package statistics'
                )
            }

            res.json(status)
        } catch (error) {
            console.error('Error getting sync status:', error)
            res.status(500).json({
                error: 'Failed to get sync status',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    })
)
