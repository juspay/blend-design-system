import { cosmiconfig } from 'cosmiconfig'
import { resolve } from 'path'
import type { BlendTelemetryConfig } from './schema.js'
import { getDefaults } from './defaults.js'

export async function loadConfig(
    projectRoot: string,
    cliOverrides: Partial<BlendTelemetryConfig> = {}
): Promise<BlendTelemetryConfig> {
    const explorer = cosmiconfig('blend', {
        searchPlaces: [
            '.blendrc',
            '.blendrc.json',
            '.blendrc.js',
            '.blendrc.cjs',
            'blend.config.js',
            'blend.config.cjs',
            'package.json',
        ],
        packageProp: 'blend',
    })

    const defaults = getDefaults(resolve(projectRoot))
    let fileConfig: Partial<BlendTelemetryConfig> = {}

    try {
        const result = await explorer.search(projectRoot)
        if (result && !result.isEmpty) {
            fileConfig = result.config as Partial<BlendTelemetryConfig>
        }
    } catch {
        // No config file found — proceed with defaults
    }

    // Deep-merge: defaults → file config → CLI overrides
    return {
        ...defaults,
        ...fileConfig,
        ...cliOverrides,
        // Deep merge nested objects
        languages: {
            ...defaults.languages,
            ...(fileConfig.languages ?? {}),
            ...(cliOverrides.languages ?? {}),
        },
        ci: {
            ...defaults.ci,
            ...(fileConfig.ci ?? {}),
            ...(cliOverrides.ci ?? {}),
        },
        exclude: [
            ...defaults.exclude,
            ...(fileConfig.exclude ?? []),
            ...(cliOverrides.exclude ?? []),
        ],
        reporters:
            cliOverrides.reporters ??
            fileConfig.reporters ??
            defaults.reporters,
        projectRoot: resolve(projectRoot),
    }
}
