import { forwardRef, memo, useContext } from 'react'
import {
    TextInput as RNTextInput,
    StyleSheet,
    type TextInputProps as RNTextInputProps,
    type StyleProp,
    type TextStyle,
} from 'react-native'
import { parseDimension } from '../adapters/cssStringAdapter'
import { resolveFontWeight } from './textStyle'
import { BlendNativeThemeContext } from '../theme/BlendNativeProvider'

/**
 * Native `PrimitiveInput` — a bare RN `TextInput` driven by token-shaped
 * text props, the input counterpart of `Text`.
 *
 * Deliberately *only* the text field: web's `PrimitiveInput` styles the
 * `<input>` element itself with border and padding, but RN inputs carry
 * leading/trailing slots, so the bordered container is a `Block` row that
 * the field component owns and this primitive sits inside with `flex: 1`.
 *
 * Font family comes from the provider's role map (`body`), matching `Text`,
 * and OS font scaling stays on per the package policy.
 */

export type PrimitiveInputProps = {
    /** CSS string like `"14px"` or a number. */
    fontSize?: string | number
    /** CSS font-weight keyword or numeric string (`"500"`). */
    fontWeight?: string | number
    /** Text colour for the current state. */
    color?: string
    /** CSS line-height like `"20px"` or a number. */
    lineHeight?: string | number
    /** Placeholder colour for the current state. */
    placeholderColor?: string
    style?: StyleProp<TextStyle>
} & Omit<RNTextInputProps, 'style' | 'placeholderTextColor'>

const PrimitiveInputImpl = forwardRef<RNTextInput, PrimitiveInputProps>(
    function PrimitiveInput(
        {
            fontSize,
            fontWeight,
            color,
            lineHeight,
            placeholderColor,
            style,
            ...rest
        },
        ref
    ) {
        const { fontFamily } = useContext(BlendNativeThemeContext)

        const resolved: TextStyle = {
            fontSize: parseDimension(fontSize),
            fontWeight: resolveFontWeight(fontWeight),
            color,
            lineHeight: parseDimension(lineHeight),
            fontFamily: fontFamily.body ?? undefined,
        }

        return (
            <RNTextInput
                ref={ref}
                style={StyleSheet.flatten([baseStyle.input, resolved, style])}
                placeholderTextColor={placeholderColor}
                {...rest}
            />
        )
    }
)

/** Memoised — see the note on `Block`. */
export const PrimitiveInput = memo(PrimitiveInputImpl)
PrimitiveInput.displayName = 'PrimitiveInput'

const baseStyle = StyleSheet.create({
    input: {
        // The field row owns padding; RN inputs default to platform padding
        // that would double up with the container's token padding.
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
})

export default PrimitiveInput
