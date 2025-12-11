import { ReactNode } from 'react'
import { TooltipProps } from 'recharts'
import {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import { ButtonProps } from '../Button'
import { SkeletonVariant } from '../Skeleton'

export type DataPoint = {
    primary: {
        label: string
        val: number
    }
    aux?: {
        label: string
        val: number
        type?: AxisType
        dateOnly?: boolean
        smart?: boolean
        timeZone?: string
        hour12?: boolean
    }[]
}

export enum ChartLegendPosition {
    TOP = 'top',
    RIGHT = 'right',
}

export enum ChartType {
    LINE = 'line',
    BAR = 'bar',
    PIE = 'pie',
    SCATTER = 'scatter',

    SANKEY = 'sankey',
}

export enum LegendsChangeType {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

export enum AxisIntervalType {
    PRESERVE_START = 'preserveStart',
    PRESERVE_END = 'preserveEnd',
    PRESERVE_START_END = 'preserveStartEnd',
}

export enum AxisType {
    DATE_TIME = 'dateTime',
    CURRENCY = 'currency',
    PERCENTAGE = 'percentage',
    NUMBER = 'number',
}

export type TickProps = {
    x?: number
    y?: number
    payload?: {
        value: string | number
        index?: number
        coordinate?: number
    }
    [key: string]: unknown
}

export type NoDataProps = {
    title?: string
    subtitle?: string
    slot?: ReactNode
    button?: ButtonProps
}

export type AxisConfig = {
    label?: string
    showLabel?: boolean
    interval?: number | AxisIntervalType
    show?: boolean
    type?: AxisType
    tickFormatter?: (value: string | number) => string
    customTick?: React.ComponentType<TickProps>
    dateOnly?: boolean
    useUTC?: boolean
    formatString?: string
    timeOnly?: boolean
    showYear?: boolean
    ticks?: (number | string)[] // Custom tick values for consistent intervals
    autoConsistentTicks?: boolean // Automatically generate consistent ticks for DATE_TIME axes (default: true)
    maxTicks?: number // Maximum number of ticks to generate (default: 10)
    smartDateTimeFormat?: boolean // Alternates between showing date and time like Highcharts (default: true for DATE_TIME)
}

export type XAxisConfig = AxisConfig
export type YAxisConfig = AxisConfig

export type NewNestedDataPoint = {
    name: string
    data: {
        [key: string]: DataPoint
    }
}

export type StackedLegendsDataPoint = {
    value: number
    delta: number
    changeType: LegendsChangeType
}

export type RenderChartProps = {
    chartName?: string
    flattenedData: FlattenedDataPoint[]
    chartType: ChartType
    hoveredKey: string | null
    lineKeys: string[]
    colors: string[]
    setHoveredKey: (key: string | null) => void
    data: NewNestedDataPoint[]
    selectedKeys: string[]
    isSmallScreen?: boolean
    barsize?: number
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    noData?: NoDataProps
    height?: number | string
}

export type CoreChartProps = {
    chartType?: ChartType
    data: NewNestedDataPoint[]
    colors?: string[]
    barsize?: number
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    height?: number | string
    width?: number | string
    isSmallScreen?: boolean

    hoveredKey?: string | null
    onHoveredKeyChange?: (key: string | null) => void
    selectedKeys?: string[]

    enableHover?: boolean
}

export type ChartsSkeletonProps = {
    show: boolean
    variant: SkeletonVariant
}

export type ChartsProps = {
    chartType?: ChartType
    data: NewNestedDataPoint[]
    colors?: string[]
    slot1?: ReactNode
    slot2?: ReactNode
    slot3?: ReactNode
    legendPosition?: ChartLegendPosition
    chartHeaderSlot: ReactNode
    stackedLegends?: boolean
    stackedLegendsData?: StackedLegendsDataPoint[]
    barsize?: number
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    noData?: NoDataProps
    height?: number
    showHeader?: boolean
    showCollapseIcon?: boolean
    isExpanded?: boolean
    onExpandedChange?: (isExpanded: boolean) => void
    chartName?: string
    skeleton?: ChartsSkeletonProps
}

export type FlattenedDataPoint = {
    name: string
    [key: string]: number | string
}

export type ChartHeaderProps = {
    id?: string
    slot1: React.ReactNode
    slot2: React.ReactNode
    slot3: React.ReactNode
    chartHeaderSlot: ReactNode
    onFullscreen?: () => void
    onExitFullscreen?: () => void
    isFullscreen?: boolean
    isSmallScreen?: boolean
    isExpanded: boolean
    setIsExpanded: (isExpanded: boolean) => void
    showCollapseIcon?: boolean
}

export type ChartLegendsProps = {
    chartContainerRef: React.RefObject<HTMLDivElement>
    keys: string[]
    colors: string[]
    handleLegendClick: (key: string) => void
    handleLegendEnter: (key: string) => void
    handleLegendLeave: () => void
    selectedKeys: string[]
    setSelectedKeys: (keys: string[]) => void
    hoveredKey: string | null
    activeKeys: string[] | null
    stacked?: boolean
    isSmallScreen?: boolean
    stackedLegendsData?: StackedLegendsDataPoint[]
}

export type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
    hoveredKey: string | null
    originalData: NewNestedDataPoint[]
    setHoveredKey: (key: string) => void
    chartType: ChartType
    selectedKeys: string[]
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
}

export type SankeyNode = {
    name: string
    id?: string
    color?: string
}

export type SankeyLink = {
    source: number | string
    target: number | string
    value: number
    color?: string
    hoverColor?: string
}

export type SankeyData = {
    nodes: SankeyNode[]
    links: SankeyLink[]
}

export type SankeyTooltipData = {
    payload: {
        name?: string
        value?: number
        source?: number | string
        target?: number | string
        sourceName?: string
        targetName?: string
        color?: string
        hoverColor?: string
    }
}

export type SankeyNodeProps = {
    x?: number
    y?: number
    width?: number
    height?: number
    index?: number
    payload?: SankeyNode & { value?: number }
    containerWidth?: number
    nodeColors?: string[]
    onMouseEnter?: (data: SankeyTooltipData, event: React.MouseEvent) => void
    onMouseLeave?: () => void
}

export type SankeyLinkProps = {
    sourceX?: number
    targetX?: number
    sourceY?: number
    targetY?: number
    sourceControlX?: number
    targetControlX?: number
    linkWidth?: number
    index?: number
    payload?: SankeyLink
    linkColors?: string[]
    onMouseEnter?: (data: SankeyTooltipData, event: React.MouseEvent) => void
    onMouseLeave?: () => void
}
