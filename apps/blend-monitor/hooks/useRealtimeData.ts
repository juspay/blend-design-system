import { useEffect, useState } from 'react'
import { database } from '@/lib/firebase'
import { ref, onValue, off, DataSnapshot } from 'firebase/database'
import { CoverageMetrics, ComponentInfo, PackageStats, Activity } from '@/types'

// Hook for component coverage data
export function useComponentCoverage() {
    const [coverage, setCoverage] = useState<CoverageMetrics | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const coverageRef = ref(database, 'blend-monitor/coverage/summary')

        const unsubscribe = onValue(
            coverageRef,
            (snapshot: DataSnapshot) => {
                const data = snapshot.val()
                if (data) {
                    setCoverage(data)
                }
                setLoading(false)
            },
            (error) => {
                console.error('Error fetching coverage:', error)
                setError(error.message)
                setLoading(false)
            }
        )

        return () => off(coverageRef, 'value', unsubscribe)
    }, [])

    return { coverage, loading, error }
}

// Hook for components list
export function useComponents() {
    const [components, setComponents] = useState<ComponentInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const componentsRef = ref(database, 'blend-monitor/components')

        const unsubscribe = onValue(
            componentsRef,
            (snapshot: DataSnapshot) => {
                const data = snapshot.val()
                if (data) {
                    const componentsList = Object.entries(data).map(
                        ([id, comp]: [string, any]) => ({
                            id,
                            name: comp.info.name,
                            path: comp.info.path,
                            category: comp.info.category,
                            lastModified: comp.info.lastModified,
                            hasStorybook: comp.integration.hasStorybook,
                            hasFigmaConnect: comp.integration.hasFigmaConnect,
                            hasTests: comp.integration.hasTests,
                        })
                    )
                    setComponents(componentsList)
                }
                setLoading(false)
            },
            (error) => {
                console.error('Error fetching components:', error)
                setError(error.message)
                setLoading(false)
            }
        )

        return () => off(componentsRef, 'value', unsubscribe)
    }, [])

    return { components, loading, error }
}

// Hook for NPM package stats
export function usePackageStats() {
    const [packageStats, setPackageStats] = useState<PackageStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const publishingRef = ref(database, 'blend-monitor/publishing')

        const unsubscribe = onValue(
            publishingRef,
            (snapshot: DataSnapshot) => {
                const data = snapshot.val()
                if (data) {
                    setPackageStats({
                        name: 'blend-v1',
                        version: data.current?.version || '',
                        downloads: data.downloads || {
                            daily: 0,
                            weekly: 0,
                            monthly: 0,
                            total: 0,
                        },
                        size: data.current?.size || { unpacked: 0, gzipped: 0 },
                        dependencies: data.current?.dependencies || 0,
                        lastPublish: data.current?.publishedAt || '',
                    })
                }
                setLoading(false)
            },
            (error) => {
                console.error('Error fetching package stats:', error)
                setError(error.message)
                setLoading(false)
            }
        )

        return () => off(publishingRef, 'value', unsubscribe)
    }, [])

    return { packageStats, loading, error }
}

// Hook for download trends
export function useDownloadTrends() {
    const [trends, setTrends] = useState<
        Array<{ date: string; downloads: number }>
    >([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const trendsRef = ref(
            database,
            'blend-monitor/publishing/trends/downloads'
        )

        const unsubscribe = onValue(trendsRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data && Array.isArray(data)) {
                setTrends(data)
            }
            setLoading(false)
        })

        return () => off(trendsRef, 'value', unsubscribe)
    }, [])

    return { trends, loading }
}

// Hook for version history
export function useVersionHistory() {
    const [versions, setVersions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const versionsRef = ref(database, 'blend-monitor/publishing/versions')

        const unsubscribe = onValue(versionsRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                const versionsList = Object.entries(data)
                    .map(([versionKey, info]: [string, any]) => ({
                        version: info.version || versionKey.replace(/_/g, '.'), // Use stored version or convert key back
                        ...info,
                    }))
                    .sort(
                        (a, b) =>
                            new Date(b.publishedAt).getTime() -
                            new Date(a.publishedAt).getTime()
                    )
                setVersions(versionsList)
            }
            setLoading(false)
        })

        return () => off(versionsRef, 'value', unsubscribe)
    }, [])

    return { versions, loading }
}

// Hook for recent activity
export function useRecentActivity(limit: number = 10) {
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const activityRef = ref(database, 'blend-monitor/activity/recent')

        const unsubscribe = onValue(activityRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                const activityList = Object.entries(data)
                    .map(([id, activity]: [string, any]) => ({
                        id,
                        ...activity,
                    }))
                    .sort(
                        (a, b) =>
                            new Date(b.timestamp).getTime() -
                            new Date(a.timestamp).getTime()
                    )
                    .slice(0, limit)
                setActivities(activityList)
            }
            setLoading(false)
        })

        return () => off(activityRef, 'value', unsubscribe)
    }, [limit])

    return { activities, loading }
}

// Hook for category-wise coverage
export function useCategoryCoverage() {
    const [categories, setCategories] = useState<
        Record<string, { total: number; integrated: number }>
    >({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const categoryRef = ref(database, 'blend-monitor/coverage/byCategory')

        const unsubscribe = onValue(categoryRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                setCategories(data)
            }
            setLoading(false)
        })

        return () => off(categoryRef, 'value', unsubscribe)
    }, [])

    return { categories, loading }
}
