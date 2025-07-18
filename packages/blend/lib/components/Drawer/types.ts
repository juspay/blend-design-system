import type { ReactNode } from 'react'

export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right'

export type DrawerProps = {
    /**
     * Whether the drawer is open
     */
    open?: boolean
    /**
     * Callback when the drawer open state changes
     */
    onOpenChange?: (open: boolean) => void
    /**
     * The direction from which the drawer slides in
     * @default 'bottom'
     */
    direction?: DrawerDirection
    /**
     * Whether the drawer should be modal (with overlay)
     * @default true
     */
    modal?: boolean
    /**
     * Whether the drawer can be dismissed by clicking outside
     * @default true
     */
    dismissible?: boolean
    /**
     * Whether to show the drag handle (only for bottom/top drawers)
     * @default true
     */
    showHandle?: boolean
    /**
     * Custom handle element
     */
    handle?: ReactNode
    /**
     * Whether the drawer should be nested (for stacking effect)
     * @default false
     */
    nested?: boolean
    /**
     * Custom snap points for the drawer (only for bottom/top drawers)
     */
    snapPoints?: (string | number)[]
    /**
     * Active snap point (can be index or the snap point value itself)
     */
    activeSnapPoint?: number | string | null
    /**
     * Callback when snap point changes
     */
    onSnapPointChange?: (activeSnapPoint: number | string | null) => void
    /**
     * Whether the drawer should fade from the given snap point index
     */
    fadeFromIndex?: number
    /**
     * Disable velocity-based snapping, ensuring sequential snap point navigation
     * @default false
     */
    snapToSequentialPoint?: boolean
    /**
     * Custom class name for the drawer content
     */
    className?: string
    /**
     * Custom class name for the overlay
     */
    overlayClassName?: string
    /**
     * Custom styles for the drawer content
     */
    style?: React.CSSProperties
    /**
     * Children content
     */
    children: ReactNode
}

export type DrawerTriggerProps = {
    /**
     * The trigger element
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
    /**
     * Whether the trigger is disabled
     */
    disabled?: boolean
    /**
     * Custom click handler
     */
    onClick?: () => void
}

export type DrawerContentProps = {
    /**
     * Content of the drawer
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
    /**
     * Custom styles
     */
    style?: React.CSSProperties
}

export type DrawerHeaderProps = {
    /**
     * Header content
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
}

export type DrawerTitleProps = {
    /**
     * Title content
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
}

export type DrawerDescriptionProps = {
    /**
     * Description content
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
}

export type DrawerFooterProps = {
    /**
     * Footer content
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
}

export type DrawerCloseProps = {
    /**
     * Close button content
     */
    children: ReactNode
    /**
     * Custom class name
     */
    className?: string
    /**
     * Whether the close button is disabled
     */
    disabled?: boolean
}
