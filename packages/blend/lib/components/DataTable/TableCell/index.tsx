import { forwardRef } from 'react'
import { styled } from 'styled-components'
import { TableCellProps } from './types'
import { TableTokenType } from '../dataTable.tokens'
import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { FOUNDATION_THEME } from '../../../tokens'
import { useComponentToken } from '../../../context/useComponentToken'
import { ColumnType, DropdownColumnProps, DateColumnProps } from '../types'
import SingleSelect from '../../SingleSelect/SingleSelect'
import { SelectMenuVariant } from '../../Select'
import { SelectMenuGroupType } from '../../Select/types'

const StyledTableCell = styled.td<{
    width?: React.CSSProperties
    $hasCustomContent?: boolean
    $tableToken?: TableTokenType
}>`
    ${(props) =>
        props.$tableToken ? props.$tableToken.dataTable.table.body.cell : ''}
    box-sizing: border-box;
    max-width: 0;
`

const TableCell = forwardRef<
    HTMLTableCellElement,
    TableCellProps<Record<string, unknown>>
>(
    (
        {
            column,
            row,
            rowIndex,
            isEditing,
            currentValue,
            width,
            frozenStyles,
            onFieldChange,
            getDisplayValue,
        },
        ref
    ) => {
        const tableToken = useComponentToken('TABLE') as TableTokenType

        // Apply formatting if getDisplayValue is provided and we're not editing
        const displayValue =
            !isEditing && getDisplayValue
                ? getDisplayValue(currentValue, column)
                : currentValue

        const renderContent = () => {
            if (isEditing && column.isEditable) {
                if (column.type === ColumnType.DROPDOWN) {
                    const dropdownData = currentValue as DropdownColumnProps
                    if (dropdownData && dropdownData.options) {
                        const selectedOption = dropdownData.options.find(
                            (opt) => opt.value === dropdownData.selectedValue
                        )

                        const selectItems: SelectMenuGroupType[] = [
                            {
                                items: dropdownData.options.map((option) => ({
                                    label: option.label,
                                    value: String(option.value),
                                    slot1: option.icon || undefined,
                                })),
                                showSeparator: false,
                            },
                        ]

                        return (
                            <div style={{ width: '100%', minWidth: '150px' }}>
                                <SingleSelect
                                    label=""
                                    placeholder={
                                        dropdownData.placeholder || 'Select...'
                                    }
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    items={selectItems}
                                    selected={String(
                                        dropdownData.selectedValue || ''
                                    )}
                                    slot={selectedOption?.icon}
                                    onSelect={(value) => {
                                        const updatedDropdownData: DropdownColumnProps =
                                            {
                                                ...dropdownData,
                                                selectedValue: value,
                                            }
                                        console.log(
                                            '🔄 Dropdown option selected (editing):',
                                            { value, updatedDropdownData }
                                        )
                                        if (onFieldChange) {
                                            onFieldChange(updatedDropdownData)
                                            console.log(
                                                '✅ onFieldChange called (editing):',
                                                updatedDropdownData
                                            )
                                        }
                                    }}
                                    minWidth={150}
                                    maxWidth={250}
                                />
                            </div>
                        )
                    }
                }

                return (
                    <PrimitiveInput
                        value={currentValue != null ? String(currentValue) : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onFieldChange(e.target.value)
                        }
                        style={{
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            fontSize:
                                FOUNDATION_THEME.font.size.body.sm.fontSize,
                            fontFamily: 'inherit',
                            color: 'inherit',
                            padding: '4px 0',
                        }}
                    />
                )
            }

            if (column.type === ColumnType.DROPDOWN && !isEditing) {
                const dropdownData = displayValue as DropdownColumnProps
                if (dropdownData && dropdownData.options) {
                    const selectedOption = dropdownData.options.find(
                        (opt) => opt.value === dropdownData.selectedValue
                    )

                    const selectItems: SelectMenuGroupType[] = [
                        {
                            items: dropdownData.options.map((option) => ({
                                label: option.label,
                                value: String(option.value),
                                slot1: option.icon || undefined,
                            })),
                            showSeparator: false,
                        },
                    ]

                    return (
                        <div style={{ width: '100%', minWidth: '150px' }}>
                            <SingleSelect
                                label=""
                                placeholder={
                                    dropdownData.placeholder || 'Select...'
                                }
                                variant={SelectMenuVariant.NO_CONTAINER}
                                items={selectItems}
                                selected={String(
                                    dropdownData.selectedValue || ''
                                )}
                                slot={selectedOption?.icon}
                                onSelect={(value) => {
                                    const updatedDropdownData: DropdownColumnProps =
                                        {
                                            ...dropdownData,
                                            selectedValue: value,
                                        }
                                    if (onFieldChange) {
                                        onFieldChange(updatedDropdownData)
                                    }
                                }}
                                minWidth={150}
                                maxWidth={250}
                            />
                        </div>
                    )
                }
            }

            if (column.type === ColumnType.DATE && !isEditing) {
                const dateData = displayValue as DateColumnProps
                if (dateData && dateData.date) {
                    const date = new Date(dateData.date)
                    const showTime = dateData.showTime || false

                    const formatDate = (date: Date): string => {
                        if (isNaN(date.getTime())) return 'Invalid Date'

                        const options: Intl.DateTimeFormatOptions = {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        }

                        if (showTime) {
                            options.hour = '2-digit'
                            options.minute = '2-digit'
                        }

                        return new Intl.DateTimeFormat('en-US', options).format(
                            date
                        )
                    }

                    return (
                        <Block
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                lineHeight: '1.5',
                                cursor: 'default',
                            }}
                            title={formatDate(date)}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    fontSize:
                                        FOUNDATION_THEME.font.size.body.sm
                                            .fontSize,
                                    color: FOUNDATION_THEME.colors.gray[700],
                                }}
                            >
                                {formatDate(date)}
                            </span>
                        </Block>
                    )
                }
            }

            if (column.renderCell) {
                return (
                    <Block style={{ width: '100%' }}>
                        {(
                            column.renderCell as (
                                value: unknown,
                                row: unknown,
                                index: number
                            ) => React.ReactNode
                        )(displayValue, row, rowIndex)}
                    </Block>
                )
            }

            return (
                <Block
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        lineHeight: '1.5',
                        cursor: 'default',
                    }}
                    title={displayValue != null ? String(displayValue) : ''}
                >
                    <span
                        style={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {displayValue != null ? String(displayValue) : ''}
                    </span>
                </Block>
            )
        }

        return (
            <StyledTableCell
                ref={ref}
                $tableToken={tableToken}
                $hasCustomContent={
                    column.type === ColumnType.CUSTOM ||
                    column.type === ColumnType.REACT_ELEMENT ||
                    (isEditing && column.isEditable)
                }
                style={{
                    ...width,
                    ...frozenStyles,
                    verticalAlign: 'middle',
                    position: frozenStyles?.position || 'relative',
                }}
            >
                <Block
                    style={{
                        width: '100%',
                        minHeight: `${FOUNDATION_THEME.unit[36]}`,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {renderContent()}
                </Block>
            </StyledTableCell>
        )
    }
)

TableCell.displayName = 'TableCell'

export default TableCell
