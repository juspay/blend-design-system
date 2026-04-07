import { readFile } from 'fs/promises'
import { resolve, dirname, join } from 'path'
import fg from 'fast-glob'

export interface RescriptSourceDir {
    dir: string
    subdirs: boolean
    /** 'dev' sources are excluded from production builds but still scanned */
    type?: 'dev' | 'source'
}

export interface RescriptProjectConfig {
    /** Absolute path to rescript.json / bsconfig.json */
    configPath: string
    /** Absolute path to the directory containing the config file */
    projectRoot: string
    /** Package name from rescript.json */
    name: string
    /** Resolved source directories */
    sources: RescriptSourceDir[]
    /** Compiled output suffix (e.g. ".bs.js") */
    suffix: string
    /** ReScript dependencies */
    dependencies: string[]
    /** Raw config content */
    raw: Record<string, unknown>
}

export async function findRescriptConfigs(
    rootDir: string
): Promise<RescriptProjectConfig[]> {
    const configPaths = await fg(['**/rescript.json', '**/bsconfig.json'], {
        cwd: rootDir,
        ignore: [
            '**/node_modules/**',
            '**/.git/**',
            '**/dist/**',
            '**/build/**',
        ],
        absolute: true,
    })

    if (configPaths.length === 0) return []

    const results = await Promise.allSettled(
        configPaths.map((configPath) => parseRescriptConfig(configPath))
    )

    return results
        .filter(
            (r): r is PromiseFulfilledResult<RescriptProjectConfig> =>
                r.status === 'fulfilled'
        )
        .map((r) => r.value)
}

async function parseRescriptConfig(
    configPath: string
): Promise<RescriptProjectConfig> {
    const raw = JSON.parse(await readFile(configPath, 'utf-8')) as Record<
        string,
        unknown
    >
    const projectRoot = dirname(configPath)

    return {
        configPath,
        projectRoot,
        name: (raw['name'] as string) ?? 'unknown',
        sources: normalizeSources(raw['sources'], projectRoot),
        suffix: (raw['suffix'] as string) ?? '.bs.js',
        dependencies: normalizeDependencies(raw),
        raw,
    }
}

/**
 * rescript.json `sources` field can be:
 *   - A string:                  "src"
 *   - An object:                 { "dir": "src", "subdirs": true }
 *   - An array of either:        ["src", { "dir": "lib", "subdirs": false }]
 *
 * We normalize all forms to RescriptSourceDir[].
 */
function normalizeSources(
    sources: unknown,
    projectRoot: string
): RescriptSourceDir[] {
    if (!sources) return [{ dir: resolve(projectRoot, 'src'), subdirs: true }]

    const arr: unknown[] = Array.isArray(sources) ? sources : [sources]

    return arr.map((s) => {
        if (typeof s === 'string') {
            return { dir: resolve(projectRoot, s), subdirs: false }
        }
        if (typeof s === 'object' && s !== null) {
            const obj = s as Record<string, unknown>
            return {
                dir: resolve(projectRoot, (obj['dir'] as string) ?? 'src'),
                subdirs: Boolean(obj['subdirs'] ?? false),
                type: obj['type'] as 'dev' | 'source' | undefined,
            }
        }
        return { dir: resolve(projectRoot, 'src'), subdirs: false }
    })
}

function normalizeDependencies(raw: Record<string, unknown>): string[] {
    const deps = raw['dependencies'] ?? raw['bs-dependencies'] ?? []
    return Array.isArray(deps) ? (deps as string[]) : []
}

/** Expand source dirs into absolute glob patterns for fast-glob */
export function sourceDirsToGlobs(sources: RescriptSourceDir[]): string[] {
    return sources.map((s) => {
        if (s.subdirs) return join(s.dir, '**', '*.res')
        return join(s.dir, '*.res')
    })
}
