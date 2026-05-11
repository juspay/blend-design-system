/**
 * Tests for WCAG contrast ratio utilities.
 */
import { describe, it, expect } from 'vitest'
import {
    hexToRgb,
    relativeLuminance,
    getContrastRatio,
    getContrastRatioHex,
    meetsWCAG,
    analyzeContrast,
    validatePaletteContrast,
    suggestForeground,
} from '../contrast'

describe('hexToRgb', () => {
    it('parses #RRGGBB format', () => {
        expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 })
        expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 })
        expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 })
        expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 })
        expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('parses #RGB shorthand', () => {
        expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 })
        expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 })
    })

    it('returns null for invalid hex', () => {
        expect(hexToRgb('not-a-color')).toBeNull()
        expect(hexToRgb('#GGHHII')).toBeNull()
        expect(hexToRgb('#12345')).toBeNull()
    })
})

describe('relativeLuminance', () => {
    it('returns 0 for black', () => {
        expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 4)
    })

    it('returns 1 for white', () => {
        expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 4)
    })

    it('returns value between 0 and 1 for mid-gray', () => {
        const lum = relativeLuminance({ r: 128, g: 128, b: 128 })
        expect(lum).toBeGreaterThan(0)
        expect(lum).toBeLessThan(1)
    })
})

describe('getContrastRatio', () => {
    it('returns 21 for black on white', () => {
        const ratio = getContrastRatio(
            { r: 0, g: 0, b: 0 },
            { r: 255, g: 255, b: 255 }
        )
        expect(ratio).toBeCloseTo(21, 0)
    })

    it('returns 1 for same color', () => {
        const ratio = getContrastRatio(
            { r: 128, g: 128, b: 128 },
            { r: 128, g: 128, b: 128 }
        )
        expect(ratio).toBeCloseTo(1, 4)
    })

    it('is symmetric', () => {
        const a = { r: 255, g: 0, b: 0 }
        const b = { r: 0, g: 0, b: 255 }
        expect(getContrastRatio(a, b)).toBeCloseTo(getContrastRatio(b, a), 4)
    })
})

describe('getContrastRatioHex', () => {
    it('computes contrast from hex strings', () => {
        const ratio = getContrastRatioHex('#000000', '#FFFFFF')
        expect(ratio).toBeCloseTo(21, 0)
    })

    it('returns null for invalid hex', () => {
        expect(getContrastRatioHex('invalid', '#FFF')).toBeNull()
    })
})

describe('meetsWCAG', () => {
    it('AA normal requires 4.5:1', () => {
        expect(meetsWCAG(4.5, 'AA', 'normal')).toBe(true)
        expect(meetsWCAG(4.4, 'AA', 'normal')).toBe(false)
    })

    it('AA large requires 3.0:1', () => {
        expect(meetsWCAG(3.0, 'AA', 'large')).toBe(true)
        expect(meetsWCAG(2.9, 'AA', 'large')).toBe(false)
    })

    it('AAA normal requires 7.0:1', () => {
        expect(meetsWCAG(7.0, 'AAA', 'normal')).toBe(true)
        expect(meetsWCAG(6.9, 'AAA', 'normal')).toBe(false)
    })
})

describe('analyzeContrast', () => {
    it('returns full analysis for valid colors', () => {
        const result = analyzeContrast('#000000', '#FFFFFF')
        expect(result).toBeTruthy()
        expect(result!.ratio).toBeCloseTo(21, 0)
        expect(result!.display).toMatch(/21/)
        expect(result!.aa.normal).toBe(true)
        expect(result!.aa.large).toBe(true)
        expect(result!.aaa.normal).toBe(true)
        expect(result!.aaa.large).toBe(true)
    })

    it('returns null for invalid colors', () => {
        expect(analyzeContrast('invalid', '#FFF')).toBeNull()
    })

    it('detects failing contrast', () => {
        // Light gray on white — poor contrast
        const result = analyzeContrast('#CCCCCC', '#FFFFFF')
        expect(result).toBeTruthy()
        expect(result!.aa.normal).toBe(false)
    })
})

describe('validatePaletteContrast', () => {
    it('returns violations for low-contrast shades', () => {
        const scale = {
            '100': '#F3F4F6', // very light gray
            '200': '#E5E7EB', // light gray
            '900': '#111827', // very dark — good on white
        }
        const violations = validatePaletteContrast(scale, { level: 'AA' })
        // Light shades on white should fail
        expect(violations.length).toBeGreaterThan(0)
        const lightViolation = violations.find((v) => v.path?.includes('100'))
        expect(lightViolation).toBeTruthy()
    })

    it('returns empty for high-contrast palette', () => {
        const scale = { '900': '#000000' }
        const violations = validatePaletteContrast(scale, {
            level: 'AA',
            backgrounds: [{ name: 'white', hex: '#FFFFFF' }],
        })
        // Black on white = 21:1 — passes everything
        expect(violations).toHaveLength(0)
    })
})

describe('suggestForeground', () => {
    it('suggests black text on light backgrounds', () => {
        expect(suggestForeground('#FFFFFF')).toBe('#000000')
        expect(suggestForeground('#F3F4F6')).toBe('#000000')
    })

    it('suggests white text on dark backgrounds', () => {
        expect(suggestForeground('#000000')).toBe('#FFFFFF')
        expect(suggestForeground('#1A1A2E')).toBe('#FFFFFF')
    })
})
