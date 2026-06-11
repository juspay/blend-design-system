import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getStatCardV2LightTokens } from './statcardV2.light.tokens'
import { getStatCardV2DarkTokens } from './statcardV2.dark.tokens'
import type { ResponsiveStatCardV2Tokens } from './statcardV2.tokens.types'

export type {
    ResponsiveStatCardV2Tokens,
    StatCardV2TokensType,
} from './statcardV2.tokens.types'

export const getStatCardV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveStatCardV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getStatCardV2DarkTokens(foundationToken)
    }

    return getStatCardV2LightTokens(foundationToken)
}
