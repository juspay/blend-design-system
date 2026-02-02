import { type KeyboardEvent, useRef, useState, useId } from 'react'
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
import { useErrorShake } from '../../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../../common/error.animations'
import styled from 'styled-components'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const ContentContainer = styled(Block)<{
    hasLeftSlot: boolean
    hasRightSlot: boolean
    slotOffset: number
}>`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 100%;

    ${({ hasLeftSlot, slotOffset }) =>
        hasLeftSlot && `padding-left: ${slotOffset}px;`}

    ${({ hasRightSlot, slotOffset }) =>
        hasRightSlot && `padding-right: ${slotOffset}px;`}
`

const MultiValueInput = ({
    value = '',
    label,
    sublabel,
    helpIconHintText,
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
    onFocus,
    onBlur,
    name,
    id: providedId,
    leftSlot,
    rightSlot,
    ...rest
}: MultiValueInputProps) => {
    const multiValueInputTokens =
        useResponsiveTokens<MultiValueInputTokensType>('MULTI_VALUE_INPUT')
    const [isFocused, setIsFocused] = useState(false)
    const shouldShake = useErrorShake(error || false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Generate unique IDs for accessibility (WCAG 4.1.2, 3.3.1, 3.3.2)
    const generatedId = useId()
    const inputId = providedId || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    // Construct aria-describedby to link hint and error messages (WCAG 3.3.1, 3.3.2)
    const ariaDescribedBy =
        [
            hintText && !error ? hintId : null,
            error && errorMessage ? errorId : null,
        ]
            .filter(Boolean)
            .join(' ') || undefined

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
    const slotWidth = 16
    const slotGap = 8
    const wrappedRowPadding = slotWidth + slotGap

    const slotTop =
        tags.length > 0 ? FOUNDATION_THEME.unit[7] : FOUNDATION_THEME.unit[3]

    return (
        <Block
            data-multi-value-input={label || 'multi-value-input'}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={8}
        >
            <InputLabels
                label={label}
                sublabel={sublabel}
                helpIconHintText={helpIconHintText}
                required={required}
                inputId={inputId}
                name={name}
                tokens={multiValueInputTokens}
            />
            <Wrapper style={getErrorShakeStyle(shouldShake)}>
                <Block
                    display="flex"
                    flexDirection="column"
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
                    onFocus={onFocus}
                    onBlur={onBlur}
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
                    <ContentContainer
                        hasLeftSlot={!!leftSlot}
                        hasRightSlot={!!rightSlot}
                        slotOffset={wrappedRowPadding}
                    >
                        {leftSlot && (
                            <Block
                                data-element="left-slot"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={FOUNDATION_THEME.unit[16]}
                                height={FOUNDATION_THEME.unit[16]}
                                flexShrink={0}
                                style={{ marginLeft: -wrappedRowPadding }}
                            >
                                {leftSlot}
                            </Block>
                        )}

                        {tags?.map((tag) => (
                            <Tag
                                key={tag}
                                text={tag}
                                size={TagSize.XS}
                                shape={TagShape.ROUNDED}
                                rightSlot={
                                    <PrimitiveButton
                                        type="button"
                                        aria-label={`Remove ${tag}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeTag(tag)
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' ||
                                                e.key === ' '
                                            ) {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                removeTag(tag)
                                            }
                                        }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '24px',
                                            minHeight: '24px',
                                        }}
                                        tabIndex={0}
                                    >
                                        <X
                                            size={12}
                                            aria-hidden="true"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </PrimitiveButton>
                                }
                            />
                        ))}
                        <PrimitiveInput
                            id={inputId}
                            name={name}
                            flexGrow={1}
                            minWidth="120px"
                            placeholderColor={FOUNDATION_THEME.colors.gray[400]}
                            fontSize={
                                multiValueInputTokens.inputContainer.fontSize[
                                    size
                                ]
                            }
                            fontWeight={
                                multiValueInputTokens.inputContainer.fontWeight[
                                    size
                                ]
                            }
                            ref={inputRef}
                            paddingInlineStart={2}
                            paddingInlineEnd={2}
                            borderRadius={
                                multiValueInputTokens.inputContainer
                                    .borderRadius
                            }
                            outline="none"
                            border="none"
                            value={value}
                            required={required}
                            aria-required={required ? 'true' : undefined}
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={ariaDescribedBy}
                            disabled={disabled}
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
                        {rightSlot && (
                            <Block
                                data-element="right-slot"
                                position="absolute"
                                top={slotTop}
                                right={FOUNDATION_THEME.unit[0]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={FOUNDATION_THEME.unit[16]}
                                height={FOUNDATION_THEME.unit[16]}
                                pointerEvents="auto"
                            >
                                {rightSlot}
                            </Block>
                        )}
                    </ContentContainer>
                </Block>
            </Wrapper>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                errorId={errorId}
                hintId={hintId}
                tokens={multiValueInputTokens}
            />
        </Block>
    )
}

export default MultiValueInput
