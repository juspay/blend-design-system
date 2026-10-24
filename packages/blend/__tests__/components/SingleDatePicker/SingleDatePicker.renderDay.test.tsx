import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import type {
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

// Fixed dates only — the calendar virtualises around the selected month, so a
// drifting "today" would silently change which cells are in the DOM.
const SEP_15 = new Date(2025, 8, 15)

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

const waitForCalendar = async () =>
    waitFor(() => expect(getDayCells().length).toBeGreaterThan(0))

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
    await waitForCalendar()
}

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
    date: Date
): RenderDayConfig | undefined =>
    mock.mock.calls.find(
        ([cfg]: [RenderDayConfig]) => cfg.date.getTime() === date.getTime()
    )?.[0]

describe('SingleDatePicker renderDay and onVisibleMonthsChange', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('calls renderDay with single-date semantics for the picked day', async () => {
        const renderDay = vi.fn(() => null)
        const { user } = render(
            <SingleDatePicker
                value={SEP_15}
                onChange={vi.fn()}
                renderDay={renderDay}
            />
        )

        await openPicker(user)

        expect(renderDay).toHaveBeenCalled()

        const picked = callForDate(renderDay, SEP_15)
        expect(picked).toBeDefined()
        expect(picked).toMatchObject({
            isStart: true,
            isSingleDate: true,
            isEnd: false,
            isRangeDay: false,
        })

        // Any other rendered day is plain: not start, not single-date.
        const other = callForDate(renderDay, new Date(2025, 8, 20))
        expect(other).toBeDefined()
        expect(other).toMatchObject({
            isStart: false,
            isSingleDate: false,
            isEnd: false,
            isRangeDay: false,
        })
    })

    it('renders custom content inside the non-interactive day overlay', async () => {
        const renderDay = ({ date }: RenderDayConfig) => (
            <span data-testid="day-badge">{date.getDate()}</span>
        )
        const { user } = render(
            <SingleDatePicker
                value={SEP_15}
                onChange={vi.fn()}
                renderDay={renderDay}
            />
        )

        await openPicker(user)

        const overlay = getDayCell(SEP_15).querySelector(
            '[data-element="day-content"]'
        ) as HTMLElement | null
        expect(overlay).toBeTruthy()
        expect(overlay?.style.position).toBe('absolute')
        expect(overlay?.getAttribute('style')).toContain('inset: 0')
        expect(overlay?.style.pointerEvents).toBe('none')
        expect(overlay?.parentElement?.getAttribute('data-element')).toBe(
            'days'
        )
        expect(overlay?.textContent).toBe('15')
    })

    it('reports isDisabled for days outside minDate', async () => {
        const renderDay = vi.fn(() => null)
        const { user } = render(
            <SingleDatePicker
                value={SEP_15}
                onChange={vi.fn()}
                minDate={new Date(2025, 8, 10)}
                renderDay={renderDay}
            />
        )

        await openPicker(user)

        expect(callForDate(renderDay, new Date(2025, 8, 5))?.isDisabled).toBe(
            true
        )
        expect(callForDate(renderDay, new Date(2025, 8, 20))?.isDisabled).toBe(
            false
        )
    })

    it('is ignored in month granularity', async () => {
        const renderDay = vi.fn(() => null)
        const { user } = render(
            <SingleDatePicker
                granularity="month"
                value={SEP_15}
                onChange={vi.fn()}
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

    it('fires onVisibleMonthsChange on mount with the selected month, deduped', async () => {
        const onVisibleMonthsChange = vi.fn()
        const { user } = render(
            <SingleDatePicker
                value={SEP_15}
                onChange={vi.fn()}
                onVisibleMonthsChange={onVisibleMonthsChange}
            />
        )

        await openPicker(user)

        expect(onVisibleMonthsChange).toHaveBeenCalledTimes(1)
        const reported = onVisibleMonthsChange.mock
            .calls[0][0] as CalendarMonth[]
        expect(reported.length).toBeGreaterThan(0)
        expect(reported.some((m) => m.month === 8 && m.year === 2025)).toBe(
            true
        )

        // Settling past the skeleton swap must not re-fire the same set.
        await waitFor(() => expect(getDayCells().length).toBeGreaterThan(0))
        expect(onVisibleMonthsChange).toHaveBeenCalledTimes(1)
    })

    it('fires with the new month set when the calendar is scrolled', async () => {
        const onVisibleMonthsChange = vi.fn()
        const { user } = render(
            <SingleDatePicker
                value={SEP_15}
                onChange={vi.fn()}
                onVisibleMonthsChange={onVisibleMonthsChange}
            />
        )

        await openPicker(user)
        expect(onVisibleMonthsChange).toHaveBeenCalledTimes(1)

        const scrollContainer = getScrollContainer()
        scrollContainer.scrollTop = 0
        fireEvent.scroll(scrollContainer)

        await waitFor(() =>
            expect(onVisibleMonthsChange).toHaveBeenCalledTimes(2)
        )

        const scrolledMonths = onVisibleMonthsChange.mock.calls[1][0]
        expect(scrolledMonths[0]).toMatchObject({
            index: 0,
            month: 0,
            year: DATE_RANGE_PICKER_CONSTANTS.MIN_YEAR,
        })
    })
})
