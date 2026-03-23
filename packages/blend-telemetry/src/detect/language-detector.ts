import { readFile } from 'fs/promises'
import { resolve, join } from 'path'
import fg from 'fast-glob'
import {
    findRescriptConfigs,
    type RescriptProjectConfig,
} from './rescript/project-finder.js'
import {
    findTsConfigs,
    type TypeScriptProjectConfig,
} from './typescript/project-finder.js'
import { DEFAULT_PACKAGE_NAME } from '../config/defaults.js'

export type DetectionConfidence = 'high' | 'medium' | 'low' | 'manual'

export interface LanguageDetection {
    language: 'rescript' | 'typescript' | 'javascript'
    confidence: DetectionConfidence
    /** Human-readable explanation of why this language was detected */
    evidence: string[]
    /** Config files that confirmed this language */
    projectConfigs: RescriptProjectConfig[] | TypeScriptProjectConfig[]
}

export interface DetectionResult {
    languages: LanguageDetection[]
    /** Lowest confidence across all detected languages */
    overallConfidence: DetectionConfidence
    /** Whether the project is a multi-package monorepo */
    projectType: 'monorepo' | 'single-package'
    /** True if @juspay/blend-design-system is in package.json dependencies */
    hasBlendDependency: boolean
    /** Installed version of the design system, if found */
    blendVersion: string | null
}

const CONFIDENCE_RANK: Record<DetectionConfidence, number> = {
    high: 3,
    medium: 2,
    low: 1,
    manual: 0,
}

export async function detectLanguages(
    projectRoot: string,
    packageName = DEFAULT_PACKAGE_NAME
): Promise<DetectionResult> {
    const [rescriptConfigs, tsConfigs, pkgInfo] = await Promise.all([
        findRescriptConfigs(projectRoot),
        findTsConfigs(projectRoot),
        readPackageInfo(projectRoot, packageName),
    ])

    const detections: LanguageDetection[] = []

    // ─── LEVEL 1: Config-file signals (HIGH confidence) ──────────────────────

    if (rescriptConfigs.length > 0) {
        detections.push({
            language: 'rescript',
            confidence: 'high',
            evidence: rescriptConfigs.map(
                (c) =>
                    `Found ${c.configPath.replace(projectRoot, '.')} (${c.sources.length} source dir(s))`
            ),
            projectConfigs: rescriptConfigs,
        })
    }

    if (tsConfigs.length > 0) {
        detections.push({
            language: 'typescript',
            confidence: 'high',
            evidence: tsConfigs.map(
                (c) => `Found ${c.configPath.replace(projectRoot, '.')}`
            ),
            projectConfigs: tsConfigs,
        })
    }

    // ─── LEVEL 2: Dependency signals (MEDIUM confidence) ─────────────────────

    if (detections.length === 0 && pkgInfo.hasBlendDep) {
        // Package has the design system as a dep but no config files — scan anyway
        const resFiles = await fg('**/*.res', {
            cwd: projectRoot,
            ignore: ['**/node_modules/**'],
            deep: 4,
        })
        const tsFiles = await fg('**/*.{ts,tsx}', {
            cwd: projectRoot,
            ignore: ['**/node_modules/**', '**/*.d.ts'],
            deep: 4,
        })

        if (resFiles.length > 0) {
            detections.push({
                language: 'rescript',
                confidence: 'medium',
                evidence: [
                    `Found ${resFiles.length} .res files (no rescript.json / bsconfig.json)`,
                ],
                projectConfigs: [],
            })
        }

        if (tsFiles.length > 0) {
            detections.push({
                language: 'typescript',
                confidence: 'medium',
                evidence: [
                    `Found ${tsFiles.length} .ts/.tsx files (no tsconfig.json)`,
                ],
                projectConfigs: [],
            })
        }
    }

    // ─── LEVEL 3: Content signals (LOW confidence) ────────────────────────────

    if (detections.length === 0) {
        const [resFiles, tsImports] = await Promise.all([
            fg('**/*.res', {
                cwd: projectRoot,
                ignore: ['**/node_modules/**'],
                deep: 4,
            }),
            findTsImports(projectRoot, packageName),
        ])

        if (resFiles.length > 0) {
            detections.push({
                language: 'rescript',
                confidence: 'low',
                evidence: [
                    `Found ${resFiles.length} .res files — no config files or package dep confirmed`,
                ],
                projectConfigs: [],
            })
        }

        if (tsImports > 0) {
            detections.push({
                language: 'typescript',
                confidence: 'low',
                evidence: [
                    `Found ${tsImports} TypeScript file(s) importing from ${packageName}`,
                ],
                projectConfigs: [],
            })
        }
    }

    // ─── LEVEL 4: Nothing found → manual ─────────────────────────────────────

    const overallConfidence =
        detections.length === 0
            ? 'manual'
            : detections.reduce<DetectionConfidence>((lowest, d) => {
                  return CONFIDENCE_RANK[d.confidence] < CONFIDENCE_RANK[lowest]
                      ? d.confidence
                      : lowest
              }, 'high')

    const projectType =
        rescriptConfigs.length > 1 || tsConfigs.length > 1
            ? 'monorepo'
            : 'single-package'

    return {
        languages: detections,
        overallConfidence,
        projectType,
        hasBlendDependency: pkgInfo.hasBlendDep,
        blendVersion: pkgInfo.version,
    }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface PackageInfo {
    hasBlendDep: boolean
    version: string | null
}

async function readPackageInfo(
    projectRoot: string,
    packageName: string
): Promise<PackageInfo> {
    // Check root package.json first
    const rootPkgPath = join(projectRoot, 'package.json')
    try {
        const pkg = JSON.parse(await readFile(rootPkgPath, 'utf-8')) as Record<
            string,
            unknown
        >
        const allDeps = {
            ...((pkg['dependencies'] as Record<string, string>) ?? {}),
            ...((pkg['devDependencies'] as Record<string, string>) ?? {}),
            ...((pkg['peerDependencies'] as Record<string, string>) ?? {}),
        }
        const hasBlendDep = packageName in allDeps
        const depVersion = allDeps[packageName] ?? null

        // Also try to get the installed version from node_modules
        const installedVersion = await getInstalledVersion(
            projectRoot,
            packageName
        )

        return { hasBlendDep, version: installedVersion ?? depVersion }
    } catch {
        return { hasBlendDep: false, version: null }
    }
}

async function getInstalledVersion(
    projectRoot: string,
    packageName: string
): Promise<string | null> {
    try {
        const pkgPath = resolve(
            projectRoot,
            'node_modules',
            packageName,
            'package.json'
        )
        const pkg = JSON.parse(await readFile(pkgPath, 'utf-8')) as Record<
            string,
            unknown
        >
        return (pkg['version'] as string) ?? null
    } catch {
        return null
    }
}

async function findTsImports(
    projectRoot: string,
    packageName: string
): Promise<number> {
    try {
        const tsFiles = await fg('**/*.{ts,tsx}', {
            cwd: projectRoot,
            ignore: ['**/node_modules/**', '**/*.d.ts'],
            deep: 6,
        })

        // Quick content check on a sample (max 50 files for speed)
        const sample = tsFiles.slice(0, 50)
        const checks = await Promise.allSettled(
            sample.map(async (f) => {
                const content = await readFile(resolve(projectRoot, f), 'utf-8')
                return content.includes(packageName) ? 1 : 0
            })
        )
        return checks.reduce(
            (sum, r) => sum + (r.status === 'fulfilled' ? r.value : 0),
            0
        )
    } catch {
        return 0
    }
}
