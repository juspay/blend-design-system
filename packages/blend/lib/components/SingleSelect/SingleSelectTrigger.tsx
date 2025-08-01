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
}

const SingleSelectTrigger = ({
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
}: SingleSelectTriggerProps) => {
    const slotRef = useRef<HTMLDivElement>(null)
    const slotWidth = slotRef.current?.offsetWidth

    const borderRadius = singleSelectTokens.trigger.borderRadius[size]
    const paddingX = toPixels(singleSelectTokens.trigger.paddingX[size])
    const paddingY = toPixels(singleSelectTokens.trigger.paddingY[size])
    const paddingInlineStart =
        slot && slotWidth ? paddingX + slotWidth + 8 : paddingX

    return (
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
            boxShadow={singleSelectTokens.trigger.boxShadow[variant]}
            paddingX={paddingX}
            paddingY={paddingY}
            backgroundColor={
                singleSelectTokens.trigger.backgroundColor.container[
                    open ? 'open' : 'closed'
                ]
            }
            outline={
                singleSelectTokens.trigger.outline[variant][
                    open ? 'open' : 'closed'
                ]
            }
            _hover={{
                outline: singleSelectTokens.trigger.outline[variant].hover,
                backgroundColor:
                    singleSelectTokens.trigger.backgroundColor.container.hover,
            }}
            _focus={{
                outline: singleSelectTokens.trigger.outline[variant].focus,
                backgroundColor:
                    singleSelectTokens.trigger.backgroundColor.container.focus,
            }}
            onClick={onClick}
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
                                label={label}
                                required={required || false}
                                name={name || ''}
                                isFocused={isItemSelected}
                            />
                        </Block>
                        {selected && (
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.gray[600]}
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
                                ? FOUNDATION_THEME.colors.gray[700]
                                : FOUNDATION_THEME.colors.gray[600]
                        }
                        fontWeight={500}
                    >
                        {selected ? valueLabelMap[selected] : placeholder}
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
    )
}

export default SingleSelectTrigger
