import type { ButtonProps } from '../Button'
import { SkeletonVariant } from '../Skeleton'

export type PopoverV2ActionType = Omit<
    ButtonProps,
    'buttonGroupPosition' | 'subType'
>

export enum PopoverV2Size {
    SMALL = 'small',
    MEDIUM = 'medium',
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
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    alignOffset?: number
    width?: number
    minWidth?: number
    maxWidth?: number
    height?: number
    minHeight?: number
    maxHeight?: number
    zIndex?: number
    size?: PopoverV2Size
    onClose?: () => void
    shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    useDrawerOnMobile?: boolean
    avoidCollisions?: boolean
    skeleton?: PopoverV2SkeletonProps
}
