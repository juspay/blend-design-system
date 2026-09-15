import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import TimeSelector from '../../../lib/components/DateRangePicker/TimeSelector'
import type { DateRange } from '../../../lib/components/DateRangePicker/types'

if (typeof PointerEvent === 'undefined') {
    // @ts-expect-error - PointerEvent is not available in jsdom test environment
    global.PointerEvent = class PointerEvent extends Event {
        pointerId: number
        bubbles: boolean
        cancelable: boolean
        pointerType: string
        constructor(
            type: string,
            eventInitDict?: {
                pointerId?: number
                bubbles?: boolean
                cancelable?: boolean
                pointerType?: string
            }
        ) {
            super(type, eventInitDict)
            this.pointerId = eventInitDict?.pointerId ?? 0
            this.bubbles = eventInitDict?.bubbles ?? false
            this.cancelable = eventInitDict?.cancelable ?? false
            this.pointerType = eventInitDict?.pointerType ?? 'mouse'
        }
    } as unknown
}

/**
 * Behaviour-lock for DateRangePicker's time field.
 *
 * `TimeSelector` used to own a hand-rolled 15-minute nested loop, its own
 * `parseTimeInput` and its own 12-hour formatter. Those were replaced with
 * calls into `shared/datetime/timeCore`. The existing DateRangePicker suite
 * never opens the time dropdown, so it stayed green even when the step
 * constant was mutated from 15 to 37 — this file closes that hole.
 *
 * These assertions describe the LEGACY contract on purpose. If they fail,
 * DateRangePicker's time behaviour changed.
 */

// Fixed, non-today date so the disablePast/Future bounds are the full day.
const FIXED_DAY = new Date(2025, 8, 15, 0, 0, 0)
const TODAY = new Date(2025, 8, 20, 10, 7, 0)

const range: DateRange = { startDate: FIXED_DAY }

const renderSelector = (
    props: Partial<React.ComponentProps<typeof TimeSelector>> = {}
) =>
    render(
        <TimeSelector
            value="09:00"
            onChange={vi.fn()}
            disablePastDates={false}
            disableFutureDates={false}
            today={TODAY}
            isStart={true}
            selectedRange={range}
            aria-label="Start time"
            {...props}
        />
    )

const openDropdown = async (user: ReturnType<typeof render>['user']) => {
    await user.click(screen.getByRole('textbox', { name: 'Start time' }))
    await waitFor(() => {
        expect(screen.getAllByText(/AM|PM/).length).toBeGreaterThan(1)
    })
}

const optionLabels = (): string[] =>
    screen
        .getAllByRole('menuitem')
        .map((n) => n.textContent?.trim() ?? '')
        .filter(Boolean)

describe('TimeSelector (DateRangePicker behaviour lock)', () => {
    describe('time-slot generation', () => {
        it('offers exactly 96 quarter-hour slots for an unbounded day', async () => {
            const { user } = renderSelector()
            await openDropdown(user)

            const labels = optionLabels()
            expect(labels).toHaveLength(96)
            expect(labels.slice(0, 4)).toEqual([
                '12:00 AM',
                '12:15 AM',
                '12:30 AM',
                '12:45 AM',
            ])
            expect(labels[labels.length - 1]).toBe('11:45 PM')
        })

        it('steps by 15 minutes, not any other interval', async () => {
            const { user } = renderSelector()
            await openDropdown(user)

            // Guards the step constant directly: a 37-minute step would put
            // "1:00 AM" nowhere in the list.
            const labels = optionLabels()
            expect(labels).toContain('1:00 AM')
            expect(labels).toContain('1:15 AM')
            expect(labels).not.toContain('1:07 AM')
        })

        it('always displays 12-hour labels regardless of the 24h value', async () => {
            const { user } = renderSelector({ value: '14:30' })
            await openDropdown(user)

            expect(optionLabels()).toContain('2:30 PM')
            expect(optionLabels()).not.toContain('14:30')
        })
    })

    describe('per-hour restart when bounded by disablePastDates', () => {
        it('starts at the current minute then realigns to :00 on the next hour', async () => {
            // today = 10:07, and the selected day IS today, so the legacy
            // generator begins at 10:07 and restarts at :00 from 11:00 on.
            const { user } = renderSelector({
                disablePastDates: true,
                selectedRange: { startDate: new Date(2025, 8, 20, 12, 0, 0) },
                today: TODAY,
                value: '12:00',
            })
            await openDropdown(user)

            const labels = optionLabels()
            expect(labels[0]).toBe('10:07 AM')
            expect(labels.slice(0, 5)).toEqual([
                '10:07 AM',
                '10:22 AM',
                '10:37 AM',
                '10:52 AM',
                '11:00 AM',
            ])
        })
    })

    describe('selection round-trip', () => {
        // Locks the label->value mapping across the timeCore refactor: the
        // menu renders `formatTimeValue(slot, {format:'12h'})` and commits
        // `timeValueToString(slot)`. A regression in either shows up here.
        it('commits the canonical 24-hour value for a 12-hour label', async () => {
            const onChange = vi.fn()
            const { user } = renderSelector({ onChange })
            await openDropdown(user)

            await user.click(screen.getByText('2:30 PM'))

            await waitFor(() => {
                expect(onChange).toHaveBeenCalledWith('14:30')
            })
        })

        it('commits midnight as 00:00, not 12:00', async () => {
            const onChange = vi.fn()
            const { user } = renderSelector({ onChange })
            await openDropdown(user)

            await user.click(screen.getByText('12:00 AM'))

            await waitFor(() => {
                expect(onChange).toHaveBeenCalledWith('00:00')
            })
        })
    })
})
