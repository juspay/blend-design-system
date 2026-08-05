import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '../../test-utils'
import { axe } from 'jest-axe'
import { TimePicker } from '../../../lib/components/TimePicker'
import type { TimeValue } from '../../../lib/components/TimePicker/timePicker.types'

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

const COLUMN_NAMES = ['Hours', 'Minutes', 'Seconds', 'AM/PM'] as const

describe('TimePicker Accessibility', () => {
    describe('WCAG 2.1 compliance (axe-core)', () => {
        it('has no violations when closed', async () => {
            const { container } = render(<TimePicker value={t(14, 30)} />)
            expect(await axe(container)).toHaveNoViolations()
        })

        it('has no violations for the placeholder state', async () => {
            const { container } = render(<TimePicker />)
            expect(await axe(container)).toHaveNoViolations()
        })

        it('has no violations when disabled', async () => {
            const { container } = render(
                <TimePicker value={t(14, 30)} disabled />
            )
            expect(await axe(container)).toHaveNoViolations()
        })

        it('has no violations in the error state', async () => {
            const { container } = render(
                <TimePicker value={t(14, 30)} error errorMessage="Required" />
            )
            expect(await axe(container)).toHaveNoViolations()
        })

        it('has no violations when open', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            // The dropdown is portalled, so axe has to run against the body.
            expect(await axe(document.body)).toHaveNoViolations()
        })

        it('has no violations when open in 24h format with bounds', async () => {
            const { user } = render(
                <TimePicker
                    value={t(10, 30)}
                    format="24h"
                    minTime={t(9, 0)}
                    maxTime={t(17, 0)}
                    minuteStep={15}
                />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(await axe(document.body)).toHaveNoViolations()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value — trigger', () => {
        it('exposes popup semantics on the trigger', () => {
            render(<TimePicker value={t(14, 30)} />)
            const trigger = getTrigger()

            expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
            expect(trigger).toHaveAttribute('aria-label')
        })

        it('reflects the open state in aria-expanded', async () => {
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
        })

        it('names the trigger with the current value by default', () => {
            render(<TimePicker value={t(14, 30)} />)
            expect(getTrigger()).toHaveAttribute(
                'aria-label',
                'Time picker, 2:30 PM'
            )
        })

        it('lets a caller override the accessible name', () => {
            render(<TimePicker value={t(14, 30)} aria-label="Meeting time" />)
            expect(
                screen.getByRole('button', { name: 'Meeting time' })
            ).toBeInTheDocument()
        })

        it('marks the disabled trigger for assistive tech', () => {
            render(<TimePicker value={t(14, 30)} disabled />)
            const trigger = getTrigger()

            expect(trigger).toBeDisabled()
            expect(trigger).toHaveAttribute('aria-disabled', 'true')
        })

        it('marks the invalid trigger and links its description', () => {
            render(
                <TimePicker
                    value={t(14, 30)}
                    error
                    errorMessage="Pick a time inside business hours"
                />
            )
            const trigger = getTrigger()
            const alert = screen.getByRole('alert')

            expect(trigger).toHaveAttribute('aria-invalid', 'true')
            expect(trigger).toHaveAttribute('aria-describedby', alert.id)
            expect(alert).toHaveTextContent('Pick a time inside business hours')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships — dropdown', () => {
        it('exposes the columns as a named group, not a nested dialog', async () => {
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(
                screen.getByRole('group', { name: 'Choose time' })
            ).toBeInTheDocument()
        })

        it('renders exactly one dialog for the popup', async () => {
            // Radix's Popover.Content already is the dialog; a second one
            // nested inside made screen readers announce two popups.
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const dialogs = screen.getAllByRole('dialog')
            expect(dialogs).toHaveLength(1)
            expect(
                within(dialogs[0]).getByRole('group', { name: 'Choose time' })
            ).toBeInTheDocument()
        })

        it('labels every column via aria-labelledby', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            for (const name of COLUMN_NAMES) {
                const listbox = screen.getByRole('listbox', { name })
                const labelledBy = listbox.getAttribute('aria-labelledby')
                expect(labelledBy).toBeTruthy()

                const label = document.getElementById(labelledBy as string)
                expect(label).not.toBeNull()
                expect(label).toHaveTextContent(name)
            }
        })

        it('gives every column a unique label id across instances', async () => {
            const { user } = render(
                <>
                    <TimePicker value={t(9, 0)} aria-label="Start time" />
                    <TimePicker value={t(17, 0)} aria-label="End time" />
                </>
            )
            await user.click(screen.getByRole('button', { name: 'Start time' }))
            await screen.findByRole('listbox', { name: 'Hours' })
            const first = screen
                .getByRole('listbox', { name: 'Hours' })
                .getAttribute('aria-labelledby')

            await user.keyboard('{Escape}')
            await user.click(screen.getByRole('button', { name: 'End time' }))
            await screen.findByRole('listbox', { name: 'Hours' })
            const second = screen
                .getByRole('listbox', { name: 'Hours' })
                .getAttribute('aria-labelledby')

            expect(first).toBeTruthy()
            expect(second).toBeTruthy()
            expect(first).not.toBe(second)
        })

        it('uses listbox/option roles for every column', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            expect(screen.getAllByRole('listbox')).toHaveLength(4)
            for (const name of COLUMN_NAMES) {
                const options = within(
                    screen.getByRole('listbox', { name })
                ).getAllByRole('option')
                expect(options.length).toBeGreaterThan(0)
            }
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value — options', () => {
        it('gives every option an explicit aria-selected state', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            for (const name of COLUMN_NAMES) {
                const options = within(
                    screen.getByRole('listbox', { name })
                ).getAllByRole('option')

                for (const option of options) {
                    expect(option).toHaveAttribute('aria-selected')
                }

                const selected = options.filter(
                    (option) => option.getAttribute('aria-selected') === 'true'
                )
                expect(selected).toHaveLength(1)
            }
        })

        it('marks exactly the current value as selected', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const selectedIn = (name: (typeof COLUMN_NAMES)[number]) =>
                within(screen.getByRole('listbox', { name }))
                    .getAllByRole('option')
                    .find(
                        (option) =>
                            option.getAttribute('aria-selected') === 'true'
                    )

            expect(selectedIn('Hours')).toHaveTextContent('2')
            expect(selectedIn('Minutes')).toHaveTextContent('30')
            expect(selectedIn('Seconds')).toHaveTextContent('15')
            expect(selectedIn('AM/PM')).toHaveTextContent('PM')
        })

        it('marks out-of-bounds options as aria-disabled', async () => {
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

            const hours = within(
                screen.getByRole('listbox', { name: 'Hours' })
            ).getAllByRole('option')

            const disabledLabels = hours
                .filter(
                    (option) => option.getAttribute('aria-disabled') === 'true'
                )
                .map((option) => option.textContent)

            expect(disabledLabels).toEqual([
                '00',
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
            ])
        })

        it('never marks an option both selected and disabled', async () => {
            // A controlled value below minTime used to render its own option
            // as aria-selected *and* aria-disabled at the same time.
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

            for (const name of ['Hours', 'Minutes'] as const) {
                const options = within(
                    screen.getByRole('listbox', { name })
                ).getAllByRole('option')

                for (const option of options) {
                    if (option.getAttribute('aria-selected') === 'true') {
                        expect(option).not.toHaveAttribute('aria-disabled')
                    }
                }
            }
        })

        it('leaves in-bounds options free of aria-disabled', async () => {
            const { user } = render(
                <TimePicker value={t(10, 0)} format="24h" />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const hours = within(
                screen.getByRole('listbox', { name: 'Hours' })
            ).getAllByRole('option')

            for (const option of hours) {
                expect(option).not.toHaveAttribute('aria-disabled')
            }
        })
    })

    describe('WCAG 2.1.1 Keyboard — aria-activedescendant', () => {
        it('sets aria-activedescendant on every column', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            for (const name of COLUMN_NAMES) {
                const listbox = screen.getByRole('listbox', { name })
                const activeId = listbox.getAttribute('aria-activedescendant')

                expect(activeId).toBeTruthy()

                const active = document.getElementById(activeId as string)
                expect(active).not.toBeNull()
                expect(active).toHaveAttribute('role', 'option')
                expect(listbox).toContainElement(active)
            }
        })

        it('points aria-activedescendant at the selected option', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30)} format="24h" />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const listbox = screen.getByRole('listbox', { name: 'Hours' })
            const activeId = listbox.getAttribute('aria-activedescendant')
            const active = document.getElementById(activeId as string)

            expect(active).toHaveTextContent('14')
            expect(active).toHaveAttribute('aria-selected', 'true')
        })

        it('moves aria-activedescendant as the selection changes', async () => {
            const { user } = render(<TimePicker format="24h" />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const listbox = screen.getByRole('listbox', { name: 'Hours' })
            const before = listbox.getAttribute('aria-activedescendant')

            listbox.focus()
            await user.keyboard('{ArrowDown}')

            const after = screen
                .getByRole('listbox', { name: 'Hours' })
                .getAttribute('aria-activedescendant')
            expect(after).not.toBe(before)
            expect(document.getElementById(after as string)).not.toBeNull()
        })

        it('keeps aria-activedescendant on a selected option when nothing matches the step grid', async () => {
            // 30 is not on a 7-minute grid, so no option matches exactly. The
            // listbox still has to expose one selected option, and
            // aria-activedescendant has to point at that same option.
            const { user } = render(
                <TimePicker value={t(14, 30)} format="24h" minuteStep={7} />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            const listbox = screen.getByRole('listbox', { name: 'Minutes' })
            const activeId = listbox.getAttribute('aria-activedescendant')
            const active = document.getElementById(activeId as string)

            expect(active).not.toBeNull()
            expect(active).toHaveAttribute('aria-selected', 'true')
            // 28 is the nearest offered slot to :30 (0, 7, 14, 21, 28, ...).
            expect(active).toHaveTextContent('28')

            const selected = within(listbox)
                .getAllByRole('option')
                .filter(
                    (option) => option.getAttribute('aria-selected') === 'true'
                )
            expect(selected).toHaveLength(1)
            expect(selected[0]).toBe(active)
        })

        it('leaves an off-grid value untouched while showing the nearest option', async () => {
            // The nearest-option fallback is display only — snapping the value
            // would emit an onChange the user never asked for.
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(9, 30)}
                    minuteStep={7}
                    onChange={onChange}
                />
            )
            expect(getTrigger()).toHaveTextContent('9:30 AM')

            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Minutes' })

            expect(onChange).not.toHaveBeenCalled()
            expect(getTrigger()).toHaveTextContent('9:30 AM')
        })
    })

    describe('WCAG 2.1.1 Keyboard — focus', () => {
        it('makes every column a single tab stop', async () => {
            const { user } = render(
                <TimePicker value={t(14, 30, 15)} showSeconds />
            )
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            for (const name of COLUMN_NAMES) {
                expect(screen.getByRole('listbox', { name })).toHaveAttribute(
                    'tabindex',
                    '0'
                )
            }
        })

        it('leaves options out of the tab order', async () => {
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const options = within(
                screen.getByRole('listbox', { name: 'Hours' })
            ).getAllByRole('option')

            for (const option of options) {
                expect(option).not.toHaveAttribute('tabindex')
            }
        })

        it('accepts keyboard focus on a column', async () => {
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            const listbox = screen.getByRole('listbox', { name: 'Hours' })
            listbox.focus()
            expect(listbox).toHaveFocus()
        })

        it('closes the dropdown on Escape', async () => {
            const { user } = render(<TimePicker value={t(14, 30)} />)
            await user.click(getTrigger())
            await screen.findByRole('listbox', { name: 'Hours' })

            await user.keyboard('{Escape}')

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
        })
    })

    describe('WCAG 4.1.3 Status Messages', () => {
        it('announces the error message via a live region', () => {
            render(
                <TimePicker value={t(14, 30)} error errorMessage="Required" />
            )
            expect(screen.getByRole('alert')).toHaveTextContent('Required')
        })

        it('renders no live region when there is no error message', () => {
            render(<TimePicker value={t(14, 30)} />)
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })
})
