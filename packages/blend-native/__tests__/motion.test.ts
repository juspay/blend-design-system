import { describe, it, expect } from 'vitest'
import {
    MOTION_DURATION,
    MOTION_EASING,
    MOTION_PRESETS,
    reducedMotionVariant,
} from '../src/motion/motion'

describe('motion presets', () => {
    it('every preset resolves a defined duration and easing', () => {
        for (const [name, preset] of Object.entries(MOTION_PRESETS)) {
            expect(preset.duration, name).toBeGreaterThan(0)
            expect(preset.exitDuration, name).toBeGreaterThan(0)
            expect(MOTION_EASING[preset.easing], name).toBeDefined()
            expect(MOTION_EASING[preset.exitEasing], name).toBeDefined()
        }
    })

    it('every preset ends fully opaque', () => {
        for (const [name, preset] of Object.entries(MOTION_PRESETS)) {
            expect(preset.to.opacity, name).toBe(1)
        }
    })

    it('easing control points are valid cubic-bezier x values', () => {
        // x1/x2 must be within [0,1] or the curve is not a function of time.
        for (const [name, [x1, , x2]] of Object.entries(MOTION_EASING)) {
            expect(x1, name).toBeGreaterThanOrEqual(0)
            expect(x1, name).toBeLessThanOrEqual(1)
            expect(x2, name).toBeGreaterThanOrEqual(0)
            expect(x2, name).toBeLessThanOrEqual(1)
        }
    })
})

describe('reducedMotionVariant', () => {
    it('strips every transform, keeping only a fast fade', () => {
        for (const preset of Object.values(MOTION_PRESETS)) {
            const reduced = reducedMotionVariant(preset)
            expect(reduced.from.scale).toBeUndefined()
            expect(reduced.from.translateX).toBeUndefined()
            expect(reduced.from.translateY).toBeUndefined()
            expect(reduced.to.scale).toBeUndefined()
            expect(reduced.to.translateY).toBeUndefined()
            expect(reduced.duration).toBe(MOTION_DURATION.fast)
        }
    })

    it('preserves the opacity endpoints', () => {
        const reduced = reducedMotionVariant(MOTION_PRESETS.scaleFade)
        expect(reduced.from.opacity).toBe(0)
        expect(reduced.to.opacity).toBe(1)
    })
})
