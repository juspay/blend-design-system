/**
 * Tests for brand config validation.
 */
import { describe, it, expect } from 'vitest'
import { validateBrandConfig } from '../validate'

describe('validateBrandConfig', () => {
    it('validates a correct minimal config', () => {
        const result = validateBrandConfig({
            brandId: 'test/default',
            name: 'Test',
            version: '1.0.0',
        })
        expect(result.valid).toBe(true)
        expect(result.errors).toHaveLength(0)
    })

    it('validates a full config with colors, radius, shadows', () => {
        const result = validateBrandConfig({
            brandId: 'test/full',
            name: 'Full Config',
            version: '2.0.0',
            colors: {
                primary: { '500': '#3B82F6' },
                gray: { '100': '#F3F4F6', '900': '#111827' },
            },
            radius: { '8': '8px', '12': '12px' },
            shadows: { sm: '0 1px 2px rgba(0,0,0,0.05)' },
        })
        expect(result.valid).toBe(true)
        expect(result.errors).toHaveLength(0)
    })

    it('rejects non-object config', () => {
        const result = validateBrandConfig('not an object')
        expect(result.valid).toBe(false)
        expect(result.errors.length).toBeGreaterThan(0)
    })

    it('rejects null config', () => {
        const result = validateBrandConfig(null)
        expect(result.valid).toBe(false)
    })

    it('requires brandId', () => {
        const result = validateBrandConfig({
            name: 'Test',
            version: '1.0.0',
        })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.path === 'brandId')).toBe(true)
    })

    it('requires name', () => {
        const result = validateBrandConfig({
            brandId: 'test/a',
            version: '1.0.0',
        })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.path === 'name')).toBe(true)
    })

    it('requires version', () => {
        const result = validateBrandConfig({
            brandId: 'test/a',
            name: 'Test',
        })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.path === 'version')).toBe(true)
    })

    it('validates brandId format', () => {
        const result = validateBrandConfig({
            brandId: '!!!invalid!!!',
            name: 'Test',
            version: '1.0.0',
        })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.path === 'brandId')).toBe(true)
    })

    it('rejects invalid hex colors', () => {
        const result = validateBrandConfig({
            brandId: 'test/colors',
            name: 'Test',
            version: '1.0.0',
            colors: {
                primary: { '500': 'not-a-hex' },
            },
        })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.path === 'colors.primary.500')).toBe(
            true
        )
    })

    it('warns on unknown color groups', () => {
        const result = validateBrandConfig({
            brandId: 'test/unknown',
            name: 'Test',
            version: '1.0.0',
            colors: {
                teal: { '500': '#14B8A6' },
            },
        })
        // teal is not in valid groups — should be a warning, not error
        expect(result.warnings.some((w) => w.path === 'colors.teal')).toBe(true)
    })

    it('validates component overrides colors', () => {
        const result = validateBrandConfig({
            brandId: 'test/comp',
            name: 'Test',
            version: '1.0.0',
            componentOverrides: {
                BUTTONV2: {
                    colors: { primary: { '500': 'bad-color' } },
                },
            },
        })
        expect(result.valid).toBe(false)
        expect(
            result.errors.some((e) =>
                e.path.includes(
                    'componentOverrides.BUTTONV2.colors.primary.500'
                )
            )
        ).toBe(true)
    })

    it('validates radius values are strings', () => {
        const result = validateBrandConfig({
            brandId: 'test/radius',
            name: 'Test',
            version: '1.0.0',
            radius: { '8': 8 as unknown as string },
        })
        expect(result.valid).toBe(false)
        expect(result.errors.some((e) => e.path === 'radius.8')).toBe(true)
    })

    it('generates WCAG contrast warnings for color scales', () => {
        const result = validateBrandConfig({
            brandId: 'test/contrast',
            name: 'Test',
            version: '1.0.0',
            colors: {
                primary: {
                    '50': '#F0F9FF',
                    '100': '#E0F2FE',
                },
            },
        })
        // Very light colors on white should produce contrast warnings
        expect(
            result.warnings.some((w) => w.message.includes('Contrast'))
        ).toBe(true)
    })
})
