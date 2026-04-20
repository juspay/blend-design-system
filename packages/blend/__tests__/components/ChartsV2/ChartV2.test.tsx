import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '../../test-utils'
import ChartV2 from '../../../lib/components/ChartsV2/ChartV2'
import { ChartV2Options } from '../../../lib/components/ChartsV2/chartV2.types'
import { HighchartsReactProps } from 'highcharts-react-official'

// Use a hoisted spy so Vitest can safely hoist the mock.
const HighchartsReactSpy = vi.hoisted(() =>
    vi.fn((props: HighchartsReactProps) => {
        // reference props so lint doesn't flag it as unused
        void props
        return null
    })
)

vi.mock('highcharts-react-official', () => ({
    __esModule: true,
    default: HighchartsReactSpy,
}))

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

            render(
                <ChartV2
                    options={options}
                    skeleton={{ show: true, variant: 'pulse', height: 300 }}
                />
            )

            // When skeleton is shown, HighchartsReact should not be rendered.
            expect(HighchartsReactSpy).not.toHaveBeenCalled()
        })

        it('renders no-data view when there is no series data and noData is provided', () => {
            const options: ChartV2Options = {
                series: [],
            }

            const { getByText } = render(
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
            // No HighchartsReact call when rendering no-data view.
            expect(HighchartsReactSpy).not.toHaveBeenCalled()
        })

        it('renders HighchartsReact when there is series data', () => {
            const options: ChartV2Options = {
                series: [{ type: 'column', data: [1, 2, 3] }],
            }

            render(<ChartV2 options={options} />)

            expect(HighchartsReactSpy).toHaveBeenCalled()
            // mergeChartOptionsMock is wrapped to receive only the options argument.
            expect(mergeChartOptionsMock).toHaveBeenCalledWith(options)
        })
    })

    describe('data attributes', () => {
        it('sets data-chart based on first series type', () => {
            const options: ChartV2Options = {
                series: [{ type: 'line', data: [1] }],
            }

            render(<ChartV2 options={options} />)
            const call = HighchartsReactSpy.mock
                .calls[0]?.[0] as HighchartsReactProps

            expect(call.containerProps).toMatchObject({ 'data-chart': 'line' })
        })

        it('falls back to "Chart" when series type is missing', () => {
            const options: ChartV2Options = {
                // No explicit type on the series
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                series: [{ data: [1] } as any],
            }

            render(<ChartV2 options={options} />)
            const call = HighchartsReactSpy.mock
                .calls[0]?.[0] as HighchartsReactProps

            expect(call.containerProps).toMatchObject({ 'data-chart': 'Chart' })
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
                    // Intentionally pass props that should be stripped by filterBlockedProps
                    {...({
                        className: 'should-not-forward',
                        style: { backgroundColor: 'red' },
                    } as HighchartsReactProps)}
                />
            )

            const call = HighchartsReactSpy.mock.calls[0]?.[0] ?? {}
            expect(call.className).toBeUndefined()
            expect(call.style).toBeUndefined()
        })
    })
})
