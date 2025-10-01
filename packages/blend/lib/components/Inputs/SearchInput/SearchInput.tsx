import { useEffect, forwardRef, cloneElement, isValidElement } from 'react'
import { useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'

import type { SearchInputProps } from './types'
import type { SearchInputTokensType } from './searchInput.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'

const toPixels = (value: string | number | undefined): number => {
    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'string') {
        // Remove 'px' and convert to number
        const numericValue = parseFloat(value.replace('px', ''))
        return isNaN(numericValue) ? 0 : numericValue
    }

    return 0
}

const applyIconStyles = (
    icon: React.ReactNode,
    tokens: SearchInputTokensType,
    disabled: boolean,
    error: boolean
): React.ReactNode => {
    if (!isValidElement(icon)) {
        return icon
    }

    const getIconColor = () => {
        if (disabled) return tokens.icon.color.disabled
        if (error) return tokens.icon.color.error
        return tokens.icon.color.default
    }

    const iconProps = icon.props as any

    return cloneElement(icon, {
        ...iconProps,
        style: {
            ...(iconProps.style || {}),
            color: getIconColor(),
            width: tokens.icon.width,
            height: tokens.icon.width,
        },
    })
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    (
        {
            leftSlot,
            rightSlot,
            error = false,
            placeholder = 'Enter',
            value,
            onChange,
            name,
            ...rest
        },
        ref
    ) => {
        const searchInputTokens =
            useResponsiveTokens<SearchInputTokensType>('SEARCH_INPUT')

        const leftSlotRef = useRef<HTMLDivElement>(null)
        const rightSlotRef = useRef<HTMLDivElement>(null)

        const [leftSlotWidth, setLeftSlotWidth] = useState(0)
        const [rightSlotWidth, setRightSlotWidth] = useState(0)

        useEffect(() => {
            if (leftSlotRef.current) {
                setLeftSlotWidth(leftSlotRef.current.offsetWidth)
            } else {
                setLeftSlotWidth(0)
            }
            if (rightSlotRef.current) {
                setRightSlotWidth(rightSlotRef.current.offsetWidth)
            } else {
                setRightSlotWidth(0)
            }
        }, [leftSlot, rightSlot])

        const paddingX = toPixels(searchInputTokens.inputContainer.padding.x)
        const paddingY = toPixels(searchInputTokens.inputContainer.padding.y)
        const GAP = toPixels(searchInputTokens.gap)

        const paddingInlineStart = leftSlot
            ? paddingX + leftSlotWidth + GAP
            : paddingX
        const paddingInlineEnd = rightSlot
            ? paddingX + rightSlotWidth + GAP
            : paddingX

        const styledLeftSlot = leftSlot
            ? applyIconStyles(
                  leftSlot,
                  searchInputTokens,
                  rest.disabled || false,
                  error
              )
            : null

        const styledRightSlot = rightSlot
            ? applyIconStyles(
                  rightSlot,
                  searchInputTokens,
                  rest.disabled || false,
                  error
              )
            : null

        return (
            <Block position="relative" width={'100%'} height={40}>
                {styledLeftSlot && (
                    <Block
                        ref={leftSlotRef}
                        position="absolute"
                        top={paddingY}
                        left={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {styledLeftSlot}
                    </Block>
                )}

                {styledRightSlot && (
                    <Block
                        ref={rightSlotRef}
                        position="absolute"
                        top={paddingY}
                        right={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {styledRightSlot}
                    </Block>
                )}

                <PrimitiveInput
                    ref={ref}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    paddingInlineStart={paddingInlineStart}
                    paddingInlineEnd={paddingInlineEnd}
                    paddingY={paddingY}
                    outline={searchInputTokens.inputContainer.outline}
                    borderRadius={searchInputTokens.inputContainer.borderRadius}
                    borderBottom={
                        rest.disabled
                            ? searchInputTokens.inputContainer.borderBottom
                                  .disabled
                            : error
                              ? searchInputTokens.inputContainer.borderBottom
                                    .error
                              : searchInputTokens.inputContainer.borderBottom
                                    .default
                    }
                    color={
                        rest.disabled
                            ? searchInputTokens.inputContainer.color.disabled
                            : error
                              ? searchInputTokens.inputContainer.color.error
                              : searchInputTokens.inputContainer.color.default
                    }
                    fontSize={searchInputTokens.inputContainer.fontSize}
                    fontWeight={searchInputTokens.inputContainer.fontWeight}
                    _hover={{
                        borderBottom: rest.disabled
                            ? searchInputTokens.inputContainer.borderBottom
                                  .disabled
                            : searchInputTokens.inputContainer.borderBottom
                                  .hover,
                        color: rest.disabled
                            ? searchInputTokens.inputContainer.color.disabled
                            : searchInputTokens.inputContainer.color.hover,
                    }}
                    _focus={{
                        borderBottom: rest.disabled
                            ? searchInputTokens.inputContainer.borderBottom
                                  .disabled
                            : error
                              ? searchInputTokens.inputContainer.borderBottom
                                    .error
                              : searchInputTokens.inputContainer.borderBottom
                                    .focus,
                        color: rest.disabled
                            ? searchInputTokens.inputContainer.color.disabled
                            : error
                              ? searchInputTokens.inputContainer.color.error
                              : searchInputTokens.inputContainer.color.focus,
                    }}
                    {...rest}
                />
            </Block>
        )
    }
)

export default SearchInput
