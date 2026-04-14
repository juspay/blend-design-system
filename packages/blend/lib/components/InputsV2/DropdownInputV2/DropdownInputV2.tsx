import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { AnyRef, InputSizeV2, InputStateV2 } from '../inputV2.types'
import type { DropdownInputV2TokensType } from './DropdownInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { DropdownInputV2Props, DropdownPosition } from './DropdownInputV2.types'
import { SingleSelectV2, SingleSelectV2Variant } from '../../SingleSelectV2'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import {
    addPxToValue,
    useAutofillDetection,
} from '../../../global-utils/GlobalUtils'
import type { InputLabelsV2Tokens as InputLabelsV2TokensType } from '../inputV2.tokens'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'
import {
    FOCUS_RING_STYLES,
    getInputState,
    TRANSITION,
} from '../TextInputV2/utils'
import type { TextInputV2TokensType } from '../TextInputV2/TextInputV2.tokens'
import { generateAccessibilityIds, setExternalRef } from '../utils/utils'
import {
    getBorderInteractionVariants,
    getDropdownAriaDescribedBy,
    getDropdownInputLayoutMetrics,
    getSingleSelectAriaLabel,
    getSingleSelectMenuPosition,
    isSelectedOptionDisabled,
    mergeDropDown,
    mergeInput,
    resolveInputSize,
    resolveSelectSize,
} from './utils'

const DropdownInputV2 = forwardRef<HTMLInputElement, DropdownInputV2Props>(
    (
        {
            label,
            sublabel,
            helpIconHintText,
            required,
            name = 'dropdown-input',
            disabled,
            size,
            error = { show: false, message: '' },
            hintText,
            id: providedId,
            dropDown: dropDownProp,
            input: inputProp,
            dropdownPosition = DropdownPosition.LEFT,
            dropdownName,
            onDropdownOpen,
            onDropdownClose,
            maxMenuHeight,
            minMenuWidth,
            maxMenuWidth,
            onFocus,
            onBlur,
            ...rest
        },
        ref
    ) => {
        const dropDown = mergeDropDown(dropDownProp)
        const input = mergeInput(inputProp)

        const dropdownInputTokens =
            useResponsiveTokens<DropdownInputV2TokensType>('DROPDOWN_INPUT_V2')
        const textInputTokens =
            useResponsiveTokens<TextInputV2TokensType>('TEXT_INPUTV2')

        const inputRef = useRef<HTMLInputElement>(null)
        const dropdownRef = useRef<HTMLDivElement>(null)
        const [isFocused, setIsFocused] = useState(false)
        const [isAutofilled, setIsAutofilled] = useState(false)
        useAutofillDetection(inputRef, setIsAutofilled)

        const [dropdownWidth, setDropdownWidth] = useState(0)
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const inputSize = resolveInputSize(size, input.size)
        const selectSize = resolveSelectSize(dropDown.size, size, input.size)
        const isSmallScreenWithLargeSize =
            isSmallScreen && inputSize === InputSizeV2.LG
        const showStaticLabels = !isSmallScreenWithLargeSize

        const value = input.value ?? ''
        const inputFocusedOrWithValue =
            isFocused || value.length > 0 || isAutofilled

        const generatedId = useId()
        const inputId = providedId || generatedId
        const { errorId, hintId } = generateAccessibilityIds(inputId)

        const filteredRest = filterBlockedProps(rest)

        const inputState = useMemo(
            () => getInputState({ show: Boolean(error?.show) }, disabled),
            [error?.show, disabled]
        )

        const ariaDescribedBy = useMemo(
            () =>
                getDropdownAriaDescribedBy(
                    hintText,
                    error.show,
                    error.message,
                    hintId,
                    errorId
                ),
            [hintText, error.show, error.message, hintId, errorId]
        )

        const layout = useMemo(
            () =>
                getDropdownInputLayoutMetrics({
                    tokens: dropdownInputTokens,
                    inputSize,
                    isSmallScreenWithLargeSize,
                    inputFocusedOrWithValue,
                    dropdownPosition,
                    dropdownWidth,
                }),
            [
                dropdownInputTokens,
                inputSize,
                isSmallScreenWithLargeSize,
                inputFocusedOrWithValue,
                dropdownPosition,
                dropdownWidth,
            ]
        )

        const {
            paddingX,
            paddingTop,
            paddingBottom,
            floatingLabelTopPadding,
            paddingLeft,
            paddingRight,
        } = layout

        const isSelectedItemDisabled = isSelectedOptionDisabled(
            dropDown.items,
            dropDown.value
        )

        const isInputDisabled = Boolean(disabled || isSelectedItemDisabled)

        const hasError = Boolean(error?.show)
        const { hoverVariant } = getBorderInteractionVariants(
            hasError,
            inputState
        )

        useEffect(() => {
            if (dropdownRef.current) {
                setDropdownWidth(dropdownRef.current.offsetWidth)
            } else {
                setDropdownWidth(0)
            }
        }, [dropDown.value, dropDown.items, selectSize])

        const setInputRef = (node: HTMLInputElement | null) => {
            inputRef.current = node
            setExternalRef(ref as AnyRef<HTMLInputElement>, node)
        }

        const container = dropdownInputTokens.inputContainer
        const placeholderColor =
            textInputTokens.inputContainer.placeholder.color[
                InputStateV2.DEFAULT
            ]

        const menuPosition = useMemo(
            () => getSingleSelectMenuPosition(dropdownPosition, paddingX),
            [dropdownPosition, paddingX]
        )

        const singleSelectAriaLabel = getSingleSelectAriaLabel(
            dropdownName,
            dropDown.label,
            label
        )

        const dropdownSingleSelect = (
            <SingleSelectV2
                label={dropDown.label ?? ''}
                items={dropDown.items}
                selected={dropDown.value ?? ''}
                onSelect={(selected) => {
                    dropDown.onSelect?.(selected)
                }}
                placeholder={dropDown.placeholder ?? ''}
                size={selectSize}
                variant={SingleSelectV2Variant.NO_CONTAINER}
                disabled={disabled}
                inline
                error={{ show: false }}
                search={{ show: true }}
                name={dropdownName ?? `${name}-dropdown`}
                aria-label={singleSelectAriaLabel}
                menuDimensions={{
                    maxHeight: maxMenuHeight,
                    minWidth: minMenuWidth,
                    maxWidth: maxMenuWidth,
                }}
                menuPosition={menuPosition}
                onFocus={() => {
                    onDropdownOpen?.()
                }}
                onBlur={() => {
                    onDropdownClose?.()
                }}
            />
        )

        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={dropdownInputTokens.gap}
                width="100%"
                data-dropdown-input-v2={label || 'dropdown-input-v2'}
                data-status={disabled ? 'disabled' : 'enabled'}
            >
                {showStaticLabels && (
                    <InputLabelsV2
                        label={label}
                        sublabel={sublabel}
                        helpIconText={helpIconHintText}
                        required={required}
                        inputId={inputId}
                        name={name}
                        size={inputSize}
                        state={inputState}
                        tokens={
                            dropdownInputTokens.topContainer as InputLabelsV2TokensType
                        }
                    />
                )}

                <Block position="relative" width="100%">
                    {dropdownPosition === DropdownPosition.LEFT && (
                        <Block
                            ref={dropdownRef}
                            position="absolute"
                            left={
                                dropdownInputTokens.inputContainer.paddingLeft[
                                    inputSize
                                ]
                            }
                            top={
                                dropdownInputTokens.inputContainer.paddingTop[
                                    inputSize
                                ]
                            }
                            bottom={
                                dropdownInputTokens.inputContainer
                                    .paddingBottom[inputSize]
                            }
                            width="fit-content"
                            contentCentered
                        >
                            {dropdownSingleSelect}
                        </Block>
                    )}

                    {label && isSmallScreenWithLargeSize && (
                        <FloatingLabelsV2
                            label={label}
                            required={required ?? false}
                            name={name}
                            inputId={inputId}
                            isInputFocusedOrWithValue={inputFocusedOrWithValue}
                            topPadding={floatingLabelTopPadding}
                            leftPadding={paddingLeft}
                            tokens={{
                                placeholder:
                                    textInputTokens.inputContainer.placeholder,
                                required:
                                    dropdownInputTokens.topContainer.required,
                            }}
                            size={inputSize}
                            state={inputState}
                        />
                    )}

                    <PrimitiveInput
                        ref={setInputRef}
                        id={inputId}
                        lineHeight={addPxToValue(
                            dropdownInputTokens.inputContainer.lineHeight[
                                inputSize
                            ]
                        )}
                        placeholderColor={placeholderColor}
                        required={required}
                        value={value}
                        type="text"
                        name={name}
                        onChange={(e) => {
                            if (!isInputDisabled) {
                                input.onChange?.(e.target.value)
                            }
                        }}
                        paddingInlineStart={paddingLeft}
                        paddingInlineEnd={paddingRight}
                        paddingTop={paddingTop}
                        paddingBottom={paddingBottom}
                        placeholder={
                            isSmallScreenWithLargeSize
                                ? ''
                                : (input.placeholder ?? '')
                        }
                        aria-required={required ? 'true' : undefined}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={ariaDescribedBy}
                        borderRadius={
                            dropdownInputTokens.inputContainer.borderRadius?.[
                                inputSize
                            ]
                        }
                        border={container.border[inputState]}
                        fontSize={
                            dropdownInputTokens.inputContainer.fontSize[
                                inputSize
                            ]
                        }
                        fontWeight={
                            dropdownInputTokens.inputContainer.fontWeight[
                                inputSize
                            ]
                        }
                        outline="none"
                        width="100%"
                        backgroundColor={container.backgroundColor[inputState]}
                        transition={TRANSITION}
                        placeholderStyles={{
                            transition: 'opacity 150ms ease-out',
                            opacity: isFocused ? 0 : 1,
                        }}
                        _hover={{
                            border: container.border[InputStateV2.HOVER],
                            backgroundColor:
                                container.backgroundColor[hoverVariant],
                        }}
                        color={
                            isInputDisabled
                                ? container.color[InputStateV2.DISABLED]
                                : container.color[InputStateV2.DEFAULT]
                        }
                        _focus={{
                            border: container.border[InputStateV2.FOCUS],
                            outline: 'none !important',
                            ...FOCUS_RING_STYLES,
                            backgroundColor:
                                container.backgroundColor[InputStateV2.FOCUS],
                        }}
                        disabled={isInputDisabled}
                        _disabled={{
                            backgroundColor:
                                container.backgroundColor[
                                    InputStateV2.DISABLED
                                ],
                            border: container.border[InputStateV2.DISABLED],
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

                    {dropdownPosition === DropdownPosition.RIGHT && (
                        <Block
                            ref={dropdownRef}
                            position="absolute"
                            right={
                                dropdownInputTokens.inputContainer.paddingRight[
                                    inputSize
                                ]
                            }
                            top={
                                dropdownInputTokens.inputContainer.paddingTop[
                                    inputSize
                                ]
                            }
                            bottom={
                                dropdownInputTokens.inputContainer
                                    .paddingBottom[inputSize]
                            }
                            width="fit-content"
                            contentCentered
                        >
                            {dropdownSingleSelect}
                        </Block>
                    )}
                </Block>

                <InputFooterV2
                    error={error.show}
                    errorMessage={error.message}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    tokens={dropdownInputTokens.bottomContainer}
                    size={inputSize}
                />
            </Block>
        )
    }
)

DropdownInputV2.displayName = 'DropdownInputV2'
export default DropdownInputV2
