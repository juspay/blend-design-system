import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef } from 'react'
import { Expand, LineChart, PieChart, BarChart3 } from 'lucide-react'

import {
    ChartContainerV2,
    ChartHeaderV2,
    ChartV2,
    ChartV2Fullscreen,
    ChartV2Legend,
    type ChartV2Options,
    type ChartV2ReactRefObject,
} from '../../../../../../packages/blend/lib/components/ChartsV2'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const chartColors = ['#2563eb', '#16a34a', '#f97316', '#7c3aed', '#dc2626']

const baseChartOptions: ChartV2Options = {
    chart: {
        height: 360,
        animation: false,
    },
    accessibility: {
        enabled: false,
    },
    credits: {
        enabled: false,
    },
    plotOptions: {
        series: {
            animation: false,
        },
    },
}

const lineChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'line',
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        title: {
            text: 'Month',
        },
    },
    yAxis: {
        title: {
            text: 'Amount ($)',
        },
    },
    tooltip: {
        valuePrefix: '$',
        valueSuffix: 'k',
    },
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
        {
            type: 'line',
            name: 'Expenses',
            color: chartColors[2],
            data: [24, 25, 23, 29, 32, 34],
        },
    ],
}

const columnChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'column',
    },
    xAxis: {
        categories: ['Cards', 'UPI', 'Wallets', 'NetBanking'],
        title: {
            text: 'Payment method',
        },
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Transactions',
        },
    },
    tooltip: {
        valueSuffix: 'k',
    },
    series: [
        {
            type: 'column',
            name: 'Successful',
            color: chartColors[0],
            data: [128, 186, 74, 52],
        },
        {
            type: 'column',
            name: 'Failed',
            color: chartColors[4],
            data: [11, 17, 9, 6],
        },
    ],
}

const pieChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'pie',
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
        ...baseChartOptions.plotOptions,
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.0f}%',
            },
        },
    },
    series: [
        {
            type: 'pie',
            name: 'Share',
            data: [
                { name: 'Cards', y: 34, color: chartColors[0] },
                { name: 'UPI', y: 46, color: chartColors[1] },
                { name: 'Wallets', y: 12, color: chartColors[2] },
                { name: 'NetBanking', y: 8, color: chartColors[3] },
            ],
        },
    ],
}

const donutChartOptions: ChartV2Options = {
    ...pieChartOptions,
    plotOptions: {
        ...pieChartOptions.plotOptions,
        pie: {
            ...(pieChartOptions.plotOptions?.pie ?? {}),
            innerSize: '62%',
        },
    },
}

const horizontalBarChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'bar',
    },
    xAxis: {
        categories: ['Checkout', 'Payment page', 'OTP', 'Bank redirect'],
        title: {
            text: 'Funnel stage',
        },
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Users',
        },
    },
    tooltip: {
        valueSuffix: 'k users',
    },
    series: [
        {
            type: 'bar',
            name: 'Completed',
            color: chartColors[0],
            data: [132, 118, 96, 82],
        },
        {
            type: 'bar',
            name: 'Dropped',
            color: chartColors[4],
            data: [14, 22, 18, 9],
        },
    ],
}

const stackedColumnChartOptions: ChartV2Options = {
    ...columnChartOptions,
    plotOptions: {
        ...baseChartOptions.plotOptions,
        column: {
            stacking: 'normal',
        },
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Transactions',
        },
        stackLabels: {
            enabled: true,
        },
    },
    series: [
        {
            type: 'column',
            name: 'Domestic',
            color: chartColors[0],
            data: [92, 134, 48, 36],
        },
        {
            type: 'column',
            name: 'International',
            color: chartColors[3],
            data: [36, 52, 26, 16],
        },
        {
            type: 'column',
            name: 'Failed',
            color: chartColors[4],
            data: [11, 17, 9, 6],
        },
    ],
}

const stackedBarChartOptions: ChartV2Options = {
    ...horizontalBarChartOptions,
    plotOptions: {
        ...baseChartOptions.plotOptions,
        bar: {
            stacking: 'percent',
        },
    },
    tooltip: {
        valueSuffix: '%',
    },
    series: [
        {
            type: 'bar',
            name: 'Mobile',
            color: chartColors[0],
            data: [72, 64, 58, 49],
        },
        {
            type: 'bar',
            name: 'Desktop',
            color: chartColors[1],
            data: [22, 29, 34, 42],
        },
        {
            type: 'bar',
            name: 'Tablet',
            color: chartColors[2],
            data: [6, 7, 8, 9],
        },
    ],
}

const areaChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'area',
    },
    xAxis: {
        categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        title: {
            text: 'Time',
        },
    },
    yAxis: {
        title: {
            text: 'Requests per minute',
        },
    },
    tooltip: {
        valueSuffix: ' rpm',
    },
    plotOptions: {
        ...baseChartOptions.plotOptions,
        area: {
            fillOpacity: 0.18,
            marker: {
                enabled: false,
            },
        },
    },
    series: [
        {
            type: 'area',
            name: 'API traffic',
            color: chartColors[0],
            data: [240, 180, 420, 680, 610, 520],
        },
        {
            type: 'area',
            name: 'Payment traffic',
            color: chartColors[1],
            data: [120, 90, 260, 430, 390, 340],
        },
    ],
}

const scatterChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'scatter',
    },
    xAxis: {
        title: {
            text: 'Latency (ms)',
        },
    },
    yAxis: {
        title: {
            text: 'Conversion (%)',
        },
    },
    tooltip: {
        pointFormat:
            'Latency: <b>{point.x} ms</b><br/>Conversion: <b>{point.y}%</b>',
    },
    series: [
        {
            type: 'scatter',
            name: 'Checkout sessions',
            color: chartColors[3],
            data: [
                [120, 72],
                [180, 69],
                [220, 66],
                [260, 61],
                [310, 58],
                [360, 54],
                [420, 49],
                [500, 43],
            ],
        },
    ],
}

const mixedChartOptions: ChartV2Options = {
    ...baseChartOptions,
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        title: {
            text: 'Month',
        },
    },
    yAxis: {
        title: {
            text: 'Volume',
        },
    },
    tooltip: {
        shared: true,
    },
    series: [
        {
            type: 'column',
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

const sankeyChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        height: 340,
    },
    title: {
        text: '',
    },
    series: [
        {
            type: 'sankey',
            name: 'Checkout flow',
            keys: ['from', 'to', 'weight'],
            data: [
                ['Landing', 'Checkout', 156],
                ['Checkout', 'Payment', 132],
                ['Checkout', 'Abandoned', 24],
                ['Payment', 'Success', 104],
                ['Payment', 'Retry', 18],
                ['Payment', 'Failed', 10],
                ['Retry', 'Success', 11],
                ['Retry', 'Failed', 7],
            ],
            colors: chartColors,
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
        title: 'Column',
        subtitle: 'Vertical category comparison',
        icon: <BarChart3 size={20} />,
        options: columnChartOptions,
    },
    {
        title: 'Horizontal bar',
        subtitle: 'Wide labels and ranked values',
        icon: <BarChart3 size={20} />,
        options: horizontalBarChartOptions,
    },
    {
        title: 'Area',
        subtitle: 'Volume and cumulative movement',
        icon: <LineChart size={20} />,
        options: areaChartOptions,
    },
    {
        title: 'Scatter',
        subtitle: 'Relationship between two metrics',
        icon: <LineChart size={20} />,
        options: scatterChartOptions,
    },
    {
        title: 'Donut',
        subtitle: 'Part-to-whole distribution',
        icon: <PieChart size={20} />,
        options: donutChartOptions,
    },
]

const meta: Meta<typeof ChartV2> = {
    title: 'Components/ChartsV2',
    component: ChartV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
        docsSubtitle:
            'Token-aware Highcharts wrapper with Blend container, header, legend, loading, no-data, and fullscreen helpers.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import {
  ChartContainerV2,
  ChartHeaderV2,
  ChartV2,
  ChartV2Legend,
} from '@juspay/blend-design-system';

const chartRef = useRef<ChartV2ReactRefObject>(null);

<ChartContainerV2>
  <ChartHeaderV2>Monthly performance</ChartHeaderV2>
  <ChartV2 ref={chartRef} options={options} />
  <ChartV2Legend chartRef={chartRef} />
</ChartContainerV2>
\`\`\`

ChartsV2 accepts native Highcharts options and merges Blend chart tokens for axes, legend, container, and empty/loading states.
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 760, maxWidth: 'calc(100vw - 48px)' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        options: {
            control: 'object',
            description: 'Native Highcharts options object',
        },
        skeleton: {
            control: 'object',
            description: 'Loading skeleton state configuration',
        },
        noData: {
            control: 'object',
            description:
                'Empty state configuration shown when series data is empty',
        },
        highcharts: {
            control: false,
        },
    },
    args: {
        options: lineChartOptions,
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChartV2>

const HeaderTitle = ({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode
    title: string
    subtitle: string
}) => (
    <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            {icon}
            <div>
                <div className="text-base font-semibold">{title}</div>
                <div className="text-xs text-slate-500">{subtitle}</div>
            </div>
        </div>
    </div>
)

const ChartShell = ({
    title,
    subtitle,
    icon,
    options,
    legend = true,
}: {
    title: string
    subtitle: string
    icon: React.ReactNode
    options: ChartV2Options
    legend?: boolean
}) => {
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <ChartContainerV2>
            <ChartHeaderV2>
                <HeaderTitle icon={icon} title={title} subtitle={subtitle} />
            </ChartHeaderV2>
            <div className="p-4">
                <ChartV2
                    ref={chartRef}
                    options={{
                        ...options,
                        legend: {
                            enabled: false,
                        },
                    }}
                />
                {legend && (
                    <div className="pt-3">
                        <ChartV2Legend chartRef={chartRef} />
                    </div>
                )}
            </div>
        </ChartContainerV2>
    )
}

function CustomLegendValuesDemo() {
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <ChartContainerV2>
            <ChartHeaderV2>
                <HeaderTitle
                    icon={<LineChart size={20} />}
                    title="Quarterly growth"
                    subtitle="Legend values supplied by the app"
                />
            </ChartHeaderV2>
            <div className="p-4">
                <ChartV2
                    ref={chartRef}
                    options={{
                        ...lineChartOptions,
                        legend: {
                            enabled: false,
                        },
                    }}
                />
                <div className="pt-3">
                    <ChartV2Legend
                        chartRef={chartRef}
                        customLegendItems={[
                            {
                                key: 'Revenue',
                                name: 'Revenue',
                                value: '$68k',
                            },
                            {
                                key: 'Profit',
                                name: 'Profit',
                                value: '$34k',
                            },
                            {
                                key: 'Expenses',
                                name: 'Expenses',
                                value: '$34k',
                            },
                        ]}
                    />
                </div>
            </div>
        </ChartContainerV2>
    )
}

export const Default: Story = {
    render: (args) => <ChartV2 {...args} />,
}

export const LineChartExample: Story = {
    name: 'Line chart',
    render: () => (
        <ChartShell
            title="Monthly financial overview"
            subtitle="Revenue, profit, and expenses"
            icon={<LineChart size={20} />}
            options={lineChartOptions}
        />
    ),
}

export const ColumnChartExample: Story = {
    name: 'Column chart',
    render: () => (
        <ChartShell
            title="Payment method performance"
            subtitle="Successful and failed transactions"
            icon={<BarChart3 size={20} />}
            options={columnChartOptions}
        />
    ),
}

export const HorizontalBarChartExample: Story = {
    name: 'Horizontal bar chart',
    render: () => (
        <ChartShell
            title="Checkout funnel by stage"
            subtitle="Horizontal bars for long labels and ranked values"
            icon={<BarChart3 size={20} />}
            options={horizontalBarChartOptions}
        />
    ),
}

export const StackedColumnChartExample: Story = {
    name: 'Stacked column chart',
    render: () => (
        <ChartShell
            title="Transaction mix"
            subtitle="Stacked domestic, international, and failed volume"
            icon={<BarChart3 size={20} />}
            options={stackedColumnChartOptions}
        />
    ),
}

export const StackedHorizontalBarChartExample: Story = {
    name: 'Stacked horizontal bar chart',
    render: () => (
        <ChartShell
            title="Device mix by funnel stage"
            subtitle="Percent stacked horizontal bars"
            icon={<BarChart3 size={20} />}
            options={stackedBarChartOptions}
        />
    ),
}

export const AreaChartExample: Story = {
    name: 'Area chart',
    render: () => (
        <ChartShell
            title="Traffic through the day"
            subtitle="Volume comparison with low-opacity area fills"
            icon={<LineChart size={20} />}
            options={areaChartOptions}
        />
    ),
}

export const ScatterChartExample: Story = {
    name: 'Scatter chart',
    render: () => (
        <ChartShell
            title="Latency vs conversion"
            subtitle="Relationship between checkout speed and conversion"
            icon={<LineChart size={20} />}
            options={scatterChartOptions}
        />
    ),
}

export const MixedChartExample: Story = {
    name: 'Mixed column and line chart',
    render: () => (
        <ChartShell
            title="Transactions and success rate"
            subtitle="Column and line series in one chart"
            icon={<LineChart size={20} />}
            options={mixedChartOptions}
        />
    ),
}

export const PieChartExample: Story = {
    name: 'Pie chart',
    render: () => (
        <ChartShell
            title="Payment share"
            subtitle="Distribution by payment method"
            icon={<PieChart size={20} />}
            options={pieChartOptions}
        />
    ),
}

export const DonutChartExample: Story = {
    name: 'Donut chart',
    render: () => (
        <ChartShell
            title="Payment share"
            subtitle="Pie chart with inner radius for donut layouts"
            icon={<PieChart size={20} />}
            options={donutChartOptions}
        />
    ),
}

export const SankeyChartExample: Story = {
    name: 'Sankey chart',
    render: () => (
        <ChartShell
            title="Checkout flow"
            subtitle="Weighted movement across checkout states"
            icon={<LineChart size={20} />}
            options={sankeyChartOptions}
            legend={false}
        />
    ),
}

export const ChartTypesGallery: Story = {
    name: 'Chart types gallery',
    render: () => (
        <div className="grid grid-cols-1 gap-5">
            {chartGallery.map((chart) => (
                <ChartShell
                    key={chart.title}
                    title={chart.title}
                    subtitle={chart.subtitle}
                    icon={chart.icon}
                    options={{
                        ...chart.options,
                        chart: {
                            ...chart.options.chart,
                            height: 280,
                        },
                    }}
                />
            ))}
        </div>
    ),
    parameters: {
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 800,
        },
    },
}

export const CustomLegendValues: Story = {
    name: 'Custom legend values',
    render: () => <CustomLegendValuesDemo />,
}

export const Loading: Story = {
    args: {
        skeleton: {
            show: true,
            height: 360,
        },
    },
}

export const NoData: Story = {
    args: {
        options: {
            ...baseChartOptions,
            series: [],
        },
        noData: {
            title: 'No chart data',
            subtitle: 'Try changing the filters or date range.',
        },
    },
}

export const Fullscreen: Story = {
    render: () => (
        <ChartV2Fullscreen>
            {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                <div
                    style={{
                        width: '100%',
                        height: isFullscreen ? '100%' : 'auto',
                        padding: isFullscreen ? 24 : 0,
                    }}
                >
                    <ChartContainerV2>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between gap-4">
                                <HeaderTitle
                                    icon={<LineChart size={20} />}
                                    title="Fullscreen chart"
                                    subtitle="Responsive container with fullscreen controls"
                                />
                                <button
                                    type="button"
                                    className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium"
                                    onClick={
                                        isFullscreen
                                            ? exitFullscreen
                                            : enterFullscreen
                                    }
                                    aria-label={
                                        isFullscreen
                                            ? 'Exit fullscreen'
                                            : 'Enter fullscreen'
                                    }
                                >
                                    <Expand size={16} />
                                    {isFullscreen ? 'Exit' : 'Expand'}
                                </button>
                            </div>
                        </ChartHeaderV2>
                        <div className="p-4">
                            <ChartV2
                                options={{
                                    ...lineChartOptions,
                                    chart: {
                                        ...lineChartOptions.chart,
                                        height: isFullscreen ? 520 : 360,
                                    },
                                }}
                            />
                        </div>
                    </ChartContainerV2>
                </div>
            )}
        </ChartV2Fullscreen>
    ),
}
