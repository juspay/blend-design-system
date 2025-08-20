import { ReactNode } from 'react'
import { TooltipProps } from 'recharts'
import {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export type DataPoint = {
    primary: {
        label: string
        val: number
    }
    aux?: {
        label: string
        val: number
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
}

export enum LegendsChangeType {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

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
    flattenedData: FlattenedDataPoint[]
    chartType: ChartType
    hoveredKey: string | null
    lineKeys: string[]
    colors: string[]
    setHoveredKey: (key: string | null) => void
    xAxisLabel?: string
    yAxisLabel?: string
    data: NewNestedDataPoint[]
    selectedKeys: string[]
    isSmallScreen?: boolean
}

export type ChartsProps = {
    chartType?: ChartType
    data: NewNestedDataPoint[]
    colors?: string[]
    xAxisLabel?: string
    yAxisLabel?: string
    slot1?: ReactNode
    slot2?: ReactNode
    slot3?: ReactNode
    legendPosition?: ChartLegendPosition
    chartHeaderSlot: ReactNode
    stackedLegends?: boolean
    stackedLegendsData?: StackedLegendsDataPoint[]
}

export type FlattenedDataPoint = {
    name: string
    [key: string]: number | string
}

export type ChartHeaderProps = {
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
}
