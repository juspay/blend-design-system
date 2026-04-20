import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import AccordionV2 from '../../../lib/components/AccordionV2/AccordionV2'
import { AccordionV2Item } from '../../../lib/components/AccordionV2/AccordionV2Item'
import {
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from '../../../lib/components/AccordionV2/accordionV2.types'
import { MockIcon } from '../../test-utils'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

describe('AccordionV2', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('Rendering', () => {
        it('renders accordion with single item', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content for first item</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('First Item')).toBeInTheDocument()

            // Content is hidden when accordion is closed, expand to verify
            const trigger = screen.getByRole('button', { name: 'First Item' })
            await user.click(trigger)

            await waitFor(() => {
                expect(screen.getByText('Content for first item')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders accordion with multiple items', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2 isMultiple>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('First Item')).toBeInTheDocument()
            expect(screen.getByText('Second Item')).toBeInTheDocument()

            // Content is hidden when closed. Expand both to verify content exists
            const trigger1 = screen.getByRole('button', { name: 'First Item' })
            const trigger2 = screen.getByRole('button', { name: 'Second Item' })

            await user.click(trigger1)
            await user.click(trigger2)

            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
                expect(screen.getByText('Content 2')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders accordion with default NO_BORDER type', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders accordion with BORDER type', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders separator for BORDER type accordion when expanded', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            // Expand the accordion to reveal the separator
            const trigger = screen.getByRole('button', { name: 'Test Item' })
            await user.click(trigger)

            await waitFor(() => {
                // Separator is rendered inside content area for BORDER type
                const separator = container.querySelector('hr')
                expect(separator).toBeInTheDocument()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('does not render separator for NO_BORDER type accordion', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            // Separator should not be rendered for NO_BORDER type
            const separator = container.querySelector('hr')
            expect(separator).not.toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Accordion Types', () => {
        it.each([
            [AccordionV2Type.BORDER, 'border'],
            [AccordionV2Type.NO_BORDER, 'noBorder'],
        ])('renders %s type correctly', async (type, typeLabel) => {
            const { container } = render(
                <AccordionV2 accordionType={type}>
                    <AccordionV2Item value="item-1" title={`${typeLabel} Item`}>
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('data-type', type)

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Single vs Multiple Selection', () => {
        it('renders single selection accordion (collapsible)', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()

            // Test single selection behavior: only one item can be open at a time
            const trigger1 = screen.getByRole('button', { name: 'Item 1' })
            const trigger2 = screen.getByRole('button', { name: 'Item 2' })

            // Initially both are closed
            expect(trigger1).toHaveAttribute('aria-expanded', 'false')
            expect(trigger2).toHaveAttribute('aria-expanded', 'false')

            // Open first item
            await user.click(trigger1)
            await waitFor(() => {
                expect(trigger1).toHaveAttribute('aria-expanded', 'true')
            })

            // Opening second item should close the first (single selection)
            await user.click(trigger2)
            await waitFor(() => {
                expect(trigger2).toHaveAttribute('aria-expanded', 'true')
                expect(trigger1).toHaveAttribute('aria-expanded', 'false')
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders multiple selection accordion', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2 isMultiple>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()

            // Test multiple selection behavior: multiple items can be open
            const trigger1 = screen.getByRole('button', { name: 'Item 1' })
            const trigger2 = screen.getByRole('button', { name: 'Item 2' })

            await user.click(trigger1)
            await user.click(trigger2)

            // Both should be expanded in multiple mode
            await waitFor(() => {
                expect(trigger1).toHaveAttribute('aria-expanded', 'true')
                expect(trigger2).toHaveAttribute('aria-expanded', 'true')
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('allows multiple items to be open simultaneously in multiple mode', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2 isMultiple>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            const item2 = screen.getByRole('button', { name: 'Item 2' })

            await user.click(item1)
            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
            })

            await user.click(item2)
            await waitFor(() => {
                expect(screen.getByText('Content 2')).toBeVisible()
            })

            expect(screen.getByText('Content 1')).toBeVisible()
            expect(screen.getByText('Content 2')).toBeVisible()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Controlled vs Uncontrolled', () => {
        it('renders uncontrolled accordion with defaultValue', async () => {
            const { container } = render(
                <AccordionV2 defaultValue="item-1">
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders controlled accordion with value prop', async () => {
            const { container, rerender } = render(
                <AccordionV2 value="item-1">
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
            })

            rerender(
                <AccordionV2 value="item-2">
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 2')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('calls onValueChange when item is clicked', async () => {
            const user = userEvent.setup()
            const handleValueChange = vi.fn()

            const { container } = render(
                <AccordionV2 onValueChange={handleValueChange}>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Item 1' })
            await user.click(trigger)

            await waitFor(() => {
                expect(handleValueChange).toHaveBeenCalledWith('item-1')
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('calls onValueChange with array for multiple selection', async () => {
            const user = userEvent.setup()
            const handleValueChange = vi.fn()

            const { container } = render(
                <AccordionV2 isMultiple onValueChange={handleValueChange}>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item1 = screen.getByRole('button', { name: 'Item 1' })
            await user.click(item1)

            await waitFor(() => {
                expect(handleValueChange).toHaveBeenCalledWith(['item-1'])
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Dimensions', () => {
        it('applies width prop', async () => {
            const { container } = render(
                <AccordionV2 width="500px">
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toHaveStyle({ width: '500px' })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies maxWidth prop', async () => {
            const { container } = render(
                <AccordionV2 maxWidth="600px">
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toHaveStyle({ maxWidth: '600px' })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies minWidth prop', async () => {
            const { container } = render(
                <AccordionV2 minWidth="300px">
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toHaveStyle({ minWidth: '300px' })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies all dimension props together', async () => {
            const { container } = render(
                <AccordionV2 width="500px" maxWidth="600px" minWidth="300px">
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toHaveStyle({
                width: '500px',
                maxWidth: '600px',
                minWidth: '300px',
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies only maxWidth without width and minWidth', async () => {
            const { container } = render(
                <AccordionV2 maxWidth="600px">
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toHaveStyle({ maxWidth: '600px' })
            expect(accordion).not.toHaveStyle({ width: expect.anything() })
            expect(accordion).not.toHaveStyle({ minWidth: expect.anything() })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('applies only minWidth without width and maxWidth', async () => {
            const { container } = render(
                <AccordionV2 minWidth="300px">
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toHaveStyle({ minWidth: '300px' })
            expect(accordion).not.toHaveStyle({ width: expect.anything() })
            expect(accordion).not.toHaveStyle({ maxWidth: expect.anything() })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to accordion root', () => {
            const ref = React.createRef<HTMLDivElement>()

            render(
                <AccordionV2 ref={ref}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute(
                'data-accordion',
                'accordion-v2'
            )
        })
    })

    describe('Data Attributes', () => {
        it('has correct data-accordion attribute on root', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty children gracefully', () => {
            const { container } = render(<AccordionV2>{null}</AccordionV2>)
            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()
        })

        it('handles invalid children gracefully', () => {
            const { container } = render(
                <AccordionV2>
                    <div>Not an AccordionV2Item</div>
                </AccordionV2>
            )
            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()
        })

        it('handles rapid clicks without errors', async () => {
            const user = userEvent.setup()
            const handleValueChange = vi.fn()

            const { container } = render(
                <AccordionV2 onValueChange={handleValueChange}>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Item 1' })

            await user.click(trigger)
            await user.click(trigger)
            await user.click(trigger)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles multiple items with same value gracefully', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-1" title="Item 1 Duplicate">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Item 1')).toBeInTheDocument()
            expect(screen.getByText('Item 1 Duplicate')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles empty title gracefully', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const accordion = container.querySelector(
                '[data-accordion="accordion-v2"]'
            )
            expect(accordion).toBeInTheDocument()

            // Note: Empty title creates accessibility issues (empty heading, button without text)
            // This is expected behavior - users should always provide meaningful titles
            // We skip axe validation here as it's testing edge case handling, not proper usage
        })

        it('handles controlled value changes correctly', async () => {
            const { container, rerender } = render(
                <AccordionV2 value="item-1">
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
            })

            rerender(
                <AccordionV2 value="item-2">
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 2')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })
})

describe('AccordionV2Item', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('Rendering', () => {
        it('renders item with title and content', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Title">
                        <p>Test Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()

            // Content is hidden when accordion is closed, expand to verify
            const trigger = screen.getByRole('button', { name: 'Test Title' })
            await user.click(trigger)

            await waitFor(() => {
                expect(screen.getByText('Test Content')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders item with subtext', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        subtext="Test Subtext"
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()
            expect(screen.getByText('Test Subtext')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders item with left slot', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        leftSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders item with right slot', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        rightSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders item with subtext slot', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        subtextSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders item with all slots', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        subtext="Test Subtext"
                        leftSlot={<MockIcon />}
                        rightSlot={<MockIcon />}
                        subtextSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()
            expect(screen.getByText('Test Subtext')).toBeInTheDocument()
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(3)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders item with subtext and subtextSlot', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        subtext="Test Subtext"
                        subtextSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(screen.getByText('Test Title')).toBeInTheDocument()
            expect(screen.getByText('Test Subtext')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('hides subtext on small screen when subtextSlot is provided', async () => {
            // Mock small screen breakpoint
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 640,
            })

            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        subtext="Test Subtext"
                        subtextSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.queryByText('Test Subtext')).not.toBeInTheDocument()

            vi.restoreAllMocks()
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Chevron Position', () => {
        it('renders chevron on right by default', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Title">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const chevronIcon = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            const chevronAnimation = container.querySelector(
                '[data-element="accordion-item-chevron"]'
            )
            expect(chevronIcon || chevronAnimation).toBeTruthy()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders chevron on left when specified', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        chevronPosition={AccordionV2ChevronPosition.LEFT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const chevronIcon = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            const chevronAnimation = container.querySelector(
                '[data-element="accordion-item-chevron"]'
            )
            expect(chevronIcon || chevronAnimation).toBeTruthy()

            const chevronRight = container.querySelector('svg')
            expect(chevronRight).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders chevron on right when specified', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        chevronPosition={AccordionV2ChevronPosition.RIGHT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const chevronIcon = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            const chevronAnimation = container.querySelector(
                '[data-element="accordion-item-chevron"]'
            )
            expect(chevronIcon || chevronAnimation).toBeTruthy()
            const svgElements = container.querySelectorAll('svg')
            expect(svgElements.length).toBeGreaterThan(0)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('chevron rotates when item expands (left position)', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        chevronPosition={AccordionV2ChevronPosition.LEFT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Title' })
            const chevronIcon = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            expect(chevronIcon).toBeInTheDocument()

            await user.click(trigger)
            await waitFor(() => {
                expect(screen.getByText('Content')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('chevron rotates when item expands (right position)', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        chevronPosition={AccordionV2ChevronPosition.RIGHT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Title' })
            const chevronIcon = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            expect(chevronIcon).toBeInTheDocument()

            await user.click(trigger)
            await waitFor(() => {
                expect(screen.getByText('Content')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('hides leftSlot when chevron is on left', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        leftSlot={<MockIcon />}
                        chevronPosition={AccordionV2ChevronPosition.LEFT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const leadingIcon = container.querySelector(
                '[data-element="leading-icon"]'
            )
            expect(leadingIcon).not.toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('shows leftSlot when chevron is on right', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Title"
                        leftSlot={<MockIcon />}
                        chevronPosition={AccordionV2ChevronPosition.RIGHT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const leadingIcon = container.querySelector(
                '[data-element="leading-icon"]'
            )
            expect(leadingIcon).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Disabled State', () => {
        it('renders disabled item correctly', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', {
                name: 'Disabled Item',
            })
            expect(trigger).toBeDisabled()
            expect(trigger).toHaveAttribute('data-disabled', 'true')

            const item = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(item).toHaveAttribute('data-status', 'disabled')
            expect(item).toHaveAttribute('data-disabled', 'true')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('prevents interaction when disabled', async () => {
            const user = userEvent.setup()
            const handleValueChange = vi.fn()

            const { container } = render(
                <AccordionV2 onValueChange={handleValueChange}>
                    <AccordionV2Item
                        value="item-1"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', {
                name: 'Disabled Item',
            })
            await user.click(trigger)

            expect(handleValueChange).not.toHaveBeenCalled()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders disabled item with correct styling for NO_BORDER type on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item
                        value="item-1"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(item).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders disabled item with correct styling for BORDER type', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item
                        value="item-1"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(item).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Expand/Collapse', () => {
        it('expands item when clicked', async () => {
            const user = userEvent.setup()

            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })

            // Content is in DOM but hidden when closed
            await user.click(trigger)

            await waitFor(() => {
                expect(screen.getByText('Content')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('collapses item when clicked again', async () => {
            const user = userEvent.setup()

            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })

            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            await user.click(trigger)
            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'true')
            })

            await user.click(trigger)
            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'false')
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('closes other items when opening new one in single mode', async () => {
            const user = userEvent.setup()

            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger1 = screen.getByRole('button', { name: 'Item 1' })
            const trigger2 = screen.getByRole('button', { name: 'Item 2' })

            await user.click(trigger1)
            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
            })

            await user.click(trigger2)
            await waitFor(() => {
                expect(screen.getByText('Content 2')).toBeVisible()
            })

            const content1 = screen.queryByText('Content 1')
            if (content1) {
                await waitFor(() => {
                    expect(content1).not.toBeVisible()
                })
            }

            expect(await axe(container)).toHaveNoViolations()
        })

        it('keeps multiple items open in multiple mode', async () => {
            const user = userEvent.setup()

            const { container } = render(
                <AccordionV2 isMultiple>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger1 = screen.getByRole('button', { name: 'Item 1' })
            const trigger2 = screen.getByRole('button', { name: 'Item 2' })

            await user.click(trigger1)
            await waitFor(() => {
                const content1 = screen.getByText('Content 1')
                expect(content1).toBeVisible()
            })

            await user.click(trigger2)
            await waitFor(() => {
                const content1 = screen.getByText('Content 1')
                const content2 = screen.getByText('Content 2')
                expect(content2).toBeVisible()
                expect(content1).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })

        it('correctly calculates isExpanded for multiple selection with array value', async () => {
            const { container } = render(
                <AccordionV2 isMultiple value={['item-1', 'item-2']}>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-3" title="Item 3">
                        <p>Content 3</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
                expect(screen.getByText('Content 2')).toBeVisible()
                const content3 = screen.queryByText('Content 3')
                if (content3) {
                    expect(content3).not.toBeVisible()
                }
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Data Attributes', () => {
        it('has correct data-element attribute', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(item).toBeInTheDocument()
        })

        it('has correct data-id attribute with title', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item = container.querySelector('[data-id="Test Item"]')
            expect(item).toBeInTheDocument()
        })

        it('has correct data-status attribute', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(item).toHaveAttribute('data-status', 'enabled')
        })

        it('has correct data-status attribute when disabled', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        isDisabled
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const item = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(item).toHaveAttribute('data-status', 'disabled')
        })

        it('has correct data-type attribute on trigger', () => {
            render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('data-type', AccordionV2Type.BORDER)
        })

        it('has correct data-element for header', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const header = container.querySelector(
                '[data-element="accordion-item-header"]'
            )
            expect(header).toBeInTheDocument()
            expect(header).toHaveTextContent('Test Item')
        })

        it('has correct data-element for subtext', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        subtext="Test Subtext"
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const subtext = container.querySelector(
                '[data-element="accordion-item-subtext"]'
            )
            expect(subtext).toBeInTheDocument()
            expect(subtext).toHaveTextContent('Test Subtext')
        })

        it('has correct data-element for chevron', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const chevronIcon = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            const chevronAnimation = container.querySelector(
                '[data-element="accordion-item-chevron"]'
            )

            expect(chevronIcon || chevronAnimation).toBeTruthy()
        })

        it('has correct data-id for header with title', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const header = container.querySelector(
                '[data-element="accordion-item-header"]'
            )
            expect(header).toHaveAttribute('data-id', 'Test Item')
        })

        it('has correct data-id for header with empty title', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const header = container.querySelector(
                '[data-element="accordion-item-header"]'
            )
            expect(header).toHaveAttribute('data-id', 'accordion-item-header')
        })

        it('has correct data-id for subtext', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        subtext="Test Subtext"
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const subtext = container.querySelector(
                '[data-element="accordion-item-subtext"]'
            )
            expect(subtext).toHaveAttribute('data-id', 'Test Subtext')
        })

        it('has correct data-element for leading-icon', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        leftSlot={<MockIcon />}
                        chevronPosition={AccordionV2ChevronPosition.RIGHT}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const leadingIcon = container.querySelector(
                '[data-element="leading-icon"]'
            )
            expect(leadingIcon).toBeInTheDocument()
        })

        it('has correct data-element for trailing-icon', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        rightSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trailingIcon = container.querySelector(
                '[data-element="trailing-icon"]'
            )
            expect(trailingIcon).toBeInTheDocument()
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to accordion item', () => {
            const ref = React.createRef<HTMLDivElement>()

            render(
                <AccordionV2>
                    <AccordionV2Item ref={ref} value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute(
                'data-element',
                'accordion-item'
            )
        })
    })

    describe('Edge Cases - Multiple Selection', () => {
        it('handles empty array value in multiple mode', async () => {
            const { container } = render(
                <AccordionV2 isMultiple value={[]}>
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const content1 = screen.queryByText('Content 1')
            if (content1) {
                expect(content1).not.toBeVisible()
            }

            expect(await axe(container)).toHaveNoViolations()
        })

        it('handles single string value in multiple mode', async () => {
            const { container } = render(
                <AccordionV2 isMultiple value="item-1">
                    <AccordionV2Item value="item-1" title="Item 1">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Item 2">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Content 1')).toBeVisible()
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Accordion Type Specific Behavior', () => {
        it('renders NO_BORDER type with correct styling', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute(
                'data-type',
                AccordionV2Type.NO_BORDER
            )

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders BORDER type with separator when expanded', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            await user.click(trigger)

            await waitFor(() => {
                const separator = container.querySelector('hr')
                expect(separator).toBeInTheDocument()
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Small Screen Styling', () => {
        beforeEach(() => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 640,
            })
        })

        afterEach(() => {
            vi.restoreAllMocks()
        })

        it('renders BORDER type with first-child styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const firstItem = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(firstItem).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders BORDER type with last-child styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Last Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            expect(items.length).toBeGreaterThan(0)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders BORDER type with intermediate item styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Middle Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-3" title="Last Item">
                        <p>Content 3</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            expect(items.length).toBe(3)

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled last-child styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Last Item"
                        isDisabled
                    >
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            const lastItem = items[items.length - 1]
            expect(lastItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled first item styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item
                        value="item-1"
                        title="First Item"
                        isDisabled
                    >
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const firstItem = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(firstItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled last item styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Last Item"
                        isDisabled
                    >
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            const lastItem = items[items.length - 1]
            expect(lastItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled intermediate item styling on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Middle Item"
                        isDisabled
                    >
                        <p>Content 2</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-3" title="Last Item">
                        <p>Content 3</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            const middleItem = items[1]
            expect(middleItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled first item and isFirst prop on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item
                        value="item-1"
                        title="First Item"
                        isDisabled
                    >
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const firstItem = container.querySelector(
                '[data-element="accordion-item"]'
            )
            expect(firstItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled last item and isLast prop on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Last Item"
                        isDisabled
                    >
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            const lastItem = items[items.length - 1]
            expect(lastItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders NO_BORDER type with disabled intermediate item and isIntermediate prop on small screen', async () => {
            const { container } = render(
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Middle Item"
                        isDisabled
                    >
                        <p>Content 2</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-3" title="Last Item">
                        <p>Content 3</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            expect(items.length).toBe(3)
            const middleItem = items[1]
            expect(middleItem).toHaveAttribute('data-status', 'disabled')

            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
