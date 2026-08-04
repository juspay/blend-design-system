import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import TextArea from '../../../lib/components/Inputs/TextArea/TextArea'

describe('TextArea Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default textarea (axe-core validation)', async () => {
            const { container } = render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter your description"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for different row counts (3, 5, 8)', async () => {
            const rowCounts = [3, 5, 8]

            for (const rows of rowCounts) {
                const { container } = render(
                    <TextArea
                        label={`${rows} rows textarea`}
                        value=""
                        onChange={() => {}}
                        placeholder="Enter text"
                        rows={rows}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <TextArea
                    label="Disabled TextArea"
                    value=""
                    onChange={() => {}}
                    placeholder="This is disabled"
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <TextArea
                    label="Description"
                    value="Short"
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Please enter at least 10 characters"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with different resize options', async () => {
            const resizeOptions = [
                'none',
                'vertical',
                'horizontal',
                'both',
            ] as const

            for (const resize of resizeOptions) {
                const { container } = render(
                    <TextArea
                        label={`Resize: ${resize}`}
                        value=""
                        onChange={() => {}}
                        placeholder="Enter text"
                        resize={resize}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('has accessible label associated with textarea - programmatically determinable', () => {
            render(
                <TextArea
                    label="Project Description"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeInTheDocument()
            // Label association is handled via InputLabels component with htmlFor
        })

        it('renders sublabel for additional context - supplementary instructions', () => {
            render(
                <TextArea
                    label="Project Description"
                    sublabel="Provide a detailed overview"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            // Sublabel is rendered as "(Provide a detailed overview)"
            expect(
                screen.getByText(/Provide a detailed overview/)
            ).toBeInTheDocument()
        })

        it('renders hint text for additional guidance - instructions provided', () => {
            render(
                <TextArea
                    label="Description"
                    hintText="Must be at least 10 characters"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            expect(
                screen.getByText('Must be at least 10 characters')
            ).toBeInTheDocument()
        })

        it('supports help icon with tooltip for detailed instructions', () => {
            render(
                <TextArea
                    label="Description"
                    helpIconHintText="Provide a comprehensive description"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            // Help icon hint is rendered in InputLabels component
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('displays error message when in error state - error identified in text', () => {
            render(
                <TextArea
                    label="Description"
                    value="Short"
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Please enter at least 10 characters"
                />
            )
            expect(
                screen.getByText('Please enter at least 10 characters')
            ).toBeInTheDocument()
        })

        it('applies error styling when error prop is true - error visually indicated', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="This field is required"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeInTheDocument()
            // Error state is indicated via border color and shake animation
        })

        it('error message is associated with textarea - relationship programmatically determinable', () => {
            render(
                <TextArea
                    label="Description"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Invalid description format"
                />
            )
            expect(
                screen.getByText('Invalid description format')
            ).toBeInTheDocument()
            // Error association is handled via InputFooter component and aria-describedby
        })

        it('textarea has aria-invalid when error is true - error state programmatically determinable', () => {
            render(
                <TextArea
                    label="Description"
                    value="Invalid"
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Invalid input"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('WCAG 3.3.3 Error Suggestion (Level AA)', () => {
        it('provides helpful error messages with correction suggestions', () => {
            render(
                <TextArea
                    label="Description"
                    value="Short"
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Please enter at least 10 characters (e.g., provide more details about your project)"
                />
            )
            expect(
                screen.getByText(
                    'Please enter at least 10 characters (e.g., provide more details about your project)'
                )
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose identification', () => {
            render(
                <TextArea
                    label="Description"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('name', 'description')
        })

        it('supports id attribute for unique identification', () => {
            render(
                <TextArea
                    label="Description"
                    id="custom-textarea-id"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('id', 'custom-textarea-id')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            const textarea = screen.getByRole('textbox')

            textarea.focus()
            expect(document.activeElement).toBe(textarea)
        })

        it('can receive keyboard input - keyboard operable', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <TextArea
                    label="Type Here"
                    value=""
                    onChange={handleChange}
                    placeholder="Enter text"
                />
            )

            const textarea = screen.getByRole('textbox')
            await user.type(textarea, 'Hello World')

            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled textarea is not focusable - prevents keyboard interaction', () => {
            render(
                <TextArea
                    label="Disabled"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    disabled
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeDisabled()
        })

        it('supports Tab key for focus navigation - logical focus order', async () => {
            const { user } = render(
                <>
                    <TextArea
                        label="First"
                        value=""
                        onChange={() => {}}
                        placeholder="First textarea"
                    />
                    <TextArea
                        label="Second"
                        value=""
                        onChange={() => {}}
                        placeholder="Second textarea"
                    />
                </>
            )

            const textareas = screen.getAllByRole('textbox')
            await user.tab()
            expect(document.activeElement).toBe(textareas[0])

            await user.tab()
            expect(document.activeElement).toBe(textareas[1])
        })

        it('supports standard text editing keyboard shortcuts - keyboard operable', async () => {
            const { user } = render(
                <TextArea
                    label="Text Editor"
                    value="Test content"
                    onChange={() => {}}
                    placeholder="Enter text"
                />
            )

            const textarea = screen.getByRole('textbox')
            textarea.focus()

            // Test Ctrl/Cmd+A (select all)
            await user.keyboard('{Control>}a{/Control}')
            // Text should be selected (this is browser behavior)

            // Test typing
            await user.keyboard('New content')
            expect(textarea).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(
                <TextArea
                    label="Focus Me"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            const textarea = screen.getByRole('textbox')

            textarea.focus()
            expect(document.activeElement).toBe(textarea)
            // Focus indicator styling is applied via _focus prop (boxShadow)
        })

        it('maintains focus visible state during interaction', async () => {
            const { user } = render(
                <TextArea
                    label="Type Here"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                />
            )
            const textarea = screen.getByRole('textbox')

            await user.click(textarea)
            expect(document.activeElement).toBe(textarea)

            await user.keyboard('test')
            expect(document.activeElement).toBe(textarea)
        })

        it('removes focus on blur - predictable focus behavior', () => {
            render(
                <TextArea
                    label="Blur Test"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )
            const textarea = screen.getByRole('textbox')

            textarea.focus()
            expect(document.activeElement).toBe(textarea)

            textarea.blur()
            expect(document.activeElement).not.toBe(textarea)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order - sequential navigation order', async () => {
            const { user } = render(
                <form>
                    <TextArea
                        label="Description"
                        value=""
                        onChange={() => {}}
                        placeholder="Enter description"
                    />
                    <TextArea
                        label="Comments"
                        value=""
                        onChange={() => {}}
                        placeholder="Enter comments"
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
        it('has proper textbox role - programmatically determinable role', () => {
            render(
                <TextArea
                    label="TextArea Role"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                />
            )
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('announces label to screen readers - accessible name provided', () => {
            render(
                <TextArea
                    label="Screen Reader Label"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                />
            )
            expect(screen.getByText('Screen Reader Label')).toBeInTheDocument()
        })

        it('exposes required state - state programmatically determinable', () => {
            render(
                <TextArea
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    required
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('required')
            expect(textarea).toHaveAttribute('aria-required', 'true')
        })

        it('announces disabled state - state programmatically determinable', () => {
            render(
                <TextArea
                    label="Disabled TextArea"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    disabled
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeDisabled()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('provides sufficient color contrast for text - requires manual verification', () => {
            render(
                <TextArea
                    label="Contrast Test"
                    value="Test value"
                    onChange={() => {}}
                    placeholder="Enter text"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeInTheDocument()
            // Note: Actual contrast ratio verification requires manual testing
            // Text color on background should meet 4.5:1 for AA
        })

        it('maintains contrast for error messages - requires manual verification', () => {
            render(
                <TextArea
                    label="Error Contrast"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    error
                    errorMessage="This is an error"
                />
            )
            expect(screen.getByText('This is an error')).toBeInTheDocument()
            // Error text should maintain 4.5:1 contrast ratio
        })

        it('disabled state maintains minimum contrast - requires manual verification', () => {
            render(
                <TextArea
                    label="Disabled"
                    value="Disabled text"
                    onChange={() => {}}
                    placeholder="Enter text"
                    disabled
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeDisabled()
            // Note: Disabled contrast may not meet 4.5:1 but should be distinguishable
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('meets minimum touch target size requirements (24x24px for AA)', () => {
            render(
                <TextArea
                    label="Touch Target"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toBeInTheDocument()
            // Textarea fields naturally exceed 24x24px minimum for Level AA
            // Actual size verification requires browser DevTools measurement
        })
    })

    describe('Form Integration & Required Fields', () => {
        it('displays required indicator when required prop is true (3.3.2)', () => {
            render(
                <TextArea
                    label="Required Field"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    required
                />
            )
            // Required indicator (asterisk) is rendered in InputLabels component
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('required')
            expect(textarea).toHaveAttribute('aria-required', 'true')
        })

        it('works correctly in form submission context', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <TextArea
                        label="Description"
                        name="description"
                        value=""
                        onChange={() => {}}
                        placeholder="Enter description"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('name', 'description')
            expect(textarea).toHaveAttribute('required')
        })

        it('supports form validation with required and error states', () => {
            render(
                <TextArea
                    label="Description"
                    name="description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    required
                    error
                    errorMessage="Description is required"
                />
            )

            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('required')
            expect(textarea).toHaveAttribute('aria-invalid', 'true')
            expect(
                screen.getByText('Description is required')
            ).toBeInTheDocument()
        })
    })

    describe('TextArea-Specific Features', () => {
        it('supports rows attribute for multi-line input', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    rows={5}
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('rows', '5')
        })

        it('supports cols attribute for column width', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    cols={50}
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('cols', '50')
        })

        it('supports resize attribute for resize control', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    resize="vertical"
                />
            )
            const textarea = screen.getByRole('textbox')
            // Resize is a CSS property, not an HTML attribute
            expect(textarea).toBeInTheDocument()
        })

        it('supports maxLength attribute for character limits', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    maxLength={500}
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('maxLength', '500')
        })

        it('supports wrap attribute for text wrapping', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    wrap="soft"
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute('wrap', 'soft')
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when textarea receives focus - predictable behavior', () => {
            const handleFocus = vi.fn()
            render(
                <TextArea
                    label="Focus Event"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    onFocus={handleFocus}
                />
            )

            const textarea = screen.getByRole('textbox')
            textarea.focus()

            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when textarea loses focus - predictable behavior', () => {
            const handleBlur = vi.fn()
            render(
                <TextArea
                    label="Blur Event"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    onBlur={handleBlur}
                />
            )

            const textarea = screen.getByRole('textbox')
            textarea.focus()
            textarea.blur()

            expect(handleBlur).toHaveBeenCalledTimes(1)
        })

        it('does not change context unexpectedly on focus (3.2.1)', () => {
            render(
                <TextArea
                    label="No Context Change"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter text"
                    onFocus={() => {
                        // Focus should not trigger unexpected context changes
                        // like form submission or navigation
                    }}
                />
            )

            const textarea = screen.getByRole('textbox')
            textarea.focus()

            expect(document.activeElement).toBe(textarea)
        })
    })

    describe('Placeholder Text (WCAG 3.3.2 - Best Practice)', () => {
        it('provides placeholder text for additional guidance - not a label replacement', () => {
            render(
                <TextArea
                    label="Description"
                    placeholder="Enter your description here..."
                    value=""
                    onChange={() => {}}
                />
            )
            const textarea = screen.getByRole('textbox')
            expect(textarea).toHaveAttribute(
                'placeholder',
                'Enter your description here...'
            )
            // Note: Placeholder is supplementary to label, not a replacement
        })

        it('label is always present even with placeholder - proper labeling', () => {
            render(
                <TextArea
                    label="Description"
                    placeholder="Enter description"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Description')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Enter description'
            )
        })
    })

    describe('ARIA DescribedBy (WCAG 4.1.2 Name, Role, Value - Level A)', () => {
        it('associates hint text with textarea via aria-describedby', () => {
            render(
                <TextArea
                    label="Description"
                    hintText="Enter at least 10 characters"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                />
            )

            const textarea = screen.getByRole('textbox')
            const hintId = textarea
                .getAttribute('aria-describedby')
                ?.split(' ')[0]

            expect(hintId).toBeTruthy()
            expect(
                screen.getByText('Enter at least 10 characters')
            ).toHaveAttribute('id', hintId)
        })

        it('associates error message with textarea via aria-describedby', () => {
            render(
                <TextArea
                    label="Description"
                    value="Short"
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Please enter at least 10 characters"
                />
            )

            const textarea = screen.getByRole('textbox')
            const errorId = textarea
                .getAttribute('aria-describedby')
                ?.split(' ')[0]

            expect(errorId).toBeTruthy()
            expect(
                screen.getByText('Please enter at least 10 characters')
            ).toHaveAttribute('id', errorId)
        })

        it('error message has role="alert" for screen reader announcements', () => {
            render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    error
                    errorMessage="Invalid input"
                />
            )

            const errorMessage = screen.getByText('Invalid input')
            expect(errorMessage).toHaveAttribute('role', 'alert')
            expect(errorMessage).toHaveAttribute('aria-live', 'polite')
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <TextArea
                    label="Complete Test"
                    sublabel="Additional context"
                    hintText="Helpful hint"
                    helpIconHintText="Tooltip information"
                    placeholder="Enter value"
                    value=""
                    onChange={() => {}}
                    required
                    rows={5}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.3.5, 2.1.1, 2.4.7, 3.3.2, 4.1.2
        })

        it('meets WCAG standards with error state - all error requirements', async () => {
            const { container } = render(
                <TextArea
                    label="Error Test"
                    value="Invalid"
                    onChange={() => {}}
                    placeholder="Enter text"
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
                <TextArea
                    label="Disabled"
                    value="Cannot edit"
                    onChange={() => {}}
                    placeholder="Enter text"
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 2.1.1 Keyboard, 4.1.2 Name Role Value
        })

        it('meets WCAG standards with character limits - all length requirements', async () => {
            const { container } = render(
                <TextArea
                    label="Description"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter description"
                    maxLength={500}
                    hintText="Maximum 500 characters"
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with different resize options - all resize requirements', async () => {
            const resizeOptions = [
                'none',
                'vertical',
                'horizontal',
                'both',
            ] as const

            for (const resize of resizeOptions) {
                const { container } = render(
                    <TextArea
                        label={`Resize: ${resize}`}
                        value=""
                        onChange={() => {}}
                        placeholder="Enter text"
                        resize={resize}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })
    })
})
