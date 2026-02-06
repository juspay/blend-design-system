import type { CSSObject } from 'styled-components'
import { AvatarV2Size, AvatarV2Shape, AvatarV2Status } from './avatarV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getAvatarV2DarkTokens } from './avatarV2.dark.tokens'
import { getAvatarV2LightTokens } from './avatarV2.light.tokens'

export type AvatarV2TokensType = {
    container: {
        size: {
            [key in AvatarV2Size]: {
                width: CSSObject['width']
                height: CSSObject['height']
            }
        }
        borderRadius: {
            [key in AvatarV2Shape]: CSSObject['borderRadius']
        }
    }

    border: {
        image: CSSObject['border']
        fallback: CSSObject['border']
    }

    fallback: {
        backgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
    }

    typography: {
        fontSize: {
            [key in AvatarV2Size]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in AvatarV2Size]: CSSObject['fontWeight']
        }
    }

    status: {
        indicator: {
            size: {
                [key in AvatarV2Size]: {
                    width: CSSObject['width']
                    height: CSSObject['height']
                }
            }
            border: {
                [key in AvatarV2Size]: {
                    width: CSSObject['borderWidth']
                    color: CSSObject['borderColor']
                }
            }
        }
        backgroundColor: {
            [key in AvatarV2Status]: CSSObject['backgroundColor']
        }
        shadow: CSSObject['boxShadow']
    }

    slot: {
        gap: CSSObject['gap']
        color: CSSObject['color']
    }

    image: {
        backgroundColor: CSSObject['backgroundColor']
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
