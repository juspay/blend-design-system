'use client'

import { useState, useEffect } from 'react'
import { OverviewCards } from './OverviewCards'
import { ComponentAnalyticsTable } from './ComponentAnalyticsTable'
import {
    Button,
    ButtonType,
    Alert,
    AlertVariant,
} from '@juspay/blend-design-system'
import { RefreshCw, Database } from 'lucide-react'

interface ComponentAnalytics {
    componentName: string
    totalUsage: number
    uniquePages: number
    uniqueVariants: number
    firstSeen: string
    lastSeen: string
    avgInstancesPerPage: number
}

interface AnalyticsData {
    overview: {
        totalComponents: number
        totalPages: number
        totalRepositories: number
        totalUniqueCompositions: number
        mostUsedComponent: string
        mostActiveRepository: string
    }
    componentAnalytics: ComponentAnalytics[]
}

export default function TelemetryDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchAnalytics = async () => {
        setLoading(true)
        try {
            const [dashboardResponse, componentResponse] = await Promise.all([
                fetch('/api/telemetry/page-analytics'),
                fetch('/api/telemetry/component-adoption'),
            ])

            if (!dashboardResponse.ok || !componentResponse.ok) {
                throw new Error('Failed to fetch analytics data')
            }

            const dashboardData = await dashboardResponse.json()
            const componentData = await componentResponse.json()

            if (!dashboardData.success || !componentData.success) {
                throw new Error('API returned error response')
            }

            // Transform data to match interface
            const transformedData: AnalyticsData = {
                overview: {
                    totalComponents:
                        dashboardData.data.overview.totalComponents || 0,
                    totalPages:
                        dashboardData.data.overview.totalUniquePages || 0,
                    totalRepositories:
                        dashboardData.data.overview.totalRepositories || 0,
                    totalUniqueCompositions:
                        dashboardData.data.overview.totalUniquePages || 0,
                    mostUsedComponent:
                        dashboardData.data.topComponents[0]?.componentName ||
                        'No data',
                    mostActiveRepository:
                        dashboardData.data.topRepositories[0]?.repositoryName ||
                        'No data',
                },
                componentAnalytics: componentData.data.components.map(
                    (comp: unknown) => {
                        const component = comp as {
                            componentName: string
                            totalInstances: number
                            uniquePages: number
                            repositories: unknown[]
                            firstUsed: string
                            lastUsed: string
                        }
                        return {
                            componentName: component.componentName,
                            totalUsage: component.totalInstances,
                            uniquePages: component.uniquePages,
                            uniqueVariants: component.repositories.length,
                            firstSeen: component.firstUsed,
                            lastSeen: component.lastUsed,
                            avgInstancesPerPage:
                                component.uniquePages > 0
                                    ? Math.round(
                                          component.totalInstances /
                                              component.uniquePages
                                      )
                                    : 0,
                        }
                    }
                ),
            }

            setData(transformedData)
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
    }, [])

    // Empty state when no data exists yet
    if (!loading && data && data.overview.totalComponents === 0) {
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Component Adoption Analytics
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Track component usage across your applications
                        </p>
                    </div>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Refresh"
                        leadingIcon={<RefreshCw className="w-4 h-4" />}
                        onClick={fetchAnalytics}
                        loading={loading}
                    />
                </div>

                {/* Empty State */}
                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12">
                    <div className="text-center">
                        <Database className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            No Telemetry Data Yet
                        </h3>
                        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                            Start using Blend Design System components in your
                            applications to see adoption analytics here.
                        </p>
                        <div className="mt-6">
                            <Alert
                                variant={AlertVariant.PRIMARY}
                                heading="How it works"
                                description="Components automatically track usage when rendered. Data appears here in real-time with route-level deduplication to prevent duplicates."
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Component Adoption Analytics
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Real-time tracking of component usage across
                        applications
                        {lastUpdated && (
                            <span className="text-sm text-gray-500 ml-2">
                                • Last updated{' '}
                                {lastUpdated.toLocaleTimeString()}
                            </span>
                        )}
                    </p>
                </div>
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Refresh"
                    leadingIcon={<RefreshCw className="w-4 h-4" />}
                    onClick={fetchAnalytics}
                    loading={loading}
                />
            </div>

            {/* Overview Cards */}
            <OverviewCards overview={data!.overview} />

            {/* Component Analytics */}
            <ComponentAnalyticsTable components={data!.componentAnalytics} />
        </div>
    )
}
