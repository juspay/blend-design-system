import type { ButtonProps } from '../Button'
import { SkeletonVariant } from '../Skeleton'

export type PopoverV2ActionType = Omit<
    ButtonProps,
    'buttonGroupPosition' | 'subType'
>

export enum PopoverV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export enum PopoverV2Side {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export enum PopoverV2Align {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

type BodySkeletonV2Props = {
    show?: boolean
    width?: string
    height?: string | number
}

export type PopoverV2SkeletonProps = {
    show?: boolean
    variant?: SkeletonVariant
    bodySkeletonProps?: BodySkeletonV2Props
}
export type PopoverV2Dimensions = {
    width?: number
    maxWidth?: number
    minWidth?: number
    height?: number
    minHeight?: number
    maxHeight?: number
}
export type PopoverV2Props = {
    heading?: string
    description?: string
    trigger: React.ReactNode
    children: React.ReactNode
    showCloseButton?: boolean
    onOpenChange?: (open: boolean) => void
    open?: boolean
    asModal?: boolean
    primaryAction?: PopoverV2ActionType
    secondaryAction?: PopoverV2ActionType
    sideOffset?: number
    side?: PopoverV2Side
    align?: PopoverV2Align
    alignOffset?: number
    // zIndex?: number
    size?: PopoverV2Size
    onClose?: () => void
    // shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    useDrawerOnMobile?: boolean
    avoidCollisions?: boolean
    skeleton?: PopoverV2SkeletonProps
} & PopoverV2Dimensions &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'className' | 'style'>
