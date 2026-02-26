import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '../../test-utils'
import ChartV2 from '../../../lib/components/ChartsV2/ChartV2'
import type { ChartV2Options } from '../../../lib/components/ChartsV2/chartV2.types'
import type { HighchartsReactProps } from 'highcharts-react-official'

// Mock HighchartsReact to avoid rendering real charts and to introspect props.
// We must initialize the spy inside the mock factory to avoid hoisting issues.
let HighchartsReactSpy: ReturnType<typeof vi.fn>

vi.mock('highcharts-react-official', () => {
    HighchartsReactSpy = vi.fn((props: HighchartsReactProps) => (
        // containerProps are spread so data attributes are visible in the DOM
        <div data-testid="highcharts-react" {...props.containerProps} />
    ))
    return {
        __esModule: true,
        default: HighchartsReactSpy,
    }
})

// Mock mergeChartOptions to a simple pass-through so we can assert invocation
const mergeChartOptionsMock = vi.fn((options: ChartV2Options) => options)

vi.mock('../../../lib/components/ChartsV2/chartV2Options', () => ({
    mergeChartOptions: (options: ChartV2Options) =>
        mergeChartOptionsMock(options),
}))

describe('ChartV2 Component', () => {
    beforeEach(() => {
        mergeChartOptionsMock.mockClear()
        HighchartsReactSpy.mockClear()
    })

    describe('Rendering states', () => {
        it('renders skeleton when skeleton.show is true', () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { container, queryByTestId } = render(
                <ChartV2
                    options={options}
                    skeleton={{ show: true, variant: 'pulse', height: 300 }}
                />
            )

            // Skeleton state is indicated via data-chart="Skeleton"
            expect(
                container.querySelector('[data-chart="Skeleton"]')
            ).toBeInTheDocument()
            expect(queryByTestId('highcharts-react')).not.toBeInTheDocument()
        })

        it('renders no-data view when there is no series data and noData is provided', () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { getByText, queryByTestId } = render(
                <ChartV2
                    options={options}
                    noData={{
                        title: 'No data',
                        subtitle: 'Nothing to show',
                    }}
                />
            )

            expect(getByText('No data')).toBeInTheDocument()
            expect(getByText('Nothing to show')).toBeInTheDocument()
            expect(queryByTestId('highcharts-react')).not.toBeInTheDocument()
        })

        it('renders HighchartsReact when there is series data', () => {
            const options: ChartV2Options = {
                series: [{ type: 'column', data: [1, 2, 3] }],
            }

            const { getByTestId } = render(<ChartV2 options={options} />)

            expect(getByTestId('highcharts-react')).toBeInTheDocument()
            expect(mergeChartOptionsMock).toHaveBeenCalledWith(
                options,
                expect.anything()
            )
        })
    })

    describe('data attributes', () => {
        it('sets data-chart based on first series type', () => {
            const options: ChartV2Options = {
                series: [{ type: 'line', data: [1] }],
            }

            const { getByTestId } = render(<ChartV2 options={options} />)
            const container = getByTestId('highcharts-react')

            expect(container).toHaveAttribute('data-chart', 'line')
        })

        it('falls back to "Chart" when series type is missing', () => {
            const options: ChartV2Options = {
                // No explicit type on the series
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                series: [{ data: [1] } as any],
            }

            const { getByTestId } = render(<ChartV2 options={options} />)
            const container = getByTestId('highcharts-react')

            expect(container).toHaveAttribute('data-chart', 'Chart')
        })
    })

    describe('blocked props', () => {
        it('filters blocked props before passing to HighchartsReact', () => {
            const options: ChartV2Options = {
                series: [{ type: 'column', data: [1] }],
            }

            render(
                <ChartV2
                    options={options}
                    {
                        // Intentionally pass props that should be stripped by filterBlockedProps
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ...({
                            className: 'should-not-forward',
                            style: { backgroundColor: 'red' },
                        } as HighchartsReactProps)
                    }
                />
            )

            const call = HighchartsReactSpy.mock.calls[0]?.[0] ?? {}
            expect(call.className).toBeUndefined()
            expect(call.style).toBeUndefined()
        })
    })
})
