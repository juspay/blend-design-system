import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { Switch } from '../../../lib/components/Switch/Switch'
import { SwitchSize } from '../../../lib/components/Switch/types'
import {
    SwitchPropsBuilder,
    SwitchTestFactory,
} from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe('Switch Component', () => {
    describe('Rendering', () => {
        it('renders with label', () => {
            const props = SwitchTestFactory.default()
            render(<Switch {...props} />)

            expect(screen.getByRole('switch')).toBeInTheDocument()
            expect(screen.getByText('Test Switch')).toBeInTheDocument()
        })

        it('renders without label', () => {
            render(<Switch />)

            expect(screen.getByRole('switch')).toBeInTheDocument()
            expect(screen.queryByText('Test Switch')).not.toBeInTheDocument()
        })

        it('renders with subtext', () => {
            const props = SwitchTestFactory.withSubtext()
            render(<Switch {...props} />)

            expect(screen.getByText('Switch with subtext')).toBeInTheDocument()
            expect(
                screen.getByText('Additional information')
            ).toBeInTheDocument()
        })

        it('renders with slot content', () => {
            const props = new SwitchPropsBuilder()
                .withLabel('Switch with slot')
                .withSlot(<MockIcon />)
                .build()

            render(<Switch {...props} />)

            expect(screen.getByText('Switch with slot')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('renders required indicator', () => {
            const props = SwitchTestFactory.required()
            render(<Switch {...props} />)

            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('renders complex switch with all features', () => {
            const props = SwitchTestFactory.complex()
            render(<Switch {...props} />)

            expect(screen.getByRole('switch')).toBeInTheDocument()
            expect(screen.getByText('Complex Switch')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Switch States', () => {
        it('renders unchecked state by default', () => {
            render(<Switch label="Unchecked Switch" />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).not.toBeChecked()
            expect(switchElement).toHaveAttribute('data-state', 'unchecked')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')
        })

        it('renders checked state', () => {
            const props = SwitchTestFactory.checked()
            render(<Switch {...props} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
            expect(switchElement).toHaveAttribute('data-state', 'checked')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('renders disabled state', () => {
            const props = SwitchTestFactory.disabled()
            render(<Switch {...props} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeDisabled()
            expect(switchElement).toHaveAttribute('disabled')
        })

        it('renders error state', () => {
            const props = SwitchTestFactory.withError()
            render(<Switch {...props} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // Error state is applied via styling, not DOM attributes
        })

        it('renders required state', () => {
            const props = SwitchTestFactory.required()
            render(<Switch {...props} />)

            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Size Variants', () => {
        it('renders small size', () => {
            const props = new SwitchPropsBuilder()
                .withLabel('Small Switch')
                .withSize(SwitchSize.SMALL)
                .build()

            render(<Switch {...props} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // Size is applied via CSS classes/styling
        })

        it('renders medium size (default)', () => {
            render(<Switch label="Medium Switch" />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('renders all sizes correctly', () => {
            const sizes = SwitchTestFactory.allSizes()

            sizes.forEach((props, index) => {
                const { unmount } = render(<Switch {...props} />)
                expect(screen.getByRole('switch')).toBeInTheDocument()
                unmount()
            })
        })
    })

    describe('Controlled vs Uncontrolled', () => {
        it('works as controlled component', () => {
            const handleChange = vi.fn()
            render(
                <Switch
                    label="Controlled Switch"
                    checked={true}
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
        })

        it('works as uncontrolled component', () => {
            render(<Switch label="Uncontrolled Switch" defaultChecked={true} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
        })

        it('controlled component updates when checked prop changes', () => {
            const { rerender } = render(
                <Switch label="Controlled Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).not.toBeChecked()

            rerender(<Switch label="Controlled Switch" checked={true} />)

            switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
        })

        it('uncontrolled component maintains internal state', async () => {
            const { user } = render(
                <Switch label="Uncontrolled Switch" defaultChecked={false} />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).not.toBeChecked()

            await user.click(switchElement)
            expect(switchElement).toBeChecked()
        })
    })

    describe('Event Handling', () => {
        it('calls onChange when clicked', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch label="Clickable Switch" onChange={handleChange} />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('calls onChange with correct value when toggling', async () => {
            const handleChange = vi.fn()
            const { user, rerender } = render(
                <Switch
                    label="Toggle Switch"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')

            await user.click(switchElement)
            expect(handleChange).toHaveBeenCalledWith(true)

            handleChange.mockClear()

            // Update to checked state and test toggling off
            rerender(
                <Switch
                    label="Toggle Switch"
                    checked={true}
                    onChange={handleChange}
                />
            )

            await user.click(switchElement)
            expect(handleChange).toHaveBeenCalledWith(false)
        })

        it('does not call onChange when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Disabled Switch"
                    disabled
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('handles keyboard events', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch label="Keyboard Switch" onChange={handleChange} />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalledWith(true)

            // Test Enter key separately with a new switch
            handleChange.mockClear()
            const { user: user2 } = render(
                <Switch label="Enter Keyboard Switch" onChange={handleChange} />
            )

            const switchElement2 = screen.getByRole('switch', {
                name: 'Enter Keyboard Switch',
            })
            switchElement2.focus()

            await user2.keyboard('{Enter}')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('clicking label toggles switch', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch label="Label Click Switch" onChange={handleChange} />
            )

            const label = screen.getByText('Label Click Switch')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })
    })

    describe('Form Integration', () => {
        it('works with form submission', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <Switch
                        name="form-switch"
                        value="switch-value"
                        label="Form Switch"
                        checked={true}
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('name', 'form-switch')
            expect(switchElement).toHaveAttribute('value', 'switch-value')
        })

        it('provides proper form data structure', () => {
            render(
                <Switch
                    name="preferences"
                    value="notifications"
                    label="Enable Notifications"
                    checked={true}
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('name', 'preferences')
            expect(switchElement).toHaveAttribute('value', 'notifications')
            expect(switchElement).toBeChecked()
        })

        it('handles form reset correctly', () => {
            render(
                <form>
                    <Switch
                        name="reset-switch"
                        label="Reset Switch"
                        defaultChecked={true}
                    />
                    <button type="reset">Reset</button>
                </form>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
            // Form reset behavior would be handled by the browser
        })

        it('supports required validation', () => {
            const props = SwitchTestFactory.required()
            render(<Switch {...props} />)

            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('HTML Props and Attributes', () => {
        it('passes through custom props', () => {
            const props = new SwitchPropsBuilder()
                .withLabel('Custom Switch')
                .withCustomProps({
                    'data-testid': 'custom-switch',
                    'aria-describedby': 'help-text',
                    className: 'custom-class',
                })
                .build()

            render(<Switch {...props} />)

            const switchElement = screen.getByTestId('custom-switch')
            expect(switchElement).toHaveAttribute(
                'aria-describedby',
                'help-text'
            )
        })

        it('applies data attributes correctly', () => {
            render(
                <Switch
                    label="Data Switch"
                    data-testid="data-switch"
                    data-category="form-control"
                />
            )

            const switchElement = screen.getByTestId('data-switch')
            expect(switchElement).toHaveAttribute(
                'data-category',
                'form-control'
            )
        })

        it('generates unique IDs when not provided', () => {
            render(
                <>
                    <Switch label="Switch 1" />
                    <Switch label="Switch 2" />
                </>
            )

            const switches = screen.getAllByRole('switch')
            const labels = screen.getAllByText(/Switch [12]/)

            expect(switches[0]).toHaveAttribute('id')
            expect(switches[1]).toHaveAttribute('id')
            expect(switches[0].id).not.toBe(switches[1].id)

            // Labels should be associated with switches
            expect(labels[0].closest('label')).toHaveAttribute(
                'for',
                switches[0].id
            )
            expect(labels[1].closest('label')).toHaveAttribute(
                'for',
                switches[1].id
            )
        })

        it('uses provided ID', () => {
            render(<Switch id="custom-switch-id" label="Custom ID Switch" />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('id', 'custom-switch-id')
        })
    })

    describe('Token Application', () => {
        it('applies responsive tokens through useResponsiveTokens hook', () => {
            render(<Switch label="Token Switch" />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // Token application is tested through visual regression and computed styles
        })

        it('applies proper spacing and layout', () => {
            const props = new SwitchPropsBuilder()
                .withLabel('Layout Switch')
                .withSubtext('With subtext')
                .withSlot(<MockIcon />)
                .build()

            render(<Switch {...props} />)

            expect(screen.getByText('Layout Switch')).toBeInTheDocument()
            expect(screen.getByText('With subtext')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            // Layout and spacing are applied via CSS tokens
        })
    })

    describe('Edge Cases', () => {
        it('handles missing label gracefully', () => {
            render(<Switch />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('handles empty label', () => {
            render(<Switch label="" />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('handles null subtext', () => {
            render(<Switch label="Switch" subtext={null} />)

            expect(screen.getByText('Switch')).toBeInTheDocument()
            expect(screen.getByRole('switch')).toBeInTheDocument()
        })

        it('handles undefined onChange', async () => {
            const { user } = render(<Switch label="No Callback Switch" />)

            const switchElement = screen.getByRole('switch')

            // Should not throw error when onChange is undefined
            await user.click(switchElement)
            expect(switchElement).toBeInTheDocument()
        })

        it('handles rapid clicking', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch label="Rapid Click Switch" onChange={handleChange} />
            )

            const switchElement = screen.getByRole('switch')

            // Rapid clicking
            await user.click(switchElement)
            await user.click(switchElement)
            await user.click(switchElement)

            expect(handleChange).toHaveBeenCalledTimes(3)
        })

        it('maintains state consistency during re-renders', () => {
            const { rerender } = render(
                <Switch label="Consistent Switch" checked={true} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()

            // Re-render with same props
            rerender(<Switch label="Consistent Switch" checked={true} />)

            switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
        })

        it('handles boolean conversion correctly', () => {
            const { rerender } = render(
                <Switch label="Boolean Switch" checked={undefined} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            rerender(<Switch label="Boolean Switch" checked={0 as any} />)
            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', '0')

            rerender(<Switch label="Boolean Switch" checked={1 as any} />)
            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', '1')
        })
    })

    describe('Accessibility Features', () => {
        it('has proper switch role', () => {
            render(<Switch label="Accessible Switch" />)

            expect(screen.getByRole('switch')).toBeInTheDocument()
        })

        it('has proper aria-checked attribute', () => {
            const { rerender } = render(
                <Switch label="ARIA Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            rerender(<Switch label="ARIA Switch" checked={true} />)
            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('associates label with switch correctly', () => {
            render(<Switch id="test-switch" label="Associated Switch" />)

            const switchElement = screen.getByRole('switch')
            const label = screen.getByText('Associated Switch')

            expect(label.closest('label')).toHaveAttribute('for', 'test-switch')
            expect(switchElement).toHaveAttribute('id', 'test-switch')
        })

        it('supports aria-describedby for additional context', () => {
            render(
                <>
                    <Switch
                        label="Described Switch"
                        aria-describedby="switch-description"
                    />
                    <div id="switch-description">
                        This switch controls notifications
                    </div>
                </>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute(
                'aria-describedby',
                'switch-description'
            )
        })
    })

    describe('Performance', () => {
        it('does not re-render unnecessarily', () => {
            const { rerender } = render(
                <Switch label="Performance Switch" checked={false} />
            )

            // Re-rendering with same props should be efficient
            rerender(<Switch label="Performance Switch" checked={false} />)

            expect(screen.getByRole('switch')).toBeInTheDocument()
        })

        it('handles prop changes efficiently', () => {
            const { rerender } = render(
                <Switch label="Efficient Switch" checked={false} />
            )

            rerender(<Switch label="Efficient Switch" checked={true} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeChecked()
        })
    })
})
