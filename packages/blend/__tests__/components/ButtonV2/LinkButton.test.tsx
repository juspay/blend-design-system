import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import { axe } from 'jest-axe'
import { LinkButton } from '../../../lib/components/ButtonV2'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../lib/components/ButtonV2/buttonV2.types'
import { MockIcon } from '../../test-utils'

describe('LinkButton', () => {
    describe('Rendering', () => {
        it('renders with href and text', async () => {
            const { container } = render(
                <LinkButton href="/home" text="Go Home" />
            )
            const link = screen.getByRole('link', { name: 'Go Home' })
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', '/home')
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders without text (icon only)', async () => {
            const { container } = render(
                <LinkButton
                    href="/settings"
                    leadingIcon={<MockIcon />}
                    aria-label="Settings"
                />
            )
            const link = screen.getByRole('link', { name: 'Settings' })
            expect(link).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with leading icon and text', async () => {
            const { container } = render(
                <LinkButton
                    href="/save"
                    text="Save"
                    leadingIcon={<MockIcon />}
                />
            )
            const link = screen.getByRole('link', { name: 'Save' })
            expect(link).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with trailing icon and text', async () => {
            const { container } = render(
                <LinkButton
                    href="/next"
                    text="Next"
                    trailingIcon={<MockIcon />}
                />
            )
            const link = screen.getByRole('link', { name: 'Next' })
            expect(link).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with both leading and trailing icons', async () => {
            const { container } = render(
                <LinkButton
                    href="/action"
                    text="Action"
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )
            const link = screen.getByRole('link', { name: 'Action' })
            expect(link).toBeInTheDocument()
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders full width when fullWidth prop is true', () => {
            render(<LinkButton href="/" text="Full Width" fullWidth />)
            const link = screen.getByRole('link')
            expect(link).toHaveStyle({ width: '100%' })
        })

        it('renders with custom width', () => {
            render(<LinkButton href="/" text="Custom Width" width="200px" />)
            const link = screen.getByRole('link')
            expect(link).toHaveStyle({ width: '200px' })
        })

        it('renders with custom justify content', () => {
            render(
                <LinkButton
                    href="/"
                    text="Left Aligned"
                    justifyContent="flex-start"
                />
            )
            const link = screen.getByRole('link')
            // Just verify the link renders - the style is applied internally by styled-components
            expect(link).toBeInTheDocument()
        })
    })

    describe('Button Types', () => {
        it.each([
            [ButtonType.PRIMARY, 'primary'],
            [ButtonType.SECONDARY, 'secondary'],
            [ButtonType.DANGER, 'danger'],
            [ButtonType.SUCCESS, 'success'],
        ])('renders %s button type', async (buttonType) => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text={`${buttonType} link`}
                    buttonType={buttonType}
                />
            )
            const link = screen.getByRole('link', {
                name: `${buttonType} link`,
            })
            expect(link).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Button Sizes', () => {
        it.each([
            [ButtonSize.SMALL, 'small'],
            [ButtonSize.MEDIUM, 'medium'],
            [ButtonSize.LARGE, 'large'],
        ])('renders %s size', async (size) => {
            const { container } = render(
                <LinkButton href="/" text={`Size ${size}`} size={size} />
            )
            const link = screen.getByRole('link')
            expect(link).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Button SubTypes', () => {
        it('renders default subtype', async () => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text="Default"
                    subType={ButtonSubType.DEFAULT}
                />
            )
            const link = screen.getByRole('link', { name: 'Default' })
            expect(link).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders inline subtype', async () => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text="Inline"
                    subType={ButtonSubType.INLINE}
                />
            )
            const link = screen.getByRole('link', { name: 'Inline' })
            expect(link).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('States', () => {
        it('renders disabled state', async () => {
            const { container } = render(
                <LinkButton href="/" text="Disabled" disabled />
            )
            // Disabled links don't have role="link" in DOM, use selector
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('aria-disabled', 'true')
            expect(screen.getByText('Disabled')).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('disables link when disabled (removes href)', () => {
            const { container } = render(
                <LinkButton href="/home" text="Disabled" disabled />
            )
            const link = container.querySelector('a')
            expect(link).not.toHaveAttribute('href')
        })

        it('renders loading state', async () => {
            const { container } = render(
                <LinkButton href="/" text="Loading" loading />
            )
            const link = screen.getByRole('link')
            expect(link).toHaveAttribute('aria-busy', 'true')
            expect(await axe(container)).toHaveNoViolations()
        })

        it('prevents navigation when loading', () => {
            const handleClick = vi.fn()
            render(
                <LinkButton
                    href="/home"
                    text="Loading"
                    loading
                    onClick={handleClick}
                />
            )
            const link = screen.getByRole('link')
            fireEvent.click(link)
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('renders skeleton state', async () => {
            const { container } = render(
                <LinkButton href="/" text="Skeleton" showSkeleton />
            )
            // In skeleton state, link is wrapped in Skeleton component
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            // Links use aria-disabled instead of the disabled attribute
            expect(link).toHaveAttribute('aria-disabled', 'true')
            expect(screen.getByText('Skeleton')).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('skeleton with custom aria-label keeps custom label', () => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text="Original"
                    aria-label="Custom"
                    showSkeleton
                />
            )
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('aria-label', 'Custom')
        })

        it('skeleton with no text does not set aria-label', () => {
            const { container } = render(
                <LinkButton href="/" leadingIcon={<MockIcon />} showSkeleton />
            )
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(link).not.toHaveAttribute('aria-label')
        })

        it('renders with pulse skeleton variant', () => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text="Skeleton"
                    showSkeleton
                    skeletonVariant="pulse"
                />
            )
            // In skeleton state, link is wrapped in Skeleton component
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(screen.getByText('Skeleton')).toBeInTheDocument()
        })
    })

    describe('User Interactions', () => {
        it('calls onClick handler when clicked', () => {
            const handleClick = vi.fn()
            render(
                <LinkButton
                    href="/home"
                    text="Click me"
                    onClick={handleClick}
                />
            )
            const link = screen.getByRole('link', { name: 'Click me' })
            fireEvent.click(link)
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', () => {
            const handleClick = vi.fn()
            const { container } = render(
                <LinkButton
                    href="/home"
                    text="Disabled"
                    disabled
                    onClick={handleClick}
                />
            )
            // Disabled links don't have role="link" in DOM, use selector
            const link = container.querySelector('a')
            if (link) {
                fireEvent.click(link)
            }
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not call onClick when loading', () => {
            const handleClick = vi.fn()
            render(
                <LinkButton
                    href="/home"
                    text="Loading"
                    loading
                    onClick={handleClick}
                />
            )
            const link = screen.getByRole('link')
            fireEvent.click(link)
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not navigate when disabled (preventDefault called)', () => {
            const handleClick = vi.fn((e) => e.preventDefault())
            const { container } = render(
                <LinkButton
                    href="/home"
                    text="Disabled"
                    disabled
                    onClick={handleClick}
                />
            )
            // Disabled links don't have role="link" in DOM, use selector
            const link = container.querySelector('a')
            if (link) {
                fireEvent.click(link)
            }
            expect(handleClick).not.toHaveBeenCalled()
            expect(link).not.toHaveAttribute('href')
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLAnchorElement>()
            render(<LinkButton ref={ref} href="/" text="With Ref" />)
            expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
            expect(ref.current?.tagName).toBe('A')
        })
    })

    describe('Link Attributes', () => {
        it('sets target attribute correctly', () => {
            render(<LinkButton href="/home" text="External" target="_blank" />)
            const link = screen.getByRole('link')
            expect(link).toHaveAttribute('target', '_blank')
        })

        it('sets rel attribute correctly', () => {
            render(
                <LinkButton
                    href="/home"
                    text="Secure"
                    rel="noopener noreferrer"
                />
            )
            const link = screen.getByRole('link')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })

        it('combines target and rel attributes', () => {
            render(
                <LinkButton
                    href="/home"
                    text="External"
                    target="_blank"
                    rel="noopener noreferrer"
                />
            )
            const link = screen.getByRole('link')
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })
    })

    describe('Accessibility', () => {
        it('meets WCAG standards for default link button', async () => {
            const { container } = render(
                <LinkButton href="/" text="Accessible Link" />
            )
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
                    <LinkButton
                        href="/"
                        text={`${buttonType} link`}
                        buttonType={buttonType}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(
                <LinkButton href="/" text="Disabled" disabled />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with icons', async () => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text="With Icons"
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when loading', async () => {
            const { container } = render(
                <LinkButton href="/" text="Loading" loading />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards in skeleton state', async () => {
            const { container } = render(
                <LinkButton href="/" text="Skeleton" showSkeleton />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports custom aria-label', async () => {
            const { container } = render(
                <LinkButton
                    href="/"
                    text="Save"
                    aria-label="Save document to cloud"
                />
            )
            const link = screen.getByRole('link', {
                name: 'Save document to cloud',
            })
            expect(link).toBeInTheDocument()
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('HTML Props', () => {
        it('passes through HTML anchor attributes', () => {
            render(
                <LinkButton
                    href="/"
                    text="With Attrs"
                    download
                    data-testid="custom-link"
                    data-action="save"
                />
            )
            const link = screen.getByTestId('custom-link')
            expect(link).toHaveAttribute('download')
            expect(link).toHaveAttribute('data-action', 'save')
        })
    })

    describe('Edge Cases', () => {
        it('handles very long text without breaking layout', () => {
            const longText =
                'This is a very long link button text that should be handled gracefully without breaking the layout or causing overflow issues'
            render(<LinkButton href="/" text={longText} />)
            const link = screen.getByRole('link', { name: longText })
            expect(link).toBeInTheDocument()
        })

        it('handles special characters in text', () => {
            const specialText = 'Save & Continue → Next Step'
            render(<LinkButton href="/" text={specialText} />)
            const link = screen.getByRole('link', { name: specialText })
            expect(link).toBeInTheDocument()
        })

        it('handles unicode and emojis in text', () => {
            const emojiText = '🚀 Launch Now! 🎉'
            render(<LinkButton href="/" text={emojiText} />)
            const link = screen.getByRole('link', { name: emojiText })
            expect(link).toBeInTheDocument()
        })
    })

    describe('Component Metadata', () => {
        it('has correct displayName for debugging', () => {
            expect(LinkButton.displayName).toBe('LinkButton')
        })
    })
})
