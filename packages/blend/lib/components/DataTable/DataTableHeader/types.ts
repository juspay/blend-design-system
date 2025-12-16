import { ColumnDefinition, SearchConfig, AdvancedFilterProps } from '../types'
import { TooltipSide, TooltipAlign, TooltipSize } from '../../Tooltip/types'

export type DataTableHeaderProps<T extends Record<string, unknown>> = {
    title?: string
    description?: string
    showHeader?: boolean
    showToolbar?: boolean
    enableSearch?: boolean
    searchPlaceholder?: string
    searchConfig: SearchConfig
    enableAdvancedFilter?: boolean
    advancedFilterComponent?: React.ComponentType<AdvancedFilterProps>
    advancedFilters?: unknown[]
    visibleColumns: ColumnDefinition<T>[]
    data: T[]
    onSearch: (query: string) => void
    onAdvancedFiltersChange?: (filters: unknown[]) => void
    onClearAllFilters: () => void
    headerSlot1?: React.ReactNode
    headerSlot2?: React.ReactNode
    headerSlot3?: React.ReactNode
    descriptionTooltipProps?: {
        side?: TooltipSide
        align?: TooltipAlign
        size?: TooltipSize
        showArrow?: boolean
        delayDuration?: number
        offset?: number
    }
}
