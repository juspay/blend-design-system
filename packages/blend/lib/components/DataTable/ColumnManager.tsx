import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
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
    multiSelectWidth = 250,
    disabled = false,
}: ColumnManagerProps<T>) => {
    const mobileConfig = useMobileDataTable()
    const tableTokens = useResponsiveTokens<TableTokenType>('TABLE')
    const hasPrimaryAction = !!columnManagerPrimaryAction

    const [pendingSelectedColumns, setPendingSelectedColumns] = useState<
        string[]
    >(() => visibleColumns.map((col) => String(col.field)))
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (hasPrimaryAction && !isOpen) {
            setPendingSelectedColumns(
                visibleColumns.map((col) => String(col.field))
            )
        }
    }, [visibleColumns, hasPrimaryAction, isOpen])

    const managableColumns = columns.filter((col) => col.canHide !== false)
    const selectedColumnValues = hasPrimaryAction
        ? pendingSelectedColumns
        : visibleColumns.map((col) => String(col.field))

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

    const handleDeselectAll = () => {
        if (hasPrimaryAction) {
            setPendingSelectedColumns(alwaysSelectedColumns)
            return
        }

        const alwaysSelectedCols = visibleColumns.filter((col) =>
            alwaysSelectedColumns.includes(String(col.field))
        )

        if (alwaysSelectedCols.length > 0) {
            onColumnChange(alwaysSelectedCols)
        } else if (visibleColumns.length > 1) {
            onColumnChange([visibleColumns[0]])
        }
    }

    const handleColumnToggle = (field: string) => {
        if (hasPrimaryAction) {
            const isSelected = pendingSelectedColumns.includes(field)
            const isAlwaysSelected = alwaysSelectedColumns.includes(field)

            if (
                isSelected &&
                !isAlwaysSelected &&
                pendingSelectedColumns.length > 1
            ) {
                setPendingSelectedColumns((prev) =>
                    prev.filter((col) => col !== field)
                )
            } else if (!isSelected) {
                const selectableCount = pendingSelectedColumns.filter(
                    (col) => !alwaysSelectedColumns.includes(col)
                ).length

                const canAdd =
                    !maxSelections ||
                    selectableCount < maxSelections ||
                    isAlwaysSelected
                if (canAdd) {
                    setPendingSelectedColumns((prev) => [...prev, field])
                }
            }
            return
        }

        const isCurrentlyVisible = visibleColumns.some(
            (col) => col.field === field
        )
        const isAlwaysSelected = alwaysSelectedColumns.includes(field)

        if (
            isCurrentlyVisible &&
            !isAlwaysSelected &&
            visibleColumns.length > 1
        ) {
            const newVisibleColumns = visibleColumns.filter(
                (col) => col.field !== field
            )
            onColumnChange(newVisibleColumns)
        } else if (!isCurrentlyVisible) {
            const selectableCount = visibleColumns.filter(
                (col) => !alwaysSelectedColumns.includes(String(col.field))
            ).length

            const canAdd =
                !maxSelections ||
                selectableCount < maxSelections ||
                isAlwaysSelected
            if (canAdd) {
                const columnToAdd = columns.find((col) => col.field === field)
                if (columnToAdd) {
                    onColumnChange([...visibleColumns, columnToAdd])
                }
            }
        }
    }

    const handleMultiSelectChange = (value: string) => {
        if (value === '') {
            handleDeselectAll()
        } else {
            handleColumnToggle(value)
        }
    }

    const handlePrimaryActionClick = () => {
        if (!columnManagerPrimaryAction) return

        const newVisibleColumns = pendingSelectedColumns
            .map((fieldValue) =>
                columns.find((col) => String(col.field) === fieldValue)
            )
            .filter(Boolean) as typeof columns

        onColumnChange(newVisibleColumns)
        columnManagerPrimaryAction.onClick(pendingSelectedColumns)
        setIsOpen(false)
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (open && hasPrimaryAction) {
            setPendingSelectedColumns(
                visibleColumns.map((col) => String(col.field))
            )
        }
    }

    const customTrigger = (
        <PrimitiveButton
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="auto"
            height="auto"
            cursor={disabled ? 'not-allowed' : 'pointer'}
            border="none"
            disabled={disabled}
            aria-label="Manage columns"
            title="Manage columns"
            style={{
                opacity: disabled ? 0.4 : 1,
            }}
        >
            <Plus
                size={tableTokens.header.actionIcons.columnManagerIcon.width}
                color={FOUNDATION_THEME.colors.gray[400]}
                aria-hidden="true"
            />
        </PrimitiveButton>
    )

    const primaryAction = columnManagerPrimaryAction
        ? {
              ...columnManagerPrimaryAction,
              onClick: handlePrimaryActionClick,
          }
        : undefined

    const commonProps = {
        items: multiSelectItems,
        selectedValues: selectedColumnValues,
        onChange: handleMultiSelectChange,
        enableSearch: true,
        enableSelectAll: false,
        showHeaderBorder: false,
        maxSelections,
        minMenuWidth: multiSelectWidth,
        customTrigger,
        showActionButtons: true,
        primaryAction,
        secondaryAction: columnManagerSecondaryAction,
        disabled,
        open: isOpen,
        onOpenChange: handleOpenChange,
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
                    showItemDividers={true}
                    {...commonProps}
                />
            ) : (
                <MultiSelect
                    label=""
                    placeholder="Manage Columns"
                    side={MultiSelectMenuSide.BOTTOM}
                    variant={MultiSelectVariant.NO_CONTAINER}
                    alignment={MultiSelectMenuAlignment.END}
                    size={MultiSelectMenuSize.SMALL}
                    selectAllText="Select All Columns"
                    maxMenuHeight={400}
                    {...commonProps}
                />
            )}
        </Block>
    )
}

ColumnManager.displayName = 'ColumnManager'
