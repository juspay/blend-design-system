import { readFile } from 'fs/promises'
import fg from 'fast-glob'
import {
    sourceDirsToGlobs,
    type RescriptProjectConfig,
} from './project-finder.js'

export interface RescriptFileSet {
    /** .res files that declare bindings to @juspay/blend-design-system (or configured package) */
    bindingFiles: string[]
    /** All other .res files — these are app/consumer files to scan for usage */
    appFiles: string[]
    /** .res files that couldn't be read (permissions etc.) */
    errorFiles: string[]
}

/**
 * A binding file is identified by CONTENT, not location.
 * Any .res file containing @module("<packageName>") is a binding file.
 * This is robust across different project structures where binding dirs vary.
 */
export async function resolveRescriptFiles(
    projectConfig: RescriptProjectConfig,
    packageName: string,
    extraExclude: string[] = []
): Promise<RescriptFileSet> {
    const globs = sourceDirsToGlobs(projectConfig.sources)

    // Build exclusion patterns for compiled output files
    const compiledSuffix = projectConfig.suffix // e.g. ".bs.js"
    const ignore = [
        '**/node_modules/**',
        '**/.git/**',
        // Exclude compiled ReScript output — these are auto-generated
        // and co-located with source files (in-source build)
        `**/*${compiledSuffix}`,
        '**/*.gen.ts',
        '**/*.gen.tsx',
        ...extraExclude,
    ]

    let allResFiles: string[] = []
    try {
        allResFiles = await fg(globs, { ignore, absolute: true, unique: true })
    } catch {
        return { bindingFiles: [], appFiles: [], errorFiles: [] }
    }

    // Build a regex that matches @module("<packageName>") or @module("<packageName>/...")
    const bindingModuleRe = new RegExp(
        `@module\\(["']${escapeRegex(packageName)}`,
        'i'
    )

    const bindingFiles: string[] = []
    const appFiles: string[] = []
    const errorFiles: string[] = []

    await Promise.all(
        allResFiles.map(async (filePath) => {
            try {
                const content = await readFile(filePath, 'utf-8')
                if (bindingModuleRe.test(content)) {
                    bindingFiles.push(filePath)
                } else {
                    appFiles.push(filePath)
                }
            } catch {
                errorFiles.push(filePath)
            }
        })
    )

    return { bindingFiles, appFiles, errorFiles }
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
