import {
    getDatabase,
    ref,
    push,
    set,
    get,
    query,
    orderByChild,
    limitToLast,
    onValue,
    off,
} from 'firebase/database'
import { app } from './firebase'

export interface ActivityLog {
    id?: string
    action: ActivityAction
    timestamp: string
    details?: Record<string, any>
    metadata?: {
        ip?: string
        userAgent?: string
        location?: string
    }
}

export enum ActivityAction {
    // Auth activities
    USER_LOGIN = 'user_login',
    USER_LOGOUT = 'user_logout',
    USER_REGISTERED = 'user_registered',

    // Role activities
    ROLE_CHANGED = 'role_changed',
    USER_INVITED = 'user_invited',
    USER_REMOVED = 'user_removed',
    USER_STATUS_CHANGED = 'user_status_changed',

    // Deployment activities
    DEPLOYMENT_CREATED = 'deployment_created',
    DEPLOYMENT_ROLLED_BACK = 'deployment_rolled_back',
    DEPLOYMENT_PROMOTED = 'deployment_promoted',

    // Component activities
    COMPONENT_VIEWED = 'component_viewed',
    COMPONENT_COPIED = 'component_copied',

    // System activities
    SETTINGS_UPDATED = 'settings_updated',
    API_KEY_GENERATED = 'api_key_generated',
}

export class ActivityService {
    private db = getDatabase(app)

    // Log user activity
    async logUserActivity(
        userId: string,
        action: ActivityAction,
        details?: Record<string, any>,
        metadata?: ActivityLog['metadata']
    ): Promise<void> {
        try {
            const activityRef = ref(this.db, `users/${userId}/activity`)
            const newActivity: ActivityLog = {
                action,
                timestamp: new Date().toISOString(),
            }

            // Only add optional fields if they have values
            if (details && Object.keys(details).length > 0) {
                newActivity.details = details
            }

            if (metadata && Object.keys(metadata).length > 0) {
                newActivity.metadata = metadata
            }

            await push(activityRef, newActivity)
        } catch (error) {
            console.error('Error logging user activity:', error)
            // Don't throw - activity logging should not break the app
        }
    }

    // Log system-wide activity (not tied to a specific user)
    async logSystemActivity(
        action: ActivityAction,
        details?: Record<string, any>
    ): Promise<void> {
        try {
            const activityRef = ref(this.db, 'system_activity')
            const newActivity: ActivityLog = {
                action,
                timestamp: new Date().toISOString(),
                details,
            }

            await push(activityRef, newActivity)
        } catch (error) {
            console.error('Error logging system activity:', error)
        }
    }

    // Get user activities
    async getUserActivities(
        userId: string,
        limit: number = 50
    ): Promise<ActivityLog[]> {
        try {
            const activityRef = ref(this.db, `users/${userId}/activity`)
            const recentQuery = query(
                activityRef,
                orderByChild('timestamp'),
                limitToLast(limit)
            )

            const snapshot = await get(recentQuery)
            if (!snapshot.exists()) return []

            const activities: ActivityLog[] = []
            snapshot.forEach((child) => {
                activities.push({
                    id: child.key!,
                    ...child.val(),
                })
            })

            // Return in reverse chronological order
            return activities.reverse()
        } catch (error) {
            console.error('Error getting user activities:', error)
            return []
        }
    }

    // Subscribe to user activities (real-time)
    subscribeToUserActivities(
        userId: string,
        callback: (activities: ActivityLog[]) => void,
        limit: number = 50
    ): () => void {
        const activityRef = ref(this.db, `users/${userId}/activity`)
        const recentQuery = query(
            activityRef,
            orderByChild('timestamp'),
            limitToLast(limit)
        )

        const unsubscribe = onValue(recentQuery, (snapshot) => {
            const activities: ActivityLog[] = []
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    activities.push({
                        id: child.key!,
                        ...child.val(),
                    })
                })
            }
            callback(activities.reverse())
        })

        return () => off(recentQuery, 'value', unsubscribe)
    }

    // Get all activities (admin only)
    async getAllActivities(limit: number = 100): Promise<ActivityLog[]> {
        try {
            const activities: ActivityLog[] = []

            // Get all user activities
            const usersRef = ref(this.db, 'users')
            const usersSnapshot = await get(usersRef)

            if (usersSnapshot.exists()) {
                const userPromises: Promise<void>[] = []

                usersSnapshot.forEach((userChild) => {
                    const userId = userChild.key!
                    const promise = this.getUserActivities(userId, limit).then(
                        (userActivities) => {
                            userActivities.forEach((activity) => {
                                activities.push({
                                    ...activity,
                                    details: {
                                        ...activity.details,
                                        userId,
                                    },
                                })
                            })
                        }
                    )
                    userPromises.push(promise)
                })

                await Promise.all(userPromises)
            }

            // Sort by timestamp
            return activities
                .sort(
                    (a, b) =>
                        new Date(b.timestamp).getTime() -
                        new Date(a.timestamp).getTime()
                )
                .slice(0, limit)
        } catch (error) {
            console.error('Error getting all activities:', error)
            return []
        }
    }

    // Clean up old activities (to be run periodically)
    async cleanupOldActivities(daysToKeep: number = 90): Promise<void> {
        try {
            const cutoffDate = new Date()
            cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)
            const cutoffTimestamp = cutoffDate.toISOString()

            // This would need to be implemented with Cloud Functions
            // for better performance and to avoid client-side deletion
            console.log(
                `Would clean up activities older than ${cutoffTimestamp}`
            )
        } catch (error) {
            console.error('Error cleaning up activities:', error)
        }
    }

    // Helper method to format activity messages
    formatActivityMessage(activity: ActivityLog): string {
        switch (activity.action) {
            case ActivityAction.USER_LOGIN:
                return 'Signed in'
            case ActivityAction.USER_LOGOUT:
                return 'Signed out'
            case ActivityAction.ROLE_CHANGED:
                return `Role changed from ${activity.details?.from} to ${activity.details?.to}`
            case ActivityAction.USER_INVITED:
                return `Invited ${activity.details?.email} as ${activity.details?.role}`
            case ActivityAction.USER_REMOVED:
                return `Removed user ${activity.details?.email}`
            case ActivityAction.USER_STATUS_CHANGED:
                return `Status changed to ${activity.details?.isActive ? 'Active' : 'Inactive'}`
            case ActivityAction.DEPLOYMENT_CREATED:
                return `Created deployment to ${activity.details?.environment}`
            case ActivityAction.DEPLOYMENT_ROLLED_BACK:
                return `Rolled back deployment in ${activity.details?.environment}`
            default:
                return activity.action.replace(/_/g, ' ')
        }
    }
}

export const activityService = new ActivityService()
