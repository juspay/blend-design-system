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
    ButtonType,
    ButtonSubType,
} from '@juspay/blend-design-system'

interface UserMenuProps {
    showAdminToggle?: boolean
    onAdminToggle?: () => void
    isAdminMode?: boolean
}

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
            <ButtonV2
                buttonType={ButtonV2Type.SECONDARY}
                size={ButtonV2Size.SMALL}
                leftSlot={{ slot: <User className="w-4 h-4" /> }}
                text="Sign In"
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
                    <p className="text-xs text-gray-500">{roleDisplay.label}</p>
                </div>

                <CaretDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
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
                            <span>API Token (for CLI)</span>
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
                title="API Token (for CLI)"
                subtitle="Use this for blend-token-studio login --token"
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
                }}
                secondaryAction={{
                    text: 'Close',
                    buttonType: ButtonType.SECONDARY,
                    subType: ButtonSubType.DEFAULT,
                    onClick: () => setShowTokenModal(false),
                }}
                minWidth="480px"
            >
                {!apiToken ? (
                    <div className="text-sm text-red-600">
                        Token not found. Please sign in again.
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-xs text-gray-600">
                            Copy and paste into your terminal:
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                            <code className="block text-xs font-mono text-gray-800 break-all">
                                {apiToken}
                            </code>
                        </div>
                        <div className="text-xs text-gray-500">
                            Example:{' '}
                            <span className="font-mono">
                                blend-token-studio login --token
                                &nbsp;&lt;TOKEN&gt;
                            </span>
                        </div>
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
