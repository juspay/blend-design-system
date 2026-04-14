/**
 * HistoryPanel
 *
 * Shows published versions and draft snapshots for a branch.
 * Allows restoring any previous version or snapshot.
 */

import { useState } from 'react'
import { Package, Clock, RefreshCw } from 'lucide-react'
import type { BrandConfig, Version, Snapshot } from '@blend-design/token-engine'
import type { HistoryPanelProps } from './types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type HistoryTab = 'versions' | 'snapshots'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HistoryPanel({
    versions,
    snapshots,
    onRestore,
}: HistoryPanelProps) {
    const [activeTab, setActiveTab] = useState<HistoryTab>('versions')

    return (
        <div className="flex flex-col h-full">
            {/* Tab Switcher */}
            <div className="flex border-b border-gray-200 shrink-0">
                <TabButton
                    label={`Published (${versions.length})`}
                    isActive={activeTab === 'versions'}
                    onClick={() => setActiveTab('versions')}
                />
                <TabButton
                    label={`Snapshots (${snapshots.length})`}
                    isActive={activeTab === 'snapshots'}
                    onClick={() => setActiveTab('snapshots')}
                />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === 'versions' && (
                    <VersionsList versions={versions} onRestore={onRestore} />
                )}
                {activeTab === 'snapshots' && (
                    <SnapshotsList
                        snapshots={snapshots}
                        onRestore={onRestore}
                    />
                )}
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Tab Button
// ---------------------------------------------------------------------------

function TabButton({
    label,
    isActive,
    onClick,
}: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
            }`}
        >
            {label}
        </button>
    )
}

// ---------------------------------------------------------------------------
// Versions List
// ---------------------------------------------------------------------------

function VersionsList({
    versions,
    onRestore,
}: {
    versions: Version[]
    onRestore: (config: BrandConfig) => void
}) {
    if (versions.length === 0) {
        return <EmptyState icon={Package} message="No published versions yet" />
    }

    return (
        <>
            {versions.map((v) => (
                <div
                    key={v.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono font-semibold text-gray-900">
                                v{v.version}
                            </span>
                            {v.isBreaking && (
                                <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-600 rounded">
                                    breaking
                                </span>
                            )}
                            {v.isPrerelease && (
                                <span className="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-600 rounded">
                                    pre
                                </span>
                            )}
                        </div>
                        {v.changelog && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                {v.changelog}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            {new Date(v.publishedAt).toLocaleDateString()} ·{' '}
                            {v.publishedByName}
                        </p>
                    </div>
                    <RestoreButton onClick={() => onRestore(v.brandConfig)} />
                </div>
            ))}
        </>
    )
}

// ---------------------------------------------------------------------------
// Snapshots List
// ---------------------------------------------------------------------------

function SnapshotsList({
    snapshots,
    onRestore,
}: {
    snapshots: Snapshot[]
    onRestore: (config: BrandConfig) => void
}) {
    if (snapshots.length === 0) {
        return (
            <EmptyState
                icon={Clock}
                message="No snapshots yet"
                submessage="Snapshots are created on save"
            />
        )
    }

    return (
        <>
            {snapshots.map((s) => (
                <div
                    key={s.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">
                                {s.label || 'Snapshot'}
                            </span>
                            {s.isAutoSave && (
                                <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                                    auto
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(s.savedAt).toLocaleString()}
                        </p>
                    </div>
                    <RestoreButton onClick={() => onRestore(s.brandConfig)} />
                </div>
            ))}
        </>
    )
}

// ---------------------------------------------------------------------------
// Shared Sub-components
// ---------------------------------------------------------------------------

function RestoreButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Restore this version"
        >
            <RefreshCw className="w-4 h-4" />
        </button>
    )
}

function EmptyState({
    icon: Icon,
    message,
    submessage,
}: {
    icon: React.ComponentType<{ className?: string }>
    message: string
    submessage?: string
}) {
    return (
        <div className="text-center py-12 text-gray-400">
            <Icon className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{message}</p>
            {submessage && <p className="text-xs mt-1">{submessage}</p>}
        </div>
    )
}
