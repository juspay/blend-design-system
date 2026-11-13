/**
 * Blend Token Studio — deployment URLs and resolution.
 *
 * All preset base URLs live in STUDIO_API_URL_BY_DEPLOYMENT only.
 * Default is staging until production is fully live; override with `init --env` or env vars.
 *
 * CLI environment variables:
 * - BLEND_STUDIO_API_URL — Base URL for Studio API (overrides blend.config.json `studio.apiUrl`).
 * - BLEND_STUDIO_API_TOKEN — JWT for non-interactive use (CI); valid tokens skip interactive login.
 * - BLEND_TRUST_PROJECT_API_URL — Set to 1 to allow blend.config.json `studio.apiUrl` hosts outside the official allowlist (self-hosted servers).
 * - DEBUG — Set to show stack traces on unexpected CLI errors.
 */

export type BlendStudioDeployment = 'staging' | 'production'

/** Canonical Studio API base URLs (prefix before /api/...). Single source for CLI presets. */
export const STUDIO_API_URL_BY_DEPLOYMENT: Record<
    BlendStudioDeployment,
    string
> = {
    staging: 'https://blend-backend-staging-2oyuucbkoa-uc.a.run.app',
    production: 'https://studio.blend.juspay.design',
}

/** Use staging for day-to-day CLI and init until production is verified end-to-end. */
export const DEFAULT_STUDIO_DEPLOYMENT: BlendStudioDeployment = 'staging'

/** Hosts the CLI may send credentials to when the URL comes from a repo-controlled blend.config.json. */
export const TRUSTED_STUDIO_API_HOSTS: string[] = Object.values(
    STUDIO_API_URL_BY_DEPLOYMENT
).map((url) => new URL(url).host)

export function parseEnvFlag(value: string): BlendStudioDeployment | null {
    const v = value.trim().toLowerCase()
    if (v === 'staging') return 'staging'
    if (v === 'prod' || v === 'production') return 'production'
    return null
}

export function getStudioApiUrlForDeployment(
    deployment: BlendStudioDeployment
): string {
    return normalizeStudioApiUrl(STUDIO_API_URL_BY_DEPLOYMENT[deployment])
}

function fallbackBaseUrl(): string {
    return getStudioApiUrlForDeployment(DEFAULT_STUDIO_DEPLOYMENT)
}

/**
 * Normalize a Studio URL by trimming trailing slashes and ensuring an absolute URL.
 */
export function normalizeStudioApiUrl(value: string): string {
    const trimmed = value.trim().replace(/\/+$/, '')
    if (!trimmed) {
        return fallbackBaseUrl()
    }

    try {
        const parsed = new URL(trimmed)
        const normalizedPath = parsed.pathname.replace(/\/+$/, '') || '/'
        return `${parsed.origin}${normalizedPath}${parsed.search}${parsed.hash}`.replace(
            /\/+$/,
            ''
        )
    } catch {
        return fallbackBaseUrl()
    }
}

/**
 * Resolve Studio API URL: explicit arg → BLEND_STUDIO_API_URL → default deployment preset.
 */
export function resolveStudioApiUrl(explicitApiUrl?: string): string {
    if (explicitApiUrl) {
        return normalizeStudioApiUrl(explicitApiUrl)
    }
    if (process.env.BLEND_STUDIO_API_URL) {
        return normalizeStudioApiUrl(process.env.BLEND_STUDIO_API_URL)
    }
    return getStudioApiUrlForDeployment(DEFAULT_STUDIO_DEPLOYMENT)
}

export function getStudioSchemaUrl(apiUrl?: string): string {
    return `${resolveStudioApiUrl(apiUrl)}/schemas/blend-config.json`
}
