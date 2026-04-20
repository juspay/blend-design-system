import fg from 'fast-glob'
import { resolve } from 'path'
import type { TypeScriptProjectConfig } from './project-finder.js'

export interface TypeScriptFileSet {
    /** All .ts/.tsx files within the tsconfig scope */
    appFiles: string[]
}

export async function resolveTypeScriptFiles(
    projectConfig: TypeScriptProjectConfig,
    extraExclude: string[] = []
): Promise<TypeScriptFileSet> {
    // Build include patterns relative to project root
    const includePatterns = buildIncludePatterns(projectConfig)

    const ignore = [
        '**/node_modules/**',
        '**/.git/**',
        // Declaration files — these are not source
        '**/*.d.ts',
        // Generated files
        '**/*.gen.ts',
        '**/*.gen.tsx',
        // Compiled output
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        ...extraExclude,
    ]

    const appFiles = await fg(includePatterns, {
        ignore,
        absolute: true,
        unique: true,
    })

    return { appFiles }
}

function buildIncludePatterns(config: TypeScriptProjectConfig): string[] {
    const patterns: string[] = []

    for (const inc of config.include) {
        // If the include path already has an extension, use as-is
        if (inc.endsWith('.ts') || inc.endsWith('.tsx')) {
            patterns.push(inc)
            continue
        }
        // Otherwise glob for TS files under that directory
        patterns.push(`${inc}/**/*.ts`, `${inc}/**/*.tsx`)
    }

    // If rootDir is set, also scan it
    if (config.rootDir) {
        patterns.push(
            resolve(config.rootDir, '**', '*.ts'),
            resolve(config.rootDir, '**', '*.tsx')
        )
    }

    return [...new Set(patterns)]
}
