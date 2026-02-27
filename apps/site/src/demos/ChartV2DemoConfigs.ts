import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import type { ChartV2CustomLegendItem } from '../../../../packages/blend/lib/components/ChartsV2/chartV2.types'
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
    lineWithOutageBaseData,
    noDataSeries,
    pieChartSeriesData,
    sankeySeriesData,
    scatterChartGoIndigoData,
    scatterChartOverallData,
} from './ChartV2DemoData'

export const customLegendItemsForSeries: ChartV2CustomLegendItem[] = [
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

export const customLegendItemsForPie: ChartV2CustomLegendItem[] = [
    { key: 'Category A', name: 'Category A', value: 25 },
    { key: 'Category B', name: 'Category B', value: 19 },
    { key: 'Category C', name: 'Category C', value: 15 },
    { key: 'Category D', name: 'Category D', value: 13 },
    { key: 'Category E', name: 'Category E', value: 10 },
]

export const columnChartOptions = {
    xAxis: { type: 'datetime' as const },

    series: [
        {
            type: 'column' as const,
            name: 'Overall',
            data: columnChartOverallData,
            color: FOUNDATION_THEME.colors.primary[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
        {
            type: 'column' as const,
            name: 'goindigo',
            data: columnChartGoIndigoData,
            color: FOUNDATION_THEME.colors.red[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
    ],
}

export const lineChartOptions = {
    xAxis: { type: 'datetime' as const },
    series: [
        {
            type: 'line' as const,
            name: 'Overall',
            data: lineChartOverallData,
            color: FOUNDATION_THEME.colors.primary[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
        {
            type: 'line' as const,
            name: 'goindigo',
            data: lineChartGoIndigoData,
            color: FOUNDATION_THEME.colors.red[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
    ],
}

export const areaChartOptions = {
    xAxis: { type: 'datetime' as const },
    series: [
        {
            type: 'area' as const,
            name: 'Overall',
            data: areaChartOverallData,
            color: FOUNDATION_THEME.colors.primary[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
        {
            type: 'area' as const,
            name: 'goindigo',
            data: areaChartGoIndigoData,
            color: FOUNDATION_THEME.colors.red[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
    ],
}

export const scatterChartOptions = {
    xAxis: { type: 'datetime' as const },
    series: [
        {
            type: 'scatter' as const,
            name: 'Overall',
            data: scatterChartOverallData,
            color: FOUNDATION_THEME.colors.primary[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
        {
            type: 'scatter' as const,
            name: 'goindigo',
            data: scatterChartGoIndigoData,
            color: FOUNDATION_THEME.colors.red[500],
            legendSymbol: 'rectangle' as const,
            marker: { symbol: 'circle' as const },
        },
    ],
}

export const pieChartOptions = {
    legend: {
        enabled: false,
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
    series: [{ type: 'pie' as const, name: 'Share', data: pieChartSeriesData }],
}

export const sankeyChartOptions = {
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
            data: sankeySeriesData,
        },
    ],
    xAxis: { labels: { enabled: false } },
}

export const lineColumnChartOptions = {
    xAxis: { type: 'datetime' as const },

    plotOptions: {
        column: {
            stacking: 'normal' as const,
        },
    },
    series: [
        {
            type: 'line' as const,
            name: 'Overall',
            data: lineColumnOverallData,
            color: FOUNDATION_THEME.colors.primary[500],
            marker: { symbol: 'circle' as const },
            legendSymbol: 'rectangle' as const,
        },
        {
            type: 'column' as const,
            name: 'goindigo',
            data: lineColumnGoIndigoData,
            color: FOUNDATION_THEME.colors.red[500],
            marker: { symbol: 'circle' as const },
            legendSymbol: 'rectangle' as const,
        },
        {
            type: 'column' as const,
            name: 'Orange',
            data: lineColumnOrangeData,
            color: FOUNDATION_THEME.colors.orange[500],
            legendSymbol: 'rectangle' as const,
        },
    ],
}

export const lineWithOutageMarkerData = lineWithOutageBaseData.map((point) =>
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

export const lineWithOutageMarkerOptions = {
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

export const DASHBOARD_CHART_TITLES = [
    'MOTO',
    'THREE_DS',
    'UNKNOWN',
    'ORDERS WITH TRANSACTION(S)',
    'ADDITIONAL METRIC 1',
    'ADDITIONAL METRIC 2',
    'ADDITIONAL METRIC 3',
    'ADDITIONAL METRIC 4',
] as const

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

export const dashboardChartOptions = {
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
    series: dashboardSeriesConfig.map((s, index) => ({
        type: 'line' as const,
        name: s.name,
        data: dashboardSeriesData[index],
        color: s.color,
        marker: { symbol: 'circle' as const },
    })),
}

export const dashboardCustomLegendItems: ChartV2CustomLegendItem[] =
    dashboardSeriesConfig.map((s) => ({
        key: s.name,
        name: s.name,
        color: s.color,
    }))

export const noDataChartOptions = {
    xAxis: { type: 'datetime' as const },
    series: noDataSeries as unknown[],
}
