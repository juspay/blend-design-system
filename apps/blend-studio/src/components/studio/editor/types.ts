/**
 * Shared types for the Token Editor components.
 *
 * These types are used across all editor tabs and panels to ensure
 * consistent prop signatures and type safety.
 */

import type {
    BrandConfig,
    TokenDiff,
    Version,
    Snapshot,
} from '@juspay/blend-design-system/tokens'

// ---------------------------------------------------------------------------
// Editor Tab Types
// ---------------------------------------------------------------------------

/** Identifies which editor tab is active in the left panel. */
export type EditorTabId =
    | 'colors'
    | 'typography'
    | 'radius'
    | 'shadows'
    | 'darkmode'
    | 'components'
    | 'json'

/** Identifies which panel is active on the right side. */
export type EditorPanelId =
    | 'preview'
    | 'diff'
    | 'history'
    | 'export'
    | 'accessibility'
    | 'multi-export'
    | 'analytics'

// ---------------------------------------------------------------------------
// Shared Editor Props
// ---------------------------------------------------------------------------

/**
 * Common props for all editor tab components.
 *
 * Each tab receives the current brand config and an updater function
 * that accepts a callback (similar to React's setState with a function).
 */
export interface EditorTabProps {
    /** Current brand configuration being edited. */
    brand: BrandConfig
    /** Update the brand config using an updater function. */
    onChange: (updater: (prev: BrandConfig) => BrandConfig) => void
}

// ---------------------------------------------------------------------------
// Panel Props
// ---------------------------------------------------------------------------

/** Props for the Diff panel. */
export interface DiffPanelProps {
    /** List of differences between current config and Blend defaults. */
    diffs: TokenDiff[]
}

/** Props for the History panel. */
export interface HistoryPanelProps {
    /** Published versions for this branch. */
    versions: Version[]
    /** Draft snapshots (auto-saves and manual saves). */
    snapshots: Snapshot[]
    /** Callback when user wants to restore a previous config. */
    onRestore: (config: BrandConfig) => void
}

/** Props for the Export panel. */
export interface ExportPanelProps {
    /** Current brand configuration to export. */
    brand: BrandConfig
    /** Branch ID used for CLI commands. */
    branchId: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Color groups that can be customized in the brand config. */
export const COLOR_GROUPS = [
    'primary',
    'gray',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
] as const

/** Type for a single color group key. */
export type ColorGroupKey = (typeof COLOR_GROUPS)[number]

/** Border radius keys that map to the design system. */
export const RADIUS_KEYS = [
    '0',
    '2',
    '4',
    '6',
    '8',
    '10',
    '12',
    '16',
    '20',
    'full',
] as const

/** Type for a single radius key. */
export type RadiusKey = (typeof RADIUS_KEYS)[number]

/** Radius presets with human-readable names and complete value sets. */
export const RADIUS_PRESETS = [
    {
        name: 'Sharp',
        values: {
            '0': '0px',
            '2': '0px',
            '4': '0px',
            '6': '0px',
            '8': '0px',
            '10': '0px',
            '12': '0px',
            '16': '0px',
            '20': '0px',
            full: '0px',
        },
    },
    {
        name: 'Subtle',
        values: {
            '0': '0px',
            '2': '2px',
            '4': '4px',
            '6': '4px',
            '8': '4px',
            '10': '4px',
            '12': '6px',
            '16': '6px',
            '20': '8px',
            full: '9999px',
        },
    },
    {
        name: 'Default',
        values: {
            '0': '0px',
            '2': '2px',
            '4': '4px',
            '6': '6px',
            '8': '8px',
            '10': '10px',
            '12': '12px',
            '16': '16px',
            '20': '20px',
            full: '9999px',
        },
    },
    {
        name: 'Rounded',
        values: {
            '0': '0px',
            '2': '4px',
            '4': '8px',
            '6': '12px',
            '8': '16px',
            '10': '20px',
            '12': '24px',
            '16': '32px',
            '20': '40px',
            full: '9999px',
        },
    },
    {
        name: 'Pill',
        values: {
            '0': '0px',
            '2': '8px',
            '4': '12px',
            '6': '16px',
            '8': '24px',
            '10': '32px',
            '12': '40px',
            '16': '9999px',
            '20': '9999px',
            full: '9999px',
        },
    },
] as const

/** Font family options available in the typography editor. */
export const FONT_FAMILIES = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Lato',
    'Nunito',
    'DM Sans',
    'System UI',
] as const

/** Shadow size keys with default CSS values. */
export const SHADOW_KEYS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

/** Default shadow values used when no custom shadow is set. */
export const SHADOW_DEFAULTS: Record<string, string> = {
    xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
    sm: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    '2xl': '0 25px 50px -12px rgba(0,0,0,0.25)',
}
