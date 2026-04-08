import Block from '../../Primitives/Block/Block'
import PrimitiveTextarea from '../../Primitives/PrimitiveTextArea'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import type { TextAreaV2Props } from './TextAreaV2.types'
import type { TextAreaTokensType } from './TextAreaV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useState, useId, forwardRef, useMemo } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import { InputSizeV2, InputStateV2, type AnyRef } from '../inputV2.types'
import {
    FOCUS_RING_STYLES,
    setExternalRef,
    TRANSITION,
} from '../TextInputV2/utils'

const TextAreaV2 = forwardRef<HTMLTextAreaElement, TextAreaV2Props>(
    (props, ref) => {
        const {
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
        } = props

        const { onKeyDown: restOnKeyDown, ...restWithoutKeyDown } = rest
        const filteredRest = filterBlockedProps(restWithoutKeyDown)

        const textAreaTokens =
            useResponsiveTokens<TextAreaTokensType>('TEXT_AREA_V2')
        const ic = textAreaTokens.inputContainer

        const [isFocused, setIsFocused] = useState(false)
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const generatedId = useId()
        const textareaId = providedId || generatedId
        const errorId = `${textareaId}-error`
        const hintId = `${textareaId}-hint`

        const ariaDescribedBy = useMemo(
            () =>
                [
                    hintText && !error ? hintId : null,
                    error && errorMessage ? errorId : null,
                ]
                    .filter(Boolean)
                    .join(' ') || undefined,
            [hintText, error, errorMessage, hintId, errorId]
        )

        const labelState = useMemo((): InputStateV2 => {
            if (disabled) return InputStateV2.DISABLED
            if (error) return InputStateV2.ERROR
            if (isFocused) return InputStateV2.FOCUS
            return InputStateV2.DEFAULT
        }, [disabled, error, isFocused])

        const inputFocusedOrWithValue = isFocused || value.length > 0

        const paddingX = toPixels(ic.padding.x)
        const paddingY = toPixels(ic.padding.y)

        const setTextAreaRef = (node: HTMLTextAreaElement | null) => {
            setExternalRef(ref as AnyRef<HTMLTextAreaElement>, node)
        }

        const borderDefault = error ? 'error' : 'default'
        const borderHover = error ? 'error' : 'hover'
        const borderFocus = error ? 'error' : 'focus'
        const bgDefault = error ? 'error' : 'default'
        const bgHover = error ? 'error' : 'hover'
        const textColorKey = disabled ? 'disabled' : 'default'

        return (
            <Block
                data-textarea={label || 'textarea'}
                data-status={disabled ? 'disabled' : 'enabled'}
                display="flex"
                flexDirection="column"
                gap={textAreaTokens.gap}
                width="100%"
                position="relative"
            >
                {!isSmallScreen && (
                    <InputLabelsV2
                        tokens={textAreaTokens.topContainer}
                        label={label}
                        sublabel={sublabel}
                        helpIconText={helpIconHintText}
                        inputId={textareaId}
                        name={name}
                        required={required || false}
                        size={InputSizeV2.SM}
                        state={labelState}
                    />
                )}
                <PrimitiveTextarea
                    {...filteredRest}
                    ref={setTextAreaRef}
                    id={textareaId}
                    name={name}
                    width="100%"
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
                    onKeyDown={(e) => {
                        restOnKeyDown?.(e)
                    }}
                    rows={rows}
                    required={required}
                    cols={cols}
                    wrap={wrap}
                    borderRadius={ic.borderRadius}
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
                    border={ic.border[borderDefault]}
                    fontSize={ic.fontSize}
                    fontWeight={ic.fontWeight}
                    backgroundColor={ic.backgroundColor[bgDefault]}
                    transition={TRANSITION}
                    placeholderStyles={{
                        transition: ic.placeholder.transition,
                        color: ic.placeholder.color,
                        fontWeight: ic.placeholder.fontWeight,
                    }}
                    _hover={{
                        border: ic.border[borderHover],
                        backgroundColor: ic.backgroundColor[bgHover],
                    }}
                    color={ic.color[textColorKey]}
                    _focus={{
                        border: ic.border[borderFocus],
                        boxShadow: FOCUS_RING_STYLES.boxShadow,
                        backgroundColor: FOCUS_RING_STYLES.backgroundColor,
                    }}
                    disabled={disabled}
                    _disabled={{
                        backgroundColor: ic.backgroundColor.disabled,
                        border: ic.border.disabled,
                        cursor: 'not-allowed',
                    }}
                    aria-required={required ? 'true' : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={ariaDescribedBy}
                />
                <InputFooterV2
                    tokens={textAreaTokens.bottomContainer}
                    error={error}
                    errorMessage={errorMessage}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    size={InputSizeV2.SM}
                />
            </Block>
        )
    }
)

TextAreaV2.displayName = 'TextAreaV2'
export default TextAreaV2
