export interface ReportMeta {
    generatedAt: string // ISO timestamp
    toolVersion: string
    packageName: string
    /** Version actually installed in node_modules — what the code runs against */
    packageVersion: string
    /** Version declared in package.json — what the developer intends to use */
    declaredVersion: string | null
    /** True when node_modules is out of sync with package.json (run install to fix) */
    versionMismatch: boolean
    projectRoot: string
    scanDurationMs: number
    totalFilesScanned: number
    bindingFilesFound: number
    filesWithParseErrors: number
}

export interface SummaryMetrics {
    /** Total components available in the design system */
    totalComponentsAvailable: number
    /** Number of unique components that have at least one usage */
    totalComponentsUsed: number
    /** Percentage: used / available */
    adoptionRate: number
    /** Sum of all usage occurrences across all components */
    totalUsageCount: number
    /** Number of source files that have at least one blend usage */
    filesWithBlendUsage: number
    /** Top 10 components by usage count */
    topComponents: Array<{ name: string; count: number; percentage: number }>
    /** Components defined in registry but never used */
    unusedComponents: string[]
}

export interface PropUsageMetric {
    propName: string
    /** How many JSX instances pass this prop */
    usageCount: number
    /** usageCount / total component usages */
    usageRate: number
    /** Distribution of values: { "primary": 12, "secondary": 5 } */
    valueDistribution: Record<string, number>
    /** Is this prop declared in the ReScript binding? */
    isDeclaredInBinding: boolean
}

export interface VariantDistributionMetric {
    /** The prop name that holds the variant e.g. "buttonType" */
    propName: string
    /** Distribution across values: { "Primary": 10, "secondary": 3 } */
    distribution: Record<string, number>
    /** Number of usages where this prop was NOT specified (default used) */
    unspecifiedCount: number
}

export interface ComponentMetrics {
    componentName: string
    /** The binding module name in ReScript e.g. "ButtonBinding" */
    bindingName: string | null
    /** Total usage count across all files */
    usageCount: number
    /** Is this component used at all? */
    isUsed: boolean
    /** Sorted list of files that use this component */
    filesUsedIn: string[]
    /** Per-prop usage metrics */
    propUsage: PropUsageMetric[]
    /** Per-variant-prop distribution */
    variantDistribution: VariantDistributionMetric[]
    /** Number of usages with spread props (static analysis limited) */
    spreadPropUsages: number
    /** Number of dynamic usages (createElement etc.) */
    dynamicUsages: number
}

export interface FileMetrics {
    filePath: string
    /** Path relative to project root */
    relativePath: string
    language: 'rescript' | 'typescript' | 'javascript'
    /** Unique blend component names used in this file */
    components: string[]
    /** Total usage count in this file (may have same component multiple times) */
    totalUsages: number
    /** File uses blend via adapter/context gate */
    isAdapter: boolean
    /** File wraps a binding and re-exports it */
    isWrapper: boolean
    /** File directly renders blend components */
    isDirect: boolean
}

export interface MigrationMetrics {
    /** Files that use the adapter pattern (gated by isBlendEnabled etc.) */
    adapterPatternFiles: number
    /** Files that directly use blend with no gating */
    directBlendFiles: number
    /** Files that are wrappers/HOCs around blend */
    wrapperFiles: number
    /** Estimated migration completion (direct / (direct + adapter)) */
    migrationCompletionRate: number
    /** Relative paths of adapter files */
    adapterFilePaths: string[]
    /** Relative paths of direct files */
    directFilePaths: string[]
    /** Relative paths of wrapper files */
    wrapperFilePaths: string[]
    /** Which components are still gated vs fully migrated */
    componentsByMigrationStatus: {
        fullyMigrated: string[]
        partiallyMigrated: string[]
        adapterOnly: string[]
    }
}

export interface LanguageBreakdown {
    rescript: { files: number; usages: number; percentage: number }
    typescript: { files: number; usages: number; percentage: number }
    javascript: { files: number; usages: number; percentage: number }
}

export interface CIResult {
    passed: boolean
    failures: string[]
    warnings: string[]
}

export interface BlendTelemetryReport {
    meta: ReportMeta
    summary: SummaryMetrics
    componentMetrics: ComponentMetrics[]
    fileMetrics: FileMetrics[]
    migrationMetrics: MigrationMetrics
    languageBreakdown: LanguageBreakdown
    ci: CIResult | null
}
