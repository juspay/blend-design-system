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
 */

import {
    FOUNDATION_THEME,
    type FoundationTokenType,
} from '@juspay/blend-design-system/node'
import type { BrandConfig } from './types'

export function buildBrandFoundation(brand: BrandConfig): FoundationTokenType {
    // Use structuredClone (ES2021+) for safer deep-clone; fallback for older runtimes
    const foundation = (
        typeof structuredClone === 'function'
            ? structuredClone(FOUNDATION_THEME)
            : JSON.parse(JSON.stringify(FOUNDATION_THEME))
    ) as FoundationTokenType

    applyColorOverrides(foundation, brand)
    applyRadiusOverrides(foundation, brand)
    applyShadowOverrides(foundation, brand)
    applyFontOverrides(foundation, brand)

    return foundation
}

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
            if (value !== undefined) {
                targetGroup[shade] = value
            }
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
        if (value !== undefined && key in radiusMap) {
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
        if (value !== undefined && key in shadowMap) {
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
            if (value !== undefined && key in weightMap) {
                weightMap[key] = value
            }
        }
    }
}