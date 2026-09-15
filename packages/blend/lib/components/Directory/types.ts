import type { ReactNode, RefObject } from 'react'
import type { CSSObject } from 'styled-components'

export type DirectoryExpandedItems = Set<string> | string[]

export type DirectoryVirtualizationConfig = {
    /**
     * External scroll container. Must be mounted (ref.current set) by the
     * time Directory mounts — onEndReached binds its scroll listener once
     * and does not retry when the element appears later.
     */
    viewportRef?: RefObject<HTMLElement | null>
    rowHeight?: number
    sectionHeight?: number
    viewportHeight?: number
    overscan?: number
    threshold?: number
}

export type DirectoryProps = {
    directoryData: DirectoryData[] | null
    idPrefix?: string
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
    iconOnlyMode?: boolean
    showHierarchyLines?: boolean
    hierarchyLineBorderRadius?: CSSObject['borderRadius']
    expandedItems?: DirectoryExpandedItems
    defaultExpandedItems?: DirectoryExpandedItems
    onExpandedItemsChange?: (items: string[]) => void
    onItemExpand?: (item: NavbarItem, itemPath: string) => void | Promise<void>
    /**
     * Called when the viewport is scrolled within endReachedThreshold pixels
     * of the bottom (and re-checked when the content grows), for paged /
     * infinite loading.
     */
    onEndReached?: () => void | Promise<void>
    /**
     * Distance in pixels from the bottom at which onEndReached fires.
     * @default 200
     */
    endReachedThreshold?: number
    /**
     * When true, clicking a parent row selects it (updates activeItem) in
     * addition to toggling expansion, and parent rows can render as
     * selected. When false, only leaf rows can be selected.
     * @default false
     */
    enableParentSelection?: boolean
    /**
     * When true, selecting an item also styles its ancestor chain as
     * `activePath` and every unrelated row as `muted`, so the branch you are
     * in reads at a glance. With nothing selected the tree renders exactly as
     * it does with this off.
     *
     * Requires a path-valued `activeItem` — a bare label (the backward-compat
     * match for id-less items) resolves no ancestors and degrades to
     * selected-only highlighting.
     *
     * Note: the default `muted` text colour is 4.49:1 (light) / 4.17:1 (dark),
     * just under the 4.5:1 WCAG AA floor; muted rows lift to the `hover` tier
     * on hover and focus-visible. Override `DIRECTORY` component tokens if
     * your product needs muted rows to clear AA at rest.
     *
     * @default false
     */
    highlightActivePath?: boolean
    enableVirtualization?: boolean
    virtualization?: DirectoryVirtualizationConfig
}

export type DirectoryData = {
    label?: string
    items?: NavbarItem[]
    isCollapsible?: boolean
    defaultOpen?: boolean
}

export type NavbarItem = {
    label: string
    /**
     * Stable identifier used as this item's path segment (itemPath, expansion
     * state, virtualizer keys, data-id). Falls back to label when omitted or
     * empty — provide it when sibling labels can collide. Must not contain
     * "/" (the path separator). Items without an id also match a bare-label
     * activeItem for backward compatibility; items with an id match only
     * their id-based path.
     */
    id?: string
    items?: NavbarItem[]
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    onClick?: () => void
    href?: string
    isSelected?: boolean
    /**
     * When true, the item appears in the Sidebar mobile navigation drawer.
     * Desktop always renders all items regardless of this flag.
     */
    showOnMobile?: boolean
}

export type SectionProps = {
    section: DirectoryData
    sectionIndex: number
    // totalSections: number;
    onNavigateBetweenSections: (
        direction: 'up' | 'down',
        currentIndex: number
    ) => void
    idPrefix?: string
    iconOnlyMode?: boolean
    showHierarchyLines?: boolean
    hierarchyLineBorderRadius?: CSSObject['borderRadius']
    enableParentSelection?: boolean
    highlightActivePath?: boolean
}

export type NavItemProps = {
    item: NavbarItem
    index: number
    onNavigate: (direction: 'up' | 'down', currentIndex: number) => void
    itemPath?: string
    iconOnlyMode?: boolean
    showHierarchyLines?: boolean
    hierarchyLineBorderRadius?: CSSObject['borderRadius']
    isLast?: boolean
    isNested?: boolean
    enableParentSelection?: boolean
    highlightActivePath?: boolean
    // Active-path connector highlighting, decided by the parent:
    // - pathVerticalActive: this row sits at/above the on-path child, so its
    //   vertical guide segment (::before) is on the active path.
    // - pathElbowActive: this row IS the on-path child, so its elbow (::after)
    //   and the stub above it are highlighted.
    pathVerticalActive?: boolean
    pathElbowActive?: boolean
}

export type DirectoryFlatRow =
    | {
          type: 'section'
          section: DirectoryData
          sectionIndex: number
      }
    | {
          type: 'item'
          item: NavbarItem
          sectionIndex: number
          itemPath: string
          depth: number
          isLast: boolean
          ancestorIsLast: boolean[]
      }
