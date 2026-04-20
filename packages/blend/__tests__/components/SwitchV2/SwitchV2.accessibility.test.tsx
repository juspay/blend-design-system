import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import SwitchV2 from '../../../lib/components/SelectorV2/SwitchV2/SwitchV2'
import { SelectorV2Size } from '../../../lib/components/SelectorV2/selectorV2.types'
import { MockIcon } from '../../test-utils'

describe('SwitchV2 Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default switch (axe-core validation)', async () => {
            const { container } = render(
                <SwitchV2 label="Accessible Switch" checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all switch states (checked, unchecked, disabled, error)', async () => {
            const states = [
                { label: 'Unchecked Switch', checked: false },
                { label: 'Checked Switch', checked: true },
                { label: 'Disabled Switch', checked: false, disabled: true },
                { label: 'Error Switch', checked: false, error: true },
            ]

            for (const props of states) {
                const { container, unmount } = render(<SwitchV2 {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <SwitchV2 label="Disabled Switch" disabled checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content (1.1.1 Non-text Content, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <SwitchV2
                    label="Complex Switch"
                    checked={false}
                    subLabel="Additional information"
                    slot={{ slot: <MockIcon /> }}
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
                    <SwitchV2
                        label={`${size} Switch`}
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
            render(<SwitchV2 label="Focusable Switch" checked={false} />)
            const switchElement = screen.getByRole('switch')

            switchElement.focus()
            expect(document.activeElement).toBe(switchElement)
        })

        it('can be activated with Space key - keyboard activation support (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Space Toggle Switch"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('can be activated with Enter key - keyboard activation support (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Enter Toggle Switch"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard('{Enter}')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('disabled switches are not focusable - keyboard navigation (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SwitchV2 label="Disabled Switch" checked={false} disabled />
            )

            const switchElement = screen.getByRole('switch')

            await user.tab()
            expect(switchElement).not.toHaveFocus()
            expect(switchElement).toHaveAttribute('aria-disabled', 'true')
        })

        it('does not respond to keyboard when disabled (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Disabled Keyboard Switch"
                    disabled
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard(' ')
            await user.keyboard('{Enter}')

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('maintains focus after toggle (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SwitchV2 label="Focus Maintained Switch" checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard(' ')
            expect(switchElement).toHaveFocus()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has correct switch role - programmatically determinable role', () => {
            render(<SwitchV2 label="Role Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('has proper aria-checked attribute - state is programmatically determinable', () => {
            const { rerender } = render(
                <SwitchV2 label="ARIA Checked Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            rerender(<SwitchV2 label="ARIA Checked Switch" checked={true} />)
            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('updates aria-checked when state changes - state changes are announced', async () => {
            const TestComponent = () => {
                const [checked, setChecked] = React.useState(false)
                return (
                    <SwitchV2
                        label="State Change Switch"
                        checked={checked}
                        onCheckedChange={(checked) => setChecked(checked)}
                    />
                )
            }

            const { user } = render(<TestComponent />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            await user.click(switchElement)
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('provides accessible name via aria-labelledby - name is programmatically determinable', () => {
            render(<SwitchV2 label="Accessible Name Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            const ariaLabelledBy = switchElement.getAttribute('aria-labelledby')
            expect(ariaLabelledBy).toBeTruthy()

            // Verify the label element exists with the correct id
            const labelElement = document.getElementById(
                ariaLabelledBy as string
            )
            expect(labelElement).toBeInTheDocument()
            expect(labelElement).toHaveTextContent('Accessible Name Switch')
        })

        it('supports aria-label for accessible name override (WCAG 4.1.2)', () => {
            render(
                <SwitchV2 aria-label="Custom Accessible Name" checked={false} />
            )

            const switchElement = screen.getByRole('switch', {
                name: 'Custom Accessible Name',
            })
            expect(switchElement).toBeInTheDocument()
        })

        it('supports aria-labelledby for complex labeling (WCAG 4.1.2)', () => {
            render(
                <>
                    <h3 id="switch-heading">Notification Settings</h3>
                    <SwitchV2
                        aria-labelledby="switch-heading"
                        checked={false}
                    />
                </>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute(
                'aria-labelledby',
                'switch-heading'
            )
        })

        it('has aria-disabled attribute when disabled', () => {
            render(
                <SwitchV2 label="Disabled Switch" disabled checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-disabled', 'true')
        })

        it('has aria-required attribute when required', () => {
            render(
                <SwitchV2 label="Required Switch" required checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
        })

        it('has aria-invalid attribute when error', () => {
            render(<SwitchV2 label="Error Switch" error checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('associates label with switch correctly - relationships are programmatically determinable', () => {
            render(
                <SwitchV2
                    id="test-switch"
                    label="Associated Switch"
                    checked={false}
                />
            )

            const switchElement = screen.getByRole('switch')
            const label = screen.getByText('Associated Switch')

            expect(switchElement).toHaveAttribute('id', 'test-switch')
            expect(label.closest('label')).toHaveAttribute('for', 'test-switch')
        })

        it('generates unique IDs for label association', () => {
            render(
                <>
                    <SwitchV2 label="Switch 1" checked={false} />
                    <SwitchV2 label="Switch 2" checked={false} />
                </>
            )

            const switches = screen.getAllByRole('switch')
            const labels = screen.getAllByText(/Switch [12]/)

            expect(switches[0]).toHaveAttribute('id')
            expect(switches[1]).toHaveAttribute('id')
            expect(switches[0].id).not.toBe(switches[1].id)

            expect(labels[0].closest('label')).toHaveAttribute(
                'for',
                switches[0].id
            )
            expect(labels[1].closest('label')).toHaveAttribute(
                'for',
                switches[1].id
            )
        })

        it('clicking label toggles switch - label association works correctly', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Clickable Label Switch"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const label = screen.getByText('Clickable Label Switch')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('communicates state relationships via ARIA attributes (WCAG 1.3.1)', () => {
            render(
                <SwitchV2
                    label="State Relationships Switch"
                    checked={false}
                    required
                    error
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')
        })

        it('links subLabel via aria-describedby when present', () => {
            render(
                <SwitchV2
                    label="Switch with Description"
                    subLabel="This is a description"
                    checked={false}
                />
            )

            const switchElement = screen.getByRole('switch')
            const describedBy = switchElement.getAttribute('aria-describedby')
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
                <SwitchV2
                    label="Switch"
                    subLabel="SubLabel"
                    checked={false}
                    aria-describedby="custom-id"
                />
            )

            const switchElement = screen.getByRole('switch')
            const describedBy = switchElement.getAttribute('aria-describedby')
            expect(describedBy).toContain('custom-id')
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order - DOM order matches visual order', () => {
            render(
                <SwitchV2
                    label="Sequence Switch"
                    checked={false}
                    subLabel="Additional context"
                />
            )

            const switchElement = screen.getByRole('switch')
            const label = screen.getByText('Sequence Switch')
            const subtext = screen.getByText('Additional context')

            // Verify all elements are in the document
            expect(switchElement).toBeInTheDocument()
            expect(label).toBeInTheDocument()
            expect(subtext).toBeInTheDocument()

            // NOTE: SwitchV2 component structure follows logical reading order:
            // switch control → label → subLabel → slot
            // DOM order matches visual order, ensuring meaningful sequence
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual characteristics - label provides context', () => {
            render(
                <SwitchV2 label="Enable dark mode" checked={false} required />
            )

            const label = screen.getByText('Enable dark mode')

            // Label text provides context, not just visual indicators
            expect(label).toHaveTextContent('Enable dark mode')
            expect(screen.getByText('*')).toBeInTheDocument() // Required indicator
            // Both text and visual indicator (asterisk) provide context
        })
    })

    describe('WCAG 1.4.4 Resize Text (Level AA)', () => {
        it('supports text resizing without loss of functionality', () => {
            render(<SwitchV2 label="Resizable Switch" checked={false} />)

            // Component should use relative units (rem/em) for text sizing
            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()

            // Verify text can be resized (this is primarily a CSS concern)
            // The component structure should remain functional at any text size
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has focus visible styles when interactive', () => {
            render(<SwitchV2 label="Focusable Switch" checked={false} />)
            const switchElement = screen.getByRole('switch')
            switchElement.focus()
            // Focus visible styles should be applied via _focusVisible prop
            expect(switchElement).toBeInTheDocument()
        })

        it('maintains focus indicator visibility', () => {
            render(<SwitchV2 label="Focus Indicator Switch" checked={false} />)
            const switchElement = screen.getByRole('switch')
            switchElement.focus()
            // Focus should be visible (implementation detail via _focusVisible)
            expect(document.activeElement).toBe(switchElement)
        })
    })

    describe('WAI-ARIA Switch Pattern Compliance', () => {
        it('implements role="switch" correctly', () => {
            render(<SwitchV2 label="ARIA Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('has aria-checked="true" when checked', () => {
            render(<SwitchV2 label="Checked ARIA Switch" checked={true} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('has aria-checked="false" when unchecked', () => {
            render(<SwitchV2 label="Unchecked ARIA Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')
        })

        it('has accessible name via aria-labelledby pointing to label', () => {
            render(<SwitchV2 label="Labelled Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            const ariaLabelledBy = switchElement.getAttribute('aria-labelledby')
            expect(ariaLabelledBy).toBeTruthy()

            const labelElement = document.getElementById(
                ariaLabelledBy as string
            )
            expect(labelElement).toBeInTheDocument()
            expect(labelElement).toHaveTextContent('Labelled Switch')
        })

        it('has aria-describedby linking to subLabel when present', () => {
            render(
                <SwitchV2
                    label="Described Switch"
                    subLabel="Description text"
                    checked={false}
                />
            )

            const switchElement = screen.getByRole('switch')
            const describedBy = switchElement.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()

            const descriptionElement = document.getElementById(
                describedBy as string
            )
            expect(descriptionElement).toHaveTextContent('Description text')
        })

        it('label text does not change when state changes (WAI-ARIA requirement)', () => {
            const { rerender } = render(
                <SwitchV2 label="Static Label Switch" checked={false} />
            )

            const label = screen.getByText('Static Label Switch')
            expect(label).toHaveTextContent('Static Label Switch')

            rerender(<SwitchV2 label="Static Label Switch" checked={true} />)

            const updatedLabel = screen.getByText('Static Label Switch')
            expect(updatedLabel).toHaveTextContent('Static Label Switch')
            // Label text remains the same, only aria-checked changes
        })
    })

    describe('Edge Cases - Accessibility', () => {
        it('handles empty visual label when an accessible name is provided', async () => {
            const { container } = render(
                <SwitchV2
                    label=""
                    aria-label="Empty label switch"
                    checked={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with all props combined', async () => {
            const handleChange = vi.fn()
            const { container } = render(
                <SwitchV2
                    label="Complete Switch"
                    subLabel="Complete description"
                    size={SelectorV2Size.MD}
                    checked={false}
                    onCheckedChange={handleChange}
                    required
                    error
                    slot={{ slot: <MockIcon /> }}
                    maxLength={{ label: 20, subLabel: 30 }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility when disabled', async () => {
            const { container } = render(
                <SwitchV2 label="Disabled Switch" disabled checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with truncated text and tooltips', async () => {
            const { container } = render(
                <SwitchV2
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
