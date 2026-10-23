import { describe, it, expect } from 'vitest'
import {
    clampDrawerDrag,
    closedOffset,
    shouldActivateDrawerPan,
    shouldDismissDrawer,
    DRAWER_DISMISS_FRACTION,
    DRAWER_DISMISS_VELOCITY,
    DRAWER_PAN_ACTIVATION_DISTANCE,
} from '../src/overlay/drawer/drawerMath'

const WIDTH = 280

describe('clampDrawerDrag', () => {
    it('a left drawer follows leftward drag and pins rightward drag', () => {
        expect(clampDrawerDrag(-120, 'left')).toBe(-120)
        expect(clampDrawerDrag(0, 'left')).toBe(0)
        expect(clampDrawerDrag(80, 'left')).toBe(0)
    })

    it('a right drawer follows rightward drag and pins leftward drag', () => {
        expect(clampDrawerDrag(120, 'right')).toBe(120)
        expect(clampDrawerDrag(0, 'right')).toBe(0)
        expect(clampDrawerDrag(-80, 'right')).toBe(0)
    })
})

describe('closedOffset', () => {
    it('sits off-screen past its own edge, signed by side', () => {
        expect(closedOffset(WIDTH, 'left')).toBe(-WIDTH)
        expect(closedOffset(WIDTH, 'right')).toBe(WIDTH)
    })
})

describe('shouldDismissDrawer — left drawer', () => {
    it('dismisses past the distance threshold', () => {
        const threshold = WIDTH * DRAWER_DISMISS_FRACTION
        expect(shouldDismissDrawer(-threshold, 0, WIDTH, 'left')).toBe(true)
        expect(shouldDismissDrawer(-(threshold - 1), 0, WIDTH, 'left')).toBe(
            false
        )
    })

    it('dismisses on a leftward (closing) fling regardless of distance', () => {
        expect(
            shouldDismissDrawer(-10, -DRAWER_DISMISS_VELOCITY, WIDTH, 'left')
        ).toBe(true)
        expect(
            shouldDismissDrawer(
                -10,
                -DRAWER_DISMISS_VELOCITY + 1,
                WIDTH,
                'left'
            )
        ).toBe(false)
    })

    it('a closing fling that never moved does not dismiss', () => {
        expect(
            shouldDismissDrawer(0, -DRAWER_DISMISS_VELOCITY, WIDTH, 'left')
        ).toBe(false)
    })

    it('an opening-direction fling rescues even a past-threshold drag', () => {
        expect(
            shouldDismissDrawer(
                -WIDTH * 0.5,
                DRAWER_DISMISS_VELOCITY,
                WIDTH,
                'left'
            )
        ).toBe(false)
    })

    it('an unmeasured drawer never dismisses by distance', () => {
        expect(shouldDismissDrawer(-500, 0, 0, 'left')).toBe(false)
    })
})

describe('shouldDismissDrawer — right drawer (mirrored sign)', () => {
    it('dismisses past the distance threshold', () => {
        const threshold = WIDTH * DRAWER_DISMISS_FRACTION
        expect(shouldDismissDrawer(threshold, 0, WIDTH, 'right')).toBe(true)
        expect(shouldDismissDrawer(threshold - 1, 0, WIDTH, 'right')).toBe(
            false
        )
    })

    it('dismisses on a rightward (closing) fling regardless of distance', () => {
        expect(
            shouldDismissDrawer(10, DRAWER_DISMISS_VELOCITY, WIDTH, 'right')
        ).toBe(true)
    })

    it('an opening-direction fling rescues even a past-threshold drag', () => {
        expect(
            shouldDismissDrawer(
                WIDTH * 0.5,
                -DRAWER_DISMISS_VELOCITY,
                WIDTH,
                'right'
            )
        ).toBe(false)
    })
})

describe('shouldActivateDrawerPan', () => {
    it('activates past the travel threshold in the closing direction', () => {
        expect(
            shouldActivateDrawerPan(
                -(DRAWER_PAN_ACTIVATION_DISTANCE + 1),
                'left'
            )
        ).toBe(true)
        expect(
            shouldActivateDrawerPan(DRAWER_PAN_ACTIVATION_DISTANCE + 1, 'right')
        ).toBe(true)
    })

    it('stays undetermined below the threshold — taps keep working', () => {
        expect(
            shouldActivateDrawerPan(-DRAWER_PAN_ACTIVATION_DISTANCE, 'left')
        ).toBe(false)
    })

    it('never activates on opening-direction travel', () => {
        expect(shouldActivateDrawerPan(40, 'left')).toBe(false)
        expect(shouldActivateDrawerPan(-40, 'right')).toBe(false)
    })
})
