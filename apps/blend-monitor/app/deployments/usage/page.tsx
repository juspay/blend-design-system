'use client'

import React from 'react'
import Loader from '@/components/shared/Loader'
import EmptyState from '@/components/shared/EmptyState'
import {
    DollarSign,
    TrendingUp,
    Database,
    Wifi,
    Server,
    AlertCircle,
    BarChart3,
    Calendar,
} from 'lucide-react'
import {
    Charts,
    ChartType,
    StatCard,
    StatCardVariant,
    ChangeType,
    Tag as BlendTag,
    TagVariant,
    TagColor,
    TagSize,
} from 'blend-v1'
import { useFirebaseUsage, useUsageAlerts } from '@/hooks/useFirebaseUsage'

export default function UsagePage() {
    const { usage, loading, error } = useFirebaseUsage()
    const { alerts } = useUsageAlerts()

    const getUsagePercentage = (used: number, limit: number): number => {
        return Math.round((used / limit) * 100)
    }

    const getProgressBarGradient = (percentage: number): string => {
        if (percentage <= 25) {
            return 'from-emerald-300 to-emerald-400'
        } else if (percentage <= 50) {
            return 'from-emerald-400 to-amber-300'
        } else if (percentage <= 75) {
            return 'from-amber-300 to-orange-400'
        } else if (percentage <= 90) {
            return 'from-orange-400 to-rose-400'
        } else {
            return 'from-rose-400 to-rose-500'
        }
    }

    const getUsageTextColor = (percentage: number): string => {
        if (percentage < 50) return 'text-green-600'
        if (percentage < 80) return 'text-yellow-600'
        return 'text-red-600'
    }

    const UsageBar = ({
        label,
        used,
        limit,
        unit,
    }: {
        label: string
        used: number
        limit: number
        unit: string
    }) => {
        const percentage = getUsagePercentage(used, limit)

        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">
                        {label}
                    </span>
                    <span
                        className={`text-lg font-bold ${getUsageTextColor(percentage)}`}
                    >
                        {percentage}%
                    </span>
                </div>
                <div className="relative">
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                            className={`h-2 rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${getProgressBarGradient(percentage)}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        {used}
                        {unit} used
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                        {limit}
                        {unit} limit
                    </span>
                </div>
            </div>
        )
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

    if (!usage) {
        return (
            <div className="h-full overflow-y-auto bg-white">
                <div className="p-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <EmptyState
                            icon={BarChart3}
                            title="No usage data available"
                            description="Usage data will appear here once your Firebase services start generating metrics. This includes hosting bandwidth, database operations, and function invocations."
                            action={{
                                label: 'Learn about Firebase pricing',
                                onClick: () => {
                                    window.open(
                                        'https://firebase.google.com/pricing',
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

    // Calculate billing period end date
    const billingEndDate = usage.billing.billingPeriodEnd
        ? new Date(usage.billing.billingPeriodEnd).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
          })
        : 'N/A'

    const daysRemaining = usage.billing.billingPeriodEnd
        ? Math.ceil(
              (new Date(usage.billing.billingPeriodEnd).getTime() -
                  Date.now()) /
                  (1000 * 60 * 60 * 24)
          )
        : 0

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                {/* Cost Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Current Cost"
                        value={`$${usage.billing.currentCost.toFixed(2)}`}
                        subtitle="This billing period"
                        titleIcon={
                            <DollarSign className="w-5 h-5 text-green-600" />
                        }
                        variant={StatCardVariant.NUMBER}
                    />
                    <StatCard
                        title="Projected Cost"
                        value={`$${usage.billing.projectedCost.toFixed(2)}`}
                        subtitle="End of period estimate"
                        titleIcon={
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        }
                        variant={StatCardVariant.NUMBER}
                        change={
                            usage.billing.projectedCost >
                            usage.billing.currentCost
                                ? {
                                      value:
                                          ((usage.billing.projectedCost -
                                              usage.billing.currentCost) /
                                              usage.billing.currentCost) *
                                          100,
                                      type: ChangeType.INCREASE,
                                  }
                                : undefined
                        }
                    />
                    <StatCard
                        title="Budget"
                        value={`$${usage.billing.budget}`}
                        subtitle={`${Math.round((usage.billing.currentCost / usage.billing.budget) * 100)}% used`}
                        titleIcon={
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        }
                        variant={StatCardVariant.NUMBER}
                    />
                    <StatCard
                        title="Billing Period"
                        value={billingEndDate}
                        subtitle={`${daysRemaining} days remaining`}
                        titleIcon={
                            <Calendar className="w-5 h-5 text-purple-600" />
                        }
                        variant={StatCardVariant.NUMBER}
                    />
                </div>

                {/* Usage by Service */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Hosting Usage */}
                    <div className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-xl p-7 shadow-sm">
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl shadow-sm">
                                    <Server className="w-6 h-6 text-blue-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Hosting
                                </h3>
                            </div>
                            <BlendTag
                                text="Active"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        </div>
                        <div className="space-y-6">
                            <UsageBar
                                label="Bandwidth"
                                used={usage.hosting.bandwidth.used}
                                limit={usage.hosting.bandwidth.limit}
                                unit={usage.hosting.bandwidth.unit}
                            />
                            <UsageBar
                                label="Storage"
                                used={usage.hosting.storage.used}
                                limit={usage.hosting.storage.limit}
                                unit={usage.hosting.storage.unit}
                            />
                            <UsageBar
                                label="Requests"
                                used={usage.hosting.requests.used}
                                limit={usage.hosting.requests.limit}
                                unit={usage.hosting.requests.unit}
                            />
                        </div>
                    </div>

                    {/* Firestore Usage */}
                    <div className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 rounded-xl p-7 shadow-sm">
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl shadow-sm">
                                    <Database className="w-6 h-6 text-purple-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Firestore
                                </h3>
                            </div>
                            <BlendTag
                                text="Active"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        </div>
                        <div className="space-y-6">
                            <UsageBar
                                label="Reads"
                                used={usage.firestore.reads.used}
                                limit={usage.firestore.reads.limit}
                                unit={usage.firestore.reads.unit}
                            />
                            <UsageBar
                                label="Writes"
                                used={usage.firestore.writes.used}
                                limit={usage.firestore.writes.limit}
                                unit={usage.firestore.writes.unit}
                            />
                            <UsageBar
                                label="Storage"
                                used={usage.firestore.storage.used}
                                limit={usage.firestore.storage.limit}
                                unit={usage.firestore.storage.unit}
                            />
                        </div>
                    </div>

                    {/* Functions Usage */}
                    <div className="bg-gradient-to-br from-white to-green-50/30 border border-green-100 rounded-xl p-7 shadow-sm">
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl shadow-sm">
                                    <Wifi className="w-6 h-6 text-green-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Functions
                                </h3>
                            </div>
                            <BlendTag
                                text="Active"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.SUCCESS}
                                size={TagSize.SM}
                            />
                        </div>
                        <div className="space-y-6">
                            <UsageBar
                                label="Invocations"
                                used={usage.functions.invocations.used}
                                limit={usage.functions.invocations.limit}
                                unit={usage.functions.invocations.unit}
                            />
                            <UsageBar
                                label="GB-seconds"
                                used={usage.functions.gbSeconds.used}
                                limit={usage.functions.gbSeconds.limit}
                                unit={usage.functions.gbSeconds.unit}
                            />
                            <UsageBar
                                label="Outbound Data"
                                used={usage.functions.outboundData.used}
                                limit={usage.functions.outboundData.limit}
                                unit={usage.functions.outboundData.unit}
                            />
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {alerts.length > 0 && (
                    <div className="space-y-3">
                        {alerts.map((alert, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg border ${
                                    alert.type === 'critical'
                                        ? 'bg-red-50 border-red-200'
                                        : 'bg-yellow-50 border-yellow-200'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <AlertCircle
                                        className={`w-5 h-5 mt-0.5 ${
                                            alert.type === 'critical'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                        }`}
                                    />
                                    <div>
                                        <h4
                                            className={`text-sm font-medium ${
                                                alert.type === 'critical'
                                                    ? 'text-red-800'
                                                    : 'text-yellow-800'
                                            }`}
                                        >
                                            {alert.service
                                                .charAt(0)
                                                .toUpperCase() +
                                                alert.service.slice(1)}{' '}
                                            Alert
                                        </h4>
                                        <p
                                            className={`text-sm mt-1 ${
                                                alert.type === 'critical'
                                                    ? 'text-red-700'
                                                    : 'text-yellow-700'
                                            }`}
                                        >
                                            {alert.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
