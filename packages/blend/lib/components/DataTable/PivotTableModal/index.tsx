import {
    CSSProperties,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { X, Plus } from 'lucide-react'
import { ButtonSubType } from '../../Button/types'
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
import { Checkbox } from '../../Checkbox/Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
import { ColumnDefinition, PivotAggregationType, ColumnType } from '../types'
import { TableTokenType } from '../dataTable.tokens'
import { downloadCSV } from '../utils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'
import { PivotTableModalProps, PivotFieldConfig } from './types'
import {
    buildPivotPreview,
    getPivotFieldOptions,
    getSupportedAggregationsForField,
} from './utils'
import { NoScrollbar } from './pivotModal.styled'
import { getPivotModalStyleTokens } from './pivotModalStyleTokens'
import PivotPreviewPanel from './PivotPreviewPanel'

type PivotSectionKey = 'rows' | 'columns' | 'values'

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
            title = 'Create Pivot Table',
            description: subtitle,
            initialConfig,
            previewColumns,
            previewRows,
            onConfigChange,
            onExport,
            availableAggregations,
            trigger,
            onTriggerClick,
        },
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
                borderRadius: '50%',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
            }),
            [pivot]
        )

        // State for pivot configuration
        const [rowFields, setRowFields] = useState<PivotFieldConfig[]>(
            () =>
                initialConfig?.rows?.map((field) => ({
                    field: String(field),
                    showTotal: true,
                })) || []
        )
        const [columnFields, setColumnFields] = useState<PivotFieldConfig[]>(
            () =>
                initialConfig?.columns?.map((field) => ({
                    field: String(field),
                    showTotal: true,
                })) || []
        )
        const [valueConfigs, setValueConfigs] = useState<
            Array<{
                field: keyof Record<string, unknown>
                aggregation: PivotAggregationType
                showTotal?: boolean
            }>
        >(
            () =>
                (initialConfig?.values as Array<{
                    field: keyof Record<string, unknown>
                    aggregation: PivotAggregationType
                }>) || []
        )

        // State for field selection
        const [selectedField, setSelectedField] = useState<string>('')

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

        const getSupportedAggregations = (field: string) => {
            return supportedAggregationsByField.get(field) || []
        }

        // Add field handlers
        const addRowField = () => {
            if (
                selectedField &&
                !rowFields.find((f) => f.field === selectedField)
            ) {
                setRowFields((prev) => [
                    ...prev,
                    { field: selectedField, showTotal: true },
                ])
            }
        }

        const removeRowField = (field: string) => {
            setRowFields((prev) => prev.filter((f) => f.field !== field))
        }

        const addColumnField = () => {
            if (
                selectedField &&
                !columnFields.find((f) => f.field === selectedField)
            ) {
                setColumnFields((prev) => [
                    ...prev,
                    { field: selectedField, showTotal: true },
                ])
            }
        }

        const removeColumnField = (field: string) => {
            setColumnFields((prev) => prev.filter((f) => f.field !== field))
        }

        const updateRowFieldTotal = (field: string, showTotal: boolean) => {
            setRowFields((prev) =>
                prev.map((f) => (f.field === field ? { ...f, showTotal } : f))
            )
        }

        const updateColumnFieldTotal = (field: string, showTotal: boolean) => {
            setColumnFields((prev) =>
                prev.map((f) => (f.field === field ? { ...f, showTotal } : f))
            )
        }

        const addValueField = () => {
            const supported = getSupportedAggregations(selectedField)
            if (
                selectedField &&
                !valueConfigs.some((v) => String(v.field) === selectedField) &&
                supported.length > 0
            ) {
                const aggregation = supported[0]
                setValueConfigs((prev) => [
                    ...prev,
                    {
                        field: selectedField as keyof Record<string, unknown>,
                        aggregation,
                        showTotal: true,
                    },
                ])
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

        const updateValueFieldTotal = (field: string, showTotal: boolean) => {
            setValueConfigs((prev) =>
                prev.map((config) =>
                    String(config.field) === field
                        ? {
                              ...config,
                              showTotal,
                          }
                        : config
                )
            )
        }

        const updateRowField = (index: number, nextField: string) => {
            setRowFields((prev) => {
                const usedInOtherSections =
                    columnFields.some((field) => field.field === nextField) ||
                    valueConfigs.some(
                        (config) => String(config.field) === nextField
                    )
                if (
                    !nextField ||
                    usedInOtherSections ||
                    prev.some((f, i) => i !== index && f.field === nextField)
                ) {
                    return prev
                }
                return prev.map((field, i) =>
                    i === index ? { ...field, field: nextField } : field
                )
            })
        }

        const updateColumnField = (index: number, nextField: string) => {
            setColumnFields((prev) => {
                const usedInOtherSections =
                    rowFields.some((field) => field.field === nextField) ||
                    valueConfigs.some(
                        (config) => String(config.field) === nextField
                    )
                if (
                    !nextField ||
                    usedInOtherSections ||
                    prev.some((f, i) => i !== index && f.field === nextField)
                ) {
                    return prev
                }
                return prev.map((field, i) =>
                    i === index ? { ...field, field: nextField } : field
                )
            })
        }

        const updateValueField = (index: number, nextField: string) => {
            setValueConfigs((prev) => {
                if (
                    !nextField ||
                    rowFields.some((field) => field.field === nextField) ||
                    columnFields.some((field) => field.field === nextField) ||
                    prev.some(
                        (config, i) =>
                            i !== index && String(config.field) === nextField
                    )
                ) {
                    return prev
                }

                const supported = getSupportedAggregations(nextField)
                if (!supported.length) return prev

                return prev.map((config, i) => {
                    if (i !== index) return config
                    const nextAggregation = supported.includes(
                        config.aggregation
                    )
                        ? config.aggregation
                        : supported[0]
                    return {
                        ...config,
                        field: nextField as keyof Record<string, unknown>,
                        aggregation: nextAggregation,
                    }
                })
            })
        }

        const lastEmittedConfigRef = useRef<string>('')

        useEffect(() => {
            if (!isOpen) {
                lastEmittedConfigRef.current = ''
                return
            }

            const config = {
                rows: rowFields.map((f) => f.field),
                columns: columnFields.map((f) => f.field),
                values: valueConfigs,
            }
            const configString = JSON.stringify(config)

            if (lastEmittedConfigRef.current !== configString) {
                lastEmittedConfigRef.current = configString
                onConfigChange?.(config)
            }
        }, [isOpen, rowFields, columnFields, valueConfigs, onConfigChange])

        const exportPivotTable = () => {
            const exportColumns = effectivePreviewColumns
            const exportRows = effectivePreviewRows

            if (onExport) {
                onExport({
                    rows: rowFields.map((f) => f.field),
                    columns: columnFields.map((f) => f.field),
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
                rowFields.map((f) => f.field),
                columnFields.map((f) => f.field),
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

        // Available fields excluding already selected ones
        const availableFields = useMemo(() => {
            const selectedFields = new Set([
                ...rowFields.map((f) => f.field),
                ...columnFields.map((f) => f.field),
                ...valueConfigs.map((v) => String(v.field)),
            ])
            return fieldOptions.filter((f) => !selectedFields.has(f.key))
        }, [fieldOptions, rowFields, columnFields, valueConfigs])

        useEffect(() => {
            if (!selectedField) return
            const isStillAvailable = availableFields.some(
                (field) => field.key === selectedField
            )
            if (!isStillAvailable) {
                setSelectedField(availableFields[0]?.key ?? '')
            }
        }, [selectedField, availableFields])

        // Render field config card
        const renderFieldConfig = (
            field: PivotFieldConfig,
            onRemove: () => void,
            onFieldChange?: (nextField: string) => void,
            showAggSelector?: boolean,
            aggValue?: PivotAggregationType,
            onAggChange?: (agg: PivotAggregationType) => void,
            onShowTotalChange?: (checked: boolean) => void
        ) => (
            <Block
                key={field.field}
                style={{
                    padding: FOUNDATION_THEME.unit[12],
                    backgroundColor: FOUNDATION_THEME.colors.gray[25] as string,
                    borderRadius: FOUNDATION_THEME.border.radius[8],
                    border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
                    marginBottom: FOUNDATION_THEME.unit[12],
                }}
            >
                <Block
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: showAggSelector
                            ? FOUNDATION_THEME.unit[8]
                            : '0',
                    }}
                >
                    <PrimitiveText
                        style={{
                            fontSize:
                                FOUNDATION_THEME.font.size.body.sm.fontSize,
                            fontWeight: FOUNDATION_THEME.font.weight[500],
                            color: pivot.text.fieldLabel.color,
                        }}
                    >
                        {field.field}
                    </PrimitiveText>
                    <button
                        type="button"
                        style={removeButtonStyle}
                        onClick={onRemove}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                FOUNDATION_THEME.colors.gray[100] as string
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'transparent'
                        }}
                        aria-label={`Remove ${field.field}`}
                    >
                        <X
                            size={16}
                            color={FOUNDATION_THEME.colors.gray[500] as string}
                        />
                    </button>
                </Block>
                <Block
                    style={{
                        display: 'flex',
                        gap: FOUNDATION_THEME.unit[8],
                        marginBottom: FOUNDATION_THEME.unit[8],
                    }}
                >
                    <Block style={{ flex: 1, minWidth: 0 }}>
                        <SingleSelect
                            placeholder="Column Name"
                            items={[
                                {
                                    items: fieldOptions.map((option) => ({
                                        label: option.label,
                                        value: option.key,
                                    })),
                                },
                            ]}
                            selected={field.field}
                            onSelect={(value) => onFieldChange?.(String(value))}
                            variant={SelectMenuVariant.CONTAINER}
                            size={SelectMenuSize.SMALL}
                            fullWidth
                        />
                    </Block>
                    {showAggSelector && aggValue && onAggChange && (
                        <Block style={{ flex: 1, minWidth: 0 }}>
                            <SingleSelect
                                placeholder="operation"
                                items={[
                                    {
                                        items: getSupportedAggregations(
                                            field.field
                                        ).map((item) => ({
                                            label: item.toUpperCase(),
                                            value: item,
                                        })),
                                    },
                                ]}
                                selected={aggValue}
                                onSelect={(value) =>
                                    onAggChange(value as PivotAggregationType)
                                }
                                variant={SelectMenuVariant.CONTAINER}
                                size={SelectMenuSize.SMALL}
                                alignment={SelectMenuAlignment.END}
                                fullWidth
                            />
                        </Block>
                    )}
                </Block>
                <Block style={{ marginTop: FOUNDATION_THEME.unit[8] }}>
                    <Checkbox
                        checked={field.showTotal !== false}
                        size={CheckboxSize.SMALL}
                        onCheckedChange={(checked) =>
                            onShowTotalChange?.(
                                checked === true || checked === 'indeterminate'
                            )
                        }
                    >
                        Show Total
                    </Checkbox>
                </Block>
            </Block>
        )

        const getSectionAddHandler = (section: PivotSectionKey) => {
            if (section === 'rows') return addRowField
            if (section === 'columns') return addColumnField
            return addValueField
        }

        const renderSection = (
            title: string,
            sectionKey: PivotSectionKey,
            fields: PivotFieldConfig[],
            onRemove: (field: string) => void,
            showAgg?: boolean,
            aggs?: PivotAggregationType[],
            onAggChange?: (index: number, agg: PivotAggregationType) => void,
            onShowTotalChange?: (field: string, showTotal: boolean) => void
        ) => (
            <Block
                style={{
                    marginBottom: '0',
                }}
            >
                <Block
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom:
                            fields.length > 0 ? FOUNDATION_THEME.unit[10] : '0',
                    }}
                >
                    <PrimitiveText
                        style={{
                            fontSize:
                                FOUNDATION_THEME.font.size.body.md.fontSize,
                            fontWeight: FOUNDATION_THEME.font.weight[500],
                            color: pivot.text.sectionTitle.color,
                        }}
                    >
                        {title}
                    </PrimitiveText>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Plus size={16} />}
                        onClick={getSectionAddHandler(sectionKey)}
                        disabled={!selectedField}
                        aria-label={`Add ${title.toLowerCase()} field`}
                    />
                </Block>
                {fields.length > 0 && (
                    <Block>
                        {fields.map((field, index) =>
                            renderFieldConfig(
                                field,
                                () => onRemove(field.field),
                                (nextField) => {
                                    if (sectionKey === 'rows') {
                                        updateRowField(index, nextField)
                                        return
                                    }
                                    if (sectionKey === 'columns') {
                                        updateColumnField(index, nextField)
                                        return
                                    }
                                    updateValueField(index, nextField)
                                },
                                showAgg,
                                showAgg && aggs ? aggs[index] : undefined,
                                showAgg && onAggChange
                                    ? (agg) => onAggChange(index, agg)
                                    : undefined,
                                onShowTotalChange
                                    ? (checked: boolean) =>
                                          onShowTotalChange(
                                              field.field,
                                              checked
                                          )
                                    : undefined
                            )
                        )}
                    </Block>
                )}
                {fields.length === 0 && <Block />}
            </Block>
        )

        const secondaryActionButton = {
            text: 'Download',
            buttonType: ButtonType.SECONDARY,
            size: ButtonSize.SMALL,
            onClick: exportPivotTable,
            disabled: valueConfigs.length === 0,
        }

        return (
            <>
                {/* Trigger - rendered outside modal */}
                {trigger && (
                    <Block
                        onClick={onTriggerClick}
                        style={{ cursor: 'pointer', display: 'inline-block' }}
                    >
                        {trigger}
                    </Block>
                )}

                <Modal
                    ref={ref}
                    isOpen={isOpen}
                    onClose={onClose}
                    title={title}
                    subtitle={subtitle}
                    minWidth={pivot.modal.minWidth}
                    maxWidth={pivot.modal.maxWidth}
                    maxHeight={pivot.modal.maxHeight}
                    showFooter={true}
                    secondaryAction={secondaryActionButton}
                    useDrawerOnMobile={false}
                    isCustom
                >
                    <NoScrollbar
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            height: '72vh',
                            minHeight: '520px',
                            overflow: 'hidden',
                            padding: pivot.modal.bodyPadding,
                            gap: pivot.modal.bodyGap,
                        }}
                    >
                        <Block
                            style={{
                                flex: '1 1 0',
                                minWidth: 0,
                                overflow: 'hidden',
                            }}
                        >
                            <PivotPreviewPanel
                                pivot={pivot}
                                tableToken={tableToken}
                                showExport={false}
                                previewRows={effectivePreviewRows}
                                previewColumns={effectivePreviewColumns}
                                previewTableColumns={previewTableColumns}
                                onExport={exportPivotTable}
                                hasValues={valueConfigs.length > 0}
                            />
                        </Block>
                        <NoScrollbar
                            style={{
                                padding: FOUNDATION_THEME.unit[16],
                                overflow: 'auto',
                                border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
                                borderRadius: FOUNDATION_THEME.border.radius[8],
                                width: pivot.rightPanel.width,
                                minWidth: pivot.rightPanel.width,
                                maxWidth: pivot.rightPanel.width,
                                flex: `0 0 ${pivot.rightPanel.width}`,
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Select Column Dropdown */}
                            <Block
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[24],
                                }}
                            >
                                <SingleSelect
                                    label="Select Column"
                                    placeholder="column name"
                                    items={[
                                        {
                                            items: availableFields.map((f) => ({
                                                label: f.label,
                                                value: f.key,
                                            })),
                                        },
                                    ]}
                                    selected={selectedField}
                                    onSelect={(value) =>
                                        setSelectedField(value as string)
                                    }
                                    variant={SelectMenuVariant.CONTAINER}
                                    size={SelectMenuSize.SMALL}
                                    fullWidth
                                    allowDeselect={false}
                                />
                            </Block>
                            <Block
                                style={{
                                    borderTop: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[150]}`,
                                    marginBottom: FOUNDATION_THEME.unit[24],
                                }}
                            />

                            <Block
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: FOUNDATION_THEME.unit[32],
                                }}
                            >
                                {/* Rows Section */}
                                {renderSection(
                                    'Rows',
                                    'rows',
                                    rowFields,
                                    removeRowField,
                                    false,
                                    undefined,
                                    undefined,
                                    updateRowFieldTotal
                                )}

                                {/* Columns Section */}
                                {renderSection(
                                    'Columns',
                                    'columns',
                                    columnFields,
                                    removeColumnField,
                                    false,
                                    undefined,
                                    undefined,
                                    updateColumnFieldTotal
                                )}

                                {/* Values Section */}
                                {renderSection(
                                    'Values',
                                    'values',
                                    valueConfigs.map((v) => ({
                                        field: String(v.field),
                                        showTotal: v.showTotal ?? true,
                                    })),
                                    (field) => {
                                        const index = valueConfigs.findIndex(
                                            (v) => String(v.field) === field
                                        )
                                        if (index >= 0) removeValueField(index)
                                    },
                                    true,
                                    valueConfigs.map((v) => v.aggregation),
                                    updateValueAggregation,
                                    updateValueFieldTotal
                                )}
                            </Block>
                        </NoScrollbar>
                    </NoScrollbar>
                </Modal>
            </>
        )
    }
)

PivotTableModal.displayName = 'PivotTableModal'

export default PivotTableModal
