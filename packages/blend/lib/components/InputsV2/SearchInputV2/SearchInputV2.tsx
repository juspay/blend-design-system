import { useEffect, forwardRef, useMemo } from 'react'
import { useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { XIcon } from '@phosphor-icons/react'
import type { SearchInputV2Props } from './SearchInputV2.types'
import type { SearchInputV2TokensType } from './SearchInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import {
    applyIconStyles,
    createSearchInputV2ClearHandler,
    getSearchInputV2InputStateKey,
    getSearchInputV2PaddingInline,
    getSearchInputV2PrimitiveInputChrome,
    getSearchInputV2SlotWrapperStyle,
    shouldShowSearchInputV2Clear,
    toPixels,
} from './utils'

const SearchInputV2 = forwardRef<HTMLInputElement, SearchInputV2Props>(
    (
        {
            leftSlot,
            rightSlot,
            error = false,
            placeholder = 'Enter',
            value,
            onChange,
            name,
            allowClear = true,
            onClear,
            clearIcon,
            disabled = false,
            onFocus,
            onBlur,
            ...rest
        },
        ref
    ) => {
        const filteredRest = filterBlockedProps(rest)
        const searchInputTokens =
            useResponsiveTokens<SearchInputV2TokensType>('SEARCH_INPUT_V2')

        const leftSlotRef = useRef<HTMLDivElement>(null)
        const rightSlotRef = useRef<HTMLDivElement>(null)

        const [leftSlotWidth, setLeftSlotWidth] = useState(0)
        const [rightSlotWidth, setRightSlotWidth] = useState(0)
        const [isFocused, setIsFocused] = useState(false)

        const inputState = useMemo(
            () => getSearchInputV2InputStateKey(error, isFocused, disabled),
            [error, isFocused, disabled]
        )

        const showClearButton = useMemo(
            () => shouldShowSearchInputV2Clear(allowClear, value, disabled),
            [allowClear, value, disabled]
        )

        const handleClear = useMemo(
            () =>
                createSearchInputV2ClearHandler({
                    disabled,
                    onClear,
                    onChange,
                }),
            [disabled, onClear, onChange]
        )

        const effectiveRightSlot = useMemo(
            () =>
                rightSlot
                    ? rightSlot
                    : showClearButton
                      ? clearIcon || (
                            <XIcon size={16} style={{ cursor: 'pointer' }} />
                        )
                      : undefined,
            [rightSlot, showClearButton, clearIcon]
        )

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
        }, [leftSlot, effectiveRightSlot])

        const paddingX = toPixels(
            searchInputTokens.inputContainer.paddingLeft.sm
        )
        const paddingY = toPixels(
            searchInputTokens.inputContainer.paddingTop.sm
        )
        const GAP = toPixels(searchInputTokens.gap)

        const { paddingInlineStart, paddingInlineEnd } = useMemo(
            () =>
                getSearchInputV2PaddingInline({
                    paddingX,
                    gap: GAP,
                    hasLeftSlot: Boolean(leftSlot),
                    leftSlotWidth,
                    hasRightSlot: Boolean(effectiveRightSlot),
                    rightSlotWidth,
                }),
            [
                paddingX,
                GAP,
                leftSlot,
                leftSlotWidth,
                effectiveRightSlot,
                rightSlotWidth,
            ]
        )

        const slotWrapperStyle = useMemo(
            () =>
                getSearchInputV2SlotWrapperStyle(
                    searchInputTokens.inputContainer.slot,
                    inputState
                ),
            [searchInputTokens.inputContainer.slot, inputState]
        )

        const primitiveChrome = useMemo(
            () =>
                getSearchInputV2PrimitiveInputChrome(
                    searchInputTokens.inputContainer,
                    disabled,
                    error
                ),
            [searchInputTokens.inputContainer, disabled, error]
        )

        const styledLeftSlot = leftSlot
            ? applyIconStyles(leftSlot, searchInputTokens, inputState)
            : null

        const styledRightSlot = effectiveRightSlot
            ? applyIconStyles(effectiveRightSlot, searchInputTokens, inputState)
            : null

        return (
            <Block
                data-searchinput={placeholder ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
                position="relative"
                width={'100%'}
            >
                {styledLeftSlot && (
                    <Block
                        data-element="left-slot"
                        ref={leftSlotRef}
                        position="absolute"
                        top={searchInputTokens.inputContainer.slot.left.top}
                        left={searchInputTokens.inputContainer.slot.left.left}
                        bottom={
                            searchInputTokens.inputContainer.slot.left.bottom
                        }
                        contentCentered
                        style={slotWrapperStyle}
                    >
                        {styledLeftSlot}
                    </Block>
                )}

                {styledRightSlot && (
                    <Block
                        data-element="right-slot"
                        ref={rightSlotRef}
                        position="absolute"
                        role={
                            showClearButton && !rightSlot ? 'button' : undefined
                        }
                        aria-label={
                            showClearButton && !rightSlot
                                ? 'Clear search'
                                : undefined
                        }
                        top={searchInputTokens.inputContainer.slot.right.top}
                        right={
                            searchInputTokens.inputContainer.slot.right.right
                        }
                        bottom={
                            searchInputTokens.inputContainer.slot.right.bottom
                        }
                        contentCentered
                        onClick={
                            showClearButton && !rightSlot
                                ? handleClear
                                : undefined
                        }
                        style={{
                            ...slotWrapperStyle,
                            cursor:
                                showClearButton && !rightSlot
                                    ? 'pointer'
                                    : undefined,
                        }}
                    >
                        {styledRightSlot}
                    </Block>
                )}

                <PrimitiveInput
                    type={'text'}
                    role="searchbox"
                    placeholderColor={
                        searchInputTokens.inputContainer.placeholderColor[
                            inputState
                        ]
                    }
                    ref={ref}
                    name={name}
                    aria-invalid={error ? 'true' : 'false'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    width="100%"
                    paddingInlineStart={paddingInlineStart}
                    paddingInlineEnd={paddingInlineEnd}
                    paddingY={paddingY}
                    outline={searchInputTokens.inputContainer.outline}
                    borderRadius={searchInputTokens.inputContainer.borderRadius}
                    borderBottom={primitiveChrome.borderBottom}
                    color={primitiveChrome.color}
                    fontSize={searchInputTokens.inputContainer.fontSize}
                    fontWeight={searchInputTokens.inputContainer.fontWeight}
                    transition="border-bottom 200ms ease-in-out, color 200ms ease-in-out"
                    _hover={{
                        borderBottom: primitiveChrome.hover.borderBottom,
                        color: primitiveChrome.hover.color,
                    }}
                    _focus={{
                        borderBottom: primitiveChrome.focus.borderBottom,
                        color: primitiveChrome.focus.color,
                    }}
                    disabled={disabled}
                    _disabled={{
                        borderBottom:
                            searchInputTokens.inputContainer.borderBottom
                                .disabled,
                        color: searchInputTokens.inputContainer.color.disabled,
                        cursor: 'not-allowed',
                    }}
                    onFocus={(e) => {
                        setIsFocused(true)
                        onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        onBlur?.(e)
                    }}
                    {...filteredRest}
                />
            </Block>
        )
    }
)

SearchInputV2.displayName = 'SearchInputV2'
export default SearchInputV2
