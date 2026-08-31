import type { ButtonProps } from '../Button/types'
import type { SkeletonVariant } from '../Skeleton/types'

export type PopoverV2ActionType = Omit<
    ButtonProps,
    'buttonGroupPosition' | 'subType'
>

import {
    PopoverV2Size,
    PopoverV2Side,
    PopoverV2Align,
} from './popoverV2.base.types'
import type { PopoverBaseProps } from './popoverV2.base.types'

// Re-exported so existing consumers keep importing from this module; the
// definitions live in the leaf `popoverV2.base.types.ts` (see its header).
export { PopoverV2Size, PopoverV2Side, PopoverV2Align }
export type { PopoverBaseProps }

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
export type PopoverV2Props = PopoverBaseProps & {
    trigger: React.ReactNode
    children: React.ReactNode
    asModal?: boolean
    primaryAction?: PopoverV2ActionType
    secondaryAction?: PopoverV2ActionType
    // zIndex?: number
    shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    useDrawerOnMobile?: boolean
    avoidCollisions?: boolean
    skeleton?: PopoverV2SkeletonProps
} & PopoverV2Dimensions &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'className' | 'style'>
