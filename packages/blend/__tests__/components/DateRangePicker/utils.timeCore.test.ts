/**
 * Locks the behaviour of the DateRangePicker utils that were migrated onto
 * `shared/datetime/timeCore`. These assert the *previous* hand-rolled output
 * verbatim, so a future change to the shared core that would alter the mobile
 * wheel picker's slot list or the 12-hour range label fails here.
 */
import { describe, it, expect } from 'vitest'
import {
    formatTimeIn12Hour,
    generatePickerData,
    createSelectionHandler,
} from '../../../lib/components/DateRangePicker/utils'

/** The loop that lived in `generatePickerData` / `createSelectionHandler`. */
const legacyFifteenMinuteSlots = (): string[] => {
    const slots: string[] = []
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            slots.push(
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
            )
        }
    }
    return slots
}

describe('DateRangePicker utils — timeCore migration', () => {
    describe('15-minute slot generation', () => {
        it('generatePickerData emits the exact legacy slot list', () => {
            const range = {
                startDate: new Date(2024, 0, 15, 10, 30),
                endDate: new Date(2024, 0, 20, 18, 0),
            }
            const data = generatePickerData('start', range, '10:30', '18:00')

            expect(data.times.items).toEqual(legacyFifteenMinuteSlots())
            expect(data.times.items).toHaveLength(96)
            // Index of "10:30" in the legacy list.
            expect(data.times.selectedIndex).toBe(42)
        })

        it('createSelectionHandler maps a time index to the legacy slot', () => {
            const legacy = legacyFifteenMinuteSlots()
            const picked: string[] = []
            const range = {
                startDate: new Date(2024, 0, 15, 10, 30),
                endDate: new Date(2024, 0, 20, 18, 0),
            }

            const handler = createSelectionHandler(
                'start',
                'time',
                'dd/MM/yyyy',
                (time: string) => picked.push(time),
                () => {},
                () => {},
                () => {},
                () => {},
                range
            )

            // First, last and an arbitrary mid slot.
            for (const index of [0, 42, 95]) {
                handler(index)
            }

            expect(picked).toEqual([legacy[0], legacy[42], legacy[95]])
            expect(picked).toEqual(['00:00', '10:30', '23:45'])
        })
    })

    describe('formatTimeIn12Hour', () => {
        it.each([
            [0, 0, '12:00 AM'],
            [0, 5, '12:05 AM'],
            [9, 30, '9:30 AM'],
            [11, 59, '11:59 AM'],
            [12, 0, '12:00 PM'],
            [13, 5, '1:05 PM'],
            [23, 45, '11:45 PM'],
        ])('formats %i:%i as %s', (hours, minutes, expected) => {
            expect(
                formatTimeIn12Hour(new Date(2024, 0, 15, hours, minutes, 30))
            ).toBe(expected)
        })

        it('ignores seconds', () => {
            expect(formatTimeIn12Hour(new Date(2024, 0, 15, 14, 7, 59))).toBe(
                '2:07 PM'
            )
        })
    })
})
