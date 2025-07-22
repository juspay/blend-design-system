'use client'

import React, { useState } from 'react'
import Loader from '@/components/shared/Loader'
import EmptyState from '@/components/shared/EmptyState'
import { Activity, TrendingUp, Clock, Zap, Gauge } from 'lucide-react'
import { Charts, ChartType, StatCard, StatCardVariant } from 'blend-v1'
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics'

export default function PerformancePage() {
    const [environment, setEnvironment] = useState('production')
    const [timeRange, setTimeRange] = useState(24)
    const { metrics, aggregated, loading, error } = usePerformanceMetrics(
        environment,
        timeRange
    )

    const getPerformanceScore = (metric: string, value: number): string => {
        switch (metric) {
            case 'fcp':
                return value < 1.8
                    ? 'Good'
                    : value < 3
                      ? 'Needs Improvement'
                      : 'Poor'
            case 'lcp':
                return value < 2.5
                    ? 'Good'
                    : value < 4
                      ? 'Needs Improvement'
                      : 'Poor'
            case 'fid':
                return value < 100
                    ? 'Good'
                    : value < 300
                      ? 'Needs Improvement'
                      : 'Poor'
            case 'cls':
                return value < 0.1
                    ? 'Good'
                    : value < 0.25
                      ? 'Needs Improvement'
                      : 'Poor'
            default:
                return 'Unknown'
        }
    }

    const getScoreColor = (score: string): string => {
        switch (score) {
            case 'Good':
                return 'text-green-600'
            case 'Needs Improvement':
                return 'text-yellow-600'
            case 'Poor':
                return 'text-red-600'
            default:
                return 'text-gray-600'
        }
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-full overflow-y-auto bg-white">
                <div className="p-8">
                    <div className="text-center py-12">
                        <p className="text-red-600">Error: {error}</p>
                    </div>
                </div>
            </div>
        )
    }

    // Always show empty state until real performance monitoring is integrated
    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <EmptyState
                        icon={Gauge}
                        title="Set up Performance Monitoring"
                        description="Track real-time performance metrics from your Firebase applications. Monitor server response times, error rates, resource usage, and custom performance traces to ensure optimal user experience."
                        action={{
                            label: 'Get Started with Performance Monitoring',
                            onClick: () => {
                                window.open(
                                    'https://firebase.google.com/docs/perf-mon/get-started-web',
                                    '_blank'
                                )
                            },
                        }}
                    />
                </div>

                {/* What you'll be able to monitor */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-900">
                                Response Times
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Track P50, P95, and P99 response time percentiles to
                            understand your application's performance
                            distribution.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-gray-900">
                                Error Tracking
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Monitor error rates and identify issues affecting
                            your users in real-time across all environments.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Gauge className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-gray-900">
                                Resource Usage
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Keep track of CPU, memory usage, and active
                            connections to optimize resource allocation.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUp className="w-5 h-5 text-amber-600" />
                            <h3 className="font-semibold text-gray-900">
                                Traffic Insights
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Analyze requests per second and traffic patterns to
                            scale your infrastructure effectively.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-gray-900">
                                Historical Data
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            View performance trends over time with hourly,
                            daily, and weekly aggregations.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="w-5 h-5 text-red-600" />
                            <h3 className="font-semibold text-gray-900">
                                Custom Traces
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Define and monitor custom performance traces
                            specific to your application's critical paths.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
