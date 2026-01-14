import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import { axe } from 'jest-axe'
import { IconButton } from '../../../lib/components/ButtonV2'
import {
    ButtonType,
    ButtonSize,
} from '../../../lib/components/ButtonV2/buttonV2.types'
import { MockIcon } from '../../test-utils'

describe('IconButton', () => {
    describe('Rendering', () => {
        it('renders with required aria-label', async () => {
            const { container } = render(
                <IconButton icon={<MockIcon />} aria-label="Settings" />
            )
            const button = screen.getByRole('button', { name: 'Settings' })
            expect(button).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with primary button type by default', async () => {
            const { container } = render(
                <IconButton icon={<MockIcon />} aria-label="Default" />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with small size by default', async () => {
            const { container } = render(
                <IconButton icon={<MockIcon />} aria-label="Default" />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
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
                <IconButton
                    icon={<MockIcon />}
                    buttonType={buttonType}
                    aria-label={`${buttonType} icon`}
                />
            )
            const button = screen.getByRole('button', {
                name: `${buttonType} icon`,
            })
            expect(button).toBeInTheDocument()
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
                <IconButton
                    icon={<MockIcon />}
                    size={size}
                    aria-label={`${size} icon`}
                />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('States', () => {
        it('renders disabled state', async () => {
            const { container } = render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="Disabled"
                    disabled
                />
            )
            const button = screen.getByRole('button', { name: 'Disabled' })
            expect(button).toBeDisabled()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders loading state', async () => {
            const { container } = render(
                <IconButton icon={<MockIcon />} aria-label="Loading" loading />
            )
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-busy', 'true')
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders skeleton state', async () => {
            const { container } = render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="Skeleton"
                    showSkeleton
                />
            )
            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Interactions', () => {
        it('calls onClick when clicked', () => {
            const handleClick = vi.fn()
            render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="Click"
                    onClick={handleClick}
                />
            )
            const button = screen.getByRole('button')
            fireEvent.click(button)
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', () => {
            const handleClick = vi.fn()
            render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="Disabled"
                    disabled
                    onClick={handleClick}
                />
            )
            const button = screen.getByRole('button')
            fireEvent.click(button)
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not call onClick when loading', () => {
            const handleClick = vi.fn()
            render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="Loading"
                    loading
                    onClick={handleClick}
                />
            )
            const button = screen.getByRole('button')
            fireEvent.click(button)
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLButtonElement>()
            render(
                <IconButton
                    ref={ref}
                    icon={<MockIcon />}
                    aria-label="With Ref"
                />
            )
            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current?.tagName).toBe('BUTTON')
        })
    })

    describe('HTML Props', () => {
        it('passes through HTML button attributes', () => {
            render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="With Attrs"
                    type="submit"
                    form="test-form"
                    name="icon-button"
                />
            )
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('type', 'submit')
            expect(button).toHaveAttribute('form', 'test-form')
            expect(button).toHaveAttribute('name', 'icon-button')
        })
    })

    describe('Accessibility', () => {
        it('requires aria-label', async () => {
            const { container } = render(
                <IconButton icon={<MockIcon />} aria-label="Icon Button" />
            )
            const button = screen.getByRole('button', { name: 'Icon Button' })
            expect(button).toBeInTheDocument()
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports custom aria-label', async () => {
            const { container } = render(
                <IconButton
                    icon={<MockIcon />}
                    aria-label="Custom accessible name"
                />
            )
            const button = screen.getByRole('button', {
                name: 'Custom accessible name',
            })
            expect(button).toBeInTheDocument()
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Component Metadata', () => {
        it('has correct displayName for debugging', () => {
            expect(IconButton.displayName).toBe('IconButton')
        })
    })
})
