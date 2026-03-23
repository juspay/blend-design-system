import type { BlendTelemetryConfig } from './schema.js'

export const DEFAULT_PACKAGE_NAME = '@juspay/blend-design-system'

export const DEFAULT_EXCLUDE = [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/.turbo/**',
    '**/__pycache__/**',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.stories.ts',
    '**/*.stories.tsx',
    '**/*.stories.res',
    '**/*.test.res',
]

/** Generated ReScript suffixes — never scan these */
export const RESCRIPT_GENERATED_SUFFIXES = ['.bs.js', '.gen.ts', '.gen.tsx']

export function getDefaults(projectRoot: string): BlendTelemetryConfig {
    return {
        packageName: DEFAULT_PACKAGE_NAME,
        scanDirs: [], // populated by auto-detection
        bindingsDir: null, // populated by auto-detection
        exclude: DEFAULT_EXCLUDE,
        excludeGeneratedFiles: true,
        languages: {
            rescript: true,
            typescript: true,
            javascript: false,
        },
        reporters: ['console'],
        outputDir: '.blend-telemetry',
        ci: {
            enabled: false,
            failIfAdoptionBelow: 0,
            failIfComponentUnused: [],
            warnIfPropCoverageBelow: 0,
        },
        incrementalCache: true,
        projectRoot,
        verbose: false,
        quiet: false,
    }
}
