import { forwardRef } from 'react'
import {
    ChartV2ReactRefObject,
    ChartV2Props,
    ChartV2SeriesOptionsType,
} from './chartV2.types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartV2TokensType } from './chartV2.tokens'
import ChartV2Skeleton from './ChartV2Skeleton'
import ChartV2NoData from './ChartV2NoData'

import * as SankeyModule from 'highcharts/modules/sankey'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sankeyAny: any = SankeyModule

const sankeyInitializer =
    typeof sankeyAny === 'function'
        ? (sankeyAny as (H: typeof Highcharts) => void)
        : typeof sankeyAny.default === 'function'
          ? (sankeyAny.default as (H: typeof Highcharts) => void)
          : null

if (sankeyInitializer) {
    sankeyInitializer(Highcharts)
}

const ChartV2 = forwardRef<ChartV2ReactRefObject, ChartV2Props>(
    (
        {
            highcharts = Highcharts,
            skeleton,
            noData = {
                title: 'No data available',
                subtitle: 'Data will appear here once available',
                button: undefined,
            },
            ...props
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
        const chartTokens = tokens.chart
        const legendsTokens = tokens.legends

        const { options } = props
        const { chart, title, subtitle, legend, xAxis, yAxis } = options

        const hasSeriesData = Array.isArray(options.series)
            ? (options.series as ChartV2SeriesOptionsType[]).some(
                  (s) =>
                      Array.isArray(
                          (s as unknown as { data?: unknown[] }).data
                      ) &&
                      ((s as unknown as { data?: unknown[] }).data?.length ??
                          0) > 0
              )
            : false

        if (skeleton?.show) {
            return (
                <ChartV2Skeleton
                    skeletonVariant={skeleton.variant}
                    height={skeleton.height}
                    isExpanded
                />
            )
        }

        if (noData && !hasSeriesData) {
            return <ChartV2NoData {...noData} />
        }

        console.log(legendsTokens.name.color)

        return (
            <>
                {/*DO NOT REMOVE: This is to hide the credits from the chart */}

                <style>
                    {`
        .highcharts-credits {
            display: none !important;
        }
        `}
                </style>

                <HighchartsReact
                    ref={ref}
                    highcharts={highcharts}
                    {...props}
                    options={{
                        ...options,
                        chart: {
                            backgroundColor: 'transparent',
                            ...chart,
                        },
                        title: {
                            text: '',
                            ...title,
                        },
                        subtitle: {
                            text: '',
                            ...subtitle,
                        },
                        legend: {
                            enabled: true,
                            symbolWidth: 12,
                            symbolHeight: 12,
                            symbolRadius: 4,
                            squareSymbol: true,
                            // fillColor: 'red',
                            itemStyle: {
                                fontSize: legendsTokens.name.fontSize,
                                color: legendsTokens.name.color,
                                fontWeight: legendsTokens.name.fontWeight,
                                lineHeight: legendsTokens.name.lineHeight,
                            },
                            ...legend,
                        },
                        xAxis: {
                            ...xAxis,
                            title: {
                                text: xAxis?.title?.text ?? '',
                                style: {
                                    fontSize: chartTokens.xAxis.title.fontSize,
                                    color: chartTokens.xAxis.title.color,
                                    fontWeight:
                                        chartTokens.xAxis.title.fontWeight,
                                    lineHeight:
                                        chartTokens.xAxis.title.lineHeight,
                                },
                            },
                            dateTimeLabelFormats: xAxis?.dateTimeLabelFormats
                                ? xAxis?.dateTimeLabelFormats
                                : {
                                      hour: '%H:%M',
                                      minute: '%H:%M',
                                      second: '%H:%M:%S',
                                  },
                            labels: {
                                ...xAxis?.labels,
                                enabled: xAxis?.labels?.enabled ?? true,
                                y: 40,
                                style: {
                                    fontSize: chartTokens.xAxis.labels.fontSize,
                                    color: chartTokens.xAxis.labels.color,
                                    fontWeight:
                                        chartTokens.xAxis.labels.fontWeight,
                                    lineHeight:
                                        chartTokens.xAxis.labels.lineHeight,
                                },
                            },
                            tickLength: 0,
                            lineWidth:
                                xAxis?.lineWidth ??
                                chartTokens.xAxis.line.width,
                            lineColor:
                                xAxis?.lineColor ??
                                chartTokens.xAxis.line.color,

                            gridLineWidth:
                                xAxis?.gridLineWidth ??
                                chartTokens.xAxis.gridLine.width,
                            gridLineColor:
                                xAxis?.gridLineColor ??
                                chartTokens.xAxis.gridLine.color,
                        },
                        yAxis: {
                            ...yAxis,
                            title: {
                                text: yAxis?.title?.text ?? '',
                                style: {
                                    fontSize: chartTokens.yAxis.title.fontSize,
                                    color: chartTokens.yAxis.title.color,
                                    fontWeight:
                                        chartTokens.yAxis.title.fontWeight,
                                    lineHeight:
                                        chartTokens.yAxis.title.lineHeight,
                                },
                            },
                            labels: {
                                ...yAxis?.labels,
                                enabled: yAxis?.labels?.enabled ?? true,
                                ...(yAxis?.labels?.useHTML
                                    ? {}
                                    : {
                                          style: {
                                              fontSize:
                                                  chartTokens.yAxis.labels
                                                      .fontSize,
                                              color: chartTokens.yAxis.labels
                                                  .color,
                                              fontWeight:
                                                  chartTokens.yAxis.labels
                                                      .fontWeight,
                                              lineHeight:
                                                  chartTokens.yAxis.labels
                                                      .lineHeight,
                                          },
                                      }),
                            },
                            tickLength: 0,

                            lineWidth:
                                yAxis?.lineWidth ??
                                chartTokens.yAxis.line.width,
                            lineColor:
                                yAxis?.lineColor ??
                                chartTokens.yAxis.line.color,

                            gridLineWidth:
                                yAxis?.gridLineWidth ??
                                chartTokens.yAxis.gridLine.width,
                            gridLineColor:
                                yAxis?.gridLineColor ??
                                chartTokens.yAxis.gridLine.color,
                        },
                    }}
                />
            </>
        )
    }
)

export default ChartV2
ChartV2.displayName = 'ChartV2'
