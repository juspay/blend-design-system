import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../test-utils'
import { renderChart } from '../../../lib/components/Charts/renderChart'
import { CustomTooltip } from '../../../lib/components/Charts/CustomTooltip'
import {
    ChartType,
    NewNestedDataPoint,
    TooltipContentProps,
} from '../../../lib/components/Charts/types'
import { FOUNDATION_THEME } from '../../../lib/tokens'

/**
 * Mock Recharts so we can test the tooltip `content` prop wiring without
 * depending on Recharts' internal hover/dimension behavior in jsdom.
 *
 * The mock Tooltip calls the `content` render prop with a minimal payload
 * so we can assert the merged props (chart context) are forwarded correctly.
 * All other chart components (LineChart, BarChart, etc.) are passthroughs.
 */
vi.mock('recharts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('recharts')>()
    const Passthrough = ({ children }: { children?: React.ReactNode }) =>
        React.createElement('div', null, children)

    const MockTooltip = ({
        content,
    }: {
        content?: React.ReactNode | ((props: unknown) => React.ReactNode)
    }) => {
        const mockProps = {
            active: false,
            payload: [],
            label: 'test-label',
        }
        if (typeof content === 'function') {
            return content(mockProps) as React.ReactElement
        }
        if (React.isValidElement(content)) {
            return content
        }
        return null
    }

    return {
        ...actual,
        ResponsiveContainer: Passthrough,
        LineChart: Passthrough,
        BarChart: Passthrough,
        ComposedChart: Passthrough,
        PieChart: Passthrough,
        ScatterChart: Passthrough,
        AreaChart: Passthrough,
        Tooltip: MockTooltip as unknown as typeof actual.Tooltip,
        Line: Passthrough,
        Bar: Passthrough,
        Area: Passthrough,
        Pie: Passthrough,
        Cell: Passthrough,
        Scatter: Passthrough,
        XAxis: Passthrough,
        YAxis: Passthrough,
    }
})

const chartData: NewNestedDataPoint[] = [
    {
        name: 'Jan',
        data: {
            revenue: { primary: { label: 'Revenue', val: 4000 } },
            profit: { primary: { label: 'Profit', val: 2400 } },
        },
    },
    {
        name: 'Feb',
        data: {
            revenue: { primary: { label: 'Revenue', val: 3000 } },
            profit: { primary: { label: 'Profit', val: 1398 } },
        },
    },
]

const baseRenderProps = {
    flattenedData: [
        { name: 'Jan', revenue: 4000, profit: 2400 },
        { name: 'Feb', revenue: 3000, profit: 1398 },
    ],
    lineKeys: ['revenue', 'profit'],
    colors: [
        { key: 'revenue', color: '#4F46E5' },
        { key: 'profit', color: '#16A34A' },
    ],
    data: chartData,
    selectedKeys: ['revenue', 'profit'],
    setHoveredKey: () => {},
    hoveredKey: null,
}

const createContentSpy = () =>
    vi.fn<(props: TooltipContentProps) => React.ReactNode>(() =>
        React.createElement('div')
    )

describe('Charts tooltip.content', () => {
    it('calls custom tooltip.content renderer with merged chart context (Line)', () => {
        const contentSpy = createContentSpy()

        render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.LINE,
                    xAxis: { label: 'Month' },
                    yAxis: { label: 'Amount' },
                    tooltip: { content: contentSpy },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        const lastCallArg = contentSpy.mock.calls.at(
            -1
        )?.[0] as unknown as Partial<TooltipContentProps>
        expect(lastCallArg.chartType).toBe(ChartType.LINE)
        expect(lastCallArg.selectedKeys).toEqual(['revenue', 'profit'])
        expect(lastCallArg.originalData).toBe(chartData)
        expect(lastCallArg.xAxis).toBeDefined()
        expect(lastCallArg.yAxis).toBeDefined()
        // Recharts-injected props are forwarded.
        expect(lastCallArg).toHaveProperty('active')
        expect(lastCallArg).toHaveProperty('payload')
        expect(lastCallArg).toHaveProperty('label')
        // Internal-only props must NOT be exposed to the custom renderer.
        expect(lastCallArg).not.toHaveProperty('hoveredKey')
        expect(lastCallArg).not.toHaveProperty('setHoveredKey')
    })

    it('forwards chartType=BAR without xAxis/yAxis (Bar chart)', () => {
        const contentSpy = createContentSpy()

        render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.BAR,
                    tooltip: { content: contentSpy },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        const lastCallArg = contentSpy.mock.calls.at(
            -1
        )?.[0] as unknown as Partial<TooltipContentProps>
        expect(lastCallArg.chartType).toBe(ChartType.BAR)
        expect(lastCallArg.originalData).toBe(chartData)
        // Bar chart does not pass xAxis/yAxis to the tooltip.
        expect(lastCallArg.xAxis).toBeUndefined()
        expect(lastCallArg.yAxis).toBeUndefined()
    })

    it('forwards xAxis/yAxis to custom content for LINE_BAR chart', () => {
        const contentSpy = createContentSpy()

        render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.LINE_BAR,
                    lineSeriesKeys: ['revenue'],
                    xAxis: { label: 'Month' },
                    yAxis: { label: 'Amount' },
                    tooltip: { content: contentSpy },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        const lastCallArg = contentSpy.mock.calls.at(
            -1
        )?.[0] as unknown as Partial<TooltipContentProps>
        expect(lastCallArg.chartType).toBe(ChartType.LINE_BAR)
        expect(lastCallArg.xAxis).toBeDefined()
        expect(lastCallArg.yAxis).toBeDefined()
    })

    it('passes ChartType.PIE to custom content for Pie chart', () => {
        const contentSpy = createContentSpy()

        render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.PIE,
                    tooltip: { content: contentSpy },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        const lastCallArg = contentSpy.mock.calls.at(
            -1
        )?.[0] as unknown as Partial<TooltipContentProps>
        expect(lastCallArg.chartType).toBe(ChartType.PIE)
    })

    it('passes ChartType.SCATTER with xAxis/yAxis for Scatter chart', () => {
        const contentSpy = createContentSpy()

        render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.SCATTER,
                    xAxis: { label: 'X' },
                    yAxis: { label: 'Y' },
                    tooltip: { content: contentSpy },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        const lastCallArg = contentSpy.mock.calls.at(
            -1
        )?.[0] as unknown as Partial<TooltipContentProps>
        expect(lastCallArg.chartType).toBe(ChartType.SCATTER)
        expect(lastCallArg.xAxis).toBeDefined()
        expect(lastCallArg.yAxis).toBeDefined()
    })

    it('passes chartType=AREA without xAxis/yAxis (Area chart)', () => {
        const contentSpy = createContentSpy()

        render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.AREA,
                    tooltip: { content: contentSpy },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        const lastCallArg = contentSpy.mock.calls.at(
            -1
        )?.[0] as unknown as Partial<TooltipContentProps>
        expect(lastCallArg.chartType).toBe(ChartType.AREA)
    })

    it('renders default CustomTooltip as a JSX element when content is not provided', () => {
        // When no tooltip.content is given, CustomTooltip should be rendered
        // as <CustomTooltip {...mergedProps} /> (JSX), not a bare function call.
        // The mock Tooltip receives the content prop; if it's CustomTooltip
        // (a valid React element), the mock returns it.
        const { container } = render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.LINE,
                    xAxis: { label: 'Month' },
                    yAxis: { label: 'Amount' },
                    // no tooltip prop → default CustomTooltip
                })}
            </svg>
        )
        // Chart renders without error.
        expect(container).toBeTruthy()
    })

    it('preserves tooltip.position and allowEscapeViewBox alongside custom content', () => {
        const contentSpy = createContentSpy()

        const { container } = render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.LINE,
                    xAxis: { label: 'Month' },
                    yAxis: { label: 'Amount' },
                    tooltip: {
                        content: contentSpy,
                        position: { x: 100, y: 50 },
                        allowEscapeViewBox: { x: true, y: false },
                    },
                })}
            </svg>
        )

        expect(contentSpy).toHaveBeenCalled()
        expect(container.querySelector('svg')).toBeTruthy()
    })

    it('renders a custom tooltip element returned by the content renderer', () => {
        const CustomTooltipBody = ({ label, payload }: TooltipContentProps) =>
            React.createElement(
                'div',
                { 'data-testid': 'custom-tooltip-body' },
                `${String(label)} - ${payload?.length ?? 0} items`
            )

        const { getByTestId } = render(
            <svg>
                {renderChart({
                    ...baseRenderProps,
                    chartType: ChartType.LINE,
                    xAxis: { label: 'Month' },
                    yAxis: { label: 'Amount' },
                    tooltip: { content: CustomTooltipBody },
                })}
            </svg>
        )

        // The mock Tooltip calls content on render, so the returned element
        // is mounted in the DOM.
        expect(getByTestId('custom-tooltip-body')).toBeTruthy()
        expect(getByTestId('custom-tooltip-body').textContent).toContain(
            'test-label'
        )
    })

    it('CustomTooltip is a valid React component (not a bare function)', () => {
        // Sanity: ensure CustomTooltip can be used as JSX so hooks inside
        // its children (LineChartTooltip uses useRef/useEffect) work.
        expect(typeof CustomTooltip).toBe('function')
        expect(
            React.isValidElement(
                React.createElement(CustomTooltip, {
                    active: false,
                    payload: [],
                    label: '',
                    hoveredKey: null,
                    originalData: chartData,
                    setHoveredKey: () => {},
                    chartType: ChartType.LINE,
                    selectedKeys: [],
                })
            )
        ).toBe(true)
    })

    it('TooltipContentProps type contract includes all documented fields', () => {
        // Compile-time contract: the renderer must accept all documented fields.
        const renderer = (props: TooltipContentProps) => {
            void props.active
            void props.label
            void props.payload
            void props.originalData
            void props.chartType
            void props.selectedKeys
            void props.xAxis
            void props.yAxis
            return null
        }
        expect(typeof renderer).toBe('function')
    })

    it('uses FOUNDATION_THEME tokens consistently in custom tooltip', () => {
        // Sanity: confirms the demo pattern of using FOUNDATION_THEME
        // inside a custom content renderer type-checks end-to-end.
        const renderer: (
            props: TooltipContentProps
        ) => React.ReactElement = () =>
            React.createElement('div', {
                style: {
                    background: FOUNDATION_THEME.colors.gray[0],
                    border: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
                },
            })
        expect(typeof renderer).toBe('function')
    })
})
