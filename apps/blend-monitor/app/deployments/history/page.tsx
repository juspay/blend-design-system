'use client'

import React, { useState } from 'react'
import Loader from '@/components/shared/Loader'
import EmptyState from '@/components/shared/EmptyState'
import {
    History,
    CheckCircle,
    XCircle,
    Clock,
    RotateCcw,
    GitBranch,
    Database,
    Globe,
} from 'lucide-react'
import {
    Tag as BlendTag,
    TagVariant,
    TagColor,
    TagSize,
    DataTable,
    SingleSelect,
} from 'blend-v1'
import { useDeploymentHistory } from '@/hooks/useDeploymentHistory'

export default function DeploymentHistoryPage() {
    const [selectedEnvironment, setSelectedEnvironment] = useState<string>('')
    const [selectedSource, setSelectedSource] = useState<string>('all')
    const { deployments, loading, error, rollbackDeployment } =
        useDeploymentHistory(
            50,
            selectedEnvironment || undefined,
            selectedSource
        )
    const [rollbackLoading, setRollbackLoading] = useState<string | null>(null)

    // SingleSelect items
    const environmentOptions = [
        {
            groupLabel: 'Environments',
            items: [
                { label: 'All Environments', value: '' },
                { label: 'Production', value: 'production' },
                { label: 'Staging', value: 'staging' },
                { label: 'Development', value: 'development' },
            ],
        },
    ]

    const sourceOptions = [
        {
            groupLabel: 'Deployment Sources',
            items: [
                { label: 'All Sources', value: 'all' },
                { label: 'Realtime Database', value: 'database' },
                { label: 'Firebase Hosting', value: 'hosting' },
            ],
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-600" />
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-600" />
            case 'in_progress':
                return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
            default:
                return null
        }
    }

    const getStatusColor = (status: string): TagColor => {
        switch (status) {
            case 'success':
                return TagColor.SUCCESS
            case 'failed':
                return TagColor.ERROR
            case 'in_progress':
                return TagColor.PRIMARY
            default:
                return TagColor.NEUTRAL
        }
    }

    // DataTable columns
    const columns = [
        {
            field: 'status',
            header: 'Status',
            renderCell: (value: any, deployment: any) => (
                <div className="flex items-center gap-2">
                    {getStatusIcon(deployment.status)}
                    <BlendTag
                        text={deployment.status}
                        variant={TagVariant.SUBTLE}
                        color={getStatusColor(deployment.status)}
                        size={TagSize.XS}
                    />
                </div>
            ),
        },
        {
            field: 'source',
            header: 'Type',
            renderCell: (value: any, deployment: any) => (
                <div className="flex items-center gap-2">
                    {deployment.source === 'hosting' ? (
                        <>
                            <Globe className="w-4 h-4 text-purple-600" />
                            <BlendTag
                                text="Hosting"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.NEUTRAL}
                                size={TagSize.XS}
                            />
                        </>
                    ) : (
                        <>
                            <Database className="w-4 h-4 text-orange-600" />
                            <BlendTag
                                text="Database"
                                variant={TagVariant.SUBTLE}
                                color={TagColor.NEUTRAL}
                                size={TagSize.XS}
                            />
                        </>
                    )}
                </div>
            ),
        },
        {
            field: 'service',
            header: 'Service',
            renderCell: (value: any, deployment: any) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">
                        {deployment.service || 'Realtime Database'}
                    </span>
                    {deployment.siteUrl && (
                        <a
                            href={deployment.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800"
                        >
                            View Site →
                        </a>
                    )}
                </div>
            ),
        },
        {
            field: 'environment',
            header: 'Environment',
            renderCell: (value: any, deployment: any) => (
                <span className="text-sm font-medium capitalize">
                    {deployment.environment}
                </span>
            ),
        },
        {
            field: 'version',
            header: 'Version',
            renderCell: (value: any, deployment: any) => (
                <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-gray-400" />
                    <span className="text-sm font-mono">
                        {deployment.version}
                    </span>
                </div>
            ),
        },
        {
            field: 'deployer',
            header: 'Deployer',
            renderCell: (value: any, deployment: any) => (
                <div>
                    <p className="text-sm font-medium">
                        {deployment.deployer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {deployment.deployer.email}
                    </p>
                </div>
            ),
        },
        {
            field: 'startTime',
            header: 'Time',
            renderCell: (value: any, deployment: any) => (
                <span className="text-sm text-gray-600">
                    {formatDate(deployment.startTime)}
                </span>
            ),
        },
        {
            field: 'duration',
            header: 'Duration',
            renderCell: (value: any, deployment: any) => (
                <span className="text-sm text-gray-600">
                    {formatDuration(deployment.duration)}
                </span>
            ),
        },
        {
            field: 'id',
            header: 'Actions',
            renderCell: (value: any, deployment: any) => (
                <>
                    {deployment.rollbackAvailable &&
                        deployment.status === 'success' && (
                            <button
                                onClick={() =>
                                    handleRollback(
                                        deployment.id!,
                                        deployment.version
                                    )
                                }
                                disabled={rollbackLoading === deployment.id}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RotateCcw className="w-3 h-3" />
                                {rollbackLoading === deployment.id
                                    ? 'Rolling back...'
                                    : 'Rollback'}
                            </button>
                        )}
                </>
            ),
        },
    ] as any

    const formatDuration = (duration?: number) => {
        if (!duration) return 'N/A'
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}m ${seconds}s`
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const handleRollback = async (deploymentId: string, version: string) => {
        if (
            confirm(`Are you sure you want to rollback to version ${version}?`)
        ) {
            setRollbackLoading(deploymentId)
            try {
                await rollbackDeployment(deploymentId, version)
                // Show success message (you could use a toast here)
                alert('Rollback initiated successfully')
            } catch (error) {
                alert('Failed to rollback deployment')
            } finally {
                setRollbackLoading(null)
            }
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

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                {deployments.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <EmptyState
                            icon={History}
                            title="No deployments yet"
                            description="Your deployment history will appear here once you start deploying your applications. Each deployment will be tracked with detailed information."
                            action={{
                                label: 'Learn about deployments',
                                onClick: () => {
                                    window.open(
                                        'https://firebase.google.com/docs/hosting/manage-hosting-resources',
                                        '_blank'
                                    )
                                },
                            }}
                        />
                    </div>
                ) : (
                    <DataTable
                        data={deployments as any}
                        columns={columns}
                        idField="id"
                        title="Deployment History"
                        description="View and manage your deployment history"
                        enableSearch={true}
                        searchPlaceholder="Search deployments..."
                        showToolbar={true}
                        headerSlot2={
                            <div className="flex gap-4 ml-auto">
                                <div className="w-48">
                                    <SingleSelect
                                        selected={selectedSource}
                                        onSelect={setSelectedSource}
                                        items={sourceOptions}
                                        label=""
                                        placeholder="All Sources"
                                    />
                                </div>
                                <div className="w-48">
                                    <SingleSelect
                                        selected={selectedEnvironment}
                                        onSelect={setSelectedEnvironment}
                                        items={environmentOptions}
                                        label=""
                                        placeholder="All Environments"
                                    />
                                </div>
                            </div>
                        }
                        pagination={{
                            currentPage: 1,
                            pageSize: 10,
                            totalRows: deployments.length,
                            pageSizeOptions: [10, 20, 50],
                        }}
                    />
                )}
            </div>
        </div>
    )
}
