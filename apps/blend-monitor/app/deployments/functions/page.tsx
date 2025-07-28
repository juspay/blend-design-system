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

    // Always show empty state until real functions are deployed
    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <EmptyState
                        icon={FunctionSquare}
                        title="Set up Cloud Functions Monitoring"
                        description="Deploy and monitor your Firebase Cloud Functions. Track performance metrics, error rates, invocation counts, and execution times for both API endpoints and background functions."
                        action={{
                            label: 'Get Started with Cloud Functions',
                            onClick: () => {
                                window.open(
                                    'https://firebase.google.com/docs/functions/get-started',
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
                                API Functions
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Monitor HTTP-triggered functions with response
                            times, error rates, and request patterns.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-gray-900">
                                Background Functions
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Track scheduled functions, database triggers, and
                            storage event handlers.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-gray-900">
                                Performance Metrics
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            View execution times, memory usage, and cold start
                            frequencies.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <h3 className="font-semibold text-gray-900">
                                Error Tracking
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Monitor error rates, stack traces, and failure
                            patterns across functions.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <h3 className="font-semibold text-gray-900">
                                Health Status
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Real-time health monitoring with automatic alerts
                            for degraded performance.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Code className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-gray-900">
                                Version Tracking
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Track deployed versions and rollback capabilities
                            for each function.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
