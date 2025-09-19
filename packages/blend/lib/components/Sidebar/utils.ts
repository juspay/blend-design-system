import type { TenantItem } from './types'

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
