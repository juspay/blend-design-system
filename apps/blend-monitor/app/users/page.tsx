'use client'

import React, { useState, useEffect } from 'react'
import { auth } from '@/frontend/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Loader from '@/frontend/components/shared/Loader'
import {
    Button,
    ButtonType,
    ButtonSize,
    Modal,
    TextInput,
    TextInputSize,
    SingleSelect,
    DataTable,
    ColumnDefinition,
    ColumnType,
} from '@juspay/blend-design-system'
import { UserPlus, Activity } from 'lucide-react'
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
            <Loader fullScreen size="large" text="Loading authentication..." />
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
    const { canManageUsers } = usePermissions()

    // Use PostgreSQL user management hooks
    const { users, loading, updateUserRole, updateUserStatus, createUser } =
        useUserManagement()

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

    // Define columns for DataTable
    const columns: ColumnDefinition<UserData>[] = [
        {
            field: 'display_name' as keyof UserData,
            header: 'User',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: UserData) => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {row.photo_url ? (
                            <img
                                className="h-10 w-10 rounded-full"
                                src={row.photo_url}
                                alt={row.display_name || 'User'}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {row.display_name?.charAt(0) ||
                                        row.email.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {row.display_name || 'No name'}
                        </div>
                        <div className="text-sm text-gray-500">{row.email}</div>
                    </div>
                </div>
            ),
        },
        {
            field: 'role' as keyof UserData,
            header: 'Role',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: UserData) =>
                canManageUsers ? (
                    <div className="w-40">
                        <SingleSelect
                            label=""
                            selected={row.role}
                            onSelect={(value: string) =>
                                handleRoleChange(row.firebase_uid, value)
                            }
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
                            placeholder="Select role"
                        />
                    </div>
                ) : (
                    <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(row.role)}`}
                    >
                        {DEFAULT_ROLES[row.role as keyof typeof DEFAULT_ROLES]
                            ?.name || row.role}
                    </span>
                ),
        },
        {
            field: 'is_active' as keyof UserData,
            header: 'Status',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: UserData) =>
                canManageUsers ? (
                    <div className="w-32">
                        <SingleSelect
                            label=""
                            selected={row.is_active ? 'active' : 'inactive'}
                            onSelect={(value: string) =>
                                handleStatusChange(
                                    row.firebase_uid,
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
                            row.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {row.is_active ? 'Active' : 'Inactive'}
                    </span>
                ),
        },
        {
            field: 'last_login' as keyof UserData,
            header: 'Last Login',
            type: ColumnType.TEXT,
            isSortable: true,
            renderCell: (value: unknown, row: UserData) =>
                formatDate(row.last_login),
        },
        {
            field: 'created_at' as keyof UserData,
            header: 'Created',
            type: ColumnType.TEXT,
            isSortable: true,
            renderCell: (value: unknown, row: UserData) =>
                formatDate(row.created_at),
        },
    ]

    // Add actions column if user can manage users
    if (canManageUsers) {
        columns.push({
            field: 'firebase_uid' as keyof UserData,
            header: 'Actions',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: (value: unknown, row: UserData) => (
                <div className="flex items-center gap-2">
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text=""
                        leadingIcon={<Activity className="w-4 h-4" />}
                        onClick={() =>
                            router.push(`/users/${row.firebase_uid}/activity`)
                        }
                        title="View activity"
                    />
                </div>
            ),
        })
    }

    if (loading) {
        return <Loader fullScreen size="large" text="Loading users..." />
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Users DataTable */}
            <DataTable
                data={users as Record<string, unknown>[]}
                columns={columns as ColumnDefinition<Record<string, unknown>>[]}
                idField="firebase_uid"
                title="All Users"
                description={`${users.length} users in the system`}
                enableSearch={false}
                enableColumnManager={false}
                isHoverable={true}
                pagination={{
                    currentPage: 1,
                    pageSize: 10,
                    totalRows: users.length,
                    pageSizeOptions: [10, 20, 50],
                }}
                headerSlot1={
                    canManageUsers ? (
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            text="Invite User"
                            leadingIcon={<UserPlus className="w-4 h-4" />}
                            onClick={() => setShowInviteModal(true)}
                        />
                    ) : null
                }
            />

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

            {/* TODO: Add proper snackbar notifications once Snackbar component interface is fixed */}
        </div>
    )
}
