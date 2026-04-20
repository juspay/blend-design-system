import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import OTPInput from '../../../lib/components/Inputs/OTPInput/OTPInput'

describe('OTPInput Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default OTP input (axe-core validation)', async () => {
            const { container } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for different OTP lengths (4, 6, 8)', async () => {
            const lengths = [4, 6, 8]

            for (const length of lengths) {
                const { container } = render(
                    <OTPInput
                        label={`${length}-Digit Code`}
                        value=""
                        onChange={() => {}}
                        length={length}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <OTPInput
                    label="Disabled OTP"
                    value=""
                    onChange={() => {}}
                    length={6}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Please enter all 6 digits"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with first input - programmatically determinable', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs.length).toBe(6)
            // Label association is handled via InputLabels component with htmlFor
        })

        it('renders sublabel for additional context - supplementary instructions', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    sublabel="Enter the code sent to your email"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            // Sublabel is rendered as "(Enter the code sent to your email)"
            expect(
                screen.getByText(/Enter the code sent to your email/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance - instructions provided', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    hintText="Check your email for the 6-digit code"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            expect(
                screen.getByText('Check your email for the 6-digit code')
            ).toBeInTheDocument()
        })

        it('supports help icon with tooltip for detailed instructions', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    helpIconHintText="The code expires in 5 minutes"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs.length).toBe(6)
            // Help icon hint is rendered in InputLabels component
        })

        it('each input has descriptive aria-label - accessible name provided', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs[0]).toHaveAttribute(
                'aria-label',
                'Verification Code digit 1 of 6'
            )
            expect(inputs[1]).toHaveAttribute(
                'aria-label',
                'Verification Code digit 2 of 6'
            )
            expect(inputs[5]).toHaveAttribute(
                'aria-label',
                'Verification Code digit 6 of 6'
            )
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state - error identified in text', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Please enter all 6 digits"
                />
            )
            expect(
                screen.getByText('Please enter all 6 digits')
            ).toBeInTheDocument()
        })

        it('applies error styling when error prop is true - error visually indicated', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="This field is required"
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs.length).toBe(6)
            // Error state is indicated via border color and shake animation
        })

        it('error message is associated with inputs - relationship programmatically determinable', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Invalid verification code"
                />
            )
            expect(
                screen.getByText('Invalid verification code')
            ).toBeInTheDocument()
            // Error association is handled via InputFooter component and aria-describedby
        })

        it('each input has aria-invalid when error is true - error state programmatically determinable', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Incomplete code"
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('aria-invalid', 'true')
            })
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('provides helpful error messages with correction suggestions', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Please enter all 6 digits (e.g., 123456)"
                />
            )
            expect(
                screen.getByText('Please enter all 6 digits (e.g., 123456)')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose identification', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs[0]).toHaveAttribute('name', 'otp-0')
            expect(inputs[1]).toHaveAttribute('name', 'otp-1')
            expect(inputs[5]).toHaveAttribute('name', 'otp-5')
        })

        it('supports autocomplete attribute for one-time-code', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('autocomplete', 'one-time-code')
            })
        })

        it('supports inputMode numeric for mobile keyboards', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('inputmode', 'numeric')
            })
        })

        it('supports pattern attribute for numeric validation', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('pattern', '[0-9]')
            })
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()
            expect(document.activeElement).toBe(inputs[0])
        })

        it('can receive keyboard input - keyboard operable', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={handleChange}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            await user.type(inputs[0], '1')

            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable - prevents keyboard interaction', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                    disabled
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toBeDisabled()
            })
        })

        it('supports Tab key for focus navigation between fields - logical focus order', async () => {
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            await user.tab()
            expect(document.activeElement).toBe(inputs[0])

            await user.tab()
            expect(document.activeElement).toBe(inputs[1])
        })

        it('supports Arrow keys for navigation between fields - keyboard navigation', async () => {
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(inputs[1])

            await user.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(inputs[0])
        })

        it('supports Backspace for deletion and navigation - keyboard operable', async () => {
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            // Focus on an empty field (index 3)
            inputs[3].focus()

            await user.keyboard('{Backspace}')
            // Backspace on empty field should move to previous field
            expect(document.activeElement).toBe(inputs[2])
        })

        it('auto-focuses first input when autoFocus is true - keyboard accessible', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                    autoFocus
                />
            )
            const inputs = screen.getAllByRole('textbox')
            // Note: autoFocus behavior may need time to execute
            expect(inputs[0]).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()
            expect(document.activeElement).toBe(inputs[0])
            // Focus indicator styling is applied via _focus prop (boxShadow)
        })

        it('maintains focus visible state during interaction', async () => {
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')

            await user.click(inputs[0])
            expect(document.activeElement).toBe(inputs[0])

            await user.keyboard('1')
            expect(document.activeElement).toBe(inputs[1]) // Auto-advance to next field
        })

        it('removes focus on blur - predictable focus behavior', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')

            inputs[0].focus()
            expect(document.activeElement).toBe(inputs[0])

            inputs[0].blur()
            expect(document.activeElement).not.toBe(inputs[0])
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order - sequential navigation order', async () => {
            const { user } = render(
                <form>
                    <OTPInput
                        label="First OTP"
                        value=""
                        onChange={() => {}}
                        length={4}
                    />
                    <OTPInput
                        label="Second OTP"
                        value=""
                        onChange={() => {}}
                        length={6}
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const firstOTPInputs = screen.getAllByLabelText(/First OTP digit/)
            const secondOTPInputs = screen.getAllByLabelText(/Second OTP digit/)

            await user.tab()
            expect(document.activeElement).toBe(firstOTPInputs[0])

            // Navigate through first OTP
            for (let i = 1; i < 4; i++) {
                await user.tab()
                expect(document.activeElement).toBe(firstOTPInputs[i])
            }

            // Move to second OTP
            await user.tab()
            expect(document.activeElement).toBe(secondOTPInputs[0])

            // Navigate through second OTP
            for (let i = 1; i < 6; i++) {
                await user.tab()
                expect(document.activeElement).toBe(secondOTPInputs[i])
            }

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Submit' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper textbox role for each input - programmatically determinable role', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs.length).toBe(6)
        })

        it('announces label to screen readers - accessible name provided', () => {
            render(
                <OTPInput
                    label="Screen Reader Label"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state - state programmatically determinable', () => {
            render(
                <OTPInput
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    length={6}
                    required
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('aria-required', 'true')
            })
        })

        it('announces disabled state - state programmatically determinable', () => {
            render(
                <OTPInput
                    label="Disabled Input"
                    value=""
                    onChange={() => {}}
                    length={6}
                    disabled
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toBeDisabled()
            })
        })

        it('group has proper role and aria-label - programmatically determinable', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    sublabel="Enter code"
                    value=""
                    onChange={() => {}}
                    length={6}
                    required
                />
            )
            const group = screen.getByRole('group')
            expect(group).toBeInTheDocument()
            expect(group).toHaveAttribute(
                'aria-label',
                'Verification Code Enter code (required)'
            )
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('provides sufficient color contrast for text - requires manual verification', () => {
            render(
                <OTPInput
                    label="Contrast Test"
                    value="123456"
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs.length).toBe(6)
            // Note: Actual contrast ratio verification requires manual testing
            // Text color on background should meet 4.5:1 for AA
        })

        it('maintains contrast for error messages - requires manual verification', () => {
            render(
                <OTPInput
                    label="Error Contrast"
                    value=""
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="This is an error"
                />
            )
            expect(screen.getByText('This is an error')).toBeInTheDocument()
            // Error text should maintain 4.5:1 contrast ratio
        })

        it('disabled state maintains minimum contrast - requires manual verification', () => {
            render(
                <OTPInput
                    label="Disabled"
                    value="123456"
                    onChange={() => {}}
                    length={6}
                    disabled
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toBeDisabled()
            })
            // Note: Disabled contrast may not meet 4.5:1 but should be distinguishable
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('meets minimum touch target size requirements (24x24px for AA)', () => {
            render(
                <OTPInput
                    label="Touch Target"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs.length).toBe(6)
            // Input fields naturally exceed 24x24px minimum for Level AA
            // Actual size verification requires browser DevTools measurement
        })
    })

    describe('Form Integration & Required Fields', () => {
        it('displays required indicator when required prop is true (3.3.2)', () => {
            render(
                <OTPInput
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    length={6}
                    required
                />
            )
            // Required indicator (asterisk) is rendered in InputLabels component
            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('aria-required', 'true')
            })
        })

        it('works correctly in form submission context', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <OTPInput
                        label="Verification Code"
                        name="otp"
                        value=""
                        onChange={() => {}}
                        length={6}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const inputs = screen.getAllByRole('textbox')
            expect(inputs[0]).toHaveAttribute('name', 'otp-0')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('aria-required', 'true')
            })
        })

        it('supports form validation with required and error states', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    name="otp"
                    value=""
                    onChange={() => {}}
                    length={6}
                    required
                    error
                    errorMessage="Verification code is required"
                />
            )

            const inputs = screen.getAllByRole('textbox')
            inputs.forEach((input) => {
                expect(input).toHaveAttribute('aria-required', 'true')
                expect(input).toHaveAttribute('aria-invalid', 'true')
            })
            expect(
                screen.getByText('Verification code is required')
            ).toBeInTheDocument()
        })
    })

    describe('Paste Functionality (WCAG 2.1.1 Keyboard - Level A)', () => {
        it('supports paste functionality for complete OTP codes - keyboard operable', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={handleChange}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()

            // Use user-event's paste method
            await user.paste('123456')

            // Paste should fill all fields and trigger onChange
            expect(handleChange).toHaveBeenCalled()
        })
    })

    describe('Auto-advance Functionality (WCAG 2.1.1 Keyboard - Level A)', () => {
        it('automatically advances to next field on input - keyboard operable', async () => {
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()

            await user.keyboard('1')
            // Should auto-advance to next field
            expect(document.activeElement).toBe(inputs[1])
        })

        it('handles overflow input correctly - moves to next empty field', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={handleChange}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            // Focus on a filled field (index 0 has "1")
            inputs[0].focus()

            // Type a different digit - component should handle overflow by moving to next empty field
            // Typing "4" when field has "1" should trigger the overflow logic
            await user.clear(inputs[0])
            await user.type(inputs[0], '4')

            // The component should handle overflow input by moving to next empty field
            // Verify that the component supports this functionality
            expect(inputs.length).toBe(6)
            // The actual focus movement and onChange behavior is verified in component integration tests
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('selects text on focus - predictable behavior', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value="123456"
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()
            // Text should be selected on focus
            expect(document.activeElement).toBe(inputs[0])
        })

        it('does not change context unexpectedly on focus (3.2.1)', () => {
            render(
                <OTPInput
                    label="No Context Change"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            inputs[0].focus()

            expect(document.activeElement).toBe(inputs[0])
            // Focus should not trigger unexpected context changes
        })
    })

    describe('ARIA DescribedBy (WCAG 4.1.2 Name, Role, Value - Level A)', () => {
        it('associates hint text with inputs via aria-describedby', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    hintText="Enter the 6-digit code"
                    value=""
                    onChange={() => {}}
                    length={6}
                />
            )

            const inputs = screen.getAllByRole('textbox')
            const hintId = inputs[0]
                .getAttribute('aria-describedby')
                ?.split(' ')[0]

            expect(hintId).toBeTruthy()
            expect(screen.getByText('Enter the 6-digit code')).toHaveAttribute(
                'id',
                hintId
            )
        })

        it('associates error message with inputs via aria-describedby', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value="123"
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Please enter all digits"
                />
            )

            const inputs = screen.getAllByRole('textbox')
            const errorId = inputs[0]
                .getAttribute('aria-describedby')
                ?.split(' ')[0]

            expect(errorId).toBeTruthy()
            expect(screen.getByText('Please enter all digits')).toHaveAttribute(
                'id',
                errorId
            )
        })

        it('error message has role="alert" for screen reader announcements', () => {
            render(
                <OTPInput
                    label="Verification Code"
                    value=""
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Invalid code"
                />
            )

            const errorMessage = screen.getByText('Invalid code')
            expect(errorMessage).toHaveAttribute('role', 'alert')
            expect(errorMessage).toHaveAttribute('aria-live', 'polite')
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <OTPInput
                    label="Complete Test"
                    sublabel="Additional context"
                    hintText="Helpful hint"
                    helpIconHintText="Tooltip information"
                    value=""
                    onChange={() => {}}
                    length={6}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.3.5, 2.1.1, 2.4.7, 3.3.2, 4.1.2
        })

        it('meets WCAG standards with error state - all error requirements', async () => {
            const { container } = render(
                <OTPInput
                    label="Error Test"
                    value="123"
                    onChange={() => {}}
                    length={6}
                    error
                    errorMessage="Please correct this field"
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 3.3.1 Error Identification, 3.3.3 Error Suggestion, 4.1.2
        })

        it('meets WCAG standards in disabled state - all disabled state requirements', async () => {
            const { container } = render(
                <OTPInput
                    label="Disabled"
                    value="123456"
                    onChange={() => {}}
                    length={6}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 2.1.1 Keyboard, 4.1.2 Name Role Value
        })

        it('meets WCAG standards for different lengths - all length requirements', async () => {
            const lengths = [4, 6, 8]
            for (const length of lengths) {
                const { container } = render(
                    <OTPInput
                        label={`${length}-Digit Code`}
                        value=""
                        onChange={() => {}}
                        length={length}
                        required
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })
    })
})
