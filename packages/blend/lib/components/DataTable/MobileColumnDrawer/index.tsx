import React from 'react'
import { ColumnDefinition } from '../types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { FOUNDATION_THEME } from '../../../tokens'
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
} from '../../Drawer'

export interface MobileColumnDrawerProps<T extends Record<string, unknown>> {
    isOpen: boolean
    onClose: () => void
    row: T
    overflowColumns: ColumnDefinition<T>[]
    getDisplayValue?: (value: unknown, column: ColumnDefinition<T>) => unknown
}

const MobileColumnDrawer: React.FC<
    MobileColumnDrawerProps<Record<string, unknown>>
> = ({ isOpen, onClose, row, overflowColumns, getDisplayValue }) => {
    return (
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
                    <Block
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding={FOUNDATION_THEME.unit[16]}
                    >
                        <PrimitiveText
                            fontSize={
                                FOUNDATION_THEME.font.size.heading.md.fontSize
                            }
                            fontWeight={FOUNDATION_THEME.font.weight[600]}
                            color={FOUNDATION_THEME.colors.gray[900]}
                        >
                            Insights
                        </PrimitiveText>
                    </Block>

                    <DrawerBody noPadding>
                        <Block
                            display="flex"
                            flexDirection="column"
                            gap={FOUNDATION_THEME.unit[8]}
                            padding={FOUNDATION_THEME.unit[16]}
                        >
                            {overflowColumns.map((column) => {
                                const value = row[column.field]
                                let displayValue = getDisplayValue
                                    ? getDisplayValue(value, column)
                                    : value

                                // Handle date column objects
                                if (
                                    value &&
                                    typeof value === 'object' &&
                                    'date' in value
                                ) {
                                    const dateObj = value as {
                                        date: string
                                        format?: string
                                    }
                                    const date = new Date(dateObj.date)
                                    displayValue = date.toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        }
                                    )
                                }

                                // Handle dropdown column objects
                                if (
                                    value &&
                                    typeof value === 'object' &&
                                    'selectedValue' in value
                                ) {
                                    const dropdownObj = value as {
                                        selectedValue: string
                                        options: Array<{
                                            label: string
                                            value: string
                                        }>
                                    }
                                    const selectedOption =
                                        dropdownObj.options.find(
                                            (opt) =>
                                                opt.value ===
                                                dropdownObj.selectedValue
                                        )
                                    displayValue =
                                        selectedOption?.label ||
                                        dropdownObj.selectedValue
                                }

                                return (
                                    <Block
                                        key={String(column.field)}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        padding={`${FOUNDATION_THEME.unit[12]} 0`}
                                        borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                    >
                                        <PrimitiveText
                                            fontSize={
                                                FOUNDATION_THEME.font.size.body
                                                    .md.fontSize
                                            }
                                            fontWeight={
                                                FOUNDATION_THEME.font
                                                    .weight[500]
                                            }
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            style={{
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                flex: '0 0 auto',
                                            }}
                                        >
                                            {column.header}
                                        </PrimitiveText>

                                        <PrimitiveText
                                            fontSize={
                                                FOUNDATION_THEME.font.size.body
                                                    .md.fontSize
                                            }
                                            fontWeight={
                                                FOUNDATION_THEME.font
                                                    .weight[500]
                                            }
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[900]
                                            }
                                            style={{
                                                wordBreak: 'break-word',
                                                lineHeight: '1.4',
                                                textAlign: 'right',
                                                flex: '1 1 auto',
                                                marginLeft:
                                                    FOUNDATION_THEME.unit[16],
                                            }}
                                        >
                                            {displayValue != null
                                                ? String(displayValue)
                                                : '-'}
                                        </PrimitiveText>
                                    </Block>
                                )
                            })}
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileColumnDrawer
