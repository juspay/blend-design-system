import { forwardRef, useId, useMemo, useRef, useState } from 'react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useInputSlotPadding } from '../../../hooks/useInputSlotPadding'
import Block from '../../Primitives/Block/Block'
import InputLabelsV2, {
    InputLabelsV2Tokens,
} from '../utils/InputLabels/InputLabelsV2'
import { AnyRef, InputSizeV2, InputStateV2 } from '../inputV2.types'
import { TextInputV2TokensType } from './TextInputV2.tokens'
import { TextInputV2Props } from './TextInputV2.types'
import {
    FOCUS_RING_STYLES,
    getInputState,
    getVerticalInputPadding,
    setExternalRef,
    TRANSITION,
} from './utils'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import {
    addPxToValue,
    toPixels,
    useAutofillDetection,
} from '../../../global-utils/GlobalUtils'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import InputSlots from '../utils/InputSlots/InputSlots'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'

const TextInputV2 = forwardRef<HTMLInputElement, TextInputV2Props>(
    (
        {
            id: providedId,
            name = 'text-input',
            value,
            onChange,
            placeholder = 'Enter',
            label,
            subLabel,
            size = InputSizeV2.SM,
            required = false,
            disabled = false,
            error = { show: false, message: '' },
            hintText,
            helpIconText,
            leftSlot,
            rightSlot,
            onFocus,
            onBlur,
            ...rest
        }: TextInputV2Props,
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null)
        const leftSlotRef = useRef<HTMLDivElement>(null)
        const rightSlotRef = useRef<HTMLDivElement>(null)

        const tokens =
            useResponsiveTokens<TextInputV2TokensType>('TEXT_INPUTV2')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const generatedId = useId()

        const filteredRest = filterBlockedProps(rest)
        const [isFocused, setIsFocused] = useState(false)
        const [isAutofilled, setIsAutofilled] = useState(false)
        useAutofillDetection(inputRef, setIsAutofilled)

        const isSmallScreen = breakPointLabel === 'sm'
        const isSmallScreenWithLargeSize =
            isSmallScreen && size === InputSizeV2.LG
        const showStaticLabels = !isSmallScreenWithLargeSize
        const inputFocusedOrWithValue =
            isFocused || value.length > 0 || isAutofilled

        const inputId = providedId ?? generatedId
        const errorId = `${inputId}-error`
        const hintId = `${inputId}-hint`

        const inputState = useMemo(
            () => getInputState(error, disabled),
            [error, disabled]
        )
        const ariaDescribedBy = useMemo(() => {
            const ids = [error?.show && errorId, hintText && hintId].filter(
                Boolean
            ) as string[]
            return ids.length > 0 ? ids.join(' ') : undefined
        }, [error?.show, errorId, hintText, hintId])

        const container = tokens.inputContainer
        const padding = container.padding
        const inputContainerPaddingTop = toPixels(padding.top[size])
        const inputContainerPaddingBottom = toPixels(padding.bottom[size])
        const inputContainerPaddingLeft = toPixels(padding.left[size])
        const inputContainerPaddingRight = toPixels(padding.right[size])

        const {
            top: calculatedTopInputPadding,
            bottom: calculatedBottomInputPadding,
        } = getVerticalInputPadding({
            isSmallScreenWithLargeSize,
            inputFocusedOrWithValue,
            paddingTop: inputContainerPaddingTop,
            paddingBottom: inputContainerPaddingBottom,
        })
        const { calculatedLeftInputPadding, calculatedRightInputPadding } =
            useInputSlotPadding({
                leftSlotRef,
                rightSlotRef,
                hasLeftSlot: Boolean(leftSlot),
                hasRightSlot: Boolean(rightSlot),
                paddingLeft: inputContainerPaddingLeft,
                paddingRight: inputContainerPaddingRight,
                gap: toPixels(container.gap),
            })

        const hasError = Boolean(error?.show)
        const borderVariant = hasError ? InputStateV2.ERROR : inputState
        const hoverVariant = hasError ? InputStateV2.ERROR : InputStateV2.HOVER
        const focusVariant = hasError ? InputStateV2.ERROR : InputStateV2.FOCUS

        const setInputRef = (node: HTMLInputElement | null) => {
            inputRef.current = node
            setExternalRef(ref as AnyRef<HTMLInputElement>, node)
        }

        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={tokens.gap}
                width="100%"
                data-textinput={label ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
            >
                {showStaticLabels && (
                    <InputLabelsV2
                        tokens={tokens.topContainer as InputLabelsV2Tokens}
                        label={label}
                        sublabel={subLabel}
                        size={size}
                        state={inputState}
                        helpIconText={helpIconText}
                        inputId={inputId}
                        required={required}
                    />
                )}

                <Block position="relative">
                    {leftSlot && (
                        <InputSlots
                            position="left"
                            slotRef={leftSlotRef}
                            top={inputContainerPaddingTop}
                            bottom={inputContainerPaddingBottom}
                            left={inputContainerPaddingLeft}
                            right={inputContainerPaddingRight}
                            dataElement="left-slot"
                        >
                            {leftSlot.slot}
                        </InputSlots>
                    )}

                    {label && isSmallScreenWithLargeSize && (
                        <FloatingLabelsV2
                            label={label}
                            required={required}
                            name={name}
                            inputId={inputId}
                            isInputFocusedOrWithValue={inputFocusedOrWithValue}
                            topPadding={inputContainerPaddingTop}
                            leftPadding={calculatedLeftInputPadding}
                            tokens={{
                                placeholder: tokens.inputContainer.placeholder,
                                required: tokens.topContainer.required,
                            }}
                            size={size}
                            state={inputState}
                        />
                    )}

                    <PrimitiveInput
                        ref={setInputRef}
                        aria-required={required ? 'true' : undefined}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={ariaDescribedBy}
                        id={inputId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={
                            isSmallScreenWithLargeSize ? '' : placeholder
                        }
                        required={required}
                        disabled={disabled}
                        width="100%"
                        placeholderColor={container.placeholder.color.default}
                        paddingTop={calculatedTopInputPadding}
                        paddingRight={calculatedRightInputPadding}
                        paddingBottom={calculatedBottomInputPadding}
                        paddingLeft={calculatedLeftInputPadding}
                        borderRadius={container.borderRadius[size]}
                        border={container.border[borderVariant]}
                        fontSize={container.inputText.fontSize[size]}
                        fontWeight={container.inputText.fontWeight[size]}
                        lineHeight={addPxToValue(
                            container.inputText.lineHeight[size]
                        )}
                        color={
                            container.inputText.color[
                                disabled
                                    ? InputStateV2.DISABLED
                                    : InputStateV2.DEFAULT
                            ]
                        }
                        backgroundColor={
                            container.backgroundColor[borderVariant]
                        }
                        transition={TRANSITION}
                        _hover={{
                            border: container.border[hoverVariant],
                            backgroundColor:
                                container.backgroundColor[hoverVariant],
                        }}
                        _focus={{
                            border: container.border[focusVariant],
                            ...FOCUS_RING_STYLES,
                        }}
                        _disabled={{
                            border: container.border.disabled,
                            backgroundColor: container.backgroundColor.disabled,
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
                        {...filteredRest}
                    />

                    {rightSlot && (
                        <InputSlots
                            position="right"
                            slotRef={rightSlotRef}
                            top={inputContainerPaddingTop}
                            bottom={inputContainerPaddingBottom}
                            left={inputContainerPaddingLeft}
                            right={inputContainerPaddingRight}
                            dataElement="right-slot"
                        >
                            {rightSlot.slot}
                        </InputSlots>
                    )}
                </Block>

                <InputFooterV2
                    tokens={tokens.bottomContainer}
                    error={error.show}
                    errorMessage={error.message}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    size={size}
                />
            </Block>
        )
    }
)

TextInputV2.displayName = 'TextInputV2'
export default TextInputV2
