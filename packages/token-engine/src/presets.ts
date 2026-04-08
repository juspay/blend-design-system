/**
 * Built-in Brand Presets
 *
 * Ready-to-use brand configurations for common use cases.
 * Used by the CLI `brand --preset` command and the dashboard preset selector.
 */

import type { BrandConfig } from './types'

export const PRESET_BLEND_DEFAULT: BrandConfig = {
    brandId: 'blend/default',
    name: 'Blend Default',
    version: '1.0.0',
    // No overrides — use Blend foundation as-is
}

export const PRESET_HDFC: BrandConfig = {
    brandId: 'hdfc/retail',
    name: 'HDFC Bank',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#FEF2F2',
            '100': '#FFE2E2',
            '200': '#FFC9C9',
            '300': '#FFA2A2',
            '400': '#FF6467',
            '500': '#E31837',
            '600': '#C01530',
            '700': '#A01228',
            '800': '#801020',
            '900': '#600D18',
            '950': '#400810',
        },
    },
    radius: {
        '6': '4px',
        '8': '4px',
        '10': '4px',
        '12': '6px',
    },
}

export const PRESET_NEOBANK: BrandConfig = {
    brandId: 'neobank/light',
    name: 'NeoBank',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#FAF5FF',
            '100': '#F3E8FF',
            '200': '#E9D4FF',
            '300': '#DAB2FF',
            '400': '#C27AFF',
            '500': '#AD46FF',
            '600': '#9810FA',
            '700': '#8200DB',
            '800': '#6E11B0',
            '900': '#59168B',
            '950': '#3C0366',
        },
    },
    radius: {
        '10': '20px',
        '12': '24px',
    },
}

export const PRESET_FINTECH: BrandConfig = {
    brandId: 'fintech/app',
    name: 'FinTech Green',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#F0FDF4',
            '100': '#DCFCE7',
            '200': '#B9F8CF',
            '300': '#7BF1A8',
            '400': '#00D492',
            '500': '#00C951',
            '600': '#00A63E',
            '700': '#008236',
            '800': '#016630',
            '900': '#0D542B',
            '950': '#052E16',
        },
    },
}

/**
 * All built-in presets indexed by short name.
 */
export const PRESETS: Record<string, BrandConfig> = {
    blend: PRESET_BLEND_DEFAULT,
    hdfc: PRESET_HDFC,
    neobank: PRESET_NEOBANK,
    fintech: PRESET_FINTECH,
}

/**
 * Get a preset by name. Returns undefined if not found.
 */
export function getPreset(name: string): BrandConfig | undefined {
    return PRESETS[name.toLowerCase()]
}

/**
 * List all available preset names.
 */
export function listPresets(): Array<{
    name: string
    displayName: string
    brandId: string
}> {
    return Object.entries(PRESETS).map(([name, config]) => ({
        name,
        displayName: config.name,
        brandId: config.brandId,
    }))
}
