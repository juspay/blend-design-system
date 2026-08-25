import { forwardRef, useCallback, useMemo, useState } from 'react'
import type {
    TextInputProps as RNTextInputProps,
    View as RNView,
} from 'react-native'
import {
    InputSizeV2,
    type TextInputV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { Block } from '../../primitives/Block'
import { PrimitiveInput } from '../../primitives/PrimitiveInput'
import { Slot } from '../../primitives/Slot'
import { FieldLabels } from '../shared/field/FieldLabels'
import { FieldFooter } from '../shared/field/FieldFooter'
import { getFieldState, getFieldVisualState } from '../shared/field/fieldState'
import { getTextInputNativeStyles } from './textInput.utils'
import type { TextInputNativeProps } from './textInput.types'

/**
 * TextInput — React Native implementation of web's `TextInputV2`, and the
 * reference consumer of the shared field chrome (`FieldLabels`,
 * `FieldFooter`, `PrimitiveInput`) the rest of the InputsV2 family will
 * reuse.
 *
 * Anatomy matches web: a column of label row, bordered field row (left
 * slot / input / right slot), and footer — all resolved from the
 * `TEXT_INPUTV2` token slot. Focus is component state re-resolving the
 * container against the FOCUS tokens, replacing web's `_focus` pseudo
 * object; the spread-only focus ring has no RN equivalent and is dropped.
 */
const TextInput = forwardRef<RNView, TextInputNativeProps>(function TextInput(
    {
        value,
        onChangeText,
        label,
        subLabel,
        size = InputSizeV2.SM,
        error,
        hintText,
        required = false,
        disabled = false,
        leftSlot,
        rightSlot,
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
    const tokens = useNativeTokens<TextInputV2TokensType>('TEXT_INPUTV2')
    const [focused, setFocused] = useState(false)

    // Labels/footer track error+disabled; the container also tracks focus.
    const fieldState = getFieldState(error, disabled)
    const visualState = getFieldVisualState(error, disabled, focused)

    const styles = useMemo(
        () => getTextInputNativeStyles(tokens, size, visualState),
        [tokens, size, visualState]
    )

    // Event types come from RN's own prop signatures — they changed shape
    // across RN versions (FocusEvent/BlurEvent), so deriving keeps us
    // correct on every supported peer.
    const handleFocus = useCallback<NonNullable<RNTextInputProps['onFocus']>>(
        (event) => {
            setFocused(true)
            onFocus?.(event)
        },
        [onFocus]
    )
    const handleBlur = useCallback<NonNullable<RNTextInputProps['onBlur']>>(
        (event) => {
            setFocused(false)
            onBlur?.(event)
        },
        [onBlur]
    )

    return (
        <Block ref={ref} gap={styles.gap} style={style} testID={testID}>
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
                flexDirection="row"
                alignItems="center"
                width="100%"
                testID={testID ? `${testID}-container` : undefined}
                border={styles.container.border}
                backgroundColor={styles.container.backgroundColor}
                borderRadius={styles.container.borderRadius}
                gap={styles.container.gap}
                paddingTop={styles.container.paddingTop}
                paddingRight={styles.container.paddingRight}
                paddingBottom={styles.container.paddingBottom}
                paddingLeft={styles.container.paddingLeft}
            >
                {leftSlot?.slot ? (
                    <Slot
                        maxHeight={leftSlot.maxHeight}
                        // Decorative next to the labelled input, matching
                        // web's aria-hidden on input slots.
                        hidden
                        testID={testID ? `${testID}-left-slot` : undefined}
                    >
                        {leftSlot.slot}
                    </Slot>
                ) : null}

                <PrimitiveInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    editable={!disabled}
                    fontSize={styles.text.fontSize}
                    fontWeight={styles.text.fontWeight}
                    lineHeight={styles.text.lineHeight}
                    color={styles.text.color}
                    placeholderColor={styles.placeholderColor}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    accessibilityLabel={accessibilityLabel ?? label}
                    accessibilityState={{ disabled }}
                    testID={testID ? `${testID}-input` : undefined}
                    {...rest}
                />

                {rightSlot?.slot ? (
                    <Slot
                        maxHeight={rightSlot.maxHeight}
                        hidden
                        testID={testID ? `${testID}-right-slot` : undefined}
                    >
                        {rightSlot.slot}
                    </Slot>
                ) : null}
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

TextInput.displayName = 'TextInput'

export default TextInput
