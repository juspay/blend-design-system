import React, { useRef } from 'react'
import Block from '../Primitives/Block/Block'
import { toPixels } from '../../global-utils/GlobalUtils'
import { MultiSelectTokensType } from './multiSelect.tokens'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import Text from '../Text/Text'
import { FOUNDATION_THEME } from '../../tokens'
import { ChevronDown, X } from 'lucide-react'
import {
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
export type MultiSelectTriggerProps = {
    selectedValues: string[]
    slot: React.ReactNode
    variant: MultiSelectVariant
    size: MultiSelectMenuSize
    isSmallScreen: boolean
    onChange: (value: string) => void
    name: string
    label: string
    placeholder: string
    required: boolean
    selectionTagType: MultiSelectSelectionTagType
    valueLabelMap: Record<string, string>
    open: boolean
    onClick?: () => void
    multiSelectTokens: MultiSelectTokensType
}
const MultiSelectTrigger = ({
    selectedValues,
    slot,
    variant,
    size,
    isSmallScreen,
    onChange,
    name,
    label,
    placeholder,
    required,
    selectionTagType,
    valueLabelMap,
    open,
    onClick,
    multiSelectTokens,
}: MultiSelectTriggerProps) => {
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth
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
    return (
        <Block
            display="flex"
            height={toPixels(multiSelectTokens.trigger.height)}
            maxHeight={toPixels(multiSelectTokens.trigger.height)}
        >
            <Block
                width={
                    variant === MultiSelectVariant.CONTAINER ? '100%' : 'auto'
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
                    height={toPixels(multiSelectTokens.trigger.height)}
                    maxHeight={toPixels(multiSelectTokens.trigger.height)}
                    width={'100%'}
                    display="flex"
                    alignItems="center"
                    overflow="hidden"
                    justifyContent="space-between"
                    gap={8}
                    borderRadius={appliedBorderRadius}
                    boxShadow={multiSelectTokens.trigger.boxShadow[variant]}
                    paddingX={multiSelectTokens.trigger.paddingX[size]}
                    paddingY={paddingY}
                    backgroundColor={
                        multiSelectTokens.trigger.backgroundColor.container[
                            open ? 'open' : 'closed'
                        ]
                    }
                    outline={
                        multiSelectTokens.trigger.outline[variant][
                            open ? 'open' : 'closed'
                        ]
                    }
                    onClick={onClick}
                    _hover={{
                        outline:
                            multiSelectTokens.trigger.outline[variant].hover,
                        backgroundColor:
                            multiSelectTokens.trigger.backgroundColor.container
                                .hover,
                    }}
                    _focus={{
                        outline:
                            multiSelectTokens.trigger.outline[variant].focus,
                        backgroundColor:
                            multiSelectTokens.trigger.backgroundColor.container
                                .focus,
                    }}
                >
                    {slot && (
                        <Block as="span" ref={slotRef} contentCentered>
                            {slot}
                        </Block>
                    )}
                    <Block
                        as="span"
                        textAlign="left"
                        paddingTop={
                            variant === MultiSelectVariant.CONTAINER &&
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
                        {variant === MultiSelectVariant.NO_CONTAINER && (
                            <Text
                                as="span"
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.gray[700]}
                                fontWeight={500}
                            >
                                {label}
                            </Text>
                        )}
                        {isSmallScreenWithLargeSize &&
                            variant === MultiSelectVariant.CONTAINER && (
                                <Block
                                    position="absolute"
                                    top={
                                        isItemSelected
                                            ? toPixels(
                                                  paddingY - paddingY / 1.3
                                              ) + (!required ? 3 : 0)
                                            : '50%'
                                    }
                                    left={toPixels(paddingInlineStart)}
                                    height={'max-content'}
                                    style={{
                                        transition: 'all 0.2s ease-in-out',
                                        transform: isItemSelected
                                            ? 'scale(0.95)'
                                            : 'translateY(-50%) scale(1)',
                                        transformOrigin: 'left center',
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
                                size !== MultiSelectMenuSize.LARGE) && (
                                <Text
                                    as="span"
                                    variant="body.md"
                                    color={FOUNDATION_THEME.colors.gray[700]}
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
                                    multiSelectTokens.trigger.selectionTag
                                        .container[selectionTagType].color
                                }
                                fontWeight={500}
                                style={{
                                    height: '100%',
                                    marginLeft: 8,
                                    backgroundColor:
                                        multiSelectTokens.trigger.selectionTag
                                            .container[selectionTagType]
                                            .backgroundColor,
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
                                          .map((v) => valueLabelMap[v])
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
                            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
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
    )
}
export default MultiSelectTrigger
