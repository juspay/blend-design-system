import React from 'react'
import { act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '../../test-utils'
import ChartV3 from '../../../lib/components/ChartsV3/ChartV3'
import type { ChartV3Options } from '../../../lib/components/ChartsV3/chartV3.types'

const initSpy = vi.hoisted(() => vi.fn())
const setOptionSpy = vi.hoisted(() => vi.fn())
const resizeSpy = vi.hoisted(() => vi.fn())
const disposeSpy = vi.hoisted(() => vi.fn())
const onSpy = vi.hoisted(() => vi.fn())
const offSpy = vi.hoisted(() => vi.fn())
const dispatchActionSpy = vi.hoisted(() => vi.fn())
const getOptionSpy = vi.hoisted(() => vi.fn())

vi.mock('echarts', () => ({
    init: initSpy,
}))

const mergeChartV3OptionsMock = vi.fn((options: ChartV3Options) => options)

vi.mock('../../../lib/components/ChartsV3/chartV3Options', async () => {
    const actual = await vi.importActual<
        typeof import('../../../lib/components/ChartsV3/chartV3Options')
    >('../../../lib/components/ChartsV3/chartV3Options')

    return {
        ...actual,
        mergeChartV3Options: (options: ChartV3Options) =>
            mergeChartV3OptionsMock(options),
    }
})

describe('ChartV3 Component', () => {
    beforeEach(() => {
        initSpy.mockReset()
        setOptionSpy.mockReset()
        resizeSpy.mockReset()
        disposeSpy.mockReset()
        onSpy.mockReset()
        offSpy.mockReset()
        dispatchActionSpy.mockReset()
        getOptionSpy.mockReset()
        mergeChartV3OptionsMock.mockClear()
        initSpy.mockReturnValue({
            setOption: setOptionSpy,
            resize: resizeSpy,
            dispose: disposeSpy,
            on: onSpy,
            off: offSpy,
            dispatchAction: dispatchActionSpy,
            getOption: getOptionSpy,
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('renders skeleton when skeleton.show is true', () => {
        render(
            <ChartV3
                options={{ series: [] }}
                skeleton={{ show: true, variant: 'pulse', height: 300 }}
            />
        )

        expect(initSpy).not.toHaveBeenCalled()
    })

    it('renders no-data view when there is no series data and noData is provided', () => {
        const { getByText } = render(
            <ChartV3
                options={{ series: [] }}
                noData={{
                    title: 'No data',
                    subtitle: 'Nothing to show',
                }}
            />
        )

        expect(getByText('No data')).toBeInTheDocument()
        expect(getByText('Nothing to show')).toBeInTheDocument()
        expect(initSpy).not.toHaveBeenCalled()
    })

    it('initializes ECharts when there is series data', () => {
        const options: ChartV3Options = {
            series: [{ type: 'bar', data: [1, 2, 3] }],
        }

        render(<ChartV3 options={options} />)

        expect(initSpy).toHaveBeenCalled()
        expect(mergeChartV3OptionsMock).toHaveBeenCalledWith(options)
        expect(setOptionSpy).toHaveBeenCalledWith(options, undefined)
    })

    it('sets data-chart based on first series type', () => {
        const { container } = render(
            <ChartV3 options={{ series: [{ type: 'line', data: [1] }] }} />
        )

        expect(container.querySelector('[data-chart="line"]')).toBeTruthy()
    })

    it('forwards a live imperative chart ref', () => {
        const chart = {
            setOption: setOptionSpy,
            resize: resizeSpy,
            dispose: disposeSpy,
            on: onSpy,
            off: offSpy,
            dispatchAction: dispatchActionSpy,
            getOption: getOptionSpy,
        }
        initSpy.mockReturnValue(chart)
        const ref = React.createRef<{
            chart: unknown
            getChart: () => unknown
        }>()

        render(
            <ChartV3
                ref={ref}
                options={{ series: [{ type: 'line', data: [1] }] }}
            />
        )

        expect(ref.current?.chart).toBe(chart)
        expect(ref.current?.getChart()).toBe(chart)
    })

    it('binds provided ECharts events', () => {
        const clickHandler = vi.fn()
        render(
            <ChartV3
                options={{ series: [{ type: 'bar', data: [1] }] }}
                onEvents={{ click: clickHandler }}
            />
        )

        expect(onSpy).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('removes only the wrapped event handler during cleanup', () => {
        const clickHandler = vi.fn()
        const { unmount } = render(
            <ChartV3
                options={{ series: [{ type: 'bar', data: [1] }] }}
                onEvents={{ click: clickHandler }}
            />
        )
        const wrappedHandler = onSpy.mock.calls[0][1]

        unmount()

        expect(offSpy).toHaveBeenCalledWith('click', wrappedHandler)
    })

    it('does not recreate the chart when only onChartReady changes', () => {
        const firstReady = vi.fn()
        const secondReady = vi.fn()
        const { rerender } = render(
            <ChartV3
                options={{ series: [{ type: 'bar', data: [1] }] }}
                onChartReady={firstReady}
            />
        )

        rerender(
            <ChartV3
                options={{ series: [{ type: 'bar', data: [1] }] }}
                onChartReady={secondReady}
            />
        )

        expect(initSpy).toHaveBeenCalledTimes(1)
        expect(disposeSpy).not.toHaveBeenCalled()
        expect(firstReady).toHaveBeenCalledTimes(1)
        expect(secondReady).not.toHaveBeenCalled()
    })

    it('resizes the latest chart instance after a chart reinitialization', () => {
        const firstChart = {
            setOption: vi.fn(),
            resize: vi.fn(),
            dispose: vi.fn(),
            on: vi.fn(),
            off: vi.fn(),
            dispatchAction: vi.fn(),
            getOption: vi.fn(),
        }
        const secondChart = {
            setOption: vi.fn(),
            resize: vi.fn(),
            dispose: vi.fn(),
            on: vi.fn(),
            off: vi.fn(),
            dispatchAction: vi.fn(),
            getOption: vi.fn(),
        }
        initSpy.mockReturnValueOnce(firstChart).mockReturnValueOnce(secondChart)

        const { rerender } = render(
            <ChartV3
                theme="light"
                options={{ series: [{ type: 'line', data: [1] }] }}
            />
        )

        rerender(
            <ChartV3
                theme="dark"
                options={{ series: [{ type: 'line', data: [1] }] }}
            />
        )

        act(() => {
            window.dispatchEvent(new Event('resize'))
        })

        expect(firstChart.resize).not.toHaveBeenCalled()
        expect(secondChart.resize).toHaveBeenCalled()
    })

    it('does not call setOption again when rerendered with deeply equal options', () => {
        const { rerender } = render(
            <ChartV3
                options={{ series: [{ type: 'line', data: [1, 2, 3] }] }}
            />
        )

        expect(setOptionSpy).toHaveBeenCalledTimes(1)

        rerender(
            <ChartV3
                options={{ series: [{ type: 'line', data: [1, 2, 3] }] }}
            />
        )

        expect(setOptionSpy).toHaveBeenCalledTimes(1)
    })

    it('calls setOption again when rerendered with changed options', () => {
        const { rerender } = render(
            <ChartV3
                options={{ series: [{ type: 'line', data: [1, 2, 3] }] }}
            />
        )

        rerender(
            <ChartV3
                options={{ series: [{ type: 'line', data: [1, 2, 4] }] }}
            />
        )

        expect(setOptionSpy).toHaveBeenCalledTimes(2)
    })

    it('can delay the initial setOption call to stagger page-load animation', () => {
        vi.useFakeTimers()

        render(
            <ChartV3
                options={{ series: [{ type: 'bar', data: [1, 2, 3] }] }}
                initialAnimationDelay={300}
            />
        )

        expect(initSpy).toHaveBeenCalled()
        expect(setOptionSpy).not.toHaveBeenCalled()

        act(() => {
            vi.advanceTimersByTime(299)
        })
        expect(setOptionSpy).not.toHaveBeenCalled()

        act(() => {
            vi.advanceTimersByTime(1)
        })
        expect(setOptionSpy).toHaveBeenCalledTimes(1)
    })
})
