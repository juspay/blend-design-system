import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getAvatarV2DarkTokens } from './avatarV2.dark.tokens'
import { getAvatarV2LightTokens } from './avatarV2.light.tokens'
import type { ResponsiveAvatarV2Tokens } from './avatarV2.tokens.types'

export type {
    AvatarV2TokensType,
    ResponsiveAvatarV2Tokens,
} from './avatarV2.tokens.types'

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
