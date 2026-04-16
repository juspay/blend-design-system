import type { BrandConfig } from '@blend-design/token-engine'

/**
 * Default Juspay theme — the built-in brand preset for Blend.
 * This is the default theme shipped with the open-source design system.
 */
export const JuspayDefaultConfig: BrandConfig = {
    brandId: 'juspay-default',
    name: 'Juspay Default',
    version: '2.1.0',
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
        gray: {
            '50': '#F9FAFB',
            '100': '#F3F4F6',
            '200': '#E5E7EB',
            '300': '#D1D5DB',
            '400': '#9CA3AF',
            '500': '#6B7280',
            '600': '#4B5563',
            '700': '#374151',
            '800': '#1F2937',
            '900': '#111827',
            '950': '#030712',
        },
        red: { '500': '#EF4444' },
        green: { '500': '#10B981' },
    },
    font: { family: 'Inter' },
    radius: { '6': '6px', '8': '8px' },
}

/**
 * Example "Starter" theme — a purple-accented theme to demonstrate
 * how a custom brand config looks. Good for SaaS / dashboard apps.
 */
export const StarterPurpleConfig: BrandConfig = {
    brandId: 'starter-purple',
    name: 'Starter Purple',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#F5F3FF',
            '100': '#EDE9FE',
            '200': '#DDD6FE',
            '300': '#C4B5FD',
            '400': '#A78BFA',
            '500': '#8B5CF6',
            '600': '#7C3AED',
            '700': '#6D28D9',
            '800': '#5B21B6',
            '900': '#4C1D95',
            '950': '#2E1065',
        },
        gray: {
            '50': '#F9FAFB',
            '100': '#F3F4F6',
            '200': '#E5E7EB',
            '300': '#D1D5DB',
            '400': '#9CA3AF',
            '500': '#6B7280',
            '600': '#4B5563',
            '700': '#374151',
            '800': '#1F2937',
            '900': '#111827',
            '950': '#030712',
        },
        red: { '500': '#DC2626' },
        green: { '500': '#059669' },
    },
    font: { family: 'Roboto' },
    radius: { '6': '6px', '8': '4px' },
}

/**
 * Example "Acme" theme — an orange-accented theme showing a warm brand.
 * Good for e-commerce / consumer-facing apps.
 */
export const AcmeLightConfig: BrandConfig = {
    brandId: 'acme-light',
    name: 'Acme Light',
    version: '1.2.0',
    colors: {
        primary: {
            '50': '#FFF7ED',
            '100': '#FFEDD5',
            '200': '#FED7AA',
            '300': '#FDBA74',
            '400': '#FB923C',
            '500': '#EA580C',
            '600': '#C2410C',
            '700': '#9A3412',
            '800': '#7C2D12',
            '900': '#5D2408',
            '950': '#3D1604',
        },
        gray: {
            '50': '#F9FAFB',
            '100': '#F3F4F6',
            '200': '#E5E7EB',
            '300': '#D1D5DB',
            '400': '#9CA3AF',
            '500': '#6B7280',
            '600': '#4B5563',
            '700': '#374151',
            '800': '#1F2937',
            '900': '#111827',
            '950': '#030712',
        },
        red: { '500': '#B91C1C' },
        green: { '500': '#15803D' },
    },
    font: { family: 'Open Sans' },
    radius: { '6': '6px', '8': '16px' },
}
