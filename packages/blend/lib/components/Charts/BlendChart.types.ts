import { HighchartsReactProps } from 'highcharts-react-official'

import type { HighchartsReactRefObject } from 'highcharts-react-official'
import Highcharts from 'highcharts'

export const BlendChartBaseInstance = Highcharts
export type BlendChartType = typeof Highcharts
export type BlendChartReactProps = HighchartsReactProps

export type BlendChartProps = BlendChartReactProps & {
    highcharts?: BlendChartType
}

export type BlendChartOptions = Highcharts.Options
export type BlendChartSeriesOptionsType = Highcharts.SeriesOptionsType
export type BlendChartSeriesLineOptions = Highcharts.SeriesLineOptions
export type BlendChartSeriesAreaOptions = Highcharts.SeriesAreaOptions
export type BlendChartSeriesXrangeOptions = Highcharts.SeriesXrangeOptions
export type BlendChartPoint = Highcharts.Point
export type BlendChartPointMarkerOptionsObject =
    Highcharts.PointMarkerOptionsObject
export type BlendChartXAxisOptions = Highcharts.XAxisOptions
export type BlendChartYAxisOptions = Highcharts.YAxisOptions
export type BlendChartChart = Highcharts.Chart
export type BlendChartAxis = Highcharts.Axis
export type BlendChartSeries = Highcharts.Series
export type BlendChartSeriesZonesOptionsObject =
    Highcharts.SeriesZonesOptionsObject
export type BlendChartReactRefObject = HighchartsReactRefObject

//Chart Container Types
export interface BlendChartContainerProps {
    children: React.ReactNode
}

//Chart Header Types
export interface BlendChartHeaderProps {
    children: React.ReactNode
}
