'use client'

import React, { useState } from 'react'
import Loader from '@/components/shared/Loader'
import EmptyState from '@/components/shared/EmptyState'
import { Activity, TrendingUp, Clock, Zap, Gauge } from 'lucide-react'
import {
    Charts,
    ChartType,
    StatCard,
    StatCardVariant,
    ChangeType,
} from 'blend-v1'
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

    if (!aggregated || metrics.length === 0) {
        return (
            <div className="h-full overflow-y-auto bg-white">
                <div className="p-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <EmptyState
                            icon={Gauge}
                            title="No performance data available"
                            description="Performance metrics will appear here once Firebase Performance Monitoring starts collecting data from your application. This includes Core Web Vitals and custom traces."
                            action={{
                                label: 'Set up Performance Monitoring',
                                onClick: () => {
                                    window.open(
                                        'https://firebase.google.com/docs/perf-mon/get-started-web',
                                        '_blank'
                                    )
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                {/* Filters */}
                <div className="mb-6 flex gap-4">
                    <select
                        value={environment}
                        onChange={(e) => setEnvironment(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="production">Production</option>
                        <option value="staging">Staging</option>
                        <option value="development">Development</option>
                    </select>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(parseInt(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="1">Last Hour</option>
                        <option value="24">Last 24 Hours</option>
                        <option value="168">Last 7 Days</option>
                    </select>
                </div>

                {/* Core Web Vitals */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">
                        Core Web Vitals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    First Contentful Paint
                                </span>
                                <Zap className="w-4 h-4 text-blue-600" />
                            </div>
                            <p className="text-2xl font-semibold">
                                {(aggregated.pageLoad.fcp / 1000).toFixed(2)}s
                            </p>
                            <p
                                className={`text-sm mt-1 ${getScoreColor(getPerformanceScore('fcp', aggregated.pageLoad.fcp / 1000))}`}
                            >
                                {getPerformanceScore(
                                    'fcp',
                                    aggregated.pageLoad.fcp / 1000
                                )}
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    Largest Contentful Paint
                                </span>
                                <Activity className="w-4 h-4 text-purple-600" />
                            </div>
                            <p className="text-2xl font-semibold">
                                {(aggregated.pageLoad.lcp / 1000).toFixed(2)}s
                            </p>
                            <p
                                className={`text-sm mt-1 ${getScoreColor(getPerformanceScore('lcp', aggregated.pageLoad.lcp / 1000))}`}
                            >
                                {getPerformanceScore(
                                    'lcp',
                                    aggregated.pageLoad.lcp / 1000
                                )}
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    First Input Delay
                                </span>
                                <Clock className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-2xl font-semibold">
                                {aggregated.pageLoad.fid.toFixed(0)}ms
                            </p>
                            <p
                                className={`text-sm mt-1 ${getScoreColor(getPerformanceScore('fid', aggregated.pageLoad.fid))}`}
                            >
                                {getPerformanceScore(
                                    'fid',
                                    aggregated.pageLoad.fid
                                )}
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    Cumulative Layout Shift
                                </span>
                                <TrendingUp className="w-4 h-4 text-amber-600" />
                            </div>
                            <p className="text-2xl font-semibold">
                                {aggregated.pageLoad.cls.toFixed(3)}
                            </p>
                            <p
                                className={`text-sm mt-1 ${getScoreColor(getPerformanceScore('cls', aggregated.pageLoad.cls))}`}
                            >
                                {getPerformanceScore(
                                    'cls',
                                    aggregated.pageLoad.cls
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Network Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Network Performance
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-sm">
                                    API Response Time
                                </span>
                                <span className="text-sm font-semibold">
                                    {aggregated.network.apiResponseTime.toFixed(
                                        0
                                    )}
                                    ms avg
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-sm">Image Load Time</span>
                                <span className="text-sm font-semibold">
                                    {aggregated.network.imageLoadTime.toFixed(
                                        0
                                    )}
                                    ms avg
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-sm">Total Page Size</span>
                                <span className="text-sm font-semibold">
                                    {(
                                        aggregated.network.totalPageSize /
                                        1024 /
                                        1024
                                    ).toFixed(2)}
                                    MB
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Custom Traces */}
                    {aggregated.customTraces &&
                        aggregated.customTraces.length > 0 && (
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Custom Performance Traces
                                </h3>
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Trace Name
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Duration
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {aggregated.customTraces.map(
                                                (trace: any, index: number) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {trace.name}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                            {trace.duration}ms
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                </div>

                {/* Performance Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                        Performance Summary
                    </h3>
                    <p className="text-sm text-gray-600">
                        Based on {metrics.length} data points collected over the
                        last {timeRange} hour{timeRange > 1 ? 's' : ''}
                        in {environment} environment.
                    </p>
                </div>
            </div>
        </div>
    )
}
