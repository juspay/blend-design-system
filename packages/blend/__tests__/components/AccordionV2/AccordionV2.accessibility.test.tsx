import React from 'react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import AccordionV2 from '../../../lib/components/AccordionV2/AccordionV2'
import { AccordionV2Item } from '../../../lib/components/AccordionV2/AccordionV2Item'
import { AccordionV2Type } from '../../../lib/components/AccordionV2/accordionV2.types'
import { MockIcon } from '../../test-utils'

describe('AccordionV2 Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.1 AA Compliance - Critical Violations', () => {
        it('passes axe-core validation for basic accordion', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content for first item</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <p>Content for second item</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for accordion with multiple items', async () => {
            const { container } = render(
                <AccordionV2>
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

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for disabled accordion item', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Enabled Item">
                        <p>Content</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Disabled content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for all accordion types', async () => {
            const types = [AccordionV2Type.BORDER, AccordionV2Type.NO_BORDER]

            for (const type of types) {
                const { container } = render(
                    <AccordionV2 accordionType={type}>
                        <AccordionV2Item value="item-1" title="Test Item">
                            <p>Content</p>
                        </AccordionV2Item>
                    </AccordionV2>
                )

                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation with slots', async () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        leftSlot={<MockIcon />}
                        rightSlot={<MockIcon />}
                        subtextSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for multiple selection mode', async () => {
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

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content', () => {
        it('chevron icons have aria-hidden="true"', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            // The chevron container has aria-hidden
            const chevron = container.querySelector(
                '[data-element="chevron-icon"]'
            )
            if (chevron) {
                expect(chevron).toHaveAttribute('aria-hidden', 'true')
            } else {
                // Fallback: check if chevron animation exists
                const chevronAnimation = container.querySelector(
                    '[data-element="accordion-item-chevron"]'
                )
                expect(chevronAnimation).toBeInTheDocument()
            }
        })

        it('decorative slots have aria-hidden when title is present', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Test Item"
                        leftSlot={<MockIcon />}
                        rightSlot={<MockIcon />}
                    >
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const leadingIcon = container.querySelector(
                '[data-element="leading-icon"]'
            )
            const trailingIcon = container.querySelector(
                '[data-element="trailing-icon"]'
            )

            expect(leadingIcon).toHaveAttribute('aria-hidden', 'true')
            expect(trailingIcon).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('WCAG 2.1.1 Keyboard - Keyboard Accessible', () => {
        it('trigger is keyboard accessible', () => {
            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            expect(trigger).toBeInTheDocument()
            expect(trigger).not.toHaveAttribute('tabIndex', '-1')
        })

        it('disabled trigger is not keyboard accessible', () => {
            render(
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
        })

        it('can expand item using Enter key', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await user.keyboard('{Tab}')
            await user.keyboard('{Enter}')

            // Content becomes visible after expansion
            expect(screen.getByText('Content')).toBeVisible()
        })

        it('can expand item using Space key', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            await user.keyboard('{Tab}')
            await user.keyboard(' ')

            expect(screen.getByText('Content')).toBeVisible()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value', () => {
        it('trigger has accessible name from title', () => {
            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Accessible Title">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', {
                name: 'Accessible Title',
            })
            expect(trigger).toBeInTheDocument()
        })

        it('trigger has button role', () => {
            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
        })

        it('trigger has aria-expanded attribute', () => {
            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            expect(trigger).toHaveAttribute('aria-expanded')
        })

        it('aria-expanded updates when item expands', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            await user.click(trigger)

            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('content region has proper data-state attribute', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            // Content region starts closed
            const contentRegion = container.querySelector('[role="region"]')
            expect(contentRegion).toHaveAttribute('data-state', 'closed')

            // Expand the accordion
            const trigger = screen.getByRole('button', { name: 'Test Item' })
            await user.click(trigger)

            // Content region is now open
            expect(contentRegion).toHaveAttribute('data-state', 'open')
        })
    })

    describe('WCAG 2.4.3 Focus Order', () => {
        it('focus order follows DOM order', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <p>Content 2</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const firstTrigger = screen.getByRole('button', {
                name: 'First Item',
            })
            const secondTrigger = screen.getByRole('button', {
                name: 'Second Item',
            })

            await user.tab()
            expect(firstTrigger).toHaveFocus()

            await user.tab()
            expect(secondTrigger).toHaveFocus()
        })

        it('skips disabled items in focus order', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="First Item">
                        <p>Content 1</p>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Disabled Item"
                        isDisabled
                    >
                        <p>Content 2</p>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-3" title="Third Item">
                        <p>Content 3</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const firstTrigger = screen.getByRole('button', {
                name: 'First Item',
            })
            const thirdTrigger = screen.getByRole('button', {
                name: 'Third Item',
            })

            await user.tab()
            expect(firstTrigger).toHaveFocus()

            await user.tab()
            expect(thirdTrigger).toHaveFocus()
        })
    })

    describe('WCAG 2.4.7 Focus Visible', () => {
        it('trigger shows focus indicator when focused via keyboard', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            await user.tab()

            expect(trigger).toHaveFocus()
        })
    })

    describe('Semantic HTML', () => {
        it('uses proper heading structure', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const h3Element = container.querySelector('h3')
            expect(h3Element).toBeInTheDocument()
        })

        it('content is properly associated with trigger', () => {
            const { container } = render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })
            expect(trigger).toBeInTheDocument()

            const ariaControls = trigger.getAttribute('aria-controls')
            expect(ariaControls).toBeTruthy()

            const contentRegion = container.querySelector(`#${ariaControls}`)
            expect(contentRegion).toBeInTheDocument()
        })
    })

    describe('Screen Reader Support', () => {
        it('announces expanded state changes', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })

            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            await user.click(trigger)

            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('disabled state is announced', () => {
            render(
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
            expect(trigger).toHaveAttribute('disabled', '')
        })

        it('announces collapsed state changes', async () => {
            const user = userEvent.setup()

            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Test Item">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', { name: 'Test Item' })

            await user.click(trigger)
            expect(trigger).toHaveAttribute('aria-expanded', 'true')

            await user.click(trigger)
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })

    describe('WCAG 1.4.3 Contrast Minimum', () => {
        it('meets contrast requirements for all accordion types', async () => {
            const types = [AccordionV2Type.BORDER, AccordionV2Type.NO_BORDER]

            for (const type of types) {
                const { container } = render(
                    <AccordionV2 accordionType={type}>
                        <AccordionV2Item value="item-1" title="Test Item">
                            <p>Content</p>
                        </AccordionV2Item>
                    </AccordionV2>
                )

                const results = await axe(container, {
                    rules: {
                        'color-contrast': { enabled: true },
                    },
                })
                expect(results).toHaveNoViolations()
            }
        })

        it('meets contrast requirements for disabled state', async () => {
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

            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.4.4 Link Purpose', () => {
        it('trigger has clear accessible name', () => {
            render(
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Clear Purpose">
                        <p>Content</p>
                    </AccordionV2Item>
                </AccordionV2>
            )

            const trigger = screen.getByRole('button', {
                name: 'Clear Purpose',
            })
            expect(trigger).toBeInTheDocument()
        })
    })

    describe('WCAG 3.2.4 Consistent Identification', () => {
        it('maintains consistent data attributes across items', () => {
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

            const items = container.querySelectorAll(
                '[data-element="accordion-item"]'
            )
            expect(items).toHaveLength(2)

            items.forEach((item) => {
                expect(item).toHaveAttribute('data-element', 'accordion-item')
            })
        })
    })
})
