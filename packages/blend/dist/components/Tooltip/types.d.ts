import { ReactNode } from 'react'
export declare enum TooltipSlotDirection {
    LEFT = 'left',
    RIGHT = 'right',
}
export declare enum TooltipSide {
    TOP = 'top',
    RIGHT = 'right',
    LEFT = 'left',
    BOTTOM = 'bottom',
}
export declare enum TooltipAlign {
    START = 'start',
    END = 'end',
    CENTER = 'center',
}
export declare enum TooltipSize {
    SMALL = 'sm',
    LARGE = 'lg',
}
export type TooltipProps = {
    children: ReactNode
    content: ReactNode | string
    open?: boolean
    side?: TooltipSide
    align?: TooltipAlign
    showArrow?: boolean
    size?: TooltipSize
    slot?: ReactNode
    slotDirection?: TooltipSlotDirection
    delayDuration?: number
    offset?: number
}
