import type { BlendTelemetryConfig } from '../config/schema.js'
import type { DetectionResult } from '../detect/language-detector.js'
import type { BindingRegistry } from '../registry/binding-registry.js'
import type { PackageRegistry } from '../registry/package-registry.js'
import type { FileUsageResult } from './languages/base.js'
import { resolveRescriptFiles } from '../detect/rescript/source-resolver.js'
import { resolveTypeScriptFiles } from '../detect/typescript/source-resolver.js'
import { buildBindingRegistry } from '../registry/binding-registry.js'
import { buildPackageRegistry } from '../registry/package-registry.js'
import { scanReScriptFile } from './languages/rescript.js'
import { scanTypeScriptFile } from './languages/typescript.js'
import type { RescriptProjectConfig } from '../detect/rescript/project-finder.js'
import type { TypeScriptProjectConfig } from '../detect/typescript/project-finder.js'

export interface ScanResult {
    fileResults: FileUsageResult[]
    bindingRegistry: BindingRegistry
    packageRegistry: PackageRegistry
    scanStats: ScanStats
}

export interface ScanStats {
    totalFilesScanned: number
    rescriptFilesScanned: number
    typescriptFilesScanned: number
    bindingFilesFound: number
    filesWithErrors: number
    durationMs: number
}

export async function runScan(
    config: BlendTelemetryConfig,
    detection: DetectionResult
): Promise<ScanResult> {
    const start = Date.now()
    const allFileResults: FileUsageResult[] = []

    let combinedBindingRegistry: BindingRegistry = {
        byModuleName: new Map(),
        byBlendName: new Map(),
        files: [],
        functions: [],
    }

    let packageRegistry: PackageRegistry | null = null
    const seenFiles = new Set<string>()

    // ── ReScript projects ──────────────────────────────────────────────────────

    for (const langDetection of detection.languages) {
        if (langDetection.language !== 'rescript') continue

        for (const projectConfig of langDetection.projectConfigs as RescriptProjectConfig[]) {
            const fileSet = await resolveRescriptFiles(
                projectConfig,
                config.packageName,
                config.exclude
            )

            // Build binding registry from this project's binding files
            const bindingRegistry = await buildBindingRegistry(
                fileSet.bindingFiles,
                config.packageName
            )
            mergeBindingRegistries(combinedBindingRegistry, bindingRegistry)

            // Build package registry once (it's the same npm package regardless of sub-project)
            if (!packageRegistry) {
                packageRegistry = await buildPackageRegistry(
                    config.projectRoot,
                    config.packageName,
                    bindingRegistry
                )
            }

            // Scan app files
            const results = await scanFilesInBatches(
                fileSet.appFiles.filter((f) => !seenFiles.has(f)),
                async (f) => {
                    seenFiles.add(f)
                    return scanReScriptFile(f, bindingRegistry)
                }
            )

            allFileResults.push(...results)

            if (config.verbose) {
                console.log(
                    `  ReScript [${projectConfig.name}]: ` +
                        `${fileSet.bindingFiles.length} bindings, ${fileSet.appFiles.length} app files`
                )
            }
        }

        // Medium/low confidence — no project configs available, best-effort scan
        if (langDetection.projectConfigs.length === 0) {
            const results = await bestEffortRescriptScan(
                config,
                combinedBindingRegistry,
                seenFiles
            )
            allFileResults.push(...results)
        }
    }

    // ── TypeScript projects ────────────────────────────────────────────────────

    for (const langDetection of detection.languages) {
        if (langDetection.language !== 'typescript') continue

        // Ensure we have a package registry
        if (!packageRegistry) {
            const emptyBindingReg: BindingRegistry = {
                byModuleName: new Map(),
                byBlendName: new Map(),
                files: [],
                functions: [],
            }
            packageRegistry = await buildPackageRegistry(
                config.projectRoot,
                config.packageName,
                emptyBindingReg
            )
        }

        for (const projectConfig of langDetection.projectConfigs as TypeScriptProjectConfig[]) {
            const fileSet = await resolveTypeScriptFiles(
                projectConfig,
                config.exclude
            )

            const results = await scanFilesInBatches(
                fileSet.appFiles.filter((f) => !seenFiles.has(f)),
                async (f) => {
                    seenFiles.add(f)
                    return scanTypeScriptFile(
                        f,
                        packageRegistry!,
                        config.packageName
                    )
                }
            )

            allFileResults.push(...results)
        }

        // Medium/low confidence fallback — scan even when scanDirs is empty
        if (langDetection.projectConfigs.length === 0) {
            const results = await bestEffortTsScan(
                config,
                packageRegistry,
                seenFiles
            )
            allFileResults.push(...results)
        }
    }

    // Fallback package registry if nothing was found
    if (!packageRegistry) {
        packageRegistry = await buildPackageRegistry(
            config.projectRoot,
            config.packageName,
            combinedBindingRegistry
        )
    }

    const rsFiles = allFileResults.filter((r) => r.language === 'rescript')
    const tsFiles = allFileResults.filter((r) => r.language === 'typescript')
    const errFiles = allFileResults.filter((r) => r.parseError)

    return {
        fileResults: allFileResults,
        bindingRegistry: combinedBindingRegistry,
        packageRegistry,
        scanStats: {
            totalFilesScanned: allFileResults.length,
            rescriptFilesScanned: rsFiles.length,
            typescriptFilesScanned: tsFiles.length,
            bindingFilesFound: combinedBindingRegistry.files.length,
            filesWithErrors: errFiles.length,
            durationMs: Date.now() - start,
        },
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Scans files in batches of 50 to avoid overwhelming the file system.
 */
async function scanFilesInBatches<T>(
    files: string[],
    scanner: (f: string) => Promise<T>,
    batchSize = 50
): Promise<T[]> {
    const results: T[] = []
    for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize)
        const batchResults = await Promise.all(batch.map(scanner))
        results.push(...batchResults)
    }
    return results
}

function mergeBindingRegistries(
    target: BindingRegistry,
    source: BindingRegistry
) {
    for (const [key, components] of source.byModuleName) {
        if (!target.byModuleName.has(key)) {
            target.byModuleName.set(key, components)
        }
    }
    for (const [key, comp] of source.byBlendName) {
        if (!target.byBlendName.has(key)) {
            target.byBlendName.set(key, comp)
        }
    }
    target.files.push(...source.files)
    target.functions.push(...source.functions)
}

async function bestEffortRescriptScan(
    config: BlendTelemetryConfig,
    bindingRegistry: BindingRegistry,
    seenFiles: Set<string>
): Promise<FileUsageResult[]> {
    const fg = (await import('fast-glob')).default
    const patterns =
        config.scanDirs.length > 0
            ? config.scanDirs.flatMap((d) => [`${d}/**/*.res`])
            : ['**/*.res']
    const files = await fg(patterns, {
        cwd: config.projectRoot,
        ignore: [...config.exclude, '**/*.bs.js'],
        absolute: true,
    })

    return scanFilesInBatches(
        files.filter((f) => !seenFiles.has(f)),
        async (f) => {
            seenFiles.add(f)
            return scanReScriptFile(f, bindingRegistry)
        }
    )
}

async function bestEffortTsScan(
    config: BlendTelemetryConfig,
    packageRegistry: PackageRegistry,
    seenFiles: Set<string>
): Promise<FileUsageResult[]> {
    const fg = (await import('fast-glob')).default
    // Use configured scanDirs, or fall back to scanning the whole project root
    const patterns =
        config.scanDirs.length > 0
            ? config.scanDirs.flatMap((d) => [`${d}/**/*.ts`, `${d}/**/*.tsx`])
            : ['**/*.ts', '**/*.tsx']
    const files = await fg(patterns, {
        cwd: config.projectRoot,
        ignore: [...config.exclude, '**/*.d.ts'],
        absolute: true,
    })

    return scanFilesInBatches(
        files.filter((f) => !seenFiles.has(f)),
        async (f) => {
            seenFiles.add(f)
            return scanTypeScriptFile(f, packageRegistry, config.packageName)
        }
    )
}
