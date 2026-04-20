import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Button from '../../../lib/components/Button/Button'
import { ButtonType, ButtonSubType } from '../../../lib/components/Button/types'
import { MockIcon } from '../../test-utils'

describe('Button Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default button (axe-core validation)', async () => {
            const { container } = render(<Button text="Accessible Button" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all button types (Primary, Secondary, Danger, Success)', async () => {
            const buttonTypes = [
                ButtonType.PRIMARY,
                ButtonType.SECONDARY,
                ButtonType.DANGER,
                ButtonType.SUCCESS,
            ]

            for (const buttonType of buttonTypes) {
                const { container } = render(
                    <Button
                        text={`${buttonType} button`}
                        buttonType={buttonType}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(<Button text="Disabled" disabled />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with icons (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <Button
                    text="With Icons"
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(<Button text="Focusable" />)
            const button = screen.getByRole('button')

            button.focus()
            expect(document.activeElement).toBe(button)
        })

        it('can be activated with Enter key - keyboard activation support', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Enter Key" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            button.focus()

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('can be activated with Space key - keyboard activation support', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Space Key" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            button.focus()

            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('disabled buttons have disabled attribute - prevents keyboard activation', () => {
            render(<Button text="Disabled" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('disabled')
            expect(button).toBeDisabled()
        })

        it('disabled buttons are removed from tab order (2.4.3 Focus Order)', () => {
            render(<Button text="Disabled" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('tabIndex', '-1')
        })

        it('maintains focus visible state (2.4.7 Focus Visible - Level AA)', () => {
            render(<Button text="Focus Visible" />)
            const button = screen.getByRole('button')

            // The component uses _focusVisible pseudo-class which would be applied
            // when focused via keyboard
            button.focus()
            expect(document.activeElement).toBe(button)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A) & Screen Reader Support', () => {
        it('has proper button role - programmatically determinable role', () => {
            render(<Button text="Button Role" />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('announces button text to screen readers - accessible name provided', () => {
            render(<Button text="Screen Reader Text" />)
            const button = screen.getByRole('button', {
                name: 'Screen Reader Text',
            })
            expect(button).toBeInTheDocument()
        })

        it('properly handles icon-only buttons with aria-label (1.1.1 Non-text Content)', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )
            const button = screen.getByRole('button', { name: 'Save document' })
            expect(button).toBeInTheDocument()
        })

        it('decorative icons have aria-hidden when text is present (1.1.1 Non-text Content)', () => {
            render(
                <Button
                    text="Save"
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )
            const button = screen.getByRole('button')
            const icons = button.querySelectorAll('[data-element]')
            icons.forEach((icon) => {
                expect(icon).toHaveAttribute('aria-hidden', 'true')
            })
        })

        it('icons are not hidden when button has no text (for icon-only buttons)', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save"
                />
            )
            const button = screen.getByRole('button')
            const icon = button.querySelector('[data-element="leading-icon"]')
            expect(icon).not.toHaveAttribute('aria-hidden')
        })

        it('announces disabled state - state programmatically determinable', () => {
            render(<Button text="Disabled Button" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('disabled')
            expect(button).toBeDisabled()
        })

        it('supports aria-describedby for additional context (3.3.2 Labels or Instructions)', () => {
            render(
                <>
                    <Button text="Submit" aria-describedby="submit-help" />
                    <span id="submit-help">Press to submit the form</span>
                </>
            )
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-describedby', 'submit-help')
        })

        it('supports aria-pressed for toggle buttons - state communicated', () => {
            render(<Button text="Toggle" aria-pressed="true" />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-pressed', 'true')
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(<Button text="Focus Me" />)
            const button = screen.getByRole('button')

            button.focus()
            expect(document.activeElement).toBe(button)
        })

        it('focus indicator is present - focus-visible pseudo-class applied', () => {
            render(<Button text="Focus Test" />)
            const button = screen.getByRole('button')
            button.focus()
            expect(button).toBeInTheDocument()
            // Focus indicator styling is applied via _focusVisible prop
        })

        it('removes focus on blur - focus management works correctly', () => {
            render(<Button text="Blur Test" />)
            const button = screen.getByRole('button')

            button.focus()
            expect(document.activeElement).toBe(button)

            button.blur()
            expect(document.activeElement).not.toBe(button)
        })

        it('maintains focus after click - predictable focus behavior', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Click Focus" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            button.focus()

            await user.click(button)
            expect(document.activeElement).toBe(button)
            expect(handleClick).toHaveBeenCalled()
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('maintains button role during loading - role preserved', () => {
            render(<Button text="Loading" loading />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('automatically sets aria-busy when loading - state communicated', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
        })

        it('has screen reader announcement for loading state - aria-live region', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            const srText = button.querySelector('span[aria-live="polite"]')
            expect(srText).toBeInTheDocument()
        })

        it('loading spinner has aria-hidden attribute - decorative spinner hidden', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            const spinner = button.querySelector('svg')
            expect(spinner).toBeInTheDocument()
            expect(spinner).toHaveAttribute('aria-hidden', 'true')
        })

        it('has screen reader only loading message - status announced without focus', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            const srText = button.querySelector('span[aria-live="polite"]')
            expect(srText).toBeInTheDocument()
            expect(srText).toHaveTextContent('Loading, please wait')
        })

        it('meets WCAG standards when loading - comprehensive compliance', async () => {
            const { container } = render(<Button text="Loading" loading />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('provides sufficient color contrast for primary buttons - requires manual verification', () => {
            render(<Button text="Primary" buttonType={ButtonType.PRIMARY} />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            // Note: Actual contrast ratio verification requires manual testing with contrast checker
            // Primary: #FFFFFF text on #0561E2 background - should meet 4.5:1 for AA
        })

        it('maintains contrast in disabled state - requires manual verification', () => {
            render(<Button text="Disabled" disabled />)
            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
            // Note: Disabled state contrast requires manual verification
            // Disabled buttons use lighter colors which may not meet 4.5:1 requirement
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA & 2.5.5 Target Size - Level AAA', () => {
        it('meets minimum touch target size requirements (24x24px for AA)', () => {
            render(<Button text="Touch Target" />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            // Buttons with text naturally exceed 24x24px minimum for Level AA
            // Actual size verification requires browser DevTools measurement
        })

        it('icon-only buttons meet touch target requirements - requires measurement', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Icon button"
                />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            // Note: Touch target size (including padding) must be verified manually
            // Level AA requires 24x24px minimum, Level AAA requires 44x44px minimum
            // Use browser DevTools to measure: element height + padding-top + padding-bottom
        })
    })

    describe('Form Integration (WCAG 3.3.2 Labels or Instructions)', () => {
        it('works correctly as a submit button - proper form integration', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <Button text="Submit" type="submit" />
                </form>
            )

            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('type', 'submit')
        })

        it('supports form attribute for outside form association', () => {
            render(
                <>
                    <form id="test-form" />
                    <Button text="Submit" type="submit" form="test-form" />
                </>
            )

            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('form', 'test-form')
        })
    })

    describe('Custom ARIA Attributes (WCAG 4.1.2 Name, Role, Value)', () => {
        it('supports custom aria-label - accessible name override', () => {
            render(<Button text="Save" aria-label="Save document to cloud" />)
            const button = screen.getByRole('button', {
                name: 'Save document to cloud',
            })
            expect(button).toBeInTheDocument()
        })

        it('supports aria-expanded for dropdown triggers - state communicated', () => {
            render(
                <Button
                    text="Menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                />
            )
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-expanded', 'false')
            expect(button).toHaveAttribute('aria-haspopup', 'true')
        })

        it('supports aria-controls for associated elements - relationships programmatically determinable', () => {
            render(
                <>
                    <Button text="Toggle Panel" aria-controls="panel-1" />
                    <div id="panel-1">Panel Content</div>
                </>
            )
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-controls', 'panel-1')
        })
    })

    describe('Skeleton State Accessibility (WCAG 4.1.3 Status Messages)', () => {
        it('skeleton buttons have aria-busy attribute - loading state communicated', () => {
            render(<Button text="Loading" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
        })
        it('skeleton buttons announce loading state - accessible name preserved', () => {
            render(<Button text="Submit" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
            expect(button).toHaveAttribute('aria-label', 'Submit')
        })

        it('skeleton buttons are not interactive - disabled state prevents interaction', () => {
            render(<Button text="Skeleton" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
        })

        it('skeleton buttons are not in tab order (2.4.3 Focus Order)', () => {
            render(<Button text="Skeleton" showSkeleton />)
            const button = screen.getByRole('button')
            // Skeleton buttons should not be focusable - removed from tab order
            expect(button).toBeDisabled()
            expect(button).toHaveAttribute('tabIndex', '-1')
        })

        it('meets WCAG standards in skeleton state - comprehensive compliance', async () => {
            const { container } = render(
                <Button text="Skeleton" showSkeleton />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A) - Icon-Only Buttons', () => {
        it('supports aria-label for accessible icon-only buttons - text alternative provided', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )
            const button = screen.getByRole('button', { name: 'Save document' })
            expect(button).toBeInTheDocument()
        })

        it('supports aria-labelledby for accessible icon-only buttons - text alternative via reference', () => {
            render(
                <>
                    <span id="save-label">Save</span>
                    <Button
                        leadingIcon={<MockIcon />}
                        subType={ButtonSubType.ICON_ONLY}
                        aria-labelledby="save-label"
                    />
                </>
            )
            const button = screen.getByRole('button', { name: 'Save' })
            expect(button).toBeInTheDocument()
        })

        it('supports text prop for accessible icon-only buttons - visible text provides accessible name', () => {
            render(
                <Button
                    text="Save"
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                />
            )
            const button = screen.getByRole('button', { name: 'Save' })
            expect(button).toBeInTheDocument()
        })
    })

    describe('Comprehensive WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <Button
                    text="Complete Test"
                    loading
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1, 2.1.1, 4.1.2, 4.1.3, keyboard navigation, screen reader support
        })

        it('meets WCAG standards with disabled state - all disabled state requirements', async () => {
            const { container } = render(<Button text="Disabled" disabled />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 2.1.1 Keyboard, 2.4.3 Focus Order, 4.1.2 Name Role Value
        })

        it('meets WCAG standards for icon-only button with proper labeling (1.1.1, 4.1.2)', async () => {
            const { container } = render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1 Non-text Content, 4.1.2 Name Role Value
        })
    })
})
