'use client'

import { useState, useEffect } from 'react'
import { OverviewCards } from './OverviewCards'
import { ComponentAnalyticsTable } from './ComponentAnalyticsTable'
import { RepositoryAnalyticsTable } from './RepositoryAnalyticsTable'
import { TrendsChart } from './TrendsChart'
import { TopVariantsTable } from './TopVariantsTable'
import {
    Charts,
    ChartType,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import { RefreshCw } from 'lucide-react'

interface ComponentAnalytics {
    componentName: string
    totalUsage: number
    uniqueSessions: number
    uniqueVariants: number
    firstSeen: string
    lastSeen: string
    avgInstancesPerSession: number
}

interface RepositoryAnalytics {
    repositoryName: string
    totalComponents: number
    totalUsage: number
    uniqueComponents: number
    lastActivity: string
}

interface TrendData {
    date: string
    componentCount: number
    sessionCount: number
    eventCount: number
}

interface AnalyticsData {
    overview: {
        totalComponents: number
        totalSessions: number
        totalEvents: number
        totalRepositories: number
        mostUsedComponent: string
        mostActiveRepository: string
    }
    componentAnalytics: ComponentAnalytics[]
    repositoryAnalytics: RepositoryAnalytics[]
    trends: TrendData[]
    topVariants: Array<{
        componentName: string
        propsSignature: string
        componentProps: Record<string, unknown>
        usageCount: number
    }>
}

export default function TelemetryDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/telemetry/analytics')
            if (!response.ok) {
                throw new Error('Failed to fetch analytics data')
            }
            const analyticsData = await response.json()
            setData(analyticsData)
            setLastUpdated(new Date())
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchAnalytics, 30000)

        return () => clearInterval(interval)
    }, [])

    if (loading && !data) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600">
                        Loading telemetry analytics...
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                    <div className="text-red-600 mr-3">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-red-800">
                            Error Loading Analytics
                        </h3>
                        <p className="text-red-600 mt-1">{error}</p>
                        <button
                            onClick={fetchAnalytics}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                    No telemetry data available
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header with refresh info */}
            <div className="flex justify-between items-center">
                <div>
                    {lastUpdated && (
                        <p className="text-sm text-gray-500 mt-1">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                            {loading && (
                                <span className="ml-2 text-blue-600">
                                    (Refreshing...)
                                </span>
                            )}
                        </p>
                    )}
                </div>
                <Button
                    text={loading ? 'Refreshing...' : 'Refresh Data'}
                    buttonType={ButtonType.PRIMARY}
                    leadingIcon={
                        <RefreshCw
                            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                        />
                    }
                    onClick={fetchAnalytics}
                    disabled={loading}
                />
            </div>

            {/* Overview Cards */}
            <OverviewCards overview={data.overview} />

            {/* Component Analytics - Full Width */}
            <ComponentAnalyticsTable components={data.componentAnalytics} />

            {/* Repository Analytics */}
            <RepositoryAnalyticsTable repositories={data.repositoryAnalytics} />

            {/* Most Used Component Variants - Full Width */}
            <TopVariantsTable variants={data.topVariants} />

            {/* Component Distribution Pie Chart */}
            <Charts
                chartType={ChartType.PIE}
                data={[
                    {
                        name: 'Component Distribution',
                        data: Object.entries(
                            data.topVariants.reduce(
                                (acc, variant) => {
                                    acc[variant.componentName] =
                                        (acc[variant.componentName] || 0) +
                                        variant.usageCount
                                    return acc
                                },
                                {} as Record<string, number>
                            )
                        )
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 8)
                            .reduce(
                                (acc, [componentName, totalUsage]) => {
                                    acc[componentName] = {
                                        primary: {
                                            label: 'Usage',
                                            val: totalUsage,
                                        },
                                    }
                                    return acc
                                },
                                {} as Record<
                                    string,
                                    {
                                        primary: {
                                            label: string
                                            val: number
                                        }
                                    }
                                >
                            ),
                    },
                ]}
                chartHeaderSlot={
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-900">
                            Component Distribution
                        </h3>
                        <p className="text-xs text-gray-600">
                            Usage by component type
                        </p>
                    </div>
                }
            />
        </div>
    )
}
