import { useState, useEffect } from 'react'
import { subscribeToEnvironmentStatus } from '@/lib/firebase-realtime'
import type { Environment } from '@/types'

export function useDeploymentStatus(environment: string) {
    const [status, setStatus] = useState<Environment | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        // Fetch initial data
        fetch(`/api/deployments/hosting?environment=${environment}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setStatus(data.status)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching deployment status:', err)
                setError('Failed to fetch deployment status')
                setLoading(false)
            })

        // Subscribe to real-time updates
        const unsubscribe = subscribeToEnvironmentStatus(
            environment,
            (newStatus) => {
                setStatus(newStatus)
            }
        )

        return () => {
            unsubscribe()
        }
    }, [environment])

    return { status, loading, error }
}

export function useAllEnvironmentStatuses() {
    const [statuses, setStatuses] = useState<
        Record<string, Environment | null>
    >({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        let unsubscribes: (() => void)[] = []

        // Fetch initial data
        fetch('/api/deployments/hosting')
            .then((res) => res.json())
            .then((data) => {
                if (data.environments) {
                    setStatuses(data.environments)

                    // Subscribe to real-time updates for all environments from initial data
                    const environments = Object.keys(data.environments)
                    unsubscribes = environments.map((env) =>
                        subscribeToEnvironmentStatus(env, (newStatus) => {
                            setStatuses((prev) => ({
                                ...prev,
                                [env]: newStatus,
                            }))
                        })
                    )
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching environment statuses:', err)
                setError('Failed to fetch environment statuses')
                setLoading(false)
            })

        // Cleanup function
        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe())
        }
    }, [])

    return { statuses, loading, error }
}
