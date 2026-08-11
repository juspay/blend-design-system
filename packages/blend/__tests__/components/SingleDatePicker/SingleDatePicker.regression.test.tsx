import { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'

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

const SEP_15 = new Date(2025, 8, 15)
const SEP_22 = new Date(2025, 8, 22)

const dayLabel = (date: Date) =>
    date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

const getDayCells = (): HTMLElement[] =>
    Array.from(document.querySelectorAll('[data-element="days"]'))

const getDayCell = (date: Date): HTMLElement => {
    const label = dayLabel(date)
    const cell = getDayCells().find((c) =>
        (c.getAttribute('aria-label') ?? '').startsWith(label)
    )
    if (!cell) throw new Error(`No calendar cell for "${label}"`)
    return cell
}

const getTrigger = () => screen.getByRole('button', { name: /^Date picker,/ })

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
    await waitFor(() => expect(getDayCells().length).toBeGreaterThan(0))
}

// =============================================================================
// Timezone fixtures
// =============================================================================

const NEW_YORK = 'America/New_York'

/**
 * 2025-09-14 22:30 in New York (EDT, UTC-4).
 *
 * Deliberately an instant whose New York calendar day is *behind* the machine
 * one under both TZ=UTC (Sep 15, 02:30) and TZ=Asia/Kolkata (Sep 15, 08:00),
 * so any code path that reads the day in the picker timezone but the time on
 * the machine clock — or vice versa — produces a visibly wrong answer.
 */
const NY_LATE_EVENING = new Date('2025-09-15T02:30:00Z')

/** The New York day of `NY_LATE_EVENING`, as a calendar-cell key. */
const NY_DAY_CELL = new Date(2025, 8, 14)

const nyWallClock = (date: Date) => {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: NEW_YORK,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
        .formatToParts(date)
        .reduce<Record<string, string>>((acc, part) => {
            acc[part.type] = part.value
            return acc
        }, {})

    return {
        // Matches dateFormat="dd/MM/yyyy" + timeFormat="24h".
        date: `${parts.day}/${parts.month}/${parts.year}`,
        time: `${parts.hour}:${parts.minute}`,
    }
}

/** Controlled host: the committed value round-trips through a parent. */
const ControlledPicker = ({
    initialValue,
    onChange,
    ...props
}: {
    initialValue?: Date
    onChange?: (date: Date | undefined) => void
} & Omit<
    React.ComponentProps<typeof SingleDatePicker>,
    'value' | 'onChange'
>) => {
    const [value, setValue] = useState<Date | undefined>(initialValue)
    return (
        <SingleDatePicker
            {...props}
            value={value}
            onChange={(date) => {
                setValue(date)
                onChange?.(date)
            }}
        />
    )
}

describe('SingleDatePicker regressions', () => {
    describe('draft is discarded on dismiss', () => {
        // Escape and outside-click never reach handleCancel, so the abandoned
        // draft used to survive into the next open — one Apply then committed
        // a date the user explicitly walked away from.
        it('discards the draft when dismissed with Escape', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={onChange} />
            )

            await openPicker(user)
            await user.click(getDayCell(SEP_22))
            await user.keyboard('{Escape}')

            expect(onChange).not.toHaveBeenCalled()

            // Reopen: the calendar must show the committed value, not the
            // abandoned draft.
            await openPicker(user)
            await user.click(screen.getByRole('button', { name: /apply/i }))

            await waitFor(() => {
                expect(onChange).toHaveBeenCalledTimes(1)
            })
            expect(onChange.mock.calls[0][0].getDate()).toBe(15)
        })
    })

    describe('minDate bounds the time even without showTime', () => {
        // CalendarGrid returns start-of-day, so selecting the minDate day
        // produced midnight — before a minDate carrying a time-of-day.
        it('clamps a same-day selection up to minDate time', async () => {
            const onChange = vi.fn()
            const minDate = new Date(2025, 8, 15, 9, 0, 0)
            // Seed a value on the same month: CalendarGrid virtualises around
            // the selection, so without it Sep 2025 is not in the DOM at all.
            const { user } = render(
                <SingleDatePicker
                    value={new Date(2025, 8, 16, 12, 0, 0)}
                    onChange={onChange}
                    minDate={minDate}
                />
            )

            await openPicker(user)
            await user.click(getDayCell(SEP_15))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            await waitFor(() => expect(onChange).toHaveBeenCalled())
            const committed: Date = onChange.mock.calls[0][0]
            expect(committed.getTime()).toBeGreaterThanOrEqual(
                minDate.getTime()
            )
            expect(committed.getHours()).toBe(9)
        })
    })

    describe('timezone: dates and times read from the same zone', () => {
        // The time-of-day used to be read and written with the machine clock
        // while the calendar day came from `timezone`, so the trigger showed
        // one zone's date beside another zone's time and every re-selection
        // walked the committed instant backwards by a day.
        it('shows the trigger date and time of the same instant in the picker timezone', () => {
            const { date, time } = nyWallClock(NY_LATE_EVENING)

            render(
                <SingleDatePicker
                    value={NY_LATE_EVENING}
                    onChange={vi.fn()}
                    timezone={NEW_YORK}
                    showTime
                    timeFormat="24h"
                />
            )

            expect(getTrigger()).toHaveTextContent(`${date} ${time}`)
            // Pinned, so a change in either half is visible in the diff.
            expect(getTrigger()).toHaveTextContent('14/09/2025 22:30')
        })

        it('keeps the committed instant unchanged when the selected day is re-picked', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={NY_LATE_EVENING}
                    onChange={onChange}
                    timezone={NEW_YORK}
                    showTime
                    timeFormat="24h"
                />
            )

            await openPicker(user)

            // Sep 14 is the highlighted day *in New York*, even though the
            // machine calendar has already rolled over to Sep 15.
            expect(getDayCell(NY_DAY_CELL)).toHaveAttribute(
                'aria-selected',
                'true'
            )

            await user.click(getDayCell(NY_DAY_CELL))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect((onChange.mock.calls[0][0] as Date).toISOString()).toBe(
                NY_LATE_EVENING.toISOString()
            )
        })

        it('stays put across repeated re-selections of the same day', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <ControlledPicker
                    initialValue={NY_LATE_EVENING}
                    onChange={onChange}
                    timezone={NEW_YORK}
                    showTime
                    timeFormat="24h"
                />
            )

            for (let pass = 0; pass < 2; pass++) {
                await openPicker(user)
                await user.click(getDayCell(NY_DAY_CELL))
                await user.click(screen.getByRole('button', { name: /apply/i }))
                await waitFor(() =>
                    expect(onChange).toHaveBeenCalledTimes(pass + 1)
                )
            }

            for (const call of onChange.mock.calls) {
                expect((call[0] as Date).toISOString()).toBe(
                    NY_LATE_EVENING.toISOString()
                )
            }
            expect(getTrigger()).toHaveTextContent('14/09/2025 22:30')
        })
    })
})
