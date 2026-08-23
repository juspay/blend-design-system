import { describe, it, expect } from 'vitest'
import { MIN_TOUCH_TARGET, resolveHitSlop } from '../src/primitives/touchTarget'

describe('minimum touch target', () => {
    it('clears the Apple HIG minimum', () => {
        expect(MIN_TOUCH_TARGET).toBeGreaterThanOrEqual(44)
    })

    it('adds no slop when the control already complies', () => {
        expect(resolveHitSlop(120, 48)).toBeUndefined()
        expect(resolveHitSlop(44, 44)).toBeUndefined()
    })

    it('expands an xs Tag (20pt tall) to a compliant target', () => {
        const slop = resolveHitSlop(60, 20)
        expect(slop).toBeDefined()
        expect(20 + slop!.top + slop!.bottom).toBe(MIN_TOUCH_TARGET)
        // Already wide enough, so no horizontal slop.
        expect(slop!.left).toBe(0)
    })

    it('expands both axes for a small square control', () => {
        const slop = resolveHitSlop(24, 24)!
        expect(24 + slop.left + slop.right).toBe(MIN_TOUCH_TARGET)
        expect(24 + slop.top + slop.bottom).toBe(MIN_TOUCH_TARGET)
    })

    it('can be opted out of with 0', () => {
        expect(resolveHitSlop(10, 10, 0)).toBeUndefined()
    })

    it('never returns negative slop for oversized controls', () => {
        expect(resolveHitSlop(400, 200)).toBeUndefined()
    })
})
