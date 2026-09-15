import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import DateRangePicker from '../../../lib/components/DateRangePicker/DateRangePicker'
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

// A complete initial range anchors the month grid's view year at 2025 (via
// MonthYearGrid's anchorYear derivation) without leaving a half-open pending
// selection: `nextMonthRange` treats a range that already has an `endDate` as
// complete and starts fresh on the very first click, so this seed value never
// leaks into the assertions below.
const JUNE_2025_RANGE: DateRange = {
    startDate: new Date(2025, 5, 10),
    endDate: new Date(2025, 5, 20),
}

const getTrigger = () =>
    screen.getByRole('button', { name: /^Date range picker,/ })

const getMonthCells = (): HTMLElement[] =>
    Array.from(document.querySelectorAll('[data-element="months"]'))

const getMonthCell = (year: number, monthIndex: number): HTMLElement => {
    const cell = document.querySelector(
        `[data-element="months"][data-id="${year}-${monthIndex}"]`
    )
    if (!cell) throw new Error(`No month cell found for ${year}-${monthIndex}`)
    return cell as HTMLElement
}

const waitForMonthGrid = async () =>
    waitFor(() => expect(getMonthCells().length).toBeGreaterThan(0))

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
    await waitForMonthGrid()
}

const applyPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(screen.getByRole('button', { name: /apply/i }))
}

describe('DateRangePicker granularity', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('month granularity', () => {
        it('commits startDate as the first day and endDate as the last day of the clicked months', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    value={JUNE_2025_RANGE}
                    onChange={onChange}
                />
            )

            await openPicker(user)

            await user.click(getMonthCell(2025, 8)) // September
            await user.click(getMonthCell(2025, 10)) // November
            await applyPicker(user)

            expect(onChange).toHaveBeenCalledTimes(1)
            const committed = onChange.mock.calls[0][0] as DateRange
            expect(committed.startDate).toEqual(new Date(2025, 8, 1))
            expect(committed.endDate).toEqual(new Date(2025, 10, 30))
        })

        it('gives a same-month range when the same month is clicked twice', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    value={JUNE_2025_RANGE}
                    onChange={onChange}
                />
            )

            await openPicker(user)

            await user.click(getMonthCell(2025, 8)) // September
            await user.click(getMonthCell(2025, 8)) // September again
            await applyPicker(user)

            expect(onChange).toHaveBeenCalledTimes(1)
            const committed = onChange.mock.calls[0][0] as DateRange
            expect(committed.startDate).toEqual(new Date(2025, 8, 1))
            expect(committed.endDate).toEqual(new Date(2025, 8, 30))
        })

        it('keeps the internal single-date mode single when month granularity is used', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    isSingleDatePicker
                    value={{ startDate: new Date(2025, 5, 10) }}
                    onChange={onChange}
                />
            )

            await openPicker(user)

            await user.click(getMonthCell(2025, 8)) // September
            await user.click(getMonthCell(2025, 10)) // October
            await applyPicker(user)

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange.mock.calls[0][0]).toEqual({
                startDate: new Date(2025, 10, 1),
            })
        })

        it('restarts the range at an earlier month clicked while half-open', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    value={JUNE_2025_RANGE}
                    onChange={onChange}
                />
            )

            await openPicker(user)

            await user.click(getMonthCell(2025, 8)) // September — pending start
            await user.click(getMonthCell(2025, 5)) // June — earlier, restarts
            await user.click(getMonthCell(2025, 10)) // November — closes the range
            await applyPicker(user)

            expect(onChange).toHaveBeenCalledTimes(1)
            const committed = onChange.mock.calls[0][0] as DateRange
            // Had the restart not happened, the range would have stayed
            // anchored at September (startDate 1 Sep). Anchored at June
            // instead proves the earlier click restarted the range.
            expect(committed.startDate).toEqual(new Date(2025, 5, 1))
            expect(committed.endDate).toEqual(new Date(2025, 10, 30))
        })

        it('hides the DD/MM/YYYY text inputs and the preset quick-selector', async () => {
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    value={JUNE_2025_RANGE}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)

            expect(screen.queryAllByPlaceholderText('DD/MM/YYYY')).toHaveLength(
                0
            )
            expect(
                document.querySelector('[data-element="preset-selector"]')
            ).toBeNull()
        })
    })

    // The trigger always renders from the committed `value` prop, not the
    // in-popover draft (see `renderTrigger`'s `displayRange = value`), so
    // these branches are exercised directly through `value` rather than by
    // clicking through the calendar and Apply — Apply only calls `onChange`,
    // it never updates `value` itself.
    describe('trigger text (formatMonthRangeDisplay)', () => {
        it('shows "Select month range" when nothing is committed', () => {
            render(
                <DateRangePicker
                    granularity="month"
                    value={undefined}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('Select month range')
        })

        it('shows a single formatted month when only startDate is committed (no endDate)', () => {
            render(
                <DateRangePicker
                    granularity="month"
                    value={{ startDate: new Date(2025, 8, 1) }}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('Sep 2025')
        })

        it('shows a single string, not a dashed range, when startDate and endDate fall in the same month', () => {
            render(
                <DateRangePicker
                    granularity="month"
                    value={{
                        startDate: new Date(2025, 8, 1),
                        endDate: new Date(2025, 8, 30),
                    }}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('Sep 2025')
            expect(getTrigger().textContent).not.toContain(' - ')
        })

        it('shows "MMM yyyy - MMM yyyy" when startDate and endDate fall in different months', () => {
            render(
                <DateRangePicker
                    granularity="month"
                    value={{
                        startDate: new Date(2025, 8, 1),
                        endDate: new Date(2025, 10, 30),
                    }}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('Sep 2025 - Nov 2025')
        })
    })

    describe('Apply button state (month mode)', () => {
        it('disables Apply with nothing selected, and keeps it disabled after only a start month is picked', async () => {
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    value={undefined}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)

            expect(
                screen.getByRole('button', { name: /apply/i })
            ).toBeDisabled()

            // No committed value means the grid anchors on whatever year the
            // component resolves as "today" — read it back from the view
            // label instead of constructing a Date, so this stays
            // independent of the real current date.
            const viewYear = Number(
                (
                    document.querySelector(
                        '[data-element="month-year"]'
                    ) as HTMLElement
                ).textContent
            )
            await user.click(getMonthCell(viewYear, 0)) // a start month only, no end yet

            expect(
                screen.getByRole('button', { name: /apply/i })
            ).toBeDisabled()
        })
    })

    describe('day granularity (default)', () => {
        it('still renders the DD/MM/YYYY text inputs', async () => {
            const { user } = render(
                <DateRangePicker value={JUNE_2025_RANGE} onChange={vi.fn()} />
            )

            await user.click(getTrigger())

            await waitFor(() => {
                expect(
                    screen.getAllByPlaceholderText('DD/MM/YYYY').length
                ).toBeGreaterThan(0)
            })
        })
    })
})
