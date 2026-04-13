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
 *     brandId: 'hdfc/retail',
 *     name: 'HDFC Bank',
 *     version: '1.0.0',
 *     colors: { primary: { '500': '#E31837' } },
 * })
 *
 * <ThemeProvider componentTokens={tokens}>
 *     <App />
 * </ThemeProvider>
 * ```
 */

import type { BrandConfig } from './types'
import { buildBrandFoundation } from './build-brand-foundation'
import { resolveAllTokens } from './resolve-all-tokens'

export function resolveBrandTokens(
    brandConfig: BrandConfig,
    theme: 'light' | 'dark' = 'light'
): Record<string, unknown> {
    const foundation = buildBrandFoundation(brandConfig)
    return resolveAllTokens(foundation, theme)
}

export { buildBrandFoundation } from './build-brand-foundation'
export { resolveAllTokens, V2_COMPONENT_KEYS } from './resolve-all-tokens'

export { validateBrandConfig } from './validate'

export { diffBrandConfigs } from './diff'

export { generateColorScale, isValidHexColor } from './color-scale'

export { getPreset, listPresets, PRESETS } from './presets'
export {
    PRESET_BLEND_DEFAULT,
    PRESET_HDFC,
    PRESET_NEOBANK,
    PRESET_FINTECH,
} from './presets'

export type {
    BrandConfig,
    BrandColors,
    ColorOverrides,
    RadiusOverrides,
    ShadowOverrides,
    FontOverrides,
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
