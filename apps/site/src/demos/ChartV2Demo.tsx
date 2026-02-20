import React, { useRef } from 'react'
import ChartV2Container from '../../../../packages/blend/lib/components/ChartsV2/ChartContainerV2'
import ChartV2 from '../../../../packages/blend/lib/components/ChartsV2/ChartV2'
import ChartV2Legend from '../../../../packages/blend/lib/components/ChartsV2/ChartV2Legend'
import ChartHeaderV2 from '../../../../packages/blend/lib/components/ChartsV2/ChartHeaderV2'
import type {
    ChartV2ReactRefObject,
    ChartV2CustomLegendItem,
} from '../../../../packages/blend/lib/components/ChartsV2/chartV2.types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import {
    last7daysHourlyData,
    last7daysHourlyData2,
    pieChartData,
} from './ChartV2Data'

const customLegendItemsForSeries: ChartV2CustomLegendItem[] = [
    {
        key: 'Overall',
        name: 'Overall',
        color: FOUNDATION_THEME.colors.primary[500],
        value: 54,
    },
    {
        key: 'goindigo',
        name: 'goindigo',
        color: FOUNDATION_THEME.colors.red[500],
        value: 10,
    },
]

const customLegendItemsForPie: ChartV2CustomLegendItem[] = [
    { key: 'Category A', name: 'Category A', value: 25 },
    { key: 'Category B', name: 'Category B', value: 19 },
    { key: 'Category C', name: 'Category C', value: 15 },
    { key: 'Category D', name: 'Category D', value: 13 },
    { key: 'Category E', name: 'Category E', value: 10 },
]

const baseTimeSeriesOptions = {
    xAxis: { type: 'datetime' as const },
    legend: { enabled: true, align: 'left', verticalAlign: 'top' },
    series: [
        {
            name: 'Overall',
            data: last7daysHourlyData,
            color: FOUNDATION_THEME.colors.primary[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
        {
            name: 'goindigo',
            data: last7daysHourlyData2,
            color: FOUNDATION_THEME.colors.red[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
    ],
}

const pieOptions = {
    legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
    },
    plotOptions: {
        pie: {
            innerSize: '75%',
            borderWidth: 0,
            slicedOffset: 0,
            borderRadius: 0,
            states: {
                hover: { enabled: true, brightness: 0, halo: { size: 0 } },
            },
            dataLabels: { enabled: false },
            showInLegend: true,
        },
    },
    series: [{ type: 'pie' as const, name: 'Share', data: pieChartData }],
}

const sankeyOptions = {
    chart: { type: 'sankey' as const },
    title: { text: '' },
    accessibility: { enabled: false },
    tooltip: {
        pointFormat:
            '{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}</b>',
    },
    series: [
        {
            type: 'sankey' as const,
            keys: ['from', 'to', 'weight'],
            name: 'Sankey Flow',
            data: [
                ['Start', 'Step 1', 5],
                ['Start', 'Step 2', 3],
                ['Step 1', 'End', 2],
                ['Step 2', 'End', 3],
            ],
        },
    ],
    xAxis: { labels: { enabled: false } },
}

const lineColumnOptions = {
    xAxis: { type: 'datetime' },
    legend: {
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
    },
    series: [
        {
            type: 'line' as const,
            name: 'Overall',
            data: last7daysHourlyData,
            color: FOUNDATION_THEME.colors.primary[500],
            marker: { symbol: 'circle' as const },
            legendSymbol: 'rectangle' as const,
        },
        {
            type: 'column' as const,
            name: 'goindigo',
            data: last7daysHourlyData2,
            color: FOUNDATION_THEME.colors.red[500],
            marker: { symbol: 'circle' as const },
            legendSymbol: 'rectangle' as const,
        },
    ],
}

// Line chart with an always-visible custom marker to indicate an outage at a specific point in time
const lineWithOutageMarkerData = last7daysHourlyData.map((point) =>
    point.outage
        ? {
              ...point,
              marker: {
                  enabled: true,
                  symbol: 'circle' as const,
                  radius: 5,
                  fillColor: FOUNDATION_THEME.colors.red[500],
                  lineWidth: 1,
                  lineColor: FOUNDATION_THEME.colors.red[700],
              },
          }
        : point
)
const lineWithOutageMarkerOptions = {
    xAxis: { type: 'datetime' as const },
    legend: { enabled: true, align: 'left', verticalAlign: 'top' },
    series: [
        {
            type: 'line' as const,
            name: 'Overall',
            data: lineWithOutageMarkerData,
            color: FOUNDATION_THEME.colors.primary[500],
            legendSymbol: 'rectangle' as const,
            marker: { enabled: false },
        },
    ],
}

// --- Dashboard example (8 line charts in 2x4 grid with shared legend) ---
const DASHBOARD_CHART_TITLES = [
    'MOTO',
    'THREE_DS',
    'UNKNOWN',
    'ORDERS WITH TRANSACTION(S)',
    'ADDITIONAL METRIC 1',
    'ADDITIONAL METRIC 2',
    'ADDITIONAL METRIC 3',
    'ADDITIONAL METRIC 4',
]

function buildVolatilePercentageData(
    baseTime: number,
    points: number = 13
): Array<[number, number]> {
    const data: Array<[number, number]> = []
    for (let i = 0; i < points; i++) {
        const x = baseTime + i * 30 * 60 * 1000
        const y = i % 2 === 0 ? 0 : 100
        data.push([x, y])
    }
    return data
}

const dashboardBaseTime = new Date().setHours(0, 0, 0, 0)
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

const dashboardChartOptions = {
    chart: { type: 'line' as const, height: 200 },
    xAxis: {
        type: 'datetime' as const,
        labels: { format: '{value:%H:%M}' },
    },
    yAxis: {
        min: 0,
        max: 100,
        title: { text: '' },
        labels: { format: '{value}%' },
    },
    legend: { enabled: false },
    series: dashboardSeriesConfig.map((s) => ({
        type: 'line' as const,
        name: s.name,
        data: buildVolatilePercentageData(dashboardBaseTime),
        color: s.color,
        marker: { symbol: 'circle' as const },
    })),
}

const dashboardCustomLegendItems: ChartV2CustomLegendItem[] =
    dashboardSeriesConfig.map((s) => ({
        key: s.name,
        name: s.name,
        color: s.color,
    }))

const chartConfigs = [
    {
        title: 'Column',
        options: {
            ...baseTimeSeriesOptions,
            series: baseTimeSeriesOptions.series.map((s) => ({
                ...s,
                type: 'column' as const,
            })),
        },
        hasLegend: true,
        legendLayout: 'horizontal' as const,
        customLegendItems: customLegendItemsForSeries,
    },
    {
        title: 'Line',
        options: {
            ...baseTimeSeriesOptions,
            series: baseTimeSeriesOptions.series.map((s) => ({
                ...s,
                type: 'line' as const,
            })),
        },
        hasLegend: true,
        legendLayout: 'horizontal' as const,
        customLegendItems: customLegendItemsForSeries,
    },
    {
        title: 'Area',
        options: {
            ...baseTimeSeriesOptions,
            series: baseTimeSeriesOptions.series.map((s) => ({
                ...s,
                type: 'area' as const,
            })),
        },
        hasLegend: true,
        legendLayout: 'horizontal' as const,
        customLegendItems: customLegendItemsForSeries,
    },
    {
        title: 'Pie',
        options: pieOptions,
        hasLegend: true,
        legendLayout: 'vertical' as const,
        customLegendItems: customLegendItemsForPie,
    },
    {
        title: 'Scatter',
        options: {
            ...baseTimeSeriesOptions,
            series: baseTimeSeriesOptions.series.map((s) => ({
                ...s,
                type: 'scatter' as const,
            })),
        },
        hasLegend: true,
        legendLayout: 'horizontal' as const,
        customLegendItems: customLegendItemsForSeries,
    },
    {
        title: 'Sankey',
        options: sankeyOptions,
        hasLegend: false,
        legendLayout: 'horizontal' as const,
        customLegendItems: undefined,
    },
    {
        title: 'Line & Column',
        options: lineColumnOptions,
        hasLegend: true,
        legendLayout: 'horizontal' as const,
        customLegendItems: customLegendItemsForSeries,
    },
    {
        title: 'Line with outage marker',
        options: lineWithOutageMarkerOptions,
        hasLegend: true,
        legendLayout: 'horizontal' as const,
        customLegendItems: customLegendItemsForSeries,
    },
]

const ChartV2Demo = () => {
    const columnRef = useRef<ChartV2ReactRefObject>(null)
    const lineRef = useRef<ChartV2ReactRefObject>(null)
    const areaRef = useRef<ChartV2ReactRefObject>(null)
    const pieRef = useRef<ChartV2ReactRefObject>(null)
    const scatterRef = useRef<ChartV2ReactRefObject>(null)
    const sankeyRef = useRef<ChartV2ReactRefObject>(null)
    const lineColumnRef = useRef<ChartV2ReactRefObject>(null)
    const lineOutageMarkerRef = useRef<ChartV2ReactRefObject>(null)
    const skeletonRef = useRef<ChartV2ReactRefObject>(null)
    const noDataRef = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef1 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef2 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef3 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef4 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef5 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef6 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef7 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef8 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRefs = [
        dashboardChartRef1,
        dashboardChartRef2,
        dashboardChartRef3,
        dashboardChartRef4,
        dashboardChartRef5,
        dashboardChartRef6,
        dashboardChartRef7,
        dashboardChartRef8,
    ]

    const refMap: Record<
        string,
        React.RefObject<ChartV2ReactRefObject | null>
    > = {
        Column: columnRef,
        Line: lineRef,
        Area: areaRef,
        Pie: pieRef,
        Scatter: scatterRef,
        Sankey: sankeyRef,
        'Line & Column': lineColumnRef,
        'Line with outage marker': lineOutageMarkerRef,
    }

    return (
        <div className="space-y-12 p-8">
            <h2 className="text-2xl font-bold">📊 ChartV2 Playground</h2>

            {/* Standard chart types */}
            {chartConfigs.map((config) => (
                <section key={config.title} className="space-y-4">
                    <h3 className="text-lg font-semibold">{config.title}</h3>
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <Block
                                display="flex"
                                width="100%"
                                alignItems="center"
                                justifyContent="space-between"
                                backgroundColor={
                                    FOUNDATION_THEME.colors.gray[25]
                                }
                                padding={FOUNDATION_THEME.unit[12]}
                            >
                                <Block
                                    fontSize={14}
                                    fontWeight={500}
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                >
                                    {config.title} Chart
                                </Block>
                            </Block>
                        </ChartHeaderV2>
                        <Block padding={FOUNDATION_THEME.unit[12]}>
                            {/* {config.hasLegend && (
                                <ChartV2Legend
                                    chartRef={refMap[config.title]}
                                    customLegendItems={config.customLegendItems}
                                    layout={config.legendLayout}
                                />
                            )} */}
                            <ChartV2
                                ref={refMap[config.title]}
                                options={config.options}
                            />
                        </Block>
                    </ChartV2Container>
                </section>
            ))}

            {/* Dashboard example: 8 line charts in 2x4 grid with shared legend */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold">
                    Dashboard (8 charts, shared legend)
                </h3>
                <ChartV2Container>
                    <ChartHeaderV2>
                        <Block
                            display="flex"
                            width="100%"
                            alignItems="center"
                            justifyContent="space-between"
                            backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                            padding={FOUNDATION_THEME.unit[12]}
                        >
                            <Block
                                fontSize={14}
                                fontWeight={500}
                                color={FOUNDATION_THEME.colors.gray[700]}
                            >
                                Chart Header Slot
                            </Block>
                            <Block
                                display="flex"
                                gap={FOUNDATION_THEME.unit[8]}
                            >
                                <Block
                                    fontSize={14}
                                    fontWeight={500}
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                >
                                    Slot 1
                                </Block>
                                <Block
                                    fontSize={14}
                                    fontWeight={500}
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                >
                                    Slot 2
                                </Block>
                                <Block
                                    fontSize={14}
                                    fontWeight={500}
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                >
                                    Slot 3
                                </Block>
                            </Block>
                        </Block>
                    </ChartHeaderV2>
                    <Block padding={FOUNDATION_THEME.unit[12]}>
                        <ChartV2Legend
                            chartRefs={dashboardChartRefs}
                            customLegendItems={dashboardCustomLegendItems}
                            layout="horizontal"
                        />
                        <div
                            className="mt-4 grid grid-cols-4 gap-4"
                            style={{ minHeight: 280 }}
                        >
                            {DASHBOARD_CHART_TITLES.map((title, index) => (
                                <Block key={title} className="space-y-2">
                                    <Block
                                        fontSize={14}
                                        fontWeight={500}
                                        color={
                                            FOUNDATION_THEME.colors.gray[700]
                                        }
                                    >
                                        {title}
                                    </Block>
                                    <div style={{ height: 220 }}>
                                        <ChartV2
                                            ref={dashboardChartRefs[index]}
                                            options={dashboardChartOptions}
                                        />
                                    </div>
                                </Block>
                            ))}
                        </div>
                    </Block>
                </ChartV2Container>
            </section>

            {/* Skeleton state demo */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold">Skeleton state</h3>
                <ChartV2Container>
                    <ChartHeaderV2>
                        <Block
                            display="flex"
                            width="100%"
                            alignItems="center"
                            justifyContent="space-between"
                            backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                            padding={FOUNDATION_THEME.unit[12]}
                        >
                            <Block
                                fontSize={14}
                                fontWeight={500}
                                color={FOUNDATION_THEME.colors.gray[700]}
                            >
                                Loading chart (skeleton)
                            </Block>
                        </Block>
                    </ChartHeaderV2>
                    <Block padding={FOUNDATION_THEME.unit[12]}>
                        <ChartV2
                            ref={skeletonRef}
                            options={chartConfigs[0].options}
                            skeleton={{
                                show: true,
                                variant: 'pulse',
                                height: 300,
                            }}
                        />
                    </Block>
                </ChartV2Container>
            </section>

            {/* No data state demo */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold">No data state</h3>
                <ChartV2Container>
                    <ChartHeaderV2>
                        <Block
                            display="flex"
                            width="100%"
                            alignItems="center"
                            justifyContent="space-between"
                            backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                            padding={FOUNDATION_THEME.unit[12]}
                        >
                            <Block
                                fontSize={14}
                                fontWeight={500}
                                color={FOUNDATION_THEME.colors.gray[700]}
                            >
                                Empty chart (no data)
                            </Block>
                        </Block>
                    </ChartHeaderV2>
                    <Block padding={FOUNDATION_THEME.unit[12]}>
                        <ChartV2
                            ref={noDataRef}
                            options={{
                                xAxis: { type: 'datetime' as const },
                                legend: { enabled: false },
                                series: [],
                            }}
                        />
                    </Block>
                </ChartV2Container>
            </section>
        </div>
    )
}

export default ChartV2Demo
