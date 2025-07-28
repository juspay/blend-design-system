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
    Tooltip,
} from 'blend-v1'
import { useEnvironments } from '@/hooks/usePostgreSQLData'
import { useRouter } from 'next/navigation'

export default function HostingStatusPage() {
    // Temporary mock data until environments are properly implemented in PostgreSQL
    const statuses = [
        {
            name: 'production',
            status: 'healthy',
            url: 'https://production.example.com',
            currentVersion: '1.0.0',
            lastDeployment: new Date().toISOString(),
            uptime: 99.9,
        },
        {
            name: 'staging',
            status: 'healthy',
            url: 'https://staging.example.com',
            currentVersion: '1.0.0-beta.1',
            lastDeployment: new Date().toISOString(),
            uptime: 98.5,
        },
        {
            name: 'development',
            status: 'degraded',
            url: 'https://dev.example.com',
            currentVersion: '1.0.0-alpha.1',
            lastDeployment: new Date().toISOString(),
            uptime: 95.0,
        },
    ]
    const loading = false
    const error = null
    const router = useRouter()

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

    const hasEnvironments = statuses.length > 0

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
                        {/* Header with Deploy Button */}
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Hosting Environments
                            </h1>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                subType={ButtonSubType.DEFAULT}
                                text="Deploy New Version"
                                onClick={() =>
                                    router.push('/deployments/deploy')
                                }
                            />
                        </div>

                        {/* Quick Stats using StatCard - Moved to top */}
                        <div className="space-y-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Environment Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard
                                    title="Total Environments"
                                    value={statuses.length}
                                    variant={StatCardVariant.NUMBER}
                                    titleIcon={
                                        <Server className="w-4 h-4 text-gray-600" />
                                    }
                                />
                                <StatCard
                                    title="Healthy"
                                    value={
                                        statuses.filter(
                                            (s) => s.status === 'healthy'
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
                                        statuses.filter(
                                            (s) =>
                                                s.status === 'degraded' ||
                                                s.status === 'down'
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
                                {statuses.map((env) => {
                                    const getEnvironmentIcon = (
                                        name: string
                                    ) => {
                                        if (name === 'production') return '🚀'
                                        if (name === 'staging') return '🧪'
                                        if (name === 'development') return '🛠️'
                                        return '📦'
                                    }

                                    const getEnvironmentBgColor = (
                                        name: string
                                    ) => {
                                        if (name === 'production')
                                            return 'bg-blue-50'
                                        if (name === 'staging')
                                            return 'bg-purple-50'
                                        if (name === 'development')
                                            return 'bg-green-50'
                                        return 'bg-gray-50'
                                    }

                                    return (
                                        <div
                                            key={env.name}
                                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                                        >
                                            {/* Status Bar */}
                                            <div
                                                className={`h-1 ${
                                                    env.status === 'healthy'
                                                        ? 'bg-green-500'
                                                        : env.status ===
                                                            'degraded'
                                                          ? 'bg-yellow-500'
                                                          : 'bg-red-500'
                                                }`}
                                            />

                                            <div className="p-6">
                                                {/* Header */}
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`p-3 ${getEnvironmentBgColor(env.name)} rounded-xl`}
                                                        >
                                                            <span className="text-2xl">
                                                                {getEnvironmentIcon(
                                                                    env.name
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                                                {env.name}
                                                            </h3>
                                                            <p className="text-xs text-gray-500">
                                                                Environment
                                                            </p>
                                                        </div>
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
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 min-w-fit">
                                                                    <Globe className="w-3.5 h-3.5" />
                                                                    URL
                                                                </span>
                                                                <a
                                                                    href={
                                                                        env.url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 truncate max-w-[180px]"
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
                                                        </div>
                                                    )}

                                                    {/* Version */}
                                                    <div className="flex items-start justify-between gap-2 px-1">
                                                        <span className="text-sm font-medium text-gray-600 min-w-fit flex items-center gap-1.5">
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                            Version
                                                        </span>
                                                        {env.currentVersion &&
                                                        env.currentVersion
                                                            .length > 20 ? (
                                                            <Tooltip
                                                                content={
                                                                    env.currentVersion
                                                                }
                                                            >
                                                                <span className="text-sm font-mono text-gray-900 text-right">
                                                                    {env.currentVersion.includes(
                                                                        'release-real'
                                                                    )
                                                                        ? env.currentVersion
                                                                              .split(
                                                                                  '_'
                                                                              )
                                                                              .pop()
                                                                              ?.substring(
                                                                                  0,
                                                                                  8
                                                                              ) +
                                                                          '...'
                                                                        : `${env.currentVersion.substring(0, 20)}...`}
                                                                </span>
                                                            </Tooltip>
                                                        ) : (
                                                            <span className="text-sm font-mono text-gray-900 text-right">
                                                                {env.currentVersion ||
                                                                    'N/A'}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Last Deployment */}
                                                    <div className="flex items-center justify-between px-1">
                                                        <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            Last Deploy
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {formatDate(
                                                                env.lastDeployment
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Uptime */}
                                                    {env.uptime !==
                                                        undefined && (
                                                        <div className="flex items-center justify-between px-1">
                                                            <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                                                                <Activity className="w-3.5 h-3.5" />
                                                                Uptime
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-semibold text-gray-900">
                                                                    {env.uptime}
                                                                    %
                                                                </span>
                                                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full transition-all duration-500 ${
                                                                            env.uptime >=
                                                                            99
                                                                                ? 'bg-green-500'
                                                                                : env.uptime >=
                                                                                    95
                                                                                  ? 'bg-yellow-500'
                                                                                  : 'bg-red-500'
                                                                        }`}
                                                                        style={{
                                                                            width: `${env.uptime}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                        subType={
                                                            ButtonSubType.DEFAULT
                                                        }
                                                        text="View History →"
                                                        onClick={() =>
                                                            (window.location.href =
                                                                '/deployments/history')
                                                        }
                                                    />
                                                    {env.url && (
                                                        <a
                                                            href={env.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                                                        >
                                                            Visit Site
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
