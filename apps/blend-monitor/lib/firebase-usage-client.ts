import {
    getAdminAuth,
    getAdminDatabase,
    getAdminFirestore,
    getAdminStorage,
} from './firebase-admin'
import type { FirebaseUsage } from '@/types'
import { PricingCalculator } from './pricing-calculator'

interface DatabaseStats {
    sizeBytes: number
    bandwidth: number
    connections: number
}

interface FirestoreStats {
    documentCount: number
    sizeBytes: number
    reads: number
    writes: number
}

interface StorageStats {
    totalBytes: number
    objectCount: number
    bandwidth: number
}

interface AuthStats {
    totalUsers: number
    activeUsers: number
    providerStats: Record<string, number>
}

export class FirebaseUsageClient {
    private cache: Map<string, { data: any; timestamp: number }> = new Map()
    private CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

    private getCached<T>(key: string): T | null {
        const cached = this.cache.get(key)
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data as T
        }
        return null
    }

    private setCache(key: string, data: any): void {
        this.cache.set(key, { data, timestamp: Date.now() })
    }

    async getRealtimeDatabaseUsage(): Promise<DatabaseStats> {
        const cacheKey = 'realtimedb-usage'
        const cached = this.getCached<DatabaseStats>(cacheKey)
        if (cached) return cached

        try {
            const db = getAdminDatabase()

            // Get database size by reading root and calculating
            const snapshot = await db.ref('/').once('value')
            const data = snapshot.val()
            const sizeBytes = this.estimateObjectSize(data)

            // Note: Bandwidth and connections would need Firebase monitoring API
            // For now, we'll use estimates based on activity
            const stats: DatabaseStats = {
                sizeBytes,
                bandwidth: 0, // Would need monitoring API
                connections: 0, // Would need monitoring API
            }

            this.setCache(cacheKey, stats)
            return stats
        } catch (error) {
            console.error('Error fetching Realtime Database usage:', error)
            return { sizeBytes: 0, bandwidth: 0, connections: 0 }
        }
    }

    async getFirestoreUsage(): Promise<FirestoreStats> {
        const cacheKey = 'firestore-usage'
        const cached = this.getCached<FirestoreStats>(cacheKey)
        if (cached) return cached

        try {
            const firestore = getAdminFirestore()

            // Get document count and estimate size
            let documentCount = 0
            let estimatedSize = 0

            // Try to list collections first
            try {
                const collections = await firestore.listCollections()

                for (const collection of collections) {
                    try {
                        const snapshot = await collection.count().get()
                        const count = snapshot.data().count
                        documentCount += count

                        // Estimate size (rough approximation)
                        estimatedSize += count * 1024 // Assume 1KB per doc average

                        console.log(
                            `Collection ${collection.id}: ${count} documents`
                        )
                    } catch (err) {
                        console.log(
                            `Error counting documents in ${collection.id}:`,
                            err
                        )
                    }
                }
            } catch (error) {
                console.log('Error listing collections:', error)
                // If we can't list collections, try known collection names
                const knownCollections = [
                    'users',
                    'deployments',
                    'logs',
                    'components',
                    'npm_stats',
                ]

                for (const collectionName of knownCollections) {
                    try {
                        const collection = firestore.collection(collectionName)
                        const snapshot = await collection.count().get()
                        const count = snapshot.data().count
                        if (count > 0) {
                            documentCount += count
                            estimatedSize += count * 1024
                            console.log(
                                `Collection ${collectionName}: ${count} documents`
                            )
                        }
                    } catch (err) {
                        // Collection doesn't exist or can't be accessed
                    }
                }
            }

            const stats: FirestoreStats = {
                documentCount,
                sizeBytes: estimatedSize,
                reads: 0, // Would need monitoring API
                writes: 0, // Would need monitoring API
            }

            this.setCache(cacheKey, stats)
            return stats
        } catch (error) {
            console.error('Error fetching Firestore usage:', error)
            return { documentCount: 0, sizeBytes: 0, reads: 0, writes: 0 }
        }
    }

    async getStorageUsage(): Promise<StorageStats> {
        const cacheKey = 'storage-usage'
        const cached = this.getCached<StorageStats>(cacheKey)
        if (cached) return cached

        try {
            const storage = getAdminStorage()

            // Try to get bucket with explicit name or use default
            const bucketName =
                process.env.FIREBASE_STORAGE_BUCKET ||
                process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
                `${process.env.FIREBASE_PROJECT_ID}.appspot.com`

            const bucket = storage.bucket(bucketName)

            // Get all files and calculate total size
            const [files] = await bucket.getFiles()

            let totalBytes = 0
            let objectCount = 0

            for (const file of files) {
                const metadata = file.metadata
                if (metadata.size) {
                    totalBytes += parseInt(metadata.size as string)
                    objectCount++
                }
            }

            const stats: StorageStats = {
                totalBytes,
                objectCount,
                bandwidth: 0, // Would need monitoring API
            }

            this.setCache(cacheKey, stats)
            return stats
        } catch (error) {
            console.error('Error fetching Storage usage:', error)
            return { totalBytes: 0, objectCount: 0, bandwidth: 0 }
        }
    }

    async getAuthStats(): Promise<AuthStats> {
        const cacheKey = 'auth-stats'
        const cached = this.getCached<AuthStats>(cacheKey)
        if (cached) return cached

        try {
            const auth = getAdminAuth()

            // Get total user count
            let totalUsers = 0
            let activeUsers = 0
            const providerStats: Record<string, number> = {}

            // List users (paginated)
            let nextPageToken: string | undefined
            const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

            do {
                const listResult = await auth.listUsers(1000, nextPageToken)
                totalUsers += listResult.users.length

                listResult.users.forEach((user) => {
                    // Count active users (logged in within 30 days)
                    const lastSignIn = user.metadata.lastSignInTime
                    if (
                        lastSignIn &&
                        new Date(lastSignIn).getTime() > thirtyDaysAgo
                    ) {
                        activeUsers++
                    }

                    // Count by provider
                    user.providerData.forEach((provider) => {
                        const providerId = provider.providerId
                        providerStats[providerId] =
                            (providerStats[providerId] || 0) + 1
                    })
                })

                nextPageToken = listResult.pageToken
            } while (nextPageToken)

            const stats: AuthStats = {
                totalUsers,
                activeUsers,
                providerStats,
            }

            this.setCache(cacheKey, stats)
            return stats
        } catch (error: any) {
            console.error('Error fetching Auth stats:', error)

            // Check if it's a permission error
            if (
                error.code === 'auth/insufficient-permission' ||
                error.message?.includes('PERMISSION_DENIED')
            ) {
                console.log(
                    'Note: Service account needs additional permissions to access Auth data'
                )
                console.log(
                    'Required role: roles/serviceusage.serviceUsageConsumer'
                )
            }

            return { totalUsers: 0, activeUsers: 0, providerStats: {} }
        }
    }

    async getAllUsageMetrics(): Promise<FirebaseUsage> {
        // Fetch all metrics in parallel, but handle errors gracefully
        const results = await Promise.allSettled([
            this.getRealtimeDatabaseUsage(),
            this.getFirestoreUsage(),
            this.getStorageUsage(),
            this.getAuthStats(),
        ])

        // Extract results with proper typing
        const database: DatabaseStats =
            results[0].status === 'fulfilled'
                ? results[0].value
                : { sizeBytes: 0, bandwidth: 0, connections: 0 }

        const firestore: FirestoreStats =
            results[1].status === 'fulfilled'
                ? results[1].value
                : { documentCount: 0, sizeBytes: 0, reads: 0, writes: 0 }

        const storage: StorageStats =
            results[2].status === 'fulfilled'
                ? results[2].value
                : { totalBytes: 0, objectCount: 0, bandwidth: 0 }

        const auth: AuthStats =
            results[3].status === 'fulfilled'
                ? results[3].value
                : { totalUsers: 0, activeUsers: 0, providerStats: {} }

        // Convert to Firebase usage format
        const usage: FirebaseUsage = {
            hosting: {
                bandwidth: { used: 0, limit: 100, unit: 'GB' }, // Would need monitoring
                storage: { used: 0, limit: 50, unit: 'GB' }, // Would need monitoring
                requests: { used: 0, limit: 1000000, unit: 'K' }, // Would need monitoring
            },
            firestore: {
                reads: { used: firestore.reads, limit: 1000000, unit: 'K' },
                writes: { used: firestore.writes, limit: 500000, unit: 'K' },
                storage: {
                    used: Number(
                        (firestore.sizeBytes / (1024 * 1024 * 1024)).toFixed(2)
                    ),
                    limit: 10,
                    unit: 'GB',
                },
            },
            functions: {
                invocations: { used: 0, limit: 200000, unit: 'K' }, // Would need monitoring
                gbSeconds: { used: 0, limit: 100000, unit: '' }, // Would need monitoring
                outboundData: { used: 0, limit: 20, unit: 'GB' }, // Would need monitoring
            },
            database: {
                storage: {
                    used: Number(
                        (database.sizeBytes / (1024 * 1024 * 1024)).toFixed(2)
                    ),
                    limit: 10,
                    unit: 'GB',
                },
                bandwidth: {
                    used: Number(
                        (database.bandwidth / (1024 * 1024 * 1024)).toFixed(2)
                    ),
                    limit: 100,
                    unit: 'GB',
                },
                connections: {
                    used: database.connections,
                    limit: 100000,
                    unit: '',
                },
            },
            storage: {
                storage: {
                    used: Number(
                        (storage.totalBytes / (1024 * 1024 * 1024)).toFixed(2)
                    ),
                    limit: 50,
                    unit: 'GB',
                },
                bandwidth: {
                    used: Number(
                        (storage.bandwidth / (1024 * 1024 * 1024)).toFixed(2)
                    ),
                    limit: 100,
                    unit: 'GB',
                },
                objects: {
                    used: storage.objectCount,
                    limit: 1000000,
                    unit: '',
                },
            },
            auth: {
                users: { used: auth.totalUsers, limit: 100000, unit: '' },
                activeUsers: {
                    used: auth.activeUsers,
                    limit: 100000,
                    unit: '',
                },
            },
            billing: {
                currentCost: 0, // Will be calculated
                projectedCost: 0, // Will be calculated
                budget: 250,
                billingPeriodEnd: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0
                ).toISOString(),
            },
        }

        // Calculate estimated costs
        usage.billing.currentCost =
            PricingCalculator.calculateMonthlyCost(usage)
        usage.billing.projectedCost =
            PricingCalculator.calculateProjectedCost(usage)

        return usage
    }

    private estimateObjectSize(obj: any): number {
        try {
            const jsonString = JSON.stringify(obj)
            return new Blob([jsonString]).size
        } catch (error) {
            console.error('Error estimating object size:', error)
            return 0
        }
    }
}

// Singleton instance
export const firebaseUsageClient = new FirebaseUsageClient()
