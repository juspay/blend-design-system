import { useState, useEffect, useMemo, forwardRef, useRef, useId } from 'react'
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
} from './utils'
import DataTableHeader from './DataTableHeader'
import TableHeader from './TableHeader'
import TableBodyComponent from './TableBody'
import TableFooter from './TableFooter'
import BulkActionBar from './TableBody/BulkActionBar'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/types'
import { Settings, Check, Loader2 } from 'lucide-react'
import Menu from '../Menu/Menu'
import { MenuGroupType, MenuAlignment } from '../Menu/types'

import { useMobileDataTable } from './hooks/useMobileDataTable'
import MobileColumnDrawer from './MobileColumnDrawer'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import styled from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'

const ScrollableContainer = styled(Block)`
    overflow-x: auto;
    overflow-y: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
`

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
            serverSideSearch = false,
            serverSideFiltering = false,
            serverSidePagination = false,
            isLoading = false,
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
            enableRowExpansion = false,
            enableRowSelection = false,
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
            rowActions,
            getRowStyle,
            tableBodyHeight,
            mobileColumnsToShow,
            ...rest
        }: DataTableProps<T>,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const tableToken = useResponsiveTokens<TableTokenType>('TABLE')
        const mobileConfig = useMobileDataTable(mobileColumnsToShow)
        const scrollContainerRef = useRef<HTMLDivElement>(null)
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

        const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false)
        const [selectedRowForDrawer, setSelectedRowForDrawer] =
            useState<T | null>(null)
        const [selectedRowIndexForDrawer, setSelectedRowIndexForDrawer] =
            useState<number>(-1)

        const [internalLoading, setInternalLoading] = useState<boolean>(false)

        useEffect(() => {
            if (serverSidePagination && !isLoading && internalLoading) {
                setInternalLoading(false)
            }
        }, [serverSidePagination, isLoading, internalLoading])

        const [activeId, setActiveId] = useState<string | null>(null)
        const [focusedCell, setFocusedCell] = useState<{
            rowIndex: number
            colIndex: number
        } | null>(null)

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
                }
            }
        }

        const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event

            if (over && active.id !== over.id) {
                onColumnReorder?.(visibleColumns as ColumnDefinition<T>[])
            }

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

        // Calculate minimum height for empty state based on page size
        // This ensures consistent height whether data is present or not
        const emptyStateMinHeight = useMemo(() => {
            if (tableBodyHeight) {
                return '400px'
            }
            // Use fixed heights based on page size ranges
            // 5 rows/page → 300px
            // 10+ rows/page → 600px
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

        const updateSelectAllState = (
            selectedRowsState: Record<string, boolean>
        ) => {
            const currentPageRowIds = currentData.map((row) =>
                String(row[idField])
            )
            const selectedCurrentPageRows = currentPageRowIds.filter(
                (rowId) => selectedRowsState[rowId]
            )

            if (selectedCurrentPageRows.length === 0) {
                setSelectAll(false)
            } else if (
                selectedCurrentPageRows.length === currentPageRowIds.length
            ) {
                setSelectAll(true)
            } else {
                setSelectAll('indeterminate')
            }
        }

        useEffect(() => {
            updateSelectAllState(selectedRows)
        }, [currentData, selectedRows])

        useEffect(() => {
            const currentColumnCount = visibleColumns.length

            if (
                currentColumnCount > previousColumnCount &&
                scrollContainerRef.current
            ) {
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollLeft =
                            scrollContainerRef.current.scrollWidth
                    }
                }, 100)
            }

            setPreviousColumnCount(currentColumnCount)
        }, [visibleColumns.length, previousColumnCount])

        const handleSelectAll = (checked: boolean | 'indeterminate') => {
            const newSelectAll = checked === true

            const newSelectedRows = { ...selectedRows }

            if (newSelectAll) {
                currentData.forEach((row) => {
                    const rowId = String(row[idField])
                    newSelectedRows[rowId] = true
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

        const handleRowSelect = (rowId: unknown) => {
            const rowIdStr = String(rowId)
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

        const handleSort = (field: keyof T) => {
            const column = visibleColumns.find((col) => col.field === field)
            if (!column || column.isSortable === false) {
                return
            }

            let direction: SortDirection
            let newSortConfig: SortConfig | null

            if (sortConfig?.field === field) {
                if (sortConfig.direction === SortDirection.ASCENDING) {
                    direction = SortDirection.DESCENDING
                    newSortConfig = { field: field.toString(), direction }
                } else if (sortConfig.direction === SortDirection.DESCENDING) {
                    direction = SortDirection.NONE
                    newSortConfig = null
                } else {
                    direction = SortDirection.ASCENDING
                    newSortConfig = { field: field.toString(), direction }
                }
            } else {
                direction = SortDirection.ASCENDING
                newSortConfig = { field: field.toString(), direction }
            }

            applySortConfig(field, newSortConfig)
        }

        const handleSortAscending = (field: keyof T) => {
            const column = visibleColumns.find((col) => col.field === field)
            if (!column || column.isSortable === false) {
                return
            }

            const isCurrentlyAscending =
                sortConfig?.field === field &&
                sortConfig.direction === SortDirection.ASCENDING

            const newSortConfig = isCurrentlyAscending
                ? null
                : {
                      field: field.toString(),
                      direction: SortDirection.ASCENDING,
                  }

            applySortConfig(field, newSortConfig)
        }

        const handleSortDescending = (field: keyof T) => {
            const column = visibleColumns.find((col) => col.field === field)
            if (!column || column.isSortable === false) {
                return
            }

            const isCurrentlyDescending =
                sortConfig?.field === field &&
                sortConfig.direction === SortDirection.DESCENDING

            const newSortConfig = isCurrentlyDescending
                ? null
                : {
                      field: field.toString(),
                      direction: SortDirection.DESCENDING,
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
            setSelectedRows({})
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
            const newExpandedRows = {
                ...expandedRows,
                [rowIdStr]: !expandedRows[rowIdStr],
            }
            setExpandedRows(newExpandedRows)

            if (onRowExpansionChange) {
                const rowData = currentData.find(
                    (row) => row[idField] === rowId
                )
                if (rowData) {
                    onRowExpansionChange(
                        rowId,
                        !expandedRows[rowIdStr],
                        rowData
                    )
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

        const handleTableFocus = () => {
            if (!focusedCell && currentData.length > 0) {
                setFocusedCell({ rowIndex: 0, colIndex: 0 })
                setTimeout(() => {
                    const firstCell = document.querySelector(
                        '[data-row-index="0"][data-col-index="0"]'
                    ) as HTMLElement
                    if (firstCell) {
                        firstCell.focus()
                    }
                }, 0)
            }
        }

        const totalColumnsT =
            effectiveVisibleColumns.length +
            (enableRowSelection ? 1 : 0) +
            (enableRowExpansion ? 1 : 0) +
            ((enableInlineEdit || rowActions) &&
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

        return (
            <Block
                ref={ref}
                style={{
                    position: tableToken.position,
                    padding: tableToken.padding,
                    width: tableToken.width,
                    display: tableToken.display,
                    flexDirection: tableToken.flexDirection,
                }}
                data-table={title}
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
                    headerSlot1={
                        showSettings ? (
                            <>
                                <Menu
                                    items={formatOptions}
                                    alignment={MenuAlignment.END}
                                    sideOffset={8}
                                    alignOffset={-20}
                                    trigger={
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            leadingIcon={<Settings />}
                                            size={ButtonSize.SMALL}
                                            aria-label="Table settings"
                                        >
                                            Settings
                                        </Button>
                                    }
                                />
                            </>
                        ) : null
                    }
                    headerSlot2={headerSlot1}
                    headerSlot3={headerSlot2}
                    {...rest}
                />

                <Block
                    style={{
                        borderRadius: tableToken.dataTable.borderRadius,
                        border: tableToken.dataTable.border,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        maxHeight: tableToken.dataTable.maxHeight,
                        overflow: 'hidden',
                    }}
                >
                    <BulkActionBar
                        selectedCount={selectedCount}
                        onExport={exportToCSV}
                        onDeselectAll={handleDeselectAll}
                        customActions={renderBulkActions()}
                        showExport={bulkActions?.showExport}
                    />
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
                        {isLoading
                            ? 'Loading table data'
                            : currentData.length === 0
                              ? 'No data available'
                              : `Showing ${currentData.length} of ${totalRows} rows`}
                    </Block>

                    <Block
                        style={{
                            flex: 1,
                            position: 'relative',
                            minHeight: 0,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
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
                                        ...(tableBodyHeight
                                            ? {
                                                  height:
                                                      typeof tableBodyHeight ===
                                                      'number'
                                                          ? `${tableBodyHeight}px`
                                                          : tableBodyHeight,
                                                  overflowY: 'auto',
                                              }
                                            : {
                                                  flex: 1,
                                                  overflowY: 'auto',
                                              }),
                                        position: 'relative',
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
                                        onFocus={handleTableFocus}
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
                                            height:
                                                currentData.length === 0
                                                    ? '100%'
                                                    : 'auto',
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
                                            enableInlineEdit={enableInlineEdit}
                                            enableColumnManager={
                                                effectiveEnableColumnManager
                                            }
                                            enableColumnReordering={
                                                enableColumnReordering
                                            }
                                            showSkeleton={showSkeleton}
                                            isLoading={isLoading}
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
                                                enableRowSelection
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
                                        />
                                        {currentData.length > 0 ? (
                                            <TableBodyComponent
                                                currentData={currentData}
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
                                                enableColumnManager={
                                                    effectiveEnableColumnManager
                                                }
                                                enableRowExpansion={
                                                    enableRowExpansion
                                                }
                                                enableRowSelection={
                                                    enableRowSelection
                                                }
                                                columnFreeze={
                                                    effectiveColumnFreeze
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
                                                isLoading={
                                                    isLoading ||
                                                    (serverSidePagination &&
                                                        internalLoading)
                                                }
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
                                            />
                                        ) : (
                                            <tbody style={{ height: '100%' }}>
                                                <tr style={{ height: '100%' }}>
                                                    <td
                                                        colSpan={
                                                            visibleColumns.length +
                                                            (enableRowSelection
                                                                ? 1
                                                                : 0) +
                                                            (enableRowExpansion
                                                                ? 1
                                                                : 0) +
                                                            (enableInlineEdit
                                                                ? 1
                                                                : 0) +
                                                            (enableColumnManager
                                                                ? 1
                                                                : 0)
                                                        }
                                                        role="status"
                                                        aria-live="polite"
                                                        aria-atomic="true"
                                                        style={{
                                                            padding: '0',
                                                            height: '100%',
                                                            color: tableToken
                                                                .dataTable.table
                                                                .body.cell
                                                                .color,
                                                            fontSize:
                                                                tableToken
                                                                    .dataTable
                                                                    .table.body
                                                                    .cell
                                                                    .fontSize,
                                                        }}
                                                    >
                                                        <Block
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                minHeight:
                                                                    emptyStateMinHeight,
                                                                backgroundColor:
                                                                    FOUNDATION_THEME
                                                                        .colors
                                                                        .gray[0],
                                                            }}
                                                        >
                                                            {isLoading ? (
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    justifyContent="center"
                                                                    gap={
                                                                        FOUNDATION_THEME
                                                                            .unit[8]
                                                                    }
                                                                >
                                                                    <Loader2
                                                                        size={
                                                                            FOUNDATION_THEME
                                                                                .unit[20]
                                                                        }
                                                                        className="animate-spin"
                                                                        style={{
                                                                            animation:
                                                                                'spin 1s linear infinite',
                                                                        }}
                                                                    />
                                                                    <span>
                                                                        Loading
                                                                        data...
                                                                    </span>
                                                                </Block>
                                                            ) : (
                                                                'No data available'
                                                            )}
                                                        </Block>
                                                    </td>
                                                </tr>
                                            </tbody>
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
                    </Block>

                    {showFooter && (
                        <TableFooter
                            pagination={pagination}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalRows={totalRows}
                            isLoading={isLoading}
                            showSkeleton={showSkeleton}
                            hasData={currentData.length > 0}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    )}
                </Block>

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
