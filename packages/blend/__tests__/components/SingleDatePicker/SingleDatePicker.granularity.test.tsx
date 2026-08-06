import { describe, it, expect, vi, beforeEach } from 'vitest'
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

// Fixed dates only — the year grid depends on "today" for its upper bound
// (1940..currentYear+10), so pick target years well inside that range.
const JUN_10_2025 = new Date(2025, 5, 10)
const SEP_15_2025 = new Date(2025, 8, 15)

const getTrigger = () => screen.getByRole('button', { name: /^Date picker,/ })

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

const getYearCell = (year: number): HTMLElement => {
    const cell = document.querySelector(
        `[data-element="years"][data-id="${year}"]`
    )
    if (!cell) throw new Error(`No year cell found for ${year}`)
    return cell as HTMLElement
}

const getMonthYearLabel = () =>
    document.querySelector('[data-element="month-year"]') as HTMLElement

const waitForMonthGrid = async () =>
    waitFor(() => expect(getMonthCells().length).toBeGreaterThan(0))

const waitForYearGrid = async () =>
    waitFor(() => expect(getYearCells().length).toBeGreaterThan(0))

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
}

describe('SingleDatePicker granularity', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('month granularity', () => {
        it('calls onChange with the first day of the clicked month on Apply', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={JUN_10_2025}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            await user.click(getMonthCell(2025, 8))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2025, 8, 1))
        })

        it('highlights the month of a mid-month value as selected', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            const septemberCell = getMonthCell(2025, 8)
            expect(septemberCell).toHaveAttribute('data-state', 'selected')
        })

        it('advances the view year and re-renders month cells on Next year', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={JUN_10_2025}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            expect(getMonthYearLabel()).toHaveTextContent('2025')
            expect(
                document.querySelector(
                    '[data-element="months"][data-id="2026-0"]'
                )
            ).toBeNull()

            await user.click(screen.getByRole('button', { name: 'Next year' }))

            await waitFor(() => {
                expect(getMonthYearLabel()).toHaveTextContent('2026')
            })
            expect(getMonthCell(2026, 0)).toBeInTheDocument()
        })

        it('compares minDate at month resolution, leaving the boundary month enabled', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                    minDate={new Date(2025, 8, 15)}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            expect(getMonthCell(2025, 8)).toHaveAttribute(
                'data-status',
                'enabled'
            )
            expect(getMonthCell(2025, 7)).toHaveAttribute(
                'data-status',
                'disabled'
            )
        })

        it('compares maxDate at month resolution, leaving the boundary month enabled', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                    maxDate={new Date(2025, 8, 15)}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            expect(getMonthCell(2025, 8)).toHaveAttribute(
                'data-status',
                'enabled'
            )
            expect(getMonthCell(2025, 9)).toHaveAttribute(
                'data-status',
                'disabled'
            )
        })

        it('calls customDisableDates with the period first day, not an arbitrary day, and disables the matched month', async () => {
            const customDisableDates = vi.fn(
                (date: Date) =>
                    date.getTime() === new Date(2025, 9, 1).getTime()
            )
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                    disableDates={customDisableDates}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            expect(getMonthCell(2025, 9)).toHaveAttribute(
                'data-status',
                'disabled'
            )
            expect(
                customDisableDates.mock.calls.some(
                    ([date]) =>
                        date.getTime() === new Date(2025, 9, 1).getTime()
                )
            ).toBe(true)
        })
    })

    describe('keyboard navigation (month mode)', () => {
        it('moves focus between month cells with arrow keys', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            const septemberCell = getMonthCell(2025, 8)
            septemberCell.focus()
            expect(document.activeElement).toBe(septemberCell)

            await user.keyboard('{ArrowLeft}')
            const augustCell = getMonthCell(2025, 7)
            expect(document.activeElement).toBe(augustCell)

            await user.keyboard('{ArrowUp}')
            const aprilCell = getMonthCell(2025, 3)
            expect(document.activeElement).toBe(aprilCell)

            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(augustCell)

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(septemberCell)
        })

        it('does not move focus onto a disabled month', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    minDate={new Date(2025, 8, 1)}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            const septemberCell = getMonthCell(2025, 8)
            septemberCell.focus()
            await user.keyboard('{ArrowLeft}')

            expect(document.activeElement).toBe(septemberCell)
            expect(getMonthCell(2025, 7)).toHaveAttribute(
                'aria-disabled',
                'true'
            )
        })

        it('selects the focused cell on Enter and commits it on Apply', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            getMonthCell(2025, 8).focus()
            await user.keyboard('{ArrowRight}') // focus October
            await user.keyboard('{Enter}')

            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2025, 9, 1))
        })

        it('selects the focused cell on Space and commits it on Apply', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            getMonthCell(2025, 8).focus()
            await user.keyboard('{ArrowLeft}') // focus August
            await user.keyboard(' ')

            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2025, 7, 1))
        })
    })

    describe('empty picker keyboard entry', () => {
        it('gives an empty month picker a keyboard-reachable cell', async () => {
            const { user } = render(
                <SingleDatePicker granularity="month" onChange={vi.fn()} />
            )

            await openPicker(user)
            await waitForMonthGrid()

            expect(
                getMonthCells().some(
                    (cell) => cell.getAttribute('tabindex') === '0'
                )
            ).toBe(true)
        })

        it('starts an empty year picker at the current year for keyboard users', async () => {
            const { user } = render(
                <SingleDatePicker granularity="year" onChange={vi.fn()} />
            )

            await openPicker(user)
            await waitForYearGrid()

            expect(getYearCell(new Date().getFullYear())).toHaveAttribute(
                'tabindex',
                '0'
            )
        })
    })

    describe('cancel discards in-progress selection (month mode)', () => {
        it('discards a clicked month on Cancel and reopens showing the previously committed value', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            await user.click(getMonthCell(2025, 10)) // November — draft only
            await user.click(screen.getByRole('button', { name: /cancel/i }))

            expect(onChange).not.toHaveBeenCalled()
            expect(getTrigger()).toHaveTextContent('09/2025')

            await openPicker(user)
            await waitForMonthGrid()

            expect(getMonthCell(2025, 8)).toHaveAttribute(
                'data-state',
                'selected'
            )
            expect(getMonthCell(2025, 10)).toHaveAttribute(
                'data-state',
                'not selected'
            )
        })

        it('discards a clicked month on Cancel and reopens to the placeholder when there was no committed value', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    value={undefined}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            await user.click(getMonthCells()[0]) // any month — draft only, nothing committed
            await user.click(screen.getByRole('button', { name: /cancel/i }))

            expect(onChange).not.toHaveBeenCalled()
            expect(getTrigger()).toHaveTextContent('Select month')
        })
    })

    describe('showTime combined with month/year granularity', () => {
        it('suppresses time controls and commits the month at local midnight', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="month"
                    showTime
                    value={new Date(2025, 8, 15, 14, 30)}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForMonthGrid()

            expect(
                document.querySelector('[data-element="time-columns"]')
            ).not.toBeInTheDocument()
            expect(getMonthCells().length).toBeGreaterThan(0)

            await user.click(getMonthCell(2025, 9)) // October
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2025, 9, 1))
        })

        it('suppresses time controls in year mode without crashing', async () => {
            const { user } = render(
                <SingleDatePicker
                    granularity="year"
                    showTime
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                />
            )

            await openPicker(user)
            await waitForYearGrid()

            expect(
                document.querySelector('[data-element="time-columns"]')
            ).not.toBeInTheDocument()
            expect(getYearCells().length).toBeGreaterThan(0)
        })
    })

    describe('year granularity', () => {
        it('calls onChange with 1 January of the clicked year on Apply', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    granularity="year"
                    value={JUN_10_2025}
                    onChange={onChange}
                />
            )

            await openPicker(user)
            await waitForYearGrid()

            await user.click(getYearCell(2027))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2027, 0, 1))
        })
    })

    describe('default formatting', () => {
        it('formats the trigger as MM/yyyy in month mode', () => {
            render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('09/2025')
        })

        it('formats the trigger as yyyy in year mode', () => {
            render(
                <SingleDatePicker
                    granularity="year"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('2025')
        })

        it('lets an explicit dateFormat override the month-mode default', () => {
            render(
                <SingleDatePicker
                    granularity="month"
                    value={SEP_15_2025}
                    onChange={vi.fn()}
                    dateFormat="yyyy-MM"
                />
            )

            expect(getTrigger()).toHaveTextContent('2025-09')
        })
    })

    describe('default placeholder', () => {
        it('uses "Select month" in month mode without a value', () => {
            render(
                <SingleDatePicker
                    granularity="month"
                    value={undefined}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('Select month')
        })

        it('uses "Select year" in year mode without a value', () => {
            render(
                <SingleDatePicker
                    granularity="year"
                    value={undefined}
                    onChange={vi.fn()}
                />
            )

            expect(getTrigger()).toHaveTextContent('Select year')
        })

        it('lets an explicit placeholder override the month-mode default', () => {
            render(
                <SingleDatePicker
                    granularity="month"
                    value={undefined}
                    onChange={vi.fn()}
                    placeholder="Pick a month"
                />
            )

            expect(getTrigger()).toHaveTextContent('Pick a month')
        })
    })

    describe('day granularity (default)', () => {
        it('renders day cells and no month cells when granularity is omitted', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15_2025} onChange={vi.fn()} />
            )

            await openPicker(user)
            await waitFor(() => {
                expect(
                    document.querySelectorAll('[data-element="days"]').length
                ).toBeGreaterThan(0)
            })

            expect(getMonthCells()).toHaveLength(0)
        })
    })
})
