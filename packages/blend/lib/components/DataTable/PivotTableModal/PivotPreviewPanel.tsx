import { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import Button from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/types'
import DataTable from '../DataTable'
import { NoScrollbar } from './pivotModal.styled'
import type { PivotPreviewPanelProps } from './types'

/**
 * Left column: shows consumer-computed pivot preview (`previewRows` / `previewColumns`).
 */
const PivotPreviewPanel = forwardRef<HTMLDivElement, PivotPreviewPanelProps>(
    (
        {
            pivot,
            tableToken,
            showExport,
            previewRows,
            previewColumns,
            previewTableColumns,
            onExport,
        },
        ref
    ) => {
        const hasPreviewGrid = previewTableColumns.length > 0

        return (
            <NoScrollbar
                ref={ref}
                style={{
                    padding: pivot.panelPadding,
                    overflow: 'auto',
                    backgroundColor: pivot.previewPanelBackground,
                }}
            >
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                        marginBottom: pivot.preview.headerMarginBottom,
                    }}
                >
                    <div>
                        <PrimitiveText
                            style={{
                                fontWeight: pivot.preview.titleFontWeight,
                                fontSize: pivot.preview.titleFontSize,
                                marginBottom: pivot.preview.titleMarginBottom,
                            }}
                        >
                            Preview
                        </PrimitiveText>
                        <PrimitiveText
                            style={{
                                fontSize: pivot.preview.metaFontSize,
                                color: tableToken.dataTable.table.body.cell
                                    .color,
                            }}
                        >
                            {previewRows?.length || 0} rows ×{' '}
                            {previewColumns?.length || 0} columns
                        </PrimitiveText>
                    </div>
                    {showExport && (
                        <Button
                            text="Export CSV"
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={onExport}
                            disabled={!previewRows?.length}
                        />
                    )}
                </Block>
                {hasPreviewGrid ? (
                    <DataTable
                        data={(previewRows || []) as Record<string, unknown>[]}
                        columns={previewTableColumns}
                        idField="__pivotId"
                        enableSearch={false}
                        enableFiltering={false}
                        enableAdvancedFilter={false}
                        enableColumnManager={false}
                        enableColumnReordering={false}
                        enableRowExpansion={false}
                        enableRowSelection={false}
                        enableInlineEdit={false}
                        showHeader
                        showToolbar={false}
                        showFooter={false}
                        getRowStyle={(row) =>
                            row.__pivotRowType === 'grand_total'
                                ? {
                                      backgroundColor:
                                          tableToken.dataTable.table.header
                                              .backgroundColor,
                                      fontWeight: pivot.preview.titleFontWeight,
                                  }
                                : {}
                        }
                    />
                ) : (
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
                                marginBottom:
                                    pivot.emptyState.titleMarginBottom,
                            }}
                        >
                            No preview yet
                        </PrimitiveText>
                        <PrimitiveText
                            style={{
                                fontSize: pivot.emptyState.exampleFontSize,
                                color: pivot.emptyState.exampleColor,
                                lineHeight: pivot.builder.bodyLineHeight,
                            }}
                        >
                            Add at least one field under Values. Rows fill the
                            first column; Columns create additional headers;
                            each Value adds metrics. Your app should pass
                            preview columns and rows from the same config you
                            get from onConfigChange (see buildPivotPreview).
                        </PrimitiveText>
                    </Block>
                )}
            </NoScrollbar>
        )
    }
)

PivotPreviewPanel.displayName = 'PivotPreviewPanel'

export default PivotPreviewPanel
