import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import TagV2 from '../../../lib/components/TagV2/TagV2'
import {
    TagV2Type,
    TagV2Size,
    TagV2SubType,
    TagV2Color,
} from '../../../lib/components/TagV2/TagV2.types'
import { MockIcon } from '../../test-utils'

describe('TagV2 Component', () => {
    describe('Rendering', () => {
        it('renders with text content', () => {
            render(<TagV2 text="Tag Label" />)
            expect(screen.getByText('Tag Label')).toBeInTheDocument()
            expect(screen.getByText('Tag Label')).toHaveAttribute(
                'data-id',
                'Tag Label'
            )
        })

        it('renders with default props when only text is provided', () => {
            render(<TagV2 text="Default Tag" />)
            const tag = screen.getByText('Default Tag')
            expect(tag).toBeInTheDocument()
            expect(
                document.querySelector('[data-tag="Default Tag"]')
            ).toBeInTheDocument()
        })

        it('renders with left slot', () => {
            render(
                <TagV2
                    text="Tag"
                    leftSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                />
            )
            expect(screen.getByText('Tag')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).toBeInTheDocument()
        })

        it('renders with right slot', () => {
            render(
                <TagV2
                    text="Tag"
                    rightSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                />
            )
            expect(screen.getByText('Tag')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeInTheDocument()
        })

        it('renders with both left and right slots', () => {
            render(
                <TagV2
                    text="Tag"
                    leftSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                    rightSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                />
            )
            expect(screen.getByText('Tag')).toBeInTheDocument()
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeInTheDocument()
        })

        it('renders without slots when not provided', () => {
            render(<TagV2 text="Tag Only" />)
            expect(screen.getByText('Tag Only')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).not.toBeInTheDocument()
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).not.toBeInTheDocument()
        })
    })

    describe('Type Variations', () => {
        it.each([
            [TagV2Type.NO_FILL, 'noFill'],
            [TagV2Type.ATTENTIVE, 'attentive'],
            [TagV2Type.SUBTLE, 'subtle'],
        ])('renders %s type correctly', (type, typeLabel) => {
            render(<TagV2 text={`${typeLabel} tag`} type={type} />)
            expect(screen.getByText(`${typeLabel} tag`)).toBeInTheDocument()
        })
    })

    describe('Size Variations', () => {
        it.each([
            [TagV2Size.XS, 'xs'],
            [TagV2Size.SM, 'sm'],
            [TagV2Size.MD, 'md'],
            [TagV2Size.LG, 'lg'],
        ])('renders %s size correctly', (size, sizeLabel) => {
            render(<TagV2 text={`Size ${sizeLabel}`} size={size} />)
            expect(screen.getByText(`Size ${sizeLabel}`)).toBeInTheDocument()
        })
    })

    describe('SubType Variations', () => {
        it.each([
            [TagV2SubType.ROUNDED, 'rounded'],
            [TagV2SubType.SQUARICAL, 'squarical'],
        ])('renders %s subtype correctly', (subType, subTypeLabel) => {
            render(<TagV2 text={`${subTypeLabel} tag`} subType={subType} />)
            expect(screen.getByText(`${subTypeLabel} tag`)).toBeInTheDocument()
        })
    })

    describe('Color Variations', () => {
        it.each([
            [TagV2Color.NEUTRAL, 'neutral'],
            [TagV2Color.PRIMARY, 'primary'],
            [TagV2Color.SUCCESS, 'success'],
            [TagV2Color.ERROR, 'error'],
            [TagV2Color.WARNING, 'warning'],
            [TagV2Color.PURPLE, 'purple'],
        ])('renders %s color correctly', (color, colorLabel) => {
            render(<TagV2 text={`${colorLabel} tag`} color={color} />)
            expect(screen.getByText(`${colorLabel} tag`)).toBeInTheDocument()
        })
    })

    describe('Skeleton State', () => {
        it('renders skeleton when showSkeleton is true', () => {
            render(
                <TagV2
                    text="Loading"
                    skeleton={{ showSkeleton: true, skeletonVariant: 'pulse' }}
                />
            )
            // Text should have aria-hidden when skeleton is shown
            const textElement = screen.getByText('Loading')
            expect(textElement).toHaveAttribute('aria-hidden', 'true')
            // Regular tag should not have button role when skeleton is shown
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })

        it('renders skeleton with pulse variant', () => {
            render(
                <TagV2
                    text="Loading"
                    skeleton={{ showSkeleton: true, skeletonVariant: 'pulse' }}
                />
            )
            const textElement = screen.getByText('Loading')
            expect(textElement).toHaveAttribute('aria-hidden', 'true')
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })

        it('renders skeleton with wave variant', () => {
            render(
                <TagV2
                    text="Loading"
                    skeleton={{ showSkeleton: true, skeletonVariant: 'wave' }}
                />
            )
            const textElement = screen.getByText('Loading')
            expect(textElement).toHaveAttribute('aria-hidden', 'true')
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })

        it('renders skeleton with shimmer variant', () => {
            render(
                <TagV2
                    text="Loading"
                    skeleton={{
                        showSkeleton: true,
                        skeletonVariant: 'shimmer',
                    }}
                />
            )
            const textElement = screen.getByText('Loading')
            expect(textElement).toHaveAttribute('aria-hidden', 'true')
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })

        it('renders normal tag when showSkeleton is false', () => {
            render(
                <TagV2
                    text="Normal Tag"
                    skeleton={{ showSkeleton: false, skeletonVariant: 'pulse' }}
                />
            )
            expect(screen.getByText('Normal Tag')).toBeVisible()
            const textElement = screen.getByText('Normal Tag')
            expect(textElement).not.toHaveAttribute('aria-hidden')
        })
    })

    describe('Interactive State', () => {
        it('renders as button when onClick is provided', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            expect(tag).toBeInTheDocument()
            expect(tag).toHaveAttribute('tabIndex', '0')
        })

        it('calls onClick when clicked', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            fireEvent.click(tag)
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('calls onClick when Enter key is pressed', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            fireEvent.keyDown(tag, { key: 'Enter' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('calls onClick when Space key is pressed', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            fireEvent.keyDown(tag, { key: ' ' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick for other keys', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            fireEvent.keyDown(tag, { key: 'Tab' })
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not render as button when onClick is not provided', () => {
            render(<TagV2 text="Non-clickable" />)
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
            expect(screen.getByText('Non-clickable')).toBeInTheDocument()
        })

        it('does not render as button when skeleton is shown', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Skeleton"
                    onClick={handleClick}
                    skeleton={{ showSkeleton: true, skeletonVariant: 'pulse' }}
                />
            )
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })
    })

    describe('Disabled State', () => {
        it('renders tag correctly', () => {
            render(<TagV2 text="Tag" />)
            expect(screen.getByText('Tag')).toBeInTheDocument()
        })

        it('allows click when onClick is provided', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            fireEvent.click(tag)
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not have aria-disabled="true" (disabled prop not implemented)', () => {
            const handleClick = vi.fn()
            const { container } = render(
                <TagV2 text="Clickable" onClick={handleClick} />
            )
            const tag = container.querySelector('[aria-disabled="true"]')
            // Note: disabled prop is not currently implemented
            expect(tag).not.toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty string text', () => {
            render(<TagV2 text="" />)
            const tag = document.querySelector('[data-tag=""]')
            expect(tag).toBeInTheDocument()
        })

        it('handles very long text', () => {
            const longText = 'A'.repeat(1000)
            render(<TagV2 text={longText} />)
            expect(screen.getByText(longText)).toBeInTheDocument()
        })

        it('handles special characters in text', () => {
            const specialText = 'Tag with <>&"\' characters'
            render(<TagV2 text={specialText} />)
            expect(screen.getByText(specialText)).toBeInTheDocument()
        })

        it('handles multiple rapid clicks', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Rapid" onClick={handleClick} />)
            const tag = screen.getByRole('button')
            fireEvent.click(tag)
            fireEvent.click(tag)
            fireEvent.click(tag)
            expect(handleClick).toHaveBeenCalledTimes(3)
        })

        it('blocks className prop from being passed', () => {
            const { container } = render(
                <TagV2
                    text="Test"
                    {...({
                        className: 'should-not-exist',
                    } as Record<string, unknown>)}
                />
            )
            const tag = container.querySelector('[data-tag="Test"]')
            expect(tag).not.toHaveClass('should-not-exist')
        })

        it('blocks style prop from being passed', () => {
            const { container } = render(
                <TagV2
                    text="Test"
                    {...({
                        style: { backgroundColor: 'red' },
                    } as Record<string, unknown>)}
                />
            )
            const tag = container.querySelector('[data-tag="Test"]')
            expect(tag).not.toHaveStyle({ backgroundColor: 'red' })
        })

        it('handles ref forwarding correctly for div (no onClick)', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(<TagV2 text="Ref Test" ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('data-tag', 'Ref Test')
        })

        it('handles ref forwarding correctly for button (with onClick)', () => {
            const handleClick = vi.fn()
            const ref = React.createRef<HTMLButtonElement>()
            render(
                <TagV2 text="Ref Test Button" onClick={handleClick} ref={ref} />
            )
            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current).toHaveAttribute('data-tag', 'Ref Test Button')
        })
    })

    describe('Combined Props', () => {
        it('renders with all props combined', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Complete Tag"
                    type={TagV2Type.ATTENTIVE}
                    size={TagV2Size.MD}
                    subType={TagV2SubType.ROUNDED}
                    color={TagV2Color.SUCCESS}
                    leftSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                    rightSlot={{ slot: <MockIcon />, maxHeight: '16px' }}
                    onClick={handleClick}
                />
            )
            expect(screen.getByText('Complete Tag')).toBeInTheDocument()
            expect(screen.getByRole('button')).toBeInTheDocument()
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
        })

        it('handles onClick and renders as button (disabled prop not implemented)', () => {
            const handleClick = vi.fn()
            render(<TagV2 text="Clickable" onClick={handleClick} />)
            // Note: disabled prop is not currently implemented
            expect(screen.getByRole('button')).toBeInTheDocument()
            const tag = screen.getByRole('button')
            fireEvent.click(tag)
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('handles skeleton with onClick (should not be interactive)', () => {
            const handleClick = vi.fn()
            render(
                <TagV2
                    text="Skeleton Clickable"
                    onClick={handleClick}
                    skeleton={{ showSkeleton: true, skeletonVariant: 'pulse' }}
                />
            )
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })
    })
})
