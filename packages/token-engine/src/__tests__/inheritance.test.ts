/**
 * E2E tests for the 3-tier token inheritance model.
 *
 * Covers: resolveWithInheritance, validateAgainstLocks, extractOverridePaths
 */
import { describe, it, expect } from 'vitest'
import {
    resolveWithInheritance,
    validateAgainstLocks,
    extractOverridePaths,
} from '../inheritance'
import type { BrandConfig } from '../types'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const ORG_CONFIG: BrandConfig = {
    brandId: 'org/default',
    name: 'Org Master',
    version: '1.0.0',
    colors: {
        primary: {
            '500': '#1E40AF',
            '600': '#1D4ED8',
        },
        gray: {
            '500': '#6B7280',
        },
    },
    radius: { '8': '8px' },
}

const PRODUCT_CONFIG: BrandConfig = {
    brandId: 'product/retail',
    name: 'Retail App',
    version: '1.0.0',
    colors: {
        primary: {
            '500': '#E11D48', // Different primary
        },
        green: {
            '500': '#10B981', // New color
        },
    },
    radius: { '12': '24px' },
}

const LOCKS = [
    { path: 'colors.primary.500', reason: 'Brand primary must stay blue' },
    { path: 'radius.8', reason: 'Standard radius' },
]

// ---------------------------------------------------------------------------
// resolveWithInheritance
// ---------------------------------------------------------------------------

describe('resolveWithInheritance', () => {
    it('merges child overrides onto parent', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG)
        expect(result.mergedConfig).toBeTruthy()
        expect(result.mergedConfig.brandId).toBe(PRODUCT_CONFIG.brandId)
        expect(result.mergedConfig.name).toBe(PRODUCT_CONFIG.name)
    })

    it('preserves parent values for non-overridden paths', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG)
        // gray.500 was set by org, not by product → should be in merged
        expect(result.mergedConfig.colors?.gray?.['500']).toBe('#6B7280')
    })

    it('merges child colors on top of parent', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG)
        // Product added green.500
        expect(result.mergedConfig.colors?.green?.['500']).toBe('#10B981')
        // Parent primary.600 should carry over
        expect(result.mergedConfig.colors?.primary?.['600']).toBe('#1D4ED8')
    })

    it('is clean when no locks exist', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG)
        expect(result.isClean).toBe(true)
        expect(result.violations).toHaveLength(0)
    })

    it('detects lock violations', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG, LOCKS)
        // Product tried to change primary.500 which is locked
        expect(result.isClean).toBe(false)
        expect(result.violations.length).toBeGreaterThan(0)

        const primaryViolation = result.violations.find(
            (v) => v.path === 'colors.primary.500'
        )
        expect(primaryViolation).toBeTruthy()
        expect(primaryViolation!.parentValue).toBe('#1E40AF')
        expect(primaryViolation!.childValue).toBe('#E11D48')
        expect(primaryViolation!.reason).toBe('Brand primary must stay blue')
    })

    it('enforces locked values in merged config', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG, LOCKS)
        // Even though product wanted #E11D48, locked path should keep org value
        expect(result.mergedConfig.colors?.primary?.['500']).toBe('#1E40AF')
    })

    it('allows overrides on non-locked paths even when locks exist', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG, LOCKS)
        // Product's green.500 is NOT locked → should be in merged
        expect(result.mergedConfig.colors?.green?.['500']).toBe('#10B981')
        // Product's radius.12 is NOT locked → should be in merged
        expect(result.mergedConfig.radius?.['12']).toBe('24px')
    })

    it('handles empty locked paths', () => {
        const result = resolveWithInheritance(ORG_CONFIG, PRODUCT_CONFIG, [])
        expect(result.isClean).toBe(true)
        expect(result.violations).toHaveLength(0)
    })

    it('handles darkModeOverrides merging', () => {
        const orgWithDark: BrandConfig = {
            ...ORG_CONFIG,
            darkModeOverrides: {
                colors: { primary: { '500': '#93C5FD' } },
            },
        }
        const productWithDark: BrandConfig = {
            ...PRODUCT_CONFIG,
            darkModeOverrides: {
                colors: { green: { '500': '#34D399' } },
            },
        }
        const result = resolveWithInheritance(orgWithDark, productWithDark)
        expect(result.mergedConfig.darkModeOverrides).toBeTruthy()
        // Should merge both org and product dark overrides
        const darkColors = result.mergedConfig.darkModeOverrides?.colors as any
        expect(darkColors?.primary?.['500']).toBe('#93C5FD')
        expect(darkColors?.green?.['500']).toBe('#34D399')
    })
})

// ---------------------------------------------------------------------------
// validateAgainstLocks
// ---------------------------------------------------------------------------

describe('validateAgainstLocks', () => {
    it('returns empty array when no violations', () => {
        const violations = validateAgainstLocks(ORG_CONFIG, ORG_CONFIG, LOCKS)
        expect(violations).toHaveLength(0)
    })

    it('detects violations without merging', () => {
        const violations = validateAgainstLocks(
            ORG_CONFIG,
            PRODUCT_CONFIG,
            LOCKS
        )
        expect(violations.length).toBeGreaterThan(0)
    })

    it('includes all violation details', () => {
        const violations = validateAgainstLocks(
            ORG_CONFIG,
            PRODUCT_CONFIG,
            LOCKS
        )
        const v = violations.find((v) => v.path === 'colors.primary.500')
        expect(v).toBeTruthy()
        expect(v!.parentValue).toBe('#1E40AF')
        expect(v!.childValue).toBe('#E11D48')
        expect(v!.reason).toBeDefined()
    })
})

// ---------------------------------------------------------------------------
// extractOverridePaths
// ---------------------------------------------------------------------------

describe('extractOverridePaths', () => {
    it('extracts all override paths from a config', () => {
        const paths = extractOverridePaths(PRODUCT_CONFIG)
        expect(paths).toContain('colors.primary.500')
        expect(paths).toContain('colors.green.500')
        expect(paths).toContain('radius.12')
    })

    it('returns empty array for config with no overrides', () => {
        const paths = extractOverridePaths({
            brandId: 'test/empty',
            name: 'Empty',
            version: '1.0.0',
        })
        expect(paths).toHaveLength(0)
    })
})
