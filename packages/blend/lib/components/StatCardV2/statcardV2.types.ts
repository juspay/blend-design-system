import { HTMLAttributes, ReactNode } from 'react'
import { CSSObject } from 'styled-components'
import {
    StatCardV2ChangeType,
    StatCardV2Variant,
} from './statcardV2.tokens.types'
import type { StatCardV2TokensType } from './statcardV2.tokens.types'
import type { ChartV2Options } from '../ChartsV2/chartV2.types'
import type { SkeletonVariant } from '../Skeleton/types'
import type { SingleSelectProps } from '../SingleSelect/types'

export { StatCardV2ChangeType, StatCardV2Variant }

export type StatCardV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
    height?: CSSObject['height']
}

export enum StatCardV2ArrowDirection {
    UP = 'up',
    DOWN = 'down',
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
    isSmallScreen?: boolean
}

export type StatCardV2ChangeProps = {
    changeValueText?: string
    leftSymbol?: string
    rightSymbol?: string
    arrowDirection: StatCardV2ArrowDirection
    changeType: StatCardV2ChangeType
    tokens: StatCardV2TokensType
    tooltip?: ReactNode
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
    valueTooltip?: ReactNode
    change?: StatCardV2Change
    subtitle?: string
    options?: ChartV2Options
    skeleton?: StatCardV2SkeletonProps
    dropdownProps?: SingleSelectProps
    showBorder?: boolean
} & HTMLAttributes<HTMLDivElement> &
    StatCardV2Dimensions
