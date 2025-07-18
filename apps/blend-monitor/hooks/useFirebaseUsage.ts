import { useState, useEffect } from 'react'
import type { FirebaseUsage } from '@/types'

export function useFirebaseUsage() {
    const [usage, setUsage] = useState<FirebaseUsage | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch('/api/deployments/usage')
            .then((res) => res.json())
            .then((data) => {
                if (data.usage) {
                    setUsage(data.usage)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching usage data:', err)
                setError('Failed to fetch usage data')
                setLoading(false)
            })
    }, [])

    return { usage, loading, error }
}

export function useUsageAlerts() {
    const [alerts, setAlerts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/deployments/usage', { method: 'PUT' })
            .then((res) => res.json())
            .then((data) => {
                if (data.alerts) {
                    setAlerts(data.alerts)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching usage alerts:', err)
                setLoading(false)
            })
    }, [])

    return { alerts, loading }
}
