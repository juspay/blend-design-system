/**
 * DevToolbar — visible only in mock/demo mode.
 *
 * Lets you switch between user roles (owner/admin/editor/viewer) to test
 * RBAC flows without a running backend.
 *
 * Also shows the current data source and feature flag state.
 */

import { useState, useEffect } from 'react'
import { featureFlags } from '@/lib/feature-flags'
import { mockUserStore, type MockRole } from '@/lib/mock-user'

const ROLES: { value: MockRole; label: string; color: string }[] = [
    { value: 'owner', label: 'Owner', color: 'bg-purple-500' },
    { value: 'admin', label: 'Admin', color: 'bg-blue-500' },
    { value: 'editor', label: 'Editor', color: 'bg-green-500' },
    { value: 'viewer', label: 'Viewer', color: 'bg-gray-500' },
]

const ROLE_DESCRIPTIONS: Record<MockRole, string> = {
    owner: 'Full access: manage team, delete org, lock tokens, approve merges',
    admin: 'Manage members, lock tokens, approve merges, manage settings',
    editor: 'Create branches, edit tokens, publish, create merge requests',
    viewer: 'Read-only: view branches and tokens, no edits allowed',
}

export function DevToolbar() {
    const flags = featureFlags.get()
    const [currentRole, setCurrentRole] = useState<MockRole>(
        mockUserStore.getRole()
    )
    const [isOpen, setIsOpen] = useState(false)

    // Only show in mock mode
    if (!flags.useMockData) return null

    useEffect(() => {
        const handler = (e: Event) => {
            setCurrentRole((e as CustomEvent).detail as MockRole)
        }
        window.addEventListener('mockRoleChanged', handler)
        return () => window.removeEventListener('mockRoleChanged', handler)
    }, [])

    const handleRoleChange = (role: MockRole) => {
        mockUserStore.setRole(role)
        setCurrentRole(role)
    }

    const currentRoleConfig = ROLES.find((r) => r.value === currentRole)!
    const user = mockUserStore.getUser()

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            {/* Collapsed badge */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`flex items-center gap-2 px-3 py-2 ${currentRoleConfig.color} text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all`}
                    title="Click to change role"
                >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    DEMO: {currentRoleConfig.label}
                </button>
            )}

            {/* Expanded panel */}
            {isOpen && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-80 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
                        <div>
                            <p className="text-xs font-bold tracking-wider">
                                DEV TOOLBAR
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                                Mock mode — no backend needed
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white text-sm"
                        >
                            x
                        </button>
                    </div>

                    {/* Current user */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                            Current User
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {user.displayName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {/* Role switcher */}
                    <div className="px-4 py-3">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                            Switch Role
                        </p>
                        <div className="space-y-1.5">
                            {ROLES.map(({ value, label, color }) => (
                                <button
                                    key={value}
                                    onClick={() => handleRoleChange(value)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                                        currentRole === value
                                            ? 'bg-blue-50 border border-blue-200'
                                            : 'hover:bg-gray-50 border border-transparent'
                                    }`}
                                >
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full ${color}`}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <span
                                            className={`text-sm font-medium ${
                                                currentRole === value
                                                    ? 'text-blue-700'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            {label}
                                        </span>
                                        <p className="text-[10px] text-gray-400 truncate">
                                            {ROLE_DESCRIPTIONS[value]}
                                        </p>
                                    </div>
                                    {currentRole === value && (
                                        <span className="text-blue-500 text-xs font-bold">
                                            Active
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Permissions for current role */}
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">
                            Permissions
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {currentRole === 'owner' ||
                            currentRole === 'admin' ? (
                                <>
                                    <Tag text="Lock tokens" ok />
                                    <Tag text="Approve merges" ok />
                                    <Tag
                                        text="Manage org"
                                        ok={currentRole === 'owner'}
                                    />
                                </>
                            ) : null}
                            <Tag
                                text="Create branches"
                                ok={currentRole !== 'viewer'}
                            />
                            <Tag
                                text="Edit tokens"
                                ok={currentRole !== 'viewer'}
                            />
                            <Tag text="Publish" ok={currentRole !== 'viewer'} />
                            <Tag
                                text="View only"
                                ok={currentRole === 'viewer'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Tag({ text, ok }: { text: string; ok: boolean }) {
    return (
        <span
            className={`px-1.5 py-0.5 text-[10px] rounded ${
                ok
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400 line-through'
            }`}
        >
            {text}
        </span>
    )
}
