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
    ComponentUsageEvent,
    ProjectContext,
    TelemetryContextValue,
} from './types'

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

// Hooks (if needed by consumers)
export { useComponentTelemetry, useComponentRenderTelemetry } from './hooks'
