import {
    DataTableOnPageChange,
    DataTablePaginationConfig,
    DataTablePaginationMode,
} from '../types'

export type TableFooterProps = {
    pagination?: DataTablePaginationConfig
    isLoading?: boolean
    showSkeleton?: boolean
    hasData?: boolean
    isNarrowContainer?: boolean
    onPageChange: DataTableOnPageChange
    onPageSizeChange: (size: number) => void
    /** Effective UI mode after resolving `pagination` shape (see DataTable). */
    paginationMode?: DataTablePaginationMode
}
