import type { ReactElement } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import type { CSSObject } from 'styled-components'

export enum TagV2PaddingDirection {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
}

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

/**
 * Platform-neutral core of the TagV2 API — no DOM attributes, no React
 * element slots. `@juspay/blend-native` derives its Tag props from this, so
 * a rename or addition here reaches both platforms; `TagV2Props` layers the
 * web-only pieces (slots, HTML attributes) on top without changing shape.
 */
export type TagBaseProps = {
    text: string
    size?: TagV2Size
    type?: TagV2Type
    subType?: TagV2SubType
    color?: TagV2Color
    skeleton?: {
        showSkeleton?: boolean
        skeletonVariant?: SkeletonVariant
    }
    tagGroupPosition?: 'center' | 'left' | 'right'
}

export type TagV2Props = TagBaseProps & {
    leftSlot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    rightSlot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
} & Omit<
        React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
        'size' | 'className' | 'style'
    >
