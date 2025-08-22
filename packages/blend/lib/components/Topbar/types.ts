import type { ReactNode } from 'react'

export type TopbarProps = {
    children?: ReactNode

    className?: string

    style?: React.CSSProperties

    isExpanded?: boolean

    onToggleExpansion?: () => void

    showToggleButton?: boolean

    sidebarTopSlot?: ReactNode

    topbar?: ReactNode

    title?: string

    leftAction?: ReactNode

    rightActions?: ReactNode

    showBackButton?: boolean

    onBackClick?: () => void
}
