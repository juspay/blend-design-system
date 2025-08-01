'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/frontend/lib/firebase'
import { usePermissions } from '@/frontend/components/auth/PermissionGuard'
import ProtectedRoute from '@/frontend/components/auth/ProtectedRoute'
import Loader from '@/frontend/components/shared/Loader'
import { Button, ButtonType, ButtonSize } from 'blend-v1'
import { ArrowLeft, Activity, Clock, User as LucideUser } from 'lucide-react'

// Mock interfaces and services to replace the deleted ones
interface ActivityLog {
    id: string
    action: string
    timestamp: string
    details?: Record<string, unknown>
}

interface UserData {
    uid: string
    email: string
    displayName?: string
    photoURL?: string
    role?: string
}

// Mock services
const activityService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserActivity: async (_uid: string) => [],
    subscribeToUserActivity:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_uid: string, _callback: (activities: ActivityLog[]) => void) =>
            () => {},
    formatActivityMessage: (
        action: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _details?: Record<string, unknown>
    ) => `Activity: ${action}`,
}

const roleService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserData: async (_uid: string): Promise<UserData | null> => null,
}

export default function UserActivityPage() {
    return (
        <ProtectedRoute>
            <UserActivity />
        </ProtectedRoute>
    )
}

function UserActivity() {
    const params = useParams()
    const router = useRouter()
    const userId = params.userId as string

    const [activities, setActivities] = useState<ActivityLog[]>([])
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { canManageUsers } = usePermissions()

    // Check if user can view this activity
    const canViewActivity = userId === auth.currentUser?.uid || canManageUsers

    useEffect(() => {
        if (!canViewActivity) {
            setError("You do not have permission to view this user's activity")
            setLoading(false)
            return
        }

        const loadUserData = async () => {
            try {
                const data = await roleService.getUserData(userId)
                setUserData(data)
            } catch (error) {
                console.error('Error loading user data:', error)
            }
        }

        loadUserData()

        // Subscribe to real-time activity updates
        const unsubscribe = activityService.subscribeToUserActivity(
            userId,
            (activities: ActivityLog[]) => {
                setActivities(activities)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [userId, canViewActivity])

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60)
            return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
        if (diffHours < 24)
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getActivityIcon = (action: string) => {
        switch (action) {
            case 'user_login':
            case 'user_logout':
                return <LucideUser className="w-4 h-4" />
            case 'role_changed':
            case 'user_invited':
            case 'user_removed':
            case 'user_status_changed':
                return <LucideUser className="w-4 h-4" />
            default:
                return <Activity className="w-4 h-4" />
        }
    }

    const getActivityColor = (action: string) => {
        if (action.includes('login')) return 'text-green-600 bg-green-100'
        if (action.includes('logout')) return 'text-gray-600 bg-gray-100'
        if (action.includes('removed') || action.includes('delete'))
            return 'text-red-600 bg-red-100'
        if (action.includes('changed') || action.includes('updated'))
            return 'text-blue-600 bg-blue-100'
        if (action.includes('invited') || action.includes('created'))
            return 'text-purple-600 bg-purple-100'
        return 'text-gray-600 bg-gray-100'
    }

    if (loading) {
        return (
            <Loader fullScreen size="large" text="Loading user activity..." />
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-red-800 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-red-700">{error}</p>
                    <div className="mt-4">
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            text="Go Back"
                            leadingIcon={<ArrowLeft className="w-4 h-4" />}
                            onClick={() => router.push('/users')}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    text="Back to Users"
                    leadingIcon={<ArrowLeft className="w-4 h-4" />}
                    onClick={() => router.push('/users')}
                />

                <div className="mt-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        User Activity
                    </h1>
                    {userData && (
                        <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {userData.photoURL ? (
                                    <img
                                        src={userData.photoURL}
                                        alt={userData.displayName}
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-700">
                                            {userData.displayName?.charAt(0) ||
                                                userData.email
                                                    .charAt(0)
                                                    .toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {userData.displayName || 'No name'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {userData.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Activity Timeline
                </h2>

                {activities.length === 0 ? (
                    <div className="text-center py-12">
                        <Activity className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No activity yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            User activities will appear here as they occur.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-4"
                            >
                                <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.action)}`}
                                >
                                    {getActivityIcon(activity.action)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                        {activityService.formatActivityMessage(
                                            activity.action,
                                            activity.details
                                        )}
                                    </p>
                                    {activity.details &&
                                        Object.keys(activity.details).length >
                                            0 && (
                                            <div className="mt-1 text-xs text-gray-500">
                                                {Object.entries(
                                                    activity.details
                                                )
                                                    .filter(
                                                        ([key]) =>
                                                            ![
                                                                'targetUserId',
                                                                'userId',
                                                                'changedBy',
                                                                'invitedBy',
                                                                'removedBy',
                                                            ].includes(key)
                                                    )
                                                    .map(([key, value]) => (
                                                        <span
                                                            key={key}
                                                            className="mr-3"
                                                        >
                                                            {key}:{' '}
                                                            <span className="font-medium">
                                                                {String(value)}
                                                            </span>
                                                        </span>
                                                    ))}
                                            </div>
                                        )}
                                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        <span>
                                            {formatTimestamp(
                                                activity.timestamp
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
