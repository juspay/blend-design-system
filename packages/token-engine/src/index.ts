/**
 * @blend-design/token-engine
 *
 * The core brain of Blend Token Studio.
 *
 * Transforms a small brand config JSON (~20 lines) into the full
 * ComponentTokenType object (~10,000+ token values) that powers
 * every V2 component via <ThemeProvider componentTokens={...}>.
 *
 * Used by:
 *   - CLI (blend-token-studio init/brand/pull)
 *   - Dashboard (live preview)
 *   - API (token resolution endpoint)
 *
 * @example
 * ```ts
 * import { resolveBrandTokens } from '@blend-design/token-engine'
 *
 * const tokens = resolveBrandTokens({
 *     brandId: 'hdfc/retail',
 *     name: 'HDFC Bank',
 *     version: '1.0.0',
 *     colors: { primary: { '500': '#E31837' } },
 * })
 *
 * <ThemeProvider componentTokens={tokens}>
 *     <App />
 * </ThemeProvider>
 * ```
 */

import { Theme } from '@juspay/blend-design-system/lib/context/theme.enum'
import type { ComponentTokenType } from '@juspay/blend-design-system/lib/context/ThemeContext'

import type { BrandConfig } from './types'
import { buildBrandFoundation } from './build-brand-foundation'
import { resolveAllTokens } from './resolve-all-tokens'

// ---------------------------------------------------------------------------
// Primary API
// ---------------------------------------------------------------------------

/**
 * Resolve a brand config into a full ComponentTokenType.
 *
 * This is the main entry point. One call produces tokens for
 * all 23 V2 components.
 *
 * @param brandConfig - The brand overrides (colors, radius, shadows, font)
 * @param theme - "light" or "dark"
 * @returns ComponentTokenType ready for ThemeProvider
 */
export function resolveBrandTokens(
    brandConfig: BrandConfig,
    theme: Theme | string = Theme.LIGHT
): ComponentTokenType {
    const foundation = buildBrandFoundation(brandConfig)
    return resolveAllTokens(foundation, theme)
}

// ---------------------------------------------------------------------------
// Re-exports for consumers
// ---------------------------------------------------------------------------

// Core
export { buildBrandFoundation } from './build-brand-foundation'
export { resolveAllTokens, V2_COMPONENT_KEYS } from './resolve-all-tokens'

// Validation
export { validateBrandConfig } from './validate'

// Diff
export { diffBrandConfigs } from './diff'

// Color scale
export { generateColorScale, isValidHexColor } from './color-scale'

// Presets
export { getPreset, listPresets, PRESETS } from './presets'
export {
    PRESET_BLEND_DEFAULT,
    PRESET_HDFC,
    PRESET_NEOBANK,
    PRESET_FINTECH,
} from './presets'

// Types
export type {
    BrandConfig,
    BrandColors,
    ColorOverrides,
    RadiusOverrides,
    ShadowOverrides,
    FontOverrides,
    RadiusPreset,
    ValidationResult,
    ValidationError,
    ValidationWarning,
    TokenDiff,
} from './types'

export { RADIUS_PRESETS } from './types'
