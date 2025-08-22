/**
 * Telemetry Context for Blend Design System
 * Provides opt-out telemetry configuration and tracking functionality
 */

import {
    createContext,
    useContext,
    useCallback,
    useState,
    ReactNode,
    useEffect,
    useRef,
} from 'react'
import {
    TelemetryConfig,
    TelemetryContextValue,
    ComponentUsageEvent,
    ProjectContext,
} from './types'
import {
    generateSessionId,
    getPackageVersion,
    detectEnvironment,
    shouldSample,
    logTelemetryEvent,
    getProjectContext,
    shouldTrackUsage,
    createPropsSignature,
    getStoredUsageData,
} from './utils'
import { TelemetryApiClient } from './apiClient'

// Default configuration (opt-out system - enabled by default for component adoption tracking)
const DEFAULT_CONFIG: TelemetryConfig = {
    enabled: true, // Enabled by default - users can explicitly disable if needed
    environment: detectEnvironment() as
        | 'development'
        | 'production'
        | 'staging',
    samplingRate: 1.0, // Track 100% of events by default
    debug: detectEnvironment() === 'development', // Enable debug in development
}

const TelemetryContext = createContext<TelemetryContextValue | null>(null)

interface TelemetryProviderProps {
    children: ReactNode
    config?: Partial<TelemetryConfig>
}

export function TelemetryProvider({
    children,
    config: userConfig = {},
}: TelemetryProviderProps) {
    const [config, setConfig] = useState<TelemetryConfig>({
        ...DEFAULT_CONFIG,
        ...userConfig,
    })

    // Generate session ID once per provider instance
    const [sessionId] = useState(() => generateSessionId())

    // Initialize API client with configuration
    const apiClientRef = useRef<TelemetryApiClient | null>(null)

    useEffect(() => {
        if (config.enabled) {
            // Initialize API client with telemetry configuration
            apiClientRef.current = new TelemetryApiClient({
                apiEndpoint: userConfig.apiEndpoint,
                batchSize: userConfig.batchSize || 10,
                batchTimeout: userConfig.batchTimeout || 5000,
                retryAttempts: userConfig.retryAttempts || 3,
                retryDelay: userConfig.retryDelay || 1000,
                offlineStorage: userConfig.offlineStorage !== false,
                debug: config.debug,
            })

            if (config.debug) {
                console.log('🚀 Blend Telemetry: API client initialized', {
                    endpoint: apiClientRef.current.getQueueStatus(),
                })
            }
        }

        // Cleanup function
        return () => {
            if (apiClientRef.current) {
                apiClientRef.current.destroy()
                apiClientRef.current = null
            }
        }
    }, [
        config.enabled,
        config.debug,
        userConfig.apiEndpoint,
        userConfig.batchSize,
        userConfig.batchTimeout,
        userConfig.retryAttempts,
        userConfig.retryDelay,
        userConfig.offlineStorage,
    ])

    const track = useCallback(
        (
            event: Omit<
                ComponentUsageEvent,
                | 'sessionId'
                | 'timestamp'
                | 'packageVersion'
                | 'environment'
                | 'projectContext'
                | 'instanceCount'
                | 'propsSignature'
            >
        ) => {
            try {
                // Early return if telemetry is disabled
                if (!config.enabled) {
                    return
                }

                // Apply sampling rate
                if (!shouldSample(config.samplingRate || 1.0)) {
                    return
                }

                const projectContext = getProjectContext()
                const propsSignature = createPropsSignature(
                    event.componentProps
                )

                // Check session-based deduplication
                const { shouldTrack, usageKey, instanceCount } =
                    shouldTrackUsage(
                        event.componentName,
                        event.componentProps,
                        projectContext
                    )

                // Handle duplicate tracking with detailed logging
                if (!shouldTrack) {
                    if (config.debug) {
                        logDuplicateUsage(
                            event.componentName,
                            usageKey,
                            instanceCount,
                            propsSignature,
                            projectContext
                        )
                    }
                    return
                }

                // Create complete telemetry event
                const fullEvent: ComponentUsageEvent = {
                    ...event,
                    instanceCount,
                    propsSignature,
                    projectContext,
                    sessionId,
                    timestamp: Date.now(),
                    packageVersion: getPackageVersion(),
                    environment: config.environment || detectEnvironment(),
                }

                // Debug logging
                if (config.debug) {
                    logTelemetryEvent(fullEvent, true)
                }

                // Send to analytics endpoint via API client
                if (apiClientRef.current) {
                    apiClientRef.current.sendEvent(fullEvent).catch((error) => {
                        if (config.debug) {
                            console.warn(
                                'Blend telemetry: Failed to send event to API',
                                error
                            )
                        }
                    })
                } else if (config.debug) {
                    console.warn(
                        'Blend telemetry: API client not initialized, event not sent'
                    )
                }
            } catch (error) {
                console.warn(
                    'Blend telemetry: Error tracking component usage',
                    error
                )
            }
        },
        [config, sessionId]
    )

    /**
     * Log duplicate usage with detailed stored data
     */
    const logDuplicateUsage = useCallback(
        (
            componentName: string,
            usageKey: string,
            instanceCount: number,
            propsSignature: string,
            projectContext: ProjectContext
        ) => {
            const usage = getStoredUsageData(usageKey)

            console.group(
                `🔄 Blend Telemetry: ${componentName} already tracked this session`
            )
            console.log('📊 Current stored instance data:')
            console.log('  Component:', componentName)
            console.log('  Instance Count:', instanceCount)
            console.log('  Props Signature:', propsSignature)
            console.log(
                '  First Seen:',
                usage ? new Date(usage.firstSeen).toISOString() : 'unknown'
            )
            console.log(
                '  Last Seen:',
                usage ? new Date(usage.lastSeen).toISOString() : 'unknown'
            )
            console.log('  Repository:', projectContext.repositoryName)
            console.log('  Page Route:', projectContext.pageRoute)
            console.log('🔑 Session Storage Key:', usageKey)
            console.groupEnd()
        },
        []
    )

    const updateConfig = useCallback((newConfig: Partial<TelemetryConfig>) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            ...newConfig,
        }))
    }, [])

    const contextValue: TelemetryContextValue = {
        config,
        track,
        updateConfig,
    }

    return (
        <TelemetryContext.Provider value={contextValue}>
            {children}
        </TelemetryContext.Provider>
    )
}

export function useTelemetry(): TelemetryContextValue {
    const context = useContext(TelemetryContext)

    if (!context) {
        // Return a no-op implementation if provider is not found
        return {
            config: { enabled: false },
            track: () => {},
            updateConfig: () => {},
        }
    }

    return context
}
