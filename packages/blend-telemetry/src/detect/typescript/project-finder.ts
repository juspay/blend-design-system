import { readFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import fg from 'fast-glob'
import stripJsonComments from 'strip-json-comments'

export interface TypeScriptProjectConfig {
    /** Absolute path to tsconfig.json */
    configPath: string
    /** Absolute path to the directory containing the config */
    projectRoot: string
    /** tsconfig include patterns (absolute) */
    include: string[]
    /** tsconfig exclude patterns */
    exclude: string[]
    /** compilerOptions.rootDir (absolute, if set) */
    rootDir: string | null
    /** compilerOptions.baseUrl (absolute, if set) */
    baseUrl: string | null
    /** compilerOptions.paths — import alias map */
    paths: Record<string, string[]>
}

export async function findTsConfigs(
    rootDir: string
): Promise<TypeScriptProjectConfig[]> {
    const configPaths = await fg(
        ['**/tsconfig.json', '**/tsconfig.app.json', '**/tsconfig.lib.json'],
        {
            cwd: rootDir,
            ignore: [
                '**/node_modules/**',
                '**/.git/**',
                '**/dist/**',
                '**/build/**',
                // Skip test-only tsconfigs
                '**/tsconfig.test.json',
                '**/tsconfig.spec.json',
            ],
            absolute: true,
        }
    )

    if (configPaths.length === 0) return []

    const results = await Promise.allSettled(
        configPaths.map((p) => parseTsConfig(p))
    )

    return results
        .filter(
            (r): r is PromiseFulfilledResult<TypeScriptProjectConfig> =>
                r.status === 'fulfilled'
        )
        .map((r) => r.value)
}

/** Strip JSONC (comments + trailing commas) before JSON.parse — tsconfig files are JSONC */
function parseJsonc(text: string): Record<string, unknown> {
    // strip-json-comments correctly ignores comment-like sequences inside strings
    const stripped = stripJsonComments(text).replace(/,(\s*[}\]])/g, '$1') // trailing commas before } or ]
    return JSON.parse(stripped) as Record<string, unknown>
}

async function parseTsConfig(
    configPath: string
): Promise<TypeScriptProjectConfig> {
    const raw = parseJsonc(await readFile(configPath, 'utf-8'))
    const projectRoot = dirname(configPath)
    const compilerOptions =
        (raw['compilerOptions'] as Record<string, unknown>) ?? {}

    // `include` defaults to all files under rootDir if not specified
    const rawInclude = raw['include'] as string[] | undefined
    const include = (rawInclude ?? ['**/*']).map((p) => resolve(projectRoot, p))

    const rawExclude = raw['exclude'] as string[] | undefined
    const exclude = (rawExclude ?? ['node_modules']).map((p) =>
        resolve(projectRoot, p)
    )

    const rootDir = compilerOptions['rootDir']
        ? resolve(projectRoot, compilerOptions['rootDir'] as string)
        : null

    const baseUrl = compilerOptions['baseUrl']
        ? resolve(projectRoot, compilerOptions['baseUrl'] as string)
        : null

    const paths = (compilerOptions['paths'] as Record<string, string[]>) ?? {}

    return {
        configPath,
        projectRoot,
        include,
        exclude,
        rootDir,
        baseUrl,
        paths,
    }
}
