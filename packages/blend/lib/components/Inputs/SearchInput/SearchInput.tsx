import { useEffect, forwardRef } from 'react'
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

        return (
            <Block position="relative" width={'100%'} height={40}>
                {leftSlot && (
                    <Block
                        ref={leftSlotRef}
                        position="absolute"
                        top={paddingY}
                        left={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {leftSlot}
                    </Block>
                )}

                {rightSlot && (
                    <Block
                        ref={rightSlotRef}
                        position="absolute"
                        top={paddingY}
                        right={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {rightSlot}
                    </Block>
                )}

                <PrimitiveInput
                    ref={ref}
                    name={name}
                    value={value}
                    onChange={onChange}
                    height={searchInputTokens.inputContainer.height}
                    width={searchInputTokens.inputContainer.width}
                    placeholder={placeholder}
                    paddingInlineStart={paddingInlineStart}
                    paddingInlineEnd={paddingInlineEnd}
                    paddingY={paddingY}
                    outline={searchInputTokens.inputContainer.outline}
                    borderRadius={searchInputTokens.inputContainer.borderRadius}
                    borderTop={
                        searchInputTokens.inputContainer.borderTop.default
                    }
                    borderLeft={
                        searchInputTokens.inputContainer.borderLeft.default
                    }
                    borderRight={
                        searchInputTokens.inputContainer.borderRight.default
                    }
                    borderBottom={
                        error
                            ? searchInputTokens.inputContainer.borderBottom
                                  .error
                            : searchInputTokens.inputContainer.borderBottom
                                  .default
                    }
                    color={searchInputTokens.inputContainer.color}
                    fontSize={searchInputTokens.inputContainer.fontSize}
                    fontWeight={searchInputTokens.inputContainer.fontWeight}
                    placeholderColor={
                        searchInputTokens.inputContainer.placeholderColor
                    }
                    _hover={{
                        borderBottom:
                            searchInputTokens.inputContainer.borderBottom.hover,
                    }}
                    _focus={{
                        borderBottom:
                            searchInputTokens.inputContainer.borderBottom.focus,
                    }}
                    {...rest}
                />
            </Block>
        )
    }
)

export default SearchInput
