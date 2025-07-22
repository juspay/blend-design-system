import type { FirebaseUsage } from '@/types'

// Firebase pricing as of 2024 (in USD)
// Free tier limits and pricing after free tier
export const FIREBASE_PRICING = {
    realtimeDb: {
        storage: {
            freeLimit: 1, // 1 GB
            pricePerGB: 5, // $5/GB after free tier
        },
        bandwidth: {
            freeLimit: 10, // 10 GB
            pricePerGB: 1, // $1/GB
        },
        connections: {
            freeLimit: 100, // 100 simultaneous connections
            pricePerThousand: 0, // No charge for connections
        },
    },
    firestore: {
        reads: {
            freeLimit: 50000, // 50K reads/day
            pricePer100K: 0.06, // $0.06 per 100K reads
        },
        writes: {
            freeLimit: 20000, // 20K writes/day
            pricePer100K: 0.18, // $0.18 per 100K writes
        },
        deletes: {
            freeLimit: 20000, // 20K deletes/day
            pricePer100K: 0.02, // $0.02 per 100K deletes
        },
        storage: {
            freeLimit: 1, // 1 GB
            pricePerGB: 0.18, // $0.18/GB
        },
    },
    storage: {
        storage: {
            freeLimit: 5, // 5 GB
            pricePerGB: 0.026, // $0.026/GB
        },
        bandwidth: {
            freeLimit: 1, // 1 GB/day
            pricePerGB: 0.12, // $0.12/GB
        },
        operations: {
            freeLimit: 20000, // 20K operations/day
            pricePer10K: 0.05, // $0.05 per 10K operations
        },
    },
    hosting: {
        storage: {
            freeLimit: 10, // 10 GB
            pricePerGB: 0.026, // $0.026/GB
        },
        bandwidth: {
            freeLimit: 360, // 360 MB/day (~10 GB/month)
            pricePerGB: 0.15, // $0.15/GB
        },
    },
    functions: {
        invocations: {
            freeLimit: 125000, // 125K invocations/month
            pricePerMillion: 0.4, // $0.40 per million
        },
        gbSeconds: {
            freeLimit: 40000, // 40K GB-seconds/month
            pricePer1000: 0.0025, // $0.0025 per 1000 GB-seconds
        },
        cpuSeconds: {
            freeLimit: 40000, // 40K CPU-seconds/month
            pricePer1000: 0.01, // $0.01 per 1000 CPU-seconds
        },
        outboundData: {
            freeLimit: 5, // 5 GB/month
            pricePerGB: 0.12, // $0.12/GB
        },
    },
    auth: {
        users: {
            freeLimit: 50000, // 50K monthly active users
            pricePer1000: 0.0055, // $0.0055 per MAU after 50K
        },
        phoneAuth: {
            freeLimit: 10000, // 10K verifications/month
            pricePer1000: 0.06, // $0.06 per verification
        },
    },
}

export class PricingCalculator {
    /**
     * Calculate estimated monthly cost based on current usage
     */
    static calculateMonthlyCost(usage: FirebaseUsage): number {
        let totalCost = 0

        // Realtime Database costs
        if (usage.database) {
            const dbStorageCost = this.calculateCost(
                usage.database.storage.used,
                FIREBASE_PRICING.realtimeDb.storage.freeLimit,
                FIREBASE_PRICING.realtimeDb.storage.pricePerGB
            )
            const dbBandwidthCost = this.calculateCost(
                usage.database.bandwidth.used,
                FIREBASE_PRICING.realtimeDb.bandwidth.freeLimit,
                FIREBASE_PRICING.realtimeDb.bandwidth.pricePerGB
            )
            totalCost += dbStorageCost + dbBandwidthCost
        }

        // Firestore costs
        const firestoreStorageCost = this.calculateCost(
            usage.firestore.storage.used,
            FIREBASE_PRICING.firestore.storage.freeLimit,
            FIREBASE_PRICING.firestore.storage.pricePerGB
        )
        // Convert K reads/writes to actual numbers for calculation
        const firestoreReadsCost = this.calculateCost(
            usage.firestore.reads.used * 1000, // Convert K to actual
            FIREBASE_PRICING.firestore.reads.freeLimit * 30, // Daily to monthly
            FIREBASE_PRICING.firestore.reads.pricePer100K / 100000
        )
        const firestoreWritesCost = this.calculateCost(
            usage.firestore.writes.used * 1000,
            FIREBASE_PRICING.firestore.writes.freeLimit * 30,
            FIREBASE_PRICING.firestore.writes.pricePer100K / 100000
        )
        totalCost +=
            firestoreStorageCost + firestoreReadsCost + firestoreWritesCost

        // Storage costs
        if (usage.storage) {
            const storageStorageCost = this.calculateCost(
                usage.storage.storage.used,
                FIREBASE_PRICING.storage.storage.freeLimit,
                FIREBASE_PRICING.storage.storage.pricePerGB
            )
            const storageBandwidthCost = this.calculateCost(
                usage.storage.bandwidth.used,
                FIREBASE_PRICING.storage.bandwidth.freeLimit * 30, // Daily to monthly
                FIREBASE_PRICING.storage.bandwidth.pricePerGB
            )
            totalCost += storageStorageCost + storageBandwidthCost
        }

        // Hosting costs
        const hostingStorageCost = this.calculateCost(
            usage.hosting.storage.used,
            FIREBASE_PRICING.hosting.storage.freeLimit,
            FIREBASE_PRICING.hosting.storage.pricePerGB
        )
        const hostingBandwidthCost = this.calculateCost(
            usage.hosting.bandwidth.used,
            10, // ~10 GB/month free
            FIREBASE_PRICING.hosting.bandwidth.pricePerGB
        )
        totalCost += hostingStorageCost + hostingBandwidthCost

        // Functions costs
        const functionsInvocationsCost = this.calculateCost(
            usage.functions.invocations.used * 1000, // Convert K to actual
            FIREBASE_PRICING.functions.invocations.freeLimit,
            FIREBASE_PRICING.functions.invocations.pricePerMillion / 1000000
        )
        const functionsGbSecondsCost = this.calculateCost(
            usage.functions.gbSeconds.used,
            FIREBASE_PRICING.functions.gbSeconds.freeLimit,
            FIREBASE_PRICING.functions.gbSeconds.pricePer1000 / 1000
        )
        const functionsOutboundCost = this.calculateCost(
            usage.functions.outboundData.used,
            FIREBASE_PRICING.functions.outboundData.freeLimit,
            FIREBASE_PRICING.functions.outboundData.pricePerGB
        )
        totalCost +=
            functionsInvocationsCost +
            functionsGbSecondsCost +
            functionsOutboundCost

        // Auth costs
        if (usage.auth) {
            const authUsersCost = this.calculateCost(
                usage.auth.activeUsers.used,
                FIREBASE_PRICING.auth.users.freeLimit,
                FIREBASE_PRICING.auth.users.pricePer1000 / 1000
            )
            totalCost += authUsersCost
        }

        return Math.round(totalCost * 100) / 100 // Round to 2 decimal places
    }

    /**
     * Calculate projected monthly cost based on current daily usage
     */
    static calculateProjectedCost(
        usage: FirebaseUsage,
        daysInMonth: number = 30
    ): number {
        // For simplicity, multiply current cost by days remaining
        const currentDay = new Date().getDate()
        const daysRemaining = daysInMonth - currentDay
        const dailyRate = this.calculateMonthlyCost(usage) / currentDay

        return (
            Math.round(
                (this.calculateMonthlyCost(usage) + dailyRate * daysRemaining) *
                    100
            ) / 100
        )
    }

    /**
     * Calculate cost for a specific metric
     */
    private static calculateCost(
        used: number,
        freeLimit: number,
        pricePerUnit: number
    ): number {
        if (used <= freeLimit) {
            return 0
        }
        return (used - freeLimit) * pricePerUnit
    }

    /**
     * Get cost breakdown by service
     */
    static getCostBreakdown(usage: FirebaseUsage): Record<string, number> {
        const breakdown: Record<string, number> = {}

        // Database costs
        if (usage.database) {
            const dbCost =
                this.calculateCost(
                    usage.database.storage.used,
                    FIREBASE_PRICING.realtimeDb.storage.freeLimit,
                    FIREBASE_PRICING.realtimeDb.storage.pricePerGB
                ) +
                this.calculateCost(
                    usage.database.bandwidth.used,
                    FIREBASE_PRICING.realtimeDb.bandwidth.freeLimit,
                    FIREBASE_PRICING.realtimeDb.bandwidth.pricePerGB
                )
            if (dbCost > 0)
                breakdown['Realtime Database'] = Math.round(dbCost * 100) / 100
        }

        // Firestore costs
        const firestoreCost =
            this.calculateCost(
                usage.firestore.storage.used,
                FIREBASE_PRICING.firestore.storage.freeLimit,
                FIREBASE_PRICING.firestore.storage.pricePerGB
            ) +
            this.calculateCost(
                usage.firestore.reads.used * 1000,
                FIREBASE_PRICING.firestore.reads.freeLimit * 30,
                FIREBASE_PRICING.firestore.reads.pricePer100K / 100000
            ) +
            this.calculateCost(
                usage.firestore.writes.used * 1000,
                FIREBASE_PRICING.firestore.writes.freeLimit * 30,
                FIREBASE_PRICING.firestore.writes.pricePer100K / 100000
            )
        if (firestoreCost > 0)
            breakdown['Firestore'] = Math.round(firestoreCost * 100) / 100

        // Storage costs
        if (usage.storage) {
            const storageCost =
                this.calculateCost(
                    usage.storage.storage.used,
                    FIREBASE_PRICING.storage.storage.freeLimit,
                    FIREBASE_PRICING.storage.storage.pricePerGB
                ) +
                this.calculateCost(
                    usage.storage.bandwidth.used,
                    FIREBASE_PRICING.storage.bandwidth.freeLimit * 30,
                    FIREBASE_PRICING.storage.bandwidth.pricePerGB
                )
            if (storageCost > 0)
                breakdown['Cloud Storage'] = Math.round(storageCost * 100) / 100
        }

        // Hosting costs
        const hostingCost =
            this.calculateCost(
                usage.hosting.storage.used,
                FIREBASE_PRICING.hosting.storage.freeLimit,
                FIREBASE_PRICING.hosting.storage.pricePerGB
            ) +
            this.calculateCost(
                usage.hosting.bandwidth.used,
                10,
                FIREBASE_PRICING.hosting.bandwidth.pricePerGB
            )
        if (hostingCost > 0)
            breakdown['Hosting'] = Math.round(hostingCost * 100) / 100

        // Functions costs
        const functionsCost =
            this.calculateCost(
                usage.functions.invocations.used * 1000,
                FIREBASE_PRICING.functions.invocations.freeLimit,
                FIREBASE_PRICING.functions.invocations.pricePerMillion / 1000000
            ) +
            this.calculateCost(
                usage.functions.gbSeconds.used,
                FIREBASE_PRICING.functions.gbSeconds.freeLimit,
                FIREBASE_PRICING.functions.gbSeconds.pricePer1000 / 1000
            ) +
            this.calculateCost(
                usage.functions.outboundData.used,
                FIREBASE_PRICING.functions.outboundData.freeLimit,
                FIREBASE_PRICING.functions.outboundData.pricePerGB
            )
        if (functionsCost > 0)
            breakdown['Cloud Functions'] = Math.round(functionsCost * 100) / 100

        // Auth costs
        if (usage.auth) {
            const authCost = this.calculateCost(
                usage.auth.activeUsers.used,
                FIREBASE_PRICING.auth.users.freeLimit,
                FIREBASE_PRICING.auth.users.pricePer1000 / 1000
            )
            if (authCost > 0)
                breakdown['Authentication'] = Math.round(authCost * 100) / 100
        }

        return breakdown
    }
}
