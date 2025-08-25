/**
 * New page-composition-based telemetry hooks
 *
 * @fileoverview React hooks for page-level component composition tracking
 * @package @juspay/blend-design-system
 */

import { useEffect, useRef } from 'react'
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

    // Track component mount and prop changes
    useEffect(() => {
        const manager = getPageCompositionManager()
        const propsKey = safeStringify(props)

        // Register component with page composition manager
        manager.registerComponent(componentName, props)
        mountedRef.current = true
        lastPropsRef.current = propsKey

        // Cleanup function for unmount
        return () => {
            if (trackUnmount && mountedRef.current) {
                manager.unregisterComponent(componentName, props)
            }
            mountedRef.current = false
        }
    }, [componentName, safeStringify(props), trackUnmount])

    // Track prop changes
    useEffect(() => {
        if (!mountedRef.current) return

        const propsKey = safeStringify(props)
        if (lastPropsRef.current === propsKey) return

        const manager = getPageCompositionManager()

        // Unregister old props and register new props
        if (lastPropsRef.current) {
            try {
                const oldProps = JSON.parse(lastPropsRef.current)
                manager.unregisterComponent(componentName, oldProps)
            } catch {
                // Ignore parsing errors for old props
            }
        }

        manager.registerComponent(componentName, props)
        lastPropsRef.current = propsKey
    }, [componentName, safeStringify(props)])
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

// =====================================================
// MIGRATION HELPERS
// =====================================================

/**
 * Temporary hook that supports both old and new tracking systems
 * This allows for gradual migration from session-based to page-based tracking
 *
 * @param componentName - Name of the component being tracked
 * @param props - Component props to be sanitized and tracked
 * @param useNewSystem - Whether to use the new page composition system
 *
 * @deprecated This hook violates React rules and should be replaced with direct usage of useComponentPageTelemetry
 */
export function useMigrationTelemetry(
    componentName: string,
    props: Record<string, unknown>
) {
    // Always use the new system to avoid conditional hook calls
    // The old system is deprecated and should not be used
    return useComponentPageTelemetry(componentName, props)
}
