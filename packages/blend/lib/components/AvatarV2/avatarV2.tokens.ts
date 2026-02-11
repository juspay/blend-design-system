import type { CSSObject } from 'styled-components'
import { AvatarV2Size, AvatarV2Shape, AvatarV2Status } from './avatarV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getAvatarV2DarkTokens } from './avatarV2.dark.tokens'
import { getAvatarV2LightTokens } from './avatarV2.light.tokens'

export type AvatarV2TokensType = {
    gap: CSSObject['gap']
    container: {
        backgroundColor: CSSObject['backgroundColor']
        width: {
            [key in AvatarV2Size]: CSSObject['width']
        }
        height: {
            [key in AvatarV2Size]: CSSObject['height']
        }
        borderRadius: {
            [key in AvatarV2Shape]: CSSObject['borderRadius']
        }
        image: {
            border: CSSObject['border']
        }
        fallbackText: {
            border: CSSObject['border']
            fontSize: {
                [key in AvatarV2Size]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in AvatarV2Size]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in AvatarV2Size]: CSSObject['lineHeight']
            }
            color: CSSObject['color']
        }

        status: {
            width: {
                [key in AvatarV2Size]: CSSObject['width']
            }
            height: {
                [key in AvatarV2Size]: CSSObject['height']
            }
            border: {
                [key in AvatarV2Size]: CSSObject['border']
            }
            borderRadius: CSSObject['borderRadius']
            backgroundColor: {
                [key in AvatarV2Status]: CSSObject['backgroundColor']
            }
            boxShadow: CSSObject['boxShadow']
        }
    }

    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
    }
}

export type ResponsiveAvatarV2Tokens = {
    [key in keyof BreakpointType]: AvatarV2TokensType
}

/**
 * Get AvatarV2 tokens based on theme
 *
 * @param foundationToken - The foundation theme tokens
 * @param theme - The current theme (light or dark)
 * @returns Responsive AvatarV2 tokens
 */
export const getAvatarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveAvatarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getAvatarV2DarkTokens(foundationToken)
    }

    return getAvatarV2LightTokens(foundationToken)
}
