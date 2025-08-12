import React, { useState } from 'react'
import { ColumnDefinition, ColumnType, DropdownColumnProps } from '../types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { FOUNDATION_THEME } from '../../../tokens'
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    DrawerTitle,
    NestedSingleSelectDrawer,
} from '../../Drawer'
import { ChevronRight } from 'lucide-react'

export interface MobileColumnDrawerProps<T extends Record<string, unknown>> {
    isOpen: boolean
    onClose: () => void
    row: T
    overflowColumns: ColumnDefinition<T>[]
    getDisplayValue?: (value: unknown, column: ColumnDefinition<T>) => unknown
    onFieldChange?: (field: keyof T, value: unknown) => void
}

const MobileColumnDrawer: React.FC<
    MobileColumnDrawerProps<Record<string, unknown>>
> = ({
    isOpen,
    onClose,
    row,
    overflowColumns,
    getDisplayValue,
    onFieldChange,
}) => {
    const [nestedDrawerOpen, setNestedDrawerOpen] = useState(false)
    const [selectedDropdownColumn, setSelectedDropdownColumn] = useState<{
        column: ColumnDefinition<Record<string, unknown>>
        value: DropdownColumnProps
    } | null>(null)
    /**
     * Renders cell value using the exact same logic as table cells
     * This ensures consistency between desktop table and mobile drawer
     */
    const renderCellValue = (
        column: ColumnDefinition<Record<string, unknown>>,
        value: unknown
    ): React.ReactNode => {
        if (column.renderCell) {
            try {
                // @ts-expect-error error may occur if renderCell is not defined for the column
                return column.renderCell(value, row, 0)
            } catch (error) {
                console.warn('Error in column renderCell function:', error)
                return value != null ? String(value) : '-'
            }
        }

        if (getDisplayValue) {
            try {
                const displayValue = getDisplayValue(value, column)
                return displayValue != null ? String(displayValue) : '-'
            } catch (error) {
                console.warn('Error in getDisplayValue function:', error)
                return value != null ? String(value) : '-'
            }
        }
        return value != null ? String(value) : '-'
    }

    const handleDropdownClick = (
        column: ColumnDefinition<Record<string, unknown>>,
        value: DropdownColumnProps
    ) => {
        setSelectedDropdownColumn({ column, value })
        setNestedDrawerOpen(true)
    }

    const handleDropdownValueChange = (newValue: string) => {
        if (selectedDropdownColumn && onFieldChange) {
            const updatedDropdownValue = {
                ...selectedDropdownColumn.value,
                selectedValue: newValue,
            }
            onFieldChange(
                selectedDropdownColumn.column.field,
                updatedDropdownValue
            )
        }
    }

    const renderDrawerRow = (
        column: ColumnDefinition<Record<string, unknown>>
    ) => {
        const value = row[column.field]
        const isDropdown = column.type === ColumnType.DROPDOWN
        const dropdownValue = isDropdown ? (value as DropdownColumnProps) : null
        const renderedValue = renderCellValue(column, value)

        return (
            <Block
                key={String(column.field)}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{
                    minHeight: FOUNDATION_THEME.unit[32],
                    cursor: isDropdown ? 'pointer' : 'default',
                }}
                onClick={
                    isDropdown && dropdownValue
                        ? () => handleDropdownClick(column, dropdownValue)
                        : undefined
                }
            >
                {/* Column Label */}
                <PrimitiveText
                    fontSize={FOUNDATION_THEME.font.size.body.md.fontSize}
                    fontWeight={FOUNDATION_THEME.font.weight[400]}
                    color={FOUNDATION_THEME.colors.gray[500]}
                >
                    {column.header}
                </PrimitiveText>

                <Block
                    style={{
                        flex: '1 1 auto',
                        marginLeft: FOUNDATION_THEME.unit[16],
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: FOUNDATION_THEME.unit[8],
                    }}
                >
                    {typeof renderedValue === 'string' ||
                    typeof renderedValue === 'number' ? (
                        <PrimitiveText
                            fontSize={
                                FOUNDATION_THEME.font.size.body.md.fontSize
                            }
                            fontWeight={FOUNDATION_THEME.font.weight[500]}
                            color={FOUNDATION_THEME.colors.gray[700]}
                            style={{
                                wordBreak: 'break-word',
                                textAlign: 'right',
                            }}
                        >
                            {renderedValue}
                        </PrimitiveText>
                    ) : (
                        renderedValue
                    )}

                    {isDropdown && (
                        <ChevronRight
                            size={16}
                            color={FOUNDATION_THEME.colors.gray[400]}
                        />
                    )}
                </Block>
            </Block>
        )
    }

    return (
        <>
            <Drawer
                open={isOpen}
                onOpenChange={onClose}
                direction="bottom"
                modal={true}
                dismissible={true}
                showHandle={true}
            >
                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent contentDriven={true}>
                        <DrawerTitle>
                            <Block
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[20]}`}
                            >
                                <PrimitiveText
                                    fontSize={
                                        FOUNDATION_THEME.font.size.heading.md
                                            .fontSize
                                    }
                                    fontWeight={
                                        FOUNDATION_THEME.font.weight[600]
                                    }
                                    color={FOUNDATION_THEME.colors.gray[900]}
                                >
                                    Insights
                                </PrimitiveText>
                            </Block>
                        </DrawerTitle>

                        <DrawerBody noPadding>
                            <Block
                                display="flex"
                                flexDirection="column"
                                gap={FOUNDATION_THEME.unit[16]}
                                padding={`${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[20]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[20]}`}
                            >
                                {overflowColumns.map(renderDrawerRow)}
                            </Block>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>

            {selectedDropdownColumn && (
                <NestedSingleSelectDrawer
                    open={nestedDrawerOpen}
                    onOpenChange={setNestedDrawerOpen}
                    heading={selectedDropdownColumn.column.header}
                    description={`Select a ${selectedDropdownColumn.column.header.toLowerCase()}`}
                    items={[
                        {
                            items: selectedDropdownColumn.value.options.map(
                                (option) => ({
                                    value: String(option.value),
                                    label: option.label,
                                    slot1: option.icon,
                                    disabled: false,
                                })
                            ),
                        },
                    ]}
                    selectedValue={String(
                        selectedDropdownColumn.value.selectedValue
                    )}
                    onValueChange={handleDropdownValueChange}
                    onConfirm={() => {
                        setNestedDrawerOpen(false)
                        setSelectedDropdownColumn(null)
                    }}
                    onCancel={() => {
                        setNestedDrawerOpen(false)
                        setSelectedDropdownColumn(null)
                    }}
                    enableSearch={true}
                    searchPlaceholder="Search options..."
                />
            )}
        </>
    )
}

export default MobileColumnDrawer
