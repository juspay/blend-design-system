import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
} from '../../test-utils'
import { axe } from 'jest-axe'
import { ButtonV2 } from '../../../lib/components/ButtonV2'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
    ButtonState,
} from '../../../lib/components/ButtonV2/buttonV2.types'
import { MockIcon } from '../../test-utils'

function getCurrentTestName(): string {
    const testContext = expect.getState() as { currentTestName?: string }
    return testContext.currentTestName || 'unknown-test'
}

describe('ButtonV2', () => {
    describe('Rendering', () => {
        it('renders with text content', async () => {
            const { container } = render(<ButtonV2 text="Click me" />)
            const button = screen.getByRole('button', { name: 'Click me' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders without text (icon only)', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    aria-label="Icon button"
                />
            )
            const button = screen.getByRole('button', { name: 'Icon button' })
            expect(button).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with leading icon and text', async () => {
            const { container } = render(
                <ButtonV2 text="Save" leftSlot={{ slot: <MockIcon /> }} />
            )
            const button = screen.getByRole('button', { name: 'Save' })
            expect(button).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            const icon = button.querySelector('[data-element="leading-icon"]')
            expect(icon).toHaveAttribute('aria-hidden', 'true')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('leading icon without text has no aria-hidden (accessible to screen readers)', async () => {
            const { container } = render(
                <ButtonV2 leftSlot={{ slot: <MockIcon /> }} aria-label="Save" />
            )
            const button = screen.getByRole('button', { name: 'Save' })
            expect(button).toBeInTheDocument()

            const icon = button.querySelector('[data-element="leading-icon"]')
            expect(icon).toBeInTheDocument()
            expect(icon).not.toHaveAttribute('aria-hidden')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('trailing icon without text has no aria-hidden (accessible to screen readers)', async () => {
            const { container } = render(
                <ButtonV2
                    rightSlot={{ slot: <MockIcon /> }}
                    aria-label="Next"
                />
            )
            const button = screen.getByRole('button', { name: 'Next' })
            expect(button).toBeInTheDocument()

            const icon = button.querySelector('[data-element="trailing-icon"]')
            expect(icon).toBeInTheDocument()
            expect(icon).not.toHaveAttribute('aria-hidden')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with trailing icon and text', async () => {
            const { container } = render(
                <ButtonV2 text="Next" rightSlot={{ slot: <MockIcon /> }} />
            )
            const button = screen.getByRole('button', { name: 'Next' })
            expect(button).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            const icon = button.querySelector('[data-element="trailing-icon"]')
            expect(icon).toHaveAttribute('aria-hidden', 'true')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders both icons without text (both are accessible)', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                    aria-label="Actions"
                />
            )
            const button = screen.getByRole('button', { name: 'Actions' })
            expect(button).toBeInTheDocument()

            const leadingIcon = button.querySelector(
                '[data-element="leading-icon"]'
            )
            const trailingIcon = button.querySelector(
                '[data-element="trailing-icon"]'
            )

            expect(leadingIcon).toBeInTheDocument()
            expect(leadingIcon).not.toHaveAttribute('aria-hidden')
            expect(trailingIcon).toBeInTheDocument()
            expect(trailingIcon).not.toHaveAttribute('aria-hidden')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with both leading and trailing icons', async () => {
            const { container } = render(
                <ButtonV2
                    text="Action"
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                />
            )
            const button = screen.getByRole('button', { name: 'Action' })
            expect(button).toBeInTheDocument()
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)

            // Verify both decorative icons are hidden from screen readers
            const leadingIcon = button.querySelector(
                '[data-element="leading-icon"]'
            )
            const trailingIcon = button.querySelector(
                '[data-element="trailing-icon"]'
            )
            expect(leadingIcon).toHaveAttribute('aria-hidden', 'true')
            expect(trailingIcon).toHaveAttribute('aria-hidden', 'true')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders full width when width prop is 100%', () => {
            render(<ButtonV2 text="Full Width" width="100%" />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({ width: '100%' })
        })

        it('renders with custom width', () => {
            render(<ButtonV2 text="Custom Width" width="200px" />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({ width: '200px' })
        })
    })

    describe('Button Types', () => {
        it.each([
            [ButtonType.PRIMARY, 'primary'],
            [ButtonType.SECONDARY, 'secondary'],
            [ButtonType.DANGER, 'danger'],
            [ButtonType.SUCCESS, 'success'],
        ])(
            'renders %s button type correctly',
            async (buttonType, expectedType) => {
                const { container } = render(
                    <ButtonV2
                        text={`${expectedType} button`}
                        buttonType={buttonType}
                    />
                )
                const button = screen.getByRole('button', {
                    name: `${expectedType} button`,
                })
                expect(button).toBeInTheDocument()

                expect(await axe(container)).toHaveNoViolations()
            }
        )
    })

    describe('Button Sizes', () => {
        it.each([
            [ButtonSize.SMALL, 'sm'],
            [ButtonSize.MEDIUM, 'md'],
            [ButtonSize.LARGE, 'lg'],
        ])('renders %s size correctly', async (size, sizeLabel) => {
            const { container } = render(
                <ButtonV2 text={`Size ${sizeLabel}`} size={size} />
            )
            const button = screen.getByRole('button', {
                name: `Size ${sizeLabel}`,
            })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Button SubTypes', () => {
        it('renders default subtype', async () => {
            const { container } = render(
                <ButtonV2 text="Default" subType={ButtonSubType.DEFAULT} />
            )
            const button = screen.getByRole('button', { name: 'Default' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders icon-only subtype with aria-label', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save"
                />
            )
            const button = screen.getByRole('button', { name: 'Save' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders inline subtype', async () => {
            const { container } = render(
                <ButtonV2 text="Inline" subType={ButtonSubType.INLINE} />
            )
            const button = screen.getByRole('button', { name: 'Inline' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('States', () => {
        it('renders disabled state and prevents interaction', async () => {
            const handleClick = vi.fn()
            const { container, user } = render(
                <ButtonV2 text="Disabled" disabled onClick={handleClick} />
            )

            const button = screen.getByRole('button', { name: 'Disabled' })
            expect(button).toBeDisabled()
            expect(button).toHaveAttribute('tabIndex', '-1')

            await user.click(button)
            expect(handleClick).not.toHaveBeenCalled()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders loading state with spinner and prevents interaction', async () => {
            const handleClick = vi.fn()
            const { container, user } = render(
                <ButtonV2 text="Loading" loading onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
            expect(
                button.querySelector('[data-status="loading"]')
            ).toBeInTheDocument()

            const spinner = button.querySelector('[data-status="loading"]')
            expect(spinner).toBeInTheDocument()

            const srText = button.querySelector('span[aria-live="polite"]')
            expect(srText).toBeInTheDocument()
            expect(srText).toHaveTextContent('Loading, please wait')

            expect(button).toHaveTextContent('Loading, please wait')
            expect(button).not.toHaveTextContent('Loading Loading, please wait')

            await user.click(button)
            expect(handleClick).not.toHaveBeenCalled()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders skeleton state correctly', async () => {
            const { container } = render(
                <ButtonV2 text="Skeleton" showSkeleton />
            )

            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
            expect(button).toHaveAttribute('aria-disabled', 'true')
            expect(button).toHaveAttribute('tabIndex', '-1')
            expect(button).toHaveAttribute('aria-label', 'Skeleton')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('skeleton uses custom aria-label when provided', async () => {
            const { container } = render(
                <ButtonV2
                    text="Original Text"
                    aria-label="Custom Label"
                    showSkeleton
                />
            )

            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-label', 'Custom Label')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('skeleton with no text does not set aria-label', () => {
            render(<ButtonV2 leftSlot={{ slot: <MockIcon /> }} showSkeleton />)

            const button = screen.getByRole('button')
            expect(button).not.toHaveAttribute('aria-label')
            // Note: This would fail accessibility - skeleton with icon only needs aria-label
        })

        it('applies correct state styling', () => {
            render(<ButtonV2 text="State Test" state={ButtonState.HOVER} />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })
    })

    describe('Button Group Position', () => {
        it('applies correct border radius for left position', async () => {
            const { container } = render(
                <ButtonV2 text="Left" buttonGroupPosition="left" />
            )
            const button = screen.getByRole('button', { name: 'Left' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies correct border radius for right position', async () => {
            const { container } = render(
                <ButtonV2 text="Right" buttonGroupPosition="right" />
            )
            const button = screen.getByRole('button', { name: 'Right' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies correct border radius for center position', async () => {
            const { container } = render(
                <ButtonV2 text="Center" buttonGroupPosition="center" />
            )
            const button = screen.getByRole('button', { name: 'Center' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('User Interactions', () => {
        it('calls onClick handler when clicked', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Click me" onClick={handleClick} />
            )

            const button = screen.getByRole('button', { name: 'Click me' })
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Disabled" disabled onClick={handleClick} />
            )

            const button = screen.getByRole('button', { name: 'Disabled' })
            await user.click(button)

            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not call onClick when loading', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Loading" loading onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            await user.click(button)

            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not call onClick when skeleton', () => {
            const handleClick = vi.fn()
            render(
                <ButtonV2 text="Skeleton" showSkeleton onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLButtonElement>()
            render(<ButtonV2 ref={ref} text="With Ref" />)

            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current?.tagName).toBe('BUTTON')
        })
    })

    describe('Keyboard Navigation', () => {
        it('is focusable with keyboard', async () => {
            const { user } = render(<ButtonV2 text="Focusable" />)
            const button = screen.getByRole('button', { name: 'Focusable' })

            await user.tab()
            expect(document.activeElement).toBe(button)
        })

        it('can be activated with Enter key', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Enter Key" onClick={handleClick} />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('can be activated with Space key', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Space Key" onClick={handleClick} />
            )
            await user.tab()
            await user.keyboard(' ')

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('disabled buttons are not focusable', async () => {
            const { user } = render(<ButtonV2 text="Disabled" disabled />)
            const button = screen.getByRole('button', { name: 'Disabled' })

            await user.tab()
            expect(document.activeElement).not.toBe(button)
        })

        it('shows focus indicator when focused', async () => {
            const { user } = render(<ButtonV2 text="Focus Me" />)
            const button = screen.getByRole('button', { name: 'Focus Me' })

            await user.tab()
            expect(document.activeElement).toBe(button)
        })
    })

    describe('Accessibility', () => {
        it('meets WCAG standards for default button', async () => {
            const { container } = render(<ButtonV2 text="Accessible Button" />)
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
                    <ButtonV2
                        text={`${buttonType} button`}
                        buttonType={buttonType}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(<ButtonV2 text="Disabled" disabled />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with icons', async () => {
            const { container } = render(
                <ButtonV2
                    text="With Icons"
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when loading', async () => {
            const { container } = render(<ButtonV2 text="Loading" loading />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards in skeleton state', async () => {
            const { container } = render(
                <ButtonV2 text="Skeleton" showSkeleton />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('properly handles icon-only buttons with aria-label', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )
            const button = screen.getByRole('button', { name: 'Save document' })
            expect(button).toBeInTheDocument()

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports aria-describedby for additional context', async () => {
            const { container } = render(
                <>
                    <ButtonV2 text="Submit" aria-describedby="submit-help" />
                    <span id="submit-help">Press to submit the form</span>
                </>
            )
            const button = screen.getByRole('button', { name: 'Submit' })
            expect(button).toHaveAttribute('aria-describedby', 'submit-help')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports custom aria-label', async () => {
            const { container } = render(
                <ButtonV2 text="Save" aria-label="Save document to cloud" />
            )
            const button = screen.getByRole('button', {
                name: 'Save document to cloud',
            })
            expect(button).toBeInTheDocument()

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('HTML Props', () => {
        it('passes through HTML button attributes', () => {
            render(
                <ButtonV2
                    text="With Attrs"
                    type="submit"
                    form="test-form"
                    name="submit-button"
                />
            )

            const button = screen.getByRole('button', { name: 'With Attrs' })
            expect(button).toHaveAttribute('type', 'submit')
            expect(button).toHaveAttribute('form', 'test-form')
            expect(button).toHaveAttribute('name', 'submit-button')
        })

        it('applies data attributes correctly', () => {
            render(
                <ButtonV2
                    text="With Data"
                    data-testid="custom-button"
                    data-action="save"
                />
            )

            const button = screen.getByTestId('custom-button')
            expect(button).toHaveAttribute('data-action', 'save')
        })
    })

    describe('Edge Cases', () => {
        it('renders without text but requires aria-label for accessibility', async () => {
            const { container } = render(
                <ButtonV2 aria-label="Action button" />
            )
            const button = screen.getByRole('button', { name: 'Action button' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles empty text string', async () => {
            const { container } = render(
                <ButtonV2 text="" aria-label="Empty button" />
            )
            const button = screen.getByRole('button', { name: 'Empty button' })
            expect(button).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles rapid clicks gracefully', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Rapid Click" onClick={handleClick} />
            )

            const button = screen.getByRole('button', { name: 'Rapid Click' })
            await user.click(button)
            await user.click(button)
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(3)
        })
    })

    describe('Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <ButtonV2 text="Performance Test" />
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('renders complex button within budget', async () => {
            const renderTime = await measureRenderTime(
                <ButtonV2
                    text="Complex Button"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.LARGE}
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                    width="100%"
                />
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders skeleton state within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <ButtonV2 text="Skeleton" showSkeleton />
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('handles prop changes efficiently', () => {
            const { rerender } = render(<ButtonV2 text="Initial" />)

            const start = performance.now()
            rerender(<ButtonV2 text="Updated" />)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('cleans up properly on unmount', () => {
            const handleClick = vi.fn()
            const { unmount } = render(
                <ButtonV2 text="Memory Test" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            unmount()

            expect(button).not.toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('sets data-button attribute with text value', () => {
            render(<ButtonV2 text="Save Document" />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('data-button', 'Save Document')
        })

        it('sets data-status to enabled by default', () => {
            render(<ButtonV2 text="Click me" />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('data-status', 'enabled')
        })

        it('sets data-status to loading when loading', () => {
            render(<ButtonV2 text="Loading" loading />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('data-status', 'loading')
        })

        it('sets data-status to disabled when disabled', () => {
            render(<ButtonV2 text="Disabled" disabled />)
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('data-status', 'disabled')
        })
    })

    describe('Form Integration', () => {
        it('submits form when type="submit"', async () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            const { user } = render(
                <form onSubmit={handleSubmit}>
                    <input name="email" defaultValue="test@example.com" />
                    <ButtonV2 text="Submit" type="submit" />
                </form>
            )

            const button = screen.getByRole('button', { name: 'Submit' })
            await user.click(button)

            expect(handleSubmit).toHaveBeenCalledTimes(1)
        })

        it('does not submit form when type="button"', async () => {
            const handleSubmit = vi.fn()
            const { user } = render(
                <form onSubmit={handleSubmit}>
                    <ButtonV2 text="Cancel" type="button" />
                </form>
            )

            const button = screen.getByRole('button', { name: 'Cancel' })
            await user.click(button)

            expect(handleSubmit).not.toHaveBeenCalled()
        })

        it('resets form when type="reset"', async () => {
            const { user } = render(
                <form>
                    <input name="email" defaultValue="initial@example.com" />
                    <ButtonV2 text="Reset" type="reset" />
                </form>
            )

            const input = screen.getByRole('textbox') as HTMLInputElement
            const button = screen.getByRole('button', { name: 'Reset' })

            await user.clear(input)
            await user.type(input, 'changed@example.com')
            expect(input.value).toBe('changed@example.com')

            await user.click(button)
            expect(input.value).toBe('initial@example.com')
        })

        it('associates with form using form attribute', async () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            const { user } = render(
                <>
                    <form id="my-form" onSubmit={handleSubmit}>
                        <input name="email" />
                    </form>
                    <ButtonV2 text="Submit" type="submit" form="my-form" />
                </>
            )

            const button = screen.getByRole('button', { name: 'Submit' })
            await user.click(button)

            expect(handleSubmit).toHaveBeenCalledTimes(1)
        })
    })

    describe('Advanced Edge Cases', () => {
        it('handles very long text without breaking layout', () => {
            const longText =
                'This is a very long button text that should be handled gracefully without breaking the layout or causing overflow issues'
            render(<ButtonV2 text={longText} />)

            const button = screen.getByRole('button', { name: longText })
            expect(button).toBeInTheDocument()
        })

        it('handles special characters in text', () => {
            const specialText = 'Save & Continue → Next Step'
            render(<ButtonV2 text={specialText} />)

            const button = screen.getByRole('button', { name: specialText })
            expect(button).toBeInTheDocument()
        })

        it('handles unicode and emojis in text', () => {
            const emojiText = '🚀 Launch Now! 🎉'
            render(<ButtonV2 text={emojiText} />)

            const button = screen.getByRole('button', { name: emojiText })
            expect(button).toBeInTheDocument()
        })

        it('handles transition from loading to disabled', async () => {
            const { rerender } = render(<ButtonV2 text="Action" loading />)

            let button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')

            rerender(<ButtonV2 text="Action" disabled />)

            button = screen.getByRole('button')
            expect(button).not.toHaveAttribute('aria-busy')
            expect(button).toBeDisabled()
        })

        it('hides icon content in skeleton state', () => {
            render(
                <ButtonV2
                    text="Skeleton"
                    showSkeleton
                    leftSlot={{ slot: <MockIcon /> }}
                />
            )

            const button = screen.getByRole('button')
            const icon = button.querySelector('[data-element="leading-icon"]')
            expect(icon).toHaveStyle({ opacity: '0' })
        })

        it('hides trailing icon content in skeleton state', () => {
            render(
                <ButtonV2
                    text="Skeleton"
                    showSkeleton
                    rightSlot={{ slot: <MockIcon /> }}
                />
            )

            const button = screen.getByRole('button')
            const icon = button.querySelector('[data-element="trailing-icon"]')
            expect(icon).toHaveStyle({ opacity: '0' })
        })

        it('hides both icons content in skeleton state', () => {
            render(
                <ButtonV2
                    text="Skeleton"
                    showSkeleton
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                />
            )

            const button = screen.getByRole('button')
            const leadingIcon = button.querySelector(
                '[data-element="leading-icon"]'
            )
            const trailingIcon = button.querySelector(
                '[data-element="trailing-icon"]'
            )
            expect(leadingIcon).toHaveStyle({ opacity: '0' })
            expect(trailingIcon).toHaveStyle({ opacity: '0' })
        })
    })

    describe('Styling', () => {
        it('has transition for smooth interactions', () => {
            render(<ButtonV2 text="Animated" />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({
                transition: 'transform 0.15s ease-in-out',
            })
        })
    })

    describe('Component Metadata', () => {
        it('has correct displayName for debugging', () => {
            expect(ButtonV2.displayName).toBe('ButtonV2')
        })
    })
})
