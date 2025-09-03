import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'

export type KeyValuePairTokensType = {
    gap: CSSObject['gap']
    keyColor: CSSObject['color']
    valueColor: CSSObject['color']
    keyFontSize: CSSObject['fontSize']
    valueFontSize: CSSObject['fontSize']
    maxWidth: CSSObject['maxWidth']
}

export type ResponsiveKeyValuePairTokens = {
    [key in keyof BreakpointType]: KeyValuePairTokensType
}

export const getKeyValuePairTokens = (
    foundationToken: FoundationTokenType
): ResponsiveKeyValuePairTokens => {
    return {
        sm: {
            gap: foundationToken.unit[4],
            keyColor: foundationToken.colors.gray[800],
            valueColor: foundationToken.colors.gray[600],
            keyFontSize: foundationToken.font.size.body.md.fontSize,
            valueFontSize: foundationToken.font.size.body.md.fontSize,
            maxWidth: foundationToken.unit[200],
        },
        lg: {
            gap: foundationToken.unit[4],
            keyColor: foundationToken.colors.gray[800],
            valueColor: foundationToken.colors.gray[600],
            keyFontSize: foundationToken.font.size.body.lg.fontSize,
            valueFontSize: foundationToken.font.size.body.lg.fontSize,
            maxWidth: foundationToken.unit[300],
        },
    }
}
