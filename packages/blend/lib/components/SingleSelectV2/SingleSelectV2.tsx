import { isValidElement, useCallback, useId, useMemo, useState } from 'react'
import type { AriaAttributes } from 'react'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import Block from '../Primitives/Block/Block'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type SingleSelectV2Props,
} from './SingleSelectV2.types'
import SingleSelectV2Menu from './SingleSelectV2Menu'
import SingleSelectV2Trigger from './SingleSelectV2Trigger'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import MobileSingleSelectV2 from './MobileSingleSelectV2'
import { getBorderRadius, getValueLabelMap, setupAccessibility } from './utils'

const SingleSelectV2 = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = {},
    size = SingleSelectV2Size.MD,
    items = [],
    variant = SingleSelectV2Variant.CONTAINER,
    open: controlledOpen,
    onOpenChange: onControlledOpenChange,
    selected,
    onSelect,
    search,
    slot,
    customTrigger,
    usePanelOnMobile = true,
    menuPosition,
    menuDimensions,
    triggerDimensions,
    inline = false,
    enableVirtualization,
    virtualListItemHeight,
    virtualListOverscan,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    allowCustomValue = false,
    customValueLabel = 'Specify',
    singleSelectGroupPosition,
    ...rest
}: SingleSelectV2Props) => {
    const { disabled, name, ...buttonRest } = rest as {
        disabled?: boolean
        name?: string
        [key: string]: unknown
    }

    const breakpoints = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakpoints.breakPointLabel === 'sm'
    const isContainer = variant === SingleSelectV2Variant.CONTAINER

    const singleSelectTokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')

    const [internalOpen, setInternalOpen] = useState(false)
    const open =
        controlledOpen !== undefined ? Boolean(controlledOpen) : internalOpen

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (controlledOpen === undefined) setInternalOpen(nextOpen)
            onControlledOpenChange?.(nextOpen)
        },
        [controlledOpen, onControlledOpenChange]
    )

    const valueLabelMap = useMemo(() => getValueLabelMap(items), [items])
    const safeItems = items ?? []
    const isItemSelected = Boolean(selected)
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SingleSelectV2Size.LG

    const generatedId = useId()
    const { uniqueName, hintTextId, errorMessageId, menuId, ariaAttributes } =
        setupAccessibility({
            name,
            generatedId,
            label,
            hintText,
            error: error.show,
            errorMessage: error.message,
            rest: buttonRest,
            prefix: 'singleselectv2',
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

    const borderConfig = getBorderRadius(
        size,
        variant,
        singleSelectGroupPosition,
        singleSelectTokens
    )

    const handleSelect = useCallback(
        (value: string) => {
            onSelect(value)
            handleOpenChange(false)
        },
        [onSelect, handleOpenChange]
    )

    const shouldEnableVirtualization =
        enableVirtualization ?? safeItems.length > 20

    if (customTrigger && !isValidElement(customTrigger)) {
        throw new Error(
            'SingleSelectV2: customTrigger must be a valid React element.'
        )
    }

    if (isSmallScreen && usePanelOnMobile) {
        return (
            <MobileSingleSelectV2
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                required={required}
                helpIconText={helpIconText}
                placeholder={placeholder}
                error={error}
                size={size}
                items={safeItems}
                variant={variant}
                disabled={disabled}
                name={name}
                selected={selected}
                onSelect={handleSelect}
                search={search}
                slot={slot}
                customTrigger={customTrigger}
                inline={inline}
                triggerDimensions={triggerDimensions}
                enableVirtualization={shouldEnableVirtualization}
                virtualListItemHeight={virtualListItemHeight}
                virtualListOverscan={virtualListOverscan}
                onEndReached={onEndReached}
                endReachedThreshold={endReachedThreshold}
                hasMore={hasMore}
                loadingComponent={loadingComponent}
                skeleton={skeleton}
                allowCustomValue={allowCustomValue}
                customValueLabel={customValueLabel}
                {...buttonRest}
            />
        )
    }

    const triggerWidth = triggerDimensions?.width ?? 'fit-content'

    return (
        <Block
            data-single-select-v2={label || 'single-select-v2'}
            data-status={disabled ? 'disabled' : 'enabled'}
            width={triggerWidth === '100%' ? '100%' : 'fit-content'}
            display="flex"
            flexDirection="column"
            gap={singleSelectTokens.gap}
            maxWidth={'100%'}
        >
            {isContainer &&
                (!isSmallScreen || size !== SingleSelectV2Size.LG) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        helpIconHintText={helpIconText}
                        name={uniqueName}
                        required={required}
                        tokens={singleSelectTokens}
                    />
                )}
            <Block
                display="flex"
                {...((!inline || isContainer) && {
                    height: singleSelectTokens.trigger.height[size][variant],
                    maxHeight: singleSelectTokens.trigger.height[size][variant],
                })}
            >
                <Block
                    position="relative"
                    width={triggerWidth === '100%' ? '100%' : 'fit-content'}
                    maxWidth={triggerWidth === '100%' ? '100%' : 'fit-content'}
                    display="flex"
                    alignItems="center"
                >
                    <SingleSelectV2Menu
                        skeleton={skeleton}
                        open={open}
                        onOpenChange={handleOpenChange}
                        items={safeItems}
                        selected={selected}
                        onSelect={handleSelect}
                        disabled={disabled}
                        menuDimensions={menuDimensions}
                        menuPosition={menuPosition}
                        search={search}
                        enableVirtualization={shouldEnableVirtualization}
                        virtualListItemHeight={virtualListItemHeight}
                        virtualListOverscan={virtualListOverscan}
                        onEndReached={onEndReached}
                        endReachedThreshold={endReachedThreshold}
                        hasMore={hasMore}
                        loadingComponent={loadingComponent}
                        allowCustomValue={allowCustomValue}
                        customValueLabel={customValueLabel}
                        menuId={menuId}
                        size={size}
                        variant={variant}
                        trigger={
                            customTrigger || (
                                <SingleSelectV2Trigger
                                    size={size}
                                    selected={selected}
                                    label={label || ''}
                                    name={uniqueName}
                                    placeholder={placeholder}
                                    required={required || false}
                                    valueLabelMap={valueLabelMap}
                                    open={open}
                                    slot={slot}
                                    variant={variant}
                                    isSmallScreenWithLargeSize={
                                        isSmallScreenWithLargeSize
                                    }
                                    isItemSelected={isItemSelected}
                                    singleSelectTokens={singleSelectTokens}
                                    inline={inline}
                                    error={error.show}
                                    disabled={disabled}
                                    triggerDimensions={triggerDimensions}
                                    singleSelectGroupPosition={
                                        singleSelectGroupPosition
                                    }
                                    borderRadius={borderConfig.borderRadius}
                                    borderRight={borderConfig.borderRight}
                                    {...triggerAriaAttributes}
                                    {...buttonRest}
                                />
                            )
                        }
                    />
                </Block>
            </Block>
            {isContainer && (
                <InputFooter
                    hintText={hintText}
                    error={error.show}
                    errorMessage={error.message}
                    tokens={singleSelectTokens}
                    hintTextId={hintTextId}
                    errorMessageId={errorMessageId}
                />
            )}
        </Block>
    )
}

SingleSelectV2.displayName = 'SingleSelectV2'

export default SingleSelectV2
