import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getCardDarkTokens } from './card.dark.tokens'
import { getCardLightTokens } from './card.light.tokens'
import type { ResponsiveCardTokens } from './card.tokens.types'

export type {
    CardState,
    CardTokenType,
    ResponsiveCardTokens,
} from './card.tokens.types'

export const getCardTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCardTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getCardDarkTokens(foundationToken)
    }

    return getCardLightTokens(foundationToken)
}

export default getCardTokens
