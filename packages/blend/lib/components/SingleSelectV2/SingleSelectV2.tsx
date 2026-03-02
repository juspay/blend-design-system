import { useCallback, useId, useRef, useState } from 'react'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import Block from '../Primitives/Block/Block'
import { SingleSelectV2Size, SingleSelectV2Variant } from './types'
import SingleSelectV2Popover from './SingleSelectV2Popover'
import SingleSelectV2Trigger from './SingleSelectV2Trigger'
import type { SingleSelectV2Props } from './types'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../global-utils/GlobalUtils'
import MobileSingleSelectV2 from './MobileSingleSelectV2'
import { useErrorShake } from '../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../common/error.animations'
import styled from 'styled-components'
import { getBorderRadius, setupAccessibility, getValueLabelMap } from './utils'
import { TruncatedTextWithTooltip } from '../common'

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
    enableVirtualization = items.length > 20 ? true : false,
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
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const isContainer = variant === SingleSelectV2Variant.CONTAINER

    const singleSelectTokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')
    const [open, setOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = getValueLabelMap(items)

    const isItemSelected = selected.length > 0
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

    const borderRadius = getBorderRadius(
        size,
        variant,
        singleSelectGroupPosition,
        singleSelectTokens
    ).borderRadius
    const paddingX = toPixels(
        singleSelectTokens.trigger.padding[size][variant].x
    )
    const paddingY = toPixels(
        singleSelectTokens.trigger.padding[size][variant].y
    )
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    const handleOnSelect = useCallback(
        (val: string) => onSelect(val),
        [onSelect]
    )
    const shouldShake = useErrorShake(error)

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
                onSelect={handleOnSelect}
                enableSearch={enableSearch}
                searchPlaceholder={searchPlaceholder}
                slot={slot}
                customTrigger={customTrigger}
                onBlur={onBlur}
                onFocus={onFocus}
                inline={inline}
                enableVirtualization={enableVirtualization}
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
                    <SingleSelectV2Popover
                        skeleton={skeleton}
                        open={open}
                        onOpenChange={(isOpen) => {
                            setOpen(isOpen)
                            if (isOpen) {
                                onFocus?.()
                            } else {
                                onBlur?.()
                            }
                        }}
                        items={items}
                        selected={selected}
                        onSelect={(value) => {
                            handleOnSelect(value)
                            requestAnimationFrame(() => {
                                setOpen(false)
                            })
                        }}
                        disabled={disabled}
                        minPopoverWidth={minPopoverWidth}
                        maxPopoverWidth={maxPopoverWidth}
                        maxPopoverHeight={maxPopoverHeight}
                        alignment={alignment}
                        side={side}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        enableSearch={enableSearch}
                        searchPlaceholder={searchPlaceholder}
                        enableVirtualization={enableVirtualization}
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
                                    onClick={() => setOpen(true)}
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
                                    borderRadius={borderRadius}
                                    borderRight={
                                        getBorderRadius(
                                            size,
                                            variant,
                                            singleSelectGroupPosition,
                                            singleSelectTokens
                                        ).borderRight
                                    }
                                    {...ariaAttributes}
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
