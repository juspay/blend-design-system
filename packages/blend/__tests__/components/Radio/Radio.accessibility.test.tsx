import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Radio from '../../../lib/components/Radio/Radio'
import { RadioPropsBuilder, RadioTestFactory } from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe('Radio Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default radio (axe-core validation)', async () => {
            const { container } = render(
                <Radio value="test">Accessible Radio</Radio>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all radio states (checked, unchecked, disabled, error)', async () => {
            const states = [
                RadioTestFactory.default(),
                RadioTestFactory.checked(),
                RadioTestFactory.disabled(),
                RadioTestFactory.withError(),
            ]

            for (const props of states) {
                const { container, unmount } = render(<Radio {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const props = RadioTestFactory.disabled()
            const { container } = render(<Radio {...props} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content (1.1.1 Non-text Content, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <Radio
                    value="complex"
                    subtext="Additional information"
                    slot={<MockIcon />}
                    required
                >
                    Complex Radio with all features
                </Radio>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all sizes', async () => {
            const sizes = RadioTestFactory.allSizes()

            for (const props of sizes) {
                const { container, unmount } = render(<Radio {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for radio groups', async () => {
            const { container } = render(
                <fieldset>
                    <legend>Choose an option</legend>
                    <Radio name="group" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="group" value="option2">
                        Option 2
                    </Radio>
                    <Radio name="group" value="option3">
                        Option 3
                    </Radio>
                </fieldset>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(<Radio value="test">Focusable Radio</Radio>)
            const radio = screen.getByRole('radio')

            radio.focus()
            expect(document.activeElement).toBe(radio)
        })

        it('can be activated with Space key - keyboard activation support (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Space Key Radio
                </Radio>
            )

            const radio = screen.getByRole('radio')
            radio.focus()

            // WCAG 2.1.1: All functionality must be operable via keyboard
            // For native radio inputs, Space key is the standard activation method
            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalled()
            const callArgs = handleChange.mock
                .calls[0][0] as React.ChangeEvent<HTMLInputElement>
            expect(callArgs.target.checked).toBe(true)
        })

        it('maintains keyboard focus when Enter key is pressed (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Enter Key Test
                </Radio>
            )

            const radio = screen.getByRole('radio')
            radio.focus()

            // Note: Native radio inputs do NOT activate on Enter key
            // Enter key is reserved for form submission
            // Space key is the standard activation method for radio buttons
            // WCAG 2.1.1 compliance is met via Space key activation (tested above)
            await user.keyboard('{Enter}')

            // Enter should not activate the radio, but should not break focus
            expect(document.activeElement).toBe(radio)
            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled radios are not focusable (2.4.3 Focus Order)', () => {
            const props = RadioTestFactory.disabled()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeDisabled()
            // WCAG 2.1.1: Disabled elements should be removed from tab order
            // Native radio inputs handle this automatically via disabled attribute
            expect(radio).toHaveAttribute('disabled')
        })

        it('maintains focus visible state', () => {
            render(<Radio value="test">Focus Visible Radio</Radio>)
            const radio = screen.getByRole('radio')

            radio.focus()
            expect(document.activeElement).toBe(radio)
            // Focus visible styles are applied via CSS and tested through visual regression
        })

        it('supports Tab navigation', async () => {
            const { user } = render(
                <>
                    <Radio value="first">First Radio</Radio>
                    <Radio value="second">Second Radio</Radio>
                    <button>Button</button>
                </>
            )

            const firstRadio = screen.getByRole('radio', {
                name: 'First Radio',
            })
            const secondRadio = screen.getByRole('radio', {
                name: 'Second Radio',
            })
            const button = screen.getByRole('button')

            // Tab through elements
            await user.tab()
            expect(document.activeElement).toBe(firstRadio)

            await user.tab()
            expect(document.activeElement).toBe(secondRadio)

            await user.tab()
            expect(document.activeElement).toBe(button)
        })

        it('supports arrow key navigation in radio groups', async () => {
            const { user } = render(
                <>
                    <Radio name="group" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="group" value="option2">
                        Option 2
                    </Radio>
                    <Radio name="group" value="option3">
                        Option 3
                    </Radio>
                </>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })
            const radio2 = screen.getByRole('radio', { name: 'Option 2' })
            const radio3 = screen.getByRole('radio', { name: 'Option 3' })

            // Focus first radio
            radio1.focus()
            expect(document.activeElement).toBe(radio1)

            // Arrow down should move to next radio
            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(radio2)

            // Arrow down again
            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(radio3)

            // Arrow up should move back
            await user.keyboard('{ArrowUp}')
            expect(document.activeElement).toBe(radio2)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper radio role - role is programmatically determinable', () => {
            render(<Radio value="test">Screen Reader Radio</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('announces radio label to screen readers - accessible name provided', () => {
            render(<Radio value="test">Screen Reader Label</Radio>)
            const radio = screen.getByRole('radio', {
                name: 'Screen Reader Label',
            })
            expect(radio).toBeInTheDocument()
        })

        it('properly handles radio without label', () => {
            render(<Radio value="test" aria-label="Unlabeled radio" />)
            const radio = screen.getByRole('radio', {
                name: 'Unlabeled radio',
            })
            expect(radio).toBeInTheDocument()
        })

        it('announces checked state correctly - state is programmatically determinable', () => {
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            // Native radio inputs communicate checked state via checked property
            // WCAG 4.1.2: State is programmatically determinable via checked attribute
            expect(radio).toBeChecked()
            expect(radio).toHaveProperty('checked', true)
        })

        it('announces unchecked state correctly - state is programmatically determinable', () => {
            render(<Radio value="test">Unchecked Radio</Radio>)

            const radio = screen.getByRole('radio')
            // Native radio inputs communicate unchecked state via checked property
            // WCAG 4.1.2: State is programmatically determinable via checked attribute
            expect(radio).not.toBeChecked()
            expect(radio).toHaveProperty('checked', false)
        })

        it('announces disabled state - state programmatically determinable (WCAG 4.1.2)', () => {
            const props = RadioTestFactory.disabled()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeDisabled()
            expect(radio).toHaveAttribute('disabled')
            // Native radio inputs communicate disabled state via disabled attribute
        })

        it('supports aria-describedby for subtext (WCAG 3.3.2, 4.1.2)', () => {
            render(
                <Radio value="test" subtext="This is additional information">
                    Radio with description
                </Radio>
            )

            const radio = screen.getByRole('radio')
            const describedBy = radio.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()

            if (describedBy) {
                const description = document.getElementById(describedBy)
                expect(description).toBeTruthy()
                expect(description).toHaveTextContent(
                    'This is additional information'
                )
            }
        })

        it('supports aria-required for required fields (WCAG 3.3.2 Labels or Instructions) - MUST have aria-required="true"', () => {
            const props = RadioTestFactory.required()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            // WCAG 3.3.2: Required fields must be programmatically determinable
            // Native radio inputs support both HTML 'required' and aria-required
            expect(radio).toHaveAttribute('aria-required', 'true')
            expect(radio).toHaveAttribute('required')

            // WCAG 3.3.2: Visual indication (asterisk) must be present
            // Accessible name includes asterisk (*) for visual indication
            const label = document.querySelector(`label[for="${radio.id}"]`)
            expect(label).toBeTruthy()
            if (label) {
                expect(label.textContent).toContain('*')
            }
        })

        it('supports custom aria-label - accessible name override (WCAG 4.1.2)', () => {
            render(
                <Radio value="test" aria-label="Custom accessibility label">
                    Visible Label
                </Radio>
            )

            const radio = screen.getByRole('radio', {
                name: 'Custom accessibility label',
            })
            expect(radio).toBeInTheDocument()
            // aria-label takes precedence over visible label text
        })

        it('supports aria-labelledby for external labels - relationships programmatically determinable (WCAG 4.1.2)', () => {
            render(
                <>
                    <span id="external-label">External Label</span>
                    <Radio value="test" aria-labelledby="external-label">
                        Internal Label
                    </Radio>
                </>
            )

            const radio = screen.getByRole('radio', {
                name: 'External Label',
            })
            expect(radio).toBeInTheDocument()
            expect(radio).toHaveAttribute('aria-labelledby', 'external-label')
            // aria-labelledby takes precedence over visible label text for accessible name
        })

        it('announces radio group context - relationships programmatically determinable (WCAG 1.3.1, 4.1.2)', () => {
            render(
                <fieldset>
                    <legend>Choose your preference</legend>
                    <Radio name="preference" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="preference" value="option2">
                        Option 2
                    </Radio>
                </fieldset>
            )

            const group = screen.getByRole('group', {
                name: 'Choose your preference',
            })
            const radios = screen.getAllByRole('radio')

            expect(group).toBeInTheDocument()
            expect(radios).toHaveLength(2)
            // WCAG 1.3.1: Fieldset and legend provide group context
            // WCAG 4.1.2: Radio group relationships are programmatically determinable
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - focus must be visible', () => {
            render(<Radio value="test">Focus Indicator</Radio>)
            const radio = screen.getByRole('radio')

            radio.focus()
            expect(document.activeElement).toBe(radio)
            // Focus indicator styles are applied via CSS :focus-visible
            // WCAG 2.4.7 requires focus to be visible (tested via visual regression)
        })

        it('removes focus on blur', () => {
            render(<Radio value="test">Blur Test</Radio>)
            const radio = screen.getByRole('radio')

            radio.focus()
            expect(document.activeElement).toBe(radio)

            radio.blur()
            expect(document.activeElement).not.toBe(radio)
        })

        it('maintains focus after activation', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Focus Maintenance
                </Radio>
            )

            const radio = screen.getByRole('radio')
            radio.focus()

            await user.keyboard(' ')
            expect(document.activeElement).toBe(radio)
            expect(handleChange).toHaveBeenCalled()
        })

        it('handles focus with mouse and keyboard consistently', async () => {
            const { user } = render(
                <Radio value="test">Consistent Focus</Radio>
            )
            const radio = screen.getByRole('radio')

            // Focus with mouse click
            await user.click(radio)
            expect(document.activeElement).toBe(radio)

            radio.blur()

            // Focus with keyboard
            await user.tab()
            expect(document.activeElement).toBe(radio)
        })

        it('manages focus in radio groups correctly', async () => {
            const { user } = render(
                <>
                    <Radio name="group" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="group" value="option2" checked>
                        Option 2
                    </Radio>
                    <Radio name="group" value="option3">
                        Option 3
                    </Radio>
                </>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })
            const radio2 = screen.getByRole('radio', { name: 'Option 2' })

            // Tab should focus the checked radio in the group
            await user.tab()
            expect(document.activeElement).toBe(radio2)

            // Arrow keys should move focus within the group
            await user.keyboard('{ArrowUp}')
            expect(document.activeElement).toBe(radio1)
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('announces error state to screen readers - MUST have aria-invalid="true"', () => {
            const props = RadioTestFactory.withError()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            // WCAG 4.1.2 and 4.1.3 require aria-invalid="true" for error state
            // This is programmatically determinable by assistive technologies
            expect(radio).toHaveAttribute('aria-invalid', 'true')
        })

        it('maintains accessibility with error and other states - MUST have aria-invalid="true"', async () => {
            const props = new RadioPropsBuilder()
                .withChildren('Error Required Radio')
                .withValue('error-required')
                .withError()
                .withRequired()
                .withSubtext('This field has an error')
                .build()

            const { container } = render(<Radio {...props} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()

            const radio = screen.getByRole('radio')
            // WCAG 4.1.3: Error state must be communicated via aria-invalid="true"
            expect(radio).toHaveAttribute('aria-invalid', 'true')
            // WCAG 3.3.2: Required state must be communicated
            expect(radio).toHaveAttribute('aria-required', 'true')
            // WCAG 4.1.2: Subtext must be connected via aria-describedby
            const describedBy = radio.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()
            if (describedBy) {
                const description = document.getElementById(describedBy)
                expect(description).toHaveTextContent('This field has an error')
            }
        })

        it('supports error messages with aria-describedby (WCAG 4.1.3 Status Messages)', () => {
            render(
                <>
                    <Radio
                        value="error"
                        aria-describedby="error-message"
                        error
                        required
                    >
                        Radio with error
                    </Radio>
                    <div id="error-message" role="alert">
                        This field is required
                    </div>
                </>
            )

            const radio = screen.getByRole('radio')
            const errorMessage = screen.getByRole('alert')

            // WCAG 4.1.3: Error state must be communicated
            expect(radio).toHaveAttribute('aria-invalid', 'true')
            expect(radio).toHaveAttribute('aria-describedby', 'error-message')
            expect(errorMessage).toHaveTextContent('This field is required')
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('renders radio component for contrast verification (WCAG 1.4.3)', () => {
            // Note: Color contrast ratios must be verified manually using tools like
            // WebAIM Contrast Checker or Colour Contrast Analyser
            // WCAG 1.4.3 requires 4.5:1 for normal text, 3:1 for large text
            render(<Radio value="test">Default Radio</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('renders disabled radio for contrast verification (WCAG 1.4.3)', () => {
            // Manual verification required: Disabled state must maintain 4.5:1 contrast
            const props = RadioTestFactory.disabled()
            render(<Radio {...props} />)
            expect(screen.getByRole('radio')).toBeDisabled()
        })

        it('renders error state radio for contrast verification (WCAG 1.4.3, 4.1.3)', () => {
            // Manual verification required: Error state must maintain 4.5:1 contrast
            // WCAG 4.1.3: Error state must be communicated via aria-invalid="true"
            const props = RadioTestFactory.withError()
            render(<Radio {...props} />)
            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders checked state radio for contrast verification (WCAG 1.4.3)', () => {
            // Manual verification required: Checked indicator must maintain 3:1 contrast
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)
            expect(screen.getByRole('radio')).toBeChecked()
        })
    })

    describe('WCAG 2.5.5 Target Size (Level AAA)', () => {
        it('renders radio component for touch target size verification (WCAG 2.5.5)', () => {
            // Note: Touch target size must be verified manually using browser DevTools
            // WCAG 2.5.5 AAA requires minimum 44x44px interactive area
            // This can be measured via getBoundingClientRect() including padding
            render(<Radio value="test">Touch Target</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('renders all sizes for touch target verification (WCAG 2.5.5)', () => {
            // Manual verification required: All sizes must have 44x44px interactive area
            const sizes = RadioTestFactory.allSizes()

            sizes.forEach((props) => {
                const { unmount } = render(<Radio {...props} />)
                const radio = screen.getByRole('radio')
                expect(radio).toBeInTheDocument()
                unmount()
            })
        })
    })

    describe('WCAG 1.3.1 Info and Relationships - Label Association (Level A)', () => {
        it('properly associates label with radio via htmlFor/id (WCAG 1.3.1, 3.3.2)', () => {
            render(
                <Radio id="test-radio" value="test">
                    Associated Label
                </Radio>
            )

            const radio = screen.getByRole('radio')
            // WCAG 1.3.1: Label must be programmatically associated with radio
            // WCAG 3.3.2: Labels must be provided for form controls
            const label = document.querySelector(`label[for="${radio.id}"]`)
            expect(label).toBeInTheDocument()
            expect(label).toHaveTextContent('Associated Label')
        })

        it('clicking label activates radio (WCAG 2.1.1 Keyboard, 3.3.2 Labels)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Clickable Label
                </Radio>
            )

            // WCAG 3.3.2: Clicking label should activate the associated control
            const label = screen.getByText('Clickable Label')
            await user.click(label)

            expect(handleChange).toHaveBeenCalled()
            const callArgs = handleChange.mock
                .calls[0][0] as React.ChangeEvent<HTMLInputElement>
            expect(callArgs.target.checked).toBe(true)
        })

        it('renders radio without children when aria-label is provided (WCAG 4.1.2)', () => {
            // When no children provided, no label element should be rendered
            // aria-label provides the accessible name
            render(<Radio value="test" aria-label="Unlabeled radio" />)

            const radio = screen.getByRole('radio', { name: 'Unlabeled radio' })
            expect(radio).toBeInTheDocument()

            // No label element should exist when children are not provided
            const label = document.querySelector(`label[for="${radio.id}"]`)
            expect(label).not.toBeInTheDocument()
        })
    })

    describe('Form Integration Accessibility', () => {
        it('works correctly in form context', () => {
            render(
                <form>
                    <fieldset>
                        <legend>Radio Group</legend>
                        <Radio name="group" value="option1">
                            Option 1
                        </Radio>
                        <Radio name="group" value="option2">
                            Option 2
                        </Radio>
                    </fieldset>
                </form>
            )

            const radios = screen.getAllByRole('radio')
            expect(radios).toHaveLength(2)

            // Fieldset and legend provide group context for screen readers
            expect(
                screen.getByRole('group', { name: 'Radio Group' })
            ).toBeInTheDocument()
        })

        it('supports form validation messages', () => {
            render(
                <form>
                    <Radio
                        value="test"
                        aria-describedby="error-message"
                        required
                    >
                        Required Radio
                    </Radio>
                    <div id="error-message" role="alert">
                        This field is required
                    </div>
                </form>
            )

            const radio = screen.getByRole('radio')
            const errorMessage = screen.getByRole('alert')

            expect(radio).toHaveAttribute('aria-describedby', 'error-message')
            expect(errorMessage).toHaveTextContent('This field is required')
        })

        it('maintains accessibility in complex forms', async () => {
            const { container } = render(
                <form>
                    <fieldset>
                        <legend>Preferences</legend>
                        <Radio name="theme" value="light" required>
                            Light Theme
                        </Radio>
                        <Radio name="theme" value="dark">
                            Dark Theme
                        </Radio>
                    </fieldset>
                    <fieldset>
                        <legend>Notifications</legend>
                        <Radio name="notifications" value="all">
                            All Notifications
                        </Radio>
                        <Radio name="notifications" value="important">
                            Important Only
                        </Radio>
                        <Radio name="notifications" value="none">
                            None
                        </Radio>
                    </fieldset>
                </form>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.4.11 Non-text Contrast (Level AA)', () => {
        it('renders radio for non-text contrast verification (WCAG 1.4.11)', () => {
            // Note: Non-text contrast must be verified manually
            // WCAG 1.4.11 requires 3:1 contrast for UI components and graphical objects
            // This includes radio indicators, borders, and focus indicators
            render(<Radio value="test">Non-text Contrast</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('renders checked radio for indicator contrast verification (WCAG 1.4.11)', () => {
            // Manual verification required: Radio indicator dot must have 3:1 contrast
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)
            const radio = screen.getByRole('radio')
            expect(radio).toBeChecked()
        })
    })

    describe('WCAG 2.3.3 Animation from Interactions (Level AAA)', () => {
        it('provides immediate state feedback without animation delays (WCAG 2.3.3)', async () => {
            // WCAG 2.3.3: Motion animation triggered by interaction can be disabled
            // State changes must be immediate and not rely on animation
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Instant Feedback
                </Radio>
            )

            const radio = screen.getByRole('radio')
            await user.click(radio)

            expect(handleChange).toHaveBeenCalled()
            const callArgs = handleChange.mock
                .calls[0][0] as React.ChangeEvent<HTMLInputElement>
            expect(callArgs.target.checked).toBe(true)
            // State change is immediate - animation is optional enhancement
        })
    })

    describe('WCAG 1.3.1 Info and Relationships - Radio Group Semantics (Level A)', () => {
        it('provides proper group semantics with fieldset/legend (WCAG 1.3.1)', () => {
            // WCAG 1.3.1: Radio groups must have programmatically determinable relationships
            render(
                <fieldset role="radiogroup" aria-labelledby="group-label">
                    <legend id="group-label">Choose an option</legend>
                    <Radio name="options" value="a">
                        Option A
                    </Radio>
                    <Radio name="options" value="b">
                        Option B
                    </Radio>
                    <Radio name="options" value="c">
                        Option C
                    </Radio>
                </fieldset>
            )

            const radiogroup = screen.getByRole('radiogroup')
            const radios = screen.getAllByRole('radio')

            expect(radiogroup).toBeInTheDocument()
            expect(radios).toHaveLength(3)
            expect(radiogroup).toHaveAttribute('aria-labelledby', 'group-label')
        })

        it('maintains focus management in groups', async () => {
            const { user } = render(
                <fieldset>
                    <legend>Options</legend>
                    <Radio name="options" value="first">
                        First
                    </Radio>
                    <Radio name="options" value="second" checked>
                        Second
                    </Radio>
                    <Radio name="options" value="third">
                        Third
                    </Radio>
                </fieldset>
            )

            // Tab should focus the checked radio
            await user.tab()
            const secondRadio = screen.getByRole('radio', { name: 'Second' })
            expect(document.activeElement).toBe(secondRadio)

            // Arrow keys should navigate within the group
            await user.keyboard('{ArrowDown}')
            const thirdRadio = screen.getByRole('radio', { name: 'Third' })
            expect(document.activeElement).toBe(thirdRadio)
        })

        it('announces group changes to screen readers', async () => {
            const { user } = render(
                <fieldset>
                    <legend>Selection Group</legend>
                    <Radio name="selection" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="selection" value="option2">
                        Option 2
                    </Radio>
                </fieldset>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })
            const radio2 = screen.getByRole('radio', { name: 'Option 2' })

            await user.click(radio1)
            expect(radio1).toBeChecked()
            expect(radio2).not.toBeChecked()

            await user.click(radio2)
            expect(radio1).not.toBeChecked()
            expect(radio2).toBeChecked()
        })
    })
})
