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
 *
 * NOTE: This module should only be used in client-side code or CLI.
 * Do not import in Next.js API routes as it pulls in React components.
 *
 * @example
 * ```ts
 * import { resolveBrandTokens } from '@blend-design/token-engine'
 *
 * const tokens = resolveBrandTokens({
 *     brandId: 'my-brand/default',
 *     name: 'My Brand',
 *     version: '1.0.0',
 *     colors: { primary: { '500': '#3B82F6' } },
 * })
 *
 * <ThemeProvider componentTokens={tokens}>
 *     <App />
 * </ThemeProvider>
 * ```
 */

import type { BrandConfig } from './types'
import { buildBrandFoundation } from './build-brand-foundation'
import { resolveAllTokens, resolveComponentTokens } from './resolve-all-tokens'

/**
 * Resolves a BrandConfig into the full ComponentTokenType object.
 *
 * If the config has `componentOverrides`, those overrides are applied
 * per-component on top of the global brand tokens. This allows specific
 * components to use different colors/radius/shadows than the global brand.
 *
 * @example
 * ```ts
 * const tokens = resolveBrandTokens({
 *   brandId: 'my-brand/default',
 *   name: 'My Brand',
 *   version: '1.0.0',
 *   colors: { primary: { '500': '#3B82F6' } },
 *   componentOverrides: {
 *     BUTTONV2: {
 *       colors: { primary: { '500': '#DC2626' } },
 *     },
 *   },
 * })
 * ```
 */
export function resolveBrandTokens(
    brandConfig: BrandConfig,
    theme: 'light' | 'dark' = 'light'
): Record<string, unknown> {
    // For dark mode, merge darkModeOverrides on top of the base config
    let effectiveConfig = brandConfig
    if (theme === 'dark' && brandConfig.darkModeOverrides) {
        effectiveConfig = {
            ...brandConfig,
            colors: deepMerge(
                brandConfig.colors ?? {},
                brandConfig.darkModeOverrides.colors ?? {}
            ),
            radius: {
                ...brandConfig.radius,
                ...brandConfig.darkModeOverrides.radius,
            },
            shadows: {
                ...brandConfig.shadows,
                ...brandConfig.darkModeOverrides.shadows,
            },
            font: {
                ...brandConfig.font,
                ...brandConfig.darkModeOverrides.font,
            },
        }
    }

    const foundation = buildBrandFoundation(effectiveConfig)
    const tokens = resolveAllTokens(foundation, theme)

    // Apply per-component overrides if any
    if (effectiveConfig.componentOverrides) {
        applyComponentOverrides(tokens, effectiveConfig, theme)
    }

    return tokens
}

/**
 * For each component override, build a modified foundation with the
 * component-specific overrides merged on top of the brand config,
 * then re-resolve just that component's tokens.
 */
function applyComponentOverrides(
    tokens: Record<string, unknown>,
    brandConfig: BrandConfig,
    theme: 'light' | 'dark'
): void {
    const overrides = brandConfig.componentOverrides!

    for (const [componentKey, overrideConfig] of Object.entries(overrides)) {
        // Build a merged brand config for this component
        const mergedConfig: BrandConfig = {
            ...brandConfig,
            colors: deepMerge(
                brandConfig.colors ?? {},
                overrideConfig.colors ?? {}
            ),
            radius: { ...brandConfig.radius, ...overrideConfig.radius },
            shadows: { ...brandConfig.shadows, ...overrideConfig.shadows },
            font: { ...brandConfig.font, ...overrideConfig.font },
        }

        const componentFoundation = buildBrandFoundation(mergedConfig)
        const componentTokens = resolveComponentTokens(
            componentKey,
            componentFoundation,
            theme
        )

        if (componentTokens !== undefined) {
            tokens[componentKey] = componentTokens
        }
    }
}

/** Deep merge for nested color objects. */
function deepMerge(
    base: Record<string, any>,
    override: Record<string, any>
): Record<string, any> {
    const result = { ...base }
    for (const [key, value] of Object.entries(override)) {
        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            base[key] &&
            typeof base[key] === 'object'
        ) {
            result[key] = deepMerge(base[key], value)
        } else {
            result[key] = value
        }
    }
    return result
}

export { buildBrandFoundation } from './build-brand-foundation'
export { resolveAllTokens, V2_COMPONENT_KEYS } from './resolve-all-tokens'

export { validateBrandConfig } from './validate'

export { diffBrandConfigs } from './diff'

export { generateColorScale, isValidHexColor } from './color-scale'

export { getPreset, listPresets, PRESETS } from './presets'
export {
    PRESET_BLEND_DEFAULT,
    PRESET_JUSPAY,
    PRESET_PURPLE,
    PRESET_GREEN,
    PRESET_ORANGE,
} from './presets'

export type {
    BrandConfig,
    BrandColors,
    ColorOverrides,
    RadiusOverrides,
    ShadowOverrides,
    FontOverrides,
    ComponentOverrides,
    RadiusPreset,
    ValidationResult,
    ValidationError,
    ValidationWarning,
    TokenDiff,
} from './types'

export { RADIUS_PRESETS } from './types'

export type {
    BranchStatus,
    BranchVisibility,
    BranchPermissions,
    BranchOwner,
    BranchMeta,
    BranchReference,
    Branch,
    CreateBranchInput,
    UpdateBranchInput,
    Version,
    CreateVersionInput,
    Snapshot,
    CreateSnapshotInput,
    BranchListFilters,
    BranchListOptions,
    BranchListResult,
    BranchDiff,
    ResolvedTokensResponse,
} from './studio-types'

export {
    BRANCH_ID_PATTERN,
    VERSION_PATTERN,
    generateBranchId,
    parseBranchId,
    validateBranchId,
    validateVersion,
    incrementVersion,
} from './studio-types'

// User/Team types (PostgreSQL for data, localStorage for preferences)
export type {
    TeamRole,
    TeamPermissions,
    UserPreferences,
    OnboardingState,
} from './user-types'

export {
    TEAM_ROLE_PERMISSIONS,
    BRANCH_COLLECTION,
    VERSION_SUBCOLLECTION,
    SNAPSHOT_SUBCOLLECTION,
    versionsPath,
    snapshotsPath,
    getDefaultPreferences,
    getDefaultOnboardingState,
    STORAGE_KEYS,
    canUserPerformAction,
} from './user-types'
