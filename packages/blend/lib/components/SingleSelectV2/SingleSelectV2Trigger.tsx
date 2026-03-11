import React, { useRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import { toPixels } from '../../global-utils/GlobalUtils'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { TruncatedTextWithTooltip } from '../common'
import { ChevronDown } from 'lucide-react'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type SelectV2TriggerDimensions,
} from './SingleSelectV2.types'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'

export type SingleSelectV2TriggerProps = {
    size: SingleSelectV2Size
    selected: string
    label: string
    name: string
    placeholder: string
    required: boolean
    valueLabelMap: Record<string, string>
    open: boolean
    slot?: React.ReactNode
    variant: SingleSelectV2Variant
    isSmallScreenWithLargeSize: boolean
    isItemSelected: boolean
    singleSelectTokens: SingleSelectV2TokensType
    inline?: boolean
    error?: boolean
    disabled?: boolean
    triggerDimensions?: SelectV2TriggerDimensions
    singleSelectGroupPosition?: 'center' | 'left' | 'right'
    borderRadius?: string
    borderRight?: string
    [key: string]: unknown
}

const DEFAULT_TRIGGER_DIMENSIONS: SelectV2TriggerDimensions = {
    width: 'fit-content',
}

const SingleSelectV2Trigger = ({
    triggerDimensions = DEFAULT_TRIGGER_DIMENSIONS,
    size,
    selected,
    label,
    name,
    placeholder,
    required,
    valueLabelMap,
    open,
    slot,
    variant,
    isSmallScreenWithLargeSize,
    isItemSelected,
    singleSelectTokens,
    inline = false,
    error,
    disabled,
    singleSelectGroupPosition: _singleSelectGroupPosition,
    borderRadius,
    borderRight,
    ...rest
}: SingleSelectV2TriggerProps) => {
    void _singleSelectGroupPosition
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const padding = singleSelectTokens.trigger.padding[size][variant]
    const paddingLeft = toPixels(padding.left)
    const paddingRight = toPixels(padding.right)
    const paddingTop = toPixels(padding.top)
    const paddingBottom = toPixels(padding.bottom)
    const paddingInlineStart =
        slot && slotWidth ? paddingLeft + slotWidth + 8 : paddingLeft

    const isContainer = variant === SingleSelectV2Variant.CONTAINER
    const resolvedBorderRadius =
        borderRadius ?? singleSelectTokens.trigger.borderRadius[size][variant]

    const resolvedWidth =
        triggerDimensions.width ??
        (triggerDimensions.maxWidth || triggerDimensions.minWidth
            ? undefined
            : 'fit-content')

    return (
        <PrimitiveButton
            data-element="single-select-button"
            type="button"
            disabled={disabled}
            maxWidth={triggerDimensions.maxWidth}
            minWidth={triggerDimensions.minWidth}
            width={resolvedWidth}
            name={name}
            id={name}
            position="relative"
            display="flex"
            alignItems="center"
            overflow="hidden"
            justifyContent="space-between"
            gap={8}
            borderRadius={resolvedBorderRadius}
            border={
                singleSelectTokens.trigger.outline[variant][
                    error ? 'error' : open ? 'open' : 'closed'
                ]
            }
            borderRight={borderRight}
            {...((!inline || isContainer) && {
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                backgroundColor:
                    singleSelectTokens.trigger.backgroundColor[variant][
                        error ? 'error' : open ? 'open' : 'closed'
                    ],
                height: singleSelectTokens.trigger.height[size][variant],
                maxHeight: singleSelectTokens.trigger.height[size][variant],
                ...(!disabled && {
                    _hover: {
                        border: singleSelectTokens.trigger.outline[variant][
                            error ? 'error' : 'hover'
                        ],
                        backgroundColor:
                            singleSelectTokens.trigger.backgroundColor[variant][
                                error ? 'error' : 'hover'
                            ],
                        borderRight: borderRight,
                    },
                }),
                _focus: {
                    border: singleSelectTokens.trigger.outline[variant][
                        error ? 'error' : 'focus'
                    ],
                    backgroundColor:
                        singleSelectTokens.trigger.backgroundColor[variant][
                            error ? 'error' : 'focus'
                        ],
                    borderRight: borderRight,
                },
                _disabled: {
                    cursor: 'not-allowed',
                    backgroundColor:
                        singleSelectTokens.trigger.backgroundColor[variant][
                            'closed'
                        ],
                    color: singleSelectTokens.label.color.disabled,
                },
            })}
            {...rest}
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
                {isSmallScreenWithLargeSize && isContainer ? (
                    <Block
                        as="span"
                        textAlign="left"
                        paddingTop={
                            isSmallScreenWithLargeSize && isItemSelected
                                ? paddingTop * 1.5
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
                                    ? toPixels(paddingTop - paddingTop / 1.3) +
                                      (!required ? 3 : 0)
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
                                label={label || ''}
                                required={required || false}
                                name={name || ''}
                                isFocused={isItemSelected}
                            />
                        </Block>
                        {selected && (
                            <TruncatedTextWithTooltip
                                text={valueLabelMap[selected] || selected}
                                style={{
                                    fontSize:
                                        singleSelectTokens.trigger.placeholder
                                            .fontSize,
                                    color: disabled
                                        ? singleSelectTokens.label.color
                                              .disabled
                                        : singleSelectTokens.trigger.placeholder
                                              .color,
                                    fontWeight:
                                        singleSelectTokens.trigger.placeholder
                                            .fontWeight,
                                }}
                            />
                        )}
                    </Block>
                ) : (
                    <TruncatedTextWithTooltip
                        text={
                            selected
                                ? valueLabelMap[selected] || selected
                                : placeholder
                        }
                        data-element="placeholder"
                        data-id={
                            selected
                                ? valueLabelMap[selected] || selected
                                : placeholder
                        }
                        style={{
                            flexGrow: 1,
                            flexShrink: 1,
                            minWidth: 0,
                            color: disabled
                                ? singleSelectTokens.label.color.disabled
                                : selected
                                  ? singleSelectTokens.trigger.selectedValue
                                        .color
                                  : singleSelectTokens.trigger.placeholder
                                        .color,
                            fontWeight: selected
                                ? singleSelectTokens.trigger.selectedValue
                                      .fontWeight
                                : singleSelectTokens.trigger.placeholder
                                      .fontWeight,
                            fontSize: selected
                                ? singleSelectTokens.trigger.selectedValue
                                      .fontSize
                                : singleSelectTokens.trigger.placeholder
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
                            ? singleSelectTokens.label.color.disabled
                            : selected
                              ? singleSelectTokens.trigger.selectedValue.color
                              : singleSelectTokens.trigger.placeholder.color
                    }
                />
            </Block>
        </PrimitiveButton>
    )
}

export default SingleSelectV2Trigger
