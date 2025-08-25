/**
 * New page-composition-based telemetry hooks
 *
 * @fileoverview React hooks for page-level component composition tracking
 * @package @juspay/blend-design-system
 */

import { useEffect, useRef, useMemo } from 'react'
import { getPageCompositionManager } from './pageComposition'

/**
 * Safe JSON stringify that handles circular references
 */
function safeStringify(obj: unknown): string {
    const seen = new WeakSet()
    return JSON.stringify(obj, (_key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]'
            }
            seen.add(value)
        }
        // Handle functions and other non-serializable values
        if (typeof value === 'function') {
            return '[Function]'
        }
        if (value instanceof Element || (value && value.$$typeof)) {
            return '[ReactElement]'
        }
        return value
    })
}

/**
 * Hook to track component usage with page-level composition tracking
 * This replaces the old session-based individual component tracking
 *
 * @param componentName - Name of the component being tracked
 * @param props - Component props to be sanitized and tracked
 * @param options - Additional tracking options
 */
export function usePageCompositionTelemetry(
    componentName: string,
    props: Record<string, unknown>,
    options: {
        /** Whether to track component unmount */
        trackUnmount?: boolean
    } = {}
) {
    const { trackUnmount = false } = options
    const mountedRef = useRef(false)
    const lastPropsRef = useRef<string>('')
    const registeredRef = useRef(false)

    // Memoize the props key to prevent unnecessary recalculations
    const propsKey = useMemo(() => safeStringify(props), [props])

    // Track component mount and prop changes
    useEffect(() => {
        const manager = getPageCompositionManager()

        // Only register if props have actually changed or component is mounting for first time
        if (!registeredRef.current || lastPropsRef.current !== propsKey) {
            // Unregister old props if this is a prop change (not initial mount)
            if (registeredRef.current && lastPropsRef.current) {
                try {
                    const oldProps = JSON.parse(lastPropsRef.current)
                    manager.unregisterComponent(componentName, oldProps)
                } catch {
                    // Ignore parsing errors for old props
                }
            }

            // Register component with new props
            manager.registerComponent(componentName, props)
            mountedRef.current = true
            registeredRef.current = true
            lastPropsRef.current = propsKey
        }

        // Cleanup function for unmount
        return () => {
            if (trackUnmount && mountedRef.current && registeredRef.current) {
                manager.unregisterComponent(componentName, props)
                registeredRef.current = false
            }
            mountedRef.current = false
        }
    }, [componentName, propsKey, trackUnmount])
}

/**
 * Simple hook to track component renders only (no unmount tracking)
 * This is the recommended hook for most components
 *
 * @param componentName - Name of the component being tracked
 * @param props - Component props to be sanitized and tracked
 */
export function useComponentPageTelemetry(
    componentName: string,
    props: Record<string, unknown>
) {
    return usePageCompositionTelemetry(componentName, props, {
        trackUnmount: false,
    })
}

/**
 * Hook factory for creating component-specific telemetry hooks
 * This replaces the old createComponentTelemetryHook function
 *
 * @param componentName - Name of the component
 * @returns Hook function for that component
 */
export function createPageCompositionHook(componentName: string) {
    return function useComponentSpecificPageTelemetry(
        props: Record<string, unknown>
    ) {
        return useComponentPageTelemetry(componentName, props)
    }
}
