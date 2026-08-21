import React from 'react'
import { View, StyleSheet, type ViewProps, type ViewStyle } from 'react-native'

/**
 * Native `Block` — a layout primitive that mirrors the web `Block`'s
 * token-driven API but renders a plain RN `View`.
 *
 * Web `Block` (in `packages/blend/lib/Primitives/Block/Block.tsx`) is a
 * styled-components `div` with `shouldForwardProp` filtering. On native we
 * don't need prop filtering — RN `View` only accepts style objects — so this
 * is a thin wrapper that maps the same layout props to a `StyleSheet`.
 *
 * Used for non-interactive containers (icon slots, content wrappers).
 */

export type BlockProps = {
    children?: React.ReactNode
    /** Padding tokens (CSS strings like `"5px"`) — parsed to numbers. */
    paddingTop?: string | number
    paddingRight?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number
    flexDirection?: ViewStyle['flexDirection']
    justifyContent?: ViewStyle['justifyContent']
    alignItems?: ViewStyle['alignItems']
    gap?: string | number
    flexShrink?: number
    opacity?: number
    overflow?: ViewStyle['overflow']
    /** Max height for icon slots (CSS string like `"16px"`). */
    maxHeight?: string | number
    /** Display — only `flex` is meaningful on RN; others ignored. */
    display?: 'flex' | 'none'
    /** Background color (solid hex/rgb only on RN). */
    color?: string
} & Omit<ViewProps, 'style'> & {
        style?: ViewStyle
    }

const parseDim = (v: string | number | undefined): number | undefined => {
    if (v === undefined) return undefined
    if (typeof v === 'number') return v
    const n = parseFloat(v)
    return Number.isNaN(n) ? undefined : n
}

export function Block({
    children,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    flexShrink,
    opacity,
    overflow,
    maxHeight,
    display,
    color,
    style,
    ...rest
}: BlockProps) {
    const resolved: ViewStyle = {
        paddingTop: parseDim(paddingTop),
        paddingRight: parseDim(paddingRight),
        paddingBottom: parseDim(paddingBottom),
        paddingLeft: parseDim(paddingLeft),
        flexDirection,
        justifyContent,
        alignItems,
        gap: parseDim(gap),
        flexShrink,
        opacity,
        overflow,
        maxHeight: parseDim(maxHeight),
        backgroundColor: color,
        display:
            display === 'none'
                ? 'none'
                : display === 'flex'
                  ? 'flex'
                  : undefined,
    }

    const flat = StyleSheet.flatten([baseStyle.view, resolved, style])
    return (
        <View style={flat} {...rest}>
            {children}
        </View>
    )
}

const baseStyle = StyleSheet.create({
    view: {
        // Default to flex so Block behaves like the web version (display:flex).
        display: 'flex',
    },
})

export default Block
