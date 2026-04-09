import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import { useBranches } from '@/frontend/hooks/use-studio'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { GitBranch, Plus, Eye, Clock } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/studio/')({
    component: StudioPage,
})

function StudioPage() {
    const { user, loading: authLoading } = useAuth()
    const [searchQuery, setSearchQuery] = useState('')
    const { branches, loading, error } = useBranches({
        filters: searchQuery ? { search: searchQuery } : undefined,
    })

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
                Loading…
            </div>
        )
    }

    return (
        <RequireAuth>
            <div className="min-h-screen bg-gray-50">
                <div className="p-6 border-b border-gray-200 bg-white">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Token Studio
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Create and manage design token branches for your brand
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search branches..."
                            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <Link
                            to="/studio/test"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Open Test Page
                        </Link>
                    </div>
                    {!user && (
                        <p className="mt-3 text-sm text-amber-700">
                            Sign in to load branches from the API. Showing empty
                            list until authenticated.
                        </p>
                    )}
                    {error && (
                        <p className="mt-3 text-sm text-red-600">
                            {error}
                            {' — '}
                            Ensure <code className="text-xs">
                                pnpm dev:api
                            </code>{' '}
                            is running and your user row exists in PostgreSQL
                            with a role.
                        </p>
                    )}
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Branches
                        </h2>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            disabled={!user || loading}
                        >
                            <Plus className="w-4 h-4" />
                            New Branch
                        </button>
                    </div>

                    <div className="space-y-3">
                        {loading && user && (
                            <p className="text-sm text-gray-500">
                                Loading branches…
                            </p>
                        )}
                        {branches.map((branch) => (
                            <Link
                                key={branch.id}
                                to="/studio/editor/$branchId"
                                params={{ branchId: branch.id }}
                                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <GitBranch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span className="font-mono text-sm text-gray-500">
                                                {branch.id}
                                            </span>
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                    branch.status ===
                                                    'published'
                                                        ? 'bg-green-100 text-green-800'
                                                        : branch.status ===
                                                            'draft'
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-gray-100 text-gray-800'
                                                }`}
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

                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {branch.updatedAt instanceof
                                                Date
                                                    ? branch.updatedAt.toLocaleDateString()
                                                    : String(branch.updatedAt)}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        to="/studio/preview/$branchId"
                                        params={{ branchId: branch.id }}
                                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </RequireAuth>
    )
}
