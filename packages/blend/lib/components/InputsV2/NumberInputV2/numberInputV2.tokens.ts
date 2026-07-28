import type { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getNumberInputV2LightTokens } from './NumberInputV2.light.tokens'
import { getNumberInputV2DarkTokens } from './NumberInputV2.dark.tokens'
import type { ResponsiveNumberInputV2Tokens } from './numberInputV2.tokens.types'

// Re-exported for backward compatibility: these token-shape types now live in
// the leaf module to break the tokens <-> dark/light cycle (see issue #1473).
export type {
    NumberInputV2TokensType,
    ResponsiveNumberInputV2Tokens,
} from './numberInputV2.tokens.types'

export const getNumberInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveNumberInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getNumberInputV2DarkTokens(foundationToken)
    }
    return getNumberInputV2LightTokens(foundationToken)
}
