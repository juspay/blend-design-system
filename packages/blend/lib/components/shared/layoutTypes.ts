import { type ReactNode } from 'react'

/**
 * Layout-level types shared between the Sidebar and Topbar components.
 *
 * These live in a neutral module to avoid a circular dependency between
 * `Sidebar/types` and `Topbar/types` (see issue #1473). Both components import
 * from here, keeping the type graph a clean DAG.
 */

export type LeftPanelItem = {
    label: string
    icon: ReactNode
    value?: string
    showInPanel?: boolean
}

export type LeftPanelInfo = {
    items: LeftPanelItem[]
    selected: string
    onSelect: (value: string) => void
    tenantSlot1?: ReactNode
    tenantSlot2?: ReactNode
    tenantFooter?: ReactNode
}

export type MerchantInfo = {
    items: Array<{
        label: string
        value: string
        icon?: ReactNode
    }>
    selected: string
    onSelect: (value: string) => void
}
