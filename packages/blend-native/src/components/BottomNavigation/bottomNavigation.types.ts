import type { ReactNode } from 'react'
import type {
    BOTTOM_NAVIGATION_METRICS,
    BottomNavigationPalette,
} from './bottomNavigation.theme'

/** One destination in the bar. */
export type BottomNavigationItem = {
    /** Stable identifier — matched against `activeItem` and used as the key. */
    id: string
    label: string
    icon: ReactNode
    /** Swapped in for `icon` while the item is active. */
    activeIcon?: ReactNode
    /** A count or short text hung off the icon's corner via `Badge`. */
    badge?: number | string
    disabled?: boolean
    /**
     * `false` makes the item an action rather than a destination: pressing
     * it fires `onItemPress` but leaves the selection unchanged — e.g. a
     * "More" item that opens a sheet. @default true
     */
    selectable?: boolean
    /** Defaults to `label`. */
    accessibilityLabel?: string
}

/** The raised circular button between the two halves of the bar. */
export type BottomNavigationCenterAction = {
    icon: ReactNode
    onPress: () => void
    accessibilityLabel: string
}

/**
 * Per-instance overrides of the bar's colours and item metrics, merged over
 * the themed defaults — e.g. to match a product's existing mobile bar.
 */
export type BottomNavigationTokens = Partial<
    Pick<
        BottomNavigationPalette,
        | 'background'
        | 'border'
        | 'foreground'
        | 'activeForeground'
        | 'pressedBackground'
    > &
        Pick<
            typeof BOTTOM_NAVIGATION_METRICS,
            | 'itemMinHeight'
            | 'iconSize'
            | 'itemGap'
            | 'paddingX'
            | 'paddingY'
            | 'labelFontSize'
            | 'labelLineHeight'
            | 'labelFontWeight'
        >
>

/**
 * A full-width tab bar docked to the bottom edge. No web counterpart —
 * web's mobile navigation is `SidebarV2`'s floating dock (see
 * `SidebarMobileBottomNav` for the native port of that).
 */
export type BottomNavigationNativeProps = {
    items: BottomNavigationItem[]

    activeItem?: string | null
    defaultActiveItem?: string | null
    /** Fires only for selectable items, after `onItemPress`. */
    onActiveItemChange?: (id: string) => void
    /** Fires for every enabled item press, selectable or not. */
    onItemPress?: (id: string) => void

    /** Raised button in the middle; `items` split evenly around it. */
    centerAction?: BottomNavigationCenterAction
    /**
     * Empty space (pt) between the two halves when there's no
     * `centerAction` — e.g. to line the items up around a notch drawn by
     * `background`.
     */
    centerGap?: number
    /**
     * Drawn behind the items, centred and anchored to the bar's bottom edge
     * (it may extend above the bar, e.g. a notched shape). Replaces the
     * bar's own background colour and top border.
     */
    background?: ReactNode
    tokens?: BottomNavigationTokens

    accessibilityLabel?: string
    testID?: string
}
