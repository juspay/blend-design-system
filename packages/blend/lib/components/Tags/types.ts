import type { ReactNode } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import type { BlockProps } from '../Primitives/Block/Block'

export enum TagVariant {
    NO_FILL = 'noFill',
    ATTENTIVE = 'attentive',
    SUBTLE = 'subtle',
}

export enum TagColor {
    NEUTRAL = 'neutral',
    PRIMARY = 'primary',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    PURPLE = 'purple',
}

export enum TagSize {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export enum TagShape {
    ROUNDED = 'rounded',
    SQUARICAL = 'squarical',
}

export type TagProps = Omit<BlockProps, 'children'> & {
    text: string
    variant?: TagVariant
    color?: TagColor
    size?: TagSize
    shape?: TagShape
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    splitTagPosition?: 'left' | 'right'
}

export type TagWithSkeletonProps = TagProps & {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}
