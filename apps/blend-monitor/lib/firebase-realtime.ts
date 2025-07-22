// Client-side Firebase Realtime Database subscriptions
import { database } from './firebase'
import { ref, onValue, off } from 'firebase/database'
import type { Environment, Deployment } from '@/types'

export function subscribeToEnvironmentStatus(
    environment: string,
    callback: (status: Environment) => void
): () => void {
    if (!database) {
        // Return no-op unsubscribe function if database is not available
        return () => {}
    }

    const envRef = ref(database, `deployments/environments/${environment}`)

    const listener = onValue(envRef, (snapshot) => {
        const status = snapshot.val()
        if (status) {
            callback(status)
        }
    })

    // Return unsubscribe function
    return () => off(envRef, 'value', listener)
}

export function subscribeToDeploymentUpdates(
    callback: (deployment: Deployment) => void
): () => void {
    if (!database) {
        // Return no-op unsubscribe function if database is not available
        return () => {}
    }

    const deploymentsRef = ref(database, 'deployments/history')

    const listener = onValue(deploymentsRef, (snapshot) => {
        const deployments = snapshot.val()
        if (deployments) {
            // Get the most recent deployment
            const deploymentIds = Object.keys(deployments)
            const latestId = deploymentIds[deploymentIds.length - 1]
            if (latestId) {
                callback({ ...deployments[latestId], id: latestId })
            }
        }
    })

    // Return unsubscribe function
    return () => off(deploymentsRef, 'value', listener)
}
