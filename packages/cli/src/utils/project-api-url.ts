import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
    DEFAULT_STUDIO_DEPLOYMENT,
    getStudioApiUrlForDeployment,
    normalizeStudioApiUrl,
} from '../constants/studio'

/**
 * Read `studio.apiUrl` from blend.config.json when present.
 */
export function readBlendConfigStudioApiUrl(cwd: string): string | undefined {
    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) return undefined
    try {
        const parsed = JSON.parse(readFileSync(configPath, 'utf-8')) as {
            studio?: { apiUrl?: string }
        }
        const url = parsed.studio?.apiUrl
        return typeof url === 'string' && url.trim() ? url.trim() : undefined
    } catch {
        return undefined
    }
}

/**
 * Resolve Studio API base URL for CLI commands run from `cwd`.
 *
 * Precedence: `BLEND_STUDIO_API_URL` → blend.config.json `studio.apiUrl` → default staging preset.
 */
export function resolveStudioApiUrlForProject(cwd: string): string {
    if (process.env.BLEND_STUDIO_API_URL?.trim()) {
        return normalizeStudioApiUrl(process.env.BLEND_STUDIO_API_URL)
    }
    const fromConfig = readBlendConfigStudioApiUrl(cwd)
    if (fromConfig) {
        return normalizeStudioApiUrl(fromConfig)
    }
    return getStudioApiUrlForDeployment(DEFAULT_STUDIO_DEPLOYMENT)
}
