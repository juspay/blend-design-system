import type { ReactNode } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

export enum TagV2Type {
    NO_FILL = 'noFill',
    ATTENTIVE = 'attentive',
    SUBTLE = 'subtle',
}

export enum TagV2SubType {
    ROUNDED = 'rounded',
    SQUARICAL = 'squarical',
}

export enum TagV2Color {
    NEUTRAL = 'neutral',
    PRIMARY = 'primary',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    PURPLE = 'purple',
}

export enum TagV2Size {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type TagV2Props = {
    text: string
    size?: TagV2Size
    type?: TagV2Type
    subType?: TagV2SubType
    color?: TagV2Color
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>
    tagGroupPosition?: 'center' | 'left' | 'right'
} & Omit<
    React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
    'size' | 'className' | 'style' | 'onClick'
>
