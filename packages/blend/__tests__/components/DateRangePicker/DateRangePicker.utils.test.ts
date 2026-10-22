import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
    isControlledDateRange,
    detectPresetFromRange,
    getPresetDateRange,
    getFilteredPresets,
    processCustomPresets,
    getPresetLabelWithCustom,
    handleCalendarDateClick,
    handleEnhancedCalendarDateClick,
    handleCustomRangeCalendarDateClick,
    calculateDayCellProps,
    getDateCellStates,
} from '../../../lib/components/DateRangePicker/utils'
import { DateRangePreset } from '../../../lib/components/DateRangePicker/types'
import type {
    CustomPresetConfig,
    CustomPresetDefinition,
    DateRange,
} from '../../../lib/components/DateRangePicker/types'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { Theme } from '../../../lib/context/theme.enum'
import { getCalendarToken } from '../../../lib/components/DateRangePicker/dateRangePicker.tokens'

describe('calculateDayCellProps theme styling', () => {
    const lightTokens = getCalendarToken(FOUNDATION_THEME, Theme.LIGHT).sm
    const darkTokens = getCalendarToken(FOUNDATION_THEME, Theme.DARK).sm
    const today = new Date(2026, 5, 15)
    const selectedRange = {
        startDate: new Date(2026, 5, 10),
        endDate: new Date(2026, 5, 20),
    }

    it('uses the selected-range state colors from the active theme', () => {
        const start = calculateDayCellProps(
            selectedRange.startDate,
            selectedRange,
            today,
            false,
            false,
            darkTokens
        )
        const inRange = calculateDayCellProps(
            new Date(2026, 5, 15),
            selectedRange,
            today,
            false,
            false,
            darkTokens
        )
        const end = calculateDayCellProps(
            selectedRange.endDate,
            selectedRange,
            today,
            false,
            false,
            darkTokens
        )

        expect(start.styles.backgroundColor).toBe(
            darkTokens.calendar.calendarGrid.day.states.startDate
                .backgroundColor
        )
        expect(inRange.styles.backgroundColor).toBe(
            darkTokens.calendar.calendarGrid.day.states.rangeDay.backgroundColor
        )
        expect(end.styles.backgroundColor).toBe(
            darkTokens.calendar.calendarGrid.day.states.endDate.backgroundColor
        )
    })

    it('uses themed disabled and today text colors', () => {
        const disabled = calculateDayCellProps(
            new Date(2026, 5, 10),
            undefined,
            today,
            false,
            true,
            darkTokens
        )
        const todayCell = calculateDayCellProps(
            today,
            undefined,
            today,
            false,
            false,
            darkTokens
        )

        expect(disabled.textColor).toBe(
            darkTokens.calendar.calendarGrid.day.text.disabledDate.color
        )
        expect(todayCell.textColor).toBe(
            darkTokens.calendar.calendarGrid.day.text.todayDay.color
        )
        expect(todayCell.showTodayIndicator).toBe(true)
        expect(todayCell.textColor).not.toBe(
            lightTokens.calendar.calendarGrid.day.text.todayDay.color
        )
    })
})

describe('isControlledDateRange', () => {
    it('returns false for null, undefined, and empty objects', () => {
        expect(isControlledDateRange(undefined)).toBe(false)
        expect(isControlledDateRange(null)).toBe(false)
        expect(isControlledDateRange({} as { startDate: Date })).toBe(false)
    })

    it('returns false when startDate is missing or invalid', () => {
        expect(
            isControlledDateRange({
                endDate: new Date('2024-06-01'),
            } as unknown as { startDate: Date })
        ).toBe(false)
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

describe('detectPresetFromRange - custom presets', () => {
    // Pin the clock to mid-month. matchesThisMonthPreset compares the range
    // start against the 1st of the month with a 25-hour tolerance, so when
    // these tests run on the 1st/2nd of a real month, ranges like
    // "two hours ago to now" would falsely match THIS_MONTH.
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date(2026, 5, 15, 12, 0, 0))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    // Helper: build presetConfigs from a CustomPresetDefinition so that the
    // definition is registered in the module-level customPresetDefinitions Map
    // (processCustomPresets has the side effect of populating that Map).
    const buildConfigs = (
        definitions: CustomPresetDefinition[]
    ): CustomPresetConfig[] => {
        return processCustomPresets(definitions)
    }

    it('returns CUSTOM for a non-built-in range when no presetConfigs are given', () => {
        const now = new Date()
        const range = {
            startDate: new Date(now.getTime() - 2 * 60 * 60 * 1000),
            endDate: now,
        }
        expect(detectPresetFromRange(range)).toBe(DateRangePreset.CUSTOM)
    })

    it('returns the custom preset id when the range matches a custom definition', () => {
        const now = new Date()
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
        const last2Hours: CustomPresetDefinition = {
            id: 'last2Hours',
            label: 'Last 2 Hours',
            getDateRange: () => ({ startDate: twoHoursAgo, endDate: now }),
        }
        const presetConfigs = buildConfigs([last2Hours])

        const range = { startDate: twoHoursAgo, endDate: now }
        expect(detectPresetFromRange(range, undefined, presetConfigs)).toBe(
            'last2Hours' as DateRangePreset
        )
    })

    it('matches a custom preset within the tolerance window', () => {
        const now = new Date()
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
        const last2Hours: CustomPresetDefinition = {
            id: 'last2Hours',
            label: 'Last 2 Hours',
            getDateRange: () => ({ startDate: twoHoursAgo, endDate: now }),
        }
        const presetConfigs = buildConfigs([last2Hours])

        // Off by 30 seconds (within the 1-minute tolerance)
        const range = {
            startDate: new Date(twoHoursAgo.getTime() + 30 * 1000),
            endDate: new Date(now.getTime() - 30 * 1000),
        }
        expect(detectPresetFromRange(range, undefined, presetConfigs)).toBe(
            'last2Hours' as DateRangePreset
        )
    })

    it('does not match a custom preset outside the tolerance window', () => {
        const now = new Date()
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
        const last2Hours: CustomPresetDefinition = {
            id: 'last2Hours',
            label: 'Last 2 Hours',
            getDateRange: () => ({ startDate: twoHoursAgo, endDate: now }),
        }
        const presetConfigs = buildConfigs([last2Hours])

        // Off by 2 minutes (outside the 1-minute tolerance)
        const range = {
            startDate: new Date(twoHoursAgo.getTime() + 2 * 60 * 1000),
            endDate: now,
        }
        expect(detectPresetFromRange(range, undefined, presetConfigs)).toBe(
            DateRangePreset.CUSTOM
        )
    })

    it('still detects built-in presets even when presetConfigs are provided', () => {
        const now = new Date()
        const thirtyMinsAgo = new Date(now.getTime() - 30 * 60 * 1000)
        const last2Hours: CustomPresetDefinition = {
            id: 'last2Hours',
            label: 'Last 2 Hours',
            getDateRange: () => ({
                startDate: new Date(now.getTime() - 2 * 60 * 60 * 1000),
                endDate: now,
            }),
        }
        const presetConfigs = buildConfigs([last2Hours])

        const range = { startDate: thirtyMinsAgo, endDate: now }
        expect(detectPresetFromRange(range, undefined, presetConfigs)).toBe(
            DateRangePreset.LAST_30_MINUTES
        )
    })

    it('skips custom definitions whose getDateRange returns no endDate', () => {
        const now = new Date()
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
        const singleDay: CustomPresetDefinition = {
            id: 'singleDay',
            label: 'Single Day',
            // Returns a range with no endDate — should not match a full range.
            getDateRange: () => ({ startDate: twoHoursAgo }),
        }
        const presetConfigs = buildConfigs([singleDay])

        const range = { startDate: twoHoursAgo, endDate: now }
        expect(detectPresetFromRange(range, undefined, presetConfigs)).toBe(
            DateRangePreset.CUSTOM
        )
    })
})

describe('detectPresetFromRange - month-span and Tomorrow regressions (#1733, #1792)', () => {
    // Mid-month so none of these collide with the "sub-day range on the
    // 1st" case covered separately below.
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date(2026, 5, 15, 12, 0, 0))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    const roundTripPresets = [
        DateRangePreset.TODAY,
        DateRangePreset.YESTERDAY,
        DateRangePreset.TOMORROW,
        DateRangePreset.LAST_30_MINUTES,
        DateRangePreset.LAST_1_HOUR,
        DateRangePreset.LAST_6_HOURS,
        DateRangePreset.LAST_24_HOURS,
        DateRangePreset.LAST_7_DAYS,
        DateRangePreset.LAST_30_DAYS,
        DateRangePreset.THIS_MONTH,
        DateRangePreset.LAST_MONTH,
        DateRangePreset.LAST_3_MONTHS,
        DateRangePreset.LAST_12_MONTHS,
        DateRangePreset.NEXT_7_DAYS,
        DateRangePreset.NEXT_30_DAYS,
        DateRangePreset.NEXT_3_MONTHS,
        DateRangePreset.NEXT_12_MONTHS,
    ]

    it.each(roundTripPresets)(
        'detects %s from the range getPresetDateRange itself builds',
        (preset) => {
            const range = getPresetDateRange(preset)
            expect(detectPresetFromRange(range)).toBe(preset)
        }
    )

    it('does not label an arbitrary ~90-day span as Last 3 months unless it actually starts 3 months ago (#1733)', () => {
        const now = new Date()
        // 90 days ago lands ~2.5 days short of the real "3 calendar months
        // ago" anchor (March 15 vs March 17-ish) — well outside the 25-hour
        // tolerance, so the anchored check must reject it even though the
        // old `Math.round(daysDiff / 30) === 3` heuristic accepted anything
        // in the 75-104 day range.
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        const range = { startDate: ninetyDaysAgo, endDate: now }

        expect(detectPresetFromRange(range)).not.toBe(
            DateRangePreset.LAST_3_MONTHS
        )
    })

    it('does not label an arbitrary ~12-month span as Last 12 months unless it actually starts 12 months ago', () => {
        const now = new Date()
        const threeHundredDaysAgo = new Date(
            now.getTime() - 300 * 24 * 60 * 60 * 1000
        )
        const range = { startDate: threeHundredDaysAgo, endDate: now }

        expect(detectPresetFromRange(range)).not.toBe(
            DateRangePreset.LAST_12_MONTHS
        )
    })
})

describe('detectPresetFromRange - sub-day ranges on the 1st of the month (#1743)', () => {
    // Pinned to the 1st, mid-afternoon — exactly the window
    // matchesThisMonthPreset's 25-hour start-of-month tolerance used to
    // swallow before the time-based checks ran first.
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date(2026, 5, 1, 14, 0, 0))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('still detects Last 30 minutes on the 1st instead of This month', () => {
        const range = getPresetDateRange(DateRangePreset.LAST_30_MINUTES)
        expect(detectPresetFromRange(range)).toBe(
            DateRangePreset.LAST_30_MINUTES
        )
    })

    it('still detects Last 1 hour on the 1st instead of This month', () => {
        const range = getPresetDateRange(DateRangePreset.LAST_1_HOUR)
        expect(detectPresetFromRange(range)).toBe(DateRangePreset.LAST_1_HOUR)
    })

    it('still detects Last 24 hours on the 1st instead of This month', () => {
        const range = getPresetDateRange(DateRangePreset.LAST_24_HOURS)
        expect(detectPresetFromRange(range)).toBe(DateRangePreset.LAST_24_HOURS)
    })

    // Not pinned to the 1st: on the 1st, THIS_MONTH's own range (1st@00:00
    // → now) is byte-identical to TODAY's, so TODAY winning that specific
    // tie is correct, pre-existing behaviour — not something this fix
    // changes. A few days in, the two are distinguishable again.
    it('still detects a genuine multi-day This month range correctly', () => {
        vi.setSystemTime(new Date(2026, 5, 3, 14, 0, 0))
        const range = getPresetDateRange(DateRangePreset.THIS_MONTH)
        expect(detectPresetFromRange(range)).toBe(DateRangePreset.THIS_MONTH)
    })
})

describe('getPresetLabelWithCustom', () => {
    it('returns the custom label when a matching custom config exists', () => {
        const last2Hours: CustomPresetDefinition = {
            id: 'last2Hours',
            label: 'Last 2 Hours',
            getDateRange: () => ({
                startDate: new Date(),
                endDate: new Date(),
            }),
        }
        const presetConfigs = processCustomPresets([last2Hours])

        expect(
            getPresetLabelWithCustom(
                'last2Hours' as DateRangePreset,
                presetConfigs
            )
        ).toBe('Last 2 Hours')
    })

    it('falls back to the built-in label when no custom config matches', () => {
        expect(getPresetLabelWithCustom(DateRangePreset.LAST_7_DAYS)).toBe(
            'Last 7 days'
        )
    })
})

describe('handleCalendarDateClick - minDate/maxDate/customDisableDates/maxRangeDays guards', () => {
    const today = new Date('2026-06-15T12:00:00')

    it('blocks clicks before minDate and allows clicks on/after minDate', () => {
        const minDate = new Date('2026-06-10')
        const before = new Date('2026-06-09')
        const on = new Date('2026-06-10')
        const after = new Date('2026-06-11')

        expect(
            handleCalendarDateClick(
                before,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                minDate
            )
        ).toBeNull()

        expect(
            handleCalendarDateClick(
                on,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                minDate
            )
        ).not.toBeNull()

        expect(
            handleCalendarDateClick(
                after,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                minDate
            )
        ).not.toBeNull()
    })

    it('blocks clicks after maxDate and allows clicks on/before maxDate', () => {
        const maxDate = new Date('2026-06-20')
        const before = new Date('2026-06-19')
        const on = new Date('2026-06-20')
        const after = new Date('2026-06-21')

        expect(
            handleCalendarDateClick(
                before,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                maxDate
            )
        ).not.toBeNull()

        expect(
            handleCalendarDateClick(
                on,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                maxDate
            )
        ).not.toBeNull()

        expect(
            handleCalendarDateClick(
                after,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                maxDate
            )
        ).toBeNull()
    })

    it('blocks clicks when customDisableDates returns true', () => {
        const disableSundays = (d: Date) => d.getDay() === 0
        const sunday = new Date('2026-06-21') // Sunday
        const monday = new Date('2026-06-22') // Monday

        expect(
            handleCalendarDateClick(
                sunday,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                undefined,
                disableSundays
            )
        ).toBeNull()

        expect(
            handleCalendarDateClick(
                monday,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                undefined,
                disableSundays
            )
        ).not.toBeNull()
    })

    it('passes the current selectedRange as the second arg to customDisableDates', () => {
        const spy = vi.fn(() => false)
        const range: DateRange = {
            startDate: new Date('2026-06-10'),
            endDate: new Date('2026-06-12'),
        }
        const clicked = new Date('2026-06-11')

        handleCalendarDateClick(
            clicked,
            false,
            today,
            false,
            false,
            false,
            undefined,
            range,
            false,
            undefined,
            undefined,
            spy
        )

        expect(spy).toHaveBeenCalledWith(clicked, range)
    })

    it('maxRangeDays counts calendar days inclusive of the start (#1737)', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        const maxRangeDays = 7

        const clickAt = (d: Date) =>
            handleCalendarDateClick(
                d,
                false,
                today,
                false,
                false,
                false,
                undefined,
                selectedRange,
                false,
                undefined,
                undefined,
                undefined,
                maxRangeDays
            )

        // 7 calendar days = start + 6 days is the furthest allowed end.
        expect(clickAt(new Date('2026-06-16'))).not.toBeNull() // diffDays 6
        // The off-by-one: diffDays === maxRangeDays is now blocked (was the
        // 8th day before the fix).
        expect(clickAt(new Date('2026-06-17'))).toBeNull() // diffDays 7
        expect(clickAt(new Date('2026-06-19'))).toBeNull() // diffDays 9
    })

    it('maxRangeDays={1} caps the range to a single day (#1737)', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        const clickAt = (d: Date) =>
            handleCalendarDateClick(
                d,
                false,
                today,
                false,
                false,
                false,
                undefined,
                selectedRange,
                false,
                undefined,
                undefined,
                undefined,
                1
            )

        expect(clickAt(new Date('2026-06-10'))).not.toBeNull() // same day
        expect(clickAt(new Date('2026-06-11'))).toBeNull() // next day blocked
    })

    it('maxRangeDays={0} is honoured rather than read as "no cap" (#1737)', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        // 0 is falsy; the old `if (maxRangeDays && …)` guard silently treated
        // it as "no cap". It must now block even the start day as an end.
        expect(
            handleCalendarDateClick(
                new Date('2026-06-10'),
                false,
                today,
                false,
                false,
                false,
                undefined,
                selectedRange,
                false,
                undefined,
                undefined,
                undefined,
                0
            )
        ).toBeNull()
    })

    it('maxRangeDays is inactive when no start date is selected yet', () => {
        const clicked = new Date('2026-06-25')
        // No selectedRange — even a far-future click should not be blocked by maxRangeDays
        expect(
            handleCalendarDateClick(
                clicked,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                undefined,
                undefined,
                7
            )
        ).not.toBeNull()
    })

    it('minDate with a time component does not disable same-day clicks', () => {
        // minDate at noon on June 10; a midnight click on June 10 must still be allowed
        const minDate = new Date('2026-06-10T12:00:00')
        const sameDay = new Date('2026-06-10T00:00:00')

        expect(
            handleCalendarDateClick(
                sameDay,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                minDate
            )
        ).not.toBeNull()
    })

    it('maxDate with a time component does not disable same-day clicks', () => {
        // maxDate at midnight on June 20; a noon click on June 20 must still be allowed
        const maxDate = new Date('2026-06-20T00:00:00')
        const sameDay = new Date('2026-06-20T12:00:00')

        expect(
            handleCalendarDateClick(
                sameDay,
                false,
                today,
                false,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                maxDate
            )
        ).not.toBeNull()
    })
})

describe('handleCustomRangeCalendarDateClick - minDate/maxDate/customDisableDates guards', () => {
    const today = new Date('2026-06-15T12:00:00')

    it('blocks clicks before minDate even with custom range config absent', () => {
        const minDate = new Date('2026-06-10')
        const before = new Date('2026-06-09')
        const on = new Date('2026-06-10')

        expect(
            handleCustomRangeCalendarDateClick(
                before,
                false,
                today,
                false,
                false,
                undefined,
                false,
                undefined,
                undefined,
                false,
                minDate
            )
        ).toBeNull()

        expect(
            handleCustomRangeCalendarDateClick(
                on,
                false,
                today,
                false,
                false,
                undefined,
                false,
                undefined,
                undefined,
                false,
                minDate
            )
        ).not.toBeNull()
    })

    it('blocks clicks when customDisableDates returns true', () => {
        const disableSundays = (d: Date) => d.getDay() === 0
        const sunday = new Date('2026-06-21')

        expect(
            handleCustomRangeCalendarDateClick(
                sunday,
                false,
                today,
                false,
                false,
                undefined,
                false,
                undefined,
                undefined,
                false,
                undefined,
                undefined,
                disableSundays
            )
        ).toBeNull()
    })

    it('maxRangeDays counts calendar days inclusive of the start (#1737)', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        const clickAt = (d: Date) =>
            handleCustomRangeCalendarDateClick(
                d,
                false,
                today,
                false,
                false,
                undefined,
                false,
                undefined,
                selectedRange,
                false,
                undefined,
                undefined,
                undefined,
                7
            )

        expect(clickAt(new Date('2026-06-16'))).not.toBeNull() // diffDays 6
        expect(clickAt(new Date('2026-06-17'))).toBeNull() // diffDays 7
        expect(clickAt(new Date('2026-06-25'))).toBeNull() // diffDays 15
    })
})

describe('getDateCellStates - maxRangeDays cell disabling (#1737)', () => {
    const today = new Date('2026-06-15')

    it('disables the cell at diffDays === maxRangeDays, matching the click guard', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        const cellStates = (d: Date) =>
            getDateCellStates(
                d,
                selectedRange,
                today,
                false,
                false,
                undefined,
                undefined,
                false,
                undefined,
                undefined,
                7
            )

        expect(cellStates(new Date('2026-06-16')).isDisabled).toBe(false) // diffDays 6
        expect(cellStates(new Date('2026-06-17')).isDisabled).toBe(true) // diffDays 7
    })
})

describe('disablePastDates does not disable today itself (#1789, #1790)', () => {
    // The bug: `today` is frequently "now" rather than midnight (e.g.
    // getTodayInTimezone's no-timezone path doesn't truncate), while a
    // clicked/rendered calendar cell for today is midnight. Comparing those
    // two raw made `clickedDate < today` true for today's own cell, so it
    // read as a past date and got disabled. `now` here deliberately is not
    // midnight, to reproduce exactly that mismatch.
    const now = new Date('2026-06-15T14:30:00')
    const todayCell = new Date(2026, 5, 15) // today's calendar cell, midnight
    const yesterdayCell = new Date(2026, 5, 14)

    it('handleCalendarDateClick: today is clickable with disablePastDates on', () => {
        expect(
            handleCalendarDateClick(
                todayCell,
                false,
                now,
                false,
                true // disablePastDates
            )
        ).not.toBeNull()
    })

    it('handleCalendarDateClick: yesterday is still blocked with disablePastDates on', () => {
        expect(
            handleCalendarDateClick(yesterdayCell, false, now, false, true)
        ).toBeNull()
    })

    it('handleEnhancedCalendarDateClick: today is clickable with disablePastDates on', () => {
        const selectedRange: DateRange = { startDate: todayCell }
        expect(
            handleEnhancedCalendarDateClick(
                todayCell,
                selectedRange,
                true,
                now,
                false,
                true
            )
        ).not.toBeNull()
    })

    it('handleCustomRangeCalendarDateClick: today is clickable with disablePastDates on', () => {
        expect(
            handleCustomRangeCalendarDateClick(
                todayCell,
                false,
                now,
                false,
                true
            )
        ).not.toBeNull()
    })

    it('getDateCellStates: today is not disabled with disablePastDates on', () => {
        const states = getDateCellStates(todayCell, undefined, now, false, true)
        expect(states.isDisabled).toBe(false)
    })

    it('getDateCellStates: yesterday is still disabled with disablePastDates on', () => {
        const states = getDateCellStates(
            yesterdayCell,
            undefined,
            now,
            false,
            true
        )
        expect(states.isDisabled).toBe(true)
    })

    it('#1790: the Today preset range never renders as disabled under disablePastDates', () => {
        // getPresetDateRange(TODAY) returns 00:00 today -> now — the exact
        // shape that used to trip the #1789 comparison bug. Confirms the
        // preset's own output is fully consistent with the grid's own
        // disabling rule, not just an arbitrary clicked cell.
        const range = getPresetDateRange(DateRangePreset.TODAY)
        const startStates = getDateCellStates(
            range.startDate,
            range,
            now,
            false,
            true
        )
        expect(startStates.isDisabled).toBe(false)
    })

    it('#1790: the Today preset stays available in the preset list under disablePastDates', () => {
        // Deliberately not added to getFilteredPresets' pastPresets list —
        // today is not a past date, so hiding the preset would be removing
        // a perfectly valid option rather than fixing anything.
        const configs: CustomPresetConfig[] = [
            { preset: DateRangePreset.TODAY },
            { preset: DateRangePreset.YESTERDAY },
        ]
        const visible = getFilteredPresets(configs, false, true)
        expect(visible).toContain(DateRangePreset.TODAY)
        expect(visible).not.toContain(DateRangePreset.YESTERDAY)
    })
})
