import React, { useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import MultiSelectMenu from './MultiSelectMenu'
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
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerClose,
} from '../Drawer'
import { Button, ButtonType, ButtonSize, MultiSelectTrigger } from '../../main'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { handleSelectAll, map } from './utils'
import { toPixels } from '../../global-utils/GlobalUtils'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

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
    enableSearch = false,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    useDrawerOnMobile = true,
    minWidth,
    maxWidth,
    maxHeight,
    alignment,
    side,
    sideOffset,
    alignOffset,
    inline = false,
    onBlur,
    onFocus,
    error,
    errorMessage,
}: MultiSelectProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)
    const showCancelButton =
        variant === MultiSelectVariant.CONTAINER && selectedValues.length > 0

    const isItemSelected = selectedValues.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === MultiSelectMenuSize.LARGE

    const borderRadius = multiSelectTokens.trigger.borderRadius[size]
    const appliedBorderRadius = showCancelButton
        ? `${borderRadius} 0px 0px ${borderRadius}`
        : borderRadius

    const paddingX = toPixels(multiSelectTokens.trigger.paddingX[size])
    const paddingY = toPixels(multiSelectTokens.trigger.paddingY[size])
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    if (isMobile && useDrawerOnMobile) {
        return (
            <Block width="100%" display="flex" flexDirection="column" gap={8}>
                {variant === MultiSelectVariant.CONTAINER &&
                    (!isSmallScreen || size !== MultiSelectMenuSize.LARGE) && (
                        <InputLabels
                            label={label}
                            sublabel={sublabel}
                            disabled={disabled}
                            helpIconHintText={helpIconHintText}
                            name={name}
                            required={required}
                        />
                    )}

                <Drawer
                    open={drawerOpen}
                    onOpenChange={(isOpen) => {
                        setDrawerOpen(isOpen)
                        if (isOpen) {
                            onFocus?.()
                        } else {
                            onBlur?.()
                        }
                    }}
                >
                    <DrawerTrigger>
                        <MultiSelectTrigger
                            onChange={onChange}
                            name={name || ''}
                            label={label}
                            placeholder={placeholder}
                            required={required || false}
                            selectionTagType={selectionTagType}
                            valueLabelMap={valueLabelMap}
                            open={open}
                            variant={variant}
                            size={size}
                            isSmallScreen={isSmallScreen}
                            selectedValues={selectedValues}
                            slot={slot}
                            onClick={() => setDrawerOpen(true)}
                            multiSelectTokens={multiSelectTokens}
                            error={error}
                        />
                    </DrawerTrigger>

                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <Block
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <DrawerTitle>
                                        {label || 'Select Options'}
                                    </DrawerTitle>
                                    <DrawerClose>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '6px',
                                                backgroundColor: '#f3f4f6',
                                                border: '1px solid #d1d5db',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <X size={16} color="#6b7280" />
                                        </div>
                                    </DrawerClose>
                                </Block>
                            </DrawerHeader>

                            <DrawerBody>
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={4}
                                >
                                    {items.map((group, groupId) => (
                                        <React.Fragment key={groupId}>
                                            {group.groupLabel && (
                                                <Block
                                                    padding="6px 8px"
                                                    margin="0px 6px"
                                                >
                                                    <Text
                                                        variant="body.sm"
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[400]
                                                        }
                                                        textTransform="uppercase"
                                                        fontSize={12}
                                                    >
                                                        {group.groupLabel}
                                                    </Text>
                                                </Block>
                                            )}
                                            {group.items.map(
                                                (item, itemIndex) => {
                                                    const isSelected =
                                                        selectedValues.includes(
                                                            item.value
                                                        )
                                                    return (
                                                        <Block
                                                            key={`${groupId}-${itemIndex}`}
                                                            display="flex"
                                                            flexDirection="column"
                                                            gap={4}
                                                            padding="8px 6px"
                                                            margin="0px 8px"
                                                            borderRadius={4}
                                                            cursor={
                                                                item.disabled
                                                                    ? 'not-allowed'
                                                                    : 'pointer'
                                                            }
                                                            backgroundColor={
                                                                isSelected
                                                                    ? FOUNDATION_THEME
                                                                          .colors
                                                                          .gray[50]
                                                                    : 'transparent'
                                                            }
                                                            _hover={{
                                                                backgroundColor:
                                                                    FOUNDATION_THEME
                                                                        .colors
                                                                        .gray[50],
                                                            }}
                                                            onClick={() => {
                                                                if (
                                                                    !item.disabled
                                                                ) {
                                                                    onChange(
                                                                        item.value
                                                                    )
                                                                }
                                                            }}
                                                        >
                                                            <Block
                                                                width="100%"
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                                gap={8}
                                                            >
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap={8}
                                                                    flexGrow={1}
                                                                >
                                                                    {item.slot1 && (
                                                                        <Block
                                                                            flexShrink={
                                                                                0
                                                                            }
                                                                            height="auto"
                                                                            contentCentered
                                                                        >
                                                                            {
                                                                                item.slot1
                                                                            }
                                                                        </Block>
                                                                    )}
                                                                    <Text
                                                                        variant="body.md"
                                                                        color={
                                                                            isSelected
                                                                                ? FOUNDATION_THEME
                                                                                      .colors
                                                                                      .gray[700]
                                                                                : FOUNDATION_THEME
                                                                                      .colors
                                                                                      .gray[600]
                                                                        }
                                                                        fontWeight={
                                                                            500
                                                                        }
                                                                        truncate
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Text>
                                                                </Block>
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                >
                                                                    <Block
                                                                        size={
                                                                            16
                                                                        }
                                                                        backgroundColor={
                                                                            isSelected
                                                                                ? FOUNDATION_THEME
                                                                                      .colors
                                                                                      .primary[600]
                                                                                : 'transparent'
                                                                        }
                                                                        border={
                                                                            isSelected
                                                                                ? 'none'
                                                                                : `2px solid ${FOUNDATION_THEME.colors.gray[300]}`
                                                                        }
                                                                        borderRadius={
                                                                            2
                                                                        }
                                                                        contentCentered
                                                                    >
                                                                        {isSelected && (
                                                                            <Text
                                                                                variant="body.xs"
                                                                                color="white"
                                                                                fontWeight={
                                                                                    600
                                                                                }
                                                                            >
                                                                                ✓
                                                                            </Text>
                                                                        )}
                                                                    </Block>
                                                                </Block>
                                                            </Block>
                                                            {item.subLabel && (
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    width="100%"
                                                                >
                                                                    <Text
                                                                        variant="body.sm"
                                                                        color={
                                                                            FOUNDATION_THEME
                                                                                .colors
                                                                                .gray[400]
                                                                        }
                                                                        fontWeight={
                                                                            400
                                                                        }
                                                                    >
                                                                        {
                                                                            item.subLabel
                                                                        }
                                                                    </Text>
                                                                </Block>
                                                            )}
                                                        </Block>
                                                    )
                                                }
                                            )}
                                            {groupId !== items.length - 1 &&
                                                group.showSeparator && (
                                                    <Block
                                                        height={1}
                                                        backgroundColor={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[200]
                                                        }
                                                        margin="8px 0px"
                                                    />
                                                )}
                                        </React.Fragment>
                                    ))}
                                </Block>

                                {selectedValues.length > 0 && (
                                    <Block
                                        marginTop={16}
                                        padding={12}
                                        backgroundColor={
                                            FOUNDATION_THEME.colors.gray[50]
                                        }
                                        borderRadius={8}
                                    >
                                        <Block marginBottom={8}>
                                            <Text
                                                variant="body.sm"
                                                fontWeight={500}
                                            >
                                                Selected (
                                                {selectedValues.length}):
                                            </Text>
                                        </Block>
                                        <Block
                                            display="flex"
                                            flexWrap="wrap"
                                            gap={8}
                                        >
                                            {selectedValues.map((value) => (
                                                <Block
                                                    key={value}
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={4}
                                                    padding="4px 8px"
                                                    backgroundColor={
                                                        FOUNDATION_THEME.colors
                                                            .primary[100]
                                                    }
                                                    borderRadius={4}
                                                >
                                                    <Text
                                                        variant="body.xs"
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .primary[700]
                                                        }
                                                    >
                                                        {valueLabelMap[value]}
                                                    </Text>
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                        leadingIcon={
                                                            <X size={12} />
                                                        }
                                                        onClick={() =>
                                                            onChange(value)
                                                        }
                                                    />
                                                </Block>
                                            ))}
                                        </Block>
                                    </Block>
                                )}
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>

                {variant === MultiSelectVariant.CONTAINER && (
                    <InputFooter
                        hintText={hintText}
                        error={error}
                        errorMessage={errorMessage}
                    />
                )}
            </Block>
        )
    }

    return (
        <Block
            width="100%"
            display="flex"
            flexDirection="column"
            gap={8}
            maxWidth={'100%'}
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
                minWidth={minWidth}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
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
                trigger={
                    <Block
                        display="flex"
                        {...((!inline ||
                            variant === MultiSelectVariant.CONTAINER) && {
                            height: toPixels(multiSelectTokens.trigger.height),
                            maxHeight: toPixels(
                                multiSelectTokens.trigger.height
                            ),
                        })}
                    >
                        <Block
                            width={
                                variant === MultiSelectVariant.CONTAINER
                                    ? '100%'
                                    : 'auto'
                            }
                            maxWidth={
                                variant === MultiSelectVariant.NO_CONTAINER
                                    ? '100%'
                                    : 'auto'
                            }
                            display="flex"
                            alignItems="center"
                        >
                            <PrimitiveButton
                                position="relative"
                                width={'100%'}
                                display="flex"
                                alignItems="center"
                                overflow="hidden"
                                justifyContent="space-between"
                                gap={8}
                                borderRadius={appliedBorderRadius}
                                boxShadow={
                                    multiSelectTokens.trigger.boxShadow[variant]
                                }
                                outline={
                                    multiSelectTokens.trigger.outline[variant][
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
                                    height: multiSelectTokens.trigger.height,

                                    maxHeight: multiSelectTokens.trigger.height,

                                    paddingX:
                                        multiSelectTokens.trigger.paddingX[
                                            size
                                        ],

                                    paddingY: paddingY,
                                    backgroundColor:
                                        multiSelectTokens.trigger
                                            .backgroundColor.container[
                                            error
                                                ? 'error'
                                                : open
                                                  ? 'open'
                                                  : 'closed'
                                        ],

                                    _hover: {
                                        outline:
                                            multiSelectTokens.trigger.outline[
                                                variant
                                            ][error ? 'error' : 'hover'],
                                        backgroundColor:
                                            multiSelectTokens.trigger
                                                .backgroundColor.container[
                                                error ? 'error' : 'hover'
                                            ],
                                    },
                                    _focus: {
                                        outline:
                                            multiSelectTokens.trigger.outline[
                                                variant
                                            ][error ? 'error' : 'focus'],
                                        backgroundColor:
                                            multiSelectTokens.trigger
                                                .backgroundColor.container[
                                                error ? 'error' : 'focus'
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
                                >
                                    {/* NO CONTAINER Label*/}
                                    {variant ===
                                        MultiSelectVariant.NO_CONTAINER && (
                                        <Text
                                            as="span"
                                            variant="body.md"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[700]
                                            }
                                            fontWeight={500}
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
                                                                  paddingY / 1.3
                                                          ) +
                                                          (!required ? 3 : 0)
                                                        : '50%'
                                                }
                                                left={toPixels(
                                                    paddingInlineStart
                                                )}
                                                height={'max-content'}
                                                style={{
                                                    transition:
                                                        'all 0.2s ease-in-out',
                                                    transform: isItemSelected
                                                        ? 'scale(0.95)'
                                                        : 'translateY(-50%) scale(1)',
                                                    transformOrigin:
                                                        'left center',
                                                    pointerEvents: 'none',
                                                    zIndex: 1,
                                                }}
                                            >
                                                <FloatingLabels
                                                    label={label}
                                                    required={required || false}
                                                    name={name || ''}
                                                    isFocused={isItemSelected}
                                                />
                                            </Block>
                                        )}
                                    {/* Variant == Container - always show the placeholder*/}
                                    {variant === MultiSelectVariant.CONTAINER &&
                                        (selectedValues.length > 0 ||
                                            !isSmallScreen ||
                                            size !==
                                                MultiSelectMenuSize.LARGE) && (
                                            <Text
                                                as="span"
                                                variant="body.md"
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[700]
                                                }
                                                fontWeight={500}
                                            >
                                                {placeholder}
                                            </Text>
                                        )}
                                    {selectedValues.length > 0 && (
                                        <Text
                                            as="span"
                                            variant="body.md"
                                            color={
                                                multiSelectTokens.trigger
                                                    .selectionTag.container[
                                                    selectionTagType
                                                ].color
                                            }
                                            fontWeight={500}
                                            style={{
                                                height: '100%',
                                                marginLeft: 8,
                                                backgroundColor:
                                                    multiSelectTokens.trigger
                                                        .selectionTag.container[
                                                        selectionTagType
                                                    ].backgroundColor,
                                                borderRadius: 4,
                                                padding:
                                                    selectionTagType ===
                                                    MultiSelectSelectionTagType.COUNT
                                                        ? '0px 6px'
                                                        : '0px 0px',
                                            }}
                                        >
                                            {selectionTagType ===
                                            MultiSelectSelectionTagType.COUNT
                                                ? selectedValues.length
                                                : selectedValues
                                                      .map(
                                                          (v) =>
                                                              valueLabelMap[v]
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

                            {variant === MultiSelectVariant.CONTAINER &&
                                selectedValues.length > 0 && (
                                    <PrimitiveButton
                                        borderRadius={`0 ${borderRadius} ${borderRadius} 0`}
                                        backgroundColor={
                                            FOUNDATION_THEME.colors.gray[0]
                                        }
                                        contentCentered
                                        height={'100%'}
                                        style={{ aspectRatio: 1 }}
                                        onClick={() => onChange('')}
                                        outline={
                                            multiSelectTokens.trigger.outline[
                                                variant
                                            ][error ? 'error' : 'closed']
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
                }
            />

            {variant === MultiSelectVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                />
            )}
        </Block>
    )
}

export default MultiSelect
