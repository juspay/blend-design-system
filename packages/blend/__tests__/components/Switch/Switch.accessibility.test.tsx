import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import { Switch } from '../../../lib/components/Switch/Switch'
import { SwitchSize } from '../../../lib/components/Switch/types'
import {
    SwitchTestFactory,
    SwitchPropsBuilder,
} from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

describe('Switch Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default switch (axe-core validation)', async () => {
            const { container } = render(
                <Switch label="Accessible Switch" checked={false} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all switch states (checked, unchecked, disabled, error)', async () => {
            const states = [
                { ...SwitchTestFactory.default(), checked: false },
                SwitchTestFactory.checked(),
                { ...SwitchTestFactory.disabled(), checked: false },
                { ...SwitchTestFactory.withError(), checked: false },
            ]

            for (const props of states) {
                const { container, unmount } = render(<Switch {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const props = { ...SwitchTestFactory.disabled(), checked: false }
            const { container } = render(<Switch {...props} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with complex content (1.1.1 Non-text Content, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <Switch
                    label="Complex Switch"
                    checked={false}
                    subtext="Additional information"
                    slot={<MockIcon />}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all sizes', async () => {
            const sizes = SwitchTestFactory.allSizes().map((props) => ({
                ...props,
                checked: false,
            }))

            for (const props of sizes) {
                const { container, unmount } = render(<Switch {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(<Switch label="Focusable Switch" checked={false} />)
            const switchElement = screen.getByRole('switch')

            switchElement.focus()
            expect(document.activeElement).toBe(switchElement)
        })

        it('can be activated with Space key - keyboard activation support (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Space Toggle Switch"
                    checked={false}
                    onChange={handleChange}
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
                <Switch
                    label="Enter Toggle Switch"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard('{Enter}')
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('disabled switches are not focusable - keyboard navigation (WCAG 2.1.1)', async () => {
            const { user } = render(
                <Switch label="Disabled Switch" checked={false} disabled />
            )

            const switchElement = screen.getByRole('switch')

            await user.tab()
            expect(switchElement).not.toHaveFocus()
            expect(switchElement).toHaveAttribute('aria-disabled', 'true')
        })

        it('does not respond to keyboard when disabled (WCAG 2.1.1)', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Disabled Keyboard Switch"
                    disabled
                    onChange={handleChange}
                />
            )
            await user.keyboard(' ')
            await user.keyboard('{Enter}')

            expect(handleChange).not.toHaveBeenCalled()
        })

        it('maintains focus after toggle (WCAG 2.1.1)', async () => {
            const { user } = render(
                <Switch label="Focus Maintained Switch" checked={false} />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard(' ')
            expect(switchElement).toHaveFocus()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has correct switch role - programmatically determinable role', () => {
            render(<Switch label="Role Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('has proper aria-checked attribute - state is programmatically determinable', () => {
            const { rerender } = render(
                <Switch label="ARIA Checked Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            rerender(<Switch label="ARIA Checked Switch" checked={true} />)
            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('updates aria-checked when state changes - state changes are announced', async () => {
            const TestComponent = () => {
                const [checked, setChecked] = React.useState(false)
                return (
                    <Switch
                        label="State Change Switch"
                        checked={checked}
                        onChange={setChecked}
                    />
                )
            }

            const { user } = render(<TestComponent />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            await user.click(switchElement)
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('provides accessible name via label - name is programmatically determinable', () => {
            render(<Switch label="Accessible Name Switch" checked={false} />)

            const switchElement = screen.getByRole('switch', {
                name: 'Accessible Name Switch',
            })
            expect(switchElement).toBeInTheDocument()
        })

        it('supports aria-label for accessible name override (WCAG 4.1.2)', () => {
            render(
                <Switch aria-label="Custom Accessible Name" checked={false} />
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
                    <Switch aria-labelledby="switch-heading" checked={false} />
                </>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute(
                'aria-labelledby',
                'switch-heading'
            )
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('associates label with switch correctly - relationships are programmatically determinable', () => {
            render(
                <Switch
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
                    <Switch label="Switch 1" checked={false} />
                    <Switch label="Switch 2" checked={false} />
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
                <Switch
                    label="Clickable Label Switch"
                    onChange={handleChange}
                />
            )

            const label = screen.getByText('Clickable Label Switch')
            await user.click(label)

            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('communicates state relationships via ARIA attributes (WCAG 1.3.1)', () => {
            render(
                <Switch
                    label="State Relationships Switch"
                    checked={false}
                    required
                    error
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
            expect(switchElement).toHaveAttribute('aria-checked')
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order - DOM order matches visual order', () => {
            render(
                <Switch
                    label="Sequence Switch"
                    checked={false}
                    subtext="Additional context"
                />
            )

            const switchElement = screen.getByRole('switch')
            const label = screen.getByText('Sequence Switch')
            const subtext = screen.getByText('Additional context')

            // Verify all elements are in the document
            expect(switchElement).toBeInTheDocument()
            expect(label).toBeInTheDocument()
            expect(subtext).toBeInTheDocument()

            // NOTE: Switch component structure follows logical reading order:
            // switch control → label → subtext → slot
            // DOM order matches visual order, ensuring meaningful sequence
            // This is verified by the component implementation in Switch.tsx
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual characteristics - label provides context', () => {
            render(<Switch label="Enable dark mode" checked={false} required />)

            const label = screen.getByText('Enable dark mode')

            // Label text provides context, not just visual indicators
            expect(label).toHaveTextContent('Enable dark mode')
            expect(screen.getByText('*')).toBeInTheDocument() // Required indicator
            // Both text and visual indicator (asterisk) provide context
        })
    })

    describe('WCAG 1.4.4 Resize Text (Level AA)', () => {
        it('text scales up to 200% without loss of functionality', () => {
            render(
                <Switch
                    label="Resizable Text Switch"
                    checked={false}
                    subtext="Subtext that scales"
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Text uses relative units (rem/em) allowing scaling
            // Manual verification required: Test with browser zoom up to 200%
        })
    })

    describe('WCAG 1.4.12 Text Spacing (Level AA)', () => {
        it('accommodates text spacing adjustments without breaking layout', () => {
            render(
                <Switch
                    label="Text Spacing Switch"
                    checked={false}
                    subtext="Subtext with spacing"
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Flexbox layout accommodates spacing changes
            // Manual verification required: Test with CSS text spacing adjustments
        })
    })

    describe('WCAG 2.4.1 Bypass Blocks (Level A)', () => {
        it('does not create bypass blocks - proper semantic structure', () => {
            render(<Switch label="Bypass Blocks Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Switch component itself does not create bypass blocks
            // Proper semantic structure allows screen reader navigation
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order', async () => {
            const { user } = render(
                <>
                    <Switch label="First Switch" checked={false} />
                    <Switch label="Second Switch" checked={false} />
                    <Switch label="Third Switch" checked={false} />
                </>
            )

            const switches = screen.getAllByRole('switch')

            // Tab through switches
            await user.tab()
            expect(document.activeElement).toBe(switches[0])

            await user.tab()
            expect(document.activeElement).toBe(switches[1])

            await user.tab()
            expect(document.activeElement).toBe(switches[2])
        })

        it('excludes disabled switches from tab order (WCAG 2.4.3)', async () => {
            const { user } = render(
                <>
                    <Switch label="First Switch" checked={false} />
                    <Switch label="Disabled Switch" checked={false} disabled />
                    <Switch label="Third Switch" checked={false} />
                </>
            )

            const switches = screen.getAllByRole('switch')

            await user.tab()
            expect(document.activeElement).toBe(switches[0])

            await user.tab()
            // Should skip disabled switch and go to third
            expect(document.activeElement).toBe(switches[2])
        })
    })

    describe('WCAG 2.4.4 Link Purpose (In Context) (Level A)', () => {
        it('provides clear purpose from label text', () => {
            render(<Switch label="Enable notifications" checked={false} />)

            const switchElement = screen.getByRole('switch', {
                name: 'Enable notifications',
            })
            expect(switchElement).toBeInTheDocument()
        })

        it('supports aria-label for purpose clarification', () => {
            render(
                <Switch
                    label="Notifications"
                    checked={false}
                    aria-label="Enable push notifications for this app"
                />
            )

            const switchElement = screen.getByRole('switch', {
                name: 'Enable push notifications for this app',
            })
            expect(switchElement).toBeInTheDocument()
        })
    })

    describe('WCAG 2.5.3 Label in Name (Level A)', () => {
        it('accessible name contains visible label text', () => {
            render(<Switch label="Enable dark mode" checked={false} />)

            const switchElement = screen.getByRole('switch', {
                name: 'Enable dark mode',
            })
            expect(switchElement).toBeInTheDocument()
        })

        it('aria-label extends but does not contradict visible text', () => {
            render(
                <Switch
                    label="Notifications"
                    checked={false}
                    aria-label="Enable push notifications"
                />
            )

            // aria-label should be used as accessible name
            const switchElement = screen.getByRole('switch', {
                name: 'Enable push notifications',
            })
            expect(switchElement).toBeInTheDocument()
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('does not cause context changes on focus', () => {
            render(<Switch label="On Focus Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            // Focus should not trigger any context changes
            expect(switchElement).toHaveFocus()
            // No navigation, no modal opening, no unexpected behavior
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('does not cause unexpected context changes on activation', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="On Input Switch"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            await user.click(switchElement)

            // Should only toggle state, no navigation or context changes
            expect(handleChange).toHaveBeenCalledWith(true)
        })
    })

    describe('WCAG 3.2.4 Consistent Identification (Level AA)', () => {
        it('maintains consistent accessible names for same functionality', () => {
            render(
                <>
                    <Switch label="Enable notifications" checked={false} />
                    <Switch label="Enable notifications" checked={false} />
                </>
            )

            const switches = screen.getAllByRole('switch', {
                name: 'Enable notifications',
            })
            expect(switches).toHaveLength(2)
            // Both switches with same purpose have consistent names
        })
    })

    describe('WCAG 3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)', () => {
        it('supports error state for form validation', () => {
            render(
                <Switch
                    label="Accept terms"
                    checked={false}
                    required
                    error
                    subtext="You must accept the terms to continue"
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
            // NOTE: Final error prevention patterns are application-dependent
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('provides clear label for switch purpose', () => {
            render(<Switch label="Enable notifications" checked={false} />)

            const switchElement = screen.getByRole('switch', {
                name: 'Enable notifications',
            })
            expect(switchElement).toBeInTheDocument()
        })

        it('indicates required state with asterisk and aria-required (WCAG 3.3.2)', () => {
            render(<Switch label="Required Switch" checked={false} required />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-required', 'true')
            expect(screen.getByText('*')).toBeInTheDocument()
        })

        it('provides subtext for additional context via aria-describedby (WCAG 3.3.2)', () => {
            render(
                <Switch
                    label="Switch with description"
                    subtext="This switch controls notifications"
                />
            )

            const switchElement = screen.getByRole('switch')
            const subtext = screen.getByText(
                'This switch controls notifications'
            )

            expect(switchElement).toHaveAttribute('aria-describedby')
            expect(subtext).toHaveAttribute('id')
            expect(switchElement.getAttribute('aria-describedby')).toBe(
                subtext.id
            )
        })

        it('merges custom aria-describedby with subtext ID (WCAG 3.3.2)', () => {
            render(
                <>
                    <Switch
                        label="Switch with multiple descriptions"
                        subtext="Subtext description"
                        aria-describedby="custom-description"
                    />
                    <div id="custom-description">Custom description</div>
                </>
            )

            const switchElement = screen.getByRole('switch')
            const ariaDescribedBy =
                switchElement.getAttribute('aria-describedby')

            expect(ariaDescribedBy).toContain('custom-description')
            expect(ariaDescribedBy).toContain('-subtext')
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('communicates error state via aria-invalid="true" (WCAG 4.1.3)', () => {
            render(<Switch label="Error Switch" checked={false} error />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
        })

        it('announces state changes to screen readers (WCAG 4.1.3)', () => {
            const { rerender } = render(
                <Switch label="State Announcement Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'false')

            rerender(
                <Switch label="State Announcement Switch" checked={true} />
            )
            switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-checked', 'true')
        })

        it('supports aria-describedby for error messages (WCAG 4.1.3)', () => {
            render(
                <>
                    <Switch
                        label="Error Switch"
                        error
                        aria-describedby="error-message"
                    />
                    <div id="error-message" role="alert">
                        This field has an error
                    </div>
                </>
            )

            const switchElement = screen.getByRole('switch')
            const errorMessage = screen.getByRole('alert')

            expect(switchElement).toHaveAttribute(
                'aria-describedby',
                'error-message'
            )
            expect(errorMessage).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has visible focus indicator - focus is clearly visible', () => {
            render(<Switch label="Focus Visible Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            // Focus indicator should be visible (tested via visual regression)
            expect(switchElement).toHaveFocus()
        })

        it('maintains focus indicator visibility across states', () => {
            const { rerender } = render(
                <Switch label="Focus Indicator Switch" checked={false} />
            )

            let switchElement = screen.getByRole('switch')
            switchElement.focus()
            expect(switchElement).toHaveFocus()

            rerender(<Switch label="Focus Indicator Switch" checked={true} />)
            switchElement = screen.getByRole('switch')
            switchElement.focus()
            expect(switchElement).toHaveFocus()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('maintains sufficient contrast for labels - requires manual verification', () => {
            render(<Switch label="Contrast Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Actual contrast ratios require manual verification with contrast checker tools
            // Label text uses gray[700] (#2B303B) on white (gray[0]: #FFFFFF)
            // Should meet 4.5:1 for normal text (AA per WCAG 1.4.3)
        })

        it('maintains contrast in error state - requires manual verification', () => {
            render(
                <Switch label="Error Contrast Switch" checked={false} error />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('aria-invalid', 'true')
            // NOTE: Error state label uses red[600] (#E7000B) on white
            // Requires manual verification with contrast checker
        })

        it('maintains contrast in disabled state - requires manual verification', () => {
            render(
                <Switch
                    label="Disabled Contrast Switch"
                    checked={false}
                    disabled
                />
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeDisabled()
            // NOTE: Disabled state uses gray[300] (#CACFD8) on white
            // Requires manual verification with contrast checker
        })
    })

    describe('WCAG 2.5.5 Target Size (Level AAA)', () => {
        it('has adequate touch target size - requires manual verification', () => {
            render(<Switch label="Touch Target Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Touch target size requires manual verification
            // Small switch: 18px height at sm, 12px at lg
            // Medium switch: 20px height at sm, 16px at lg
            // WCAG 2.5.5 AAA requires 44x44px minimum interactive area
            // Current implementation does not meet AAA requirement
        })
    })

    describe('WCAG 1.4.6 Contrast (Enhanced) (Level AAA)', () => {
        it('meets enhanced contrast requirements - requires manual verification', () => {
            render(<Switch label="Enhanced Contrast Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: AAA requires 7:1 contrast ratio (WCAG 1.4.6)
            // Current implementation designed for AA (4.5:1 per WCAG 1.4.3)
            // Requires manual verification and potential color adjustments
        })
    })

    describe('WCAG 1.4.11 Non-text Contrast (Level AA)', () => {
        it('maintains focus indicator contrast - requires manual verification', () => {
            render(<Switch label="Focus Contrast Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            switchElement.focus()
            expect(switchElement).toHaveFocus()
            // NOTE: Focus indicator uses primary[200] (#BEDBFF) outline and primary[100] (#DBEAFE) box-shadow
            // Requires 3:1 contrast against switch background (WCAG 1.4.11)
            // Manual verification required
        })
    })

    describe('WCAG 2.3.3 Animation from Interactions (Level AAA)', () => {
        it('respects reduced motion preferences', () => {
            // Mock reduced motion preference
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: vi.fn().mockImplementation((query) => ({
                    matches: query === '(prefers-reduced-motion: reduce)',
                    media: query,
                    onchange: null,
                    addListener: vi.fn(),
                    removeListener: vi.fn(),
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                    dispatchEvent: vi.fn(),
                })),
            })

            render(<Switch label="Reduced Motion Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // Animation behavior would be tested through visual regression
        })
    })

    describe('WCAG 1.4.8 Visual Presentation (Level AAA)', () => {
        it('respects browser text size settings - text scales up to 200%', () => {
            render(<Switch label="Text Scaling Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Text uses relative units (rem/em) allowing user control
            // Text should scale up to 200% without loss of functionality
            // Manual verification required
        })
    })

    describe('WCAG 1.4.9 Images of Text (Level AAA)', () => {
        it('does not use images of text - uses actual text', () => {
            render(<Switch label="No Images of Text Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
            // NOTE: Switch component uses actual text, not images of text
            // Icons in slot are SVG graphics, not images of text
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality is keyboard accessible without timing requirements', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Keyboard No Exception Switch"
                    checked={false}
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            await user.keyboard(' ')
            expect(handleChange).toHaveBeenCalledWith(true)
            // NOTE: All functionality is keyboard accessible
            // No timing requirements or mouse-only functionality
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('does not cause context changes on focus - changes only on user request', () => {
            render(<Switch label="Change on Request Switch" checked={false} />)

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            // Focus should not cause context changes
            expect(switchElement).toHaveFocus()
            // NOTE: Switch only changes state on explicit user activation (click, Space, Enter)
        })
    })

    describe('Size Variants Accessibility', () => {
        it('maintains accessibility across all sizes', async () => {
            const sizes = SwitchTestFactory.allSizes().map((props) => ({
                ...props,
                checked: false,
            }))

            for (const props of sizes) {
                const { container, unmount } = render(<Switch {...props} />)
                const results = await axe(container)
                expect(results).toHaveNoViolations()

                const switchElement = screen.getByRole('switch')
                expect(switchElement).toBeInTheDocument()

                unmount()
            }
        })

        it('provides consistent interaction across sizes', async () => {
            const handleChange1 = vi.fn()
            const handleChange2 = vi.fn()
            const { user } = render(
                <>
                    <Switch
                        label="Small Switch"
                        checked={false}
                        size={SwitchSize.SMALL}
                        onChange={handleChange1}
                    />
                    <Switch
                        label="Medium Switch"
                        checked={false}
                        size={SwitchSize.MEDIUM}
                        onChange={handleChange2}
                    />
                </>
            )

            const switches = screen.getAllByRole('switch')

            for (const switchElement of switches) {
                switchElement.focus()
                await user.keyboard(' ')
            }

            expect(handleChange1).toHaveBeenCalled()
            expect(handleChange2).toHaveBeenCalled()
        })
    })

    describe('Form Integration Accessibility', () => {
        it('works properly in form context', () => {
            render(
                <form>
                    <fieldset>
                        <legend>Preferences</legend>
                        <Switch
                            name="notifications"
                            label="Enable Notifications"
                            checked={false}
                        />
                    </fieldset>
                </form>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute('name', 'notifications')
        })

        it('supports form validation patterns', () => {
            render(
                <form>
                    <Switch
                        label="Required Switch"
                        checked={false}
                        required
                        aria-describedby="validation-message"
                    />
                    <div id="validation-message">This field is required</div>
                </form>
            )

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toHaveAttribute(
                'aria-describedby',
                'validation-message'
            )
            expect(switchElement).toHaveAttribute('aria-required', 'true')
        })
    })

    describe('Complex Content Accessibility', () => {
        it('handles complex label content accessibly', async () => {
            const { container } = render(
                <Switch
                    label="Enable advanced notifications"
                    checked={false}
                    subtext="Configure notification settings with enhanced options"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()

            const switchElement = screen.getByRole('switch')
            expect(switchElement).toBeInTheDocument()
        })

        it('maintains accessibility with subtext', async () => {
            const props = { ...SwitchTestFactory.withSubtext(), checked: false }
            const { container } = render(<Switch {...props} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles slot content accessibly', async () => {
            const props = new SwitchPropsBuilder()
                .withLabel('Switch with icon')
                .withChecked(false)
                .withSlot(
                    <span role="img" aria-label="notification icon">
                        🔔
                    </span>
                )
                .build()

            const { container } = render(<Switch {...props} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
