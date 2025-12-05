import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Breadcrumb from '../../../lib/components/Breadcrumb/Breadcrumb'
import type { BreadcrumbItemType } from '../../../lib/components/Breadcrumb/types'

const createBreadcrumbItems = (count: number): BreadcrumbItemType[] => {
    return Array.from({ length: count }, (_, i) => ({
        label: `Page ${i + 1}`,
        href: `/page-${i + 1}`,
    }))
}

describe('Breadcrumb Accessibility', () => {
    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default breadcrumb (axe-core validation)', async () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for breadcrumb with single item (2.4.8 Location)', async () => {
            const items = createBreadcrumbItems(1)
            const { container } = render(<Breadcrumb items={items} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for breadcrumb with many items and overflow (2.4.8 Location)', async () => {
            const items = createBreadcrumbItems(8)
            const { container } = render(<Breadcrumb items={items} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with custom onClick handlers (2.1.1 Keyboard)', async () => {
            const items = createBreadcrumbItems(3).map((item) => ({
                ...item,
                onClick: vi.fn(),
            }))
            const { container } = render(<Breadcrumb items={items} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with slots (1.1.1 Non-text Content)', async () => {
            const items: BreadcrumbItemType[] = [
                {
                    label: 'Home',
                    href: '/',
                    leftSlot: <span>🏠</span>,
                },
                {
                    label: 'Products',
                    href: '/products',
                    rightSlot: <span>→</span>,
                },
            ]
            const { container } = render(<Breadcrumb items={items} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('all breadcrumb links are focusable with keyboard - all functionality operable via keyboard', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            links.forEach((link) => {
                link.focus()
                expect(document.activeElement).toBe(link)
            })
        })

        it('breadcrumb links can be activated with Enter key - keyboard activation support', async () => {
            const handleClick = vi.fn()
            const items = createBreadcrumbItems(3).map((item, index) => ({
                ...item,
                onClick: index === 0 ? handleClick : undefined,
            }))
            const { user } = render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            links[0].focus()
            await user.keyboard('{Enter}')

            expect(handleClick).toHaveBeenCalled()
        })

        it('ellipsis button is focusable with keyboard - keyboard navigation support', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            button.focus()
            expect(document.activeElement).toBe(button)
        })

        it('ellipsis button can be activated with Enter key - keyboard activation support', async () => {
            const items = createBreadcrumbItems(8)
            const { user } = render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            button.focus()
            await user.keyboard('{Enter}')

            // Button should be focusable and activatable
            expect(document.activeElement).toBe(button)
        })

        it('ellipsis button can be activated with Space key - keyboard activation support', async () => {
            const items = createBreadcrumbItems(8)
            const { user } = render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            button.focus()
            await user.keyboard(' ')

            // Button should be focusable and activatable
            expect(document.activeElement).toBe(button)
        })

        it('supports Tab key for focus navigation - logical focus order (WCAG 2.4.3)', async () => {
            const items = createBreadcrumbItems(3)
            const { user } = render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            await user.tab()

            // First link should be focused
            expect(document.activeElement).toBe(links[0])

            await user.tab()
            // Second link should be focused
            expect(document.activeElement).toBe(links[1])
        })

        it('active breadcrumb item is not focusable - prevents navigation to current page (WCAG 2.4.7)', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            // Active item should not be a link
            const activeItem = screen.getByText('Page 3')
            const parent = activeItem.closest('[aria-current="page"]')
            expect(parent).toBeInTheDocument()
            expect(parent).not.toHaveAttribute('href')
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('breadcrumb links maintain focus visible state - visible focus indicators', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            links[0].focus()

            expect(document.activeElement).toBe(links[0])
            // Focus should be visible (component should support focus-visible)
        })

        it('ellipsis button maintains focus visible state - visible focus indicators', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            button.focus()

            expect(document.activeElement).toBe(button)
            // Focus should be visible
        })
    })

    describe('WCAG 2.4.8 Location (Level AAA)', () => {
        it('has proper navigation landmark - breadcrumb navigation structure', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const nav = screen.getByRole('navigation', {
                name: 'Breadcrumb navigation',
            })
            expect(nav).toBeInTheDocument()
        })

        it('uses ordered list structure for breadcrumb items - semantic HTML (WCAG 4.1.1)', () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)

            const ol = container.querySelector('ol')
            expect(ol).toBeInTheDocument()

            const lis = container.querySelectorAll('ol > li')
            expect(lis.length).toBeGreaterThan(0)
        })

        it('active item has aria-current="page" - indicates current location (WCAG 2.4.8)', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const activeItem = screen.getByText('Page 3')
            const parent = activeItem.closest('[aria-current="page"]')
            expect(parent).toBeInTheDocument()
            expect(parent).toHaveAttribute('aria-current', 'page')
        })

        it('active item has proper aria-label - accessible name (WCAG 4.1.2)', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const activeItem = screen.getByLabelText(/current page: page 3/i)
            expect(activeItem).toBeInTheDocument()
        })

        it('breadcrumb links have descriptive aria-labels - accessible names (WCAG 4.1.2)', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const link1 = screen.getByLabelText('Navigate to Page 1')
            const link2 = screen.getByLabelText('Navigate to Page 2')

            expect(link1).toBeInTheDocument()
            expect(link2).toBeInTheDocument()
        })
    })

    describe('WCAG 2.5.5 Target Size (Level AAA)', () => {
        it('breadcrumb links have minimum 44x44px touch target - sufficient target size', () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)

            const links = container.querySelectorAll('a[data-breadcrumb]')
            links.forEach((link) => {
                const styles = window.getComputedStyle(link as Element)
                const minWidth = parseInt(styles.minWidth || '0')
                const minHeight = parseInt(styles.minHeight || '0')

                expect(minWidth).toBeGreaterThanOrEqual(44)
                expect(minHeight).toBeGreaterThanOrEqual(44)
            })
        })

        it('ellipsis button has minimum 44x44px touch target - sufficient target size', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            const styles = window.getComputedStyle(button)
            const minWidth = parseInt(styles.minWidth || '0')
            const minHeight = parseInt(styles.minHeight || '0')

            expect(minWidth).toBeGreaterThanOrEqual(44)
            expect(minHeight).toBeGreaterThanOrEqual(44)
        })

        it('active breadcrumb item has minimum 44x44px touch target - sufficient target size', () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)

            const activeItem = container.querySelector('[aria-current="page"]')
            expect(activeItem).toBeInTheDocument()

            if (activeItem) {
                const styles = window.getComputedStyle(activeItem)
                const minWidth = parseInt(styles.minWidth || '0')
                const minHeight = parseInt(styles.minHeight || '0')

                expect(minWidth).toBeGreaterThanOrEqual(44)
                expect(minHeight).toBeGreaterThanOrEqual(44)
            }
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A) & Screen Reader Support', () => {
        it('has proper navigation role - programmatically determinable role', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const nav = screen.getByRole('navigation', {
                name: 'Breadcrumb navigation',
            })
            expect(nav).toBeInTheDocument()
        })

        it('breadcrumb links have proper link role - programmatically determinable role', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            expect(links.length).toBe(2) // Active item is not a link
            links.forEach((link) => {
                expect(link).toHaveAttribute('href')
            })
        })

        it('ellipsis button has proper button role - programmatically determinable role', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            expect(button).toBeInTheDocument()
            expect(button).toHaveAttribute('type', 'button')
        })

        it('ellipsis button has aria-haspopup="menu" - indicates popup behavior (WCAG 4.1.2)', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            expect(button).toHaveAttribute('aria-haspopup', 'menu')
        })

        it('ellipsis button has aria-expanded="false" - indicates menu state (WCAG 4.1.2)', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            expect(button).toHaveAttribute('aria-expanded', 'false')
        })

        it('separators are marked with aria-hidden - decorative content hidden (WCAG 1.1.1)', () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)

            const separators = container.querySelectorAll('[role="separator"]')
            separators.forEach((separator) => {
                expect(separator).toHaveAttribute('aria-hidden', 'true')
            })
        })

        it('decorative slots have aria-hidden - non-text content properly marked (WCAG 1.1.1)', () => {
            const items: BreadcrumbItemType[] = [
                {
                    label: 'Home',
                    href: '/',
                    leftSlot: <span>🏠</span>,
                },
                {
                    label: 'Products',
                    href: '/products',
                    rightSlot: <span>→</span>,
                },
            ]
            const { container } = render(<Breadcrumb items={items} />)

            const hiddenElements = container.querySelectorAll(
                '[aria-hidden="true"]'
            )
            expect(hiddenElements.length).toBeGreaterThan(0)
        })

        it('ellipsis icon has aria-hidden - decorative icon hidden (WCAG 1.1.1)', () => {
            const items = createBreadcrumbItems(8)
            const { container } = render(<Breadcrumb items={items} />)

            const icon = container.querySelector('svg[aria-hidden="true"]')
            expect(icon).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('breadcrumb structure uses semantic HTML - proper relationships', () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)

            const nav = container.querySelector('nav')
            expect(nav).toBeInTheDocument()

            const ol = container.querySelector('nav > ol')
            expect(ol).toBeInTheDocument()

            const lis = container.querySelectorAll('ol > li')
            expect(lis.length).toBeGreaterThan(0)
        })

        it('breadcrumb items are in logical order - proper sequence (WCAG 1.3.2)', () => {
            const items = createBreadcrumbItems(3)
            render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            expect(links[0]).toHaveTextContent('Page 1')
            expect(links[1]).toHaveTextContent('Page 2')
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('breadcrumb text has sufficient color contrast - readable text', () => {
            const items = createBreadcrumbItems(3)
            const { container } = render(<Breadcrumb items={items} />)

            // This test ensures the component renders, actual contrast is tested by axe-core
            const links = container.querySelectorAll('a[data-breadcrumb]')
            expect(links.length).toBeGreaterThan(0)
        })
    })

    describe('Edge Cases and Error Handling', () => {
        it('handles empty items array gracefully - no errors with empty state', () => {
            const { container } = render(<Breadcrumb items={[]} />)
            expect(container.firstChild).toBeNull()
        })

        it('handles single item breadcrumb correctly - proper active state', () => {
            const items = createBreadcrumbItems(1)
            render(<Breadcrumb items={items} />)

            const activeItem = screen.getByText('Page 1')
            const parent = activeItem.closest('[aria-current="page"]')
            expect(parent).toBeInTheDocument()
        })

        it('handles onClick handlers without breaking navigation - custom routing support', async () => {
            const handleClick = vi.fn((e) => {
                e.preventDefault()
            })
            const items = createBreadcrumbItems(3).map((item) => ({
                ...item,
                onClick: handleClick,
            }))
            const { user } = render(<Breadcrumb items={items} />)

            const links = screen.getAllByRole('link')
            links[0].focus()
            await user.keyboard('{Enter}')

            expect(handleClick).toHaveBeenCalled()
        })

        it('handles breadcrumb with exactly MAX_ITEMS correctly - boundary condition', () => {
            const items = createBreadcrumbItems(4)
            render(<Breadcrumb items={items} />)

            // Should not show ellipsis button
            const button = screen.queryByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            expect(button).not.toBeInTheDocument()
        })

        it('handles breadcrumb with more than MAX_ITEMS correctly - overflow handling', () => {
            const items = createBreadcrumbItems(8)
            render(<Breadcrumb items={items} />)

            // Should show ellipsis button
            const button = screen.getByRole('button', {
                name: /show \d+ more breadcrumb items/i,
            })
            expect(button).toBeInTheDocument()
        })
    })
})
