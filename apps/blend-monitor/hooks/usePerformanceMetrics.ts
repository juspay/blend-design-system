import { useState, useEffect } from 'react'
import type { PerformanceMetrics } from '@/types'

export function usePerformanceMetrics(
    environment: string = 'production',
    hours: number = 24
) {
    const [metrics, setMetrics] = useState<PerformanceMetrics[]>([])
    const [aggregated, setAggregated] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch(
            `/api/deployments/performance?environment=${environment}&hours=${hours}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.metrics) {
                    setAggregated(data.metrics)
                }
                if (data.raw) {
                    setMetrics(data.raw)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching performance metrics:', err)
                setError('Failed to fetch performance metrics')
                setLoading(false)
            })
    }, [environment, hours])

    return { metrics, aggregated, loading, error }
}
