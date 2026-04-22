/**
 * Server-safe exports from token-engine
 *
 * Only types and validation - no React dependencies.
 * Safe to import in Next.js API routes.
 */

export { validateBrandConfig } from './validate'
export { diffBrandConfigs } from './diff'
export { generateColorScale, isValidHexColor } from './color-scale'

export {
    getContrastRatio,
    getContrastRatioHex,
    analyzeContrast,
    validatePaletteContrast,
    suggestForeground,
    hexToRgb,
    relativeLuminance,
    meetsWCAG,
} from './contrast'

export type {
    ContrastResult,
    ContrastViolation,
    WCAGLevel,
    WCAGContext,
} from './contrast'
export { getPreset, listPresets, PRESETS } from './presets'
export {
    PRESET_BLEND_DEFAULT,
    PRESET_JUSPAY,
    PRESET_PURPLE,
    PRESET_GREEN,
    PRESET_ORANGE,
} from './presets'

export {
    resolveWithInheritance,
    validateAgainstLocks,
    extractOverridePaths,
} from './inheritance'

export type {
    LockViolation,
    InheritanceResult,
    TokenLockEntry,
} from './inheritance'

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