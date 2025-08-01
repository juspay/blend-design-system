import React, { useRef, useState } from 'react'
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
import { ChevronDown, X } from 'lucide-react'
import type { SingleSelectProps } from './types'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
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
import { Button, ButtonType, ButtonSize } from '../Button'
import { SingleSelectTokensType } from './singleSelect.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../global-utils/GlobalUtils'
import SingleSelectTrigger from './SingleSelectTrigger'

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
    size = SelectMenuSize.MEDIUM,
    items = [],
    name,
    variant = SelectMenuVariant.CONTAINER,
    disabled,
    selected,
    onSelect,
    enableSearch,
    slot,
    useDrawerOnMobile = true,
    alignment,
    side,
    sideOffset,
    alignOffset,
    minWidth,
    maxWidth,
    maxHeight,
}: SingleSelectProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)

    const isItemSelected = selected.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SelectMenuSize.LARGE

    const borderRadius = singleSelectTokens.trigger.borderRadius[size]
    const paddingX = toPixels(singleSelectTokens.trigger.paddingX[size])
    const paddingY = toPixels(singleSelectTokens.trigger.paddingY[size])
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    if (isMobile && useDrawerOnMobile) {
        return (
            <Block width="100%" display="flex" flexDirection="column" gap={8}>
                {variant === SelectMenuVariant.CONTAINER && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        disabled={disabled}
                        helpIconHintText={helpIconText}
                        name={name}
                        required={required}
                    />
                )}

                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger>
                        <SingleSelectTrigger
                            singleSelectTokens={singleSelectTokens}
                            size={size}
                            selected={selected}
                            label={label}
                            name={name || ''}
                            placeholder={placeholder}
                            required={required || false}
                            valueLabelMap={valueLabelMap}
                            open={open}
                            onClick={() => setDrawerOpen(true)}
                            slot={slot}
                            variant={variant}
                            isSmallScreenWithLargeSize={
                                isSmallScreenWithLargeSize
                            }
                            isItemSelected={isItemSelected}
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
                                        {label || 'Select Option'}
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
                                                        selected === item.value
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
                                                                    onSelect(
                                                                        item.value
                                                                    )
                                                                    setDrawerOpen(
                                                                        false
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
                                                                {isSelected && (
                                                                    <Block
                                                                        display="flex"
                                                                        alignItems="center"
                                                                    >
                                                                        <Block
                                                                            size={
                                                                                16
                                                                            }
                                                                            backgroundColor={
                                                                                FOUNDATION_THEME
                                                                                    .colors
                                                                                    .primary[600]
                                                                            }
                                                                            borderRadius="50%"
                                                                            contentCentered
                                                                        >
                                                                            <Text
                                                                                variant="body.xs"
                                                                                color="white"
                                                                                fontWeight={
                                                                                    600
                                                                                }
                                                                            >
                                                                                ✓
                                                                            </Text>
                                                                        </Block>
                                                                    </Block>
                                                                )}
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

                                {selected && (
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
                                                Selected:
                                            </Text>
                                        </Block>
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={4}
                                            padding="4px 8px"
                                            backgroundColor={
                                                FOUNDATION_THEME.colors
                                                    .primary[100]
                                            }
                                            borderRadius={4}
                                            width="fit-content"
                                        >
                                            <Text
                                                variant="body.xs"
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .primary[700]
                                                }
                                            >
                                                {valueLabelMap[selected]}
                                            </Text>
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                                leadingIcon={<X size={12} />}
                                                onClick={() => onSelect('')}
                                            />
                                        </Block>
                                    </Block>
                                )}
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>

                {variant === SelectMenuVariant.CONTAINER && (
                    <InputFooter hintText={hintText} />
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
            {variant === SelectMenuVariant.CONTAINER &&
                (!isSmallScreen || size !== SelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        disabled={disabled}
                        helpIconHintText={helpIconText}
                        name={name}
                        required={required}
                    />
                )}
            <Block
                display="flex"
                height={singleSelectTokens.trigger.height}
                maxHeight={singleSelectTokens.trigger.height}
            >
                <Block
                    width={
                        variant === SelectMenuVariant.CONTAINER
                            ? '100%'
                            : 'auto'
                    }
                    maxWidth={
                        variant === SelectMenuVariant.NO_CONTAINER
                            ? '100%'
                            : 'auto'
                    }
                    display="flex"
                    alignItems="center"
                >
                    <SingleSelectMenu
                        open={open}
                        onOpenChange={setOpen}
                        items={items}
                        selected={selected}
                        onSelect={onSelect}
                        disabled={disabled}
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                        maxHeight={maxHeight}
                        alignment={alignment}
                        side={side}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        enableSearch={enableSearch}
                        trigger={
                            <PrimitiveButton
                                position="relative"
                                height={singleSelectTokens.trigger.height}
                                maxHeight={singleSelectTokens.trigger.height}
                                width={'100%'}
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
                                paddingX={paddingX}
                                paddingY={paddingY}
                                backgroundColor={
                                    singleSelectTokens.trigger.backgroundColor
                                        .container[open ? 'open' : 'closed']
                                }
                                outline={
                                    singleSelectTokens.trigger.outline[variant][
                                        open ? 'open' : 'closed'
                                    ]
                                }
                                _hover={{
                                    outline:
                                        singleSelectTokens.trigger.outline[
                                            variant
                                        ].hover,
                                    backgroundColor:
                                        singleSelectTokens.trigger
                                            .backgroundColor.container.hover,
                                }}
                                _focus={{
                                    outline:
                                        singleSelectTokens.trigger.outline[
                                            variant
                                        ].focus,
                                    backgroundColor:
                                        singleSelectTokens.trigger
                                            .backgroundColor.container.focus,
                                }}
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    gap={8}
                                >
                                    {slot && (
                                        <Block ref={slotRef} contentCentered>
                                            {slot}
                                        </Block>
                                    )}
                                    {isSmallScreenWithLargeSize &&
                                    variant === SelectMenuVariant.CONTAINER ? (
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
                                            {selected && (
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[600]
                                                    }
                                                >
                                                    {valueLabelMap[selected]}
                                                </Text>
                                            )}
                                        </Block>
                                    ) : (
                                        <Text
                                            variant="body.md"
                                            color={
                                                selected
                                                    ? FOUNDATION_THEME.colors
                                                          .gray[700]
                                                    : FOUNDATION_THEME.colors
                                                          .gray[600]
                                            }
                                            fontWeight={500}
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
                                            FOUNDATION_THEME.colors.gray[500]
                                        }
                                    />
                                </Block>
                            </PrimitiveButton>
                        }
                    />
                </Block>
            </Block>
            {variant === SelectMenuVariant.CONTAINER && (
                <InputFooter hintText={hintText} />
            )}
        </Block>
    )
}

export default SingleSelect
