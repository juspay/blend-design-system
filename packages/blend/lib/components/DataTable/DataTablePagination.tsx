import { useMemo, useRef, useEffect } from 'react'
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
import {
    PaginationConfig,
    CursorDirection,
    DataTableOnPageChange,
    DataTablePaginationConfig,
    DataTablePaginationMode,
    CursorPaginationConfig,
    isCursorPaginationConfig,
} from './types'

type DataTablePaginationProps = {
    pagination: DataTablePaginationConfig
    onPageChange: DataTableOnPageChange
    onPageSizeChange?: (pageSize: number) => void
    paginationMode?: DataTablePaginationMode
    isLoading?: boolean
    hasData?: boolean
    isNarrowContainer?: boolean
}

export function DataTablePagination({
    pagination,
    onPageChange,
    onPageSizeChange,
    paginationMode = 'page',
    isLoading = false,
    hasData = true,
    isNarrowContainer = false,
}: DataTablePaginationProps) {
    const tableToken = useResponsiveTokens('TABLE') as TableTokenType
    const { breakPointLabel } = useBreakpoints()
    const isMobile = isNarrowContainer || breakPointLabel === 'sm'
    const PAGINATION_ITEM_HEIGHT = 33
    const paginationRef = useRef<HTMLDivElement>(null)

    const isCursorMode =
        paginationMode === 'cursor' && isCursorPaginationConfig(pagination)
    const cursorPagination: CursorPaginationConfig | null = isCursorMode
        ? pagination
        : null

    const {
        currentPage,
        pageSize,
        totalRows,
        pageSizeOptions = [10, 20, 50, 100],
    } = useMemo(() => {
        if (cursorPagination) {
            return {
                currentPage: cursorPagination.currentPage ?? 1,
                pageSize:
                    cursorPagination.pageSize ?? cursorPagination.limit ?? 10,
                totalRows: cursorPagination.totalRows ?? 0,
                pageSizeOptions: cursorPagination.limitOptions ?? [
                    10, 20, 50, 100,
                ],
            }
        }
        const config = pagination as PaginationConfig
        return {
            currentPage: config.currentPage,
            pageSize: config.pageSize,
            totalRows: config.totalRows,
            pageSizeOptions: config.pageSizeOptions ?? [10, 20, 50, 100],
        }
    }, [pagination, cursorPagination])

    const totalPages = Math.ceil(totalRows / pageSize)
    const hasNextPage =
        cursorPagination?.hasNextPage ?? currentPage < totalPages
    const hasPrevPage = cursorPagination?.hasPrevPage ?? currentPage > 1
    const limit = cursorPagination?.limit ?? pageSize
    const getCursorPayloadForDirection = (
        direction: CursorDirection
    ): unknown => {
        if (!cursorPagination) return undefined

        if (cursorPagination.cursorParams) {
            return cursorPagination.cursorParams
        }

        if (direction === CursorDirection.NEXT) {
            return cursorPagination.nextCursor ?? cursorPagination.cursor
        }

        return cursorPagination.prevCursor ?? cursorPagination.cursor
    }

    const canNavigate = () => hasData && !isLoading

    const triggerPageChange = (page: number) => {
        ;(onPageChange as (page: number) => void)(page)
    }

    const triggerCursorNavigation = (
        direction: CursorDirection,
        cursorPayload: unknown
    ) => {
        ;(
            onPageChange as (
                direction: CursorDirection,
                cursorPayload?: unknown,
                limit?: number
            ) => void
        )(direction, cursorPayload, limit)
    }

    const handlePrevious = () => {
        if (!canNavigate() || !hasPrevPage) return

        if (isCursorMode && cursorPagination) {
            triggerCursorNavigation(
                CursorDirection.PREV,
                getCursorPayloadForDirection(CursorDirection.PREV)
            )
        } else {
            if (currentPage > 1) {
                triggerPageChange(currentPage - 1)
            }
        }
    }

    const handleNext = () => {
        if (!canNavigate() || !hasNextPage) return

        if (isCursorMode && cursorPagination) {
            triggerCursorNavigation(
                CursorDirection.NEXT,
                getCursorPayloadForDirection(CursorDirection.NEXT)
            )
        } else {
            if (currentPage < totalPages) {
                triggerPageChange(currentPage + 1)
            }
        }
    }

    const handlePageClick = (page: number) => {
        if (
            !canNavigate() ||
            page < 1 ||
            page > totalPages ||
            page === currentPage
        )
            return
        triggerPageChange(page)
    }

    const handleLimitChange = (newLimit: number) => {
        if (!onPageSizeChange || !hasData || isLoading || newLimit === limit)
            return
        onPageSizeChange(newLimit)
    }

    const filteredPageSizeOptions = useMemo(() => {
        const options = isCursorMode
            ? pageSizeOptions
            : pageSizeOptions.filter((size) => size <= totalRows)

        if (!options.includes(pageSize) && pageSize > 0) {
            options.push(pageSize)
            options.sort((a, b) => a - b)
        }
        if (options.length === 0 && pageSizeOptions.length > 0) {
            options.push(Math.min(...pageSizeOptions))
        }
        return options
    }, [pageSizeOptions, totalRows, pageSize, isCursorMode])

    const limitMenuItems = useMemo(
        () => [
            {
                groupLabel: '',
                showSeparator: false,
                items: filteredPageSizeOptions.map((size) => ({
                    label: `${size}`,
                    value: String(size),
                    onClick: () => handleLimitChange(size),
                })),
            },
        ],
        [filteredPageSizeOptions]
    )

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = []
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

    useEffect(() => {
        const handleKeyboardNavigation = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement

            if (
                !paginationRef.current?.contains(target) ||
                target.closest('[role="combobox"]') ||
                target.tagName === 'INPUT' ||
                event.key === 'Tab'
            ) {
                return
            }

            if (!canNavigate()) return

            if (isCursorMode) {
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault()
                        if (hasPrevPage) handlePrevious()
                        break
                    case 'ArrowRight':
                        event.preventDefault()
                        if (hasNextPage) handleNext()
                        break
                }
            } else {
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault()
                        if (currentPage > 1) handlePrevious()
                        break
                    case 'ArrowRight':
                        event.preventDefault()
                        if (currentPage < totalPages) handleNext()
                        break
                    case 'Home':
                        if (event.ctrlKey || event.metaKey) {
                            event.preventDefault()
                            if (currentPage !== 1) handlePageClick(1)
                        }
                        break
                    case 'End':
                        if (event.ctrlKey || event.metaKey) {
                            event.preventDefault()
                            if (currentPage !== totalPages)
                                handlePageClick(totalPages)
                        }
                        break
                }
            }
        }

        document.addEventListener('keydown', handleKeyboardNavigation)
        return () =>
            document.removeEventListener('keydown', handleKeyboardNavigation)
    }, [
        currentPage,
        totalPages,
        hasData,
        isLoading,
        isCursorMode,
        hasNextPage,
        hasPrevPage,
        limit,
        cursorPagination,
    ])

    const PreviousButton = () => (
        <PrimitiveButton
            data-element="previous-page"
            data-status={!hasPrevPage || !hasData ? 'disabled' : 'enabled'}
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
                !hasPrevPage || !hasData
                    ? FOUNDATION_THEME.colors.gray[300]
                    : FOUNDATION_THEME.colors.gray[600]
            }
            disabled={!hasPrevPage || isLoading || !hasData}
            onClick={handlePrevious}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handlePrevious()
                }
            }}
            aria-label={
                isCursorMode
                    ? 'Load previous results'
                    : `Previous page${currentPage > 1 ? ` (currently page ${currentPage})` : ''}`
            }
            tabIndex={!hasPrevPage || isLoading || !hasData ? -1 : 0}
            _hover={{
                backgroundColor:
                    !hasPrevPage || !hasData
                        ? 'transparent'
                        : FOUNDATION_THEME.colors.gray[50],
            }}
            style={{
                cursor:
                    !hasPrevPage || isLoading || !hasData
                        ? 'not-allowed'
                        : 'pointer',
            }}
        >
            <ArrowLeft size={FOUNDATION_THEME.unit[16]} />
        </PrimitiveButton>
    )

    const NextButton = () => (
        <PrimitiveButton
            data-element="next-page"
            data-status={!hasNextPage || !hasData ? 'disabled' : 'enabled'}
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
                !hasNextPage || !hasData
                    ? FOUNDATION_THEME.colors.gray[300]
                    : FOUNDATION_THEME.colors.gray[600]
            }
            disabled={!hasNextPage || isLoading || !hasData}
            onClick={handleNext}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleNext()
                }
            }}
            aria-label={
                isCursorMode
                    ? 'Load next results'
                    : `Next page${currentPage < totalPages ? ` (currently page ${currentPage} of ${totalPages})` : ''}`
            }
            tabIndex={!hasNextPage || isLoading || !hasData ? -1 : 0}
            _hover={{
                backgroundColor:
                    !hasNextPage || !hasData
                        ? 'transparent'
                        : FOUNDATION_THEME.colors.gray[50],
            }}
            style={{
                cursor:
                    !hasNextPage || isLoading || !hasData
                        ? 'not-allowed'
                        : 'pointer',
            }}
        >
            <ArrowRight size={FOUNDATION_THEME.unit[16]} />
        </PrimitiveButton>
    )

    const LimitSelector = () => (
        <Block
            data-element={isCursorMode ? 'limit-selector' : 'pagesize'}
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
                    tableToken.dataTable.table.footer.pagination.pageText.color
                }
                style={{
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                }}
            >
                {isMobile ? 'Rows' : 'Rows per page'}
            </PrimitiveText>

            <Block
                style={{
                    cursor: hasData && !isLoading ? 'pointer' : 'not-allowed',
                }}
            >
                <SingleSelect
                    label="Rows per page"
                    aria-label="Select number of rows per page"
                    items={limitMenuItems}
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
                                handleLimitChange(newSize)
                            }
                        }
                    }}
                    enableSearch={false}
                    size={SelectMenuSize.SMALL}
                    variant={SelectMenuVariant.NO_CONTAINER}
                    placeholder=""
                    minMenuWidth={80}
                    disabled={!hasData || isLoading}
                />
            </Block>
        </Block>
    )

    if (isCursorMode) {
        return (
            <Block
                ref={paginationRef}
                data-table-pagination="true"
                data-cursor-pagination="true"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                role="navigation"
                aria-label="Pagination"
            >
                <LimitSelector />

                <Block
                    data-element="pagination"
                    display="flex"
                    alignItems="center"
                    gap={
                        tableToken.dataTable.table.footer.pagination
                            .pageNavigation.gap
                    }
                    style={{
                        opacity: hasData ? 1 : 0.5,
                        pointerEvents: hasData ? 'auto' : 'none',
                    }}
                >
                    <PreviousButton />
                    <NextButton />
                </Block>
            </Block>
        )
    }

    return (
        <Block
            ref={paginationRef}
            data-table-pagination="true"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            role="navigation"
            aria-label="Pagination"
        >
            <LimitSelector />

            <Block
                data-element="pagination"
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
                <PreviousButton />

                {!isMobile && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[4]}
                    >
                        {pageNumbers.map((page, index) =>
                            typeof page === 'number' ? (
                                <PrimitiveButton
                                    data-element="page-number"
                                    data-status={
                                        currentPage === page
                                            ? 'selected'
                                            : 'not selected'
                                    }
                                    data-numeric={page}
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
                                    aria-label={`Go to page ${page}${currentPage === page ? ' (current page)' : ''}`}
                                    aria-current={
                                        currentPage === page
                                            ? 'page'
                                            : undefined
                                    }
                                    onClick={() => handlePageClick(page)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                        ) {
                                            e.preventDefault()
                                            handlePageClick(page)
                                        }
                                    }}
                                    tabIndex={
                                        isLoading ||
                                        !hasData ||
                                        page > totalPages
                                            ? -1
                                            : currentPage === page
                                              ? 0
                                              : -1
                                    }
                                    role="button"
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
                                    aria-label="Jump to page"
                                    items={[
                                        {
                                            groupLabel: 'Go to page',
                                            showSeparator: false,
                                            items: (() => {
                                                const visiblePages =
                                                    pageNumbers.filter(
                                                        (p): p is number =>
                                                            typeof p ===
                                                            'number'
                                                    )

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
                                            handlePageClick(Number(value))
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
                                    virtualListItemHeight={
                                        PAGINATION_ITEM_HEIGHT
                                    }
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
                                            aria-label={`Jump to page (currently showing page ${currentPage} of ${totalPages})`}
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

                <NextButton />
            </Block>
        </Block>
    )
}
