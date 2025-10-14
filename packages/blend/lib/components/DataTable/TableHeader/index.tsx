import { forwardRef, useState, useRef, useEffect } from 'react'
import { ChevronsUpDown, Edit2 } from 'lucide-react'
import { styled } from 'styled-components'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { FOUNDATION_THEME } from '../../../tokens'
import { Popover } from '../../Popover'
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
import { ColumnManager } from '../ColumnManager'
import { TableTokenType } from '../dataTable.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { Tooltip, TooltipSide, TooltipAlign, TooltipSize } from '../../Tooltip'

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
            enableInlineEdit = false,
            enableColumnManager = true,
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
            onSelectAll,
            onColumnChange,
            onHeaderChange,
            onColumnFilter,
            getColumnWidth,
        },
        ref
    ) => {
        const [editingField, setEditingField] = useState<string | null>(null)
        const [hoveredField, setHoveredField] = useState<string | null>(null)
        const [localColumns, setLocalColumns] = useState(visibleColumns)
        const editableRef = useRef<HTMLDivElement>(null)

        const [sortState, setSortState] = useState<SortState>({
            currentSortField: null,
            currentSortDirection: SortDirection.NONE,
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

        const sortHandlers = createSortHandlers(sortState, setSortState, onSort)
        const filterHandlers = createFilterHandlers(setFilterState)

        useEffect(() => {
            setLocalColumns(visibleColumns)
        }, [visibleColumns])

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
            const currentColumn = localColumns.find(
                (col) => String(col.field) === field
            )

            if (currentColumn && trimmedValue !== currentColumn.header) {
                const updatedColumns = localColumns.map((col) =>
                    String(col.field) === field
                        ? { ...col, header: trimmedValue }
                        : col
                )
                setLocalColumns(updatedColumns)

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

        return (
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
                            >
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={onSelectAll}
                                    size={CheckboxSize.MEDIUM}
                                />
                            </Block>
                        </th>
                    )}

                    {localColumns.map((column, index) => {
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
                            localColumns,
                            getColumnWidth,
                            tableToken.dataTable.table.header.backgroundColor ||
                                '#ffffff'
                        )

                        return (
                            <th
                                key={String(column.field)}
                                style={{
                                    ...tableToken.dataTable.table.header.cell,
                                    ...(column.isSortable &&
                                        tableToken.dataTable.table.header
                                            .sortable),
                                    ...columnStyles,
                                    ...frozenStyles,
                                    // Ensure border bottom is always present
                                    borderBottom:
                                        tableToken.dataTable.table.header
                                            .borderBottom,
                                }}
                            >
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
                                                >
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
                                                                cursor: 'default',
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
                                                    {column.headerSubtext && (
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
                                                                    cursor: 'default',
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
                                                    )}
                                                </Block>
                                                {enableInlineEdit && (
                                                    <Block
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
                                                                String(
                                                                    column.field
                                                                )
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
                                        columnConfig.supportsFiltering) && (
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexShrink={0}
                                            width="16px"
                                            height="16px"
                                            onClick={(e) => e.stopPropagation()}
                                            _focus={{ outline: 'none' }}
                                            _focusVisible={{ outline: 'none' }}
                                        >
                                            {isMobile ? (
                                                // Mobile: Use Drawer wrapper
                                                <Drawer
                                                    open={
                                                        openPopovers[
                                                            String(column.field)
                                                        ] || false
                                                    }
                                                    onOpenChange={(open) => {
                                                        setOpenPopovers(
                                                            (prev) => ({
                                                                ...prev,
                                                                [String(
                                                                    column.field
                                                                )]: open,
                                                            })
                                                        )
                                                    }}
                                                    direction="bottom"
                                                    modal={true}
                                                    dismissible={true}
                                                    showHandle={true}
                                                >
                                                    <DrawerTrigger>
                                                        <FilterIcon size={16} />
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
                                                        <FilterIcon size={16} />
                                                    }
                                                    maxWidth={220}
                                                    minWidth={220}
                                                    side="bottom"
                                                    align={getPopoverAlignment(
                                                        index,
                                                        localColumns.length
                                                    )}
                                                    sideOffset={20}
                                                    open={
                                                        openPopovers[
                                                            String(column.field)
                                                        ] || false
                                                    }
                                                    onOpenChange={(open) => {
                                                        setOpenPopovers(
                                                            (prev) => ({
                                                                ...prev,
                                                                [String(
                                                                    column.field
                                                                )]: open,
                                                            })
                                                        )
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
                            </th>
                        )
                    })}

                    {(enableInlineEdit || rowActions) &&
                        !(
                            mobileConfig?.isMobile &&
                            mobileConfig?.enableColumnOverflow
                        ) && (
                            <th
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
                                }}
                            ></th>
                        )}

                    {enableColumnManager && (
                        <th
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
                            }}
                        >
                            <Block position="relative">
                                <ColumnManager
                                    columns={initialColumns}
                                    visibleColumns={
                                        allVisibleColumns || localColumns
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
                                />
                            </Block>
                        </th>
                    )}
                </tr>
            </thead>
        )
    }
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
