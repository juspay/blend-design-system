import { useEffect, forwardRef, useMemo } from 'react'
import { useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { XIcon } from '@phosphor-icons/react'
import type { SearchInputV2Props } from './SearchInputV2.types'
import type { SearchInputV2TokensType } from './SearchInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import { applyIconStyles, toPixels } from './utils'
import { getInteractionState } from '../TextInputV2/utils'
import { InputStateV2 } from '../inputV2.types'

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
            () =>
                getInteractionState(
                    error
                        ? InputStateV2.ERROR
                        : isFocused
                          ? InputStateV2.FOCUS
                          : InputStateV2.DEFAULT
                ),
            [error, isFocused]
        )
        const showClearButton = allowClear && value && value.length > 0

        const handleClear = () => {
            if (onClear) {
                onClear()
            } else if (onChange) {
                const syntheticEvent = {
                    target: { value: '' },
                    currentTarget: { value: '' },
                    preventDefault: () => {},
                    stopPropagation: () => {},
                } as React.ChangeEvent<HTMLInputElement>
                onChange(syntheticEvent)
            }
        }

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
            searchInputTokens.inputContainer.paddingTop.sm
        )
        const paddingY = toPixels(
            searchInputTokens.inputContainer.paddingTop.sm
        )
        const GAP = toPixels(searchInputTokens.gap)

        const paddingInlineStart = leftSlot
            ? paddingX + leftSlotWidth + GAP
            : paddingX
        const paddingInlineEnd = effectiveRightSlot
            ? paddingX + rightSlotWidth + GAP
            : paddingX

        const styledLeftSlot = leftSlot
            ? applyIconStyles(
                  leftSlot,
                  searchInputTokens,
                  disabled || false,
                  error
              )
            : null

        const styledRightSlot = effectiveRightSlot
            ? applyIconStyles(
                  effectiveRightSlot,
                  searchInputTokens,
                  disabled || false,
                  error
              )
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
                        style={{
                            transition:
                                searchInputTokens.inputContainer.slot
                                    .transition,
                            transform:
                                searchInputTokens.inputContainer.slot.transform,
                            color: searchInputTokens.inputContainer.slot.color[
                                inputState
                            ],
                        }}
                    >
                        {styledLeftSlot}
                    </Block>
                )}

                {styledRightSlot && (
                    <Block
                        data-element="right-slot"
                        ref={rightSlotRef}
                        position="absolute"
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
                            transition:
                                searchInputTokens.inputContainer.slot
                                    .transition,
                            transform:
                                searchInputTokens.inputContainer.slot.transform,
                            color: searchInputTokens.inputContainer.slot.color[
                                inputState
                            ],
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
                    borderBottom={
                        disabled
                            ? searchInputTokens.inputContainer.borderBottom
                                  .disabled
                            : error
                              ? searchInputTokens.inputContainer.borderBottom
                                    .error
                              : searchInputTokens.inputContainer.borderBottom
                                    .default
                    }
                    color={
                        disabled
                            ? searchInputTokens.inputContainer.color.disabled
                            : error
                              ? searchInputTokens.inputContainer.color.error
                              : searchInputTokens.inputContainer.color.default
                    }
                    fontSize={searchInputTokens.inputContainer.fontSize}
                    fontWeight={searchInputTokens.inputContainer.fontWeight}
                    transition="border-bottom 200ms ease-in-out, color 200ms ease-in-out"
                    _hover={{
                        borderBottom: disabled
                            ? searchInputTokens.inputContainer.borderBottom
                                  .disabled
                            : searchInputTokens.inputContainer.borderBottom
                                  .hover,
                        color: disabled
                            ? searchInputTokens.inputContainer.color.disabled
                            : searchInputTokens.inputContainer.color.hover,
                    }}
                    _focus={{
                        borderBottom: disabled
                            ? searchInputTokens.inputContainer.borderBottom
                                  .disabled
                            : error
                              ? searchInputTokens.inputContainer.borderBottom
                                    .error
                              : searchInputTokens.inputContainer.borderBottom
                                    .focus,
                        color: disabled
                            ? searchInputTokens.inputContainer.color.disabled
                            : error
                              ? searchInputTokens.inputContainer.color.error
                              : searchInputTokens.inputContainer.color.focus,
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
