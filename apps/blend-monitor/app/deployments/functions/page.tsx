'use client'

import React from 'react'
import Loader from '@/components/shared/Loader'
import EmptyState from '@/components/shared/EmptyState'
import {
    Code,
    CheckCircle,
    AlertCircle,
    Clock,
    Zap,
    TrendingUp,
    FunctionSquare,
} from 'lucide-react'
import {
    Tag as BlendTag,
    TagVariant,
    TagColor,
    TagSize,
    Charts,
    ChartType,
} from 'blend-v1'
import { useFunctionsStatus } from '@/hooks/useFunctionsStatus'

export default function FunctionsPage() {
    const { functions, apiFunctions, backgroundFunctions, loading, error } =
        useFunctionsStatus()

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
            case 'active':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'slow':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />
            default:
                return null
        }
    }

    const getStatusColor = (status: string): TagColor => {
        switch (status) {
            case 'healthy':
            case 'active':
                return TagColor.SUCCESS
            case 'slow':
                return TagColor.WARNING
            case 'error':
                return TagColor.ERROR
            default:
                return TagColor.NEUTRAL
        }
    }

    const formatLastExecution = (timestamp?: number) => {
        if (!timestamp) return 'Never'
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMins / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffMins < 60) return `${diffMins} minutes ago`
        if (diffHours < 24) return `${diffHours} hours ago`
        return `${diffDays} days ago`
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

    if (functions.length === 0) {
        return (
            <div className="h-full overflow-y-auto bg-white">
                <div className="p-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <EmptyState
                            icon={FunctionSquare}
                            title="No Cloud Functions deployed"
                            description="Deploy your first Cloud Function to see its status here. Functions will be monitored for performance, errors, and execution metrics."
                            action={{
                                label: 'Deploy your first function',
                                onClick: () => {
                                    window.open(
                                        'https://firebase.google.com/docs/functions/get-started',
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

    // Prepare chart data if we have functions
    const invocationData =
        functions.length > 0
            ? [
                  {
                      name: 'Function Invocations',
                      data: functions.reduce((acc, func) => {
                          const key = func.name
                              .replace(/^\/api\//, '')
                              .replace(/^on/, '')
                          acc[key] = {
                              primary: {
                                  label: 'calls',
                                  val: func.invocations || 0,
                              },
                          }
                          return acc
                      }, {} as any),
                  },
              ]
            : []

    const healthySummary = {
        healthy: functions.filter(
            (f) => f.status === 'healthy' || f.status === 'active'
        ).length,
        slow: functions.filter((f) => f.status === 'slow').length,
        error: functions.filter((f) => f.status === 'error').length,
        total: functions.length,
    }

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                {/* API Functions */}
                {apiFunctions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-600" />
                            API Functions
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Function
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Version
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Avg Response
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Error Rate
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Invocations
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {apiFunctions.map((func, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm">
                                                    {func.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">
                                                    {func.version || 'latest'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(func.status)}
                                                    <BlendTag
                                                        text={func.status}
                                                        variant={
                                                            TagVariant.SUBTLE
                                                        }
                                                        color={getStatusColor(
                                                            func.status
                                                        )}
                                                        size={TagSize.XS}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        (func.avgResponseTime ||
                                                            0) < 200
                                                            ? 'text-green-600'
                                                            : (func.avgResponseTime ||
                                                                    0) < 500
                                                              ? 'text-yellow-600'
                                                              : 'text-red-600'
                                                    }`}
                                                >
                                                    {func.avgResponseTime || 0}
                                                    ms
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`text-sm ${
                                                        (func.errorRate || 0) <
                                                        0.1
                                                            ? 'text-green-600'
                                                            : (func.errorRate ||
                                                                    0) < 1
                                                              ? 'text-yellow-600'
                                                              : 'text-red-600'
                                                    }`}
                                                >
                                                    {(
                                                        func.errorRate || 0
                                                    ).toFixed(2)}
                                                    %
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(
                                                    func.invocations || 0
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Background Functions */}
                {backgroundFunctions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-600" />
                            Background Functions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {backgroundFunctions.map((func, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-mono text-sm font-medium">
                                            {func.name}
                                        </h3>
                                        {getStatusIcon(func.status)}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">
                                                Version
                                            </span>
                                            <span className="text-xs">
                                                {func.version || 'latest'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">
                                                Invocations
                                            </span>
                                            <span className="text-xs font-medium">
                                                {func.invocations}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <span className="text-xs text-gray-600">
                                                Last run
                                            </span>
                                            <span className="text-xs">
                                                {formatLastExecution(
                                                    typeof func.lastExecution ===
                                                        'string'
                                                        ? new Date(
                                                              func.lastExecution
                                                          ).getTime()
                                                        : func.lastExecution
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Function Invocations Chart and Health Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {invocationData.length > 0 && (
                        <div>
                            <Charts
                                chartType={ChartType.BAR}
                                data={invocationData}
                                chartHeaderSlot={
                                    <div className="mb-4">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Function Invocations
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            Last 24 hours
                                        </p>
                                    </div>
                                }
                            />
                        </div>
                    )}

                    {/* Function Health Summary */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Function Health Summary
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                                <span className="text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Healthy Functions
                                </span>
                                <span className="text-sm font-semibold text-green-600">
                                    {healthySummary.healthy}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                                <span className="text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                                    Slow Functions
                                </span>
                                <span className="text-sm font-semibold text-yellow-600">
                                    {healthySummary.slow}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                                <span className="text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-600" />
                                    Error Functions
                                </span>
                                <span className="text-sm font-semibold text-red-600">
                                    {healthySummary.error}
                                </span>
                            </div>
                            <div className="pt-3 border-t">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Total Functions
                                    </span>
                                    <span className="text-sm font-semibold">
                                        {healthySummary.total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
