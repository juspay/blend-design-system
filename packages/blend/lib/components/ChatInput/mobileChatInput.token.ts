import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import type { FoundationTokenType } from '../../tokens/theme.token'

/**
 * Mobile ChatInput Tokens following the pattern: [target].property.[state]
 *
 * This file contains tokens that are only used by the mobile ChatInput variant
 * (`MobileChatInput.tsx`). Keeping mobile-only tokens here avoids polluting the
 * base `chatInput.tokens.ts` with mobile styling concerns.
 */
export type MobileChatInputTokensType = Readonly<{
    textareaMobile: {
        backgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        lineHeight: CSSObject['lineHeight']
        padding: CSSObject['padding']
        border: {
            default: CSSObject['border']
            focus: CSSObject['border']
        }
        borderRadius: {
            default: CSSObject['borderRadius']
            focus: CSSObject['borderRadius']
        }
        height: {
            default: CSSObject['height']
            focus: CSSObject['height']
        }
        overflow: CSSObject['overflow']
        verticalAlign: CSSObject['verticalAlign']
        placeholder: {
            color: CSSObject['color']
        }
    }
}>

export type ResponsiveMobileChatInputTokensType = {
    [key in keyof BreakpointType]: MobileChatInputTokensType
}

export const getMobileChatInputTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMobileChatInputTokensType => {
    const baseTokens: MobileChatInputTokensType = {
        textareaMobile: {
            backgroundColor: 'transparent',
            color: foundationToken.colors.gray[600],
            fontSize: foundationToken.font.size.body.md.fontSize,
            lineHeight: `${foundationToken.font.size.body.md.lineHeight}px`,
            padding: foundationToken.unit[12],
            border: {
                default: `1px solid ${foundationToken.colors.gray[200]}`,
                focus: `1px solid ${foundationToken.colors.primary[500]}`,
            },
            borderRadius: {
                default: foundationToken.unit[100],
                focus: foundationToken.unit[20],
            },
            height: {
                default: foundationToken.unit[44],
                focus: foundationToken.unit[100],
            },
            overflow: 'hidden',
            verticalAlign: 'middle',
            placeholder: {
                color: foundationToken.colors.gray[400],
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}

export default getMobileChatInputTokens
