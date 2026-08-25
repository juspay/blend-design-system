import React, { memo, useContext } from 'react'
import {
    Text as RNText,
    StyleSheet,
    type TextProps as RNTextProps,
    type TextStyle,
} from 'react-native'
import { parseDimension } from '../adapters/cssStringAdapter'
import { resolveFontWeight } from './textStyle'
import { BlendNativeThemeContext } from '../theme/BlendNativeProvider'
import type { NativeFontRole } from '../theme/fonts'

/**
 * Native `Text` — renders a RN `Text` from token-driven style props.
 *
 * Mirrors the web `Text` component's API (`fontSize`, `fontWeight`, `color`,
 * `lineHeight`, `textAlign`) but accepts CSS-string values directly from
 * Blend tokens and translates them to `TextStyle` numbers.
 *
 * **Font family** comes from the provider's resolved role map (web has CSS
 * inheritance; RN does not, so the provider is the inheritance mechanism).
 * Defaults to the `body` role; `fontRole` picks another role and an explicit
 * `fontFamily` wins outright.
 *
 * **Font scaling** is deliberately left ON (RN's default). The package policy
 * is to respect OS Dynamic Type and let controls grow — components size with
 * `minHeight`, never a fixed `height`, so scaled text expands the control
 * instead of clipping. Consumers needing a cap can pass RN's own
 * `maxFontSizeMultiplier` through `...rest`.
 */

export type BlendTextProps = {
    children?: React.ReactNode
    /** CSS string like `"14px"` or a number. */
    fontSize?: string | number
    /** CSS font-weight keyword or number (`"500"`, `500`, `"bold"`). */
    fontWeight?: string | number
    color?: string
    /** CSS line-height like `"20px"` or a number. */
    lineHeight?: string | number
    textAlign?: 'left' | 'right' | 'center' | 'justify'
    /**
     * Explicit font family. Overrides the provider's role map; rarely needed
     * outside consumer escape hatches.
     */
    fontFamily?: string
    /** Which provider font role to use when `fontFamily` is not given. */
    fontRole?: NativeFontRole
    /** Set true to hide from screen readers (web `aria-hidden`). */
    'aria-hidden'?: boolean
    /** Flex display — web `Text` is sometimes `inline`; on RN Text is always inline. */
    as?: string
} & Omit<RNTextProps, 'style'> & {
        style?: TextStyle
    }

function TextImpl({
    children,
    fontSize,
    fontWeight,
    color,
    lineHeight,
    textAlign,
    fontFamily,
    fontRole = 'body',
    style,
    ...rest
}: BlendTextProps) {
    const { fontFamily: familyMap } = useContext(BlendNativeThemeContext)
    // `null` in the map means "leave the platform font" — emit nothing.
    const resolvedFamily = fontFamily ?? familyMap[fontRole] ?? undefined

    const resolved: TextStyle = {
        fontSize: parseDimension(fontSize),
        fontWeight: resolveFontWeight(fontWeight),
        color,
        lineHeight: parseDimension(lineHeight),
        textAlign,
        fontFamily: resolvedFamily,
    }

    const flat = StyleSheet.flatten([baseStyle.text, resolved, style])
    return (
        <RNText style={flat} {...rest}>
            {children}
        </RNText>
    )
}

/** Memoised — see the note on `Block`. */
export const Text = memo(TextImpl)
Text.displayName = 'Text'

const baseStyle = StyleSheet.create({
    text: {},
})

export default Text
