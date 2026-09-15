import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test-utils'
import DateRangePicker from '../../../lib/components/DateRangePicker/DateRangePicker'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
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

// `useBreakpoints` reads `window.innerWidth` (jsdom pins it to 1024), so the
// mobile-drawer branch is unreachable without replacing the hook.
const mockViewport = { innerWidth: 1024, breakPointLabel: 'lg' }

vi.mock('../../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: () => mockViewport,
}))

const goMobile = () => {
    mockViewport.innerWidth = 375
    mockViewport.breakPointLabel = 'sm'
}

// Fixed dates only: the trigger label is asserted verbatim.
//
// Built with the LOCAL Date constructor, not a UTC ISO string. The trigger
// formats with local date parts when no `timezone` prop is given, so a
// UTC-anchored instant like 2025-01-08T23:59:59Z renders as "Jan 9" east of
// Greenwich and "Jan 8" west of it — which made these assertions pass under
// TZ=UTC and fail under TZ=Asia/Kolkata.
const FIXED_RANGE: DateRange = {
    startDate: new Date(2025, 0, 1, 0, 0, 0),
    endDate: new Date(2025, 0, 8, 23, 59, 59),
}

const FIXED_DATE = new Date(2025, 0, 1, 0, 0, 0)

const queryDefaultTrigger = () =>
    document.querySelector('[data-element="datepicker-selector"]')

const getDefaultTrigger = () => {
    const trigger = queryDefaultTrigger()
    expect(trigger).not.toBeNull()
    return trigger as HTMLElement
}

const expectPopoverOpen = async () => {
    await waitFor(() => {
        expect(
            screen.getAllByPlaceholderText('DD/MM/YYYY').length
        ).toBeGreaterThan(0)
    })
}

describe('renderPickerTrigger', () => {
    beforeEach(() => {
        mockViewport.innerWidth = 1024
        mockViewport.breakPointLabel = 'lg'
        vi.clearAllMocks()
    })

    // ---- Branch 1: triggerConfig.renderTrigger -----------------------------
    describe('custom render function (branch 1)', () => {
        it('replaces the default trigger with the caller markup', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerConfig={{
                        renderTrigger: ({ formattedValue }) => (
                            <button type="button">{formattedValue}</button>
                        ),
                    }}
                />
            )

            expect(
                screen.getByRole('button', { name: /1 Jan 2025|Jan/ })
            ).toBeInTheDocument()
            expect(queryDefaultTrigger()).toBeNull()
        })

        it('hands the caller a complete payload', () => {
            const renderTrigger = vi.fn(() => (
                <button type="button">Custom render</button>
            ))

            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerConfig={{ renderTrigger }}
                />
            )

            expect(renderTrigger).toHaveBeenCalled()
            const payload = renderTrigger.mock.calls[0][0] as unknown as {
                selectedRange: DateRange | undefined
                isOpen: boolean
                isDisabled: boolean
                formattedValue: string
                onClick: () => void
            }

            expect(payload.selectedRange).toEqual(FIXED_RANGE)
            expect(payload.isOpen).toBe(false)
            expect(payload.isDisabled).toBe(false)
            expect(typeof payload.formattedValue).toBe('string')
            expect(payload.formattedValue.length).toBeGreaterThan(0)
            expect(typeof payload.onClick).toBe('function')
        })

        it('reflects isDisabled in the payload', () => {
            const renderTrigger = vi.fn(() => (
                <button type="button">Custom render</button>
            ))

            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    isDisabled
                    triggerConfig={{ renderTrigger }}
                />
            )

            const payload = renderTrigger.mock.calls[0][0] as unknown as {
                isDisabled: boolean
            }
            expect(payload.isDisabled).toBe(true)
        })

        it('opens the popover through the supplied onClick', async () => {
            const { user } = render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerConfig={{
                        renderTrigger: ({ onClick }) => (
                            <button type="button" onClick={onClick}>
                                Custom render
                            </button>
                        ),
                    }}
                />
            )

            expect(screen.queryAllByPlaceholderText('DD/MM/YYYY')).toHaveLength(
                0
            )

            await user.click(
                screen.getByRole('button', { name: 'Custom render' })
            )

            await expectPopoverOpen()
        })
    })

    // ---- Branch 2: caller-supplied element ---------------------------------
    describe('caller-supplied element (branch 2)', () => {
        it('renders triggerElement instead of the default trigger', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerElement={<button type="button">Custom</button>}
                />
            )

            expect(
                screen.getByRole('button', { name: 'Custom' })
            ).toBeInTheDocument()
            expect(queryDefaultTrigger()).toBeNull()
        })

        it('still wires Radix asChild so the popover opens on click', async () => {
            const { user } = render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerElement={<button type="button">Custom</button>}
                />
            )

            expect(screen.queryAllByPlaceholderText('DD/MM/YYYY')).toHaveLength(
                0
            )

            await user.click(screen.getByRole('button', { name: 'Custom' }))

            await expectPopoverOpen()
        })

        it('renders triggerConfig.element the same way', async () => {
            const { user } = render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerConfig={{
                        element: <button type="button">Config element</button>,
                    }}
                />
            )

            expect(queryDefaultTrigger()).toBeNull()
            await user.click(
                screen.getByRole('button', { name: 'Config element' })
            )
            await expectPopoverOpen()
        })

        it('prefers triggerConfig.element over triggerElement', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerElement={<button type="button">From prop</button>}
                    triggerConfig={{
                        element: <button type="button">From config</button>,
                    }}
                />
            )

            expect(
                screen.getByRole('button', { name: 'From config' })
            ).toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: 'From prop' })
            ).not.toBeInTheDocument()
        })

        it('merges triggerConfig.style onto the wrapper', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerConfig={{
                        element: <button type="button">Styled</button>,
                        style: { width: '240px', backgroundColor: 'red' },
                    }}
                />
            )

            const wrapper = screen.getByRole('button', { name: 'Styled' })
                .parentElement as HTMLElement

            // `style` overrides the default `width: 100%` because it is spread last.
            expect(wrapper).toHaveStyle({
                width: '240px',
                backgroundColor: 'rgb(255, 0, 0)',
                cursor: 'pointer',
                opacity: '1',
            })
        })

        it('dims the wrapper and blocks the cursor when disabled', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    isDisabled
                    triggerElement={<button type="button">Custom</button>}
                />
            )

            const wrapper = screen.getByRole('button', { name: 'Custom' })
                .parentElement as HTMLElement

            expect(wrapper).toHaveStyle({
                opacity: '0.5',
                cursor: 'not-allowed',
                width: '100%',
            })
        })

        it('takes branch 2 for SingleDatePicker too', () => {
            render(
                <SingleDatePicker
                    value={FIXED_DATE}
                    onChange={() => {}}
                    triggerConfig={{
                        element: <button type="button">Single custom</button>,
                    }}
                />
            )

            expect(
                screen.getByRole('button', { name: 'Single custom' })
            ).toBeInTheDocument()
            expect(queryDefaultTrigger()).toBeNull()
        })

        it('loses to branch 1 when both are supplied', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerElement={<button type="button">Element</button>}
                    triggerConfig={{
                        renderTrigger: () => (
                            <button type="button">Render fn</button>
                        ),
                    }}
                />
            )

            expect(
                screen.getByRole('button', { name: 'Render fn' })
            ).toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: 'Element' })
            ).not.toBeInTheDocument()
        })
    })

    describe('foundation-token error fallback', () => {
        it('uses the provider foundation palette for light error borders', () => {
            const errorColor = '#c026d3'
            const customFoundation = {
                ...FOUNDATION_THEME,
                colors: {
                    ...FOUNDATION_THEME.colors,
                    red: {
                        ...FOUNDATION_THEME.colors.red,
                        500: errorColor,
                    },
                },
            }

            render(
                <ThemeProvider foundationTokens={customFoundation}>
                    <SingleDatePicker
                        value={FIXED_DATE}
                        onChange={() => {}}
                        error
                    />
                </ThemeProvider>
            )

            expect(getDefaultTrigger()).toHaveStyle(
                `border: 1px solid ${errorColor}`
            )
        })
    })

    // ---- Branch 3: mobile drawer -------------------------------------------
    describe('mobile drawer (branch 3)', () => {
        it('renders a plain secondary button, not the token-styled trigger', () => {
            goMobile()

            render(<DateRangePicker value={FIXED_RANGE} onChange={() => {}} />)

            expect(queryDefaultTrigger()).toBeNull()
            expect(
                screen.getByRole('button', { name: 'Jan 1, 25 - Jan 8, 25' })
            ).toBeInTheDocument()
        })

        it('opens the drawer when the button is clicked', async () => {
            goMobile()

            render(<DateRangePicker value={FIXED_RANGE} onChange={() => {}} />)

            expect(screen.queryByText('Today')).not.toBeInTheDocument()

            // userEvent.click throws inside a vaul Drawer under jsdom.
            fireEvent.click(
                screen.getByRole('button', { name: 'Jan 1, 25 - Jan 8, 25' })
            )

            await waitFor(() => {
                expect(screen.getByText('Today')).toBeInTheDocument()
            })
        })

        it('disables the drawer button when the picker is disabled', () => {
            goMobile()

            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    isDisabled
                />
            )

            expect(
                screen.getByRole('button', { name: 'Jan 1, 25 - Jan 8, 25' })
            ).toBeDisabled()
        })

        it('keeps the default trigger when useDrawerOnMobile is off', () => {
            goMobile()

            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    useDrawerOnMobile={false}
                />
            )

            expect(queryDefaultTrigger()).not.toBeNull()
        })

        it('is outranked by a caller-supplied element', () => {
            goMobile()

            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    triggerElement={<button type="button">Custom</button>}
                />
            )

            expect(
                screen.getByRole('button', { name: 'Custom' })
            ).toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: 'Jan 1, 25 - Jan 8, 25' })
            ).not.toBeInTheDocument()
        })
    })

    // ---- Branch 4: default token-styled trigger -----------------------------
    describe('default trigger (branch 4)', () => {
        it('squares the left edge when a quick-range selector sits beside it', () => {
            render(<DateRangePicker value={FIXED_RANGE} onChange={() => {}} />)

            expect(getDefaultTrigger()).toHaveStyle({
                borderRadius: '0 10px 10px 0',
            })
        })

        it('rounds every corner when there is no quick-range selector', () => {
            render(
                <DateRangePicker
                    value={FIXED_RANGE}
                    onChange={() => {}}
                    showPresets={false}
                />
            )

            expect(getDefaultTrigger()).toHaveStyle({ borderRadius: '10px' })
        })
    })
})
