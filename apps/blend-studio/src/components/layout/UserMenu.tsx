/**
 * UserMenu
 *
 * User dropdown menu with avatar, role badge, and actions.
 * Shows admin toggle for Monitor Dashboard (admin-only) and logout button.
 */

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
    LogOut,
    ChevronDown,
    LayoutDashboard,
    User,
    Shield,
    KeyRound,
    Copy,
} from 'lucide-react'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { usePermissions } from '@/frontend/components/auth/PermissionGuard'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserMenuProps {
    showAdminToggle?: boolean
    onAdminToggle?: () => void
    isAdminMode?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function UserMenu({
    showAdminToggle = false,
    onAdminToggle,
    isAdminMode = false,
}: UserMenuProps) {
    const { user, logout } = useBackendAuth()
    const { isAdmin } = usePermissions()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [showTokenModal, setShowTokenModal] = useState(false)
    const [copied, setCopied] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close menu on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Close menu on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    const handleLogout = async () => {
        setIsOpen(false)
        await logout()
        navigate({ to: '/login', search: { from: undefined } })
    }

    const apiToken = sessionStorage.getItem('blend_auth_token')

    const handleOpenToken = () => {
        setIsOpen(false)
        setCopied(false)
        setShowTokenModal(true)
    }

    const handleCopyToken = async () => {
        if (!apiToken) return
        try {
            await navigator.clipboard.writeText(apiToken)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1200)
        } catch {
            // Fallback for older browsers / restricted clipboard permissions
            const textarea = document.createElement('textarea')
            textarea.value = apiToken
            textarea.style.position = 'fixed'
            textarea.style.left = '-9999px'
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1200)
        }
    }

    const handleAdminToggle = () => {
        setIsOpen(false)
        onAdminToggle?.()
    }

    if (!user) {
        return (
            <button
                onClick={() =>
                    navigate({ to: '/login', search: { from: undefined } })
                }
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <User className="w-4 h-4" />
                Sign In
            </button>
        )
    }

    const initials = getInitials(user.displayName || user.email)
    const roleDisplay = getRoleDisplay(user.role)

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* Avatar */}
                {user.photoUrl ? (
                    <img
                        src={user.photoUrl}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                ) : (
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${roleDisplay.avatarBg}`}
                    >
                        {initials}
                    </div>
                )}

                {/* Name & Role */}
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                        {user.displayName || user.email.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-500">{roleDisplay.label}</p>
                </div>

                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-3">
                            {user.photoUrl ? (
                                <img
                                    src={user.photoUrl}
                                    alt={user.displayName || 'User'}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${roleDisplay.avatarBg}`}
                                >
                                    {initials}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user.displayName || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        {/* Role Badge */}
                        <div className="px-4 py-2 flex items-center gap-2">
                            <Shield className={`w-4 h-4 ${roleDisplay.text}`} />
                            <span
                                className={`text-xs font-medium ${roleDisplay.text}`}
                            >
                                {roleDisplay.label}
                            </span>
                        </div>

                        {/* Admin Toggle (admin only) */}
                        {isAdmin && showAdminToggle && (
                            <button
                                onClick={handleAdminToggle}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                                    <span>Monitor Dashboard</span>
                                </div>
                                {/* Toggle Switch */}
                                <div
                                    className={`w-9 h-5 rounded-full transition-colors ${
                                        isAdminMode
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300'
                                    }`}
                                >
                                    <div
                                        className={`w-4 h-4 mt-0.5 rounded-full bg-white shadow-sm transition-transform ${
                                            isAdminMode
                                                ? 'translate-x-4.5 ml-0.5'
                                                : 'ml-0.5'
                                        }`}
                                    />
                                </div>
                            </button>
                        )}

                        {/* API Token (for CLI) */}
                        <button
                            onClick={handleOpenToken}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <KeyRound className="w-4 h-4 text-gray-400" />
                            <span>API Token (for CLI)</span>
                        </button>

                        {/* Divider */}
                        <div className="my-1 h-px bg-gray-100" />

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}

            {/* Token Modal */}
            {showTokenModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowTokenModal(false)}
                    />
                    <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold text-gray-900">
                                    API Token (for CLI)
                                </div>
                                <div className="text-xs text-gray-500">
                                    Use this for{' '}
                                    <span className="font-mono">
                                        blend-token-studio login --token
                                    </span>
                                </div>
                            </div>
                            <button
                                className="text-sm text-gray-500 hover:text-gray-800"
                                onClick={() => setShowTokenModal(false)}
                            >
                                Close
                            </button>
                        </div>

                        <div className="p-5 space-y-3">
                            {!apiToken ? (
                                <div className="text-sm text-red-600">
                                    Token not found. Please sign in again.
                                </div>
                            ) : (
                                <>
                                    <div className="text-xs text-gray-600">
                                        Copy and paste into your terminal:
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                                        <code className="block text-xs font-mono text-gray-800 break-all">
                                            {apiToken}
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleCopyToken}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copied ? 'Copied' : 'Copy token'}
                                        </button>
                                        <div className="text-xs text-gray-500">
                                            Example:{' '}
                                            <span className="font-mono">
                                                blend-token-studio login --token
                                                &nbsp;&lt;TOKEN&gt;
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

function getRoleDisplay(role: string): {
    label: string
    text: string
    avatarBg: string
} {
    switch (role) {
        case 'admin':
        case 'superadmin':
            return {
                label: 'Admin',
                text: 'text-purple-600',
                avatarBg: 'bg-purple-100 text-purple-700',
            }
        case 'editor':
            return {
                label: 'Editor',
                text: 'text-blue-600',
                avatarBg: 'bg-blue-100 text-blue-700',
            }
        case 'viewer':
            return {
                label: 'Viewer',
                text: 'text-gray-600',
                avatarBg: 'bg-gray-100 text-gray-700',
            }
        default:
            return {
                label: 'User',
                text: 'text-gray-600',
                avatarBg: 'bg-gray-100 text-gray-700',
            }
    }
}
