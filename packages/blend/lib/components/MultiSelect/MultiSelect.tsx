import React, { useState } from 'react'
import Block from '../Primitives/Block/Block'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import MultiSelectMenu from './MultiSelectMenu'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../tokens'
import Text from '../Text/Text'
import { ChevronDown, X } from 'lucide-react'
import {
    MultiSelectMenuGroupType,
    MultiSelectMenuItemType,
    MultiSelectMenuSize,
    MultiSelectProps,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
import { MultiSelectTokensType } from './multiSelect.tokens'
import { useComponentToken } from '../../context/useComponentToken'
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
import { ButtonV2, ButtonTypeV2, ButtonSizeV2 } from '../ButtonV2'

const map = function getValueLabelMap(
    groups: MultiSelectMenuGroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}

    function traverse(items: MultiSelectMenuItemType[]) {
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
    minWidth,
    maxWidth,
    maxHeight,
    alignment,
    side,
    sideOffset,
    alignOffset,
}: MultiSelectProps) => {
    const multiSelectTokens = useComponentToken(
        'MULTI_SELECT'
    ) as MultiSelectTokensType
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)

    const showCancelButton =
        variant === MultiSelectVariant.CONTAINER && selectedValues.length > 0

    const borderRadius = multiSelectTokens.trigger.borderRadius[size]
    const appliedBorderRadius = showCancelButton
        ? `${borderRadius} 0px 0px ${borderRadius}`
        : borderRadius

    const getDisplayText = () => {
        if (selectedValues.length === 0) {
            return placeholder || 'Select options...'
        }
        return `${selectedValues.length} selected`
    }

    if (isMobile) {
        return (
            <Block width="100%" display="flex" flexDirection="column" gap={8}>
                {variant === MultiSelectVariant.CONTAINER && (
                    <InputLabels
                        label={label}
                        sublabel={sublabel}
                        disabled={disabled}
                        helpIconHintText={helpIconHintText}
                        name={name}
                        required={required}
                    />
                )}

                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '8px 14px',
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <span>{getDisplayText()}</span>
                            <ChevronDown size={16} />
                        </div>
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
                                                    <ButtonV2
                                                        buttonType={
                                                            ButtonTypeV2.SECONDARY
                                                        }
                                                        size={
                                                            ButtonSizeV2.SMALL
                                                        }
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
            {variant === MultiSelectVariant.CONTAINER && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    name={name}
                    required={required}
                />
            )}
            <Block display="flex">
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
                    <MultiSelectMenu
                        items={items}
                        selected={selectedValues}
                        onSelect={onChange}
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                        maxHeight={maxHeight}
                        alignment={alignment}
                        side={side}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        open={open}
                        onOpenChange={setOpen}
                        trigger={
                            <PrimitiveButton
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
                                padding={
                                    multiSelectTokens.trigger.padding[size]
                                }
                                backgroundColor={
                                    multiSelectTokens.trigger.backgroundColor
                                        .container[open ? 'open' : 'closed']
                                }
                                outline={
                                    multiSelectTokens.trigger.outline[variant][
                                        open ? 'open' : 'closed'
                                    ]
                                }
                                _hover={{
                                    outline:
                                        multiSelectTokens.trigger.outline[
                                            variant
                                        ].hover,
                                    backgroundColor:
                                        multiSelectTokens.trigger
                                            .backgroundColor.container.hover,
                                }}
                                _focus={{
                                    outline:
                                        multiSelectTokens.trigger.outline[
                                            variant
                                        ].focus,
                                    backgroundColor:
                                        multiSelectTokens.trigger
                                            .backgroundColor.container.focus,
                                }}
                            >
                                {slot && (
                                    <Block as="span" contentCentered>
                                        {slot}
                                    </Block>
                                )}
                                <Block
                                    as="span"
                                    height={20}
                                    textAlign="left"
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

                                    {/* Variant == Container - always show the placeholder*/}
                                    {variant ===
                                        MultiSelectVariant.NO_CONTAINER ||
                                        (variant ===
                                            MultiSelectVariant.CONTAINER && (
                                            <Text
                                                as="span"
                                                variant="body.md"
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[700]
                                                }
                                                fontWeight={500}
                                            >
                                                {variant ===
                                                MultiSelectVariant.CONTAINER
                                                    ? placeholder
                                                    : label}
                                            </Text>
                                        ))}
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
                        }
                    />
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
                                    multiSelectTokens.trigger.outline[variant]
                                        .closed
                                }
                                _hover={{
                                    backgroundColor:
                                        FOUNDATION_THEME.colors.gray[25],
                                }}
                                _focus={{
                                    backgroundColor:
                                        FOUNDATION_THEME.colors.gray[25],
                                    outline: `1px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
                                }}
                            >
                                <X
                                    size={16}
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                />
                            </PrimitiveButton>
                        )}
                </Block>
            </Block>
            {variant === MultiSelectVariant.CONTAINER && (
                <InputFooter hintText={hintText} />
            )}
        </Block>
    )
}

export default MultiSelect
