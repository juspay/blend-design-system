import {
    getAdminAuth,
    getAdminDatabase,
    getAdminFirestore,
} from './firebase-admin'
import type {
    Environment,
    Deployment,
    CloudFunction,
    FirebaseUsage,
    PerformanceMetrics,
    AuditLog,
} from '@/types'
import { firebaseUsageClient } from './firebase-usage-client'
import { firebaseHostingClient } from './firebase-hosting-client'

// Get access token for Firebase APIs
async function getAccessToken(): Promise<string> {
    try {
        // For now, return empty string since Firebase Hosting API requires special setup
        // In production, you would set up proper OAuth2 authentication
        console.log(
            'Note: Firebase Hosting API requires OAuth2 setup for full functionality'
        )
        return process.env.FIREBASE_ACCESS_TOKEN || ''
    } catch (error) {
        console.error('Error getting access token:', error)
        return ''
    }
}

// Environment Status Functions
export async function getEnvironmentStatus(
    environmentName: string
): Promise<Environment | null> {
    try {
        // Check if we should use real Firebase data
        const useRealHostingData =
            process.env.USE_REAL_FIREBASE_HOSTING === 'true'

        if (useRealHostingData) {
            // Try to get real data from Firebase Hosting API
            const realStatus =
                await firebaseHostingClient.getRealEnvironmentStatus(
                    environmentName
                )
            if (realStatus) {
                // Optionally store this in the database for caching
                const db = getAdminDatabase()
                await db
                    .ref(`deployments/environments/${environmentName}`)
                    .update({
                        ...realStatus,
                        lastUpdated: Date.now(),
                        isRealData: true,
                    })
                return realStatus
            }
        }

        // Fallback to database data
        const db = getAdminDatabase()
        const snapshot = await db
            .ref(`deployments/environments/${environmentName}`)
            .once('value')
        return snapshot.val()
    } catch (error) {
        console.error('Error fetching environment status:', error)
        return null
    }
}

export async function updateEnvironmentStatus(
    environmentName: string,
    status: Partial<Environment>
): Promise<void> {
    try {
        const db = getAdminDatabase()
        await db.ref(`deployments/environments/${environmentName}`).update({
            ...status,
            lastUpdated: Date.now(),
        })
    } catch (error) {
        console.error('Error updating environment status:', error)
        throw error
    }
}

// Deployment History Functions
export async function getDeploymentHistory(
    limit: number = 50,
    environment?: string,
    source?: 'all' | 'database' | 'hosting' | string
): Promise<Deployment[]> {
    try {
        const db = getAdminDatabase()
        const deployments: Deployment[] = []

        // Fetch all deployments from Firebase Realtime Database
        const query = db
            .ref('deployments/history')
            .orderByChild('startTime')
            .limitToLast(limit * 2) // Get more to filter
        const snapshot = await query.once('value')

        snapshot.forEach((child: any) => {
            const deployment = child.val()

            // Apply filters
            const matchesEnvironment =
                !environment || deployment.environment === environment
            const matchesSource =
                !source ||
                source === 'all' ||
                (source === 'database' &&
                    (!deployment.source || deployment.source === 'database')) ||
                (source === 'hosting' && deployment.source === 'hosting') ||
                (source.startsWith('hosting-') &&
                    deployment.source === 'hosting' &&
                    deployment.environment === source.replace('hosting-', ''))

            if (matchesEnvironment && matchesSource) {
                // Ensure all deployments have proper source and service fields
                const enrichedDeployment = {
                    ...deployment,
                    id: child.key,
                    source: deployment.source || 'database',
                    service:
                        deployment.service ||
                        (deployment.source === 'hosting'
                            ? `Hosting: ${deployment.environment}`
                            : 'Realtime Database'),
                }
                deployments.push(enrichedDeployment)
            }
        })

        // Sort all deployments by startTime (newest first)
        deployments.sort(
            (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
        )

        // Return only the requested limit
        return deployments.slice(0, limit)
    } catch (error) {
        console.error('Error fetching deployment history:', error)
        return []
    }
}

// Get all Firebase Hosting sites from database
export async function getHostingSites(): Promise<any[]> {
    try {
        const db = getAdminDatabase()
        const snapshot = await db.ref('deployments/hosting_sites').once('value')
        const sites = snapshot.val()

        if (sites) {
            return Object.values(sites)
        }

        return []
    } catch (error) {
        console.error('Error fetching hosting sites:', error)
        return []
    }
}

export async function createDeployment(
    deployment: Omit<Deployment, 'id'>
): Promise<string> {
    try {
        const db = getAdminDatabase()
        const ref = await db.ref('deployments/history').push({
            ...deployment,
            timestamp: Date.now(),
        })

        // Update environment status
        await updateEnvironmentStatus(deployment.environment, {
            currentVersion: deployment.version,
            lastDeployment: deployment.startTime,
            status: deployment.status === 'success' ? 'healthy' : 'degraded',
        })

        return ref.key!
    } catch (error) {
        console.error('Error creating deployment:', error)
        throw error
    }
}

// Get Firebase Hosting releases from database
export async function getHostingReleases(siteId: string): Promise<any> {
    try {
        const db = getAdminDatabase()
        const snapshot = await db
            .ref(`deployments/hosting_releases/${siteId}`)
            .once('value')
        const releases = snapshot.val()

        if (releases) {
            return { releases: Object.values(releases) }
        }

        return { releases: [] }
    } catch (error) {
        console.error('Error fetching hosting releases:', error)
        return { releases: [] }
    }
}

// Cloud Functions Status
export async function getFunctionsStatus(): Promise<CloudFunction[]> {
    try {
        const db = getAdminDatabase()
        const snapshot = await db.ref('deployments/functions').once('value')
        const functions: CloudFunction[] = []

        snapshot.forEach((child: any) => {
            functions.push({ ...child.val(), name: child.key })
        })

        return functions
    } catch (error) {
        console.error('Error fetching functions status:', error)
        return []
    }
}

export async function updateFunctionMetrics(
    functionName: string,
    metrics: Partial<CloudFunction>
): Promise<void> {
    try {
        const db = getAdminDatabase()
        await db.ref(`deployments/functions/${functionName}`).update({
            ...metrics,
            lastUpdated: Date.now(),
        })
    } catch (error) {
        console.error('Error updating function metrics:', error)
        throw error
    }
}

// Performance Metrics
export async function getPerformanceMetrics(
    environment: string,
    timeRange: { start: number; end: number }
): Promise<PerformanceMetrics[]> {
    try {
        const firestore = getAdminFirestore()
        const metricsRef = firestore.collection('performance_metrics')

        const snapshot = await metricsRef
            .where('environment', '==', environment)
            .where('timestamp', '>=', timeRange.start)
            .where('timestamp', '<=', timeRange.end)
            .orderBy('timestamp', 'desc')
            .limit(100)
            .get()

        return snapshot.docs.map((doc: any) => doc.data() as PerformanceMetrics)
    } catch (error) {
        console.error('Error fetching performance metrics:', error)
        return []
    }
}

// Firebase Usage & Billing
export async function getFirebaseUsage(): Promise<FirebaseUsage | null> {
    try {
        // Check if we should use real data or fallback to stored data
        const useRealData = process.env.USE_REAL_FIREBASE_USAGE === 'true'

        if (useRealData) {
            // Get real usage data from Firebase Admin SDK
            const usage = await firebaseUsageClient.getAllUsageMetrics()

            // Optionally store this data for historical tracking
            const db = getAdminDatabase()
            await db.ref('deployments/usage/current').set({
                ...usage,
                lastUpdated: Date.now(),
                isRealData: true,
            })

            return usage
        } else {
            // Fallback to stored data
            const db = getAdminDatabase()
            const snapshot = await db
                .ref('deployments/usage/current')
                .once('value')
            return snapshot.val()
        }
    } catch (error) {
        console.error('Error fetching Firebase usage:', error)

        // If real data fetch fails, try to get stored data
        try {
            const db = getAdminDatabase()
            const snapshot = await db
                .ref('deployments/usage/current')
                .once('value')
            return snapshot.val()
        } catch (fallbackError) {
            console.error('Error fetching fallback usage data:', fallbackError)
            return null
        }
    }
}

export async function updateUsageMetrics(
    usage: Partial<FirebaseUsage>
): Promise<void> {
    try {
        const db = getAdminDatabase()
        await db.ref('deployments/usage/current').update({
            ...usage,
            lastUpdated: Date.now(),
        })
    } catch (error) {
        console.error('Error updating usage metrics:', error)
        throw error
    }
}

// Rollback Functionality
export async function rollbackDeployment(
    deploymentId: string,
    targetVersion: string,
    user: string
): Promise<void> {
    try {
        const db = getAdminDatabase()

        // Get the deployment details
        const deploymentSnapshot = await db
            .ref(`deployments/history/${deploymentId}`)
            .once('value')
        const deployment = deploymentSnapshot.val()

        if (!deployment) {
            throw new Error('Deployment not found')
        }

        // Create a new deployment record for the rollback
        const rollbackDeployment: Omit<Deployment, 'id'> = {
            environment: deployment.environment,
            version: targetVersion,
            deployer: {
                name: user,
                email: user,
            },
            startTime: new Date().toISOString(),
            status: 'in_progress',
            commitSha: deployment.commitSha,
            rollbackAvailable: false,
        }

        const rollbackId = await createDeployment(rollbackDeployment)

        // Log the rollback action
        await logAuditAction({
            action: 'rollback',
            user,
            details: {
                deploymentId,
                targetVersion,
                environment: deployment.environment,
            },
            result: 'success',
            resource: `deployment/${deploymentId}`,
        })

        // In a real implementation, you would trigger the actual rollback here
        // For now, we'll just update the status
        setTimeout(async () => {
            await db.ref(`deployments/history/${rollbackId}`).update({
                status: 'success',
                endTime: new Date().toISOString(),
                duration: 180, // 3 minutes
            })
        }, 3000)
    } catch (error) {
        console.error('Error rolling back deployment:', error)
        throw error
    }
}

// Audit Logging
export async function logAuditAction(
    log: Omit<AuditLog, 'id' | 'timestamp'>
): Promise<void> {
    try {
        const db = getAdminDatabase()
        await db.ref('audit_logs/deployments').push({
            ...log,
            timestamp: Date.now(),
        })
    } catch (error) {
        console.error('Error logging audit action:', error)
        throw error
    }
}

export async function getAuditLogs(
    limit: number = 50,
    action?: string
): Promise<AuditLog[]> {
    try {
        const db = getAdminDatabase()
        const query = db
            .ref('audit_logs/deployments')
            .orderByChild('timestamp')
            .limitToLast(limit)

        const snapshot = await query.once('value')
        const logs: AuditLog[] = []

        snapshot.forEach((child: any) => {
            const log = child.val()
            if (!action || log.action === action) {
                logs.push({ ...log, id: child.key })
            }
        })

        return logs.reverse()
    } catch (error) {
        console.error('Error fetching audit logs:', error)
        return []
    }
}

// Real-time subscriptions
export function subscribeToEnvironmentStatus(
    environment: string,
    callback: (status: Environment) => void
): () => void {
    const db = getAdminDatabase()
    const ref = db.ref(`deployments/environments/${environment}`)

    const listener = ref.on('value', (snapshot: any) => {
        const status = snapshot.val()
        if (status) {
            callback(status)
        }
    })

    // Return unsubscribe function
    return () => ref.off('value', listener)
}

export function subscribeToDeploymentUpdates(
    callback: (deployment: Deployment) => void
): () => void {
    const db = getAdminDatabase()
    const ref = db.ref('deployments/history')

    const listener = ref.on('child_added', (snapshot: any) => {
        const deployment = snapshot.val()
        if (deployment) {
            callback({ ...deployment, id: snapshot.key })
        }
    })

    // Return unsubscribe function
    return () => ref.off('child_added', listener)
}
