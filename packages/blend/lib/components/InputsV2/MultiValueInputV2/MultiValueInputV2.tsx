import {
    forwardRef,
    type KeyboardEvent,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import Block from '../../Primitives/Block/Block'
import { Tag, TagShape, TagSize, TagVariant } from '../../Tags'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import type { MultiValueInputV2Props } from './MultiValueV2.types'
import type { MultiValueInputV2TokensType } from './MultiValueInputV2.tokens'
import { X } from 'lucide-react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import styled, { type CSSObject } from 'styled-components'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { filterBlockedProps } from '../../../utils/prop-helpers'

const ContentContainer = styled(Block)<{
    $hasLeftSlot: boolean
    $hasRightSlot: boolean
    $slotOffset: number
    gap: CSSObject['gap']
}>`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ gap }) => gap};
    width: 100%;

    ${({ $hasLeftSlot, $slotOffset }) =>
        $hasLeftSlot && `padding-left: ${$slotOffset}px;`}

    ${({ $hasRightSlot, $slotOffset }) =>
        $hasRightSlot && `padding-right: ${$slotOffset}px;`}
`

const MultiValueInputV2 = forwardRef<HTMLInputElement, MultiValueInputV2Props>(
    ({
        value = '',
        label,
        sublabel,
        helpIconHintText,
        disabled,
        required,
        error,
        errorMessage,
        hintText,
        tags = {
            value: [],
            size: TagSize.XS,
            shape: TagShape.ROUNDED,
            variant: TagVariant.SUBTLE,
        },
        onChange,
        onTagAdd,
        onTagRemove,
        size = InputSizeV2.MD,
        onFocus,
        onBlur,
        name,
        id: providedId,
        leftSlot,
        rightSlot,
        ...rest
    }) => {
        const { onKeyDown: restOnKeyDown, ...restWithoutKeyDown } = rest
        const filteredRest = filterBlockedProps(restWithoutKeyDown)
        const multiValueInputTokens =
            useResponsiveTokens<MultiValueInputV2TokensType>(
                'MULTI_VALUE_INPUT_V2'
            )
        const [isFocused, setIsFocused] = useState(false)
        const [isHovered, setIsHovered] = useState(false)
        const inputRef = useRef<HTMLInputElement>(null)

        const labelState = useMemo((): InputStateV2 => {
            if (disabled) return InputStateV2.DISABLED
            if (error) return InputStateV2.ERROR
            if (isFocused) return InputStateV2.FOCUS
            if (isHovered) return InputStateV2.HOVER
            return InputStateV2.DEFAULT
        }, [disabled, error, isFocused, isHovered])

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
            if (disabled) return
            const trimmedValue = value.trim()
            if (trimmedValue && !tags.value.includes(trimmedValue)) {
                onTagAdd?.(trimmedValue)
            }
        }

        const removeTag = (tagToRemove: string) => {
            if (disabled) return
            onTagRemove?.(tagToRemove)
            inputRef.current?.focus()
        }

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (disabled) return
            if (e.key === 'Enter') {
                const trimmedValue = value.trim()
                const isAddable =
                    !!onTagAdd &&
                    !!trimmedValue &&
                    !tags.value.includes(trimmedValue)
                if (isAddable) {
                    e.preventDefault()
                    addTag(value)
                }
            } else if (
                e.key === 'Backspace' &&
                value === '' &&
                tags.value.length > 0
            ) {
                removeTag(tags.value[tags.value.length - 1]!)
            }
        }

        const handleContainerClick = () => {
            if (disabled) return
            inputRef.current?.focus()
        }

        const paddingX = multiValueInputTokens.inputContainer.paddingLeft[size]
        const paddingY = multiValueInputTokens.inputContainer.paddingTop[size]
        const ic = multiValueInputTokens.inputContainer

        const borderToken = disabled
            ? ic.border[InputStateV2.DISABLED]
            : error
              ? ic.border[InputStateV2.ERROR]
              : isFocused
                ? ic.border[InputStateV2.FOCUS]
                : ic.border[InputStateV2.DEFAULT]

        const boxShadowToken = disabled
            ? 'none'
            : error && isFocused
              ? ic.boxShadow[InputStateV2.ERROR]
              : !error && isFocused
                ? ic.boxShadow[InputStateV2.FOCUS]
                : 'none'

        const backgroundToken = disabled
            ? ic.backgroundColor[InputStateV2.DISABLED]
            : ic.backgroundColor[InputStateV2.DEFAULT]

        const slotTop =
            tags.value.length > 0
                ? ic.slotAlignTop.withTags
                : ic.slotAlignTop.withoutTags
        return (
            <Block
                data-multi-value-input={label || 'multi-value-input'}
                data-status={disabled ? 'disabled' : 'enabled'}
                display="flex"
                flexDirection="column"
                gap={multiValueInputTokens.gap}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <InputLabelsV2
                    label={label}
                    sublabel={sublabel}
                    helpIconText={helpIconHintText}
                    required={required}
                    inputId={inputId}
                    name={name}
                    size={size}
                    state={labelState}
                    tokens={multiValueInputTokens.topContainer}
                />
                <Block
                    display="flex"
                    borderRadius={multiValueInputTokens.borderRadius}
                    paddingX={paddingX}
                    paddingY={paddingY}
                    onClick={handleContainerClick}
                    backgroundColor={backgroundToken}
                    border={borderToken}
                    style={{
                        transition:
                            'border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out',
                        boxShadow: boxShadowToken,
                    }}
                    _focus={{
                        border: disabled
                            ? ic.border[InputStateV2.DISABLED]
                            : error
                              ? ic.border[InputStateV2.ERROR]
                              : ic.border[InputStateV2.FOCUS],
                    }}
                    _hover={{
                        border: disabled
                            ? ic.border[InputStateV2.DISABLED]
                            : error
                              ? ic.border[InputStateV2.ERROR]
                              : isFocused
                                ? ic.border[InputStateV2.FOCUS]
                                : ic.border[InputStateV2.HOVER],
                    }}
                >
                    <ContentContainer
                        $hasLeftSlot={!!leftSlot}
                        $hasRightSlot={!!rightSlot}
                        $slotOffset={ic.offSet}
                        gap={ic.gap}
                    >
                        {leftSlot && (
                            <Block
                                data-element="left-slot"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={ic.leftSlot.width}
                                height={ic.leftSlot.height}
                                flexShrink={0}
                                style={{
                                    marginLeft: -ic.offSet,
                                }}
                            >
                                {leftSlot}
                            </Block>
                        )}
                        {tags.value.map((tag) => (
                            <Tag
                                key={tag}
                                text={tag}
                                size={tags.size}
                                shape={tags.shape}
                                variant={tags.variant}
                                rightSlot={
                                    <PrimitiveButton
                                        type="button"
                                        disabled={disabled}
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
                                            cursor: disabled
                                                ? 'not-allowed'
                                                : 'pointer',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '24px',
                                            minHeight: '24px',
                                        }}
                                    >
                                        <X
                                            size={
                                                multiValueInputTokens
                                                    .inputContainer.closeButton
                                                    .width
                                            }
                                            aria-hidden="true"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </PrimitiveButton>
                                }
                            />
                        ))}
                        <PrimitiveInput
                            {...filteredRest}
                            id={inputId}
                            name={name}
                            flexGrow={1}
                            minWidth="120px"
                            color={ic.color[labelState]}
                            placeholderColor={ic.placeholderColor[labelState]}
                            fontSize={ic.fontSize[size]}
                            fontWeight={ic.fontWeight[size]}
                            ref={inputRef}
                            paddingInlineStart={2}
                            paddingInlineEnd={2}
                            borderRadius={ic.borderRadius}
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
                                color: ic.placeholderColor[labelState],
                            }}
                            onChange={(e) => {
                                const newValue = e.target.value

                                onChange?.(newValue)
                            }}
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                                restOnKeyDown?.(e)
                            }}
                            onFocus={(e) => {
                                setIsFocused(true)
                                onFocus?.(e)
                            }}
                            onBlur={(e) => {
                                setIsFocused(false)
                                onBlur?.(e)
                            }}
                        />
                        {rightSlot && (
                            <Block
                                data-element="right-slot"
                                position="absolute"
                                top={slotTop}
                                right={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={
                                    multiValueInputTokens.inputContainer
                                        .rightSlot.width
                                }
                                height={
                                    multiValueInputTokens.inputContainer
                                        .rightSlot.height
                                }
                                pointerEvents="auto"
                            >
                                {rightSlot}
                            </Block>
                        )}
                    </ContentContainer>
                </Block>

                <InputFooterV2
                    error={error}
                    errorMessage={errorMessage}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    tokens={multiValueInputTokens.bottomContainer}
                    size={size}
                />
            </Block>
        )
    }
)

MultiValueInputV2.displayName = 'MultiValueInputV2'
export default MultiValueInputV2
