import React, { forwardRef } from 'react'
import {
    View,
    StyleSheet,
    type View as RNView,
    type ViewProps,
    type ViewStyle,
} from 'react-native'
import {
    resolveSurfaceStyle,
    type SurfaceStyleProps,
} from '../adapters/surfaceStyle'

/**
 * Native `Block` — a `View` driven by token-shaped style props.
 *
 * Style resolution is delegated to `resolveSurfaceStyle`, the same function
 * `Pressable` uses, so a component that swaps between the two depending on
 * whether it is interactive (web's `TagElement = onClick ? PrimitiveButton :
 * Block` pattern) renders identically in both branches. Before that was
 * shared, `Block` could not render a border, radius, shadow, or height at
 * all.
 *
 * Note there is **no `color` prop**. On web, `Block`'s `color` maps to CSS
 * `color` — a foreground value that SVG icons inherit via `currentColor`.
 * RN has no such inheritance, and mapping `color` to `backgroundColor` (as
 * this file previously did) silently inverted the meaning of every call
 * copied over from web. Use `backgroundColor` for a background, and `Slot`
 * for tinting icons.
 */

export type BlockProps = SurfaceStyleProps & {
    children?: React.ReactNode
    /** Escape hatch for RN styles the token props do not cover. */
    style?: ViewStyle
} & Omit<ViewProps, 'style'>

export const Block = forwardRef<RNView, BlockProps>(function Block(
    { children, style, ...rest },
    ref
) {
    // Split token-shaped style props from pass-through RN View props.
    const {
        background,
        backgroundColor,
        border,
        borderRadius,
        boxShadow,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        width,
        minWidth,
        maxWidth,
        height,
        minHeight,
        maxHeight,
        flexDirection,
        alignItems,
        justifyContent,
        alignSelf,
        gap,
        flexShrink,
        flexGrow,
        opacity,
        overflow,
        ...viewProps
    } = rest

    const resolved = resolveSurfaceStyle({
        background,
        backgroundColor,
        border,
        borderRadius,
        boxShadow,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        width,
        minWidth,
        maxWidth,
        height,
        minHeight,
        maxHeight,
        flexDirection,
        alignItems,
        justifyContent,
        alignSelf,
        gap,
        flexShrink,
        flexGrow,
        opacity,
        overflow,
    })

    return (
        <View
            ref={ref}
            style={StyleSheet.flatten([baseStyle.view, resolved, style])}
            {...viewProps}
        >
            {children}
        </View>
    )
})

Block.displayName = 'Block'

const baseStyle = StyleSheet.create({
    view: {
        // RN Views are already flex containers; declaring it keeps parity
        // with web `Block`, which is `display: flex`.
        display: 'flex',
    },
})

export default Block
