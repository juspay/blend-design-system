import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef } from 'react'
import { BarChart3, LineChart, PieChart } from 'lucide-react'

import {
    ChartContainerV3,
    ChartHeaderV3,
    ChartV3,
    ChartV3Legend,
    type ChartV3Options,
    type ChartV3ReactRefObject,
} from '../../../../../../packages/blend/lib/components/ChartsV3'

const chartColors = ['#2563eb', '#16a34a', '#f97316', '#7c3aed', '#dc2626']

const lineChartOptions: ChartV3Options = {
    title: { text: 'Revenue trend', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        name: 'Month',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: { type: 'value', name: 'Amount ($)' },
    series: [
        {
            type: 'line',
            name: 'Revenue',
            color: chartColors[0],
            data: [42, 47, 39, 54, 61, 68],
        },
        {
            type: 'line',
            name: 'Profit',
            color: chartColors[1],
            data: [18, 22, 16, 25, 29, 34],
        },
    ],
}

const stackedBarOptions: ChartV3Options = {
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['Checkout', 'Payment', 'OTP', 'Bank redirect'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            stack: 'users',
            name: 'Mobile',
            color: chartColors[0],
            data: [72, 64, 58, 49],
        },
        {
            type: 'bar',
            stack: 'users',
            name: 'Desktop',
            color: chartColors[1],
            data: [22, 29, 34, 42],
        },
        {
            type: 'bar',
            stack: 'users',
            name: 'Tablet',
            color: chartColors[2],
            data: [6, 7, 8, 9],
        },
    ],
}

const pieChartOptions: ChartV3Options = {
    tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
    legend: { show: false },
    series: [
        {
            type: 'pie',
            name: 'Share',
            radius: ['54%', '76%'],
            avoidLabelOverlap: true,
            label: { show: false },
            data: [
                {
                    name: 'Cards',
                    value: 34,
                    itemStyle: { color: chartColors[0] },
                },
                {
                    name: 'UPI',
                    value: 46,
                    itemStyle: { color: chartColors[1] },
                },
                {
                    name: 'Wallets',
                    value: 12,
                    itemStyle: { color: chartColors[2] },
                },
                {
                    name: 'NetBanking',
                    value: 8,
                    itemStyle: { color: chartColors[3] },
                },
            ],
        },
    ],
}

const mixedChartOptions: ChartV3Options = {
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Transactions',
            color: chartColors[0],
            data: [128, 142, 136, 158, 171, 188],
        },
        {
            type: 'line',
            name: 'Success rate',
            color: chartColors[1],
            data: [92, 93, 91, 94, 95, 96],
        },
    ],
}

const sankeyChartOptions: ChartV3Options = {
    tooltip: { trigger: 'item' },
    series: [
        {
            type: 'sankey',
            name: 'Checkout flow',
            data: [
                { name: 'Landing' },
                { name: 'Checkout' },
                { name: 'Payment' },
                { name: 'Abandoned' },
                { name: 'Success' },
                { name: 'Retry' },
                { name: 'Failed' },
            ],
            links: [
                { source: 'Landing', target: 'Checkout', value: 156 },
                { source: 'Checkout', target: 'Payment', value: 132 },
                { source: 'Checkout', target: 'Abandoned', value: 24 },
                { source: 'Payment', target: 'Success', value: 104 },
                { source: 'Payment', target: 'Retry', value: 18 },
                { source: 'Payment', target: 'Failed', value: 10 },
                { source: 'Retry', target: 'Success', value: 11 },
                { source: 'Retry', target: 'Failed', value: 7 },
            ],
        },
    ],
}

const rangeRenderItem = (
    params: {
        coordSys?: { x: number; y: number; width: number; height: number }
    },
    api: {
        value: (index: number) => number
        coord: (value: unknown[]) => number[]
        size: (value: number[]) => number[]
        style: () => Record<string, unknown>
    }
) => {
    const categoryIndex = api.value(0)
    const start = api.coord([api.value(1), categoryIndex])
    const end = api.coord([api.value(2), categoryIndex])
    const height = api.size([0, 1])[1] * 0.28
    const coord = params.coordSys

    if (!coord) return null

    return {
        type: 'rect',
        shape: {
            x: Math.max(start[0], coord.x),
            y: start[1] - height / 2,
            width: Math.max(
                1,
                Math.min(end[0], coord.x + coord.width) - start[0]
            ),
            height,
            r: 4,
        },
        style: api.style(),
    }
}

const rangeChartOptions: ChartV3Options = {
    tooltip: {
        formatter: (params) => {
            const value = Array.isArray(params)
                ? params[0]?.value
                : params.value
            return Array.isArray(value)
                ? `Range: ${value[1]} - ${value[2]}`
                : 'Range'
        },
    },
    xAxis: { type: 'value', min: 0, max: 24 },
    yAxis: {
        type: 'category',
        data: ['Bank A', 'Bank B', 'Bank C'],
    },
    series: [
        {
            type: 'custom',
            name: 'Outage window',
            renderItem: rangeRenderItem,
            encode: { x: [1, 2], y: 0 },
            itemStyle: { color: chartColors[4] },
            data: [
                [0, 3, 8],
                [1, 9, 12],
                [2, 15, 21],
            ],
        },
    ],
}

const chartGallery = [
    {
        title: 'Line',
        subtitle: 'Trend over time',
        icon: <LineChart size={20} />,
        options: lineChartOptions,
    },
    {
        title: 'Stacked bar',
        subtitle: 'Stacked category comparison',
        icon: <BarChart3 size={20} />,
        options: stackedBarOptions,
    },
    {
        title: 'Donut',
        subtitle: 'Part-to-whole distribution',
        icon: <PieChart size={20} />,
        options: pieChartOptions,
    },
    {
        title: 'Mixed',
        subtitle: 'Line and bar together',
        icon: <LineChart size={20} />,
        options: mixedChartOptions,
    },
]

const meta: Meta<typeof ChartV3> = {
    title: 'Components/ChartsV3',
    component: ChartV3,
    parameters: {
        docs: {
            description: {
                component:
                    'Token-aware Apache ECharts implementation with Blend container, header, legend, loading, no-data, and fullscreen helpers.',
            },
        },
    },
    argTypes: {
        options: {
            control: 'object',
            description: 'Native Apache ECharts option object',
        },
        renderer: {
            control: 'radio',
            options: ['canvas', 'svg'],
        },
    },
}

export default meta
type Story = StoryObj<typeof ChartV3>

const ChartFrame = ({ options }: { options: ChartV3Options }) => {
    const chartRef = useRef<ChartV3ReactRefObject>(null)

    return (
        <ChartContainerV3>
            <ChartHeaderV3>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <LineChart size={18} />
                    <strong>ChartsV3</strong>
                </div>
            </ChartHeaderV3>
            <div style={{ padding: 20 }}>
                <ChartV3 ref={chartRef} options={options} />
                <div style={{ marginTop: 16 }}>
                    <ChartV3Legend chartRef={chartRef} />
                </div>
            </div>
        </ChartContainerV3>
    )
}

export const Playground: Story = {
    args: {
        options: lineChartOptions,
        renderer: 'canvas',
    },
}

export const Gallery: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: 20,
            }}
        >
            {chartGallery.map((chart) => (
                <ChartContainerV3 key={chart.title}>
                    <ChartHeaderV3>
                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                                alignItems: 'center',
                            }}
                        >
                            {chart.icon}
                            <div>
                                <strong>{chart.title}</strong>
                                <div style={{ fontSize: 12 }}>
                                    {chart.subtitle}
                                </div>
                            </div>
                        </div>
                    </ChartHeaderV3>
                    <div style={{ padding: 20 }}>
                        <ChartV3 options={chart.options} height={300} />
                    </div>
                </ChartContainerV3>
            ))}
        </div>
    ),
}

export const ExternalLegend: Story = {
    render: () => <ChartFrame options={lineChartOptions} />,
}

export const Sankey: Story = {
    render: () => <ChartFrame options={sankeyChartOptions} />,
}

export const RangeTimeline: Story = {
    render: () => <ChartFrame options={rangeChartOptions} />,
}
