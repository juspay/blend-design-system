import { describe, it, expect } from 'vitest'
import {
    MIN_TOUCH_TARGET,
    resolveHitSlop,
    sameHitSlop,
} from '../src/primitives/touchTarget'

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

describe('sameHitSlop', () => {
    // Backs the optimisation that keeps a compliant control from re-rendering:
    // `Pressable` stores the resolved slop, not the measured box, and skips the
    // state update when a re-measure yields the same result. A control that
    // never needs slop resolves to `undefined` — identical to the initial
    // state — so it never renders twice.
    it('treats two undefined slops as equal', () => {
        expect(sameHitSlop(undefined, undefined)).toBe(true)
    })

    it('treats a compliant re-measure as unchanged', () => {
        const first = resolveHitSlop(120, 48)
        const second = resolveHitSlop(130, 48)
        expect(first).toBeUndefined()
        expect(second).toBeUndefined()
        expect(sameHitSlop(first, second)).toBe(true)
    })

    it('treats identical slop values as equal', () => {
        expect(
            sameHitSlop(resolveHitSlop(24, 24), resolveHitSlop(24, 24))
        ).toBe(true)
    })

    it('detects a genuine change', () => {
        expect(
            sameHitSlop(resolveHitSlop(24, 24), resolveHitSlop(10, 10))
        ).toBe(false)
    })

    it('detects appearing and disappearing slop', () => {
        expect(sameHitSlop(undefined, resolveHitSlop(20, 20))).toBe(false)
        expect(sameHitSlop(resolveHitSlop(20, 20), undefined)).toBe(false)
    })
})
