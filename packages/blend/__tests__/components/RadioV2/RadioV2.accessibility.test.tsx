import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import RadioV2 from '../../../lib/components/RadioV2/RadioV2'
import { RadioV2Size } from '../../../lib/components/RadioV2/radioV2.types'
import { MockIcon } from '../../test-utils'

describe('RadioV2 Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default radio (axe-core validation)', async () => {
            const { container } = render(
                <RadioV2 label="Accessible Radio" checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for multiple radio states (checked, unchecked, disabled, error)', async () => {
            const states = [
                { label: 'Unchecked Radio', checked: false },
                { label: 'Checked Radio', checked: true },
                { label: 'Disabled Radio', checked: false, disabled: true },
                { label: 'Error Radio', checked: false, error: true },
            ]

            for (const props of states) {
                const { container, unmount } = render(<RadioV2 {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(
                <RadioV2 label="Disabled Radio" disabled checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content', async () => {
            const { container } = render(
                <RadioV2
                    label="Complex Radio"
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
            const sizes = [RadioV2Size.SMALL, RadioV2Size.MEDIUM]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <RadioV2
                        label={`${size} Radio`}
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
        it('is focusable with keyboard - control is operable via keyboard', () => {
            render(<RadioV2 label="Focusable Radio" checked={false} />)
            const radioElement = screen.getByRole('radio')

            radioElement.focus()
            expect(document.activeElement).toBe(radioElement)
        })

        it('can be activated with Space key - keyboard activation support', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioV2
                    label="Space Radio"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const radioElement = screen.getByRole('radio')
            radioElement.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled radios are not focusable', async () => {
            const { user } = render(
                <RadioV2 label="Disabled Radio" checked={false} disabled />
            )

            const radioElement = screen.getByRole('radio')

            await user.tab()
            expect(radioElement).not.toHaveFocus()
            expect(radioElement).toHaveAttribute('disabled')
        })

        it('does not respond to keyboard when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioV2
                    label="Disabled Keyboard Radio"
                    disabled
                    checked={false}
                    onChange={handleChange}
                />
            )

            const radioElement = screen.getByRole('radio')
            radioElement.focus()

            await user.keyboard(' ')
            await user.keyboard('{Enter}')

            expect(handleChange).not.toHaveBeenCalled()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has radio role - programmatically determinable role', () => {
            render(<RadioV2 label="Role Radio" checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toBeInTheDocument()
        })

        it('has proper aria-checked attribute - state is programmatically determinable', () => {
            const { rerender } = render(
                <RadioV2 label="ARIA Checked Radio" checked={false} />
            )

            let radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'false')

            rerender(<RadioV2 label="ARIA Checked Radio" checked={true} />)
            radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'true')
        })

        it('updates aria-checked when state changes', async () => {
            const TestComponent = () => {
                const [checked, setChecked] = React.useState(false)
                return (
                    <RadioV2
                        label="State Change Radio"
                        checked={checked}
                        onChange={() => setChecked(true)}
                    />
                )
            }

            const { user } = render(<TestComponent />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-checked', 'false')

            await user.click(radioElement)
            expect(radioElement).toHaveAttribute('aria-checked', 'true')
        })

        it('provides accessible name via aria-labelledby', () => {
            render(<RadioV2 label="Accessible Name Radio" checked={false} />)

            const radioElement = screen.getByRole('radio')
            const ariaLabelledBy = radioElement.getAttribute('aria-labelledby')
            expect(ariaLabelledBy).toBeTruthy()

            const labelElement = document.getElementById(
                ariaLabelledBy as string
            )
            expect(labelElement).toBeInTheDocument()
            expect(labelElement).toHaveTextContent('Accessible Name Radio')
        })

        it('supports aria-label for accessible name override', () => {
            render(
                <RadioV2 aria-label="Custom Accessible Name" checked={false} />
            )

            const radioElement = screen.getByRole('radio', {
                name: 'Custom Accessible Name',
            })
            expect(radioElement).toBeInTheDocument()
        })

        it('has aria-disabled attribute when disabled', () => {
            render(<RadioV2 label="Disabled Radio" disabled checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-disabled', 'true')
        })

        it('has aria-required attribute when required', () => {
            render(<RadioV2 label="Required Radio" required checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-required', 'true')
        })

        it('has aria-invalid attribute when error', () => {
            render(<RadioV2 label="Error Radio" error checked={false} />)

            const radioElement = screen.getByRole('radio')
            expect(radioElement).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('associates label with radio correctly', () => {
            render(
                <RadioV2
                    id="test-radio"
                    label="Associated Radio"
                    checked={false}
                />
            )

            const radioElement = screen.getByRole('radio')
            const label = screen.getByText('Associated Radio')

            expect(radioElement).toHaveAttribute('id', 'test-radio')
            expect(label.closest('label')).toHaveAttribute('for', 'test-radio')
        })

        it('generates unique IDs for label association', () => {
            render(
                <>
                    <RadioV2 label="Radio 1" checked={false} />
                    <RadioV2 label="Radio 2" checked={false} />
                </>
            )

            const radios = screen.getAllByRole('radio')
            const labels = screen.getAllByText(/Radio [12]/)

            expect(radios[0]).toHaveAttribute('id')
            expect(radios[1]).toHaveAttribute('id')
            expect(radios[0].id).not.toBe(radios[1].id)

            expect(labels[0].closest('label')).toHaveAttribute(
                'for',
                radios[0].id
            )
            expect(labels[1].closest('label')).toHaveAttribute(
                'for',
                radios[1].id
            )
        })

        it('clicking label selects radio', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioV2
                    label="Clickable Label Radio"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const label = screen.getByText('Clickable Label Radio')
            await user.click(label)

            expect(handleChange).toHaveBeenCalled()
        })

        it('links subLabel via aria-describedby when present', () => {
            render(
                <RadioV2
                    label="Radio with Description"
                    subLabel="This is a description"
                    checked={false}
                />
            )

            const radioElement = screen.getByRole('radio')
            const describedBy = radioElement.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()

            const descriptionElement = document.getElementById(
                describedBy as string
            )
            expect(descriptionElement).not.toBeNull()
            expect(descriptionElement).toHaveTextContent(
                'This is a description'
            )
        })
    })

    describe('Edge Cases - Accessibility', () => {
        it('handles empty visual label when an accessible name is provided', async () => {
            const { container } = render(
                <RadioV2
                    label=""
                    aria-label="Empty label radio"
                    checked={false}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with all props combined', async () => {
            const handleChange = vi.fn()
            const { container } = render(
                <RadioV2
                    label="Complete Radio"
                    subLabel="Complete description"
                    size={RadioV2Size.MEDIUM}
                    checked={false}
                    onChange={handleChange}
                    required
                    error
                    slot={{ slot: <MockIcon /> }}
                    maxLength={{ label: 20, subLabel: 30 }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
