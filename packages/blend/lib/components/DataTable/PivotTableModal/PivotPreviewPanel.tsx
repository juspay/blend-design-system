import { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import Button from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/types'
import DataTable from '../DataTable'
import { NoScrollbar } from './pivotModal.styled'
import { PivotTableIllustration } from './PivotTableIllustration'
import type { PivotPreviewPanelProps } from './types'

const PivotPreviewPanel = forwardRef<HTMLDivElement, PivotPreviewPanelProps>(
    (
        {
            pivot,
            tableToken,
            showExport,
            previewRows,
            previewTableColumns,
            onExport,
            hasValues,
        },
        ref
    ) => {
        const hasPreviewGrid =
            previewTableColumns.length > 0 &&
            previewRows &&
            previewRows.length > 0
        const showEmptyState = !hasValues || !hasPreviewGrid

        return (
            <NoScrollbar
                ref={ref}
                style={{
                    padding: '0',
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {showEmptyState ? (
                    <Block
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            minHeight: '300px',
                        }}
                    >
                        <PivotTableIllustration />
                        <PrimitiveText
                            style={{
                                fontSize: pivot.emptyState.titleFontSize,
                                color: pivot.emptyState.titleColor,
                                marginTop: pivot.spacing.iconBadgeGap,
                                fontWeight: 500,
                            }}
                        >
                            Rows
                        </PrimitiveText>
                    </Block>
                ) : (
                    <Block
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        {showExport && (
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                style={{
                                    marginBottom:
                                        pivot.preview.headerMarginBottom,
                                }}
                            >
                                <Button
                                    text="Export CSV"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={onExport}
                                    disabled={!previewRows?.length}
                                />
                            </Block>
                        )}
                        <Block style={{ flex: 1, overflow: 'auto' }}>
                            <DataTable
                                key={`pivot-preview-${previewRows?.length || 0}-${previewTableColumns.length}`}
                                data={
                                    (previewRows || []) as Record<
                                        string,
                                        unknown
                                    >[]
                                }
                                columns={previewTableColumns}
                                idField="__pivotId"
                                pagination={{
                                    currentPage: 1,
                                    pageSize: Math.max(
                                        previewRows?.length || 0,
                                        1
                                    ),
                                    totalRows: previewRows?.length || 0,
                                    pageSizeOptions: [
                                        Math.max(previewRows?.length || 0, 1),
                                    ],
                                }}
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
                                    row.__pivotRowType === 'grand_total' ||
                                    row.__pivotRowType === 'subtotal'
                                        ? {
                                              backgroundColor:
                                                  tableToken.dataTable.table
                                                      .header.backgroundColor,
                                              fontWeight:
                                                  pivot.preview.titleFontWeight,
                                          }
                                        : {}
                                }
                            />
                        </Block>
                    </Block>
                )}
            </NoScrollbar>
        )
    }
)

PivotPreviewPanel.displayName = 'PivotPreviewPanel'

export default PivotPreviewPanel
