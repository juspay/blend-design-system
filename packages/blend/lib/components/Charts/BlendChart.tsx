import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import 'highcharts/modules/xrange'
import { forwardRef, useRef } from 'react'
import { FOUNDATION_THEME } from '../../tokens'
import { BlendChartProps, BlendChartReactRefObject } from './BlendChart.types'

const BlendChart = forwardRef<BlendChartReactRefObject, BlendChartProps>(
    ({ highcharts = Highcharts, ...props }, ref) => {
        const { options } = props
        const { chart, title, subtitle, legend, xAxis, yAxis, series } = options
        const chartRef = useRef<BlendChartReactRefObject | null>(null)

        const isXRangeChart =
            Array.isArray(series) && series.some((s) => s.type === 'xrange')

        const mergedOptions: Highcharts.Options = isXRangeChart
            ? {
                  ...options,
                  chart: {
                      backgroundColor: 'transparent',
                      ...chart,
                  },
                  title: {
                      text: '',
                      ...title,
                  },
                  legend: {
                      enabled: false,
                      ...legend,
                  },
                  xAxis: {
                      ...xAxis,
                      dateTimeLabelFormats: xAxis?.dateTimeLabelFormats
                          ? xAxis?.dateTimeLabelFormats
                          : {
                                hour: '%H:%M',
                                minute: '%H:%M',
                                second: '%H:%M:%S',
                            },
                      labels: {
                          enabled: xAxis?.labels?.enabled ?? false,
                          ...xAxis?.labels,
                          y: 40,
                          style: {
                              fontSize:
                                  FOUNDATION_THEME.font.size.body.sm.fontSize,
                              color: FOUNDATION_THEME.colors.gray[400],
                              fontFamily: FOUNDATION_THEME.font.family.body,
                              fontWeight: FOUNDATION_THEME.font.weight[500],
                          },
                      },
                      gridLineWidth: 0,
                      tickLength: 0,
                      lineWidth: 0,
                  },
                  yAxis: {
                      ...yAxis,
                      title: {
                          text: '',
                      },
                      gridLineWidth: 0,
                  },
              }
            : {
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
                          text: '',
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
                          enabled: true,
                          y: 40,
                          style: {
                              fontSize:
                                  FOUNDATION_THEME.font.size.body.sm.fontSize,
                              color: FOUNDATION_THEME.colors.gray[400],
                              fontFamily: FOUNDATION_THEME.font.family.body,
                              fontWeight: FOUNDATION_THEME.font.weight[500],
                          },
                      },
                      tickLength: 0,
                      lineColor: FOUNDATION_THEME.colors.gray[150],
                      lineWidth: 1,
                      gridLineColor: FOUNDATION_THEME.colors.gray[150],
                      gridLineWidth: 0,
                  },
                  yAxis: {
                      ...yAxis,
                      title: {
                          text: '',
                      },
                      labels: {
                          ...yAxis?.labels,
                          style: {
                              fontSize:
                                  FOUNDATION_THEME.font.size.body.sm.fontSize,
                              color: FOUNDATION_THEME.colors.gray[400],
                              fontFamily: FOUNDATION_THEME.font.family.body,
                              fontWeight: FOUNDATION_THEME.font.weight[500],
                          },
                      },
                      tickLength: 0,
                      lineColor: FOUNDATION_THEME.colors.gray[150],
                      gridLineColor: FOUNDATION_THEME.colors.gray[150],
                      gridLineWidth: 1,
                  },
              }

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
