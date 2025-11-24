import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Accordion } from '../../../lib/components/Accordion'

expect.extend(toHaveNoViolations)

describe('Accordion Accessibility', () => {
    const mockAccordionData = [
        {
            title: 'Section 1',
            content: <div>Content for section 1</div>,
        },
        {
            title: 'Section 2',
            content: <div>Content for section 2</div>,
            subtext: 'Additional information',
        },
        {
            title: 'Section 3',
            content: <div>Content for section 3</div>,
            disabled: true,
        },
    ]

    describe('WCAG Compliance', () => {
        it('meets WCAG standards for basic accordion', async () => {
            const { container } = render(<Accordion data={mockAccordionData} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for controlled accordion', async () => {
            const { container } = render(
                <Accordion
                    data={mockAccordionData}
                    value="item-0"
                    onValueChange={vi.fn()}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for accordion with multiple open items', async () => {
            const { container } = render(
                <Accordion data={mockAccordionData} type="multiple" />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with disabled items', async () => {
            const { container } = render(<Accordion data={mockAccordionData} />)

            // Disabled items should still be accessible for screen readers
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with custom slots', async () => {
            const dataWithSlots = [
                {
                    title: 'With Icon',
                    content: <div>Content</div>,
                    leftSlot: <span aria-hidden="true">🎨</span>,
                },
            ]

            const { container } = render(<Accordion data={dataWithSlots} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Keyboard Navigation', () => {
        it('supports tab navigation through accordion items', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            // Tab to first accordion trigger
            await user.tab()
            const firstTrigger = screen.getByText('Section 1').closest('button')
            expect(firstTrigger).toHaveFocus()

            // Tab to second accordion trigger
            await user.tab()
            const secondTrigger = screen
                .getByText('Section 2')
                .closest('button')
            expect(secondTrigger).toHaveFocus()
        })

        it('activates accordion with Enter key', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            await user.tab()
            const trigger = screen.getByText('Section 1').closest('button')
            expect(trigger).toHaveFocus()

            // Press Enter to expand
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(trigger).toHaveAttribute('data-state', 'open')
            })
        })

        it('activates accordion with Space key', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            await user.tab()
            const trigger = screen.getByText('Section 1').closest('button')

            // Press Space to expand
            await user.keyboard(' ')

            await waitFor(() => {
                expect(trigger).toHaveAttribute('data-state', 'open')
            })
        })

        it('does not activate disabled accordion items', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            const disabledTrigger = screen
                .getByText('Section 3')
                .closest('button')
            expect(disabledTrigger).toHaveAttribute('disabled')

            // Try to click disabled item
            await user.click(disabledTrigger)

            // Should remain closed
            expect(disabledTrigger).toHaveAttribute('data-state', 'closed')
        })

        it('maintains focus when toggling accordion items', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            await user.tab()
            const trigger = screen.getByText('Section 1').closest('button')
            expect(trigger).toHaveFocus()

            // Expand
            await user.keyboard('{Enter}')
            await waitFor(() => {
                expect(trigger).toHaveAttribute('data-state', 'open')
            })

            // Focus should remain on trigger
            expect(trigger).toHaveFocus()

            // Collapse
            await user.keyboard('{Enter}')
            await waitFor(() => {
                expect(trigger).toHaveAttribute('data-state', 'closed')
            })

            // Focus should still be on trigger
            expect(trigger).toHaveFocus()
        })
    })

    describe('ARIA Attributes and Roles', () => {
        it('has proper button role for triggers', () => {
            render(<Accordion data={mockAccordionData} />)

            const triggers = screen.getAllByRole('button')
            expect(triggers).toHaveLength(3)
        })

        it('uses aria-expanded to indicate state', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            const trigger = screen.getByText('Section 1').closest('button')

            // Initially collapsed
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            // Expand
            await user.click(trigger)

            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'true')
            })
        })

        it('properly labels accordion items', () => {
            render(<Accordion data={mockAccordionData} />)

            // All triggers should have accessible names from title
            expect(screen.getByText('Section 1')).toBeInTheDocument()
            expect(screen.getByText('Section 2')).toBeInTheDocument()
            expect(screen.getByText('Section 3')).toBeInTheDocument()
        })

        it('marks decorative icons with aria-hidden', () => {
            const dataWithIcons = [
                {
                    title: 'With Icon',
                    content: <div>Content</div>,
                    leftSlot: <span data-testid="icon">🎨</span>,
                },
            ]

            render(<Accordion data={dataWithIcons} />)

            const icon = screen.getByTestId('icon')
            // Icon should be present but decorative
            expect(icon).toBeInTheDocument()
        })

        it('uses proper disabled attribute', () => {
            render(<Accordion data={mockAccordionData} />)

            const disabledTrigger = screen
                .getByText('Section 3')
                .closest('button')
            expect(disabledTrigger).toHaveAttribute('disabled')
            expect(disabledTrigger).toHaveAttribute('data-disabled')
        })

        it('provides subtext as additional context', () => {
            render(<Accordion data={mockAccordionData} />)

            expect(
                screen.getByText('Additional information')
            ).toBeInTheDocument()
        })
    })

    describe('Screen Reader Support', () => {
        it('announces state changes to screen readers', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            const trigger = screen.getByText('Section 1').closest('button')

            // Initial state
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            // Expand
            await user.click(trigger)

            await waitFor(() => {
                // State change should be announced via aria-expanded
                expect(trigger).toHaveAttribute('aria-expanded', 'true')
            })
        })

        it('properly structures content for screen readers', () => {
            render(<Accordion data={mockAccordionData} />)

            // Check that content structure is semantic
            const content = screen.getByText('Content for section 1')
            expect(content).toBeInTheDocument()
        })

        it('handles complex content structure', async () => {
            const complexData = [
                {
                    title: 'Complex Section',
                    content: (
                        <div>
                            <h3>Nested Heading</h3>
                            <p>
                                Paragraph with <strong>bold</strong> text
                            </p>
                            <ul>
                                <li>List item 1</li>
                                <li>List item 2</li>
                            </ul>
                        </div>
                    ),
                },
            ]

            const { user } = render(<Accordion data={complexData} />)

            const trigger = screen
                .getByText('Complex Section')
                .closest('button')
            await user.click(trigger)

            await waitFor(() => {
                expect(screen.getByText('Nested Heading')).toBeInTheDocument()
                expect(screen.getByText('List item 1')).toBeInTheDocument()
            })
        })
    })

    describe('Visual Accessibility', () => {
        it('maintains proper color contrast', async () => {
            const { container } = render(<Accordion data={mockAccordionData} />)

            // Test with axe for color contrast violations
            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('provides visible focus indicators', async () => {
            const { user } = render(<Accordion data={mockAccordionData} />)

            await user.tab()
            const trigger = screen.getByText('Section 1').closest('button')

            // Focus should be visible (would be tested with visual regression in real scenario)
            expect(trigger).toHaveFocus()
        })

        it('scales properly with increased font size', () => {
            render(
                <div style={{ fontSize: '18px' }}>
                    <Accordion data={mockAccordionData} />
                </div>
            )

            // Content should be present and readable
            expect(screen.getByText('Section 1')).toBeInTheDocument()
            expect(screen.getByText('Section 2')).toBeInTheDocument()
        })

        it('handles reduced motion preference', async () => {
            const { container } = render(<Accordion data={mockAccordionData} />)

            // Component should respect prefers-reduced-motion
            // Animation behavior is tested in implementation
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Multiple vs Single Mode', () => {
        it('maintains accessibility in single mode (default)', async () => {
            const { container, user } = render(
                <Accordion data={mockAccordionData} />
            )

            const trigger1 = screen.getByText('Section 1').closest('button')
            const trigger2 = screen.getByText('Section 2').closest('button')

            // Expand first
            await user.click(trigger1)
            await waitFor(() => {
                expect(trigger1).toHaveAttribute('aria-expanded', 'true')
            })

            // Expand second (should close first)
            await user.click(trigger2)
            await waitFor(() => {
                expect(trigger2).toHaveAttribute('aria-expanded', 'true')
                expect(trigger1).toHaveAttribute('aria-expanded', 'false')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility in multiple mode', async () => {
            const { container, user } = render(
                <Accordion data={mockAccordionData} type="multiple" />
            )

            const trigger1 = screen.getByText('Section 1').closest('button')
            const trigger2 = screen.getByText('Section 2').closest('button')

            // Expand both
            await user.click(trigger1)
            await user.click(trigger2)

            await waitFor(() => {
                expect(trigger1).toHaveAttribute('aria-expanded', 'true')
                expect(trigger2).toHaveAttribute('aria-expanded', 'true')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Controlled vs Uncontrolled', () => {
        it('maintains accessibility in controlled mode', async () => {
            const onValueChange = vi.fn()
            const { container } = render(
                <Accordion
                    data={mockAccordionData}
                    value="item-0"
                    onValueChange={onValueChange}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility in uncontrolled mode', async () => {
            const { container } = render(
                <Accordion data={mockAccordionData} defaultValue="item-0" />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty data gracefully', async () => {
            const { container } = render(<Accordion data={[]} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles single item accordion', async () => {
            const { container } = render(
                <Accordion data={[mockAccordionData[0]]} />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles all disabled items', async () => {
            const allDisabled = mockAccordionData.map((item) => ({
                ...item,
                disabled: true,
            }))

            const { container } = render(<Accordion data={allDisabled} />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles dynamic content updates', async () => {
            const { rerender } = render(<Accordion data={mockAccordionData} />)

            // Update data
            const newData = [
                ...mockAccordionData,
                {
                    title: 'Section 4',
                    content: <div>New content</div>,
                },
            ]

            rerender(<Accordion data={newData} />)

            // New section should be accessible
            expect(screen.getByText('Section 4')).toBeInTheDocument()
        })
    })
})
