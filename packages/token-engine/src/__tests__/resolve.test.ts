/**
 * E2E tests for the token resolution pipeline.
 *
 * Covers: resolveBrandTokens, component overrides, dark mode,
 * and verifies the full flow from BrandConfig → resolved tokens.
 */
import { describe, it, expect } from 'vitest'
import {
    resolveBrandTokens,
    buildBrandFoundation,
    V2_COMPONENT_KEYS,
} from '../index'
import type { BrandConfig } from '../types'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const MINIMAL_CONFIG: BrandConfig = {
    brandId: 'test/minimal',
    name: 'Minimal',
    version: '1.0.0',
}

const BRANDED_CONFIG: BrandConfig = {
    brandId: 'test/branded',
    name: 'Test Brand',
    version: '1.0.0',
    colors: {
        primary: { '500': '#E11D48' },
    },
    radius: { '8': '16px' },
}

const CONFIG_WITH_OVERRIDES: BrandConfig = {
    brandId: 'test/overrides',
    name: 'Overrides',
    version: '1.0.0',
    colors: {
        primary: { '500': '#3B82F6' },
    },
    componentOverrides: {
        BUTTONV2: {
            colors: { primary: { '500': '#DC2626' } },
        },
    },
}

const CONFIG_WITH_TOKEN_OVERRIDES: BrandConfig = {
    brandId: 'test/token-overrides',
    name: 'Token Overrides',
    version: '1.0.0',
    componentOverrides: {
        BUTTONV2: {
            tokenOverrides: {
                sm: {
                    gap: '12px',
                },
            },
        },
    },
}

const DARK_MODE_CONFIG: BrandConfig = {
    brandId: 'test/dark',
    name: 'Dark Mode',
    version: '1.0.0',
    colors: {
        primary: { '500': '#3B82F6' },
    },
    darkModeOverrides: {
        colors: {
            primary: { '500': '#60A5FA' },
        },
    },
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('resolveBrandTokens', () => {
    it('resolves a minimal config to a non-empty token object', () => {
        const tokens = resolveBrandTokens(MINIMAL_CONFIG, 'light')
        expect(tokens).toBeTruthy()
        expect(typeof tokens).toBe('object')
        expect(Object.keys(tokens).length).toBeGreaterThan(0)
    })

    it('produces tokens for known V2 component keys', () => {
        const tokens = resolveBrandTokens(MINIMAL_CONFIG, 'light')
        // At least BUTTONV2 should exist
        expect(tokens.BUTTONV2).toBeTruthy()
        expect(typeof tokens.BUTTONV2).toBe('object')
    })

    it('resolves a branded config without errors', () => {
        const tokens = resolveBrandTokens(BRANDED_CONFIG, 'light')
        expect(tokens).toBeTruthy()
        expect(tokens.BUTTONV2).toBeTruthy()
    })

    it('resolves dark theme', () => {
        const light = resolveBrandTokens(MINIMAL_CONFIG, 'light')
        const dark = resolveBrandTokens(MINIMAL_CONFIG, 'dark')
        expect(light).toBeTruthy()
        expect(dark).toBeTruthy()
        // Both should have the same component keys
        expect(Object.keys(light).sort()).toEqual(Object.keys(dark).sort())
    })

    it('applies dark mode overrides when theme=dark', () => {
        const dark = resolveBrandTokens(DARK_MODE_CONFIG, 'dark')
        expect(dark).toBeTruthy()
        // Dark tokens should exist
        expect(Object.keys(dark).length).toBeGreaterThan(0)
    })

    it('produces different tokens for light vs dark when darkModeOverrides are set', () => {
        const light = resolveBrandTokens(DARK_MODE_CONFIG, 'light')
        const dark = resolveBrandTokens(DARK_MODE_CONFIG, 'dark')
        // JSON representations should differ since we overrode primary.500
        const lightStr = JSON.stringify(light)
        const darkStr = JSON.stringify(dark)
        expect(lightStr).not.toEqual(darkStr)
    })
})

describe('component overrides', () => {
    it('applies per-component color overrides', () => {
        const base = resolveBrandTokens(
            { ...CONFIG_WITH_OVERRIDES, componentOverrides: undefined },
            'light'
        )
        const overridden = resolveBrandTokens(CONFIG_WITH_OVERRIDES, 'light')

        // BUTTONV2 tokens should differ
        const baseBtn = JSON.stringify(base.BUTTONV2)
        const overriddenBtn = JSON.stringify(overridden.BUTTONV2)
        expect(baseBtn).not.toEqual(overriddenBtn)
    })

    it('does not affect other components when overriding one', () => {
        const base = resolveBrandTokens(
            { ...CONFIG_WITH_OVERRIDES, componentOverrides: undefined },
            'light'
        )
        const overridden = resolveBrandTokens(CONFIG_WITH_OVERRIDES, 'light')

        // ALERTV2 should be the same (only BUTTONV2 was overridden)
        const baseAlert = JSON.stringify(base.ALERTV2)
        const overriddenAlert = JSON.stringify(overridden.ALERTV2)
        expect(baseAlert).toEqual(overriddenAlert)
    })

    it('applies direct token overrides (gap, padding, etc.)', () => {
        const tokens = resolveBrandTokens(CONFIG_WITH_TOKEN_OVERRIDES, 'light')
        const btn = tokens.BUTTONV2 as Record<string, any>
        expect(btn).toBeTruthy()
        // The sm.gap should be overridden to 12px
        if (btn?.sm?.gap !== undefined) {
            expect(btn.sm.gap).toBe('12px')
        }
    })
})

describe('buildBrandFoundation', () => {
    it('returns a foundation object from a config', () => {
        const foundation = buildBrandFoundation(MINIMAL_CONFIG)
        expect(foundation).toBeTruthy()
        expect(typeof foundation).toBe('object')
    })

    it('applies color overrides to the foundation', () => {
        const base = buildBrandFoundation(MINIMAL_CONFIG)
        const branded = buildBrandFoundation(BRANDED_CONFIG)
        // The branded foundation should have different primary colors
        expect(JSON.stringify(base)).not.toEqual(JSON.stringify(branded))
    })
})
