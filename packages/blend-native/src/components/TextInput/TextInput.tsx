import { forwardRef, useCallback, useMemo, useState } from 'react'
import { useControllableState } from '../../hooks/useControllableState'
import { View } from 'react-native'
import type {
    TextInputProps as RNTextInputProps,
    View as RNView,
} from 'react-native'
import {
    InputSizeV2,
    SelectV2Size,
    SelectV2Variant,
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
import { parseDimension } from '../../adapters/cssStringAdapter'
import { SingleSelect } from '../SingleSelect'
import {
    TextInputDropdownPosition,
    type TextInputDropdown,
    type TextInputNativeProps,
} from './textInput.types'

/** Web's TextInputV2 → SingleSelectV2 size mapping for embedded dropdowns. */
const SELECT_SIZE: Record<InputSizeV2, SelectV2Size> = {
    [InputSizeV2.SM]: SelectV2Size.SM,
    [InputSizeV2.MD]: SelectV2Size.MD,
    [InputSizeV2.LG]: SelectV2Size.LG,
}

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
        defaultValue,
        onChangeText,
        label,
        subLabel,
        helpIconText,
        dropdown,
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
    // Controlled when `value` is supplied; otherwise the field owns its
    // text, seeded by `defaultValue` (the audit's uncontrolled fix).
    const [currentValue, setCurrentValue] = useControllableState<string>(
        value,
        defaultValue ?? '',
        onChangeText
    )

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

    // Embedded selects (web `dropdown`): each takes over its side's slot.
    const dropdowns: TextInputDropdown[] =
        dropdown == null ? [] : Array.isArray(dropdown) ? dropdown : [dropdown]
    const renderDropdown = (position: TextInputDropdownPosition) => {
        const entry = dropdowns.find((item) => item.position === position)
        if (entry === undefined) return null
        // Every field but `position` goes to the select.
        const select: Omit<TextInputDropdown, 'position'> = { ...entry }
        delete (select as Partial<TextInputDropdown>).position
        // Web renders the embedded select `inline`: it sits in the text line
        // and never grows the field, so the row keeps a plain input's height.
        return (
            <View
                style={{
                    maxHeight:
                        parseDimension(
                            styles.text.lineHeight as string | number
                        ) ?? 20,
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <SingleSelect
                    {...select}
                    variant={SelectV2Variant.NO_CONTAINER}
                    inline
                    size={SELECT_SIZE[size]}
                    disabled={disabled || select.disabled}
                    accessibilityLabel={
                        select.accessibilityLabel ?? label ?? 'Select option'
                    }
                    testID={
                        select.testID ??
                        (testID ? `${testID}-${position}-dropdown` : undefined)
                    }
                />
            </View>
        )
    }
    const leftDropdown = renderDropdown(TextInputDropdownPosition.LEFT)
    const rightDropdown = renderDropdown(TextInputDropdownPosition.RIGHT)

    return (
        <Block ref={ref} gap={styles.gap} style={style} testID={testID}>
            <FieldLabels
                label={label}
                sublabel={subLabel}
                helpIconText={helpIconText}
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
                {leftDropdown ??
                    (leftSlot?.slot ? (
                        <Slot
                            maxHeight={leftSlot.maxHeight}
                            // Decorative next to the labelled input, matching
                            // web's aria-hidden on input slots.
                            hidden
                            testID={testID ? `${testID}-left-slot` : undefined}
                        >
                            {leftSlot.slot}
                        </Slot>
                    ) : null)}

                <PrimitiveInput
                    ref={inputRef}
                    value={currentValue}
                    onChangeText={setCurrentValue}
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

                {rightDropdown ??
                    (rightSlot?.slot ? (
                        <Slot
                            maxHeight={rightSlot.maxHeight}
                            hidden
                            testID={testID ? `${testID}-right-slot` : undefined}
                        >
                            {rightSlot.slot}
                        </Slot>
                    ) : null)}
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
