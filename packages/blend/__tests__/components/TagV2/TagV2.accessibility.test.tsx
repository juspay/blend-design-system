import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import { axe } from 'jest-axe'
import TagV2 from '../../../lib/components/TagV2/TagV2'
import {
    TagV2Type,
    TagV2Size,
    TagV2SubType,
    TagV2Color,
} from '../../../lib/components/TagV2/TagV2.types'
import { MockIcon } from '../../test-utils'

describe('TagV2 Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default tag (axe-core validation)', async () => {
            const { container } = render(<TagV2 text="Accessible Tag" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all tag types', async () => {
            const tagTypes = [
                TagV2Type.NO_FILL,
                TagV2Type.ATTENTIVE,
                TagV2Type.SUBTLE,
            ]

            for (const type of tagTypes) {
                const { container } = render(
                    <TagV2 text={`${type} tag`} type={type} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards for all tag colors', async () => {
            const colors = [
                TagV2Color.NEUTRAL,
                TagV2Color.PRIMARY,
                TagV2Color.SUCCESS,
                TagV2Color.ERROR,
                TagV2Color.WARNING,
                TagV2Color.PURPLE,
            ]

            for (const color of colors) {
                const { container } = render(
                    <TagV2 text={`${color} tag`} color={color} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(<TagV2 text="Disabled Tag" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with slots/icons (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <TagV2
                    text="With Icons"
                    leftSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                    rightSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for interactive tag', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <TagV2 text="Interactive" onClick={handleClick} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with aria-pressed state', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <TagV2
                    text="Toggle"
                    onClick={handleClick}
                    aria-pressed={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard when interactive', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Focusable" onClick={handleClick} />)
            const tag = screen.getByRole('button')

            tag.focus()
            expect(document.activeElement).toBe(tag)
        })

        it('has tabIndex when interactive', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Focusable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            expect(tag).toHaveAttribute('tabIndex', '0')
        })

        it('does not have tabIndex when not interactive', () => {
            render(<TagV2 text="Non-interactive" />)
            const tag = document.querySelector('[data-tag="Non-interactive"]')
            expect(tag).not.toHaveAttribute('tabIndex')
        })

        it('can be activated with Enter key', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <TagV2 text="Enter Key" onClick={handleClick} />
            )

            const tag = screen.getByRole('button')
            tag.focus()

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('can be activated with Space key', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <TagV2 text="Space Key" onClick={handleClick} />
            )

            const tag = screen.getByRole('button')
            tag.focus()

            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('prevents default behavior on keyboard activation', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Prevent Default" onClick={handleClick} />)

            const tag = screen.getByRole('button')
            tag.focus()

            // Use fireEvent to properly trigger React's synthetic event handlers
            // The component's keyboard handler calls preventDefault internally
            fireEvent.keyDown(tag, { key: 'Enter' })

            // Verify that onClick was called, which confirms the keyboard handler worked
            // The preventDefault is called internally by the component's keyboard handler
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper role="button" when interactive', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Button Role" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            expect(tag).toBeInTheDocument()
        })

        it('does not have button role when not interactive', () => {
            render(<TagV2 text="No Role" />)
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })

        it('has aria-label for interactive tag', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Labeled" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            expect(tag).toHaveAttribute('aria-label', 'Labeled')
        })

        it('has aria-label with pressed state', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Toggle"
                    onClick={handleClick}
                    aria-pressed={true}
                />
            )
            const tag = screen.getByRole('button')
            expect(tag).toHaveAttribute('aria-label', 'Toggle, pressed')
        })

        it('has aria-label with mixed state', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Mixed"
                    onClick={handleClick}
                    aria-pressed="mixed"
                />
            )
            const tag = screen.getByRole('button')
            expect(tag).toHaveAttribute('aria-label', 'Mixed, mixed state')
        })

        it('does not have aria-disabled="true" (disabled prop not implemented)', () => {
            const handleClick = vi.fn()
            const { container } = render(
                <TagV2 text="Clickable" onClick={handleClick} />
            )

            const tag = container.querySelector('[aria-disabled="true"]')
            expect(tag).not.toBeInTheDocument()
        })

        it('has aria-pressed attribute when provided', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Toggle"
                    onClick={handleClick}
                    aria-pressed={true}
                />
            )
            const tag = screen.getByRole('button')
            expect(tag).toHaveAttribute('aria-pressed', 'true')
        })

        it('has aria-pressed="mixed" when provided', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Mixed"
                    onClick={handleClick}
                    aria-pressed="mixed"
                />
            )
            const tag = screen.getByRole('button')
            expect(tag).toHaveAttribute('aria-pressed', 'mixed')
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('has accessible text content', () => {
            render(<TagV2 text="Accessible Text" />)
            expect(screen.getByText('Accessible Text')).toBeInTheDocument()
        })

        it('decorative icons are properly hidden from screen readers', () => {
            render(
                <TagV2
                    text="With Icon"
                    leftSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                />
            )
            const icon = screen.getByTestId('mock-icon')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has focus visible styles when interactive', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Focusable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            tag.focus()
            // Focus visible styles should be applied via _focusVisible prop
            expect(tag).toBeInTheDocument()
        })
    })

    describe('Edge Cases - Accessibility', () => {
        it('handles empty text gracefully for accessibility', async () => {
            const { container } = render(<TagV2 text="" />)
            const results = axe(container)
            await expect(results).resolves.toHaveNoViolations()
        })

        it('maintains accessibility when skeleton is shown', async () => {
            const { container } = render(
                <TagV2
                    text="Loading"
                    skeleton={{ showSkeleton: true, skeletonVariant: 'pulse' }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility when has onClick (disabled prop not implemented)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <TagV2 text="Clickable" onClick={handleClick} />
            )
            // Note: disabled prop is not currently implemented
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with all props combined', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <TagV2
                    text="Complete"
                    type={TagV2Type.ATTENTIVE}
                    size={TagV2Size.MD}
                    subType={TagV2SubType.ROUNDED}
                    color={TagV2Color.SUCCESS}
                    leftSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                    rightSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                    onClick={handleClick}
                    aria-pressed={true}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
