'use client'

import React, { useEffect, useState } from 'react'
import {
    usePackageStats,
    useDownloadTrends,
    useVersionHistory,
} from '@/hooks/useRealtimeData'
import { MetricCard } from '@/components/dashboard/MetricCard'
import {
    Charts,
    ChartType,
    ButtonV2,
    Tag,
    TagVariant,
    TagColor,
    TagSize,
} from 'blend-v1'
import {
    Package,
    Download,
    TrendingUp,
    GitBranch,
    RefreshCw,
    ExternalLink,
} from 'lucide-react'

export default function NPMPage() {
    const { packageStats, loading: statsLoading } = usePackageStats()
    const { trends, loading: trendsLoading } = useDownloadTrends()
    const { versions, loading: versionsLoading } = useVersionHistory()
    const [refreshing, setRefreshing] = useState(false)

    // Prepare chart data for download trends
    const chartData = React.useMemo(() => {
        if (!trends || trends.length === 0) return []

        return [
            {
                name: 'Downloads',
                data: trends.reduce((acc, trend) => {
                    const date = new Date(trend.date).toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric' }
                    )
                    acc[date] = {
                        primary: {
                            label: 'Downloads',
                            val: trend.downloads,
                        },
                    }
                    return acc
                }, {} as any),
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
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        NPM Package Statistics
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Monitor blend-v1 package performance and adoption
                    </p>
                </div>
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
                <MetricCard
                    title="Current Version"
                    value={packageStats?.version || '0.0.0'}
                    subtitle={
                        packageStats?.lastPublish
                            ? `Published ${new Date(packageStats.lastPublish).toLocaleDateString()}`
                            : ''
                    }
                    icon={<Package className="w-5 h-5" />}
                    color="primary"
                />
                <MetricCard
                    title="Weekly Downloads"
                    value={
                        packageStats?.downloads.weekly.toLocaleString() || '0'
                    }
                    trend={calculateTrend()}
                    icon={<Download className="w-5 h-5" />}
                    color="success"
                />
                <MetricCard
                    title="Total Downloads"
                    value={
                        packageStats?.downloads.total.toLocaleString() || '0'
                    }
                    icon={<TrendingUp className="w-5 h-5" />}
                    color="warning"
                />
                <MetricCard
                    title="Dependencies"
                    value={packageStats?.dependencies || 0}
                    subtitle={`${(packageStats?.size.unpacked || 0) / 1024 / 1024}MB unpacked`}
                    icon={<GitBranch className="w-5 h-5" />}
                    color="primary"
                />
            </div>

            {/* Download Trends Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <Charts
                    chartType={ChartType.LINE}
                    data={chartData}
                    chartHeaderSlot={
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">
                                Download Trends (Last 30 Days)
                            </h3>
                            <p className="text-sm text-gray-500">
                                Daily download count for blend-v1
                            </p>
                        </div>
                    }
                />
            </div>

            {/* Version History */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Version History</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Recent package releases
                    </p>
                </div>
                <div className="divide-y">
                    {versions.slice(0, 10).map((version) => (
                        <div
                            key={version.version}
                            className="p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-mono font-medium text-gray-900">
                                            v{version.version}
                                        </h4>
                                        {version.breaking && (
                                            <Tag
                                                text="Breaking"
                                                variant={TagVariant.ATTENTIVE}
                                                color={TagColor.ERROR}
                                                size={TagSize.XS}
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {version.changelog}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                        <span>
                                            Published{' '}
                                            {new Date(
                                                version.publishedAt
                                            ).toLocaleDateString()}
                                        </span>
                                        <span>by {version.publisher}</span>
                                        <span>
                                            {version.downloads.toLocaleString()}{' '}
                                            downloads
                                        </span>
                                        {version.size && (
                                            <span>
                                                {(
                                                    version.size.unpacked /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}
                                                MB
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
