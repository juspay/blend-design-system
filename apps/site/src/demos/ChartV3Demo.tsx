import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
    BarChart3,
    ChevronsDownUp,
    Expand,
    LineChart,
    PieChart,
} from 'lucide-react'
import {
    ChartContainerV3,
    ChartHeaderV3,
    ChartV3,
    ChartV3Fullscreen,
    ChartV3Legend,
    type ChartV3Options,
    type ChartV3ReactRefObject,
} from '../../../../packages/blend/lib/components/ChartsV3'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import { Data as outageTrendData } from './ChartV2Data'
import {
    areaChartGoIndigoData,
    areaChartOverallData,
    columnChartGoIndigoData,
    columnChartOverallData,
    dashboardSeriesData,
    lineChartGoIndigoData,
    lineChartOverallData,
    lineColumnGoIndigoData,
    lineColumnOrangeData,
    lineColumnOverallData,
    pieChartSeriesData,
    sankeySeriesData,
    scatterChartGoIndigoData,
    scatterChartOverallData,
} from './ChartV2DemoData'

const chartColors = ['#2563eb', '#16a34a', '#f97316', '#7c3aed', '#dc2626']
const outageRed = FOUNDATION_THEME.colors.red[500] ?? '#ef4444'
const outageGreen = FOUNDATION_THEME.colors.green[400] ?? '#22c55e'
const outagePurple = FOUNDATION_THEME.colors.purple[400] ?? '#a855f7'
const denseSeries = Array.from({ length: 160 }, (_, index) => [
    `2026-07-${String((index % 30) + 1).padStart(2, '0')} ${String(index % 24).padStart(2, '0')}:00`,
    Math.round(68 + Math.sin(index / 8) * 18 + (index % 13)),
])

type TimestampPoint = { x: number; y: number }
type OutageRange = {
    x: number
    x2: number
    y: number
    color: string
    name: string
    downTime?: string
    fluctuation?: string
}

const toTimeSeriesData = (points: TimestampPoint[]) =>
    points.map((point) => [point.x, point.y])

const formatUTCTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const month = months[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    return `${month} ${day}, ${year} | ${hours}:${minutes}`
}

const formatShortUTCTime = (value: number | string) => {
    const timestamp = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(timestamp)) return String(value)

    const date = new Date(timestamp)
    const month = date.toLocaleString('en-US', {
        month: 'short',
        timeZone: 'UTC',
    })
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    return `${month} ${day}, ${hours}:${minutes}`
}

const compactTimeXAxis = {
    type: 'time' as const,
    axisLabel: {
        formatter: formatShortUTCTime,
        hideOverlap: true,
        margin: 14,
    },
}

const denseTimeGrid = {
    top: 28,
    right: 18,
    bottom: 58,
    left: 12,
}

const denseTimeDataZoom = [{ type: 'inside' as const, start: 55, end: 100 }]

const lineChartOptions: ChartV3Options = {
    title: { text: 'Revenue trend', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        name: 'Month',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: { type: 'value', name: 'Amount' },
    series: [
        {
            type: 'line',
            name: 'Revenue',
            color: chartColors[0],
            smooth: true,
            data: [42, 47, 39, 54, 61, 68],
        },
        {
            type: 'line',
            name: 'Profit',
            color: chartColors[1],
            smooth: true,
            data: [18, 22, 16, 25, 29, 34],
        },
    ],
}

const stackedBarOptions: ChartV3Options = {
    title: { text: 'Payment channel split', show: false },
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

const donutChartOptions: ChartV3Options = {
    title: { text: 'Payment methods', show: false },
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
    title: { text: 'Transactions and success rate', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: [
        { type: 'value', name: 'Transactions' },
        { type: 'value', name: 'Success rate', min: 85, max: 100 },
    ],
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
            yAxisIndex: 1,
            color: chartColors[1],
            data: [92, 93, 91, 94, 95, 96],
        },
    ],
}

const areaChartOptions: ChartV3Options = {
    title: { text: 'Active merchants', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Active merchants',
            color: chartColors[0],
            smooth: true,
            areaStyle: { opacity: 0.18 },
            data: [120, 182, 191, 234, 290, 330, 310],
        },
        {
            type: 'line',
            name: 'New merchants',
            color: chartColors[1],
            smooth: true,
            areaStyle: { opacity: 0.12 },
            data: [40, 62, 71, 84, 110, 122, 118],
        },
    ],
}

const horizontalBarOptions: ChartV3Options = {
    title: { text: 'Top issuers', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'value' },
    yAxis: {
        type: 'category',
        data: ['Axis', 'HDFC', 'ICICI', 'SBI', 'Kotak'],
    },
    series: [
        {
            type: 'bar',
            name: 'Approvals',
            color: chartColors[0],
            data: [72, 88, 64, 79, 58],
        },
    ],
}

const scatterChartOptions: ChartV3Options = {
    title: { text: 'Latency vs success', show: false },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value', name: 'Latency ms' },
    yAxis: { type: 'value', name: 'Success %', min: 85, max: 100 },
    series: [
        {
            type: 'scatter',
            name: 'Gateways',
            color: chartColors[3],
            symbolSize: 12,
            data: [
                [120, 96.2],
                [180, 94.8],
                [95, 97.1],
                [240, 91.9],
                [150, 95.4],
                [310, 89.8],
            ],
        },
    ],
}

const bubbleChartOptions: ChartV3Options = {
    title: { text: 'Volume, latency, value', show: false },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value', name: 'Latency ms' },
    yAxis: { type: 'value', name: 'Success %', min: 85, max: 100 },
    series: [
        {
            type: 'scatter',
            name: 'Payment routes',
            color: chartColors[2],
            symbolSize: (value) =>
                Array.isArray(value) ? Number(value[2]) / 6 : 12,
            data: [
                [110, 97, 70],
                [185, 94, 118],
                [90, 98, 52],
                [260, 91, 144],
                [145, 96, 96],
            ],
        },
    ],
}

const radarChartOptions: ChartV3Options = {
    title: { text: 'Gateway scorecard', show: false },
    tooltip: { trigger: 'item' },
    radar: {
        indicator: [
            { name: 'Success', max: 100 },
            { name: 'Latency', max: 100 },
            { name: 'Cost', max: 100 },
            { name: 'Coverage', max: 100 },
            { name: 'Reliability', max: 100 },
        ],
    },
    series: [
        {
            type: 'radar',
            name: 'Gateway health',
            data: [
                {
                    name: 'Gateway A',
                    value: [94, 78, 86, 92, 88],
                    itemStyle: { color: chartColors[0] },
                    areaStyle: { opacity: 0.14 },
                },
                {
                    name: 'Gateway B',
                    value: [89, 91, 74, 84, 93],
                    itemStyle: { color: chartColors[1] },
                    areaStyle: { opacity: 0.14 },
                },
            ],
        },
    ],
}

const heatmapChartOptions: ChartV3Options = {
    title: { text: 'Hourly traffic heatmap', show: false },
    tooltip: { position: 'top' },
    grid: { top: 24, left: 56, right: 24, bottom: 48 },
    xAxis: {
        type: 'category',
        data: ['00', '04', '08', '12', '16', '20'],
    },
    yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    visualMap: {
        min: 0,
        max: 100,
        show: false,
        inRange: { color: ['#dbeafe', '#2563eb'] },
    },
    series: [
        {
            type: 'heatmap',
            name: 'Traffic',
            data: [
                [0, 0, 12],
                [1, 0, 24],
                [2, 0, 48],
                [3, 0, 70],
                [4, 0, 56],
                [5, 0, 42],
                [0, 1, 18],
                [1, 1, 28],
                [2, 1, 62],
                [3, 1, 88],
                [4, 1, 71],
                [5, 1, 49],
                [0, 2, 14],
                [1, 2, 32],
                [2, 2, 68],
                [3, 2, 94],
                [4, 2, 76],
                [5, 2, 54],
                [0, 3, 11],
                [1, 3, 30],
                [2, 3, 58],
                [3, 3, 81],
                [4, 3, 65],
                [5, 3, 45],
                [0, 4, 9],
                [1, 4, 20],
                [2, 4, 44],
                [3, 4, 63],
                [4, 4, 50],
                [5, 4, 35],
            ],
        },
    ],
}

const gaugeChartOptions: ChartV3Options = {
    title: { text: 'Success rate gauge', show: false },
    tooltip: { formatter: '{b}: {c}%' },
    series: [
        {
            type: 'gauge',
            name: 'Success rate',
            progress: { show: true, width: 12 },
            axisLine: { lineStyle: { width: 12 } },
            detail: { valueAnimation: true, formatter: '{value}%' },
            data: [{ value: 94.7, name: 'Success' }],
        },
    ],
}

const funnelChartOptions: ChartV3Options = {
    title: { text: 'Checkout funnel', show: false },
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    series: [
        {
            type: 'funnel',
            name: 'Checkout funnel',
            left: '10%',
            width: '80%',
            minSize: '30%',
            label: { position: 'inside' },
            data: [
                { value: 1000, name: 'Visits' },
                { value: 760, name: 'Checkout' },
                { value: 610, name: 'Payment' },
                { value: 522, name: 'Success' },
            ],
        },
    ],
}

const treemapChartOptions: ChartV3Options = {
    title: { text: 'Merchant portfolio', show: false },
    tooltip: { trigger: 'item' },
    series: [
        {
            type: 'treemap',
            name: 'Portfolio',
            roam: false,
            breadcrumb: { show: false },
            data: [
                {
                    name: 'Retail',
                    value: 42,
                    children: [
                        { name: 'Fashion', value: 18 },
                        { name: 'Grocery', value: 24 },
                    ],
                },
                {
                    name: 'Travel',
                    value: 26,
                    children: [
                        { name: 'Flights', value: 16 },
                        { name: 'Hotels', value: 10 },
                    ],
                },
                {
                    name: 'Digital',
                    value: 32,
                    children: [
                        { name: 'Gaming', value: 12 },
                        { name: 'SaaS', value: 20 },
                    ],
                },
            ],
        },
    ],
}

const candlestickChartOptions: ChartV3Options = {
    title: { text: 'Settlement range', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    yAxis: { type: 'value', scale: true },
    series: [
        {
            type: 'candlestick',
            name: 'Settlement',
            data: [
                [20, 34, 10, 38],
                [40, 35, 30, 50],
                [31, 38, 28, 44],
                [38, 45, 34, 52],
                [45, 42, 38, 48],
                [42, 49, 39, 56],
            ],
        },
    ],
}

const boxplotChartOptions: ChartV3Options = {
    title: { text: 'Latency distribution', show: false },
    tooltip: { trigger: 'item' },
    xAxis: {
        type: 'category',
        data: ['Gateway A', 'Gateway B', 'Gateway C', 'Gateway D'],
    },
    yAxis: { type: 'value', name: 'ms' },
    series: [
        {
            type: 'boxplot',
            name: 'Latency',
            data: [
                [70, 92, 110, 135, 180],
                [90, 120, 145, 170, 230],
                [55, 78, 96, 118, 150],
                [110, 150, 178, 210, 280],
            ],
        },
    ],
}

const graphChartOptions: ChartV3Options = {
    title: { text: 'Route network', show: false },
    tooltip: { trigger: 'item' },
    series: [
        {
            type: 'graph',
            name: 'Routing',
            layout: 'force',
            roam: true,
            force: { repulsion: 130, edgeLength: 80 },
            data: [
                { name: 'Checkout', symbolSize: 52 },
                { name: 'Router', symbolSize: 44 },
                { name: 'Gateway A', symbolSize: 34 },
                { name: 'Gateway B', symbolSize: 34 },
                { name: 'Bank', symbolSize: 38 },
                { name: 'Success', symbolSize: 30 },
            ],
            links: [
                { source: 'Checkout', target: 'Router' },
                { source: 'Router', target: 'Gateway A' },
                { source: 'Router', target: 'Gateway B' },
                { source: 'Gateway A', target: 'Bank' },
                { source: 'Gateway B', target: 'Bank' },
                { source: 'Bank', target: 'Success' },
            ],
            label: { show: true },
            lineStyle: { color: '#94a3b8' },
        },
    ],
}

const sunburstChartOptions: ChartV3Options = {
    title: { text: 'Payment taxonomy', show: false },
    tooltip: { trigger: 'item' },
    series: [
        {
            type: 'sunburst',
            name: 'Taxonomy',
            radius: [0, '90%'],
            label: { rotate: 'radial' },
            data: [
                {
                    name: 'Cards',
                    value: 34,
                    children: [
                        { name: 'Credit', value: 20 },
                        { name: 'Debit', value: 14 },
                    ],
                },
                {
                    name: 'UPI',
                    value: 46,
                    children: [
                        { name: 'Intent', value: 28 },
                        { name: 'Collect', value: 18 },
                    ],
                },
                {
                    name: 'Banking',
                    value: 20,
                    children: [
                        { name: 'NetBanking', value: 12 },
                        { name: 'Wallets', value: 8 },
                    ],
                },
            ],
        },
    ],
}

const sankeyChartOptions: ChartV3Options = {
    title: { text: 'Checkout flow', show: false },
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
    title: { text: 'Outage windows', show: false },
    tooltip: {
        formatter: (params) => {
            const value = Array.isArray(params)
                ? params[0]?.value
                : params.value
            return Array.isArray(value)
                ? `Outage window: ${value[1]}:00 - ${value[2]}:00`
                : 'Outage window'
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
            renderItem: rangeRenderItem as never,
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

const outageZones = [
    { value: 1766980800000, color: outageRed },
    { value: 1766983387000, color: outageRed },
    { value: 1766983387000, color: '#FFC560' },
    { value: 1766983828000, color: '#FFC560' },
    { value: 1766983828000, color: outagePurple },
    { value: 1766984400000, color: outagePurple },
]

const outageRangeData: OutageRange[] = [
    {
        x: 1766980800000,
        x2: 1766983387000,
        y: 0,
        color: outageRed,
        name: 'Central Bank of India',
        downTime: '2m 3s',
    },
    {
        x: 1766983387000,
        x2: 1766983828000,
        y: 0,
        color: '#FFC560',
        name: 'Central Bank of India',
        fluctuation: '1.2%',
    },
    {
        x: 1766983828000,
        x2: 1766984400000,
        y: 0,
        color: outageGreen,
        name: 'Central Bank of India',
    },
    {
        x: 1766980800000,
        x2: 1766983387000,
        y: 1,
        color: outageRed,
        name: 'Bank of America',
    },
    {
        x: 1766983387000,
        x2: 1766983828000,
        y: 1,
        color: '#FFC560',
        name: 'Bank of America',
    },
    {
        x: 1766983828000,
        x2: 1766984400000,
        y: 1,
        color: outageGreen,
        name: 'Bank of America',
    },
]

const outageCategories = Array.from(
    new Set(outageRangeData.map((item) => item.name))
)

const outageRangeRenderItem = (
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
    const height = Math.min(api.size([0, 1])[1] * 0.18, 10)
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
            r: 8,
        },
        style: api.style(),
    }
}

const getOutageLineOptions = (
    hoveredRange: Pick<OutageRange, 'x' | 'x2' | 'color'> | null
): ChartV3Options => ({
    title: { text: 'UPI Outage Trend', show: false },
    tooltip: { show: false },
    xAxis: { type: 'time' },
    yAxis: { type: 'value' },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: outageZones
            .filter((_, index) => index % 2 === 0)
            .map((zone, index) => ({
                gt: zone.value,
                lte: outageZones[index * 2 + 1]?.value,
                color: zone.color,
            })),
    },
    series: [
        {
            type: 'line',
            name: 'Transaction Success Rate',
            data: toTimeSeriesData(outageTrendData),
            showSymbol: false,
            lineStyle: { width: 2 },
            markArea: hoveredRange
                ? {
                      silent: true,
                      itemStyle: {
                          color: `${hoveredRange.color}26`,
                      },
                      data: [
                          [
                              { xAxis: hoveredRange.x },
                              { xAxis: hoveredRange.x2 },
                          ],
                      ],
                  }
                : undefined,
        },
    ],
})

const outageRangeChartOptions: ChartV3Options = {
    title: { text: 'Outage timeline', show: false },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            const data = (params as { data?: Partial<OutageRange> }).data
            if (!data?.x || !data.x2) return ''

            const start = formatUTCTime(data.x)
            const end = formatUTCTime(data.x2)
            const metric = data.downTime
                ? `Downtime: ${data.downTime}`
                : data.fluctuation
                  ? `Fluctuation: ${data.fluctuation}`
                  : 'Healthy'

            return `${data.name}<br />${start} - ${end}<br />${metric}`
        },
    },
    grid: {
        top: 16,
        left: 160,
        right: 24,
        bottom: 20,
        height: outageCategories.length * 52,
    },
    xAxis: {
        type: 'time',
        axisLabel: { show: false },
        splitLine: { show: false },
    },
    yAxis: {
        type: 'category',
        data: outageCategories,
        axisTick: { show: false },
        axisLine: { show: false },
    },
    series: [
        {
            type: 'custom',
            name: 'Banks',
            renderItem: outageRangeRenderItem as never,
            encode: { x: [1, 2], y: 0 },
            data: outageRangeData.map((range) => ({
                ...range,
                value: [range.y, range.x, range.x2],
                itemStyle: { color: range.color },
            })),
        },
    ],
}

const noDataChartOptions: ChartV3Options = {
    title: { text: 'Empty chart', show: false },
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', name: 'Revenue', data: [] }],
}

const nullGapChartOptions: ChartV3Options = {
    title: { text: 'Missing data gaps', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Success rate',
            color: chartColors[0],
            connectNulls: false,
            data: [96, null, 92, 95, null, 97],
        },
        {
            type: 'line',
            name: 'Fallback rate',
            color: chartColors[2],
            connectNulls: true,
            data: [4, 6, null, 5, 3, null],
        },
    ],
}

const zeroValuePieOptions: ChartV3Options = {
    title: { text: 'Zero value pie', show: false },
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    legend: { show: false },
    series: [
        {
            type: 'pie',
            name: 'Zero checks',
            radius: ['45%', '72%'],
            data: [
                {
                    name: 'Cards',
                    value: 0,
                    itemStyle: { color: chartColors[0] },
                },
                {
                    name: 'UPI',
                    value: 72,
                    itemStyle: { color: chartColors[1] },
                },
                {
                    name: 'Wallets',
                    value: 0,
                    itemStyle: { color: chartColors[2] },
                },
                {
                    name: 'Banking',
                    value: 28,
                    itemStyle: { color: chartColors[3] },
                },
            ],
        },
    ],
}

const allZeroBarOptions: ChartV3Options = {
    title: { text: 'All zero bars', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Incidents',
            color: chartColors[1],
            data: [0, 0, 0, 0],
        },
    ],
}

const negativeStackedOptions: ChartV3Options = {
    title: { text: 'Positive and negative stack', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            stack: 'delta',
            name: 'Recovered',
            color: chartColors[1],
            data: [12, 18, 10, 22, 16],
        },
        {
            type: 'bar',
            stack: 'delta',
            name: 'Dropped',
            color: chartColors[4],
            data: [-8, -12, -5, -14, -9],
        },
    ],
}

const longLabelOptions: ChartV3Options = {
    title: { text: 'Long axis labels', show: false },
    tooltip: { trigger: 'axis' },
    grid: { left: 80, right: 24, bottom: 96 },
    xAxis: {
        type: 'category',
        axisLabel: { rotate: 35 },
        data: [
            'Issuer bank authentication redirect timeout',
            'Merchant callback delayed by downstream service',
            'Payment method unavailable for selected user segment',
            'Risk service challenged transaction after OTP',
        ],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Count',
            color: chartColors[3],
            data: [42, 26, 18, 12],
        },
    ],
}

const timeSeriesZoomOptions: ChartV3Options = {
    title: { text: 'Dense time series', show: false },
    tooltip: { trigger: 'axis' },
    dataZoom: [
        { type: 'inside', start: 65, end: 100 },
        { type: 'slider', start: 65, end: 100 },
    ],
    xAxis: { type: 'time' },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'TPS',
            color: chartColors[0],
            showSymbol: false,
            data: denseSeries,
        },
    ],
}

const logAxisOptions: ChartV3Options = {
    title: { text: 'Log scale values', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['P50', 'P75', 'P90', 'P95', 'P99'] },
    yAxis: { type: 'log', logBase: 10, name: 'ms' },
    series: [
        {
            type: 'line',
            name: 'Latency',
            color: chartColors[4],
            data: [40, 120, 700, 2800, 12000],
        },
    ],
}

const markLineAreaOptions: ChartV3Options = {
    title: { text: 'Threshold marks', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['00', '04', '08', '12', '16', '20'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Error rate',
            color: chartColors[4],
            data: [1.2, 2.8, 4.4, 3.2, 1.8, 1.4],
            markLine: {
                symbol: 'none',
                data: [{ yAxis: 3, name: 'SLO breach' }],
            },
            markArea: {
                data: [[{ xAxis: '08', name: 'Incident' }, { xAxis: '12' }]],
                itemStyle: { color: 'rgba(220, 38, 38, 0.12)' },
            },
        },
    ],
}

const multiGridOptions: ChartV3Options = {
    title: { text: 'Small multiples', show: false },
    tooltip: { trigger: 'axis' },
    grid: [
        { left: 48, right: 24, top: 24, height: 100 },
        { left: 48, right: 24, top: 180, height: 100 },
    ],
    xAxis: [
        { type: 'category', gridIndex: 0, data: ['Jan', 'Feb', 'Mar', 'Apr'] },
        { type: 'category', gridIndex: 1, data: ['Jan', 'Feb', 'Mar', 'Apr'] },
    ],
    yAxis: [
        { type: 'value', gridIndex: 0 },
        { type: 'value', gridIndex: 1 },
    ],
    series: [
        {
            type: 'line',
            name: 'Volume',
            color: chartColors[0],
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [120, 160, 140, 180],
        },
        {
            type: 'bar',
            name: 'Failures',
            color: chartColors[4],
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [12, 9, 16, 7],
        },
    ],
}

const richTooltipOptions: ChartV3Options = {
    title: { text: 'Custom tooltip', show: false },
    tooltip: {
        trigger: 'axis',
        formatter: (params) => {
            const items = Array.isArray(params) ? params : [params]
            return items
                .map(
                    (item) => `${item.marker}${item.seriesName}: ${item.value}`
                )
                .join('<br />')
        },
    },
    xAxis: { type: 'category', data: ['Cards', 'UPI', 'Wallets'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Revenue',
            color: chartColors[0],
            data: [120000, 182000, 42000],
        },
    ],
}

const unicodeAndSymbolsOptions: ChartV3Options = {
    title: { text: 'Unicode labels', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: [
            'UPI QR',
            'Cards - intl',
            'Wallets + rewards',
            'NetBanking / IMPS',
        ],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Share',
            color: chartColors[1],
            data: [48, 22, 12, 18],
        },
    ],
}

const singlePointOptions: ChartV3Options = {
    title: { text: 'Single point', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Current'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Current value',
            color: chartColors[0],
            symbolSize: 14,
            data: [94],
        },
    ],
}

const decimalPercentOptions: ChartV3Options = {
    title: { text: 'Tiny decimals', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Auth', 'Capture', 'Refund', 'Webhook'] },
    yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}%' },
    },
    series: [
        {
            type: 'bar',
            name: 'Error %',
            color: chartColors[2],
            data: [0.03, 0.11, 0.005, 0.07],
        },
    ],
}

const invertedRangeOptions: ChartV3Options = {
    title: { text: 'Reversed value axis', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'value', inverse: true },
    yAxis: {
        type: 'category',
        data: ['Route A', 'Route B', 'Route C', 'Route D'],
    },
    series: [
        {
            type: 'bar',
            name: 'Latency rank',
            color: chartColors[3],
            data: [320, 260, 180, 120],
        },
    ],
}

const v2DataLineOptions: ChartV3Options = {
    title: { text: 'V2 data line parity', show: false },
    tooltip: { trigger: 'axis' },
    dataZoom: denseTimeDataZoom,
    grid: denseTimeGrid,
    xAxis: compactTimeXAxis,
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Overall',
            color: FOUNDATION_THEME.colors.primary[500],
            showSymbol: false,
            symbolSize: 4,
            data: toTimeSeriesData(lineChartOverallData),
        },
        {
            type: 'line',
            name: 'goindigo',
            color: FOUNDATION_THEME.colors.red[500],
            showSymbol: false,
            symbolSize: 4,
            data: toTimeSeriesData(lineChartGoIndigoData),
        },
    ],
}

const v2DataColumnOptions: ChartV3Options = {
    title: { text: 'V2 data column parity', show: false },
    tooltip: { trigger: 'axis' },
    dataZoom: denseTimeDataZoom,
    grid: denseTimeGrid,
    xAxis: compactTimeXAxis,
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Overall',
            color: FOUNDATION_THEME.colors.primary[500],
            barMaxWidth: 6,
            data: toTimeSeriesData(columnChartOverallData),
        },
        {
            type: 'bar',
            name: 'goindigo',
            color: FOUNDATION_THEME.colors.red[500],
            barMaxWidth: 6,
            data: toTimeSeriesData(columnChartGoIndigoData),
        },
    ],
}

const v2DataAreaOptions: ChartV3Options = {
    title: { text: 'V2 data area parity', show: false },
    tooltip: { trigger: 'axis' },
    dataZoom: denseTimeDataZoom,
    grid: denseTimeGrid,
    xAxis: compactTimeXAxis,
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Overall',
            color: FOUNDATION_THEME.colors.primary[500],
            showSymbol: false,
            areaStyle: { opacity: 0.18 },
            data: toTimeSeriesData(areaChartOverallData),
        },
        {
            type: 'line',
            name: 'goindigo',
            color: FOUNDATION_THEME.colors.red[500],
            showSymbol: false,
            areaStyle: { opacity: 0.14 },
            data: toTimeSeriesData(areaChartGoIndigoData),
        },
    ],
}

const v2DataScatterOptions: ChartV3Options = {
    title: { text: 'V2 data scatter parity', show: false },
    tooltip: { trigger: 'item' },
    dataZoom: denseTimeDataZoom,
    grid: denseTimeGrid,
    xAxis: compactTimeXAxis,
    yAxis: { type: 'value' },
    series: [
        {
            type: 'scatter',
            name: 'Overall',
            color: FOUNDATION_THEME.colors.primary[500],
            symbolSize: 5,
            data: toTimeSeriesData(scatterChartOverallData),
        },
        {
            type: 'scatter',
            name: 'goindigo',
            color: FOUNDATION_THEME.colors.red[500],
            symbolSize: 5,
            data: toTimeSeriesData(scatterChartGoIndigoData),
        },
    ],
}

const v2DataMixedOptions: ChartV3Options = {
    title: { text: 'V2 data mixed parity', show: false },
    tooltip: { trigger: 'axis' },
    dataZoom: denseTimeDataZoom,
    grid: denseTimeGrid,
    xAxis: compactTimeXAxis,
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Overall',
            color: FOUNDATION_THEME.colors.primary[500],
            showSymbol: false,
            data: toTimeSeriesData(lineColumnOverallData),
        },
        {
            type: 'bar',
            name: 'goindigo',
            color: FOUNDATION_THEME.colors.red[500],
            stack: 'column',
            barMaxWidth: 6,
            data: toTimeSeriesData(lineColumnGoIndigoData),
        },
        {
            type: 'bar',
            name: 'Orange',
            color: FOUNDATION_THEME.colors.orange[500],
            stack: 'column',
            barMaxWidth: 6,
            data: toTimeSeriesData(lineColumnOrangeData),
        },
    ],
}

const v2DataPieOptions: ChartV3Options = {
    title: { text: 'V2 data pie parity', show: false },
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    legend: { show: false },
    series: [
        {
            type: 'pie',
            name: 'Share',
            radius: ['58%', '76%'],
            label: { show: false },
            data: pieChartSeriesData.map((point) => ({
                name: point.name,
                value: point.y,
            })),
        },
    ],
}

const v2DataSankeyOptions: ChartV3Options = {
    title: { text: 'V2 data sankey parity', show: false },
    tooltip: { trigger: 'item' },
    series: [
        {
            type: 'sankey',
            name: 'Sankey Flow',
            data: Array.from(
                new Set(sankeySeriesData.flatMap(([from, to]) => [from, to]))
            ).map((name) => ({ name })),
            links: sankeySeriesData.map(([source, target, value]) => ({
                source,
                target,
                value,
            })),
        },
    ],
}

const dashboardSeriesConfig = [
    { name: 'Overall', color: FOUNDATION_THEME.colors.primary[500] },
    { name: 'Unknown', color: FOUNDATION_THEME.colors.green[500] },
    { name: 'MASTERCARD', color: FOUNDATION_THEME.colors.orange[500] },
    { name: 'VISA', color: FOUNDATION_THEME.colors.purple[500] },
    { name: 'AMEX', color: FOUNDATION_THEME.colors.red[400] },
    { name: 'DISCOVER', color: FOUNDATION_THEME.colors.red[500] },
    { name: 'JCB', color: FOUNDATION_THEME.colors.red[700] },
    { name: 'UNIONPAY', color: FOUNDATION_THEME.colors.orange[700] },
    { name: 'MAESTRO', color: FOUNDATION_THEME.colors.purple[600] },
]

const v2DataDashboardOptions: ChartV3Options = {
    title: { text: 'V2 dashboard parity', show: false },
    tooltip: { trigger: 'axis' },
    dataZoom: denseTimeDataZoom,
    grid: denseTimeGrid,
    xAxis: compactTimeXAxis,
    yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: { formatter: '{value}%' },
    },
    series: dashboardSeriesConfig.map((series, index) => ({
        type: 'line' as const,
        name: series.name,
        color: series.color,
        showSymbol: false,
        data: dashboardSeriesData[index],
    })),
}

const v2TimestampBetweenDatesOptions: ChartV3Options = {
    title: { text: 'Timestamp range parity', show: false },
    tooltip: {
        trigger: 'axis',
        formatter: (params) => {
            const items = Array.isArray(params) ? params : [params]
            return items
                .map((item) => {
                    const value = item.value
                    const timestamp = Array.isArray(value) ? value[0] : value
                    const metric = Array.isArray(value) ? value[1] : value
                    return `${item.marker}${formatUTCTime(Number(timestamp))}: ${metric}`
                })
                .join('<br />')
        },
    },
    dataZoom: [
        { type: 'inside', start: 10, end: 90 },
        { type: 'slider', start: 10, end: 90 },
    ],
    grid: denseTimeGrid,
    xAxis: {
        ...compactTimeXAxis,
        min: lineChartOverallData[0]?.x,
        max: lineChartOverallData[lineChartOverallData.length - 1]?.x,
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Overall',
            color: FOUNDATION_THEME.colors.primary[500],
            data: toTimeSeriesData(lineChartOverallData),
            showSymbol: false,
        },
    ],
}

const datasetDrivenOptions: ChartV3Options = {
    title: { text: 'Dataset encoded chart', show: false },
    tooltip: { trigger: 'axis' },
    legend: { show: false },
    dataset: {
        source: [
            ['month', 'Revenue', 'Refunds'],
            ['Jan', 120, 12],
            ['Feb', 182, 18],
            ['Mar', 156, 15],
            ['Apr', 210, 22],
        ],
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    series: [
        { type: 'bar', name: 'Revenue', color: chartColors[0] },
        { type: 'line', name: 'Refunds', color: chartColors[4] },
    ],
}

const stepLineOptions: ChartV3Options = {
    title: { text: 'Stepped state changes', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['10:00', '10:15', '10:30', '10:45', '11:00'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Queue depth',
            step: 'middle',
            color: chartColors[3],
            data: [12, 28, 18, 44, 20],
        },
    ],
}

const percentStackedAreaOptions: ChartV3Options = {
    title: { text: 'Percent stacked area', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { formatter: '{value}%' },
    },
    series: [
        {
            type: 'line',
            stack: 'share',
            name: 'UPI',
            color: chartColors[0],
            areaStyle: {},
            data: [45, 48, 52, 50, 54],
        },
        {
            type: 'line',
            stack: 'share',
            name: 'Cards',
            color: chartColors[1],
            areaStyle: {},
            data: [35, 32, 30, 31, 28],
        },
        {
            type: 'line',
            stack: 'share',
            name: 'Other',
            color: chartColors[2],
            areaStyle: {},
            data: [20, 20, 18, 19, 18],
        },
    ],
}

const waterfallOptions: ChartV3Options = {
    title: { text: 'Waterfall bridge', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['Start', 'Auth gain', 'Risk drop', 'Retry gain', 'End'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Placeholder',
            stack: 'total',
            itemStyle: { color: 'transparent' },
            emphasis: { itemStyle: { color: 'transparent' } },
            data: [0, 120, 0, 85, 0],
        },
        {
            type: 'bar',
            name: 'Delta',
            stack: 'total',
            color: chartColors[0],
            data: [120, 35, -70, 20, 105],
        },
    ],
}

const polarBarOptions: ChartV3Options = {
    title: { text: 'Polar approvals', show: false },
    tooltip: { trigger: 'item' },
    angleAxis: {
        type: 'category',
        data: ['Cards', 'UPI', 'Wallets', 'Banking'],
    },
    radiusAxis: {},
    polar: {},
    series: [
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Approvals',
            color: chartColors[0],
            data: [82, 92, 67, 74],
        },
    ],
}

const rosePieOptions: ChartV3Options = {
    title: { text: 'Nightingale rose', show: false },
    tooltip: { trigger: 'item' },
    legend: { show: false },
    series: [
        {
            type: 'pie',
            name: 'Route share',
            radius: [20, 110],
            roseType: 'radius',
            data: [
                { value: 42, name: 'Route A' },
                { value: 28, name: 'Route B' },
                { value: 18, name: 'Route C' },
                { value: 12, name: 'Route D' },
            ],
        },
    ],
}

const nestedDonutOptions: ChartV3Options = {
    title: { text: 'Nested donut', show: false },
    tooltip: { trigger: 'item' },
    legend: { show: false },
    series: [
        {
            type: 'pie',
            name: 'Channel',
            radius: [0, '42%'],
            label: { position: 'inner' },
            data: [
                { value: 56, name: 'Online' },
                { value: 44, name: 'Offline' },
            ],
        },
        {
            type: 'pie',
            name: 'Method',
            radius: ['56%', '78%'],
            data: [
                { value: 34, name: 'UPI' },
                { value: 22, name: 'Cards' },
                { value: 24, name: 'POS' },
                { value: 20, name: 'Banking' },
            ],
        },
    ],
}

const pictorialBarOptions: ChartV3Options = {
    title: { text: 'Pictorial bar', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Cards', 'UPI', 'Wallets', 'Banking'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'pictorialBar',
            name: 'Volume',
            color: chartColors[1],
            symbol: 'rect',
            symbolRepeat: true,
            symbolSize: [18, 8],
            symbolMargin: 2,
            data: [12, 18, 7, 10],
        },
    ],
}

const calendarHeatmapOptions: ChartV3Options = {
    title: { text: 'Calendar heatmap', show: false },
    tooltip: { position: 'top' },
    visualMap: {
        min: 0,
        max: 120,
        show: false,
        inRange: { color: ['#e0f2fe', '#0369a1'] },
    },
    calendar: {
        top: 40,
        left: 24,
        right: 24,
        cellSize: ['auto', 18],
        range: '2026-07',
        itemStyle: { borderWidth: 1 },
    },
    series: [
        {
            type: 'heatmap',
            name: 'Volume',
            coordinateSystem: 'calendar',
            data: Array.from({ length: 31 }, (_, index) => [
                `2026-07-${String(index + 1).padStart(2, '0')}`,
                Math.round(30 + Math.sin(index / 3) * 25 + index * 2),
            ]),
        },
    ],
}

const parallelCoordinatesOptions: ChartV3Options = {
    title: { text: 'Parallel coordinates', show: false },
    tooltip: { trigger: 'item' },
    parallelAxis: [
        { dim: 0, name: 'Latency' },
        { dim: 1, name: 'Cost' },
        { dim: 2, name: 'Success' },
        { dim: 3, name: 'Coverage' },
    ],
    parallel: { left: 48, right: 48, top: 36, bottom: 24 },
    series: [
        {
            type: 'parallel',
            name: 'Routes',
            lineStyle: { width: 2 },
            data: [
                [120, 42, 97, 88],
                [220, 35, 93, 92],
                [90, 55, 98, 76],
                [310, 28, 90, 95],
            ],
        },
    ],
}

const nativeLegendOptions: ChartV3Options = {
    title: { text: 'Native legend opt-in', show: false },
    tooltip: { trigger: 'axis' },
    legend: {
        show: true,
        top: 0,
        right: 8,
    },
    grid: { top: 56 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'line',
            name: 'Primary',
            color: chartColors[0],
            data: [42, 55, 48, 68],
        },
        {
            type: 'line',
            name: 'Fallback',
            color: chartColors[2],
            data: [12, 8, 14, 6],
        },
    ],
}

const duplicateSeriesNamesOptions: ChartV3Options = {
    title: { text: 'Duplicate series names', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Retry',
            color: chartColors[0],
            data: [10, 18, 12, 20],
        },
        {
            type: 'line',
            name: 'Retry',
            color: chartColors[4],
            data: [4, 8, 5, 7],
        },
    ],
}

const objectDataWithLabelsOptions: ChartV3Options = {
    title: { text: 'Object data labels', show: false },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'category', data: ['UPI', 'Cards', 'Wallets', 'Banking'] },
    yAxis: { type: 'value' },
    series: [
        {
            type: 'bar',
            name: 'Share',
            color: chartColors[3],
            label: { show: true, position: 'top', formatter: '{c}%' },
            data: [
                { value: 48, name: 'UPI' },
                { value: 26, name: 'Cards' },
                { value: 12, name: 'Wallets' },
                { value: 14, name: 'Banking' },
            ],
        },
    ],
}

const largeValueCompactOptions: ChartV3Options = {
    title: { text: 'Large value formatting', show: false },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['GMV', 'Refunds', 'Settled'] },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: (value: number) =>
                Intl.NumberFormat('en', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                }).format(value),
        },
    },
    series: [
        {
            type: 'bar',
            name: 'Amount',
            color: chartColors[0],
            data: [124000000, 8400000, 115600000],
        },
    ],
}

const chartGallery = [
    {
        title: 'Line',
        subtitle: 'Smooth trend lines with external legend',
        icon: <LineChart size={18} />,
        options: lineChartOptions,
        showLegend: true,
    },
    {
        title: 'Stacked bar',
        subtitle: 'Stacked category comparison',
        icon: <BarChart3 size={18} />,
        options: stackedBarOptions,
        showLegend: true,
    },
    {
        title: 'Donut',
        subtitle: 'Part-to-whole payment split',
        icon: <PieChart size={18} />,
        options: donutChartOptions,
        showLegend: true,
    },
    {
        title: 'Mixed',
        subtitle: 'Bar and line series together',
        icon: <LineChart size={18} />,
        options: mixedChartOptions,
        showLegend: true,
    },
    {
        title: 'Area',
        subtitle: 'Filled trends with multiple series',
        icon: <LineChart size={18} />,
        options: areaChartOptions,
        showLegend: true,
    },
    {
        title: 'Horizontal bar',
        subtitle: 'Ranked category comparison',
        icon: <BarChart3 size={18} />,
        options: horizontalBarOptions,
        showLegend: true,
    },
    {
        title: 'Scatter',
        subtitle: 'Latency and success correlation',
        icon: <BarChart3 size={18} />,
        options: scatterChartOptions,
        showLegend: true,
    },
    {
        title: 'Bubble',
        subtitle: 'Scatter with volume encoded as size',
        icon: <BarChart3 size={18} />,
        options: bubbleChartOptions,
        showLegend: true,
    },
    {
        title: 'Radar',
        subtitle: 'Multi-metric gateway scorecard',
        icon: <LineChart size={18} />,
        options: radarChartOptions,
        showLegend: true,
    },
    {
        title: 'Heatmap',
        subtitle: 'Hourly density across weekdays',
        icon: <BarChart3 size={18} />,
        options: heatmapChartOptions,
        showLegend: false,
    },
    {
        title: 'Gauge',
        subtitle: 'Single KPI status',
        icon: <PieChart size={18} />,
        options: gaugeChartOptions,
        showLegend: false,
    },
    {
        title: 'Funnel',
        subtitle: 'Checkout conversion steps',
        icon: <BarChart3 size={18} />,
        options: funnelChartOptions,
        showLegend: false,
    },
    {
        title: 'Treemap',
        subtitle: 'Hierarchical portfolio share',
        icon: <BarChart3 size={18} />,
        options: treemapChartOptions,
        showLegend: false,
    },
    {
        title: 'Candlestick',
        subtitle: 'Open, close, high, and low ranges',
        icon: <BarChart3 size={18} />,
        options: candlestickChartOptions,
        showLegend: false,
    },
    {
        title: 'Boxplot',
        subtitle: 'Latency distribution by gateway',
        icon: <BarChart3 size={18} />,
        options: boxplotChartOptions,
        showLegend: false,
    },
    {
        title: 'Graph',
        subtitle: 'Interactive payment route network',
        icon: <BarChart3 size={18} />,
        options: graphChartOptions,
        showLegend: false,
    },
    {
        title: 'Sunburst',
        subtitle: 'Nested payment method taxonomy',
        icon: <PieChart size={18} />,
        options: sunburstChartOptions,
        showLegend: false,
    },
    {
        title: 'Sankey',
        subtitle: 'Checkout flow movement',
        icon: <BarChart3 size={18} />,
        options: sankeyChartOptions,
        showLegend: false,
    },
    {
        title: 'Range timeline',
        subtitle: 'Custom rendered outage windows',
        icon: <BarChart3 size={18} />,
        options: rangeChartOptions,
        showLegend: false,
    },
]

const edgeCaseGallery = [
    {
        title: 'Null gaps',
        subtitle: 'Missing points with connectNulls on and off',
        icon: <LineChart size={18} />,
        options: nullGapChartOptions,
        showLegend: true,
    },
    {
        title: 'Zero value pie',
        subtitle: 'Pie slices with valid zero values',
        icon: <PieChart size={18} />,
        options: zeroValuePieOptions,
        showLegend: true,
    },
    {
        title: 'All zero bars',
        subtitle: 'Zero-only data should still render, not no-data',
        icon: <BarChart3 size={18} />,
        options: allZeroBarOptions,
        showLegend: true,
    },
    {
        title: 'Negative stack',
        subtitle: 'Positive and negative bars on one axis',
        icon: <BarChart3 size={18} />,
        options: negativeStackedOptions,
        showLegend: true,
    },
    {
        title: 'Long labels',
        subtitle: 'Rotated labels and wider grid margins',
        icon: <BarChart3 size={18} />,
        options: longLabelOptions,
        showLegend: true,
    },
    {
        title: 'Time axis with zoom',
        subtitle: 'Dense data, time scale, inside and slider zoom',
        icon: <LineChart size={18} />,
        options: timeSeriesZoomOptions,
        showLegend: true,
    },
    {
        title: 'Log axis',
        subtitle: 'Large value spread on logarithmic scale',
        icon: <LineChart size={18} />,
        options: logAxisOptions,
        showLegend: true,
    },
    {
        title: 'Mark line and area',
        subtitle: 'Threshold and incident window overlays',
        icon: <LineChart size={18} />,
        options: markLineAreaOptions,
        showLegend: true,
    },
    {
        title: 'Multi-grid',
        subtitle: 'Two grids, two x axes, two y axes',
        icon: <BarChart3 size={18} />,
        options: multiGridOptions,
        showLegend: true,
    },
    {
        title: 'Custom tooltip',
        subtitle: 'Formatter callback returning HTML content',
        icon: <BarChart3 size={18} />,
        options: richTooltipOptions,
        showLegend: true,
    },
    {
        title: 'Special labels',
        subtitle: 'Symbols, slashes, plus signs, and hyphens',
        icon: <LineChart size={18} />,
        options: unicodeAndSymbolsOptions,
        showLegend: true,
    },
    {
        title: 'Single point',
        subtitle: 'One data point should still frame correctly',
        icon: <LineChart size={18} />,
        options: singlePointOptions,
        showLegend: true,
    },
    {
        title: 'Tiny decimals',
        subtitle: 'Very small percent values and axis formatting',
        icon: <BarChart3 size={18} />,
        options: decimalPercentOptions,
        showLegend: true,
    },
    {
        title: 'Reversed axis',
        subtitle: 'Inverse value axis on a horizontal chart',
        icon: <BarChart3 size={18} />,
        options: invertedRangeOptions,
        showLegend: true,
    },
    {
        title: 'Dataset driven',
        subtitle: 'Uses dataset.source instead of series.data',
        icon: <BarChart3 size={18} />,
        options: datasetDrivenOptions,
        showLegend: true,
    },
    {
        title: 'Step line',
        subtitle: 'State changes with stepped interpolation',
        icon: <LineChart size={18} />,
        options: stepLineOptions,
        showLegend: true,
    },
    {
        title: 'Percent stacked area',
        subtitle: 'Stacked shares constrained to 100%',
        icon: <LineChart size={18} />,
        options: percentStackedAreaOptions,
        showLegend: true,
    },
    {
        title: 'Waterfall',
        subtitle: 'Transparent helper stack plus positive and negative deltas',
        icon: <BarChart3 size={18} />,
        options: waterfallOptions,
        showLegend: true,
    },
    {
        title: 'Polar bar',
        subtitle: 'Bar series in polar coordinates',
        icon: <PieChart size={18} />,
        options: polarBarOptions,
        showLegend: true,
    },
    {
        title: 'Rose pie',
        subtitle: 'Nightingale rose pie sizing',
        icon: <PieChart size={18} />,
        options: rosePieOptions,
        showLegend: true,
    },
    {
        title: 'Nested donut',
        subtitle: 'Two pie series with inner and outer rings',
        icon: <PieChart size={18} />,
        options: nestedDonutOptions,
        showLegend: true,
    },
    {
        title: 'Pictorial bar',
        subtitle: 'Repeated symbols in a bar series',
        icon: <BarChart3 size={18} />,
        options: pictorialBarOptions,
        showLegend: true,
    },
    {
        title: 'Calendar heatmap',
        subtitle: 'Calendar coordinate system with daily values',
        icon: <BarChart3 size={18} />,
        options: calendarHeatmapOptions,
        showLegend: false,
    },
    {
        title: 'Parallel coordinates',
        subtitle: 'Multi-dimensional route comparison',
        icon: <LineChart size={18} />,
        options: parallelCoordinatesOptions,
        showLegend: false,
    },
    {
        title: 'Native legend opt-in',
        subtitle: 'Explicit ECharts legend with manual grid spacing',
        icon: <LineChart size={18} />,
        options: nativeLegendOptions,
        showLegend: false,
    },
    {
        title: 'Duplicate names',
        subtitle: 'Two series intentionally share the same legend name',
        icon: <BarChart3 size={18} />,
        options: duplicateSeriesNamesOptions,
        showLegend: true,
    },
    {
        title: 'Object data labels',
        subtitle: 'Series data as objects with labels enabled',
        icon: <BarChart3 size={18} />,
        options: objectDataWithLabelsOptions,
        showLegend: true,
    },
    {
        title: 'Large compact values',
        subtitle: 'Axis formatter for very large numbers',
        icon: <BarChart3 size={18} />,
        options: largeValueCompactOptions,
        showLegend: true,
    },
]

const v2DataParityGallery = [
    {
        title: 'V2 data line',
        subtitle: 'ChartV2DemoData line series converted to ECharts',
        icon: <LineChart size={18} />,
        options: v2DataLineOptions,
        showLegend: true,
    },
    {
        title: 'V2 data column',
        subtitle: 'Highcharts column mapped to ECharts bar',
        icon: <BarChart3 size={18} />,
        options: v2DataColumnOptions,
        showLegend: true,
    },
    {
        title: 'V2 data area',
        subtitle: 'Highcharts area mapped to ECharts line areaStyle',
        icon: <LineChart size={18} />,
        options: v2DataAreaOptions,
        showLegend: true,
    },
    {
        title: 'V2 data scatter',
        subtitle: 'Timestamp scatter data from the V2 demo',
        icon: <BarChart3 size={18} />,
        options: v2DataScatterOptions,
        showLegend: true,
    },
    {
        title: 'V2 data mixed',
        subtitle: 'Line plus stacked bars from the V2 mixed chart',
        icon: <LineChart size={18} />,
        options: v2DataMixedOptions,
        showLegend: true,
    },
    {
        title: 'V2 data donut',
        subtitle: 'V2 pie data rendered as a donut',
        icon: <PieChart size={18} />,
        options: v2DataPieOptions,
        showLegend: true,
    },
    {
        title: 'V2 data sankey',
        subtitle: 'V2 sankey tuple data mapped to nodes and links',
        icon: <BarChart3 size={18} />,
        options: v2DataSankeyOptions,
        showLegend: false,
    },
    {
        title: 'V2 dashboard lines',
        subtitle: 'All volatile dashboard percentage series',
        icon: <LineChart size={18} />,
        options: v2DataDashboardOptions,
        showLegend: true,
    },
    {
        title: 'V2 timestamp range',
        subtitle:
            'Millisecond timestamps between dates with formatted axis and zoom',
        icon: <LineChart size={18} />,
        options: v2TimestampBetweenDatesOptions,
        showLegend: true,
    },
]

const ChartCard = ({
    title,
    subtitle,
    icon,
    options,
    showLegend,
    initialAnimationDelay = 0,
}: {
    title: string
    subtitle: string
    icon: ReactNode
    options: ChartV3Options
    showLegend?: boolean
    initialAnimationDelay?: number
}) => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV3ReactRefObject>(null)

    return (
        <ChartV3Fullscreen>
            {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                <ChartContainerV3>
                    <ChartHeaderV3>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                                {icon}
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        {title}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {subtitle}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label={
                                        showChart
                                            ? 'Collapse chart'
                                            : 'Expand chart'
                                    }
                                    onClick={() =>
                                        setShowChart((prev) => !prev)
                                    }
                                    className="flex h-8 w-8 items-center justify-center"
                                >
                                    <ChevronsDownUp
                                        size={18}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    aria-label={
                                        isFullscreen
                                            ? 'Exit fullscreen view'
                                            : 'Enter fullscreen view'
                                    }
                                    onClick={
                                        isFullscreen
                                            ? exitFullscreen
                                            : enterFullscreen
                                    }
                                    className="flex h-8 w-8 items-center justify-center"
                                >
                                    <Expand
                                        size={18}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </ChartHeaderV3>

                    {showChart && (
                        <div className="flex flex-col gap-4 p-5">
                            <ChartV3
                                ref={chartRef}
                                options={options}
                                height="clamp(260px, 34vw, 360px)"
                                initialAnimationDelay={initialAnimationDelay}
                            />
                            {showLegend && (
                                <ChartV3Legend chartRef={chartRef} />
                            )}
                        </div>
                    )}
                </ChartContainerV3>
            )}
        </ChartV3Fullscreen>
    )
}

const getHoveredOutageRange = (
    params: unknown
): Pick<OutageRange, 'x' | 'x2' | 'color'> | null => {
    const data = (params as { data?: Partial<OutageRange> }).data
    if (
        typeof data?.x !== 'number' ||
        typeof data.x2 !== 'number' ||
        typeof data.color !== 'string'
    ) {
        return null
    }

    return {
        x: data.x,
        x2: data.x2,
        color: data.color,
    }
}

const OutageParitySection = () => {
    const [hoveredRange, setHoveredRange] = useState<Pick<
        OutageRange,
        'x' | 'x2' | 'color'
    > | null>(null)

    return (
        <ChartContainerV3>
            <ChartHeaderV3>
                <div className="flex w-full items-center justify-between">
                    <div>
                        <div className="text-sm font-semibold text-gray-800">
                            Outage Charts V2 parity
                        </div>
                        <div className="text-xs text-gray-500">
                            Same outage trend and bank range use case mapped to
                            ECharts
                        </div>
                    </div>
                </div>
            </ChartHeaderV3>
            <div className="flex flex-col gap-6 p-5">
                <div>
                    <div className="mb-3 text-sm font-medium text-gray-700">
                        UPI Outage Trend
                    </div>
                    <ChartV3
                        options={getOutageLineOptions(hoveredRange)}
                        height={300}
                    />
                </div>
                <ChartV3
                    options={outageRangeChartOptions}
                    height={190}
                    onEvents={{
                        mouseover: (params) =>
                            setHoveredRange(getHoveredOutageRange(params)),
                        mouseout: () => setHoveredRange(null),
                    }}
                />
            </div>
        </ChartContainerV3>
    )
}

const ChartV3Demo = () => {
    const { theme } = useTheme()
    const isDark = theme === Theme.DARK

    return (
        <div
            className={`min-h-screen space-y-8 p-8 ${
                isDark ? 'bg-gray-950 text-gray-50' : 'bg-white text-gray-900'
            }`}
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Chart V3 Playground</h2>
                <p className="max-w-3xl text-sm text-gray-500">
                    Apache ECharts-native charts using the Blend V3 container,
                    header, fullscreen, legend, skeleton, and empty states.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {chartGallery.map((chart, index) => (
                    <ChartCard
                        key={chart.title}
                        {...chart}
                        initialAnimationDelay={Math.min(index * 160, 1200)}
                    />
                ))}
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold">
                        ChartV2 data parity
                    </h3>
                    <p className="text-sm text-gray-500">
                        These use the same source data from ChartV2DemoData.ts
                        so we can compare V2 and V3 behavior directly.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {v2DataParityGallery.map((chart, index) => (
                        <ChartCard
                            key={chart.title}
                            {...chart}
                            initialAnimationDelay={Math.min(index * 140, 900)}
                        />
                    ))}
                </div>
                <OutageParitySection />
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold">
                        Edge-case coverage
                    </h3>
                    <p className="text-sm text-gray-500">
                        Cases that commonly expose rendering, legend, formatter,
                        resize, and no-data bugs.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {edgeCaseGallery.map((chart, index) => (
                        <ChartCard
                            key={chart.title}
                            {...chart}
                            initialAnimationDelay={Math.min(index * 120, 1400)}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ChartContainerV3>
                    <ChartHeaderV3>
                        <div className="text-sm font-semibold text-gray-800">
                            Skeleton state
                        </div>
                    </ChartHeaderV3>
                    <div className="p-5">
                        <ChartV3
                            options={lineChartOptions}
                            skeleton={{ show: true, height: 320 }}
                        />
                    </div>
                </ChartContainerV3>

                <ChartContainerV3>
                    <ChartHeaderV3>
                        <div className="text-sm font-semibold text-gray-800">
                            No data state
                        </div>
                    </ChartHeaderV3>
                    <div className="p-5">
                        <ChartV3 options={noDataChartOptions} />
                    </div>
                </ChartContainerV3>
            </div>
        </div>
    )
}

export default ChartV3Demo
