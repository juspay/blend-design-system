import { forwardRef } from 'react'
import { TableFooterProps } from './types'
import { DataTablePagination } from '../DataTablePagination'
import Block from '../../Primitives/Block/Block'
import { TableTokenType } from '../dataTable.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'

const TableFooter = forwardRef<HTMLDivElement, TableFooterProps>(
    (
        {
            pagination,
            currentPage,
            pageSize,
            totalRows,
            isLoading,
            showSkeleton,
            onPageChange,
            onPageSizeChange,
            hasData = true,
            isNarrowContainer = false,
        },
        ref
    ) => {
        const tableToken = useResponsiveTokens('TABLE') as TableTokenType

        if (!pagination || !hasData) {
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
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalRows={totalRows}
                    pageSizeOptions={
                        pagination.pageSizeOptions || [10, 20, 50, 100]
                    }
                    isLoading={isLoading || showSkeleton}
                    hasData={hasData}
                    isNarrowContainer={isNarrowContainer}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                />
            </Block>
        )
    }
)

TableFooter.displayName = 'TableFooter'

export default TableFooter
