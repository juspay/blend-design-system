import React from 'react'
import { figma } from '@figma/code-connect'
import { ChartV2, type ChartV2Options } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CHARTSV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - type (Figma) → options.chart.type + options.series[].type (Code)
 *      NOTE: V2 has no `chartType` prop and no `ChartType` enum. The V2 chart
 *      component is `ChartV2` (there is no `ChartsV2` component), and it is a
 *      thin wrapper over Highcharts. The chart type is expressed as a
 *      Highcharts string inside the `options` object:
 *      - line → options.chart.type = 'line', series[].type = 'line'
 *      - bar  → options.chart.type = 'bar',  series[].type = 'bar'
 *      - pie  → options.chart.type = 'pie',  series[].type = 'pie'
 *      Because there is no `chartType` prop, the Figma `type` variant is
 *      mapped directly to a full sample `ChartV2Options` object per type.
 *
 * 2. DIRECT MAPPINGS:
 *    (none — all chart configuration lives inside `options`)
 *
 * 3. SPECIAL MAPPINGS:
 *    - The Figma component represents the visual structure of the chart.
 *      In V2, data, colors, axis labels and legend position are all expressed
 *      inside the Highcharts `options` object rather than as separate props.
 *
 * 4. FIGMA-ONLY PROPERTIES:
 *    - Visual states and hover effects are handled automatically by Highcharts.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - options: The Highcharts options object (ChartV2Options). Replaces V1's
 *      `data`, `colors`, `xAxisLabel`, `yAxisLabel`, `legendPosition`,
 *      `metrics` and `slots` props — all now live inside `options`.
 *    - highcharts: Optional custom Highcharts instance.
 *    - skeleton: Chart skeleton configuration.
 *    - noData: No-data state configuration.
 *    - containerProps: Props for the chart container.
 *    - Composition helpers (code-only, not in Figma): ChartContainerV2,
 *      ChartHeaderV2, ChartV2Legend, ChartV2Fullscreen — used to build the
 *      surrounding header/slots/legend around a ChartV2.
 */

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
    legend: {
        enabled: true,
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar'],
        title: {
            text: 'Month',
        },
    },
    yAxis: {
        title: {
            text: 'Amount ($)',
        },
    },
    series: [
        {
            type: 'line',
            name: 'Revenue',
            color: chartColors[0],
            data: [4000, 3000, 2000],
        },
        {
            type: 'line',
            name: 'Profit',
            color: chartColors[1],
            data: [2400, 1398, 9800],
        },
    ],
}

const barChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'bar',
    },
    legend: {
        enabled: true,
    },
    xAxis: {
        categories: ['Q1', 'Q2', 'Q3'],
        title: {
            text: 'Quarter',
        },
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Sales',
        },
    },
    series: [
        {
            type: 'bar',
            name: 'Product A',
            color: chartColors[0],
            data: [4000, 3000, 2000],
        },
        {
            type: 'bar',
            name: 'Product B',
            color: chartColors[1],
            data: [2400, 1398, 9800],
        },
    ],
}

const pieChartOptions: ChartV2Options = {
    ...baseChartOptions,
    chart: {
        ...baseChartOptions.chart,
        type: 'pie',
    },
    legend: {
        enabled: true,
        layout: 'vertical',
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

// Base ChartsV2 connection
figma.connect(
    ChartV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        props: {
            // Renamed mapping: type (Figma) → options (Code)
            // V2 has no `chartType` prop; the Figma `type` variant maps directly
            // to a full sample ChartV2Options object (chart type lives inside
            // options.chart.type / options.series[].type as Highcharts strings).
            options: figma.enum('type', {
                line: lineChartOptions,
                bar: barChartOptions,
                pie: pieChartOptions,
            }),
        },

        example: ({ options }) => <ChartV2 options={options} />,

        imports: ["import { ChartV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ChartsV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-chartsv2--docs',
            },
        ],
    }
)

// Variant: Line Chart
figma.connect(
    ChartV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        variant: { type: 'line' },
        example: () => <ChartV2 options={lineChartOptions} />,
    }
)

// Variant: Bar Chart
figma.connect(
    ChartV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        variant: { type: 'bar' },
        example: () => <ChartV2 options={barChartOptions} />,
    }
)

// Variant: Pie Chart
figma.connect(
    ChartV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        variant: { type: 'pie' },
        example: () => <ChartV2 options={pieChartOptions} />,
    }
)

/**
 * Example of ChartV2 usage in code:
 *
 * import { ChartV2, ChartContainerV2, ChartHeaderV2, type ChartV2Options } from '@juspay/blend-design-system'
 *
 * // Basic Line Chart
 * const salesOptions: ChartV2Options = {
 *   chart: { type: 'line' },
 *   xAxis: { categories: ['Jan', 'Feb', 'Mar'], title: { text: 'Month' } },
 *   yAxis: { title: { text: 'Amount ($)' } },
 *   series: [
 *     { type: 'line', name: 'Revenue', color: '#2563eb', data: [4000, 3000, 2000] },
 *     { type: 'line', name: 'Profit', color: '#16a34a', data: [2400, 1398, 9800] },
 *   ],
 * }
 *
 * <ChartV2 options={salesOptions} />
 *
 * // With header slots (code-only composition helpers)
 * <ChartContainerV2>
 *   <ChartHeaderV2>
 *     <h3>Revenue Overview</h3>
 *   </ChartHeaderV2>
 *   <ChartV2 options={salesOptions} />
 * </ChartContainerV2>
 *
 * // Pie Chart
 * const shareOptions: ChartV2Options = {
 *   chart: { type: 'pie' },
 *   series: [{ type: 'pie', name: 'Share', data: [
 *     { name: 'Cards', y: 34, color: '#2563eb' },
 *     { name: 'UPI', y: 46, color: '#16a34a' },
 *   ] }],
 * }
 *
 * <ChartV2 options={shareOptions} />
 */
