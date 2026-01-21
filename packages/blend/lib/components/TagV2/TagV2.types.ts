import type { ReactElement } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import { CSSObject } from 'styled-components'

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
    leftSlot?: {
        slot: ReactElement
        maxHeight: CSSObject['maxHeight']
    }
    rightSlot?: {
        slot: ReactElement
        maxHeight: CSSObject['maxHeight']
    }
    skeleton?: {
        showSkeleton?: boolean
        skeletonVariant?: SkeletonVariant
    }
    tagGroupPosition?: 'center' | 'left' | 'right'
} & Omit<
    React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
    'size' | 'className' | 'style'
>
