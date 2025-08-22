/**
 * Telemetry API Client
 * Handles communication between the component library and telemetry backend
 * Features: batch processing, retry logic, offline support, network resilience
 */

import { ComponentUsageEvent } from './types'

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface TelemetryConfig {
    apiEndpoint?: string
    batchSize?: number
    batchTimeout?: number
    retryAttempts?: number
    retryDelay?: number
    offlineStorage?: boolean
    debug?: boolean
}

export interface ApiResponse {
    success: boolean
    message?: string
    data?: {
        totalEvents: number
        newEvents: number
        duplicates: number
        errors: number
        results?: Array<{
            id: string
            action: 'created' | 'updated'
            instanceCount: number
            isFirstUsage: boolean
        }>
    }
    error?: string
    rateLimit?: {
        remaining: number
        resetTime: number
    }
}

export interface QueuedEvent {
    event: ComponentUsageEvent
    timestamp: number
    attempts: number
}

// =====================================================
// TELEMETRY API CLIENT CLASS
// =====================================================

export class TelemetryApiClient {
    private config: Required<TelemetryConfig>
    private eventQueue: QueuedEvent[] = []
    private batchTimer: NodeJS.Timeout | null = null
    private isOnline: boolean = true
    private readonly storageKey = 'blend_telemetry_queue'

    constructor(config: TelemetryConfig = {}) {
        this.config = {
            apiEndpoint: config.apiEndpoint || this.getDefaultEndpoint(),
            batchSize: config.batchSize || 10,
            batchTimeout: config.batchTimeout || 5000, // 5 seconds
            retryAttempts: config.retryAttempts || 3,
            retryDelay: config.retryDelay || 1000, // 1 second
            offlineStorage: config.offlineStorage !== false, // default true
            debug: config.debug || false,
        }

        // Initialize network monitoring
        this.initializeNetworkMonitoring()

        // Load persisted events from storage
        this.loadPersistedEvents()

        // Start batch timer
        this.startBatchTimer()
    }

    // =====================================================
    // PUBLIC METHODS
    // =====================================================

    /**
     * Send single telemetry event
     */
    async sendEvent(event: ComponentUsageEvent): Promise<boolean> {
        return this.addToQueue(event)
    }

    /**
     * Send multiple telemetry events
     */
    async sendEvents(events: ComponentUsageEvent[]): Promise<boolean> {
        const results = await Promise.all(
            events.map((event) => this.addToQueue(event))
        )
        return results.every((result) => result)
    }

    /**
     * Flush all queued events immediately
     */
    async flush(): Promise<boolean> {
        if (this.batchTimer) {
            clearTimeout(this.batchTimer)
            this.batchTimer = null
        }

        if (this.eventQueue.length === 0) {
            return true
        }

        return this.processBatch()
    }

    /**
     * Get queue status for debugging
     */
    getQueueStatus(): {
        queueSize: number
        isOnline: boolean
        config: TelemetryConfig
    } {
        return {
            queueSize: this.eventQueue.length,
            isOnline: this.isOnline,
            config: this.config,
        }
    }

    /**
     * Clear all queued events (for testing/debugging)
     */
    clearQueue(): void {
        this.eventQueue = []
        this.clearPersistedEvents()

        if (this.config.debug) {
            console.log('🔄 Blend Telemetry: Queue cleared')
        }
    }

    // =====================================================
    // PRIVATE METHODS - QUEUE MANAGEMENT
    // =====================================================

    private addToQueue(event: ComponentUsageEvent): boolean {
        try {
            const queuedEvent: QueuedEvent = {
                event,
                timestamp: Date.now(),
                attempts: 0,
            }

            this.eventQueue.push(queuedEvent)

            if (this.config.debug) {
                console.log('📤 Blend Telemetry: Event queued', {
                    component: event.componentName,
                    queueSize: this.eventQueue.length,
                    isOnline: this.isOnline,
                })
            }

            // Persist to storage if offline support is enabled
            if (this.config.offlineStorage) {
                this.persistEvents()
            }

            // Process immediately if we have enough events or if online
            if (
                this.eventQueue.length >= this.config.batchSize ||
                this.isOnline
            ) {
                this.debouncedProcess()
            }

            return true
        } catch (error) {
            if (this.config.debug) {
                console.warn('Blend Telemetry: Failed to queue event', error)
            }
            return false
        }
    }

    private debouncedProcess(): void {
        if (this.batchTimer) {
            clearTimeout(this.batchTimer)
        }

        this.batchTimer = setTimeout(() => {
            this.processBatch()
        }, 100) // Small delay to allow batching
    }

    private async processBatch(): Promise<boolean> {
        if (!this.isOnline || this.eventQueue.length === 0) {
            return false
        }

        // Take a batch of events
        const batchSize = Math.min(
            this.config.batchSize,
            this.eventQueue.length
        )
        const batch = this.eventQueue.splice(0, batchSize)

        try {
            const success = await this.sendBatch(batch)

            if (success) {
                // Update persisted storage
                if (this.config.offlineStorage) {
                    this.persistEvents()
                }

                if (this.config.debug) {
                    console.log(
                        `✅ Blend Telemetry: Batch sent successfully (${batch.length} events)`
                    )
                }

                // Process remaining events if any
                if (this.eventQueue.length > 0) {
                    this.debouncedProcess()
                }

                return true
            } else {
                // Re-queue failed events with incremented attempt count
                const retriableEvents = batch
                    .map((queuedEvent) => ({
                        ...queuedEvent,
                        attempts: queuedEvent.attempts + 1,
                    }))
                    .filter(
                        (queuedEvent) =>
                            queuedEvent.attempts < this.config.retryAttempts
                    )

                this.eventQueue.unshift(...retriableEvents)

                if (this.config.debug) {
                    console.warn(
                        `❌ Blend Telemetry: Batch failed, ${retriableEvents.length} events re-queued`
                    )
                }

                // Retry with exponential backoff
                if (retriableEvents.length > 0) {
                    setTimeout(
                        () => {
                            this.debouncedProcess()
                        },
                        this.config.retryDelay * Math.pow(2, batch[0].attempts)
                    )
                }

                return false
            }
        } catch (error) {
            // Re-queue events on error
            this.eventQueue.unshift(...batch)

            if (this.config.debug) {
                console.error('Blend Telemetry: Batch processing error', error)
            }

            return false
        }
    }

    // =====================================================
    // PRIVATE METHODS - NETWORK COMMUNICATION
    // =====================================================

    private async sendBatch(batch: QueuedEvent[]): Promise<boolean> {
        try {
            const events = batch.map((queuedEvent) => queuedEvent.event)
            const payload = events.length === 1 ? events[0] : { events }

            const response = await fetch(`${this.config.apiEndpoint}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                // Add timeout and other fetch options
                signal: AbortSignal.timeout(10000), // 10 second timeout
            })

            if (!response.ok) {
                if (response.status === 429) {
                    // Rate limited - wait before retry
                    const rateLimitReset =
                        response.headers.get('X-RateLimit-Reset')
                    const resetTime = rateLimitReset
                        ? parseInt(rateLimitReset) * 1000
                        : Date.now() + 60000
                    const waitTime = Math.max(0, resetTime - Date.now())

                    if (this.config.debug) {
                        console.warn(
                            `⏳ Blend Telemetry: Rate limited, waiting ${waitTime}ms`
                        )
                    }

                    setTimeout(() => this.debouncedProcess(), waitTime)
                    return false
                }

                throw new Error(
                    `HTTP ${response.status}: ${response.statusText}`
                )
            }

            const result: ApiResponse = await response.json()

            if (this.config.debug) {
                console.log('📊 Blend Telemetry: API Response', {
                    success: result.success,
                    newEvents: result.data?.newEvents,
                    duplicates: result.data?.duplicates,
                    errors: result.data?.errors,
                })
            }

            return result.success
        } catch (error) {
            if (this.config.debug) {
                console.error('Blend Telemetry: Network error', error)
            }
            return false
        }
    }

    // =====================================================
    // PRIVATE METHODS - CONFIGURATION & UTILITIES
    // =====================================================

    private getDefaultEndpoint(): string {
        // Try to detect the API endpoint automatically
        if (typeof window !== 'undefined') {
            // In browser environment
            const currentHost = window.location.origin

            // Check if we're in a development environment
            if (
                currentHost.includes('localhost') ||
                currentHost.includes('127.0.0.1')
            ) {
                // For development, default to blend-monitor port
                const currentPort = window.location.port
                if (currentPort === '5173' || currentPort === '3000') {
                    // Demo site or main site - point to blend-monitor
                    return 'http://localhost:3001/api/telemetry'
                }
                return `${currentHost}/api/telemetry`
            }

            // For production, try to use a blend monitor endpoint
            // This could be configurable via environment variables
            return 'https://blend-monitor.your-domain.com/api/telemetry'
        }

        // Server-side rendering fallback
        return (
            process.env.NEXT_PUBLIC_TELEMETRY_API_ENDPOINT ||
            'https://blend-monitor.your-domain.com/api/telemetry'
        )
    }

    // =====================================================
    // PRIVATE METHODS - NETWORK MONITORING
    // =====================================================

    private initializeNetworkMonitoring(): void {
        if (typeof window === 'undefined') {
            return // Server-side rendering
        }

        // Monitor online/offline status
        const updateOnlineStatus = () => {
            const wasOnline = this.isOnline
            this.isOnline = navigator.onLine

            if (!wasOnline && this.isOnline) {
                if (this.config.debug) {
                    console.log(
                        '🌐 Blend Telemetry: Back online, processing queue'
                    )
                }
                // Process queued events when back online
                this.debouncedProcess()
            }
        }

        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)

        // Initial status
        this.isOnline = navigator.onLine
    }

    // =====================================================
    // PRIVATE METHODS - OFFLINE STORAGE
    // =====================================================

    private persistEvents(): void {
        if (typeof window === 'undefined' || !this.config.offlineStorage) {
            return
        }

        try {
            const serializedQueue = JSON.stringify(this.eventQueue)
            localStorage.setItem(this.storageKey, serializedQueue)
        } catch (error) {
            if (this.config.debug) {
                console.warn('Blend Telemetry: Failed to persist events', error)
            }
        }
    }

    private loadPersistedEvents(): void {
        if (typeof window === 'undefined' || !this.config.offlineStorage) {
            return
        }

        try {
            const serializedQueue = localStorage.getItem(this.storageKey)
            if (serializedQueue) {
                const persistedQueue: QueuedEvent[] =
                    JSON.parse(serializedQueue)

                // Filter out old events (older than 24 hours)
                const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
                const validEvents = persistedQueue.filter(
                    (queuedEvent) => queuedEvent.timestamp > oneDayAgo
                )

                this.eventQueue = validEvents

                if (this.config.debug && validEvents.length > 0) {
                    console.log(
                        `📂 Blend Telemetry: Loaded ${validEvents.length} persisted events`
                    )
                }
            }
        } catch (error) {
            if (this.config.debug) {
                console.warn(
                    'Blend Telemetry: Failed to load persisted events',
                    error
                )
            }
            this.clearPersistedEvents()
        }
    }

    private clearPersistedEvents(): void {
        if (typeof window === 'undefined') {
            return
        }

        try {
            localStorage.removeItem(this.storageKey)
        } catch (error) {
            // Silently fail
        }
    }

    // =====================================================
    // PRIVATE METHODS - BATCH TIMER
    // =====================================================

    private startBatchTimer(): void {
        if (this.batchTimer) {
            clearTimeout(this.batchTimer)
        }

        this.batchTimer = setTimeout(() => {
            if (this.eventQueue.length > 0) {
                this.processBatch()
            }
            this.startBatchTimer() // Restart timer
        }, this.config.batchTimeout)
    }

    // =====================================================
    // CLEANUP
    // =====================================================

    /**
     * Cleanup resources (call before component unmount)
     */
    destroy(): void {
        if (this.batchTimer) {
            clearTimeout(this.batchTimer)
            this.batchTimer = null
        }

        // Persist any remaining events
        if (this.config.offlineStorage && this.eventQueue.length > 0) {
            this.persistEvents()
        }
    }
}

// =====================================================
// SINGLETON INSTANCE
// =====================================================

// Create a default instance that can be shared across components
export const defaultTelemetryClient = new TelemetryApiClient()

// Cleanup on page unload
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        defaultTelemetryClient.destroy()
    })
}
