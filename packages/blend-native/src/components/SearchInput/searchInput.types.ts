import type React from 'react'
import type {
    StyleProp,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    ViewStyle,
} from 'react-native'
import type { SearchInputBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `SearchInput` — the port of web's `SearchInputV2`.
 *
 * Derives from `SearchInputBaseProps` (value, boolean error, allowClear,
 * onClear, disabled) with `onChange` → `onChangeText` and uncontrolled
 * support. Like web there is no size prop (SM chrome), no label and no
 * footer — it is a bare bottom-bordered field; the caller supplies the
 * search icon via `leftSlot`.
 */
export type SearchInputNativeProps = SearchInputBaseProps & {
    defaultValue?: string
    onChangeText?: (text: string) => void
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    /** Replaces the default lucide X clear icon. */
    clearIcon?: React.ReactNode
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
    >
