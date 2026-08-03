import { describe, it, expect } from 'vitest'
import {
    generateTimeSlots,
    secondsToTimeValue,
} from '../../../../lib/components/shared/datetime/timeCore'

/**
 * The fail-closed guards in `timeCore`. Both exist because the values they
 * defend against arrive from public props (`minTime`, `maxTime`, `minuteStep`)
 * and neither failure mode is visible in the happy path: a non-finite second
 * count serialises as `"NaN"` into consumer form state, and a non-finite hour
 * bound makes `generateTimeSlots`' outer loop allocate until the tab dies.
 */
describe('timeCore hardening', () => {
    const MIDNIGHT = { hours: 0, minutes: 0, seconds: 0 }

    it('fails secondsToTimeValue closed to midnight for non-finite input', () => {
        expect(secondsToTimeValue(Number.NaN)).toEqual(MIDNIGHT)
        expect(secondsToTimeValue(Number.POSITIVE_INFINITY)).toEqual(MIDNIGHT)
        expect(secondsToTimeValue(Number.NEGATIVE_INFINITY)).toEqual(MIDNIGHT)
    })

    it('terminates generateTimeSlots on non-finite bounds', () => {
        const infinite = generateTimeSlots({
            minTime: {
                hours: Number.POSITIVE_INFINITY,
                minutes: 0,
                seconds: 0,
            },
            maxTime: {
                hours: Number.POSITIVE_INFINITY,
                minutes: 59,
                seconds: 0,
            },
        })
        const notANumber = generateTimeSlots({
            minTime: { hours: Number.NaN, minutes: Number.NaN, seconds: 0 },
            maxTime: { hours: Number.NaN, minutes: Number.NaN, seconds: 0 },
        })

        for (const slots of [infinite, notANumber]) {
            expect(slots).toHaveLength(96)
            expect(slots[0]).toEqual(MIDNIGHT)
            expect(slots[95]).toEqual({ hours: 23, minutes: 45, seconds: 0 })
        }
    })

    it('clamps finite out-of-day bounds back into the day', () => {
        const slots = generateTimeSlots({
            minTime: { hours: -5, minutes: -10, seconds: 0 },
            maxTime: { hours: 99, minutes: 99, seconds: 0 },
        })

        expect(slots).toHaveLength(96)
        expect(slots[0]).toEqual(MIDNIGHT)
        expect(slots[95]).toEqual({ hours: 23, minutes: 45, seconds: 0 })
    })
})
