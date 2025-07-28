import { useEffect, useState, useCallback, useRef } from 'react'
import {
    CoverageMetrics,
    ComponentInfo,
    PackageStats,
    Activity,
} from '../../shared/types'
import { authenticatedFetch } from '../lib/api-client'

// Hook configuration
const POLLING_INTERVALS = {
    components: 30000, // 30 seconds
    coverage: 60000, // 1 minute
    packageStats: 300000, // 5 minutes
    activity: 15000, // 15 seconds
    trends: 600000, // 10 minutes
} as const

// Generic polling hook with intelligent caching
function usePolling<T>(
    fetchFunction: () => Promise<T>,
    interval: number,
    dependencies: unknown[] = []
) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const mountedRef = useRef(true)

    const fetchData = useCallback(async () => {
        try {
            setError(null)
            const result = await fetchFunction()
            if (mountedRef.current) {
                setData(result)
                setLoading(false)
            }
        } catch (err) {
            if (mountedRef.current) {
                console.error('Polling error:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
                setLoading(false)
            }
        }
    }, dependencies)

    useEffect(() => {
        mountedRef.current = true

        // Initial fetch
        fetchData()

        // Set up polling
        intervalRef.current = setInterval(fetchData, interval)

        return () => {
            mountedRef.current = false
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, dependencies)

    const refetch = useCallback(() => {
        fetchData()
    }, [fetchData])

    return { data, loading, error, refetch }
}

// Hook for component coverage data
export function useComponentCoverage() {
    const fetchCoverage = useCallback(async (): Promise<CoverageMetrics> => {
        const response = await authenticatedFetch('/api/components/coverage')
        if (!response.ok) {
            throw new Error('Failed to fetch coverage data')
        }
        return response.json()
    }, [])

    const {
        data: coverage,
        loading,
        error,
        refetch,
    } = usePolling(fetchCoverage, POLLING_INTERVALS.coverage)

    return { coverage, loading, error, refetch }
}

// Hook for components list
export function useComponents() {
    const fetchComponents = useCallback(async (): Promise<ComponentInfo[]> => {
        const response = await authenticatedFetch('/api/components')
        if (!response.ok) {
            throw new Error('Failed to fetch components')
        }
        const data = await response.json()
        return data.components || []
    }, [])

    const {
        data: components,
        loading,
        error,
        refetch,
    } = usePolling(fetchComponents, POLLING_INTERVALS.components)

    return {
        components: components || [],
        loading,
        error,
        refetch,
    }
}

// Hook for NPM package stats
export function usePackageStats() {
    const fetchPackageStats =
        useCallback(async (): Promise<PackageStats | null> => {
            const response = await authenticatedFetch('/api/npm/stats')

            if (!response.ok) {
                if (response.status === 503) {
                    // Service unavailable - both database and NPM failed
                    const errorData = await response.json()
                    throw new Error(
                        `Service unavailable: ${errorData.details?.suggestion || 'Data sources unavailable'}`
                    )
                }
                throw new Error(
                    `HTTP ${response.status}: Failed to fetch package stats`
                )
            }

            const data = await response.json()

            // Check if response is an error object instead of stats
            if (data.error) {
                throw new Error(data.error)
            }

            return data
        }, [])

    const {
        data: packageStats,
        loading,
        error,
        refetch,
    } = usePolling(fetchPackageStats, POLLING_INTERVALS.packageStats)

    return { packageStats, loading, error, refetch }
}

// Hook for download trends
export function useDownloadTrends() {
    const fetchTrends = useCallback(async (): Promise<
        { date: string; downloads: number }[]
    > => {
        const response = await authenticatedFetch('/api/npm/trends')

        if (!response.ok) {
            if (response.status === 503) {
                // Service unavailable - both database and NPM failed
                const errorData = await response.json()
                throw new Error(
                    `Service unavailable: ${errorData.details?.suggestion || 'Data sources unavailable'}`
                )
            }
            throw new Error(
                `HTTP ${response.status}: Failed to fetch download trends`
            )
        }

        const data = await response.json()

        // Check if response is an error object instead of array
        if (data.error) {
            throw new Error(data.error)
        }

        return Array.isArray(data) ? data : []
    }, [])

    const {
        data: trends,
        loading,
        error,
        refetch,
    } = usePolling(fetchTrends, POLLING_INTERVALS.trends)

    return {
        trends: trends || [],
        loading,
        error,
        refetch,
    }
}

// Hook for version history
export function useVersionHistory() {
    const fetchVersions = useCallback(async (): Promise<
        {
            version: string
            publishedAt: string
            publisher: string
            downloads: number
            changelog?: string
            size?: {
                unpacked: number
                gzipped: number
            }
            breaking?: boolean
        }[]
    > => {
        const response = await authenticatedFetch('/api/npm/versions')

        if (!response.ok) {
            if (response.status === 503) {
                // Service unavailable - both database and NPM failed
                const errorData = await response.json()
                throw new Error(
                    `Service unavailable: ${errorData.details?.suggestion || 'Data sources unavailable'}`
                )
            }
            throw new Error(
                `HTTP ${response.status}: Failed to fetch version history`
            )
        }

        const data = await response.json()

        // Check if response is an error object instead of array
        if (data.error) {
            throw new Error(data.error)
        }

        return Array.isArray(data) ? data : []
    }, [])

    const {
        data: versions,
        loading,
        error,
        refetch,
    } = usePolling(
        fetchVersions,
        POLLING_INTERVALS.trends // Use same interval as trends
    )

    return {
        versions: versions || [],
        loading,
        error,
        refetch,
    }
}

// Hook for recent activity
export function useRecentActivity(limit: number = 10) {
    const fetchActivity = useCallback(async (): Promise<Activity[]> => {
        const response = await authenticatedFetch(
            `/api/activity/recent?limit=${limit}`
        )
        if (!response.ok) {
            throw new Error('Failed to fetch recent activity')
        }
        return response.json()
    }, [limit])

    const {
        data: activities,
        loading,
        error,
        refetch,
    } = usePolling(fetchActivity, POLLING_INTERVALS.activity, [limit])

    return {
        activities: activities || [],
        loading,
        error,
        refetch,
    }
}

// Hook for category-wise coverage
export function useCategoryCoverage() {
    const fetchCategories = useCallback(async (): Promise<
        Record<string, { total: number; integrated: number }>
    > => {
        const response = await authenticatedFetch(
            '/api/components/coverage/categories'
        )
        if (!response.ok) {
            throw new Error('Failed to fetch category coverage')
        }
        return response.json()
    }, [])

    const {
        data: categories,
        loading,
        error,
        refetch,
    } = usePolling(fetchCategories, POLLING_INTERVALS.coverage)

    return {
        categories: categories || {},
        loading,
        error,
        refetch,
    }
}

// Hook for user activity (specific user)
export function useUserActivity(userId: string, limit: number = 50) {
    const fetchUserActivity = useCallback(async (): Promise<Activity[]> => {
        if (!userId) return []

        const response = await authenticatedFetch(
            `/api/users/${userId}/activity?limit=${limit}`
        )
        if (!response.ok) {
            throw new Error('Failed to fetch user activity')
        }
        return response.json()
    }, [userId, limit])

    const {
        data: activities,
        loading,
        error,
        refetch,
    } = usePolling(fetchUserActivity, POLLING_INTERVALS.activity, [
        userId,
        limit,
    ])

    return {
        activities: activities || [],
        loading,
        error,
        refetch,
    }
}

// Hook for real-time-like updates with background refresh
export function useRealtimeUpdates() {
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

    // Trigger updates for all data
    const triggerUpdate = useCallback(() => {
        setLastUpdate(new Date())
        // Broadcast custom event for other hooks to listen to
        window.dispatchEvent(new CustomEvent('data-update'))
    }, [])

    // Listen for manual refresh triggers
    useEffect(() => {
        const handleDataUpdate = () => {
            setLastUpdate(new Date())
        }

        window.addEventListener('data-update', handleDataUpdate)
        return () => {
            window.removeEventListener('data-update', handleDataUpdate)
        }
    }, [])

    return { lastUpdate, triggerUpdate }
}

// Enhanced hook that responds to manual refresh events
function usePollingWithRefresh<T>(
    fetchFunction: () => Promise<T>,
    interval: number,
    dependencies: unknown[] = []
) {
    const baseHook = usePolling(fetchFunction, interval, dependencies)

    // Listen for manual refresh events
    useEffect(() => {
        const handleDataUpdate = () => {
            baseHook.refetch()
        }

        window.addEventListener('data-update', handleDataUpdate)
        return () => {
            window.removeEventListener('data-update', handleDataUpdate)
        }
    }, [baseHook])

    return baseHook
}

// Export enhanced versions of hooks that respond to manual refresh
export function useComponentsWithRefresh() {
    const fetchComponents = useCallback(async (): Promise<ComponentInfo[]> => {
        const response = await authenticatedFetch('/api/components')
        if (!response.ok) {
            throw new Error('Failed to fetch components')
        }
        const data = await response.json()
        return data.components || []
    }, [])

    const {
        data: components,
        loading,
        error,
        refetch,
    } = usePollingWithRefresh(fetchComponents, POLLING_INTERVALS.components)

    return {
        components: components || [],
        loading,
        error,
        refetch,
    }
}

export function usePackageStatsWithRefresh() {
    const fetchPackageStats =
        useCallback(async (): Promise<PackageStats | null> => {
            const response = await authenticatedFetch('/api/npm/stats')
            if (!response.ok) {
                throw new Error('Failed to fetch package stats')
            }
            return response.json()
        }, [])

    const {
        data: packageStats,
        loading,
        error,
        refetch,
    } = usePollingWithRefresh(fetchPackageStats, POLLING_INTERVALS.packageStats)

    return { packageStats, loading, error, refetch }
}

// Utility hook for triggering global data refresh
export function useDataRefresh() {
    const triggerRefresh = useCallback(async (endpoint?: string) => {
        try {
            if (endpoint) {
                // Refresh specific endpoint
                await authenticatedFetch(endpoint, { method: 'POST' })
            } else {
                // Refresh all data sources
                await Promise.allSettled([
                    authenticatedFetch('/api/components', { method: 'POST' }),
                    authenticatedFetch('/api/npm', { method: 'POST' }),
                ])
            }

            // Trigger update event
            window.dispatchEvent(new CustomEvent('data-update'))

            return true
        } catch (error) {
            console.error('Failed to refresh data:', error)
            return false
        }
    }, [])

    return { triggerRefresh }
}

// User management hooks
export function useUsers() {
    const fetchUsers = useCallback(async () => {
        const response = await authenticatedFetch('/api/users')
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`)
        }
        const data = await response.json()
        if (data.success) {
            return data.users
        } else {
            throw new Error(data.error || 'Failed to fetch users')
        }
    }, [])

    const {
        data: users,
        loading,
        error,
        refetch,
    } = usePolling(
        fetchUsers,
        60000 // Refresh every minute
    )

    return {
        users: users || [],
        loading,
        error,
        refresh: refetch,
    }
}

export function useUserManagement() {
    const { users, loading, error, refresh } = useUsers()

    const updateUserRole = useCallback(
        async (userId: string, role: string) => {
            try {
                const response = await authenticatedFetch(
                    `/api/users/${userId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ role }),
                    }
                )

                if (!response.ok) {
                    throw new Error(
                        `Failed to update user role: ${response.statusText}`
                    )
                }

                const data = await response.json()
                if (data.success) {
                    refresh() // Refresh the users list
                    return data.user
                } else {
                    throw new Error(data.error || 'Failed to update user role')
                }
            } catch (err) {
                console.error('Error updating user role:', err)
                throw err
            }
        },
        [refresh]
    )

    const updateUserStatus = useCallback(
        async (userId: string, isActive: boolean) => {
            try {
                const response = await authenticatedFetch(
                    `/api/users/${userId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ is_active: isActive }),
                    }
                )

                if (!response.ok) {
                    throw new Error(
                        `Failed to update user status: ${response.statusText}`
                    )
                }

                const data = await response.json()
                if (data.success) {
                    refresh() // Refresh the users list
                    return data.user
                } else {
                    throw new Error(
                        data.error || 'Failed to update user status'
                    )
                }
            } catch (err) {
                console.error('Error updating user status:', err)
                throw err
            }
        },
        [refresh]
    )

    const createUser = useCallback(
        async (userData: {
            firebase_uid: string
            email: string
            display_name?: string
            photo_url?: string
            role?: string
        }) => {
            try {
                const response = await authenticatedFetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })

                if (!response.ok) {
                    throw new Error(
                        `Failed to create user: ${response.statusText}`
                    )
                }

                const data = await response.json()
                if (data.success) {
                    refresh() // Refresh the users list
                    return data.user
                } else {
                    throw new Error(data.error || 'Failed to create user')
                }
            } catch (err) {
                console.error('Error creating user:', err)
                throw err
            }
        },
        [refresh]
    )

    const deleteUser = useCallback(
        async (userId: string) => {
            try {
                const response = await authenticatedFetch(
                    `/api/users/${userId}`,
                    {
                        method: 'DELETE',
                    }
                )

                if (!response.ok) {
                    throw new Error(
                        `Failed to delete user: ${response.statusText}`
                    )
                }

                const data = await response.json()
                if (data.success) {
                    refresh() // Refresh the users list
                    return true
                } else {
                    throw new Error(data.error || 'Failed to delete user')
                }
            } catch (err) {
                console.error('Error deleting user:', err)
                throw err
            }
        },
        [refresh]
    )

    return {
        users,
        loading,
        error,
        refresh,
        updateUserRole,
        updateUserStatus,
        createUser,
        deleteUser,
    }
}
