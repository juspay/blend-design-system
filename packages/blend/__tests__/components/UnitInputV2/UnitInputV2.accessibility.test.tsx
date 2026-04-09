import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import { Mail } from 'lucide-react'
import UnitInputV2 from '../../../lib/components/InputsV2/UnitInputV2/UnitInputV2'
import { UnitInputV2Position } from '../../../lib/components/InputsV2/UnitInputV2/UnitInputV2.types'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'

describe('UnitInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA)', () => {
        it('meets WCAG standards for default unit input (axe-core validation)', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Width"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
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
                    <UnitInputV2
                        label={`${size} input`}
                        unit="rem"
                        value={1}
                        onChange={() => {}}
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
                <UnitInputV2
                    label="Disabled Input"
                    unit="kg"
                    value={42}
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Discount"
                    unit="%"
                    value={150}
                    min={0}
                    max={100}
                    onChange={() => {}}
                    error
                    errorMessage="Discount must be between 0% and 100%"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with input', () => {
            render(
                <UnitInputV2
                    label="Column width"
                    unit="px"
                    name="width"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox', { name: /column width/i })
            expect(input).toBeInTheDocument()
        })

        it('renders sublabel for additional context', () => {
            render(
                <UnitInputV2
                    label="Margin"
                    sublabel="Outer spacing"
                    unit="px"
                    name="margin"
                    value={12}
                    onChange={() => {}}
                />
            )
            expect(screen.getByText(/Outer spacing/)).toBeInTheDocument()
        })

        it('renders hint text for additional guidance', () => {
            render(
                <UnitInputV2
                    label="Offset"
                    unit="deg"
                    hintText="Use whole degrees"
                    name="offset"
                    value={0}
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Use whole degrees')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state', () => {
            render(
                <UnitInputV2
                    label="Amount"
                    unit="USD"
                    value={-1}
                    onChange={() => {}}
                    error
                    errorMessage="Amount must be zero or greater"
                />
            )
            expect(
                screen.getByText('Amount must be zero or greater')
            ).toBeInTheDocument()
        })

        it('exposes range violation in an alert for screen readers', () => {
            render(
                <UnitInputV2
                    label="Score"
                    unit="pts"
                    value={150}
                    min={0}
                    max={100}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText('Value must be between 0 and 100')
            ).toBeInTheDocument()
            expect(screen.getByRole('alert')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete attribute', () => {
            render(
                <UnitInputV2
                    label="Quantity"
                    unit="pcs"
                    name="qty"
                    value={1}
                    onChange={() => {}}
                    autoComplete="off"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('autocomplete', 'off')
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose', () => {
            render(
                <UnitInputV2
                    label="Price"
                    unit="USD"
                    name="price"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('name', 'price')
        })

        it('uses text input with numeric entry mode', () => {
            render(
                <UnitInputV2
                    label="Count"
                    unit=""
                    name="count"
                    value={3}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('type', 'text')
            expect(input).toHaveAttribute('inputmode', 'numeric')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard', () => {
            render(
                <UnitInputV2
                    label="Focusable"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('can receive keyboard input', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <UnitInputV2
                    label="Type Here"
                    unit="em"
                    value={undefined}
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, '12')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not editable', () => {
            render(
                <UnitInputV2
                    label="Disabled"
                    unit="%"
                    value={10}
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('supports Tab key for focus navigation', async () => {
            const { user } = render(
                <>
                    <UnitInputV2
                        label="First"
                        unit="a"
                        value={1}
                        onChange={() => {}}
                    />
                    <UnitInputV2
                        label="Second"
                        unit="b"
                        value={2}
                        onChange={() => {}}
                    />
                </>
            )
            const inputs = screen.getAllByRole('textbox')
            await user.tab()
            expect(document.activeElement).toBe(inputs[0])
            await user.tab()
            expect(document.activeElement).toBe(inputs[1])
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused', () => {
            render(
                <UnitInputV2
                    label="Focus Me"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('removes focus on blur', () => {
            render(
                <UnitInputV2
                    label="Blur Test"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
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
        it('maintains logical focus order in form', async () => {
            const { user } = render(
                <form>
                    <UnitInputV2
                        label="Min"
                        unit="u"
                        value={0}
                        onChange={() => {}}
                    />
                    <UnitInputV2
                        label="Max"
                        unit="u"
                        value={1}
                        onChange={() => {}}
                    />
                    <button type="submit">Submit</button>
                </form>
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getAllByRole('textbox')[0]
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getAllByRole('textbox')[1]
            )
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Submit' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper textbox role', () => {
            render(
                <UnitInputV2
                    label="Input Role"
                    unit="px"
                    value={1}
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('announces label to screen readers', () => {
            render(
                <UnitInputV2
                    label="Screen Reader Label"
                    unit="%"
                    value={50}
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state', () => {
            render(
                <UnitInputV2
                    label="Required Field"
                    unit="kg"
                    value={undefined}
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeRequired()
        })

        it('announces disabled state', () => {
            render(
                <UnitInputV2
                    label="Disabled Input"
                    unit="V"
                    value={5}
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('exposes error state via aria-invalid', () => {
            render(
                <UnitInputV2
                    label="Error Field"
                    unit="x"
                    value={1}
                    onChange={() => {}}
                    error
                    errorMessage="Error"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('With Slots (WCAG 1.1.1 Non-text Content)', () => {
        it('supports left slot with decorative icon', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Field"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
                    leftSlot={<Mail size={16} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports right slot with accessible button', () => {
            render(
                <UnitInputV2
                    label="Amount"
                    unit="USD"
                    value={10}
                    onChange={() => {}}
                    rightSlot={
                        <button type="button" aria-label="Reset to default">
                            Reset
                        </button>
                    }
                />
            )
            expect(screen.getByLabelText('Amount')).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Reset to default' })
            ).toBeInTheDocument()
        })
    })

    describe('Focus and Blur Events (WCAG 3.2 On Focus - Level A)', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <UnitInputV2
                    label="Focus Event"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
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
                    label="Blur Event"
                    unit="px"
                    value={undefined}
                    onChange={() => {}}
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

    describe('Placeholder (WCAG 3.3.2 - Best Practice)', () => {
        it('provides placeholder as supplementary to label', () => {
            render(
                <UnitInputV2
                    label="Size"
                    unit="rem"
                    placeholder="0"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', '0')
        })

        it('label is present even with placeholder', () => {
            render(
                <UnitInputV2
                    label="Padding"
                    unit="px"
                    placeholder="0"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Padding')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                '0'
            )
        })
    })

    describe('Comprehensive WCAG compliance', () => {
        it('meets WCAG standards with all features combined', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Complete Test"
                    sublabel="Additional context"
                    hintText="Helpful hint"
                    helpIconHintText="Tooltip information"
                    placeholder="0"
                    unit="px"
                    unitPosition={UnitInputV2Position.LEFT}
                    value={8}
                    onChange={() => {}}
                    required
                    leftSlot={<Mail size={16} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Error Test"
                    unit="%"
                    value={200}
                    min={0}
                    max={100}
                    onChange={() => {}}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards in disabled state', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Disabled"
                    unit="x"
                    value={1}
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with right-slot action', async () => {
            const { container } = render(
                <UnitInputV2
                    label="Total"
                    unit="USD"
                    value={99}
                    onChange={() => {}}
                    required
                    rightSlot={
                        <button type="button" aria-label="Apply preset">
                            Apply
                        </button>
                    }
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
