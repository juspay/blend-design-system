import { describe, expect, it } from 'vitest'
import {
    isControlledDateRange,
    detectPresetFromRange,
    processCustomPresets,
    getPresetLabelWithCustom,
} from '../../../lib/components/DateRangePicker/utils'
import { DateRangePreset } from '../../../lib/components/DateRangePicker/types'
import type {
    CustomPresetConfig,
    CustomPresetDefinition,
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
