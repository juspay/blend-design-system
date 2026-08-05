import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import { DateRangePickerSize } from '../../../lib/components/DateRangePicker/types'

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

// The day cells use role="button" + aria-selected, and the time columns use
// listbox/option inside a div — both trip axe rules the design system knowingly
// accepts, exactly as the DateRangePicker suite does.
const AXE_RULES = {
    rules: {
        'aria-allowed-attr': { enabled: false },
        'aria-required-children': { enabled: false },
    },
}

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

describe('SingleDatePicker Accessibility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('WCAG 2.1 Compliance (axe-core)', () => {
        it('has no violations when closed', async () => {
            const { container } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            const results = await axe(container, AXE_RULES)
            expect(results).toHaveNoViolations()
        })

        it('has no violations when closed without a value', async () => {
            const { container } = render(
                <SingleDatePicker value={undefined} onChange={vi.fn()} />
            )

            const results = await axe(container, AXE_RULES)
            expect(results).toHaveNoViolations()
        })

        it('has no violations in the error state', async () => {
            const { container } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    error
                    errorMessage="Pick a valid date"
                />
            )

            const results = await axe(container, AXE_RULES)
            expect(results).toHaveNoViolations()
        })

        it('has no violations when disabled', async () => {
            const { container } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} disabled />
            )

            const results = await axe(container, AXE_RULES)
            expect(results).toHaveNoViolations()
        })

        it('has no violations for every size', async () => {
            const sizes = [
                DateRangePickerSize.SMALL,
                DateRangePickerSize.MEDIUM,
                DateRangePickerSize.LARGE,
            ]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <SingleDatePicker
                        value={SEP_15}
                        onChange={vi.fn()}
                        size={size}
                    />
                )
                const results = await axe(container, AXE_RULES)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('has no violations when the popover is open', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            // The calendar renders in a portal, so scope axe to the whole body.
            const results = await axe(document.body, AXE_RULES)
            expect(results).toHaveNoViolations()
        }, 20000)

        it('has no violations when the popover is open with the time columns', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} showTime />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            const results = await axe(document.body, AXE_RULES)
            expect(results).toHaveNoViolations()
        }, 20000)
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes the trigger as a dialog-opening button', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} />)

            const trigger = getTrigger()
            expect(trigger).toHaveAttribute('type', 'button')
            expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
            expect(trigger).toHaveAttribute(
                'aria-label',
                'Date picker, 15/09/2025'
            )
        })

        it('reflects the open state in aria-expanded', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            const trigger = getTrigger()
            await user.click(trigger)
            await waitForCalendar()

            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('names the popover surface without nesting a second dialog', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            // Radix's Popover.Content is already the dialog. The inner surface
            // is a named `group` — nesting a second dialog made screen readers
            // announce two dialogs for one popup.
            const dialogs = screen.getAllByRole('dialog')
            expect(dialogs).toHaveLength(1)

            const group = screen.getByRole('group', { name: 'Choose date' })
            expect(group).toBeInTheDocument()
            expect(dialogs[0]).toContainElement(group)
        })

        it('gives the clear affordance an accessible name', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    allowClear
                />
            )

            expect(
                screen.getByRole('button', { name: 'Clear selection' })
            ).toBeInTheDocument()
        })

        // Regression: the clear control used to be a role="button" span nested
        // inside the trigger <button>, which axe flags as `nested-interactive`
        // and screen readers cannot reach. It is now a DOM sibling overlaid on
        // the trigger's right edge.
        it('passes axe with allowClear and does not nest interactive controls', async () => {
            const { container } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    allowClear
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()

            const clear = screen.getByRole('button', {
                name: 'Clear selection',
            })
            expect(clear.closest('[data-element="datepicker-selector"]')).toBe(
                null
            )
        })

        it('clears without opening the popover', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    allowClear
                />
            )

            await user.click(
                screen.getByRole('button', { name: 'Clear selection' })
            )

            expect(onChange).toHaveBeenCalledWith(undefined)
            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('marks the trigger aria-invalid when error is set', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} error />)

            expect(getTrigger()).toHaveAttribute('aria-invalid', 'true')
        })

        it('omits aria-invalid when there is no error', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} />)

            expect(getTrigger()).not.toHaveAttribute('aria-invalid')
        })

        it('announces the error message via role="alert"', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    error
                    errorMessage="Pick a valid date"
                />
            )

            expect(screen.getByRole('alert')).toHaveTextContent(
                'Pick a valid date'
            )
        })

        it('associates the error message with the trigger via aria-describedby', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    error
                    errorMessage="Pick a valid date"
                />
            )

            const describedBy = getTrigger().getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()

            const description = document.getElementById(describedBy as string)
            expect(description).toHaveTextContent('Pick a valid date')
        })

        it('does not set aria-describedby without an error message', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} error />)

            expect(getTrigger()).not.toHaveAttribute('aria-describedby')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('exposes aria-disabled on out-of-range day cells', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    minDate={new Date(2025, 8, 10)}
                    maxDate={new Date(2025, 8, 20)}
                />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            expect(getDayCell(new Date(2025, 8, 9))).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getDayCell(new Date(2025, 8, 21))).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getDayCell(new Date(2025, 8, 15))).toHaveAttribute(
                'aria-disabled',
                'false'
            )
        })

        it('removes disabled day cells from the tab order', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    minDate={new Date(2025, 8, 10)}
                />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            expect(getDayCell(new Date(2025, 8, 9))).toHaveAttribute(
                'tabIndex',
                '-1'
            )
        })

        it('exposes the selected day via aria-selected', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            expect(getDayCell(SEP_15)).toHaveAttribute('aria-selected', 'true')
            expect(getDayCell(new Date(2025, 8, 16))).toHaveAttribute(
                'aria-selected',
                'false'
            )
        })

        it('labels every time column', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    showTime
                    showSeconds
                />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            for (const name of ['Hours', 'Minutes', 'Seconds', 'AM/PM']) {
                expect(
                    screen.getByRole('listbox', { name })
                ).toBeInTheDocument()
            }
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('reaches the trigger with Tab', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.tab()

            expect(document.activeElement).toBe(getTrigger())
        })

        it('opens the popover with Enter', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
            })
            await waitForCalendar()
        })

        it('opens the popover with Space', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.tab()
            await user.keyboard(' ')

            await waitFor(() => {
                expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
            })
            await waitForCalendar()
        })

        it('closes the popover with Escape', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
            })
        })

        it('removes the disabled trigger from the tab order', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} disabled />
            )

            const trigger = getTrigger()
            expect(trigger).toBeDisabled()
            expect(trigger).toHaveAttribute('aria-disabled', 'true')

            await user.tab()

            expect(document.activeElement).not.toBe(trigger)
        })

        it('makes the time columns keyboard focusable', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                />
            )

            await user.click(getTrigger())
            await waitForCalendar()

            const hours = screen.getByRole('listbox', { name: 'Hours' })
            expect(hours).toHaveAttribute('tabIndex', '0')
            expect(hours).toHaveAttribute('aria-activedescendant')
        })
    })
})
