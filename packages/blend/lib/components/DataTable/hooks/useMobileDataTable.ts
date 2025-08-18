import { useBreakpoints } from '../../../hooks/useBreakPoints'

export interface MobileDataTableConfig {
    isMobile: boolean
    disableColumnFreeze: boolean
    enableHorizontalScroll: boolean
    compactLayout: boolean
    hideColumnManager: boolean
    simplifiedFilters: boolean
    maxVisibleColumns: number
    enableColumnOverflow: boolean
}

export const useMobileDataTable = (
    mobileColumnsToShow?: number
): MobileDataTableConfig => {
    const { breakPointLabel } = useBreakpoints()
    const isMobile = breakPointLabel === 'sm'

    // If mobileColumnsToShow is undefined or 0, show all columns (no overflow)
    // If mobileColumnsToShow is a positive number, enable overflow for columns beyond that limit
    const shouldEnableOverflow =
        mobileColumnsToShow !== undefined && mobileColumnsToShow > 0

    return {
        isMobile,
        disableColumnFreeze: isMobile, // Disable column freezing on mobile
        enableHorizontalScroll: isMobile, // Enable horizontal scroll on mobile
        compactLayout: isMobile, // Use compact layout on mobile
        hideColumnManager: false,
        simplifiedFilters: isMobile, // Use simplified filters on mobile
        maxVisibleColumns: shouldEnableOverflow ? mobileColumnsToShow : 999,
        enableColumnOverflow: shouldEnableOverflow,
    }
}
