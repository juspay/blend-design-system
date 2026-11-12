import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
    DEFAULT_STUDIO_DEPLOYMENT,
    TRUSTED_STUDIO_API_HOSTS,
    getStudioApiUrlForDeployment,
    normalizeStudioApiUrl,
} from '../constants/studio'

/**
 * Raised when blend.config.json (repository-controlled) points the CLI at a
 * host outside the official Studio allowlist. Fail closed: the CLI must not
 * send bearer tokens or brand configs to an unrecognized origin.
 */
export class UntrustedProjectApiUrlError extends Error {
    public readonly host: string

    constructor(public readonly apiUrl: string) {
        let host = '(invalid URL)'
        try {
            host = new URL(apiUrl).host
        } catch {
            host = '(invalid URL)'
        }
        super(
            `blend.config.json sets studio.apiUrl to "${apiUrl}" (${host}), which is not an official Blend Studio host. ` +
                'The CLI does not send credentials to unrecognized hosts from a repository-controlled file. ' +
                'Set BLEND_STUDIO_API_URL in your environment, or pass BLEND_TRUST_PROJECT_API_URL=1 if you operate this server.'
        )
        this.name = 'UntrustedProjectApiUrlError'
        this.host = host
    }
}

export function isTrustedProjectApiHost(value: string): boolean {
    try {
        return TRUSTED_STUDIO_API_HOSTS.includes(new URL(value).host)
    } catch {
        return false
    }
}

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
 * Precedence: `BLEND_STUDIO_API_URL` → blend.config.json `studio.apiUrl`
 * (official hosts only, or BLEND_TRUST_PROJECT_API_URL=1) → default staging preset.
 */
export function resolveStudioApiUrlForProject(cwd: string): string {
    if (process.env.BLEND_STUDIO_API_URL?.trim()) {
        return normalizeStudioApiUrl(process.env.BLEND_STUDIO_API_URL)
    }
    const fromConfig = readBlendConfigStudioApiUrl(cwd)
    if (fromConfig) {
        if (
            process.env.BLEND_TRUST_PROJECT_API_URL === '1' ||
            isTrustedProjectApiHost(fromConfig)
        ) {
            return normalizeStudioApiUrl(fromConfig)
        }
        throw new UntrustedProjectApiUrlError(fromConfig)
    }
    return getStudioApiUrlForDeployment(DEFAULT_STUDIO_DEPLOYMENT)
}
