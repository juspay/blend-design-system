import type { RefObject, ReactNode } from 'react'
import { HighchartsReactProps } from 'highcharts-react-official'

import type { HighchartsReactRefObject } from 'highcharts-react-official'
import Highcharts from 'highcharts'
import type { ButtonProps } from '../Button'
import type { SkeletonVariant } from '../Skeleton'

export const ChartV2BaseInstance = Highcharts
export type ChartV2Type = typeof Highcharts
export type ChartV2ReactProps = HighchartsReactProps

export type ChartV2SkeletonProps = {
    show: boolean
    variant?: SkeletonVariant
    height?: number
}

export type ChartV2NoDataProps = {
    title?: string
    subtitle?: string
    slot?: ReactNode
    button?: ButtonProps
}

export type ChartV2Props = ChartV2ReactProps & {
    highcharts?: ChartV2Type
    skeleton?: ChartV2SkeletonProps
    noData?: ChartV2NoDataProps
}

export type ChartV2Options = Highcharts.Options
export type ChartV2SeriesOptionsType = Highcharts.SeriesOptionsType
export type ChartV2SeriesLineOptions = Highcharts.SeriesLineOptions
export type ChartV2SeriesColumnOptions = Highcharts.SeriesColumnOptions
export type ChartV2SeriesBarOptions = Highcharts.SeriesBarOptions
export type ChartV2SeriesPieOptions = Highcharts.SeriesPieOptions
export type ChartV2SeriesScatterOptions = Highcharts.SeriesScatterOptions
export type ChartV2SeriesSankeyOptions = Highcharts.SeriesSankeyOptions
export type ChartV2SeriesAreaOptions = Highcharts.SeriesAreaOptions
export type ChartV2SeriesXrangeOptions = Highcharts.SeriesXrangeOptions
export type ChartV2Point = Highcharts.Point
export type ChartV2PointMarkerOptionsObject =
    Highcharts.PointMarkerOptionsObject
export type ChartV2XAxisOptions = Highcharts.XAxisOptions
export type ChartV2YAxisOptions = Highcharts.YAxisOptions
export type ChartV2 = Highcharts.Chart
export type ChartV2Axis = Highcharts.Axis
export type ChartV2Series = Highcharts.Series
export type ChartV2SeriesZonesOptionsObject =
    Highcharts.SeriesZonesOptionsObject
export type ChartV2ReactRefObject = HighchartsReactRefObject

//Chart Container Types
export interface ChartV2ContainerProps {
    children: ReactNode
}

//Chart Header Types
export interface ChartV2HeaderProps {
    children: ReactNode
}

export type ChartV2LegendItem = Highcharts.Series | Highcharts.Point

export interface ChartV2CustomLegendItem {
    key: string
    name: string
    color?: string
    value?: string | number
}

export interface ChartV2LegendProps {
    /** Single chart ref (use when legend controls one chart). */
    chartRef?: RefObject<ChartV2ReactRefObject | null>
    /** Multiple chart refs (use for shared legend; visibility and hover sync across all). */
    chartRefs?: ReadonlyArray<RefObject<ChartV2ReactRefObject | null>>
    customLegendItems?: ChartV2CustomLegendItem[]
    renderItem?: (params: {
        item: ChartV2LegendItem
        name: string
        visible: boolean
        color: string
        value?: string | number
        onClick: () => void
    }) => ReactNode
    layout?: 'horizontal' | 'vertical'
}
