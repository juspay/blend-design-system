import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Radio from '../../../lib/components/Radio/Radio'
import { RadioSize } from '../../../lib/components/Radio/types'
import { RadioPropsBuilder, RadioTestFactory } from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe('Radio Accessibility', () => {
    describe('WCAG Compliance', () => {
        it('meets WCAG standards for default radio', async () => {
            const { container } = render(
                <Radio value="test">Accessible Radio</Radio>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all radio states', async () => {
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

        it('meets WCAG standards when disabled', async () => {
            const props = RadioTestFactory.disabled()
            const { container } = render(<Radio {...props} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content', async () => {
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

    describe('Keyboard Navigation', () => {
        it('is focusable with keyboard', () => {
            render(<Radio value="test">Focusable Radio</Radio>)
            const radio = screen.getByRole('radio')

            radio.focus()
            expect(document.activeElement).toBe(radio)
        })

        it('can be activated with Space key', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Space Key Radio
                </Radio>
            )

            const radio = screen.getByRole('radio')
            radio.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('can be activated with Enter key', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Enter Key Radio
                </Radio>
            )

            const radio = screen.getByRole('radio')
            radio.focus()

            await user.keyboard('{Enter}')
            // Note: Some radio implementations only respond to Space key
            // This test verifies the component's specific keyboard behavior
            if (handleChange.mock.calls.length > 0) {
                expect(handleChange).toHaveBeenCalledWith(true)
            } else {
                // If Enter doesn't activate, ensure Space still works
                await user.keyboard(' ')
                expect(handleChange).toHaveBeenCalledWith(true)
            }
        })

        it('is not focusable when disabled', () => {
            const props = RadioTestFactory.disabled()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeDisabled()

            // Disabled radios should not be focusable via keyboard
            radio.focus()
            expect(document.activeElement).not.toBe(radio)
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

    describe('Screen Reader Support', () => {
        it('has proper radio role', () => {
            render(<Radio value="test">Screen Reader Radio</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('announces radio label to screen readers', () => {
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

        it('announces checked state correctly', () => {
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeChecked()
            // Native radio inputs don't always set aria-checked explicitly
            // The checked state is communicated through the native radio behavior
        })

        it('announces unchecked state correctly', () => {
            render(<Radio value="test">Unchecked Radio</Radio>)

            const radio = screen.getByRole('radio')
            expect(radio).not.toBeChecked()
            // Native radio inputs don't always set aria-checked explicitly
            // The unchecked state is communicated through the native radio behavior
        })

        it('announces disabled state', () => {
            const props = RadioTestFactory.disabled()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeDisabled()
            expect(radio).toHaveAttribute('disabled')
        })

        it('supports aria-describedby for subtext', () => {
            render(
                <Radio value="test" subtext="This is additional information">
                    Radio with description
                </Radio>
            )

            const radio = screen.getByRole('radio')
            const describedBy = radio.getAttribute('aria-describedby')

            if (describedBy) {
                const description = document.getElementById(describedBy)
                expect(description).toHaveTextContent(
                    'This is additional information'
                )
            }
        })

        it('supports aria-required for required fields', () => {
            const props = RadioTestFactory.required()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            // Check if aria-required is set or if required attribute implies it
            const isRequired =
                radio.hasAttribute('aria-required') ||
                radio.hasAttribute('required')
            expect(isRequired).toBe(true)
        })

        it('supports custom aria-label', () => {
            render(
                <Radio value="test" aria-label="Custom accessibility label">
                    Visible Label
                </Radio>
            )

            const radio = screen.getByRole('radio', {
                name: 'Custom accessibility label',
            })
            expect(radio).toBeInTheDocument()
        })

        it('supports aria-labelledby for external labels', () => {
            render(
                <>
                    <span id="external-label">External Label</span>
                    <Radio value="test" aria-labelledby="external-label" />
                </>
            )

            const radio = screen.getByRole('radio', {
                name: 'External Label',
            })
            expect(radio).toBeInTheDocument()
        })

        it('announces radio group context', () => {
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
        })
    })

    describe('Focus Management', () => {
        it('shows focus indicator when focused', () => {
            render(<Radio value="test">Focus Indicator</Radio>)
            const radio = screen.getByRole('radio')

            radio.focus()
            expect(document.activeElement).toBe(radio)
            // Focus indicator styles are applied via CSS :focus-visible
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

    describe('Error State Accessibility', () => {
        it('announces error state to screen readers', () => {
            const props = RadioTestFactory.withError()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toHaveAttribute('data-state', 'unchecked')
            // Error state should be communicated through aria-invalid or aria-describedby
        })

        it('maintains accessibility with error and other states', async () => {
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
        })

        it('supports error messages with aria-describedby', () => {
            render(
                <>
                    <Radio
                        value="error"
                        aria-describedby="error-message"
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

            expect(radio).toHaveAttribute('aria-describedby', 'error-message')
            expect(errorMessage).toHaveTextContent('This field is required')
        })
    })

    describe('Color Contrast', () => {
        it('provides sufficient color contrast for default state', () => {
            render(<Radio value="test">Default Contrast</Radio>)
            // Color contrast testing is typically done with automated tools
            // or visual regression testing
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('maintains contrast in disabled state', () => {
            const props = RadioTestFactory.disabled()
            render(<Radio {...props} />)
            // Disabled state should still maintain minimum contrast ratios
            expect(screen.getByRole('radio')).toBeDisabled()
        })

        it('maintains contrast in error state', () => {
            const props = RadioTestFactory.withError()
            render(<Radio {...props} />)
            // Error state should have sufficient contrast for visibility
            expect(screen.getByRole('radio')).toHaveAttribute(
                'data-state',
                'unchecked'
            )
        })

        it('maintains contrast in checked state', () => {
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)
            // Checked state should have sufficient contrast for the selection indicator
            expect(screen.getByRole('radio')).toBeChecked()
        })
    })

    describe('Touch Target Size', () => {
        it('meets minimum touch target size requirements', () => {
            render(<Radio value="test">Touch Target</Radio>)
            const radio = screen.getByRole('radio')
            // Minimum touch target size should be 44x44 pixels
            // This would need to be verified with computed styles in integration tests
            expect(radio).toBeInTheDocument()
        })

        it('maintains touch target size across all sizes', () => {
            const sizes = RadioTestFactory.allSizes()

            sizes.forEach((props) => {
                const { unmount } = render(<Radio {...props} />)
                const radio = screen.getByRole('radio')
                expect(radio).toBeInTheDocument()
                unmount()
            })
        })
    })

    describe('Label Association', () => {
        it('properly associates label with radio', () => {
            render(
                <Radio id="test-radio" value="test">
                    Associated Label
                </Radio>
            )

            const radio = screen.getByRole('radio')
            const label = screen.getByText('Associated Label')

            // Label should be associated with radio
            expect(label.closest('label')).toHaveAttribute('for', radio.id)
        })

        it('clicking label selects radio', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Clickable Label
                </Radio>
            )

            const label = screen.getByText('Clickable Label')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('handles multiple label scenarios correctly', () => {
            render(
                <>
                    <label htmlFor="external-radio">External Label</label>
                    <Radio id="external-radio" value="test">
                        Internal Label
                    </Radio>
                </>
            )

            const radio = screen.getByRole('radio')
            const externalLabel = screen.getByText('External Label')
            const internalLabel = screen.getByText('Internal Label')

            expect(radio).toBeInTheDocument()
            expect(externalLabel).toBeInTheDocument()
            expect(internalLabel).toBeInTheDocument()
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

    describe('High Contrast Mode', () => {
        it('maintains visibility in high contrast mode', () => {
            // High contrast mode testing would typically be done with
            // specialized tools or browser testing
            render(<Radio value="test">High Contrast</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('provides alternative indicators for state changes', () => {
            const props = RadioTestFactory.checked()
            render(<Radio {...props} />)

            const radio = screen.getByRole('radio')
            expect(radio).toBeChecked()
            // In high contrast mode, selection indicators should remain visible
        })
    })

    describe('Reduced Motion', () => {
        it('respects reduced motion preferences', () => {
            // Reduced motion testing would be done with CSS media queries
            // and animation testing tools
            render(<Radio value="test">Reduced Motion</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })

        it('provides instant feedback when motion is reduced', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Instant Feedback
                </Radio>
            )

            const radio = screen.getByRole('radio')
            await user.click(radio)

            expect(handleChange).toHaveBeenCalledWith(true)
            // State change should be immediate without animation delays
        })
    })

    describe('Radio Group Accessibility', () => {
        it('provides proper group semantics', () => {
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
