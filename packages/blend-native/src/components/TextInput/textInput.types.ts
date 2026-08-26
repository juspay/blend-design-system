import type React from 'react'
import type {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native'
import type { TextInputBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `TextInput` — the port of web's `TextInputV2`.
 *
 * Derives from web's platform-neutral `TextInputBaseProps` (the
 * `ButtonBaseProps` pattern), so a web-side rename or addition reaches this
 * type instead of drifting silently. Web pieces swapped for RN ones:
 * `onChange` on a DOM input becomes RN's `onChangeText`, `data-testid`
 * becomes `testID`, and the HTML-attribute passthrough becomes RN
 * `TextInputProps` (which supplies `placeholder`, `keyboardType`,
 * `autoCapitalize`, `secureTextEntry`, ... for free). The base's `error`
 * shape is exactly `FieldError` (`../shared/field/fieldState`).
 *
 * Deliberately omitted rather than accepted-and-ignored (the `skeleton`
 * precedent — passing them should be a compile error, not a no-op):
 *
 * - `dropdown` — the embedded SingleSelect needs the native Select family.
 *   (Web keeps it out of the base type for the same reason.)
 * - `helpIconText` — needs a native Tooltip; `Omit`-ed from the base.
 * - The floating-label mode (web floats the label into `lg` inputs on
 *   phones) — deferred until the field pattern settles on native.
 */

export type TextInputSlot = {
    slot: React.ReactElement
    maxHeight?: string | number
}

export type TextInputNativeProps = Omit<TextInputBaseProps, 'helpIconText'> & {
    onChangeText?: (text: string) => void
    required?: boolean
    disabled?: boolean
    leftSlot?: TextInputSlot
    rightSlot?: TextInputSlot
    testID?: string
    /** Screen-reader name; defaults to `label`. */
    accessibilityLabel?: string
    /** Escape hatch for the outer column (label + field + footer). */
    style?: StyleProp<ViewStyle>
    /** Ref to the underlying RN TextInput (focus/blur/clear). */
    inputRef?: React.Ref<RNTextInput>
} & Omit<
        RNTextInputProps,
        'value' | 'onChangeText' | 'style' | 'editable' | 'placeholderTextColor'
    >
