/**
 * Leaf module for the popover enums and the platform-neutral base props.
 *
 * `popoverV2.types.ts` re-exports everything here, so web consumers are
 * unaffected — but `lib/node.ts` imports THIS file: `popoverV2.types.ts`
 * pulls V1 Button and Skeleton types whose import graphs reach DOM-typed
 * runtime modules, which the React-free node entry must never see.
 */

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

/**
 * The platform-neutral core of `PopoverV2Props` — scalars, enums and neutral
 * callbacks only, so `@juspay/blend-design-system/node` can export it for
 * the React Native package. Trigger/children, the V1-Button-typed actions,
 * dimensions and the DOM attribute spread stay in `PopoverV2Props`.
 */
export type PopoverBaseProps = {
    heading?: string
    description?: string
    showCloseButton?: boolean
    onOpenChange?: (open: boolean) => void
    open?: boolean
    sideOffset?: number
    side?: PopoverV2Side
    align?: PopoverV2Align
    alignOffset?: number
    size?: PopoverV2Size
    onClose?: () => void
}
