import { useState, useEffect } from 'react'
import type { CloudFunction } from '@/types'

export function useFunctionsStatus() {
    const [functions, setFunctions] = useState<CloudFunction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch('/api/deployments/functions')
            .then((res) => res.json())
            .then((data) => {
                const allFunctions = [
                    ...(data.api || []),
                    ...(data.background || []),
                ]
                setFunctions(allFunctions)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching functions status:', err)
                setError('Failed to fetch functions status')
                setLoading(false)
            })
    }, [])

    const apiFunctions = functions.filter((f) => f.name.startsWith('/api/'))
    const backgroundFunctions = functions.filter(
        (f) => !f.name.startsWith('/api/')
    )

    return {
        functions,
        apiFunctions,
        backgroundFunctions,
        loading,
        error,
    }
}
