import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import NumberInputV2 from '../../../lib/components/InputsV2/NumberInputV2/NumberInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'

const noop = () => {}

describe('NumberInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA)', () => {
        it('meets WCAG standards for default number input (axe-core validation)', async () => {
            const { container } = render(
                <NumberInputV2
                    label={{ text: 'Amount', subtext: '' }}
                    value={null}
                    onChange={noop}
                    placeholder="0"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (sm, md, lg)', async () => {
            const sizes = [InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <NumberInputV2
                        label={{ text: `${size} input`, subtext: '' }}
                        value={null}
                        onChange={noop}
                        size={size}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <NumberInputV2
                    label={{ text: 'Disabled Input', subtext: '' }}
                    value={1}
                    onChange={noop}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <NumberInputV2
                    label={{ text: 'Score', subtext: '' }}
                    value={200}
                    onChange={noop}
                    min={0}
                    max={100}
                    error={{
                        show: true,
                        message: 'Value must be between 0 and 100',
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible name on spinbutton', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Quantity', subtext: '' }}
                    name="quantity"
                    value={null}
                    onChange={noop}
                />
            )
            expect(
                screen.getByRole('spinbutton', { name: /quantity/i })
            ).toBeInTheDocument()
        })

        it('renders subtext for additional context', () => {
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
            expect(screen.getByText(/USD/)).toBeInTheDocument()
        })

        it('renders hint text for additional guidance', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Units', subtext: '' }}
                    hintText="Enter a whole number"
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByText('Enter a whole number')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Field', subtext: '' }}
                    value={1}
                    onChange={noop}
                    error={{
                        show: true,
                        message: 'Please enter a valid value',
                    }}
                />
            )
            expect(
                screen.getByText('Please enter a valid value')
            ).toBeInTheDocument()
        })

        it('error message is associated with input via aria-describedby', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Field', subtext: '' }}
                    name="amount"
                    value={1}
                    onChange={noop}
                    error={{
                        show: true,
                        message: 'Invalid value',
                    }}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('aria-describedby')
            expect(screen.getByText('Invalid value')).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Total', subtext: '' }}
                    name="orderTotal"
                    value={null}
                    onChange={noop}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('name', 'orderTotal')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Focusable', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            const input = screen.getByRole('spinbutton')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('can receive keyboard input', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Type Here', subtext: '' }}
                    value={null}
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('spinbutton')
            await user.type(input, '42')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable for editing', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Disabled', subtext: '' }}
                    value={1}
                    onChange={noop}
                    disabled
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeDisabled()
        })

        it('supports Tab key for focus navigation (input, then steppers, then next input)', async () => {
            const { user } = render(
                <>
                    <NumberInputV2
                        label={{ text: 'First', subtext: '' }}
                        value={5}
                        onChange={noop}
                        min={0}
                        max={10}
                    />
                    <NumberInputV2
                        label={{ text: 'Second', subtext: '' }}
                        value={5}
                        onChange={noop}
                        min={0}
                        max={10}
                    />
                </>
            )
            const inputs = screen.getAllByRole('spinbutton')
            await user.tab()
            expect(document.activeElement).toBe(inputs[0])
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Increase First/i })
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Decrease First/i })
            )
            await user.tab()
            expect(document.activeElement).toBe(inputs[1])
        })

        it('stepper buttons are keyboard-focusable', async () => {
            const { user } = render(
                <NumberInputV2
                    label={{ text: 'Step', subtext: '' }}
                    value={0}
                    onChange={noop}
                    min={0}
                    max={10}
                />
            )
            const increase = screen.getByRole('button', {
                name: /Increase Step/i,
            })
            await user.click(increase)
            expect(increase).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Focus Me', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            const input = screen.getByRole('spinbutton')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('removes focus on blur', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Blur Test', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            const input = screen.getByRole('spinbutton')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
            act(() => {
                input.blur()
            })
            expect(document.activeElement).not.toBe(input)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order in form (inputs, steppers, then submit)', async () => {
            const { user } = render(
                <form>
                    <NumberInputV2
                        label={{ text: 'Min', subtext: '' }}
                        value={5}
                        onChange={noop}
                        min={0}
                        max={10}
                    />
                    <NumberInputV2
                        label={{ text: 'Max', subtext: '' }}
                        value={5}
                        onChange={noop}
                        min={0}
                        max={10}
                    />
                    <button type="submit">Submit</button>
                </form>
            )
            const spinbuttons = screen.getAllByRole('spinbutton')
            await user.tab()
            expect(document.activeElement).toBe(spinbuttons[0])
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Increase Min/i })
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Decrease Min/i })
            )
            await user.tab()
            expect(document.activeElement).toBe(spinbuttons[1])
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Increase Max/i })
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Decrease Max/i })
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Submit' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has spinbutton role', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Input Role', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        })

        it('exposes value-related ARIA for spinbutton', () => {
            render(
                <NumberInputV2
                    label={{ text: 'A', subtext: '' }}
                    value={7}
                    onChange={noop}
                    min={0}
                    max={10}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('aria-valuenow', '7')
            expect(input).toHaveAttribute('aria-valuemin', '0')
            expect(input).toHaveAttribute('aria-valuemax', '10')
        })

        it('announces label to screen readers', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Screen Reader Label', subtext: '' }}
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Required Field', subtext: '' }}
                    value={null}
                    onChange={noop}
                    required
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('announces disabled state', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Disabled Input', subtext: '' }}
                    value={1}
                    onChange={noop}
                    disabled
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeDisabled()
        })

        it('exposes error state via aria-invalid when error message shown', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Error Field', subtext: '' }}
                    value={1}
                    onChange={noop}
                    error={{ show: true, message: 'Error' }}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <NumberInputV2
                    label={{ text: 'Focus Event', subtext: '' }}
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
                    label={{ text: 'Blur Event', subtext: '' }}
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

    describe('Placeholder (WCAG 3.3.2 - Best Practice)', () => {
        it('provides placeholder as supplementary to label', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Count', subtext: '' }}
                    placeholder="0"
                    value={null}
                    onChange={noop}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('placeholder', '0')
        })

        it('label is present even with placeholder', () => {
            render(
                <NumberInputV2
                    label={{ text: 'Total', subtext: '' }}
                    placeholder="Enter amount"
                    value={null}
                    onChange={noop}
                />
            )
            expect(screen.getByText('Total')).toBeInTheDocument()
            expect(screen.getByRole('spinbutton')).toHaveAttribute(
                'placeholder',
                'Enter amount'
            )
        })
    })

    describe('Comprehensive WCAG compliance', () => {
        it('meets WCAG standards with hint and help text', async () => {
            const { container } = render(
                <NumberInputV2
                    label={{ text: 'Rate', subtext: 'Annual' }}
                    hintText="Use a decimal between 0 and 1"
                    helpIconText="Applied to taxable income."
                    placeholder="0"
                    value={null}
                    onChange={noop}
                    min={0}
                    max={1}
                    step={0.01}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state', async () => {
            const { container } = render(
                <NumberInputV2
                    label={{ text: 'Error Test', subtext: '' }}
                    value={999}
                    onChange={noop}
                    min={0}
                    max={10}
                    error={{
                        show: true,
                        message: 'Please correct this field',
                    }}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards in disabled state', async () => {
            const { container } = render(
                <NumberInputV2
                    label={{ text: 'Disabled', subtext: '' }}
                    value={42}
                    onChange={noop}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
