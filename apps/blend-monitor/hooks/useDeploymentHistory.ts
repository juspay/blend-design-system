// Mock implementation to replace Firebase realtime functionality
import { useState, useEffect } from 'react'
import type { Deployment } from '@/types'

// Mock subscription function
const subscribeToDeploymentUpdates = (callback: (data: any) => void) => {
    // Return empty unsubscribe function
    return () => {}
}

export function useDeploymentHistory(
    limit: number = 50,
    environment?: string,
    source?: string
) {
    const [deployments, setDeployments] = useState<Deployment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        // Fetch initial data
        const params = new URLSearchParams()
        params.append('limit', limit.toString())
        if (environment) {
            params.append('environment', environment)
        }
        if (source) {
            params.append('source', source)
        }

        fetch(`/api/deployments/history?${params}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.deployments) {
                    setDeployments(data.deployments)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching deployment history:', err)
                setError('Failed to fetch deployment history')
                setLoading(false)
            })

        // Subscribe to new deployments (only for database source)
        if (!source || source === 'all' || source === 'database') {
            const unsubscribe = subscribeToDeploymentUpdates(
                (newDeployment) => {
                    // Only add if it matches the filters
                    if (
                        (!environment ||
                            newDeployment.environment === environment) &&
                        (!source || source === 'all' || source === 'database')
                    ) {
                        setDeployments((prev) => {
                            // Add to beginning and limit array size
                            const updated = [
                                {
                                    ...newDeployment,
                                    source: 'database' as const,
                                    service: 'Realtime Database',
                                },
                                ...prev,
                            ]
                            return updated.slice(0, limit)
                        })
                    }
                }
            )

            return () => {
                unsubscribe()
            }
        }
    }, [limit, environment, source])

    const rollbackDeployment = async (
        deploymentId: string,
        targetVersion: string
    ) => {
        try {
            const response = await fetch('/api/deployments/rollback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deploymentId,
                    targetVersion,
                }),
            })

            if (!response.ok) {
                throw new Error('Rollback failed')
            }

            return await response.json()
        } catch (err) {
            console.error('Error during rollback:', err)
            throw err
        }
    }

    return {
        deployments,
        loading,
        error,
        rollbackDeployment,
    }
}

export function useLatestDeployment(environment?: string) {
    const { deployments, loading, error } = useDeploymentHistory(1, environment)

    return {
        deployment: deployments[0] || null,
        loading,
        error,
    }
}
