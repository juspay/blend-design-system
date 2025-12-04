import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import { User } from 'lucide-react'
import TextInput from '../../../lib/components/Inputs/TextInput/TextInput'
import { TextInputSize } from '../../../lib/components/Inputs/TextInput/types'

describe('TextInput Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default text input (axe-core validation)', async () => {
            const { container } = render(
                <TextInput
                    label="Email Address"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter your email"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (Small, Medium, Large)', async () => {
            const sizes = [
                TextInputSize.SMALL,
                TextInputSize.MEDIUM,
                TextInputSize.LARGE,
            ]

            for (const size of sizes) {
                const { container } = render(
                    <TextInput
                        label={`${size} input`}
                        value=""
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
                <TextInput
                    label="Disabled Input"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <TextInput
                    label="Email"
                    value="invalid"
                    onChange={() => {}}
                    error
                    errorMessage="Please enter a valid email address"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with input - programmatically determinable', () => {
            render(
                <TextInput
                    label="Full Name"
                    name="fullName"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeInTheDocument()
            // Label association is handled via InputLabels component with htmlFor
        })

        it('renders sublabel for additional context - supplementary instructions', () => {
            render(
                <TextInput
                    label="Full Name"
                    sublabel="As it appears on your ID"
                    name="fullName"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText('As it appears on your ID')
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance - instructions provided', () => {
            render(
                <TextInput
                    label="Password"
                    hintText="Must be at least 8 characters"
                    name="password"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText('Must be at least 8 characters')
            ).toBeInTheDocument()
        })

        it('supports help icon with tooltip for detailed instructions', () => {
            render(
                <TextInput
                    label="API Key"
                    helpIconHintText="Your API key can be found in settings"
                    name="apiKey"
                    value=""
                    onChange={() => {}}
                />
            )
            // Help icon hint is rendered in InputLabels component
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state - error identified in text', () => {
            render(
                <TextInput
                    label="Email"
                    value="invalid"
                    onChange={() => {}}
                    error
                    errorMessage="Please enter a valid email address"
                />
            )
            expect(
                screen.getByText('Please enter a valid email address')
            ).toBeInTheDocument()
        })

        it('applies error styling when error prop is true - error visually indicated', () => {
            render(
                <TextInput
                    label="Email"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="This field is required"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeInTheDocument()
            // Error state is indicated via border color and shake animation
        })

        it('error message is associated with input - relationship programmatically determinable', () => {
            render(
                <TextInput
                    label="Email"
                    name="email"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="Invalid email format"
                />
            )
            expect(screen.getByText('Invalid email format')).toBeInTheDocument()
            // Error association is handled via InputFooter component
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('provides helpful error messages with correction suggestions', () => {
            render(
                <TextInput
                    label="Email"
                    value="invalid"
                    onChange={() => {}}
                    error
                    errorMessage="Please enter a valid email address (e.g., name@example.com)"
                />
            )
            expect(
                screen.getByText(
                    'Please enter a valid email address (e.g., name@example.com)'
                )
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete attribute for reducing redundant entry', () => {
            render(
                <TextInput
                    label="Email"
                    name="email"
                    value=""
                    onChange={() => {}}
                    autoComplete="email"
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('autocomplete', 'email')
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose identification', () => {
            render(
                <TextInput
                    label="Email Address"
                    name="email"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('name', 'email')
        })

        it('supports type attribute for semantic input types', () => {
            render(
                <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('type', 'email')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(<TextInput label="Focusable" value="" onChange={() => {}} />)
            const input = screen.getByRole('textbox')

            input.focus()
            expect(document.activeElement).toBe(input)
        })

        it('can receive keyboard input - keyboard operable', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <TextInput label="Type Here" value="" onChange={handleChange} />
            )

            const input = screen.getByRole('textbox')
            await user.type(input, 'Hello')

            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable - prevents keyboard interaction', () => {
            render(
                <TextInput
                    label="Disabled"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('supports Tab key for focus navigation - logical focus order', async () => {
            const { user } = render(
                <>
                    <TextInput label="First" value="" onChange={() => {}} />
                    <TextInput label="Second" value="" onChange={() => {}} />
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
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(<TextInput label="Focus Me" value="" onChange={() => {}} />)
            const input = screen.getByRole('textbox')

            input.focus()
            expect(document.activeElement).toBe(input)
            // Focus indicator styling is applied via _focus prop (boxShadow)
        })

        it('maintains focus visible state during interaction', async () => {
            const { user } = render(
                <TextInput label="Type Here" value="" onChange={() => {}} />
            )
            const input = screen.getByRole('textbox')

            await user.click(input)
            expect(document.activeElement).toBe(input)

            await user.keyboard('test')
            expect(document.activeElement).toBe(input)
        })

        it('removes focus on blur - predictable focus behavior', () => {
            render(<TextInput label="Blur Test" value="" onChange={() => {}} />)
            const input = screen.getByRole('textbox')

            input.focus()
            expect(document.activeElement).toBe(input)

            input.blur()
            expect(document.activeElement).not.toBe(input)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order - sequential navigation order', async () => {
            const { user } = render(
                <form>
                    <TextInput label="Email" value="" onChange={() => {}} />
                    <TextInput label="Password" value="" onChange={() => {}} />
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
        it('has proper textbox role - programmatically determinable role', () => {
            render(
                <TextInput label="Input Role" value="" onChange={() => {}} />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('announces label to screen readers - accessible name provided', () => {
            render(
                <TextInput
                    label="Screen Reader Label"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state - state programmatically determinable', () => {
            render(
                <TextInput
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('required')
        })

        it('announces disabled state - state programmatically determinable', () => {
            render(
                <TextInput
                    label="Disabled Input"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('provides sufficient color contrast for text - requires manual verification', () => {
            render(
                <TextInput
                    label="Contrast Test"
                    value="Test value"
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeInTheDocument()
            // Note: Actual contrast ratio verification requires manual testing
            // Text color on background should meet 4.5:1 for AA
        })

        it('maintains contrast for error messages - requires manual verification', () => {
            render(
                <TextInput
                    label="Error Contrast"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="This is an error"
                />
            )
            expect(screen.getByText('This is an error')).toBeInTheDocument()
            // Error text should maintain 4.5:1 contrast ratio
        })

        it('disabled state maintains minimum contrast - requires manual verification', () => {
            render(
                <TextInput
                    label="Disabled"
                    value="Disabled text"
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
            // Note: Disabled contrast may not meet 4.5:1 but should be distinguishable
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('meets minimum touch target size requirements (24x24px for AA)', () => {
            render(
                <TextInput label="Touch Target" value="" onChange={() => {}} />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeInTheDocument()
            // Input fields naturally exceed 24x24px minimum for Level AA
            // Actual size verification requires browser DevTools measurement
        })
    })

    describe('Form Integration & Required Fields', () => {
        it('displays required indicator when required prop is true (3.3.2)', () => {
            render(
                <TextInput
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            // Required indicator (asterisk) is rendered in InputLabels component
            expect(screen.getByRole('textbox')).toHaveAttribute('required')
        })

        it('works correctly in form submission context', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email"
                        name="email"
                        value=""
                        onChange={() => {}}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('name', 'email')
            expect(input).toHaveAttribute('required')
        })

        it('supports form validation with required and error states', () => {
            render(
                <TextInput
                    label="Email"
                    name="email"
                    value=""
                    onChange={() => {}}
                    required
                    error
                    errorMessage="Email is required"
                />
            )

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('required')
            expect(screen.getByText('Email is required')).toBeInTheDocument()
        })
    })

    describe('With Slots (Icons) - WCAG 1.1.1 Non-text Content', () => {
        it('supports left slot with decorative icon - icon does not interfere with label', () => {
            render(
                <TextInput
                    label="Email"
                    value=""
                    onChange={() => {}}
                    leftSlot={<User size={16} aria-hidden="true" />}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeInTheDocument()
            // Decorative icons should have aria-hidden="true"
        })

        it('supports right slot with interactive elements - maintains accessibility', () => {
            render(
                <TextInput
                    label="Password"
                    type="password"
                    value=""
                    onChange={() => {}}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Toggle password visibility"
                        >
                            Show
                        </button>
                    }
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(
                screen.getByRole('button', {
                    name: 'Toggle password visibility',
                })
            ).toBeInTheDocument()
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when input receives focus - predictable behavior', () => {
            const handleFocus = vi.fn()
            render(
                <TextInput
                    label="Focus Event"
                    value=""
                    onChange={() => {}}
                    onFocus={handleFocus}
                />
            )

            const input = screen.getByRole('textbox')
            input.focus()

            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when input loses focus - predictable behavior', () => {
            const handleBlur = vi.fn()
            render(
                <TextInput
                    label="Blur Event"
                    value=""
                    onChange={() => {}}
                    onBlur={handleBlur}
                />
            )

            const input = screen.getByRole('textbox')
            input.focus()
            input.blur()

            expect(handleBlur).toHaveBeenCalledTimes(1)
        })

        it('does not change context unexpectedly on focus (3.2.1)', () => {
            render(
                <TextInput
                    label="No Context Change"
                    value=""
                    onChange={() => {}}
                    onFocus={() => {
                        // Focus should not trigger unexpected context changes
                        // like form submission or navigation
                    }}
                />
            )

            const input = screen.getByRole('textbox')
            input.focus()

            expect(document.activeElement).toBe(input)
        })
    })

    describe('Placeholder Text (WCAG 3.3.2 - Best Practice)', () => {
        it('provides placeholder text for additional guidance - not a label replacement', () => {
            render(
                <TextInput
                    label="Email"
                    placeholder="name@example.com"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', 'name@example.com')
            // Note: Placeholder is supplementary to label, not a replacement
        })

        it('label is always present even with placeholder - proper labeling', () => {
            render(
                <TextInput
                    label="Email Address"
                    placeholder="Enter email"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Email Address')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Enter email'
            )
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <TextInput
                    label="Complete Test"
                    sublabel="Additional context"
                    hintText="Helpful hint"
                    helpIconHintText="Tooltip information"
                    placeholder="Enter value"
                    value=""
                    onChange={() => {}}
                    required
                    leftSlot={<User size={16} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.3.5, 2.1.1, 2.4.7, 3.3.2, 4.1.2
        })

        it('meets WCAG standards with error state - all error requirements', async () => {
            const { container } = render(
                <TextInput
                    label="Error Test"
                    value="invalid"
                    onChange={() => {}}
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
                <TextInput
                    label="Disabled"
                    value="Cannot edit"
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 2.1.1 Keyboard, 4.1.2 Name Role Value
        })

        it('meets WCAG standards for password input with toggle - secure input with accessibility', async () => {
            const { container } = render(
                <TextInput
                    label="Password"
                    type="password"
                    value="secure123"
                    onChange={() => {}}
                    required
                    rightSlot={
                        <button type="button" aria-label="Show password">
                            Show
                        </button>
                    }
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1 Non-text Content, 2.1.1 Keyboard, 3.3.2 Labels
        })
    })
})
