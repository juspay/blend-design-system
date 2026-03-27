import { HTMLAttributes, ReactNode } from 'react'
import { CSSObject } from 'styled-components'
import { StatCardV2TokensType } from './statcardV2.tokens'
import { ChartV2Options } from '../ChartsV2'
import { SkeletonVariant } from '../Skeleton'
import type { SingleSelectProps } from '../SingleSelect'

export type StatCardV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
    height?: CSSObject['height']
}

export enum StatCardV2Variant {
    CHART = 'chart',
    PROGRESS_BAR = 'progress',
    NUMBER = 'number',
}

export enum StatCardV2ArrowDirection {
    UP = 'up',
    DOWN = 'down',
}

export enum StatCardV2ChangeType {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

export enum StatCardV2Alignment {
    LEFT = 'left',
    CENTER = 'center',
}

export type StatCardV2Change = {
    value: string
    changeType: StatCardV2ChangeType
    leftSymbol?: string
    rightSymbol?: string
    arrowDirection?: StatCardV2ArrowDirection
    tooltip?: ReactNode
}

export type StatCardV2SkeletonProps = {
    variant: SkeletonVariant
    show: boolean
    height?: CSSObject['height']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

export type StatCardV2TitleProps = {
    title: string
    helpIconText?: string
    tokens: StatCardV2TokensType
    id?: string
}

export type StatCardV2ChangeProps = {
    changeValueText?: string
    leftSymbol?: string
    rightSymbol?: string
    arrowDirection: StatCardV2ArrowDirection
    changeType: StatCardV2ChangeType
    tokens: StatCardV2TokensType
    id?: string
}

export type StatCardV2SubtitleProps = {
    subtitle?: string
    tokens: StatCardV2TokensType
    id?: string
}

export type StatCardV2Props = {
    title: string
    variant?: StatCardV2Variant
    titleIcon?: ReactNode
    actionIcon?: ReactNode
    value?: string
    progressValue?: number
    helpIconText?: string
    change?: StatCardV2Change
    subtitle?: string
    options?: ChartV2Options
    skeleton?: StatCardV2SkeletonProps
    dropdownProps?: SingleSelectProps
} & HTMLAttributes<HTMLDivElement> &
    StatCardV2Dimensions
