import type { EChartsOption, EChartsType, SetOptionOpts } from 'echarts'
import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from 'react'

import type { ButtonProps } from '../Button/types'
import type { SkeletonVariant } from '../Skeleton/types'

export type ChartV3 = EChartsType
export type ChartV3Options = EChartsOption
export type ChartV3SetOptionOpts = SetOptionOpts
export type ChartV3Renderer = 'canvas' | 'svg'

export type ChartV3EventHandler = (params: unknown, chart: ChartV3) => void

export type ChartV3ReactRefObject = {
    readonly chart: ChartV3 | null
    getChart: () => ChartV3 | null
}

export type ChartV3SkeletonProps = {
    show: boolean
    variant?: SkeletonVariant
    height?: number
}

export type ChartV3NoDataProps = {
    title?: string
    subtitle?: string
    slot?: ReactNode
    button?: ButtonProps
}

export type ChartV3Props = {
    options?: ChartV3Options
    theme?: string | object
    renderer?: ChartV3Renderer
    settings?: ChartV3SetOptionOpts
    skeleton?: ChartV3SkeletonProps
    noData?: ChartV3NoDataProps | false
    height?: CSSProperties['height']
    width?: CSSProperties['width']
    initialAnimationDelay?: number
    containerProps?: Omit<
        HTMLAttributes<HTMLDivElement>,
        'children' | 'className' | 'style'
    >
    onChartReady?: (chart: ChartV3) => void
    onEvents?: Record<string, ChartV3EventHandler>
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'style'>

export type ChartV3ContainerProps = {
    children: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style' | 'className'>

export type ChartV3HeaderProps = {
    children: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style' | 'className'>

export type ChartV3LegendItem = {
    key: string
    name: string
    color?: string
    value?: string | number
    selected: boolean
    seriesIndex: number
    dataIndex?: number
}

export type ChartV3CustomLegendItem = {
    key: string
    name: string
    color?: string
    value?: string | number
}

export type ChartV3LegendProps = {
    chartRef?: RefObject<ChartV3ReactRefObject | null>
    chartRefs?: ReadonlyArray<RefObject<ChartV3ReactRefObject | null>>
    customLegendItems?: ChartV3CustomLegendItem[]
    renderItem?: (params: {
        item: ChartV3LegendItem
        name: string
        visible: boolean
        color: string
        value?: string | number
        onClick: () => void
    }) => ReactNode
    layout?: 'horizontal' | 'vertical'
} & Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'className'>
