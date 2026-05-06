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
            }>
        >(
            () =>
                (initialConfig?.values as Array<{
                    field: keyof Record<string, unknown>
                    aggregation: PivotAggregationType
                }>) || []
        )

        const [addRowSelection, setAddRowSelection] = useState<string>('')
        const [addColumnSelection, setAddColumnSelection] = useState<string>('')
        const [addValueSelection, setAddValueSelection] = useState<string>('')

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

        // Add field handlers (Sheets-style)
        const addRowField = (field: string) => {
            if (!field || rowFields.some((f) => f.field === field)) return
            // mutual exclusivity: move from Columns -> Rows
            setColumnFields((prev) => prev.filter((f) => f.field !== field))
            setRowFields((prev) => [...prev, { field, showTotal: true }])
        }

        const removeRowField = (field: string) => {
            setRowFields((prev) => prev.filter((f) => f.field !== field))
        }

        const addColumnField = (field: string) => {
            if (!field || columnFields.some((f) => f.field === field)) return
            // mutual exclusivity: move from Rows -> Columns
            setRowFields((prev) => prev.filter((f) => f.field !== field))
            setColumnFields((prev) => [...prev, { field, showTotal: true }])
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

        const addValueField = (field: string) => {
            if (!field) return
            const supported = getSupportedAggregations(field)
            if (!supported.length) return
            const aggregation = supported[0]
            // allow duplicates by (field, aggregation), but prevent exact duplicates
            if (
                valueConfigs.some(
                    (v) =>
                        String(v.field) === field &&
                        v.aggregation === aggregation
                )
            ) {
                return
            }
            setValueConfigs((prev) => [
                ...prev,
                {
                    field: field as keyof Record<string, unknown>,
                    aggregation,
                },
            ])
        }

        const removeValueField = (index: number) => {
            setValueConfigs((prev) => prev.filter((_, i) => i !== index))
        }

        const updateValueAggregation = (
            index: number,
            aggregation: PivotAggregationType
        ) => {
            setValueConfigs((prev) => {
                const target = prev[index]
                if (!target) return prev
                const isDuplicate = prev.some(
                    (v, i) =>
                        i !== index &&
                        String(v.field) === String(target.field) &&
                        v.aggregation === aggregation
                )
                if (isDuplicate) return prev
                const newConfigs = [...prev]
                newConfigs[index].aggregation = aggregation
                return newConfigs
            })
        }

        const updateRowField = (index: number, nextField: string) => {
            setRowFields((prev) => {
                const usedInOtherSections = columnFields.some(
                    (field) => field.field === nextField
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
                const usedInOtherSections = rowFields.some(
                    (field) => field.field === nextField
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
                    // prevent creating an exact duplicate (field + aggregation) pair
                    if (
                        prev.some(
                            (other, j) =>
                                j !== index &&
                                String(other.field) === nextField &&
                                other.aggregation === nextAggregation
                        )
                    ) {
                        return config
                    }
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

        const hasCustomTotalVisibility = useMemo(
            () =>
                rowFields.some((field) => field.showTotal === false) ||
                columnFields.some((field) => field.showTotal === false),
            [rowFields, columnFields]
        )

        const effectivePreview = useMemo(() => {
            if (
                !hasCustomTotalVisibility &&
                (previewColumns?.length || previewRows?.length)
            ) {
                return {
                    columns: previewColumns || [],
                    rows: previewRows || [],
                }
            }

            return buildPivotPreview(
                data as Record<string, unknown>[],
                rowFields.map((f) => ({
                    field: f.field as keyof Record<string, unknown>,
                    showTotal: f.showTotal,
                })),
                columnFields.map((f) => ({
                    field: f.field as keyof Record<string, unknown>,
                    showTotal: f.showTotal,
                })),
                valueConfigs
            )
        }, [
            previewColumns,
            previewRows,
            data,
            rowFields,
            columnFields,
            valueConfigs,
            hasCustomTotalVisibility,
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

        const rowAddOptions = useMemo(() => {
            const blocked = new Set([
                ...rowFields.map((f) => f.field),
                ...columnFields.map((f) => f.field),
            ])
            return fieldOptions.filter((opt) => !blocked.has(opt.key))
        }, [fieldOptions, rowFields, columnFields])

        const columnAddOptions = useMemo(() => {
            const blocked = new Set([
                ...rowFields.map((f) => f.field),
                ...columnFields.map((f) => f.field),
            ])
            return fieldOptions.filter((opt) => !blocked.has(opt.key))
        }, [fieldOptions, rowFields, columnFields])

        const valueAddOptions = useMemo(() => fieldOptions, [fieldOptions])

        // Render field config card
        const renderFieldConfig = (
            field: PivotFieldConfig,
            onRemove: () => void,
            onFieldChange?: (nextField: string) => void,
            showAggSelector?: boolean,
            aggValue?: PivotAggregationType,
            onAggChange?: (agg: PivotAggregationType) => void,
            onShowTotalChange?: (checked: boolean) => void,
            showTotalToggle = true
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
                {showTotalToggle && (
                    <Block>
                        <Checkbox
                            checked={field.showTotal !== false}
                            size={CheckboxSize.SMALL}
                            onCheckedChange={(checked) =>
                                onShowTotalChange?.(
                                    checked === true ||
                                        checked === 'indeterminate'
                                )
                            }
                        >
                            Show Total
                        </Checkbox>
                    </Block>
                )}
            </Block>
        )

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
                    <SingleSelect
                        placeholder="Add"
                        items={[
                            {
                                items:
                                    sectionKey === 'rows'
                                        ? rowAddOptions.map((o) => ({
                                              label: o.label,
                                              value: o.key,
                                          }))
                                        : sectionKey === 'columns'
                                          ? columnAddOptions.map((o) => ({
                                                label: o.label,
                                                value: o.key,
                                            }))
                                          : valueAddOptions.map((o) => ({
                                                label: o.label,
                                                value: o.key,
                                            })),
                            },
                        ]}
                        selected={
                            sectionKey === 'rows'
                                ? addRowSelection
                                : sectionKey === 'columns'
                                  ? addColumnSelection
                                  : addValueSelection
                        }
                        onSelect={(value) => {
                            const next = String(value)
                            if (sectionKey === 'rows') {
                                setAddRowSelection(next)
                                addRowField(next)
                                setAddRowSelection('')
                                return
                            }
                            if (sectionKey === 'columns') {
                                setAddColumnSelection(next)
                                addColumnField(next)
                                setAddColumnSelection('')
                                return
                            }
                            setAddValueSelection(next)
                            addValueField(next)
                            setAddValueSelection('')
                        }}
                        variant={SelectMenuVariant.NO_CONTAINER}
                        size={SelectMenuSize.SMALL}
                        alignment={SelectMenuAlignment.END}
                        allowDeselect={false}
                        customTrigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                subType={ButtonSubType.ICON_ONLY}
                                leadingIcon={<Plus size={16} />}
                                aria-label={`Add ${title.toLowerCase()} field`}
                            />
                        }
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
                                    : undefined,
                                sectionKey !== 'values'
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
                                overflowX: 'hidden',
                                border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
                                borderRadius: FOUNDATION_THEME.border.radius[8],
                                width: pivot.rightPanel.width,
                                minWidth: pivot.rightPanel.width,
                                maxWidth: pivot.rightPanel.width,
                                flex: `0 0 ${pivot.rightPanel.width}`,
                                boxSizing: 'border-box',
                            }}
                        >
                            <Block />

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
                                        showTotal: true,
                                    })),
                                    (field) => {
                                        const index = valueConfigs.findIndex(
                                            (v) => String(v.field) === field
                                        )
                                        if (index >= 0) removeValueField(index)
                                    },
                                    true,
                                    valueConfigs.map((v) => v.aggregation),
                                    updateValueAggregation
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
