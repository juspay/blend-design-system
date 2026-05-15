import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
    SignOut,
    CaretDown,
    ChartBar,
    User,
    ShieldCheck,
    Key,
    Copy,
    Check,
} from '@phosphor-icons/react'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { usePermissions } from '@/frontend/components/auth/PermissionGuard'
import {
    Modal,
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonType,
    ButtonSubType,
} from '@juspay/blend-design-system'

const API_URL = import.meta.env.VITE_API_BASE_URL || ''

interface UserMenuProps {
    showAdminToggle?: boolean
    onAdminToggle?: () => void
    isAdminMode?: boolean
    compact?: boolean
    menuPlacement?: 'bottom-right' | 'top-left'
}

export function UserMenu({
    showAdminToggle = false,
    onAdminToggle,
    isAdminMode = false,
    compact = false,
    menuPlacement = 'bottom-right',
}: UserMenuProps) {
    const { user, logout } = useBackendAuth()
    const { isAdmin } = usePermissions()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [showTokenModal, setShowTokenModal] = useState(false)
    const [copied, setCopied] = useState(false)
    const [cliToken, setCliToken] = useState<string | null>(null)
    const [cliTokenExpiresAt, setCliTokenExpiresAt] = useState<number | null>(
        null
    )
    const [cliTokenLoading, setCliTokenLoading] = useState(false)
    const [cliTokenError, setCliTokenError] = useState<string | null>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!showTokenModal || !user) {
            return
        }

        let cancelled = false
        setCliToken(null)
        setCliTokenExpiresAt(null)
        setCliTokenError(null)
        setCliTokenLoading(true)

        if (!API_URL) {
            setCliTokenLoading(false)
            setCliTokenError(
                'API URL is not configured (VITE_API_BASE_URL). Cannot load CLI token.'
            )
            return
        }

        void (async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth/cli-token`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: '{}',
                })
                const body = (await response.json().catch(() => ({}))) as {
                    success?: boolean
                    data?: {
                        token?: string
                        expiresAt?: number | null
                        expiresInSeconds?: number | null
                    }
                    message?: string
                    error?: { message?: string }
                }

                if (cancelled) return

                if (!response.ok) {
                    setCliTokenError(
                        body?.message ||
                            body?.error?.message ||
                            `Could not load token (HTTP ${response.status}). Try signing out and signing in again.`
                    )
                    return
                }

                const token = body?.data?.token
                if (typeof token === 'string' && token.length > 0) {
                    setCliToken(token)
                    const exp = body?.data?.expiresAt
                    setCliTokenExpiresAt(
                        typeof exp === 'number' && !Number.isNaN(exp)
                            ? exp
                            : null
                    )
                } else {
                    setCliTokenError('Invalid token response from server.')
                }
            } catch {
                if (!cancelled) {
                    setCliTokenError(
                        'Network error while loading token. Check your connection and API URL.'
                    )
                }
            } finally {
                if (!cancelled) {
                    setCliTokenLoading(false)
                }
            }
        })()

        return () => {
            cancelled = true
        }
    }, [showTokenModal, user])

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

    const handleOpenToken = () => {
        setIsOpen(false)
        setCopied(false)
        setShowTokenModal(true)
    }

    const handleCopyToken = async () => {
        if (!cliToken) return
        try {
            await navigator.clipboard.writeText(cliToken)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1200)
        } catch {
            const textarea = document.createElement('textarea')
            textarea.value = cliToken
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

    const menuPositionClass =
        menuPlacement === 'top-left'
            ? 'left-0 bottom-full mb-1'
            : 'right-0 top-full mt-1'

    if (!user) {
        return (
            <ButtonV2
                buttonType={ButtonV2Type.SECONDARY}
                size={ButtonV2Size.SMALL}
                leftSlot={{ slot: <User className="w-4 h-4" /> }}
                subType={
                    compact
                        ? ButtonV2SubType.ICON_ONLY
                        : ButtonV2SubType.DEFAULT
                }
                text={compact ? undefined : 'Sign In'}
                aria-label="Sign in"
                onClick={() =>
                    navigate({ to: '/login', search: { from: undefined } })
                }
            />
        )
    }

    const initials = getInitials(user.displayName || user.email)
    const roleDisplay = getRoleDisplay(user.role)

    return (
        <div className="relative" ref={menuRef}>
            {compact ? (
                <ButtonV2
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.SMALL}
                    subType={ButtonV2SubType.ICON_ONLY}
                    leftSlot={{
                        slot: <User className="w-4 h-4" weight="fill" />,
                    }}
                    aria-label="User menu"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                />
            ) : (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
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

                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                            {user.displayName || user.email.split('@')[0]}
                        </p>
                        <p className="text-xs text-gray-500">
                            {roleDisplay.label}
                        </p>
                    </div>

                    <CaretDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>
            )}

            {isOpen && (
                <div
                    className={`absolute ${menuPositionClass} w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-[999] overflow-hidden`}
                >
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

                    <div className="py-1">
                        <div className="px-4 py-2 flex items-center gap-2">
                            <ShieldCheck
                                className={`w-4 h-4 ${roleDisplay.text}`}
                            />
                            <span
                                className={`text-xs font-medium ${roleDisplay.text}`}
                            >
                                {roleDisplay.label}
                            </span>
                        </div>

                        {isAdmin && showAdminToggle && (
                            <button
                                onClick={handleAdminToggle}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <ChartBar className="w-4 h-4 text-gray-400" />
                                    <span>Monitor Dashboard</span>
                                </div>
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

                        <button
                            onClick={handleOpenToken}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <Key className="w-4 h-4 text-gray-400" />
                            <span>CLI token</span>
                        </button>

                        <div className="my-1 h-px bg-gray-100" />

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <SignOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}

            <Modal
                isOpen={showTokenModal}
                onClose={() => setShowTokenModal(false)}
                title="CLI token"
                subtitle="Short-lived (10 min). Mint a new one here anytime after it expires."
                primaryAction={{
                    text: copied ? 'Copied!' : 'Copy token',
                    buttonType: ButtonType.PRIMARY,
                    subType: ButtonSubType.DEFAULT,
                    leadingIcon: copied ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    ),
                    onClick: handleCopyToken,
                    disabled: cliTokenLoading || !cliToken,
                }}
                secondaryAction={{
                    text: 'Close',
                    buttonType: ButtonType.SECONDARY,
                    subType: ButtonSubType.DEFAULT,
                    onClick: () => setShowTokenModal(false),
                }}
                minWidth="480px"
            >
                {cliTokenLoading ? (
                    <div className="text-sm text-gray-600">Loading token…</div>
                ) : cliTokenError ? (
                    <div className="text-sm text-red-600">{cliTokenError}</div>
                ) : cliToken ? (
                    <div className="space-y-3">
                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                            Use once in your terminal, then run CLI commands
                            before it expires. Open this dialog again to mint a
                            new token.
                        </div>
                        {cliTokenExpiresAt != null && (
                            <div className="text-xs text-gray-600">
                                Expires:{' '}
                                <span className="font-medium text-gray-900">
                                    {new Date(
                                        cliTokenExpiresAt
                                    ).toLocaleString()}
                                </span>
                            </div>
                        )}
                        <div className="text-xs text-gray-600">
                            From your app project folder (same Studio as this
                            site):
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                            <code className="block text-xs font-mono text-gray-800 break-all">
                                {cliToken}
                            </code>
                        </div>
                        <div className="text-xs text-gray-500">
                            Example:{' '}
                            <span className="font-mono">
                                npx blend-studio login --token
                                &nbsp;&lt;TOKEN&gt;
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-600">
                        No token returned. Try refreshing the page or signing in
                        again.
                    </div>
                )}
            </Modal>
        </div>
    )
}

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
