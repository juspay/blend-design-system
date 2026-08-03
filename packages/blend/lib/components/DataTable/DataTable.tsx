import React, {
    useState,
    useEffect,
    useMemo,
    forwardRef,
    useRef,
    useId,
    useCallback,
} from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import {
    DataTableProps,
    SortDirection,
    SortConfig,
    ColumnDefinition,
    SearchConfig,
    ColumnFilter,
    FilterType,
    ColumnType,
    RowActionsConfig,
    DataTableExportFormat,
} from './types'
import { TableTokenType } from './dataTable.tokens'
import {
    sortData,
    searchData,
    applyColumnFilters,
    updateColumnFilter,
    exportSelectedRowsToCSV,
    getSelectedRowCount,
    createSearchConfig,
    clearAllFiltersAndSearch,
    getColumnStyles,
    haveSameFilterOptions,
    getDataTableBodyState,
    downloadDataTableExport,
} from './utils'
import DataTableHeader from './DataTableHeader'
import TableHeader from './TableHeader'
import TableBodyComponent from './TableBody'
import TableFooter from './TableFooter'
import BulkActionBar from './TableBody/BulkActionBar'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/types'
import {
    Settings,
    Check,
    Loader2,
    Inbox,
    CircleAlert,
    Download,
} from 'lucide-react'
import Menu from '../Menu/Menu'
import { MenuGroupType, MenuAlignment } from '../Menu/types'

import { useMobileDataTable } from './hooks/useMobileDataTable'
import MobileColumnDrawer from './MobileColumnDrawer'
// eslint-disable-next-line import-x/no-cycle -- intentional recursion: DataTable renders PivotTableModal whose preview renders a nested DataTable
import PivotTableModal from './PivotTableModal'
import type { PivotTableConfig } from './PivotTableModal/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import styled from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'

const ScrollableContainer = styled(Block)`
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbars for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const DefaultTableState = ({
    state,
    onRetry,
}: {
    state: 'empty' | 'error'
    onRetry?: () => void
}) => {
    const isError = state === 'error'
    const StateIcon = isError ? CircleAlert : Inbox

    return (
        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={FOUNDATION_THEME.unit[12]}
        >
            <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                    width: FOUNDATION_THEME.unit[40],
                    height: FOUNDATION_THEME.unit[40],
                    borderRadius: '50%',
                    backgroundColor: isError
                        ? FOUNDATION_THEME.colors.red[50]
                        : FOUNDATION_THEME.colors.gray[100],
                    color: isError
                        ? FOUNDATION_THEME.colors.red[600]
                        : FOUNDATION_THEME.colors.gray[500],
                }}
            >
                <StateIcon
                    size={FOUNDATION_THEME.unit[20]}
                    aria-hidden="true"
                />
            </Block>
            <PrimitiveText
                style={{
                    color: FOUNDATION_THEME.colors.gray[700],
                    fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                    fontWeight: FOUNDATION_THEME.font.weight[500],
                }}
            >
                {isError ? 'Unable to load data' : 'No data'}
            </PrimitiveText>
            {isError && onRetry && (
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    onClick={onRetry}
                    text="Retry"
                />
            )}
        </Block>
    )
}

const DataTable = forwardRef(
    <T extends Record<string, unknown>>(
        {
            data,
            columns: initialColumns,
            idField,
            title,
            description,
            descriptionTooltipProps,
            defaultSort,
            enableSearch = false,
            searchPlaceholder = 'Search...',
            enableFiltering = false,
            enableAdvancedFilter = false,
            advancedFilterComponent,
            advancedFilters = [],
            columnFreeze = 0,
            columnFreezeRight = 0,
            serverSideSearch = false,
            serverSideFiltering = false,
            serverSidePagination = false,
            isLoading = false,
            error = false,
            renderErrorState,
            onRetry,
            showEmptyState = false,
            renderEmptyState,
            enableColumnManager = true,
            enableColumnReordering = false,
            onColumnReorder,
            columnManagerMaxSelections,
            columnManagerAlwaysSelected,
            columnManagerPrimaryAction,
            columnManagerSecondaryAction,
            columnManagerWidth,
            showHeader = true,
            showToolbar = true,
            showSettings = false,
            showFooter = true,
            enableInlineEdit = false,
            showActionsColumn = true,
            enableRowExpansion = false,
            enableRowSelection = false,
            rowSelectionConfig,
            showBulkActionBar = true,
            onRowSelectionChange,
            renderExpandedRow,
            isRowExpandable,
            showSkeleton = false,
            skeletonVariant = 'pulse',
            isRowLoading,
            pagination = {
                currentPage: 1,
                pageSize: 10,
                totalRows: 0,
                pageSizeOptions: [10, 20, 50, 100],
            },
            onPageChange,
            onPageSizeChange,
            onSortChange,
            onSearchChange,
            onFilterChange,
            onAdvancedFiltersChange,
            onRowSave,
            onRowCancel,
            onRowExpansionChange,
            onRowClick,
            onFieldChange,
            headerSlot1,
            headerSlot2,
            bulkActions,
            exportConfig,
            rowActions,
            onOperations,
            onInsertLeft,
            onInsertRight,
            onDeleteColumn,
            getRowStyle,
            enableRowAnimation,
            rowAnimationConfig,
            tableBodyHeight,
            mobileColumnsToShow,
            enablePivotTable = false,
            pivotTableConfig,
            dateLabel,
            ...rest
        }: DataTableProps<T>,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const tableToken = useResponsiveTokens<TableTokenType>('TABLE')
        const mobileConfig = useMobileDataTable(mobileColumnsToShow)
        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const tableContainerRef = useRef<HTMLDivElement>(null)
        const [isNarrowContainer, setIsNarrowContainer] =
            useState<boolean>(false)
        const tableId = useId()
        const tableLabelId = title ? `${tableId}-label` : undefined
        const tableDescriptionId = description
            ? `${tableId}-description`
            : undefined
        const statusRegionId = `${tableId}-status`

        const [sortConfig, setSortConfig] = useState<SortConfig | null>(
            defaultSort || null
        )
        const [visibleColumns, setVisibleColumns] = useState<
            ColumnDefinition<T>[]
        >(() => {
            const allVisibleColumns = initialColumns.filter(
                (col) => col.isVisible !== false
            )

            if (columnManagerMaxSelections && columnManagerAlwaysSelected) {
                const alwaysSelectedFields = columnManagerAlwaysSelected.map(
                    (field) => String(field)
                )
                const alwaysSelectedCols = allVisibleColumns.filter((col) =>
                    alwaysSelectedFields.includes(String(col.field))
                )
                const selectableCols = allVisibleColumns.filter(
                    (col) => !alwaysSelectedFields.includes(String(col.field))
                )

                const maxSelectableCount =
                    columnManagerMaxSelections - alwaysSelectedCols.length
                const limitedSelectableCols = selectableCols.slice(
                    0,
                    Math.max(0, maxSelectableCount)
                )

                return [...alwaysSelectedCols, ...limitedSelectableCols]
            }

            return allVisibleColumns
        })
        useEffect(() => {
            const existingVisibleKeys = new Set(
                visibleColumns.map((c) => c.field)
            )

            const updatedVisibleColumns: ColumnDefinition<T>[] = []

            visibleColumns.forEach((col) => {
                const matchingColumn = initialColumns.find(
                    (item) => item.field === col.field
                )

                if (matchingColumn) {
                    if (matchingColumn.isVisible !== false) {
                        // Take the incoming column as-is so props the consumer
                        // removed (filterType, filterOptions) revert instead of
                        // surviving from the previous state.
                        updatedVisibleColumns.push(matchingColumn)
                    }
                }
            })

            const newColumns = initialColumns.filter(
                (col) =>
                    !existingVisibleKeys.has(col.field) &&
                    col.isVisible !== false
            )

            newColumns.forEach((newCol) => {
                const initialIndex = initialColumns.findIndex(
                    (c) => c.field === newCol.field
                )
                const insertIndex = Math.min(
                    initialIndex,
                    updatedVisibleColumns.length
                )
                updatedVisibleColumns.splice(insertIndex, 0, newCol)
            })

            const hasChanges =
                visibleColumns.length !== updatedVisibleColumns.length ||
                updatedVisibleColumns.some((updatedCol, index) => {
                    const originalCol = visibleColumns[index]
                    if (!originalCol) return true
                    if (updatedCol.field !== originalCol.field) return true

                    return (
                        updatedCol.headerSubtext !==
                            originalCol.headerSubtext ||
                        updatedCol.header !== originalCol.header ||
                        updatedCol.type !== originalCol.type ||
                        updatedCol.filterType !== originalCol.filterType ||
                        !haveSameFilterOptions(
                            updatedCol.filterOptions,
                            originalCol.filterOptions
                        ) ||
                        (updatedCol.type === ColumnType.CUSTOM &&
                            updatedCol.renderCell !== originalCol.renderCell)
                    )
                })

            if (hasChanges) {
                setVisibleColumns(updatedVisibleColumns)
            }
        }, [initialColumns])

        const [previousColumnCount, setPreviousColumnCount] = useState<number>(
            () => initialColumns.filter((col) => col.isVisible !== false).length
        )
        const [currentPage, setCurrentPage] = useState<number>(
            pagination?.currentPage || 1
        )
        const [pageSize, setPageSize] = useState<number>(
            pagination?.pageSize || 10
        )

        useEffect(() => {
            if (serverSidePagination && pagination) {
                if (pagination.currentPage !== currentPage) {
                    setCurrentPage(pagination.currentPage)
                }
                if (pagination.pageSize !== pageSize) {
                    setPageSize(pagination.pageSize)
                }
            }
        }, [
            serverSidePagination,
            pagination?.currentPage,
            pagination?.pageSize,
            currentPage,
            pageSize,
        ])

        const [selectedRows, setSelectedRows] = useState<
            Record<string, boolean>
        >({})
        const [selectAll, setSelectAll] = useState<boolean | 'indeterminate'>(
            false
        )

        const [searchConfig, setSearchConfig] = useState<SearchConfig>({
            query: '',
            caseSensitive: false,
        })
        const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])

        const [editingRows, setEditingRows] = useState<Record<string, boolean>>(
            {}
        )
        const [editValues, setEditValues] = useState<Record<string, T>>({})

        const [expandedRows, setExpandedRows] = useState<
            Record<string, boolean>
        >({})

        const [isFormatEnabled, setIsFormatEnabled] = useState<boolean>(true)
        const [isPivotModalOpen, setIsPivotModalOpen] = useState<boolean>(false)

        const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false)
        const [selectedRowForDrawer, setSelectedRowForDrawer] =
            useState<T | null>(null)
        const [selectedRowIndexForDrawer, setSelectedRowIndexForDrawer] =
            useState<number>(-1)

        const [internalLoading, setInternalLoading] = useState<boolean>(false)
        const [isExporting, setIsExporting] = useState<boolean>(false)

        useEffect(() => {
            if (serverSidePagination && !isLoading && internalLoading) {
                setInternalLoading(false)
            }
        }, [serverSidePagination, isLoading, internalLoading])

        const [activeId, setActiveId] = useState<string | null>(null)
        const lastReorderedColumnsRef = useRef<ColumnDefinition<T>[] | null>(
            null
        )
        const [focusedCell, setFocusedCell] = useState<{
            rowIndex: number
            colIndex: number
        } | null>(null)
        const [measuredFrozenWidths, setMeasuredFrozenWidths] = useState<
            number[]
        >([])

        const sensors = useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor, {
                coordinateGetter: sortableKeyboardCoordinates,
            })
        )

        const handleDragStart = (event: DragEndEvent) => {
            setActiveId(event.active.id as string)
        }

        const handleDragOver = (event: DragEndEvent) => {
            const { active, over } = event

            if (over && active.id !== over.id) {
                const oldIndex = visibleColumns.findIndex(
                    (col) => String(col.field) === active.id
                )
                const newIndex = visibleColumns.findIndex(
                    (col) => String(col.field) === over.id
                )

                if (
                    oldIndex !== -1 &&
                    newIndex !== -1 &&
                    oldIndex >= columnFreeze &&
                    newIndex >= columnFreeze
                ) {
                    const reorderedColumns = arrayMove(
                        visibleColumns,
                        oldIndex,
                        newIndex
                    )
                    setVisibleColumns(reorderedColumns)
                    lastReorderedColumnsRef.current = reorderedColumns
                }
            }
        }

        const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event

            if (over && active.id !== over.id) {
                const oldIndex = visibleColumns.findIndex(
                    (col) => String(col.field) === active.id
                )
                const newIndex = visibleColumns.findIndex(
                    (col) => String(col.field) === over.id
                )

                if (
                    oldIndex !== -1 &&
                    newIndex !== -1 &&
                    oldIndex >= columnFreeze &&
                    newIndex >= columnFreeze
                ) {
                    const reorderedColumns = arrayMove(
                        visibleColumns,
                        oldIndex,
                        newIndex
                    )
                    onColumnReorder?.(reorderedColumns as ColumnDefinition<T>[])
                }
            } else if (lastReorderedColumnsRef.current) {
                onColumnReorder?.(
                    lastReorderedColumnsRef.current as ColumnDefinition<T>[]
                )
            }

            lastReorderedColumnsRef.current = null
            setActiveId(null)
        }

        const handleDragCancel = () => {
            setActiveId(null)
        }

        const columnIds = visibleColumns
            .filter((_, index) => index >= columnFreeze)
            .map((col) => String(col.field))

        const effectiveColumnFreeze = mobileConfig.disableColumnFreeze
            ? 0
            : columnFreeze
        const effectiveEnableColumnManager = mobileConfig.hideColumnManager
            ? false
            : enableColumnManager

        const { mobileVisibleColumns, mobileOverflowColumns } = useMemo(() => {
            if (!mobileConfig.enableColumnOverflow) {
                return {
                    mobileVisibleColumns: visibleColumns,
                    mobileOverflowColumns: [],
                }
            }

            const visible = visibleColumns.slice(
                0,
                mobileConfig.maxVisibleColumns
            )
            const overflow = visibleColumns.slice(
                mobileConfig.maxVisibleColumns
            )

            return {
                mobileVisibleColumns: visible,
                mobileOverflowColumns: overflow,
            }
        }, [
            visibleColumns,
            mobileConfig.enableColumnOverflow,
            mobileConfig.maxVisibleColumns,
        ])

        const effectiveVisibleColumns = mobileConfig.enableColumnOverflow
            ? mobileVisibleColumns
            : visibleColumns

        const stateAreaHeight = useMemo(() => {
            if (tableBodyHeight !== undefined) {
                return tableBodyHeight
            }

            return pageSize <= 5 ? '300px' : '600px'
        }, [pageSize, tableBodyHeight])

        const formatOptions: MenuGroupType[] = [
            {
                items: [
                    {
                        label: 'Format',
                        slot3: isFormatEnabled ? <Check size={16} /> : null,
                        onClick: () => setIsFormatEnabled(!isFormatEnabled),
                    },
                ],
                showSeparator: false,
            },
        ]

        const removeNumberFormatting = (value: unknown): string => {
            if (value == null) return ''

            const stringValue = String(value)

            let cleaned = stringValue.replace(/[$€£¥₹₽₪₩₦₡₵₸₴₺₻₼₽¢]/g, '')

            cleaned = cleaned.replace(/%/g, '')

            cleaned = cleaned.replace(/,/g, '')

            cleaned = cleaned.trim()

            const numericValue = parseFloat(cleaned)
            if (!isNaN(numericValue)) {
                return numericValue.toString()
            }

            return stringValue
        }

        const getDisplayValue = (
            value: unknown,
            column: ColumnDefinition<T>
        ): unknown => {
            if (
                !isFormatEnabled &&
                (column.type === ColumnType.NUMBER ||
                    (typeof value === 'string' &&
                        /[$€£¥₹₽₪₩₦₡₵₸₴₺₻₼₽¢%,\d]/.test(value)))
            ) {
                return removeNumberFormatting(value)
            }
            return value
        }

        const processedData = useMemo(() => {
            let result = [...data]

            if (serverSidePagination) {
                return result
            }

            if (
                enableSearch &&
                !serverSideSearch &&
                searchConfig.query.trim()
            ) {
                result = searchData(result, searchConfig, visibleColumns)
            }

            if (
                enableFiltering &&
                !serverSideFiltering &&
                columnFilters.length > 0
            ) {
                result = applyColumnFilters(result, columnFilters)
            }

            if (sortConfig && sortConfig.field) {
                result = sortData(result, sortConfig, visibleColumns)
            }

            return result
        }, [
            data,
            searchConfig,
            columnFilters,
            sortConfig,
            visibleColumns,
            enableSearch,
            enableFiltering,
            serverSideSearch,
            serverSideFiltering,
            serverSidePagination,
        ])

        const totalRows = useMemo(() => {
            if (
                serverSidePagination ||
                serverSideSearch ||
                serverSideFiltering
            ) {
                return pagination?.totalRows || data.length
            }
            return processedData.length
        }, [
            serverSidePagination,
            serverSideSearch,
            serverSideFiltering,
            pagination?.totalRows,
            data.length,
            processedData.length,
        ])

        useEffect(() => {
            if (
                !serverSidePagination &&
                !serverSideSearch &&
                !serverSideFiltering
            ) {
                const totalPages = Math.ceil(totalRows / pageSize)
                if (currentPage > totalPages && totalPages > 0) {
                    setCurrentPage(1)
                }
            }
        }, [
            totalRows,
            pageSize,
            currentPage,
            serverSidePagination,
            serverSideSearch,
            serverSideFiltering,
        ])

        useEffect(() => {
            const container = tableContainerRef.current
            if (!container) return

            const updateContainerWidth = () => {
                const width = container.clientWidth
                setIsNarrowContainer(width < 640)
            }

            updateContainerWidth()

            const resizeObserver = new ResizeObserver(updateContainerWidth)
            resizeObserver.observe(container)

            return () => {
                resizeObserver.disconnect()
            }
        }, [])

        const currentData = useMemo(() => {
            if (
                serverSideSearch ||
                serverSideFiltering ||
                serverSidePagination
            ) {
                return processedData
            }

            const effectiveCurrentPage =
                serverSidePagination && pagination
                    ? pagination.currentPage
                    : currentPage
            const effectivePageSize =
                serverSidePagination && pagination
                    ? pagination.pageSize
                    : pageSize
            const startIndex = (effectiveCurrentPage - 1) * effectivePageSize
            return processedData.slice(
                startIndex,
                startIndex + effectivePageSize
            )
        }, [
            processedData,
            currentPage,
            pageSize,
            serverSideSearch,
            serverSideFiltering,
            serverSidePagination,
            pagination?.currentPage,
            pagination?.pageSize,
        ])
        const isTableLoading =
            isLoading || (serverSidePagination && internalLoading)
        const bodyState = getDataTableBodyState({
            isLoading: isTableLoading,
            error,
            hasRows: currentData.length > 0,
        })
        const isErrorState = bodyState === 'error'
        const shouldRenderRows = bodyState === 'rows'

        const exportFormats = useMemo<DataTableExportFormat[]>(() => {
            const configuredFormats = exportConfig?.formats?.filter(
                (format): format is DataTableExportFormat =>
                    format === 'csv' || format === 'xlsx'
            )

            return configuredFormats && configuredFormats.length > 0
                ? [...new Set(configuredFormats)]
                : ['csv']
        }, [exportConfig?.formats])

        const handleTableExport = async (format: DataTableExportFormat) => {
            if (!exportConfig?.enabled || isExporting) return

            setIsExporting(true)
            try {
                const scope = exportConfig.scope || 'currentPage'
                let rows = scope === 'allLoaded' ? processedData : currentData

                if (exportConfig.onExport) {
                    const suppliedRows = await exportConfig.onExport({
                        visibleColumns,
                        filters: columnFilters,
                        advancedFilters,
                        search: searchConfig,
                        sort: sortConfig,
                        scope,
                    })

                    if (suppliedRows === undefined) return
                    rows = suppliedRows
                }

                const defaultFileName = `${title || 'data'}-export-${new Date().toISOString().split('T')[0]}`
                await downloadDataTableExport(
                    rows,
                    visibleColumns,
                    format,
                    exportConfig.fileName || defaultFileName,
                    { getDisplayValue, dateLabel }
                )
            } catch (error) {
                alert(error instanceof Error ? error.message : 'Export failed')
            } finally {
                setIsExporting(false)
            }
        }

        const exportButton = exportConfig?.enabled ? (
            exportFormats.length === 1 ? (
                <Button
                    data-element="table-export-button"
                    buttonType={ButtonType.SECONDARY}
                    leadingIcon={<Download aria-hidden="true" />}
                    size={ButtonSize.SMALL}
                    loading={isExporting}
                    disabled={isExporting}
                    aria-label={`Export ${exportFormats[0].toUpperCase()}`}
                    onClick={() => void handleTableExport(exportFormats[0])}
                >
                    Export
                </Button>
            ) : (
                <Menu
                    items={[
                        {
                            items: exportFormats.map((format) => ({
                                label: format.toUpperCase(),
                                onClick: () => void handleTableExport(format),
                            })),
                            showSeparator: false,
                        },
                    ]}
                    alignment={MenuAlignment.END}
                    trigger={
                        <Button
                            data-element="table-export-button"
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Download aria-hidden="true" />}
                            size={ButtonSize.SMALL}
                            loading={isExporting}
                            disabled={isExporting}
                            aria-label="Export table"
                        >
                            Export
                        </Button>
                    }
                />
            )
        ) : null

        // Stable row ID list for the current page. Used for selection state and
        // as a cheap signal to remount the tbody when results change (e.g. server-side search).
        const currentPageRowIds = useMemo(() => {
            return currentData.map((row) => String(row[idField]))
        }, [currentData, idField])

        // Monotonically increasing "dataVersion" for the current page's row IDs.
        // This avoids expensive per-character hashing in TableBody while still
        // forcing a remount when IDs change but length/first/last stay the same.
        const [tbodyDataVersion, setTbodyDataVersion] = useState(0)
        const prevPageRowIdsRef = useRef<string[] | null>(null)
        useEffect(() => {
            const prev = prevPageRowIdsRef.current
            let changed =
                prev == null || prev.length !== currentPageRowIds.length

            if (!changed && prev) {
                for (let i = 0; i < prev.length; i++) {
                    if (prev[i] !== currentPageRowIds[i]) {
                        changed = true
                        break
                    }
                }
            }

            if (changed) {
                setTbodyDataVersion((v) => v + 1)
            }
            prevPageRowIdsRef.current = currentPageRowIds
        }, [currentPageRowIds])

        const updateSelectAllState = (
            selectedRowsState: Record<string, boolean>
        ) => {
            const selectableRowIds = currentData
                .map((row, index) => ({
                    row,
                    rowId: String(row[idField]),
                    index,
                }))
                .filter(
                    ({ row, index }) =>
                        !(isRowDisabledFn && isRowDisabledFn(row, index))
                )
                .map(({ rowId }) => rowId)

            const totalSelectableCount = selectableRowIds.length

            if (totalSelectableCount === 0) {
                setSelectAll(false)
                return
            }

            const selectedCurrentPageRows = selectableRowIds.filter(
                (rowId) => selectedRowsState[rowId]
            )

            if (selectedCurrentPageRows.length === 0) {
                setSelectAll(false)
            } else if (
                selectedCurrentPageRows.length === totalSelectableCount
            ) {
                setSelectAll(true)
            } else {
                setSelectAll('indeterminate')
            }
        }

        useEffect(() => {
            updateSelectAllState(selectedRows)
        }, [currentData, selectedRows])

        const hasMountedScrollRef = useRef(false)
        useEffect(() => {
            const currentColumnCount = visibleColumns.length

            if (hasMountedScrollRef.current) {
                const el = scrollContainerRef.current
                const shouldScrollToEnd =
                    currentColumnCount > previousColumnCount &&
                    !!el &&
                    el.scrollWidth - (el.scrollLeft + el.clientWidth) < 16

                if (shouldScrollToEnd) {
                    setTimeout(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollLeft =
                                scrollContainerRef.current.scrollWidth
                        }
                    }, 100)
                }
            } else {
                hasMountedScrollRef.current = true
            }

            setPreviousColumnCount(currentColumnCount)
        }, [visibleColumns.length, previousColumnCount])

        const handleSelectAll = (checked: boolean | 'indeterminate') => {
            const newSelectAll = checked === true

            const newSelectedRows = { ...selectedRows }

            if (newSelectAll) {
                currentData.forEach((row, index) => {
                    const rowId = String(row[idField])
                    // Only select rows that are not disabled
                    if (!(isRowDisabledFn && isRowDisabledFn(row, index))) {
                        newSelectedRows[rowId] = true
                    }
                })
            } else {
                currentData.forEach((row) => {
                    const rowId = String(row[idField])
                    newSelectedRows[rowId] = false
                })
            }

            setSelectedRows(newSelectedRows)
            updateSelectAllState(newSelectedRows)

            if (onRowSelectionChange) {
                const selectedRowIds = Object.entries(newSelectedRows)
                    .filter(([, selected]) => selected)
                    .map(([id]) => id)

                currentData.forEach((row) => {
                    const rowId = String(row[idField])
                    const wasSelected = selectedRows[rowId] || false
                    const isSelected = newSelectedRows[rowId] || false

                    if (wasSelected !== isSelected) {
                        const rawRowData = data.find(
                            (d) => String(d[idField]) === rowId
                        )
                        const rowDataToPass = (rawRowData || row) as T

                        onRowSelectionChange(
                            selectedRowIds,
                            isSelected,
                            rowId,
                            rowDataToPass
                        )
                    }
                })
            }
        }

        const isRowDisabledFn = rowSelectionConfig?.isDisabled

        const handleRowSelect = (rowId: unknown, rowIndex?: number) => {
            const rowIdStr = String(rowId)

            // If no index provided, fall back to find (for backwards compatibility)
            if (rowIndex === undefined) {
                const row = currentData.find(
                    (r) => String(r[idField]) === rowIdStr
                )
                if (!row || (isRowDisabledFn && isRowDisabledFn(row, -1))) {
                    return
                }
                // Continue with the found row
                const isSelected = !selectedRows[rowIdStr]
                const newSelectedRows = {
                    ...selectedRows,
                    [rowIdStr]: isSelected,
                }
                setSelectedRows(newSelectedRows)
                updateSelectAllState(newSelectedRows)

                if (onRowSelectionChange) {
                    const selectedRowIds = Object.entries(newSelectedRows)
                        .filter(([, selected]) => selected)
                        .map(([id]) => id)

                    const rawRowData = data.find(
                        (d) => String(d[idField]) === rowIdStr
                    )
                    const rowDataFromCurrent = currentData.find(
                        (row) => String(row[idField]) === rowIdStr
                    )
                    const rowDataToPass = (rawRowData ||
                        rowDataFromCurrent) as T

                    if (rowDataToPass) {
                        onRowSelectionChange(
                            selectedRowIds,
                            isSelected,
                            rowIdStr,
                            rowDataToPass
                        )
                    }
                }
                return
            }

            // Bounds check and use index directly instead of scanning
            if (
                rowIndex < 0 ||
                rowIndex >= currentData.length ||
                String(currentData[rowIndex][idField]) !== rowIdStr
            ) {
                return
            }

            const row = currentData[rowIndex]

            if (isRowDisabledFn && isRowDisabledFn(row, rowIndex)) {
                return
            }

            const isSelected = !selectedRows[rowIdStr]

            const newSelectedRows = {
                ...selectedRows,
                [rowIdStr]: isSelected,
            }
            setSelectedRows(newSelectedRows)

            updateSelectAllState(newSelectedRows)

            if (onRowSelectionChange) {
                const selectedRowIds = Object.entries(newSelectedRows)
                    .filter(([, selected]) => selected)
                    .map(([id]) => id)

                const rawRowData = data.find(
                    (d) => String(d[idField]) === rowIdStr
                )
                const rowDataFromCurrent = currentData.find(
                    (row) => String(row[idField]) === rowIdStr
                )
                const rowDataToPass = (rawRowData || rowDataFromCurrent) as T

                if (rowDataToPass) {
                    onRowSelectionChange(
                        selectedRowIds,
                        isSelected,
                        rowIdStr,
                        rowDataToPass
                    )
                }
            }
        }

        const exportToCSV = () => {
            try {
                const dataForExport = isFormatEnabled
                    ? processedData
                    : processedData.map((row) => {
                          const formattedRow = { ...row } as Record<
                              string,
                              unknown
                          >
                          visibleColumns.forEach((column) => {
                              const fieldKey = String(column.field)
                              if (
                                  column.type === ColumnType.NUMBER ||
                                  (typeof formattedRow[fieldKey] === 'string' &&
                                      /^[$€£¥₹₽₪₩₦₡₵₸₴₺₻₼₽¢%,\d.\s]+$/.test(
                                          formattedRow[fieldKey]
                                      ))
                              ) {
                                  formattedRow[fieldKey] =
                                      removeNumberFormatting(
                                          formattedRow[fieldKey]
                                      )
                              }
                          })
                          return formattedRow as T
                      })

                exportSelectedRowsToCSV(
                    dataForExport,
                    selectedRows,
                    visibleColumns,
                    String(idField),
                    `${title || 'data'}-export-${new Date().toISOString().split('T')[0]}.csv`
                )
            } catch (error) {
                alert(error instanceof Error ? error.message : 'Export failed')
            }
        }

        const sortTimeoutRef = useRef<NodeJS.Timeout | null>(null)

        useEffect(() => {
            return () => {
                if (sortTimeoutRef.current) {
                    clearTimeout(sortTimeoutRef.current)
                }
            }
        }, [])

        const applySortConfig = (
            field: keyof T,
            newSortConfig: SortConfig | null
        ) => {
            setSortConfig(newSortConfig)

            if (onSortChange) {
                if (sortTimeoutRef.current) {
                    clearTimeout(sortTimeoutRef.current)
                }

                sortTimeoutRef.current = setTimeout(() => {
                    if (newSortConfig) {
                        onSortChange(newSortConfig)
                    } else {
                        onSortChange({
                            field: field.toString(),
                            direction: SortDirection.NONE,
                        })
                    }
                    sortTimeoutRef.current = null
                }, 10)
            }
        }

        const handleSort = (field: keyof T, sortType?: string) => {
            const column = visibleColumns.find((col) => col.field === field)
            if (!column || column.isSortable === false) {
                return
            }

            let direction: SortDirection
            let newSortConfig: SortConfig | null

            const isSameSort =
                sortConfig?.field === field && sortConfig?.sortType === sortType

            if (isSameSort) {
                if (sortConfig.direction === SortDirection.ASCENDING) {
                    direction = SortDirection.DESCENDING
                    newSortConfig = {
                        field: field.toString(),
                        direction,
                        sortType,
                    }
                } else if (sortConfig.direction === SortDirection.DESCENDING) {
                    direction = SortDirection.NONE
                    newSortConfig = null
                } else {
                    direction = SortDirection.ASCENDING
                    newSortConfig = {
                        field: field.toString(),
                        direction,
                        sortType,
                    }
                }
            } else {
                direction = SortDirection.ASCENDING
                newSortConfig = {
                    field: field.toString(),
                    direction,
                    sortType,
                }
            }

            applySortConfig(field, newSortConfig)
        }

        const handleSortAscending = (field: keyof T, sortType?: string) => {
            const column = visibleColumns.find((col) => col.field === field)
            if (!column || column.isSortable === false) {
                return
            }

            const isCurrentlyAscending =
                sortConfig?.field === field &&
                sortConfig.direction === SortDirection.ASCENDING &&
                sortConfig?.sortType === sortType

            const newSortConfig = isCurrentlyAscending
                ? null
                : {
                      field: field.toString(),
                      direction: SortDirection.ASCENDING,
                      sortType,
                  }

            applySortConfig(field, newSortConfig)
        }

        const handleSortDescending = (field: keyof T, sortType?: string) => {
            const column = visibleColumns.find((col) => col.field === field)
            if (!column || column.isSortable === false) {
                return
            }

            const isCurrentlyDescending =
                sortConfig?.field === field &&
                sortConfig.direction === SortDirection.DESCENDING &&
                sortConfig?.sortType === sortType

            const newSortConfig = isCurrentlyDescending
                ? null
                : {
                      field: field.toString(),
                      direction: SortDirection.DESCENDING,
                      sortType,
                  }

            applySortConfig(field, newSortConfig)
        }

        const handlePageChange = (page: number) => {
            if (page !== currentPage) {
                setCurrentPage(page)

                if (serverSidePagination) {
                    setInternalLoading(true)
                }

                if (onPageChange) {
                    onPageChange(page)
                }
            }
        }

        const handlePageSizeChange = (size: number) => {
            if (size !== pageSize) {
                setPageSize(size)
                setCurrentPage(1)

                if (serverSidePagination) {
                    setInternalLoading(true)
                }

                if (onPageSizeChange) {
                    onPageSizeChange(size)
                }
            }
        }

        const handleSearch = (query: string) => {
            const newSearchConfig = createSearchConfig(
                query,
                searchConfig.caseSensitive,
                searchConfig.searchFields
            )

            setSearchConfig(newSearchConfig)
            setCurrentPage(1)

            if (onSearchChange) {
                onSearchChange(newSearchConfig)
            }
        }

        const handleColumnFilter = (
            field: string,
            type: FilterType,
            value: string | string[] | { min: number; max: number },
            operator:
                | 'equals'
                | 'contains'
                | 'startsWith'
                | 'endsWith'
                | 'gt'
                | 'lt'
                | 'gte'
                | 'lte'
                | 'range' = 'contains'
        ) => {
            const updatedFilters = updateColumnFilter(
                columnFilters,
                field as keyof Record<string, unknown>,
                type,
                value,
                operator
            )

            setColumnFilters(updatedFilters)
            setCurrentPage(1)

            if (onFilterChange) {
                onFilterChange(updatedFilters)
            }
        }

        const clearAllFilters = () => {
            const { searchConfig: clearedSearchConfig } =
                clearAllFiltersAndSearch()

            setSearchConfig(clearedSearchConfig)
            setColumnFilters([])
            setCurrentPage(1)

            if (onAdvancedFiltersChange) {
                onAdvancedFiltersChange([])
            }
            if (onSearchChange) {
                onSearchChange(clearedSearchConfig)
            }
            if (onFilterChange) {
                onFilterChange([])
            }
        }
        const selectedCount = getSelectedRowCount(selectedRows)

        const handleDeselectAll = () => {
            const newSelectedRows = { ...selectedRows }
            currentData.forEach((row) => {
                const rowId = String(row[idField])
                newSelectedRows[rowId] = false
            })
            setSelectedRows({ ...newSelectedRows })
            setSelectAll(false)
        }

        const renderBulkActions = () => {
            if (!bulkActions?.customActions) return null
            return bulkActions.customActions
        }

        const getColumnWidth = (
            column: ColumnDefinition<T>
        ): React.CSSProperties => {
            return getColumnStyles(column)
        }

        const handleEditRow = (rowId: unknown) => {
            const rowIdStr = String(rowId)
            const row = currentData.find((r) => String(r[idField]) === rowIdStr)
            if (row) {
                setEditingRows((prev) => ({ ...prev, [rowIdStr]: true }))
                setEditValues((prev) => ({ ...prev, [rowIdStr]: { ...row } }))
            }
        }

        const handleSaveRow = (rowId: unknown) => {
            const rowIdStr = String(rowId)
            const updatedRow = editValues[rowIdStr]
            if (updatedRow && onRowSave) {
                onRowSave(rowId, updatedRow)
            }
            setEditingRows((prev) => ({ ...prev, [rowIdStr]: false }))
            setEditValues((prev) => {
                const newValues = { ...prev }
                delete newValues[rowIdStr]
                return newValues
            })
        }

        const handleCancelEdit = (rowId: unknown) => {
            const rowIdStr = String(rowId)
            if (onRowCancel) {
                onRowCancel(rowId)
            }
            setEditingRows((prev) => ({ ...prev, [rowIdStr]: false }))
            setEditValues((prev) => {
                const newValues = { ...prev }
                delete newValues[rowIdStr]
                return newValues
            })
        }

        const handleFieldChange = (
            rowId: unknown,
            field: keyof T,
            value: unknown
        ) => {
            const rowIdStr = String(rowId)

            if (enableInlineEdit) {
                setEditValues((prev) => ({
                    ...prev,
                    [rowIdStr]: {
                        ...prev[rowIdStr],
                        [field]: value,
                    },
                }))
            } else {
                if (onFieldChange) {
                    onFieldChange(rowId, field, value)
                }
            }
        }

        const handleRowExpand = (rowId: unknown) => {
            const rowIdStr = String(rowId)
            const isCurrentlyExpanded = expandedRows[rowIdStr]

            const newExpandedRows: Record<string, boolean> = {}

            if (!isCurrentlyExpanded) {
                newExpandedRows[rowIdStr] = true
            }

            setExpandedRows(newExpandedRows)

            if (onRowExpansionChange) {
                const rowData = currentData.find(
                    (row) => row[idField] === rowId
                )
                if (rowData) {
                    onRowExpansionChange(rowId, !isCurrentlyExpanded, rowData)
                }
            }
        }

        const handleMobileOverflowClick = (row: T) => {
            const rowIndex = currentData.findIndex(
                (r) => r[idField] === row[idField]
            )
            setSelectedRowForDrawer(row)
            setSelectedRowIndexForDrawer(rowIndex)
            setMobileDrawerOpen(true)
        }

        // const handleTableFocus = () => {
        //     if (!focusedCell && currentData.length > 0) {
        //         setFocusedCell({ rowIndex: 0, colIndex: 0 })
        //         setTimeout(() => {
        //             const firstCell = document.querySelector(
        //                 '[data-row-index="0"][data-col-index="0"]'
        //             ) as HTMLElement
        //             if (firstCell) {
        //                 firstCell.focus()
        //             }
        //         }, 0)
        //     }
        // }

        const totalColumnsT =
            effectiveVisibleColumns.length +
            (enableRowSelection ? 1 : 0) +
            (enableRowExpansion ? 1 : 0) +
            (showActionsColumn &&
            (enableInlineEdit || rowActions) &&
            !(mobileConfig.isMobile && mobileConfig.enableColumnOverflow)
                ? 1
                : 0) +
            (mobileConfig.enableColumnOverflow &&
            mobileOverflowColumns.length > 0
                ? 1
                : 0)

        const totalColumns =
            totalColumnsT > 0 && effectiveEnableColumnManager
                ? totalColumnsT + 1
                : 0

        const handleTableKeyDown = (
            event: React.KeyboardEvent<HTMLTableElement>
        ) => {
            if (event.key === 'Tab') {
                return
            }

            const target = event.target as HTMLElement

            if (
                target.closest('thead') ||
                target.closest('[role="columnheader"]') ||
                target.tagName === 'TH'
            ) {
                return
            }

            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.isContentEditable ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('[role="menuitem"]')
            ) {
                return
            }

            let newRowIndex = focusedCell?.rowIndex ?? 0
            let newColIndex = focusedCell?.colIndex ?? 0

            switch (event.key) {
                case 'ArrowRight':
                    event.preventDefault()
                    if (newColIndex < totalColumns - 1) {
                        newColIndex++
                    }
                    break
                case 'ArrowLeft':
                    event.preventDefault()
                    if (newColIndex > 0) {
                        newColIndex--
                    }
                    break
                case 'ArrowDown':
                    event.preventDefault()
                    if (newRowIndex < currentData.length - 1) {
                        newRowIndex++
                    }
                    break
                case 'ArrowUp':
                    event.preventDefault()
                    if (newRowIndex > 0) {
                        newRowIndex--
                    }
                    break
                case 'Home':
                    event.preventDefault()
                    if (event.ctrlKey || event.metaKey) {
                        newRowIndex = 0
                        newColIndex = 0
                    } else {
                        newColIndex = 0
                    }
                    break
                case 'End':
                    event.preventDefault()
                    if (event.ctrlKey || event.metaKey) {
                        newRowIndex = currentData.length - 1
                        newColIndex = totalColumns - 1
                    } else {
                        newColIndex = totalColumns - 1
                    }
                    break
                case 'PageDown':
                    event.preventDefault()
                    if (newRowIndex < currentData.length - 1) {
                        newRowIndex = Math.min(
                            newRowIndex + pageSize,
                            currentData.length - 1
                        )
                    }
                    break
                case 'PageUp':
                    event.preventDefault()
                    if (newRowIndex > 0) {
                        newRowIndex = Math.max(newRowIndex - pageSize, 0)
                    }
                    break
                case 'Enter':
                case ' ':
                    // Only trigger row click if focus is on a body cell, not header
                    if (
                        onRowClick &&
                        focusedCell !== null &&
                        !target.closest('thead') &&
                        !target.closest('[role="columnheader"]')
                    ) {
                        const row = currentData[focusedCell.rowIndex]
                        if (row) {
                            onRowClick(row, focusedCell.rowIndex)
                        }
                    }
                    return
                default:
                    return
            }

            setFocusedCell({ rowIndex: newRowIndex, colIndex: newColIndex })

            setTimeout(() => {
                const cellSelector = `[data-row-index="${newRowIndex}"][data-col-index="${newColIndex}"]`
                const cellElement = document.querySelector(
                    cellSelector
                ) as HTMLElement
                if (cellElement) {
                    cellElement.focus()
                    cellElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'nearest',
                    })
                }
            }, 0)
        }

        const containerRefCallback = useCallback(
            (node: HTMLDivElement | null) => {
                tableContainerRef.current = node
                if (typeof ref === 'function') {
                    ref(node)
                } else if (ref) {
                    ref.current = node
                }
            },
            [ref]
        )

        const pivotTriggerSlot = pivotTableConfig?.triggerSlot || 2

        const pivotTriggerButton = useMemo(() => {
            if (!enablePivotTable || !pivotTableConfig?.triggerButton) {
                return null
            }

            const triggerNode = pivotTableConfig.triggerButton
            if (!React.isValidElement(triggerNode)) {
                return triggerNode
            }

            const existingOnClick = (
                triggerNode.props as { onClick?: (event: unknown) => void }
            ).onClick

            return React.cloneElement(
                triggerNode as React.ReactElement<{
                    onClick?: (event: unknown) => void
                }>,
                {
                    onClick: (event: unknown) => {
                        existingOnClick?.(event)
                        setIsPivotModalOpen(true)
                    },
                }
            )
        }, [enablePivotTable, pivotTableConfig?.triggerButton])

        const effectiveHeaderSlot1 =
            pivotTriggerSlot === 1 && pivotTriggerButton
                ? pivotTriggerButton
                : headerSlot1
        const effectiveHeaderSlot2 =
            pivotTriggerSlot === 2 && pivotTriggerButton
                ? pivotTriggerButton
                : headerSlot2
        const effectiveHeaderSlot3 =
            pivotTriggerSlot === 3 ? (
                <>
                    {headerSlot2}
                    {pivotTriggerButton}
                </>
            ) : (
                effectiveHeaderSlot2
            )

        return (
            <Block
                ref={containerRefCallback}
                style={{
                    position: tableToken.position,
                    padding: tableToken.padding,
                    width: tableToken.width,
                    display: tableToken.display,
                    flexDirection: tableToken.flexDirection,
                }}
                data-table={title || 'table'}
                role="region"
                aria-label={title || 'Data table'}
                aria-describedby={
                    [tableLabelId, tableDescriptionId]
                        .filter(Boolean)
                        .join(' ') || undefined
                }
            >
                {title && (
                    <h2
                        id={tableLabelId}
                        style={{ display: 'none' }}
                        aria-hidden="true"
                    >
                        {title}
                    </h2>
                )}
                {description && (
                    <p
                        id={tableDescriptionId}
                        style={{ display: 'none' }}
                        aria-hidden="true"
                    >
                        {description}
                    </p>
                )}
                <DataTableHeader
                    title={title}
                    description={description}
                    descriptionTooltipProps={descriptionTooltipProps}
                    showHeader={showHeader}
                    showToolbar={showToolbar}
                    enableSearch={enableSearch}
                    searchPlaceholder={searchPlaceholder}
                    searchConfig={searchConfig}
                    enableAdvancedFilter={enableAdvancedFilter}
                    advancedFilterComponent={advancedFilterComponent}
                    advancedFilters={advancedFilters}
                    visibleColumns={
                        visibleColumns as ColumnDefinition<
                            Record<string, unknown>
                        >[]
                    }
                    data={data}
                    onSearch={handleSearch}
                    onAdvancedFiltersChange={onAdvancedFiltersChange}
                    onClearAllFilters={clearAllFilters}
                    mobileToolbarSlot={exportButton}
                    headerSlot1={
                        showSettings ||
                        (!mobileConfig.isMobile && exportButton) ? (
                            <>
                                {showSettings && (
                                    <Menu
                                        items={formatOptions}
                                        alignment={MenuAlignment.END}
                                        sideOffset={8}
                                        alignOffset={-20}
                                        trigger={
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                leadingIcon={<Settings />}
                                                size={ButtonSize.SMALL}
                                                aria-label="Table settings"
                                            >
                                                Settings
                                            </Button>
                                        }
                                    />
                                )}
                                {!mobileConfig.isMobile && exportButton}
                            </>
                        ) : null
                    }
                    headerSlot2={effectiveHeaderSlot1}
                    headerSlot3={effectiveHeaderSlot3}
                    {...rest}
                />

                <Block
                    style={{
                        borderRadius: tableToken.dataTable.borderRadius,
                        border: tableToken.dataTable.border,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'auto',
                    }}
                >
                    {showBulkActionBar && !isErrorState && (
                        <BulkActionBar
                            selectedCount={selectedCount}
                            onExport={exportToCSV}
                            onDeselectAll={handleDeselectAll}
                            customActions={renderBulkActions()}
                            showExport={bulkActions?.showExport}
                        />
                    )}
                    <Block
                        id={statusRegionId}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        style={{
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            padding: 0,
                            margin: '-1px',
                            overflow: 'hidden',
                            clip: 'rect(0, 0, 0, 0)',
                            whiteSpace: 'nowrap',
                            borderWidth: 0,
                        }}
                    >
                        {isTableLoading
                            ? 'Loading table data'
                            : error
                              ? 'Failed to load table data'
                              : currentData.length === 0
                                ? 'No data available'
                                : `Showing ${currentData.length} of ${totalRows} rows`}
                    </Block>

                    <Block
                        style={{
                            position: 'relative',
                        }}
                    >
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <SortableContext
                                items={columnIds}
                                strategy={horizontalListSortingStrategy}
                            >
                                <ScrollableContainer
                                    ref={scrollContainerRef}
                                    style={{
                                        position: 'relative',
                                        maxHeight:
                                            currentData.length > 0
                                                ? tableBodyHeight
                                                    ? typeof tableBodyHeight ===
                                                      'number'
                                                        ? `${tableBodyHeight}px`
                                                        : tableBodyHeight
                                                    : '668px'
                                                : undefined,
                                        overflowX: 'auto',
                                        overflowY: 'auto',
                                    }}
                                >
                                    <table
                                        id={tableId}
                                        role="grid"
                                        aria-label={title || 'Data table'}
                                        aria-rowcount={
                                            totalRows > 0
                                                ? totalRows
                                                : undefined
                                        }
                                        aria-colcount={totalColumns}
                                        aria-describedby={
                                            [tableDescriptionId, statusRegionId]
                                                .filter(Boolean)
                                                .join(' ') || undefined
                                        }
                                        onKeyDown={handleTableKeyDown}
                                        // onFocus={handleTableFocus}
                                        tabIndex={-1}
                                        style={{
                                            width: tableToken.dataTable.table
                                                .width,
                                            minWidth: 'auto',
                                            tableLayout:
                                                tableToken.dataTable.table
                                                    .tableLayout,
                                            borderCollapse:
                                                tableToken.dataTable.table
                                                    .borderCollapse,
                                            borderSpacing:
                                                tableToken.dataTable.table
                                                    .borderSpacing,
                                            position:
                                                tableToken.dataTable.table
                                                    .position,
                                            height: 'auto',
                                            minHeight: 'auto',
                                            backgroundColor: 'none',
                                            outline: 'none',
                                        }}
                                    >
                                        <TableHeader
                                            visibleColumns={
                                                effectiveVisibleColumns as ColumnDefinition<
                                                    Record<string, unknown>
                                                >[]
                                            }
                                            allVisibleColumns={
                                                visibleColumns as ColumnDefinition<
                                                    Record<string, unknown>
                                                >[]
                                            }
                                            initialColumns={
                                                initialColumns as ColumnDefinition<
                                                    Record<string, unknown>
                                                >[]
                                            }
                                            selectAll={selectAll}
                                            sortConfig={sortConfig}
                                            // serverSideFiltering filters via
                                            // onFilterChange without needing
                                            // enableFiltering, so it also
                                            // counts as filtering being on.
                                            enableFiltering={
                                                enableFiltering ||
                                                serverSideFiltering
                                            }
                                            enableInlineEdit={enableInlineEdit}
                                            showActionsColumn={
                                                showActionsColumn
                                            }
                                            enableColumnManager={
                                                effectiveEnableColumnManager
                                            }
                                            enableColumnReordering={
                                                enableColumnReordering
                                            }
                                            showSkeleton={showSkeleton}
                                            isLoading={isTableLoading}
                                            onColumnReorder={(columns) => {
                                                setVisibleColumns(
                                                    columns as ColumnDefinition<T>[]
                                                )
                                                onColumnReorder?.(
                                                    columns as ColumnDefinition<T>[]
                                                )
                                            }}
                                            columnManagerMaxSelections={
                                                columnManagerMaxSelections
                                            }
                                            columnManagerAlwaysSelected={columnManagerAlwaysSelected?.map(
                                                (field) => String(field)
                                            )}
                                            columnManagerPrimaryAction={
                                                columnManagerPrimaryAction
                                            }
                                            columnManagerSecondaryAction={
                                                columnManagerSecondaryAction
                                            }
                                            columnManagerWidth={
                                                columnManagerWidth
                                            }
                                            enableRowExpansion={
                                                enableRowExpansion
                                            }
                                            enableRowSelection={
                                                enableRowSelection &&
                                                !isErrorState
                                            }
                                            rowActions={
                                                rowActions as
                                                    | RowActionsConfig<
                                                          Record<
                                                              string,
                                                              unknown
                                                          >
                                                      >
                                                    | undefined
                                            }
                                            data={data}
                                            mobileConfig={mobileConfig}
                                            mobileOverflowColumns={
                                                mobileOverflowColumns as ColumnDefinition<
                                                    Record<string, unknown>
                                                >[]
                                            }
                                            onMobileOverflowClick={(row) =>
                                                handleMobileOverflowClick(
                                                    row as T
                                                )
                                            }
                                            onSort={handleSort}
                                            onSortAscending={
                                                handleSortAscending
                                            }
                                            onSortDescending={
                                                handleSortDescending
                                            }
                                            onOperations={onOperations}
                                            onInsertLeft={onInsertLeft}
                                            onInsertRight={onInsertRight}
                                            onDeleteColumn={onDeleteColumn}
                                            onSelectAll={handleSelectAll}
                                            onColumnChange={(columns) =>
                                                setVisibleColumns(
                                                    columns as ColumnDefinition<T>[]
                                                )
                                            }
                                            onColumnFilter={handleColumnFilter}
                                            columnFilters={columnFilters}
                                            getColumnWidth={
                                                getColumnWidth as (
                                                    column: ColumnDefinition<
                                                        Record<string, unknown>
                                                    >,
                                                    index: number
                                                ) => React.CSSProperties
                                            }
                                            columnFreeze={effectiveColumnFreeze}
                                            columnFreezeRight={
                                                columnFreezeRight
                                            }
                                            measuredFrozenWidths={
                                                measuredFrozenWidths
                                            }
                                            onFrozenWidthsMeasured={
                                                setMeasuredFrozenWidths
                                            }
                                        />
                                        {shouldRenderRows && (
                                            <TableBodyComponent
                                                currentData={currentData}
                                                dataVersion={tbodyDataVersion}
                                                visibleColumns={
                                                    effectiveVisibleColumns as ColumnDefinition<
                                                        Record<string, unknown>
                                                    >[]
                                                }
                                                mobileConfig={mobileConfig}
                                                mobileOverflowColumns={
                                                    mobileOverflowColumns as ColumnDefinition<
                                                        Record<string, unknown>
                                                    >[]
                                                }
                                                onMobileOverflowClick={(row) =>
                                                    handleMobileOverflowClick(
                                                        row as T
                                                    )
                                                }
                                                idField={String(idField)}
                                                tableTitle={title}
                                                selectedRows={selectedRows}
                                                editingRows={editingRows}
                                                editValues={editValues}
                                                expandedRows={expandedRows}
                                                enableInlineEdit={
                                                    enableInlineEdit
                                                }
                                                showActionsColumn={
                                                    showActionsColumn
                                                }
                                                enableColumnManager={
                                                    effectiveEnableColumnManager
                                                }
                                                enableRowExpansion={
                                                    enableRowExpansion
                                                }
                                                enableRowSelection={
                                                    enableRowSelection
                                                }
                                                rowSelectionConfig={
                                                    rowSelectionConfig as
                                                        | {
                                                              isDisabled?: (
                                                                  row: Record<
                                                                      string,
                                                                      unknown
                                                                  >,
                                                                  index: number
                                                              ) => boolean
                                                              disabledText?: (
                                                                  row: Record<
                                                                      string,
                                                                      unknown
                                                                  >,
                                                                  index: number
                                                              ) => string
                                                          }
                                                        | undefined
                                                }
                                                columnFreeze={
                                                    effectiveColumnFreeze
                                                }
                                                columnFreezeRight={
                                                    columnFreezeRight
                                                }
                                                measuredFrozenWidths={
                                                    measuredFrozenWidths
                                                }
                                                focusedCell={focusedCell}
                                                onCellFocus={(
                                                    rowIndex,
                                                    colIndex
                                                ) =>
                                                    setFocusedCell({
                                                        rowIndex,
                                                        colIndex,
                                                    })
                                                }
                                                renderExpandedRow={
                                                    renderExpandedRow as
                                                        | ((expandedData: {
                                                              row: Record<
                                                                  string,
                                                                  unknown
                                                              >
                                                              index: number
                                                              isExpanded: boolean
                                                              toggleExpansion: () => void
                                                          }) => React.ReactNode)
                                                        | undefined
                                                }
                                                isRowExpandable={
                                                    isRowExpandable as
                                                        | ((
                                                              row: Record<
                                                                  string,
                                                                  unknown
                                                              >,
                                                              index: number
                                                          ) => boolean)
                                                        | undefined
                                                }
                                                onRowSelect={handleRowSelect}
                                                onEditRow={handleEditRow}
                                                onSaveRow={handleSaveRow}
                                                onCancelEdit={handleCancelEdit}
                                                onRowExpand={handleRowExpand}
                                                onFieldChange={
                                                    handleFieldChange
                                                }
                                                getColumnWidth={
                                                    getColumnWidth as (
                                                        column: ColumnDefinition<
                                                            Record<
                                                                string,
                                                                unknown
                                                            >
                                                        >,
                                                        index: number
                                                    ) => React.CSSProperties
                                                }
                                                onRowClick={
                                                    onRowClick as
                                                        | ((
                                                              row: Record<
                                                                  string,
                                                                  unknown
                                                              >,
                                                              index: number
                                                          ) => void)
                                                        | undefined
                                                }
                                                getRowStyle={
                                                    getRowStyle as
                                                        | ((
                                                              row: Record<
                                                                  string,
                                                                  unknown
                                                              >,
                                                              index: number
                                                          ) => React.CSSProperties)
                                                        | undefined
                                                }
                                                getDisplayValue={(
                                                    value: unknown,
                                                    column: ColumnDefinition<
                                                        Record<string, unknown>
                                                    >
                                                ) =>
                                                    getDisplayValue(
                                                        value,
                                                        column as ColumnDefinition<T>
                                                    )
                                                }
                                                rowActions={
                                                    rowActions as
                                                        | RowActionsConfig<
                                                              Record<
                                                                  string,
                                                                  unknown
                                                              >
                                                          >
                                                        | undefined
                                                }
                                                dateLabel={dateLabel}
                                                isLoading={isTableLoading}
                                                showSkeleton={showSkeleton}
                                                skeletonVariant={
                                                    skeletonVariant
                                                }
                                                isRowLoading={
                                                    isRowLoading as
                                                        | ((
                                                              row: Record<
                                                                  string,
                                                                  unknown
                                                              >,
                                                              index: number
                                                          ) => boolean)
                                                        | undefined
                                                }
                                                enableRowAnimation={
                                                    enableRowAnimation
                                                }
                                                rowAnimationConfig={
                                                    rowAnimationConfig
                                                }
                                            />
                                        )}
                                    </table>
                                </ScrollableContainer>
                            </SortableContext>
                            <DragOverlay dropAnimation={null}>
                                {activeId ? (
                                    <Block
                                        style={{
                                            backgroundColor:
                                                FOUNDATION_THEME.colors
                                                    .gray[100],
                                            border: `1px solid ${FOUNDATION_THEME.colors.gray[300]}`,
                                            borderRadius:
                                                FOUNDATION_THEME.unit[4],
                                            boxShadow:
                                                '0 4px 12px rgba(0, 0, 0, 0.15)',
                                            padding: `${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]}`,
                                            cursor: 'grabbing',
                                            height: '56px',
                                            minWidth: '120px',
                                            maxWidth: '320px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <PrimitiveText
                                            style={{
                                                fontSize:
                                                    FOUNDATION_THEME.font.size
                                                        .body.sm.fontSize,
                                                fontWeight: 600,
                                                color: FOUNDATION_THEME.colors
                                                    .gray[500],
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '100%',
                                            }}
                                        >
                                            {
                                                visibleColumns.find(
                                                    (col) =>
                                                        String(col.field) ===
                                                        activeId
                                                )?.header
                                            }
                                        </PrimitiveText>
                                    </Block>
                                ) : null}
                            </DragOverlay>
                        </DndContext>

                        {bodyState !== 'rows' && (
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                data-table-body-state={bodyState}
                                style={{
                                    minHeight: stateAreaHeight,
                                    height:
                                        tableBodyHeight !== undefined
                                            ? stateAreaHeight
                                            : undefined,
                                    backgroundColor:
                                        FOUNDATION_THEME.colors.gray[0],
                                    color: tableToken.dataTable.table.body.cell
                                        .color,
                                    fontSize:
                                        tableToken.dataTable.table.body.cell
                                            .fontSize,
                                    overflow: 'auto',
                                }}
                            >
                                {bodyState === 'loading' ? (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap={FOUNDATION_THEME.unit[8]}
                                    >
                                        <Loader2
                                            size={FOUNDATION_THEME.unit[20]}
                                            className="animate-spin"
                                            style={{
                                                animation:
                                                    'spin 1s linear infinite',
                                            }}
                                        />
                                        <span>Loading data...</span>
                                    </Block>
                                ) : bodyState === 'error' ? (
                                    renderErrorState ? (
                                        renderErrorState(onRetry)
                                    ) : (
                                        <DefaultTableState
                                            state="error"
                                            onRetry={onRetry}
                                        />
                                    )
                                ) : renderEmptyState ? (
                                    renderEmptyState()
                                ) : showEmptyState ? (
                                    <DefaultTableState state="empty" />
                                ) : (
                                    <span>No data available</span>
                                )}
                            </Block>
                        )}
                    </Block>

                    {showFooter && (
                        <TableFooter
                            pagination={pagination}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalRows={totalRows}
                            visibleRows={currentData.length}
                            isLoading={isTableLoading}
                            showSkeleton={showSkeleton}
                            hasData={currentData.length > 0}
                            isNarrowContainer={isNarrowContainer}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    )}
                </Block>

                {enablePivotTable && (
                    <PivotTableModal
                        isOpen={isPivotModalOpen}
                        onClose={() => setIsPivotModalOpen(false)}
                        data={processedData as Record<string, unknown>[]}
                        columns={
                            visibleColumns as ColumnDefinition<
                                Record<string, unknown>
                            >[]
                        }
                        title={pivotTableConfig?.title}
                        description={pivotTableConfig?.description}
                        showExport={pivotTableConfig?.showExport}
                        previewColumns={pivotTableConfig?.previewColumns}
                        previewRows={
                            pivotTableConfig?.previewRows as
                                | ({
                                      __pivotId: string
                                  } & Record<string, unknown>)[]
                                | undefined
                        }
                        availableAggregations={
                            pivotTableConfig?.availableAggregations
                        }
                        initialConfig={
                            pivotTableConfig?.initialConfig as
                                | Partial<
                                      PivotTableConfig<Record<string, unknown>>
                                  >
                                | undefined
                        }
                        onConfigChange={
                            pivotTableConfig?.onConfigChange as
                                | ((
                                      config: PivotTableConfig<
                                          Record<string, unknown>
                                      >
                                  ) => void)
                                | undefined
                        }
                        onExport={
                            pivotTableConfig?.onExport as
                                | ((
                                      config: PivotTableConfig<
                                          Record<string, unknown>
                                      >
                                  ) => void)
                                | undefined
                        }
                    />
                )}

                {mobileConfig.enableColumnOverflow && selectedRowForDrawer && (
                    <MobileColumnDrawer
                        isOpen={mobileDrawerOpen}
                        onClose={() => {
                            setMobileDrawerOpen(false)
                            setSelectedRowForDrawer(null)
                            setSelectedRowIndexForDrawer(-1)
                        }}
                        row={selectedRowForDrawer as Record<string, unknown>}
                        rowIndex={selectedRowIndexForDrawer}
                        overflowColumns={
                            mobileOverflowColumns as ColumnDefinition<
                                Record<string, unknown>
                            >[]
                        }
                        getDisplayValue={(value, column) =>
                            getDisplayValue(
                                value,
                                column as ColumnDefinition<T>
                            )
                        }
                        onFieldChange={(field, value) => {
                            setSelectedRowForDrawer((prev) =>
                                prev ? { ...prev, [field]: value } : null
                            )
                            if (onFieldChange && selectedRowForDrawer) {
                                const rowId = selectedRowForDrawer[idField]
                                onFieldChange(rowId, field as keyof T, value)
                            }
                        }}
                        rowActions={
                            rowActions as
                                | RowActionsConfig<Record<string, unknown>>
                                | undefined
                        }
                    />
                )}
            </Block>
        )
    }
)

DataTable.displayName = 'DataTable'

export default DataTable
