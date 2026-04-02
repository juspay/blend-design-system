import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import NumberInputV2 from '../../../lib/components/InputsV2/NumberInputV2/NumberInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'

const noop = () => {}

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
})
