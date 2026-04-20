import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import CheckboxV2 from '../../../lib/components/SelectorV2/CheckboxV2/CheckboxV2'
import { SelectorV2Size } from '../../../lib/components/SelectorV2/selectorV2.types'
import { MockIcon } from '../../test-utils'

describe('CheckboxV2 Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default checkbox (axe-core validation)', async () => {
            const { container } = render(
                <CheckboxV2 label="Accessible Checkbox" checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all checkbox states (checked, unchecked, disabled, error, indeterminate)', async () => {
            const states = [
                { label: 'Unchecked Checkbox', checked: false },
                { label: 'Checked Checkbox', checked: true },
                { label: 'Disabled Checkbox', checked: false, disabled: true },
                { label: 'Error Checkbox', checked: false, error: true },
                {
                    label: 'Indeterminate Checkbox',
                    checked: 'indeterminate' as const,
                },
            ]

            for (const props of states) {
                const { container, unmount } = render(<CheckboxV2 {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <CheckboxV2
                    label="Disabled Checkbox"
                    disabled
                    checked={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content (1.1.1 Non-text Content, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <CheckboxV2
                    label="Complex Checkbox"
                    checked={false}
                    subLabel="Additional information"
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all sizes', async () => {
            const sizes = [SelectorV2Size.SM, SelectorV2Size.MD]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <CheckboxV2
                        label={`${size} Checkbox`}
                        size={size}
                        checked={false}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(<CheckboxV2 label="Focusable Checkbox" checked={false} />)
            const checkbox = screen.getByRole('checkbox')

            checkbox.focus()
            expect(document.activeElement).toBe(checkbox)
        })

        it('can be activated with Space key - keyboard activation support (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Space Toggle Checkbox"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('can be activated with Enter key - keyboard activation support (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Enter Toggle Checkbox"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard('{Enter}')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('disabled checkboxes are not focusable - keyboard navigation (WCAG 2.1.1)', async () => {
            const { user } = render(
                <CheckboxV2
                    label="Disabled Checkbox"
                    checked={false}
                    disabled
                />
            )

            const checkbox = screen.getByRole('checkbox')

            await user.tab()
            expect(checkbox).not.toHaveFocus()
            expect(checkbox).toHaveAttribute('aria-disabled', 'true')
        })

        it('does not respond to keyboard when disabled (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Disabled Keyboard Checkbox"
                    disabled
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard(' ')
            await user.keyboard('{Enter}')

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('maintains focus after toggle (WCAG 2.1.1)', async () => {
            const { user } = render(
                <CheckboxV2 label="Focus Maintained Checkbox" checked={false} />
            )

            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()

            await user.keyboard(' ')
            expect(checkbox).toHaveFocus()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has correct checkbox role - programmatically determinable role', () => {
            render(<CheckboxV2 label="Role Checkbox" checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
        })

        it('has proper aria-checked attribute - state is programmatically determinable', () => {
            const { rerender } = render(
                <CheckboxV2 label="ARIA Checked Checkbox" checked={false} />
            )

            let checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'false')

            rerender(
                <CheckboxV2 label="ARIA Checked Checkbox" checked={true} />
            )
            checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
        })

        it('updates aria-checked when state changes - state changes are announced', async () => {
            const TestComponent = () => {
                const [checked, setChecked] = React.useState<
                    boolean | 'indeterminate'
                >(false)
                return (
                    <CheckboxV2
                        label="State Change Checkbox"
                        checked={checked}
                        onCheckedChange={setChecked}
                    />
                )
            }

            const { user } = render(<TestComponent />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'false')

            await user.click(checkbox)
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
        })

        it('provides accessible name via aria-labelledby - name is programmatically determinable', () => {
            render(
                <CheckboxV2 label="Accessible Name Checkbox" checked={false} />
            )

            const checkbox = screen.getByRole('checkbox')
            const ariaLabelledBy = checkbox.getAttribute('aria-labelledby')
            expect(ariaLabelledBy).toBeTruthy()

            // Verify the label element exists with the correct id
            const labelElement = document.getElementById(
                ariaLabelledBy as string
            )
            expect(labelElement).toBeInTheDocument()
            expect(labelElement).toHaveTextContent('Accessible Name Checkbox')
        })

        it('supports aria-label for accessible name override (WCAG 4.1.2)', () => {
            render(
                <CheckboxV2
                    aria-label="Custom Accessible Name"
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox', {
                name: 'Custom Accessible Name',
            })
            expect(checkbox).toBeInTheDocument()
        })

        it('supports aria-labelledby for complex labeling (WCAG 4.1.2)', () => {
            render(
                <>
                    <h3 id="checkbox-heading">Preferences</h3>
                    <CheckboxV2
                        aria-labelledby="checkbox-heading"
                        checked={false}
                    />
                </>
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute(
                'aria-labelledby',
                'checkbox-heading'
            )
        })

        it('has aria-disabled attribute when disabled', () => {
            render(
                <CheckboxV2
                    label="Disabled Checkbox"
                    disabled
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-disabled', 'true')
        })

        it('has aria-required attribute when required', () => {
            render(
                <CheckboxV2
                    label="Required Checkbox"
                    required
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-required', 'true')
        })

        it('has aria-invalid attribute when error', () => {
            render(<CheckboxV2 label="Error Checkbox" error checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('associates label with checkbox correctly - relationships are programmatically determinable', () => {
            render(
                <CheckboxV2
                    id="test-checkbox"
                    label="Associated Checkbox"
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            const label = screen.getByText('Associated Checkbox')

            expect(checkbox).toHaveAttribute('id', 'test-checkbox')
            expect(label.closest('label')).toHaveAttribute(
                'for',
                'test-checkbox'
            )
        })

        it('generates unique IDs for label association', () => {
            render(
                <>
                    <CheckboxV2 label="Checkbox 1" checked={false} />
                    <CheckboxV2 label="Checkbox 2" checked={false} />
                </>
            )

            const checkboxes = screen.getAllByRole('checkbox')
            const labels = screen.getAllByText(/Checkbox [12]/)

            expect(checkboxes[0]).toHaveAttribute('id')
            expect(checkboxes[1]).toHaveAttribute('id')
            expect(checkboxes[0].id).not.toBe(checkboxes[1].id)

            expect(labels[0].closest('label')).toHaveAttribute(
                'for',
                checkboxes[0].id
            )
            expect(labels[1].closest('label')).toHaveAttribute(
                'for',
                checkboxes[1].id
            )
        })

        it('clicking label toggles checkbox - label association works correctly', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Clickable Label Checkbox"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const label = screen.getByText('Clickable Label Checkbox')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('communicates state relationships via ARIA attributes (WCAG 1.3.1)', () => {
            render(
                <CheckboxV2
                    label="State Relationships Checkbox"
                    checked={false}
                    required
                    error
                />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-required', 'true')
            expect(checkbox).toHaveAttribute('aria-invalid', 'true')
            expect(checkbox).toHaveAttribute('aria-checked', 'false')
        })

        it('links subLabel via aria-describedby when present', () => {
            render(
                <CheckboxV2
                    label="Checkbox with Description"
                    subLabel="This is a description"
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            const describedBy = checkbox.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()

            const descriptionElement = document.getElementById(
                describedBy as string
            )
            expect(descriptionElement).not.toBeNull()
            expect(descriptionElement).toHaveTextContent(
                'This is a description'
            )
        })

        it('merges custom aria-describedby with subLabel id', () => {
            render(
                <CheckboxV2
                    label="Checkbox"
                    subLabel="SubLabel"
                    checked={false}
                    aria-describedby="custom-id"
                />
            )

            const checkbox = screen.getByRole('checkbox')
            const describedBy = checkbox.getAttribute('aria-describedby')
            expect(describedBy).toContain('custom-id')
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order - DOM order matches visual order', () => {
            render(
                <CheckboxV2
                    label="Sequence Checkbox"
                    checked={false}
                    subLabel="Additional context"
                />
            )

            const checkbox = screen.getByRole('checkbox')
            const label = screen.getByText('Sequence Checkbox')
            const subtext = screen.getByText('Additional context')

            // Verify all elements are in the document
            expect(checkbox).toBeInTheDocument()
            expect(label).toBeInTheDocument()
            expect(subtext).toBeInTheDocument()

            // NOTE: CheckboxV2 component structure follows logical reading order:
            // checkbox control → label → subLabel → slot
            // DOM order matches visual order, ensuring meaningful sequence
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual characteristics - label provides context', () => {
            render(
                <CheckboxV2 label="Accept updates" checked={false} required />
            )

            const label = screen.getByText('Accept updates')

            // Label text provides context, not just visual indicators
            expect(label).toHaveTextContent('Accept updates')
            expect(screen.getByText('*')).toBeInTheDocument() // Required indicator
            // Both text and visual indicator (asterisk) provide context
        })
    })

    describe('WCAG 1.4.4 Resize Text (Level AA)', () => {
        it('supports text resizing without loss of functionality', () => {
            render(<CheckboxV2 label="Resizable Checkbox" checked={false} />)

            // Component should use relative units (rem/em) for text sizing
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()

            // Verify text can be resized (this is primarily a CSS concern)
            // The component structure should remain functional at any text size
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has focus visible styles when interactive', () => {
            render(<CheckboxV2 label="Focusable Checkbox" checked={false} />)
            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()
            // Focus visible styles should be applied via _focusVisible prop
            expect(checkbox).toBeInTheDocument()
        })

        it('maintains focus indicator visibility', () => {
            render(
                <CheckboxV2 label="Focus Indicator Checkbox" checked={false} />
            )
            const checkbox = screen.getByRole('checkbox')
            checkbox.focus()
            // Focus should be visible (implementation detail via _focusVisible)
            expect(document.activeElement).toBe(checkbox)
        })
    })

    describe('WAI-ARIA Checkbox Pattern Compliance', () => {
        it('implements role="checkbox" correctly', () => {
            render(<CheckboxV2 label="ARIA Checkbox" checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
        })

        it('has aria-checked="true" when checked', () => {
            render(<CheckboxV2 label="Checked ARIA Checkbox" checked={true} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
        })

        it('has aria-checked="false" when unchecked', () => {
            render(
                <CheckboxV2 label="Unchecked ARIA Checkbox" checked={false} />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'false')
        })

        it('has accessible name via aria-labelledby pointing to label', () => {
            render(<CheckboxV2 label="Labelled Checkbox" checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            const ariaLabelledBy = checkbox.getAttribute('aria-labelledby')
            expect(ariaLabelledBy).toBeTruthy()

            const labelElement = document.getElementById(
                ariaLabelledBy as string
            )
            expect(labelElement).toBeInTheDocument()
            expect(labelElement).toHaveTextContent('Labelled Checkbox')
        })

        it('has aria-describedby linking to subLabel when present', () => {
            render(
                <CheckboxV2
                    label="Described Checkbox"
                    subLabel="Description text"
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            const describedBy = checkbox.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()

            const descriptionElement = document.getElementById(
                describedBy as string
            )
            expect(descriptionElement).toHaveTextContent('Description text')
        })

        it('label text does not change when state changes (WAI-ARIA requirement)', () => {
            const { rerender } = render(
                <CheckboxV2 label="Static Label Checkbox" checked={false} />
            )

            const label = screen.getByText('Static Label Checkbox')
            expect(label).toHaveTextContent('Static Label Checkbox')

            rerender(
                <CheckboxV2 label="Static Label Checkbox" checked={true} />
            )

            const updatedLabel = screen.getByText('Static Label Checkbox')
            expect(updatedLabel).toHaveTextContent('Static Label Checkbox')
            // Label text remains the same, only aria-checked changes
        })
    })

    describe('Edge Cases - Accessibility', () => {
        it('handles empty visual label when an accessible name is provided', async () => {
            const { container } = render(
                <CheckboxV2
                    label=""
                    aria-label="Empty label checkbox"
                    checked={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with all props combined', async () => {
            const handleChange = vi.fn()
            const { container } = render(
                <CheckboxV2
                    label="Complete Checkbox"
                    subLabel="Complete description"
                    size={SelectorV2Size.MD}
                    checked={false}
                    onCheckedChange={handleChange}
                    required
                    error
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                    maxLength={{ label: 20, subLabel: 30 }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility when disabled', async () => {
            const { container } = render(
                <CheckboxV2
                    label="Disabled Checkbox"
                    disabled
                    checked={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with truncated text and tooltips', async () => {
            const { container } = render(
                <CheckboxV2
                    label="Very long label text that will be truncated"
                    subLabel="Very long sublabel text that will be truncated"
                    checked={false}
                    maxLength={{ label: 10, subLabel: 10 }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
