import React, { forwardRef, useMemo } from 'react'
import { Edit, Save, X, ChevronRight, ChevronDown } from 'lucide-react'
import { styled, css } from 'styled-components'
import { TableBodyProps } from './types'
import TableCell from '../TableCell'
import Block from '../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../tokens'

import {
    Button,
    ButtonType,
    ButtonSize,
    Checkbox,
    CheckboxSize,
    TableTokenType,
} from '../../../main'
import { foundationToken } from '../../../foundationToken'
import { useComponentToken } from '../../../context/useComponentToken'

const TableRow = styled.tr<{
    $isClickable?: boolean
    $customBackgroundColor?: string
    $hasCustomBackground?: boolean
}>`
    border-bottom: 1px solid ${FOUNDATION_THEME.colors.gray[200]};

    ${({ $customBackgroundColor, $isClickable, $hasCustomBackground }) => css`
        ${$customBackgroundColor &&
        css`
            background-color: ${$customBackgroundColor} !important;
        `}

        ${$isClickable &&
        css`
            cursor: pointer;
        `}
    
    ${!$hasCustomBackground &&
        css`
            &:hover {
                background-color: ${FOUNDATION_THEME.colors
                    .gray[100]} !important;

                td {
                    background-color: ${FOUNDATION_THEME.colors
                        .gray[100]} !important;
                }
            }
        `}
    `}
`

const StyledTableCell = styled.td<{
    $width?: string
    $customBackgroundColor?: string
    $hasCustomBackground?: boolean
}>`
    padding: ${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]};
    text-align: left;
    vertical-align: top;
    border-top: 1px solid ${FOUNDATION_THEME.colors.gray[150]};

    ${({ $width, $customBackgroundColor, $hasCustomBackground }) => css`
        ${$width && `width: ${$width};`}
        ${$customBackgroundColor &&
        css`
            background-color: ${$customBackgroundColor} !important;
        `}
    overflow: hidden;
        box-sizing: border-box;
        max-width: 0;

        ${!$hasCustomBackground &&
        css`
            tr:hover & {
                background-color: ${FOUNDATION_THEME.colors
                    .gray[100]} !important;
            }
        `}
    `}
`

const ExpandedCell = styled.td`
    padding: ${FOUNDATION_THEME.unit[16]};
    background-color: ${FOUNDATION_THEME.colors.gray[50]};
`

const ExpandButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${FOUNDATION_THEME.unit[4]};
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: ${FOUNDATION_THEME.border.radius[4]};
    color: ${FOUNDATION_THEME.colors.gray[600]};

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
        color: ${FOUNDATION_THEME.colors.gray[800]};
    }
`

const TableBody = forwardRef<
    HTMLTableSectionElement,
    TableBodyProps<Record<string, unknown>>
>(
    (
        {
            currentData,
            visibleColumns,
            idField,
            selectedRows,
            editingRows,
            editValues,
            expandedRows,
            enableInlineEdit = false,
            enableColumnManager = true,
            enableRowExpansion = false,
            enableRowSelection = true,
            columnFreeze = 0,
            renderExpandedRow,
            isRowExpandable,
            onRowSelect,
            onEditRow,
            onSaveRow,
            onCancelEdit,
            onRowExpand,
            onFieldChange,
            onRowClick,
            getColumnWidth,
            getRowStyle,
            getDisplayValue,
        },
        ref
    ) => {
        const colSpan = useMemo(() => {
            let span = visibleColumns.length
            if (enableRowSelection) span += 1
            if (enableRowExpansion) span += 1
            if (enableInlineEdit) span += 1
            if (enableColumnManager) span += 1
            return span
        }, [
            visibleColumns.length,
            enableRowSelection,
            enableRowExpansion,
            enableInlineEdit,
            enableColumnManager,
        ])

        const tableToken = useComponentToken('TABLE') as TableTokenType

        return (
            <tbody ref={ref}>
                {currentData.length > 0
                    ? currentData.map((row, index) => {
                          const rowId = String(row[idField])
                          const isEditing = editingRows[rowId]
                          const isExpanded = expandedRows[rowId]
                          const canExpand = isRowExpandable
                              ? isRowExpandable(row, index)
                              : true

                          const rowStyling = getRowStyle
                              ? getRowStyle(row, index)
                              : {}
                          const hasCustomBackground =
                              !!rowStyling.backgroundColor

                          return (
                              <React.Fragment key={rowId}>
                                  <TableRow
                                      $isClickable={!!onRowClick}
                                      $customBackgroundColor={
                                          rowStyling.backgroundColor
                                      }
                                      $hasCustomBackground={hasCustomBackground}
                                      onClick={() =>
                                          onRowClick && onRowClick(row, index)
                                      }
                                      style={{
                                          ...Object.fromEntries(
                                              Object.entries(rowStyling).filter(
                                                  ([key]) =>
                                                      key !== 'backgroundColor'
                                              )
                                          ),
                                      }}
                                  >
                                      {enableRowExpansion && (
                                          <StyledTableCell
                                              $width="50px"
                                              $customBackgroundColor={
                                                  rowStyling.backgroundColor
                                              }
                                              $hasCustomBackground={
                                                  hasCustomBackground
                                              }
                                              style={{
                                                  minWidth: `${FOUNDATION_THEME.unit[52]}`,
                                                  maxWidth: `${FOUNDATION_THEME.unit[52]}`,
                                                  ...(columnFreeze > 0 && {
                                                      position: 'sticky',
                                                      left: '0px',
                                                      zIndex: 45,
                                                      backgroundColor:
                                                          rowStyling.backgroundColor ||
                                                          foundationToken.colors
                                                              .gray[0],
                                                      fontSize:
                                                          tableToken.dataTable
                                                              .table.body.cell
                                                              .fontSize,
                                                  }),
                                              }}
                                          >
                                              <Block
                                                  display="flex"
                                                  alignItems="center"
                                                  justifyContent="center"
                                                  onClick={(e) =>
                                                      e.stopPropagation()
                                                  }
                                              >
                                                  {canExpand ? (
                                                      <ExpandButton
                                                          onClick={() =>
                                                              onRowExpand(
                                                                  row[idField]
                                                              )
                                                          }
                                                          title={
                                                              isExpanded
                                                                  ? 'Collapse row'
                                                                  : 'Expand row'
                                                          }
                                                      >
                                                          {isExpanded ? (
                                                              <ChevronDown
                                                                  size={16}
                                                              />
                                                          ) : (
                                                              <ChevronRight
                                                                  size={16}
                                                              />
                                                          )}
                                                      </ExpandButton>
                                                  ) : (
                                                      <></>
                                                  )}
                                              </Block>
                                          </StyledTableCell>
                                      )}

                                      {enableRowSelection && (
                                          <StyledTableCell
                                              $customBackgroundColor={
                                                  rowStyling.backgroundColor
                                              }
                                              $hasCustomBackground={
                                                  hasCustomBackground
                                              }
                                              style={{
                                                  ...(columnFreeze > 0 && {
                                                      position: 'sticky',
                                                      left: enableRowExpansion
                                                          ? '50px'
                                                          : '0px',
                                                      zIndex: 45,
                                                      backgroundColor:
                                                          rowStyling.backgroundColor ||
                                                          foundationToken.colors
                                                              .gray[0],
                                                      fontSize:
                                                          tableToken.dataTable
                                                              .table.body.cell
                                                              .fontSize,
                                                  }),
                                              }}
                                          >
                                              <Block
                                                  display="flex"
                                                  alignItems="center"
                                                  justifyContent="center"
                                                  width={
                                                      FOUNDATION_THEME.unit[40]
                                                  }
                                                  onClick={(e) =>
                                                      e.stopPropagation()
                                                  }
                                                  padding={`${FOUNDATION_THEME.unit[7]} ${FOUNDATION_THEME.unit[4]}`}
                                              >
                                                  <Checkbox
                                                      checked={
                                                          !!selectedRows[rowId]
                                                      }
                                                      onCheckedChange={() =>
                                                          onRowSelect(
                                                              row[idField]
                                                          )
                                                      }
                                                      size={CheckboxSize.MEDIUM}
                                                      disabled={isEditing}
                                                  />
                                              </Block>
                                          </StyledTableCell>
                                      )}

                                      {visibleColumns.map(
                                          (column, colIndex) => {
                                              const columnStyles =
                                                  getColumnWidth(
                                                      column,
                                                      colIndex
                                                  )
                                              const currentValue = isEditing
                                                  ? editValues[rowId]?.[
                                                        column.field
                                                    ]
                                                  : row[column.field]

                                              const getFrozenBodyStyles =
                                                  () => {
                                                      if (
                                                          colIndex >=
                                                          columnFreeze
                                                      )
                                                          return {
                                                              padding: '0 16px',
                                                          }

                                                      let leftOffset = 0
                                                      if (enableRowExpansion)
                                                          leftOffset += 50
                                                      if (enableRowSelection)
                                                          leftOffset += 60

                                                      for (
                                                          let i = 0;
                                                          i < colIndex;
                                                          i++
                                                      ) {
                                                          const prevColumn =
                                                              visibleColumns[i]
                                                          let columnWidth = 120

                                                          if (
                                                              prevColumn.minWidth
                                                          ) {
                                                              columnWidth =
                                                                  parseInt(
                                                                      prevColumn.minWidth.replace(
                                                                          /px|%|em|rem/g,
                                                                          ''
                                                                      )
                                                                  ) || 120
                                                          } else if (
                                                              prevColumn.maxWidth
                                                          ) {
                                                              columnWidth =
                                                                  parseInt(
                                                                      prevColumn.maxWidth.replace(
                                                                          /px|%|em|rem/g,
                                                                          ''
                                                                      )
                                                                  ) || 120
                                                          } else {
                                                              const prevStyles =
                                                                  getColumnWidth(
                                                                      prevColumn,
                                                                      i
                                                                  )
                                                              if (
                                                                  prevStyles.width
                                                              ) {
                                                                  columnWidth =
                                                                      parseInt(
                                                                          String(
                                                                              prevStyles.width
                                                                          ).replace(
                                                                              /px|%|em|rem/g,
                                                                              ''
                                                                          )
                                                                      ) || 120
                                                              } else if (
                                                                  prevStyles.minWidth
                                                              ) {
                                                                  columnWidth =
                                                                      parseInt(
                                                                          String(
                                                                              prevStyles.minWidth
                                                                          ).replace(
                                                                              /px|%|em|rem/g,
                                                                              ''
                                                                          )
                                                                      ) || 120
                                                              }
                                                          }

                                                          leftOffset +=
                                                              columnWidth
                                                      }

                                                      const isLastFrozenColumn =
                                                          colIndex ===
                                                          columnFreeze - 1

                                                      return {
                                                          position:
                                                              'sticky' as const,
                                                          left: `${leftOffset}px`,
                                                          zIndex: 44,
                                                          backgroundColor:
                                                              rowStyling.backgroundColor ||
                                                              '#ffffff',
                                                          ...(isLastFrozenColumn && {
                                                              borderRight: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                                                          }),
                                                      }
                                                  }

                                              return (
                                                  <TableCell
                                                      key={`${rowId}-${String(column.field)}`}
                                                      column={column}
                                                      row={
                                                          isEditing
                                                              ? editValues[
                                                                    rowId
                                                                ]
                                                              : row
                                                      }
                                                      rowIndex={index}
                                                      isEditing={isEditing}
                                                      currentValue={
                                                          currentValue
                                                      }
                                                      width={columnStyles}
                                                      frozenStyles={getFrozenBodyStyles()}
                                                      onFieldChange={(value) =>
                                                          onFieldChange(
                                                              row[idField],
                                                              column.field,
                                                              value
                                                          )
                                                      }
                                                      getDisplayValue={
                                                          getDisplayValue
                                                      }
                                                  />
                                              )
                                          }
                                      )}

                                      {enableInlineEdit && (
                                          <StyledTableCell
                                              $customBackgroundColor={
                                                  rowStyling.backgroundColor
                                              }
                                              $hasCustomBackground={
                                                  hasCustomBackground
                                              }
                                              $width="120px"
                                              style={{
                                                  minWidth: '120px',
                                                  maxWidth: '120px',
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis',
                                                  whiteSpace: 'nowrap',
                                                  fontSize:
                                                      tableToken.dataTable.table
                                                          .body.cell.fontSize,
                                              }}
                                          >
                                              <Block
                                                  display="flex"
                                                  alignItems="center"
                                                  justifyContent="center"
                                                  gap={FOUNDATION_THEME.unit[4]}
                                                  onClick={(e) =>
                                                      e.stopPropagation()
                                                  }
                                              >
                                                  {isEditing ? (
                                                      <>
                                                          <Button
                                                              onClick={() =>
                                                                  onSaveRow(
                                                                      row[
                                                                          idField
                                                                      ]
                                                                  )
                                                              }
                                                              title="Save"
                                                              buttonType={
                                                                  ButtonType.SECONDARY
                                                              }
                                                              leadingIcon={
                                                                  <Save
                                                                      size={16}
                                                                  />
                                                              }
                                                              size={
                                                                  ButtonSize.SMALL
                                                              }
                                                          />
                                                          <Button
                                                              onClick={() =>
                                                                  onCancelEdit(
                                                                      row[
                                                                          idField
                                                                      ]
                                                                  )
                                                              }
                                                              title="Cancel"
                                                              buttonType={
                                                                  ButtonType.SECONDARY
                                                              }
                                                              leadingIcon={
                                                                  <X
                                                                      size={16}
                                                                  />
                                                              }
                                                              size={
                                                                  ButtonSize.SMALL
                                                              }
                                                          />
                                                      </>
                                                  ) : (
                                                      <Button
                                                          onClick={() =>
                                                              onEditRow(
                                                                  row[idField]
                                                              )
                                                          }
                                                          title="Edit"
                                                          buttonType={
                                                              ButtonType.SECONDARY
                                                          }
                                                          leadingIcon={
                                                              <Edit size={16} />
                                                          }
                                                          size={
                                                              ButtonSize.SMALL
                                                          }
                                                      />
                                                  )}
                                              </Block>
                                          </StyledTableCell>
                                      )}

                                      {enableColumnManager && (
                                          <StyledTableCell
                                              $width="50px"
                                              $customBackgroundColor={
                                                  rowStyling.backgroundColor
                                              }
                                              $hasCustomBackground={
                                                  hasCustomBackground
                                              }
                                              style={{
                                                  minWidth: '50px',
                                                  maxWidth: '50px',
                                                  fontSize:
                                                      tableToken.dataTable.table
                                                          .body.cell.fontSize,
                                              }}
                                          />
                                      )}
                                  </TableRow>

                                  {enableRowExpansion &&
                                      isExpanded &&
                                      renderExpandedRow &&
                                      canExpand && (
                                          <TableRow
                                              key={`${rowId}-expanded`}
                                              $isClickable={false}
                                          >
                                              <ExpandedCell colSpan={colSpan}>
                                                  {renderExpandedRow({
                                                      row,
                                                      index,
                                                      isExpanded,
                                                      toggleExpansion: () =>
                                                          onRowExpand(
                                                              row[idField]
                                                          ),
                                                  })}
                                              </ExpandedCell>
                                          </TableRow>
                                      )}
                              </React.Fragment>
                          )
                      })
                    : null}
            </tbody>
        )
    }
)

TableBody.displayName = 'TableBody'

export default TableBody
