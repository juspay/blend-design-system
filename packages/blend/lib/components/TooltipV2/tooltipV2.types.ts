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

/**
 * The platform-neutral core of `TooltipV2Props` — scalars, enums and neutral
 * callbacks only, so `@juspay/blend-design-system/node` can export it for
 * the React Native package. ReactNode content and the CSS-string `maxWidth`
 * stay in `TooltipV2Props`.
 */
export type TooltipBaseProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: TooltipV2Side
    align?: TooltipV2Align
    showArrow?: boolean
    size?: TooltipV2Size
    slotDirection?: TooltipV2SlotDirection
    delayDuration?: number
    offset?: number
    fullWidth?: boolean
    disableInteractive?: boolean
}

export type TooltipV2Props = TooltipBaseProps & {
    children: ReactNode
    content: ReactNode | string
    slot?: ReactNode
    maxWidth?: string
}
