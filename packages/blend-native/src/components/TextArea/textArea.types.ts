import type React from 'react'
import type {
    StyleProp,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    ViewStyle,
} from 'react-native'
import type { TextAreaBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `TextArea` — the port of web's `TextAreaV2`.
 *
 * Derives from `TextAreaBaseProps` with the web-only pieces swapped:
 * `onChange` → `onChangeText`, web's lowercase `sublabel` normalized to
 * `subLabel` (cross-input consistency, docblocked divergence), and `value`
 * optional with a live `defaultValue` (uncontrolled support from day one).
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `resize` — no RN equivalent; height comes from `rows`.
 * - `helpIconText` — needs the native Tooltip.
 * - The floating-label mode — deferred with TextInput's.
 */
export type TextAreaNativeProps = Omit<
    TextAreaBaseProps,
    'value' | 'sublabel' | 'resize' | 'helpIconText'
> & {
    value?: string
    defaultValue?: string
    onChangeText?: (text: string) => void
    subLabel?: string
    testID?: string
    accessibilityLabel?: string
    style?: StyleProp<ViewStyle>
    inputRef?: React.Ref<RNTextInput>
} & Omit<
        RNTextInputProps,
        | 'value'
        | 'defaultValue'
        | 'onChangeText'
        | 'style'
        | 'editable'
        | 'placeholderTextColor'
        | 'multiline'
        | 'numberOfLines'
    >
