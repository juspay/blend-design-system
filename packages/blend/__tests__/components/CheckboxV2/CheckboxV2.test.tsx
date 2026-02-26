import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import CheckboxV2 from '../../../lib/components/SelectorV2/CheckboxV2/CheckboxV2'
import { SelectorV2Size } from '../../../lib/components/SelectorV2/selectorV2.types'
import { MockIcon } from '../../test-utils'

describe('CheckboxV2 Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            render(<CheckboxV2 label="Test Checkbox" checked={false} />)
            expect(screen.getByText('Test Checkbox')).toBeInTheDocument()
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('renders with label and subLabel', () => {
            render(
                <CheckboxV2
                    label="Accept terms"
                    subLabel="You must accept to continue"
                    checked={false}
                />
            )
            expect(screen.getByText('Accept terms')).toBeInTheDocument()
            expect(
                screen.getByText('You must accept to continue')
            ).toBeInTheDocument()
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('renders without label', () => {
            render(<CheckboxV2 checked={false} />)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(
                document.querySelector('[data-checkbox="checkbox"]')
            ).toBeInTheDocument()
        })

        it('renders with slot content', () => {
            render(
                <CheckboxV2
                    label="Checkbox with slot"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )
            expect(screen.getByText('Checkbox with slot')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="slot-icon"]')
            ).toBeInTheDocument()
        })

        it('renders required indicator', () => {
            render(
                <CheckboxV2
                    label="Required Checkbox"
                    required
                    checked={false}
                />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('renders complex checkbox with all features', () => {
            render(
                <CheckboxV2
                    label="Complex Checkbox"
                    subLabel="With subtext"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                    required
                />
            )
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
            expect(screen.getByText('Complex Checkbox')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Checkbox States', () => {
        it('renders unchecked state by default', () => {
            render(<CheckboxV2 label="Unchecked" checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'false')
            expect(checkbox).toHaveAttribute('data-state', 'unchecked')
        })

        it('renders checked state', () => {
            render(<CheckboxV2 label="Checked" checked={true} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
            expect(checkbox).toHaveAttribute('data-state', 'checked')
        })

        it('renders indeterminate state', () => {
            render(
                <CheckboxV2 label="Indeterminate" checked={'indeterminate'} />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
            expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
        })

        it('renders disabled state', () => {
            render(<CheckboxV2 label="Disabled" disabled checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeDisabled()
            expect(checkbox).toHaveAttribute('aria-disabled', 'true')
            expect(checkbox).toHaveAttribute('data-state', 'unchecked')
        })

        it('renders error state', () => {
            render(<CheckboxV2 label="Error" error checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders required state', () => {
            render(<CheckboxV2 label="Required" required checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-required', 'true')
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Size Variants', () => {
        it('renders small size', () => {
            render(
                <CheckboxV2
                    label="Small"
                    size={SelectorV2Size.SM}
                    checked={false}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
        })

        it('renders medium size (default)', () => {
            render(<CheckboxV2 label="Medium" checked={false} />)

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
        })
    })

    describe('Controlled vs Uncontrolled', () => {
        it('works as controlled component', () => {
            const handleChange = vi.fn()
            render(
                <CheckboxV2
                    label="Controlled"
                    checked={true}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
        })

        it('controlled component updates when checked prop changes', () => {
            const { rerender } = render(
                <CheckboxV2 label="Controlled" checked={false} />
            )

            let checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'false')

            rerender(<CheckboxV2 label="Controlled" checked={true} />)

            checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveAttribute('aria-checked', 'true')
        })
    })

    describe('Event Handling', () => {
        it('calls onCheckedChange when clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Clickable"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('calls onCheckedChange with inverted checked value', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Toggle"
                    checked={true}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).toHaveBeenCalledWith(false)
        })

        it('does not call onCheckedChange when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Disabled"
                    disabled
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('does not throw when onCheckedChange is not provided', async () => {
            const { user } = render(
                <CheckboxV2 label="No Handler" checked={false} />
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)

            expect(checkbox).toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('has data-checkbox attribute with label value', () => {
            render(<CheckboxV2 label="Test Checkbox" checked={false} />)

            expect(
                document.querySelector('[data-checkbox="Test Checkbox"]')
            ).toBeInTheDocument()
        })

        it('has data-checkbox="checkbox" when label is not provided', () => {
            render(<CheckboxV2 checked={false} />)

            expect(
                document.querySelector('[data-checkbox="checkbox"]')
            ).toBeInTheDocument()
        })

        it('has data-element="checkbox" on root', () => {
            render(<CheckboxV2 label="Labeled" checked={false} />)

            const root = document.querySelector('[data-element="checkbox"]')
            expect(root).toBeInTheDocument()
        })

        it('has data-element="checkbox-label" on label', () => {
            render(<CheckboxV2 label="Labeled" checked={false} />)

            const labelEl = document.querySelector(
                '[data-element="checkbox-label"]'
            )
            expect(labelEl).toBeInTheDocument()
        })

        it('has data-element="checkbox-description" on subLabel', () => {
            render(
                <CheckboxV2 label="Labeled" subLabel="Desc" checked={false} />
            )

            const desc = document.querySelector(
                '[data-element="checkbox-description"]'
            )
            expect(desc).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty string label', () => {
            render(<CheckboxV2 label="" checked={false} />)
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toBeInTheDocument()
        })

        it('handles very long label text', () => {
            const longText = 'A'.repeat(1000)
            render(<CheckboxV2 label={longText} checked={false} />)
            expect(screen.getByText(longText)).toBeInTheDocument()
        })

        it('handles special characters in label', () => {
            const specialText = 'Checkbox with <>&"\' characters'
            render(<CheckboxV2 label={specialText} checked={false} />)
            expect(screen.getByText(specialText)).toBeInTheDocument()
        })

        it('handles multiple rapid clicks', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <CheckboxV2
                    label="Rapid"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const checkbox = screen.getByRole('checkbox')
            await user.click(checkbox)
            await user.click(checkbox)
            await user.click(checkbox)

            expect(handleChange).toHaveBeenCalledTimes(3)
        })

        it('blocks className prop from being passed', () => {
            const { container } = render(
                <CheckboxV2
                    label="Test"
                    checked={false}
                    {...({ className: 'should-not-exist' } as Record<
                        string,
                        unknown
                    >)}
                />
            )
            const root = container.querySelector('[data-checkbox="Test"]')
            expect(root).not.toHaveClass('should-not-exist')
        })

        it('blocks style prop from being passed', () => {
            const { container } = render(
                <CheckboxV2
                    label="Test"
                    checked={false}
                    {...({ style: { backgroundColor: 'red' } } as Record<
                        string,
                        unknown
                    >)}
                />
            )
            const root = container.querySelector('[data-checkbox="Test"]')
            expect(root).not.toHaveStyle({ backgroundColor: 'red' })
        })

        it('handles ref forwarding correctly', () => {
            const ref = React.createRef<HTMLButtonElement>()
            render(<CheckboxV2 label="Ref Test" checked={false} ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current).toHaveAttribute('role', 'checkbox')
        })
    })
})
