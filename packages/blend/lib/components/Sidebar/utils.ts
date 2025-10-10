import { useState, useEffect } from 'react'
import type { TenantItem } from './types'
import type { SidebarTokenType } from './sidebar.tokens'

export const arrangeTenants = (
    tenants: TenantItem[],
    selectedLabel: string,
    maxVisible: number
): {
    visibleTenants: TenantItem[]
    hiddenTenants: TenantItem[]
    hasMoreTenants: boolean
} => {
    const selectedIndex = tenants.findIndex(
        (tenant) => tenant.label === selectedLabel
    )
    const selectedTenant = tenants.find(
        (tenant) => tenant.label === selectedLabel
    )

    let arrangedTenants = [...tenants]

    if (selectedIndex >= maxVisible && selectedTenant) {
        arrangedTenants = arrangedTenants.filter(
            (tenant) => tenant.label !== selectedLabel
        )
        const insertPosition = Math.max(0, maxVisible - 1)
        arrangedTenants.splice(insertPosition, 0, selectedTenant)
    }

    const visibleTenants = arrangedTenants.slice(0, maxVisible)
    const hiddenTenants = arrangedTenants.slice(maxVisible)
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
    tokens: SidebarTokenType
): string => {
    if (isExpanded || isHovering) {
        return hasLeftPanel
            ? String(tokens.maxWidth.withLeftPanel)
            : String(tokens.maxWidth.withoutLeftPanel)
    }
    return hasLeftPanel
        ? String(tokens.maxWidth.withLeftPanel)
        : String(tokens.maxWidth.withoutLeftPanel)
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
    const [lastScrollY, setLastScrollY] = useState(0)

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

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowTopbar(false)
            } else if (currentScrollY < lastScrollY) {
                setShowTopbar(true)
            }

            setLastScrollY(currentScrollY)
        }

        mainContentContainer.addEventListener('scroll', handleScroll)
        return () =>
            mainContentContainer.removeEventListener('scroll', handleScroll)
    }, [enableTopbarAutoHide, lastScrollY])

    return showTopbar
}
