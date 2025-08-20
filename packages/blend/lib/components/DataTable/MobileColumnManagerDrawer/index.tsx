import React, { useState, useMemo } from 'react'
import { ColumnDefinition } from '../types'
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
} from '../../Drawer'
import { Button, ButtonType, ButtonSize } from '../../Button'
import { MultiSelect } from '../../MultiSelect'
import { MultiSelectMenuGroupType } from '../../MultiSelect/types'

export interface MobileColumnManagerDrawerProps<
    T extends Record<string, unknown>,
> {
    isOpen: boolean
    onClose: () => void
    columns: ColumnDefinition<T>[]
    visibleColumns: ColumnDefinition<T>[]
    onColumnChange: (columns: ColumnDefinition<T>[]) => void
}

const MobileColumnManagerDrawer: React.FC<
    MobileColumnManagerDrawerProps<Record<string, unknown>>
> = ({ isOpen, onClose, columns, visibleColumns, onColumnChange }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(() =>
        visibleColumns.map((col) => String(col.field))
    )

    const multiSelectItems: MultiSelectMenuGroupType[] = useMemo(() => {
        return [
            {
                groupLabel: 'Available Columns',
                items: columns.map((column) => ({
                    label: column.header,
                    value: String(column.field),
                    subLabel: column.headerSubtext,
                })),
                showSeparator: false,
            },
        ]
    }, [columns])

    // Handle MultiSelect change
    const handleMultiSelectChange = (value: string) => {
        setSelectedValues((prev) => {
            if (prev.includes(value)) {
                return prev.filter((v) => v !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    // Handle clear all
    const handleClearAll = () => {
        setSelectedValues([])
    }

    // Handle apply changes
    const handleApply = () => {
        const newVisibleColumns = columns.filter((col) =>
            selectedValues.includes(String(col.field))
        )
        onColumnChange(newVisibleColumns)
        onClose()
    }

    // Handle cancel
    const handleCancel = () => {
        setSelectedValues(visibleColumns.map((col) => String(col.field)))
        onClose()
    }

    // Reset temp state when drawer opens
    React.useEffect(() => {
        if (isOpen) {
            setSelectedValues(visibleColumns.map((col) => String(col.field)))
        }
    }, [isOpen, visibleColumns])

    return (
        <Drawer
            open={isOpen}
            onOpenChange={handleCancel}
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
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[900]}
                            >
                                Add Columns
                            </PrimitiveText>
                        </Block>
                    </DrawerTitle>

                    <DrawerBody noPadding>
                        <Block
                            display="flex"
                            flexDirection="column"
                            height="100%"
                            maxHeight="70vh"
                        >
                            <Block
                                padding={`${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[20]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[20]}`}
                                style={{ flex: 1 }}
                            >
                                <MultiSelect
                                    label="Select Columns"
                                    placeholder="Choose columns to display"
                                    selectedValues={selectedValues}
                                    onChange={handleMultiSelectChange}
                                    items={multiSelectItems}
                                    enableSearch={true}
                                    searchPlaceholder="Search columns..."
                                    enableSelectAll={true}
                                    selectAllText="Select All Columns"
                                    useDrawerOnMobile={true}
                                />
                            </Block>

                            <Block
                                display="flex"
                                gap={FOUNDATION_THEME.unit[12]}
                                padding={`${FOUNDATION_THEME.unit[20]} ${FOUNDATION_THEME.unit[20]} ${FOUNDATION_THEME.unit[24]} ${FOUNDATION_THEME.unit[20]}`}
                                style={{
                                    borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[100]}`,
                                }}
                            >
                                <Block style={{ flex: 1 }}>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.MEDIUM}
                                        onClick={handleClearAll}
                                        text="Clear All"
                                    />
                                </Block>
                                <Block style={{ flex: 2 }}>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        onClick={handleApply}
                                        text="Apply"
                                    />
                                </Block>
                            </Block>
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileColumnManagerDrawer
