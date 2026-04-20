import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import SwitchV2 from '../../../lib/components/SelectorV2/SwitchV2/SwitchV2'
import { SelectorV2Size } from '../../../lib/components/SelectorV2/selectorV2.types'
import { MockIcon } from '../../test-utils'

describe('SwitchV2 Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            render(<SwitchV2 label="Test Switch" checked={false} />)
            expect(screen.getByText('Test Switch')).toBeInTheDocument()
            expect(screen.getByRole('switch')).toBeInTheDocument()
        })

        it('renders with label and subLabel', () => {
            render(
                <SwitchV2
                    label="Notifications"
                    subLabel="Receive email notifications"
                    checked={false}
                />
            )
            expect(screen.getByText('Notifications')).toBeInTheDocument()
            expect(
                screen.getByText('Receive email notifications')
            ).toBeInTheDocument()
            expect(screen.getByRole('switch')).toBeInTheDocument()
        })

        it('renders without label', () => {
            render(<SwitchV2 checked={false} />)
            expect(screen.getByRole('switch')).toBeInTheDocument()
            expect(
                document.querySelector('[data-switch="switch"]')
            ).toBeInTheDocument()
        })

        it('renders with slot content', () => {
            render(
                <SwitchV2
                    label="Switch with slot"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )
            expect(screen.getByText('Switch with slot')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="slot-icon"]')
            ).toBeInTheDocument()
        })

        it('renders required indicator', () => {
            render(
                <SwitchV2 label="Required Switch" required checked={false} />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('renders complex switch with all features', () => {
            render(
                <SwitchV2
                    label="Complex Switch"
                    subLabel="With subtext"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                    required
                />
            )
            expect(screen.getByRole('switch')).toBeInTheDocument()
            expect(screen.getByText('Complex Switch')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Switch States', () => {
        it('renders unchecked state by default', () => {
            render(<SwitchV2 label="Unchecked Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')
            expect(switchElement).toHaveAttribute('data-state', 'unchecked')
        })

        it('renders checked state', () => {
            render(<SwitchV2 label="Checked Switch" checked={true} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
            expect(switchElement).toHaveAttribute('data-state', 'checked')
        })

        it('renders disabled state', () => {
            render(
                <SwitchV2 label="Disabled Switch" disabled checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeDisabled()
            expect(switchElement).toHaveAttribute('aria-disabled', 'true')
            expect(switchElement).toHaveAttribute('data-state', 'unchecked')
        })

        it('renders error state', () => {
            render(<SwitchV2 label="Error Switch" error checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
        })

        it('renders required state', () => {
            render(
                <SwitchV2 label="Required Switch" required checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Size Variants', () => {
        it('renders small size', () => {
            render(
                <SwitchV2
                    label="Small Switch"
                    size={SelectorV2Size.SM}
                    checked={false}
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('renders medium size (default)', () => {
            render(<SwitchV2 label="Medium Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it.each([SelectorV2Size.SM, SelectorV2Size.MD])(
            'renders %s size correctly',
            (size) => {
                const { unmount } = render(
                    <SwitchV2
                        label={`${size} Switch`}
                        size={size}
                        checked={false}
                    />
                )
                expect(screen.getByRole('switch')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Controlled vs Uncontrolled', () => {
        it('works as controlled component', () => {
            const handleChange = vi.fn()
            render(
                <SwitchV2
                    label="Controlled Switch"
                    checked={true}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('controlled component updates when checked prop changes', () => {
            const { rerender } = render(
                <SwitchV2 label="Controlled Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            rerender(<SwitchV2 label="Controlled Switch" checked={true} />)

            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })
    })

    describe('Event Handling', () => {
        it('calls onChange when clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Clickable Switch"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('calls onChange with inverted checked value', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Toggle Switch"
                    checked={true}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            expect(handleChange).toHaveBeenCalledWith(false)
        })

        it('does not call onChange when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Disabled Switch"
                    disabled
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('does not call onChange when onChange is not provided', async () => {
            const { user } = render(
                <SwitchV2 label="No Handler Switch" checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            // Should not throw error
            expect(switchElement).toBeInTheDocument()
        })
    })

    describe('Text Truncation', () => {
        it('truncates label when maxLength is provided', () => {
            const longLabel = 'A'.repeat(100)
            render(
                <SwitchV2
                    label={longLabel}
                    checked={false}
                    maxLength={{ label: 10 }}
                />
            )

            const labelElement = screen.getByText(/^A{10}/)
            expect(labelElement).toBeInTheDocument()
        })

        it('truncates subLabel when maxLength is provided', () => {
            const longSubLabel = 'B'.repeat(100)
            render(
                <SwitchV2
                    label="Switch"
                    subLabel={longSubLabel}
                    checked={false}
                    maxLength={{ subLabel: 10 }}
                />
            )

            const subLabelElement = screen.getByText(/^B{10}/)
            expect(subLabelElement).toBeInTheDocument()
        })

        it('does not truncate when maxLength is not provided', () => {
            const longLabel = 'C'.repeat(100)
            render(<SwitchV2 label={longLabel} checked={false} />)

            expect(screen.getByText(longLabel)).toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('has data-switch attribute with label value', () => {
            render(<SwitchV2 label="Test Switch" checked={false} />)

            expect(
                document.querySelector('[data-switch="Test Switch"]')
            ).toBeInTheDocument()
        })

        it('has data-switch="switch" when label is not provided', () => {
            render(<SwitchV2 checked={false} />)

            expect(
                document.querySelector('[data-switch="switch"]')
            ).toBeInTheDocument()
        })

        it('has data-status="enabled" when not disabled', () => {
            render(<SwitchV2 label="Enabled Switch" checked={false} />)

            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()
        })

        it('has data-status="disabled" when disabled', () => {
            render(
                <SwitchV2 label="Disabled Switch" disabled checked={false} />
            )

            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })

        it('has data-element="switch-label" on label', () => {
            render(<SwitchV2 label="Labeled Switch" checked={false} />)

            const labelElement = document.querySelector(
                '[data-element="switch-label"]'
            )
            expect(labelElement).toBeInTheDocument()
        })

        it('has data-element="switch-description" on subLabel', () => {
            render(
                <SwitchV2
                    label="Switch"
                    subLabel="Description"
                    checked={false}
                />
            )

            const descriptionElement = document.querySelector(
                '[data-element="switch-description"]'
            )
            expect(descriptionElement).toBeInTheDocument()
        })

        it('has data-element="slot-icon" when slot is provided', () => {
            render(
                <SwitchV2
                    label="Switch"
                    checked={false}
                    slot={{ slot: <MockIcon />, maxHeight: 16 }}
                />
            )

            expect(
                document.querySelector('[data-element="slot-icon"]')
            ).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty string label', () => {
            render(<SwitchV2 label="" checked={false} />)
            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('handles empty string subLabel', () => {
            render(<SwitchV2 label="Switch" subLabel="" checked={false} />)
            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('handles very long label text', () => {
            const longText = 'A'.repeat(1000)
            render(<SwitchV2 label={longText} checked={false} />)
            expect(screen.getByText(longText)).toBeInTheDocument()
        })

        it('handles special characters in label', () => {
            const specialText = 'Switch with <>&"\' characters'
            render(<SwitchV2 label={specialText} checked={false} />)
            expect(screen.getByText(specialText)).toBeInTheDocument()
        })

        it('handles multiple rapid clicks', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchV2
                    label="Rapid Click Switch"
                    checked={false}
                    onCheckedChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)
            await user.click(switchElement)
            await user.click(switchElement)

            expect(handleChange).toHaveBeenCalledTimes(3)
        })

        it('blocks className prop from being passed', () => {
            const { container } = render(
                <SwitchV2
                    label="Test"
                    checked={false}
                    {...({
                        className: 'should-not-exist',
                    } as Record<string, unknown>)}
                />
            )
            const switchElement = container.querySelector(
                '[data-switch="Test"]'
            )
            expect(switchElement).not.toHaveClass('should-not-exist')
        })

        it('blocks style prop from being passed', () => {
            const { container } = render(
                <SwitchV2
                    label="Test"
                    checked={false}
                    {...({
                        style: { backgroundColor: 'red' },
                    } as Record<string, unknown>)}
                />
            )
            const switchElement = container.querySelector(
                '[data-switch="Test"]'
            )
            expect(switchElement).not.toHaveStyle({ backgroundColor: 'red' })
        })

        it('handles ref forwarding correctly', () => {
            const ref = React.createRef<HTMLButtonElement>()
            render(<SwitchV2 label="Ref Test" checked={false} ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current).toHaveAttribute('role', 'switch')
        })
    })

    describe('Combined Props', () => {
        it('renders with all props combined', () => {
            const handleChange = vi.fn()
            render(
                <SwitchV2
                    label="Complete Switch"
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

            expect(screen.getByText('Complete Switch')).toBeInTheDocument()
            expect(screen.getByText('Complete description')).toBeInTheDocument()
            expect(screen.getByRole('switch')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
        })
    })
})
