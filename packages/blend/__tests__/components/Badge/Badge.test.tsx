import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import { Badge } from '../../../lib/components/Badge'
import { BadgeSize, BadgeColor } from '../../../lib/components/Badge'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

describe('Badge', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('Rendering', () => {
        it('renders standalone badge with count', async () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
            expect(screen.getByText('5')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders standalone badge with text', async () => {
            const { container } = render(<Badge text="NEW" />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
            expect(screen.getByText('NEW')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders dot badge when no content provided', async () => {
            const { container } = render(<Badge />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders badge with children', async () => {
            const { container } = render(
                <Badge count={3}>
                    <span data-testid="child">Child Element</span>
                </Badge>
            )

            expect(screen.getByTestId('child')).toBeInTheDocument()
            expect(screen.getByText('3')).toBeInTheDocument()

            const wrapper = container.querySelector(
                '[data-badge-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('does not render when showBadge is false', () => {
            const { container } = render(<Badge count={5} showBadge={false} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).not.toBeInTheDocument()
        })

        it('does not render when count is 0 and showZero is false', () => {
            const { container } = render(<Badge count={0} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).not.toBeInTheDocument()
        })

        it('renders when count is 0 and showZero is true', async () => {
            const { container } = render(<Badge count={0} showZero={true} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
            expect(screen.getByText('0')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Sizes', () => {
        it.each([
            [BadgeSize.SM, 'sm'],
            [BadgeSize.MD, 'md'],
            [BadgeSize.LG, 'lg'],
        ])('renders %s size correctly with count', async (size) => {
            const { container } = render(<Badge count={5} size={size} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it.each([
            [BadgeSize.SM, 'sm'],
            [BadgeSize.MD, 'md'],
            [BadgeSize.LG, 'lg'],
        ])('renders %s size correctly as dot', async (size) => {
            const { container } = render(<Badge size={size} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Colors', () => {
        it.each([
            [BadgeColor.ALERT, 'alert'],
            [BadgeColor.NEUTRAL, 'neutral'],
            [BadgeColor.WARNING, 'warning'],
            [BadgeColor.PRIMARY, 'primary'],
            [BadgeColor.SUCCESS, 'success'],
        ])('renders %s color correctly', async (color) => {
            const { container } = render(<Badge count={5} color={color} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Count Display', () => {
        it('displays exact count when under maxCount', async () => {
            const { container } = render(<Badge count={50} maxCount={99} />)

            expect(screen.getByText('50')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('displays maxCount+ when count exceeds maxCount', async () => {
            const { container } = render(<Badge count={150} maxCount={99} />)

            expect(screen.getByText('99+')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('uses default maxCount of 99', async () => {
            const { container } = render(<Badge count={100} />)

            expect(screen.getByText('99+')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles custom maxCount', async () => {
            const { container } = render(<Badge count={50} maxCount={10} />)

            expect(screen.getByText('10+')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Positioning', () => {
        it('renders badge at top-right position by default', async () => {
            const { container } = render(
                <Badge count={3}>
                    <span>Content</span>
                </Badge>
            )

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders badge at top-left position', async () => {
            const { container } = render(
                <Badge count={3} position="top-left">
                    <span>Content</span>
                </Badge>
            )

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders badge at bottom-right position', async () => {
            const { container } = render(
                <Badge count={3} position="bottom-right">
                    <span>Content</span>
                </Badge>
            )

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders badge at bottom-left position', async () => {
            const { container } = render(
                <Badge count={3} position="bottom-left">
                    <span>Content</span>
                </Badge>
            )

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies custom offset when provided', async () => {
            const { container } = render(
                <Badge count={3} offset={[10, 10]}>
                    <span>Content</span>
                </Badge>
            )

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('positions badge on circular element circumference when isCircular is true', async () => {
            const { container } = render(
                <Badge count={3} isCircular={true}>
                    <span>Content</span>
                </Badge>
            )

            const wrapper = container.querySelector('[data-circular="true"]')
            expect(wrapper).toBeInTheDocument()

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Text Override', () => {
        it('displays text instead of count when both provided', async () => {
            const { container } = render(<Badge count={5} text="NEW" />)

            expect(screen.getByText('NEW')).toBeInTheDocument()
            expect(screen.queryByText('5')).not.toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('displays text when count is undefined', async () => {
            const { container } = render(<Badge text="99+" />)

            expect(screen.getByText('99+')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Accessibility', () => {
        it('has role="status" attribute', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
        })

        it('has aria-label with count value', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', '5')
        })

        it('has aria-label with text value when text provided', () => {
            const { container } = render(<Badge text="NEW" />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', 'NEW')
        })

        it('has aria-label for overflow count', () => {
            const { container } = render(<Badge count={150} maxCount={99} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', 'More than 99')
        })

        it('has default aria-label for dot badge', () => {
            const { container } = render(<Badge />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', 'Notification')
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to badge element', () => {
            const ref = React.createRef<HTMLSpanElement>()
            render(<Badge count={5} ref={ref} />)

            expect(ref.current).toBeInstanceOf(HTMLSpanElement)
            expect(ref.current).toHaveAttribute('role', 'status')
        })

        it('forwards ref with children', () => {
            const ref = React.createRef<HTMLSpanElement>()
            render(
                <Badge count={5} ref={ref}>
                    <span>Content</span>
                </Badge>
            )
            expect(ref.current).toBeInstanceOf(HTMLSpanElement)
            expect(ref.current).toHaveAttribute('role', 'status')
        })
    })

    describe('Responsive Behavior', () => {
        it('renders correctly on small screens', async () => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 375,
            })

            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()

            vi.restoreAllMocks()
        })

        it('renders correctly on large screens', async () => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'lg',
                innerWidth: 1024,
            })

            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()

            vi.restoreAllMocks()
        })
    })

    describe('Edge Cases', () => {
        it('handles negative count', async () => {
            const { container } = render(<Badge count={-5} />)

            expect(screen.getByText('-5')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles very large count', async () => {
            const { container } = render(<Badge count={999999} />)

            expect(screen.getByText('99+')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles empty text', async () => {
            const { container } = render(<Badge text="" />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles all positions with children', async () => {
            const positions: Array<
                'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
            > = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

            for (const position of positions) {
                const { container } = render(
                    <Badge count={3} position={position}>
                        <span>Content</span>
                    </Badge>
                )

                const badge = container.querySelector('[role="status"]')
                expect(badge).toBeInTheDocument()

                cleanup()
            }
        })

        it('handles all colors with all sizes', async () => {
            const colors = [
                BadgeColor.ALERT,
                BadgeColor.NEUTRAL,
                BadgeColor.WARNING,
                BadgeColor.PRIMARY,
                BadgeColor.SUCCESS,
            ]
            const sizes = [BadgeSize.SM, BadgeSize.MD, BadgeSize.LG]

            for (const color of colors) {
                for (const size of sizes) {
                    const { container } = render(
                        <Badge count={5} color={color} size={size} />
                    )

                    const badge = container.querySelector('[role="status"]')
                    expect(badge).toBeInTheDocument()

                    cleanup()
                }
            }
        })
    })
})
