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
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
import { Button, ButtonType, ButtonSize } from '../../Button'
import { SearchInput } from '../../Inputs'

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
    const [searchQuery, setSearchQuery] = useState('')
    const [tempVisibleColumns, setTempVisibleColumns] =
        useState<ColumnDefinition<Record<string, unknown>>[]>(visibleColumns)

    // Filter columns based on search query
    const filteredColumns = useMemo(() => {
        if (!searchQuery.trim()) {
            return columns
        }
        return columns.filter(
            (column) =>
                column.header
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (column.headerSubtext &&
                    column.headerSubtext
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
        )
    }, [columns, searchQuery])

    // Handle column toggle
    const handleColumnToggle = (
        column: ColumnDefinition<Record<string, unknown>>
    ) => {
        const isCurrentlyVisible = tempVisibleColumns.some(
            (col) => col.field === column.field
        )

        if (isCurrentlyVisible) {
            // Remove column
            setTempVisibleColumns((prev) =>
                prev.filter((col) => col.field !== column.field)
            )
        } else {
            // Add column
            setTempVisibleColumns((prev) => [...prev, column])
        }
    }

    // Handle clear all
    const handleClearAll = () => {
        setTempVisibleColumns([])
    }

    // Handle apply changes
    const handleApply = () => {
        onColumnChange(tempVisibleColumns)
        onClose()
    }

    // Handle cancel
    const handleCancel = () => {
        setTempVisibleColumns(visibleColumns)
        setSearchQuery('')
        onClose()
    }

    // Reset temp state when drawer opens
    React.useEffect(() => {
        if (isOpen) {
            setTempVisibleColumns(visibleColumns)
            setSearchQuery('')
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
                            >
                                <SearchInput
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setSearchQuery(e.target.value)}
                                />
                            </Block>

                            <Block
                                style={{ flex: 1 }}
                                overflow="auto"
                                padding={`${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[20]}`}
                            >
                                {filteredColumns.map((column) => {
                                    const isVisible = tempVisibleColumns.some(
                                        (col) => col.field === column.field
                                    )

                                    return (
                                        <Block
                                            key={String(column.field)}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[0]}`}
                                            style={{
                                                borderBottom: `1px solid ${FOUNDATION_THEME.colors.gray[100]}`,
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                handleColumnToggle(column)
                                            }
                                        >
                                            <Block
                                                display="flex"
                                                alignItems="center"
                                                gap={FOUNDATION_THEME.unit[12]}
                                                style={{ flex: 1 }}
                                                minWidth={0}
                                            >
                                                {/* Column Icon/Placeholder */}
                                                <Block
                                                    width={
                                                        FOUNDATION_THEME
                                                            .unit[24]
                                                    }
                                                    height={
                                                        FOUNDATION_THEME
                                                            .unit[24]
                                                    }
                                                    backgroundColor={
                                                        FOUNDATION_THEME.colors
                                                            .purple[100]
                                                    }
                                                    borderRadius={
                                                        FOUNDATION_THEME.border
                                                            .radius[4]
                                                    }
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    flexShrink={0}
                                                >
                                                    <Block
                                                        width={
                                                            FOUNDATION_THEME
                                                                .unit[12]
                                                        }
                                                        height={
                                                            FOUNDATION_THEME
                                                                .unit[12]
                                                        }
                                                        backgroundColor={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .purple[400]
                                                        }
                                                        borderRadius={
                                                            FOUNDATION_THEME
                                                                .border
                                                                .radius[2]
                                                        }
                                                    />
                                                </Block>

                                                {/* Column Info */}
                                                <Block
                                                    display="flex"
                                                    flexDirection="column"
                                                    minWidth={0}
                                                    style={{ flex: 1 }}
                                                >
                                                    <PrimitiveText
                                                        fontSize={
                                                            FOUNDATION_THEME
                                                                .font.size.body
                                                                .md.fontSize
                                                        }
                                                        fontWeight={
                                                            FOUNDATION_THEME
                                                                .font
                                                                .weight[500]
                                                        }
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[900]
                                                        }
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace:
                                                                'nowrap',
                                                        }}
                                                    >
                                                        {column.header}
                                                    </PrimitiveText>
                                                    {column.headerSubtext && (
                                                        <PrimitiveText
                                                            fontSize={
                                                                FOUNDATION_THEME
                                                                    .font.size
                                                                    .body.sm
                                                                    .fontSize
                                                            }
                                                            fontWeight={
                                                                FOUNDATION_THEME
                                                                    .font
                                                                    .weight[400]
                                                            }
                                                            color={
                                                                FOUNDATION_THEME
                                                                    .colors
                                                                    .gray[500]
                                                            }
                                                            style={{
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            {
                                                                column.headerSubtext
                                                            }
                                                        </PrimitiveText>
                                                    )}
                                                </Block>
                                            </Block>

                                            {/* Checkbox */}
                                            <Checkbox
                                                checked={isVisible}
                                                onCheckedChange={() =>
                                                    handleColumnToggle(column)
                                                }
                                                size={CheckboxSize.MEDIUM}
                                            />
                                        </Block>
                                    )
                                })}
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
                                    >
                                        Clear All
                                    </Button>
                                </Block>
                                <Block style={{ flex: 2 }}>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        onClick={handleApply}
                                    >
                                        Apply
                                    </Button>
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
