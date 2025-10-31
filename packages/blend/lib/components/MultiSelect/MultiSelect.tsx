import { useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import MultiSelectMenu from './MultiSelectMenu'
import MobileMultiSelect from './MobileMultiSelect'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../tokens'
import Text from '../Text/Text'
import { ChevronDown, X } from 'lucide-react'
import {
    MultiSelectMenuSize,
    type MultiSelectProps,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { handleSelectAll, map } from './utils'
import { toPixels } from '../../global-utils/GlobalUtils'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tooltip } from '../Tooltip'

const MultiSelect = ({
    selectedValues,
    onChange,
    items = [],
    label,
    sublabel,
    disabled,
    helpIconHintText,
    name,
    required,
    variant = MultiSelectVariant.CONTAINER,
    selectionTagType = MultiSelectSelectionTagType.COUNT,
    slot,
    hintText,
    placeholder,
    size = MultiSelectMenuSize.MEDIUM,
    enableSearch = true,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    maxSelections,
    customTrigger,
    useDrawerOnMobile = true,
    minMenuWidth,
    maxMenuWidth,
    maxMenuHeight,
    alignment,
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
    itemsToRender,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
}: MultiSelectProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')
    const [open, setOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)
    const showCancelButton =
        variant === MultiSelectVariant.CONTAINER && selectedValues.length > 0

    const shouldShowActionButtons =
        showActionButtons !== undefined
            ? showActionButtons
            : !!(primaryAction || secondaryAction)

    const [showTooltip, setShowTooltip] = useState(false)
    const textContainerRef = useRef<HTMLDivElement>(null)

    const checkTruncation = () => {
        if (textContainerRef.current) {
            const isOverflowing =
                textContainerRef.current.scrollWidth >
                textContainerRef.current.clientWidth
            setShowTooltip(isOverflowing)
        }
    }

    const isItemSelected = selectedValues.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === MultiSelectMenuSize.LARGE

    const borderRadius = multiSelectTokens.trigger.borderRadius[size][variant]
    const appliedBorderRadius = showCancelButton
        ? `${borderRadius} 0px 0px ${borderRadius}`
        : borderRadius

    const paddingX = toPixels(
        multiSelectTokens.trigger.padding[size][variant].x
    )
    const paddingY = toPixels(
        multiSelectTokens.trigger.padding[size][variant].y
    )
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    if (isMobile && useDrawerOnMobile) {
        return (
            <MobileMultiSelect
                selectedValues={selectedValues}
                onChange={onChange}
                items={items}
                label={label}
                sublabel={sublabel}
                disabled={disabled}
                helpIconHintText={helpIconHintText}
                name={name}
                required={required}
                variant={variant}
                selectionTagType={selectionTagType}
                slot={slot}
                hintText={hintText}
                placeholder={placeholder}
                size={size}
                enableSearch={enableSearch}
                searchPlaceholder={searchPlaceholder}
                enableSelectAll={enableSelectAll}
                selectAllText={selectAllText}
                customTrigger={customTrigger}
                onBlur={onBlur}
                onFocus={onFocus}
                error={error}
                errorMessage={errorMessage}
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
                showItemDividers={showItemDividers}
                showHeaderBorder={showHeaderBorder}
                enableVirtualization={enableVirtualization}
                virtualListItemHeight={virtualListItemHeight}
                virtualListOverscan={virtualListOverscan}
                itemsToRender={itemsToRender}
                onEndReached={onEndReached}
                endReachedThreshold={endReachedThreshold}
                hasMore={hasMore}
                loadingComponent={loadingComponent}
            />
        )
    }

    return (
        <Block
            width={fullWidth ? '100%' : 'fit-content'}
            maxWidth={fullWidth ? '100%' : 'fit-content'}
            display="flex"
            flexDirection="column"
            gap={multiSelectTokens.gap}
        >
            {variant === MultiSelectVariant.CONTAINER &&
                (!isSmallScreen || size !== MultiSelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={sublabel}
                        disabled={disabled}
                        helpIconHintText={helpIconHintText}
                        name={name}
                        required={required}
                        tokens={multiSelectTokens}
                    />
                )}

            <MultiSelectMenu
                items={items}
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
                        ? (selectAll: boolean) =>
                              handleSelectAll(
                                  selectAll,
                                  items,
                                  selectedValues,
                                  onChange
                              )
                        : undefined
                }
                minMenuWidth={minMenuWidth}
                maxMenuWidth={maxMenuWidth}
                maxMenuHeight={maxMenuHeight}
                alignment={alignment}
                side={side}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen)
                    if (isOpen) {
                        onFocus?.()
                    } else {
                        onBlur?.()
                    }
                }}
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
                enableVirtualization={enableVirtualization}
                virtualListItemHeight={virtualListItemHeight}
                virtualListOverscan={virtualListOverscan}
                itemsToRender={itemsToRender}
                onEndReached={onEndReached}
                endReachedThreshold={endReachedThreshold}
                hasMore={hasMore}
                loadingComponent={loadingComponent}
                trigger={
                    customTrigger || (
                        <Block
                            display="flex"
                            {...((!inline ||
                                variant === MultiSelectVariant.CONTAINER) && {
                                height: toPixels(
                                    multiSelectTokens.trigger.height[size][
                                        variant
                                    ]
                                ),
                                maxHeight: toPixels(
                                    multiSelectTokens.trigger.height[size][
                                        variant
                                    ]
                                ),
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
                                <Tooltip
                                    content={
                                        (showTooltip &&
                                            selectedValues
                                                .map((v) => valueLabelMap[v])
                                                .join(', ')) ||
                                        ''
                                    }
                                >
                                    <PrimitiveButton
                                        data-value={placeholder}
                                        data-custom-value={placeholder}
                                        data-button-status={
                                            disabled ? 'disabled' : 'enabled'
                                        }
                                        type="button"
                                        position="relative"
                                        width={
                                            fullWidth ? '100%' : 'fit-content'
                                        }
                                        display="flex"
                                        alignItems="center"
                                        overflow="hidden"
                                        justifyContent="space-between"
                                        gap={8}
                                        borderRadius={appliedBorderRadius}
                                        boxShadow={
                                            multiSelectTokens.trigger.boxShadow[
                                                variant
                                            ]
                                        }
                                        outline={
                                            multiSelectTokens.trigger.outline[
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
                                                MultiSelectVariant.CONTAINER) && {
                                            height: multiSelectTokens.trigger
                                                .height[size][variant],

                                            maxHeight:
                                                multiSelectTokens.trigger
                                                    .height[size][variant],

                                            paddingX: paddingX,

                                            paddingY: paddingY,
                                            backgroundColor:
                                                multiSelectTokens.trigger
                                                    .backgroundColor[variant][
                                                    error
                                                        ? 'error'
                                                        : open
                                                          ? 'open'
                                                          : 'closed'
                                                ],

                                            _hover: {
                                                outline:
                                                    multiSelectTokens.trigger
                                                        .outline[variant][
                                                        error
                                                            ? 'error'
                                                            : 'hover'
                                                    ],
                                                backgroundColor:
                                                    multiSelectTokens.trigger
                                                        .backgroundColor[
                                                        variant
                                                    ][
                                                        error
                                                            ? 'error'
                                                            : 'hover'
                                                    ],
                                            },
                                            _focus: {
                                                outline:
                                                    multiSelectTokens.trigger
                                                        .outline[variant][
                                                        error
                                                            ? 'error'
                                                            : 'focus'
                                                    ],
                                                backgroundColor:
                                                    multiSelectTokens.trigger
                                                        .backgroundColor[
                                                        variant
                                                    ][
                                                        error
                                                            ? 'error'
                                                            : 'focus'
                                                    ],
                                            },
                                        })}
                                    >
                                        {slot && (
                                            <Block
                                                as="span"
                                                ref={slotRef}
                                                contentCentered
                                            >
                                                {slot}
                                            </Block>
                                        )}
                                        <Block
                                            as="span"
                                            textAlign="left"
                                            paddingTop={
                                                variant ===
                                                    MultiSelectVariant.CONTAINER &&
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
                                            ref={textContainerRef}
                                            onMouseEnter={() =>
                                                checkTruncation()
                                            }
                                        >
                                            {/* NO CONTAINER Label*/}
                                            {variant ===
                                                MultiSelectVariant.NO_CONTAINER && (
                                                <Text
                                                    as="span"
                                                    variant="body.md"
                                                    color={
                                                        multiSelectTokens.label
                                                            .color.default
                                                    }
                                                    fontWeight={
                                                        multiSelectTokens.label
                                                            .fontWeight
                                                    }
                                                    fontSize={
                                                        multiSelectTokens.label
                                                            .fontSize
                                                    }
                                                    data-button-text={label}
                                                >
                                                    {label}
                                                </Text>
                                            )}

                                            {isSmallScreenWithLargeSize &&
                                                variant ===
                                                    MultiSelectVariant.CONTAINER && (
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
                                                            pointerEvents:
                                                                'none',
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        <FloatingLabels
                                                            label={label}
                                                            required={
                                                                required ||
                                                                false
                                                            }
                                                            name={name || ''}
                                                            isFocused={
                                                                isItemSelected
                                                            }
                                                        />
                                                    </Block>
                                                )}
                                            {/* Variant == Container - always show the placeholder*/}
                                            {variant ===
                                                MultiSelectVariant.CONTAINER &&
                                                (selectedValues.length > 0 ||
                                                    !isSmallScreen ||
                                                    size !==
                                                        MultiSelectMenuSize.LARGE) && (
                                                    <Text
                                                        as="span"
                                                        // variant="body.md"
                                                        color={
                                                            multiSelectTokens
                                                                .label.color
                                                                .default
                                                        }
                                                        fontWeight={
                                                            multiSelectTokens
                                                                .label
                                                                .fontWeight
                                                        }
                                                        fontSize={
                                                            multiSelectTokens
                                                                .label.fontSize
                                                        }
                                                        data-button-text={
                                                            placeholder
                                                        }
                                                    >
                                                        {placeholder}
                                                    </Text>
                                                )}
                                            {selectedValues.length > 0 && (
                                                <Text
                                                    as="span"
                                                    variant="body.md"
                                                    color={
                                                        multiSelectTokens
                                                            .trigger
                                                            .selectionTag
                                                            .container[
                                                            selectionTagType
                                                        ].color
                                                    }
                                                    fontWeight={500}
                                                    style={{
                                                        height: '100%',
                                                        marginLeft: 8,
                                                        backgroundColor:
                                                            multiSelectTokens
                                                                .trigger
                                                                .selectionTag
                                                                .container[
                                                                selectionTagType
                                                            ].backgroundColor,
                                                        borderRadius: 4,
                                                        padding:
                                                            selectionTagType ===
                                                            MultiSelectSelectionTagType.COUNT
                                                                ? '0px 6px'
                                                                : '0px 0px',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                    data-badge-value={
                                                        selectionTagType ===
                                                        MultiSelectSelectionTagType.COUNT
                                                            ? selectedValues.length
                                                            : selectedValues
                                                                  .map(
                                                                      (v) =>
                                                                          valueLabelMap[
                                                                              v
                                                                          ]
                                                                  )
                                                                  .join(', ')
                                                    }
                                                >
                                                    {selectionTagType ===
                                                    MultiSelectSelectionTagType.COUNT
                                                        ? selectedValues.length
                                                        : selectedValues
                                                              .map(
                                                                  (v) =>
                                                                      valueLabelMap[
                                                                          v
                                                                      ]
                                                              )
                                                              .join(', ')}
                                                </Text>
                                            )}
                                        </Block>
                                        <Block
                                            as="span"
                                            display="flex"
                                            alignItems="center"
                                            gap={4}
                                            size={20}
                                            contentCentered
                                            flexShrink={0}
                                        >
                                            <ChevronDown size={16} />
                                        </Block>
                                    </PrimitiveButton>
                                </Tooltip>

                                {variant === MultiSelectVariant.CONTAINER &&
                                    selectedValues.length > 0 && (
                                        <PrimitiveButton
                                            type="button"
                                            borderRadius={`0 ${borderRadius} ${borderRadius} 0`}
                                            backgroundColor={
                                                FOUNDATION_THEME.colors.gray[0]
                                            }
                                            contentCentered
                                            height={'100%'}
                                            style={{ aspectRatio: 1 }}
                                            onClick={() => onChange('')}
                                            outline={
                                                multiSelectTokens.trigger
                                                    .outline[variant][
                                                    error ? 'error' : 'closed'
                                                ]
                                            }
                                            _hover={{
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[25],
                                            }}
                                            _focus={{
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[25],
                                                outline: `1px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
                                            }}
                                        >
                                            <X
                                                size={16}
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[400]
                                                }
                                            />
                                        </PrimitiveButton>
                                    )}
                            </Block>
                        </Block>
                    )
                }
            />

            {variant === MultiSelectVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                    tokens={multiSelectTokens}
                />
            )}
        </Block>
    )
}

export default MultiSelect
