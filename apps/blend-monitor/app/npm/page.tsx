'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
    usePackageStats,
    useDownloadTrends,
    useVersionHistory,
} from '@/hooks/useRealtimeData'
import {
    Charts,
    ChartType,
    ButtonV2,
    ButtonTypeV2,
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
    const { versions, loading: versionsLoading } = useVersionHistory()
    const [refreshing, setRefreshing] = useState(false)
    const [filterType, setFilterType] = useState<
        'all' | 'major' | 'minor' | 'patch'
    >('all')

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

    if (statsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Loading NPM statistics...
                    </p>
                </div>
            </div>
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
                        <ButtonV2
                            text="View on NPM"
                            buttonType={ButtonTypeV2.SECONDARY}
                            trailingIcon={<ExternalLink className="w-4 h-4" />}
                            onClick={() =>
                                window.open(
                                    'https://www.npmjs.com/package/blend-v1',
                                    '_blank'
                                )
                            }
                        />
                        <ButtonV2
                            text="Refresh"
                            buttonType={ButtonTypeV2.PRIMARY}
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

                {/* All Stats Grid - 8 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                        value={versions.filter((v) => v.breaking).length}
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
                            versions.filter((v) => v.version.includes('-'))
                                .length
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
                        {filteredVersions.slice(0, 10).map((version, index) => {
                            const prevVersion = filteredVersions[index + 1]
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

                                if (parseInt(current[0]) > parseInt(prev[0])) {
                                    return (
                                        <Tag
                                            text="MAJOR"
                                            variant={TagVariant.ATTENTIVE}
                                            color={TagColor.ERROR}
                                            size={TagSize.XS}
                                        />
                                    )
                                } else if (
                                    current[0] === prev[0] &&
                                    parseInt(current[1]) > parseInt(prev[1])
                                ) {
                                    return (
                                        <Tag
                                            text="MINOR"
                                            variant={TagVariant.ATTENTIVE}
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
                                                        v{version.version}
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
                                                            size={TagSize.XS}
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
                                                            size={TagSize.XS}
                                                        />
                                                    )}
                                                </div>

                                                {/* Changelog */}
                                                {version.changelog && (
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {version.changelog}
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
                                                            {version.publisher}
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
                                                                    version.size
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
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
