import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getBadgeDarkTokens } from './badge.dark.tokens'
import { getBadgeLightTokens } from './badge.light.tokens'
import type { ResponsiveBadgeTokens } from './badge.tokens.types'

export type {
    BadgeTokensType,
    ResponsiveBadgeTokens,
} from './badge.tokens.types'

export const getBadgeTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveBadgeTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getBadgeDarkTokens(foundationToken)
    }

    return getBadgeLightTokens(foundationToken)
}
