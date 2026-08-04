import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import { Badge } from '../../../lib/components/Badge'

describe('Badge Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.1 AA Compliance - Critical Violations', () => {
        it('passes axe-core validation for basic badge with count', async () => {
            const { container } = render(<Badge count={5} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for dot badge', async () => {
            const { container } = render(<Badge />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for badge with children', async () => {
            const { container } = render(
                <Badge count={3}>
                    <span>Content</span>
                </Badge>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value', () => {
        it('has proper role attribute', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
        })

        it('has proper aria-label with count', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', '5')
        })

        it('has proper aria-label with text', () => {
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

        it('aria-label updates when count changes', () => {
            const { container, rerender } = render(<Badge count={5} />)

            let badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', '5')

            rerender(<Badge count={10} />)

            badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('aria-label', '10')
        })
    })

    describe('Screen Reader Support', () => {
        it('provides accessible label for count badge', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            const ariaLabel = badge?.getAttribute('aria-label')
            expect(ariaLabel).toBeTruthy()
            expect(ariaLabel).toBe('5')
        })

        it('provides accessible label for text badge', () => {
            const { container } = render(<Badge text="NEW" />)

            const badge = container.querySelector('[role="status"]')
            const ariaLabel = badge?.getAttribute('aria-label')
            expect(ariaLabel).toBe('NEW')
        })

        it('provides descriptive label for overflow count', () => {
            const { container } = render(<Badge count={150} maxCount={99} />)

            const badge = container.querySelector('[role="status"]')
            const ariaLabel = badge?.getAttribute('aria-label')
            expect(ariaLabel).toContain('More than')
        })

        it('provides notification label for dot badge', () => {
            const { container } = render(<Badge />)

            const badge = container.querySelector('[role="status"]')
            const ariaLabel = badge?.getAttribute('aria-label')
            expect(ariaLabel).toBe('Notification')
        })
    })

    describe('Status Role Behavior', () => {
        it('uses role="status" for live region announcement', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
        })

        it('status role helps screen readers announce changes', () => {
            const { container } = render(<Badge count={5} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toHaveAttribute('role', 'status')
        })
    })

    describe('Hidden Badge Behavior', () => {
        it('does not render hidden badge to DOM', () => {
            const { container } = render(<Badge count={5} showBadge={false} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).not.toBeInTheDocument()
        })

        it('does not render zero count badge when showZero is false', () => {
            const { container } = render(<Badge count={0} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).not.toBeInTheDocument()
        })

        it('renders zero count badge when showZero is true', () => {
            const { container } = render(<Badge count={0} showZero={true} />)

            const badge = container.querySelector('[role="status"]')
            expect(badge).toBeInTheDocument()
            expect(badge).toHaveAttribute('aria-label', '0')
        })
    })

    describe('Children Wrapper Accessibility', () => {
        it('wrapper has proper data attributes for debugging', () => {
            const { container } = render(
                <Badge count={3}>
                    <span>Content</span>
                </Badge>
            )

            const wrapper = container.querySelector(
                '[data-badge-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()
        })

        it('circular wrapper has data-circular attribute', () => {
            const { container } = render(
                <Badge count={3} isCircular={true}>
                    <span>Content</span>
                </Badge>
            )

            const wrapper = container.querySelector('[data-circular="true"]')
            expect(wrapper).toBeInTheDocument()
        })

        it('preserves child element accessibility', () => {
            const { container } = render(
                <Badge count={3}>
                    <button aria-label="Notifications">Bell</button>
                </Badge>
            )

            const button = container.querySelector('button')
            expect(button).toHaveAttribute('aria-label', 'Notifications')
        })
    })
})
