// Public API — for programmatic usage
export type { BlendTelemetryReport } from './metrics/definitions.js'
export type { BlendTelemetryConfig } from './config/schema.js'
export type { DetectionResult } from './detect/language-detector.js'
export type { ScanResult } from './scanner/index.js'

export { loadConfig } from './config/loader.js'
export { detectLanguages } from './detect/language-detector.js'
export { runScan } from './scanner/index.js'
export { collectMetrics } from './metrics/collector.js'
