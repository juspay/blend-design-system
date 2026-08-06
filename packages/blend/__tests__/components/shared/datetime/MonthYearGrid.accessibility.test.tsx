import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../../test-utils'
import { axe } from 'jest-axe'
import SingleDatePicker from '../../../../lib/components/SingleDatePicker/SingleDatePicker'
import DateRangePicker from '../../../../lib/components/DateRangePicker/DateRangePicker'
import type { DateRange } from '../../../../lib/components/DateRangePicker/types'

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

const SEP_15_2025 = new Date(2025, 8, 15)
const JUNE_2025_RANGE: DateRange = {
    startDate: new Date(2025, 5, 10),
    endDate: new Date(2025, 5, 20),
}

const getSingleTrigger = () =>
    screen.getByRole('button', { name: /^Date picker,/ })

const getRangeTrigger = () =>
    screen.getByRole('button', { name: /^Date range picker,/ })

const getMonthCells = (): HTMLElement[] =>
    Array.from(document.querySelectorAll('[data-element="months"]'))

const getYearCells = (): HTMLElement[] =>
    Array.from(document.querySelectorAll('[data-element="years"]'))

const getMonthCell = (year: number, monthIndex: number): HTMLElement => {
    const cell = document.querySelector(
        `[data-element="months"][data-id="${year}-${monthIndex}"]`
    )
    if (!cell) throw new Error(`No month cell found for ${year}-${monthIndex}`)
    return cell as HTMLElement
}

const waitForMonthGrid = async () =>
    waitFor(() => expect(getMonthCells().length).toBeGreaterThan(0))

const waitForYearGrid = async () =>
    waitFor(() => expect(getYearCells().length).toBeGreaterThan(0))

describe('MonthYearGrid Accessibility (via SingleDatePicker, month mode)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('has no axe violations when the month grid is open', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="month"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForMonthGrid()

        // The popover renders in a portal, so scope axe to the whole body.
        const results = await axe(document.body)
        expect(results).toHaveNoViolations()
    }, 20000)

    it('exposes the grid container with role="grid" and an accessible name', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="month"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForMonthGrid()

        expect(
            screen.getByRole('grid', { name: 'Select month' })
        ).toBeInTheDocument()
    })

    it('labels each month cell with the full month and year, marking the selection', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="month"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForMonthGrid()

        expect(getMonthCell(2025, 8)).toHaveAttribute(
            'aria-label',
            'September 2025, selected'
        )
        expect(getMonthCell(2025, 9)).toHaveAttribute(
            'aria-label',
            'October 2025'
        )
    })

    it('gives the year navigation buttons their exact accessible names and keeps them focusable', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="month"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForMonthGrid()

        const prevYear = screen.getByRole('button', { name: 'Previous year' })
        const nextYear = screen.getByRole('button', { name: 'Next year' })
        expect(prevYear).toBeInTheDocument()
        expect(nextYear).toBeInTheDocument()
        expect(prevYear).not.toHaveAttribute('tabIndex', '-1')
        expect(nextYear).not.toHaveAttribute('tabIndex', '-1')
    })

    it('marks a month disabled by minDate with aria-disabled="true"', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="month"
                value={SEP_15_2025}
                onChange={vi.fn()}
                minDate={new Date(2025, 8, 1)}
            />
        )

        await user.click(getSingleTrigger())
        await waitForMonthGrid()

        expect(getMonthCell(2025, 7)).toHaveAttribute('aria-disabled', 'true')
        expect(getMonthCell(2025, 8)).toHaveAttribute('aria-disabled', 'false')
    })
})

describe('MonthYearGrid Accessibility (via SingleDatePicker, year mode)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('has no axe violations when the year grid is open', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="year"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForYearGrid()

        const results = await axe(document.body)
        expect(results).toHaveNoViolations()
    }, 20000)

    it('exposes the grid container with role="grid" and an accessible name', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="year"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForYearGrid()

        expect(
            screen.getByRole('grid', { name: 'Select year' })
        ).toBeInTheDocument()
    })

    it('labels each year cell with the year text, marking the selection', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="year"
                value={SEP_15_2025}
                onChange={vi.fn()}
            />
        )

        await user.click(getSingleTrigger())
        await waitForYearGrid()

        const selectedCell = document.querySelector(
            '[data-element="years"][data-id="2025"]'
        ) as HTMLElement
        expect(selectedCell).toHaveAttribute('aria-label', '2025, selected')

        const otherCell = document.querySelector(
            '[data-element="years"][data-id="2027"]'
        ) as HTMLElement
        expect(otherCell).toHaveAttribute('aria-label', '2027')
    })

    it('marks a year disabled by maxDate with aria-disabled="true"', async () => {
        const { user } = render(
            <SingleDatePicker
                granularity="year"
                value={SEP_15_2025}
                onChange={vi.fn()}
                maxDate={new Date(2025, 8, 15)}
            />
        )

        await user.click(getSingleTrigger())
        await waitForYearGrid()

        const futureCell = document.querySelector(
            '[data-element="years"][data-id="2026"]'
        ) as HTMLElement
        expect(futureCell).toHaveAttribute('aria-disabled', 'true')

        const currentCell = document.querySelector(
            '[data-element="years"][data-id="2025"]'
        ) as HTMLElement
        expect(currentCell).toHaveAttribute('aria-disabled', 'false')
    })
})

describe('MonthYearGrid Accessibility (via DateRangePicker, month mode)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('has no axe violations when the month grid is open', async () => {
        const { user } = render(
            <DateRangePicker
                granularity="month"
                value={JUNE_2025_RANGE}
                onChange={vi.fn()}
            />
        )

        await user.click(getRangeTrigger())
        await waitForMonthGrid()

        const results = await axe(document.body)
        expect(results).toHaveNoViolations()
    }, 20000)

    it('exposes the grid container with role="grid" and an accessible name', async () => {
        const { user } = render(
            <DateRangePicker
                granularity="month"
                value={JUNE_2025_RANGE}
                onChange={vi.fn()}
            />
        )

        await user.click(getRangeTrigger())
        await waitForMonthGrid()

        expect(
            screen.getByRole('grid', { name: 'Select month' })
        ).toBeInTheDocument()
    })

    it('labels each month cell with the full month and year, marking the selection', async () => {
        const { user } = render(
            <DateRangePicker
                granularity="month"
                value={JUNE_2025_RANGE}
                onChange={vi.fn()}
            />
        )

        await user.click(getRangeTrigger())
        await waitForMonthGrid()

        expect(getMonthCell(2025, 5)).toHaveAttribute(
            'aria-label',
            'June 2025, selected'
        )
        expect(getMonthCell(2025, 6)).toHaveAttribute('aria-label', 'July 2025')
    })

    it('gives the year navigation buttons their exact accessible names and keeps them focusable', async () => {
        const { user } = render(
            <DateRangePicker
                granularity="month"
                value={JUNE_2025_RANGE}
                onChange={vi.fn()}
            />
        )

        await user.click(getRangeTrigger())
        await waitForMonthGrid()

        const prevYear = screen.getByRole('button', { name: 'Previous year' })
        const nextYear = screen.getByRole('button', { name: 'Next year' })
        expect(prevYear).toBeInTheDocument()
        expect(nextYear).toBeInTheDocument()
        expect(prevYear).not.toHaveAttribute('tabIndex', '-1')
        expect(nextYear).not.toHaveAttribute('tabIndex', '-1')
    })

    it('marks a month disabled by minDate with aria-disabled="true"', async () => {
        const { user } = render(
            <DateRangePicker
                granularity="month"
                value={JUNE_2025_RANGE}
                onChange={vi.fn()}
                minDate={new Date(2025, 5, 1)}
            />
        )

        await user.click(getRangeTrigger())
        await waitForMonthGrid()

        expect(getMonthCell(2025, 4)).toHaveAttribute('aria-disabled', 'true')
        expect(getMonthCell(2025, 5)).toHaveAttribute('aria-disabled', 'false')
    })
})
