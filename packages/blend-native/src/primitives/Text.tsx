import React, { memo } from 'react'
import {
    Text as RNText,
    StyleSheet,
    type TextProps as RNTextProps,
    type TextStyle,
} from 'react-native'
import { parseDimension } from '../adapters/cssStringAdapter'

/**
 * Native `Text` — renders a RN `Text` from token-driven style props.
 *
 * Mirrors the web `Text` component's API (`fontSize`, `fontWeight`, `color`,
 * `lineHeight`, `textAlign`) but accepts CSS-string values directly from
 * Blend tokens and translates them to `TextStyle` numbers.
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
    /** Set true to hide from screen readers (web `aria-hidden`). */
    'aria-hidden'?: boolean
    /** Flex display — web `Text` is sometimes `inline`; on RN Text is always inline. */
    as?: string
} & Omit<RNTextProps, 'style'> & {
        style?: TextStyle
    }

/**
 * Resolve a CSS font-weight value to a RN-compatible `TextStyle['fontWeight']`.
 * RN accepts `'normal' | 'bold' | '100'..'900'` (as string or number).
 */
function resolveFontWeight(
    w: string | number | undefined
): TextStyle['fontWeight'] {
    if (w === undefined) return undefined
    if (typeof w === 'number') return String(w) as TextStyle['fontWeight']
    // Token values are numeric strings like `"500"`.
    if (/^\d+$/.test(w)) return w as TextStyle['fontWeight']
    const lower = w.toLowerCase()
    if (lower === 'normal' || lower === 'bold') return lower
    return undefined
}

function TextImpl({
    children,
    fontSize,
    fontWeight,
    color,
    lineHeight,
    textAlign,
    style,
    ...rest
}: BlendTextProps) {
    const resolved: TextStyle = {
        fontSize: parseDimension(fontSize),
        fontWeight: resolveFontWeight(fontWeight),
        color,
        lineHeight: parseDimension(lineHeight),
        textAlign,
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
