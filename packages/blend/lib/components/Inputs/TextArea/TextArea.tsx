import Block from '../../Primitives/Block/Block'
import PrimitiveTextarea from '../../Primitives/PrimitiveTextArea'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import type { TextAreaProps } from './types'
import type { TextAreaTokensType } from './textarea.token'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useState } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../../global-utils/GlobalUtils'

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
    ...rest
}: TextAreaProps) => {
    const textAreaTokens = useResponsiveTokens<TextAreaTokensType>('TEXT_AREA')
    const [isFocused, setIsFocused] = useState(false)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value.length > 0

    const paddingX = toPixels(textAreaTokens.inputContainer.padding.x)
    const paddingY = toPixels(textAreaTokens.inputContainer.padding.y)

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={textAreaTokens.gap}
            width="100%"
            position="relative"
        >
            {!isSmallScreen && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    required={required}
                />
            )}
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
                boxShadow={textAreaTokens.inputContainer.boxShadow.default}
                border={
                    textAreaTokens.inputContainer.border[
                        error ? 'error' : 'default'
                    ]
                }
                fontSize={textAreaTokens.inputContainer.fontSize}
                fontWeight={textAreaTokens.inputContainer.fontWeight}
                outline={
                    textAreaTokens.inputContainer.outline[
                        error ? 'error' : 'default'
                    ]
                }
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
                    boxShadow:
                        textAreaTokens.inputContainer.boxShadow[
                            error ? 'error' : 'focus'
                        ],
                }}
                disabled={disabled}
                _disabled={{
                    backgroundColor:
                        textAreaTokens.inputContainer.backgroundColor.disabled,
                    border: textAreaTokens.inputContainer.border.disabled,
                    cursor: 'not-allowed',
                }}
                {...rest}
            />
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                disabled={disabled}
            />
        </Block>
    )
}

export default TextArea
