import { useState, useEffect, useRef } from 'react'
import type { MobileNavigationItem, TenantItem } from './types'
import type { SidebarTokenType } from './sidebar.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import type { DirectoryData } from '../Directory/types'

export const arrangeTenants = (
    tenants: TenantItem[],
    selectedLabel: string
): {
    visibleTenants: TenantItem[]
    hiddenTenants: TenantItem[]
    hasMoreTenants: boolean
} => {
    const selectedTenant = tenants.find(
        (tenant) => tenant.label === selectedLabel
    )

    const panelTenants = tenants.filter((tenant) => tenant.showInPanel === true)
    const overflowTenants = tenants.filter(
        (tenant) => tenant.showInPanel !== true
    )

    const isSelectedInOverflow = overflowTenants.some(
        (tenant) => tenant.label === selectedLabel
    )

    const visibleTenants =
        isSelectedInOverflow && selectedTenant
            ? [selectedTenant, ...panelTenants]
            : [...panelTenants]

    const hiddenTenants = overflowTenants.filter(
        (tenant) => tenant.label !== selectedLabel
    )

    const hasMoreTenants = hiddenTenants.length > 0

    return {
        visibleTenants,
        hiddenTenants,
        hasMoreTenants,
    }
}

// Helper functions for sidebar styling and behavior
export const getSidebarWidth = (
    isExpanded: boolean,
    isHovering: boolean,
    hasLeftPanel: boolean,
    tokens: SidebarTokenType,
    iconOnlyMode = false
): string => {
    if (iconOnlyMode) {
        return String(tokens.maxWidth.iconOnly)
    }
    if (isExpanded || isHovering) {
        return hasLeftPanel
            ? String(tokens.maxWidth.withLeftPanel)
            : String(tokens.maxWidth.withoutLeftPanel)
    }
    return String(FOUNDATION_THEME.unit[4])
}

export const getSidebarBorder = (
    isExpanded: boolean,
    isHovering: boolean,
    tokens: SidebarTokenType
): string => {
    return isExpanded || isHovering ? String(tokens.borderRight) : 'none'
}

export const getTopbarStyles = (
    enableAutoHide: boolean,
    showTopbar: boolean
) => {
    if (!enableAutoHide) return {}

    return {
        transform: showTopbar ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
    }
}

export const getDefaultMerchantInfo = () => ({
    items: [
        {
            label: 'juspay',
            value: 'juspay',
            icon: null,
        },
    ],
    selected: 'juspay',
    onSelect: (value: string) => {
        console.log('Selected merchant:', value)
    },
})

// Custom hook for topbar auto-hide functionality
export const useTopbarAutoHide = (enableTopbarAutoHide: boolean) => {
    const [showTopbar, setShowTopbar] = useState(true)
    const lastScrollYRef = useRef(0)

    useEffect(() => {
        if (!enableTopbarAutoHide) {
            setShowTopbar(true)
            return
        }

        const mainContentContainer = document.querySelector(
            '[data-main-content]'
        )
        if (!mainContentContainer) return

        const handleScroll = () => {
            const currentScrollY = mainContentContainer.scrollTop

            if (
                currentScrollY > lastScrollYRef.current &&
                currentScrollY > 100
            ) {
                setShowTopbar(false)
            } else if (currentScrollY < lastScrollYRef.current) {
                setShowTopbar(true)
            }

            lastScrollYRef.current = currentScrollY
        }

        mainContentContainer.addEventListener('scroll', handleScroll)
        return () =>
            mainContentContainer.removeEventListener('scroll', handleScroll)
    }, [enableTopbarAutoHide])

    return showTopbar
}

export const isControlledSidebar = (
    isExpanded: boolean | undefined
): boolean => {
    return isExpanded !== undefined
}

export const getMobileNavigationItems = (
    directory: DirectoryData[]
): MobileNavigationItem[] => {
    return directory.flatMap((section) => {
        if (!section.items?.length) return []

        return section.items
            .filter((item) => item.showOnMobile)
            .map((item) => ({
                ...item,
                sectionLabel: section.label,
            }))
    })
}

const MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT = 5

/**
 * Parse CSS unit values to numbers (e.g., "16px" -> 16)
 * Returns 0 for invalid values
 */
export const parseUnitValue = (value: string | number | undefined): number => {
    if (typeof value === 'number') {
        return value
    }
    if (!value) {
        return 0
    }

    const numericValue = Number.parseFloat(String(value))
    return Number.isNaN(numericValue) ? 0 : numericValue
}

/**
 * Parse CSS values to numbers, allowing null for invalid values
 * Returns null for invalid values (more flexible than parseUnitValue)
 */
export const parseCssValue = (
    value: string | number | null | undefined
): number | null => {
    if (typeof value === 'number') {
        return value
    }

    if (value == null) {
        return null
    }

    const parsed = Number.parseFloat(String(value))
    return Number.isNaN(parsed) ? null : parsed
}

const MOBILE_PRIMARY_ROW_VERTICAL_PADDING = {
    top: parseUnitValue(FOUNDATION_THEME.unit[16]),
    bottom: parseUnitValue(FOUNDATION_THEME.unit[16]),
}

const MOBILE_SECONDARY_ROW_VERTICAL_PADDING = {
    top: parseUnitValue(FOUNDATION_THEME.unit[12]),
    bottom: parseUnitValue(FOUNDATION_THEME.unit[12]),
}

const MOBILE_SECONDARY_LAST_ROW_EXTRA_BOTTOM_PADDING = parseUnitValue(
    FOUNDATION_THEME.unit[28]
)
const MOBILE_NAVIGATION_ITEM_HEIGHT = parseUnitValue(FOUNDATION_THEME.unit[48])
const MOBILE_NAVIGATION_ROW_GAP = parseUnitValue(FOUNDATION_THEME.unit[12])
const MOBILE_NAVIGATION_CONTAINER_BORDER = parseUnitValue(
    FOUNDATION_THEME.unit[1]
)
const MOBILE_NAVIGATION_SAFE_AREA_OFFSET = parseUnitValue(
    FOUNDATION_THEME.unit[8]
)

const getCollapsedPrimaryHeight = () =>
    MOBILE_PRIMARY_ROW_VERTICAL_PADDING.top +
    MOBILE_NAVIGATION_ITEM_HEIGHT +
    MOBILE_PRIMARY_ROW_VERTICAL_PADDING.bottom +
    MOBILE_NAVIGATION_CONTAINER_BORDER

export const MOBILE_NAVIGATION_COLLAPSED_HEIGHT = `${getCollapsedPrimaryHeight()}px`
export const MOBILE_NAVIGATION_SAFE_AREA = `${MOBILE_NAVIGATION_SAFE_AREA_OFFSET}px`

const calculateMobileNavigationSnapPoints = (
    secondaryRowCount: number,
    viewportHeight?: number
): Array<string | number> => {
    const primaryRowHeight =
        MOBILE_PRIMARY_ROW_VERTICAL_PADDING.top +
        MOBILE_NAVIGATION_ITEM_HEIGHT +
        MOBILE_PRIMARY_ROW_VERTICAL_PADDING.bottom
    const primaryHeight = primaryRowHeight + MOBILE_NAVIGATION_CONTAINER_BORDER

    if (secondaryRowCount === 0) {
        return [`${primaryHeight}px`]
    }

    const secondaryRowHeight =
        MOBILE_SECONDARY_ROW_VERTICAL_PADDING.top +
        MOBILE_NAVIGATION_ITEM_HEIGHT +
        MOBILE_SECONDARY_ROW_VERTICAL_PADDING.bottom

    const totalSecondaryHeight =
        secondaryRowCount * secondaryRowHeight +
        Math.max(secondaryRowCount - 1, 0) * MOBILE_NAVIGATION_ROW_GAP +
        MOBILE_SECONDARY_LAST_ROW_EXTRA_BOTTOM_PADDING +
        MOBILE_NAVIGATION_ROW_GAP

    const totalExpandedHeight = primaryHeight + totalSecondaryHeight

    if (!viewportHeight) {
        return [`${primaryHeight}px`, `${totalExpandedHeight}px`]
    }

    const viewportLimit = viewportHeight * 0.85
    const maxHeight = Math.min(totalExpandedHeight, viewportLimit)

    return [`${primaryHeight}px`, `${maxHeight}px`]
}

export const getMobileNavigationLayout = (
    items: MobileNavigationItem[],
    viewportHeight?: number,
    options?: {
        primaryReservedSlots?: number
    }
) => {
    const reservedSlots = Math.max(0, options?.primaryReservedSlots ?? 0)
    const hasOverflow = items.length > MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT
    const primaryCapacity = hasOverflow
        ? Math.max(0, MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT - 1)
        : MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT
    const effectivePrimaryCapacity = Math.max(
        0,
        primaryCapacity - reservedSlots
    )

    const primaryItems = items.slice(0, effectivePrimaryCapacity)
    const secondaryItems = items.slice(effectivePrimaryCapacity)
    const hasSecondaryItems = secondaryItems.length > 0
    const secondaryRowCount = hasSecondaryItems
        ? Math.ceil(
              secondaryItems.length / MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT
          )
        : 0
    const snapPoints = calculateMobileNavigationSnapPoints(
        secondaryRowCount,
        viewportHeight
    )

    return {
        primaryItems,
        secondaryItems,
        hasSecondaryItems,
        snapPoints,
    }
}

export const getMobileNavigationSecondaryRows = (
    secondaryItems: MobileNavigationItem[]
): MobileNavigationItem[][] => {
    if (!secondaryItems.length) {
        return []
    }

    const rows: MobileNavigationItem[][] = []

    for (
        let index = 0;
        index < secondaryItems.length;
        index += MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT
    ) {
        rows.push(
            secondaryItems.slice(
                index,
                index + MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT
            )
        )
    }

    return rows
}

export const getMobileNavigationFillerCount = (itemsInRow: number): number => {
    return Math.max(
        0,
        MOBILE_NAVIGATION_PRIMARY_VISIBLE_LIMIT - Math.max(itemsInRow, 0)
    )
}

export const getMobileNavigationRowPadding = ({
    isSecondary,
    isLastRow,
}: {
    isSecondary: boolean
    isLastRow: boolean
}) => {
    if (!isSecondary) {
        return {
            paddingTop: FOUNDATION_THEME.unit[16],
            paddingRight: FOUNDATION_THEME.unit[24],
            paddingBottom: FOUNDATION_THEME.unit[16],
            paddingLeft: FOUNDATION_THEME.unit[24],
        }
    }

    return {
        paddingTop: FOUNDATION_THEME.unit[12],
        paddingRight: FOUNDATION_THEME.unit[24],
        paddingBottom: isLastRow
            ? FOUNDATION_THEME.unit[28]
            : FOUNDATION_THEME.unit[12],
        paddingLeft: FOUNDATION_THEME.unit[24],
    }
}

export const MOBILE_NAVIGATION_BUTTON_DIMENSIONS = {
    width: FOUNDATION_THEME.unit[56],
    height: FOUNDATION_THEME.unit[48],
}

export const MOBILE_NAVIGATION_GAP = FOUNDATION_THEME.unit[8]
