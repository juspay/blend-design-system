'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
    usePackageStats,
    useDownloadTrends,
    useVersionHistory,
} from '@/hooks/usePostgreSQLData'
import Loader, {
    CardSkeleton,
    SkeletonLoader,
} from '@/components/shared/Loader'
import {
    Charts,
    ChartType,
    Button,
    ButtonType,
    ButtonSize,
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    StatCard,
    StatCardVariant,
    ChangeType,
    SingleSelect,
} from 'blend-v1'
import {
    Package,
    Download,
    TrendingUp,
    GitBranch,
    RefreshCw,
    ExternalLink,
    Calendar,
    Users,
    FileText,
    AlertTriangle,
    History,
    GitCommit,
    AlertCircle,
    Layers,
} from 'lucide-react'

export default function NPMPage() {
    const { packageStats, loading: statsLoading } = usePackageStats()
    const { trends, loading: trendsLoading } = useDownloadTrends()
    const {
        versions,
        loading: versionsLoading,
        error: versionsError,
    } = useVersionHistory()
    const [refreshing, setRefreshing] = useState(false)
    const [syncing, setSyncing] = useState(false)
    const [syncResult, setSyncResult] = useState<any>(null)
    const [filterType, setFilterType] = useState<
        'all' | 'major' | 'minor' | 'patch'
    >('all')

    // Debug logging
    useEffect(() => {
        console.log('NPM Page Debug:', {
            versions: versions?.length || 0,
            versionsLoading,
            versionsError,
            versionsData: versions,
        })
    }, [versions, versionsLoading, versionsError])

    // Filter versions based on selected criteria
    const filteredVersions = useMemo(() => {
        return versions.filter((version) => {
            // Filter by version type
            if (filterType !== 'all') {
                const versionParts = version.version.split('.')
                const prevVersion = versions.find(
                    (v, idx) => idx === versions.indexOf(version) + 1
                )

                if (prevVersion) {
                    const prevParts = prevVersion.version.split('.')

                    switch (filterType) {
                        case 'major':
                            return (
                                parseInt(versionParts[0]) >
                                parseInt(prevParts[0])
                            )
                        case 'minor':
                            return (
                                versionParts[0] === prevParts[0] &&
                                parseInt(versionParts[1]) >
                                    parseInt(prevParts[1])
                            )
                        case 'patch':
                            return (
                                versionParts[0] === prevParts[0] &&
                                versionParts[1] === prevParts[1]
                            )
                    }
                }
            }

            return true
        })
    }, [versions, filterType])

    // Prepare chart data for download trends
    const chartData = React.useMemo(() => {
        if (!trends || trends.length === 0) return []

        // Sort trends by date to ensure proper line connection
        const sortedTrends = [...trends].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        // Create data object with ordered keys
        const dataObj = {} as any
        sortedTrends.forEach((trend) => {
            const date = new Date(trend.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })
            dataObj[date] = {
                primary: {
                    label: 'Daily Downloads',
                    val: trend.downloads,
                },
            }
        })

        return [
            {
                name: 'Download Trend',
                data: dataObj,
            },
        ]
    }, [trends])

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            await fetch('/api/npm', { method: 'POST' })
        } catch (error) {
            console.error('Error refreshing NPM data:', error)
        }
        setRefreshing(false)
    }

    const handleSync = async () => {
        setSyncing(true)
        setSyncResult(null)

        try {
            // Show immediate feedback
            setSyncResult({
                success: null,
                message: 'Sync in progress... This may take up to 2 minutes.',
                inProgress: true,
            })

            // Use longer timeout for sync operations
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout

            const response = await fetch('/api/npm/sync', {
                method: 'POST',
                signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${response.statusText}`
                )
            }

            const result = await response.json()
            setSyncResult(result)

            if (result.success) {
                // Refresh the page data after successful sync
                setTimeout(() => {
                    window.location.reload()
                }, 3000) // Give user time to read the results
            }
        } catch (error) {
            console.error('Error syncing NPM data:', error)

            let errorMessage = 'Failed to sync data'
            let details =
                error instanceof Error ? error.message : 'Unknown error'

            if (error instanceof Error && error.name === 'AbortError') {
                errorMessage = 'Sync timed out'
                details =
                    'The sync operation took longer than 2 minutes. It may still be running in the background.'
            }

            setSyncResult({
                success: false,
                error: errorMessage,
                details,
                inProgress: false,
            })
        }

        setSyncing(false)
    }

    // Calculate trend percentage
    const calculateTrend = () => {
        if (!trends || trends.length < 7) return 0
        const lastWeek = trends
            .slice(-7)
            .reduce((sum, t) => sum + t.downloads, 0)
        const previousWeek = trends
            .slice(-14, -7)
            .reduce((sum, t) => sum + t.downloads, 0)
        if (previousWeek === 0) return 0
        return Math.round(((lastWeek - previousWeek) / previousWeek) * 100)
    }

    const isLoading = statsLoading || trendsLoading || versionsLoading

    if (statsLoading && trendsLoading && versionsLoading) {
        return (
            <Loader fullScreen size="large" text="Loading NPM statistics..." />
        )
    }

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            NPM Package Stats
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Monitor blend-v1 package performance and releases
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            text="View on NPM"
                            buttonType={ButtonType.SECONDARY}
                            trailingIcon={<ExternalLink className="w-4 h-4" />}
                            onClick={() =>
                                window.open(
                                    'https://www.npmjs.com/package/blend-v1',
                                    '_blank'
                                )
                            }
                        />
                        <Button
                            text={syncing ? 'Syncing...' : 'Sync to DB'}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={
                                <RefreshCw
                                    className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`}
                                />
                            }
                            onClick={handleSync}
                            disabled={syncing}
                        />
                        <Button
                            text="Refresh"
                            buttonType={ButtonType.PRIMARY}
                            leadingIcon={
                                <RefreshCw
                                    className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                                />
                            }
                            onClick={handleRefresh}
                            disabled={refreshing}
                        />
                    </div>
                </div>

                {/* Sync Result Status */}
                {syncResult && (
                    <div
                        className={`mb-6 p-4 rounded-lg border ${
                            syncResult.inProgress
                                ? 'bg-blue-50 border-blue-200'
                                : syncResult.success === false
                                  ? 'bg-red-50 border-red-200'
                                  : 'bg-green-50 border-green-200'
                        }`}
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {syncResult.inProgress ? (
                                    <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
                                ) : syncResult.success ? (
                                    <svg
                                        className="h-5 w-5 text-green-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-5 w-5 text-red-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <h3
                                    className={`text-sm font-medium ${
                                        syncResult.inProgress
                                            ? 'text-blue-800'
                                            : syncResult.success
                                              ? 'text-green-800'
                                              : 'text-red-800'
                                    }`}
                                >
                                    {syncResult.inProgress
                                        ? 'Synchronizing Data...'
                                        : syncResult.success
                                          ? 'Sync Completed Successfully'
                                          : 'Sync Failed'}
                                </h3>

                                {syncResult.inProgress &&
                                    syncResult.message && (
                                        <p className="mt-1 text-sm text-blue-700">
                                            {syncResult.message}
                                        </p>
                                    )}

                                {syncResult.success && syncResult.results && (
                                    <div className="mt-2 text-sm text-green-700">
                                        <p>
                                            ✅ Versions:{' '}
                                            {syncResult.results.versions.total}{' '}
                                            total (
                                            {syncResult.results.versions.new}{' '}
                                            new,{' '}
                                            {
                                                syncResult.results.versions
                                                    .updated
                                            }{' '}
                                            updated)
                                        </p>
                                        <p>
                                            ✅ Trends:{' '}
                                            {syncResult.results.trends.saved}{' '}
                                            records
                                        </p>
                                        <p>
                                            ✅ Stats:{' '}
                                            {syncResult.results.stats.updated
                                                ? 'Updated'
                                                : 'No changes'}
                                        </p>
                                        <p className="text-xs mt-1">
                                            Duration: {syncResult.duration}
                                        </p>
                                        <p className="text-xs text-green-600 mt-2">
                                            🔄 Page will refresh automatically
                                            in 3 seconds...
                                        </p>
                                    </div>
                                )}

                                {syncResult.error && (
                                    <div className="mt-2">
                                        <p className="text-sm text-red-700">
                                            {syncResult.error}
                                        </p>
                                        {syncResult.details && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {syncResult.details}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {syncResult.hasErrors && syncResult.errors && (
                                    <details className="mt-2">
                                        <summary className="text-sm text-red-700 cursor-pointer">
                                            View errors (
                                            {syncResult.errors.length})
                                        </summary>
                                        <ul className="mt-1 text-xs text-red-600">
                                            {syncResult.errors.map(
                                                (error: string, i: number) => (
                                                    <li key={i}>• {error}</li>
                                                )
                                            )}
                                        </ul>
                                    </details>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* All Stats Grid - 8 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {isLoading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        <>
                            <StatCard
                                title="Current Version"
                                value={packageStats?.version || '0.0.0'}
                                subtitle={
                                    packageStats?.lastPublish
                                        ? `Published ${new Date(packageStats.lastPublish).toLocaleDateString()}`
                                        : ''
                                }
                                titleIcon={
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Package className="w-5 h-5 text-blue-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Weekly Downloads"
                                value={
                                    packageStats?.downloads.weekly.toLocaleString() ||
                                    '0'
                                }
                                change={
                                    calculateTrend() !== 0
                                        ? {
                                              value: Math.abs(calculateTrend()),
                                              type:
                                                  calculateTrend() > 0
                                                      ? ChangeType.INCREASE
                                                      : ChangeType.DECREASE,
                                          }
                                        : undefined
                                }
                                titleIcon={
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Download className="w-5 h-5 text-green-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Total Downloads"
                                value={
                                    packageStats?.downloads.total.toLocaleString() ||
                                    '0'
                                }
                                titleIcon={
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-amber-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Dependencies"
                                value={packageStats?.dependencies || 0}
                                subtitle={`${((packageStats?.size.unpacked || 0) / 1024 / 1024).toFixed(1)}MB unpacked`}
                                titleIcon={
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <GitBranch className="w-5 h-5 text-purple-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Total Releases"
                                value={versions.length}
                                titleIcon={
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <History className="w-5 h-5 text-blue-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Breaking Changes"
                                value={
                                    versions.filter((v) => v.breaking).length
                                }
                                titleIcon={
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Pre-releases"
                                value={
                                    versions.filter((v) =>
                                        v.version.includes('-')
                                    ).length
                                }
                                titleIcon={
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <GitCommit className="w-5 h-5 text-purple-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Latest Version"
                                value={versions[0]?.version || 'N/A'}
                                titleIcon={
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Layers className="w-5 h-5 text-green-600" />
                                    </div>
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                        </>
                    )}
                </div>

                {/* Download Trends Chart */}
                <Charts
                    chartType={ChartType.BAR}
                    data={chartData}
                    chartHeaderSlot={
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-gray-900">
                                Download Trends
                            </h3>
                            <p className="text-xs text-gray-600">
                                Last 30 days - Daily downloads
                            </p>
                        </div>
                    }
                />

                {/* Version History Section */}
                <div className="mt-8">
                    {/* Filter Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Versions
                        </h2>
                        <div className="w-48">
                            <SingleSelect
                                selected={filterType}
                                onSelect={(value: string) =>
                                    setFilterType(
                                        value as
                                            | 'all'
                                            | 'major'
                                            | 'minor'
                                            | 'patch'
                                    )
                                }
                                label=""
                                placeholder="Select filter"
                                items={[
                                    {
                                        items: [
                                            {
                                                label: 'All Versions',
                                                value: 'all',
                                            },
                                            {
                                                label: 'Major Releases',
                                                value: 'major',
                                            },
                                            {
                                                label: 'Minor Releases',
                                                value: 'minor',
                                            },
                                            {
                                                label: 'Patch Releases',
                                                value: 'patch',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Version List */}
                    <div className="space-y-3">
                        {versionsLoading ? (
                            // Loading state
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-lg border border-gray-200 p-4"
                                    >
                                        <div className="animate-pulse">
                                            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-64 mb-3"></div>
                                            <div className="flex gap-4">
                                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : versionsError ? (
                            // Error state
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-red-900 mb-2">
                                    Failed to Load Version History
                                </h3>
                                <p className="text-red-700 mb-4">
                                    {versionsError}
                                </p>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Retry"
                                    leadingIcon={
                                        <RefreshCw className="w-4 h-4" />
                                    }
                                    onClick={() => window.location.reload()}
                                />
                            </div>
                        ) : !versions || versions.length === 0 ? (
                            // Empty state
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No Version History Available
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Version history will appear here once NPM
                                    data is fetched.
                                </p>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Fetch NPM Data"
                                    leadingIcon={
                                        <RefreshCw className="w-4 h-4" />
                                    }
                                    onClick={handleRefresh}
                                />
                            </div>
                        ) : filteredVersions.length === 0 ? (
                            // No filtered results
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No versions match your filter
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try selecting a different filter to see more
                                    versions.
                                </p>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Clear Filter"
                                    onClick={() => setFilterType('all')}
                                />
                            </div>
                        ) : (
                            // Render versions
                            filteredVersions
                                .slice(0, 10)
                                .map((version, index) => {
                                    const prevVersion =
                                        filteredVersions[index + 1]
                                    const isPrerelease =
                                        version.version.includes('-') ||
                                        version.version.includes('alpha') ||
                                        version.version.includes('beta')

                                    const getVersionTypeTag = (
                                        version: string,
                                        prevVersion?: string
                                    ) => {
                                        if (!prevVersion) return null

                                        const current = version.split('.')
                                        const prev = prevVersion.split('.')

                                        if (
                                            parseInt(current[0]) >
                                            parseInt(prev[0])
                                        ) {
                                            return (
                                                <Tag
                                                    text="MAJOR"
                                                    variant={
                                                        TagVariant.ATTENTIVE
                                                    }
                                                    color={TagColor.ERROR}
                                                    size={TagSize.XS}
                                                />
                                            )
                                        } else if (
                                            current[0] === prev[0] &&
                                            parseInt(current[1]) >
                                                parseInt(prev[1])
                                        ) {
                                            return (
                                                <Tag
                                                    text="MINOR"
                                                    variant={
                                                        TagVariant.ATTENTIVE
                                                    }
                                                    color={TagColor.WARNING}
                                                    size={TagSize.XS}
                                                />
                                            )
                                        } else {
                                            return (
                                                <Tag
                                                    text="PATCH"
                                                    variant={TagVariant.SUBTLE}
                                                    color={TagColor.SUCCESS}
                                                    size={TagSize.XS}
                                                />
                                            )
                                        }
                                    }

                                    return (
                                        <div
                                            key={version.version}
                                            className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                                        >
                                            <div className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        {/* Version Header */}
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="font-mono font-semibold text-gray-900">
                                                                v
                                                                {
                                                                    version.version
                                                                }
                                                            </h3>
                                                            {getVersionTypeTag(
                                                                version.version,
                                                                prevVersion?.version
                                                            )}
                                                            {isPrerelease && (
                                                                <Tag
                                                                    text="Pre-release"
                                                                    variant={
                                                                        TagVariant.SUBTLE
                                                                    }
                                                                    color={
                                                                        TagColor.PURPLE
                                                                    }
                                                                    size={
                                                                        TagSize.XS
                                                                    }
                                                                />
                                                            )}
                                                            {version.breaking && (
                                                                <Tag
                                                                    text="Breaking"
                                                                    variant={
                                                                        TagVariant.ATTENTIVE
                                                                    }
                                                                    color={
                                                                        TagColor.ERROR
                                                                    }
                                                                    size={
                                                                        TagSize.XS
                                                                    }
                                                                />
                                                            )}
                                                        </div>

                                                        {/* Changelog */}
                                                        {version.changelog && (
                                                            <p className="text-sm text-gray-600 mb-3">
                                                                {
                                                                    version.changelog
                                                                }
                                                            </p>
                                                        )}

                                                        {/* Metadata */}
                                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>
                                                                    {new Date(
                                                                        version.publishedAt
                                                                    ).toLocaleDateString(
                                                                        'en-US',
                                                                        {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            year: 'numeric',
                                                                        }
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <GitBranch className="w-3 h-3" />
                                                                <span>
                                                                    {
                                                                        version.publisher
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Download className="w-3 h-3" />
                                                                <span>
                                                                    {version.downloads.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            {version.size && (
                                                                <div className="flex items-center gap-1">
                                                                    <Package className="w-3 h-3" />
                                                                    <span>
                                                                        {(
                                                                            version
                                                                                .size
                                                                                .unpacked /
                                                                            1024 /
                                                                            1024
                                                                        ).toFixed(
                                                                            1
                                                                        )}{' '}
                                                                        MB
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
