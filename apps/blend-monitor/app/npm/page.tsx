'use client'

import React, { useEffect, useState } from 'react'
import {
    usePackageStats,
    useDownloadTrends,
    useVersionHistory,
} from '@/hooks/useRealtimeData'
import {
    Charts,
    ChartType,
    ButtonV2,
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    StatCard,
    StatCardVariant,
    ChangeType,
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
} from 'lucide-react'
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

export default function NPMPage() {
    const { packageStats, loading: statsLoading } = usePackageStats()
    const { trends, loading: trendsLoading } = useDownloadTrends()
    const { versions, loading: versionsLoading } = useVersionHistory()
    const [refreshing, setRefreshing] = useState(false)

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
                <div className="mb-8 flex items-center justify-end">
                    <div className="flex items-center gap-4">
                        <ButtonV2
                            text="View on NPM"
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

                {/* Metrics Grid */}
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

                {/* Version History */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-8">
                        Version History
                    </h3>
                    <VerticalTimeline lineColor="#e5e7eb">
                        {versions.slice(0, 10).map((version, index) => (
                            <VerticalTimelineElement
                                key={version.version}
                                className="vertical-timeline-element--work"
                                contentStyle={{
                                    background: '#fff',
                                    color: '#333',
                                    boxShadow:
                                        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                    border: '1px solid #e5e7eb',
                                }}
                                contentArrowStyle={{
                                    borderRight: '7px solid #e5e7eb',
                                }}
                                date={new Date(
                                    version.publishedAt
                                ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                                iconStyle={{
                                    background:
                                        index === 0 ? '#3b82f6' : '#9ca3af',
                                    color: '#fff',
                                    width: '24px',
                                    height: '24px',
                                    marginLeft: '-12px',
                                    marginTop: '22px',
                                }}
                                icon={<Package className="w-3 h-3" />}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-mono font-semibold text-lg">
                                            v{version.version}
                                        </h4>
                                        {version.breaking && (
                                            <Tag
                                                text="Breaking Changes"
                                                variant={TagVariant.ATTENTIVE}
                                                color={TagColor.ERROR}
                                                size={TagSize.SM}
                                                leftSlot={
                                                    <AlertTriangle className="w-3 h-3" />
                                                }
                                            />
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-3">
                                    {version.changelog ||
                                        'No changelog provided'}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{version.publisher}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="w-4 h-4" />
                                        <span>
                                            {version.downloads.toLocaleString()}
                                        </span>
                                    </div>
                                    {version.size && (
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-4 h-4" />
                                            <span>
                                                {(
                                                    version.size.unpacked /
                                                    1024 /
                                                    1024
                                                ).toFixed(1)}{' '}
                                                MB
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>
        </div>
    )
}
