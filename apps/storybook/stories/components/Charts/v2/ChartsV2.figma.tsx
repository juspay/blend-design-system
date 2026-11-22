import React from 'react'
import { figma } from '@figma/code-connect'
import {
    ChartV2,
    ChartContainerV2,
    ChartHeaderV2,
    type ChartV2Options,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CHARTSV2 COMPONENT
 *
 * Figma component set `18805:371955` has 7 componentPropertyDefinitions:
 *   hasHeader#3599:1   BOOLEAN  default=true   → ChartHeaderV2 visibility
 *   hasButton#21084:0  BOOLEAN  default=true   → header action button
 *   slot#21084:11      INSTANCE_SWAP            → header slot content
 *   hasSlot#21084:22   BOOLEAN  default=true   → header slot visibility
 *   title#21084:33     TEXT     default="Title Here"
 *   subtext#21084:44   TEXT     default="2-3 lines subtext..."
 *   type               VARIANT  [bar,line,pie,empty] default=bar
 *
 * The Figma component is a composite: container + optional header (title,
 * subtext, button, slot) + chart. In code this maps to the composition
 * helpers ChartContainerV2 / ChartHeaderV2 wrapping ChartV2.
 *
 * For `type=empty` the component shows a no-data state; title/subtext map
 * to ChartV2's `noData` prop instead of ChartHeaderV2.
 *
 * PROP MAPPING SUMMARY:
 *
 * 1. RENAMED / COMPOSITE:
 *    - type (Figma) → options (Code) — full ChartV2Options per chart type
 *    - hasHeader + title + subtext + hasButton + hasSlot + slot (Figma)
 *      → ChartHeaderV2 composition (Code)
 *
 * 2. FIGMA-ONLY (structural, no direct code prop):
 *    - hasHeader, hasButton, hasSlot — boolean gates rendered as JSX via
 *      figma.boolean (no short-circuits or ternaries in example)
 *
 * 3. CODE-ONLY (not in Figma):
 *    - highcharts, skeleton, containerProps — runtime concerns
 *    - ChartV2Fullscreen, ChartV2Legend — separate composition helpers
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

const FIGMA_URL =
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11'

// ─── General connection (bar / line / pie) ──────────────────────────
// Composes ChartContainerV2 + ChartHeaderV2 + ChartV2.
// All 6 non-type Figma props are mapped: hasHeader gates the entire
// ChartHeaderV2, and inside it title/subtext/hasButton/hasSlot/slot
// are resolved via nested figma helpers.

figma.connect(ChartV2, FIGMA_URL, {
    props: {
        options: figma.enum('type', {
            bar: barChartOptions,
            line: lineChartOptions,
            pie: pieChartOptions,
            empty: {},
        }),

        header: figma.boolean('hasHeader', {
            true: (
                <ChartHeaderV2>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            flex: 1,
                        }}
                    >
                        <h3 style={{ margin: 0 }}>{figma.string('title')}</h3>
                        <p style={{ margin: 0, color: '#6b7280' }}>
                            {figma.string('subtext')}
                        </p>
                    </div>
                    {figma.boolean('hasButton', {
                        true: <button>Action</button>,
                        false: undefined,
                    })}
                    {figma.boolean('hasSlot', {
                        true: figma.instance('slot'),
                        false: undefined,
                    })}
                </ChartHeaderV2>
            ),
            false: undefined,
        }),
    },

    example: ({ options, header }) => (
        <ChartContainerV2>
            {header}
            <ChartV2 options={options} />
        </ChartContainerV2>
    ),

    imports: [
        "import { ChartV2, ChartContainerV2, ChartHeaderV2 } from '@juspay/blend-design-system'",
    ],

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
})

// ─── Empty / no-data variant ────────────────────────────────────────
// For type=empty the Figma title/subtext map to ChartV2's noData prop
// (title/subtitle), and hasButton/hasSlot/slot map to noData.button/slot.
// No ChartHeaderV2 wrapper — ChartV2NoData renders its own layout.

figma.connect(ChartV2, FIGMA_URL, {
    variant: { type: 'empty' },

    props: {
        noDataTitle: figma.string('title'),
        noDataSubtitle: figma.string('subtext'),
        noDataButton: figma.boolean('hasButton', {
            true: { text: 'Action', onClick: () => {} },
            false: undefined,
        }),
        noDataSlot: figma.boolean('hasSlot', {
            true: figma.instance('slot'),
            false: undefined,
        }),
    },

    example: ({ noDataTitle, noDataSubtitle, noDataButton, noDataSlot }) => (
        <ChartV2
            options={{}}
            noData={{
                title: noDataTitle,
                subtitle: noDataSubtitle,
                button: noDataButton,
                slot: noDataSlot,
            }}
        />
    ),

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
})
