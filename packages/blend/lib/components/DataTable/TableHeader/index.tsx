import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { ChevronsUpDown, Edit2 } from 'lucide-react'
import { styled } from 'styled-components'
import type { DraggableAttributes } from '@dnd-kit/core'
import type { useSortable } from '@dnd-kit/sortable'

import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../../tokens'
import { Popover } from '../../Popover'
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
import { ColumnManager } from '../ColumnManager'
import { TableTokenType } from '../dataTable.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { Tooltip, TooltipSide, TooltipAlign, TooltipSize } from '../../Tooltip'
import Skeleton from '../../Skeleton/Skeleton'

import { TableHeaderProps } from './types'
import { SortDirection } from '../types'
import {
    createSortHandlers,
    createFilterHandlers,
    SortState,
    FilterState,
} from './handlers'
import { getPopoverAlignment, getFrozenColumnStyles } from './utils'
import { ColumnFilter } from './FilterComponents'
import { ColumnType } from '../types'
import { getColumnTypeConfig } from '../columnTypes'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from '../../Drawer'
import { DraggableColumnHeader } from './DraggableColumnHeader'

const FilterIcon = styled(ChevronsUpDown)`
    cursor: pointer;
    color: ${FOUNDATION_THEME.colors.gray[400]};
    transition: color 0.2s ease;

    &:hover {
        color: ${FOUNDATION_THEME.colors.gray[600]};
    }
`

const EditIcon = styled(Edit2)`
    cursor: pointer;
    color: ${FOUNDATION_THEME.colors.gray[400]};

    &:hover {
        color: ${FOUNDATION_THEME.colors.gray[600]};
    }
`

const TableHeader = forwardRef<
    HTMLTableSectionElement,
    TableHeaderProps<Record<string, unknown>>
>(
    (
        {
            visibleColumns,
            allVisibleColumns,
            initialColumns,
            selectAll,
            sortConfig,
            enableInlineEdit = false,
            enableColumnManager = true,
            enableColumnReordering = false,
            showSkeleton = false,
            isLoading = false,
            columnManagerMaxSelections,
            columnManagerAlwaysSelected,
            columnManagerPrimaryAction,
            columnManagerSecondaryAction,
            columnManagerWidth,
            enableRowExpansion = false,
            enableRowSelection = true,
            rowActions,
            data,
            columnFreeze = 0,
            mobileConfig,
            mobileOverflowColumns = [],
            onMobileOverflowClick,
            onSort,
            onSortAscending,
            onSortDescending,
            onSelectAll,
            onColumnChange,
            onHeaderChange,
            onColumnFilter,
            getColumnWidth,
        },
        ref
    ) => {
        const isDisabled = showSkeleton || isLoading
        const [editingField, setEditingField] = useState<string | null>(null)
        const [hoveredField, setHoveredField] = useState<string | null>(null)
        const editableRef = useRef<HTMLDivElement>(null)

        const [sortState, setSortState] = useState<SortState>({
            currentSortField: sortConfig?.field || null,
            currentSortDirection: sortConfig?.direction || SortDirection.NONE,
        })

        const [filterState, setFilterState] = useState<FilterState>({
            columnSearchValues: {},
            columnSelectedValues: {},
        })

        const [openPopovers, setOpenPopovers] = useState<
            Record<string, boolean>
        >({})

        const tableToken = useResponsiveTokens<TableTokenType>('TABLE')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isMobile = breakPointLabel === 'sm'

        const sortHandlers = createSortHandlers(
            sortState,
            isDisabled ? () => {} : onSort,
            isDisabled ? () => {} : onSortAscending,
            isDisabled ? () => {} : onSortDescending
        )
        const filterHandlers = createFilterHandlers(
            isDisabled ? () => {} : setFilterState
        )

        useEffect(() => {
            setSortState({
                currentSortField: sortConfig?.field || null,
                currentSortDirection:
                    sortConfig?.direction || SortDirection.NONE,
            })
        }, [sortConfig])

        useEffect(() => {
            const handleScroll = (e: Event) => {
                const target = e.target as Element
                if (target) {
                    const popoverContent =
                        target.closest('[data-radix-popper-content-wrapper]') ||
                        target.closest('[role="dialog"]') ||
                        target.closest('.popover-content')

                    if (popoverContent) return
                }

                setOpenPopovers({})
            }

            const handleWheel = (e: Event) => {
                const target = e.target as Element
                if (target) {
                    const popoverContent =
                        target.closest('[data-radix-popper-content-wrapper]') ||
                        target.closest('[role="dialog"]') ||
                        target.closest('.popover-content')

                    if (popoverContent) return
                }

                setOpenPopovers({})
            }

            const scrollContainers: Element[] = []

            if (ref && typeof ref === 'object' && ref.current) {
                const thead = ref.current
                const table = thead.closest('table')

                if (table) {
                    let parent = table.parentElement
                    while (parent && parent !== document.body) {
                        const styles = window.getComputedStyle(parent)
                        if (
                            styles.overflow === 'auto' ||
                            styles.overflow === 'scroll' ||
                            styles.overflowX === 'auto' ||
                            styles.overflowX === 'scroll' ||
                            styles.overflowY === 'auto' ||
                            styles.overflowY === 'scroll'
                        ) {
                            scrollContainers.push(parent)
                        }
                        parent = parent.parentElement
                    }
                }
            }
            const listeners: (() => void)[] = []

            scrollContainers.forEach((container) => {
                container.addEventListener('scroll', handleScroll, {
                    passive: true,
                })
                container.addEventListener('wheel', handleWheel, {
                    passive: true,
                })
                listeners.push(() => {
                    container.removeEventListener('scroll', handleScroll)
                    container.removeEventListener('wheel', handleWheel)
                })
            })

            document.addEventListener('scroll', handleScroll, { passive: true })
            document.addEventListener('wheel', handleWheel, { passive: true })
            window.addEventListener('scroll', handleScroll, { passive: true })
            window.addEventListener('wheel', handleWheel, { passive: true })

            listeners.push(() => {
                document.removeEventListener('scroll', handleScroll)
                document.removeEventListener('wheel', handleWheel)
                window.removeEventListener('scroll', handleScroll)
                window.removeEventListener('wheel', handleWheel)
            })
            return () => {
                listeners.forEach((cleanup) => cleanup())
            }
        }, [ref])

        useEffect(() => {
            if (editingField && editableRef.current) {
                editableRef.current.focus()
                const range = document.createRange()
                const selection = window.getSelection()
                range.selectNodeContents(editableRef.current)
                range.collapse(false)
                selection?.removeAllRanges()
                selection?.addRange(range)
            }
        }, [editingField])

        const handleHeaderEdit = (field: string) => {
            setEditingField(field)
        }

        const handleHeaderSave = (field: string, newValue?: string) => {
            const valueToSave =
                newValue || editableRef.current?.textContent || ''
            const trimmedValue = valueToSave.trim()
            const currentColumn = visibleColumns.find(
                (col) => String(col.field) === field
            )

            if (currentColumn && trimmedValue !== currentColumn.header) {
                const updatedColumns = visibleColumns.map((col) =>
                    String(col.field) === field
                        ? { ...col, header: trimmedValue }
                        : col
                )

                onHeaderChange?.(
                    field as keyof Record<string, unknown>,
                    trimmedValue
                )
                onColumnChange?.(updatedColumns)
            }
            setEditingField(null)
        }

        const handleHeaderKeyDown = (e: React.KeyboardEvent, field: string) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                handleHeaderSave(field, e.currentTarget.textContent || '')
            } else if (e.key === 'Escape') {
                setEditingField(null)
            }
        }

        const tableHeaderContent = (
            <thead
                ref={ref}
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor:
                        tableToken.dataTable.table.header.backgroundColor,
                    borderBottom:
                        tableToken.dataTable.table.header.borderBottom,
                    height: tableToken.dataTable.table.header.height,
                }}
            >
                <tr
                    style={{
                        ...tableToken.dataTable.table.header.row,
                    }}
                >
                    {enableRowExpansion && (
                        <th
                            scope="col"
                            aria-label="Expand row"
                            style={{
                                ...tableToken.dataTable.table.header.cell,
                                width: '50px',
                                minWidth: '50px',
                                maxWidth: '50px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                boxSizing: 'border-box',
                                borderBottom:
                                    tableToken.dataTable.table.header
                                        .borderBottom,
                                borderTopLeftRadius:
                                    tableToken.dataTable.borderRadius,
                                ...(columnFreeze > 0 && {
                                    position: 'sticky',
                                    left: '0px',
                                    zIndex: 9,
                                    backgroundColor:
                                        tableToken.dataTable.table.header
                                            .backgroundColor,
                                }),
                            }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            />
                        </th>
                    )}

                    {enableRowSelection && (
                        <th
                            scope="col"
                            aria-label="Select all rows"
                            style={{
                                ...tableToken.dataTable.table.header.cell,
                                width: '60px',
                                minWidth: '60px',
                                maxWidth: '60px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                boxSizing: 'border-box',
                                borderBottom:
                                    tableToken.dataTable.table.header
                                        .borderBottom,
                                ...(!enableRowExpansion && {
                                    borderTopLeftRadius:
                                        tableToken.dataTable.borderRadius,
                                }),
                                ...(columnFreeze > 0 && {
                                    position: 'sticky',
                                    left: enableRowExpansion ? '50px' : '0px',
                                    zIndex: 9,
                                    backgroundColor:
                                        tableToken.dataTable.table.header
                                            .backgroundColor,
                                }),
                            }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={FOUNDATION_THEME.unit[40]}
                                style={{
                                    height: '100%',
                                    ...(!enableRowExpansion && {
                                        borderTopLeftRadius:
                                            tableToken.dataTable.borderRadius,
                                    }),
                                    overflow: 'hidden',
                                }}
                            >
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={onSelectAll}
                                    size={CheckboxSize.MEDIUM}
                                    disabled={isDisabled}
                                />
                            </Block>
                        </th>
                    )}

                    {visibleColumns.map((column, index) => {
                        const columnStyles = getColumnWidth(column, index)
                        const isEditing = editingField === String(column.field)
                        const columnConfig = getColumnTypeConfig(
                            column.type || ColumnType.TEXT
                        )

                        const frozenStyles = getFrozenColumnStyles(
                            index,
                            columnFreeze,
                            enableRowExpansion,
                            enableRowSelection,
                            visibleColumns,
                            getColumnWidth,
                            tableToken.dataTable.table.header.backgroundColor ||
                                '#ffffff'
                        )

                        const isLastColumn =
                            !enableColumnManager &&
                            !(
                                (enableInlineEdit || rowActions) &&
                                !(
                                    mobileConfig?.isMobile &&
                                    mobileConfig?.enableColumnOverflow
                                )
                            ) &&
                            !(
                                mobileConfig?.enableColumnOverflow &&
                                mobileOverflowColumns.length > 0
                            ) &&
                            index === visibleColumns.length - 1

                        // Disable dragging for frozen columns
                        const isDraggable =
                            enableColumnReordering && index >= columnFreeze

                        const headerStyle = {
                            ...tableToken.dataTable.table.header.cell,
                            ...(column.isSortable &&
                                tableToken.dataTable.table.header.sortable),
                            ...columnStyles,
                            ...frozenStyles,
                            // Ensure border bottom is always present
                            borderBottom:
                                tableToken.dataTable.table.header.borderBottom,
                            ...(isLastColumn && {
                                borderTopRightRadius:
                                    tableToken.dataTable.borderRadius,
                            }),
                        }

                        const headerContent = (dragHandleProps?: {
                            listeners?: ReturnType<
                                typeof useSortable
                            >['listeners']
                            attributes?: DraggableAttributes
                        }) => (
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="8px"
                                width="100%"
                                minWidth={0}
                                onMouseEnter={() =>
                                    setHoveredField(String(column.field))
                                }
                                onMouseLeave={() => setHoveredField(null)}
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    minWidth={0}
                                    flexGrow={1}
                                    overflow="hidden"
                                >
                                    {isEditing ? (
                                        <Block
                                            ref={editableRef}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) =>
                                                handleHeaderSave(
                                                    String(column.field),
                                                    e.currentTarget
                                                        .textContent || ''
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleHeaderKeyDown(
                                                    e,
                                                    String(column.field)
                                                )
                                            }
                                            style={{
                                                minWidth: 0,
                                                flex: 1,
                                                outline: 'none',
                                                cursor: 'text',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {column.header}
                                        </Block>
                                    ) : (
                                        <Block
                                            display="flex"
                                            minWidth={0}
                                            flexGrow={1}
                                            position="relative"
                                            gap={
                                                tableToken.dataTable.table
                                                    .header.filter.gap
                                            }
                                        >
                                            <Block
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="flex-start"
                                                minWidth={0}
                                                flexGrow={1}
                                                style={{
                                                    cursor: isDraggable
                                                        ? 'grab'
                                                        : 'default',
                                                }}
                                                {...(isDraggable &&
                                                dragHandleProps
                                                    ? dragHandleProps.listeners
                                                    : {})}
                                            >
                                                {isDisabled ? (
                                                    <Skeleton
                                                        variant="pulse"
                                                        loading
                                                        width="80%"
                                                        height="16px"
                                                        borderRadius="4px"
                                                    />
                                                ) : (
                                                    <Tooltip
                                                        content={column.header}
                                                        side={TooltipSide.TOP}
                                                        align={
                                                            TooltipAlign.START
                                                        }
                                                        size={TooltipSize.SMALL}
                                                        delayDuration={500}
                                                    >
                                                        <PrimitiveText
                                                            style={{
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                                whiteSpace:
                                                                    'nowrap',
                                                                minWidth: 0,
                                                                width: '100%',
                                                                display:
                                                                    'block',
                                                                cursor: isDraggable
                                                                    ? 'grab'
                                                                    : 'default',
                                                                fontSize:
                                                                    tableToken
                                                                        .dataTable
                                                                        .table
                                                                        .header
                                                                        .cell
                                                                        .fontSize,
                                                                fontWeight:
                                                                    tableToken
                                                                        .dataTable
                                                                        .table
                                                                        .header
                                                                        .cell
                                                                        .fontWeight,
                                                                lineHeight: 1.2,
                                                            }}
                                                        >
                                                            {column.header}
                                                        </PrimitiveText>
                                                    </Tooltip>
                                                )}
                                                {column.headerSubtext &&
                                                    (isDisabled ? (
                                                        <Skeleton
                                                            variant="pulse"
                                                            loading
                                                            width="60%"
                                                            height="12px"
                                                            borderRadius="4px"
                                                            style={{
                                                                marginTop:
                                                                    '4px',
                                                            }}
                                                        />
                                                    ) : (
                                                        <Tooltip
                                                            content={
                                                                column.headerSubtext
                                                            }
                                                            side={
                                                                TooltipSide.TOP
                                                            }
                                                            align={
                                                                TooltipAlign.START
                                                            }
                                                            size={
                                                                TooltipSize.SMALL
                                                            }
                                                            delayDuration={500}
                                                        >
                                                            <PrimitiveText
                                                                data-element="table-header-sub-title"
                                                                data-id={
                                                                    column.headerSubtext
                                                                }
                                                                style={{
                                                                    overflow:
                                                                        'hidden',
                                                                    textOverflow:
                                                                        'ellipsis',
                                                                    whiteSpace:
                                                                        'nowrap',
                                                                    minWidth: 0,
                                                                    width: '100%',
                                                                    display:
                                                                        'block',
                                                                    cursor: isDraggable
                                                                        ? 'grab'
                                                                        : 'default',
                                                                    fontSize:
                                                                        tableToken
                                                                            .dataTable
                                                                            .table
                                                                            .header
                                                                            .filter
                                                                            .groupLabelFontSize,
                                                                    color: tableToken
                                                                        .dataTable
                                                                        .table
                                                                        .header
                                                                        .filter
                                                                        .groupLabelColor,
                                                                    lineHeight: 1.2,
                                                                    marginTop:
                                                                        '2px',
                                                                }}
                                                            >
                                                                {
                                                                    column.headerSubtext
                                                                }
                                                            </PrimitiveText>
                                                        </Tooltip>
                                                    ))}
                                            </Block>
                                            {enableInlineEdit && (
                                                <Block
                                                    data-element="edit-icon"
                                                    as="span"
                                                    className="edit-icon-wrapper"
                                                    display="flex"
                                                    alignItems="center"
                                                    opacity={
                                                        hoveredField ===
                                                        String(column.field)
                                                            ? 1
                                                            : 0
                                                    }
                                                    transition="opacity 0.2s"
                                                    zIndex={2}
                                                    flexShrink={0}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleHeaderEdit(
                                                            String(column.field)
                                                        )
                                                    }}
                                                >
                                                    <EditIcon size={14} />
                                                </Block>
                                            )}
                                        </Block>
                                    )}
                                </Block>

                                {((columnConfig.supportsSorting &&
                                    column.isSortable !== false) ||
                                    columnConfig.supportsFiltering) &&
                                    !isDisabled && (
                                        <Block
                                            data-element="sorting-icon"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexShrink={0}
                                            width="16px"
                                            height="16px"
                                            onClick={(e) => e.stopPropagation()}
                                            _focus={{ outline: 'none' }}
                                            _focusVisible={{ outline: 'none' }}
                                            position="relative"
                                        >
                                            {(() => {
                                                const fieldKey = String(
                                                    column.field
                                                )
                                                const hasSort =
                                                    sortState.currentSortField ===
                                                        fieldKey &&
                                                    sortState.currentSortDirection !==
                                                        SortDirection.NONE
                                                const hasFilter = (() => {
                                                    const selectedValues =
                                                        filterState
                                                            .columnSelectedValues[
                                                            fieldKey
                                                        ]
                                                    if (!selectedValues)
                                                        return false

                                                    if (
                                                        Array.isArray(
                                                            selectedValues
                                                        )
                                                    ) {
                                                        return (
                                                            selectedValues.length >
                                                            0
                                                        )
                                                    }
                                                    if (
                                                        typeof selectedValues ===
                                                            'object' &&
                                                        selectedValues !==
                                                            null &&
                                                        'min' in
                                                            selectedValues &&
                                                        'max' in selectedValues
                                                    ) {
                                                        return true // Range filter
                                                    }
                                                    return false
                                                })()

                                                return (
                                                    (hasSort || hasFilter) && (
                                                        <Block
                                                            position="absolute"
                                                            top="-2px"
                                                            right="-2px"
                                                            width="6px"
                                                            height="6px"
                                                            borderRadius="50%"
                                                            backgroundColor={
                                                                FOUNDATION_THEME
                                                                    .colors
                                                                    .red[500]
                                                            }
                                                            zIndex={1}
                                                        />
                                                    )
                                                )
                                            })()}

                                            {isMobile ? (
                                                // Mobile: Use Drawer wrapper
                                                <Drawer
                                                    open={
                                                        openPopovers[
                                                            String(column.field)
                                                        ] || false
                                                    }
                                                    onOpenChange={(open) => {
                                                        if (open) {
                                                            setOpenPopovers({
                                                                [String(
                                                                    column.field
                                                                )]: true,
                                                            })
                                                        } else {
                                                            setOpenPopovers(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [String(
                                                                        column.field
                                                                    )]: false,
                                                                })
                                                            )
                                                        }
                                                    }}
                                                    direction="bottom"
                                                    modal={true}
                                                    dismissible={true}
                                                    showHandle={true}
                                                >
                                                    <DrawerTrigger>
                                                        <PrimitiveButton
                                                            type="button"
                                                            aria-label={`Filter ${column.header}`}
                                                            style={{
                                                                background:
                                                                    'transparent',
                                                                border: 'none',
                                                                padding: 0,
                                                                cursor: 'pointer',
                                                                display:
                                                                    'inline-flex',
                                                                alignItems:
                                                                    'center',
                                                                justifyContent:
                                                                    'center',
                                                            }}
                                                        >
                                                            <FilterIcon
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </PrimitiveButton>
                                                    </DrawerTrigger>
                                                    <DrawerPortal>
                                                        <DrawerOverlay />
                                                        <DrawerContent
                                                            contentDriven={true}
                                                        >
                                                            <DrawerBody
                                                                noPadding
                                                            >
                                                                <ColumnFilter
                                                                    column={
                                                                        column
                                                                    }
                                                                    data={data}
                                                                    tableToken={
                                                                        tableToken
                                                                    }
                                                                    sortHandlers={
                                                                        sortHandlers
                                                                    }
                                                                    filterHandlers={
                                                                        filterHandlers
                                                                    }
                                                                    filterState={
                                                                        filterState
                                                                    }
                                                                    sortState={
                                                                        sortState
                                                                    }
                                                                    onColumnFilter={
                                                                        onColumnFilter
                                                                    }
                                                                    onPopoverClose={() => {
                                                                        setOpenPopovers(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                [String(
                                                                                    column.field
                                                                                )]:
                                                                                    false,
                                                                            })
                                                                        )
                                                                    }}
                                                                />
                                                            </DrawerBody>
                                                        </DrawerContent>
                                                    </DrawerPortal>
                                                </Drawer>
                                            ) : (
                                                <Popover
                                                    trigger={
                                                        <PrimitiveButton
                                                            type="button"
                                                            aria-label={`Filter ${column.header}`}
                                                            style={{
                                                                background:
                                                                    'transparent',
                                                                border: 'none',
                                                                padding: 0,
                                                                cursor: 'pointer',
                                                                display:
                                                                    'inline-flex',
                                                                alignItems:
                                                                    'center',
                                                                justifyContent:
                                                                    'center',
                                                            }}
                                                        >
                                                            <FilterIcon
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </PrimitiveButton>
                                                    }
                                                    maxWidth={220}
                                                    minWidth={220}
                                                    side="bottom"
                                                    align={getPopoverAlignment(
                                                        index,
                                                        visibleColumns.length
                                                    )}
                                                    sideOffset={20}
                                                    open={
                                                        openPopovers[
                                                            String(column.field)
                                                        ] || false
                                                    }
                                                    onOpenChange={(open) => {
                                                        if (open) {
                                                            setOpenPopovers({
                                                                [String(
                                                                    column.field
                                                                )]: true,
                                                            })
                                                        } else {
                                                            setOpenPopovers(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [String(
                                                                        column.field
                                                                    )]: false,
                                                                })
                                                            )
                                                        }
                                                    }}
                                                >
                                                    <ColumnFilter
                                                        column={column}
                                                        data={data}
                                                        tableToken={tableToken}
                                                        sortHandlers={
                                                            sortHandlers
                                                        }
                                                        filterHandlers={
                                                            filterHandlers
                                                        }
                                                        filterState={
                                                            filterState
                                                        }
                                                        sortState={sortState}
                                                        onColumnFilter={
                                                            onColumnFilter
                                                        }
                                                        onPopoverClose={() => {
                                                            setOpenPopovers(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [String(
                                                                        column.field
                                                                    )]: false,
                                                                })
                                                            )
                                                        }}
                                                    />
                                                </Popover>
                                            )}
                                        </Block>
                                    )}
                            </Block>
                        )

                        if (isDraggable && !isMobile) {
                            const sortDirection =
                                sortState.currentSortField ===
                                String(column.field)
                                    ? sortState.currentSortDirection
                                    : SortDirection.NONE
                            const ariaSortValue =
                                sortDirection === SortDirection.ASCENDING
                                    ? 'ascending'
                                    : sortDirection === SortDirection.DESCENDING
                                      ? 'descending'
                                      : 'none'

                            return (
                                <DraggableColumnHeader
                                    key={String(column.field)}
                                    id={String(column.field)}
                                    scope="col"
                                    aria-sort={
                                        column.isSortable !== false
                                            ? ariaSortValue
                                            : undefined
                                    }
                                    aria-label={column.header}
                                    style={headerStyle}
                                    data-element="table-header"
                                    data-id={column.header}
                                    disabled={false}
                                >
                                    {(dragHandleProps) =>
                                        headerContent(dragHandleProps)
                                    }
                                </DraggableColumnHeader>
                            )
                        }

                        const sortDirection =
                            sortState.currentSortField === String(column.field)
                                ? sortState.currentSortDirection
                                : SortDirection.NONE
                        const ariaSortValue =
                            sortDirection === SortDirection.ASCENDING
                                ? 'ascending'
                                : sortDirection === SortDirection.DESCENDING
                                  ? 'descending'
                                  : 'none'

                        return (
                            <th
                                key={String(column.field)}
                                scope="col"
                                aria-sort={
                                    column.isSortable !== false
                                        ? ariaSortValue
                                        : undefined
                                }
                                aria-label={column.header}
                                style={headerStyle}
                                data-element="table-header"
                                data-id={column.header}
                            >
                                {headerContent()}
                            </th>
                        )
                    })}

                    {(enableInlineEdit || rowActions) &&
                        !(
                            mobileConfig?.isMobile &&
                            mobileConfig?.enableColumnOverflow
                        ) && (
                            <th
                                scope="col"
                                aria-label="Actions"
                                style={{
                                    ...tableToken.dataTable.table.header.cell,
                                    width: '200px',
                                    maxWidth: '200px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    boxSizing: 'border-box',
                                    borderBottom:
                                        tableToken.dataTable.table.header
                                            .borderBottom,
                                    ...(!enableColumnManager &&
                                        !(
                                            mobileConfig?.enableColumnOverflow &&
                                            mobileOverflowColumns.length > 0
                                        ) && {
                                            borderTopRightRadius:
                                                tableToken.dataTable
                                                    .borderRadius,
                                        }),
                                }}
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                >
                                    <PrimitiveText
                                        as="span"
                                        style={{
                                            fontSize:
                                                FOUNDATION_THEME.font.size.body
                                                    .sm.fontSize,
                                        }}
                                    >
                                        Actions
                                    </PrimitiveText>
                                </Block>
                            </th>
                        )}

                    {mobileConfig?.enableColumnOverflow &&
                        mobileOverflowColumns.length > 0 &&
                        onMobileOverflowClick && (
                            <th
                                scope="col"
                                aria-label="View more columns"
                                style={{
                                    ...tableToken.dataTable.table.header.cell,
                                    width: '40px',
                                    minWidth: '40px',
                                    maxWidth: '40px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    boxSizing: 'border-box',
                                    borderBottom:
                                        tableToken.dataTable.table.header
                                            .borderBottom,
                                    ...(!enableColumnManager && {
                                        borderTopRightRadius:
                                            tableToken.dataTable.borderRadius,
                                    }),
                                }}
                            ></th>
                        )}

                    {enableColumnManager && (
                        <th
                            scope="col"
                            aria-label="Column manager"
                            style={{
                                ...tableToken.dataTable.table.header.cell,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                boxSizing: 'border-box',
                                position: 'sticky',
                                right: 0,
                                backgroundColor:
                                    tableToken.dataTable.table.header
                                        .backgroundColor,
                                width: FOUNDATION_THEME.unit[48],
                                minWidth: FOUNDATION_THEME.unit[48],
                                maxWidth: FOUNDATION_THEME.unit[48],
                                borderBottom:
                                    tableToken.dataTable.table.header
                                        .borderBottom,
                                borderTopRightRadius:
                                    tableToken.dataTable.borderRadius,
                            }}
                        >
                            <Block position="relative">
                                <ColumnManager
                                    columns={initialColumns}
                                    visibleColumns={
                                        allVisibleColumns || visibleColumns
                                    }
                                    onColumnChange={onColumnChange}
                                    maxSelections={columnManagerMaxSelections}
                                    alwaysSelectedColumns={
                                        columnManagerAlwaysSelected
                                    }
                                    columnManagerPrimaryAction={
                                        columnManagerPrimaryAction
                                    }
                                    columnManagerSecondaryAction={
                                        columnManagerSecondaryAction
                                    }
                                    multiSelectWidth={columnManagerWidth}
                                    disabled={isDisabled}
                                />
                            </Block>
                        </th>
                    )}
                </tr>
            </thead>
        )

        // Return thead (DndContext is now in DataTable)
        return tableHeaderContent
    }
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
