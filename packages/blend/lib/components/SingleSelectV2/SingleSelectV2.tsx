import { isValidElement, useCallback, useId, useMemo, useState } from 'react'
import type { AriaAttributes } from 'react'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import Block from '../Primitives/Block/Block'
import { SingleSelectV2Size, SingleSelectV2Variant } from './types'
import SingleSelectV2Menu from './SingleSelectV2Menu'
import SingleSelectV2Trigger from './SingleSelectV2Trigger'
import type { SingleSelectV2Props } from './types'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import MobileSingleSelectV2 from './MobileSingleSelectV2'
import { useErrorShake } from '../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../common/error.animations'
import styled from 'styled-components'
import { getBorderRadius, getValueLabelMap, setupAccessibility } from './utils'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const SingleSelectV2 = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = false,
    errorMessage,
    size = SingleSelectV2Size.MEDIUM,
    items = [],
    name,
    variant = SingleSelectV2Variant.CONTAINER,
    disabled,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange: onControlledOpenChange,
    selected,
    onSelect,
    enableSearch,
    searchPlaceholder,
    slot,
    customTrigger,
    usePanelOnMobile = true,
    alignment,
    side,
    sideOffset,
    alignOffset,
    minPopoverWidth,
    maxPopoverWidth,
    maxPopoverHeight,
    onBlur,
    onFocus,
    inline = false,
    fullWidth = false,
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
    maxTriggerWidth,
    minTriggerWidth,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    singleSelectGroupPosition,
    ...rest
}: SingleSelectV2Props) => {
    const breakpoints = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakpoints.breakPointLabel === 'sm'
    const isMobile = breakpoints.innerWidth < 1024

    const isContainer = variant === SingleSelectV2Variant.CONTAINER

    const singleSelectTokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')

    const isControlledOpen = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const open = isControlledOpen ? Boolean(controlledOpen) : internalOpen
    const setOpenState = useCallback(
        (nextOpen: boolean) => {
            if (!isControlledOpen) setInternalOpen(nextOpen)
            onControlledOpenChange?.(nextOpen)
            if (nextOpen) onFocus?.()
            else onBlur?.()
        },
        [isControlledOpen, onControlledOpenChange, onFocus, onBlur]
    )

    const valueLabelMap = useMemo(() => getValueLabelMap(items), [items])
    const isItemSelected = Boolean(selected)
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SingleSelectV2Size.LARGE

    const generatedId = useId()
    const { uniqueName, hintTextId, errorMessageId, menuId, ariaAttributes } =
        setupAccessibility({
            name,
            generatedId,
            label,
            hintText,
            error,
            errorMessage,
            rest,
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
            setOpenState(false)
        },
        [onSelect, setOpenState]
    )
    const shouldShake = useErrorShake(error)
    const shouldEnableVirtualization = enableVirtualization ?? items.length > 20

    if (customTrigger && !isValidElement(customTrigger)) {
        throw new Error(
            'SingleSelectV2: customTrigger must be a valid React element.'
        )
    }

    if (isMobile && usePanelOnMobile) {
        return (
            <MobileSingleSelectV2
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                required={required}
                helpIconText={helpIconText}
                placeholder={placeholder}
                error={error}
                errorMessage={errorMessage}
                size={size}
                items={items}
                name={name}
                variant={variant}
                disabled={disabled}
                selected={selected}
                onSelect={handleSelect}
                enableSearch={enableSearch}
                searchPlaceholder={searchPlaceholder}
                slot={slot}
                customTrigger={customTrigger}
                onBlur={onBlur}
                onFocus={onFocus}
                inline={inline}
                fullWidth={fullWidth}
                enableVirtualization={shouldEnableVirtualization}
                virtualListItemHeight={virtualListItemHeight}
                virtualListOverscan={virtualListOverscan}
                onEndReached={onEndReached}
                endReachedThreshold={endReachedThreshold}
                hasMore={hasMore}
                loadingComponent={loadingComponent}
                skeleton={skeleton}
                maxTriggerWidth={maxTriggerWidth}
                minTriggerWidth={minTriggerWidth}
                allowCustomValue={allowCustomValue}
                customValueLabel={customValueLabel}
            />
        )
    }

    return (
        <Block
            data-single-select-v2={label || 'single-select-v2'}
            data-status={disabled ? 'disabled' : 'enabled'}
            width={fullWidth ? '100%' : 'fit-content'}
            display="flex"
            flexDirection="column"
            gap={singleSelectTokens.gap}
            maxWidth={'100%'}
        >
            {isContainer &&
                (!isSmallScreen || size !== SingleSelectV2Size.LARGE) && (
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
                <Wrapper
                    position="relative"
                    style={getErrorShakeStyle(shouldShake)}
                    width={fullWidth ? '100%' : 'fit-content'}
                    maxWidth={fullWidth ? '100%' : 'fit-content'}
                    display="flex"
                    alignItems="center"
                >
                    <SingleSelectV2Menu
                        skeleton={skeleton}
                        open={open}
                        onOpenChange={setOpenState}
                        items={items}
                        selected={selected}
                        onSelect={handleSelect}
                        disabled={disabled}
                        minMenuWidth={minPopoverWidth}
                        maxMenuWidth={maxPopoverWidth}
                        maxMenuHeight={maxPopoverHeight}
                        alignment={alignment}
                        side={side}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        enableSearch={enableSearch}
                        searchPlaceholder={searchPlaceholder}
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
                                    error={error}
                                    disabled={disabled}
                                    maxTriggerWidth={maxTriggerWidth}
                                    minTriggerWidth={minTriggerWidth}
                                    singleSelectGroupPosition={
                                        singleSelectGroupPosition
                                    }
                                    fullWidth={fullWidth}
                                    borderRadius={borderConfig.borderRadius}
                                    borderRight={borderConfig.borderRight}
                                    {...triggerAriaAttributes}
                                />
                            )
                        }
                    />
                </Wrapper>
            </Block>
            {isContainer && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
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
