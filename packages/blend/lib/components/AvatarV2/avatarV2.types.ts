import type { HTMLAttributes, ReactNode, ReactElement } from 'react'
import { CSSObject } from 'styled-components'

export enum AvatarV2Size {
    /** Extra small - 24px */
    XS = 'xs',
    /** Small - 32px */
    SM = 'sm',
    /** Medium - 40px (default) */
    MD = 'md',
    /** Large - 56px */
    LG = 'lg',
    /** Extra large - 80px */
    XL = 'xl',
    /** 2X Large - 96px */
    XXL = 'xxl',
}

export enum AvatarV2Shape {
    CIRCLE = 'circle',
    ROUNDED = 'rounded',
    SQUARE = 'square',
}

export enum AvatarV2StatusPosition {
    TOP_RIGHT = 'topRight',
    BOTTOM_RIGHT = 'bottomRight',
    TOP_LEFT = 'topLeft',
    BOTTOM_LEFT = 'bottomLeft',
}

export enum AvatarV2Status {
    NONE = 'none',
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'away',
    BUSY = 'busy',
}

export enum AvatarV2Variant {
    IMAGE = 'image',
    TEXT = 'text',
    ICON = 'icon',
}

export type AvatarV2SkeletonConfig = {
    show: boolean
    variant?: 'pulse' | 'wave'
}

export type AvatarV2StatusConfig = {
    type: AvatarV2Status
    position?: AvatarV2StatusPosition
}

export type AvatarV2Dimensions = {
    width?: CSSObject['width']
    height?: CSSObject['height']
}

export type AvatarV2Props = {
    src?: string
    alt?: string
    fallbackText?: string
    size?: AvatarV2Size
    shape?: AvatarV2Shape
    status?: AvatarV2StatusConfig
    leftSlot?: ReactElement
    rightSlot?: ReactElement
    skeleton?: AvatarV2SkeletonConfig
    backgroundColor?: string
    disabled?: boolean
    onImageError?: (error: Error) => void
    onImageLoad?: () => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
    AvatarV2Dimensions

export type AvatarV2ImageProps = {
    src: string
    alt: string
    onError: () => void
    onLoad?: () => void
}

export type AvatarV2FallbackProps = {
    children: ReactNode
    backgroundColor?: string
}

export type AvatarV2StatusIndicatorProps = {
    status: AvatarV2Status
    position: AvatarV2StatusPosition
    size: AvatarV2Size
}

export type AvatarV2GroupProps = {
    avatars: Omit<AvatarV2Props, 'leadingSlot' | 'trailingSlot'>[]
    max?: number
    size?: AvatarV2Size
    spacing?: 'tight' | 'normal' | 'loose'
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>
