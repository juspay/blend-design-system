/**
 * Cache Service
 * Handles caching for telemetry duplicate prevention and performance optimization
 * Supports both Redis and in-memory fallback
 */

import { TelemetryEvent } from './telemetry-service'

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface CacheEntry {
    value: string
    expiresAt: number
}

export interface CacheStats {
    hits: number
    misses: number
    sets: number
    deletes: number
    errors: number
}

// =====================================================
// CACHE SERVICE CLASS
// =====================================================

export class CacheService {
    private inMemoryCache: Map<string, CacheEntry> = new Map()
    private stats: CacheStats = {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
        errors: 0,
    }
    private cleanupInterval: NodeJS.Timeout | null = null

    constructor() {
        // Start cleanup interval for in-memory cache
        this.startCleanupInterval()
    }

    // =====================================================
    // DUPLICATE PREVENTION METHODS
    // =====================================================

    /**
     * Generate cache key for duplicate prevention
     * Based on our telemetry deduplication strategy
     */
    generateDeduplicationKey(event: TelemetryEvent): string {
        return `telemetry:dedup:${event.sessionId}:${event.componentName}:${event.propsSignature}`
    }

    /**
     * Generate short-term cache key for API-level duplicate prevention
     */
    generateApiCacheKey(event: TelemetryEvent): string {
        return `telemetry:api:${event.sessionId}:${event.componentName}:${event.propsSignature}`
    }

    /**
     * Check if an event is a recent duplicate (within 5 minutes)
     * Returns true if duplicate found, false if new
     */
    async checkRecentDuplicate(event: TelemetryEvent): Promise<boolean> {
        const cacheKey = this.generateApiCacheKey(event)

        try {
            const cached = await this.get(cacheKey)
            if (cached) {
                this.stats.hits++
                return true // Duplicate found
            }

            // Mark as seen for next 5 minutes (300 seconds)
            await this.set(cacheKey, 'seen', 300)
            this.stats.misses++
            return false // New event
        } catch (error) {
            console.warn('Cache check failed, allowing event:', error)
            this.stats.errors++
            return false // Allow event if cache fails
        }
    }

    /**
     * Batch check for recent duplicates
     * Returns array of booleans indicating duplicates
     */
    async batchCheckRecentDuplicates(
        events: TelemetryEvent[]
    ): Promise<boolean[]> {
        const results = await Promise.all(
            events.map((event) => this.checkRecentDuplicate(event))
        )
        return results
    }

    // =====================================================
    // ANALYTICS CACHING METHODS
    // =====================================================

    /**
     * Cache dashboard data for performance
     */
    async cacheDashboardData(data: any, ttlSeconds = 300): Promise<void> {
        const key = 'telemetry:dashboard:overview'
        await this.set(key, JSON.stringify(data), ttlSeconds)
    }

    /**
     * Get cached dashboard data
     */
    async getCachedDashboardData(): Promise<any | null> {
        const key = 'telemetry:dashboard:overview'
        const cached = await this.get(key)

        if (cached) {
            try {
                return JSON.parse(cached)
            } catch (error) {
                console.warn('Failed to parse cached dashboard data:', error)
                await this.delete(key) // Clean up invalid data
                return null
            }
        }

        return null
    }

    /**
     * Cache component analytics data
     */
    async cacheComponentAnalytics(
        componentName: string,
        data: any,
        ttlSeconds = 600
    ): Promise<void> {
        const key = `telemetry:component:${componentName}`
        await this.set(key, JSON.stringify(data), ttlSeconds)
    }

    /**
     * Get cached component analytics data
     */
    async getCachedComponentAnalytics(
        componentName: string
    ): Promise<any | null> {
        const key = `telemetry:component:${componentName}`
        const cached = await this.get(key)

        if (cached) {
            try {
                return JSON.parse(cached)
            } catch (error) {
                console.warn(
                    'Failed to parse cached component analytics:',
                    error
                )
                await this.delete(key)
                return null
            }
        }

        return null
    }

    /**
     * Cache repository analytics data
     */
    async cacheRepositoryAnalytics(
        repositoryName: string,
        data: any,
        ttlSeconds = 600
    ): Promise<void> {
        const key = `telemetry:repository:${repositoryName}`
        await this.set(key, JSON.stringify(data), ttlSeconds)
    }

    /**
     * Get cached repository analytics data
     */
    async getCachedRepositoryAnalytics(
        repositoryName: string
    ): Promise<any | null> {
        const key = `telemetry:repository:${repositoryName}`
        const cached = await this.get(key)

        if (cached) {
            try {
                return JSON.parse(cached)
            } catch (error) {
                console.warn(
                    'Failed to parse cached repository analytics:',
                    error
                )
                await this.delete(key)
                return null
            }
        }

        return null
    }

    // =====================================================
    // CORE CACHE OPERATIONS
    // =====================================================

    /**
     * Set a value in cache with TTL
     */
    async set(
        key: string,
        value: string,
        ttlSeconds: number
    ): Promise<boolean> {
        try {
            // TODO: Implement Redis integration here
            // For now, use in-memory cache as fallback

            const expiresAt = Date.now() + ttlSeconds * 1000
            this.inMemoryCache.set(key, { value, expiresAt })
            this.stats.sets++
            return true
        } catch (error) {
            console.error('Cache set error:', error)
            this.stats.errors++
            return false
        }
    }

    /**
     * Get a value from cache
     */
    async get(key: string): Promise<string | null> {
        try {
            // TODO: Implement Redis integration here
            // For now, use in-memory cache as fallback

            const entry = this.inMemoryCache.get(key)
            if (!entry) {
                return null
            }

            // Check if expired
            if (Date.now() > entry.expiresAt) {
                this.inMemoryCache.delete(key)
                return null
            }

            return entry.value
        } catch (error) {
            console.error('Cache get error:', error)
            this.stats.errors++
            return null
        }
    }

    /**
     * Delete a value from cache
     */
    async delete(key: string): Promise<boolean> {
        try {
            // TODO: Implement Redis integration here
            // For now, use in-memory cache as fallback

            const deleted = this.inMemoryCache.delete(key)
            if (deleted) {
                this.stats.deletes++
            }
            return deleted
        } catch (error) {
            console.error('Cache delete error:', error)
            this.stats.errors++
            return false
        }
    }

    /**
     * Check if a key exists in cache
     */
    async exists(key: string): Promise<boolean> {
        const value = await this.get(key)
        return value !== null
    }

    /**
     * Get multiple values from cache
     */
    async mget(keys: string[]): Promise<(string | null)[]> {
        const results = await Promise.all(keys.map((key) => this.get(key)))
        return results
    }

    /**
     * Set multiple values in cache
     */
    async mset(
        keyValuePairs: Array<{ key: string; value: string; ttl: number }>
    ): Promise<boolean[]> {
        const results = await Promise.all(
            keyValuePairs.map(({ key, value, ttl }) =>
                this.set(key, value, ttl)
            )
        )
        return results
    }

    /**
     * Clear all cache entries (use with caution)
     */
    async clear(): Promise<void> {
        try {
            // TODO: Implement Redis clear here
            // For now, clear in-memory cache

            this.inMemoryCache.clear()
        } catch (error) {
            console.error('Cache clear error:', error)
            this.stats.errors++
        }
    }

    // =====================================================
    // CACHE MANAGEMENT
    // =====================================================

    /**
     * Get cache statistics
     */
    getStats(): CacheStats {
        return { ...this.stats }
    }

    /**
     * Reset cache statistics
     */
    resetStats(): void {
        this.stats = {
            hits: 0,
            misses: 0,
            sets: 0,
            deletes: 0,
            errors: 0,
        }
    }

    /**
     * Get cache hit ratio
     */
    getHitRatio(): number {
        const total = this.stats.hits + this.stats.misses
        return total === 0 ? 0 : this.stats.hits / total
    }

    /**
     * Get cache size (in-memory only)
     */
    getSize(): number {
        return this.inMemoryCache.size
    }

    /**
     * Start cleanup interval for expired entries
     */
    private startCleanupInterval(): void {
        // Clean up expired entries every 5 minutes
        this.cleanupInterval = setInterval(
            () => {
                this.cleanupExpiredEntries()
            },
            5 * 60 * 1000
        )
    }

    /**
     * Clean up expired entries from in-memory cache
     */
    private cleanupExpiredEntries(): void {
        const now = Date.now()
        let cleanedCount = 0

        for (const [key, entry] of this.inMemoryCache.entries()) {
            if (now > entry.expiresAt) {
                this.inMemoryCache.delete(key)
                cleanedCount++
            }
        }

        if (cleanedCount > 0) {
            console.log(`Cleaned up ${cleanedCount} expired cache entries`)
        }
    }

    /**
     * Cleanup resources
     */
    destroy(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval)
            this.cleanupInterval = null
        }
        this.inMemoryCache.clear()
    }

    // =====================================================
    // RATE LIMITING HELPERS
    // =====================================================

    /**
     * Check rate limit for a key
     */
    async checkRateLimit(
        key: string,
        maxRequests: number,
        windowSeconds: number
    ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
        const rateLimitKey = `ratelimit:${key}`
        const now = Math.floor(Date.now() / 1000)
        const windowStart = now - windowSeconds

        try {
            // For in-memory implementation, we'll use a simplified approach
            // TODO: Implement proper sliding window with Redis

            const cached = await this.get(rateLimitKey)
            const requests = cached ? JSON.parse(cached) : []

            // Filter out old requests
            const recentRequests = requests.filter(
                (timestamp: number) => timestamp > windowStart
            )

            if (recentRequests.length >= maxRequests) {
                return {
                    allowed: false,
                    remaining: 0,
                    resetTime: recentRequests[0] + windowSeconds,
                }
            }

            // Add current request
            recentRequests.push(now)
            await this.set(
                rateLimitKey,
                JSON.stringify(recentRequests),
                windowSeconds
            )

            return {
                allowed: true,
                remaining: maxRequests - recentRequests.length,
                resetTime: now + windowSeconds,
            }
        } catch (error) {
            console.error('Rate limit check error:', error)
            // Allow request if rate limiting fails
            return {
                allowed: true,
                remaining: maxRequests - 1,
                resetTime: now + windowSeconds,
            }
        }
    }

    // =====================================================
    // REDIS INTEGRATION (TODO)
    // =====================================================

    /**
     * Initialize Redis connection
     * TODO: Implement Redis integration for production use
     */
    private async initializeRedis(): Promise<void> {
        // TODO: Initialize Redis client
        // const redis = new Redis({
        //     host: process.env.REDIS_HOST || 'localhost',
        //     port: parseInt(process.env.REDIS_PORT || '6379'),
        //     password: process.env.REDIS_PASSWORD,
        //     retryDelayOnFailover: 100,
        //     maxRetriesPerRequest: 3
        // })
        // TODO: Handle Redis connection events
        // redis.on('connect', () => console.log('Redis connected'))
        // redis.on('error', (err) => console.error('Redis error:', err))
    }
}

// Export singleton instance
export const cacheService = new CacheService()

// Cleanup on process exit
process.on('exit', () => {
    cacheService.destroy()
})

process.on('SIGINT', () => {
    cacheService.destroy()
    process.exit(0)
})

process.on('SIGTERM', () => {
    cacheService.destroy()
    process.exit(0)
})
