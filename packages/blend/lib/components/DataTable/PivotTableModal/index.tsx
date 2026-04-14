import {
    CSSProperties,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { Check, Trash2 } from 'lucide-react'
import Modal from '../../Modal/Modal'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import Button from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/types'
import Tag from '../../Tags/Tag'
import { TagColor, TagSize, TagVariant } from '../../Tags/types'
import SingleSelect from '../../SingleSelect/SingleSelect'
import { SelectMenuSize, SelectMenuVariant } from '../../SingleSelect/types'
import Menu from '../../Menu/Menu'
import { MenuAlignment, MenuSide } from '../../Menu/types'
import { ColumnDefinition, ColumnType, PivotAggregationType } from '../types'
import { TableTokenType } from '../dataTable.tokens'
import { downloadCSV } from '../utils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'
import { PivotTableModalProps } from './types'
import {
    buildPivotPreview,
    getPivotFieldOptions,
    getSupportedAggregationsForField,
} from './utils'
import { NoScrollbar } from './pivotModal.styled'
import { getPivotModalStyleTokens } from './pivotModalStyleTokens'
import PivotPreviewPanel from './PivotPreviewPanel'

/**
 * Pivot Table Modal Component
 *
 * Provides a Google Sheets-like interface for configuring pivot tables
 * with four main areas: Rows, Columns, Values, and Filters
 */
const PivotTableModal = forwardRef<
    HTMLDivElement,
    PivotTableModalProps<Record<string, unknown>>
>(
    (
        {
            isOpen,
            onClose,
            columns,
            data,
            title = 'Pivot Table',
            description: subtitle,
            showExport = true,
            initialConfig,
            previewColumns,
            previewRows,
            onConfigChange,
            onExport,
            availableAggregations,
        }: PivotTableModalProps<Record<string, unknown>>,
        ref
    ) => {
        const tableToken = useResponsiveTokens('TABLE') as TableTokenType
        const pivot = useMemo(
            () => getPivotModalStyleTokens(FOUNDATION_THEME, tableToken),
            [tableToken]
        )
        const removeButtonStyle = useMemo(
            (): CSSProperties => ({
                minWidth: pivot.removeButton.minWidth,
                padding: pivot.removeButton.padding,
                borderRadius: pivot.removeButton.borderRadius,
                border: pivot.removeButton.border,
                background: pivot.removeButton.background,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: pivot.chip.transition,
            }),
            [pivot]
        )

        // State for pivot configuration
        const [rowFields, setRowFields] = useState<
            Array<keyof Record<string, unknown>>
        >(
            () =>
                (initialConfig?.rows as Array<keyof Record<string, unknown>>) ||
                []
        )
        const [columnFields, setColumnFields] = useState<
            Array<keyof Record<string, unknown>>
        >(
            () =>
                (initialConfig?.columns as Array<
                    keyof Record<string, unknown>
                >) || []
        )
        const [valueConfigs, setValueConfigs] = useState<
            Array<{
                field: keyof Record<string, unknown>
                aggregation: PivotAggregationType
            }>
        >(
            () =>
                (initialConfig?.values as Array<{
                    field: keyof Record<string, unknown>
                    aggregation: PivotAggregationType
                }>) || []
        )
        // State for value field selection
        const [selectedValueField, setSelectedValueField] =
            useState<keyof Record<string, unknown>>('')
        const [selectedValueAgg, setSelectedValueAgg] =
            useState<PivotAggregationType>(PivotAggregationType.SUM)

        // Compute field options from columns
        const fieldOptions = useMemo(
            () => getPivotFieldOptions(columns),
            [columns]
        )
        const columnTypeByField = useMemo(
            () =>
                new Map(
                    columns.map((column) => [String(column.field), column.type])
                ),
            [columns]
        )
        const allowedAggregations = useMemo(
            () => availableAggregations || Object.values(PivotAggregationType),
            [availableAggregations]
        )
        const supportedAggregationsByField = useMemo(() => {
            const map = new Map<string, PivotAggregationType[]>()
            fieldOptions.forEach((option) => {
                const supported = getSupportedAggregationsForField(
                    data,
                    option.key as keyof Record<string, unknown>,
                    allowedAggregations,
                    [ColumnType.NUMBER, ColumnType.SLIDER].includes(
                        columnTypeByField.get(option.key) as ColumnType
                    )
                )
                map.set(option.key, supported)
            })
            return map
        }, [fieldOptions, data, allowedAggregations, columnTypeByField])
        const selectedValueAggregationOptions = useMemo(() => {
            const fieldKey = String(selectedValueField || '')
            return supportedAggregationsByField.get(fieldKey) || []
        }, [selectedValueField, supportedAggregationsByField])
        const selectedValueAggregationItems = useMemo(
            () => [
                {
                    items: selectedValueAggregationOptions.map((item) => ({
                        label: item.toUpperCase(),
                        value: item,
                    })),
                },
            ],
            [selectedValueAggregationOptions]
        )
        const selectedValueMessage = useMemo(() => {
            if (!selectedValueField) {
                return 'Choose a value field to see supported operations.'
            }
            if (!selectedValueAggregationOptions.length) {
                return 'This field does not support pivot aggregations for the current dataset.'
            }
            if (
                selectedValueAggregationOptions.length === 1 &&
                selectedValueAggregationOptions[0] ===
                    PivotAggregationType.COUNT
            ) {
                return 'Only COUNT is available because this field has no numeric values.'
            }
            return null
        }, [selectedValueField, selectedValueAggregationOptions])

        const addRowField = (field: keyof Record<string, unknown>) => {
            if (field && !rowFields.includes(field)) {
                setRowFields((prev) => [...prev, field])
            }
        }

        const removeRowField = (field: keyof Record<string, unknown>) => {
            setRowFields((prev) => prev.filter((item) => item !== field))
        }

        const addColumnField = (field: keyof Record<string, unknown>) => {
            if (field && !columnFields.includes(field)) {
                setColumnFields((prev) => [...prev, field])
            }
        }

        const removeColumnField = (field: keyof Record<string, unknown>) => {
            setColumnFields((prev) => prev.filter((item) => item !== field))
        }

        const addValueField = () => {
            const supportedAggregations =
                supportedAggregationsByField.get(String(selectedValueField)) ||
                []
            if (
                selectedValueField &&
                !valueConfigs.some(
                    (item) => item.field === selectedValueField
                ) &&
                supportedAggregations.length > 0
            ) {
                const aggregation = supportedAggregations.includes(
                    selectedValueAgg
                )
                    ? selectedValueAgg
                    : supportedAggregations[0]
                setValueConfigs((prev) => [
                    ...prev,
                    {
                        field: selectedValueField,
                        aggregation,
                    },
                ])
                setSelectedValueField('')
            }
        }

        const removeValueField = (index: number) => {
            setValueConfigs((prev) => prev.filter((_, i) => i !== index))
        }

        const updateValueAggregation = (
            index: number,
            aggregation: PivotAggregationType
        ) => {
            setValueConfigs((prev) => {
                const newConfigs = [...prev]
                newConfigs[index].aggregation = aggregation
                return newConfigs
            })
        }

        const lastEmittedConfigRef = useRef<string>('')

        useEffect(() => {
            if (!isOpen) {
                lastEmittedConfigRef.current = ''
                return
            }

            const config = {
                rows: rowFields,
                columns: columnFields,
                values: valueConfigs,
            }
            const configString = JSON.stringify(config)

            if (lastEmittedConfigRef.current !== configString) {
                lastEmittedConfigRef.current = configString
                onConfigChange?.(config)
            }
        }, [isOpen, rowFields, columnFields, valueConfigs, onConfigChange])

        useEffect(() => {
            if (!selectedValueField) return
            if (
                selectedValueAggregationOptions.length > 0 &&
                !selectedValueAggregationOptions.includes(selectedValueAgg)
            ) {
                setSelectedValueAgg(selectedValueAggregationOptions[0])
            }
        }, [
            selectedValueField,
            selectedValueAggregationOptions,
            selectedValueAgg,
        ])
        useEffect(() => {
            setValueConfigs(
                (prev) =>
                    prev
                        .map((config) => {
                            const supported =
                                supportedAggregationsByField.get(
                                    String(config.field)
                                ) || []
                            if (!supported.length) return null
                            if (supported.includes(config.aggregation))
                                return config
                            return {
                                ...config,
                                aggregation: supported[0],
                            }
                        })
                        .filter(Boolean) as typeof prev
            )
        }, [supportedAggregationsByField])

        const exportPivotTable = () => {
            const exportColumns = effectivePreviewColumns
            const exportRows = effectivePreviewRows

            if (onExport) {
                onExport({
                    rows: rowFields,
                    columns: columnFields,
                    values: valueConfigs,
                })
                return
            }

            if (!exportRows || exportRows.length === 0) return

            const headers = exportColumns?.map((col) => `"${col.label}"`) || []
            const rows = exportRows.map((row) =>
                exportColumns?.map(
                    (col) =>
                        `"${String(row[col.key] ?? '').replace(/"/g, '""')}"`
                )
            )

            const csvContent = [
                headers.join(','),
                ...rows.map((r) => r?.join(',') || ''),
            ].join('\n')
            downloadCSV(csvContent, 'pivot-table.csv')
        }

        const effectivePreview = useMemo(() => {
            if (previewColumns?.length || previewRows?.length) {
                return {
                    columns: previewColumns || [],
                    rows: previewRows || [],
                }
            }

            return buildPivotPreview(
                data as Record<string, unknown>[],
                rowFields,
                columnFields,
                valueConfigs
            )
        }, [
            previewColumns,
            previewRows,
            data,
            rowFields,
            columnFields,
            valueConfigs,
        ])
        const effectivePreviewColumns = effectivePreview.columns
        const effectivePreviewRows = effectivePreview.rows

        const previewTableColumns: ColumnDefinition<Record<string, unknown>>[] =
            useMemo(
                () =>
                    effectivePreviewColumns.map((col) => ({
                        field: col.key,
                        header: col.label,
                        type: ColumnType.TEXT,
                    })),
                [effectivePreviewColumns]
            )

        const availableFieldsForRows = useMemo(
            () =>
                fieldOptions.filter(
                    (f) =>
                        !rowFields.includes(
                            f.key as keyof Record<string, unknown>
                        )
                ),
            [fieldOptions, rowFields]
        )

        const availableFieldsForColumns = useMemo(
            () =>
                fieldOptions.filter(
                    (f) =>
                        !columnFields.includes(
                            f.key as keyof Record<string, unknown>
                        )
                ),
            [fieldOptions, columnFields]
        )

        const availableFieldsForValues = useMemo(
            () =>
                fieldOptions.filter(
                    (f) => !valueConfigs.some((v) => String(v.field) === f.key)
                ),
            [fieldOptions, valueConfigs]
        )

        /**
         * Section title row (Rows / Columns / Values / Filters).
         */
        const renderSectionHeader = (
            icon: string,
            title: string,
            count: number
        ) => (
            <Block
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: pivot.spacing.iconBadgeGap,
                    marginBottom: pivot.spacing.sectionHeaderMarginBottom,
                }}
            >
                <Block
                    style={{
                        width: pivot.iconBadge.size,
                        height: pivot.iconBadge.size,
                        borderRadius: pivot.iconBadge.borderRadius,
                        backgroundColor:
                            tableToken.dataTable.table.header.backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <PrimitiveText
                        style={{
                            fontSize: pivot.iconBadge.glyphFontSize,
                            fontWeight: pivot.iconBadge.glyphFontWeight,
                            color: tableToken.dataTable.table.body.cell.color,
                        }}
                    >
                        {icon}
                    </PrimitiveText>
                </Block>
                <PrimitiveText
                    style={{
                        fontWeight: pivot.sectionLabel.fontWeight,
                        fontSize: pivot.sectionLabel.fontSize,
                        textTransform: pivot.sectionLabel.textTransform,
                        letterSpacing: pivot.sectionLabel.letterSpacing,
                    }}
                >
                    {title}
                </PrimitiveText>
                <Block style={{ flex: 1 }} />
                <PrimitiveText
                    style={{
                        fontSize: pivot.sectionCount.fontSize,
                        color: pivot.sectionCount.color,
                    }}
                >
                    {count} selected
                </PrimitiveText>
            </Block>
        )

        const renderEmptyState = (title: string, example: string) => (
            <Block
                style={{
                    textAlign: 'center',
                    padding: pivot.emptyState.padding,
                }}
            >
                <PrimitiveText
                    style={{
                        fontSize: pivot.emptyState.titleFontSize,
                        color: pivot.emptyState.titleColor,
                        marginBottom: pivot.emptyState.titleMarginBottom,
                    }}
                >
                    {title}
                </PrimitiveText>
                <PrimitiveText
                    style={{
                        fontSize: pivot.emptyState.exampleFontSize,
                        color: pivot.emptyState.exampleColor,
                    }}
                >
                    {example}
                </PrimitiveText>
            </Block>
        )

        const renderFieldTag = (
            key: string,
            field: string,
            onRemove: () => void
        ) => (
            <Tag
                key={key}
                text={field}
                variant={TagVariant.SUBTLE}
                color={TagColor.NEUTRAL}
                size={TagSize.SM}
                maxWidth="100%"
                rightSlot={
                    <button
                        type="button"
                        style={removeButtonStyle}
                        onClick={onRemove}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                pivot.removeButton.hoverBackground
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                pivot.removeButton.background
                        }}
                        aria-label={`Remove ${field}`}
                    >
                        <Trash2
                            size={pivot.removeButton.iconSize}
                            color={pivot.removeButton.iconColor}
                        />
                    </button>
                }
            />
        )

        const renderFieldSelector = (
            placeholder: string,
            options: { label: string; value: string }[],
            onSelect: (value: string) => void
        ) => (
            <Block
                style={{
                    marginTop: pivot.spacing.sectionHeaderMarginBottom,
                }}
            >
                <PrimitiveText
                    style={{
                        fontSize: pivot.fieldRowLabel.fontSize,
                        color: pivot.fieldRowLabel.color,
                        marginBottom: pivot.fieldRowLabel.marginBottom,
                    }}
                >
                    Add field:
                </PrimitiveText>
                <SingleSelect
                    placeholder={placeholder}
                    items={[
                        {
                            items: options.map((o) => ({
                                label: o.label,
                                value: o.value,
                            })),
                        },
                    ]}
                    selected=""
                    onSelect={(value) => value && onSelect(value as string)}
                    variant={SelectMenuVariant.CONTAINER}
                    size={SelectMenuSize.SMALL}
                    fullWidth
                />
            </Block>
        )

        /**
         * Right panel: maps column fields → pivot config; consumer computes preview from `onConfigChange`.
         */
        const renderConfiguration = () => (
            <NoScrollbar
                style={{
                    borderLeft: tableToken.dataTable.border,
                    padding: pivot.panelPadding,
                    overflow: 'auto',
                    backgroundColor: pivot.configPanelBackground,
                }}
            >
                <Block style={{ marginBottom: pivot.spacing.sectionGap }}>
                    {renderSectionHeader('↓', 'Rows', rowFields.length)}
                    <Block
                        style={{
                            minHeight:
                                rowFields.length === 0
                                    ? pivot.dropZone.emptyMinHeight
                                    : 'auto',
                            padding: pivot.dropZone.padding,
                            backgroundColor: pivot.dropZone.background,
                            borderRadius: pivot.dropZone.borderRadius,
                            border: pivot.dropZone.border,
                        }}
                    >
                        {rowFields.length === 0 ? (
                            renderEmptyState(
                                'Fields here become row labels',
                                'Example: Product, Region, Date'
                            )
                        ) : (
                            <Block
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: pivot.spacing.stackGap,
                                }}
                            >
                                {rowFields.map((field) =>
                                    renderFieldTag(
                                        `row-${String(field)}`,
                                        String(field),
                                        () => removeRowField(field)
                                    )
                                )}
                            </Block>
                        )}
                    </Block>
                    {availableFieldsForRows.length > 0 &&
                        renderFieldSelector(
                            'Choose a field...',
                            availableFieldsForRows.map((f) => ({
                                label: f.label,
                                value: f.key,
                            })),
                            (value) =>
                                addRowField(
                                    value as keyof Record<string, unknown>
                                )
                        )}
                </Block>

                <Block style={{ marginBottom: pivot.spacing.sectionGap }}>
                    {renderSectionHeader('→', 'Columns', columnFields.length)}
                    <Block
                        style={{
                            minHeight:
                                columnFields.length === 0
                                    ? pivot.dropZone.emptyMinHeight
                                    : 'auto',
                            padding: pivot.dropZone.padding,
                            backgroundColor: pivot.dropZone.background,
                            borderRadius: pivot.dropZone.borderRadius,
                            border: pivot.dropZone.border,
                        }}
                    >
                        {columnFields.length === 0 ? (
                            renderEmptyState(
                                'Fields here become column headers',
                                'Example: Quarter, Category, Status'
                            )
                        ) : (
                            <Block
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: pivot.spacing.stackGap,
                                }}
                            >
                                {columnFields.map((field) =>
                                    renderFieldTag(
                                        `col-${String(field)}`,
                                        String(field),
                                        () => removeColumnField(field)
                                    )
                                )}
                            </Block>
                        )}
                    </Block>
                    {availableFieldsForColumns.length > 0 &&
                        renderFieldSelector(
                            'Choose a field...',
                            availableFieldsForColumns.map((f) => ({
                                label: f.label,
                                value: f.key,
                            })),
                            (value) =>
                                addColumnField(
                                    value as keyof Record<string, unknown>
                                )
                        )}
                </Block>

                <Block style={{ marginBottom: pivot.spacing.sectionGap }}>
                    {renderSectionHeader('∑', 'Values', valueConfigs.length)}
                    <Block
                        style={{
                            minHeight:
                                valueConfigs.length === 0
                                    ? pivot.dropZone.emptyMinHeight
                                    : 'auto',
                            padding: pivot.dropZone.padding,
                            backgroundColor: pivot.dropZone.background,
                            borderRadius: pivot.dropZone.borderRadius,
                            border: pivot.dropZone.border,
                        }}
                    >
                        {valueConfigs.length === 0 ? (
                            renderEmptyState(
                                'Numeric fields to calculate',
                                'Example: Sales, Quantity, Revenue'
                            )
                        ) : (
                            <Block
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: pivot.spacing.stackGap,
                                }}
                            >
                                {valueConfigs.map((config, index) => (
                                    <Block
                                        key={`val-${String(config.field)}-${index}`}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: pivot.spacing.stackGap,
                                            padding: pivot.dropZone.padding,
                                            backgroundColor:
                                                tableToken.dataTable.table.body
                                                    .backgroundColor,
                                            borderRadius:
                                                pivot.chip.borderRadius,
                                            border: tableToken.dataTable.border,
                                        }}
                                    >
                                        <Block
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Tag
                                                text={String(config.field)}
                                                variant={TagVariant.SUBTLE}
                                                color={TagColor.NEUTRAL}
                                                size={TagSize.SM}
                                                rightSlot={
                                                    <button
                                                        type="button"
                                                        style={
                                                            removeButtonStyle
                                                        }
                                                        onClick={() =>
                                                            removeValueField(
                                                                index
                                                            )
                                                        }
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor =
                                                                pivot.removeButton.hoverBackground
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor =
                                                                pivot.removeButton.background
                                                        }}
                                                        aria-label={`Remove ${String(config.field)}`}
                                                    >
                                                        <Trash2
                                                            size={
                                                                pivot
                                                                    .removeButton
                                                                    .iconSize
                                                            }
                                                            color={
                                                                pivot
                                                                    .removeButton
                                                                    .iconColor
                                                            }
                                                        />
                                                    </button>
                                                }
                                            />
                                        </Block>
                                        <Menu
                                            items={[
                                                {
                                                    items: (
                                                        supportedAggregationsByField.get(
                                                            String(config.field)
                                                        ) || []
                                                    ).map((item) => ({
                                                        label: item.toUpperCase(),
                                                        slot3:
                                                            config.aggregation ===
                                                            item ? (
                                                                <Check
                                                                    size={
                                                                        pivot.menuCheckIconSize
                                                                    }
                                                                    color={
                                                                        tableToken
                                                                            .dataTable
                                                                            .table
                                                                            .body
                                                                            .cell
                                                                            .color
                                                                    }
                                                                />
                                                            ) : null,
                                                        onClick: () =>
                                                            updateValueAggregation(
                                                                index,
                                                                item as PivotAggregationType
                                                            ),
                                                    })),
                                                },
                                            ]}
                                            alignment={MenuAlignment.END}
                                            side={MenuSide.TOP}
                                            sideOffset={4}
                                            trigger={
                                                <Button
                                                    text={`${config.aggregation.toUpperCase()}()`}
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    size={ButtonSize.SMALL}
                                                    fullWidth
                                                />
                                            }
                                        />
                                    </Block>
                                ))}
                            </Block>
                        )}
                    </Block>
                    {availableFieldsForValues.length > 0 && (
                        <Block
                            style={{
                                marginTop:
                                    pivot.spacing.sectionHeaderMarginBottom,
                            }}
                        >
                            <Block
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: pivot.spacing.controlsRowGap,
                                }}
                            >
                                <SingleSelect
                                    placeholder="Select field..."
                                    items={[
                                        {
                                            items: availableFieldsForValues.map(
                                                (f) => ({
                                                    label: f.label,
                                                    value: f.key,
                                                })
                                            ),
                                        },
                                    ]}
                                    selected={selectedValueField as string}
                                    onSelect={(value) =>
                                        setSelectedValueField(
                                            value as keyof Record<
                                                string,
                                                unknown
                                            >
                                        )
                                    }
                                    variant={SelectMenuVariant.CONTAINER}
                                    size={SelectMenuSize.SMALL}
                                    fullWidth
                                />
                                <SingleSelect
                                    placeholder="Function"
                                    items={selectedValueAggregationItems}
                                    selected={selectedValueAgg}
                                    onSelect={(value) =>
                                        setSelectedValueAgg(
                                            value as PivotAggregationType
                                        )
                                    }
                                    variant={SelectMenuVariant.CONTAINER}
                                    size={SelectMenuSize.SMALL}
                                    // fullWidth
                                    disabled={
                                        selectedValueAggregationOptions.length ===
                                        0
                                    }
                                />
                            </Block>
                            {selectedValueMessage && (
                                <PrimitiveText
                                    style={{
                                        fontSize:
                                            pivot.emptyState.exampleFontSize,
                                        color: pivot.emptyState.exampleColor,
                                        marginTop: pivot.spacing.stackGap,
                                    }}
                                >
                                    {selectedValueMessage}
                                </PrimitiveText>
                            )}
                            {selectedValueField && (
                                <Button
                                    text="Add Value Field"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                    onClick={addValueField}
                                    disabled={
                                        !selectedValueField ||
                                        selectedValueAggregationOptions.length ===
                                            0
                                    }
                                    fullWidth
                                />
                            )}
                        </Block>
                    )}
                </Block>
            </NoScrollbar>
        )

        return (
            <Modal
                ref={ref}
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                subtitle={subtitle}
                minWidth={pivot.modal.minWidth}
                maxWidth={pivot.modal.maxWidth}
                maxHeight={pivot.modal.maxHeight}
                showFooter={false}
                isCustom
            >
                <NoScrollbar
                    style={{
                        display: pivot.shell.display,
                        gridTemplateColumns: pivot.shell.gridTemplateColumns,
                        height: pivot.shell.height,
                        overflow: pivot.shell.overflow,
                    }}
                >
                    <PivotPreviewPanel
                        pivot={pivot}
                        tableToken={tableToken}
                        showExport={showExport}
                        previewRows={effectivePreviewRows}
                        previewColumns={effectivePreviewColumns}
                        previewTableColumns={previewTableColumns}
                        onExport={exportPivotTable}
                    />
                    {renderConfiguration()}
                </NoScrollbar>
            </Modal>
        )
    }
)

PivotTableModal.displayName = 'PivotTableModal'

export default PivotTableModal
