/**
 * Build Brand Foundation
 *
 * Takes a BrandConfig (small JSON of overrides) and produces a modified
 * copy of FOUNDATION_THEME with those overrides applied.
 *
 * This is the core trick: every V2 component's getXXXTokens() function
 * already accepts foundationToken as input. By passing a modified foundation,
 * every color/radius/shadow reference inside those functions automatically
 * picks up the brand values — zero component code changes.
 *
 * Flow:
 *   BrandConfig → buildBrandFoundation() → modifiedFoundation
 *   modifiedFoundation → getButtonV2Tokens() → branded ButtonV2 tokens
 *   modifiedFoundation → getMultiSelectV2Tokens() → branded MultiSelect tokens
 *   ... (all 23 V2 components)
 */

import FOUNDATION_THEME from '@juspay/blend-design-system/lib/tokens/theme.token'
import type { FoundationTokenType } from '@juspay/blend-design-system/lib/tokens/theme.token'
import type { BrandConfig } from './types'

/**
 * Deep-clone FOUNDATION_THEME and apply brand overrides.
 *
 * Only the values specified in the brand config are changed.
 * Everything else stays at Blend defaults.
 */
export function buildBrandFoundation(brand: BrandConfig): FoundationTokenType {
    // Deep clone so we never mutate the original
    const foundation = structuredClone(FOUNDATION_THEME) as FoundationTokenType

    applyColorOverrides(foundation, brand)
    applyRadiusOverrides(foundation, brand)
    applyShadowOverrides(foundation, brand)
    applyFontOverrides(foundation, brand)

    return foundation
}

// ---------------------------------------------------------------------------
// Override helpers — each mutates the cloned foundation in-place
// ---------------------------------------------------------------------------

function applyColorOverrides(
    foundation: FoundationTokenType,
    brand: BrandConfig
): void {
    if (!brand.colors) return

    const colorGroups = Object.entries(brand.colors) as Array<
        [string, Record<string, string> | undefined]
    >

    for (const [groupName, overrides] of colorGroups) {
        if (!overrides) continue

        const targetGroup = (
            foundation.colors as Record<string, Record<string, string>>
        )[groupName]
        if (!targetGroup) continue

        for (const [shade, value] of Object.entries(overrides)) {
            targetGroup[shade] = value
        }
    }
}

function applyRadiusOverrides(
    foundation: FoundationTokenType,
    brand: BrandConfig
): void {
    if (!brand.radius) return

    const radiusMap = foundation.border.radius as Record<string, string>

    for (const [key, value] of Object.entries(brand.radius)) {
        if (key in radiusMap) {
            radiusMap[key] = value
        }
    }
}

function applyShadowOverrides(
    foundation: FoundationTokenType,
    brand: BrandConfig
): void {
    if (!brand.shadows) return

    const shadowMap = foundation.shadows as Record<string, string>

    for (const [key, value] of Object.entries(brand.shadows)) {
        if (key in shadowMap) {
            shadowMap[key] = value
        }
    }
}

function applyFontOverrides(
    foundation: FoundationTokenType,
    brand: BrandConfig
): void {
    if (!brand.font) return

    if (brand.font.family) {
        const fontObj = foundation.font as Record<string, unknown>
        if ('family' in fontObj) {
            fontObj.family = brand.font.family
        }
    }

    if (brand.font.weight) {
        const weightMap = foundation.font.weight as Record<string, number>
        for (const [key, value] of Object.entries(brand.font.weight)) {
            if (key in weightMap) {
                weightMap[key] = value
            }
        }
    }
}
