'use client'

import React, { useState, useMemo } from 'react'
import { useComponents } from '@/frontend/hooks/usePostgreSQLData'
import {
    Button,
    ButtonSize,
    ButtonType,
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    DataTable,
    ColumnDefinition,
    ColumnType,
} from 'blend-v1'
import {
    AlertCircle,
    CheckCircle,
    XCircle,
    RefreshCw,
    Eye,
    Clock,
} from 'lucide-react'

interface HealthStatus {
    component: string
    status: 'active' | 'warning' | 'error'
    lastSync: string
    syncRate: number
    errors: string[]
    avgSyncDuration: number
}

export default function IntegrationHealthPage() {
    const { components, loading } = useComponents()
    const [refreshing, setRefreshing] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        null
    )

    // Mock health data - in production, this would come from Firebase
    const healthData = useMemo(() => {
        return components.map((comp) => ({
            component: comp.name,
            status: comp.hasFigmaConnect
                ? Math.random() > 0.8
                    ? ('warning' as const)
                    : ('active' as const)
                : ('error' as const),
            lastSync: comp.hasFigmaConnect
                ? new Date(Date.now() - Math.random() * 86400000).toISOString()
                : 'Never',
            syncRate: comp.hasFigmaConnect
                ? Math.floor(Math.random() * 20 + 80)
                : 0,
            errors:
                comp.hasFigmaConnect && Math.random() > 0.8
                    ? ['Props mismatch detected', 'Variant not found in Figma']
                    : [],
            avgSyncDuration: comp.hasFigmaConnect
                ? Math.floor(Math.random() * 5000 + 1000)
                : 0,
        }))
    }, [components])

    // Calculate metrics
    const metrics = useMemo(() => {
        const active = healthData.filter((h) => h.status === 'active').length
        const warning = healthData.filter((h) => h.status === 'warning').length
        const error = healthData.filter((h) => h.status === 'error').length
        const avgSyncRate =
            healthData
                .filter((h) => h.syncRate > 0)
                .reduce((acc, h) => acc + h.syncRate, 0) /
                (active + warning) || 0

        return { active, warning, error, avgSyncRate }
    }, [healthData])

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            await fetch('/api/components', { method: 'POST' })
        } catch (error) {
            console.error('Error refreshing:', error)
        }
        setRefreshing(false)
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />
            case 'error':
                return <XCircle className="w-5 h-5 text-red-500" />
            default:
                return null
        }
    }

    const columns: ColumnDefinition<HealthStatus>[] = [
        {
            field: 'status' as keyof HealthStatus,
            header: 'Status',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: HealthStatus) => (
                <div className="flex items-center gap-2">
                    {getStatusIcon(row.status)}
                    <Tag
                        text={row.status.toUpperCase()}
                        variant={TagVariant.SUBTLE}
                        color={
                            row.status === 'active'
                                ? TagColor.SUCCESS
                                : row.status === 'warning'
                                  ? TagColor.WARNING
                                  : TagColor.ERROR
                        }
                        size={TagSize.XS}
                    />
                </div>
            ),
        },
        {
            field: 'component' as keyof HealthStatus,
            header: 'Component',
            type: ColumnType.TEXT,
            renderCell: (value: unknown, row: HealthStatus) => (
                <span className="font-medium">{row.component}</span>
            ),
        },
        {
            field: 'lastSync' as keyof HealthStatus,
            header: 'Last Sync',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: HealthStatus) => (
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                        {row.lastSync === 'Never'
                            ? 'Never'
                            : new Date(row.lastSync).toLocaleString()}
                    </span>
                </div>
            ),
        },
        {
            field: 'syncRate' as keyof HealthStatus,
            header: 'Success Rate',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: HealthStatus) => (
                <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${
                                row.syncRate >= 90
                                    ? 'bg-green-500'
                                    : row.syncRate >= 70
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                            }`}
                            style={{ width: `${row.syncRate}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium">{row.syncRate}%</span>
                </div>
            ),
        },
        {
            field: 'errors' as keyof HealthStatus,
            header: 'Issues',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: HealthStatus) =>
                row.errors.length > 0 ? (
                    <Tag
                        text={`${row.errors.length} issues`}
                        variant={TagVariant.SUBTLE}
                        color={TagColor.ERROR}
                        size={TagSize.XS}
                    />
                ) : (
                    <span className="text-sm text-gray-500">No issues</span>
                ),
        },
        {
            field: 'component' as keyof HealthStatus,
            header: 'Actions',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: HealthStatus) => (
                <div className="flex items-center gap-2">
                    <Button
                        text="View"
                        leadingIcon={<Eye className="w-4 h-4" />}
                        size={ButtonSize.SMALL}
                        onClick={() => setSelectedComponent(row.component)}
                    />
                    <Button
                        text="Re-sync"
                        leadingIcon={<RefreshCw className="w-4 h-4" />}
                        size={ButtonSize.SMALL}
                        buttonType={ButtonType.SECONDARY}
                    />
                </div>
            ),
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading health data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Integration Health Monitor
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Track the health and validity of Code Connect
                        integrations
                    </p>
                </div>
                <Button
                    text="Refresh All"
                    leadingIcon={
                        <RefreshCw
                            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                        />
                    }
                    onClick={handleRefresh}
                    disabled={refreshing}
                />
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Active
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                                {metrics.active}
                            </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Warnings
                            </p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {metrics.warning}
                            </p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Errors
                            </p>
                            <p className="text-2xl font-bold text-red-600">
                                {metrics.error}
                            </p>
                        </div>
                        <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Avg Success Rate
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                                {metrics.avgSyncRate.toFixed(1)}%
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold">%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Conditions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                        <h3 className="font-medium text-yellow-900">
                            Active Alerts
                        </h3>
                        <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                            {healthData
                                .filter(
                                    (h) =>
                                        h.status === 'warning' ||
                                        h.status === 'error'
                                )
                                .map((h, idx) => (
                                    <li key={idx}>
                                        • {h.component}:{' '}
                                        {h.errors.join(', ') ||
                                            'Integration failing'}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Health Status Grid */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">
                        Component Health Status
                    </h3>
                </div>
                <DataTable
                    data={healthData as Record<string, unknown>[]}
                    columns={
                        columns as ColumnDefinition<Record<string, unknown>>[]
                    }
                    idField="component"
                    onRowClick={(row) =>
                        setSelectedComponent(
                            (row as unknown as HealthStatus).component
                        )
                    }
                />
            </div>

            {/* Component Details Modal (placeholder) */}
            {selectedComponent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedComponent} Details
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Component integration details would appear here...
                        </p>
                        <Button
                            text="Close"
                            onClick={() => setSelectedComponent(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
