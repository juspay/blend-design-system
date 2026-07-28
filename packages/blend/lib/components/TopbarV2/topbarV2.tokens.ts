import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTopbarV2DarkTokens } from './topbarV2.dark.tokens'
import { getTopbarV2LightTokens } from './topbarV2.light.tokens'
import type { ResponsiveTopbarV2Tokens } from './topbarV2.tokens.types'

export type {
    TopbarV2State,
    TopbarV2TokenType,
    ResponsiveTopbarV2Tokens,
} from './topbarV2.tokens.types'

export const getTopbarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTopbarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTopbarV2DarkTokens(foundationToken)
    }
    return getTopbarV2LightTokens(foundationToken)
}
