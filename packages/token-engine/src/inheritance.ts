/**
 * Token Inheritance & Lock Validation
 *
 * Implements the 3-tier token inheritance model:
 *
 *   Blend Foundation (FOUNDATION_THEME)
 *     └── Org Master Branch (org-level overrides, some paths locked)
 *           └── Product Branch (product-level overrides, respects locks)
 *
 * Key concepts:
 *   - A parent BrandConfig provides the baseline overrides
 *   - A child BrandConfig layers additional overrides on top
 *   - Locked token paths from the org cannot be changed by the child
 *   - Violations are detected and reported, not silently ignored
 */

import type { BrandConfig, BrandColors } from './types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LockViolation {
    /** Dot-path that was locked, e.g. "colors.primary.500" */
    path: string
    /** The value set by the org (parent) */
    parentValue: string
    /** The value the child tried to set */
    childValue: string
    /** Human-readable reason the token was locked */
    reason?: string
}

export interface InheritanceResult {
    /** The merged config with child overrides applied (locked paths preserved from parent) */
    mergedConfig: BrandConfig
    /** Any lock violations found (child tried to override a locked path) */
    violations: LockViolation[]
    /** Whether the merge is clean (no violations) */
    isClean: boolean
}

export interface TokenLockEntry {
    /** Dot-path to the locked token, e.g. "colors.primary.500" */
    path: string
    /** Why this token is locked */
    reason?: string
}

// ---------------------------------------------------------------------------
// Deep Value Access
// ---------------------------------------------------------------------------

/**
 * Get a value from a nested object using a dot-path.
 * e.g. getByPath({ colors: { primary: { 500: "#fff" } } }, "colors.primary.500") => "#fff"
 */
function getByPath(obj: Record<string, any>, path: string): any {
    const keys = path.split('.')
    let current: any = obj
    for (const key of keys) {
        if (current === undefined || current === null) return undefined
        current = current[key]
    }
    return current
}

/**
 * Set a value in a nested object using a dot-path (immutable — returns new object).
 */
function setByPath(
    obj: Record<string, any>,
    path: string,
    value: any
): Record<string, any> {
    const keys = path.split('.')
    if (keys.length === 0) return obj

    const result = { ...obj }
    let current: any = result

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        current[key] = current[key] ? { ...current[key] } : {}
        current = current[key]
    }

    current[keys[keys.length - 1]] = value
    return result
}

// ---------------------------------------------------------------------------
// Deep Merge (same as in index.ts, extracted for reuse)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Core Inheritance Logic
// ---------------------------------------------------------------------------

/**
 * Merge a child BrandConfig on top of a parent BrandConfig,
 * respecting locked token paths.
 *
 * @param parentConfig  The org's master branch BrandConfig
 * @param childConfig   The product branch BrandConfig
 * @param lockedPaths   Token paths the org has marked as non-negotiable
 * @returns InheritanceResult with merged config and any violations
 *
 * @example
 * ```ts
 * const result = resolveWithInheritance(
 *   orgConfig,
 *   productConfig,
 *   [{ path: 'colors.primary.500', reason: 'Brand primary must stay blue' }]
 * )
 *
 * if (!result.isClean) {
 *   console.warn('Lock violations:', result.violations)
 * }
 *
 * const tokens = resolveBrandTokens(result.mergedConfig, 'light')
 * ```
 */
export function resolveWithInheritance(
    parentConfig: BrandConfig,
    childConfig: BrandConfig,
    lockedPaths: TokenLockEntry[] = []
): InheritanceResult {
    // Start by merging child's top-level overrides onto parent
    const merged: BrandConfig = {
        // Keep child's identity
        brandId: childConfig.brandId,
        name: childConfig.name,
        version: childConfig.version,

        // Merge override sections (child on top of parent)
        colors: deepMerge(
            (parentConfig.colors ?? {}) as Record<string, any>,
            (childConfig.colors ?? {}) as Record<string, any>
        ) as BrandColors,
        radius: { ...parentConfig.radius, ...childConfig.radius },
        shadows: { ...parentConfig.shadows, ...childConfig.shadows },
        font: { ...parentConfig.font, ...childConfig.font },

        // Component overrides: merge child's on top of parent's
        componentOverrides: deepMerge(
            (parentConfig.componentOverrides ?? {}) as Record<string, any>,
            (childConfig.componentOverrides ?? {}) as Record<string, any>
        ),

        // Dark mode: merge child's on top of parent's
        darkModeOverrides:
            parentConfig.darkModeOverrides || childConfig.darkModeOverrides
                ? deepMerge(
                      (parentConfig.darkModeOverrides ?? {}) as Record<
                          string,
                          any
                      >,
                      (childConfig.darkModeOverrides ?? {}) as Record<
                          string,
                          any
                      >
                  )
                : undefined,
    }

    // Check for lock violations and enforce them
    const violations: LockViolation[] = []

    for (const lock of lockedPaths) {
        const parentValue = getByPath(parentConfig as any, lock.path)
        const childValue = getByPath(childConfig as any, lock.path)

        // Only a violation if the child explicitly set a different value
        if (childValue !== undefined && childValue !== parentValue) {
            violations.push({
                path: lock.path,
                parentValue: String(parentValue ?? '(default)'),
                childValue: String(childValue),
                reason: lock.reason,
            })
        }

        // Enforce: restore the parent's value in the merged config
        if (parentValue !== undefined) {
            const mergedAny = merged as any
            const currentMergedValue = getByPath(mergedAny, lock.path)
            if (currentMergedValue !== parentValue) {
                Object.assign(
                    merged,
                    setByPath(mergedAny, lock.path, parentValue)
                )
            }
        }
    }

    return {
        mergedConfig: merged,
        violations,
        isClean: violations.length === 0,
    }
}

// ---------------------------------------------------------------------------
// Lock Validation (standalone — for checking before save)
// ---------------------------------------------------------------------------

/**
 * Validate a child config against locked paths without merging.
 * Returns only the violations. Useful for pre-save validation in the UI.
 */
export function validateAgainstLocks(
    parentConfig: BrandConfig,
    childConfig: BrandConfig,
    lockedPaths: TokenLockEntry[]
): LockViolation[] {
    const violations: LockViolation[] = []

    for (const lock of lockedPaths) {
        const parentValue = getByPath(parentConfig as any, lock.path)
        const childValue = getByPath(childConfig as any, lock.path)

        if (childValue !== undefined && childValue !== parentValue) {
            violations.push({
                path: lock.path,
                parentValue: String(parentValue ?? '(default)'),
                childValue: String(childValue),
                reason: lock.reason,
            })
        }
    }

    return violations
}

/**
 * Extract all dot-paths from a BrandConfig's override sections.
 * Useful for showing which tokens a config actually overrides.
 */
export function extractOverridePaths(config: BrandConfig): string[] {
    const paths: string[] = []

    function walk(obj: Record<string, any>, prefix: string) {
        for (const [key, value] of Object.entries(obj)) {
            const path = prefix ? `${prefix}.${key}` : key
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                walk(value, path)
            } else if (value !== undefined) {
                paths.push(path)
            }
        }
    }

    if (config.colors) walk(config.colors as any, 'colors')
    if (config.radius) walk(config.radius as any, 'radius')
    if (config.shadows) walk(config.shadows as any, 'shadows')
    if (config.font) walk(config.font as any, 'font')

    return paths
}
