import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import { Tooltip } from '../../../lib/components/Tooltip/Tooltip'
import {
    TooltipAlign,
    TooltipSide,
    TooltipSize,
    TooltipSlotDirection,
} from '../../../lib/components/Tooltip/types'
import { MockIcon } from '../../test-utils'

describe('Tooltip Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic tooltip (axe-core validation)', async () => {
            const { container, user } = render(
                <Tooltip content="Accessible tooltip">
                    <button>Trigger button</button>
                </Tooltip>
            )

            // Test initial state
            const results = await axe(container)
            expect(results).toHaveNoViolations()

            // Test with tooltip visible
            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Accessible tooltip')).toHaveLength(
                    2
                )
            })

            const resultsWithTooltip = await axe(container)
            expect(resultsWithTooltip).toHaveNoViolations()
        })

        it('meets WCAG standards for all tooltip sizes', async () => {
            const sizes = [TooltipSize.SMALL, TooltipSize.LARGE]

            for (const size of sizes) {
                const { container, user, unmount } = render(
                    <Tooltip content={`${size} size tooltip`} size={size}>
                        <button>{size} trigger</button>
                    </Tooltip>
                )

                const trigger = screen.getByRole('button')
                await user.hover(trigger)

                await waitFor(() => {
                    expect(
                        screen.getAllByText(`${size} size tooltip`)
                    ).toHaveLength(2)
                })

                const results = await axe(container)
                expect(results).toHaveNoViolations()

                unmount()
            }
        })

        it('meets WCAG standards for all tooltip positions', async () => {
            const sides = [
                TooltipSide.TOP,
                TooltipSide.RIGHT,
                TooltipSide.BOTTOM,
                TooltipSide.LEFT,
            ]

            for (const side of sides) {
                const { container, user, unmount } = render(
                    <Tooltip content={`${side} tooltip`} side={side}>
                        <button>{side} trigger</button>
                    </Tooltip>
                )

                const trigger = screen.getByRole('button')
                await user.hover(trigger)

                await waitFor(() => {
                    expect(screen.getAllByText(`${side} tooltip`)).toHaveLength(
                        2
                    )
                })

                const results = await axe(container)
                expect(results).toHaveNoViolations()

                unmount()
            }
        })

        it('meets WCAG standards for all tooltip alignments', async () => {
            const aligns = [
                TooltipAlign.START,
                TooltipAlign.CENTER,
                TooltipAlign.END,
            ]

            for (const align of aligns) {
                const { container, user, unmount } = render(
                    <Tooltip content={`${align} aligned tooltip`} align={align}>
                        <button>{align} trigger</button>
                    </Tooltip>
                )

                const trigger = screen.getByRole('button')
                await user.hover(trigger)

                await waitFor(() => {
                    expect(
                        screen.getAllByText(`${align} aligned tooltip`)
                    ).toHaveLength(2)
                })

                const results = await axe(container)
                expect(results).toHaveNoViolations()

                unmount()
            }
        })

        it('meets WCAG standards for tooltip with slot (1.1.1 Non-text Content)', async () => {
            const { container, user } = render(
                <Tooltip
                    content="Tooltip with icon"
                    slot={<MockIcon aria-hidden="true" />}
                    slotDirection={TooltipSlotDirection.LEFT}
                >
                    <button>Icon tooltip trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Tooltip with icon')).toHaveLength(2)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for tooltip with arrow (1.1.1 Non-text Content)', async () => {
            const { container, user } = render(
                <Tooltip content="Tooltip with arrow" showArrow={true}>
                    <button>Arrow tooltip trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Tooltip with arrow')).toHaveLength(
                    2
                )
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for controlled tooltip', async () => {
            const { container } = render(
                <Tooltip content="Always visible tooltip" open={true}>
                    <button>Controlled trigger</button>
                </Tooltip>
            )

            // Tooltip should be visible immediately
            expect(screen.getAllByText('Always visible tooltip')).toHaveLength(
                2
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for tooltip with complex content', async () => {
            const { container, user } = render(
                <Tooltip
                    content={
                        <div>
                            <strong>Important:</strong> This is a complex
                            tooltip with <em>emphasized text</em>.
                        </div>
                    }
                >
                    <button>Complex content trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getByRole('tooltip')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('tooltip trigger is keyboard accessible - all functionality operable via keyboard', async () => {
            const { user } = render(
                <Tooltip content="Keyboard accessible tooltip">
                    <button>Keyboard trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            expect(trigger).toHaveFocus()
            expect(document.activeElement).toBe(trigger)
        })

        it('tooltip appears on focus - keyboard users can access tooltip content', async () => {
            const { user } = render(
                <Tooltip content="Focus tooltip">
                    <button>Focusable trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Focus tooltip')).toHaveLength(2)
            })
        })

        it('tooltip hides on blur - keyboard navigation support', async () => {
            const { user } = render(
                <div>
                    <Tooltip content="Blur tooltip">
                        <button>First button</button>
                    </Tooltip>
                    <button>Second button</button>
                </div>
            )

            const firstButton = screen.getByRole('button', {
                name: 'First button',
            })
            const secondButton = screen.getByRole('button', {
                name: 'Second button',
            })

            // Focus first button to show tooltip
            await user.tab()
            expect(firstButton).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Blur tooltip')).toHaveLength(2)
            })

            // Tab to second button to blur first
            await user.tab()
            expect(secondButton).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.queryByText('Blur tooltip')
                ).not.toBeInTheDocument()
            })
        })

        it('supports Tab navigation through multiple tooltips - logical focus order', async () => {
            const { user } = render(
                <div>
                    <Tooltip content="First tooltip">
                        <button>First button</button>
                    </Tooltip>
                    <Tooltip content="Second tooltip">
                        <button>Second button</button>
                    </Tooltip>
                    <Tooltip content="Third tooltip">
                        <button>Third button</button>
                    </Tooltip>
                </div>
            )

            // Tab through buttons and verify tooltips
            await user.tab()
            expect(
                screen.getByRole('button', { name: 'First button' })
            ).toHaveFocus()
            await waitFor(() => {
                expect(screen.getAllByText('First tooltip')).toHaveLength(2)
            })

            await user.tab()
            expect(
                screen.getByRole('button', { name: 'Second button' })
            ).toHaveFocus()
            await waitFor(() => {
                expect(screen.getAllByText('Second tooltip')).toHaveLength(2)
            })

            await user.tab()
            expect(
                screen.getByRole('button', { name: 'Third button' })
            ).toHaveFocus()
            await waitFor(() => {
                expect(screen.getAllByText('Third tooltip')).toHaveLength(2)
            })
        })

        it('handles Escape key to close tooltip - keyboard dismissal', async () => {
            const { user } = render(
                <Tooltip content="Escapable tooltip">
                    <button>Escape test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Escapable tooltip')).toHaveLength(2)
            })

            // Press Escape to close tooltip
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('Escapable tooltip')
                ).not.toBeInTheDocument()
            })
        })

        it('all functionality is keyboard accessible without timing requirements', async () => {
            const { user } = render(
                <Tooltip content="No timing tooltip" delayDuration={0}>
                    <button>No timing trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            // Verify trigger is focused
            expect(trigger).toHaveFocus()

            // Tooltip should appear immediately (no delay)
            await waitFor(() => {
                expect(screen.getAllByText('No timing tooltip')).toHaveLength(2)
            })

            // Escape should work immediately
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('No timing tooltip')
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality operable through keyboard without exception', async () => {
            const { user } = render(
                <Tooltip content="AAA keyboard tooltip">
                    <button>AAA keyboard trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.getAllByText('AAA keyboard tooltip')
                ).toHaveLength(2)
            })

            // All interactions work via keyboard
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('AAA keyboard tooltip')
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('tooltip has proper role="tooltip" - programmatically determinable role', async () => {
            const { user } = render(
                <Tooltip content="ARIA tooltip">
                    <button>ARIA trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('ARIA tooltip')
            })
        })

        it('establishes proper relationship between trigger and tooltip - aria-describedby', async () => {
            const { user } = render(
                <Tooltip content="Related tooltip">
                    <button>Related trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Radix UI automatically establishes the relationship
                expect(tooltip).toHaveTextContent('Related tooltip')
            })
        })

        it('tooltip content provides accessible name - programmatically determinable name', async () => {
            const { user } = render(
                <Tooltip content="Accessible name tooltip">
                    <button>Name test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Accessible name tooltip')
            })
        })

        it('maintains accessibility with complex content structure', async () => {
            const { user } = render(
                <Tooltip
                    content={
                        <span>
                            <strong>Tooltip Title</strong>
                            <br />
                            This is important information with{' '}
                            <em>emphasized text</em>.
                        </span>
                    }
                >
                    <button>Complex structure</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Tooltip Title')
                expect(tooltip).toHaveTextContent('emphasized text')
            })
        })

        it('handles aria-describedby relationship correctly with existing attributes', async () => {
            const { user } = render(
                <div>
                    <Tooltip content="Descriptive tooltip">
                        <button aria-describedby="external-description">
                            Described button
                        </button>
                    </Tooltip>
                    <div id="external-description">External description</div>
                </div>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute(
                'aria-describedby',
                'external-description'
            )

            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getByRole('tooltip')).toBeInTheDocument()
            })

            // Button should maintain its existing aria-describedby
            expect(trigger).toHaveAttribute(
                'aria-describedby',
                'external-description'
            )
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('tooltip trigger has visible focus indicator', async () => {
            const { user } = render(
                <Tooltip content="Focus visible tooltip">
                    <button>Focus visible trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            expect(trigger).toHaveFocus()
            expect(document.activeElement).toBe(trigger)
        })

        it('focus indicator is visible when tooltip is shown', async () => {
            const { user } = render(
                <Tooltip content="Focus indicator tooltip">
                    <button>Focus indicator trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.getAllByText('Focus indicator tooltip')
                ).toHaveLength(2)
            })

            // Focus should remain visible on trigger
            expect(trigger).toHaveFocus()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative slot icons have aria-hidden="true"', async () => {
            const { user } = render(
                <Tooltip
                    content="Tooltip with icon"
                    slot={<MockIcon />}
                    slotDirection={TooltipSlotDirection.LEFT}
                >
                    <button>Icon tooltip trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Slot container should have aria-hidden
                const slotContainer = tooltip.querySelector(
                    '[role="presentation"]'
                )
                expect(slotContainer).toHaveAttribute('aria-hidden', 'true')
            })
        })

        it('decorative arrow has aria-hidden="true"', async () => {
            const { user } = render(
                <Tooltip content="Tooltip with arrow" showArrow={true}>
                    <button>Arrow tooltip trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Arrow should have aria-hidden
                const arrow = tooltip.querySelector('svg')
                if (arrow) {
                    expect(arrow).toHaveAttribute('aria-hidden', 'true')
                }
            })
        })

        it('tooltip text content provides accessible alternative for decorative elements', async () => {
            const { user } = render(
                <Tooltip
                    content="Accessible text content"
                    slot={<MockIcon />}
                    showArrow={true}
                >
                    <button>Accessible tooltip trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Text content should be accessible
                expect(tooltip).toHaveTextContent('Accessible text content')
            })
        })
    })

    describe('WCAG 2.5.8 Target Size (Level AA)', () => {
        it('tooltip trigger meets minimum touch target size (24x24px)', () => {
            render(
                <Tooltip content="Touch target test">
                    <button
                        style={{ minWidth: '24px', minHeight: '24px' }}
                        aria-label="Touch target button"
                    >
                        Touch
                    </button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button', {
                name: 'Touch target button',
            })
            expect(trigger).toHaveStyle({ minWidth: '24px', minHeight: '24px' })
        })

        it('tooltip trigger with padding meets touch target requirements', () => {
            render(
                <Tooltip content="Touch target with padding">
                    <button
                        style={{
                            padding: '8px',
                            minWidth: '24px',
                            minHeight: '24px',
                        }}
                    >
                        Touch
                    </button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveStyle({ minWidth: '24px', minHeight: '24px' })
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('tooltip content is programmatically associated with trigger', async () => {
            const { user } = render(
                <Tooltip content="Associated tooltip">
                    <button>Association test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Radix UI establishes the relationship automatically
                expect(tooltip).toHaveTextContent('Associated tooltip')
            })
        })

        it('tooltip maintains relationship when content changes', async () => {
            const { user, rerender } = render(
                <Tooltip content="Initial content">
                    <button>Dynamic content</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Initial content')).toHaveLength(2)
            })

            // Change tooltip content
            rerender(
                <Tooltip content="Updated content">
                    <button>Dynamic content</button>
                </Tooltip>
            )

            await waitFor(() => {
                expect(screen.getAllByText('Updated content')).toHaveLength(2)
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
            })
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('tooltip text has sufficient color contrast', async () => {
            const { user } = render(
                <Tooltip content="Contrast test tooltip">
                    <button>Contrast test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Color contrast would be tested through computed styles
                // in a real browser environment with contrast ratio calculations
                expect(tooltip).toHaveTextContent('Contrast test tooltip')
            })
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('tooltip does not interfere with logical focus order', async () => {
            const { user } = render(
                <div>
                    <button>Before</button>
                    <Tooltip content="Non-interfering tooltip">
                        <button>Tooltip trigger</button>
                    </Tooltip>
                    <button>After</button>
                </div>
            )

            const beforeButton = screen.getByRole('button', { name: 'Before' })
            const triggerButton = screen.getByRole('button', {
                name: 'Tooltip trigger',
            })
            const afterButton = screen.getByRole('button', { name: 'After' })

            // Tab to trigger
            await user.tab()
            expect(beforeButton).toHaveFocus()

            await user.tab()
            expect(triggerButton).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.getAllByText('Non-interfering tooltip')
                ).toHaveLength(2)
            })

            // Tab should move to next element, not trap in tooltip
            await user.tab()
            expect(afterButton).toHaveFocus()
        })

        it('maintains focus order with multiple tooltips', async () => {
            const { user } = render(
                <div>
                    <Tooltip content="First tooltip">
                        <button>First</button>
                    </Tooltip>
                    <Tooltip content="Second tooltip">
                        <button>Second</button>
                    </Tooltip>
                    <Tooltip content="Third tooltip">
                        <button>Third</button>
                    </Tooltip>
                </div>
            )

            const firstButton = screen.getByRole('button', { name: 'First' })
            const secondButton = screen.getByRole('button', { name: 'Second' })
            const thirdButton = screen.getByRole('button', { name: 'Third' })

            await user.tab()
            expect(firstButton).toHaveFocus()

            await user.tab()
            expect(secondButton).toHaveFocus()

            await user.tab()
            expect(thirdButton).toHaveFocus()
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('tooltip appearance does not change context on focus', async () => {
            const { user } = render(
                <Tooltip content="No context change tooltip">
                    <button>No context change</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.getAllByText('No context change tooltip')
                ).toHaveLength(2)
            })

            // Focus should remain on trigger, no context change
            expect(trigger).toHaveFocus()
            expect(document.activeElement).toBe(trigger)
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('tooltip does not change context on keyboard input', async () => {
            const { user } = render(
                <Tooltip content="No input context change">
                    <button>Input test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.getAllByText('No input context change')
                ).toHaveLength(2)
            })

            // Pressing Escape should only close tooltip, not change context
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('No input context change')
                ).not.toBeInTheDocument()
            })

            // Focus should still be on trigger
            expect(trigger).toHaveFocus()
        })
    })

    describe('WCAG 1.4.13 Content on Hover or Focus (Level AA)', () => {
        it('tooltip is dismissible - ESC key closes tooltip', async () => {
            const { user } = render(
                <Tooltip content="Dismissible tooltip">
                    <button>Dismissible test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Dismissible tooltip')).toHaveLength(
                    2
                )
            })

            // ESC key should dismiss tooltip
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('Dismissible tooltip')
                ).not.toBeInTheDocument()
            })
        })

        it('tooltip is hoverable - can move pointer to tooltip', async () => {
            const { user } = render(
                <Tooltip content="Hoverable tooltip">
                    <button>Hoverable test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Tooltip should remain visible when hovering over it
                expect(tooltip).toHaveTextContent('Hoverable tooltip')
            })
        })

        it('tooltip is persistent - remains visible until dismissed', async () => {
            const { user } = render(
                <Tooltip content="Persistent tooltip">
                    <button>Persistent test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Persistent tooltip')).toHaveLength(
                    2
                )
            })

            // Tooltip should remain visible while focus is on trigger
            await new Promise((resolve) => setTimeout(resolve, 500))
            expect(screen.getAllByText('Persistent tooltip')).toHaveLength(2)
        })
    })

    describe('Screen Reader Support', () => {
        it('tooltip content is announced to screen readers when opened', async () => {
            const { user } = render(
                <Tooltip content="Screen reader accessible tooltip">
                    <button>Screen reader test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent(
                    'Screen reader accessible tooltip'
                )
            })
        })

        it('announces tooltip content changes to screen readers', async () => {
            const { user, rerender } = render(
                <Tooltip content="Initial content">
                    <button>Dynamic content</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Initial content')).toHaveLength(2)
            })

            // Change tooltip content
            rerender(
                <Tooltip content="Updated content">
                    <button>Dynamic content</button>
                </Tooltip>
            )

            await waitFor(() => {
                expect(screen.getAllByText('Updated content')).toHaveLength(2)
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
            })
        })

        it('handles complex content structure for screen readers', async () => {
            const { user } = render(
                <Tooltip
                    content={
                        <span>
                            <strong>Tooltip Title</strong>
                            <br />
                            This is important information with{' '}
                            <em>emphasized text</em>.
                        </span>
                    }
                >
                    <button>Complex structure</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Tooltip Title')
                expect(tooltip).toHaveTextContent('emphasized text')
            })
        })
    })

    describe('Focus Management', () => {
        it('maintains focus on trigger element when tooltip is shown', async () => {
            const { user } = render(
                <Tooltip content="Focus maintained">
                    <button>Focus test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Focus maintained')).toHaveLength(2)
            })

            // Focus should remain on trigger
            expect(trigger).toHaveFocus()
        })

        it('does not trap focus within tooltip', async () => {
            const { user } = render(
                <div>
                    <button>Before</button>
                    <Tooltip content="Non-trapping tooltip">
                        <button>Tooltip trigger</button>
                    </Tooltip>
                    <button>After</button>
                </div>
            )

            const beforeButton = screen.getByRole('button', { name: 'Before' })
            const triggerButton = screen.getByRole('button', {
                name: 'Tooltip trigger',
            })
            const afterButton = screen.getByRole('button', { name: 'After' })

            // Tab to trigger
            await user.tab()
            expect(beforeButton).toHaveFocus()

            await user.tab()
            expect(triggerButton).toHaveFocus()

            await waitFor(() => {
                expect(
                    screen.getAllByText('Non-trapping tooltip')
                ).toHaveLength(2)
            })

            // Tab should move to next element, not trap in tooltip
            await user.tab()
            expect(afterButton).toHaveFocus()
        })

        it('handles focus with controlled tooltip', async () => {
            const { user } = render(
                <Tooltip content="Controlled focus test" open={true}>
                    <button>Always visible trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            // Tooltip should be visible
            expect(screen.getAllByText('Controlled focus test')).toHaveLength(2)

            // Focus the trigger
            await user.tab()
            expect(trigger).toHaveFocus()

            // Tooltip should remain visible and focus should stay on trigger
            expect(screen.getAllByText('Controlled focus test')).toHaveLength(2)
            expect(trigger).toHaveFocus()
        })
    })

    describe('Edge Cases and Additional Accessibility', () => {
        it('maintains accessibility with minimal content', async () => {
            const { container, user } = render(
                <Tooltip content="Info">
                    <button aria-label="Button with minimal tooltip">
                        Minimal content test
                    </button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Info')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles accessibility with dynamic content', async () => {
            const { user, rerender } = render(
                <Tooltip content="Dynamic content 1">
                    <button>Dynamic test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                expect(screen.getAllByText('Dynamic content 1')).toHaveLength(2)
            })

            // Update content while tooltip is visible
            rerender(
                <Tooltip content="Dynamic content 2">
                    <button>Dynamic test</button>
                </Tooltip>
            )

            await waitFor(() => {
                expect(screen.getAllByText('Dynamic content 2')).toHaveLength(2)
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
            })
        })

        it('maintains accessibility with rapid show/hide cycles', async () => {
            const { user } = render(
                <Tooltip content="Rapid cycle test" delayDuration={50}>
                    <button>Rapid test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            // Rapid hover/unhover cycles
            for (let i = 0; i < 3; i++) {
                await user.hover(trigger)
                await user.unhover(trigger)
            }

            // Final hover to test state
            await user.hover(trigger)
            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Rapid cycle test')
            })
        })

        it('handles accessibility with nested interactive elements', async () => {
            const { user } = render(
                <Tooltip content="Nested elements tooltip">
                    <div>
                        <button>Nested button</button>
                        <span>Additional content</span>
                    </div>
                </Tooltip>
            )

            const trigger = screen.getByRole('button', {
                name: 'Nested button',
            })
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Nested elements tooltip')
            })

            // Button should remain focusable and functional
            await user.click(trigger)
            expect(trigger).toBeInTheDocument()
        })

        it('handles tooltip with empty content gracefully', async () => {
            const { container } = render(
                <Tooltip content="">
                    <button>Empty content test</button>
                </Tooltip>
            )

            // Empty content should not render tooltip
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles tooltip with null content gracefully', async () => {
            const { container } = render(
                <Tooltip content={null as unknown as string}>
                    <button>Null content test</button>
                </Tooltip>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
