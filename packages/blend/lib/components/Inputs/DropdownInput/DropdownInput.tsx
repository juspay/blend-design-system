import { useEffect, useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { TextInputSize } from '../TextInput/types'

import { SelectMenuAlignment } from '../../Select/types'
import { DropdownPosition, type DropdownInputProps } from './types'
import type { DropdownInputTokensType } from './dropdownInput.tokens'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import {
    SelectMenuSize,
    SelectMenuVariant,
    SingleSelect,
} from '../../SingleSelect'

const DropdownInput = ({
    label,
    sublabel,
    disabled,
    helpIconHintText,
    name,
    required,
    error,
    errorMessage,
    hintText,
    value,
    onChange,
    slot,
    size = TextInputSize.MEDIUM,
    dropdownPosition = DropdownPosition.RIGHT,
    placeholder,
    dropDownValue,
    onDropDownChange,
    dropDownItems,
    dropdownName,
    onDropdownOpen,
    onDropdownClose,
    onBlur,
    onFocus,
    maxMenuHeight,
    minMenuWidth,
    maxMenuWidth,
    ...rest
}: DropdownInputProps) => {
    const dropdownInputTokens =
        useResponsiveTokens<DropdownInputTokensType>('DROPDOWN_INPUT')

    const [isFocused, setIsFocused] = useState(false)
    const [slotWidth, setSlotWidth] = useState<number>(0)
    const [dropdownWidth, setDropdownWidth] = useState<number>(0)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue =
        isFocused || (value !== undefined && value.length > 0)

    const isSmallScreenWithLargeSize =
        isSmallScreen && size === TextInputSize.LARGE

    const slotRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const paddingX = toPixels(
        dropdownInputTokens.inputContainer.padding.x[size]
    )
    const paddingY =
        toPixels(dropdownInputTokens.inputContainer.padding.y[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 0)
    const GAP = toPixels(dropdownInputTokens.inputContainer.gap)

    const paddingInlineStart =
        dropdownPosition === DropdownPosition.LEFT
            ? paddingX + (slotWidth ? slotWidth : 0) + dropdownWidth + GAP
            : paddingX + (slotWidth ? slotWidth + GAP : 0)
    const paddingInlineEnd =
        dropdownPosition === DropdownPosition.RIGHT
            ? paddingX + (dropdownWidth ? dropdownWidth + 2 * GAP : 0)
            : paddingX

    useEffect(() => {
        if (slotRef.current) {
            setSlotWidth(slotRef.current.offsetWidth)
        } else {
            setSlotWidth(0)
        }

        if (dropdownRef.current) {
            setDropdownWidth(dropdownRef.current.offsetWidth)
        } else {
            setDropdownWidth(0)
        }
    }, [slot, dropDownValue])

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={dropdownInputTokens.gap}
            width={'100%'}
        >
            {(!isSmallScreen || size !== TextInputSize.LARGE) && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    name={name}
                    required={required}
                    tokens={dropdownInputTokens}
                />
            )}
            <Block position="relative" width={'100%'}>
                {slot && (
                    <Block
                        ref={slotRef}
                        position="absolute"
                        top={paddingY}
                        left={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {slot}
                    </Block>
                )}

                {label && isSmallScreenWithLargeSize && (
                    <Block
                        position="absolute"
                        top={inputFocusedOrWithValue ? paddingY : '50%'}
                        left={paddingInlineStart}
                        height={'max-content'}
                        style={{
                            transition: 'all 0.2s ease-in-out',
                            transform: 'translateY(-50%)',
                            transformOrigin: 'left center',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    >
                        <FloatingLabels
                            label={label}
                            required={required || false}
                            name={name || ''}
                            isFocused={inputFocusedOrWithValue}
                        />
                    </Block>
                )}

                {!slot && dropdownPosition === DropdownPosition.LEFT && (
                    <Block
                        ref={dropdownRef}
                        position="absolute"
                        left={14}
                        top={paddingX}
                        bottom={paddingX}
                        width={'fit-content'}
                        contentCentered
                    >
                        <SingleSelect
                            inline={true}
                            disabled={disabled}
                            variant={SelectMenuVariant.NO_CONTAINER}
                            size={SelectMenuSize.SMALL}
                            placeholder={placeholder || ''}
                            maxMenuHeight={maxMenuHeight}
                            minMenuWidth={minMenuWidth}
                            maxMenuWidth={maxMenuWidth}
                            items={dropDownItems}
                            enableSearch={false}
                            alignment={SelectMenuAlignment.END}
                            alignOffset={-(paddingX + 2)}
                            sideOffset={paddingX}
                            selected={dropDownValue || ''}
                            onSelect={(value) => {
                                const selectedValue = Array.isArray(value)
                                    ? value[0]
                                    : value
                                if (selectedValue !== undefined) {
                                    onDropDownChange?.(selectedValue)
                                }
                            }}
                            name={dropdownName}
                            onBlur={() => {
                                onDropdownClose?.()
                            }}
                            onFocus={() => {
                                onDropdownOpen?.()
                            }}
                        />
                    </Block>
                )}

                <PrimitiveInput
                    required={required}
                    value={value}
                    type="text"
                    name={name}
                    onChange={onChange}
                    paddingInlineStart={paddingInlineStart}
                    paddingInlineEnd={paddingInlineEnd}
                    paddingTop={
                        isSmallScreenWithLargeSize && inputFocusedOrWithValue
                            ? paddingY * 1.5
                            : paddingY
                    }
                    paddingBottom={
                        isSmallScreenWithLargeSize && inputFocusedOrWithValue
                            ? paddingY / 2
                            : paddingY
                    }
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    borderRadius={
                        dropdownInputTokens.inputContainer.borderRadius?.[size]
                    }
                    boxShadow={dropdownInputTokens.inputContainer.boxShadow}
                    border={
                        error
                            ? dropdownInputTokens.inputContainer.border.error
                            : dropdownInputTokens.inputContainer.border.default
                    }
                    fontSize={dropdownInputTokens.inputContainer.fontSize[size]}
                    fontWeight={
                        dropdownInputTokens.inputContainer.fontWeight[size]
                    }
                    outline="none"
                    width={'100%'}
                    _hover={{
                        border: dropdownInputTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        disabled
                            ? dropdownInputTokens.inputContainer.color.disabled
                            : dropdownInputTokens.inputContainer.color.default
                    }
                    _focus={{
                        border: dropdownInputTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow: dropdownInputTokens.inputContainer.boxShadow,
                        outline: 'none !important',
                    }}
                    disabled={disabled}
                    _disabled={{
                        backgroundColor:
                            dropdownInputTokens.inputContainer.backgroundColor
                                .disabled,
                        border: dropdownInputTokens.inputContainer.border
                            .disabled,
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
                    {...rest}
                />

                {dropdownPosition === DropdownPosition.RIGHT && (
                    <Block
                        ref={dropdownRef}
                        position="absolute"
                        right={14}
                        top={paddingX}
                        bottom={paddingX}
                        width={'fit-content'}
                        contentCentered
                    >
                        <SingleSelect
                            inline={true}
                            disabled={disabled}
                            variant={SelectMenuVariant.NO_CONTAINER}
                            size={SelectMenuSize.SMALL}
                            placeholder={placeholder || ''}
                            maxMenuHeight={maxMenuHeight}
                            minMenuWidth={minMenuWidth}
                            maxMenuWidth={maxMenuWidth}
                            items={dropDownItems}
                            enableSearch={false}
                            alignment={SelectMenuAlignment.END}
                            alignOffset={-(paddingX + 2)}
                            sideOffset={paddingX}
                            selected={dropDownValue || ''}
                            onSelect={(value) => {
                                const selectedValue = Array.isArray(value)
                                    ? value[0]
                                    : value
                                if (selectedValue !== undefined) {
                                    onDropDownChange?.(selectedValue)
                                }
                            }}
                            name={dropdownName}
                            onBlur={() => {
                                onDropdownClose?.()
                            }}
                            onFocus={() => {
                                onDropdownOpen?.()
                            }}
                        />
                    </Block>
                )}
            </Block>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                disabled={disabled}
                tokens={dropdownInputTokens}
            />
        </Block>
    )
}

export default DropdownInput
