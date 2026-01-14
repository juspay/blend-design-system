import type { ReactElement } from 'react'

/**
 * Position of an element within a group
 */
export enum GroupPosition {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
    TOP = 'top',
    MIDDLE = 'middle',
    BOTTOM = 'bottom',
}

/**
 * Orientation of the group layout
 */
export enum GroupOrientation {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

/**
 * Safe HTML div attributes for restProps
 */
type SafeDivAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, 'display'>

/**
 * Props for the Group component
 */
export interface GroupProps extends Omit<SafeDivAttributes, 'aria-label'> {
    /**
     * Child elements to be grouped
     */
    children: ReactElement | ReactElement[]

    /**
     * Whether elements should be stacked (no gap, connected borders)
     * When true, position props are injected into children
     * @default false
     */
    stacked?: boolean

    /**
     * Layout orientation
     * @default 'horizontal'
     */
    orientation?: GroupOrientation

    /**
     * Gap between elements when not stacked
     * Uses foundation tokens if not provided
     */
    gap?: string | number

    /**
     * Alignment of items along the cross axis
     * @default 'stretch'
     */
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

    /**
     * Alignment of items along the main axis
     */
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'

    /**
     * Whether items should wrap
     * @default 'nowrap'
     */
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'

    /**
     * ARIA role for the group
     * @default 'group'
     */
    role?: string

    /**
     * Accessible label for the group
     */
    'aria-label'?: string

    /**
     * Name of the prop to inject into children for position
     * Different components may use different prop names:
     * - ButtonV2: 'buttonGroupPosition'
     * - Tag: 'splitTagPosition'
     * - FormField: 'fieldGroupPosition'
     * @default 'groupPosition'
     */
    positionProp?: string
}
