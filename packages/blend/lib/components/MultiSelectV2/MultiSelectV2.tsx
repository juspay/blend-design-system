import React, { useCallback, useId, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import styled from 'styled-components'
import type { AriaAttributes } from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useDropdownInteractionLock } from '../../hooks'
import { useErrorShake } from '../common/useErrorShake'
import {
    errorShakeAnimation,
    getErrorShakeStyle,
} from '../common/error.animations'
import { setupAccessibility } from '../SingleSelect/utils'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import {
    MultiSelectV2Alignment,
    MultiSelectV2SelectionTagType,
    MultiSelectV2Size,
    MultiSelectV2Variant,
    type MultiSelectV2Props,
} from './types'
import MultiSelectV2Menu from './MultiSelectV2Menu'
import MultiSelectV2Trigger from './MultiSelectV2Trigger'
import MobileMultiSelectV2 from './MobileMultiSelectV2'
import {
    getMultiSelectBorderRadius,
    getMultiSelectCrossBorderRadius,
    getValueLabelMap,
    handleSelectAll,
} from './utils'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const MultiSelectV2 = ({
    selectedValues,
    onChange,
    items,
    label,
    subLabel,
    disabled,
    helpIconText,
    name,
    required,
    variant = MultiSelectV2Variant.CONTAINER,
    selectionTagType = MultiSelectV2SelectionTagType.COUNT,
    slot,
    hintText,
    placeholder,
    size = MultiSelectV2Size.MEDIUM,
    enableSearch = true,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    maxSelections,
    customTrigger,
    usePanelOnMobile = true,
    minPopoverWidth,
    maxPopoverWidth,
    maxPopoverHeight,
    alignment = MultiSelectV2Alignment.START,
    side,
    sideOffset,
    alignOffset,
    inline = false,
    onBlur,
    onFocus,
    error,
    errorMessage,
    showActionButtons,
    primaryAction,
    secondaryAction,
    showItemDividers = false,
    showHeaderBorder = false,
    fullWidth = false,
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 5,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    maxTriggerWidth,
    minTriggerWidth,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    showClearButton,
    onClearAllClick,
    onOpenChange,
    multiSelectGroupPosition,
}: MultiSelectV2Props) => {
    const safeItems = items ?? []
    const breakpoints = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakpoints.breakPointLabel === 'sm'
    const isMobile = breakpoints.innerWidth < BREAKPOINTS.lg
    const isContainer = variant === MultiSelectV2Variant.CONTAINER
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')
    const [open, setOpen] = useState(false)
    const valueLabelMap = useMemo(
        () => getValueLabelMap(safeItems),
        [safeItems]
    )
    const shouldVirtualize = enableVirtualization && safeItems.length > 20
    const shouldShowClearButton =
        (showClearButton ?? isContainer) && selectedValues.length > 0
    const shouldShowActionButtons =
        showActionButtons !== undefined
            ? showActionButtons
            : !!(primaryAction || secondaryAction)
    const shouldShake = useErrorShake(error || false)

    const generatedId = useId()
    const {
        uniqueName,
        labelId,
        hintTextId,
        errorMessageId,
        menuId,
        ariaAttributes,
    } = setupAccessibility({
        name,
        generatedId,
        label,
        hintText,
        error,
        errorMessage,
        prefix: 'multiselectv2',
        needsMenuId: true,
    })

    const triggerAriaAttributes: Pick<
        AriaAttributes,
        'aria-describedby' | 'aria-labelledby' | 'aria-label' | 'aria-invalid'
    > = {
        'aria-describedby': ariaAttributes['aria-describedby'] as
            | string
            | undefined,
        'aria-labelledby': ariaAttributes['aria-labelledby'] as
            | string
            | undefined,
        'aria-label': ariaAttributes['aria-label'] as string | undefined,
        'aria-invalid': ariaAttributes['aria-invalid'] as boolean | undefined,
    }

    const handleOpenChange = useCallback(
        (isOpen: boolean) => {
            setOpen(isOpen)
            if (isOpen) {
                onFocus?.()
            } else {
                onBlur?.()
            }
            onOpenChange?.(isOpen)
        },
        [onFocus, onBlur, onOpenChange]
    )

    const handleClearClick = useCallback(() => {
        if (onClearAllClick) onClearAllClick()
        else onChange([])
    }, [onClearAllClick, onChange])

    const handleClearKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClearClick()
            }
        },
        [handleClearClick]
    )

    useDropdownInteractionLock(!isMobile && open)

    const mobileSharedProps = {
        selectedValues,
        onChange,
        items: safeItems,
        label,
        subLabel,
        disabled,
        helpIconText,
        name,
        required,
        variant,
        selectionTagType,
        slot,
        hintText,
        placeholder,
        size,
        enableSearch,
        searchPlaceholder,
        enableSelectAll,
        selectAllText,
        maxSelections,
        customTrigger,
        onBlur,
        onFocus,
        error,
        errorMessage,
        showActionButtons: shouldShowActionButtons,
        primaryAction: primaryAction
            ? {
                  ...primaryAction,
                  onClick: () => primaryAction.onClick(selectedValues),
              }
            : undefined,
        secondaryAction,
        showItemDividers,
        showHeaderBorder,
        enableVirtualization: shouldVirtualize,
        virtualListItemHeight,
        virtualListOverscan,
        onEndReached,
        endReachedThreshold,
        hasMore,
        loadingComponent,
        skeleton,
        allowCustomValue,
        customValueLabel,
        onOpenChange,
    }

    if (isMobile && usePanelOnMobile) {
        return <MobileMultiSelectV2 {...mobileSharedProps} />
    }

    const borderRadius = getMultiSelectBorderRadius(
        size,
        variant,
        multiSelectGroupPosition,
        multiSelectTokens,
        shouldShowClearButton
    )
    const clearButtonBorder = getMultiSelectCrossBorderRadius(
        size,
        variant,
        multiSelectGroupPosition,
        multiSelectTokens
    )

    return (
        <Block
            data-multi-select="multi-select"
            data-status={disabled ? 'disabled' : 'enabled'}
            width={fullWidth ? '100%' : 'fit-content'}
            maxWidth={fullWidth ? '100%' : 'fit-content'}
            display="flex"
            flexDirection="column"
            gap={multiSelectTokens.gap}
        >
            {isContainer &&
                (!isSmallScreen || size !== MultiSelectV2Size.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        helpIconHintText={helpIconText}
                        name={uniqueName}
                        required={required}
                        tokens={multiSelectTokens}
                        labelId={labelId}
                    />
                )}

            <Block
                display="flex"
                {...((!inline || isContainer) && {
                    height: multiSelectTokens.trigger.height[size][variant],
                    maxHeight: multiSelectTokens.trigger.height[size][variant],
                })}
            >
                <Wrapper
                    position="relative"
                    style={getErrorShakeStyle(shouldShake)}
                    width={fullWidth ? '100%' : 'fit-content'}
                    maxWidth={fullWidth ? '100%' : 'fit-content'}
                    display="flex"
                    alignItems="center"
                >
                    <MultiSelectV2Menu
                        skeleton={skeleton}
                        items={safeItems}
                        selected={selectedValues}
                        onSelect={onChange}
                        disabled={disabled}
                        enableSearch={enableSearch}
                        searchPlaceholder={searchPlaceholder}
                        enableSelectAll={enableSelectAll}
                        selectAllText={selectAllText}
                        maxSelections={maxSelections}
                        onSelectAll={
                            enableSelectAll
                                ? (selectAll, filteredItems) =>
                                      handleSelectAll(
                                          selectAll,
                                          filteredItems,
                                          selectedValues,
                                          onChange
                                      )
                                : undefined
                        }
                        minMenuWidth={minPopoverWidth}
                        maxMenuWidth={maxPopoverWidth}
                        maxMenuHeight={maxPopoverHeight}
                        alignment={alignment}
                        side={side}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        open={open}
                        onOpenChange={handleOpenChange}
                        showActionButtons={shouldShowActionButtons}
                        primaryAction={
                            primaryAction
                                ? {
                                      ...primaryAction,
                                      onClick: () =>
                                          primaryAction.onClick(selectedValues),
                                  }
                                : undefined
                        }
                        secondaryAction={secondaryAction}
                        enableVirtualization={shouldVirtualize}
                        virtualListItemHeight={virtualListItemHeight}
                        virtualListOverscan={virtualListOverscan}
                        onEndReached={onEndReached}
                        endReachedThreshold={endReachedThreshold}
                        hasMore={hasMore}
                        loadingComponent={loadingComponent}
                        menuId={menuId}
                        size={size}
                        variant={variant}
                        trigger={
                            customTrigger || (
                                <MultiSelectV2Trigger
                                    selectedValues={selectedValues}
                                    slot={slot}
                                    variant={variant}
                                    size={size}
                                    isSmallScreen={isSmallScreen}
                                    name={uniqueName}
                                    label={label ?? ''}
                                    placeholder={placeholder ?? ''}
                                    required={required ?? false}
                                    selectionTagType={selectionTagType}
                                    valueLabelMap={valueLabelMap}
                                    open={open}
                                    multiSelectTokens={multiSelectTokens}
                                    inline={inline}
                                    error={error}
                                    disabled={disabled}
                                    maxTriggerWidth={maxTriggerWidth}
                                    minTriggerWidth={minTriggerWidth}
                                    fullWidth={fullWidth}
                                    borderRadius={borderRadius}
                                    borderRight={
                                        multiSelectGroupPosition
                                            ? clearButtonBorder.borderRight
                                            : undefined
                                    }
                                    {...triggerAriaAttributes}
                                />
                            )
                        }
                        allowCustomValue={allowCustomValue}
                        customValueLabel={customValueLabel}
                    />

                    {shouldShowClearButton && (
                        <PrimitiveButton
                            disabled={disabled}
                            data-element="clear-button"
                            type="button"
                            borderRadius={clearButtonBorder.borderRadius}
                            backgroundColor={
                                multiSelectTokens.trigger.backgroundColor[
                                    variant
                                ].closed
                            }
                            contentCentered
                            height="100%"
                            style={{
                                aspectRatio: 1,
                                opacity: 1,
                                cursor: disabled ? 'not-allowed' : 'pointer',
                            }}
                            onClick={handleClearClick}
                            onKeyDown={handleClearKeyDown}
                            aria-label="Clear selection"
                            tabIndex={disabled ? -1 : 0}
                            border={
                                multiSelectTokens.trigger.outline[variant][
                                    error ? 'error' : 'closed'
                                ]
                            }
                            borderRight={clearButtonBorder.borderRight}
                            borderLeft="0px solid !important"
                            _hover={{
                                backgroundColor:
                                    multiSelectTokens.trigger.backgroundColor[
                                        variant
                                    ].hover,
                            }}
                            _focus={{
                                backgroundColor:
                                    multiSelectTokens.trigger.backgroundColor[
                                        variant
                                    ].focus,
                                border: multiSelectTokens.trigger.outline[
                                    variant
                                ].focus,
                            }}
                            color={
                                disabled
                                    ? multiSelectTokens.label.color.disabled
                                    : multiSelectTokens.label.color.default
                            }
                        >
                            <X size={16} aria-hidden="true" />
                        </PrimitiveButton>
                    )}
                </Wrapper>
            </Block>

            {isContainer && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                    tokens={multiSelectTokens}
                    hintTextId={hintTextId}
                    errorMessageId={errorMessageId}
                />
            )}
        </Block>
    )
}

MultiSelectV2.displayName = 'MultiSelectV2'

export default React.memo(MultiSelectV2)
