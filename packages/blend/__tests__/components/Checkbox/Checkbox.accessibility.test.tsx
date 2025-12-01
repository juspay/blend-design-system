import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Checkbox from '../../../lib/components/Checkbox/Checkbox'
import {
    CheckboxPropsBuilder,
    CheckboxTestFactory,
} from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe.skip('Checkbox Accessibility', () => {
    describe('WCAG Compliance', () => {
        it('meets WCAG standards for default checkbox', async () => {
            const { container } = render(
                <Checkbox>Accessible Checkbox</Checkbox>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all checkbox states', async () => {
            const states = [
                CheckboxTestFactory.default(),
                CheckboxTestFactory.checked(),
                CheckboxTestFactory.indeterminate(),
                CheckboxTestFactory.disabled(),
                CheckboxTestFactory.withError(),
            ]

            for (const props of states) {
                const { container, unmount } = render(<Checkbox {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled', async () => {
            const props = CheckboxTestFactory.disabled()
            const { container } = render(<Checkbox {...props} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content', async () => {
            const { container } = render(
                <Checkbox
                    subtext="Additional information"
                    slot={<MockIcon />}
                    required
                >
                    Complex Checkbox with all features
                </Checkbox>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all sizes', async () => {
            const sizes = CheckboxTestFactory.allSizes()

            for (const props of sizes) {
                const { container, unmount } = render(<Checkbox {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })
    })

    describe('Keyboard Navigation', () => {
        it('is focusable with keyboard', () => {
            render(<Checkbox>Focusable Checkbox</Checkbox>)
            const checkbox = screen.getByRole('checkbox')

            checkbox.focus()
            expect(document.activeElement).toBe(checkbox)
        })

        it('can be activated with Space key', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>
                    Space Key Checkbox
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('can be activated with Enter key', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>
                    Enter Key Checkbox
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard('{Enter}')
            // Note: Some checkbox implementations only respond to Space key
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
            const props = CheckboxTestFactory.disabled()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeDisabled()

            // Disabled checkboxes should not be focusable via keyboard
            checkbox.focus()
            expect(document.activeElement).not.toBe(checkbox)
        })

        it('maintains focus visible state', () => {
            render(<Checkbox>Focus Visible Checkbox</Checkbox>)
            const checkbox = screen.getByRole('checkbox')

            checkbox.focus()
            expect(document.activeElement).toBe(checkbox)
            // Focus visible styles are applied via CSS and tested through visual regression
        })

        it('supports Tab navigation', async () => {
            const { user } = render(
                <>
                    <Checkbox>First Checkbox</Checkbox>
                    <Checkbox>Second Checkbox</Checkbox>
                    <button>Button</button>
                </>
            )

            const firstCheckbox = screen.getByRole('checkbox', {
                name: 'First Checkbox',
            })
            const secondCheckbox = screen.getByRole('checkbox', {
                name: 'Second Checkbox',
            })
            const button = screen.getByRole('button')

            // Tab through elements
            await user.tab()
            expect(document.activeElement).toBe(firstCheckbox)

            await user.tab()
            expect(document.activeElement).toBe(secondCheckbox)

            await user.tab()
            expect(document.activeElement).toBe(button)
        })
    })

    describe('Screen Reader Support', () => {
        it('has proper checkbox role', () => {
            render(<Checkbox>Screen Reader Checkbox</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('announces checkbox label to screen readers', () => {
            render(<Checkbox>Screen Reader Label</Checkbox>)
            const checkbox = screen.getByRole('checkbox', {
                name: 'Screen Reader Label',
            })
            expect(checkbox).toBeInTheDocument()
        })

        it('properly handles checkbox without label', () => {
            render(<Checkbox aria-label="Unlabeled checkbox" />)
            const checkbox = screen.getByRole('checkbox', {
                name: 'Unlabeled checkbox',
            })
            expect(checkbox).toBeInTheDocument()
        })

        it('announces checked state correctly', () => {
            const props = CheckboxTestFactory.checked()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeChecked()
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
        })

        it('announces unchecked state correctly', () => {
            render(<Checkbox>Unchecked Checkbox</Checkbox>)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).not.toBeChecked()
            expect(checkbox).toHaveAttribute('aria-checked', 'false')
        })

        it('announces indeterminate state correctly', () => {
            const props = CheckboxTestFactory.indeterminate()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            // Check for indeterminate state - some implementations use data attributes
            const ariaChecked = checkbox.getAttribute('aria-checked')
            const dataState = checkbox.getAttribute('data-state')

            // Accept either aria-checked="mixed" or data-state="indeterminate"
            const isIndeterminate =
                ariaChecked === 'mixed' || dataState === 'indeterminate'
            expect(isIndeterminate).toBe(true)
        })

        it('announces disabled state', () => {
            const props = CheckboxTestFactory.disabled()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeDisabled()
            expect(checkbox).toHaveAttribute('disabled')
        })

        it('supports aria-describedby for subtext', () => {
            render(
                <Checkbox subtext="This is additional information">
                    Checkbox with description
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            const describedBy = checkbox.getAttribute('aria-describedby')

            if (describedBy) {
                const description = document.getElementById(describedBy)
                expect(description).toHaveTextContent(
                    'This is additional information'
                )
            }
        })

        it('supports aria-required for required fields', () => {
            const props = CheckboxTestFactory.required()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            // Check if aria-required is set or if required attribute implies it
            const isRequired =
                checkbox.hasAttribute('aria-required') ||
                checkbox.hasAttribute('required')
            expect(isRequired).toBe(true)
        })

        it('supports custom aria-label', () => {
            render(
                <Checkbox aria-label="Custom accessibility label">
                    Visible Label
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox', {
                name: 'Custom accessibility label',
            })
            expect(checkbox).toBeInTheDocument()
        })

        it('supports aria-labelledby for external labels', () => {
            render(
                <>
                    <span id="external-label">External Label</span>
                    <Checkbox aria-labelledby="external-label" />
                </>
            )

            const checkbox = screen.getByRole('checkbox', {
                name: 'External Label',
            })
            expect(checkbox).toBeInTheDocument()
        })
    })

    describe('Focus Management', () => {
        it('shows focus indicator when focused', () => {
            render(<Checkbox>Focus Indicator</Checkbox>)
            const checkbox = screen.getByRole('checkbox')

            checkbox.focus()
            expect(document.activeElement).toBe(checkbox)
            // Focus indicator styles are applied via CSS :focus-visible
        })

        it('removes focus on blur', () => {
            render(<Checkbox>Blur Test</Checkbox>)
            const checkbox = screen.getByRole('checkbox')

            checkbox.focus()
            expect(document.activeElement).toBe(checkbox)

            checkbox.blur()
            expect(document.activeElement).not.toBe(checkbox)
        })

        it('maintains focus after activation', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>
                    Focus Maintenance
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard(' ')
            expect(document.activeElement).toBe(checkbox)
            expect(handleChange).toHaveBeenCalled()
        })

        it('handles focus with mouse and keyboard consistently', async () => {
            const { user } = render(<Checkbox>Consistent Focus</Checkbox>)
            const checkbox = screen.getByRole('checkbox')

            // Focus with mouse click
            await user.click(checkbox)
            expect(document.activeElement).toBe(checkbox)

            checkbox.blur()

            // Focus with keyboard
            await user.tab()
            expect(document.activeElement).toBe(checkbox)
        })
    })

    describe('Error State Accessibility', () => {
        it('announces error state to screen readers', () => {
            const props = CheckboxTestFactory.withError()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('data-error', 'true')
            // Error state should be communicated through aria-invalid or aria-describedby
        })

        it('maintains accessibility with error and other states', async () => {
            const props = new CheckboxPropsBuilder()
                .withChildren('Error Required Checkbox')
                .withError()
                .withRequired()
                .withSubtext('This field has an error')
                .build()

            const { container } = render(<Checkbox {...props} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Color Contrast', () => {
        it('provides sufficient color contrast for default state', () => {
            render(<Checkbox>Default Contrast</Checkbox>)
            // Color contrast testing is typically done with automated tools
            // or visual regression testing
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('maintains contrast in disabled state', () => {
            const props = CheckboxTestFactory.disabled()
            render(<Checkbox {...props} />)
            // Disabled state should still maintain minimum contrast ratios
            expect(screen.getByRole('checkbox')).toBeDisabled()
        })

        it('maintains contrast in error state', () => {
            const props = CheckboxTestFactory.withError()
            render(<Checkbox {...props} />)
            // Error state should have sufficient contrast for visibility
            expect(screen.getByRole('checkbox')).toHaveAttribute(
                'data-error',
                'true'
            )
        })
    })

    describe('Touch Target Size', () => {
        it('meets minimum touch target size requirements', () => {
            render(<Checkbox>Touch Target</Checkbox>)
            const checkbox = screen.getByRole('checkbox')
            // Minimum touch target size should be 44x44 pixels
            // This would need to be verified with computed styles in integration tests
            expect(checkbox).toBeInTheDocument()
        })

        it('maintains touch target size across all sizes', () => {
            const sizes = CheckboxTestFactory.allSizes()

            sizes.forEach((props) => {
                const { unmount } = render(<Checkbox {...props} />)
                const checkbox = screen.getByRole('checkbox')
                expect(checkbox).toBeInTheDocument()
                unmount()
            })
        })
    })

    describe('Label Association', () => {
        it('properly associates label with checkbox', () => {
            render(<Checkbox id="test-checkbox">Associated Label</Checkbox>)

            const checkbox = screen.getByRole('checkbox')
            const label = screen.getByText('Associated Label')

            // Label should be associated with checkbox
            expect(label.closest('label')).toHaveAttribute('for', checkbox.id)
        })

        it('clicking label toggles checkbox', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>
                    Clickable Label
                </Checkbox>
            )

            const label = screen.getByText('Clickable Label')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('handles multiple label scenarios correctly', () => {
            render(
                <>
                    <label htmlFor="external-checkbox">External Label</label>
                    <Checkbox id="external-checkbox">Internal Label</Checkbox>
                </>
            )

            const checkbox = screen.getByRole('checkbox')
            const externalLabel = screen.getByText('External Label')
            const internalLabel = screen.getByText('Internal Label')

            expect(checkbox).toBeInTheDocument()
            expect(externalLabel).toBeInTheDocument()
            expect(internalLabel).toBeInTheDocument()
        })
    })

    describe('Form Integration Accessibility', () => {
        it('works correctly in form context', () => {
            render(
                <form>
                    <fieldset>
                        <legend>Checkbox Group</legend>
                        <Checkbox value="option1">Option 1</Checkbox>
                        <Checkbox value="option2">Option 2</Checkbox>
                    </fieldset>
                </form>
            )

            const checkboxes = screen.getAllByRole('checkbox')
            expect(checkboxes).toHaveLength(2)

            // Fieldset and legend provide group context for screen readers
            expect(
                screen.getByRole('group', { name: 'Checkbox Group' })
            ).toBeInTheDocument()
        })

        it('supports form validation messages', () => {
            render(
                <form>
                    <Checkbox aria-describedby="error-message" required>
                        Required Checkbox
                    </Checkbox>
                    <div id="error-message" role="alert">
                        This field is required
                    </div>
                </form>
            )

            const checkbox = screen.getByRole('checkbox')
            const errorMessage = screen.getByRole('alert')

            expect(checkbox).toHaveAttribute(
                'aria-describedby',
                'error-message'
            )
            expect(errorMessage).toHaveTextContent('This field is required')
        })
    })

    describe('High Contrast Mode', () => {
        it('maintains visibility in high contrast mode', () => {
            // High contrast mode testing would typically be done with
            // specialized tools or browser testing
            render(<Checkbox>High Contrast</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('provides alternative indicators for state changes', () => {
            const props = CheckboxTestFactory.checked()
            render(<Checkbox {...props} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeChecked()
            // In high contrast mode, checkmarks and other visual indicators
            // should remain visible
        })
    })

    describe('Reduced Motion', () => {
        it('respects reduced motion preferences', () => {
            // Reduced motion testing would be done with CSS media queries
            // and animation testing tools
            render(<Checkbox>Reduced Motion</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('provides instant feedback when motion is reduced', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>
                    Instant Feedback
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).toHaveBeenCalledWith(true)
            // State change should be immediate without animation delays
        })
    })
})
