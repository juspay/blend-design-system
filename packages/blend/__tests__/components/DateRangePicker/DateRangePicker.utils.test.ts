import { describe, expect, it, vi } from 'vitest'
import {
    isControlledDateRange,
    detectPresetFromRange,
    processCustomPresets,
    getPresetLabelWithCustom,
    handleCalendarDateClick,
    handleCustomRangeCalendarDateClick,
} from '../../../lib/components/DateRangePicker/utils'
import { DateRangePreset } from '../../../lib/components/DateRangePicker/types'
import type {
    CustomPresetConfig,
    CustomPresetDefinition,
    DateRange,
} from '../../../lib/components/DateRangePicker/types'

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

    it('maxRangeDays blocks clicks beyond start + maxRangeDays when range is half-selected', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        const maxRangeDays = 7

        // within window — allowed
        const within = new Date('2026-06-17') // 7 days away (== maxRangeDays, allowed)
        expect(
            handleCalendarDateClick(
                within,
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
        ).not.toBeNull()

        // beyond window — blocked
        const beyond = new Date('2026-06-19') // 9 days away
        expect(
            handleCalendarDateClick(
                beyond,
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

    it('maxRangeDays blocks clicks beyond start + maxRangeDays when half-selected', () => {
        const start = new Date('2026-06-10')
        const selectedRange: DateRange = { startDate: start }
        const beyond = new Date('2026-06-25') // 15 days away

        expect(
            handleCustomRangeCalendarDateClick(
                beyond,
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
        ).toBeNull()
    })
})
