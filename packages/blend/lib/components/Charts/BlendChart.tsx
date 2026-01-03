'use client'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import 'highcharts/modules/xrange'
import { forwardRef, useRef } from 'react'
import { FOUNDATION_THEME } from '../../tokens'
import { BlendChartProps, BlendChartReactRefObject } from './BlendChart.types'

// Polyfill CSS.supports for Highcharts compatibility
if (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.CSS === 'undefined'
) {
    ;(
        globalThis as unknown as {
            CSS: { supports: (property: string, value?: string) => boolean }
        }
    ).CSS = {
        supports: () => true,
    }
}

const BlendChart = forwardRef<BlendChartReactRefObject, BlendChartProps>(
    ({ highcharts = Highcharts, ...props }, ref) => {
        const { options } = props
        const { chart, title, subtitle, legend, xAxis, yAxis } = options
        const chartRef = useRef<BlendChartReactRefObject | null>(null)

        const defaultXAxisTitleLabelStyle = {
            fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
            color: FOUNDATION_THEME.colors.gray[400],
            fontFamily: FOUNDATION_THEME.font.family.body,
            fontWeight: FOUNDATION_THEME.font.weight[500],
        }

        const defaultYAxisTitleLabelStyle = {
            fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
            color: FOUNDATION_THEME.colors.gray[400],
            fontFamily: FOUNDATION_THEME.font.family.body,
            fontWeight: FOUNDATION_THEME.font.weight[500],
        }

        const defaultXAxisLineStyle = {
            width: xAxis?.lineWidth ?? 1,
            color: xAxis?.lineColor ?? FOUNDATION_THEME.colors.gray[150],
        }

        const defaultYAxisLineStyle = {
            width: yAxis?.lineWidth ?? 0,
            color: yAxis?.lineColor ?? FOUNDATION_THEME.colors.gray[150],
        }

        const defaultXAxisGridLineStyle = {
            width: xAxis?.gridLineWidth ?? 0,
            color: xAxis?.gridLineColor ?? FOUNDATION_THEME.colors.gray[150],
        }

        const defaultYAxisGridLineStyle = {
            width: yAxis?.gridLineWidth ?? 1,
            color: yAxis?.gridLineColor ?? FOUNDATION_THEME.colors.gray[150],
        }

        const defaultChartsConfig = {
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
                enabled: false,
                ...legend,
            },
            xAxis: {
                ...xAxis,
                title: {
                    text: xAxis?.title?.text ?? '',
                    style: {
                        ...defaultXAxisTitleLabelStyle,
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
                        ...defaultXAxisTitleLabelStyle,
                    },
                },
                tickLength: 0,
                lineWidth: defaultXAxisLineStyle.width,
                lineColor: defaultXAxisLineStyle.color,

                gridLineWidth: defaultXAxisGridLineStyle.width,
                gridLineColor: defaultXAxisGridLineStyle.color,
            },
            yAxis: {
                ...yAxis,
                title: {
                    text: yAxis?.title?.text ?? '',
                    style: {
                        ...defaultYAxisTitleLabelStyle,
                    },
                },
                labels: {
                    ...yAxis?.labels,
                    enabled: yAxis?.labels?.enabled ?? true,
                    style: {
                        ...defaultYAxisTitleLabelStyle,
                    },
                },
                tickLength: 0,

                lineWidth: defaultYAxisLineStyle.width,
                lineColor: defaultYAxisLineStyle.color,

                gridLineWidth: defaultYAxisGridLineStyle.width,
                gridLineColor: defaultYAxisGridLineStyle.color,
            },
        }

        const mergedOptions: Highcharts.Options =
            // isXRangeChart
            // ? defaultXRangeConfig
            // :
            defaultChartsConfig

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
                    ref={ref ?? chartRef}
                    highcharts={highcharts}
                    {...props}
                    options={mergedOptions}
                />
            </>
        )
    }
)

BlendChart.displayName = 'BlendChart'

export default BlendChart
