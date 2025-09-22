import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { KeyValuePairSize, KeyValuePairStateType } from './types'

export type KeyValuePairTokensType = {
    gap: CSSObject['gap']
    keyColor: CSSObject['color']
    valueColor: CSSObject['color']
    keyFontSize: CSSObject['fontSize']
    valueFontSize: {
        [key in KeyValuePairSize]: {
            [key in KeyValuePairStateType]: CSSObject['fontSize']
        }
    }
    // maxWidth: CSSObject['maxWidth']
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
            keyColor: foundationToken.colors.gray[500],
            valueColor: foundationToken.colors.gray[700],
            keyFontSize: foundationToken.font.size.body.md.fontSize,
            valueFontSize: {
                [KeyValuePairSize.SMALL]: {
                    [KeyValuePairStateType.vertical]: '14px',
                    [KeyValuePairStateType.horizontal]: '14px',
                },
                [KeyValuePairSize.MEDIUM]: {
                    [KeyValuePairStateType.vertical]: '16px',
                    [KeyValuePairStateType.horizontal]: '14px',
                },
                [KeyValuePairSize.LARGE]: {
                    [KeyValuePairStateType.vertical]: '18px',
                    [KeyValuePairStateType.horizontal]: '14px',
                },
            },
            // maxWidth: '200px',
        },
        lg: {
            gap: foundationToken.unit[4],
            keyColor: foundationToken.colors.gray[500],
            valueColor: foundationToken.colors.gray[700],
            keyFontSize: foundationToken.font.size.body.lg.fontSize,
            valueFontSize: {
                [KeyValuePairSize.SMALL]: {
                    [KeyValuePairStateType.vertical]: '14px',
                    [KeyValuePairStateType.horizontal]: '14px',
                },
                [KeyValuePairSize.MEDIUM]: {
                    [KeyValuePairStateType.vertical]: '16px',
                    [KeyValuePairStateType.horizontal]: '14px',
                },
                [KeyValuePairSize.LARGE]: {
                    [KeyValuePairStateType.vertical]: '18px',
                    [KeyValuePairStateType.horizontal]: '14px',
                },
            },
            // maxWidth: '300px',
        },
    }
}
