import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '../../test-utils'
import { TimePicker } from '../../../lib/components/TimePicker'
import {
    TimePickerSize,
    type TimeValue,
} from '../../../lib/components/TimePicker/timePicker.types'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { getTimePickerLightTokens } from '../../../lib/components/TimePicker/timePicker.light.tokens'
import { getTimePickerDarkTokens } from '../../../lib/components/TimePicker/timePicker.dark.tokens'
import { getTimePickerTokens } from '../../../lib/components/TimePicker/timePicker.tokens'
import { Theme } from '../../../lib/context/theme.enum'

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

const t = (hours: number, minutes = 0, seconds = 0): TimeValue => ({
    hours,
    minutes,
    seconds,
})

const getTrigger = () => screen.getByRole('button', { name: /time picker/i })

const getColumn = (name: 'Hours' | 'Minutes' | 'Seconds' | 'AM/PM') =>
    screen.getByRole('listbox', { name })

const getOption = (
    column: 'Hours' | 'Minutes' | 'Seconds' | 'AM/PM',
    label: string
) => within(getColumn(column)).getByRole('option', { name: label })

describe('TimePicker', () => {
    describe('Trigger rendering', () => {
        it('renders the format-shaped placeholder when there is no value', () => {
            render(<TimePicker />)
            expect(getTrigger()).toHaveTextContent('hh:mm AM')
        })

        it('renders a seconds-aware placeholder when showSeconds is set', () => {
            render(<TimePicker showSeconds />)
            expect(getTrigger()).toHaveTextContent('hh:mm:ss AM')
        })

        it('renders a 24h placeholder for the 24h format', () => {
            render(<TimePicker format="24h" />)
            expect(getTrigger()).toHaveTextContent('HH:mm')
        })

        it('prefers an explicit placeholder', () => {
            render(<TimePicker placeholder="Pick a time" />)
            expect(getTrigger()).toHaveTextContent('Pick a time')
        })

        it('renders the controlled value in 12h format', () => {
            render(<TimePicker value={t(14, 30, 15)} />)
            expect(getTrigger()).toHaveTextContent('2:30 PM')
        })

        it('renders the controlled value in 24h format', () => {
            render(<TimePicker value={t(14, 30, 15)} format="24h" />)
            expect(getTrigger()).toHaveTextContent('14:30')
        })

        it('renders seconds in the trigger when showSeconds is set', () => {
            render(<TimePicker value={t(14, 30, 15)} showSeconds />)
            expect(getTrigger()).toHaveTextContent('2:30:15 PM')

            render(
                <TimePicker value={t(14, 30, 15)} format="24h" showSeconds />
            )
            expect(screen.getAllByRole('button')[1]).toHaveTextContent(
                '14:30:15'
            )
        })

        it('renders midnight and noon correctly in 12h format', () => {
            const { unmount } = render(<TimePicker value={t(0, 0, 0)} />)
            expect(getTrigger()).toHaveTextContent('12:00 AM')
            unmount()

            render(<TimePicker value={t(12, 0, 0)} />)
            expect(getTrigger()).toHaveTextContent('12:00 PM')
        })

        it('accepts a custom aria-label', () => {
            render(<TimePicker value={t(9, 0)} aria-label="Start time" />)
            expect(
                screen.getByRole('button', { name: 'Start time' })
            ).toBeInTheDocument()
        })

        it('renders each size without error', () => {
            for (const size of [
                TimePickerSize.SMALL,
                TimePickerSize.MEDIUM,
                TimePickerSize.LARGE,
            ]) {
                const { unmount } = render(
                    <TimePicker value={t(9, 0)} size={size} />
                )
                expect(getTrigger()).toBeInTheDocument()
                unmount()
            }
        })
    })

    describe('Popover', () => {
        it('is closed initially', () => {
            render(<TimePicker />)
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
        })

        it('opens on trigger click and renders the hour and minute listboxes', async () => {
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())

            expect(
                await screen.findByRole('listbox', { name: 'Hours' })
            ).toBeInTheDocument()
            expect(getColumn('Minutes')).toBeInTheDocument()
            expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
        })

        it('renders an AM/PM column only in the 12h format', async () => {
            const { user, unmount } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            expect(
                await screen.findByRole('listbox', { name: 'AM/PM' })
            ).toBeInTheDocument()
            unmount()

            const { user: user24 } = render(
                <TimePicker value={t(14, 30)} format="24h" />
            )
            await user24.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            expect(
                screen.queryByRole('listbox', { name: 'AM/PM' })
            ).not.toBeInTheDocument()
        })

        it('renders a seconds column only when showSeconds is set', async () => {
            const { user, unmount } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            expect(
                screen.queryByRole('listbox', { name: 'Seconds' })
            ).not.toBeInTheDocument()
            unmount()

            const { user: userSec } = render(
                <TimePicker value={t(14, 30)} showSeconds />
            )
            await userSec.click(getTrigger())
            expect(
                await screen.findByRole('listbox', { name: 'Seconds' })
            ).toBeInTheDocument()
            expect(screen.getAllByRole('listbox')).toHaveLength(4)
        })

        it('renders 12 hour options in 12h format and 24 in 24h format', async () => {
            const { user, unmount } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            expect(
                within(getColumn('Hours')).getAllByRole('option')
            ).toHaveLength(12)
            expect(
                within(getColumn('Hours')).getAllByRole('option')[0]
            ).toHaveTextContent('12')
            unmount()

            const { user: user24 } = render(
                <TimePicker value={t(14, 30)} format="24h" />
            )
            await user24.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            const options = within(getColumn('Hours')).getAllByRole('option')
            expect(options).toHaveLength(24)
            expect(options[0]).toHaveTextContent('00')
            expect(options[23]).toHaveTextContent('23')
        })

        it('marks the current value as selected in every column', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(getOption('Hours', '2')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('Minutes', '30')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('Seconds', '15')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('AM/PM', 'PM')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('AM/PM', 'AM')).toHaveAttribute(
                'aria-selected',
                'false'
            )
        })
    })

    describe('Selection', () => {
        it('emits the canonical 24h value when an hour is picked in 12h format', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker value={t(14, 30)} onChange={onChange} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.click(getOption('Hours', '3'))
            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith(t(15, 30, 0))
        })

        it('emits the raw hour in 24h format', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(14, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.click(getOption('Hours', '07'))
            expect(onChange).toHaveBeenCalledWith(t(7, 30, 0))
        })

        it('emits the new minute and keeps the rest of the value', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(14, 30, 15)}
                    showSeconds
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.click(getOption('Minutes', '45'))
            expect(onChange).toHaveBeenCalledWith(t(14, 45, 15))
        })

        it('emits the new second', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(14, 30, 15)}
                    showSeconds
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Seconds' })

            await user.click(getOption('Seconds', '05'))
            expect(onChange).toHaveBeenCalledWith(t(14, 30, 5))
        })

        it('flips the period while preserving the 12h hour', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker value={t(14, 30)} onChange={onChange} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'AM/PM' })

            await user.click(getOption('AM/PM', 'AM'))
            expect(onChange).toHaveBeenCalledWith(t(2, 30, 0))
        })

        it('maps 12 AM to midnight and 12 PM to noon', async () => {
            const onChange = vi.fn()
            const { user, unmount } = render(
                <TimePicker value={t(5, 0)} onChange={onChange} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await user.click(getOption('Hours', '12'))
            expect(onChange).toHaveBeenLastCalledWith(t(0, 0, 0))
            unmount()

            const onChangePm = vi.fn()
            const { user: userPm } = render(
                <TimePicker value={t(17, 0)} onChange={onChangePm} />
            )
            await userPm.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await userPm.click(getOption('Hours', '12'))
            expect(onChangePm).toHaveBeenLastCalledWith(t(12, 0, 0))
        })

        it('updates the trigger label in uncontrolled mode', async () => {
            const { user } = render(<TimePicker format="24h" />)
            expect(getTrigger()).toHaveTextContent('HH:mm')

            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await user.click(getOption('Hours', '09'))

            expect(getTrigger()).toHaveTextContent('09:00')
        })

        it('does not move the trigger label in controlled mode', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(14, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await user.click(getOption('Hours', '09'))

            expect(onChange).toHaveBeenCalledWith(t(9, 30, 0))
            expect(getTrigger()).toHaveTextContent('14:30')
        })
    })

    describe('Bounds', () => {
        it('disables hour options outside [minTime, maxTime]', async () => {
            const { user } = render(
                <TimePicker
                    value={t(10, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(getOption('Hours', '08')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('Hours', '18')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('Hours', '09')).not.toHaveAttribute(
                'aria-disabled'
            )
            expect(getOption('Hours', '17')).not.toHaveAttribute(
                'aria-disabled'
            )
        })

        it('disables minute options outside the bounds', async () => {
            const { user } = render(
                <TimePicker
                    value={t(9, 45)}
                    format="24h"
                    minTime={t(9, 30)}
                    maxTime={t(17, 0)}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            expect(getOption('Minutes', '00')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('Minutes', '29')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('Minutes', '30')).not.toHaveAttribute(
                'aria-disabled'
            )
        })

        it('disables the AM period when the bounds are afternoon-only', async () => {
            const { user } = render(
                <TimePicker value={t(14, 0)} minTime={t(13, 0)} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'AM/PM' })

            expect(getOption('AM/PM', 'AM')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('AM/PM', 'PM')).not.toHaveAttribute(
                'aria-disabled'
            )
        })

        it('does not fire onChange when a disabled option is clicked', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.click(getOption('Hours', '08'))
            await user.click(getOption('Hours', '18'))
            expect(onChange).not.toHaveBeenCalled()
        })

        it('clamps emitted values into the bounds', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 15)}
                    format="24h"
                    minTime={t(9, 30)}
                    maxTime={t(17, 0)}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            // 09:15 is below the 09:30 minimum, so it clamps up.
            await user.click(getOption('Hours', '09'))
            expect(onChange).toHaveBeenLastCalledWith(t(9, 30, 0))

            // 17:15 is above the 17:00 maximum, so it clamps down.
            await user.click(getOption('Hours', '17'))
            expect(onChange).toHaveBeenLastCalledWith(t(17, 0, 0))
        })

        it('starts an uncontrolled draft clamped into the bounds', async () => {
            const { user } = render(
                <TimePicker format="24h" minTime={t(9, 30)} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(getOption('Hours', '09')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('Minutes', '30')).toHaveAttribute(
                'aria-selected',
                'true'
            )
        })

        it('re-clamps the uncontrolled draft when the bounds move', async () => {
            // The "end time must be after start time" case: minTime arrives
            // after mount, and the draft must not stay on a disabled option.
            const { user, rerender } = render(<TimePicker format="24h" />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(getOption('Hours', '00')).toHaveAttribute(
                'aria-selected',
                'true'
            )

            rerender(<TimePicker format="24h" minTime={t(9, 30)} />)

            expect(getOption('Hours', '09')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('Minutes', '30')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('Hours', '00')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
        })

        it('leaves an in-bounds draft alone when the bounds move', async () => {
            const { user, rerender } = render(<TimePicker format="24h" />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await user.click(getOption('Hours', '14'))

            rerender(<TimePicker format="24h" minTime={t(9, 0)} />)

            expect(getOption('Hours', '14')).toHaveAttribute(
                'aria-selected',
                'true'
            )
        })
    })

    describe('Out-of-bounds controlled value', () => {
        it('clamps the trigger label into the bounds', () => {
            render(
                <TimePicker
                    value={t(3, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                />
            )
            expect(getTrigger()).toHaveTextContent('09:00')
        })

        it('clamps a value above the maximum', () => {
            render(
                <TimePicker
                    value={t(23, 45)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                />
            )
            expect(getTrigger()).toHaveTextContent('17:00')
        })

        it('form-posts the clamped value', () => {
            const { container } = render(
                <TimePicker
                    value={t(3, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    name="startTime"
                />
            )
            expect(
                container.querySelector<HTMLInputElement>(
                    'input[name="startTime"]'
                )
            ).toHaveValue('09:00')
        })

        it('selects the clamped option, not the out-of-bounds one', async () => {
            const { user } = render(
                <TimePicker
                    value={t(3, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(getOption('Hours', '09')).toHaveAttribute(
                'aria-selected',
                'true'
            )
            expect(getOption('Hours', '03')).toHaveAttribute(
                'aria-selected',
                'false'
            )
            expect(getOption('Hours', '03')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
        })

        it('does not write the clamp back through onChange', () => {
            const onChange = vi.fn()
            render(
                <TimePicker
                    value={t(3, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    onChange={onChange}
                />
            )
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('Bounds with seconds', () => {
        it('rounds minTime up to a whole minute when seconds are hidden', async () => {
            const { container, user } = render(
                <TimePicker
                    value={t(9, 0, 30)}
                    format="24h"
                    minTime={t(9, 0, 30)}
                    name="startTime"
                />
            )

            // 09:00:30 has no whole-minute representation, so the bound
            // tightens to 09:01 and the value follows it.
            expect(getTrigger()).toHaveTextContent('09:01')
            expect(
                container.querySelector<HTMLInputElement>(
                    'input[name="startTime"]'
                )
            ).toHaveValue('09:01')

            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            expect(getOption('Minutes', '00')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('Minutes', '01')).not.toHaveAttribute(
                'aria-disabled'
            )
            expect(getOption('Minutes', '01')).toHaveAttribute(
                'aria-selected',
                'true'
            )
        })

        it('rounds maxTime down to a whole minute when seconds are hidden', async () => {
            const { container, user } = render(
                <TimePicker
                    value={t(17, 0, 45)}
                    format="24h"
                    maxTime={t(17, 0, 45)}
                    name="endTime"
                />
            )

            expect(getTrigger()).toHaveTextContent('17:00')
            expect(
                container.querySelector<HTMLInputElement>(
                    'input[name="endTime"]'
                )
            ).toHaveValue('17:00')

            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            expect(getOption('Minutes', '00')).not.toHaveAttribute(
                'aria-disabled'
            )
            expect(getOption('Minutes', '01')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
        })

        it('honours second-level bounds exactly when showSeconds is set', async () => {
            const { container, user } = render(
                <TimePicker
                    value={t(9, 0, 30)}
                    format="24h"
                    showSeconds
                    minTime={t(9, 0, 30)}
                    name="startTime"
                />
            )

            expect(getTrigger()).toHaveTextContent('09:00:30')
            expect(
                container.querySelector<HTMLInputElement>(
                    'input[name="startTime"]'
                )
            ).toHaveValue('09:00:30')

            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Seconds' })

            // Minute 00 stays open because seconds 30-59 are still valid.
            expect(getOption('Minutes', '00')).not.toHaveAttribute(
                'aria-disabled'
            )
            expect(getOption('Seconds', '29')).toHaveAttribute(
                'aria-disabled',
                'true'
            )
            expect(getOption('Seconds', '30')).not.toHaveAttribute(
                'aria-disabled'
            )
        })

        it('emits only whole-minute values against a sub-minute bound', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 0)}
                    format="24h"
                    minTime={t(9, 0, 30)}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.click(getOption('Hours', '09'))
            expect(onChange).toHaveBeenLastCalledWith(t(9, 1, 0))
        })
    })

    describe('minuteStep', () => {
        it('controls the set of minute options', async () => {
            const { user } = render(
                <TimePicker value={t(9, 0)} format="24h" minuteStep={15} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            const options = within(getColumn('Minutes')).getAllByRole('option')
            expect(options).toHaveLength(4)
            expect(options.map((o) => o.textContent)).toEqual([
                '00',
                '15',
                '30',
                '45',
            ])
        })

        it('defaults to every minute', async () => {
            const { user } = render(<TimePicker value={t(9, 0)} format="24h" />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })
            expect(
                within(getColumn('Minutes')).getAllByRole('option')
            ).toHaveLength(60)
        })

        it('snaps off-grid minutes when another column changes', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 7)}
                    format="24h"
                    minuteStep={15}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.click(getOption('Hours', '11'))
            expect(onChange).toHaveBeenCalledWith(t(11, 0, 0))
        })

        it('never lets snapping override the hour the user picked', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(9, 55)}
                    format="24h"
                    minuteStep={15}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            // 09:55 rounds *up* to the next hour on a 15-minute grid; the
            // emitted value must stay on hour 10 and on an offered minute.
            await user.click(getOption('Hours', '10'))
            expect(onChange).toHaveBeenCalledWith(t(10, 45, 0))
        })

        it('only ever emits minutes that the minutes column offers', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    format="24h"
                    minuteStep={15}
                    minTime={t(9, 55)}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            const offered = within(getColumn('Minutes'))
                .getAllByRole('option')
                .map((option) => Number(option.textContent))

            await user.click(getOption('Hours', '11'))
            const emitted = onChange.mock.calls[0][0] as TimeValue
            expect(emitted.hours).toBe(11)
            expect(offered).toContain(emitted.minutes)
        })
    })

    describe('Disabled', () => {
        it('marks the trigger disabled', () => {
            render(<TimePicker value={t(9, 0)} disabled />)
            const trigger = getTrigger()
            expect(trigger).toBeDisabled()
            expect(trigger).toHaveAttribute('aria-disabled', 'true')
        })

        it('does not open the popover', async () => {
            const { user } = render(<TimePicker value={t(9, 0)} disabled />)
            await user.click(getTrigger())
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })

        it('does not fire onChange', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker value={t(9, 0)} disabled onChange={onChange} />
            )
            await user.click(getTrigger())
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('Error state', () => {
        it('marks the trigger invalid when error is set', () => {
            render(<TimePicker value={t(9, 0)} error />)
            expect(getTrigger()).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders the error message in a live region', () => {
            render(
                <TimePicker
                    value={t(9, 0)}
                    error
                    errorMessage="Time is required"
                />
            )
            const alert = screen.getByRole('alert')
            expect(alert).toHaveTextContent('Time is required')
        })

        it('links the error message to the trigger', () => {
            render(
                <TimePicker
                    value={t(9, 0)}
                    error
                    errorMessage="Time is required"
                />
            )
            const describedBy = getTrigger().getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()
            expect(screen.getByRole('alert')).toHaveAttribute(
                'id',
                describedBy as string
            )
        })

        it('renders no alert without an errorMessage', () => {
            render(<TimePicker value={t(9, 0)} error />)
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
            expect(getTrigger()).not.toHaveAttribute('aria-describedby')
        })
    })

    describe('Form integration', () => {
        it('emits no hidden input without a name', () => {
            const { container } = render(<TimePicker value={t(9, 5)} />)
            expect(
                container.querySelector('input[type="hidden"]')
            ).not.toBeInTheDocument()
        })

        it('emits an HH:mm hidden input', () => {
            const { container } = render(
                <TimePicker value={t(9, 5, 30)} name="startTime" />
            )
            const input = container.querySelector<HTMLInputElement>(
                'input[name="startTime"]'
            )
            expect(input).toHaveValue('09:05')
        })

        it('emits HH:mm:ss when showSeconds is set', () => {
            const { container } = render(
                <TimePicker value={t(9, 5, 30)} name="startTime" showSeconds />
            )
            expect(
                container.querySelector<HTMLInputElement>(
                    'input[name="startTime"]'
                )
            ).toHaveValue('09:05:30')
        })

        it('is empty until an uncontrolled selection is made', async () => {
            const { container, user } = render(
                <TimePicker name="startTime" format="24h" />
            )
            const selector = 'input[name="startTime"]'
            expect(
                container.querySelector<HTMLInputElement>(selector)
            ).toHaveValue('')

            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await user.click(getOption('Hours', '09'))

            expect(
                container.querySelector<HTMLInputElement>(selector)
            ).toHaveValue('09:00')
        })
    })

    describe('Responsive tokens', () => {
        // RFC 0003 requires >= 44x44px touch targets. `sm` is the touch
        // breakpoint, so its option rows must clear 44px even though the
        // pointer breakpoint keeps a denser 32px row.
        it.each([
            ['light', getTimePickerLightTokens],
            ['dark', getTimePickerDarkTokens],
        ])('gives %s sm options a 44px touch target', (_theme, getTokens) => {
            const tokens = getTokens(FOUNDATION_THEME)

            expect(tokens.sm.dropdown.option.height).toBe('44px')
            expect(tokens.lg.dropdown.option.height).toBe('32px')
        })

        it.each([
            ['light', getTimePickerLightTokens],
            ['dark', getTimePickerDarkTokens],
        ])(
            'does not share one object across %s breakpoints',
            (_t, getTokens) => {
                const tokens = getTokens(FOUNDATION_THEME)
                expect(tokens.sm).not.toBe(tokens.lg)
            }
        )
    })

    describe('Keyboard navigation', () => {
        const openAndFocus = async (
            column: 'Hours' | 'Minutes' | 'Seconds' | 'AM/PM'
        ) => {
            const listbox = getColumn(column)
            listbox.focus()
            expect(listbox).toHaveFocus()
            return listbox
        }

        it('moves the hour selection down with ArrowDown', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            await user.keyboard('{ArrowDown}')
            expect(onChange).toHaveBeenLastCalledWith(t(11, 30, 0))
        })

        it('moves the hour selection up with ArrowUp', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            await user.keyboard('{ArrowUp}')
            expect(onChange).toHaveBeenLastCalledWith(t(9, 30, 0))
        })

        it('jumps to the first and last option with Home and End', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            await user.keyboard('{Home}')
            expect(onChange).toHaveBeenLastCalledWith(t(0, 30, 0))

            await user.keyboard('{End}')
            expect(onChange).toHaveBeenLastCalledWith(t(23, 30, 0))
        })

        it('moves by five with PageDown and PageUp', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            await user.keyboard('{PageDown}')
            expect(onChange).toHaveBeenLastCalledWith(t(15, 30, 0))

            await user.keyboard('{PageUp}')
            expect(onChange).toHaveBeenLastCalledWith(t(5, 30, 0))
        })

        it('navigates the minute column independently', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    minuteStep={15}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })
            await openAndFocus('Minutes')

            await user.keyboard('{ArrowDown}')
            expect(onChange).toHaveBeenLastCalledWith(t(10, 45, 0))

            await user.keyboard('{End}')
            expect(onChange).toHaveBeenLastCalledWith(t(10, 45, 0))

            await user.keyboard('{Home}')
            expect(onChange).toHaveBeenLastCalledWith(t(10, 0, 0))
        })

        it('does not move past the ends of a column', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker value={t(0, 30)} format="24h" onChange={onChange} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            await user.keyboard('{ArrowUp}')
            expect(onChange).not.toHaveBeenCalled()
        })

        it('skips over out-of-bounds options', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(9, 0)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            // 08 and everything below it is disabled, so ArrowUp finds nothing.
            await user.keyboard('{ArrowUp}')
            expect(onChange).not.toHaveBeenCalled()

            // Home walks forward past the disabled 00-08 to land on 09.
            await user.keyboard('{Home}')
            expect(onChange).toHaveBeenLastCalledWith(t(9, 0, 0))

            // End walks backward past the disabled 18-23 to land on 17.
            await user.keyboard('{End}')
            expect(onChange).toHaveBeenLastCalledWith(t(17, 0, 0))
        })

        it('ignores keys it does not handle', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })
            await openAndFocus('Hours')

            await user.keyboard('{ArrowLeft}')
            await user.keyboard('a')
            expect(onChange).not.toHaveBeenCalled()
        })
    })
})

// The theme dispatch is what `initComponentTokens` actually calls; the light
// and dark factories above are only ever reached through it.
describe('getTimePickerTokens theme dispatch', () => {
    it('returns the dark tokens for Theme.DARK', () => {
        expect(getTimePickerTokens(FOUNDATION_THEME, Theme.DARK)).toEqual(
            getTimePickerDarkTokens(FOUNDATION_THEME)
        )
    })

    it("returns the dark tokens for the raw string 'dark'", () => {
        expect(getTimePickerTokens(FOUNDATION_THEME, 'dark')).toEqual(
            getTimePickerDarkTokens(FOUNDATION_THEME)
        )
    })

    it('returns the light tokens for Theme.LIGHT', () => {
        expect(getTimePickerTokens(FOUNDATION_THEME, Theme.LIGHT)).toEqual(
            getTimePickerLightTokens(FOUNDATION_THEME)
        )
    })

    it('defaults to the light tokens when no theme is passed', () => {
        expect(getTimePickerTokens(FOUNDATION_THEME)).toEqual(
            getTimePickerLightTokens(FOUNDATION_THEME)
        )
    })

    it('does not return the dark tokens by default', () => {
        expect(getTimePickerTokens(FOUNDATION_THEME)).not.toEqual(
            getTimePickerDarkTokens(FOUNDATION_THEME)
        )
    })
})
