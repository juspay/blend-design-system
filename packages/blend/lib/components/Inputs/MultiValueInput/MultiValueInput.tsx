import { type KeyboardEvent, useRef, useState, useEffect } from 'react'
import Block from '../../Primitives/Block/Block'
import { Tag, TagShape, TagSize } from '../../Tags'
import InputFooter from '../utils/InputFooter/InputFooter'
import InputLabels from '../utils/InputLabels/InputLabels'
import { TextInputSize } from '../TextInput/types'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import type { MultiValueInputProps } from './types'
import type { MultiValueInputTokensType } from './multiValueInput.tokens'
import { X } from 'lucide-react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'

const MultiValueInput = ({
    value = '',
    label,
    sublabel,
    disabled,
    required,
    error,
    errorMessage,
    hintText,
    tags = [],
    onTagAdd,
    onTagRemove,
    onChange,
    size = TextInputSize.MEDIUM,
    ...rest
}: MultiValueInputProps) => {
    const multiValueInputTokens =
        useResponsiveTokens<MultiValueInputTokensType>('MULTI_VALUE_INPUT')
    const [isFocused, setIsFocused] = useState(false)
    const [shouldShake, setShouldShake] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Trigger shake animation when error changes to true
    useEffect(() => {
        if (error) {
            setShouldShake(true)
            const timer = setTimeout(() => setShouldShake(false), 500)
            return () => clearTimeout(timer)
        }
    }, [error])

    const addTag = (value: string) => {
        const trimmedValue = value.trim()
        if (trimmedValue && !tags.includes(trimmedValue)) {
            onTagAdd?.(trimmedValue)
        }
    }

    const removeTag = (tagToRemove: string) => {
        onTagRemove?.(tagToRemove)
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag(value)
        } else if (e.key === 'Backspace' && value === '' && tags.length > 0) {
            const lastTag = tags[tags.length - 1]
            if (lastTag) {
                removeTag(lastTag)
            }
        }
    }

    const handleContainerClick = () => {
        inputRef.current?.focus()
    }

    const paddingX = multiValueInputTokens.inputContainer.padding.x[size]
    const paddingY = multiValueInputTokens.inputContainer.padding.y[size]
    return (
        <Block
            data-component-field-wrapper={`field-multi-value-input`}
            display="flex"
            flexDirection="column"
            gap={8}
        >
            <InputLabels
                label={label}
                sublabel={sublabel}
                disabled={disabled}
                required={required}
                tokens={multiValueInputTokens}
            />
            <Block
                style={{
                    animation: shouldShake
                        ? 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
                        : undefined,
                }}
            >
                <style>
                    {`
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                            20%, 40%, 60%, 80% { transform: translateX(4px); }
                        }
                    `}
                </style>
                <Block
                    display="flex"
                    flexWrap="wrap"
                    flexDirection="row"
                    gap={8}
                    borderRadius={8}
                    paddingX={paddingX}
                    paddingY={paddingY}
                    onClick={handleContainerClick}
                    border={
                        error
                            ? multiValueInputTokens.inputContainer.border.error
                            : isFocused
                              ? multiValueInputTokens.inputContainer.border
                                    .focus
                              : multiValueInputTokens.inputContainer.border
                                    .default
                    }
                    style={{
                        transition:
                            'border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out',
                        backgroundColor: isFocused
                            ? 'rgba(239, 246, 255, 0.15)'
                            : 'transparent',
                        boxShadow: isFocused
                            ? '0 0 0 3px #EFF6FF'
                            : '0 0 0 0 transparent',
                    }}
                    _focus={{
                        border: multiValueInputTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                    }}
                    _hover={{
                        border: multiValueInputTokens.inputContainer.border[
                            error ? 'error' : isFocused ? 'focus' : 'hover'
                        ],
                    }}
                >
                    {tags?.map((tag) => (
                        <Tag
                            key={tag}
                            text={tag}
                            size={TagSize.XS}
                            shape={TagShape.ROUNDED}
                            rightSlot={
                                <X
                                    size={12}
                                    onClick={() => removeTag(tag)}
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                        />
                    ))}
                    <PrimitiveInput
                        placeholderColor={FOUNDATION_THEME.colors.gray[400]}
                        fontSize={
                            multiValueInputTokens.inputContainer.fontSize[size]
                        }
                        fontWeight={
                            multiValueInputTokens.inputContainer.fontWeight[
                                size
                            ]
                        }
                        ref={inputRef}
                        paddingInlineStart={2}
                        paddingInlineEnd={paddingX}
                        borderRadius={
                            multiValueInputTokens.inputContainer.borderRadius
                        }
                        outline="none"
                        border="none"
                        value={value}
                        placeholderStyles={{
                            transition: 'opacity 150ms ease-out',
                            opacity: isFocused ? 0 : 1,
                        }}
                        onChange={(e) => {
                            const newValue = e.target.value

                            onChange?.(newValue)
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...rest}
                    />
                </Block>
            </Block>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                disabled={disabled}
                tokens={multiValueInputTokens}
            />
        </Block>
    )
}

export default MultiValueInput
