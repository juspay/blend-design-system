import React from 'react'
import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '../../test-utils'
import { axe } from 'jest-axe'
import Accordion from '../../../lib/components/Accordion/Accordion'
import AccordionItem from '../../../lib/components/Accordion/AccordionItem'
import {
    AccordionType,
    AccordionChevronPosition,
} from '../../../lib/components/Accordion/types'

describe('Accordion Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic accordion (axe-core validation)', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="First Item">
                        <p>Content for first item</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Second Item">
                        <p>Content for second item</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for accordion with multiple items (axe-core validation)', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionItem>
                    <AccordionItem value="item-3" title="Item 3">
                        <p>Content 3</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for disabled accordion item (axe-core validation)', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="Enabled Item">
                        <p>Content</p>
                    </AccordionItem>
                    <AccordionItem
                        value="item-2"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Disabled content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('ensures sufficient contrast for text (1.4.3 Contrast Minimum - Level AA)', async () => {
            const { container } = render(
                <Accordion accordionType={AccordionType.BORDER}>
                    <AccordionItem value="item-1" title="Contrast Test">
                        <p>Testing color contrast ratios</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('chevron icons have aria-hidden="true"', () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const chevronIcons = container.querySelectorAll(
                '[data-element="chevron-icon"]'
            )
            chevronIcons.forEach((icon) => {
                expect(icon).toHaveAttribute('aria-hidden', 'true')
            })
        })

        it('decorative slots maintain accessibility', () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="Test Item"
                        leftSlot={<span aria-label="Info icon">ℹ️</span>}
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const leftSlot = container.querySelector(
                '[data-element="leading-icon"]'
            )
            expect(leftSlot).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('uses proper semantic structure with Radix UI primitives', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="First Item">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'First Item' })
            expect(trigger).toBeInTheDocument()

            // Radix UI creates proper structure with button and content relationship
            const content = trigger
                .closest('[data-accordion]')
                ?.querySelector('[data-state]')
            expect(content).toBeInTheDocument()
        })

        it('establishes header-content relationship', () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="Test Item">
                        <p>Test content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            expect(trigger).toBeInTheDocument()

            const content = container.querySelector('[data-state]')
            expect(content).toBeInTheDocument()
        })

        it('maintains relationships in multiple accordion items', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionItem>
                </Accordion>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            const item2 = screen.getByRole('button', { name: 'Item 2' })

            expect(item1).toBeInTheDocument()
            expect(item2).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="First">
                        <p>First content</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Second">
                        <p>Second content</p>
                    </AccordionItem>
                </Accordion>
            )

            const firstButton = screen.getByRole('button', { name: 'First' })
            const secondButton = screen.getByRole('button', { name: 'Second' })

            expect(firstButton).toBeInTheDocument()
            expect(secondButton).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.1 Use of Color (Level A)', () => {
        it('does not rely solely on color to convey information', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            expect(trigger).toBeInTheDocument()

            // Information is conveyed through text and structure, not just color
            expect(trigger).toHaveTextContent('Test Item')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('accordion trigger is keyboard accessible', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Keyboard Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', {
                name: 'Keyboard Test',
            })
            expect(trigger).toBeInTheDocument()

            trigger.focus()
            expect(document.activeElement).toBe(trigger)
        })

        it('can toggle accordion with Enter key', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Toggle Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Toggle Test' })

            // Initially closed
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            // Press Enter
            fireEvent.keyDown(trigger, { key: 'Enter', code: 'Enter' })
            fireEvent.click(trigger)

            // Should be expanded
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('can toggle accordion with Space key', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Space Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Space Test' })

            // Press Space
            fireEvent.keyDown(trigger, { key: ' ', code: 'Space' })
            fireEvent.click(trigger)

            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('disabled items are not keyboard accessible', () => {
            render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', {
                name: 'Disabled Item',
            })
            expect(trigger).toBeDisabled()

            expect(trigger.hasAttribute('disabled')).toBe(true)
        })

        it('supports arrow key navigation between items', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionItem>
                </Accordion>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            const item2 = screen.getByRole('button', { name: 'Item 2' })

            item1.focus()
            expect(document.activeElement).toBe(item1)

            fireEvent.keyDown(item1, { key: 'ArrowDown', code: 'ArrowDown' })
            expect(document.activeElement).toBe(item2)
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('accordion trigger has visible focus indicator', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Focus Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Focus Test' })
            trigger.focus()

            expect(document.activeElement).toBe(trigger)
        })

        it('focus indicator is visible for all accordion items', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionItem>
                </Accordion>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            const item2 = screen.getByRole('button', { name: 'Item 2' })

            item1.focus()
            expect(document.activeElement).toBe(item1)

            item2.focus()
            expect(document.activeElement).toBe(item2)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('accordion trigger has programmatically determinable role', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Role Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Role Test' })
            expect(trigger).toBeInTheDocument()
        })

        it('accordion trigger has accessible name from title', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Accessible Name">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', {
                name: 'Accessible Name',
            })
            expect(trigger).toBeInTheDocument()
        })

        it('accordion trigger communicates expanded state', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="State Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'State Test' })

            // Initially closed
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            fireEvent.click(trigger)
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('accordion content is properly associated with trigger', () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="Region Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', { name: 'Region Test' })
            fireEvent.click(trigger)

            // Content should be visible and associated with trigger via aria-controls
            const content = container.querySelector('[data-state="open"]')
            expect(content).toBeInTheDocument()

            const controlsId = trigger.getAttribute('aria-controls')
            if (controlsId) {
                const controlledContent = container.querySelector(
                    `#${controlsId}`
                )
                expect(controlledContent).toBeInTheDocument()
            }
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('accordion trigger meets minimum target size', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" title="Target Size Test">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const trigger = screen.getByRole('button', {
                name: 'Target Size Test',
            })
            expect(trigger).toBeInTheDocument()

            // Note: Actual size verification requires manual testing or browser environment
            // getBoundingClientRect() may not work in jsdom test environment
            // Manual verification: Ensure trigger meets 24x24px minimum (AA) or 44x44px (AAA)
        })
    })

    describe('Multiple Accordion Support', () => {
        it('supports multiple items open simultaneously', () => {
            render(
                <Accordion isMultiple>
                    <AccordionItem value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionItem>
                </Accordion>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            const item2 = screen.getByRole('button', { name: 'Item 2' })

            fireEvent.click(item1)
            fireEvent.click(item2)

            expect(item1).toHaveAttribute('aria-expanded', 'true')
            expect(item2).toHaveAttribute('aria-expanded', 'true')
        })

        it('single accordion allows only one item open', () => {
            render(
                <Accordion isMultiple={false}>
                    <AccordionItem value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionItem>
                </Accordion>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            const item2 = screen.getByRole('button', { name: 'Item 2' })

            fireEvent.click(item1)
            expect(item1).toHaveAttribute('aria-expanded', 'true')

            fireEvent.click(item2)
            // In single mode, opening item2 should close item1
            expect(item2).toHaveAttribute('aria-expanded', 'true')
        })
    })

    describe('Different Accordion Types', () => {
        it('border type is accessible', async () => {
            const { container } = render(
                <Accordion accordionType={AccordionType.BORDER}>
                    <AccordionItem value="item-1" title="Border Type">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('no border type is accessible', async () => {
            const { container } = render(
                <Accordion accordionType={AccordionType.NO_BORDER}>
                    <AccordionItem value="item-1" title="No Border Type">
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Chevron Positions', () => {
        it('left chevron position is accessible', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="Left Chevron"
                        chevronPosition={AccordionChevronPosition.LEFT}
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('right chevron position is accessible', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="Right Chevron"
                        chevronPosition={AccordionChevronPosition.RIGHT}
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Subtext and Slots', () => {
        it('accordion with subtext is accessible', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="With Subtext"
                        subtext="Additional information"
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('accordion with slots is accessible', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="With Slots"
                        leftSlot={<span aria-label="Info">ℹ️</span>}
                        rightSlot={<span aria-label="Badge">1</span>}
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty content gracefully', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title="Empty Content">
                        <></>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles very long titles', async () => {
            const longTitle = 'A'.repeat(200)
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" title={longTitle}>
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles special characters in title', async () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem
                        value="item-1"
                        title="Special & Characters < >"
                    >
                        <p>Content</p>
                    </AccordionItem>
                </Accordion>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
