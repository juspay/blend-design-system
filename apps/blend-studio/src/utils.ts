import {
    diffBrandConfigs,
    incrementVersion,
    PRESET_BLEND_DEFAULT,
    resolveBrandTokens,
    type BrandConfig,
    type TokenDiff,
} from '@juspay/blend-design-system/tokens'

export type PreviewTheme = 'light' | 'dark'

export const AUTO_SAVE_DELAY_MS = 1_000
export const TOKEN_RESOLVE_DEBOUNCE_MS = 200

export const EDITOR_LEFT_PANEL_ID = 'editor-left-panel'
export const EDITOR_RIGHT_PANEL_ID = 'editor-right-panel'

export const LEFT_PANEL_TOGGLE_MS = 280
export const LEFT_PANEL_MIN_SIZE = '23'
export const LEFT_PANEL_MAX_SIZE = '55'

export const VERSION_BUMP_TYPES = ['patch', 'minor', 'major'] as const
export type VersionBumpType = (typeof VERSION_BUMP_TYPES)[number]

export function resolveComponentTokens(
    brand: BrandConfig,
    theme: PreviewTheme
) {
    try {
        return resolveBrandTokens(brand, theme)
    } catch {
        return null
    }
}

export function computeBrandDiffs(brand: BrandConfig | null): TokenDiff[] {
    if (!brand) return []

    try {
        return diffBrandConfigs(PRESET_BLEND_DEFAULT, brand)
    } catch {
        return []
    }
}

export function mergeImportedBrandConfig(
    prev: BrandConfig,
    imported: Partial<BrandConfig>
): BrandConfig {
    const updated = { ...prev }

    if (imported.colors) {
        updated.colors = { ...updated.colors, ...imported.colors }
    }
    if (imported.radius) {
        updated.radius = { ...updated.radius, ...imported.radius }
    }
    if (imported.shadows) {
        updated.shadows = { ...updated.shadows, ...imported.shadows }
    }
    if (imported.font) {
        updated.font = { ...updated.font, ...imported.font }
    }

    return updated
}

export function getSuggestedPublishVersion(
    latestVersion: string | null | undefined
): string {
    return latestVersion ? incrementVersion(latestVersion, 'patch') : '1.0.0'
}

export function getPreviewSurfaceClassName(theme: PreviewTheme): string {
    return theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
}

export function getVersionInputClassName(isValid: boolean): string {
    return isValid
        ? 'border-gray-300 focus:ring-blue-500'
        : 'border-red-300 focus:ring-red-400'
}

export function applyLeftPanelToggleTransition(
    element: HTMLDivElement,
    durationMs: number
): () => void {
    element.style.transitionProperty = 'flex-grow, flex-basis, flex-shrink'
    element.style.transitionDuration = `${durationMs}ms`
    element.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)'

    const clearId = window.setTimeout(() => {
        element.style.transitionProperty = ''
        element.style.transitionDuration = ''
        element.style.transitionTimingFunction = ''
    }, durationMs + 50)

    return () => {
        window.clearTimeout(clearId)
    }
}
