import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils'
import DateRangePicker from '../../../lib/components/DateRangePicker/DateRangePicker'
import type {
    DateRange,
    RenderDayConfig,
    CalendarMonth,
} from '../../../lib/components/DateRangePicker/types'
import { DATE_RANGE_PICKER_CONSTANTS } from '../../../lib/components/DateRangePicker/constants'

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

// All fixtures anchor to the real current month: CalendarGrid derives
// `today` from the clock (`getTodayInTimezone`), so a fixed date would
// make `isTodayDay`/hide-* behaviour depend on when the suite runs.
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()
const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

// A full-current-month range keeps every interesting day (start, mid,
// today, end) inside the initially scrolled-to, rendered month.
const CURRENT_MONTH_RANGE: DateRange = {
    startDate: new Date(currentYear, currentMonth, 1),
    endDate: new Date(currentYear, currentMonth, lastDayOfMonth),
}

const getTrigger = () =>
    screen.getByRole('button', { name: /^Date range picker,/ })

const getDayCells = (): HTMLElement[] =>
    Array.from(document.querySelectorAll('[data-element="days"]'))

const waitForDayCells = async () =>
    waitFor(() => expect(getDayCells().length).toBeGreaterThan(0))

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
    await waitForDayCells()
}

/**
 * Day cells carry only the day number in `data-id`, and the scroll window
 * renders neighbouring months too — so locate a cell by its unique
 * date-based aria-label prefix instead.
 */
const getDayCell = (y: number, m: number, d: number): HTMLElement => {
    const label = new Date(y, m, d).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    const cell = getDayCells().find((c) =>
        c.getAttribute('aria-label')?.startsWith(label)
    )
    if (!cell) throw new Error(`No day cell found for ${y}-${m}-${d}`)
    return cell
}

const getDayOverlay = (y: number, m: number, d: number): HTMLElement | null =>
    getDayCell(y, m, d).querySelector('[data-element="day-content"]') ?? null

/**
 * The virtualized months live inside a plain Block scroll container with
 * no stable hook to query. Month headers are always rendered, so walk up
 * from one to the nearest `overflow-y: auto` ancestor — that is the
 * container whose `onScroll` drives `visibleMonths`.
 */
const getScrollContainer = (): HTMLElement => {
    let el: HTMLElement | null = document.querySelector(
        '[data-element="month-year"]'
    )
    while (el && el.style.overflowY !== 'auto') {
        el = el.parentElement
    }
    if (!el) throw new Error('Calendar scroll container not found')
    return el
}

const callForDate = (
    mock: ReturnType<typeof vi.fn>,
    year: number,
    month: number,
    day: number
): RenderDayConfig | undefined =>
    mock.mock.calls.find(
        ([cfg]: [RenderDayConfig]) =>
            cfg.date.getTime() === new Date(year, month, day).getTime()
    )?.[0]

describe('DateRangePicker renderDay and onVisibleMonthsChange', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('renderDay', () => {
        it('is called with the correct config for every rendered day', async () => {
            const renderDay = vi.fn(() => null)
            const { user } = render(
                <DateRangePicker
                    value={CURRENT_MONTH_RANGE}
                    renderDay={renderDay}
                />
            )

            await openPicker(user)

            // The whole current month is inside the initial scroll window.
            expect(renderDay).toHaveBeenCalled()

            const startDay = callForDate(
                renderDay,
                currentYear,
                currentMonth,
                1
            )
            expect(startDay).toBeDefined()
            expect(startDay).toMatchObject({
                isStart: true,
                isEnd: false,
                isRangeDay: false,
                isSingleDate: false,
                isDisabled: false,
            })

            // Day 15 can never be the 1st or the last day of a month, so
            // it is always a pure interior range day.
            const midDay = callForDate(renderDay, currentYear, currentMonth, 15)
            expect(midDay).toBeDefined()
            expect(midDay).toMatchObject({
                isStart: false,
                isEnd: false,
                isRangeDay: true,
                isSingleDate: false,
            })

            const endDay = callForDate(
                renderDay,
                currentYear,
                currentMonth,
                lastDayOfMonth
            )
            expect(endDay).toBeDefined()
            expect(endDay).toMatchObject({
                isStart: false,
                isEnd: true,
                isRangeDay: false,
                isSingleDate: false,
            })

            const todayCall = callForDate(
                renderDay,
                currentYear,
                currentMonth,
                today.getDate()
            )
            expect(todayCall).toBeDefined()
            expect(todayCall?.isTodayDay).toBe(true)
        })

        it('reports isDisabled for days outside minDate', async () => {
            const renderDay = vi.fn(() => null)
            const { user } = render(
                <DateRangePicker
                    value={CURRENT_MONTH_RANGE}
                    minDate={new Date(currentYear, currentMonth, 10)}
                    renderDay={renderDay}
                />
            )

            await openPicker(user)

            expect(
                callForDate(renderDay, currentYear, currentMonth, 5)?.isDisabled
            ).toBe(true)
            expect(
                callForDate(renderDay, currentYear, currentMonth, 15)
                    ?.isDisabled
            ).toBe(false)
        })

        it('flags isSingleDate when start and end are the same day', async () => {
            const renderDay = vi.fn(() => null)
            const { user } = render(
                <DateRangePicker
                    value={{
                        startDate: new Date(currentYear, currentMonth, 10),
                        endDate: new Date(currentYear, currentMonth, 10),
                    }}
                    renderDay={renderDay}
                />
            )

            await openPicker(user)

            const singleDay = callForDate(
                renderDay,
                currentYear,
                currentMonth,
                10
            )
            expect(singleDay).toBeDefined()
            expect(singleDay?.isSingleDate).toBe(true)
            expect(singleDay?.isStart).toBe(true)
        })

        it('renders custom content in an absolute, non-interactive overlay inside each day cell', async () => {
            const renderDay = ({ date }: RenderDayConfig) => (
                <span data-testid="day-badge">{date.getDate()}</span>
            )
            const { user } = render(
                <DateRangePicker
                    value={CURRENT_MONTH_RANGE}
                    renderDay={renderDay}
                />
            )

            await openPicker(user)

            const overlays = Array.from(
                document.querySelectorAll('[data-element="day-content"]')
            )
            expect(overlays.length).toBeGreaterThan(0)

            for (const overlay of overlays) {
                // Non-flow + click-transparent: month heights are
                // precomputed for the virtual scroll, and the cell's own
                // click/keyboard semantics must stay intact.
                expect(overlay.style.position).toBe('absolute')
                expect(overlay.getAttribute('style')).toContain('inset: 0')
                expect(overlay.style.pointerEvents).toBe('none')
                // The overlay is a direct child of the day cell.
                expect(
                    overlay.parentElement?.getAttribute('data-element')
                ).toBe('days')
            }

            // Custom content lands inside the overlay...
            const badges = screen.getAllByTestId('day-badge')
            expect(badges.length).toBeGreaterThan(0)
            const overlayFor15 = getDayOverlay(currentYear, currentMonth, 15)
            expect(overlayFor15).toBeTruthy()
            expect(overlayFor15?.textContent).toBe('15')

            // ...and the cell's aria-label stays purely date-based.
            expect(
                getDayCell(currentYear, currentMonth, 15).getAttribute(
                    'aria-label'
                )
            ).toBe(
                new Date(currentYear, currentMonth, 15).toLocaleDateString(
                    'en-US',
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }
                )
            )
        })

        it('is not called for hidden dates', async () => {
            const renderDay = vi.fn(() => null)
            const { user } = render(
                <DateRangePicker
                    value={CURRENT_MONTH_RANGE}
                    hideFutureDates
                    renderDay={renderDay}
                />
            )

            await openPicker(user)

            expect(renderDay).toHaveBeenCalled()
            const todayMidnight = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            ).getTime()
            for (const [cfg] of renderDay.mock.calls as [RenderDayConfig][]) {
                // Every rendered day is a real, visible calendar day at or
                // before today — hidden future days (and fully hidden
                // future months) never reach renderDay.
                expect(cfg.date.getTime()).toBeLessThanOrEqual(todayMidnight)
            }
        })

        it('is ignored in month granularity', async () => {
            const renderDay = vi.fn(() => null)
            const { user } = render(
                <DateRangePicker
                    granularity="month"
                    value={CURRENT_MONTH_RANGE}
                    renderDay={renderDay}
                />
            )

            await user.click(getTrigger())
            await waitFor(() =>
                expect(
                    document.querySelectorAll('[data-element="months"]').length
                ).toBeGreaterThan(0)
            )

            expect(renderDay).not.toHaveBeenCalled()
        })
    })

    describe('onVisibleMonthsChange', () => {
        it('fires once on mount with the scrolled-to months and dedupes identical sets', async () => {
            const onVisibleMonthsChange = vi.fn()
            const { user } = render(
                <DateRangePicker
                    value={CURRENT_MONTH_RANGE}
                    onVisibleMonthsChange={onVisibleMonthsChange}
                />
            )

            await openPicker(user)

            expect(onVisibleMonthsChange).toHaveBeenCalledTimes(1)

            const reported = onVisibleMonthsChange.mock
                .calls[0][0] as CalendarMonth[]
            expect(reported.length).toBeGreaterThan(0)
            for (const m of reported) {
                expect(m).toEqual(
                    expect.objectContaining({
                        month: expect.any(Number),
                        year: expect.any(Number),
                        index: expect.any(Number),
                    })
                )
            }
            // The initial scroll targets the selected range's month.
            expect(
                reported.some(
                    (m) => m.month === currentMonth && m.year === currentYear
                )
            ).toBe(true)

            // Settling past the skeleton swap and scroll positioning must
            // not re-fire the same month set.
            await waitFor(() => expect(getDayCells().length).toBeGreaterThan(0))
            expect(onVisibleMonthsChange).toHaveBeenCalledTimes(1)
        })

        it('does not fire when the prop is absent', async () => {
            const { user } = render(
                <DateRangePicker value={CURRENT_MONTH_RANGE} />
            )

            await openPicker(user)

            // No assertions to make on a missing callback beyond "does not
            // throw"; the mount+scroll path above covers the wired case.
            expect(getDayCells().length).toBeGreaterThan(0)
        })

        it('fires with the new month set when the calendar is scrolled', async () => {
            const onVisibleMonthsChange = vi.fn()
            const { user } = render(
                <DateRangePicker
                    value={CURRENT_MONTH_RANGE}
                    onVisibleMonthsChange={onVisibleMonthsChange}
                />
            )

            await openPicker(user)
            expect(onVisibleMonthsChange).toHaveBeenCalledTimes(1)
            const initialMonths = onVisibleMonthsChange.mock.calls[0][0]

            const scrollContainer = getScrollContainer()
            scrollContainer.scrollTop = 0
            fireEvent.scroll(scrollContainer)

            await waitFor(() =>
                expect(onVisibleMonthsChange).toHaveBeenCalledTimes(2)
            )

            const scrolledMonths = onVisibleMonthsChange.mock.calls[1][0]
            expect(scrolledMonths).not.toEqual(initialMonths)
            // scrollTop 0 lands on the very first month of the list.
            expect(scrolledMonths[0]).toMatchObject({
                index: 0,
                month: 0,
                year: DATE_RANGE_PICKER_CONSTANTS.MIN_YEAR,
            })
        })
    })
})
