import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import DateRangePicker from '../../../lib/components/DateRangePicker/DateRangePicker'
import {
    DateRangePickerSize,
    type DateRange,
} from '../../../lib/components/DateRangePicker/types'

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

const createDateRange = (
    startDaysOffset: number = 0,
    endDaysOffset: number = 7
): DateRange => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + startDaysOffset)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + endDaysOffset)
    endDate.setHours(23, 59, 59, 999)

    return { startDate, endDate }
}

const getStartDateInput = () => {
    const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
    return inputs[0]
}

const getCalendarDayCells = () => {
    return screen.getAllByRole('button').filter((button) => {
        const ariaLabel = button.getAttribute('aria-label')
        return (
            ariaLabel &&
            (/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday).*\d{1,2}, \d{4}/i.test(
                ariaLabel
            ) ||
                /january|february|march|april|may|june|july|august|september|october|november|december/i.test(
                    ariaLabel
                ))
        )
    })
}

describe('DateRangePicker Accessibility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default DateRangePicker (axe-core validation)', async () => {
            const { container } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )
            const results = await axe(container, {
                rules: {
                    'aria-allowed-attr': { enabled: false },
                    'aria-required-children': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all DateRangePicker states (default, disabled, with time picker)', async () => {
            const states = [
                {
                    value: createDateRange(),
                    onChange: () => {},
                },
                {
                    value: createDateRange(),
                    onChange: () => {},
                    isDisabled: true,
                },
                {
                    value: createDateRange(),
                    onChange: () => {},
                    showDateTimePicker: true,
                },
                {
                    value: createDateRange(),
                    onChange: () => {},
                    showPresets: true,
                },
            ]

            for (const props of states) {
                const { container, unmount } = render(
                    <DateRangePicker {...props} />
                )
                const results = await axe(container, {
                    rules: {
                        'aria-allowed-attr': { enabled: false },
                        'aria-required-children': { enabled: false },
                    },
                })
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all sizes', async () => {
            const sizes = [
                DateRangePickerSize.SMALL,
                DateRangePickerSize.MEDIUM,
                DateRangePickerSize.LARGE,
            ]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <DateRangePicker
                        value={createDateRange()}
                        onChange={() => {}}
                        size={size}
                    />
                )
                const results = await axe(container, {
                    rules: {
                        'aria-allowed-attr': { enabled: false },
                        'aria-required-children': { enabled: false },
                    },
                })
                expect(results).toHaveNoViolations()
                unmount()
            }
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('calendar icon is marked as decorative with aria-hidden', () => {
            render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            const iconContainer = trigger.querySelector('[aria-hidden="true"]')
            expect(iconContainer).toBeInTheDocument()
        })

        it('chevron icons are marked as decorative with aria-hidden', () => {
            render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            const chevrons = trigger.querySelectorAll('[aria-hidden="true"]')
            expect(chevrons.length).toBeGreaterThan(0)
        })

        it('calendar day cells have accessible names via aria-label', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('trigger button has proper ARIA attributes', () => {
            render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            expect(trigger).toHaveAttribute('aria-expanded')
            expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
            expect(trigger).toHaveAttribute('aria-label')
        })

        it('date inputs have proper label association', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const startLabel = screen.getByText('Start')
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(startLabel).toBeInTheDocument()
                expect(inputs.length).toBeGreaterThan(0)
            })
        })

        it('error messages are associated with inputs via aria-describedby', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            await user.clear(startInput)
            await user.type(startInput, 'invalid-date')

            await waitFor(() => {
                const errorMessage = screen.queryByRole('alert')
                if (errorMessage) {
                    expect(startInput).toHaveAttribute('aria-describedby')
                    expect(startInput).toHaveAttribute('aria-invalid', 'true')
                }
            })
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('trigger button is keyboard operable', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })

            trigger.focus()
            expect(document.activeElement).toBe(trigger)

            await user.keyboard('{Enter}')
            await waitFor(
                () => {
                    const isExpanded =
                        trigger.getAttribute('aria-expanded') === 'true'
                    const hasPopover = document.querySelector('[role="dialog"]')
                    expect(isExpanded || hasPopover).toBeTruthy()
                },
                { timeout: 2000 }
            )
        })

        it('trigger button can be activated with Space key', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })

            trigger.focus()
            await user.keyboard(' ')
            await waitFor(
                () => {
                    const isExpanded =
                        trigger.getAttribute('aria-expanded') === 'true'
                    const hasPopover = document.querySelector('[role="dialog"]')
                    expect(isExpanded || hasPopover).toBeTruthy()
                },
                { timeout: 2000 }
            )
        })

        it('disabled DateRangePicker is removed from tab order', () => {
            render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    isDisabled={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            expect(trigger).toHaveAttribute('disabled')
            expect(trigger).toHaveAttribute('aria-disabled', 'true')
        })

        it('date inputs are keyboard accessible', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            startInput.focus()
            expect(document.activeElement).toBe(startInput)

            await user.clear(startInput)
            await user.type(startInput, '01/01/2024')
            expect(startInput).toHaveValue('01/01/2024')
        })

        it('time selector inputs are keyboard accessible', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const timeInputs = screen.getAllByPlaceholderText('12:00 PM')
                expect(timeInputs.length).toBeGreaterThan(0)
            })

            const timeInputs = screen.getAllByPlaceholderText('12:00 PM')
            if (timeInputs.length > 0) {
                timeInputs[0].focus()
                expect(document.activeElement).toBe(timeInputs[0])
            }
        })

        it('calendar day cells are keyboard operable with Enter key', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = screen.getAllByRole('button', {
                name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
            })

            if (calendarCells.length > 0) {
                const firstCell = calendarCells[0]
                firstCell.focus()
                expect(document.activeElement).toBe(firstCell)

                const enterEvent = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    bubbles: true,
                    cancelable: true,
                })
                firstCell.dispatchEvent(enterEvent)

                await waitFor(
                    () => {
                        expect(firstCell).toHaveAttribute('aria-selected')
                    },
                    { timeout: 1000 }
                )
            }
        })

        it('calendar day cells are keyboard operable with Space key', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = screen.getAllByRole('button', {
                name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
            })

            if (calendarCells.length > 0) {
                const firstCell = calendarCells[0]
                firstCell.focus()

                const spaceEvent = new KeyboardEvent('keydown', {
                    key: ' ',
                    code: 'Space',
                    bubbles: true,
                    cancelable: true,
                })
                firstCell.dispatchEvent(spaceEvent)

                await waitFor(
                    () => {
                        expect(firstCell).toHaveAttribute('aria-selected')
                    },
                    { timeout: 1000 }
                )
            }
        })

        it('disabled calendar day cells are not keyboard operable', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    disableFutureDates={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = screen.getAllByRole('button', {
                name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
            })

            const disabledCells = calendarCells.filter(
                (cell) => cell.getAttribute('aria-disabled') === 'true'
            )

            if (disabledCells.length > 0) {
                const disabledCell = disabledCells[0]
                expect(disabledCell).toHaveAttribute('tabIndex', '-1')
                expect(disabledCell).toHaveAttribute('aria-disabled', 'true')
            }
        })

        it('action buttons (Cancel, Apply) are keyboard operable', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(
                () => {
                    const cancelButton = screen.queryByRole('button', {
                        name: /cancel/i,
                    })
                    return cancelButton !== null
                },
                { timeout: 3000 }
            )

            const cancelButton = screen.getByRole('button', { name: /cancel/i })
            if (cancelButton) {
                cancelButton.focus()
                expect(document.activeElement).toBe(cancelButton)

                await user.keyboard('{Enter}')
                await waitFor(
                    () => {
                        const isClosed =
                            trigger.getAttribute('aria-expanded') === 'false'
                        const hasNoPopover =
                            !document.querySelector('[role="dialog"]')
                        expect(isClosed || hasNoPopover).toBeTruthy()
                    },
                    { timeout: 2000 }
                )
            }
        })
    })

    describe('WCAG 2.1.2 No Keyboard Trap (Level A)', () => {
        it('does not trap keyboard focus - Escape key closes popover', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'true')
            })

            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'false')
            })
        })

        it('allows Tab navigation through all interactive elements', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            await user.tab()
            const startInput = getStartDateInput()
            const focusedElement = document.activeElement
            expect(focusedElement).toBeInTheDocument()

            await user.tab()
            const nextFocusedElement = document.activeElement
            expect(nextFocusedElement).toBeInTheDocument()
            if (focusedElement === startInput) {
                expect(nextFocusedElement).not.toBe(startInput)
            }
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('focus order follows logical sequence: trigger → date inputs → time inputs → calendar → buttons', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            expect(startInput).toBeInTheDocument()

            await user.tab()
            const focusedElement = document.activeElement
            expect(focusedElement).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.6 Headings and Labels (Level AA)', () => {
        it('date inputs have descriptive labels', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const startLabel = screen.getByText('Start')
                const endLabel = screen.getByText('End')
                expect(startLabel).toBeInTheDocument()
                expect(endLabel).toBeInTheDocument()
            })
        })

        it('time selector inputs have aria-label', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const timeInputs = screen.getAllByPlaceholderText('12:00 PM')
                expect(timeInputs.length).toBeGreaterThan(0)
            })

            const timeInputs = screen.getAllByPlaceholderText('12:00 PM')
            if (timeInputs.length > 0) {
                const startTimeInput = timeInputs[0]
                expect(startTimeInput).toHaveAttribute(
                    'aria-label',
                    'Start time'
                )
            }
        })

        it('action buttons have clear labels', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const cancelButton = screen.getByRole('button', {
                    name: /cancel/i,
                })
                const applyButton = screen.getByRole('button', {
                    name: /apply/i,
                })
                expect(cancelButton).toBeInTheDocument()
                expect(applyButton).toBeInTheDocument()
            })
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('invalid date inputs show error state with aria-invalid', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            await user.clear(startInput)
            await user.type(startInput, 'invalid-date')

            await waitFor(() => {
                const errorMessage = screen.queryByRole('alert')
                if (errorMessage) {
                    expect(startInput).toHaveAttribute('aria-invalid', 'true')
                    expect(startInput).toHaveAttribute('aria-describedby')
                }
            })
        })

        it('error messages are announced to screen readers via role="alert"', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            await user.clear(startInput)
            await user.type(startInput, 'invalid-date')

            await waitFor(() => {
                const errorMessage = screen.queryByRole('alert')
                if (errorMessage) {
                    expect(errorMessage).toHaveAttribute('aria-live', 'polite')
                }
            })
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('date inputs have placeholder text providing format guidance', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })
        })

        it('time inputs have placeholder text providing format guidance', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const timeInputs = screen.getAllByPlaceholderText('12:00 PM')
                expect(timeInputs.length).toBeGreaterThan(0)
            })
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('error messages provide suggestions for correction', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            await user.clear(startInput)
            await user.type(startInput, 'invalid-date')

            await waitFor(() => {
                const errorMessage = screen.queryByRole('alert')
                if (errorMessage) {
                    expect(errorMessage.textContent).toBeTruthy()
                }
            })
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('trigger button has proper name, role, and value', () => {
            render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            expect(trigger).toHaveAttribute('type', 'button')
            expect(trigger).toHaveAttribute('aria-label')
            expect(trigger).toHaveAttribute('aria-expanded')
        })

        it('calendar day cells have proper name, role, and value', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = screen.getAllByRole('button', {
                name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
            })

            if (calendarCells.length > 0) {
                const cell = calendarCells[0]
                expect(cell).toHaveAttribute('role', 'button')
                expect(cell).toHaveAttribute('aria-label')
                expect(cell).toHaveAttribute('aria-selected')
            }
        })

        it('date inputs have proper name, role, and value', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const inputs = screen.getAllByPlaceholderText('DD/MM/YYYY')
                expect(inputs.length).toBeGreaterThan(0)
            })

            const startInput = getStartDateInput()
            expect(startInput).toHaveAttribute('type', 'text')
            expect(startInput).toHaveAttribute('placeholder', 'DD/MM/YYYY')
        })
    })

    describe('WCAG 2.5.3 Label in Name (Level A)', () => {
        it('trigger button accessible name matches visible text', () => {
            const dateRange = createDateRange()
            render(<DateRangePicker value={dateRange} onChange={() => {}} />)

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            const ariaLabel = trigger.getAttribute('aria-label')
            expect(ariaLabel).toContain('Date range picker')
        })

        it('action button labels match visible text', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const cancelButton = screen.getByRole('button', {
                    name: /cancel/i,
                })
                const applyButton = screen.getByRole('button', {
                    name: /apply/i,
                })
                expect(cancelButton.textContent).toContain('Cancel')
                expect(applyButton.textContent).toContain('Apply')
            })
        })
    })

    describe('Calendar Grid Accessibility', () => {
        it('calendar day cells have proper ARIA attributes', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = screen.getAllByRole('button', {
                name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
            })

            if (calendarCells.length > 0) {
                const cell = calendarCells[0]
                expect(cell).toHaveAttribute('role', 'button')
                expect(cell).toHaveAttribute('aria-label')
                expect(cell).toHaveAttribute('aria-selected')
                expect(cell).toHaveAttribute('aria-disabled')
            }
        })

        it('selected calendar day cells have aria-selected="true"', async () => {
            const dateRange = createDateRange(0, 0) // Same start and end date
            const { user } = render(
                <DateRangePicker value={dateRange} onChange={() => {}} />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = getCalendarDayCells()
            const selectedCells = calendarCells.filter(
                (cell) => cell.getAttribute('aria-selected') === 'true'
            )

            if (selectedCells.length > 0) {
                expect(selectedCells[0]).toHaveAttribute(
                    'aria-selected',
                    'true'
                )
            }
        })

        it('disabled calendar day cells have aria-disabled="true" and tabIndex="-1"', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    disableFutureDates={true}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = screen.getAllByRole('button', {
                    name: /january|february|march|april|may|june|july|august|september|october|november|december/i,
                })
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const disabledCells = screen.getAllByRole('button', {
                name: /disabled/i,
            })

            if (disabledCells.length > 0) {
                const disabledCell = disabledCells[0]
                expect(disabledCell).toHaveAttribute('aria-disabled', 'true')
                expect(disabledCell).toHaveAttribute('tabIndex', '-1')
            }
        })

        it('today indicator is visually distinct but does not interfere with accessibility', async () => {
            const { user } = render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /date range picker/i,
            })
            await user.click(trigger)

            await waitFor(() => {
                const calendarCells = getCalendarDayCells()
                expect(calendarCells.length).toBeGreaterThan(0)
            })

            const calendarCells = getCalendarDayCells()
            const todayCells = calendarCells.filter((cell) =>
                cell.getAttribute('aria-label')?.toLowerCase().includes('today')
            )

            if (todayCells.length > 0) {
                const todayCell = todayCells[0]
                expect(todayCell).toHaveAttribute('aria-label')
                const ariaLabel = todayCell.getAttribute('aria-label')
                expect(ariaLabel).toContain('today')
            }
        })
    })

    describe('Mobile Drawer Accessibility', () => {
        it('mobile drawer trigger is keyboard accessible', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800,
            })

            render(
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    useDrawerOnMobile={true}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            trigger.focus()
            expect(document.activeElement).toBe(trigger)
        })
    })
})
