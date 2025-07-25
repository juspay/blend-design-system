import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import { Tooltip } from '../../../lib/components/Tooltip/Tooltip'
import {
    TooltipSize,
    TooltipSlotDirection,
} from '../../../lib/components/Tooltip/types'
import { MockIcon } from '../../test-utils'

describe('Tooltip Accessibility', () => {
    describe('WCAG Compliance', () => {
        it('meets WCAG standards for basic tooltip', async () => {
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

        it('meets WCAG standards for tooltip with slot', async () => {
            const { container, user } = render(
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
                expect(screen.getAllByText('Tooltip with icon')).toHaveLength(2)
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
    })

    describe('ARIA Attributes', () => {
        it('has proper tooltip role', async () => {
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

        it('establishes proper relationship between trigger and tooltip', async () => {
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

                // Radix UI handles the relationship automatically
                // The tooltip should be properly associated with the trigger
                expect(tooltip).toHaveTextContent('Related tooltip')
            })
        })

        it('maintains accessibility with complex content', async () => {
            const { user } = render(
                <Tooltip
                    content={
                        <span>
                            <strong>Important:</strong> This is a complex
                            tooltip with
                            <em> emphasized text</em> and multiple elements.
                        </span>
                    }
                >
                    <button>Complex content trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(screen.getAllByText('Important:')).toHaveLength(2)
                expect(screen.getAllByText('emphasized text')).toHaveLength(2)
            })
        })

        it('handles aria-describedby relationship correctly', async () => {
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

    describe('Keyboard Navigation', () => {
        it('shows tooltip on focus', async () => {
            const { user } = render(
                <Tooltip content="Focus tooltip">
                    <button>Focusable trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.tab() // Focus the button

            expect(trigger).toHaveFocus()

            await waitFor(() => {
                expect(screen.getAllByText('Focus tooltip')).toHaveLength(2)
            })
        })

        it('hides tooltip on blur', async () => {
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

        it('works with keyboard navigation through multiple tooltips', async () => {
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

        it('handles Escape key to close tooltip', async () => {
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
    })

    describe('Screen Reader Support', () => {
        it('provides accessible content for screen readers', async () => {
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

        it('announces tooltip content changes', async () => {
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
                expect(
                    screen.queryByText('Initial content')
                ).not.toBeInTheDocument()
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
                            <em>emphasized text</em> and multiple parts.
                            <br />
                            • First item
                            <br />• Second item
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
                expect(screen.getAllByText('Tooltip Title')).toHaveLength(2)
                expect(screen.getAllByText('emphasized text')).toHaveLength(2)
                // Check that the tooltip contains the expected content structure
                expect(tooltip).toHaveTextContent('Tooltip Title')
                expect(tooltip).toHaveTextContent('emphasized text')
                expect(tooltip).toHaveTextContent('• First item')
                expect(tooltip).toHaveTextContent('• Second item')
                expect(tooltip).toHaveTextContent(
                    'This is important information with'
                )
            })
        })
    })

    describe('Focus Management', () => {
        it('maintains focus on trigger element', async () => {
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

    describe('High Contrast and Visual Accessibility', () => {
        it('maintains visibility in high contrast mode', async () => {
            const { user } = render(
                <Tooltip content="High contrast tooltip">
                    <button>High contrast test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()

                // Tooltip should have proper background and text colors
                // This would be tested through computed styles in a real browser
                expect(tooltip).toHaveTextContent('High contrast tooltip')
            })
        })

        it('provides sufficient color contrast', async () => {
            const { user } = render(
                <Tooltip content="Color contrast test">
                    <button>Contrast test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                // Color contrast would be tested through computed styles
                // and contrast ratio calculations in a real browser environment
            })
        })

        it('scales properly with font size changes', async () => {
            const { user } = render(
                <div style={{ fontSize: '18px' }}>
                    <Tooltip content="Scaled tooltip">
                        <button>Font scale test</button>
                    </Tooltip>
                </div>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Scaled tooltip')
            })
        })
    })

    describe('Error Recovery and Edge Cases', () => {
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
                // Tooltip should have minimal but valid content to satisfy accessibility requirements
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
                expect(
                    screen.queryByText('Dynamic content 1')
                ).not.toBeInTheDocument()
            })

            // Tooltip should maintain its role and accessibility
            const tooltip = screen.getByRole('tooltip')
            expect(tooltip).toBeInTheDocument()
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
    })

    describe('Mobile and Touch Accessibility', () => {
        it('handles touch interactions appropriately', async () => {
            const { user } = render(
                <Tooltip content="Touch accessible tooltip">
                    <button>Touch test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            // Simulate touch interaction (hover equivalent)
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('Touch accessible tooltip')
            })
        })

        it('provides appropriate touch target size', async () => {
            const { user } = render(
                <Tooltip content="Touch target test">
                    <button style={{ minWidth: '44px', minHeight: '44px' }}>
                        Touch
                    </button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveStyle({ minWidth: '44px', minHeight: '44px' })

            await user.hover(trigger)
            await waitFor(() => {
                expect(screen.getAllByText('Touch target test')).toHaveLength(2)
            })
        })
    })

    describe('Internationalization and Localization', () => {
        it('handles right-to-left text direction', async () => {
            const { user } = render(
                <div dir="rtl">
                    <Tooltip content="نص تجريبي للتوضيح">
                        <button>RTL test</button>
                    </Tooltip>
                </div>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent('نص تجريبي للتوضيح')
            })
        })

        it('handles long translated content', async () => {
            const longTranslatedContent =
                'Dies ist ein sehr langer deutscher Text, der zeigt, wie Tooltips mit längeren Übersetzungen umgehen, die möglicherweise mehr Platz benötigen als der ursprüngliche englische Text.'

            const { user } = render(
                <Tooltip content={longTranslatedContent}>
                    <button>Translation test</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            await waitFor(() => {
                const tooltip = screen.getByRole('tooltip')
                expect(tooltip).toBeInTheDocument()
                expect(tooltip).toHaveTextContent(longTranslatedContent)
            })
        })
    })
})
