import type { ReactElement } from 'react'

export enum BadgeColor {
    ALERT = 'alert',
    NEUTRAL = 'neutral',
    WARNING = 'warning',
    PRIMARY = 'primary',
    SUCCESS = 'success',
}

export enum BadgeSize {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type BadgePosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'

type BaseBadgeProps = {
    count?: number
    maxCount?: number
    size?: BadgeSize
    color?: BadgeColor
    text?: string
    showBadge?: boolean
    showZero?: boolean
} & Omit<
    React.HTMLAttributes<HTMLSpanElement>,
    'size' | 'className' | 'style' | 'children'
>

type StandaloneBadgeProps = BaseBadgeProps & {
    children?: undefined
}

type PositionedBadgeProps = BaseBadgeProps & {
    children: ReactElement
    position?: BadgePosition
    offset?: [number, number]
    isCircular?: boolean
}

export type BadgeProps = StandaloneBadgeProps | PositionedBadgeProps
