import { forwardRef, useState } from 'react'
import type {
    TextInputProps as RNTextInputProps,
    View as RNView,
} from 'react-native'
import { InputSizeV2 } from '@juspay/blend-design-system/node'
import type { TextAreaV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useControllableState } from '../../hooks/useControllableState'
import Block from '../../primitives/Block'
import PrimitiveInput from '../../primitives/PrimitiveInput'
import { FieldLabels } from '../shared/field/FieldLabels'
import { FieldFooter } from '../shared/field/FieldFooter'
import { getFieldState, getFieldVisualState } from '../shared/field/fieldState'
import { parseDimension } from '../../adapters/cssStringAdapter'
import type { TextAreaNativeProps } from './textArea.types'

/**
 * Multi-line text field — the native port of web's `TextAreaV2`.
 *
 * The TextInput anatomy with a multiline `PrimitiveInput`: the minimum
 * height is web's formula (`rows × lineHeight + vertical padding`), text
 * grows past it, and `textAlignVertical="top"` keeps the first line at the
 * top on Android.
 */
const TextArea = forwardRef<RNView, TextAreaNativeProps>(function TextArea(
    {
        value,
        defaultValue,
        onChangeText,
        label,
        subLabel,
        size = InputSizeV2.MD,
        error,
        hintText,
        placeholder,
        required = false,
        disabled = false,
        rows = 3,
        testID,
        accessibilityLabel,
        style,
        inputRef,
        onFocus,
        onBlur,
        ...rest
    },
    ref
) {
    const tokens = useNativeTokens<TextAreaV2TokensType>('TEXT_AREA_V2')
    const [focused, setFocused] = useState(false)
    const [currentValue, setCurrentValue] = useControllableState<string>(
        value,
        defaultValue ?? '',
        onChangeText
    )

    const fieldState = getFieldState(error, disabled)
    const visualState = getFieldVisualState(error, disabled, focused)
    const container = tokens.inputContainer

    const lineHeight =
        parseDimension(container.lineHeight[size] as string | number) ?? 20
    const paddingTop =
        parseDimension(container.padding.top[size] as string | number) ?? 10
    const paddingBottom =
        parseDimension(container.padding.bottom[size] as string | number) ?? 10
    // Web's `getTextAreaV2MinHeightFromRows`.
    const minHeight = rows * lineHeight + paddingTop + paddingBottom

    const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (event) => {
        setFocused(true)
        onFocus?.(event)
    }
    const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (event) => {
        setFocused(false)
        onBlur?.(event)
    }

    return (
        <Block
            ref={ref}
            gap={tokens.gap as string | number}
            style={style}
            testID={testID}
        >
            <FieldLabels
                label={label}
                sublabel={subLabel}
                required={required}
                size={size}
                state={fieldState}
                tokens={tokens.topContainer}
                testID={testID ? `${testID}-labels` : undefined}
            />
            <Block
                border={String(container.border[visualState] ?? 'none')}
                backgroundColor={String(
                    container.backgroundColor[visualState] ?? 'transparent'
                )}
                borderRadius={container.borderRadius as string | number}
                paddingTop={paddingTop}
                paddingBottom={paddingBottom}
                paddingLeft={container.padding.left[size] as string | number}
                paddingRight={container.padding.right[size] as string | number}
                minHeight={minHeight}
                testID={testID ? `${testID}-container` : undefined}
            >
                <PrimitiveInput
                    ref={inputRef}
                    value={currentValue}
                    onChangeText={setCurrentValue}
                    multiline
                    textAlignVertical="top"
                    placeholder={placeholder}
                    placeholderColor={String(
                        container.placeholder.color[visualState] ?? undefined
                    )}
                    fontSize={container.fontSize as string | number}
                    fontWeight={container.fontWeight as string | number}
                    lineHeight={lineHeight}
                    color={String(container.color[visualState] ?? '#000000')}
                    editable={!disabled}
                    accessibilityLabel={accessibilityLabel ?? label}
                    accessibilityState={{ disabled }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    testID={testID ? `${testID}-input` : undefined}
                    style={{
                        flex: 0,
                        minHeight: minHeight - paddingTop - paddingBottom,
                    }}
                    {...rest}
                />
            </Block>
            <FieldFooter
                error={error}
                hintText={hintText}
                size={size}
                tokens={tokens.bottomContainer}
                testID={testID ? `${testID}-footer` : undefined}
            />
        </Block>
    )
})

TextArea.displayName = 'TextArea'

export default TextArea
