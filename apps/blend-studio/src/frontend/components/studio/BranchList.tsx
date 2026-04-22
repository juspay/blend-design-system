import React from 'react'
import { Link } from '@tanstack/react-router'
import { GitBranch, Plus, Eye, Clock, Tag } from '@phosphor-icons/react'
import type { Branch } from '@juspay/blend-design-system/tokens'

interface BranchListProps {
    branches: Branch[]
    loading: boolean
    onCreateClick: () => void
}

export function BranchList({
    branches,
    loading,
    onCreateClick,
}: BranchListProps) {
    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-lg" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Branches
                </h2>
                <button
                    onClick={onCreateClick}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Branch
                </button>
            </div>

            {branches.length === 0 ? (
                <div className="text-center py-12">
                    <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No branches yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Create your first branch to start customizing design
                        tokens
                    </p>
                    <button
                        onClick={onCreateClick}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Branch
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {branches.map((branch) => (
                        <BranchCard key={branch.id} branch={branch} />
                    ))}
                </div>
            )}
        </div>
    )
}

function BranchCard({ branch }: { branch: Branch }) {
    const statusColors: Record<string, string> = {
        draft: 'bg-yellow-100 text-yellow-800',
        published: 'bg-green-100 text-green-800',
        archived: 'bg-gray-100 text-gray-600',
    }

    return (
        <Link
            to="/studio/editor/$branchId"
            params={{ branchId: branch.brandId }}
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <GitBranch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-mono text-sm text-gray-500">
                            {branch.brandId}
                        </span>
                        <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[branch.status]}`}
                        >
                            {branch.status}
                        </span>
                        {branch.latestVersion && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                v{branch.latestVersion}
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {branch.name}
                    </h3>

                    {branch.description && (
                        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                            {branch.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(branch.updatedAt)}
                        </span>

                        {branch.tags.length > 0 && (
                            <span className="inline-flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {branch.tags.slice(0, 3).join(', ')}
                            </span>
                        )}

                        {branch.publishedCount > 0 && (
                            <span>
                                {branch.publishedCount} version
                                {branch.publishedCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                    <Link
                        to="/studio/preview/$branchId"
                        params={{ branchId: branch.brandId }}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        title="Preview"
                    >
                        <Eye className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </Link>
    )
}

function formatRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return d.toLocaleDateString()
}
