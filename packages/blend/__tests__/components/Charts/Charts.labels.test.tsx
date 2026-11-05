import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../test-utils'
import { renderChart } from '../../../lib/components/Charts/renderChart'
import {
    ChartType,
    AxisType,
    NewNestedDataPoint,
} from '../../../lib/components/Charts/types'
import {
    getCategoryLabelInterval,
    DEFAULT_MAX_CATEGORY_LABELS,
} from '../../../lib/components/Charts/ChartUtils'

/**
 * Mock Recharts so we can capture the `interval` prop passed to XAxis
 * without depending on Recharts' internal render behavior in jsdom.
 */
const XAxisSpy = vi.hoisted(() =>
    vi.fn((props: Record<string, unknown>) => {
        void props
        return null
    })
)

vi.mock('recharts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('recharts')>()
    const Passthrough = ({ children }: { children?: React.ReactNode }) =>
        React.createElement('div', null, children)

    return {
        ...actual,
        ResponsiveContainer: Passthrough,
        LineChart: Passthrough,
        BarChart: Passthrough,
        ComposedChart: Passthrough,
        PieChart: Passthrough,
        ScatterChart: Passthrough,
        AreaChart: Passthrough,
        Tooltip: Passthrough,
        Line: Passthrough,
        Bar: Passthrough,
        Area: Passthrough,
        Pie: Passthrough,
        Cell: Passthrough,
        CartesianGrid: Passthrough,
        Scatter: Passthrough,
        XAxis: XAxisSpy as unknown as typeof actual.XAxis,
        YAxis: Passthrough,
    }
})

const makeData = (count: number): NewNestedDataPoint[] =>
    Array.from({ length: count }, (_, i) => ({
        name: `Category ${i + 1}`,
        data: {
            revenue: { primary: { label: 'Revenue', val: 100 + i } },
        },
    }))

const makeProps = (count: number) => ({
    flattenedData: Array.from({ length: count }, (_, i) => ({
        name: `Category ${i + 1}`,
        revenue: 100 + i,
    })),
    lineKeys: ['revenue'],
    colors: [{ key: 'revenue', color: '#4F46E5' }],
    data: makeData(count),
    selectedKeys: ['revenue'],
    setHoveredKey: () => {},
    hoveredKey: null,
})

const renderChartFor = (props: Record<string, unknown>) =>
    render(<svg>{renderChart(props as never)}</svg>)

const getLastXAxisInterval = () => {
    expect(XAxisSpy).toHaveBeenCalled()
    const lastCall = XAxisSpy.mock.calls.at(-1)
    expect(lastCall).toBeDefined()
    return (lastCall?.[0] as { interval?: number }).interval
}

describe('Charts x-axis label thinning', () => {
    it('thins BAR with 25 points to interval 2 (every 3rd label)', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(25),
            chartType: ChartType.BAR,
        })
        expect(getLastXAxisInterval()).toBe(2)
    })

    it('leaves BAR with 12 points unthinned (interval undefined)', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(12),
            chartType: ChartType.BAR,
        })
        expect(getLastXAxisInterval()).toBeUndefined()
    })

    it('passes a consumer interval through untouched', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(25),
            chartType: ChartType.BAR,
            xAxis: { interval: 3 },
        })
        expect(getLastXAxisInterval()).toBe(3)
    })

    it('honors maxTicks: 5 with 20 points → interval 3', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(20),
            chartType: ChartType.BAR,
            xAxis: { maxTicks: 5 },
        })
        expect(getLastXAxisInterval()).toBe(3)
    })

    it('halves the label budget on small screens (30 pts → interval 4)', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(30),
            chartType: ChartType.BAR,
            isSmallScreen: true,
        })
        // budget = max(3, floor(12 / 2)) = 6 → interval = ceil(30 / 6) - 1 = 4
        expect(getLastXAxisInterval()).toBe(4)
    })

    it('keeps the custom ticks force-0 path (no thinning)', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(25),
            chartType: ChartType.BAR,
            xAxis: { ticks: ['Category 1', 'Category 10'] },
        })
        expect(getLastXAxisInterval()).toBe(0)
    })

    it('thins LINE with 25 points to interval 2', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(25),
            chartType: ChartType.LINE,
        })
        expect(getLastXAxisInterval()).toBe(2)
    })

    it('does not thin SCATTER (numeric axis)', () => {
        XAxisSpy.mockClear()
        renderChartFor({
            ...makeProps(200),
            chartType: ChartType.SCATTER,
        })
        expect(getLastXAxisInterval()).toBeUndefined()
    })

    it('lets the DATE_TIME smart-ticks path own interval', () => {
        XAxisSpy.mockClear()
        const timestamps = Array.from({ length: 25 }, (_, i) => ({
            name: `2024-01-${String(i + 1).padStart(2, '0')}`,
            revenue: 100 + i,
        }))
        renderChartFor({
            flattenedData: timestamps,
            lineKeys: ['revenue'],
            colors: [{ key: 'revenue', color: '#4F46E5' }],
            data: timestamps.map((item) => ({
                name: item.name,
                data: { revenue: { primary: { label: 'Revenue', val: 1 } } },
            })),
            selectedKeys: ['revenue'],
            setHoveredKey: () => {},
            hoveredKey: null,
            chartType: ChartType.BAR,
            xAxis: { type: AxisType.DATE_TIME },
        })
        // Smart-ticks path sets interval 0 (or preserveStartEnd) via custom
        // ticks, never the category thinning value.
        const interval = getLastXAxisInterval()
        expect([0, 'preserveStartEnd']).toContain(interval)
    })
})

describe('getCategoryLabelInterval', () => {
    it('returns undefined for zero data points', () => {
        expect(getCategoryLabelInterval(0)).toBeUndefined()
    })

    it('returns undefined when maxTicks is not positive', () => {
        expect(getCategoryLabelInterval(50, 0)).toBeUndefined()
        expect(getCategoryLabelInterval(50, -1)).toBeUndefined()
    })

    it('returns undefined when n equals maxTicks', () => {
        expect(getCategoryLabelInterval(12, 12)).toBeUndefined()
    })

    it('returns 1 when n is exactly maxTicks + 1', () => {
        // ceil(13 / 12) - 1 === 1 — one label over budget drops every
        // other label, keeping the rendered count at 7.
        expect(getCategoryLabelInterval(13, 12)).toBe(1)
    })

    it('computes interval = ceil(n / maxTicks) - 1', () => {
        expect(getCategoryLabelInterval(25, 12)).toBe(2)
        expect(getCategoryLabelInterval(24, 12)).toBe(1)
        expect(getCategoryLabelInterval(100, 12)).toBe(8)
    })

    it('defaults maxTicks to DEFAULT_MAX_CATEGORY_LABELS', () => {
        expect(DEFAULT_MAX_CATEGORY_LABELS).toBe(12)
        expect(getCategoryLabelInterval(DEFAULT_MAX_CATEGORY_LABELS + 12)).toBe(
            1
        )
    })
})
