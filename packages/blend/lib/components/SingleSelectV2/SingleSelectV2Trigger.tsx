import React, { useRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import { toPixels } from '../../global-utils/GlobalUtils'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import { TruncatedTextWithTooltip } from '../common'
import { ChevronDown } from 'lucide-react'
import { SingleSelectV2Size, SingleSelectV2Variant } from './types'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import { getBorderRadius } from './utils'

export type SingleSelectV2TriggerProps = {
    size: SingleSelectV2Size
    selected: string
    label: string
    name: string
    placeholder: string
    required: boolean
    valueLabelMap: Record<string, string>
    open: boolean
    onClick?: () => void
    slot?: React.ReactNode
    variant: SingleSelectV2Variant
    isSmallScreenWithLargeSize: boolean
    isItemSelected: boolean
    singleSelectTokens: SingleSelectV2TokensType
    inline?: boolean
    error?: boolean
    disabled?: boolean
    maxTriggerWidth?: number
    minTriggerWidth?: number
    singleSelectGroupPosition?: 'center' | 'left' | 'right'
    fullWidth?: boolean
    borderRadius?: string
    borderRight?: string
    [key: string]: any
}

const SingleSelectV2Trigger = ({
    maxTriggerWidth,
    minTriggerWidth,
    size,
    selected,
    label,
    name,
    placeholder,
    required,
    valueLabelMap,
    open,
    onClick,
    slot,
    variant,
    isSmallScreenWithLargeSize,
    isItemSelected,
    singleSelectTokens,
    inline = false,
    error,
    disabled,
    singleSelectGroupPosition,
    fullWidth = false,
    borderRadius,
    borderRight,
    ...rest
}: SingleSelectV2TriggerProps) => {
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const paddingX = toPixels(
        singleSelectTokens.trigger.padding[size][variant].x
    )
    const paddingY = toPixels(
        singleSelectTokens.trigger.padding[size][variant].y
    )
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    const isContainer = variant === SingleSelectV2Variant.CONTAINER

    return (
        <PrimitiveButton
            data-element="single-select-v2-button"
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
            name={name}
            id={name}
            position="relative"
            display="flex"
            alignItems="center"
            overflow="hidden"
            justifyContent="space-between"
            gap={8}
            borderRadius={borderRadius}
            border={
                singleSelectTokens.trigger.outline[variant][
                    error ? 'error' : open ? 'open' : 'closed'
                ]
            }
            borderRight={borderRight}
            onClick={onClick}
            {...((!inline || isContainer) && {
                paddingX: paddingX,
                paddingY: paddingY,
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
                            singleSelectTokens.trigger.backgroundColor
                                .container[error ? 'error' : 'hover'],
                        borderRight: borderRight,
                    },
                }),
                _focus: {
                    border: singleSelectTokens.trigger.outline[variant][
                        error ? 'error' : 'focus'
                    ],
                    backgroundColor:
                        singleSelectTokens.trigger.backgroundColor.container[
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
                                    ? toPixels(paddingY - paddingY / 1.3) +
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
