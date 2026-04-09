import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, fireEvent, MockIcon } from '../../test-utils'
import UnitInputV2 from '../../../lib/components/InputsV2/UnitInputV2/UnitInputV2'
import {
    UnitInputV2Position,
    type UnitInputV2PropsType,
} from '../../../lib/components/InputsV2/UnitInputV2/UnitInputV2.types'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'

const baseProps: Pick<UnitInputV2PropsType, 'unit' | 'onChange'> = {
    unit: 'px',
    onChange: () => {},
}

describe('UnitInputV2 Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            render(
                <UnitInputV2 {...baseProps} label="Width" value={undefined} />
            )
            expect(screen.getByText('Width')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(screen.getByText('px')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="unit"]')
            ).toBeInTheDocument()
        })

        it('renders with label and sublabel', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Margin"
                    sublabel="Outer spacing"
                    value={12}
                />
            )
            expect(screen.getByText('Margin')).toBeInTheDocument()
            expect(screen.getByText(/Outer spacing/)).toBeInTheDocument()
        })

        it('renders with placeholder', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Size"
                    value={undefined}
                    placeholder="0"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                '0'
            )
        })

        it('renders required indicator', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Required"
                    value={undefined}
                    required
                />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeRequired()
        })

        it('renders with hint text', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Field"
                    value={1}
                    hintText="Use whole numbers"
                />
            )
            expect(screen.getByText('Use whole numbers')).toBeInTheDocument()
        })

        it('renders with left slot', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="With icon"
                    value={undefined}
                    leftSlot={<MockIcon />}
                />
            )
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).toBeInTheDocument()
        })

        it('renders with right slot', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="With icon"
                    value={undefined}
                    rightSlot={<MockIcon />}
                />
            )
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeInTheDocument()
        })

        it('renders unit on the left when unitPosition is LEFT', () => {
            const { container } = render(
                <UnitInputV2
                    {...baseProps}
                    unit="kg"
                    unitPosition={UnitInputV2Position.LEFT}
                    label="Weight"
                    value={10}
                />
            )
            expect(screen.getByText('kg')).toBeInTheDocument()
            const unit = container.querySelector('[data-element="unit"]')
            expect(unit).toBeTruthy()
            expect(unit).toHaveAttribute('data-id', 'kg')
        })
    })

    describe('Input states', () => {
        it('renders disabled state', () => {
            render(
                <UnitInputV2 {...baseProps} label="Off" value={1} disabled />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('renders error state with message', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Amount"
                    value={1}
                    error
                    errorMessage="Invalid amount"
                />
            )
            expect(screen.getByText('Invalid amount')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('shows range error when value is outside min and max', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Range"
                    value={100}
                    min={0}
                    max={50}
                />
            )
            expect(
                screen.getByText('Value must be between 0 and 50')
            ).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('prefers errorMessage over range message when both apply', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Range"
                    value={100}
                    min={0}
                    max={50}
                    errorMessage="Custom error"
                />
            )
            expect(screen.getByText('Custom error')).toBeInTheDocument()
            expect(
                screen.queryByText('Value must be between 0 and 50')
            ).not.toBeInTheDocument()
        })

        it('has no validation error when value is in range', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="OK"
                    value={25}
                    min={0}
                    max={50}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
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
                    <UnitInputV2
                        {...baseProps}
                        label={`${size} input`}
                        value={1}
                        size={size}
                    />
                )
                expect(screen.getByRole('textbox')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Controlled behavior', () => {
        it('displays controlled numeric value', () => {
            render(<UnitInputV2 {...baseProps} label="N" value={42} />)
            expect(screen.getByRole('textbox')).toHaveValue('42')
        })

        it('calls onChange when value changes via typing', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <UnitInputV2
                    {...baseProps}
                    label="Type"
                    value={undefined}
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, '7')
            expect(handleChange).toHaveBeenCalled()
        })

        it('updates when value prop changes', () => {
            const { rerender } = render(
                <UnitInputV2 {...baseProps} label="R" value={1} />
            )
            expect(screen.getByRole('textbox')).toHaveValue('1')

            rerender(<UnitInputV2 {...baseProps} label="R" value={99} />)
            expect(screen.getByRole('textbox')).toHaveValue('99')
        })
    })

    describe('Event handling', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <UnitInputV2
                    {...baseProps}
                    label="F"
                    value={undefined}
                    onFocus={handleFocus}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when input loses focus', () => {
            const handleBlur = vi.fn()
            render(
                <UnitInputV2
                    {...baseProps}
                    label="B"
                    value={undefined}
                    onBlur={handleBlur}
                />
            )
            const input = screen.getByRole('textbox')
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
                <UnitInputV2 {...baseProps} label="Ref" value={1} ref={ref} />
            )
            expect(ref.current).toBeInstanceOf(HTMLInputElement)
            expect(ref.current?.tagName).toBe('INPUT')
        })
    })

    describe('Form attributes', () => {
        it('applies name attribute', () => {
            render(
                <UnitInputV2 {...baseProps} label="N" name="amount" value={1} />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'name',
                'amount'
            )
        })

        it('applies custom id when provided', () => {
            render(
                <UnitInputV2 {...baseProps} label="L" id="my-unit" value={1} />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-unit')
        })

        it('uses type text and inputMode numeric', () => {
            render(<UnitInputV2 {...baseProps} label="T" value={3} />)
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('type', 'text')
            expect(input).toHaveAttribute('inputmode', 'numeric')
        })

        it('passes min, max, and step to the input', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="Step"
                    value={5}
                    min={0}
                    max={10}
                    step={2}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('min', '0')
            expect(input).toHaveAttribute('max', '10')
            expect(input).toHaveAttribute('step', '2')
        })
    })

    describe('Data attributes', () => {
        it('has data-unitinput with label value', () => {
            render(<UnitInputV2 {...baseProps} label="My Label" value={1} />)
            expect(
                document.querySelector('[data-unitinput="My Label"]')
            ).toBeInTheDocument()
        })

        it('has data-status="enabled" when not disabled', () => {
            render(<UnitInputV2 {...baseProps} label="E" value={1} />)
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()
        })

        it('has data-status="disabled" when disabled', () => {
            render(<UnitInputV2 {...baseProps} label="D" value={1} disabled />)
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })

        it('has data-component-field-wrapper from name', () => {
            render(
                <UnitInputV2 {...baseProps} label="F" name="width" value={1} />
            )
            expect(
                document.querySelector(
                    '[data-component-field-wrapper="field-width"]'
                )
            ).toBeInTheDocument()
        })
    })

    describe('Keyboard', () => {
        it('increments value on ArrowUp using step', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <UnitInputV2
                    {...baseProps}
                    label="K"
                    value={5}
                    onChange={onChange}
                    min={0}
                    max={20}
                    step={2}
                />
            )
            const input = screen.getByRole('textbox')
            await user.click(input)
            await user.keyboard('{ArrowUp}')
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: expect.objectContaining({ value: '7' }),
                })
            )
        })

        it('decrements value on ArrowDown using step', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <UnitInputV2
                    {...baseProps}
                    label="K"
                    value={5}
                    onChange={onChange}
                    min={0}
                    max={20}
                    step={2}
                />
            )
            const input = screen.getByRole('textbox')
            await user.click(input)
            await user.keyboard('{ArrowDown}')
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: expect.objectContaining({ value: '3' }),
                })
            )
        })

        it('prevents minus when min is not negative', () => {
            render(<UnitInputV2 {...baseProps} label="K" value={5} min={0} />)
            const input = screen.getByRole('textbox')
            const evt = fireEvent.keyDown(input, { key: '-', code: 'Minus' })
            expect(evt).toBe(false)
        })
    })

    describe('Help icon', () => {
        it('renders with helpIconHintText', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    label="API Key"
                    value={1}
                    helpIconHintText="Find your key in settings"
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(screen.getByLabelText('API Key')).toBeInTheDocument()
        })
    })

    describe('Edge cases', () => {
        it('handles value zero', () => {
            render(<UnitInputV2 {...baseProps} label="Zero" value={0} />)
            expect(screen.getByRole('textbox')).toHaveValue('0')
        })

        it('handles undefined value as empty input', () => {
            render(
                <UnitInputV2 {...baseProps} label="Empty" value={undefined} />
            )
            expect(screen.getByRole('textbox')).toHaveValue('')
        })

        it('renders with combined props', () => {
            render(
                <UnitInputV2
                    {...baseProps}
                    unit="rem"
                    label="Complete"
                    sublabel="Sub"
                    placeholder="0"
                    value={2}
                    size={InputSizeV2.MD}
                    required
                    hintText="Hint"
                    helpIconHintText="Help"
                    error={false}
                    leftSlot={<MockIcon />}
                    name="complete"
                />
            )
            expect(screen.getByText('Complete')).toBeInTheDocument()
            expect(screen.getByText(/Sub/)).toBeInTheDocument()
            expect(screen.getByText('Hint')).toBeInTheDocument()
            expect(screen.getByText('rem')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })
})
