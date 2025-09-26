import { Plus } from 'lucide-react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import { ColumnManagerProps } from './types'
import { useMobileDataTable } from './hooks/useMobileDataTable'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TableTokenType } from './dataTable.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { MultiSelect } from '../MultiSelect'
import {
    MultiSelectVariant,
    MultiSelectMenuAlignment,
    MultiSelectMenuSize,
    type MultiSelectMenuGroupType,
    MultiSelectMenuSide,
} from '../MultiSelect/types'
import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export const ColumnManager = <T extends Record<string, unknown>>({
    columns,
    visibleColumns,
    onColumnChange,
    maxSelections,
    alwaysSelectedColumns = [],
    columnManagerPrimaryAction,
    columnManagerSecondaryAction,
}: ColumnManagerProps<T>) => {
    const mobileConfig = useMobileDataTable()
    const tableTokens = useResponsiveTokens<TableTokenType>('TABLE')

    const managableColumns = columns.filter((col) => col.canHide !== false)

    const multiSelectItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: '',
            showSeparator: false,
            items: managableColumns.map((column) => ({
                label: column.header,
                value: String(column.field),
                alwaysSelected: alwaysSelectedColumns.includes(
                    String(column.field)
                ),
                tooltipProps: {
                    side: TooltipSide.LEFT,
                    align: TooltipAlign.CENTER,
                    size: TooltipSize.SMALL,
                    delayDuration: 300,
                },
            })),
        },
    ]

    const selectedColumnValues = visibleColumns.map((col) => String(col.field))

    const handleMultiSelectChange = (value: string) => {
        if (value === '') {
            // Handle deselect all - keep only always selected columns
            const alwaysSelectedCols = visibleColumns.filter((col) =>
                alwaysSelectedColumns.includes(String(col.field))
            )
            if (alwaysSelectedCols.length > 0) {
                onColumnChange(alwaysSelectedCols)
            } else if (visibleColumns.length > 1) {
                onColumnChange([visibleColumns[0]])
            }
        } else {
            const field = value as keyof T
            const isCurrentlyVisible = visibleColumns.some(
                (col) => col.field === field
            )
            const isAlwaysSelected = alwaysSelectedColumns.includes(
                String(field)
            )

            if (isCurrentlyVisible) {
                // Don't allow deselecting always selected columns
                if (!isAlwaysSelected && visibleColumns.length > 1) {
                    const newVisibleColumns = visibleColumns.filter(
                        (col) => col.field !== field
                    )
                    onColumnChange(newVisibleColumns)
                }
            } else {
                // Check max selections limit before adding
                const currentSelectableCount = visibleColumns.filter(
                    (col) => !alwaysSelectedColumns.includes(String(col.field))
                ).length

                if (
                    !maxSelections ||
                    currentSelectableCount < maxSelections ||
                    isAlwaysSelected
                ) {
                    const columnToAdd = columns.find(
                        (col) => col.field === field
                    )
                    if (columnToAdd) {
                        onColumnChange([...visibleColumns, columnToAdd])
                    }
                }
            }
        }
    }

    return (
        <Block>
            {mobileConfig.isMobile ? (
                <MultiSelect
                    label=""
                    side={MultiSelectMenuSide.BOTTOM}
                    placeholder="Select columns to display"
                    variant={MultiSelectVariant.CONTAINER}
                    size={MultiSelectMenuSize.MEDIUM}
                    items={multiSelectItems}
                    selectedValues={selectedColumnValues}
                    onChange={handleMultiSelectChange}
                    enableSearch={true}
                    enableSelectAll={false}
                    showItemDividers={true}
                    showHeaderBorder={false}
                    maxSelections={maxSelections}
                    minMenuWidth={250}
                    customTrigger={
                        <PrimitiveButton
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="auto"
                            height="auto"
                            cursor="pointer"
                            border="none"
                        >
                            <Plus
                                size={
                                    tableTokens.header.actionIcons
                                        .columnManagerIcon.width
                                }
                                color={FOUNDATION_THEME.colors.gray[400]}
                            />
                        </PrimitiveButton>
                    }
                    showActionButtons={true}
                    primaryAction={
                        columnManagerPrimaryAction
                            ? {
                                  ...columnManagerPrimaryAction,
                                  onClick: () =>
                                      columnManagerPrimaryAction.onClick(
                                          selectedColumnValues
                                      ),
                              }
                            : undefined
                    }
                    secondaryAction={columnManagerSecondaryAction}
                />
            ) : (
                <MultiSelect
                    label=""
                    placeholder="Manage Columns"
                    side={MultiSelectMenuSide.BOTTOM}
                    variant={MultiSelectVariant.NO_CONTAINER}
                    alignment={MultiSelectMenuAlignment.END}
                    size={MultiSelectMenuSize.SMALL}
                    items={multiSelectItems}
                    selectedValues={selectedColumnValues}
                    onChange={handleMultiSelectChange}
                    enableSearch={true}
                    enableSelectAll={false}
                    selectAllText="Select All Columns"
                    maxMenuHeight={400}
                    showHeaderBorder={false}
                    maxSelections={maxSelections}
                    minMenuWidth={250}
                    customTrigger={
                        <PrimitiveButton
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="auto"
                            height="auto"
                            cursor="pointer"
                            border="none"
                        >
                            <Plus
                                size={
                                    tableTokens.header.actionIcons
                                        .columnManagerIcon.width
                                }
                                color={FOUNDATION_THEME.colors.gray[400]}
                            />
                        </PrimitiveButton>
                    }
                    showActionButtons={true}
                    primaryAction={
                        columnManagerPrimaryAction
                            ? {
                                  ...columnManagerPrimaryAction,
                                  onClick: () =>
                                      columnManagerPrimaryAction.onClick(
                                          selectedColumnValues
                                      ),
                              }
                            : undefined
                    }
                    secondaryAction={columnManagerSecondaryAction}
                />
            )}
        </Block>
    )
}

ColumnManager.displayName = 'ColumnManager'
