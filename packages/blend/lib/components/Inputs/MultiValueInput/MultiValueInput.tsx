import { type KeyboardEvent, useRef, useState } from 'react'
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

const MultiValueInput = ({
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
    size = TextInputSize.MEDIUM,
    ...rest
}: MultiValueInputProps) => {
    const multiValueInputTokens =
        useResponsiveTokens<MultiValueInputTokensType>('MULTI_VALUE_INPUT')
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const addTag = (value: string) => {
        const trimmedValue = value.trim()
        if (trimmedValue && !tags.includes(trimmedValue)) {
            onTagAdd?.(trimmedValue)
            setInputValue('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        onTagRemove?.(tagToRemove)
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag(inputValue)
        } else if (
            e.key === 'Backspace' &&
            inputValue === '' &&
            tags.length > 0
        ) {
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
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                gap={8}
                borderRadius={8}
                paddingX={paddingX}
                paddingY={paddingY}
                onClick={handleContainerClick}
                boxShadow={
                    multiValueInputTokens.inputContainer.boxShadow.default
                }
                border={
                    error
                        ? multiValueInputTokens.inputContainer.border.error
                        : isFocused
                          ? multiValueInputTokens.inputContainer.border.focus
                          : multiValueInputTokens.inputContainer.border.default
                }
                _hover={{
                    border: multiValueInputTokens.inputContainer.border[
                        error ? 'error' : 'hover'
                    ],
                    boxShadow:
                        multiValueInputTokens.inputContainer.boxShadow[
                            error ? 'error' : 'hover'
                        ],
                }}
                _focus={{
                    border: multiValueInputTokens.inputContainer.border[
                        error ? 'error' : 'focus'
                    ],
                    boxShadow:
                        multiValueInputTokens.inputContainer.boxShadow[
                            error ? 'error' : 'focus'
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
                    fontSize={
                        multiValueInputTokens.inputContainer.fontSize[size]
                    }
                    fontWeight={
                        multiValueInputTokens.inputContainer.fontWeight[size]
                    }
                    ref={inputRef}
                    paddingInlineStart={2}
                    paddingInlineEnd={paddingX}
                    borderRadius={
                        multiValueInputTokens.inputContainer.borderRadius
                    }
                    outline="none"
                    border="none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                />
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
