import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '../../test-utils'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'
import NumberInputV2 from '../../../lib/components/InputsV2/NumberInputV2/NumberInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'

const noop = () => {}

afterEach(() => {
    vi.restoreAllMocks()
})

describe('NumberInputV2 Component', () => {
    describe('Rendering', () => {
        it('renders spinbutton input', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Quantity', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByText('Quantity')).toBeInTheDocument()
            expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        })

        it('renders label and subtext', () => {
            render(
                <NumberInputV2
                    label={{
                        text: 'Price',
                        subtext: 'USD',
                    }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByText('Price')).toBeInTheDocument()
            expect(screen.getByText(/USD/)).toBeInTheDocument()
        })

        it('renders placeholder', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Amount', subtext: '' }}
                    value={null}
                    onChange={noop}
                    placeholder="0"
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'placeholder',
                '0'
            )
        })

        it('renders hint text', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Score', subtext: '' }}
                    value={null}
                    onChange={noop}
                    hintText="Between 0 and 100"
                />
            )
            expect(screen.getByText('Between 0 and 100')).toBeInTheDocument()
        })

        it('renders required indicator', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Required field', subtext: '' }}
                    value={null}
                    onChange={noop}
                    required
                />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'aria-required',
                'true'
            )
        })

        it('renders stepper buttons', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Items', subtext: '' }}
                    value={0}
                    onChange={noop}
                />
            )
            expect(
                screen.getByRole('button', { name: /Increase Items/i })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: /Decrease Items/i })
            ).toBeInTheDocument()
        })
    })

    describe('Unit suffix (unit prop)', () => {
        it('renders unit strip and hides stepper buttons when unit is set', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Mass', subtext: '' }}
                    value={12}
                    onChange={noop}
                    unit="kg"
                />
            )
            expect(screen.getByText('kg')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="unit"]')
            ).toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: /Increase Mass/i })
            ).not.toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: /Decrease Mass/i })
            ).not.toBeInTheDocument()
        })

        it('still exposes spinbutton when unit is set', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Pct', subtext: '' }}
                    value={50}
                    onChange={noop}
                    unit="%"
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('50')
        })

        it('increments via ArrowUp when unit is set (no stepper buttons)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'U', subtext: '' }}
                    value={4}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    step={1}
                    unit="px"
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            handleChange.mockClear()
            await user.keyboard('{ArrowUp}')
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(
                handleChange.mock.calls[handleChange.mock.calls.length - 1][0]
                    .target.value
            ).toBe('5')
        })
    })

    describe('Input states', () => {
        it('renders disabled state', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Locked', subtext: '' }}
                    value={1}
                    onChange={noop}
                    disabled
                />
            )
            expect(screen.getByRole('spinbutton')).toBeDisabled()
        })

        it('renders external error with message', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Field', subtext: '' }}
                    value={1}
                    onChange={noop}
                    error={{
                        show: true,
                        message: 'Invalid number',
                    }}
                />
            )
            expect(screen.getByText('Invalid number')).toBeInTheDocument()
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('does not set aria-invalid when error.show without message', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Field', subtext: '' }}
                    value={1}
                    onChange={noop}
                    error={{ show: true }}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })

        it('defaults aria-invalid to false', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Field', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })
    })

    describe('Size variants', () => {
        it.each([InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG])(
            'renders %s size',
            (size) => {
                const { unmount } = render(
                    <NumberInputV2
                        label={{ text: `${size}`, subtext: '' }}
                        value={null}
                        onChange={noop}
                        size={size}
                    />
                )
                expect(screen.getByRole('spinbutton')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Controlled behavior', () => {
        it('displays controlled numeric value', () => {
            render(
                <NumberInputV2
                    label={{ text: 'N', subtext: '' }}
                    value={42}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('42')
        })

        it('shows empty when value is null', () => {
            render(
                <NumberInputV2
                    label={{ text: 'N', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('')
        })

        it('calls onChange when user types', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Type', subtext: '' }}
                    value={null}
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.type(input, '7')
            expect(handleChange).toHaveBeenCalled()
        })

        it('updates when value prop changes', () => {
            const { rerender } = render(
                <NumberInputV2
                    label={{ text: 'R', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('')

            rerender(
                <NumberInputV2
                    label={{ text: 'R', subtext: '' }}
                    value={99}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('99')
        })
    })

    describe('Event handling', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <NumberInputV2
                    label={{ text: 'F', subtext: '' }}
                    value={null}
                    onChange={noop}
                    onFocus={handleFocus}
                />
            )
            const input = screen.getByRole('spinbutton')
            act(() => {
                input.focus()
            })
            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when input loses focus', () => {
            const handleBlur = vi.fn()
            render(
                <NumberInputV2
                    label={{ text: 'B', subtext: '' }}
                    value={null}
                    onChange={noop}
                    onBlur={handleBlur}
                />
            )
            const input = screen.getByRole('spinbutton')
            act(() => {
                input.focus()
            })
            act(() => {
                input.blur()
            })
            expect(handleBlur).toHaveBeenCalledTimes(1)
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to the input element', () => {
            const ref = React.createRef<HTMLInputElement>()
            render(
                <NumberInputV2
                    label={{ text: 'Ref', subtext: '' }}
                    value={null}
                    onChange={noop}
                    ref={ref}
                />
            )
            expect(ref.current).toBeInstanceOf(HTMLInputElement)
            expect(ref.current?.tagName).toBe('INPUT')
        })
    })

    describe('Form attributes', () => {
        it('applies name attribute', () => {
            render(
                <NumberInputV2
                    label={{ text: 'N', subtext: '' }}
                    name="quantity"
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'name',
                'quantity'
            )
        })

        it('applies custom id when provided', () => {
            render(
                <NumberInputV2
                    id="custom-number-id"
                    label={{ text: 'L', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'id',
                'custom-number-id'
            )
        })

        it('sets aria-valuenow from effective value', () => {
            render(
                <NumberInputV2
                    label={{ text: 'A', subtext: '' }}
                    value={5}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'aria-valuenow',
                '5'
            )
        })
    })

    describe('Data attributes', () => {
        it('has data-numberinput with label text', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Units', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(
                document.querySelector('[data-numberinput="Units"]')
            ).toBeInTheDocument()
        })

        it('has data-status enabled when not disabled', () => {
            render(
                <NumberInputV2
                    label={{ text: 'E', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()
        })

        it('has data-status disabled when disabled', () => {
            render(
                <NumberInputV2
                    label={{ text: 'D', subtext: '' }}
                    value={1}
                    onChange={noop}
                    disabled
                />
            )
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })
    })

    describe('Stepper interaction', () => {
        it('increments value when increase button is clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Count', subtext: '' }}
                    value={1}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    step={1}
                />
            )
            await user.click(
                screen.getByRole('button', { name: /Increase Count/i })
            )
            expect(handleChange).toHaveBeenCalled()
            const lastCall =
                handleChange.mock.calls[handleChange.mock.calls.length - 1][0]
            expect(lastCall.target.value).toBe('2')
        })

        it('decrements value when decrease button is clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Count', subtext: '' }}
                    value={3}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    step={1}
                />
            )
            await user.click(
                screen.getByRole('button', { name: /Decrease Count/i })
            )
            expect(handleChange).toHaveBeenCalled()
            const lastCall =
                handleChange.mock.calls[handleChange.mock.calls.length - 1][0]
            expect(lastCall.target.value).toBe('2')
        })

        it('increments via ArrowUp when focused', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'K', subtext: '' }}
                    value={4}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    step={1}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            handleChange.mockClear()
            await user.keyboard('{ArrowUp}')
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(
                handleChange.mock.calls[handleChange.mock.calls.length - 1][0]
                    .target.value
            ).toBe('5')
        })

        it('decrements via ArrowDown when focused', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'K', subtext: '' }}
                    value={4}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    step={1}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            handleChange.mockClear()
            await user.keyboard('{ArrowDown}')
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(
                handleChange.mock.calls[handleChange.mock.calls.length - 1][0]
                    .target.value
            ).toBe('3')
        })

        it('does not call onChange when change event matches current value', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Same', subtext: '' }}
                    value={5}
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            handleChange.mockClear()
            fireEvent.change(input, { target: { value: '5' } })
            expect(handleChange).not.toHaveBeenCalled()
        })

        it('does not increment via ArrowUp when already at max', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Max', subtext: '' }}
                    value={10}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    step={1}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            handleChange.mockClear()
            await user.keyboard('{ArrowUp}')
            expect(handleChange).not.toHaveBeenCalled()
        })
    })

    describe('preventNegative', () => {
        it('displays 0 when controlled value is negative', () => {
            render(
                <NumberInputV2
                    label={{ text: 'P', subtext: '' }}
                    value={-5}
                    onChange={noop}
                    preventNegative
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('0')
        })
    })

    describe('Blur clamping', () => {
        it('fires onChange with clamped value on blur when typed value exceeds max', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Clamp', subtext: '' }}
                    value={null}
                    onChange={handleChange}
                    min={0}
                    max={10}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            await user.type(input, '50')
            handleChange.mockClear()
            await user.tab()
            expect(handleChange).toHaveBeenCalled()
            const lastCall =
                handleChange.mock.calls[handleChange.mock.calls.length - 1][0]
            expect(lastCall.target.value).toBe('10')
        })

        it('calls onBlur after internal blur handling', async () => {
            const handleBlur = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'B', subtext: '' }}
                    value={5}
                    onChange={noop}
                    onBlur={handleBlur}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.click(input)
            await user.tab()
            expect(handleBlur).toHaveBeenCalledTimes(1)
        })
    })

    describe('Small viewport + large size (floating label)', () => {
        it('renders floating label instead of static label when breakpoint is sm and size is lg', () => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 360,
            } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

            render(
                <NumberInputV2
                    label={{ text: 'Floating qty', subtext: 'sub' }}
                    value={null}
                    onChange={noop}
                    size={InputSizeV2.LG}
                />
            )

            expect(
                screen.queryByText('Floating qty', {
                    selector: '[data-element="input-label"]',
                })
            ).not.toBeInTheDocument()

            expect(screen.getByText('Floating qty')).toBeInTheDocument()
        })
    })

    describe('Edge values', () => {
        it('shows empty display when value is NaN', () => {
            render(
                <NumberInputV2
                    label={{ text: 'NaN', subtext: '' }}
                    value={Number.NaN as unknown as number}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toHaveValue('')
        })

        it('forwards native props to the input via spread', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Spread', subtext: '' }}
                    value={null}
                    onChange={noop}
                    data-testid="number-input-native"
                />
            )
            expect(
                screen.getByTestId('number-input-native')
            ).toBeInTheDocument()
        })

        it('links hint to input via aria-describedby when no error', () => {
            render(
                <NumberInputV2
                    label={{ text: 'H', subtext: '' }}
                    value={1}
                    onChange={noop}
                    hintText="Hint text"
                />
            )
            const input = screen.getByRole('spinbutton')
            const describedBy = input.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()
            const hintId = describedBy!
                .split(/\s+/)
                .find((id) => id.endsWith('-hint'))
            expect(hintId).toBeTruthy()
            expect(document.getElementById(hintId!)).toHaveTextContent(
                'Hint text'
            )
        })
    })

    describe('min / max (same copy as NumberInput getRangeErrorMessage)', () => {
        it('shows between message when both bounds are set', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Qty', subtext: '' }}
                    value={150}
                    onChange={noop}
                    min={0}
                    max={100}
                />
            )
            expect(
                screen.getByText(/Value must be between 0 and 100/i)
            ).toBeInTheDocument()
        })

        it('shows at-most message when only max is set', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Qty', subtext: '' }}
                    value={150}
                    onChange={noop}
                    max={100}
                />
            )
            expect(
                screen.getByText(/Value must be at most 100/i)
            ).toBeInTheDocument()
        })
    })
})
