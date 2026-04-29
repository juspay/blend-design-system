/**
 * Config Generator
 *
 * Generates the blend.config.json project configuration file.
 * Includes schema reference for IDE autocomplete.
 */

import {
    DEFAULT_STUDIO_DEPLOYMENT,
    type BlendStudioDeployment,
    getStudioApiUrlForDeployment,
    getStudioSchemaUrl,
    normalizeStudioApiUrl,
} from '../constants/studio'

export interface BlendStudioConfig {
    $schema?: string
    brand?: string
    theme?: 'light' | 'dark'
    output?: string
    components?: string[]
    studio?: {
        apiUrl?: string
        branch?: string
        version?: string
        autoSync?: boolean
    }
    generate?: {
        typescript?: boolean
        cssVariables?: boolean
        reactNative?: boolean
    }
}

export interface BlendConfig {
    $schema: string
    brand: string
    theme: 'light' | 'dark'
    output: string
    components: string[]
    studio?: {
        apiUrl: string
        branch?: string
        version?: string
        autoSync: boolean
    }
    generate?: {
        typescript: boolean
        cssVariables: boolean
        reactNative: boolean
    }
}

export type GenerateConfigOptions = Partial<BlendConfig> & {
    /** Preset Studio host (staging vs production). Ignored if studio.apiUrl is set. */
    deployment?: BlendStudioDeployment
}

export function generateConfig(
    options: GenerateConfigOptions = {}
): BlendConfig {
    const deployment = options.deployment ?? DEFAULT_STUDIO_DEPLOYMENT
    const resolvedApiUrl =
        options.studio?.apiUrl != null
            ? normalizeStudioApiUrl(options.studio.apiUrl)
            : getStudioApiUrlForDeployment(deployment)

    const studio: BlendConfig['studio'] = {
        apiUrl: resolvedApiUrl,
        autoSync: options.studio?.autoSync ?? false,
        ...(options.studio?.branch !== undefined
            ? { branch: options.studio.branch }
            : {}),
        ...(options.studio?.version !== undefined
            ? { version: options.studio.version }
            : {}),
    }

    return {
        $schema: getStudioSchemaUrl(resolvedApiUrl),
        brand: options.brand || 'blend/default',
        theme: options.theme || 'light',
        output: options.output || 'src/blend',
        components: options.components || [],
        studio,
        generate: options.generate || {
            typescript: true,
            cssVariables: false,
            reactNative: false,
        },
    }
}

export function generateConfigCode(config: BlendConfig): string {
    return JSON.stringify(config, null, 4) + '\n'
}

export function parseConfig(json: string): BlendConfig | null {
    try {
        const parsed = JSON.parse(json) as Record<string, unknown>
        const studio = parsed.studio as BlendConfig['studio'] | undefined
        const apiForSchema =
            studio?.apiUrl != null && typeof studio.apiUrl === 'string'
                ? normalizeStudioApiUrl(studio.apiUrl)
                : getStudioApiUrlForDeployment(DEFAULT_STUDIO_DEPLOYMENT)

        return {
            $schema:
                (parsed.$schema as string | undefined) ||
                getStudioSchemaUrl(apiForSchema),
            brand: (parsed.brand as string) || 'blend/default',
            theme: (parsed.theme as 'light' | 'dark') || 'light',
            output: (parsed.output as string) || 'src/blend',
            components: (parsed.components as string[]) || [],
            studio: parsed.studio as BlendConfig['studio'],
            generate: parsed.generate as BlendConfig['generate'],
        }
    } catch {
        return null
    }
}

export function validateConfig(config: unknown): {
    valid: boolean
    errors: string[]
} {
    const errors: string[] = []

    if (!config || typeof config !== 'object') {
        return { valid: false, errors: ['Config must be an object'] }
    }

    const c = config as Record<string, unknown>

    if (c.brand !== undefined && typeof c.brand !== 'string') {
        errors.push('brand must be a string')
    }

    if (
        c.theme !== undefined &&
        !['light', 'dark'].includes(c.theme as string)
    ) {
        errors.push('theme must be "light" or "dark"')
    }

    if (c.output !== undefined && typeof c.output !== 'string') {
        errors.push('output must be a string')
    }

    if (c.components !== undefined && !Array.isArray(c.components)) {
        errors.push('components must be an array')
    }

    if (c.studio !== undefined) {
        if (typeof c.studio !== 'object' || c.studio === null) {
            errors.push('studio must be an object')
        } else {
            const s = c.studio as Record<string, unknown>
            if (s.apiUrl !== undefined && typeof s.apiUrl !== 'string') {
                errors.push('studio.apiUrl must be a string')
            }
            if (s.autoSync !== undefined && typeof s.autoSync !== 'boolean') {
                errors.push('studio.autoSync must be a boolean')
            }
        }
    }

    if (c.generate !== undefined) {
        if (typeof c.generate !== 'object' || c.generate === null) {
            errors.push('generate must be an object')
        } else {
            const g = c.generate as Record<string, unknown>
            if (
                g.typescript !== undefined &&
                typeof g.typescript !== 'boolean'
            ) {
                errors.push('generate.typescript must be a boolean')
            }
            if (
                g.cssVariables !== undefined &&
                typeof g.cssVariables !== 'boolean'
            ) {
                errors.push('generate.cssVariables must be a boolean')
            }
            if (
                g.reactNative !== undefined &&
                typeof g.reactNative !== 'boolean'
            ) {
                errors.push('generate.reactNative must be a boolean')
            }
        }
    }

    return { valid: errors.length === 0, errors }
}
