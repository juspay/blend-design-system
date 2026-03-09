import type { ReactNode } from 'react'

export enum TooltipV2SlotDirection {
    LEFT = 'left',
    RIGHT = 'right',
}

export enum TooltipV2Side {
    TOP = 'top',
    RIGHT = 'right',
    LEFT = 'left',
    BOTTOM = 'bottom',
}

export enum TooltipV2Align {
    START = 'start',
    END = 'end',
    CENTER = 'center',
}

export enum TooltipV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type TooltipV2Props = {
    children: ReactNode
    content: ReactNode | string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: TooltipV2Side
    align?: TooltipV2Align
    showArrow?: boolean
    size?: TooltipV2Size
    slot?: ReactNode
    slotDirection?: TooltipV2SlotDirection
    delayDuration?: number
    offset?: number
    maxWidth?: string
    fullWidth?: boolean
    disableInteractive?: boolean
}
