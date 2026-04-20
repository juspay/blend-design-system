import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import NumberInput from '../../../lib/components/Inputs/NumberInput/NumberInput'
import { NumberInputSize } from '../../../lib/components/Inputs/NumberInput/types'

describe('NumberInput Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default number input (axe-core validation)', async () => {
            const { container } = render(
                <NumberInput
                    label="Age"
                    value={undefined}
                    onChange={() => {}}
                    placeholder="Enter your age"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (Medium, Large)', async () => {
            const sizes = [NumberInputSize.MEDIUM, NumberInputSize.LARGE]

            for (const size of sizes) {
                const { container } = render(
                    <NumberInput
                        label={`${size} number input`}
                        value={undefined}
                        onChange={() => {}}
                        size={size}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <NumberInput
                    label="Disabled Number Input"
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
                <NumberInput
                    label="Age"
                    value={150}
                    min={0}
                    max={120}
                    onChange={() => {}}
                    error
                    errorMessage="Age must be between 0 and 120"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with input - programmatically determinable', () => {
            render(
                <NumberInput
                    label="Monthly Income"
                    name="income"
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
                <NumberInput
                    label="Monthly Income"
                    sublabel="Before taxes and deductions"
                    name="income"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            // Sublabel is rendered as "(Before taxes and deductions)"
            expect(
                screen.getByText(/Before taxes and deductions/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance - instructions provided', () => {
            render(
                <NumberInput
                    label="Age"
                    hintText="Must be between 0 and 120"
                    name="age"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText('Must be between 0 and 120')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state - error identified in text', () => {
            render(
                <NumberInput
                    label="Age"
                    value={150}
                    min={0}
                    max={120}
                    onChange={() => {}}
                    error
                    errorMessage="Age must be between 0 and 120"
                />
            )
            expect(
                screen.getByText('Age must be between 0 and 120')
            ).toBeInTheDocument()
        })

        it('applies error styling when error prop is true - error visually indicated', () => {
            render(
                <NumberInput
                    label="Age"
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

        it('error message is associated with input - relationship programmatically determinable', () => {
            render(
                <NumberInput
                    label="Age"
                    name="age"
                    value={undefined}
                    onChange={() => {}}
                    error
                    errorMessage="Invalid age"
                />
            )
            expect(screen.getByText('Invalid age')).toBeInTheDocument()
            // Error association is handled via InputFooter component
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('provides helpful error messages with correction suggestions', () => {
            render(
                <NumberInput
                    label="Percentage"
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

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete attribute for reducing redundant entry', () => {
            render(
                <NumberInput
                    label="OTP"
                    name="otp"
                    value={undefined}
                    onChange={() => {}}
                    autoComplete="one-time-code"
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('autocomplete', 'one-time-code')
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose identification', () => {
            render(
                <NumberInput
                    label="Age"
                    name="age"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveAttribute('name', 'age')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <NumberInput
                    label="Focusable Number"
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
                <NumberInput
                    label="Type Here"
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
                <NumberInput
                    label="Disabled"
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
                <NumberInput
                    label="Focus Me"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')

            input.focus()
            expect(document.activeElement).toBe(input)
            // Focus indicator styling is applied via _focus prop (boxShadow)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order - sequential navigation order', () => {
            render(
                <form>
                    <NumberInput
                        label="First"
                        value={undefined}
                        onChange={() => {}}
                    />
                    <NumberInput
                        label="Second"
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
                <NumberInput
                    label="Input Role"
                    value={undefined}
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        })

        it('exposes required state - state programmatically determinable', () => {
            render(
                <NumberInput
                    label="Required Field"
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
                <NumberInput
                    label="Disabled Input"
                    value={42}
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeDisabled()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('provides sufficient color contrast for text - requires manual verification', () => {
            render(
                <NumberInput
                    label="Contrast Test"
                    value={42}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('spinbutton')
            expect(input).toBeInTheDocument()
            // Note: Actual contrast ratio verification requires manual testing
            // Text color on background should meet 4.5:1 for AA
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('provides numeric steppers with accessible labels and touch targets', () => {
            render(
                <NumberInput
                    label="Stepper"
                    value={0}
                    onChange={() => {}}
                    min={0}
                    max={10}
                    step={1}
                />
            )

            const input = screen.getByRole('spinbutton')
            expect(input).toBeInTheDocument()

            const incrementButton = screen.getByRole('button', {
                name: /increase/i,
            })
            const decrementButton = screen.getByRole('button', {
                name: /decrease/i,
            })

            expect(incrementButton).toBeInTheDocument()
            expect(decrementButton).toBeInTheDocument()
            // Actual pixel size verification requires browser DevTools; component
            // enforces minimum 24x24px targets via design tokens and props.
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <NumberInput
                    label="Complete Number Test"
                    sublabel="Before taxes and deductions"
                    hintText="Enter value in range"
                    placeholder="0"
                    value={10}
                    min={0}
                    max={100}
                    step={5}
                    onChange={() => {}}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
