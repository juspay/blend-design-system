import React, { memo } from 'react'
import { View, StyleSheet, type ViewStyle } from 'react-native'
import { parseSize } from '../adapters/cssStringAdapter'
import { tintSlot } from './tintSlot'

export { tintSlot }

/**
 * Leading / trailing icon slot.
 *
 * Shared by `Button` and `Tag`, both of which need identical behaviour and
 * both of which previously got it wrong in the same three ways:
 *
 * 1. **Tinting.** On web, components pass `color` to `Block`, which maps to
 *    CSS `color`, and SVG icons pick it up through `currentColor`. The native
 *    `Block` mapped `color` to `backgroundColor`, so the same call painted a
 *    solid rectangle *behind* the icon and never tinted the icon at all. RN
 *    has no `currentColor`, so the tint has to be handed to the element
 *    explicitly — that is what this component does.
 * 2. **Per-slot `maxHeight`.** `leftSlot.maxHeight` / `rightSlot.maxHeight`
 *    are part of the web prop contract and were ignored.
 * 3. **Screen readers.** Web marks slots `aria-hidden` when the component
 *    also renders text, so the icon is not announced separately from the
 *    label. Native rendered them as visible accessibility nodes.
 */

export type SlotProps = {
    /** The icon element to render. */
    children?: React.ReactNode
    /**
     * Colour to tint the icon with. Passed to the child as `color` (and
     * `fill`, which `react-native-svg` elements use).
     */
    color?: string
    /**
     * Max height for the icon box. Accepts token strings (`"16px"`),
     * percentages (`"100%"`, used by Button's inline subType), or numbers.
     */
    maxHeight?: string | number
    /**
     * Hide from screen readers. Should be `true` whenever the parent also
     * renders a text label, matching web's `aria-hidden`.
     */
    hidden?: boolean
    style?: ViewStyle
    testID?: string
}

function SlotImpl({
    children,
    color,
    maxHeight,
    hidden = false,
    style,
    testID,
}: SlotProps) {
    if (!children) return null

    const resolved: ViewStyle = { ...baseStyle.slot }
    const size = parseSize(maxHeight)
    if (size !== undefined) resolved.maxHeight = size

    return (
        <View
            style={StyleSheet.flatten([resolved, style])}
            testID={testID}
            // Matches web's `aria-hidden` on slots that accompany text: the
            // icon should not be announced as a separate element, and the
            // parent already carries the accessible name.
            accessible={hidden ? false : undefined}
            importantForAccessibility={
                hidden ? 'no-hide-descendants' : undefined
            }
            accessibilityElementsHidden={hidden || undefined}
        >
            {tintSlot(children, color)}
        </View>
    )
}

/** Memoised — see the note on `Block`. */
export const Slot = memo(SlotImpl)
Slot.displayName = 'Slot'

const baseStyle = StyleSheet.create({
    slot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
})

export default Slot
