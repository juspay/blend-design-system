import { type KeyboardEvent, useRef, useState, useId } from 'react'
import Block from '../../Primitives/Block/Block'
import { Tag, TagShape, TagSize } from '../../Tags'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { InputSizeV2 } from '../inputV2.types'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import type { MultiValueInputV2Props } from './MultiValueV2.types'
import type { MultiValueInputV2TokensType } from './MultiValueInputV2.tokens'
import { X } from 'lucide-react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'
import styled, { CSSObject } from 'styled-components'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'

const ContentContainer = styled(Block)<{
    hasLeftSlot: boolean
    hasRightSlot: boolean
    slotOffset: number
    gap: CSSObject['gap']
}>`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ gap }) => gap};
    width: 100%;

    ${({ hasLeftSlot, slotOffset }) =>
        hasLeftSlot && `padding-left: ${slotOffset}px;`}

    ${({ hasRightSlot, slotOffset }) =>
        hasRightSlot && `padding-right: ${slotOffset}px;`}
`

const MultiValueInputV2 = ({
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
    size = InputSizeV2.MD,
    onFocus,
    onBlur,
    name,
    id: providedId,
    leftSlot,
    rightSlot,
    ...rest
}: MultiValueInputV2Props) => {
    const multiValueInputTokens =
        useResponsiveTokens<MultiValueInputV2TokensType>('MULTI_VALUE_INPUT_V2')
    const [isFocused, setIsFocused] = useState(false)
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

    const slotTop =
        tags.length > 0 ? FOUNDATION_THEME.unit[7] : FOUNDATION_THEME.unit[3]
    return (
        <Block
            data-multi-value-input={label || 'multi-value-input'}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={multiValueInputTokens.inputContainer.gap}
        >
            <InputLabelsV2
                label={label}
                sublabel={sublabel}
                helpIconText={helpIconHintText}
                required={required}
                inputId={inputId}
                name={name}
                tokens={multiValueInputTokens.topContainer}
            />
            <Block
                display="flex"
                borderRadius={multiValueInputTokens.borderRadius}
                paddingX={paddingX}
                paddingY={paddingY}
                onClick={handleContainerClick}
                backgroundColor={
                    multiValueInputTokens.inputContainer.backgroundColor.default
                }
                border={
                    error
                        ? multiValueInputTokens.inputContainer.border.error
                        : isFocused
                          ? multiValueInputTokens.inputContainer.border.focus
                          : multiValueInputTokens.inputContainer.border.default
                }
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                    transition:
                        'border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out',
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
                {leftSlot && (
                    <Block
                        data-element="left-slot"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={
                            multiValueInputTokens.inputContainer.leftSlot.width
                        }
                        height={
                            multiValueInputTokens.inputContainer.leftSlot.height
                        }
                        flexShrink={0}
                        marginTop={slotTop}
                    >
                        {leftSlot}
                    </Block>
                )}
                <ContentContainer
                    hasLeftSlot={!!leftSlot}
                    hasRightSlot={!!rightSlot}
                    slotOffset={multiValueInputTokens.inputContainer.offSet}
                    gap={multiValueInputTokens.inputContainer.gap}
                >
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
                                        size={
                                            multiValueInputTokens.inputContainer
                                                .closeButton.size
                                        }
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
                        placeholderColor={
                            multiValueInputTokens.inputContainer
                                .placeholderColor
                        }
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
                        paddingInlineEnd={2}
                        borderRadius={
                            multiValueInputTokens.inputContainer.borderRadius
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
                </ContentContainer>
                {rightSlot && (
                    <Block
                        data-element="right-slot"
                        top={slotTop}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={
                            multiValueInputTokens.inputContainer.rightSlot.width
                        }
                        height={
                            multiValueInputTokens.inputContainer.rightSlot
                                .height
                        }
                        pointerEvents="auto"
                        marginTop={slotTop}
                    >
                        {rightSlot}
                    </Block>
                )}
            </Block>

            <InputFooterV2
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                errorId={errorId}
                hintId={hintId}
                tokens={multiValueInputTokens.bottomContainer}
            />
        </Block>
    )
}

export default MultiValueInputV2
