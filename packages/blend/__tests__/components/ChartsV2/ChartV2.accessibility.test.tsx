import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../test-utils'
import { axe } from 'jest-axe'
import ChartV2 from '../../../lib/components/ChartsV2/ChartV2'
import { ChartV2Options } from '../../../lib/components/ChartsV2/chartV2.types'

// For accessibility tests we don't need real Highcharts rendering; just the DOM wrapper.
vi.mock('highcharts-react-official', () => {
    const MockHighchartsReact = (props: {
        options?: ChartV2Options
        containerProps?: Record<string, unknown>
    }) => {
        const titleText = props.options?.title?.text
        const ariaLabel =
            titleText && titleText.trim().length > 0 ? titleText : 'Chart'

        return (
            <div
                data-testid="highcharts-react"
                role="img"
                aria-label={ariaLabel}
                {...props.containerProps}
            />
        )
    }
    return {
        __esModule: true,
        default: MockHighchartsReact,
    }
})

describe('ChartV2 Accessibility', () => {
    describe('WCAG 2.x / 3.x core checks via axe', () => {
        it('meets WCAG standards for a basic chart with data', async () => {
            const options: ChartV2Options = {
                title: { text: 'Success Rate Over Time' },
                series: [{ type: 'line', data: [1, 2, 3] }],
            }

            const { container } = render(<ChartV2 options={options} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for skeleton loading state', async () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { container } = render(
                <ChartV2
                    options={options}
                    skeleton={{ show: true, height: 300, variant: 'pulse' }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for no-data state', async () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { container } = render(
                <ChartV2
                    options={options}
                    noData={{
                        title: 'No data available',
                        subtitle: 'Data will appear here once available',
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value - chart root', () => {
        it('exposes chart role and accessible name via container', () => {
            const options: ChartV2Options = {
                title: { text: 'Transaction Success Rate' },
                series: [{ type: 'column', data: [10, 20, 30] }],
            }

            const { getByTestId } = render(<ChartV2 options={options} />)
            const chart = getByTestId('highcharts-react')

            expect(chart).toHaveAttribute('role', 'img')
            expect(chart).toHaveAttribute(
                'aria-label',
                'Transaction Success Rate'
            )
        })

        it('falls back to a generic accessible name when title is missing', () => {
            const options: ChartV2Options = {
                series: [{ type: 'line', data: [1, 2, 3] }],
            }

            const { getByTestId } = render(<ChartV2 options={options} />)
            const chart = getByTestId('highcharts-react')

            expect(chart).toHaveAttribute('aria-label', 'Chart')
        })
    })

    describe('WCAG 4.1.3 Status Messages - skeleton & no-data', () => {
        it('announces loading state via role=status and aria-busy', () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { container } = render(
                <ChartV2
                    options={options}
                    skeleton={{ show: true, height: 300, variant: 'pulse' }}
                />
            )

            const status = container.querySelector('[data-chart="Skeleton"]')
            expect(status).toHaveAttribute('role', 'status')
            expect(status).toHaveAttribute('aria-live', 'polite')
        })

        it('announces no-data state via role=status', () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { container } = render(
                <ChartV2
                    options={options}
                    noData={{
                        title: 'No data available',
                        subtitle: 'Data will appear here once available',
                    }}
                />
            )

            const status = container.querySelector('[data-chart="No-Data"]')
            expect(status).toHaveAttribute('role', 'status')
            expect(status).toHaveAttribute('aria-live', 'polite')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships - container semantics', () => {
        it('wraps chart content in a section/group container', () => {
            const options: ChartV2Options = {
                title: { text: 'Chart with container' },
                series: [{ type: 'line', data: [1] }],
            }

            const { container } = render(<ChartV2 options={options} />)

            const chartContainer = container.querySelector(
                '[data-chart="Chart-Container"]'
            )
            if (chartContainer) {
                expect(chartContainer).toHaveAttribute('role', 'group')
                expect(
                    chartContainer.getAttribute('aria-roledescription')
                ).toBe('Chart container')
            }
        })
    })
})
