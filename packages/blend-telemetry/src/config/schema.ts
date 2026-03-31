export type ReporterType = 'console' | 'json' | 'html'
export type Language = 'rescript' | 'typescript' | 'javascript'

export interface CIConfig {
    enabled: boolean
    /** Exit 1 if overall adoption rate is below this threshold (0–100) */
    failIfAdoptionBelow: number
    /** Exit 1 if any of these components have zero usages */
    failIfComponentUnused: string[]
    /** Warn (non-fatal) if any component's prop coverage is below this (0–100) */
    warnIfPropCoverageBelow: number
}

export interface LanguageConfig {
    rescript: boolean
    typescript: boolean
    javascript: boolean
}

export interface BlendTelemetryConfig {
    /** npm package name being tracked. Default: @juspay/blend-design-system */
    packageName: string

    /** Directories to scan (relative to projectRoot). Auto-derived from rescript.json / tsconfig when possible. */
    scanDirs: string[]

    /** Directory containing ReScript binding files. Auto-detected when possible. */
    bindingsDir: string | null

    /** Glob patterns to always exclude */
    exclude: string[]

    /** Skip auto-generated compiled files (*.bs.js). Default: true */
    excludeGeneratedFiles: boolean

    /** Which languages to scan */
    languages: LanguageConfig

    /** Which reporters to run */
    reporters: ReporterType[]

    /** Where to write reporter output files. Default: .blend-telemetry */
    outputDir: string

    /** CI threshold configuration */
    ci: CIConfig

    /** Cache scan results between runs for performance. Default: true */
    incrementalCache: boolean

    /** Project root. Resolved from --dir flag or cwd. */
    projectRoot: string

    /** Show per-file breakdown in console output */
    verbose: boolean

    /** Suppress all output except errors */
    quiet: boolean
}
