import { forwardRef } from 'react'
import { TableFooterProps } from './types'
import { DataTablePagination } from '../DataTablePagination'
import { isCursorPaginationConfig } from '../types'
import Block from '../../Primitives/Block/Block'
import { TableTokenType } from '../dataTable.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'

const TableFooter = forwardRef<HTMLDivElement, TableFooterProps>(
    (
        {
            pagination,
            isLoading,
            showSkeleton,
            onPageChange,
            onPageSizeChange,
            hasData = true,
            isNarrowContainer = false,
            paginationMode = 'page',
        },
        ref
    ) => {
        const tableToken = useResponsiveTokens('TABLE') as TableTokenType

        if (!pagination) {
            return null
        }

        const cursorPagination =
            paginationMode === 'cursor' && isCursorPaginationConfig(pagination)
                ? pagination
                : null

        // For cursor-based pagination, show footer if we can navigate back even without data
        const canNavigateBack = cursorPagination?.hasPrevPage ?? false

        if (!hasData && !canNavigateBack) {
            return null
        }

        return (
            <Block
                ref={ref}
                style={{
                    ...tableToken.dataTable.table.footer,
                    borderBottomLeftRadius: tableToken.dataTable.borderRadius,
                    borderBottomRightRadius: tableToken.dataTable.borderRadius,
                    position: 'relative',
                    zIndex: 11,
                }}
            >
                <DataTablePagination
                    pagination={pagination}
                    isLoading={isLoading || showSkeleton}
                    hasData={hasData}
                    isNarrowContainer={isNarrowContainer}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    paginationMode={paginationMode}
                />
            </Block>
        )
    }
)

TableFooter.displayName = 'TableFooter'

export default TableFooter
