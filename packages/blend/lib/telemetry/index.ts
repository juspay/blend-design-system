/**
 * Telemetry module public API
 *
 * @fileoverview Main entry point for telemetry functionality
 * @package @juspay/blend-design-system
 */

// Core components and providers
export { TelemetryProvider, useTelemetry } from './TelemetryContext'

// Types
export type {
    TelemetryConfig,
    TelemetryContextValue,
    PageCompositionEvent,
} from './types'

export type { PageComposition, ComponentSummary } from './pageComposition'

// Utilities (selective export)
export {
    sanitizeProps,
    detectEnvironment,
    getPackageVersion,
    generateSessionId,
} from './utils'

// Constants (selective export)
export {
    PACKAGE_VERSION,
    PACKAGE_NAME,
    DEFAULT_SAMPLING_RATE,
} from './constants'

// Page composition system
export {
    getPageCompositionManager,
    registerPageComponent,
    unregisterPageComponent,
} from './pageComposition'

// Page composition hooks
export {
    usePageCompositionTelemetry,
    useComponentPageTelemetry,
    createPageCompositionHook,
} from './newHooks'

// Component-specific hooks (pre-configured for all design system components)
export * from './componentHooks'
