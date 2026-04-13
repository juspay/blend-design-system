import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Modal from '../../Modal/Modal'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import Button from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/types'
import SingleSelect from '../../SingleSelect/SingleSelect'
import {
    SelectMenuAlignment,
    SelectMenuSize,
    SelectMenuVariant,
} from '../../SingleSelect/types'
import MultiValueInput from '../../Inputs/MultiValueInput/MultiValueInput'
import { TextInputSize } from '../../Inputs/TextInput/types'
import Menu from '../../Menu/Menu'
import { MenuAlignment, MenuGroupType } from '../../Menu/types'
import DataTable from '../DataTable'
import { ColumnDefinition, ColumnType, PivotAggregationType } from '../types'
import { TableTokenType } from '../dataTable.tokens'
import { downloadCSV } from '../utils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'
import { PivotTableModalProps } from './types'
import { getPivotFieldOptions, normalizePivotValue } from './utils'

const NoScrollbar = styled(Block)`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`

const PivotTableModal = forwardRef(
    <T extends Record<string, unknown>>(
        {
            isOpen,
            onClose,
            data,
            columns,
            title = 'Pivot Table',
            description = 'Build pivot view from base table fields.',
            showFilters = false,
            showExport = true,
            initialConfig,
            previewColumns,
            previewRows,
            onConfigChange,
            onExport,
        }: PivotTableModalProps<T>,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const tableToken = useResponsiveTokens<TableTokenType>('TABLE')
        const [rowFields, setRowFields] = useState<Array<keyof T>>(
            initialConfig?.rows || []
        )
        const [columnFields, setColumnFields] = useState<Array<keyof T>>(
            initialConfig?.columns || []
        )
        const [valueConfigs, setValueConfigs] = useState(
            initialConfig?.values || []
        )
        const [filterConfigs, setFilterConfigs] = useState(
            initialConfig?.filters || []
        )
        const [selectedRowField, setSelectedRowField] = useState<string>('')
        const [selectedColumnField, setSelectedColumnField] =
            useState<string>('')
        const [selectedValueField, setSelectedValueField] = useState<string>('')
        const [selectedValueAgg, setSelectedValueAgg] = useState<string>(
            PivotAggregationType.SUM
        )
        const [selectedFilterField, setSelectedFilterField] =
            useState<string>('')
        const [filterInputValue, setFilterInputValue] = useState<string>('')

        const fieldOptions = useMemo(
            () => getPivotFieldOptions(columns),
            [columns]
        )
        const fieldSelectItems = useMemo(
            () => [
                {
                    items: fieldOptions.map((item) => ({
                        label: item.label,
                        value: item.key,
                    })),
                },
            ],
            [fieldOptions]
        )
        const aggregationItems = useMemo(
            () => [
                {
                    items: Object.values(PivotAggregationType).map((item) => ({
                        label: item.toUpperCase(),
                        value: item,
                    })),
                },
            ],
            []
        )

        const pivotConfigState = useMemo(
            () => ({
                rows: rowFields,
                columns: columnFields,
                values: valueConfigs,
                filters: filterConfigs,
            }),
            [rowFields, columnFields, valueConfigs, filterConfigs]
        )
        const configSignature = useMemo(
            () =>
                JSON.stringify({
                    rows: rowFields,
                    columns: columnFields,
                    values: valueConfigs,
                    filters: filterConfigs,
                }),
            [rowFields, columnFields, valueConfigs, filterConfigs]
        )
        const lastEmittedConfigRef = useRef<string>('')
        const onConfigChangeRef = useRef(onConfigChange)

        useEffect(() => {
            onConfigChangeRef.current = onConfigChange
        }, [onConfigChange])

        useEffect(() => {
            if (!isOpen) return
            if (lastEmittedConfigRef.current === configSignature) return
            lastEmittedConfigRef.current = configSignature
            onConfigChangeRef.current?.(pivotConfigState)
        }, [isOpen, configSignature, pivotConfigState])

        useEffect(() => {
            if (!isOpen) {
                lastEmittedConfigRef.current = ''
            }
        }, [isOpen])

        const previewTableColumns: ColumnDefinition<Record<string, unknown>>[] =
            useMemo(
                () =>
                    (previewColumns || []).map((column) => ({
                        field: column.key,
                        header: column.label,
                        type: ColumnType.TEXT,
                        isSortable: true,
                        minWidth: '170px',
                        maxWidth: '280px',
                    })),
                [previewColumns]
            )

        const addRowField = () => {
            if (!selectedRowField) return
            const field = selectedRowField as keyof T
            if (!rowFields.includes(field)) {
                setRowFields((prev) => [...prev, field])
            }
            setSelectedRowField('')
        }

        const addColumnField = () => {
            if (!selectedColumnField) return
            const field = selectedColumnField as keyof T
            if (!columnFields.includes(field)) {
                setColumnFields((prev) => [...prev, field])
            }
            setSelectedColumnField('')
        }

        const addValueField = () => {
            if (!selectedValueField) return
            setValueConfigs((prev) => [
                ...prev,
                {
                    field: selectedValueField as keyof T,
                    aggregation: selectedValueAgg as PivotAggregationType,
                },
            ])
            setSelectedValueField('')
        }

        const addFilterField = () => {
            if (!selectedFilterField) return
            const field = selectedFilterField as keyof T
            if (!filterConfigs.some((item) => item.field === field)) {
                setFilterConfigs((prev) => [
                    ...prev,
                    {
                        field,
                        selectedValues: [],
                    },
                ])
            }
            setSelectedFilterField('')
        }

        const exportPivotTable = () => {
            if (!previewRows?.length || !previewColumns?.length) return

            if (onExport) {
                onExport(pivotConfigState)
                return
            }

            const csvHeader = previewColumns
                .map((column) => `"${column.label}"`)
                .join(',')
            const csvRows = previewRows.map((row) =>
                previewColumns
                    .map(
                        (column) =>
                            `"${String(row[column.key] ?? '').replace(/"/g, '""')}"`
                    )
                    .join(',')
            )

            downloadCSV(
                [csvHeader, ...csvRows].join('\n'),
                `pivot-table-${new Date().toISOString().split('T')[0]}.csv`
            )
        }

        const sectionMenuItems = (
            action: () => void,
            label: string
        ): MenuGroupType[] => [
            {
                items: [{ label, onClick: action }],
            },
        ]

        return (
            <Modal
                ref={ref}
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                subtitle={description}
                minWidth="80vw"
                maxWidth="90vw"
                maxHeight={String(tableToken.dataTable.maxHeight || '90vh')}
                showFooter={false}
                isCustom
            >
                <NoScrollbar
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '360px 1fr',
                        height: '76vh',
                        overflow: 'hidden',
                    }}
                >
                    <NoScrollbar
                        style={{
                            borderRight: tableToken.dataTable.border,
                            padding: tableToken.padding,
                            overflow: 'auto',
                            backgroundColor:
                                tableToken.dataTable.table.header
                                    .backgroundColor,
                        }}
                    >
                        <PrimitiveText
                            style={{ fontWeight: 600, fontSize: '14px' }}
                        >
                            Pivot Configuration
                        </PrimitiveText>

                        <Block
                            style={{
                                marginTop: FOUNDATION_THEME.unit[12],
                                padding:
                                    tableToken.dataTable.table.body.cell
                                        .padding,
                                borderRadius: tableToken.dataTable.borderRadius,
                                backgroundColor:
                                    tableToken.dataTable.table.body
                                        .backgroundColor,
                                border: tableToken.dataTable.border,
                            }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <PrimitiveText style={{ fontWeight: 600 }}>
                                    Rows
                                </PrimitiveText>
                                <Menu
                                    items={sectionMenuItems(
                                        addRowField,
                                        'Add selected row field'
                                    )}
                                    alignment={MenuAlignment.END}
                                    trigger={
                                        <Button
                                            text="Add"
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                        />
                                    }
                                />
                            </Block>
                            <SingleSelect
                                placeholder="Select row field"
                                items={fieldSelectItems}
                                selected={selectedRowField}
                                onSelect={setSelectedRowField}
                                variant={SelectMenuVariant.CONTAINER}
                                size={SelectMenuSize.SMALL}
                                fullWidth
                                alignment={SelectMenuAlignment.START}
                            />
                            <NoScrollbar
                                display="flex"
                                gap={FOUNDATION_THEME.unit[6]}
                                style={{
                                    flexWrap: 'wrap',
                                    marginTop: FOUNDATION_THEME.unit[8],
                                    maxHeight: '76px',
                                    overflow: 'auto',
                                }}
                            >
                                {rowFields.map((field) => (
                                    <Button
                                        key={`row-${String(field)}`}
                                        text={String(field)}
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.SECONDARY}
                                        onClick={() =>
                                            setRowFields((prev) =>
                                                prev.filter(
                                                    (item) => item !== field
                                                )
                                            )
                                        }
                                    />
                                ))}
                            </NoScrollbar>
                        </Block>

                        <Block
                            style={{
                                marginTop: FOUNDATION_THEME.unit[12],
                                padding:
                                    tableToken.dataTable.table.body.cell
                                        .padding,
                                borderRadius: tableToken.dataTable.borderRadius,
                                backgroundColor:
                                    tableToken.dataTable.table.body
                                        .backgroundColor,
                                border: tableToken.dataTable.border,
                            }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <PrimitiveText style={{ fontWeight: 600 }}>
                                    Columns
                                </PrimitiveText>
                                <Menu
                                    items={sectionMenuItems(
                                        addColumnField,
                                        'Add selected column field'
                                    )}
                                    alignment={MenuAlignment.END}
                                    trigger={
                                        <Button
                                            text="Add"
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                        />
                                    }
                                />
                            </Block>
                            <SingleSelect
                                placeholder="Select column field"
                                items={fieldSelectItems}
                                selected={selectedColumnField}
                                onSelect={setSelectedColumnField}
                                variant={SelectMenuVariant.CONTAINER}
                                size={SelectMenuSize.SMALL}
                                fullWidth
                                alignment={SelectMenuAlignment.START}
                            />
                            <NoScrollbar
                                display="flex"
                                gap={FOUNDATION_THEME.unit[6]}
                                style={{
                                    flexWrap: 'wrap',
                                    marginTop: FOUNDATION_THEME.unit[8],
                                    maxHeight: '76px',
                                    overflow: 'auto',
                                }}
                            >
                                {columnFields.map((field) => (
                                    <Button
                                        key={`column-${String(field)}`}
                                        text={String(field)}
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.SECONDARY}
                                        onClick={() =>
                                            setColumnFields((prev) =>
                                                prev.filter(
                                                    (item) => item !== field
                                                )
                                            )
                                        }
                                    />
                                ))}
                            </NoScrollbar>
                        </Block>

                        <Block
                            style={{
                                marginTop: FOUNDATION_THEME.unit[12],
                                padding:
                                    tableToken.dataTable.table.body.cell
                                        .padding,
                                borderRadius: tableToken.dataTable.borderRadius,
                                backgroundColor:
                                    tableToken.dataTable.table.body
                                        .backgroundColor,
                                border: tableToken.dataTable.border,
                            }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <PrimitiveText style={{ fontWeight: 600 }}>
                                    Values
                                </PrimitiveText>
                                <Menu
                                    items={sectionMenuItems(
                                        addValueField,
                                        'Add selected value config'
                                    )}
                                    alignment={MenuAlignment.END}
                                    trigger={
                                        <Button
                                            text="Add"
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                        />
                                    }
                                />
                            </Block>
                            <Block
                                display="flex"
                                gap={FOUNDATION_THEME.unit[8]}
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <SingleSelect
                                    placeholder="Value field"
                                    items={fieldSelectItems}
                                    selected={selectedValueField}
                                    onSelect={setSelectedValueField}
                                    variant={SelectMenuVariant.CONTAINER}
                                    size={SelectMenuSize.SMALL}
                                    fullWidth
                                />
                                <SingleSelect
                                    placeholder="Aggregation"
                                    items={aggregationItems}
                                    selected={selectedValueAgg}
                                    onSelect={setSelectedValueAgg}
                                    variant={SelectMenuVariant.CONTAINER}
                                    size={SelectMenuSize.SMALL}
                                    fullWidth
                                />
                            </Block>
                            {valueConfigs.map((config, index) => (
                                <Block
                                    key={`${String(config.field)}-${index}`}
                                    style={{
                                        display: 'flex',
                                        gap: FOUNDATION_THEME.unit[8],
                                        marginTop: FOUNDATION_THEME.unit[4],
                                    }}
                                >
                                    <PrimitiveText
                                        style={{
                                            fontSize: '12px',
                                            flexGrow: 1,
                                            alignSelf: 'center',
                                        }}
                                    >
                                        {String(config.field)} (
                                        {config.aggregation})
                                    </PrimitiveText>
                                    <Button
                                        text="Remove"
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.SECONDARY}
                                        onClick={() =>
                                            setValueConfigs((prev) =>
                                                prev.filter(
                                                    (_, itemIndex) =>
                                                        itemIndex !== index
                                                )
                                            )
                                        }
                                    />
                                </Block>
                            ))}
                        </Block>

                        {showFilters && (
                            <Block
                                style={{
                                    marginTop: FOUNDATION_THEME.unit[12],
                                    padding:
                                        tableToken.dataTable.table.body.cell
                                            .padding,
                                    borderRadius:
                                        tableToken.dataTable.borderRadius,
                                    backgroundColor:
                                        tableToken.dataTable.table.body
                                            .backgroundColor,
                                    border: tableToken.dataTable.border,
                                }}
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    style={{
                                        marginBottom: FOUNDATION_THEME.unit[6],
                                    }}
                                >
                                    <PrimitiveText style={{ fontWeight: 600 }}>
                                        Filters
                                    </PrimitiveText>
                                    <Menu
                                        items={sectionMenuItems(
                                            addFilterField,
                                            'Add selected filter field'
                                        )}
                                        alignment={MenuAlignment.END}
                                        trigger={
                                            <Button
                                                text="Add"
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                            />
                                        }
                                    />
                                </Block>
                                <SingleSelect
                                    placeholder="Select filter field"
                                    items={fieldSelectItems}
                                    selected={selectedFilterField}
                                    onSelect={setSelectedFilterField}
                                    variant={SelectMenuVariant.CONTAINER}
                                    size={SelectMenuSize.SMALL}
                                    fullWidth
                                />
                                {filterConfigs.map((filterConfig) => {
                                    const option = fieldOptions.find(
                                        (item) =>
                                            item.key ===
                                            String(filterConfig.field)
                                    )
                                    if (!option) return null
                                    const uniqueValues = Array.from(
                                        new Set(
                                            data.map((row) =>
                                                normalizePivotValue(
                                                    row[option.key as keyof T]
                                                )
                                            )
                                        )
                                    )
                                    const selectedValues =
                                        filterConfig.selectedValues || []

                                    return (
                                        <Block
                                            key={`filter-${option.key}`}
                                            style={{
                                                marginTop:
                                                    FOUNDATION_THEME.unit[8],
                                            }}
                                        >
                                            <PrimitiveText>
                                                {option.label}
                                            </PrimitiveText>
                                            <MultiValueInput
                                                label=""
                                                value={filterInputValue}
                                                onChange={setFilterInputValue}
                                                tags={selectedValues}
                                                size={TextInputSize.SMALL}
                                                onTagAdd={(tag) => {
                                                    setFilterConfigs((prev) => {
                                                        const rest =
                                                            prev.filter(
                                                                (item) =>
                                                                    String(
                                                                        item.field
                                                                    ) !==
                                                                    option.key
                                                            )
                                                        return [
                                                            ...rest,
                                                            {
                                                                field: option.key as keyof T,
                                                                selectedValues:
                                                                    Array.from(
                                                                        new Set(
                                                                            [
                                                                                ...selectedValues,
                                                                                tag,
                                                                            ]
                                                                        )
                                                                    ),
                                                            },
                                                        ]
                                                    })
                                                }}
                                                onTagRemove={(tag) => {
                                                    setFilterConfigs((prev) => {
                                                        const rest =
                                                            prev.filter(
                                                                (item) =>
                                                                    String(
                                                                        item.field
                                                                    ) !==
                                                                    option.key
                                                            )
                                                        return [
                                                            ...rest,
                                                            {
                                                                field: option.key as keyof T,
                                                                selectedValues:
                                                                    selectedValues.filter(
                                                                        (
                                                                            existing
                                                                        ) =>
                                                                            existing !==
                                                                            tag
                                                                    ),
                                                            },
                                                        ]
                                                    })
                                                }}
                                                rightSlot={
                                                    <Menu
                                                        alignment={
                                                            MenuAlignment.END
                                                        }
                                                        items={[
                                                            {
                                                                items: uniqueValues.map(
                                                                    (
                                                                        value
                                                                    ) => ({
                                                                        label: value,
                                                                        onClick:
                                                                            () => {
                                                                                if (
                                                                                    selectedValues.includes(
                                                                                        value
                                                                                    )
                                                                                )
                                                                                    return
                                                                                setFilterConfigs(
                                                                                    (
                                                                                        prev
                                                                                    ) => {
                                                                                        const rest =
                                                                                            prev.filter(
                                                                                                (
                                                                                                    item
                                                                                                ) =>
                                                                                                    String(
                                                                                                        item.field
                                                                                                    ) !==
                                                                                                    option.key
                                                                                            )
                                                                                        return [
                                                                                            ...rest,
                                                                                            {
                                                                                                field: option.key as keyof T,
                                                                                                selectedValues:
                                                                                                    [
                                                                                                        ...selectedValues,
                                                                                                        value,
                                                                                                    ],
                                                                                            },
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            },
                                                                    })
                                                                ),
                                                            },
                                                        ]}
                                                        trigger={
                                                            <Button
                                                                text="+"
                                                                buttonType={
                                                                    ButtonType.SECONDARY
                                                                }
                                                                size={
                                                                    ButtonSize.SMALL
                                                                }
                                                            />
                                                        }
                                                    />
                                                }
                                            />
                                        </Block>
                                    )
                                })}
                            </Block>
                        )}
                    </NoScrollbar>

                    <NoScrollbar
                        style={{
                            padding: tableToken.padding,
                            overflow: 'auto',
                        }}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            style={{ marginBottom: FOUNDATION_THEME.unit[8] }}
                        >
                            <PrimitiveText style={{ fontWeight: 600 }}>
                                Pivot Table Preview
                            </PrimitiveText>
                            {showExport && (
                                <Button
                                    text="Export Pivot"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={exportPivotTable}
                                    disabled={
                                        !previewRows?.length ||
                                        !previewColumns?.length
                                    }
                                />
                            )}
                        </Block>
                        <DataTable
                            data={
                                (previewRows || []) as Record<string, unknown>[]
                            }
                            columns={previewTableColumns}
                            idField="__pivotId"
                            title="Pivot Preview"
                            enableSearch={false}
                            enableFiltering={false}
                            enableAdvancedFilter={false}
                            enableColumnManager={false}
                            enableColumnReordering={false}
                            enableRowExpansion={false}
                            enableRowSelection={false}
                            enableInlineEdit={false}
                            showHeader={false}
                            showToolbar={false}
                            showFooter={false}
                            getRowStyle={(row) =>
                                row.__pivotRowType === 'grand_total'
                                    ? {
                                          backgroundColor:
                                              tableToken.dataTable.table.header
                                                  .backgroundColor,
                                          fontWeight: 600,
                                      }
                                    : {}
                            }
                        />
                    </NoScrollbar>
                </NoScrollbar>
            </Modal>
        )
    }
)

PivotTableModal.displayName = 'PivotTableModal'

export default PivotTableModal
