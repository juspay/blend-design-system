import { relative } from 'path'
import type { FileUsageResult, RawUsage } from '../scanner/languages/base.js'
import type {
    BindingRegistry,
    ComponentBinding,
} from '../registry/binding-registry.js'
import type { PackageRegistry } from '../registry/package-registry.js'
import type { BlendTelemetryConfig } from '../config/schema.js'
import type { ScanStats } from '../scanner/index.js'
import type {
    BlendTelemetryReport,
    ComponentMetrics,
    FileMetrics,
    MigrationMetrics,
    LanguageBreakdown,
    PropUsageMetric,
    VariantDistributionMetric,
    CIResult,
    SummaryMetrics,
} from './definitions.js'

// Injected at build time by tsup define — reads from package.json, never drifts.
declare const __BLEND_TOOL_VERSION__: string
const TOOL_VERSION: string = __BLEND_TOOL_VERSION__

export function collectMetrics(
    fileResults: FileUsageResult[],
    bindingRegistry: BindingRegistry,
    packageRegistry: PackageRegistry,
    config: BlendTelemetryConfig,
    scanStats: ScanStats
): BlendTelemetryReport {
    // Filter out files with no usages for most metrics
    const filesWithUsage = fileResults.filter((f) => f.usages.length > 0)

    const componentMetrics = buildComponentMetrics(
        filesWithUsage,
        bindingRegistry,
        packageRegistry,
        config.projectRoot
    )

    const summary = buildSummary(
        componentMetrics,
        filesWithUsage,
        packageRegistry
    )
    const fileMetrics = buildFileMetrics(fileResults, config.projectRoot)
    const migrationMetrics = buildMigrationMetrics(
        fileResults,
        componentMetrics,
        config.projectRoot
    )
    const languageBreakdown = buildLanguageBreakdown(fileResults)
    const ci = config.ci.enabled
        ? evaluateCI(summary, componentMetrics, config)
        : null

    return {
        meta: {
            generatedAt: new Date().toISOString(),
            toolVersion: TOOL_VERSION,
            packageName: config.packageName,
            packageVersion: packageRegistry.version,
            declaredVersion: packageRegistry.declaredVersion,
            versionMismatch: packageRegistry.versionMismatch,
            projectRoot: config.projectRoot,
            scanDurationMs: scanStats.durationMs,
            totalFilesScanned: scanStats.totalFilesScanned,
            bindingFilesFound: scanStats.bindingFilesFound,
            filesWithParseErrors: scanStats.filesWithErrors,
        },
        summary,
        componentMetrics,
        fileMetrics,
        migrationMetrics,
        languageBreakdown,
        ci,
    }
}

// ─── Component metrics ────────────────────────────────────────────────────────

function buildComponentMetrics(
    filesWithUsage: FileUsageResult[],
    bindingRegistry: BindingRegistry,
    packageRegistry: PackageRegistry,
    projectRoot: string
): ComponentMetrics[] {
    // Collect all usages grouped by blend component name
    const usagesByComponent = new Map<
        string,
        Array<{ usage: RawUsage; filePath: string }>
    >()

    for (const fileResult of filesWithUsage) {
        for (const usage of fileResult.usages) {
            const existing = usagesByComponent.get(usage.blendName) ?? []
            existing.push({ usage, filePath: fileResult.filePath })
            usagesByComponent.set(usage.blendName, existing)
        }
    }

    // Use registry component list, or fall back to components found in actual usages
    // (covers cases where node_modules isn't available — e.g. scanning the package's own repo)
    const componentList =
        packageRegistry.components.length > 0
            ? packageRegistry.components
            : [...usagesByComponent.keys()].sort()

    // Build metric per known component
    return componentList.map((componentName) => {
        const entries = usagesByComponent.get(componentName) ?? []
        const binding = bindingRegistry.byBlendName.get(componentName) ?? null

        return {
            componentName,
            bindingName: binding?.bindingModuleName ?? null,
            usageCount: entries.length,
            isUsed: entries.length > 0,
            filesUsedIn: [
                ...new Set(
                    entries.map((e) => relative(projectRoot, e.filePath))
                ),
            ].sort(),
            propUsage: buildPropUsage(
                entries.map((e) => e.usage),
                binding
            ),
            variantDistribution: buildVariantDistribution(
                entries.map((e) => e.usage),
                binding
            ),
            spreadPropUsages: entries.filter((e) => e.usage.hasSpreadProps)
                .length,
            dynamicUsages: entries.filter((e) => e.usage.isDynamic).length,
        }
    })
}

function buildPropUsage(
    usages: RawUsage[],
    binding: ComponentBinding | null
): PropUsageMetric[] {
    if (usages.length === 0) return []

    // Aggregate prop occurrences across all usages
    const propCounts = new Map<
        string,
        { count: number; values: Record<string, number> }
    >()

    for (const usage of usages) {
        for (const prop of usage.props) {
            const existing = propCounts.get(prop.name) ?? {
                count: 0,
                values: {},
            }
            existing.count++

            if (prop.value !== null) {
                existing.values[prop.value] =
                    (existing.values[prop.value] ?? 0) + 1
            }

            propCounts.set(prop.name, existing)
        }
    }

    const bindingPropNames = new Set(binding?.props.map((p) => p.name) ?? [])

    return [...propCounts.entries()]
        .sort((a, b) => b[1].count - a[1].count)
        .map(([propName, data]) => ({
            propName,
            usageCount: data.count,
            usageRate: Math.round((data.count / usages.length) * 100) / 100,
            valueDistribution: data.values,
            isDeclaredInBinding: bindingPropNames.has(propName),
        }))
}

function buildVariantDistribution(
    usages: RawUsage[],
    binding: ComponentBinding | null
): VariantDistributionMetric[] {
    if (!binding) return []

    const result: VariantDistributionMetric[] = []

    // Find props whose type is a variant type defined in the binding
    const variantProps = binding.props.filter(
        (p) => binding.variantTypes[p.type] !== undefined
    )

    for (const variantProp of variantProps) {
        const distribution: Record<string, number> = {}
        let unspecifiedCount = 0

        for (const usage of usages) {
            const propUsage = usage.props.find(
                (p) => p.name === variantProp.name
            )
            if (!propUsage || propUsage.value === null) {
                unspecifiedCount++
                continue
            }
            distribution[propUsage.value] =
                (distribution[propUsage.value] ?? 0) + 1
        }

        result.push({
            propName: variantProp.name,
            distribution,
            unspecifiedCount,
        })
    }

    return result
}

// ─── File metrics ─────────────────────────────────────────────────────────────

function buildFileMetrics(
    fileResults: FileUsageResult[],
    projectRoot: string
): FileMetrics[] {
    return fileResults
        .filter((f) => f.usages.length > 0)
        .map((f) => ({
            filePath: f.filePath,
            relativePath: relative(projectRoot, f.filePath),
            language: f.language,
            components: [...new Set(f.usages.map((u) => u.blendName))].sort(),
            totalUsages: f.usages.length,
            isAdapter: f.context.isAdapter,
            isWrapper: f.context.isWrapper,
            isDirect: f.context.isDirect,
        }))
        .sort((a, b) => b.totalUsages - a.totalUsages)
}

// ─── Summary ──────────────────────────────────────────────────────────────────

function buildSummary(
    componentMetrics: ComponentMetrics[],
    filesWithUsage: FileUsageResult[],
    packageRegistry: PackageRegistry
): SummaryMetrics {
    const usedComponents = componentMetrics.filter((c) => c.isUsed)
    const totalUsageCount = componentMetrics.reduce(
        (sum, c) => sum + c.usageCount,
        0
    )

    const topComponents = usedComponents
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 10)
        .map((c) => ({
            name: c.componentName,
            count: c.usageCount,
            percentage:
                totalUsageCount > 0
                    ? Math.round((c.usageCount / totalUsageCount) * 1000) / 10
                    : 0,
        }))

    // When registry has no component list (package not in node_modules), use discovered count
    const totalAvailable =
        packageRegistry.components.length > 0
            ? packageRegistry.components.length
            : componentMetrics.length

    const adoptionRate =
        totalAvailable > 0
            ? Math.round((usedComponents.length / totalAvailable) * 1000) / 10
            : 0

    return {
        totalComponentsAvailable: totalAvailable,
        totalComponentsUsed: usedComponents.length,
        adoptionRate,
        totalUsageCount,
        filesWithBlendUsage: filesWithUsage.length,
        topComponents,
        unusedComponents: componentMetrics
            .filter((c) => !c.isUsed)
            .map((c) => c.componentName),
    }
}

// ─── Migration metrics ────────────────────────────────────────────────────────

function buildMigrationMetrics(
    fileResults: FileUsageResult[],
    componentMetrics: ComponentMetrics[],
    projectRoot: string
): MigrationMetrics {
    const adapterFiles = fileResults.filter(
        (f) => f.context.isAdapter && f.usages.length > 0
    )
    const directFiles = fileResults.filter(
        (f) => f.context.isDirect && !f.context.isWrapper
    )
    const wrapperFiles = fileResults.filter((f) => f.context.isWrapper)

    const total = adapterFiles.length + directFiles.length
    const migrationRate =
        total > 0 ? Math.round((directFiles.length / total) * 1000) / 10 : 100

    // Classify components by how they appear
    const adapterComponentNames = new Set(
        adapterFiles.flatMap((f) => f.usages.map((u) => u.blendName))
    )
    const directComponentNames = new Set(
        directFiles.flatMap((f) => f.usages.map((u) => u.blendName))
    )

    const fullyMigrated: string[] = []
    const partiallyMigrated: string[] = []
    const adapterOnly: string[] = []

    for (const comp of componentMetrics.filter((c) => c.isUsed)) {
        const inDirect = directComponentNames.has(comp.componentName)
        const inAdapter = adapterComponentNames.has(comp.componentName)

        if (inDirect && !inAdapter) fullyMigrated.push(comp.componentName)
        else if (inDirect && inAdapter)
            partiallyMigrated.push(comp.componentName)
        else if (inAdapter) adapterOnly.push(comp.componentName)
    }

    return {
        adapterPatternFiles: adapterFiles.length,
        directBlendFiles: directFiles.length,
        wrapperFiles: wrapperFiles.length,
        migrationCompletionRate: migrationRate,
        adapterFilePaths: adapterFiles
            .map((f) => relative(projectRoot, f.filePath))
            .sort(),
        directFilePaths: directFiles
            .map((f) => relative(projectRoot, f.filePath))
            .sort(),
        wrapperFilePaths: wrapperFiles
            .map((f) => relative(projectRoot, f.filePath))
            .sort(),
        componentsByMigrationStatus: {
            fullyMigrated,
            partiallyMigrated,
            adapterOnly,
        },
    }
}

// ─── Language breakdown ───────────────────────────────────────────────────────

function buildLanguageBreakdown(
    fileResults: FileUsageResult[]
): LanguageBreakdown {
    const rs = fileResults.filter(
        (f) => f.language === 'rescript' && f.usages.length > 0
    )
    const ts = fileResults.filter(
        (f) => f.language === 'typescript' && f.usages.length > 0
    )
    const js = fileResults.filter(
        (f) => f.language === 'javascript' && f.usages.length > 0
    )
    const totalFiles = rs.length + ts.length + js.length

    const rsUsages = rs.reduce((s, f) => s + f.usages.length, 0)
    const tsUsages = ts.reduce((s, f) => s + f.usages.length, 0)
    const jsUsages = js.reduce((s, f) => s + f.usages.length, 0)

    const pct = (n: number) =>
        totalFiles > 0 ? Math.round((n / totalFiles) * 1000) / 10 : 0

    return {
        rescript: {
            files: rs.length,
            usages: rsUsages,
            percentage: pct(rs.length),
        },
        typescript: {
            files: ts.length,
            usages: tsUsages,
            percentage: pct(ts.length),
        },
        javascript: {
            files: js.length,
            usages: jsUsages,
            percentage: pct(js.length),
        },
    }
}

// ─── CI evaluation ────────────────────────────────────────────────────────────

function evaluateCI(
    summary: SummaryMetrics,
    componentMetrics: ComponentMetrics[],
    config: BlendTelemetryConfig
): CIResult {
    const failures: string[] = []
    const warnings: string[] = []

    if (
        config.ci.failIfAdoptionBelow > 0 &&
        summary.adoptionRate < config.ci.failIfAdoptionBelow
    ) {
        failures.push(
            `Adoption rate ${summary.adoptionRate}% is below required ${config.ci.failIfAdoptionBelow}%`
        )
    }

    for (const componentName of config.ci.failIfComponentUnused) {
        const metric = componentMetrics.find(
            (c) => c.componentName === componentName
        )
        if (!metric || !metric.isUsed) {
            failures.push(
                `Component "${componentName}" has zero usages (required by CI config)`
            )
        }
    }

    if (config.ci.warnIfPropCoverageBelow > 0) {
        for (const comp of componentMetrics.filter((c) => c.isUsed)) {
            const totalProps = comp.propUsage.filter(
                (p) => p.isDeclaredInBinding
            ).length
            const usedProps = comp.propUsage.filter(
                (p) => p.isDeclaredInBinding && p.usageCount > 0
            ).length
            const coverage =
                totalProps > 0 ? (usedProps / totalProps) * 100 : 100

            if (coverage < config.ci.warnIfPropCoverageBelow) {
                warnings.push(
                    `${comp.componentName}: prop coverage ${Math.round(coverage)}% < ${config.ci.warnIfPropCoverageBelow}%`
                )
            }
        }
    }

    return { passed: failures.length === 0, failures, warnings }
}
