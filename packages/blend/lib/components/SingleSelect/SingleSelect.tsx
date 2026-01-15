import { useCallback, useId, useRef, useState } from 'react'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import {
    type SelectMenuGroupType,
    type SelectMenuItemType,
    SelectMenuSize,
    SelectMenuVariant,
} from '../Select'
import SingleSelectMenu from './SingleSelectMenu'
import { ChevronDown } from 'lucide-react'
import type { SingleSelectProps } from './types'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import type { SingleSelectTokensType } from './singleSelect.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../global-utils/GlobalUtils'
import MobileSingleSelect from './MobileSingleSelect'
import { useErrorShake } from '../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../common/error.animations'
import styled from 'styled-components'
import { setupAccessibility } from './utils'
import { TruncatedTextWithTooltip } from '../common'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const map = function getValueLabelMap(
    groups: SelectMenuGroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}

    function traverse(items: SelectMenuItemType[]) {
        for (const item of items) {
            map[item.value] = item.label
            if (item.subMenu) {
                traverse(item.subMenu)
            }
        }
    }

    for (const group of groups) {
        traverse(group.items)
    }

    return map
}

const SingleSelect = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = false,
    errorMessage,
    size = SelectMenuSize.MEDIUM,
    items = [],
    name,
    variant = SelectMenuVariant.CONTAINER,
    disabled,
    selected,
    onSelect,
    enableSearch,
    searchPlaceholder,
    slot,
    customTrigger,
    useDrawerOnMobile = true,
    alignment,
    side,
    sideOffset,
    alignOffset,
    minMenuWidth,
    maxMenuWidth,
    maxMenuHeight,

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
    ...rest
}: SingleSelectProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const isContainer = variant === SelectMenuVariant.CONTAINER

    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')
    const [open, setOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)

    const isItemSelected = selected.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SelectMenuSize.LARGE

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
            prefix: 'singleselect',
            needsMenuId: true,
        })

    const borderRadius = singleSelectTokens.trigger.borderRadius[size][variant]
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
        [onSelect, selected]
    )
    const shouldShake = useErrorShake(error)

    if (isMobile && useDrawerOnMobile) {
        return (
            <MobileSingleSelect
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
            data-single-select={label || 'single-select'}
            data-status={disabled ? 'disabled' : 'enabled'}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={singleSelectTokens.gap}
            maxWidth={'100%'}
        >
            {isContainer &&
                (!isSmallScreen || size !== SelectMenuSize.LARGE) && (
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
                    <SingleSelectMenu
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
                        minMenuWidth={minMenuWidth}
                        maxMenuWidth={maxMenuWidth}
                        maxMenuHeight={maxMenuHeight}
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
                        trigger={
                            customTrigger || (
                                <PrimitiveButton
                                    data-element="single-select-button"
                                    type="button"
                                    disabled={disabled}
                                    maxWidth={maxTriggerWidth}
                                    minWidth={minTriggerWidth}
                                    width={
                                        fullWidth
                                            ? '100%'
                                            : maxTriggerWidth || minTriggerWidth
                                              ? undefined
                                              : 'fit-content'
                                    }
                                    name={uniqueName}
                                    id={uniqueName}
                                    position="relative"
                                    display="flex"
                                    alignItems="center"
                                    overflow="hidden"
                                    justifyContent="space-between"
                                    gap={8}
                                    borderRadius={borderRadius}
                                    border={
                                        singleSelectTokens.trigger.outline[
                                            variant
                                        ][
                                            error
                                                ? 'error'
                                                : open
                                                  ? 'open'
                                                  : 'closed'
                                        ]
                                    }
                                    {...ariaAttributes}
                                    {...((!inline || isContainer) && {
                                        paddingX: paddingX,
                                        paddingY: paddingY,
                                        backgroundColor:
                                            singleSelectTokens.trigger
                                                .backgroundColor[variant][
                                                error
                                                    ? 'error'
                                                    : open
                                                      ? 'open'
                                                      : 'closed'
                                            ],
                                        height: singleSelectTokens.trigger
                                            .height[size][variant],
                                        maxHeight:
                                            singleSelectTokens.trigger.height[
                                                size
                                            ][variant],
                                        ...(!disabled && {
                                            _hover: {
                                                border: singleSelectTokens
                                                    .trigger.outline[variant][
                                                    error ? 'error' : 'hover'
                                                ],
                                                backgroundColor:
                                                    singleSelectTokens.trigger
                                                        .backgroundColor
                                                        .container[
                                                        error
                                                            ? 'error'
                                                            : 'hover'
                                                    ],
                                            },
                                        }),
                                        _focus: {
                                            border: singleSelectTokens.trigger
                                                .outline[variant][
                                                error ? 'error' : 'focus'
                                            ],
                                            backgroundColor:
                                                singleSelectTokens.trigger
                                                    .backgroundColor.container[
                                                    error ? 'error' : 'focus'
                                                ],
                                        },
                                        _disabled: {
                                            cursor: 'not-allowed',
                                            backgroundColor:
                                                singleSelectTokens.trigger
                                                    .backgroundColor[variant][
                                                    'closed'
                                                ],
                                            color: singleSelectTokens.label
                                                .color.disabled,
                                        },
                                    })}
                                >
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={8}
                                        style={{
                                            flex: 1,
                                            minWidth: 0,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {slot && (
                                            <Block
                                                data-element="icon"
                                                ref={slotRef}
                                                contentCentered
                                                style={{
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {slot}
                                            </Block>
                                        )}
                                        {isSmallScreenWithLargeSize &&
                                        isContainer ? (
                                            <Block
                                                as="span"
                                                textAlign="left"
                                                paddingTop={
                                                    isSmallScreenWithLargeSize &&
                                                    isItemSelected
                                                        ? paddingY * 1.5
                                                        : 0
                                                }
                                                style={{
                                                    textAlign: 'left',
                                                    flexGrow: 1,
                                                    flexShrink: 1,
                                                    minWidth: 0,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <Block
                                                    position="absolute"
                                                    top={
                                                        isItemSelected
                                                            ? toPixels(
                                                                  paddingY -
                                                                      paddingY /
                                                                          1.3
                                                              ) +
                                                              (!required
                                                                  ? 3
                                                                  : 0)
                                                            : '50%'
                                                    }
                                                    left={toPixels(
                                                        paddingInlineStart
                                                    )}
                                                    height={'max-content'}
                                                    style={{
                                                        transition:
                                                            'all 0.2s ease-in-out',
                                                        transform:
                                                            isItemSelected
                                                                ? 'scale(0.95)'
                                                                : 'translateY(-50%) scale(1)',
                                                        transformOrigin:
                                                            'left center',
                                                        pointerEvents: 'none',
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <FloatingLabels
                                                        label={label || ''}
                                                        required={
                                                            required || false
                                                        }
                                                        name={name || ''}
                                                        isFocused={
                                                            isItemSelected
                                                        }
                                                    />
                                                </Block>
                                                {selected && (
                                                    <TruncatedTextWithTooltip
                                                        text={
                                                            valueLabelMap[
                                                                selected
                                                            ] || selected
                                                        }
                                                        style={{
                                                            fontSize:
                                                                singleSelectTokens
                                                                    .trigger
                                                                    .placeholder
                                                                    .fontSize,
                                                            color: disabled
                                                                ? singleSelectTokens
                                                                      .label
                                                                      .color
                                                                      .disabled
                                                                : singleSelectTokens
                                                                      .trigger
                                                                      .placeholder
                                                                      .color,
                                                            fontWeight:
                                                                singleSelectTokens
                                                                    .trigger
                                                                    .placeholder
                                                                    .fontWeight,
                                                        }}
                                                    />
                                                )}
                                            </Block>
                                        ) : (
                                            <TruncatedTextWithTooltip
                                                text={
                                                    selected
                                                        ? valueLabelMap[
                                                              selected
                                                          ] || selected
                                                        : placeholder
                                                }
                                                data-element="placeholder"
                                                data-id={
                                                    selected
                                                        ? valueLabelMap[
                                                              selected
                                                          ] || selected
                                                        : placeholder
                                                }
                                                style={{
                                                    flexGrow: 1,
                                                    flexShrink: 1,
                                                    minWidth: 0,
                                                    color: disabled
                                                        ? singleSelectTokens
                                                              .label.color
                                                              .disabled
                                                        : selected
                                                          ? singleSelectTokens
                                                                .trigger
                                                                .selectedValue
                                                                .color
                                                          : singleSelectTokens
                                                                .trigger
                                                                .placeholder
                                                                .color,
                                                    fontWeight: selected
                                                        ? singleSelectTokens
                                                              .trigger
                                                              .selectedValue
                                                              .fontWeight
                                                        : singleSelectTokens
                                                              .trigger
                                                              .placeholder
                                                              .fontWeight,
                                                    fontSize: selected
                                                        ? singleSelectTokens
                                                              .trigger
                                                              .selectedValue
                                                              .fontSize
                                                        : singleSelectTokens
                                                              .trigger
                                                              .placeholder
                                                              .fontSize,
                                                }}
                                            />
                                        )}
                                    </Block>
                                    <Block
                                        data-element="chevron-icon"
                                        contentCentered
                                        style={{
                                            flexShrink: 0,
                                        }}
                                    >
                                        <ChevronDown
                                            size={16}
                                            color={
                                                disabled
                                                    ? singleSelectTokens.label
                                                          .color.disabled
                                                    : selected
                                                      ? singleSelectTokens
                                                            .trigger
                                                            .selectedValue.color
                                                      : singleSelectTokens
                                                            .trigger.placeholder
                                                            .color
                                            }
                                        />
                                    </Block>
                                </PrimitiveButton>
                            )
                        }
                        size={size}
                        variant={variant}
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

export default SingleSelect
