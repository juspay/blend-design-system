import { useState } from 'react'
import { Plus } from 'lucide-react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import { ColumnManagerProps, ColumnDefinition } from './types'
import { useMobileDataTable } from './hooks/useMobileDataTable'
import MobileColumnManagerDrawer from './MobileColumnManagerDrawer'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TableTokenType } from './dataTable.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { MultiSelect } from '../MultiSelect'
import {
    MultiSelectVariant,
    MultiSelectMenuAlignment,
    MultiSelectMenuSize,
    type MultiSelectMenuGroupType,
} from '../MultiSelect/types'

export const ColumnManager = <T extends Record<string, unknown>>({
    columns,
    visibleColumns,
    onColumnChange,
}: ColumnManagerProps<T>) => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const mobileConfig = useMobileDataTable()
    const tableTokens = useResponsiveTokens<TableTokenType>('TABLE')

    const toggleColumnVisibility = (field: keyof T) => {
        const isCurrentlyVisible = visibleColumns.some(
            (col) => col.field === field
        )

        if (isCurrentlyVisible) {
            if (visibleColumns.length <= 1) return

            const newVisibleColumns = visibleColumns.filter(
                (col) => col.field !== field
            )
            onColumnChange(newVisibleColumns)
        } else {
            const columnToAdd = columns.find((col) => col.field === field)
            if (columnToAdd) {
                onColumnChange([...visibleColumns, columnToAdd])
            }
        }
    }

    const managableColumns = columns.filter((col) => col.canHide !== false)

    // Convert columns to MultiSelect format
    const multiSelectItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Manage Columns',
            showSeparator: false,
            items: managableColumns.map((column) => ({
                label: column.header,
                value: String(column.field),
            })),
        },
    ]

    // Get currently selected column values
    const selectedColumnValues = visibleColumns.map((col) => String(col.field))

    // Handle MultiSelect change
    const handleMultiSelectChange = (value: string) => {
        if (value === '') {
            // Clear all - but keep at least one column visible
            if (visibleColumns.length > 1) {
                onColumnChange([visibleColumns[0]])
            }
        } else {
            toggleColumnVisibility(value as keyof T)
        }
    }

    const handleButtonClick = () => {
        if (mobileConfig.isMobile) {
            setMobileDrawerOpen(true)
        }
    }

    return (
        <Block>
            {mobileConfig.isMobile ? (
                <>
                    <PrimitiveButton
                        onClick={handleButtonClick}
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
                                tableTokens.header.actionIcons.columnManagerIcon
                                    .width
                            }
                            color={FOUNDATION_THEME.colors.gray[400]}
                        />
                    </PrimitiveButton>
                    <MobileColumnManagerDrawer
                        isOpen={mobileDrawerOpen}
                        onClose={() => setMobileDrawerOpen(false)}
                        columns={
                            managableColumns as ColumnDefinition<
                                Record<string, unknown>
                            >[]
                        }
                        visibleColumns={
                            visibleColumns as ColumnDefinition<
                                Record<string, unknown>
                            >[]
                        }
                        onColumnChange={
                            onColumnChange as (
                                columns: ColumnDefinition<
                                    Record<string, unknown>
                                >[]
                            ) => void
                        }
                    />
                </>
            ) : (
                <MultiSelect
                    label=""
                    placeholder="Manage Columns"
                    variant={MultiSelectVariant.NO_CONTAINER}
                    alignment={MultiSelectMenuAlignment.END}
                    size={MultiSelectMenuSize.SMALL}
                    items={multiSelectItems}
                    selectedValues={selectedColumnValues}
                    onChange={handleMultiSelectChange}
                    enableSearch={false}
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
                />
            )}
        </Block>
    )
}

ColumnManager.displayName = 'ColumnManager'
