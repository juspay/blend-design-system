import React from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../tokens'
import Text from '../Text/Text'
import { ChevronDown, X } from 'lucide-react'
import {
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

export type MultiSelectTriggerProps = {
    selectedValues: string[]
    valueLabelMap: Record<string, string>
    variant: MultiSelectVariant
    selectionTagType: MultiSelectSelectionTagType
    slot?: React.ReactNode
    label: string
    placeholder: string
    size: MultiSelectMenuSize
    required?: boolean
    open?: boolean
    disabled?: boolean
    multiSelectTokens: MultiSelectTokensType
    onClearAll?: (e: React.MouseEvent) => void
    onClick?: () => void
    className?: string
    style?: React.CSSProperties
}

const MultiSelectTrigger = React.forwardRef<
    HTMLButtonElement,
    MultiSelectTriggerProps
>(
    (
        {
            selectedValues,
            valueLabelMap,
            variant,
            selectionTagType,
            slot,
            label,
            placeholder,
            size,
            required,
            open = false,
            disabled = false,
            multiSelectTokens,
            onClearAll,
            onClick,
            className,
            style,
            ...props
        },
        ref
    ) => {
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const showCancelButton =
            variant === MultiSelectVariant.CONTAINER &&
            selectedValues.length > 0

        const borderRadius = multiSelectTokens.trigger.borderRadius[size]
        const appliedBorderRadius = showCancelButton
            ? `${borderRadius} 0px 0px ${borderRadius}`
            : borderRadius

        const handleClearAll = (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            onClearAll?.(e)
        }

        return (
            <Block display="flex" className={className} style={style}>
                <Block display="flex" width="100%">
                    <PrimitiveButton
                        ref={ref}
                        width={'100%'}
                        display="flex"
                        alignItems="center"
                        overflow="hidden"
                        justifyContent="space-between"
                        gap={8}
                        borderRadius={appliedBorderRadius}
                        boxShadow={multiSelectTokens.trigger.boxShadow[variant]}
                        padding={multiSelectTokens.trigger.padding[size]}
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
                        disabled={disabled}
                        onClick={onClick}
                        _hover={{
                            outline:
                                multiSelectTokens.trigger.outline[variant]
                                    .hover,
                            backgroundColor:
                                multiSelectTokens.trigger.backgroundColor
                                    .container.hover,
                        }}
                        _focus={{
                            outline:
                                multiSelectTokens.trigger.outline[variant]
                                    .focus,
                            backgroundColor:
                                multiSelectTokens.trigger.backgroundColor
                                    .container.focus,
                        }}
                        {...props}
                    >
                        {slot && (
                            <Block as="span" contentCentered>
                                {slot}
                            </Block>
                        )}
                        <Block
                            as="span"
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

                            {isSmallScreen &&
                                size === MultiSelectMenuSize.LARGE &&
                                variant === MultiSelectVariant.CONTAINER && (
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={4}
                                    >
                                        <Text
                                            as="span"
                                            variant="body.sm"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            fontWeight={500}
                                        >
                                            {label}
                                        </Text>
                                        {required && (
                                            <span
                                                style={{
                                                    color: FOUNDATION_THEME
                                                        .colors.red[500],
                                                }}
                                            >
                                                *
                                            </span>
                                        )}
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
                                        color={
                                            FOUNDATION_THEME.colors.gray[700]
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
                                        multiSelectTokens.trigger.selectionTag
                                            .container[selectionTagType].color
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
                </Block>
                <Block>
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
                                onClick={handleClearAll}
                                outline={
                                    multiSelectTokens.trigger.outline[variant]
                                        .closed
                                }
                                disabled={disabled}
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
)

MultiSelectTrigger.displayName = 'MultiSelectTrigger'

export default MultiSelectTrigger
