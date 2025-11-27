import { useMemo } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { TableTokenType } from './dataTable.tokens'
import { SelectMenuSize, SelectMenuVariant } from '../Select/types'
import SingleSelect from '../SingleSelect/SingleSelect'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

type DataTablePaginationProps = {
    currentPage: number
    pageSize: number
    totalRows: number
    pageSizeOptions: number[]
    isLoading?: boolean
    hasData?: boolean
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
}

export function DataTablePagination({
    currentPage,
    pageSize,
    totalRows,
    pageSizeOptions,
    isLoading = false,
    hasData = true,
    onPageChange,
    onPageSizeChange,
}: DataTablePaginationProps) {
    const tableToken = useResponsiveTokens('TABLE') as TableTokenType
    const { breakPointLabel } = useBreakpoints()
    const isMobile = breakPointLabel === 'sm'

    const totalPages = Math.ceil(totalRows / pageSize)

    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            let startPage = Math.max(2, currentPage - 1)
            let endPage = Math.min(totalPages - 1, currentPage + 1)

            if (currentPage <= 3) {
                endPage = Math.min(totalPages - 1, 4)
            }

            if (currentPage >= totalPages - 2) {
                startPage = Math.max(2, totalPages - 3)
            }

            if (startPage > 2) {
                pages.push('...')
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            if (endPage < totalPages - 1) {
                pages.push('...')
            }

            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = useMemo(getPageNumbers, [currentPage, totalPages])

    const filteredPageSizeOptions = useMemo(() => {
        const filtered = pageSizeOptions.filter((size) => size <= totalRows)
        if (!filtered.includes(pageSize) && pageSize > 0) {
            filtered.push(pageSize)
            filtered.sort((a, b) => a - b)
        }
        if (filtered.length === 0 && pageSizeOptions.length > 0) {
            filtered.push(Math.min(...pageSizeOptions))
        }

        return filtered
    }, [pageSizeOptions, totalRows, pageSize])

    const pageSizeMenuItems = [
        {
            groupLabel: '',
            showSeparator: false,
            items: filteredPageSizeOptions.map((size) => ({
                label: `${size}`,
                value: String(size),
                onClick: () => onPageSizeChange(size),
            })),
        },
    ]

    return (
        <Block
            data-pagesize-pagination-wrapper="data-pagesize-pagination-wrapper"
            data-table-pagination="true"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
        >
            <Block
                data-component="page-size-selector"
                display="flex"
                alignItems="center"
                gap={FOUNDATION_THEME.unit[8]}
            >
                <PrimitiveText
                    as="span"
                    fontSize={
                        tableToken.dataTable.table.footer.pagination.pageText
                            .fontSize
                    }
                    color={
                        tableToken.dataTable.table.footer.pagination.pageText
                            .color
                    }
                    style={{
                        // minWidth: isMobile ? '40px' : '108px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                    }}
                    data-page-size-text={isMobile ? 'Rows' : 'Rows per page'}
                >
                    {isMobile ? 'Rows' : 'Rows per page'}
                </PrimitiveText>

                <Block
                    style={{
                        cursor:
                            hasData && !isLoading ? 'pointer' : 'not-allowed',
                    }}
                >
                    <SingleSelect
                        label="rows per page"
                        items={pageSizeMenuItems}
                        selected={String(pageSize)}
                        onSelect={(value) => {
                            if (
                                typeof value === 'string' &&
                                hasData &&
                                !isLoading
                            ) {
                                const newSize = Number(value)
                                if (
                                    newSize > 0 &&
                                    Number.isInteger(newSize) &&
                                    newSize !== pageSize
                                ) {
                                    onPageSizeChange(newSize)
                                }
                            }
                        }}
                        enableSearch={false}
                        size={SelectMenuSize.SMALL}
                        variant={SelectMenuVariant.NO_CONTAINER}
                        placeholder={String(pageSize)}
                        minMenuWidth={80}
                        disabled={!hasData || isLoading}
                    />
                </Block>
            </Block>

            <Block
                data-component="pagination"
                display="flex"
                alignItems="center"
                gap={
                    tableToken.dataTable.table.footer.pagination.pageNavigation
                        .gap
                }
                style={{
                    opacity: hasData ? 1 : 0.5,
                    pointerEvents: hasData ? 'auto' : 'none',
                }}
            >
                <PrimitiveButton
                    data-navigate-previous-page-button="Navigation-Previous-Page"
                    contentCentered
                    width={FOUNDATION_THEME.unit[32]}
                    height={FOUNDATION_THEME.unit[32]}
                    backgroundColor="transparent"
                    border={
                        isMobile
                            ? `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
                            : 'none'
                    }
                    borderRadius={
                        isMobile
                            ? FOUNDATION_THEME.border.radius[10]
                            : FOUNDATION_THEME.border.radius[2]
                    }
                    color={
                        currentPage === 1 || !hasData
                            ? FOUNDATION_THEME.colors.gray[300]
                            : FOUNDATION_THEME.colors.gray[600]
                    }
                    disabled={currentPage === 1 || isLoading || !hasData}
                    onClick={() => hasData && onPageChange(currentPage - 1)}
                    aria-label="Previous page"
                    _hover={{
                        backgroundColor:
                            currentPage === 1 || !hasData
                                ? 'transparent'
                                : FOUNDATION_THEME.colors.gray[50],
                    }}
                    style={{
                        cursor:
                            currentPage === 1 || isLoading || !hasData
                                ? 'not-allowed'
                                : 'pointer',
                    }}
                >
                    <ArrowLeft size={FOUNDATION_THEME.unit[16]} />
                </PrimitiveButton>

                {!isMobile && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[4]}
                    >
                        {pageNumbers.map((page, index) =>
                            typeof page === 'number' ? (
                                <PrimitiveButton
                                    data-page-number={page}
                                    data-page-selected-status={
                                        currentPage === page
                                            ? 'Selected'
                                            : 'NotSelected'
                                    }
                                    key={index}
                                    contentCentered
                                    minWidth={FOUNDATION_THEME.unit[32]}
                                    height={FOUNDATION_THEME.unit[32]}
                                    backgroundColor={
                                        currentPage === page
                                            ? FOUNDATION_THEME.colors.gray[100]
                                            : 'transparent'
                                    }
                                    color={
                                        currentPage === page
                                            ? FOUNDATION_THEME.colors.gray[700]
                                            : isLoading ||
                                                !hasData ||
                                                page > totalPages
                                              ? FOUNDATION_THEME.colors
                                                    .gray[300]
                                              : FOUNDATION_THEME.colors
                                                    .gray[600]
                                    }
                                    borderRadius={
                                        FOUNDATION_THEME.border.radius[8]
                                    }
                                    disabled={
                                        isLoading ||
                                        !hasData ||
                                        page > totalPages
                                    }
                                    onClick={() =>
                                        hasData &&
                                        page <= totalPages &&
                                        page !== currentPage &&
                                        onPageChange(page)
                                    }
                                    _hover={{
                                        backgroundColor:
                                            currentPage === page ||
                                            isLoading ||
                                            !hasData ||
                                            page > totalPages
                                                ? currentPage === page
                                                    ? FOUNDATION_THEME.colors
                                                          .gray[100]
                                                    : 'transparent'
                                                : FOUNDATION_THEME.colors
                                                      .gray[50],
                                    }}
                                    style={{
                                        fontSize:
                                            FOUNDATION_THEME.font.size.body.sm
                                                .fontSize,
                                        cursor:
                                            isLoading ||
                                            !hasData ||
                                            page > totalPages
                                                ? 'not-allowed'
                                                : 'pointer',
                                    }}
                                >
                                    {page}
                                </PrimitiveButton>
                            ) : (
                                <SingleSelect
                                    key={index}
                                    label="Jump to page"
                                    items={[
                                        {
                                            groupLabel: 'Go to page',
                                            showSeparator: false,
                                            items: (() => {
                                                const visiblePages =
                                                    pageNumbers.filter(
                                                        (p) =>
                                                            typeof p ===
                                                            'number'
                                                    ) as number[]

                                                const hiddenPages = []
                                                for (
                                                    let i = 1;
                                                    i <= totalPages;
                                                    i++
                                                ) {
                                                    if (
                                                        !visiblePages.includes(
                                                            i
                                                        )
                                                    ) {
                                                        hiddenPages.push({
                                                            label: `Page ${i}`,
                                                            value: String(i),
                                                        })
                                                    }
                                                }
                                                return hiddenPages
                                            })(),
                                        },
                                    ]}
                                    selected=""
                                    onSelect={(value) => {
                                        if (
                                            typeof value === 'string' &&
                                            hasData
                                        ) {
                                            onPageChange(Number(value))
                                        }
                                    }}
                                    enableSearch={totalPages > 10}
                                    searchPlaceholder="Search pages..."
                                    size={SelectMenuSize.SMALL}
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    placeholder="..."
                                    minMenuWidth={120}
                                    maxMenuHeight={300}
                                    disabled={isLoading || !hasData}
                                    enableVirtualization={totalPages > 50}
                                    virtualListItemHeight={40}
                                    virtualListOverscan={5}
                                    customTrigger={
                                        <PrimitiveButton
                                            contentCentered
                                            minWidth={FOUNDATION_THEME.unit[32]}
                                            height={FOUNDATION_THEME.unit[32]}
                                            backgroundColor="transparent"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            borderRadius={
                                                FOUNDATION_THEME.border
                                                    .radius[8]
                                            }
                                            disabled={isLoading || !hasData}
                                            _hover={{
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[50],
                                            }}
                                            style={{
                                                fontSize:
                                                    FOUNDATION_THEME.font.size
                                                        .body.sm.fontSize,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            ...
                                        </PrimitiveButton>
                                    }
                                />
                            )
                        )}
                    </Block>
                )}

                <PrimitiveButton
                    data-navigate-next-page-button="Navigation Next Page"
                    contentCentered
                    width={FOUNDATION_THEME.unit[32]}
                    height={FOUNDATION_THEME.unit[32]}
                    backgroundColor="transparent"
                    border={
                        isMobile
                            ? `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
                            : 'none'
                    }
                    borderRadius={
                        isMobile
                            ? FOUNDATION_THEME.border.radius[10]
                            : FOUNDATION_THEME.border.radius[2]
                    }
                    color={
                        currentPage === totalPages || !hasData
                            ? FOUNDATION_THEME.colors.gray[300]
                            : FOUNDATION_THEME.colors.gray[600]
                    }
                    disabled={
                        currentPage === totalPages || isLoading || !hasData
                    }
                    onClick={() => hasData && onPageChange(currentPage + 1)}
                    aria-label="Next page"
                    _hover={{
                        backgroundColor:
                            currentPage === totalPages || !hasData
                                ? 'transparent'
                                : FOUNDATION_THEME.colors.gray[50],
                    }}
                    style={{
                        cursor:
                            currentPage === totalPages || isLoading || !hasData
                                ? 'not-allowed'
                                : 'pointer',
                    }}
                >
                    <ArrowRight size={FOUNDATION_THEME.unit[16]} />
                </PrimitiveButton>
            </Block>
        </Block>
    )
}
