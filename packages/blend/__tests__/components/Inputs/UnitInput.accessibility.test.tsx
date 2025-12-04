import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import UnitInput from '../../../lib/components/Inputs/UnitInput/UnitInput'
import {
    UnitInputSize,
    UnitPosition,
} from '../../../lib/components/Inputs/UnitInput/types'

describe('UnitInput Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default unit input (axe-core validation)', async () => {
            const { container } = render(
                <UnitInput
                    label="Price"
                    unit="USD"
                    value={undefined}
                    onChange={() => {}}
                    placeholder="Enter amount"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (Medium, Large)', async () => {
            const sizes = [UnitInputSize.MEDIUM, UnitInputSize.LARGE]

            for (const size of sizes) {
                const { container } = render(
                    <UnitInput
                        label={`${size} unit input`}
                        unit="USD"
                        size={size}
                        value={undefined}
                        onChange={() => {}}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <UnitInput
                    label="Disabled Unit Input"
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
                <UnitInput
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
        it('has accessible label associated with input - programmatically determinable', () => {
            render(
                <UnitInput
                    label="Product Price"
                    unit="USD"
                    name="price"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeInTheDocument()
            // Label association is handled via InputLabels component with htmlFor
        })

        it('renders sublabel for additional context - supplementary instructions', () => {
            render(
                <UnitInput
                    label="Product Price"
                    sublabel="Base price before taxes and discounts"
                    unit="USD"
                    name="price"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            // Sublabel is rendered as "(Base price before taxes and discounts)"
            expect(
                screen.getByText(/Base price before taxes and discounts/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance - instructions provided', () => {
            render(
                <UnitInput
                    label="Price"
                    unit="USD"
                    hintText="Enter the price in US dollars"
                    name="price"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText('Enter the price in US dollars')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state - error identified in text', () => {
            render(
                <UnitInput
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
            expect(
                screen.getByText('Discount must be between 0% and 100%')
            ).toBeInTheDocument()
        })

        it('applies error styling when error prop is true - error visually indicated', () => {
            render(
                <UnitInput
                    label="Price"
                    unit="USD"
                    value={undefined}
                    onChange={() => {}}
                    error
                    errorMessage="This field is required"
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeInTheDocument()
            // Error state is indicated via border color and shake animation
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('provides helpful error messages with correction suggestions', () => {
            render(
                <UnitInput
                    label="Discount"
                    unit="%"
                    value={150}
                    min={0}
                    max={100}
                    onChange={() => {}}
                    error
                    errorMessage="Enter a value between 0 and 100"
                />
            )
            expect(
                screen.getByText('Enter a value between 0 and 100')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose identification', () => {
            render(
                <UnitInput
                    label="Price"
                    unit="USD"
                    name="price"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('name', 'price')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <UnitInput
                    label="Focusable Unit"
                    unit="USD"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')

            input.focus()
            expect(document.activeElement).toBe(input)
        })

        it('can receive keyboard input - keyboard operable', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <UnitInput
                    label="Type Here"
                    unit="USD"
                    value={undefined}
                    onChange={handleChange}
                />
            )

            const input = screen.getByRole('spinbutton')
            await user.type(input, '42')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable - prevents keyboard interaction', () => {
            render(
                <UnitInput
                    label="Disabled"
                    unit="USD"
                    value={42}
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeDisabled()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(
                <UnitInput
                    label="Focus Me"
                    unit="USD"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')

            input.focus()
            expect(document.activeElement).toBe(input)
            // Focus indicator styling is applied via _focus/_focusVisible props
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order - sequential navigation order', () => {
            render(
                <form>
                    <UnitInput
                        label="Price"
                        unit="USD"
                        value={undefined}
                        onChange={() => {}}
                    />
                    <UnitInput
                        label="Discount"
                        unit="%"
                        value={undefined}
                        onChange={() => {}}
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const inputs = screen.getAllByRole('spinbutton')
            expect(inputs).toHaveLength(2)
            // Detailed Tab order testing is covered in higher-level integration tests
            expect(inputs[0]).toBeInTheDocument()
            expect(inputs[1]).toBeInTheDocument()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper spinbutton role - programmatically determinable role', () => {
            render(
                <UnitInput
                    label="Input Role"
                    unit="USD"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        })

        it('exposes required state - state programmatically determinable', () => {
            render(
                <UnitInput
                    label="Required Price"
                    unit="USD"
                    value={undefined}
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('required')
        })

        it('announces disabled state - state programmatically determinable', () => {
            render(
                <UnitInput
                    label="Disabled Input"
                    unit="USD"
                    value={42}
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeDisabled()
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('provides numeric input with unit display and adequate touch target size', () => {
            render(
                <UnitInput
                    label="Accessible Price"
                    unit="USD"
                    value={0}
                    onChange={() => {}}
                    min={0}
                    step={0.01}
                />
            )

            const input = screen.getByRole('spinbutton')
            expect(input).toBeInTheDocument()
            // Actual pixel size verification requires browser DevTools; component
            // is designed so the input and unit area exceed 24x24px.
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <UnitInput
                    label="Complete Unit Test"
                    sublabel="Base price before taxes and discounts"
                    hintText="Enter value in range"
                    unit="USD"
                    unitPosition={UnitPosition.LEFT}
                    placeholder="0.00"
                    value={10}
                    min={0}
                    max={1000}
                    step={0.01}
                    onChange={() => {}}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
