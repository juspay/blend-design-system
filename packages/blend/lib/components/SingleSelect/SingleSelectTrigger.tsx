import React, { useRef } from 'react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import { toPixels } from '../../global-utils/GlobalUtils'
import FloatingLabels from '../Inputs/utils/FloatingLabels/FloatingLabels'
import Text from '../Text/Text'
import { ChevronDown } from 'lucide-react'
import { SelectMenuSize, SelectMenuVariant } from './types'
import { SingleSelectTokensType } from './singleSelect.tokens'
import { FOUNDATION_THEME } from '../../tokens'

export type SingleSelectTriggerProps = {
    size: SelectMenuSize
    selected: string
    label: string
    name: string
    placeholder: string
    required: boolean
    valueLabelMap: Record<string, string>
    open: boolean
    onClick?: () => void
    slot: React.ReactNode
    variant: SelectMenuVariant
    isSmallScreenWithLargeSize: boolean
    isItemSelected: boolean
    singleSelectTokens: SingleSelectTokensType
    inline?: boolean
    error?: boolean
    errorMessage?: string
    disabled?: boolean
    maxTriggerWidth?: number
    minTriggerWidth?: number
}

const SingleSelectTrigger = ({
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
}: SingleSelectTriggerProps) => {
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const borderRadius = singleSelectTokens.trigger.borderRadius[size][variant]
    const paddingX = toPixels(
        singleSelectTokens.trigger.padding[size][variant].x
    )
    const paddingY = toPixels(
        singleSelectTokens.trigger.padding[size][variant].y
    )
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    return (
        <>
            <PrimitiveButton
                data-selectbox-value={placeholder}
                data-dropdown-for={placeholder}
                data-value={selected || placeholder}
                data-custom-value={selected || placeholder}
                data-button-status={disabled ? 'disabled' : 'enabled'}
                onClick={onClick}
                maxWidth={maxTriggerWidth}
                minWidth={minTriggerWidth}
                type="button"
                name={name}
                position="relative"
                width={'100%'}
                display="flex"
                alignItems="center"
                overflow="hidden"
                justifyContent="space-between"
                gap={8}
                borderRadius={borderRadius}
                outline={
                    singleSelectTokens.trigger.outline[variant][
                        error ? 'error' : open ? 'open' : 'closed'
                    ]
                }
                {...((!inline || variant === SelectMenuVariant.CONTAINER) && {
                    paddingX: paddingX,
                    paddingY: paddingY,
                    backgroundColor:
                        singleSelectTokens.trigger.backgroundColor[variant][
                            error ? 'error' : open ? 'open' : 'closed'
                        ],
                    height: singleSelectTokens.trigger.height[size][variant],
                    maxHeight: singleSelectTokens.trigger.height[size][variant],
                    _hover: {
                        outline:
                            singleSelectTokens.trigger.outline[variant][
                                error ? 'error' : 'hover'
                            ],
                        backgroundColor:
                            singleSelectTokens.trigger.backgroundColor
                                .container[error ? 'error' : 'hover'],
                    },
                    _focus: {
                        outline:
                            singleSelectTokens.trigger.outline[variant][
                                error ? 'error' : 'focus'
                            ],
                        backgroundColor:
                            singleSelectTokens.trigger.backgroundColor
                                .container[error ? 'error' : 'focus'],
                    },
                })}
            >
                <Block display="flex" alignItems="center" gap={8}>
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
                                isSmallScreenWithLargeSize && isItemSelected
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
                                <Text
                                    color={
                                        singleSelectTokens.trigger.selectedValue
                                            .color
                                    }
                                    fontWeight={
                                        singleSelectTokens.trigger.selectedValue
                                            .fontWeight
                                    }
                                    fontSize={
                                        singleSelectTokens.trigger.selectedValue
                                            .fontSize
                                    }
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                    data-button-text={
                                        valueLabelMap[selected] || selected
                                    }
                                >
                                    {valueLabelMap[selected] || selected}
                                </Text>
                            )}
                        </Block>
                    ) : (
                        <Text
                            color={
                                selected
                                    ? singleSelectTokens.trigger.selectedValue
                                          .color
                                    : singleSelectTokens.trigger.placeholder
                                          .color
                            }
                            fontWeight={
                                selected
                                    ? singleSelectTokens.trigger.selectedValue
                                          .fontWeight
                                    : singleSelectTokens.trigger.placeholder
                                          .fontWeight
                            }
                            fontSize={
                                selected
                                    ? singleSelectTokens.trigger.selectedValue
                                          .fontSize
                                    : singleSelectTokens.trigger.placeholder
                                          .fontSize
                            }
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                            data-button-text={
                                selected
                                    ? valueLabelMap[selected] || selected
                                    : placeholder
                            }
                        >
                            {selected
                                ? valueLabelMap[selected] || selected
                                : placeholder}
                        </Text>
                    )}
                </Block>
                <Block contentCentered>
                    <ChevronDown
                        size={16}
                        color={FOUNDATION_THEME.colors.gray[500]}
                    />
                </Block>
            </PrimitiveButton>
        </>
    )
}

export default SingleSelectTrigger
