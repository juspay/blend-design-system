import type { ButtonProps } from '../Button'
import { SkeletonVariant } from '../Skeleton'

export type PopoverActionType = Omit<
    ButtonProps,
    'buttonGroupPosition' | 'subType'
>

export enum PopoverSize {
    SMALL = 'small',
    MEDIUM = 'medium',
}

type BodySkeletonProps = {
    show?: boolean
    width?: string
    height?: string | number
}

export type PopoverSkeletonProps = {
    show?: boolean
    variant?: SkeletonVariant
    bodySkeletonProps?: BodySkeletonProps
}

export type PopoverProps = {
    heading?: string
    description?: string
    trigger: React.ReactNode
    children: React.ReactNode
    showCloseButton?: boolean
    onOpenChange?: (open: boolean) => void
    open?: boolean
    asModal?: boolean
    primaryAction?: PopoverActionType
    secondaryAction?: PopoverActionType
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
    size?: PopoverSize
    onClose?: () => void
    shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    useDrawerOnMobile?: boolean
    avoidCollisions?: boolean
    skeleton?: PopoverSkeletonProps
}
