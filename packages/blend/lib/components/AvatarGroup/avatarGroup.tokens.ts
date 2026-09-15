import { type ThemeType } from '../../tokens'
import { Theme } from '../../context/theme.enum'
import { getAvatarGroupLightTokens } from './avatarGroup.light.tokens'
import { getAvatarGroupDarkTokens } from './avatarGroup.dark.tokens'
import type { ResponsiveAvatarGroupTokens } from './avatarGroup.tokens.types'

export type {
    AvatarGroupTokensType,
    ResponsiveAvatarGroupTokens,
} from './avatarGroup.tokens.types'

export const getAvatarGroupTokens = (
    foundationToken: ThemeType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveAvatarGroupTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getAvatarGroupDarkTokens(foundationToken)
    }
    return getAvatarGroupLightTokens(foundationToken)
}
