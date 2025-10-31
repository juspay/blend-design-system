import { useCallback, useRef, useState } from 'react'
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
import Text from '../Text/Text'
import SingleSelectMenu from './SingleSelectMenu'
import { FOUNDATION_THEME } from '../../tokens'
import { ChevronDown } from 'lucide-react'
import type { SingleSelectProps } from './types'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import type { SingleSelectTokensType } from './singleSelect.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../global-utils/GlobalUtils'
import MobileSingleSelect from './MobileSingleSelect'

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
    enableVirtualization,
    virtualListItemHeight,
    virtualListOverscan,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
}: SingleSelectProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')
    const [open, setOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)

    const isItemSelected = selected.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SelectMenuSize.LARGE

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
        (val: string) => onSelect(selected === val ? '' : val),
        [onSelect, selected]
    )

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
            />
        )
    }

    return (
        <Block
            width="100%"
            display="flex"
            flexDirection="column"
            gap={singleSelectTokens.gap}
            maxWidth={'100%'}
        >
            {variant === SelectMenuVariant.CONTAINER &&
                (!isSmallScreen || size !== SelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        disabled={disabled}
                        helpIconHintText={helpIconText}
                        name={name}
                        required={required}
                        tokens={singleSelectTokens}
                    />
                )}
            <Block
                display="flex"
                {...((!inline || variant === SelectMenuVariant.CONTAINER) && {
                    height: singleSelectTokens.trigger.height[size][variant],
                    maxHeight: singleSelectTokens.trigger.height[size][variant],
                })}
                data-selectbox-value={placeholder}
            >
                <Block
                    width={fullWidth ? '100%' : 'fit-content'}
                    maxWidth={fullWidth ? '100%' : 'fit-content'}
                    display="flex"
                    alignItems="center"
                    data-dropdown-for={placeholder}
                >
                    <SingleSelectMenu
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
                            setOpen(false)
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
                        trigger={
                            customTrigger || (
                                <PrimitiveButton
                                    data-value={selected || placeholder}
                                    data-custom-value={selected || placeholder}
                                    data-button-status={
                                        disabled ? 'disabled' : 'enabled'
                                    }
                                    type="button"
                                    name={name}
                                    position="relative"
                                    width={fullWidth ? '100%' : 'fit-content'}
                                    display="flex"
                                    alignItems="center"
                                    overflow="hidden"
                                    justifyContent="space-between"
                                    gap={8}
                                    borderRadius={borderRadius}
                                    boxShadow={
                                        singleSelectTokens.trigger.boxShadow[
                                            variant
                                        ]
                                    }
                                    outline={
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
                                    {...((!inline ||
                                        variant ===
                                            SelectMenuVariant.CONTAINER) && {
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
                                        _hover: {
                                            outline:
                                                singleSelectTokens.trigger
                                                    .outline[variant][
                                                    error ? 'error' : 'hover'
                                                ],
                                            backgroundColor:
                                                singleSelectTokens.trigger
                                                    .backgroundColor.container[
                                                    error ? 'error' : 'hover'
                                                ],
                                        },
                                        _focus: {
                                            outline:
                                                singleSelectTokens.trigger
                                                    .outline[variant][
                                                    error ? 'error' : 'focus'
                                                ],
                                            backgroundColor:
                                                singleSelectTokens.trigger
                                                    .backgroundColor.container[
                                                    error ? 'error' : 'focus'
                                                ],
                                        },
                                    })}
                                >
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={8}
                                    >
                                        {slot && (
                                            <Block
                                                ref={slotRef}
                                                contentCentered
                                            >
                                                {slot}
                                            </Block>
                                        )}
                                        {isSmallScreenWithLargeSize &&
                                        variant ===
                                            SelectMenuVariant.CONTAINER ? (
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
                                                    <Text
                                                        variant="body.md"
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[600]
                                                        }
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace:
                                                                'nowrap',
                                                        }}
                                                        data-button-text={
                                                            valueLabelMap[
                                                                selected
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            valueLabelMap[
                                                                selected
                                                            ]
                                                        }
                                                    </Text>
                                                )}
                                            </Block>
                                        ) : (
                                            <Text
                                                variant="body.md"
                                                color={
                                                    selected
                                                        ? FOUNDATION_THEME
                                                              .colors.gray[700]
                                                        : FOUNDATION_THEME
                                                              .colors.gray[600]
                                                }
                                                fontWeight={500}
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                data-button-text={
                                                    selected
                                                        ? valueLabelMap[
                                                              selected
                                                          ]
                                                        : placeholder
                                                }
                                            >
                                                {selected
                                                    ? valueLabelMap[selected]
                                                    : placeholder}
                                            </Text>
                                        )}
                                    </Block>
                                    <Block contentCentered>
                                        <ChevronDown
                                            size={16}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[500]
                                            }
                                        />
                                    </Block>
                                </PrimitiveButton>
                            )
                        }
                        size={size}
                        variant={variant}
                    />
                </Block>
            </Block>
            {variant === SelectMenuVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                    tokens={singleSelectTokens}
                />
            )}
        </Block>
    )
}

export default SingleSelect
