/**
 * Telemetry hooks for component tracking
 *
 * @fileoverview Reusable React hooks for adding telemetry to any component
 * @package @juspay/blend-design-system
 */

import { useEffect, useRef } from 'react'
import { useTelemetry } from './TelemetryContext'
import { sanitizeProps } from './utils'

/**
 * Hook to track component usage telemetry with session-based deduplication
 * @param componentName - Name of the component being tracked
 * @param props - Component props to be sanitized and tracked
 * @param options - Additional tracking options
 */
export function useComponentTelemetry(
    componentName: string,
    props: Record<string, unknown>,
    options: {
        /** Whether to track mount/unmount events */
        trackLifecycle?: boolean
        /** Whether to track prop changes */
        trackPropChanges?: boolean
    } = {}
) {
    const { track } = useTelemetry()
    const {
        trackLifecycle = false, // Default to false to use session-based deduplication
        trackPropChanges = true,
    } = options

    const mountedRef = useRef(false)
    const lastTrackedProps = useRef<string>('')

    // Track component mount (optional)
    useEffect(() => {
        if (!trackLifecycle || mountedRef.current) return

        mountedRef.current = true

        track({
            eventType: 'component_mount',
            componentName,
            componentProps: sanitizeProps(props, componentName),
        })

        return () => {
            track({
                eventType: 'component_unmount',
                componentName,
                componentProps: sanitizeProps(props, componentName),
            })
        }
    }, [componentName, track, trackLifecycle])

    // Track prop changes with deduplication
    useEffect(() => {
        if (!trackPropChanges) return

        const sanitizedProps = sanitizeProps(props, componentName)
        const propsKey = JSON.stringify(sanitizedProps)

        // Local deduplication to avoid unnecessary track() calls
        if (lastTrackedProps.current === propsKey) return
        lastTrackedProps.current = propsKey

        // The TelemetryContext will handle session-based deduplication
        track({
            eventType: 'component_render',
            componentName,
            componentProps: sanitizedProps,
        })
    }, [componentName, track, trackPropChanges, props])
}

/**
 * Simple hook to track component renders only (no lifecycle events)
 * @param componentName - Name of the component being tracked
 * @param props - Component props to be sanitized and tracked
 */
export function useComponentRenderTelemetry(
    componentName: string,
    props: Record<string, unknown>
) {
    return useComponentTelemetry(componentName, props, {
        trackLifecycle: false,
        trackPropChanges: true,
    })
}
