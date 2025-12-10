import React, { forwardRef, useMemo, useRef, useEffect, useState } from 'react'
import {
    Edit,
    Save,
    X,
    ChevronRight,
    ChevronDown,
    MoreHorizontal,
} from 'lucide-react'
import { styled, css } from 'styled-components'
import { motion } from 'framer-motion'
import { TableBodyProps } from './types'
import TableCell from '../TableCell'
import Block from '../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../tokens'
import Menu from '../../Menu/Menu'
import { MenuAlignment, MenuSide } from '../../Menu/types'
import Skeleton from '../../Skeleton/Skeleton'
import { getSkeletonState } from '../../Skeleton/utils'

import {
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
    Checkbox,
    CheckboxSize,
    TableTokenType,
} from '../../../main'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'

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
    $isFirstRow?: boolean
}>`
    padding: ${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]};
    text-align: left;
    vertical-align: middle;
    background-color: ${FOUNDATION_THEME.colors.gray[25]};
    ${({ $isFirstRow }) =>
        !$isFirstRow &&
        css`
            border-top: 1px solid ${FOUNDATION_THEME.colors.gray[150]};
        `}

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
    visibility: visible;
    opacity: 1;

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
        color: ${FOUNDATION_THEME.colors.gray[800]};
    }

    &:focus-visible {
        outline: 1px solid ${FOUNDATION_THEME.colors.primary[500]};
    }
`

// Actions Cell Component with Responsive Overflow
type ActionsCellProps = {
    row: Record<string, unknown>
    index: number
    isEditing: boolean
    enableInlineEdit?: boolean
    rowActions?: {
        showEditAction?: boolean
        slot1?: {
            id: string
            text?: string
            buttonType?: ButtonType
            size?: ButtonSize
            subType?: ButtonSubType
            leadingIcon?: React.ReactNode
            trailingIcon?: React.ReactNode
            disabled?:
                | boolean
                | ((row: Record<string, unknown>, index: number) => boolean)
            hidden?:
                | boolean
                | ((row: Record<string, unknown>, index: number) => boolean)
            onClick: (row: Record<string, unknown>, index: number) => void
        }
        slot2?: {
            id: string
            text?: string
            buttonType?: ButtonType
            size?: ButtonSize
            subType?: ButtonSubType
            leadingIcon?: React.ReactNode
            trailingIcon?: React.ReactNode
            disabled?:
                | boolean
                | ((row: Record<string, unknown>, index: number) => boolean)
            hidden?:
                | boolean
                | ((row: Record<string, unknown>, index: number) => boolean)
            onClick: (row: Record<string, unknown>, index: number) => void
        }
    }
    onEditRow: (rowId: unknown) => void
    onSaveRow: (rowId: unknown) => void
    onCancelEdit: (rowId: unknown) => void
    idField: string
}

const ActionsCell: React.FC<ActionsCellProps> = ({
    row,
    index,
    isEditing,
    enableInlineEdit,
    rowActions,
    onEditRow,
    onSaveRow,
    onCancelEdit,
    idField,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [visibleButtons, setVisibleButtons] = useState<number>(0)
    const [shouldShowMenu, setShouldShowMenu] = useState(false)

    // Build all available buttons
    const allButtons = useMemo(() => {
        const buttons: Array<{
            id: string
            type: 'edit' | 'save' | 'cancel' | 'slot1' | 'slot2'
            element: React.ReactNode
            menuItem?: {
                label: string
                onClick: () => void
                disabled?: boolean
                leadingSlot?: React.ReactNode
            }
        }> = []

        // Edit actions
        if (enableInlineEdit && rowActions?.showEditAction !== false) {
            if (isEditing) {
                buttons.push({
                    id: 'save',
                    type: 'save',
                    element: (
                        <Button
                            key="save"
                            onClick={() => onSaveRow(row[idField])}
                            aria-label="Save row"
                            title="Save"
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Save size={16} />}
                            size={ButtonSize.SMALL}
                        />
                    ),
                    menuItem: {
                        label: 'Save',
                        onClick: () => onSaveRow(row[idField]),
                        leadingSlot: <Save size={16} />,
                    },
                })
                buttons.push({
                    id: 'cancel',
                    type: 'cancel',
                    element: (
                        <Button
                            key="cancel"
                            onClick={() => onCancelEdit(row[idField])}
                            aria-label="Cancel editing row"
                            title="Cancel"
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<X size={16} />}
                            size={ButtonSize.SMALL}
                        />
                    ),
                    menuItem: {
                        label: 'Cancel',
                        onClick: () => onCancelEdit(row[idField]),
                        leadingSlot: <X size={16} />,
                    },
                })
            } else {
                buttons.push({
                    id: 'edit',
                    type: 'edit',
                    element: (
                        <Button
                            key="edit"
                            onClick={() => onEditRow(row[idField])}
                            aria-label="Edit row"
                            title="Edit"
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Edit size={16} />}
                            size={ButtonSize.SMALL}
                        />
                    ),
                    menuItem: {
                        label: 'Edit',
                        onClick: () => onEditRow(row[idField]),
                        leadingSlot: <Edit size={16} />,
                    },
                })
            }
        }

        // Custom slot 1
        if (
            rowActions?.slot1 &&
            !(
                (typeof rowActions.slot1.hidden === 'function'
                    ? rowActions.slot1.hidden(row, index)
                    : rowActions.slot1.hidden) ?? false
            )
        ) {
            const slot1 = rowActions.slot1
            const isDisabled =
                typeof slot1.disabled === 'function'
                    ? slot1.disabled(row, index)
                    : (slot1.disabled ?? false)

            buttons.push({
                id: slot1.id,
                type: 'slot1',
                element: (
                    <Button
                        key="slot1"
                        buttonType={slot1.buttonType ?? ButtonType.SECONDARY}
                        size={slot1.size ?? ButtonSize.SMALL}
                        subType={slot1.subType ?? ButtonSubType.DEFAULT}
                        text={slot1.text}
                        leadingIcon={slot1.leadingIcon}
                        trailingIcon={slot1.trailingIcon}
                        disabled={isDisabled}
                        onClick={() => slot1.onClick(row, index)}
                    />
                ),
                menuItem: {
                    label: slot1.text || 'Action',
                    onClick: () => slot1.onClick(row, index),
                    disabled: isDisabled,
                    leadingSlot: slot1.leadingIcon,
                },
            })
        }

        // Custom slot 2
        if (
            rowActions?.slot2 &&
            !(
                (typeof rowActions.slot2.hidden === 'function'
                    ? rowActions.slot2.hidden(row, index)
                    : rowActions.slot2.hidden) ?? false
            )
        ) {
            const slot2 = rowActions.slot2
            const isDisabled =
                typeof slot2.disabled === 'function'
                    ? slot2.disabled(row, index)
                    : (slot2.disabled ?? false)

            buttons.push({
                id: slot2.id,
                type: 'slot2',
                element: (
                    <Button
                        key="slot2"
                        buttonType={slot2.buttonType ?? ButtonType.SECONDARY}
                        size={slot2.size ?? ButtonSize.SMALL}
                        subType={slot2.subType ?? ButtonSubType.DEFAULT}
                        text={slot2.text}
                        leadingIcon={slot2.leadingIcon}
                        trailingIcon={slot2.trailingIcon}
                        disabled={isDisabled}
                        onClick={() => slot2.onClick(row, index)}
                    />
                ),
                menuItem: {
                    label: slot2.text || 'Action',
                    onClick: () => slot2.onClick(row, index),
                    disabled: isDisabled,
                    leadingSlot: slot2.leadingIcon,
                },
            })
        }

        return buttons
    }, [
        row,
        index,
        isEditing,
        enableInlineEdit,
        rowActions,
        onEditRow,
        onSaveRow,
        onCancelEdit,
        idField,
    ])

    // Calculate how many buttons can fit
    useEffect(() => {
        if (!containerRef.current || allButtons.length === 0) {
            setVisibleButtons(allButtons.length)
            setShouldShowMenu(false)
            return
        }

        const container = containerRef.current
        const containerWidth = container.offsetWidth
        const gap = 4 // gap between buttons
        const menuButtonWidth = 32 // approximate width of three dots button

        // Approximate button widths (can be more precise by measuring)
        const estimateButtonWidth = (button: (typeof allButtons)[0]) => {
            if (
                button.type === 'save' ||
                button.type === 'cancel' ||
                button.type === 'edit'
            ) {
                return 70 // Edit buttons are icon + text
            }
            // For custom buttons, estimate based on text length
            const textLength = button.menuItem?.label?.length || 0
            return Math.max(60, textLength * 8 + 40) // rough estimation
        }

        let totalWidth = 0
        let fitsCount = 0

        // First, try to fit all buttons without menu
        for (let i = 0; i < allButtons.length; i++) {
            const buttonWidth = estimateButtonWidth(allButtons[i])
            const widthWithGap = totalWidth + (i > 0 ? gap : 0) + buttonWidth

            if (widthWithGap <= containerWidth) {
                totalWidth = widthWithGap
                fitsCount = i + 1
            } else {
                break
            }
        }

        // If all buttons fit, no need for menu
        if (fitsCount === allButtons.length) {
            setVisibleButtons(allButtons.length)
            setShouldShowMenu(false)
            return
        }

        // If not all buttons fit, recalculate with menu button space
        totalWidth = 0
        fitsCount = 0

        for (let i = 0; i < allButtons.length; i++) {
            const buttonWidth = estimateButtonWidth(allButtons[i])
            const widthWithGap = totalWidth + (i > 0 ? gap : 0) + buttonWidth
            const totalWithMenu = widthWithGap + gap + menuButtonWidth

            if (totalWithMenu <= containerWidth) {
                totalWidth = widthWithGap
                fitsCount = i + 1
            } else {
                break
            }
        }

        // Ensure we have at least 1 button visible if possible, rest go to menu
        if (fitsCount === 0 && allButtons.length > 0) {
            const firstButtonWidth = estimateButtonWidth(allButtons[0])
            if (firstButtonWidth + gap + menuButtonWidth <= containerWidth) {
                fitsCount = 1
            }
        }

        setVisibleButtons(Math.max(0, fitsCount))
        setShouldShowMenu(
            fitsCount < allButtons.length && allButtons.length > 0
        )
    }, [allButtons])

    const visibleButtonElements = allButtons
        .slice(0, visibleButtons)
        .map((b) => b.element)
    const menuItems = allButtons.slice(visibleButtons).map((button) => ({
        label: button.menuItem?.label || '',
        onClick: button.menuItem?.onClick || (() => {}),
        disabled: button.menuItem?.disabled || false,
        slot1: button.menuItem?.leadingSlot,
    }))

    return (
        <Block
            ref={containerRef}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={FOUNDATION_THEME.unit[4]}
            width="100%"
            onClick={(e) => e.stopPropagation()}
            style={{
                fontSize: 'inherit',
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                lineHeight: 'inherit',
            }}
        >
            {visibleButtonElements}

            {shouldShowMenu && menuItems.length > 0 && (
                <Menu
                    trigger={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<MoreHorizontal size={16} />}
                            aria-label="More actions"
                            title="More actions"
                        />
                    }
                    items={[
                        {
                            items: menuItems,
                        },
                    ]}
                    alignment={MenuAlignment.END}
                    side={MenuSide.BOTTOM}
                />
            )}
        </Block>
    )
}

const TableBody = forwardRef<
    HTMLTableSectionElement,
    TableBodyProps<Record<string, unknown>>
>(
    (
        {
            currentData,
            visibleColumns,
            idField,
            tableTitle,
            selectedRows,
            editingRows,
            editValues,
            expandedRows,
            enableInlineEdit = false,
            enableColumnManager = true,
            enableRowExpansion = false,
            enableRowSelection = true,
            rowActions,
            columnFreeze = 0,
            mobileConfig,
            mobileOverflowColumns = [],
            onMobileOverflowClick,
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
            isLoading = false,
            showSkeleton = false,
            skeletonVariant = 'pulse',
            isRowLoading,
        },
        ref
    ) => {
        const colSpan = useMemo(() => {
            let span = visibleColumns.length
            if (enableRowSelection) span += 1
            if (enableRowExpansion) span += 1
            // Actions column - only on desktop or when not using mobile column overflow
            if (
                (enableInlineEdit || rowActions) &&
                !(mobileConfig?.isMobile && mobileConfig?.enableColumnOverflow)
            ) {
                span += 1
            }
            if (enableColumnManager) span += 1
            return span
        }, [
            visibleColumns.length,
            enableRowSelection,
            enableRowExpansion,
            enableInlineEdit,
            enableColumnManager,
            rowActions,
            mobileConfig,
        ])

        const tableToken = useResponsiveTokens('TABLE') as TableTokenType

        const globalLoadingState = isLoading || showSkeleton
        const { shouldShowSkeleton: globalShouldShowSkeleton } =
            getSkeletonState(globalLoadingState)

        const getCellSkeletonState = (
            row: Record<string, unknown>,
            rowIndex: number,
            column: (typeof visibleColumns)[0]
        ) => {
            const rowIsLoading = isRowLoading
                ? isRowLoading(row, rowIndex)
                : false
            const columnShowSkeleton =
                column.showSkeleton !== undefined
                    ? column.showSkeleton
                    : undefined

            let shouldShow = false
            if (columnShowSkeleton !== undefined) {
                shouldShow = columnShowSkeleton
            } else if (rowIsLoading) {
                shouldShow = true
            } else {
                shouldShow = globalShouldShowSkeleton
            }

            const variant = column.skeletonVariant || skeletonVariant

            return {
                shouldShowSkeleton: shouldShow,
                skeletonVariant: variant,
            }
        }

        return (
            <motion.tbody
                ref={ref}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
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

                          const rowIsLoading = isRowLoading
                              ? isRowLoading(row, index)
                              : false
                          const rowShouldShowSkeleton =
                              rowIsLoading || globalShouldShowSkeleton

                          const isSelected = selectedRows[rowId] || false
                          const rowAriaLabel = `Row ${index + 1}${isSelected ? ', selected' : ''}${isExpanded ? ', expanded' : ''}`

                          return (
                              <React.Fragment key={rowId}>
                                  <TableRow
                                      $isClickable={!!onRowClick}
                                      $customBackgroundColor={
                                          rowStyling.backgroundColor
                                      }
                                      $hasCustomBackground={hasCustomBackground}
                                      role="row"
                                      aria-rowindex={index + 1}
                                      aria-selected={
                                          enableRowSelection
                                              ? isSelected
                                              : undefined
                                      }
                                      aria-expanded={
                                          enableRowExpansion && canExpand
                                              ? isExpanded
                                              : undefined
                                      }
                                      aria-label={rowAriaLabel}
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
                                              $isFirstRow={index === 0}
                                              style={{
                                                  minWidth: `${FOUNDATION_THEME.unit[52]}`,
                                                  maxWidth: `${FOUNDATION_THEME.unit[52]}`,
                                                  ...(columnFreeze > 0 && {
                                                      position: 'sticky',
                                                      left: '0px',
                                                      zIndex: 9,
                                                      backgroundColor:
                                                          rowStyling.backgroundColor ||
                                                          FOUNDATION_THEME
                                                              .colors.gray[25],
                                                      fontSize:
                                                          tableToken.dataTable
                                                              .table.body.cell
                                                              .fontSize,
                                                  }),
                                              }}
                                          >
                                              {rowShouldShowSkeleton ? (
                                                  <Skeleton
                                                      variant={skeletonVariant}
                                                      loading
                                                      width="20px"
                                                      height="28px"
                                                      borderRadius="4px"
                                                      style={{
                                                          margin: 'auto',
                                                          display: 'block',
                                                      }}
                                                  />
                                              ) : (
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
                                                              type="button"
                                                              aria-label={
                                                                  isExpanded
                                                                      ? 'Collapse row'
                                                                      : 'Expand row'
                                                              }
                                                              aria-expanded={
                                                                  isExpanded
                                                                      ? 'true'
                                                                      : 'false'
                                                              }
                                                              onClick={() =>
                                                                  onRowExpand(
                                                                      row[
                                                                          idField
                                                                      ]
                                                                  )
                                                              }
                                                              title={
                                                                  isExpanded
                                                                      ? 'Collapse row'
                                                                      : 'Expand row'
                                                              }
                                                              style={{
                                                                  display:
                                                                      'flex',
                                                              }}
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
                                              )}
                                          </StyledTableCell>
                                      )}

                                      {enableRowSelection && (
                                          <StyledTableCell
                                              $width="50px"
                                              $customBackgroundColor={
                                                  rowStyling.backgroundColor
                                              }
                                              $hasCustomBackground={
                                                  hasCustomBackground
                                              }
                                              $isFirstRow={index === 0}
                                              style={{
                                                  minWidth: `${FOUNDATION_THEME.unit[52]}`,
                                                  maxWidth: `${FOUNDATION_THEME.unit[52]}`,
                                                  ...(columnFreeze > 0 && {
                                                      position: 'sticky',
                                                      left: enableRowExpansion
                                                          ? '50px'
                                                          : '0px',
                                                      zIndex: 9,
                                                      backgroundColor:
                                                          rowStyling.backgroundColor ||
                                                          FOUNDATION_THEME
                                                              .colors.gray[25],
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
                                                      disabled={
                                                          isEditing ||
                                                          rowShouldShowSkeleton
                                                      }
                                                      aria-label={`Select row ${index + 1}${tableTitle ? ` in ${tableTitle}` : ''}`}
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
                                                          zIndex: 8,
                                                          backgroundColor:
                                                              rowStyling.backgroundColor ||
                                                              FOUNDATION_THEME
                                                                  .colors
                                                                  .gray[25],
                                                          ...(isLastFrozenColumn && {
                                                              borderRight: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                                                          }),
                                                      }
                                                  }

                                              const cellSkeleton =
                                                  getCellSkeletonState(
                                                      row,
                                                      index,
                                                      column
                                                  )

                                              if (
                                                  cellSkeleton.shouldShowSkeleton
                                              ) {
                                                  return (
                                                      <StyledTableCell
                                                          key={`${rowId}-${String(column.field)}`}
                                                          style={{
                                                              ...columnStyles,
                                                              ...(colIndex <
                                                                  columnFreeze &&
                                                                  getFrozenBodyStyles()),
                                                          }}
                                                          $isFirstRow={
                                                              index === 0
                                                          }
                                                      >
                                                          <Skeleton
                                                              variant={
                                                                  cellSkeleton.skeletonVariant
                                                              }
                                                              loading
                                                              width="90%"
                                                              height="28px"
                                                              borderRadius="4px"
                                                              style={{
                                                                  display:
                                                                      'block',
                                                              }}
                                                          />
                                                      </StyledTableCell>
                                                  )
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
                                                      colIndex={colIndex}
                                                      tableTitle={tableTitle}
                                                      isEditing={isEditing}
                                                      currentValue={
                                                          currentValue
                                                      }
                                                      width={columnStyles}
                                                      frozenStyles={getFrozenBodyStyles()}
                                                      isFirstRow={index === 0}
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

                                      {(enableInlineEdit || rowActions) &&
                                          !(
                                              mobileConfig?.isMobile &&
                                              mobileConfig?.enableColumnOverflow
                                          ) && (
                                              <StyledTableCell
                                                  $customBackgroundColor={
                                                      hasCustomBackground
                                                          ? rowStyling.backgroundColor
                                                          : FOUNDATION_THEME
                                                                .colors
                                                                .gray[100]
                                                  }
                                                  $hasCustomBackground={true}
                                                  $width="200px"
                                                  $isFirstRow={index === 0}
                                                  style={{
                                                      maxWidth: '200px',
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap',
                                                      fontSize:
                                                          tableToken.dataTable
                                                              .table.body.cell
                                                              .fontSize,
                                                      fontWeight:
                                                          tableToken.dataTable
                                                              .table.body.cell
                                                              .fontWeight,
                                                  }}
                                              >
                                                  {rowShouldShowSkeleton ? (
                                                      <Skeleton
                                                          variant={
                                                              skeletonVariant
                                                          }
                                                          loading
                                                          width="80px"
                                                          height="32px"
                                                          borderRadius="4px"
                                                          style={{
                                                              display: 'block',
                                                          }}
                                                      />
                                                  ) : (
                                                      <ActionsCell
                                                          row={row}
                                                          index={index}
                                                          isEditing={isEditing}
                                                          enableInlineEdit={
                                                              enableInlineEdit
                                                          }
                                                          rowActions={
                                                              rowActions
                                                          }
                                                          onEditRow={onEditRow}
                                                          onSaveRow={onSaveRow}
                                                          onCancelEdit={
                                                              onCancelEdit
                                                          }
                                                          idField={idField}
                                                      />
                                                  )}
                                              </StyledTableCell>
                                          )}

                                      {mobileConfig?.enableColumnOverflow &&
                                          mobileOverflowColumns.length > 0 &&
                                          onMobileOverflowClick && (
                                              <StyledTableCell
                                                  $width="40px"
                                                  $customBackgroundColor={
                                                      rowStyling.backgroundColor
                                                  }
                                                  $hasCustomBackground={
                                                      hasCustomBackground
                                                  }
                                                  $isFirstRow={index === 0}
                                                  style={{
                                                      minWidth: '40px',
                                                      maxWidth: '40px',
                                                      fontSize:
                                                          tableToken.dataTable
                                                              .table.body.cell
                                                              .fontSize,
                                                  }}
                                              >
                                                  <Block
                                                      display="flex"
                                                      alignItems="center"
                                                      justifyContent="center"
                                                      onClick={(e) => {
                                                          e.stopPropagation()
                                                          onMobileOverflowClick(
                                                              row
                                                          )
                                                      }}
                                                  >
                                                      <ExpandButton
                                                          type="button"
                                                          aria-label="View more details"
                                                          title="View more details"
                                                          onClick={() =>
                                                              onMobileOverflowClick(
                                                                  row
                                                              )
                                                          }
                                                          style={{
                                                              color: FOUNDATION_THEME
                                                                  .colors
                                                                  .gray[800],
                                                          }}
                                                      >
                                                          <ChevronRight
                                                              size={16}
                                                          />
                                                      </ExpandButton>
                                                  </Block>
                                              </StyledTableCell>
                                          )}

                                      {/* Column Manager - Always rightmost (empty cell in body, actual manager in header) */}
                                      {enableColumnManager && (
                                          <StyledTableCell
                                              $width="48px"
                                              $customBackgroundColor={
                                                  rowStyling.backgroundColor
                                              }
                                              $hasCustomBackground={
                                                  hasCustomBackground
                                              }
                                              $isFirstRow={index === 0}
                                              style={{
                                                  minWidth:
                                                      FOUNDATION_THEME.unit[48],
                                                  maxWidth:
                                                      FOUNDATION_THEME.unit[48],
                                                  fontSize:
                                                      tableToken.dataTable.table
                                                          .body.cell.fontSize,
                                                  position: 'sticky',
                                                  right: 0,
                                                  backgroundColor:
                                                      hasCustomBackground
                                                          ? rowStyling.backgroundColor
                                                          : FOUNDATION_THEME
                                                                .colors
                                                                .gray[100],
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
            </motion.tbody>
        )
    }
)

TableBody.displayName = 'TableBody'

export default TableBody
