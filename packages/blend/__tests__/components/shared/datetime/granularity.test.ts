import { describe, it, expect } from 'vitest'
import {
    startOfMonth,
    endOfMonth,
    startOfYear,
    startOfPeriod,
    normalizeRangeToPeriodStarts,
    nextMonthRange,
} from '../../../../lib/components/shared/datetime/granularity'
import type { DateRange } from '../../../../lib/components/DateRangePicker/types'

describe('granularity', () => {
    describe('endOfMonth', () => {
        it('rolls December into 31 December of the same year', () => {
            const result = endOfMonth(new Date(2025, 11, 15))
            expect(result).toEqual(new Date(2025, 11, 31))
        })

        it('resolves February to the 29th in a leap year', () => {
            const result = endOfMonth(new Date(2024, 1, 10))
            expect(result).toEqual(new Date(2024, 1, 29))
        })

        it('resolves February to the 28th in a non-leap year', () => {
            const result = endOfMonth(new Date(2025, 1, 10))
            expect(result).toEqual(new Date(2025, 1, 28))
        })

        it('resolves a 30-day month correctly', () => {
            const result = endOfMonth(new Date(2025, 3, 5))
            expect(result).toEqual(new Date(2025, 3, 30))
        })
    })

    describe('startOfMonth / startOfYear', () => {
        it('startOfMonth returns local midnight on the 1st of the month', () => {
            const result = startOfMonth(new Date(2025, 8, 20, 14, 30, 15))
            expect(result).toEqual(new Date(2025, 8, 1))
            expect(result.getHours()).toBe(0)
            expect(result.getMinutes()).toBe(0)
            expect(result.getSeconds()).toBe(0)
            expect(result.getMilliseconds()).toBe(0)
        })

        it('startOfYear returns local midnight on 1 January', () => {
            const result = startOfYear(new Date(2025, 8, 20, 14, 30, 15))
            expect(result).toEqual(new Date(2025, 0, 1))
            expect(result.getHours()).toBe(0)
            expect(result.getMinutes()).toBe(0)
            expect(result.getSeconds()).toBe(0)
            expect(result.getMilliseconds()).toBe(0)
        })
    })

    describe('startOfPeriod', () => {
        it('returns the same Date reference, unchanged, for day granularity', () => {
            const date = new Date(2025, 8, 20, 14, 30)
            const result = startOfPeriod(date, 'day')
            expect(result).toBe(date)
        })

        it('collapses to the start of the month for month granularity', () => {
            const result = startOfPeriod(new Date(2025, 8, 20), 'month')
            expect(result).toEqual(new Date(2025, 8, 1))
        })

        it('collapses to the start of the year for year granularity', () => {
            const result = startOfPeriod(new Date(2025, 8, 20), 'year')
            expect(result).toEqual(new Date(2025, 0, 1))
        })
    })

    describe('normalizeRangeToPeriodStarts', () => {
        it('returns the range untouched for day granularity', () => {
            const range: DateRange = {
                startDate: new Date(2025, 8, 15),
                endDate: new Date(2025, 8, 20),
            }
            expect(normalizeRangeToPeriodStarts(range, 'day')).toBe(range)
        })

        it('returns undefined when the range is undefined', () => {
            expect(
                normalizeRangeToPeriodStarts(undefined, 'month')
            ).toBeUndefined()
        })

        it('collapses both ends onto their period starts for month granularity', () => {
            const range: DateRange = {
                startDate: new Date(2025, 8, 15),
                endDate: new Date(2025, 10, 20),
            }
            expect(normalizeRangeToPeriodStarts(range, 'month')).toEqual({
                startDate: new Date(2025, 8, 1),
                endDate: new Date(2025, 10, 1),
            })
        })

        it('collapses both ends onto their period starts for year granularity', () => {
            const range: DateRange = {
                startDate: new Date(2025, 8, 15),
                endDate: new Date(2027, 10, 20),
            }
            expect(normalizeRangeToPeriodStarts(range, 'year')).toEqual({
                startDate: new Date(2025, 0, 1),
                endDate: new Date(2027, 0, 1),
            })
        })

        it('handles a range with no endDate', () => {
            const range: DateRange = { startDate: new Date(2025, 8, 15) }
            expect(normalizeRangeToPeriodStarts(range, 'month')).toEqual({
                startDate: new Date(2025, 8, 1),
                endDate: undefined,
            })
        })
    })

    describe('nextMonthRange', () => {
        it('starts fresh when current is undefined', () => {
            const result = nextMonthRange(undefined, new Date(2025, 8, 15))
            expect(result).toEqual({ startDate: new Date(2025, 8, 1) })
        })

        it('starts fresh when current already has an endDate (complete range)', () => {
            const current: DateRange = {
                startDate: new Date(2025, 5, 1),
                endDate: new Date(2025, 6, 31),
            }
            const result = nextMonthRange(current, new Date(2025, 8, 15))
            expect(result).toEqual({ startDate: new Date(2025, 8, 1) })
        })

        it('closes the range when the picked month is later than the pending start', () => {
            const current: DateRange = { startDate: new Date(2025, 8, 1) }
            const result = nextMonthRange(current, new Date(2025, 10, 15))
            expect(result).toEqual({
                startDate: new Date(2025, 8, 1),
                endDate: new Date(2025, 10, 30),
            })
        })

        it('normalises a mid-month pending start when closing the range', () => {
            // A caller can seed `value` with a half-open, mid-month range;
            // closing against it must still commit a whole-month range.
            const current: DateRange = { startDate: new Date(2025, 8, 10) }
            const result = nextMonthRange(current, new Date(2025, 10, 15))
            expect(result).toEqual({
                startDate: new Date(2025, 8, 1),
                endDate: new Date(2025, 10, 30),
            })
        })

        it('restarts the range when the picked month is earlier than the pending start', () => {
            const current: DateRange = { startDate: new Date(2025, 8, 1) }
            const result = nextMonthRange(current, new Date(2025, 5, 15))
            expect(result).toEqual({ startDate: new Date(2025, 5, 1) })
        })

        it('closes the range onto the same month when picked twice', () => {
            const current: DateRange = { startDate: new Date(2025, 8, 1) }
            const result = nextMonthRange(current, new Date(2025, 8, 20))
            expect(result).toEqual({
                startDate: new Date(2025, 8, 1),
                endDate: new Date(2025, 8, 30),
            })
        })
    })

    describe('invalid Date input', () => {
        it('yields an invalid Date rather than throwing', () => {
            const invalid = new Date(NaN)

            expect(() => startOfMonth(invalid)).not.toThrow()
            expect(Number.isNaN(startOfMonth(invalid).getTime())).toBe(true)

            expect(() => endOfMonth(invalid)).not.toThrow()
            expect(Number.isNaN(endOfMonth(invalid).getTime())).toBe(true)

            expect(() => startOfYear(invalid)).not.toThrow()
            expect(Number.isNaN(startOfYear(invalid).getTime())).toBe(true)
        })
    })
})
