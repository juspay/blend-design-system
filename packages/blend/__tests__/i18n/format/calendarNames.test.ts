import { beforeEach, describe, expect, it } from 'vitest'
import {
    getMonthNames,
    getWeekdayNames,
    resetCalendarNameCache,
} from '../../../lib/i18n/format/calendarNames'
import { resetFormatterCache } from '../../../lib/i18n/format/formatterCache'

describe('calendarNames', () => {
    beforeEach(() => {
        resetCalendarNameCache()
        resetFormatterCache()
    })

    describe('getMonthNames', () => {
        it('returns twelve months starting at January', () => {
            const months = getMonthNames('en-US')
            expect(months).toHaveLength(12)
            expect(months[0]).toBe('January')
            expect(months[11]).toBe('December')
        })

        it('localizes', () => {
            expect(getMonthNames('fr-FR')[0]).toBe('janvier')
        })

        it('honours the short width', () => {
            expect(getMonthNames('en-US', 'short')[0]).toBe('Jan')
        })

        it('does not let index 0 bleed into the previous year', () => {
            // Without timeZone: 'UTC' in the preset, a machine west of UTC
            // formats month index 0 as December.
            const months = getMonthNames('en-US')
            expect(months[0]).not.toBe(months[11])
        })
    })

    describe('getWeekdayNames', () => {
        it('returns seven days', () => {
            expect(getWeekdayNames('en-US')).toHaveLength(7)
        })

        it('rotates to the requested first day', () => {
            expect(getWeekdayNames('en-US', 'short', 0)[0]).toBe('Sun')
            expect(getWeekdayNames('en-US', 'short', 1)[0]).toBe('Mon')
            expect(getWeekdayNames('en-US', 'short', 6)[0]).toBe('Sat')
        })

        it('defaults to Monday', () => {
            expect(getWeekdayNames('en-US', 'short')[0]).toBe('Mon')
        })

        it('keeps the week contiguous after rotating', () => {
            const sundayFirst = getWeekdayNames('en-US', 'short', 0)
            const mondayFirst = getWeekdayNames('en-US', 'short', 1)
            expect(mondayFirst[6]).toBe(sundayFirst[0])
        })

        it('localizes', () => {
            expect(getWeekdayNames('fr-FR', 'short', 1)[0]).toMatch(/lun/)
        })
    })

    describe('shared arrays are immutable', () => {
        it('freezes the result so one caller cannot poison another', () => {
            const months = getMonthNames('en-US')
            expect(Object.isFrozen(months)).toBe(true)
            expect(() => {
                ;(months as string[]).reverse()
            }).toThrow()
            expect(getMonthNames('en-US')[0]).toBe('January')
        })
    })
})
