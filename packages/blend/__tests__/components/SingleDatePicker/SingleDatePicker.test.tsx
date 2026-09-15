import { useState } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent, within } from '../../test-utils'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import { DateFormatPreset } from '../../../lib/components/DateRangePicker/types'

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
const SEP_20 = new Date(2025, 8, 20)

const dayLabel = (date: Date) =>
    date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

// Calendar cells are role="button" + data-element="days" and live in a portal.
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

const waitForCalendar = async () =>
    waitFor(() => expect(getDayCells().length).toBeGreaterThan(0))

const openPicker = async (user: ReturnType<typeof render>['user']) => {
    await user.click(getTrigger())
    await waitForCalendar()
}

/** Mirrors the real controlled usage: parent owns the value. */
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

describe('SingleDatePicker', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Trigger rendering', () => {
        it('renders the default placeholder when value is undefined', () => {
            render(<SingleDatePicker value={undefined} onChange={vi.fn()} />)

            expect(getTrigger()).toHaveTextContent('Select date')
        })

        it('renders a custom placeholder when value is undefined', () => {
            render(
                <SingleDatePicker
                    value={undefined}
                    onChange={vi.fn()}
                    placeholder="Pick a day"
                />
            )

            expect(getTrigger()).toHaveTextContent('Pick a day')
        })

        it('renders the controlled value formatted in the trigger', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} />)

            expect(getTrigger()).toHaveTextContent('15/09/2025')
        })

        it('updates the trigger when the value prop changes', () => {
            const { rerender } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )
            expect(getTrigger()).toHaveTextContent('15/09/2025')

            rerender(<SingleDatePicker value={SEP_20} onChange={vi.fn()} />)
            expect(getTrigger()).toHaveTextContent('20/09/2025')
        })

        it('clears the trigger back to the placeholder when the value is removed', () => {
            const { rerender } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )
            expect(getTrigger()).toHaveTextContent('15/09/2025')

            rerender(
                <SingleDatePicker
                    value={undefined}
                    onChange={vi.fn()}
                    placeholder="Pick a day"
                />
            )
            expect(getTrigger()).toHaveTextContent('Pick a day')
        })
    })

    describe('Popover', () => {
        it('opens on trigger click and renders calendar day cells', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')

            await openPicker(user)

            expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
            expect(getDayCells().length).toBeGreaterThan(0)
            expect(getDayCell(SEP_15)).toHaveAttribute('aria-selected', 'true')
        })

        it('renders the draft readout with the committed value on open', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await openPicker(user)

            expect(getReadout()).toHaveTextContent('15/09/2025')
        })
    })

    describe('Selection (draft then apply)', () => {
        it('calls onChange once with the selected date on Apply', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={onChange} />
            )

            await openPicker(user)
            await user.click(getDayCell(SEP_20))

            expect(onChange).not.toHaveBeenCalled()

            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2025, 8, 20))
        })

        it('keeps the trigger on the committed value until the parent feeds it back', async () => {
            const onChange = vi.fn()
            const { user, rerender } = render(
                <SingleDatePicker value={SEP_15} onChange={onChange} />
            )

            await openPicker(user)
            await user.click(getDayCell(SEP_20))

            // Draft moved, committed value has not.
            expect(getReadout()).toHaveTextContent('20/09/2025')
            expect(getTrigger()).toHaveTextContent('15/09/2025')

            await user.click(screen.getByRole('button', { name: /apply/i }))

            // Still the old value — this component is fully controlled.
            expect(getTrigger()).toHaveTextContent('15/09/2025')

            rerender(
                <SingleDatePicker
                    value={onChange.mock.calls[0][0]}
                    onChange={onChange}
                />
            )
            expect(getTrigger()).toHaveTextContent('20/09/2025')
        })

        it('commits through a controlled parent', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <ControlledPicker initialValue={SEP_15} onChange={onChange} />
            )

            await openPicker(user)
            await user.click(getDayCell(SEP_20))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            await waitFor(() => {
                expect(getTrigger()).toHaveTextContent('20/09/2025')
            })
        })

        it('does not call onChange on Cancel and restores the draft from value', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={onChange} />
            )

            await openPicker(user)
            await user.click(getDayCell(SEP_20))
            expect(getReadout()).toHaveTextContent('20/09/2025')

            await user.click(screen.getByRole('button', { name: /cancel/i }))

            expect(onChange).not.toHaveBeenCalled()
            await waitFor(() => {
                expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
            })

            await openPicker(user)
            expect(getReadout()).toHaveTextContent('15/09/2025')
            expect(getDayCell(SEP_15)).toHaveAttribute('aria-selected', 'true')
        })

        it('disables Apply while there is nothing selected', async () => {
            const { user } = render(
                <SingleDatePicker value={undefined} onChange={vi.fn()} />
            )

            await openPicker(user)

            expect(
                screen.getByRole('button', { name: /apply/i })
            ).toBeDisabled()
        })
    })

    // `value` / `onChange` are optional, like DateRangePicker's and
    // TimePicker's. Without a `value` the component holds the committed date
    // itself; `onChange` is then pure notification.
    describe('uncontrolled (no value prop)', () => {
        // Nothing is selected on mount, so the calendar virtualises around
        // today — only today's cell is guaranteed to be in the DOM.
        const TODAY = new Date()
        const asDDMMYYYY = (date: Date) =>
            `${String(date.getDate()).padStart(2, '0')}/${String(
                date.getMonth() + 1
            ).padStart(2, '0')}/${date.getFullYear()}`

        it('renders without value or onChange', () => {
            render(<SingleDatePicker />)

            expect(getTrigger()).toHaveTextContent('Select date')
        })

        it('shows the applied date in the trigger and notifies onChange', async () => {
            const onChange = vi.fn()
            const { user } = render(<SingleDatePicker onChange={onChange} />)

            await openPicker(user)
            await user.click(getDayCell(TODAY))

            // Still the placeholder: the draft is not the committed value.
            expect(getTrigger()).toHaveTextContent('Select date')

            await user.click(screen.getByRole('button', { name: /apply/i }))

            await waitFor(() => {
                expect(getTrigger()).toHaveTextContent(asDDMMYYYY(TODAY))
            })
            expect(onChange).toHaveBeenCalledTimes(1)
        })

        it('restores the draft from the internally committed value on Cancel', async () => {
            const { user } = render(<SingleDatePicker />)

            await openPicker(user)
            await user.click(getDayCell(TODAY))
            await user.click(screen.getByRole('button', { name: /apply/i }))
            await waitFor(() => {
                expect(getTrigger()).toHaveTextContent(asDDMMYYYY(TODAY))
            })

            await openPicker(user)
            await user.click(screen.getByRole('button', { name: /cancel/i }))

            await waitFor(() => {
                expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
            })
            expect(getTrigger()).toHaveTextContent(asDDMMYYYY(TODAY))

            await openPicker(user)
            expect(getReadout()).toHaveTextContent(asDDMMYYYY(TODAY))
        })

        it('clears the internally committed value', async () => {
            const { user } = render(<SingleDatePicker allowClear />)

            await openPicker(user)
            await user.click(getDayCell(TODAY))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            const clear = await screen.findByRole('button', {
                name: 'Clear selection',
            })
            await user.click(clear)

            await waitFor(() => {
                expect(getTrigger()).toHaveTextContent('Select date')
            })
            expect(
                document.querySelector('[data-element="datepicker-clear"]')
            ).toBeNull()
        })
    })

    describe('minDate / maxDate clamping', () => {
        it('disables days before minDate and ignores clicks on them', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    minDate={new Date(2025, 8, 10)}
                />
            )

            await openPicker(user)

            expect(getDayCell(new Date(2025, 8, 9))).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getDayCell(new Date(2025, 8, 10))).toHaveAttribute(
                'aria-disabled',
                'false'
            )

            fireEvent.click(getDayCell(new Date(2025, 8, 9)))

            expect(getReadout()).toHaveTextContent('15/09/2025')
            expect(onChange).not.toHaveBeenCalled()
        })

        it('disables days after maxDate and ignores clicks on them', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    maxDate={new Date(2025, 8, 20)}
                />
            )

            await openPicker(user)

            expect(getDayCell(new Date(2025, 8, 21))).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getDayCell(new Date(2025, 8, 20))).toHaveAttribute(
                'aria-disabled',
                'false'
            )

            fireEvent.click(getDayCell(new Date(2025, 8, 21)))

            expect(getReadout()).toHaveTextContent('15/09/2025')
            expect(onChange).not.toHaveBeenCalled()
        })

        it('still allows selecting a day inside the range', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    minDate={new Date(2025, 8, 10)}
                    maxDate={new Date(2025, 8, 20)}
                />
            )

            await openPicker(user)
            await user.click(getDayCell(new Date(2025, 8, 18)))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledWith(new Date(2025, 8, 18))
        })
    })

    describe('disableDates', () => {
        it('disables the days matched by the predicate', async () => {
            const disableDates = vi.fn(
                (date: Date) => date.getMonth() === 8 && date.getDate() === 17
            )
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    disableDates={disableDates}
                />
            )

            await openPicker(user)

            expect(getDayCell(new Date(2025, 8, 17))).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getDayCell(new Date(2025, 8, 18))).toHaveAttribute(
                'aria-disabled',
                'false'
            )
            expect(disableDates).toHaveBeenCalled()
        })

        it('ignores clicks on a predicate-disabled day', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    disableDates={(date) => date.getDate() === 17}
                />
            )

            await openPicker(user)
            fireEvent.click(getDayCell(new Date(2025, 8, 17)))

            expect(getReadout()).toHaveTextContent('15/09/2025')
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('allowClear', () => {
        it('does not render the clear affordance without allowClear', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} />)

            expect(
                document.querySelector('[data-element="datepicker-clear"]')
            ).toBeNull()
        })

        it('does not render the clear affordance without a value', () => {
            render(
                <SingleDatePicker
                    value={undefined}
                    onChange={vi.fn()}
                    allowClear
                />
            )

            expect(
                document.querySelector('[data-element="datepicker-clear"]')
            ).toBeNull()
        })

        it('renders the clear affordance when there is a value', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    allowClear
                />
            )

            expect(
                document.querySelector('[data-element="datepicker-clear"]')
            ).toBeInTheDocument()
        })

        it('calls onChange(undefined) and does not open the popover on clear', async () => {
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

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(undefined)
            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
            expect(getDayCells()).toHaveLength(0)
        })

        it('drops the clear affordance once the parent commits the cleared value', async () => {
            const { user } = render(
                <ControlledPicker initialValue={SEP_15} allowClear />
            )

            await user.click(
                screen.getByRole('button', { name: 'Clear selection' })
            )

            await waitFor(() => {
                expect(
                    document.querySelector('[data-element="datepicker-clear"]')
                ).toBeNull()
            })
            expect(getTrigger()).toHaveTextContent('Select date')
        })
    })

    describe('disabled', () => {
        it('marks the trigger disabled and does not open the popover', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} disabled />
            )

            const trigger = getTrigger()
            expect(trigger).toBeDisabled()
            expect(trigger).toHaveAttribute('aria-disabled', 'true')

            await user.click(trigger)

            expect(trigger).toHaveAttribute('aria-expanded', 'false')
            expect(getDayCells()).toHaveLength(0)
        })

        it('does not render the clear affordance when disabled', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    allowClear
                    disabled
                />
            )

            expect(
                document.querySelector('[data-element="datepicker-clear"]')
            ).toBeNull()
        })
    })

    describe('error state', () => {
        it('renders the error message with role="alert"', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    error
                    errorMessage="Pick a valid date"
                />
            )

            const alert = screen.getByRole('alert')
            expect(alert).toHaveTextContent('Pick a valid date')
        })

        it('does not render an alert without an errorMessage', () => {
            render(<SingleDatePicker value={SEP_15} onChange={vi.fn()} error />)

            expect(screen.queryByRole('alert')).toBeNull()
        })
    })

    describe('showTime', () => {
        it('does not render time columns when showTime is false', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} />
            )

            await openPicker(user)

            expect(screen.queryAllByRole('listbox')).toHaveLength(0)
        })

        it('renders hour, minute and AM/PM columns in 12h format', async () => {
            const { user } = render(
                <SingleDatePicker value={SEP_15} onChange={vi.fn()} showTime />
            )

            await openPicker(user)

            expect(screen.getAllByRole('listbox')).toHaveLength(3)
            expect(
                screen.getByRole('listbox', { name: 'Hours' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('listbox', { name: 'Minutes' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('listbox', { name: 'AM/PM' })
            ).toBeInTheDocument()
            expect(
                screen.queryByRole('listbox', { name: 'Seconds' })
            ).toBeNull()
        })

        it('drops the AM/PM column in 24h format', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                />
            )

            await openPicker(user)

            expect(screen.getAllByRole('listbox')).toHaveLength(2)
            expect(screen.queryByRole('listbox', { name: 'AM/PM' })).toBeNull()
        })

        it('adds the seconds column when showSeconds is set', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                    showSeconds
                />
            )

            await openPicker(user)

            expect(screen.getAllByRole('listbox')).toHaveLength(3)
            expect(
                screen.getByRole('listbox', { name: 'Seconds' })
            ).toBeInTheDocument()
        })

        it('applies the chosen time-of-day to the committed date', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    showTime
                    timeFormat="24h"
                />
            )

            await openPicker(user)

            await user.click(
                within(
                    screen.getByRole('listbox', { name: 'Hours' })
                ).getByRole('option', { name: '14' })
            )
            await user.click(
                within(
                    screen.getByRole('listbox', { name: 'Minutes' })
                ).getByRole('option', { name: '45' })
            )
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(new Date(2025, 8, 15, 14, 45))
        })

        it('carries the chosen time over to a newly picked day', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={onChange}
                    showTime
                    timeFormat="24h"
                />
            )

            await openPicker(user)

            await user.click(
                within(
                    screen.getByRole('listbox', { name: 'Hours' })
                ).getByRole('option', { name: '09' })
            )
            await user.click(getDayCell(SEP_20))
            await user.click(screen.getByRole('button', { name: /apply/i }))

            expect(onChange).toHaveBeenCalledWith(new Date(2025, 8, 20, 9, 0))
        })

        it('shows the selected time in the trigger', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={new Date(2025, 8, 15, 8, 30)}
                    onChange={vi.fn()}
                    showTime
                />
            )

            expect(getTrigger()).toHaveTextContent('15/09/2025 8:30 AM')

            await openPicker(user)
            expect(
                screen.getByRole('listbox', { name: 'AM/PM' })
            ).toBeInTheDocument()
        })

        it('bounds the selectable time on the maxDate boundary day', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                    maxDate={new Date(2025, 8, 15, 10, 0)}
                />
            )

            await openPicker(user)

            const hours = screen.getByRole('listbox', { name: 'Hours' })
            expect(
                within(hours).getByRole('option', { name: '14' })
            ).toHaveAttribute('aria-disabled', 'true')
            expect(
                within(hours).getByRole('option', { name: '09' })
            ).not.toHaveAttribute('aria-disabled')
        })

        it('disables the time columns while nothing is selected', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={undefined}
                    onChange={vi.fn()}
                    showTime
                />
            )

            await openPicker(user)

            expect(
                screen.getByRole('listbox', { name: 'Hours' })
            ).toHaveAttribute('aria-disabled', 'true')
        })
    })

    describe('formatting', () => {
        it('honours dateFormat in the trigger', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    dateFormat="yyyy-MM-dd"
                />
            )

            expect(getTrigger()).toHaveTextContent('2025-09-15')
        })

        it('honours dateFormat in the popover readout', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    dateFormat="yyyy-MM-dd"
                />
            )

            await openPicker(user)

            expect(getReadout()).toHaveTextContent('2025-09-15')
        })

        it('honours formatConfig in the trigger', () => {
            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    formatConfig={{ preset: DateFormatPreset.LONG_SINGLE }}
                />
            )

            expect(getTrigger()).toHaveTextContent('September 15th, 2025')
        })

        it('includes the time in the trigger when formatConfig is combined with showTime', () => {
            render(
                <SingleDatePicker
                    value={new Date(2025, 8, 15, 14, 45)}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                    formatConfig={{ preset: DateFormatPreset.LONG_SINGLE }}
                />
            )

            // `showTime` / `timeFormat` seed `includeTime` / `timeFormat`, so
            // the trigger reflects the time selector the popover renders.
            expect(getTrigger()).toHaveTextContent('14:45')
        })

        it('lets formatConfig override the component time props', () => {
            const { rerender } = render(
                <SingleDatePicker
                    value={new Date(2025, 8, 15, 14, 45)}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                    formatConfig={{
                        preset: DateFormatPreset.LONG_SINGLE,
                        timeFormat: '12h',
                    }}
                />
            )

            expect(getTrigger()).toHaveTextContent('2:45 PM')

            rerender(
                <SingleDatePicker
                    value={new Date(2025, 8, 15, 14, 45)}
                    onChange={vi.fn()}
                    showTime
                    timeFormat="24h"
                    formatConfig={{
                        preset: DateFormatPreset.LONG_SINGLE,
                        includeTime: false,
                    }}
                />
            )

            expect(getTrigger()).not.toHaveTextContent('14:45')
        })

        it('falls back to the placeholder when formatConfig is set but there is no value', () => {
            render(
                <SingleDatePicker
                    value={undefined}
                    onChange={vi.fn()}
                    placeholder="Pick a day"
                    formatConfig={{ preset: DateFormatPreset.LONG_SINGLE }}
                />
            )

            expect(getTrigger()).toHaveTextContent('Pick a day')
        })
    })

    describe('triggerConfig.renderTrigger', () => {
        it('renders the custom trigger and receives the picker payload', () => {
            const renderTrigger = vi.fn(
                ({
                    formattedValue,
                    onClick,
                }: {
                    formattedValue: string
                    onClick: () => void
                }) => (
                    <button type="button" onClick={onClick}>
                        Custom {formattedValue}
                    </button>
                )
            )

            render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    triggerConfig={{ renderTrigger }}
                />
            )

            expect(
                screen.getByRole('button', { name: 'Custom 15/09/2025' })
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="datepicker-selector"]')
            ).toBeNull()

            expect(renderTrigger).toHaveBeenCalledWith(
                expect.objectContaining({
                    selectedRange: { startDate: SEP_15 },
                    isOpen: false,
                    isDisabled: false,
                    formattedValue: '15/09/2025',
                    onClick: expect.any(Function),
                })
            )
        })

        it('opens the popover from the custom trigger', async () => {
            const { user } = render(
                <SingleDatePicker
                    value={SEP_15}
                    onChange={vi.fn()}
                    triggerConfig={{
                        renderTrigger: ({ onClick }) => (
                            <button type="button" onClick={onClick}>
                                Open
                            </button>
                        ),
                    }}
                />
            )

            await user.click(screen.getByRole('button', { name: 'Open' }))
            await waitForCalendar()

            expect(getDayCell(SEP_15)).toHaveAttribute('aria-selected', 'true')
        })
    })
})
