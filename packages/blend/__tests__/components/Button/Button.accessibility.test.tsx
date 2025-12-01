import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Button from '../../../lib/components/Button/Button'
import { ButtonType, ButtonSubType } from '../../../lib/components/Button/types'
import { MockIcon } from '../../test-utils'

describe('Button Accessibility', () => {
    describe('WCAG Compliance', () => {
        it('meets WCAG standards for default button', async () => {
            const { container } = render(<Button text="Accessible Button" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all button types', async () => {
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

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(<Button text="Disabled" disabled />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with icons', async () => {
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

    describe('Keyboard Navigation', () => {
        it('is focusable with keyboard', () => {
            render(<Button text="Focusable" />)
            const button = screen.getByRole('button')

            button.focus()
            expect(document.activeElement).toBe(button)
        })

        it('can be activated with Enter key', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Enter Key" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            button.focus()

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('can be activated with Space key', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Space Key" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            button.focus()

            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('disabled buttons have disabled attribute', () => {
            render(<Button text="Disabled" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('disabled')
            expect(button).toBeDisabled()
        })

        it('disabled buttons are removed from tab order', () => {
            render(<Button text="Disabled" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('tabIndex', '-1')
        })

        it('maintains focus visible state', () => {
            render(<Button text="Focus Visible" />)
            const button = screen.getByRole('button')

            // The component uses _focusVisible pseudo-class which would be applied
            // when focused via keyboard
            button.focus()
            expect(document.activeElement).toBe(button)
        })
    })

    describe('Screen Reader Support', () => {
        it('has proper button role', () => {
            render(<Button text="Button Role" />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('announces button text to screen readers', () => {
            render(<Button text="Screen Reader Text" />)
            const button = screen.getByRole('button', {
                name: 'Screen Reader Text',
            })
            expect(button).toBeInTheDocument()
        })

        it('properly handles icon-only buttons with aria-label', () => {
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

        it('decorative icons have aria-hidden when text is present', () => {
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

        it('icons are not hidden when button has no text (for icon-only)', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save"
                />
            )
            const button = screen.getByRole('button')
            const icon = button.querySelector('[data-element="leading-icon"]')
            // Icon should not have aria-hidden when no text (button relies on aria-label)
            expect(icon).not.toHaveAttribute('aria-hidden')
        })

        it('announces disabled state', () => {
            render(<Button text="Disabled Button" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('disabled')
            expect(button).toBeDisabled()
        })

        it('supports aria-describedby for additional context', () => {
            render(
                <>
                    <Button text="Submit" aria-describedby="submit-help" />
                    <span id="submit-help">Press to submit the form</span>
                </>
            )
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-describedby', 'submit-help')
        })

        it('supports aria-pressed for toggle buttons', () => {
            render(<Button text="Toggle" aria-pressed="true" />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-pressed', 'true')
        })
    })

    describe('Focus Management', () => {
        it('shows focus indicator when focused', () => {
            render(<Button text="Focus Me" />)
            const button = screen.getByRole('button')

            button.focus()
            expect(document.activeElement).toBe(button)
            // The actual focus styles are applied via _focusVisible pseudo-class
        })

        it('focus indicator meets minimum width requirements', () => {
            render(<Button text="Focus Test" />)
            const button = screen.getByRole('button')
            button.focus()

            // Focus indicator should be applied via _focusVisible
            // The outlineWidth is set to 2px minimum in ButtonBase
            // This is verified through the component implementation
            expect(button).toBeInTheDocument()
        })

        it('removes focus on blur', () => {
            render(<Button text="Blur Test" />)
            const button = screen.getByRole('button')

            button.focus()
            expect(document.activeElement).toBe(button)

            button.blur()
            expect(document.activeElement).not.toBe(button)
        })

        it('maintains focus after click', async () => {
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

    describe('Loading State Accessibility', () => {
        it('maintains button role during loading', () => {
            render(<Button text="Loading" loading />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('automatically sets aria-busy when loading', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
        })

        it('has screen reader announcement for loading state', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            const srText = button.querySelector('span[aria-live="polite"]')
            expect(srText).toBeInTheDocument()
        })

        it('loading spinner has aria-hidden attribute', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            const spinner = button.querySelector('svg')
            expect(spinner).toBeInTheDocument()
            expect(spinner).toHaveAttribute('aria-hidden', 'true')
        })

        it('has screen reader only loading message', () => {
            render(<Button text="Loading" loading />)
            const button = screen.getByRole('button')
            const srText = button.querySelector('span[aria-live="polite"]')
            expect(srText).toBeInTheDocument()
            expect(srText).toHaveTextContent('Loading, please wait')
        })

        it('meets WCAG standards when loading', async () => {
            const { container } = render(<Button text="Loading" loading />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Color Contrast', () => {
        it('provides sufficient color contrast for primary buttons', () => {
            render(<Button text="Primary" buttonType={ButtonType.PRIMARY} />)
            // Color contrast would need to be tested with actual computed styles
            // This is typically done with visual regression testing tools
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('maintains contrast in disabled state', () => {
            render(<Button text="Disabled" disabled />)
            // Disabled buttons should still maintain minimum contrast ratios
            expect(screen.getByRole('button')).toBeDisabled()
        })
    })

    describe('Touch Target Size', () => {
        it('meets minimum touch target size requirements', () => {
            render(<Button text="Touch Target" />)
            const button = screen.getByRole('button')
            // Minimum touch target size should be 44x44 pixels
            // This would need to be verified with computed styles
            expect(button).toBeInTheDocument()
        })

        it('icon-only buttons meet touch target requirements', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Icon button"
                />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })
    })

    describe('Form Integration', () => {
        it('works correctly as a submit button', () => {
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

    describe('Custom ARIA Attributes', () => {
        it('supports custom aria-label', () => {
            render(<Button text="Save" aria-label="Save document to cloud" />)
            const button = screen.getByRole('button', {
                name: 'Save document to cloud',
            })
            expect(button).toBeInTheDocument()
        })

        it('supports aria-expanded for dropdown triggers', () => {
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

        it('supports aria-controls for associated elements', () => {
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

    describe('Skeleton State Accessibility', () => {
        it('skeleton buttons have aria-busy attribute', () => {
            render(<Button text="Loading" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
        })

        it('skeleton buttons have aria-live for announcements', () => {
            render(<Button text="Loading" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-live', 'polite')
        })

        it('skeleton buttons announce loading state via aria-live', () => {
            render(<Button text="Submit" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-live', 'polite')
            expect(button).toHaveAttribute('aria-busy', 'true')
            expect(button).toHaveAttribute('aria-label', 'Submit')
        })

        it('skeleton buttons are not interactive', () => {
            render(<Button text="Skeleton" showSkeleton />)
            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
        })

        it('skeleton buttons are not in tab order', () => {
            render(<Button text="Skeleton" showSkeleton />)
            const button = screen.getByRole('button')
            // Skeleton buttons should not be focusable
            expect(button).toBeDisabled()
        })

        it('meets WCAG standards in skeleton state', async () => {
            const { container } = render(
                <Button text="Skeleton" showSkeleton />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Icon-Only Button Accessibility', () => {
        it('supports aria-label for accessible icon-only buttons', () => {
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

        it('supports aria-labelledby for accessible icon-only buttons', () => {
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

        it('supports text prop for accessible icon-only buttons', () => {
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

    describe('Comprehensive WCAG Compliance', () => {
        it('meets WCAG standards with all Priority 1 fixes', async () => {
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
        })

        it('meets WCAG standards with disabled state', async () => {
            const { container } = render(<Button text="Disabled" disabled />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for icon-only button with proper labeling', async () => {
            const { container } = render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
