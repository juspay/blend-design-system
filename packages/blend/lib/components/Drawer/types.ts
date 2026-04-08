import type { ReactNode } from 'react'
import type { ButtonProps } from '../Button/types'

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

    disableDrag?: boolean
    /**
     * Custom mobile offset values (overrides token defaults)
     */
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
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
    /**
     * Accessibility label for the trigger button
     */
    'aria-label'?: string
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
    /**
     * Accessibility label for the drawer content
     */
    'aria-label'?: string
    /**
     * ID of the element describing the drawer content
     */
    'aria-describedby'?: string
    /**
     * Whether the drawer should take full screen (full height and width, no border radius)
     * @default false
     */
    fullScreen?: boolean
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
    /**
     * ID for ARIA labeling
     */
    id?: string
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
    /**
     * ID for ARIA description
     */
    id?: string
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
    /**
     * The direction of the drawer (used to apply appropriate border radius)
     */
    direction?: 'top' | 'bottom' | 'left' | 'right'
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
    /**
     * Merge props with child element instead of rendering a button
     */
    asChild?: boolean
    /**
     * Accessibility label for the close button
     */
    'aria-label'?: string
}

export type StatusDrawerProps = {
    /**
     * Whether the drawer is open
     */
    open?: boolean
    /**
     * Callback when the drawer open state changes
     */
    onOpenChange?: (open: boolean) => void
    /**
     * The heading text (gray-700, heading.sm)
     */
    heading: string
    /**
     * The description text (gray-500, body.md)
     */
    description: string
    /**
     * Primary action button props (e.g., Delete, OK, Confirm)
     */
    primaryButtonProps: ButtonProps
    /**
     * Secondary action button props (e.g., Cancel) - optional
     */
    secondaryButtonProps?: ButtonProps
    /**
     * 56x56px slot for any React element (icon, image, etc.)
     */
    slot: ReactNode
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
     * Custom mobile offset values (overrides token defaults)
     */
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    /**
     * Custom class name for the drawer content
     */
    className?: string
    /**
     * Custom styles for the drawer content
     */
    style?: React.CSSProperties
}

export type SelectDrawerItem = {
    /**
     * Unique identifier for the item
     */
    value: string
    /**
     * Display label for the item
     */
    label: string
    /**
     * Optional subtitle/description
     */
    subLabel?: string
    /**
     * Optional icon or element to display on the left
     */
    slot1?: ReactNode
    /**
     * Whether the item is disabled
     */
    disabled?: boolean
}

export type SelectDrawerGroup = {
    /**
     * Optional group label
     */
    groupLabel?: string
    /**
     * Items in this group
     */
    items: SelectDrawerItem[]
    /**
     * Whether to show separator after this group
     */
    showSeparator?: boolean
}

export type SelectDrawerProps = {
    /**
     * Whether the drawer is open
     */
    open?: boolean
    /**
     * Callback when the drawer open state changes
     */
    onOpenChange?: (open: boolean) => void
    /**
     * The heading text (gray-800, body.lg)
     */
    heading: string
    /**
     * The description text (gray-500, body.md)
     */
    description?: string
    /**
     * 14x14px slot for any React element (icon, etc.)
     */
    rightSlot?: ReactNode
    /**
     * Array of items or groups to display
     */
    items: SelectDrawerGroup[]
    /**
     * Currently selected values (for multi-select)
     */
    selectedValues?: string[]
    /**
     * Single selected value (for single-select)
     */
    selectedValue?: string
    /**
     * Callback when selection changes (multi-select)
     */
    onSelectionChange?: (selectedValues: string[]) => void
    /**
     * Callback when single selection changes
     */
    onValueChange?: (value: string) => void
    /**
     * Whether to enable search functionality
     * @default true
     */
    enableSearch?: boolean
    /**
     * Search placeholder text
     * @default 'Search'
     */
    searchPlaceholder?: string
    /**
     * Whether this is a multi-select drawer
     * @default true
     */
    multiSelect?: boolean
    /**
     * Cancel button text
     * @default 'Clear All'
     */
    cancelText?: string
    /**
     * Confirm button text
     * @default 'Done'
     */
    confirmText?: string
    /**
     * Cancel button click handler
     */
    onCancel?: () => void
    /**
     * Confirm button click handler
     */
    onConfirm?: () => void
    /**
     * Whether to show the cancel button
     * @default true
     */
    showCancelButton?: boolean
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
     * Custom mobile offset values (overrides token defaults)
     */
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    /**
     * Custom class name for the drawer content
     */
    className?: string
    /**
     * Custom styles for the drawer content
     */
    style?: React.CSSProperties
}
