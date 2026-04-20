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
} from './singleSelectV2.types'
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
    width: 'auto',
    minWidth: 'auto',
    maxWidth: 'auto',
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

    const fallbackPadding = {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    const triggerTokens = singleSelectTokens?.trigger
    const labelDisabledColor = singleSelectTokens?.label?.color?.disabled
    const placeholderTokens = triggerTokens?.placeholder ?? {
        color: 'inherit',
        fontSize: '14px',
        fontWeight: 400,
    }
    const selectedValueTokens = triggerTokens?.selectedValue ?? {
        color: 'inherit',
        fontSize: '14px',
        fontWeight: 400,
    }
    const variantOutlineTokens = triggerTokens?.outline?.[variant] ?? {
        open: 'none',
        closed: 'none',
        hover: 'none',
        focus: 'none',
        error: 'none',
    }
    const variantBackgroundTokens = triggerTokens?.backgroundColor?.[
        variant
    ] ?? {
        open: 'transparent',
        closed: 'transparent',
        hover: 'transparent',
        focus: 'transparent',
        error: 'transparent',
    }
    const triggerHeight = triggerTokens?.height?.[size]?.[variant] ?? 'auto'
    const padding = triggerTokens?.padding?.[size]?.[variant] ?? fallbackPadding
    const paddingLeft = toPixels(padding.left)
    const paddingRight = toPixels(padding.right)
    const paddingTop = toPixels(padding.top)
    const paddingBottom = toPixels(padding.bottom)
    const paddingInlineStart =
        slot && slotWidth ? paddingLeft + slotWidth + 8 : paddingLeft

    const isContainer = variant === SingleSelectV2Variant.CONTAINER
    const resolvedBorderRadius =
        borderRadius ?? triggerTokens?.borderRadius?.[size]?.[variant] ?? '0px'

    return (
        <PrimitiveButton
            data-element="single-select-button"
            type="button"
            disabled={disabled}
            maxWidth={triggerDimensions.maxWidth}
            minWidth={triggerDimensions.minWidth}
            width={triggerDimensions.width}
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
                variantOutlineTokens[error ? 'error' : open ? 'open' : 'closed']
            }
            borderRight={borderRight}
            {...((!inline || isContainer) && {
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                backgroundColor:
                    variantBackgroundTokens[
                        error ? 'error' : open ? 'open' : 'closed'
                    ],
                height: triggerHeight,
                maxHeight: triggerHeight,
                ...(!disabled && {
                    _hover: {
                        border: variantOutlineTokens[error ? 'error' : 'hover'],
                        backgroundColor:
                            variantBackgroundTokens[error ? 'error' : 'hover'],
                        borderRight: borderRight,
                    },
                }),
                _focus: {
                    border: variantOutlineTokens[error ? 'error' : 'focus'],
                    backgroundColor:
                        variantBackgroundTokens[error ? 'error' : 'focus'],
                    borderRight: borderRight,
                },
                _disabled: {
                    cursor: 'not-allowed',
                    backgroundColor: variantBackgroundTokens.closed,
                    color: labelDisabledColor,
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
                                    fontSize: placeholderTokens.fontSize,
                                    color: disabled
                                        ? labelDisabledColor
                                        : placeholderTokens.color,
                                    fontWeight: placeholderTokens.fontWeight,
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
                                ? labelDisabledColor
                                : selected
                                  ? selectedValueTokens.color
                                  : placeholderTokens.color,
                            fontWeight: selected
                                ? selectedValueTokens.fontWeight
                                : placeholderTokens.fontWeight,
                            fontSize: selected
                                ? selectedValueTokens.fontSize
                                : placeholderTokens.fontSize,
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
                            ? labelDisabledColor
                            : selected
                              ? selectedValueTokens.color
                              : placeholderTokens.color
                    }
                />
            </Block>
        </PrimitiveButton>
    )
}

export default SingleSelectV2Trigger
