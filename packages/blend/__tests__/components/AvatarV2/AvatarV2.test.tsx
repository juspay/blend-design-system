import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { AvatarV2 } from '../../../lib/components/AvatarV2'
import {
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
} from '../../../lib/components/AvatarV2'
import { MockIcon } from '../../test-utils'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

describe('AvatarV2', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('Rendering', () => {
        it('renders avatar with image', async () => {
            const { container } = render(
                <AvatarV2 src="https://example.com/avatar.jpg" alt="John Doe" />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveAttribute('data-avatar', 'John Doe')
            expect(avatar).toHaveAttribute('data-variant', 'image')

            const image = container.querySelector('[data-avatar-image="true"]')
            expect(image).toBeInTheDocument()
            expect(image).toHaveAttribute(
                'src',
                'https://example.com/avatar.jpg'
            )
            expect(image).toHaveAttribute('alt', 'John Doe')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with fallback text', async () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveAttribute('data-variant', 'text')

            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toBeInTheDocument()
            expect(screen.getByText('JD')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with custom fallback string', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" fallbackText="AB" />
            )

            expect(screen.getByText('AB')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with skeleton', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" skeleton={{ show: true }} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with leading slot', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    leftSlot={<MockIcon data-testid="leading-icon" />}
                />
            )

            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()

            const leftSlot = container.querySelector(
                '[data-element="leading-slot"]'
            )
            expect(leftSlot).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with trailing slot', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    rightSlot={<MockIcon data-testid="trailing-icon" />}
                />
            )

            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()

            const rightSlot = container.querySelector(
                '[data-element="trailing-slot"]'
            )
            expect(rightSlot).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with both leading and trailing slots', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    leftSlot={<MockIcon data-testid="leading-icon" />}
                    rightSlot={<MockIcon data-testid="trailing-icon" />}
                />
            )

            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()

            expect(
                container.querySelector('[data-element="leading-slot"]')
            ).toBeInTheDocument()
            expect(
                container.querySelector('[data-element="trailing-slot"]')
            ).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with slots and status indicator', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    leftSlot={<MockIcon />}
                    rightSlot={<MockIcon />}
                    status={{ type: AvatarV2Status.ONLINE }}
                />
            )

            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toHaveAttribute('data-status', 'online')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with slots and NONE status', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    leftSlot={<MockIcon />}
                    rightSlot={<MockIcon />}
                    status={{ type: AvatarV2Status.NONE }}
                />
            )

            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toHaveAttribute('data-status', 'offline')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders avatar with slots and different status types', async () => {
            const statuses = [
                AvatarV2Status.ONLINE,
                AvatarV2Status.OFFLINE,
                AvatarV2Status.AWAY,
                AvatarV2Status.BUSY,
            ]

            for (const status of statuses) {
                const { container } = render(
                    <AvatarV2
                        alt="Test"
                        leftSlot={<MockIcon />}
                        status={{ type: status }}
                    />
                )

                const wrapper = container.querySelector(
                    '[data-avatar-wrapper="true"]'
                )
                expect(wrapper).toHaveAttribute('data-status', status)

                cleanup()
            }
        })

        it('handles slot spacing when gap is a number', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    leftSlot={<MockIcon />}
                    rightSlot={<MockIcon />}
                />
            )

            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()

            const leftSlot = container.querySelector(
                '[data-element="leading-slot"]'
            )
            const rightSlot = container.querySelector(
                '[data-element="trailing-slot"]'
            )
            expect(leftSlot).toBeInTheDocument()
            expect(rightSlot).toBeInTheDocument()
        })
    })

    describe('Sizes', () => {
        it.each([
            [AvatarV2Size.XS, 'xs'],
            [AvatarV2Size.SM, 'sm'],
            [AvatarV2Size.MD, 'md'],
            [AvatarV2Size.LG, 'lg'],
            [AvatarV2Size.XL, 'xl'],
            [AvatarV2Size.XXL, 'xxl'],
        ])('renders %s size correctly', async (size) => {
            const { container } = render(<AvatarV2 alt="Test" size={size} />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Shapes', () => {
        it.each([
            [AvatarV2Shape.CIRCLE, 'circle'],
            [AvatarV2Shape.ROUNDED, 'rounded'],
            [AvatarV2Shape.SQUARE, 'square'],
        ])('renders %s shape correctly', async (shape) => {
            const { container } = render(<AvatarV2 alt="Test" shape={shape} />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-shape', shape)

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Status Indicators', () => {
        it('renders online status indicator', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'online')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders offline status indicator', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    status={{ type: AvatarV2Status.OFFLINE }}
                />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'offline')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders away status indicator', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.AWAY }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'away')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders busy status indicator', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.BUSY }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'busy')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('does not render indicator when status is NONE', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.NONE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).not.toBeInTheDocument()

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'offline')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders status indicator at top-right position', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    status={{
                        type: AvatarV2Status.ONLINE,
                        position: AvatarV2StatusPosition.TOP_RIGHT,
                    }}
                />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders status indicator at top-left position', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    status={{
                        type: AvatarV2Status.ONLINE,
                        position: AvatarV2StatusPosition.TOP_LEFT,
                    }}
                />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders status indicator at bottom-right position', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    status={{
                        type: AvatarV2Status.ONLINE,
                        position: AvatarV2StatusPosition.BOTTOM_RIGHT,
                    }}
                />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders status indicator at bottom-left position', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    status={{
                        type: AvatarV2Status.ONLINE,
                        position: AvatarV2StatusPosition.BOTTOM_LEFT,
                    }}
                />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('does not render status indicator when skeleton is shown', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    status={{ type: AvatarV2Status.ONLINE }}
                    skeleton={{ show: true }}
                />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).not.toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Image Handling', () => {
        it('handles image load error and shows fallback', async () => {
            const handleImageError = vi.fn()
            const { container } = render(
                <AvatarV2
                    src="https://invalid-url.com/image.jpg"
                    alt="Test"
                    onImageError={handleImageError}
                />
            )

            const image = container.querySelector('img')
            if (image) {
                const errorEvent = new Event('error')
                image.dispatchEvent(errorEvent)
            }

            await waitFor(() => {
                const fallback = container.querySelector(
                    '[data-avatar-fallback="true"]'
                )
                expect(fallback).toBeInTheDocument()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('calls onImageLoad when image loads successfully', async () => {
            const handleImageLoad = vi.fn()
            const { container } = render(
                <AvatarV2
                    src="https://example.com/avatar.jpg"
                    alt="Test"
                    onImageLoad={handleImageLoad}
                />
            )

            const image = container.querySelector('img')
            if (image) {
                const loadEvent = new Event('load')
                image.dispatchEvent(loadEvent)
            }

            await waitFor(() => {
                expect(handleImageLoad).toHaveBeenCalled()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('calls onImageError when image fails to load', async () => {
            const handleImageError = vi.fn()
            const { container } = render(
                <AvatarV2
                    src="https://invalid-url.com/image.jpg"
                    alt="Test"
                    onImageError={handleImageError}
                />
            )

            const image = container.querySelector('img')
            if (image) {
                const errorEvent = new Event('error')
                image.dispatchEvent(errorEvent)
            }

            await waitFor(() => {
                expect(handleImageError).toHaveBeenCalled()
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Interactive Behavior', () => {
        it('handles click events when onClick is provided', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} />
            )

            const avatar = container.querySelector('[data-avatar]')
            if (avatar) {
                await user.click(avatar as HTMLElement)
            }

            expect(handleClick).toHaveBeenCalledTimes(1)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles keyboard Enter key when onClick is provided', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            if (avatar) {
                avatar.focus()
                await user.keyboard('{Enter}')
            }

            expect(handleClick).toHaveBeenCalledTimes(1)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles keyboard Space key when onClick is provided', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            if (avatar) {
                avatar.focus()
                await user.keyboard(' ')
            }

            expect(handleClick).toHaveBeenCalledTimes(1)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('does not handle click when disabled', async () => {
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} disabled />
            )

            const avatar = container.querySelector('[data-avatar]')

            expect(avatar).toHaveStyle({ pointerEvents: 'none' })
            expect(handleClick).not.toHaveBeenCalled()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('does not handle keyboard events when disabled', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} disabled />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            if (avatar) {
                avatar.focus()
                await user.keyboard('{Enter}')
            }

            expect(handleClick).not.toHaveBeenCalled()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies disabled styles when disabled', async () => {
            const { container } = render(<AvatarV2 alt="Test" disabled />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveStyle({ opacity: '0.5' })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Custom Dimensions', () => {
        it('applies custom width', async () => {
            const { container } = render(<AvatarV2 alt="Test" width="100px" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveStyle({ width: '100px' })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies custom height', async () => {
            const { container } = render(<AvatarV2 alt="Test" height="100px" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveStyle({ height: '100px' })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies both custom width and height', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" width="120px" height="120px" />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveStyle({ width: '120px', height: '120px' })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Custom Background Color', () => {
        it('applies custom background color for fallback', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" backgroundColor="#FF0000" />
            )

            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toHaveStyle({ backgroundColor: '#FF0000' })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Skeleton Variants', () => {
        it('renders pulse skeleton variant', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders wave skeleton variant', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    skeleton={{ show: true, variant: 'wave' }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Data Attributes', () => {
        it('sets correct data-avatar attribute', async () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-avatar', 'John Doe')
        })

        it('sets default data-avatar when alt is empty', async () => {
            const { container } = render(<AvatarV2 alt="" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-avatar', 'avatar')
        })

        it('sets correct data-variant for image', async () => {
            const { container } = render(
                <AvatarV2 src="https://example.com/avatar.jpg" alt="Test" />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-variant', 'image')
        })

        it('sets correct data-variant for text fallback', async () => {
            const { container } = render(<AvatarV2 alt="Test" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-variant', 'text')
        })

        it('sets correct data-shape attribute', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" shape={AvatarV2Shape.ROUNDED} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-shape', AvatarV2Shape.ROUNDED)
        })

        it('sets correct data-status attribute', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'online')
        })
    })

    describe('Responsive Behavior', () => {
        it('renders correctly on small screens', async () => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 375,
            })

            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()

            vi.restoreAllMocks()
        })

        it('renders correctly on large screens', async () => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'lg',
                innerWidth: 1024,
            })

            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()

            vi.restoreAllMocks()
        })
    })

    describe('Initials Generation', () => {
        it('generates initials from single word', async () => {
            render(<AvatarV2 alt="John" />)

            expect(screen.getByText('J')).toBeInTheDocument()
        })

        it('generates initials from two words', async () => {
            render(<AvatarV2 alt="John Doe" />)

            expect(screen.getByText('JD')).toBeInTheDocument()
        })

        it('generates initials from multiple words (takes first two)', async () => {
            render(<AvatarV2 alt="John Michael Doe" />)

            expect(screen.getByText('JM')).toBeInTheDocument()
        })

        it('handles empty alt text', async () => {
            render(<AvatarV2 alt="" />)
            const screenReaderText = screen.queryByText('Avatar')
            expect(screenReaderText).toBeInTheDocument()
        })

        it('handles whitespace-only alt text', async () => {
            render(<AvatarV2 alt="   " />)
            const avatar = screen.getByRole('img')
            expect(avatar).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles undefined status prop', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={undefined} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'offline')
        })

        it('handles null status prop', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={undefined} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('data-status', 'offline')
        })

        it('handles custom width and height with slots', async () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    width="100px"
                    height="100px"
                    leftSlot={<MockIcon />}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveStyle({ width: '100px', height: '100px' })
        })

        it('handles image error callback with error details', async () => {
            const handleImageError = vi.fn()
            const { container } = render(
                <AvatarV2
                    src="https://invalid-url.com/image.jpg"
                    alt="Test"
                    onImageError={handleImageError}
                />
            )

            const image = container.querySelector('img')
            if (image) {
                const errorEvent = new Event('error')
                image.dispatchEvent(errorEvent)
            }

            await waitFor(() => {
                expect(handleImageError).toHaveBeenCalled()
                expect(handleImageError).toHaveBeenCalledWith(expect.any(Error))
            })
        })

        it('handles image load callback', async () => {
            const handleImageLoad = vi.fn()
            const { container } = render(
                <AvatarV2
                    src="https://example.com/avatar.jpg"
                    alt="Test"
                    onImageLoad={handleImageLoad}
                />
            )

            const image = container.querySelector('img')
            if (image) {
                const loadEvent = new Event('load')
                image.dispatchEvent(loadEvent)
            }

            await waitFor(() => {
                expect(handleImageLoad).toHaveBeenCalled()
            })
        })

        it('handles fallback with React element', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" fallbackText="Custom" />
            )

            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toBeInTheDocument()
        })

        it('handles fallback with empty string', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" fallbackText="" />
            )

            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toBeInTheDocument()
            const fallbackText = fallback?.textContent?.trim()
            expect(fallbackText).toBe('')
        })

        it('handles all status positions with slots', async () => {
            const positions = [
                AvatarV2StatusPosition.TOP_RIGHT,
                AvatarV2StatusPosition.TOP_LEFT,
                AvatarV2StatusPosition.BOTTOM_RIGHT,
                AvatarV2StatusPosition.BOTTOM_LEFT,
            ]

            for (const position of positions) {
                const { container } = render(
                    <AvatarV2
                        alt="Test"
                        leftSlot={<MockIcon />}
                        status={{
                            type: AvatarV2Status.ONLINE,
                            position,
                        }}
                    />
                )

                const indicator = container.querySelector(
                    '[data-avatar-indicator="true"]'
                )
                expect(indicator).toBeInTheDocument()

                cleanup()
            }
        })

        it('handles ref forwarding correctly', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(<AvatarV2 alt="Test" ref={ref} />)

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('data-avatar')
        })

        it('handles ref forwarding with slots', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(<AvatarV2 alt="Test" ref={ref} leftSlot={<MockIcon />} />)

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('data-avatar')
        })
    })
})
