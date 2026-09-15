import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import TimeColumns from '../../../lib/components/TimePicker/TimeColumns'
import { getTimePickerTokens } from '../../../lib/components/TimePicker/timePicker.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'

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

// Fixed dates — the calendar virtualises around the selected month, so a
// drifting "today" would change which cells are in the DOM.
const SEP_10 = new Date(2025, 8, 10)
const SEP_15 = new Date(2025, 8, 15)
const SEP_20 = new Date(2025, 8, 20)

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
    const cell = getDayCells().find((candidate) =>
        (candidate.getAttribute('aria-label') ?? '').startsWith(label)
    )
    if (!cell) throw new Error(`No calendar cell found for "${label}"`)
    return cell
}

const getTrigger = () => screen.getByRole('button', { name: /^Date picker,/ })

const getReadout = () =>
    document.querySelector(
        '[data-element="single-date-readout"]'
    ) as HTMLElement | null

// Each case drives several open/close cycles through the virtualised calendar,
// which comfortably outruns the 1s `waitFor` default on a loaded machine.
const WAIT = { timeout: 3000 }

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
    await waitFor(() => expect(getDayCells().length).toBeGreaterThan(0), WAIT)
}

describe('SingleDatePicker lifecycle', () => {
    /**
     * The `disabled` effect. Every other close path routes through
     * `closeAndReset`; being disabled mid-edit has to discard the draft too,
     * or re-enabling and reopening restores a selection the user never
     * committed and a single Apply commits it.
     */
    it('discards the draft when the picker is disabled mid-edit', async () => {
        const { user, rerender } = render(
            <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
        )

        await openPicker(user)
        await user.click(getDayCell(SEP_20))
        expect(getReadout()).toHaveTextContent('20/09/2025')

        rerender(
            <SingleDatePicker value={SEP_15} onChange={vi.fn()} disabled />
        )
        await waitFor(() => {
            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
        }, WAIT)

        rerender(<SingleDatePicker value={SEP_15} onChange={vi.fn()} />)
        await openPicker(user)

        expect(getReadout()).toHaveTextContent('15/09/2025')
    })

    /**
     * The internal committed value is dropped once the component becomes
     * controlled. Without that, a caller that starts uncontrolled, then
     * supplies `value`, then clears it back to `undefined` falls through to a
     * stale internal date instead of the placeholder.
     */
    it('does not resurrect an internal value after a controlled round trip', async () => {
        // With no value the calendar virtualises around *today*, so pin the
        // clock instead of reading it — otherwise the cell this test clicks
        // depends on when the suite runs. `shouldAdvanceTime` keeps
        // userEvent's internal delays working under fake timers.
        vi.useFakeTimers({ shouldAdvanceTime: true })
        vi.setSystemTime(SEP_15)

        const { user, rerender } = render(
            <SingleDatePicker onChange={vi.fn()} />
        )

        // Uncontrolled: commit something so `internalDate` is populated. The
        // calendar centres on today when nothing is selected, so pin the clock
        // rather than reading it — every other test in this file uses fixed
        // dates, and a real `new Date()` makes the clicked cell depend on when
        // the suite runs (and on a rollover between render and click).
        await openPicker(user)
        await user.click(getDayCell(SEP_15))
        await user.click(screen.getByRole('button', { name: /apply/i }))
        await waitFor(() => {
            expect(getTrigger()).not.toHaveTextContent('Select date')
        }, WAIT)

        rerender(<SingleDatePicker value={SEP_15} onChange={vi.fn()} />)
        expect(getTrigger()).toHaveTextContent('15/09/2025')

        rerender(<SingleDatePicker value={undefined} onChange={vi.fn()} />)
        await waitFor(() => {
            expect(getTrigger()).toHaveTextContent('Select date')
        }, WAIT)
    })

    /**
     * The draft is re-seeded from the committed value by timestamp, not by
     * identity, so a parent that rebuilds the `Date` on every render does not
     * wipe an in-progress selection.
     */
    it('re-seeds the draft on a real value change, not on a rebuilt Date', async () => {
        const { user, rerender } = render(
            <SingleDatePicker
                value={new Date(2025, 8, 15)}
                onChange={vi.fn()}
            />
        )

        await openPicker(user)
        await user.click(getDayCell(SEP_20))
        expect(getReadout()).toHaveTextContent('20/09/2025')

        rerender(
            <SingleDatePicker
                value={new Date(2025, 8, 15)}
                onChange={vi.fn()}
            />
        )
        expect(getReadout()).toHaveTextContent('20/09/2025')

        rerender(<SingleDatePicker value={SEP_10} onChange={vi.fn()} />)
        await waitFor(() => {
            expect(getReadout()).toHaveTextContent('10/09/2025')
        }, WAIT)
    })

    /**
     * `TimeColumns` is handed `disabled={!draftDate}`. The aria state alone is
     * not enough — both the click path and the keyboard path have to bail out,
     * otherwise a time is committed against a date that does not exist yet.
     */
    it('ignores clicks and keys on the time columns while no date is selected', async () => {
        const { user } = render(
            <SingleDatePicker value={undefined} onChange={vi.fn()} showTime />
        )

        await openPicker(user)

        const hours = screen.getByRole('listbox', { name: 'Hours' })
        expect(hours).toHaveAttribute('aria-disabled', 'true')
        expect(screen.getByText('12:00 AM')).toBeInTheDocument()

        await user.click(
            screen.getAllByRole('option', { name: '5' })[0] as HTMLElement
        )
        expect(screen.getByText('12:00 AM')).toBeInTheDocument()

        hours.focus()
        await user.keyboard('{ArrowDown}')
        expect(screen.getByText('12:00 AM')).toBeInTheDocument()
    })

    /**
     * The integration assertion above cannot see TimeColumns' own `disabled`
     * guards: SingleDatePicker's `handleTimeChange` starts with
     * `if (!draftDate) return`, which absorbs every commit before it reaches
     * the parent. Deleting all three guards inside TimeColumns therefore left
     * the whole picker suite green. Drive the component directly so the guards
     * are observable.
     */
    it('TimeColumns itself swallows clicks and keys when disabled', async () => {
        const onChange = vi.fn()
        const tokens = getTimePickerTokens(FOUNDATION_THEME).lg

        const { user } = render(
            <TimeColumns
                value={{ hours: 0, minutes: 0, seconds: 0 }}
                onChange={onChange}
                tokens={tokens}
                idPrefix="disabled-columns"
                disabled
            />
        )

        const hours = screen.getByRole('listbox', { name: 'Hours' })
        expect(hours).toHaveAttribute('aria-disabled', 'true')

        await user.click(
            screen.getAllByRole('option', { name: '5' })[0] as HTMLElement
        )
        expect(onChange).not.toHaveBeenCalled()

        hours.focus()
        await user.keyboard('{ArrowDown}')
        await user.keyboard('{End}')
        expect(onChange).not.toHaveBeenCalled()
    })
})
