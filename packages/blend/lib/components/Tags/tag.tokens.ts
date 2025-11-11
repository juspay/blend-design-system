import type { CSSObject } from 'styled-components'
import { TagColor, TagShape, TagSize, TagVariant } from './types'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getTagLightTokens } from './tag.light.tokens'
import { getTagDarkTokens } from './tag.dark.tokens'

/**
 * Tag Tokens following the pattern: [target].CSSProp.[size].[variant].[subType]
 *
 * Structure:
 * - target: container | text (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | color | fontSize | fontWeight | gap | height
 * - size: xs | sm | md | lg (only for size-dependent properties like padding, fontSize, height)
 * - variant: noFill | attentive | subtle (tag variant)
 * - subType: neutral | primary | success | error | warning | purple (tag color)
 *
 * Size-independent properties: backgroundColor, border, color
 * Size-dependent properties: borderRadius, padding, fontSize, fontWeight, gap, height
 */
export type TagTokensType = Readonly<{
    gap: CSSObject['gap']
    // Pattern: backgroundColor.[variant].[subType]
    backgroundColor: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['backgroundColor']
        }
    }
    // Pattern: borderRadius.[size].[shape] (size and shape dependent)
    borderRadius: {
        [key in TagSize]: {
            [key in TagShape]: CSSObject['borderRadius']
        }
    }
    // Pattern: padding.[size] (size-dependent)
    padding: {
        [key in TagSize]: CSSObject['padding']
    }
    // Pattern: border.[variant].[subType]
    border: {
        [key in TagVariant]: {
            [key in TagColor]: CSSObject['border']
        }
    }
    // Pattern: height.[size] (size-dependent)
    // height: {
    //     [key in TagSize]: CSSObject['height']
    // }
    text: {
        // Pattern: text.color.[variant].[subType]
        color: {
            [key in TagVariant]: {
                [key in TagColor]: CSSObject['color']
            }
        }
        // Pattern: text.fontSize.[size] (size-dependent)
        fontSize: {
            [key in TagSize]: CSSObject['fontSize']
        }
        // Pattern: text.fontWeight.[size] (size-dependent)
        fontWeight: {
            [key in TagSize]: CSSObject['fontWeight']
        }
    }
}>

export type ResponsiveTagTokens = {
    [key in keyof BreakpointType]: TagTokensType
}

export const getTagTokens = (
    foundationToken: FoundationTokenType,
    darkMode: boolean = false
): ResponsiveTagTokens => {
    if (darkMode) {
        return getTagDarkTokens(foundationToken)
    }
    return getTagLightTokens(foundationToken)
}

export default getTagTokens
