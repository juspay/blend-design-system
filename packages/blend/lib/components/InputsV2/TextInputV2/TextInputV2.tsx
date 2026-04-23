import {
    forwardRef,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useInputSlotPadding } from '../../../hooks/useInputSlotPadding'
import Block from '../../Primitives/Block/Block'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { AnyRef, InputSizeV2, InputStateV2 } from '../inputV2.types'
import type { TextInputV2TokensType } from './TextInputV2.tokens'
import type { TextInputV2Props } from './TextInputV2.types'
import { SelectV2Alignment } from '../../SelectV2/selectV2.shared.types'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from '../../SingleSelectV2/singleSelectV2.types'
import type { InputLabelsV2Tokens } from '../inputV2.tokens'
import {
    FOCUS_RING_STYLES,
    getInputState,
    getVerticalInputPadding,
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
import { generateAccessibilityIds, setExternalRef } from '../utils/utils'
import SingleSelectV2 from '../../SingleSelectV2/SingleSelectV2'

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
            select,
            rightSelect,
            leftSlot,
            rightSlot,
            onFocus,
            onBlur,
            ...rest
        }: TextInputV2Props,
        ref
    ) => {
        const showSelect = Boolean(select)
        const showRightSelect = Boolean(rightSelect)
        const effectiveLeftSlot = showSelect ? undefined : leftSlot
        const effectiveRightSlot = showRightSelect ? undefined : rightSlot

        const inputRef = useRef<HTMLInputElement>(null)
        const leftSlotRef = useRef<HTMLDivElement>(null)
        const rightSlotRef = useRef<HTMLDivElement>(null)
        const selectRef = useRef<HTMLDivElement>(null)
        const rightSelectRef = useRef<HTMLDivElement>(null)
        const [selectWidth, setSelectWidth] = useState(0)
        const [rightSelectWidth, setRightSelectWidth] = useState(0)

        const singleSelectV2Size =
            size === InputSizeV2.SM
                ? SingleSelectV2Size.SM
                : size === InputSizeV2.MD
                  ? SingleSelectV2Size.MD
                  : SingleSelectV2Size.LG

        const embeddedSelectMenuAlignOffset = -11
        const rightSelectMenuSideOffset =
            size === InputSizeV2.SM ? 10 : size === InputSizeV2.MD ? 12 : 15

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
        const { errorId, hintId } = generateAccessibilityIds(inputId)

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
                hasLeftSlot: Boolean(effectiveLeftSlot),
                hasRightSlot: Boolean(effectiveRightSlot),
                paddingLeft: inputContainerPaddingLeft,
                paddingRight: inputContainerPaddingRight,
                gap: toPixels(container.gap),
            })

        const gapPx = toPixels(container.gap)
        const leftPaddingWithSelect = showSelect
            ? calculatedLeftInputPadding + selectWidth + gapPx
            : calculatedLeftInputPadding
        const rightPaddingWithSelect = showRightSelect
            ? calculatedRightInputPadding + rightSelectWidth + gapPx
            : calculatedRightInputPadding

        useLayoutEffect(() => {
            if (showSelect && selectRef.current) {
                setSelectWidth(selectRef.current.offsetWidth)
            } else {
                setSelectWidth(0)
            }
        }, [showSelect, select, select?.selected])

        useLayoutEffect(() => {
            if (showRightSelect && rightSelectRef.current) {
                setRightSelectWidth(rightSelectRef.current.offsetWidth)
            } else {
                setRightSelectWidth(0)
            }
        }, [showRightSelect, rightSelect, rightSelect?.selected])

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
                    {effectiveLeftSlot && (
                        <InputSlots
                            position="left"
                            slotRef={leftSlotRef}
                            top={inputContainerPaddingTop}
                            bottom={inputContainerPaddingBottom}
                            left={inputContainerPaddingLeft}
                            right={inputContainerPaddingRight}
                            dataElement="left-slot"
                        >
                            {effectiveLeftSlot.slot}
                        </InputSlots>
                    )}

                    {select && (
                        <Block
                            ref={selectRef}
                            position="absolute"
                            zIndex={1}
                            top={inputContainerPaddingTop}
                            bottom={inputContainerPaddingBottom}
                            left={inputContainerPaddingLeft}
                            width="fit-content"
                            contentCentered
                        >
                            <SingleSelectV2
                                variant={SingleSelectV2Variant.NO_CONTAINER}
                                inline
                                size={singleSelectV2Size}
                                items={select.items}
                                selected={select.selected}
                                onSelect={select.onSelect}
                                placeholder={select.placeholder}
                                disabled={disabled}
                                name={select.name}
                                aria-label={
                                    select['aria-label'] ??
                                    label ??
                                    'Select option'
                                }
                                singleSelectGroupPosition={
                                    select.singleSelectGroupPosition ?? 'left'
                                }
                                search={select.search}
                                menuPosition={{
                                    alignment: SelectV2Alignment.START,
                                    sideOffset: rightSelectMenuSideOffset,
                                    alignOffset: embeddedSelectMenuAlignOffset,
                                    ...select.menuPosition,
                                }}
                                menuDimensions={select.menuDimensions}
                                usePanelOnMobile={select.usePanelOnMobile}
                                allowCustomValue={select.allowCustomValue}
                                customValueLabel={select.customValueLabel}
                                triggerDimensions={
                                    select.triggerDimensions ?? {
                                        width: 'max-content',
                                    }
                                }
                            />
                        </Block>
                    )}

                    {label && isSmallScreenWithLargeSize && (
                        <FloatingLabelsV2
                            label={label}
                            required={required}
                            name={name}
                            inputId={inputId}
                            isInputFocusedOrWithValue={inputFocusedOrWithValue}
                            topPadding={inputContainerPaddingTop}
                            leftPadding={leftPaddingWithSelect}
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
                        paddingRight={rightPaddingWithSelect}
                        paddingBottom={calculatedBottomInputPadding}
                        paddingLeft={leftPaddingWithSelect}
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

                    {rightSelect && (
                        <Block
                            ref={rightSelectRef}
                            position="absolute"
                            zIndex={1}
                            top={inputContainerPaddingTop}
                            bottom={inputContainerPaddingBottom}
                            right={inputContainerPaddingRight}
                            width="fit-content"
                            contentCentered
                        >
                            <SingleSelectV2
                                variant={SingleSelectV2Variant.NO_CONTAINER}
                                inline
                                size={singleSelectV2Size}
                                items={rightSelect.items}
                                selected={rightSelect.selected}
                                onSelect={rightSelect.onSelect}
                                placeholder={rightSelect.placeholder}
                                disabled={disabled}
                                name={rightSelect.name}
                                aria-label={
                                    rightSelect['aria-label'] ??
                                    label ??
                                    'Select option'
                                }
                                singleSelectGroupPosition={
                                    rightSelect.singleSelectGroupPosition ??
                                    'right'
                                }
                                search={rightSelect.search}
                                menuPosition={{
                                    alignment: SelectV2Alignment.END,
                                    sideOffset: rightSelectMenuSideOffset,
                                    alignOffset: embeddedSelectMenuAlignOffset,
                                    ...rightSelect.menuPosition,
                                }}
                                menuDimensions={rightSelect.menuDimensions}
                                usePanelOnMobile={rightSelect.usePanelOnMobile}
                                allowCustomValue={rightSelect.allowCustomValue}
                                customValueLabel={rightSelect.customValueLabel}
                                triggerDimensions={
                                    rightSelect.triggerDimensions ?? {
                                        width: 'max-content',
                                    }
                                }
                            />
                        </Block>
                    )}

                    {effectiveRightSlot && (
                        <InputSlots
                            position="right"
                            slotRef={rightSlotRef}
                            top={inputContainerPaddingTop}
                            bottom={inputContainerPaddingBottom}
                            left={inputContainerPaddingLeft}
                            right={inputContainerPaddingRight}
                            dataElement="right-slot"
                        >
                            {effectiveRightSlot.slot}
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
