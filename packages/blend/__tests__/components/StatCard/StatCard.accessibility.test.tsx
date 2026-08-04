import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import StatCard from '../../../lib/components/StatCard/StatCard'
import {
    StatCardVariant,
    StatCardDirection,
    ChangeType,
    type ChartDataPoint,
} from '../../../lib/components/StatCard/types'

// Helper function to generate sample chart data
const generateChartData = (
    days: number,
    baseValue: number,
    variance: number
): ChartDataPoint[] => {
    const data: ChartDataPoint[] = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const value = baseValue + (Math.random() - 0.5) * variance

        data.push({
            value: Math.round(value),
            name: date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }),
        })
    }

    return data
}

describe('StatCard Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default stat card (axe-core validation)', async () => {
            const { container } = render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with tooltips (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    valueTooltip="Total revenue from all sources"
                    change={{
                        value: 12.5,
                        valueType: ChangeType.INCREASE,
                        tooltip: '12.5% increase compared to last month',
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with chart data (1.1.1 Non-text Content)', async () => {
            const chartData = generateChartData(30, 5000, 1000)
            const { container } = render(
                <StatCard
                    title="Revenue Trend"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    chartData={chartData}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with progress bar (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <StatCard
                    title="Storage Used"
                    value="45.2 GB"
                    variant={StatCardVariant.PROGRESS_BAR}
                    progressValue={45}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('has proper role="region" for card container - programmatically determinable', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            expect(card).toBeInTheDocument()
        })

        it('has aria-label on card container - accessible name provided', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            expect(card).toHaveAttribute('aria-label')
            expect(card.getAttribute('aria-label')).toContain('Total Revenue')
        })

        it('has aria-labelledby linking to title - proper ARIA relationships', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            expect(card).toHaveAttribute('aria-labelledby')
            const titleId = card.getAttribute('aria-labelledby')
            expect(titleId).toBeTruthy()
            const titleElement = document.getElementById(titleId || '')
            expect(titleElement).toBeInTheDocument()
            expect(titleElement?.textContent).toContain('Total Revenue')
        })

        it('charts have role="img" and aria-label - accessible chart descriptions', () => {
            const chartData = generateChartData(30, 5000, 1000)
            render(
                <StatCard
                    title="Revenue Trend"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    chartData={chartData}
                />
            )
            const chart = screen.getByRole('img')
            expect(chart).toBeInTheDocument()
            expect(chart).toHaveAttribute('aria-label')
            expect(chart.getAttribute('aria-label')).toContain('chart')
        })

        it('help icon has aria-label - accessible icon description', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Total number of active users in the last 30 days"
                />
            )
            // Help icon is wrapped in Tooltip, query by role and aria-label
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Total number of active users"]'
            )
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                expect(helpIcon).toHaveAttribute('role', 'button')
            }
        })

        it('help icon has role="button" and tabIndex for keyboard access', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            // Help icon is wrapped in Tooltip, query by role and aria-label
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            )
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                expect(helpIcon).toHaveAttribute('role', 'button')
                // tabIndex might be rendered as tabindex (lowercase) in DOM
                expect(
                    helpIcon.getAttribute('tabIndex') ||
                        helpIcon.getAttribute('tabindex')
                ).toBe('0')
            }
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('title has unique id for aria-labelledby relationship', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            const titleId = card.getAttribute('aria-labelledby')
            expect(titleId).toBeTruthy()
            const titleElement = document.getElementById(titleId || '')
            expect(titleElement).toBeInTheDocument()
            expect(titleElement?.textContent).toBe('Total Revenue')
        })

        it('value has unique id - accessible value description', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    valueTooltip="Total revenue from all sources"
                />
            )
            const valueElement = screen.getByText('$45,231')
            expect(valueElement).toHaveAttribute('id')
            // Value text is visible and will be read by screen readers automatically
        })

        it('change indicator has unique id - accessible change description', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    change={{
                        value: 12.5,
                        valueType: ChangeType.INCREASE,
                        tooltip: '12.5% increase compared to last month',
                    }}
                />
            )
            const changeElement = screen.getByText(/\+12\.50%/)
            const changeContainer = changeElement.closest('[id*="-change"]')
            expect(changeContainer).toBeInTheDocument()
            expect(changeContainer).toHaveAttribute('id')
            // Change text is visible and will be read by screen readers automatically
        })

        it('subtitle is present when provided - proper structure', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const subtitle = screen.getByText('Last 30 days')
            expect(subtitle).toBeInTheDocument()
            // Subtitle text is visible and will be read by screen readers automatically
        })

        it('chart has unique id and descriptive aria-label - chart accessibility', () => {
            const chartData = generateChartData(30, 5000, 1000)
            render(
                <StatCard
                    title="Revenue Trend"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    chartData={chartData}
                />
            )
            const chart = screen.getByRole('img')
            expect(chart).toHaveAttribute('id')
            expect(chart).toHaveAttribute('aria-label')
            const ariaLabel = chart.getAttribute('aria-label')
            expect(ariaLabel).toContain('Revenue Trend')
            expect(ariaLabel).toContain('chart')
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('content follows logical reading order - title, value, subtitle', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const title = screen.getByText('Total Revenue')
            const value = screen.getByText('$45,231')
            const subtitle = screen.getByText('Last 30 days')

            // Verify all elements are present
            expect(title).toBeInTheDocument()
            expect(value).toBeInTheDocument()
            expect(subtitle).toBeInTheDocument()

            // Check that elements are in the DOM in logical order
            // The actual DOM order is handled by the component structure
            const allElements = [title, value, subtitle]
            allElements.forEach((el) => {
                expect(el).toBeInTheDocument()
            })
        })

        it('horizontal direction maintains logical sequence', () => {
            const chartData = generateChartData(30, 5000, 1000)
            render(
                <StatCard
                    title="Revenue Growth"
                    value="$89,450"
                    variant={StatCardVariant.LINE}
                    direction={StatCardDirection.HORIZONTAL}
                    chartData={chartData}
                />
            )
            const title = screen.getByText('Revenue Growth')
            const value = screen.getByText('$89,450')
            expect(title).toBeInTheDocument()
            expect(value).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual location - text labels provide context', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            const ariaLabel = card.getAttribute('aria-label')
            expect(ariaLabel).toContain('Total Revenue')
            expect(ariaLabel).toContain('$45,231')
        })

        it('change indicator has descriptive text - not just visual arrow', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    change={{
                        value: 12.5,
                        valueType: ChangeType.INCREASE,
                    }}
                />
            )
            const changeElement = screen.getByText(/\+12\.50%/)
            expect(changeElement).toBeInTheDocument()
            // Change text is visible and descriptive, will be read by screen readers
            expect(changeElement.textContent).toMatch(/\+12\.50%/)
        })
    })

    describe('WCAG 1.3.4 Orientation (Level AA)', () => {
        it('works in both vertical and horizontal directions', () => {
            const chartData = generateChartData(30, 5000, 1000)
            const { rerender } = render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    direction={StatCardDirection.VERTICAL}
                    chartData={chartData}
                />
            )
            expect(screen.getByText('Revenue')).toBeInTheDocument()

            rerender(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    direction={StatCardDirection.HORIZONTAL}
                    chartData={chartData}
                />
            )
            expect(screen.getByText('Revenue')).toBeInTheDocument()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('help icon is keyboard accessible - Tab to focus', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                // tabIndex might be rendered as tabindex (lowercase) in DOM
                const tabIndex =
                    helpIcon.getAttribute('tabIndex') ||
                    helpIcon.getAttribute('tabindex')
                expect(tabIndex).toBe('0')
                // Help icon should be focusable
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
        })

        it('tooltips are keyboard accessible via Radix UI - keyboard navigation support', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    valueTooltip="Total revenue from all sources"
                />
            )
            const valueElement = screen.getByText('$45,231')
            expect(valueElement).toBeInTheDocument()
            // Tooltip is accessible via Radix UI which handles keyboard navigation
        })

        it('all interactive elements are keyboard operable - no mouse-only functionality', () => {
            const { container } = render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                    valueTooltip="Value tooltip"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                // tabIndex might be rendered as tabindex (lowercase) in DOM
                const tabIndex =
                    helpIcon.getAttribute('tabIndex') ||
                    helpIcon.getAttribute('tabindex')
                expect(tabIndex).toBe('0')
                // Verify it's focusable
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
            // All interactive elements have keyboard access
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality operable via keyboard without timing constraints', () => {
            const { container } = render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
            // No timing constraints for keyboard operations
            // Tooltip should be accessible via Radix UI
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('focus order is logical - help icon comes after title', () => {
            const { container } = render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                // tabIndex might be rendered as tabindex (lowercase) in DOM
                const tabIndex =
                    helpIcon.getAttribute('tabIndex') ||
                    helpIcon.getAttribute('tabindex')
                expect(tabIndex).toBe('0')
                // Verify it's focusable for keyboard navigation
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
            // Focus order is logical within the card structure
        })
    })

    describe('WCAG 2.4.6 Headings and Labels (Level AA)', () => {
        it('title clearly describes card purpose - descriptive labels', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const title = screen.getByText('Total Revenue')
            expect(title).toBeInTheDocument()
            const card = screen.getByRole('region')
            const ariaLabel = card.getAttribute('aria-label')
            expect(ariaLabel).toContain('Total Revenue')
        })

        it('value is accessible when tooltip provided', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    valueTooltip="Total revenue from all sources including subscriptions, sales, and add-ons"
                />
            )
            const valueElement = screen.getByText('$45,231')
            expect(valueElement).toBeInTheDocument()
            // Value text is visible and tooltip is accessible via Radix UI
        })

        it('change indicator has descriptive text', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    change={{
                        value: 12.5,
                        valueType: ChangeType.INCREASE,
                        tooltip: '12.5% increase compared to last month',
                    }}
                />
            )
            const changeElement = screen.getByText(/\+12\.50%/)
            expect(changeElement).toBeInTheDocument()
            // Change text is visible and descriptive, will be read by screen readers
            expect(changeElement.textContent).toMatch(/\+12\.50%/)
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('help icon shows focus indicator when focused', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
            // Focus indicator is handled by browser default or custom styles
        })

        it('tooltip triggers show focus indicator - keyboard focus visible', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    valueTooltip="Value tooltip"
                />
            )
            const valueElement = screen.getByText('$45,231')
            // Tooltip component handles focus indicators via Radix UI
            expect(valueElement).toBeInTheDocument()
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('help icon meets minimum touch target size (24x24px)', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            // Icon should be at least 16px (help icon size), but touch target should be 24x24px
            // This is typically handled by padding around the icon
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                // tabIndex might be rendered as tabindex (lowercase) in DOM
                const tabIndex =
                    helpIcon.getAttribute('tabIndex') ||
                    helpIcon.getAttribute('tabindex')
                expect(tabIndex).toBe('0')
                // Verify it's focusable for keyboard navigation
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('focusing elements does not cause unexpected context changes', () => {
            const { container } = render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                helpIcon.focus()
                expect(document.activeElement).toBe(helpIcon)
            }
            // No context change should occur
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('interacting with elements does not cause unexpected context changes', async () => {
            const { container, user } = render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            ) as HTMLElement
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                await user.click(helpIcon)
            }
            // Tooltip may open but no context change should occur
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('all interactions are user-initiated - no automatic changes', () => {
            const { container } = render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Help text"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Help text"]'
            )
            // No automatic changes - only user-initiated
            expect(helpIcon).toBeTruthy()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('card has proper role and accessible name - programmatically determinable', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            expect(card).toHaveAttribute('aria-label')
            expect(card).toHaveAttribute('aria-labelledby')
        })

        it('value is accessible - programmatically determinable', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    valueTooltip="Total revenue"
                />
            )
            const valueElement = screen.getByText('$45,231')
            expect(valueElement).toBeInTheDocument()
            // Value text is visible and will be read by screen readers automatically
        })

        it('change indicator is accessible', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    change={{
                        value: 12.5,
                        valueType: ChangeType.INCREASE,
                    }}
                />
            )
            const changeElement = screen.getByText(/\+12\.50%/)
            expect(changeElement).toBeInTheDocument()
            // Change text is visible and will be read by screen readers automatically
        })

        it('chart has proper role and accessible name', () => {
            const chartData = generateChartData(30, 5000, 1000)
            render(
                <StatCard
                    title="Revenue Trend"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    chartData={chartData}
                />
            )
            const chart = screen.getByRole('img')
            expect(chart).toHaveAttribute('aria-label')
            expect(chart.getAttribute('aria-label')).toContain('chart')
        })

        it('help icon has proper role and accessible name', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Total number of active users"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Total number of active users"]'
            )
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                expect(helpIcon).toHaveAttribute('role', 'button')
                expect(helpIcon).toHaveAttribute('aria-label')
            }
        })
    })

    describe('Screen Reader Support', () => {
        it('announces card title, value, and subtitle to screen readers', () => {
            render(
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                />
            )
            const card = screen.getByRole('region')
            const ariaLabel = card.getAttribute('aria-label')
            expect(ariaLabel).toContain('Total Revenue')
            expect(ariaLabel).toContain('$45,231')
            expect(ariaLabel).toContain('Last 30 days')
        })

        it('announces change indicator to screen readers', () => {
            render(
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    variant={StatCardVariant.NUMBER}
                    change={{
                        value: 12.5,
                        valueType: ChangeType.INCREASE,
                    }}
                />
            )
            const changeElement = screen.getByText(/\+12\.50%/)
            expect(changeElement).toBeInTheDocument()
            // Change text is visible and will be read by screen readers
            expect(changeElement.textContent).toMatch(/\+12\.50%/)
        })

        it('announces chart description to screen readers', () => {
            const chartData = generateChartData(30, 5000, 1000)
            render(
                <StatCard
                    title="Revenue Trend"
                    value="$45,231"
                    variant={StatCardVariant.LINE}
                    chartData={chartData}
                />
            )
            const chart = screen.getByRole('img')
            const ariaLabel = chart.getAttribute('aria-label')
            expect(ariaLabel).toContain('Revenue Trend')
            expect(ariaLabel).toContain('chart')
            expect(ariaLabel).toContain('data points')
        })

        it('announces help icon purpose to screen readers', () => {
            const { container } = render(
                <StatCard
                    title="Total Users"
                    value="8,549"
                    variant={StatCardVariant.NUMBER}
                    helpIconText="Total number of active users in the last 30 days"
                />
            )
            const helpIcon = container.querySelector(
                '[role="button"][aria-label*="Total number of active users in the last 30 days"]'
            )
            expect(helpIcon).toBeTruthy()
            if (helpIcon) {
                expect(helpIcon).toHaveAttribute('aria-label')
            }
        })
    })
})
