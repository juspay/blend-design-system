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
import { filterBlockedProps } from '../../../utils/prop-helpers'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'
import { InputSizeV2, type AnyRef } from '../inputV2.types'
import { FOCUS_RING_STYLES, TRANSITION } from '../TextInputV2/utils'
import { generateAccessibilityIds, setExternalRef } from '../utils/utils'
import {
    getTextAreaAriaDescribedBy,
    getTextAreaInputPadding,
    getTextAreaInteractionKeys,
    getTextAreaLabelState,
    omitTextAreaV2PrivateProps,
} from './utils'

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
            label,
            sublabel,
            hintText,
            helpIconText,
            required = false,
            error = { show: false, message: '' },
            resize = 'none',
            name = 'text-area',
            size = InputSizeV2.MD,
            id: providedId,
            ...rest
        } = props

        const { onKeyDown: restOnKeyDown, ...restWithoutKeyDown } = rest
        const filteredRest = filterBlockedProps(
            omitTextAreaV2PrivateProps(
                restWithoutKeyDown as Record<string, unknown>
            ) as typeof restWithoutKeyDown
        )

        const textAreaTokens =
            useResponsiveTokens<TextAreaTokensType>('TEXT_AREA_V2')
        const ic = textAreaTokens.inputContainer

        const [isFocused, setIsFocused] = useState(false)
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const generatedId = useId()
        const textareaId = providedId || generatedId
        const { errorId, hintId } = generateAccessibilityIds(textareaId)

        const ariaDescribedBy = useMemo(
            () => getTextAreaAriaDescribedBy(hintText, error, hintId, errorId),
            [hintText, error, hintId, errorId]
        )

        const labelState = useMemo(
            () => getTextAreaLabelState(disabled, error.show, isFocused),
            [disabled, error.show, isFocused]
        )

        const inputFocusedOrWithValue = isFocused || value.length > 0

        const inputPadding = useMemo(
            () =>
                getTextAreaInputPadding({
                    inputContainer: ic,
                    size,
                    isSmallScreen,
                    inputFocusedOrWithValue,
                }),
            [ic, size, isSmallScreen, inputFocusedOrWithValue]
        )

        const {
            borderDefault,
            borderHover,
            borderFocus,
            bgDefault,
            bgHover,
            textColorKey,
        } = useMemo(
            () => getTextAreaInteractionKeys(error.show, disabled),
            [error.show, disabled]
        )

        const setTextAreaRef = (node: HTMLTextAreaElement | null) => {
            setExternalRef(ref as AnyRef<HTMLTextAreaElement>, node)
        }

        return (
            <Block
                data-textarea={label || 'textarea'}
                data-status={disabled ? 'disabled' : 'enabled'}
                display="flex"
                flexDirection="column"
                gap={textAreaTokens.gap}
                width="100%"
            >
                {!isSmallScreen && (
                    <InputLabelsV2
                        tokens={textAreaTokens.topContainer}
                        label={label}
                        sublabel={sublabel}
                        helpIconText={helpIconText}
                        inputId={textareaId}
                        name={name}
                        required={required || false}
                        size={InputSizeV2.SM}
                        state={labelState}
                    />
                )}
                <Block
                    display="flex"
                    flexDirection="column"
                    position="relative"
                >
                    {label && isSmallScreen && (
                        <FloatingLabelsV2
                            label={label}
                            required={required}
                            name={name}
                            inputId={textareaId}
                            isInputFocusedOrWithValue={inputFocusedOrWithValue}
                            topPadding={inputPadding.floatingLabelTopPadding}
                            leftPadding={inputPadding.floatingLabelLeftPadding}
                            tokens={{
                                placeholder: ic.placeholder,
                                required: textAreaTokens.topContainer.required,
                            }}
                            size={size}
                            state={labelState}
                            backgroundColor={ic.backgroundColor[bgDefault]}
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
                            e.stopPropagation()
                            setIsFocused(true)
                            onFocus?.(e)
                        }}
                        onBlur={(e) => {
                            e.stopPropagation()
                            setIsFocused(false)
                            onBlur?.(e)
                        }}
                        onKeyDown={(e) => {
                            e.stopPropagation()
                            restOnKeyDown?.(e)
                        }}
                        rows={rows}
                        required={required}
                        borderRadius={ic.borderRadius}
                        resize={resize}
                        paddingTop={inputPadding.paddingTop}
                        paddingBottom={inputPadding.paddingBottom}
                        paddingLeft={inputPadding.paddingLeft}
                        paddingRight={inputPadding.paddingRight}
                        border={ic.border[borderDefault]}
                        fontSize={ic.fontSize}
                        fontWeight={ic.fontWeight}
                        backgroundColor={ic.backgroundColor[bgDefault]}
                        transition={TRANSITION}
                        placeholderStyles={{
                            transition: ic.placeholder.transition,
                            color: ic.placeholder.color[labelState],
                            fontWeight: ic.placeholder.fontWeight[size],
                        }}
                        _hover={{
                            border: ic.border[borderHover],
                            backgroundColor: ic.backgroundColor[bgHover],
                        }}
                        color={ic.color[textColorKey]}
                        _focus={{
                            border: ic.border[borderFocus],
                            boxShadow: FOCUS_RING_STYLES.boxShadow,
                        }}
                        disabled={disabled}
                        _disabled={{
                            backgroundColor: ic.backgroundColor.disabled,
                            border: ic.border.disabled,
                            cursor: 'not-allowed',
                        }}
                        aria-required={required ? 'true' : undefined}
                        aria-invalid={error.show ? 'true' : 'false'}
                        aria-describedby={ariaDescribedBy}
                    />
                </Block>
                <InputFooterV2
                    tokens={textAreaTokens.bottomContainer}
                    error={error.show || false}
                    errorMessage={error.message}
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
