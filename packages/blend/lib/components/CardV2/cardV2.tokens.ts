import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getCardV2DarkTokens } from './cardV2.dark.tokens'
import { getCardV2LightTokens } from './cardV2.light.tokens'
import type { ResponsiveCardV2Tokens } from './cardV2.tokens.types'

export type {
    CardV2TokensType,
    ResponsiveCardV2Tokens,
} from './cardV2.tokens.types'

export const getCardV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCardV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getCardV2DarkTokens(foundationToken)
    }

    return getCardV2LightTokens(foundationToken)
}
