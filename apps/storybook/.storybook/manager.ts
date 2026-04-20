import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const theme = create({
    base: 'light',
    brandTitle:
        '<div style="display: flex; align-items: center; gap: 10px;"><img src="/icon.png" style="height: 12px; width: auto;" /><span style="font-size: 16px; font-weight: 600;">Blend</span></div>',
    brandUrl: 'https://blend.juspay.design/',
    brandTarget: '_self',

    colorPrimary: '#3b82f6',
    colorSecondary: '#6366f1',

    // UI
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appBorderColor: '#e5e7eb',
    appBorderRadius: 8,

    // Typography
    fontBase:
        '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode:
        '"Geist Mono", ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',

    // Text colors
    textColor: '#1f2937',
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: '#6b7280',
    barSelectedColor: '#3b82f6',
    barBg: '#f9fafb',

    // Form colors
    inputBg: '#ffffff',
    inputBorder: '#d1d5db',
    inputTextColor: '#1f2937',
    inputBorderRadius: 6,
})

addons.setConfig({
    theme,
    panelPosition: 'bottom',
    selectedPanel: 'controls',
})
