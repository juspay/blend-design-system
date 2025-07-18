'use client'

import React from 'react'
import Loader from '@/components/shared/Loader'
import EmptyState from '@/components/shared/EmptyState'
import {
    Server,
    Globe,
    Clock,
    TrendingUp,
    Rocket,
    Activity,
    CheckCircle,
    AlertCircle,
    ExternalLink,
    ArrowRight,
} from 'lucide-react'
import {
    Tag as BlendTag,
    TagVariant,
    TagColor,
    TagSize,
    StatCard,
    StatCardVariant,
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from 'blend-v1'
import { useAllEnvironmentStatuses } from '@/hooks/useDeploymentStatus'

export default function HostingStatusPage() {
    const { statuses, loading, error } = useAllEnvironmentStatuses()

    const getStatusColor = (status: string): TagColor => {
        switch (status) {
            case 'healthy':
                return TagColor.SUCCESS
            case 'degraded':
                return TagColor.WARNING
            case 'down':
                return TagColor.ERROR
            default:
                return TagColor.NEUTRAL
        }
    }

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'healthy':
                return 'Healthy'
            case 'degraded':
                return 'Degraded'
            case 'down':
                return 'Down'
            default:
                return 'Unknown'
        }
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Never'
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMins / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffMins < 60) return `${diffMins} mins ago`
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

    const hasEnvironments =
        Object.keys(statuses).length > 0 &&
        Object.values(statuses).some((status) => status !== null)

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                {!hasEnvironments ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <EmptyState
                            icon={Rocket}
                            title="No environments configured"
                            description="Deploy your first application to see environment status here. Once you deploy, you'll be able to monitor all your hosting environments in real-time."
                            action={{
                                label: 'Deploy your first app',
                                onClick: () => {
                                    window.open(
                                        'https://firebase.google.com/docs/hosting/quickstart',
                                        '_blank'
                                    )
                                },
                            }}
                        />
                    </div>
                ) : (
                    <>
                        {/* Quick Stats using StatCard - Moved to top */}
                        <div className="space-y-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Environment Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard
                                    title="Total Environments"
                                    value={
                                        Object.keys(statuses).filter(
                                            (key) => statuses[key] !== null
                                        ).length
                                    }
                                    variant={StatCardVariant.NUMBER}
                                    titleIcon={
                                        <Server className="w-4 h-4 text-gray-600" />
                                    }
                                />
                                <StatCard
                                    title="Healthy"
                                    value={
                                        Object.values(statuses).filter(
                                            (s) => s?.status === 'healthy'
                                        ).length
                                    }
                                    variant={StatCardVariant.NUMBER}
                                    titleIcon={
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    }
                                />
                                <StatCard
                                    title="Issues"
                                    value={
                                        Object.values(statuses).filter(
                                            (s) =>
                                                s?.status === 'degraded' ||
                                                s?.status === 'down'
                                        ).length
                                    }
                                    variant={StatCardVariant.NUMBER}
                                    titleIcon={
                                        <AlertCircle className="w-4 h-4 text-orange-600" />
                                    }
                                />
                            </div>
                        </div>

                        {/* Environment Cards - Now at bottom with full width */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Hosting Environments
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {Object.entries(statuses).map(
                                    ([envName, env]) => {
                                        if (!env) return null

                                        return (
                                            <div
                                                key={envName}
                                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                                            >
                                                <div className="p-6">
                                                    {/* Header */}
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                                <Server className="w-5 h-5 text-gray-700" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                                                {envName}
                                                            </h3>
                                                        </div>
                                                        <BlendTag
                                                            text={getStatusText(
                                                                env.status
                                                            )}
                                                            variant={
                                                                TagVariant.SUBTLE
                                                            }
                                                            color={getStatusColor(
                                                                env.status
                                                            )}
                                                            size={TagSize.SM}
                                                        />
                                                    </div>

                                                    {/* Environment Details */}
                                                    <div className="space-y-4">
                                                        {/* URL */}
                                                        {env.url && (
                                                            <div className="flex items-start justify-between gap-2">
                                                                <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5 min-w-fit">
                                                                    <Globe className="w-4 h-4" />
                                                                    URL
                                                                </span>
                                                                <a
                                                                    href={
                                                                        env.url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 truncate"
                                                                    title={
                                                                        env.url
                                                                    }
                                                                >
                                                                    <span className="truncate">
                                                                        {env.url.replace(
                                                                            'https://',
                                                                            ''
                                                                        )}
                                                                    </span>
                                                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                                </a>
                                                            </div>
                                                        )}

                                                        {/* Version */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-gray-500">
                                                                Version
                                                            </span>
                                                            <span className="text-sm font-semibold text-gray-900">
                                                                {env.currentVersion ||
                                                                    'N/A'}
                                                            </span>
                                                        </div>

                                                        {/* Last Deployment */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                                                                <Clock className="w-4 h-4" />
                                                                Last Deploy
                                                            </span>
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {formatDate(
                                                                    env.lastDeployment
                                                                )}
                                                            </span>
                                                        </div>

                                                        {/* Uptime */}
                                                        {env.uptime && (
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                                                                    <Activity className="w-4 h-4" />
                                                                    Uptime
                                                                </span>
                                                                <span className="text-sm font-semibold text-gray-900">
                                                                    {env.uptime}
                                                                    %
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                                        <Button
                                                            buttonType={
                                                                ButtonType.SECONDARY
                                                            }
                                                            size={
                                                                ButtonSize.SMALL
                                                            }
                                                            subType={
                                                                ButtonSubType.DEFAULT
                                                            }
                                                            text="View History →"
                                                            onClick={() =>
                                                                (window.location.href =
                                                                    '/deployments/history')
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
