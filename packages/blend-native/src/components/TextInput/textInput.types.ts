import type React from 'react'
import type {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native'
import type { TextInputBaseProps } from '@juspay/blend-design-system/node'
import type { SingleSelectNativeProps } from '../SingleSelect/singleSelect.types'

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
 * - The floating-label mode (web floats the label into `lg` inputs on
 *   phones) — deferred until the field pattern settles on native.
 */

export type TextInputSlot = {
    slot: React.ReactElement
    maxHeight?: string | number
}

/** Where an embedded dropdown sits in the field (web `TextInputV2DropdownPosition`). */
export enum TextInputDropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

/**
 * An embedded SingleSelect (web `TextInputV2Dropdown`): drawn inside the
 * field as a borderless select sized to the input; it takes that side's slot.
 */
export type TextInputDropdown = Omit<
    SingleSelectNativeProps,
    | 'variant'
    | 'size'
    | 'label'
    | 'subLabel'
    | 'hintText'
    | 'required'
    | 'error'
> & {
    position: TextInputDropdownPosition
}

export type TextInputNativeProps = Omit<TextInputBaseProps, 'value'> & {
    /** Embedded selects; each replaces the slot on its side (web `dropdown`). */
    dropdown?: TextInputDropdown | TextInputDropdown[]
    /**
     * Controlled value. Optional since the uncontrolled fix: omit it (with
     * an optional `defaultValue`) and the field manages its own text.
     */
    value?: string
    /** Initial value for uncontrolled usage. Mount-only, like React's. */
    defaultValue?: string
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
        | 'value'
        | 'defaultValue'
        | 'onChangeText'
        | 'style'
        | 'editable'
        | 'placeholderTextColor'
    >
