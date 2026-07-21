/**
 * Resolve All V2 Component Tokens
 *
 * Takes a (possibly brand-modified) FoundationTokenType and a theme,
 * then calls every V2 component's getXXXTokens() function to produce
 * the full ComponentTokenType object.
 *
 * This is the expansion step:
 *   ~20-line BrandConfig → ~10,000+ token values across all components
 *
 * Features:
 *   - LRU cache for resolved tokens (avoids re-computing identical inputs)
 *   - Graceful error handling per component (one failure doesn't break all)
 *   - Lazy resolution support (resolve only specific components)
 *
 * IMPORTANT: This module should only be used in client-side code or CLI.
 * Do not import in Next.js API routes as it pulls in React components.
 */

import {
    Theme,
    getButtonV2Tokens,
    getAccordionV2Tokens,
    getAlertV2Tokens,
    getAvatarV2Tokens,
    getBreadcrumbV2Tokens,
    getChartV2Tokens,
    getChartV3Tokens,
    getCheckboxV2Tokens,
    getCodeEditorV2Tokens,
    getKeyValuePairV2Tokens,
    getMenuV2Tokens,
    getMultiSelectV2Tokens,
    getPopoverV2Tokens,
    getProgressBarV2Tokens,
    getRadioV2Tokens,
    getSingleSelectV2Tokens,
    getSwitchV2Tokens,
    getSnackbarV2Tokens,
    getStatCardV2Tokens,
    getTabsV2Tokens,
    getTagV2Tokens,
    getTextInputV2Tokens,
    getTimelineTokens,
    getTooltipV2Tokens,
    getTopbarTokens,
    getSidebarTokens,
    getMobileNavigationTokens,
} from '@juspay/blend-design-system/node'
import type { FoundationTokenType } from '@juspay/blend-design-system/node'

// ---------------------------------------------------------------------------
// Component Resolver Registry
// ---------------------------------------------------------------------------

const V2_RESOLVERS: Record<
    string,
    (foundation: FoundationTokenType, theme: Theme | string) => unknown
> = {
    BUTTONV2: getButtonV2Tokens,
    ACCORDIONV2: getAccordionV2Tokens,
    ALERTV2: getAlertV2Tokens,
    AVATARV2: getAvatarV2Tokens,
    BREADCRUMBV2: getBreadcrumbV2Tokens,
    CHARTSV2: getChartV2Tokens,
    CHARTSV3: getChartV3Tokens,
    CHECKBOXV2: getCheckboxV2Tokens,
    CODEEDITORV2: getCodeEditorV2Tokens,
    KEYVALUEPAIRV2: getKeyValuePairV2Tokens,
    MENU_V2: getMenuV2Tokens,
    MULTI_SELECT_V2: getMultiSelectV2Tokens,
    POPOVERV2: getPopoverV2Tokens,
    PROGRESS_BARV2: getProgressBarV2Tokens,
    RADIOV2: getRadioV2Tokens,
    SINGLE_SELECT_V2: getSingleSelectV2Tokens,
    SWITCHV2: getSwitchV2Tokens,
    SNACKBARV2: getSnackbarV2Tokens,
    STATCARDV2: getStatCardV2Tokens,
    TABSV2: getTabsV2Tokens,
    TAGV2: getTagV2Tokens,
    TEXT_INPUTV2: getTextInputV2Tokens,
    TIMELINE: getTimelineTokens,
    TOOLTIPV2: getTooltipV2Tokens,
    TOPBARV2: getTopbarTokens,
    SIDEBARV2: getSidebarTokens,
    MOBILE_NAVIGATION_V2: getMobileNavigationTokens,
}

// ---------------------------------------------------------------------------
// LRU Token Cache
// ---------------------------------------------------------------------------

const TOKEN_CACHE_MAX = 32

interface CacheEntry {
    key: string
    tokens: Record<string, unknown>
}

const tokenCache: CacheEntry[] = []

/**
 * Generate a stable cache key from foundation + theme.
 * Uses JSON serialization — fast enough for 32-entry LRU.
 */
function makeCacheKey(
    foundation: FoundationTokenType,
    theme: Theme | string
): string {
    return `${theme}::${JSON.stringify(foundation)}`
}

function getCached(key: string): Record<string, unknown> | null {
    const idx = tokenCache.findIndex((e) => e.key === key)
    if (idx === -1) return null
    // Move to front (most recently used)
    const [entry] = tokenCache.splice(idx, 1)
    tokenCache.unshift(entry)
    return entry.tokens
}

function putCache(key: string, tokens: Record<string, unknown>): void {
    // Evict oldest if full
    if (tokenCache.length >= TOKEN_CACHE_MAX) {
        tokenCache.pop()
    }
    tokenCache.unshift({ key, tokens })
}

/**
 * Clear the token resolution cache.
 * Useful when the underlying component resolvers are updated.
 */
export function clearTokenCache(): void {
    tokenCache.length = 0
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function resolveAllTokens(
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): Record<string, unknown> {
    const cacheKey = makeCacheKey(foundation, theme)
    const cached = getCached(cacheKey)
    if (cached) return cached

    const tokens: Record<string, unknown> = {}
    const errors: Array<{ component: string; error: unknown }> = []

    for (const [key, resolver] of Object.entries(V2_RESOLVERS)) {
        try {
            tokens[key] = resolver(foundation, theme)
        } catch (err) {
            errors.push({ component: key, error: err })
            // Graceful degradation: skip this component, don't break others
            tokens[key] = {}
        }
    }

    if (errors.length > 0) {
        console.warn(
            `[token-engine] ${errors.length} component(s) failed to resolve:`,
            errors.map((e) => e.component).join(', ')
        )
    }

    putCache(cacheKey, tokens)
    return tokens
}

/**
 * Resolve tokens for a single component.
 * Used by component-level overrides to re-resolve just the affected component.
 *
 * @returns The resolved tokens for the component, or undefined if the key is not found.
 * @throws Error with descriptive message if the component key is unknown.
 */
export function resolveComponentTokens(
    componentKey: string,
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): unknown | undefined {
    const resolver = V2_RESOLVERS[componentKey]
    if (!resolver) {
        const validKeys = Object.keys(V2_RESOLVERS).join(', ')
        console.warn(
            `[token-engine] Unknown component key "${componentKey}". Valid keys: ${validKeys}`
        )
        return undefined
    }
    try {
        return resolver(foundation, theme)
    } catch (err) {
        console.error(
            `[token-engine] Failed to resolve tokens for "${componentKey}":`,
            err
        )
        return undefined
    }
}

/**
 * Register a custom component resolver at runtime.
 * Allows extending the engine without modifying source code.
 */
export function registerResolver(
    componentKey: string,
    resolver: (
        foundation: FoundationTokenType,
        theme: Theme | string
    ) => unknown
): void {
    V2_RESOLVERS[componentKey] = resolver
    clearTokenCache()
}

export const V2_COMPONENT_KEYS = Object.keys(V2_RESOLVERS)
