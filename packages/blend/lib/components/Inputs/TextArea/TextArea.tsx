import Block from '../../Primitives/Block/Block'
import PrimitiveTextarea from '../../Primitives/PrimitiveTextArea'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import type { TextAreaProps } from './types'
import type { TextAreaTokensType } from './textarea.token'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useState, useId } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { useErrorShake } from '../../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../../common/error.animations'
import styled from 'styled-components'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const TextArea = ({
    value,
    placeholder,
    disabled,
    autoFocus,
    onChange,
    onFocus,
    onBlur,
    rows = 3,
    cols,
    label,
    sublabel,
    hintText,
    helpIconHintText,
    required,
    error,
    errorMessage,
    wrap,
    resize = 'none',
    name,
    id: providedId,
    ...rest
}: TextAreaProps) => {
    const textAreaTokens = useResponsiveTokens<TextAreaTokensType>('TEXT_AREA')
    const [isFocused, setIsFocused] = useState(false)
    const shouldShake = useErrorShake(error || false)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    // Generate unique IDs for accessibility
    const generatedId = useId()
    const textareaId = providedId || generatedId
    const errorId = `${textareaId}-error`
    const hintId = `${textareaId}-hint`

    // Construct aria-describedby to link hint and error messages
    const ariaDescribedBy =
        [
            hintText && !error ? hintId : null,
            error && errorMessage ? errorId : null,
        ]
            .filter(Boolean)
            .join(' ') || undefined

    const inputFocusedOrWithValue = isFocused || value.length > 0

    const paddingX = toPixels(textAreaTokens.inputContainer.padding.x)
    const paddingY = toPixels(textAreaTokens.inputContainer.padding.y)

    return (
        <Block
            // data-component-field-wrapper={`field-textarea`}
            data-textarea={label || 'textarea'}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={textAreaTokens.gap}
            width="100%"
            position="relative"
        >
            {!isSmallScreen && (
                <InputLabels
                    tokens={textAreaTokens}
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    inputId={textareaId}
                    name={name}
                    required={required}
                />
            )}
            <Wrapper
                position="relative"
                width="100%"
                style={getErrorShakeStyle(shouldShake)}
            >
                {label && isSmallScreen && (
                    <Block
                        position="absolute"
                        top={5}
                        left={paddingX}
                        height={'max-content'}
                        style={{
                            transition: 'all 0.2s ease-in-out',
                            transform: inputFocusedOrWithValue
                                ? 'scale(0.95)'
                                : ' scale(1)',
                            transformOrigin: 'left center',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    >
                        <FloatingLabels
                            label={label}
                            required={required || false}
                            name={''}
                            isFocused={inputFocusedOrWithValue}
                        />
                    </Block>
                )}
                <PrimitiveTextarea
                    id={textareaId}
                    name={name}
                    width={'100%'}
                    autoFocus={autoFocus}
                    value={value}
                    placeholder={isSmallScreen ? '' : placeholder}
                    onChange={onChange}
                    onFocus={(e) => {
                        setIsFocused(true)
                        onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        onBlur?.(e)
                    }}
                    rows={rows}
                    required={required}
                    cols={cols}
                    wrap={wrap}
                    borderRadius={textAreaTokens.inputContainer.borderRadius}
                    resize={resize}
                    paddingX={paddingX}
                    paddingTop={
                        isSmallScreen && inputFocusedOrWithValue
                            ? paddingY + 14
                            : paddingY
                    }
                    paddingBottom={
                        isSmallScreen && inputFocusedOrWithValue ? 0 : paddingY
                    }
                    border={
                        textAreaTokens.inputContainer.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={textAreaTokens.inputContainer.fontSize}
                    fontWeight={textAreaTokens.inputContainer.fontWeight}
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    placeholderStyles={{
                        transition: 'opacity 150ms ease-out',
                        opacity: isFocused ? 0 : 1,
                    }}
                    _hover={{
                        border: textAreaTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        textAreaTokens.inputContainer.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    _focus={{
                        border: textAreaTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow: '0 0 0 3px #EFF6FF',
                        backgroundColor: 'rgba(239, 246, 255, 0.15)',
                    }}
                    disabled={disabled}
                    _disabled={{
                        backgroundColor:
                            textAreaTokens.inputContainer.backgroundColor
                                .disabled,
                        border: textAreaTokens.inputContainer.border.disabled,
                        cursor: 'not-allowed',
                    }}
                    aria-required={required ? 'true' : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={ariaDescribedBy}
                    {...rest}
                />
            </Wrapper>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                disabled={disabled}
                errorId={errorId}
                hintId={hintId}
            />
        </Block>
    )
}

export default TextArea
