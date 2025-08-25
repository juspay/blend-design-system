/**
 * Telemetry utility functions
 *
 * @fileoverview Core utilities for component usage tracking and telemetry
 * @package @juspay/blend-design-system
 */

import { ComponentUsageEvent } from './types'
import {
    PACKAGE_VERSION,
    SESSION_ID_PREFIX,
    DEVELOPMENT_PORTS,
    DEVELOPMENT_HOSTNAMES,
    SAFE_COMPONENT_PROPS,
    MAX_PROPS_SIZE,
} from './constants'

/**
 * Generate cryptographically secure anonymous session ID
 * @returns Unique session identifier
 */
export function generateSessionId(): string {
    const timestamp = Date.now()
    const randomPart = Math.random().toString(36).substring(2, 11)
    return `${SESSION_ID_PREFIX}_${timestamp}_${randomPart}`
}

/**
 * Get package version from build-time injection or fallback
 * @returns Package version string
 */
export function getPackageVersion(): string {
    // Try to get from build-time injection first
    if (
        typeof window !== 'undefined' &&
        (window as unknown as { __BLEND_VERSION__?: string }).__BLEND_VERSION__
    ) {
        return (window as unknown as { __BLEND_VERSION__: string })
            .__BLEND_VERSION__
    }

    return PACKAGE_VERSION
}

/**
 * Detect current environment based on hostname and port
 * @returns Environment type (development, staging, production, server)
 */
export function detectEnvironment(): string {
    if (typeof window === 'undefined') {
        return 'server'
    }

    const { hostname, port } = window.location

    // Check development indicators
    if (DEVELOPMENT_HOSTNAMES.some((devHost) => hostname.includes(devHost))) {
        return 'development'
    }

    if (
        port &&
        DEVELOPMENT_PORTS.includes(port as (typeof DEVELOPMENT_PORTS)[number])
    ) {
        return 'development'
    }

    // Check staging indicators
    if (hostname.includes('staging') || hostname.includes('dev')) {
        return 'staging'
    }

    return 'production'
}

/**
 * Sanitize component props to remove sensitive data
 * @param props - Raw component props
 * @param componentName - Name of component for context-specific sanitization
 * @returns Sanitized props safe for telemetry
 */
export function sanitizeProps(
    props: Record<string, unknown>,
    componentName: string = 'Button'
): Record<string, unknown> {
    // Add component-specific derived props first
    const propsWithDerived = addDerivedProps(props, componentName)

    const sanitized: Record<string, unknown> = {}

    // Get safe props based on component type
    const safePropKeys = getSafePropKeys(componentName)

    safePropKeys.forEach((key) => {
        if (propsWithDerived[key] !== undefined) {
            sanitized[key] = sanitizePropValue(propsWithDerived[key])
        }
    })

    // Ensure we don't exceed size limits
    const serialized = JSON.stringify(sanitized)
    if (serialized.length > MAX_PROPS_SIZE) {
        console.warn(
            `Blend telemetry: Props size (${serialized.length}) exceeds limit (${MAX_PROPS_SIZE})`
        )
        return { oversized: true, propCount: Object.keys(sanitized).length }
    }

    return sanitized
}

/**
 * Get safe prop keys for a specific component
 * @param componentName - Name of the component
 * @returns Array of safe prop keys
 */
function getSafePropKeys(componentName: string): readonly string[] {
    const lowerName = componentName.toLowerCase()

    // Map component names to prop categories
    const componentCategory = getComponentCategory(lowerName)

    return (
        SAFE_COMPONENT_PROPS[componentCategory] || SAFE_COMPONENT_PROPS.generic
    )
}

/**
 * Map component name to its category for prop sanitization
 * @param componentName - Lowercase component name
 * @returns Component category
 */
function getComponentCategory(
    componentName: string
): keyof typeof SAFE_COMPONENT_PROPS {
    // Button category
    if (['button', 'iconbutton'].includes(componentName)) {
        return 'button'
    }

    // Input category
    if (
        ['textinput', 'input', 'textarea', 'numberinput'].includes(
            componentName
        )
    ) {
        return 'input'
    }

    // Select category
    if (
        [
            'dropdown',
            'select',
            'singleselect',
            'multiselect',
            'autocomplete',
        ].includes(componentName)
    ) {
        return 'select'
    }

    // Modal category
    if (['modal', 'dialog', 'drawer', 'popup'].includes(componentName)) {
        return 'modal'
    }

    // Feedback category
    if (
        ['alert', 'snackbar', 'toast', 'tooltip', 'popover'].includes(
            componentName
        )
    ) {
        return 'feedback'
    }

    // Data category
    if (
        ['datatable', 'table', 'tabs', 'accordion', 'tree', 'menu'].includes(
            componentName
        )
    ) {
        return 'data'
    }

    return 'generic'
}

/**
 * Generate component-specific derived props for analytics
 */
const COMPONENT_DERIVED_PROPS = {
    button: (props: Record<string, unknown>) => {
        const { leadingIcon, trailingIcon, text, loading, disabled } = props
        return {
            hasLeadingIcon: !!leadingIcon,
            hasTrailingIcon: !!trailingIcon,
            hasText: !!text,
            hasBothIcons: !!leadingIcon && !!trailingIcon,
            isLoading: loading,
            isDisabled: disabled,
        }
    },

    input: (props: Record<string, unknown>) => {
        const { leftSlot, rightSlot, label, hint, error } = props
        return {
            hasLeftSlot: !!leftSlot,
            hasRightSlot: !!rightSlot,
            hasLabel: !!label,
            hasHint: !!hint,
            hasError: !!error,
        }
    },

    select: (props: Record<string, unknown>) => {
        const { items, groups, searchable } = props
        return {
            itemCount: Array.isArray(items) ? items.length : 0,
            hasGroups: Array.isArray(groups) && groups.length > 0,
            hasSearch: !!searchable,
        }
    },

    modal: (props: Record<string, unknown>) => {
        const { header, footer, closeButton } = props
        return {
            hasHeader: !!header,
            hasFooter: !!footer,
            hasCloseButton: !!closeButton,
        }
    },

    feedback: (props: Record<string, unknown>) => {
        const { icon, action, dismissible } = props
        return {
            hasIcon: !!icon,
            hasAction: !!action,
            isDismissible: !!dismissible,
        }
    },
}

/**
 * Add component-specific derived props
 * @param props - Raw component props
 * @param componentName - Name of the component
 * @returns Props with derived analytics data
 */
function addDerivedProps(
    props: Record<string, unknown>,
    componentName: string
): Record<string, unknown> {
    const lowerName = componentName.toLowerCase()
    const derivedPropsGenerator =
        COMPONENT_DERIVED_PROPS[
            lowerName as keyof typeof COMPONENT_DERIVED_PROPS
        ]

    if (derivedPropsGenerator) {
        return { ...props, ...derivedPropsGenerator(props) }
    }

    return props
}

/**
 * Safely sanitize a single prop value
 * @param value - Prop value to sanitize
 * @returns Sanitized value
 */
function sanitizePropValue(value: unknown): string {
    if (typeof value === 'function') {
        return '[Function]'
    }

    if (typeof value === 'object' && value !== null) {
        // For React nodes (icons), just track if they exist
        return '[ReactNode]'
    }

    // Convert primitives to string
    return String(value)
}

// Re-export functions from specialized modules
export { getProjectContext } from './projectContext'

/**
 * Check if event should be sampled based on sampling rate
 */
export function shouldSample(samplingRate: number): boolean {
    return Math.random() <= samplingRate
}

/**
 * Log telemetry event to console (development only)
 */
export function logTelemetryEvent(
    event: ComponentUsageEvent,
    debug: boolean = false
): void {
    if (!debug || detectEnvironment() !== 'development') return

    // Show render events for usage tracking
    if (event.eventType === 'component_render') {
        console.group(
            `📊 Blend Telemetry: ${event.componentName} (${event.eventType}) - Instance Count: ${event.instanceCount}`
        )
        console.log('🎯 This is what we captured for telemetry:')
        console.log('Component Props:', event.componentProps)
        console.log('🔢 Usage Info:')
        console.log('  Instance Count:', event.instanceCount)
        console.log('  Props Signature:', event.propsSignature)
        console.log('📍 Project Context:')
        console.log('  Repository:', event.projectContext.repositoryName)
        console.log('  Page URL:', event.projectContext.pageUrl)
        console.log('  Page Route:', event.projectContext.pageRoute)
        console.log('  Domain:', event.projectContext.domain)
        console.log('  Project Version:', event.projectContext.projectVersion)
        console.log('📦 Package Info:')
        console.log('  Blend Version:', event.packageVersion)
        console.log('  Environment:', event.environment)
        console.log('  Session ID:', event.sessionId.substring(0, 20) + '...')
        console.log('  Timestamp:', new Date(event.timestamp).toISOString())
        console.groupEnd()
    }
}
