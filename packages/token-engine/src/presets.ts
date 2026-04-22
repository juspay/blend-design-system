/**
 * Built-in Brand Presets
 *
 * Ready-to-use brand configurations for common use cases.
 * Used by the CLI `brand --preset` command and the dashboard preset selector.
 *
 * The default preset is "blend" (Juspay Blend Design System).
 * Users can create their own custom presets via the Token Studio dashboard.
 */

import type { BrandConfig } from './types'

/** Default Blend theme — no overrides, uses Blend foundation as-is. */
export const PRESET_BLEND_DEFAULT: BrandConfig = {
    brandId: 'blend/default',
    name: 'Blend Default',
    version: '1.0.0',
    // No overrides — use Blend foundation as-is
}

/** Juspay brand theme — blue primary, default radius. */
export const PRESET_JUSPAY: BrandConfig = {
    brandId: 'juspay/default',
    name: 'Juspay',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#EFF6FF',
            '100': '#DBEAFE',
            '200': '#BFDBFE',
            '300': '#93C5FD',
            '400': '#60A5FA',
            '500': '#3B82F6',
            '600': '#2563EB',
            '700': '#1D4ED8',
            '800': '#1E40AF',
            '900': '#1E3A8A',
            '950': '#172554',
        },
    },
}

/** Purple SaaS theme — ideal for dashboards and admin panels. */
export const PRESET_PURPLE: BrandConfig = {
    brandId: 'starter/purple',
    name: 'Purple',
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

/** Green theme — works well for fintech, sustainability, and health apps. */
export const PRESET_GREEN: BrandConfig = {
    brandId: 'starter/green',
    name: 'Green',
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

/** Warm orange theme — great for e-commerce and consumer brands. */
export const PRESET_ORANGE: BrandConfig = {
    brandId: 'starter/orange',
    name: 'Orange',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#FFF7ED',
            '100': '#FFEDD5',
            '200': '#FED7AA',
            '300': '#FDBA74',
            '400': '#FB923C',
            '500': '#F97316',
            '600': '#EA580C',
            '700': '#C2410C',
            '800': '#9A3412',
            '900': '#7C2D12',
            '950': '#431407',
        },
    },
}

/**
 * All built-in presets indexed by short name.
 * Users can select these from the CLI or dashboard.
 */
export const PRESETS: Record<string, BrandConfig> = {
    blend: PRESET_BLEND_DEFAULT,
    juspay: PRESET_JUSPAY,
    purple: PRESET_PURPLE,
    green: PRESET_GREEN,
    orange: PRESET_ORANGE,
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
