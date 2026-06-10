import { describe, expect, it } from 'vitest'
import { isControlledDateRange } from '../../../lib/components/DateRangePicker/utils'

describe('isControlledDateRange', () => {
    it('returns false for null, undefined, and empty objects', () => {
        expect(isControlledDateRange(undefined)).toBe(false)
        expect(isControlledDateRange(null)).toBe(false)
        expect(isControlledDateRange({} as { startDate: Date })).toBe(false)
    })

    it('returns false when startDate is missing or invalid', () => {
        expect(isControlledDateRange({ endDate: new Date('2024-06-01') })).toBe(
            false
        )
        expect(
            isControlledDateRange({
                startDate: new Date('invalid'),
            })
        ).toBe(false)
        expect(
            isControlledDateRange({
                startDate: '2024-06-01' as unknown as Date,
            })
        ).toBe(false)
    })

    it('returns true when startDate is a valid Date', () => {
        const startDate = new Date('2024-06-01')
        expect(isControlledDateRange({ startDate })).toBe(true)
        expect(
            isControlledDateRange({
                startDate,
                endDate: new Date('2024-06-15'),
            })
        ).toBe(true)
    })
})
