'use client'

import React, { useState, useEffect } from 'react'
import { auth } from '@/frontend/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import {
    Button,
    ButtonType,
    ButtonSize,
    Modal,
    TextInput,
    TextInputSize,
    SingleSelect,
} from 'blend-v1'
import {
    UserPlus,
    Trash2,
    Activity,
    Clock,
    User as UserIcon,
    LogIn,
    LogOut,
    UserCheck,
    UserX,
    Shield,
} from 'lucide-react'
import { useUserManagement } from '@/frontend/hooks/usePostgreSQLData'

// Default roles
const DEFAULT_ROLES = {
    admin: { name: 'Administrator', permissions: ['*'] },
    developer: { name: 'Developer', permissions: ['read', 'write'] },
    viewer: { name: 'Viewer', permissions: ['read'] },
}

// User interface
interface UserData {
    id: string
    firebase_uid: string
    email: string
    display_name?: string
    photo_url?: string
    role: string
    is_active: boolean
    last_login: string
    created_at: string
}

// Mock permissions hook
const usePermissions = () => ({
    canManageUsers: true,
    isAdmin: true,
    userData: { email: 'admin@example.com' },
})

// Mock ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                router.push('/login')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return <>{children}</>
}

export default function UsersPage() {
    return (
        <ProtectedRoute>
            <UserManagement />
        </ProtectedRoute>
    )
}

function UserManagement() {
    const router = useRouter()
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteRole, setInviteRole] = useState('viewer')
    const [inviting, setInviting] = useState(false)
    const [emailError, setEmailError] = useState('')
    const { canManageUsers, isAdmin, userData } = usePermissions()

    // Use PostgreSQL user management hooks
    const {
        users,
        loading,
        error,
        updateUserRole,
        updateUserStatus,
        createUser,
        deleteUser,
    } = useUserManagement()

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!canManageUsers) return

        try {
            await updateUserRole(userId, newRole)
            console.log(`Updated user ${userId} role to ${newRole}`)
        } catch (error) {
            console.error('Error updating user role:', error)
            alert('Failed to update role')
        }
    }

    const handleStatusChange = async (userId: string, isActive: boolean) => {
        if (!canManageUsers) return

        try {
            await updateUserStatus(userId, isActive)
            console.log(
                `Updated user ${userId} status to ${isActive ? 'active' : 'inactive'}`
            )
        } catch (error) {
            console.error('Error updating user status:', error)
            alert('Failed to update user status')
        }
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address')
            return false
        }

        const existingUser = users.find(
            (u: UserData) => u.email.toLowerCase() === email.toLowerCase()
        )
        if (existingUser) {
            setEmailError('This user already exists in the system')
            return false
        }

        setEmailError('')
        return true
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value
        setInviteEmail(email)

        if (email && !validateEmail(email)) {
            // Validate as user types
        }
    }

    const handleInviteUser = async () => {
        if (!canManageUsers || !inviteEmail) return

        if (!validateEmail(inviteEmail)) {
            return
        }

        setInviting(true)
        try {
            await createUser({
                firebase_uid: `invite_${Date.now()}`, // Temporary UID for invited users
                email: inviteEmail,
                display_name: inviteEmail.split('@')[0],
                role: inviteRole,
            })

            // Reset form
            setInviteEmail('')
            setInviteRole('viewer')
            setEmailError('')
            setShowInviteModal(false)

            console.log(`User ${inviteEmail} invited with role: ${inviteRole}`)
        } catch (error) {
            console.error('Error inviting user:', error)
            setEmailError('Failed to invite user')
        } finally {
            setInviting(false)
        }
    }

    const formatDate = (dateString: string) => {
        if (dateString === 'Never' || !dateString) {
            return 'Not logged in yet'
        }
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'developer':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'viewer':
                return 'bg-gray-100 text-gray-800 border-gray-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header with title and invite button */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">
                    All Users ({users.length})
                </h2>
                {canManageUsers && (
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Invite User"
                        leadingIcon={<UserPlus className="w-4 h-4" />}
                        onClick={() => setShowInviteModal(true)}
                    />
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-red-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-green-700">
                            ✅ Connected to PostgreSQL! User data is now managed
                            in your cloud database.
                        </p>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Login
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                {canManageUsers && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user: UserData) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.photo_url ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.photo_url}
                                                        alt={
                                                            user.display_name ||
                                                            'User'
                                                        }
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {user.display_name?.charAt(
                                                                0
                                                            ) ||
                                                                user.email
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.display_name ||
                                                        'No name'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {canManageUsers ? (
                                            <div className="w-40">
                                                <SingleSelect
                                                    label=""
                                                    selected={user.role}
                                                    onSelect={(value: string) =>
                                                        handleRoleChange(
                                                            user.firebase_uid,
                                                            value
                                                        )
                                                    }
                                                    items={[
                                                        {
                                                            items: Object.entries(
                                                                DEFAULT_ROLES
                                                            ).map(
                                                                ([
                                                                    roleId,
                                                                    roleData,
                                                                ]) => ({
                                                                    value: roleId,
                                                                    label: roleData.name,
                                                                })
                                                            ),
                                                        },
                                                    ]}
                                                    placeholder="Select role"
                                                />
                                            </div>
                                        ) : (
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}
                                            >
                                                {DEFAULT_ROLES[
                                                    user.role as keyof typeof DEFAULT_ROLES
                                                ]?.name || user.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {canManageUsers ? (
                                            <div className="w-32">
                                                <SingleSelect
                                                    label=""
                                                    selected={
                                                        user.is_active
                                                            ? 'active'
                                                            : 'inactive'
                                                    }
                                                    onSelect={(value: string) =>
                                                        handleStatusChange(
                                                            user.firebase_uid,
                                                            value === 'active'
                                                        )
                                                    }
                                                    items={[
                                                        {
                                                            items: [
                                                                {
                                                                    value: 'active',
                                                                    label: 'Active',
                                                                },
                                                                {
                                                                    value: 'inactive',
                                                                    label: 'Inactive',
                                                                },
                                                            ],
                                                        },
                                                    ]}
                                                    placeholder="Select status"
                                                />
                                            </div>
                                        ) : (
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    user.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {user.is_active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.last_login)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.created_at)}
                                    </td>
                                    {canManageUsers && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    size={ButtonSize.SMALL}
                                                    text=""
                                                    leadingIcon={
                                                        <Activity className="w-4 h-4" />
                                                    }
                                                    onClick={() =>
                                                        router.push(
                                                            `/users/${user.firebase_uid}/activity`
                                                        )
                                                    }
                                                    title="View activity"
                                                />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No users found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Users will appear here once they sign in to the
                            application.
                        </p>
                    </div>
                )}
            </div>

            {/* Invite User Modal */}
            <Modal
                isOpen={showInviteModal}
                onClose={() => {
                    setShowInviteModal(false)
                    setInviteEmail('')
                    setInviteRole('viewer')
                }}
                title="Invite New User"
                showFooter={false}
            >
                <div className="space-y-4">
                    <div>
                        <TextInput
                            label="Email Address"
                            size={TextInputSize.MEDIUM}
                            value={inviteEmail}
                            onChange={handleEmailChange}
                            placeholder="user@example.com"
                            type="email"
                            error={!!emailError}
                        />
                        {emailError && (
                            <p className="mt-1 text-sm text-red-600">
                                {emailError}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Enter the email address of the user you want to
                            invite.
                        </p>
                    </div>

                    <SingleSelect
                        label="Role"
                        selected={inviteRole}
                        onSelect={(value: string) => setInviteRole(value)}
                        items={[
                            {
                                items: Object.entries(DEFAULT_ROLES).map(
                                    ([roleId, roleData]) => ({
                                        value: roleId,
                                        label: roleData.name,
                                    })
                                ),
                            },
                        ]}
                        placeholder="Select a role"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            text="Cancel"
                            onClick={() => {
                                setShowInviteModal(false)
                                setInviteEmail('')
                                setInviteRole('viewer')
                                setEmailError('')
                            }}
                            disabled={inviting}
                        />
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            text={inviting ? 'Inviting...' : 'Send Invitation'}
                            onClick={handleInviteUser}
                            disabled={!inviteEmail || !!emailError || inviting}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
