/**
 * Brand configuration — the small JSON that designers edit and Firestore stores.
 *
 * A brand config contains only the OVERRIDES from Blend defaults.
 * The token engine merges these into FOUNDATION_THEME to produce
 * the full component token set for every V2 component.
 *
 * Typical size: ~20 lines of JSON vs ~1500+ lines per component token file.
 */

// ---------------------------------------------------------------------------
// Brand Config
// ---------------------------------------------------------------------------

/** A partial color scale — designers only override the shades they need. */
export type ColorOverrides = Partial<Record<string, string>>

/** Color groups matching FOUNDATION_THEME.colors keys. */
export interface BrandColors {
    primary?: ColorOverrides
    gray?: ColorOverrides
    red?: ColorOverrides
    green?: ColorOverrides
    yellow?: ColorOverrides
    orange?: ColorOverrides
    purple?: ColorOverrides
}

/** Radius overrides matching FOUNDATION_THEME.border.radius keys. */
export type RadiusOverrides = Partial<Record<string, string>>

/** Shadow overrides matching FOUNDATION_THEME.shadows keys. */
export type ShadowOverrides = Partial<Record<string, string>>

/** Font overrides. */
export interface FontOverrides {
    family?: string
    weight?: Partial<Record<string, number>>
}

/**
 * The brand configuration document.
 *
 * This is the source of truth that flows through the entire system:
 *   Dashboard edits → Firestore stores → CLI pulls → Token engine resolves
 */
export interface BrandConfig {
    /** Unique identifier, e.g. "hdfc/retail" or "neobank/light" */
    brandId: string

    /** Human-readable name, e.g. "HDFC Bank Retail" */
    name: string

    /** Semver version, e.g. "1.0.0" */
    version: string

    /** Color overrides applied to FOUNDATION_THEME.colors */
    colors?: BrandColors

    /** Border radius overrides applied to FOUNDATION_THEME.border.radius */
    radius?: RadiusOverrides

    /** Box shadow overrides applied to FOUNDATION_THEME.shadows */
    shadows?: ShadowOverrides

    /** Font overrides applied to FOUNDATION_THEME.font */
    font?: FontOverrides
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface ValidationError {
    path: string
    message: string
}

export interface ValidationWarning {
    path: string
    message: string
}

export interface ValidationResult {
    valid: boolean
    errors: ValidationError[]
    warnings: ValidationWarning[]
}

// ---------------------------------------------------------------------------
// Diff
// ---------------------------------------------------------------------------

export interface TokenDiff {
    /** Dot-path to the changed value, e.g. "colors.primary.600" */
    path: string

    /** Previous value, or "(default)" if was unset */
    oldValue: string

    /** New value, or "(default)" if was removed */
    newValue: string
}

// ---------------------------------------------------------------------------
// Presets
// ---------------------------------------------------------------------------

export type RadiusPreset = 'sharp' | 'default' | 'rounded' | 'pill'

export const RADIUS_PRESETS: Record<RadiusPreset, RadiusOverrides> = {
    sharp: { 6: '2px', 8: '4px', 10: '4px', 12: '6px', 16: '8px', 20: '10px' },
    default: {}, // use Blend defaults
    rounded: {
        6: '12px',
        8: '16px',
        10: '20px',
        12: '24px',
        16: '28px',
        20: '32px',
    },
    pill: {
        6: '9999px',
        8: '9999px',
        10: '9999px',
        12: '9999px',
        16: '9999px',
        20: '9999px',
    },
}
