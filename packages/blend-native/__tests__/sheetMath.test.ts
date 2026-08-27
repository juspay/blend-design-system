import { describe, it, expect } from 'vitest'
import {
    clampSheetDrag,
    resolveSheetDrag,
    resolveSheetMaxHeight,
    shouldDismissSheet,
    shouldSheetConsumeDrag,
    SHEET_DISMISS_FRACTION,
    SHEET_DISMISS_VELOCITY,
} from '../src/overlay/sheet/sheetMath'

const HEIGHT = 400

describe('clampSheetDrag', () => {
    it('follows downward drag and pins upward drag', () => {
        expect(clampSheetDrag(120)).toBe(120)
        expect(clampSheetDrag(0)).toBe(0)
        expect(clampSheetDrag(-80)).toBe(0)
    })
})

describe('shouldDismissSheet', () => {
    it('dismisses past the distance threshold', () => {
        const threshold = HEIGHT * SHEET_DISMISS_FRACTION
        expect(shouldDismissSheet(threshold, 0, HEIGHT)).toBe(true)
        expect(shouldDismissSheet(threshold - 1, 0, HEIGHT)).toBe(false)
    })

    it('dismisses on a downward fling regardless of distance', () => {
        expect(shouldDismissSheet(10, SHEET_DISMISS_VELOCITY, HEIGHT)).toBe(
            true
        )
        expect(shouldDismissSheet(10, SHEET_DISMISS_VELOCITY - 1, HEIGHT)).toBe(
            false
        )
    })

    it('a downward fling that never moved down does not dismiss', () => {
        expect(shouldDismissSheet(0, SHEET_DISMISS_VELOCITY, HEIGHT)).toBe(
            false
        )
    })

    it('an upward fling rescues even a past-threshold drag', () => {
        expect(
            shouldDismissSheet(HEIGHT * 0.5, -SHEET_DISMISS_VELOCITY, HEIGHT)
        ).toBe(false)
    })

    it('an unmeasured sheet never dismisses by distance', () => {
        expect(shouldDismissSheet(500, 0, 0)).toBe(false)
    })
})

describe('shouldSheetConsumeDrag', () => {
    it('consumes a downward drag while the list is at its top', () => {
        expect(shouldSheetConsumeDrag(0, 10)).toBe(true)
    })

    it('consumes when the list has bounced past its top (iOS overscroll)', () => {
        expect(shouldSheetConsumeDrag(-12, 10)).toBe(true)
    })

    it('lets a mid-scroll list keep the drag', () => {
        expect(shouldSheetConsumeDrag(120, 10)).toBe(false)
    })

    it('never consumes an upward drag', () => {
        expect(shouldSheetConsumeDrag(0, -10)).toBe(false)
        expect(shouldSheetConsumeDrag(0, 0)).toBe(false)
    })

    it('defaults to consuming when no scrollable is registered (offset 0)', () => {
        expect(shouldSheetConsumeDrag(0, 1)).toBe(true)
    })
})

describe('resolveSheetDrag', () => {
    it('follows the finger from the captured translation', () => {
        expect(resolveSheetDrag(100, 40)).toBe(60)
    })

    it('starts at zero at the instant of capture — no jump', () => {
        expect(resolveSheetDrag(40, 40)).toBe(0)
    })

    it('pins at zero when the finger moves back above the capture point', () => {
        expect(resolveSheetDrag(10, 40)).toBe(0)
    })

    it('matches clampSheetDrag for an immediate consume (capture 0)', () => {
        expect(resolveSheetDrag(35, 0)).toBe(clampSheetDrag(35))
    })
})

describe('resolveSheetMaxHeight', () => {
    it('caps at the fraction of the window', () => {
        expect(resolveSheetMaxHeight(800)).toBe(720)
        expect(resolveSheetMaxHeight(800, 0, 0.5)).toBe(400)
    })

    it('never intrudes into the top inset', () => {
        // 95% of 800 is 760, but only 800 - 59 = 741 is below the notch.
        expect(resolveSheetMaxHeight(800, 59, 0.95)).toBe(741)
    })

    it('never returns a negative height', () => {
        expect(resolveSheetMaxHeight(100, 200)).toBe(0)
    })
})
