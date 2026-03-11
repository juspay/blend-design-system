import React, { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import Text from '../Text/Text'
import {
    MultiSelectV2SelectionTagType,
    MultiSelectV2Size,
    MultiSelectV2Variant,
    type SelectV2TriggerDimensions,
} from './multiSelectV2.types'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import { getTriggerLeftPadding, getTriggerTopPadding } from './utils'

const DEFAULT_TRIGGER_DIMENSIONS: SelectV2TriggerDimensions = {
    width: 'fit-content',
}

export type MultiSelectV2TriggerProps = {
    selectedValues: string[]
    slot?: React.ReactNode
    variant: MultiSelectV2Variant
    size: MultiSelectV2Size
    isSmallScreen: boolean
    name: string
    label: string
    placeholder: string
    required: boolean
    selectionTagType: MultiSelectV2SelectionTagType
    valueLabelMap: Record<string, string>
    open: boolean
    multiSelectTokens: MultiSelectV2TokensType
    inline?: boolean
    error?: boolean
    disabled?: boolean
    triggerDimensions?: SelectV2TriggerDimensions
    borderRadius: string
    borderRight?: string
    [key: string]: unknown
}

const MultiSelectV2Trigger = ({
    selectedValues,
    slot,
    variant,
    size,
    isSmallScreen,
    name,
    label,
    placeholder,
    required,
    selectionTagType,
    valueLabelMap,
    open,
    multiSelectTokens,
    inline = false,
    error = false,
    disabled = false,
    triggerDimensions = DEFAULT_TRIGGER_DIMENSIONS,
    borderRadius,
    borderRight,
    ...rest
}: MultiSelectV2TriggerProps) => {
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const isContainer = variant === MultiSelectV2Variant.CONTAINER
    const isItemSelected = selectedValues.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === MultiSelectV2Size.LG

    const paddingX = getTriggerLeftPadding(multiSelectTokens, size, variant)
    const paddingY = getTriggerTopPadding(multiSelectTokens, size, variant)
    const slotGap = Number(multiSelectTokens.trigger?.slot?.gap ?? 8)
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + slotGap : paddingX
    const chevronWidth = multiSelectTokens.trigger?.chevron?.width ?? 20
    const chevronHeight = multiSelectTokens.trigger?.chevron?.height ?? 20
    const chevronIconSize = multiSelectTokens.trigger?.chevron?.iconSize ?? 16
    const floatingLabelPaddingTop =
        multiSelectTokens.trigger?.floatingLabel?.paddingTop ?? '0.375rem'

    const triggerState = error ? 'error' : open ? 'open' : 'closed'
    const trigger = multiSelectTokens.trigger
    const outline = trigger?.outline?.[variant]?.[triggerState] ?? 'none'
    const backgroundColor =
        trigger?.backgroundColor?.[variant]?.[triggerState] ?? 'transparent'

    const showContainerStyles = !inline || isContainer
    const hoverState = error ? 'error' : 'hover'
    const focusState = error ? 'error' : 'focus'
    const hoverOutline = trigger?.outline?.[variant]?.[hoverState] ?? 'none'
    const hoverBackgroundColor =
        trigger?.backgroundColor?.[variant]?.[hoverState] ?? 'transparent'
    const focusOutline = trigger?.outline?.[variant]?.[focusState] ?? 'none'
    const focusBackgroundColor =
        trigger?.backgroundColor?.[variant]?.[focusState] ?? 'transparent'
    const resolvedBorderRadius =
        borderRadius ?? trigger?.borderRadius?.[size]?.[variant]
    const selectionTagToken = multiSelectTokens.trigger?.selectionTag as
        | { paddingCount?: string; paddingText?: string }
        | undefined
    const selectionTagStyles =
        selectionTagType === MultiSelectV2SelectionTagType.COUNT
            ? (selectionTagToken?.paddingCount ?? `0 ${slotGap}px`)
            : (selectionTagToken?.paddingText ?? '0')

    return (
        <PrimitiveButton
            {...(rest as object)}
            id={name}
            data-element="multi-select-button"
            type="button"
            role="combobox"
            disabled={disabled}
            position="relative"
            width={triggerDimensions.width ?? 'fit-content'}
            maxWidth={triggerDimensions.maxWidth ?? '100%'}
            minWidth={triggerDimensions.minWidth}
            display="flex"
            alignItems="center"
            overflow="hidden"
            justifyContent="space-between"
            gap={multiSelectTokens.trigger?.slot?.gap ?? 8}
            borderRadius={resolvedBorderRadius}
            outline={outline}
            {...(showContainerStyles && {
                height: trigger?.height?.[size]?.[variant],
                maxHeight: trigger?.height?.[size]?.[variant],
                paddingLeft: paddingX,
                paddingRight: paddingX,
                paddingTop: paddingY,
                paddingBottom: paddingY,
                backgroundColor,
                borderRight,
                ...(!disabled && {
                    _hover: {
                        outline: hoverOutline,
                        backgroundColor: hoverBackgroundColor,
                    },
                }),
                _focus: {
                    outline: focusOutline,
                    backgroundColor: focusBackgroundColor,
                },
                _disabled: {
                    cursor: 'not-allowed',
                    backgroundColor:
                        trigger?.backgroundColor?.[variant]?.closed ??
                        'transparent',
                    color:
                        multiSelectTokens.label?.color?.disabled ??
                        'currentColor',
                },
            })}
        >
            {slot && (
                <Block
                    data-element="icon"
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
                    isContainer && isSmallScreenWithLargeSize && isItemSelected
                        ? floatingLabelPaddingTop
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
                {variant === MultiSelectV2Variant.NO_CONTAINER && (
                    <Text
                        as="span"
                        variant="body.md"
                        color={
                            disabled
                                ? multiSelectTokens.label?.color?.disabled
                                : multiSelectTokens.trigger?.placeholder?.color
                        }
                        fontWeight={
                            multiSelectTokens.trigger?.placeholder?.fontWeight
                        }
                        fontSize={
                            multiSelectTokens.trigger?.placeholder?.fontSize
                        }
                    >
                        {label}
                    </Text>
                )}

                {isSmallScreenWithLargeSize && isContainer && (
                    <Block
                        position="absolute"
                        top={
                            isItemSelected
                                ? `${paddingY - paddingY / 1.3 + (!required ? 3 : 0)}px`
                                : '50%'
                        }
                        left={`${paddingInlineStart}px`}
                        height="max-content"
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
                            required={required}
                            name={name}
                            isFocused={isItemSelected}
                        />
                    </Block>
                )}

                {isContainer &&
                    (selectedValues.length > 0 ||
                        !isSmallScreen ||
                        size !== MultiSelectV2Size.LG) && (
                        <Text
                            data-element="placeholder"
                            data-id={placeholder || 'placeholder'}
                            as="span"
                            color={
                                disabled
                                    ? multiSelectTokens.label?.color?.disabled
                                    : multiSelectTokens.label?.color?.default
                            }
                            fontWeight={
                                multiSelectTokens.trigger?.placeholder
                                    ?.fontWeight
                            }
                            fontSize={
                                multiSelectTokens.trigger?.placeholder?.fontSize
                            }
                        >
                            {placeholder}
                        </Text>
                    )}

                {selectedValues.length > 0 && (
                    <Text
                        data-element="selection-tag"
                        data-id={
                            selectionTagType ===
                            MultiSelectV2SelectionTagType.COUNT
                                ? String(selectedValues.length)
                                : 'selection-tag'
                        }
                        as="span"
                        variant="body.md"
                        color={
                            selectionTagType ===
                            MultiSelectV2SelectionTagType.TEXT
                                ? multiSelectTokens.subLabel?.color?.default
                                : trigger?.selectionTag?.[variant]?.count?.color
                        }
                        fontWeight={
                            trigger?.selectionTag?.[variant]?.[selectionTagType]
                                ?.fontWeight
                        }
                        style={{
                            height: '100%',
                            marginLeft: trigger?.selectionTag?.marginLeft ?? 8,
                            backgroundColor:
                                disabled &&
                                selectionTagType ===
                                    MultiSelectV2SelectionTagType.TEXT
                                    ? trigger?.backgroundColor?.[variant]
                                          ?.closed
                                    : trigger?.selectionTag?.[variant]?.[
                                          selectionTagType
                                      ]?.backgroundColor,
                            borderRadius:
                                trigger?.selectionTag?.borderRadius ?? 6,
                            padding: selectionTagStyles,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        data-badge-value={
                            selectionTagType ===
                            MultiSelectV2SelectionTagType.COUNT
                                ? selectedValues.length
                                : selectedValues
                                      .map((v) => valueLabelMap[v])
                                      .join(', ')
                        }
                    >
                        {selectionTagType ===
                        MultiSelectV2SelectionTagType.COUNT
                            ? selectedValues.length
                            : selectedValues
                                  .map((v) => valueLabelMap[v])
                                  .join(', ')}
                    </Text>
                )}
            </Block>

            <Block
                data-element="chevron-icon"
                as="span"
                display="flex"
                alignItems="center"
                gap={multiSelectTokens.trigger?.chevron?.gap ?? 4}
                width={chevronWidth}
                height={chevronHeight}
                contentCentered
                flexShrink={0}
            >
                <ChevronDown
                    size={chevronIconSize}
                    aria-hidden="true"
                    color={
                        disabled
                            ? multiSelectTokens.label?.color?.disabled
                            : multiSelectTokens.subLabel?.color?.default
                    }
                />
            </Block>
        </PrimitiveButton>
    )
}

MultiSelectV2Trigger.displayName = 'MultiSelectV2Trigger'

export default MultiSelectV2Trigger
