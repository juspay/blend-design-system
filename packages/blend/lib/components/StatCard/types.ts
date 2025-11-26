import type { ReactNode } from 'react'
import { SingleSelectProps } from '../SingleSelect'
import { AxisType } from '../Charts/types'
import { SkeletonVariant } from '../Skeleton'

export type StatCardSkeletonProps = {
    variant: SkeletonVariant
    show: boolean
}

export enum StatCardVariant {
    LINE = 'line',
    PROGRESS_BAR = 'progress',
    BAR = 'bar',
    NUMBER = 'number',
}

export enum ChangeType {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

export enum StatCardArrowDirection {
    UP = 'up',
    DOWN = 'down',
}

export type ChartDataPoint = {
    value: number
    name: string
}

export type StatCardChange = {
    value: number
    valueType: ChangeType
    arrowDirection?: StatCardArrowDirection
    tooltip?: ReactNode
}

export enum StatCardDirection {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export type StatCardAxisConfig = {
    type?: AxisType
    tickFormatter?: (value: string | number) => string
    dateOnly?: boolean
    useUTC?: boolean
    formatString?: string
    timeOnly?: boolean
    showYear?: boolean
    smartDateTimeFormat?: boolean
}

export type StatCardProps = {
    title: string
    value: string | number
    valueTooltip?: ReactNode
    change?: StatCardChange
    subtitle?: string
    variant: StatCardVariant
    chartData?: ChartDataPoint[]
    progressValue?: number
    titleIcon?: ReactNode
    actionIcon?: ReactNode
    helpIconText?: string
    dropdownProps?: SingleSelectProps
    maxWidth?: string
    minWidth?: string
    xAxis?: StatCardAxisConfig
    yAxis?: StatCardAxisConfig
    valueFormatter?: AxisType
    height?: string
    direction?: StatCardDirection
    skeleton?: StatCardSkeletonProps
}
