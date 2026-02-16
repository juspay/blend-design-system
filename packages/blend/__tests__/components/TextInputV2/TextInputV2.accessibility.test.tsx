import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import { Mail } from 'lucide-react'
import TextInputV2 from '../../../lib/components/InputsV2/TextInputV2/TextInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'

describe('TextInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA)', () => {
        it('meets WCAG standards for default text input (axe-core validation)', async () => {
            const { container } = render(
                <TextInputV2
                    label="Email Address"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter your email"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all input sizes (sm, md, lg)', async () => {
            const sizes = [InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <TextInputV2
                        label={`${size} input`}
                        value=""
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
                <TextInputV2
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
                <TextInputV2
                    label="Email"
                    value="invalid"
                    onChange={() => {}}
                    error={{
                        show: true,
                        message: 'Please enter a valid email address',
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with input', () => {
            render(
                <TextInputV2
                    label="Full Name"
                    name="fullName"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox', { name: /full name/i })
            expect(input).toBeInTheDocument()
        })

        it('renders subLabel for additional context', () => {
            render(
                <TextInputV2
                    label="Full Name"
                    subLabel="As it appears on your ID"
                    name="fullName"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByText(/As it appears on your ID/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance', () => {
            render(
                <TextInputV2
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
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state', () => {
            render(
                <TextInputV2
                    label="Email"
                    value="invalid"
                    onChange={() => {}}
                    error={{
                        show: true,
                        message: 'Please enter a valid email address',
                    }}
                />
            )
            expect(
                screen.getByText('Please enter a valid email address')
            ).toBeInTheDocument()
        })

        it('error message is associated with input via aria-describedby', () => {
            render(
                <TextInputV2
                    label="Email"
                    name="email"
                    value=""
                    onChange={() => {}}
                    error={{
                        show: true,
                        message: 'Invalid email format',
                    }}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-describedby')
            expect(screen.getByText('Invalid email format')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete attribute', () => {
            render(
                <TextInputV2
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
        it('supports name attribute for input purpose', () => {
            render(
                <TextInputV2
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
                <TextInputV2
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
        it('is focusable with keyboard', () => {
            render(
                <TextInputV2 label="Focusable" value="" onChange={() => {}} />
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
                <TextInputV2
                    label="Type Here"
                    value=""
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'Hello')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable', () => {
            render(
                <TextInputV2
                    label="Disabled"
                    value=""
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
                    <TextInputV2 label="First" value="" onChange={() => {}} />
                    <TextInputV2 label="Second" value="" onChange={() => {}} />
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
                <TextInputV2 label="Focus Me" value="" onChange={() => {}} />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('removes focus on blur', () => {
            render(
                <TextInputV2 label="Blur Test" value="" onChange={() => {}} />
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
                    <TextInputV2 label="Email" value="" onChange={() => {}} />
                    <TextInputV2
                        label="Password"
                        value=""
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
                <TextInputV2 label="Input Role" value="" onChange={() => {}} />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('announces label to screen readers', () => {
            render(
                <TextInputV2
                    label="Screen Reader Label"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state', () => {
            render(
                <TextInputV2
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('announces disabled state', () => {
            render(
                <TextInputV2
                    label="Disabled Input"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toBeDisabled()
        })

        it('exposes error state via aria-invalid', () => {
            render(
                <TextInputV2
                    label="Error Field"
                    value=""
                    onChange={() => {}}
                    error={{ show: true, message: 'Error' }}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('With Slots (WCAG 1.1.1 Non-text Content)', () => {
        it('supports left slot with decorative icon', async () => {
            const { container } = render(
                <TextInputV2
                    label="Email"
                    value=""
                    onChange={() => {}}
                    leftSlot={{
                        slot: <Mail size={16} aria-hidden="true" />,
                        maxHeight: 16,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports right slot with accessible button', () => {
            render(
                <TextInputV2
                    label="Password"
                    type="password"
                    value=""
                    onChange={() => {}}
                    rightSlot={{
                        slot: (
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                            >
                                Show
                            </button>
                        ),
                        maxHeight: 16,
                    }}
                />
            )
            expect(screen.getByLabelText('Password')).toBeInTheDocument()
            expect(
                screen.getByRole('button', {
                    name: 'Toggle password visibility',
                })
            ).toBeInTheDocument()
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when input receives focus', () => {
            const handleFocus = vi.fn()
            render(
                <TextInputV2
                    label="Focus Event"
                    value=""
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
                <TextInputV2
                    label="Blur Event"
                    value=""
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
                <TextInputV2
                    label="Email"
                    placeholder="name@example.com"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', 'name@example.com')
        })

        it('label is present even with placeholder', () => {
            render(
                <TextInputV2
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

    describe('Comprehensive WCAG compliance', () => {
        it('meets WCAG standards with all features combined', async () => {
            const { container } = render(
                <TextInputV2
                    label="Complete Test"
                    subLabel="Additional context"
                    hintText="Helpful hint"
                    helpIconText={{
                        text: 'Tooltip information',
                        onClick: () => {},
                    }}
                    placeholder="Enter value"
                    value=""
                    onChange={() => {}}
                    required
                    leftSlot={{
                        slot: <Mail size={16} aria-hidden="true" />,
                        maxHeight: 16,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state', async () => {
            const { container } = render(
                <TextInputV2
                    label="Error Test"
                    value="invalid"
                    onChange={() => {}}
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
                <TextInputV2
                    label="Disabled"
                    value="Cannot edit"
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for password input with toggle', async () => {
            const { container } = render(
                <TextInputV2
                    label="Password"
                    type="password"
                    value="secure123"
                    onChange={() => {}}
                    required
                    rightSlot={{
                        slot: (
                            <button type="button" aria-label="Show password">
                                Show
                            </button>
                        ),
                        maxHeight: 16,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
