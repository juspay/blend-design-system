/**
 * Telemetry Context for Blend Design System
 * Provides opt-out telemetry configuration and page composition tracking
 */

import {
    createContext,
    useContext,
    useCallback,
    useState,
    ReactNode,
    useEffect,
} from 'react'
import { TelemetryConfig, TelemetryContextValue } from './types'
import {
    generateSessionId,
    getPackageVersion,
    detectEnvironment,
    shouldSample,
} from './utils'
import {
    getPageCompositionManager,
    PageCompositionEvent,
} from './pageComposition'

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

    /**
     * Handle page composition changes and send to API
     */
    const handlePageCompositionChange = useCallback(
        async (event: PageCompositionEvent) => {
            try {
                // Early return if telemetry is disabled
                if (!config.enabled) {
                    return
                }

                // Apply sampling rate
                if (!shouldSample(config.samplingRate || 1.0)) {
                    return
                }

                // Create complete page composition event
                const fullEvent = {
                    ...event,
                    sessionId,
                    timestamp: Date.now(),
                    packageVersion: getPackageVersion(),
                    environment: config.environment || detectEnvironment(),
                }

                // Debug logging
                if (config.debug) {
                    console.group(
                        `📊 Blend Telemetry: Page Composition Change (${event.changeType})`
                    )
                    console.log(
                        '🎯 Page Fingerprint:',
                        event.pageComposition.pageFingerprint
                    )
                    console.log(
                        '📍 Repository:',
                        event.pageComposition.repositoryName
                    )
                    console.log(
                        '📄 Page Route:',
                        event.pageComposition.pageRoute
                    )
                    console.log(
                        '🔧 Components:',
                        event.pageComposition.components
                            .map((c) => `${c.name} (${c.instanceCount}x)`)
                            .join(', ')
                    )
                    console.log('🔄 Change Type:', event.changeType)
                    if (event.previousHash) {
                        console.log('⏮️ Previous Hash:', event.previousHash)
                    }
                    console.log(
                        '🆕 Current Hash:',
                        event.pageComposition.compositionHash
                    )
                    console.groupEnd()
                }

                // Send to analytics endpoint using fetch
                try {
                    const apiEndpoint =
                        userConfig.apiEndpoint ||
                        '/api/telemetry/page-composition'
                    const response = await fetch(apiEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...fullEvent,
                            eventType: 'page_composition',
                        }),
                    })

                    if (!response.ok) {
                        throw new Error(
                            `HTTP ${response.status}: ${response.statusText}`
                        )
                    }

                    if (config.debug) {
                        const result = await response.json()
                        console.log(
                            '✅ Blend Telemetry: Page composition event sent successfully',
                            result
                        )
                    }
                } catch (error: unknown) {
                    if (config.debug) {
                        console.warn(
                            'Blend telemetry: Failed to send page composition event to API',
                            error
                        )
                    }
                }
            } catch (error: unknown) {
                console.warn(
                    'Blend telemetry: Error handling page composition change',
                    error
                )
            }
        },
        [config, sessionId, userConfig.apiEndpoint]
    )

    useEffect(() => {
        if (config.enabled) {
            // Set up page composition change handler
            const pageManager = getPageCompositionManager()
            pageManager.setCompositionChangeHandler(
                (event: PageCompositionEvent) => {
                    handlePageCompositionChange(event)
                }
            )

            if (config.debug) {
                console.log(
                    '🚀 Blend Telemetry: Page composition tracking initialized'
                )
            }
        }

        // Cleanup function
        return () => {
            // Clean up page composition manager
            const pageManager = getPageCompositionManager()
            pageManager.setCompositionChangeHandler(() => {})
        }
    }, [config.enabled, config.debug, handlePageCompositionChange])

    /**
     * Legacy track function for backward compatibility
     * This is now deprecated in favor of page composition tracking
     */
    const track = useCallback(() => {
        try {
            // Early return if telemetry is disabled
            if (!config.enabled) {
                return
            }

            // Log deprecation warning in debug mode
            if (config.debug) {
                console.warn(
                    '⚠️ Blend Telemetry: Individual component tracking is deprecated. ' +
                        'Components now use page composition tracking automatically. ' +
                        'This track() call will be ignored.'
                )
            }

            // The new system handles tracking automatically through page composition
            // Individual track() calls are no longer needed
        } catch (error: unknown) {
            console.warn(
                'Blend telemetry: Error in legacy track function',
                error
            )
        }
    }, [config])

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
