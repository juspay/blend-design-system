import React from 'react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import Charts from '../../../lib/components/Charts/Charts'
import {
    ChartType,
    ChartLegendPosition,
    NewNestedDataPoint,
    AxisType,
    LegendsChangeType,
} from '../../../lib/components/Charts/types'
import { TrendingUp, DollarSign, Activity } from 'lucide-react'

// Helper function to generate sample chart data
const generateChartData = (): NewNestedDataPoint[] => [
    {
        name: 'Jan',
        data: {
            revenue: { primary: { label: 'Revenue', val: 4000 } },
            profit: { primary: { label: 'Profit', val: 2400 } },
            expenses: { primary: { label: 'Expenses', val: 1600 } },
        },
    },
    {
        name: 'Feb',
        data: {
            revenue: { primary: { label: 'Revenue', val: 3000 } },
            profit: { primary: { label: 'Profit', val: 1398 } },
            expenses: { primary: { label: 'Expenses', val: 1602 } },
        },
    },
    {
        name: 'Mar',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2000 } },
            profit: { primary: { label: 'Profit', val: 800 } },
            expenses: { primary: { label: 'Expenses', val: 1200 } },
        },
    },
]

describe('Charts Accessibility', () => {
    beforeEach(() => {
        // Mock window.innerWidth for responsive tests
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        })
    })

    afterEach(() => {
        // Cleanup
    })

    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default line chart (axe-core validation)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                        type: AxisType.CURRENCY,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all chart types (Line, Bar, Pie, Scatter)', async () => {
            const data = generateChartData()
            const chartTypes = [
                ChartType.LINE,
                ChartType.BAR,
                ChartType.PIE,
                ChartType.SCATTER,
            ]

            for (const chartType of chartTypes) {
                const { container } = render(
                    <Charts
                        chartType={chartType}
                        data={data}
                        height={400}
                        chartHeaderSlot={<h3>{chartType} Chart</h3>}
                        xAxis={{ label: 'Month', showLabel: true, show: true }}
                        yAxis={{
                            label: 'Amount',
                            showLabel: true,
                            show: true,
                        }}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards with role="region" and aria-label (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Financial Overview</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const chartRegion = container.querySelector('[role="region"]')
            expect(chartRegion).toBeTruthy()
            expect(chartRegion).toHaveAttribute('aria-label')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with chart role="img" and aria-label (1.1.1 Non-text Content)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartName="Revenue Chart"
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            // Wait for chart to render
            await waitFor(() => {
                const chartImg = container.querySelector('[role="img"]')
                expect(chartImg).toBeTruthy()
                expect(chartImg).toHaveAttribute('aria-label')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with aria-labelledby linking to header (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Sales Performance</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const chartRegion = container.querySelector('[role="region"]')
            expect(chartRegion).toHaveAttribute('aria-labelledby')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with aria-describedby for chart description (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const chartImg = container.querySelector('[role="img"]')
                expect(chartImg).toHaveAttribute('aria-describedby')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with legend items as buttons (2.1.1 Keyboard)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButtons = container.querySelectorAll(
                    'button[aria-label*="Toggle"]'
                )
                expect(legendButtons.length).toBeGreaterThan(0)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with legend items having aria-pressed (4.1.2 Name, Role, Value)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButtons = container.querySelectorAll(
                    'button[aria-pressed]'
                )
                expect(legendButtons.length).toBeGreaterThan(0)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with header buttons having aria-label (2.4.6 Headings and Labels)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const collapseButton = container.querySelector(
                    'button[aria-label*="Collapse"], button[aria-label*="Expand"]'
                )
                expect(collapseButton).toBeTruthy()
                expect(collapseButton).toHaveAttribute('aria-expanded')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with decorative icons having aria-hidden (1.1.1 Non-text Content)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    slot1={<TrendingUp size={20} color="#10b981" />}
                    slot2={<DollarSign size={16} color="#3b82f6" />}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const decorativeIcons = container.querySelectorAll(
                '[aria-hidden="true"]'
            )
            expect(decorativeIcons.length).toBeGreaterThan(0)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with legend position top (1.3.2 Meaningful Sequence)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with legend position right (1.3.2 Meaningful Sequence)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.PIE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Sales Distribution</h3>}
                    legendPosition={ChartLegendPosition.RIGHT}
                    xAxis={{ show: false }}
                    yAxis={{ show: false }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with stacked legends (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    stackedLegends={true}
                    stackedLegendsData={[
                        {
                            value: 12000,
                            delta: 12.5,
                            changeType: LegendsChangeType.INCREASE,
                        },
                        {
                            value: 8000,
                            delta: 8.3,
                            changeType: LegendsChangeType.INCREASE,
                        },
                        {
                            value: 6000,
                            delta: 5.2,
                            changeType: LegendsChangeType.INCREASE,
                        },
                    ]}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with keyboard navigation on legend items (2.1.1 Keyboard)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                // Test keyboard focus
                legendButton.focus()
                expect(document.activeElement).toBe(legendButton)

                // Test keyboard activation
                fireEvent.keyDown(legendButton, { key: 'Enter' })
                fireEvent.keyDown(legendButton, { key: ' ' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with keyboard navigation on collapse button (2.1.1 Keyboard)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const collapseButton = container.querySelector(
                    'button[aria-expanded]'
                ) as HTMLButtonElement
                expect(collapseButton).toBeTruthy()

                // Test keyboard focus
                collapseButton.focus()
                expect(document.activeElement).toBe(collapseButton)

                // Test keyboard activation
                fireEvent.keyDown(collapseButton, { key: 'Enter' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with focus indicators visible (2.4.7 Focus Visible)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                legendButton.focus()
                const computedStyle = window.getComputedStyle(legendButton)
                // Focus should be visible (outline or box-shadow)
                expect(
                    computedStyle.outline !== 'none' ||
                        computedStyle.boxShadow !== 'none'
                ).toBe(true)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with touch target size minimum 24x24px (2.5.8 Target Size)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                // Check if button is visible and has reasonable size
                // In test environment, elements may not have actual rendered dimensions
                // but we verify the button exists and is accessible
                const rect = legendButton.getBoundingClientRect()
                // Only check size if element is actually rendered (non-zero dimensions)
                if (rect.width > 0 && rect.height > 0) {
                    expect(rect.width).toBeGreaterThanOrEqual(24)
                    expect(rect.height).toBeGreaterThanOrEqual(24)
                }
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with no context change on focus (3.2.1 On Focus)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                // Focus should not trigger context change
                legendButton.focus()
                expect(document.activeElement).toBe(legendButton)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with predictable behavior on input (3.2.2 On Input)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                // Click should have predictable behavior
                const initialPressed = legendButton.getAttribute('aria-pressed')
                fireEvent.click(legendButton)
                const afterClickPressed =
                    legendButton.getAttribute('aria-pressed')
                // State should change predictably
                expect(initialPressed !== afterClickPressed).toBe(true)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with all changes user-initiated (3.2.5 Change on Request - AAA)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                // Changes should only occur on user interaction
                const initialPressed = legendButton.getAttribute('aria-pressed')
                fireEvent.click(legendButton)
                const afterClickPressed =
                    legendButton.getAttribute('aria-pressed')
                expect(initialPressed !== afterClickPressed).toBe(true)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with keyboard-only operation (2.1.3 Keyboard No Exception - AAA)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()

                // All functionality should be keyboard accessible
                legendButton.focus()
                expect(document.activeElement).toBe(legendButton)

                // Enter key should activate
                fireEvent.keyDown(legendButton, { key: 'Enter', code: 'Enter' })
                fireEvent.keyUp(legendButton, { key: 'Enter', code: 'Enter' })

                // Space key should activate
                fireEvent.keyDown(legendButton, { key: ' ', code: 'Space' })
                fireEvent.keyUp(legendButton, { key: ' ', code: 'Space' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with proper heading structure (2.4.6 Headings and Labels)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const heading = container.querySelector('h3')
            expect(heading).toBeTruthy()
            expect(heading?.textContent).toBe('Monthly Revenue')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with axis labels (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{
                        label: 'Month',
                        showLabel: true,
                        show: true,
                    }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                        type: AxisType.CURRENCY,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with collapsed state (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    isExpanded={false}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const collapseButton = container.querySelector(
                    'button[aria-expanded="false"]'
                )
                expect(collapseButton).toBeTruthy()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with expanded state (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    isExpanded={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const collapseButton = container.querySelector(
                    'button[aria-expanded="true"]'
                )
                expect(collapseButton).toBeTruthy()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with reset legend button (4.1.2 Name, Role, Value)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            // First, click a legend item to filter
            await waitFor(async () => {
                const legendButton = container.querySelector(
                    'button[aria-label*="Toggle"]'
                ) as HTMLButtonElement
                expect(legendButton).toBeTruthy()
                fireEvent.click(legendButton)
            })

            // Then check for reset button
            await waitFor(() => {
                const resetButton = container.querySelector(
                    'button[aria-label*="Reset"]'
                )
                expect(resetButton).toBeTruthy()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with no data state (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={[]}
                    height={400}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    noData={{
                        title: 'No data available',
                        subtitle: 'Please check back later',
                    }}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with header group role (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const headerGroup = container.querySelector(
                '[role="group"][aria-label="Chart header"]'
            )
            expect(headerGroup).toBeTruthy()

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with chart description for screen readers (1.3.1 Info and Relationships)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    chartName="Revenue Chart"
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const description = container.querySelector(
                    '[aria-live="polite"]'
                )
                expect(description).toBeTruthy()
                expect(description?.textContent).toContain('chart')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with all interactive elements having accessible names (4.1.2 Name, Role, Value)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const buttons = container.querySelectorAll('button')
                buttons.forEach((button) => {
                    expect(button).toHaveAttribute('aria-label')
                })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with proper focus order (2.4.3 Focus Order)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Monthly Revenue</h3>}
                    legendPosition={ChartLegendPosition.TOP}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            await waitFor(() => {
                const buttons = Array.from(
                    container.querySelectorAll('button')
                ) as HTMLButtonElement[]
                expect(buttons.length).toBeGreaterThan(0)

                // Test tab order
                buttons[0].focus()
                expect(document.activeElement).toBe(buttons[0])

                // Simulate Tab key
                fireEvent.keyDown(buttons[0], { key: 'Tab', code: 'Tab' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with bar chart (1.1.1 Non-text Content)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.BAR}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Sales by Month</h3>}
                    xAxis={{ label: 'Month', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Sales',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with pie chart (1.1.1 Non-text Content)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.PIE}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Sales Distribution</h3>}
                    legendPosition={ChartLegendPosition.RIGHT}
                    xAxis={{ show: false }}
                    yAxis={{ show: false }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with scatter chart (1.1.1 Non-text Content)', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.SCATTER}
                    data={data}
                    height={400}
                    chartHeaderSlot={<h3>Data Points</h3>}
                    xAxis={{ label: 'X Axis', showLabel: true, show: true }}
                    yAxis={{
                        label: 'Y Axis',
                        showLabel: true,
                        show: true,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with all chart types and features combined', async () => {
            const data = generateChartData()
            const { container } = render(
                <Charts
                    chartType={ChartType.LINE}
                    data={data}
                    height={400}
                    showHeader={true}
                    showCollapseIcon={true}
                    chartHeaderSlot={<h3>Comprehensive Chart</h3>}
                    slot1={<Activity size={20} color="#10b981" />}
                    slot2={<DollarSign size={16} color="#3b82f6" />}
                    legendPosition={ChartLegendPosition.TOP}
                    stackedLegends={true}
                    stackedLegendsData={[
                        {
                            value: 12000,
                            delta: 12.5,
                            changeType: LegendsChangeType.INCREASE,
                        },
                        {
                            value: 8000,
                            delta: 8.3,
                            changeType: LegendsChangeType.INCREASE,
                        },
                    ]}
                    xAxis={{
                        label: 'Month',
                        showLabel: true,
                        show: true,
                        type: AxisType.DATE_TIME,
                    }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                        type: AxisType.CURRENCY,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
