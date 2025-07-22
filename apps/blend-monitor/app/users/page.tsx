'use client'

import React, { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { roleService, UserData, DEFAULT_ROLES } from '@/lib/role-service'
import { usePermissions } from '@/components/auth/PermissionGuard'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useRouter } from 'next/navigation'
import {
    ButtonV2,
    ButtonTypeV2,
    ButtonSizeV2,
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
import {
    activityService,
    ActivityAction,
    ActivityLog,
} from '@/lib/activity-service'

interface UserWithId extends UserData {
    id: string
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
    const [users, setUsers] = useState<UserWithId[]>([])
    const [loading, setLoading] = useState(true)
    const [editingUser, setEditingUser] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteRole, setInviteRole] = useState('viewer')
    const [inviting, setInviting] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState<UserWithId | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [showActivityModal, setShowActivityModal] = useState(false)
    const [selectedUserActivity, setSelectedUserActivity] =
        useState<UserWithId | null>(null)
    const [userActivities, setUserActivities] = useState<ActivityLog[]>([])
    const [loadingActivities, setLoadingActivities] = useState(false)
    const { canManageUsers, isAdmin, userData } = usePermissions()

    useEffect(() => {
        // Only load users once the user is authenticated and userData is available
        if (userData) {
            loadUsers()
        }
    }, [userData])

    const loadUsers = async () => {
        try {
            setError(null)
            const usersData = await roleService.getAllUsers()
            const usersList = Object.entries(usersData).map(
                ([id, userData]) => ({
                    id,
                    ...userData,
                })
            )
            console.log('Loaded users:', usersList) // Debug log
            setUsers(usersList)
        } catch (error) {
            console.error('Error loading users:', error)
            setError('Unable to load users. Please ensure you are signed in.')
        } finally {
            setLoading(false)
        }
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!canManageUsers) return

        try {
            if (!auth) {
                throw new Error('Firebase auth not initialized')
            }

            const user = auth.currentUser
            if (!user) {
                throw new Error('User not authenticated')
            }

            const token = await user.getIdToken()

            const response = await fetch(`/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newRole }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update user role')
            }

            // Update local state immediately for better UX
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === userId ? { ...u, role: newRole } : u
                )
            )

            // Log activity
            const targetUser = users.find((u) => u.id === userId)
            if (auth?.currentUser && targetUser) {
                await activityService.logUserActivity(
                    user.uid,
                    ActivityAction.ROLE_CHANGED,
                    {
                        targetUserId: userId,
                        targetEmail: targetUser.email,
                        from: targetUser.role,
                        to: newRole,
                        changedBy: userData?.email,
                    }
                )
            }
        } catch (error) {
            console.error('Error updating user role:', error)
            alert(
                `Failed to update role: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
            // Reload to revert on error
            await loadUsers()
        }
    }

    const handleStatusChange = async (userId: string, isActive: boolean) => {
        if (!canManageUsers) return

        try {
            await roleService.updateUserStatus(userId, isActive)

            // Update local state immediately for better UX
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === userId ? { ...u, isActive } : u))
            )

            // Log activity
            const targetUser = users.find((u) => u.id === userId)
            if (auth?.currentUser && targetUser) {
                await activityService.logUserActivity(
                    auth.currentUser.uid,
                    ActivityAction.USER_STATUS_CHANGED,
                    {
                        targetUserId: userId,
                        targetEmail: targetUser.email,
                        isActive,
                        changedBy: userData?.email,
                    }
                )
            }
        } catch (error) {
            console.error('Error updating user status:', error)
            alert(
                `Failed to update user status: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
            // Reload to revert on error
            await loadUsers()
        }
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const googleDomains = ['gmail.com', 'googlemail.com']

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address')
            return false
        }

        // Check if user already exists
        const existingUser = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
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
            // Create a pre-registered user entry
            await roleService.inviteUser(inviteEmail, inviteRole)

            // Reset form
            setInviteEmail('')
            setInviteRole('viewer')
            setEmailError('')
            setShowInviteModal(false)

            // Reload users to show the invited user
            await loadUsers()

            // Log activity
            if (auth?.currentUser) {
                await activityService.logUserActivity(
                    auth.currentUser.uid,
                    ActivityAction.USER_INVITED,
                    {
                        email: inviteEmail,
                        role: inviteRole,
                        invitedBy: userData?.email,
                    }
                )
            }

            console.log(`User ${inviteEmail} invited with role: ${inviteRole}`)
        } catch (error) {
            console.error('Error inviting user:', error)
            setEmailError(
                error instanceof Error ? error.message : 'Failed to invite user'
            )
        } finally {
            setInviting(false)
        }
    }

    const handleDeleteUser = async () => {
        if (!canManageUsers || !userToDelete) return

        setDeleting(true)
        try {
            await roleService.deleteUser(userToDelete.id)

            // Update local state
            setUsers((prevUsers) =>
                prevUsers.filter((u) => u.id !== userToDelete.id)
            )

            // Close modal
            setShowDeleteModal(false)
            setUserToDelete(null)

            // Log activity
            if (auth?.currentUser) {
                await activityService.logUserActivity(
                    auth.currentUser.uid,
                    ActivityAction.USER_REMOVED,
                    {
                        targetUserId: userToDelete.id,
                        email: userToDelete.email,
                        removedBy: userData?.email,
                    }
                )
            }

            console.log(`User ${userToDelete.email} removed`)
        } catch (error) {
            console.error('Error deleting user:', error)
            alert(
                `Failed to remove user: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        } finally {
            setDeleting(false)
        }
    }

    const handleViewActivity = async (user: UserWithId) => {
        setSelectedUserActivity(user)
        setShowActivityModal(true)
        setLoadingActivities(true)

        try {
            const activities = await activityService.getUserActivities(
                user.id,
                50
            )
            setUserActivities(activities)
        } catch (error) {
            console.error('Error loading activities:', error)
            setUserActivities([])
        } finally {
            setLoadingActivities(false)
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

    const getActivityBgColor = (action: string) => {
        switch (action) {
            case 'user_login':
                return 'bg-green-500'
            case 'user_logout':
                return 'bg-gray-500'
            case 'role_changed':
                return 'bg-blue-500'
            case 'user_invited':
                return 'bg-purple-500'
            case 'user_removed':
                return 'bg-red-500'
            case 'user_status_changed':
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }

    const getActivityIcon = (action: string) => {
        switch (action) {
            case 'user_login':
                return <LogIn className="w-4 h-4 text-white" />
            case 'user_logout':
                return <LogOut className="w-4 h-4 text-white" />
            case 'role_changed':
                return <Shield className="w-4 h-4 text-white" />
            case 'user_invited':
                return <UserPlus className="w-4 h-4 text-white" />
            case 'user_removed':
                return <UserX className="w-4 h-4 text-white" />
            case 'user_status_changed':
                return <UserCheck className="w-4 h-4 text-white" />
            default:
                return <Activity className="w-4 h-4 text-white" />
        }
    }

    const getActivityTitle = (action: string) => {
        switch (action) {
            case 'user_login':
                return 'User Signed In'
            case 'user_logout':
                return 'User Signed Out'
            case 'role_changed':
                return 'Role Changed'
            case 'user_invited':
                return 'User Invited'
            case 'user_removed':
                return 'User Removed'
            case 'user_status_changed':
                return 'Status Updated'
            default:
                return 'Activity'
        }
    }

    const formatActivityTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        if (diffDays < 7) return `${diffDays}d ago`

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatDetailKey = (key: string) => {
        return key
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .toLowerCase()
            .replace(/^./, (str) => str.toUpperCase())
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
                    <ButtonV2
                        buttonType={ButtonTypeV2.PRIMARY}
                        size={ButtonSizeV2.MEDIUM}
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

            {!canManageUsers && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-blue-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                You have read-only access to user information.
                                Contact an administrator to modify user roles.
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.photoURL ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.photoURL}
                                                        alt={user.displayName}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {user.displayName?.charAt(
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
                                                    {user.displayName ||
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
                                                            user.id,
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
                                                {DEFAULT_ROLES[user.role]
                                                    ?.name || user.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {canManageUsers ? (
                                            <div className="w-32">
                                                <SingleSelect
                                                    label=""
                                                    selected={
                                                        user.isActive
                                                            ? 'active'
                                                            : 'inactive'
                                                    }
                                                    onSelect={(value: string) =>
                                                        handleStatusChange(
                                                            user.id,
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
                                                    user.isActive
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {user.isActive
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.lastLogin)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    {canManageUsers && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <ButtonV2
                                                    buttonType={
                                                        ButtonTypeV2.SECONDARY
                                                    }
                                                    size={ButtonSizeV2.SMALL}
                                                    text=""
                                                    leadingIcon={
                                                        <Trash2 className="w-4 h-4" />
                                                    }
                                                    onClick={() => {
                                                        setUserToDelete(user)
                                                        setShowDeleteModal(true)
                                                    }}
                                                    disabled={
                                                        user.email ===
                                                        userData?.email
                                                    } // Can't delete yourself
                                                    title={
                                                        user.email ===
                                                        userData?.email
                                                            ? 'You cannot remove yourself'
                                                            : 'Remove user'
                                                    }
                                                />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
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
                            invite. They will be able to sign in with their
                            Google account.
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
                        <ButtonV2
                            buttonType={ButtonTypeV2.SECONDARY}
                            size={ButtonSizeV2.MEDIUM}
                            text="Cancel"
                            onClick={() => {
                                setShowInviteModal(false)
                                setInviteEmail('')
                                setInviteRole('viewer')
                                setEmailError('')
                            }}
                            disabled={inviting}
                        />
                        <ButtonV2
                            buttonType={ButtonTypeV2.PRIMARY}
                            size={ButtonSizeV2.MEDIUM}
                            text={inviting ? 'Inviting...' : 'Send Invitation'}
                            onClick={handleInviteUser}
                            disabled={!inviteEmail || !!emailError || inviting}
                        />
                    </div>
                </div>
            </Modal>

            {/* Delete User Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false)
                    setUserToDelete(null)
                }}
                title="Remove User"
                showFooter={false}
            >
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2 className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                Are you sure you want to remove this user?
                            </h3>
                            <div className="mt-2 text-sm text-gray-500">
                                <p>
                                    This will remove{' '}
                                    <strong>{userToDelete?.email}</strong> from
                                    the system.
                                </p>
                                <p className="mt-2">
                                    They will lose access immediately and will
                                    need to be invited again to regain access.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <ButtonV2
                            buttonType={ButtonTypeV2.SECONDARY}
                            size={ButtonSizeV2.MEDIUM}
                            text="Cancel"
                            onClick={() => {
                                setShowDeleteModal(false)
                                setUserToDelete(null)
                            }}
                            disabled={deleting}
                        />
                        <ButtonV2
                            buttonType={ButtonTypeV2.PRIMARY}
                            size={ButtonSizeV2.MEDIUM}
                            text={deleting ? 'Removing...' : 'Remove User'}
                            onClick={handleDeleteUser}
                            disabled={deleting}
                        />
                    </div>
                </div>
            </Modal>

            {/* Activity Modal */}
            <Modal
                isOpen={showActivityModal}
                onClose={() => {
                    setShowActivityModal(false)
                    setSelectedUserActivity(null)
                    setUserActivities([])
                }}
                title="User Activity"
                showFooter={false}
            >
                <div className="h-[500px]">
                    {/* User Info Header */}
                    {selectedUserActivity && (
                        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
                            {selectedUserActivity.photoURL ? (
                                <img
                                    src={selectedUserActivity.photoURL}
                                    alt={selectedUserActivity.displayName}
                                    className="w-12 h-12 rounded-full"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-lg font-medium text-gray-600">
                                        {selectedUserActivity.displayName?.charAt(
                                            0
                                        ) ||
                                            selectedUserActivity.email
                                                .charAt(0)
                                                .toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">
                                    {selectedUserActivity.displayName ||
                                        'No name'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {selectedUserActivity.email}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Activity Content - Scrollable */}
                    <div className="h-[calc(100%-80px)] overflow-y-auto">
                        {loadingActivities ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : userActivities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                    <Activity className="h-6 w-6 text-gray-400" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    No activity yet
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Activities will appear here as they occur
                                </p>
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200"></div>

                                {/* Activity items */}
                                <div className="space-y-6">
                                    {userActivities.map((activity, index) => {
                                        const isLast =
                                            index === userActivities.length - 1
                                        return (
                                            <div
                                                key={activity.id || index}
                                                className="relative flex gap-4"
                                            >
                                                {/* Timeline dot and connector */}
                                                <div className="relative flex flex-col items-center">
                                                    <div
                                                        className={`z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getActivityBgColor(activity.action)}`}
                                                    >
                                                        {getActivityIcon(
                                                            activity.action
                                                        )}
                                                    </div>
                                                    {!isLast && (
                                                        <div className="w-px h-full bg-gray-200 absolute top-8"></div>
                                                    )}
                                                </div>

                                                {/* Activity card */}
                                                <div className="flex-1 pb-6">
                                                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                                        {/* Header with action and time */}
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="text-sm font-medium text-gray-900">
                                                                {getActivityTitle(
                                                                    activity.action
                                                                )}
                                                            </h4>
                                                            <span className="text-xs text-gray-500">
                                                                {formatActivityTime(
                                                                    activity.timestamp
                                                                )}
                                                            </span>
                                                        </div>

                                                        {/* Activity description */}
                                                        <p className="text-sm text-gray-600">
                                                            {activityService.formatActivityMessage(
                                                                activity
                                                            )}
                                                        </p>

                                                        {/* Activity details */}
                                                        {activity.details &&
                                                            Object.keys(
                                                                activity.details
                                                            ).length > 0 && (
                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                    {Object.entries(
                                                                        activity.details
                                                                    )
                                                                        .filter(
                                                                            ([
                                                                                key,
                                                                            ]) =>
                                                                                [
                                                                                    'email',
                                                                                    'provider',
                                                                                    'from',
                                                                                    'to',
                                                                                    'role',
                                                                                ].includes(
                                                                                    key
                                                                                )
                                                                        )
                                                                        .map(
                                                                            ([
                                                                                key,
                                                                                value,
                                                                            ]) => (
                                                                                <span
                                                                                    key={
                                                                                        key
                                                                                    }
                                                                                    className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700"
                                                                                >
                                                                                    <span className="font-medium">
                                                                                        {key ===
                                                                                            'from' &&
                                                                                            'From: '}
                                                                                        {key ===
                                                                                            'to' &&
                                                                                            'To: '}
                                                                                        {key ===
                                                                                            'email' &&
                                                                                            'Email: '}
                                                                                        {key ===
                                                                                            'provider' &&
                                                                                            'Via: '}
                                                                                        {key ===
                                                                                            'role' &&
                                                                                            'Role: '}
                                                                                    </span>
                                                                                    <span className="ml-1">
                                                                                        {String(
                                                                                            value
                                                                                        )}
                                                                                    </span>
                                                                                </span>
                                                                            )
                                                                        )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
